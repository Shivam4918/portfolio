import os
import urllib.request
import urllib.error
import json
import logging
import threading
from django.core.mail import EmailMultiAlternatives
from django.utils.html import strip_tags
from django.conf import settings
from rest_framework import generics
from .models import ContactMessage
from .serializers import ContactMessageSerializer

logger = logging.getLogger(__name__)

def send_via_brevo_api(api_key, sender_email, sender_name, recipient_email, recipient_name, subject, text_content, html_content):
    url = 'https://api.brevo.com/v3/smtp/email'
    headers = {
        'accept': 'application/json',
        'api-key': api_key,
        'content-type': 'application/json'
    }
    body = {
        'sender': {'name': sender_name, 'email': sender_email},
        'to': [{'email': recipient_email, 'name': recipient_name}],
        'subject': subject,
        'textContent': text_content,
        'htmlContent': html_content
    }
    req = urllib.request.Request(
        url,
        data=json.dumps(body).encode('utf-8'),
        headers=headers,
        method='POST'
    )
    try:
        with urllib.request.urlopen(req) as response:
            res_body = response.read().decode('utf-8')
            logger.info(f"Brevo API response: {response.status} - {res_body}")
            return True
    except urllib.error.HTTPError as e:
        logger.error(f"Brevo HTTP error {e.code}: {e.read().decode('utf-8')}")
    except Exception as e:
        logger.error(f"Failed to send via Brevo API: {str(e)}")
    return False

def send_contact_emails_async(name, email, subject, message):
    def send_task():
        # Load Brevo API Key from environment
        brevo_api_key = os.getenv('BREVO_API_KEY')
        
        # --- 1. Notification Email to Shivam ---
        notification_subject = 'New Portfolio Contact Form Submission'
        notification_text = (
            f"New portfolio contact form submission:\n\n"
            f"Name: {name}\n"
            f"Email: {email}\n"
            f"Subject: {subject}\n\n"
            f"Message:\n{message}\n"
        )
        notification_html = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <style>
                body {{ font-family: 'Segoe UI', Helvetica, Arial, sans-serif; background-color: #f1f5f9; color: #1e293b; margin: 0; padding: 20px; }}
                .container {{ max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05); border: 1px solid #e2e8f0; }}
                .header {{ background: #0f172a; padding: 30px; text-align: center; border-bottom: 3px solid #6366f1; }}
                .logo {{ font-size: 24px; font-weight: 800; color: #14b8a6; text-decoration: none; font-family: 'Courier New', Courier, monospace; }}
                .logo-span {{ color: #6366f1; }}
                .title {{ color: #ffffff; font-size: 18px; margin: 10px 0 0 0; font-weight: 500; }}
                .content {{ padding: 40px 30px; }}
                .field-group {{ margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px dashed #e2e8f0; }}
                .field-group:last-of-type {{ border-bottom: none; }}
                .label {{ font-size: 12px; font-weight: 700; text-transform: uppercase; color: #64748b; letter-spacing: 1px; margin-bottom: 6px; }}
                .value {{ font-size: 15px; color: #0f172a; font-weight: 600; }}
                .message-box {{ background-color: #f8fafc; border-left: 4px solid #6366f1; padding: 20px; border-radius: 4px 12px 12px 4px; font-style: italic; color: #334155; margin-top: 10px; line-height: 1.6; font-size: 14px; }}
                .footer {{ background: #f8fafc; text-align: center; padding: 20px; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <div class="logo">&lt;<span class="logo-span">PrajapatiShivam</span> /&gt;</div>
                    <div class="title">New Message Received</div>
                </div>
                <div class="content">
                    <div class="field-group">
                        <div class="label">From</div>
                        <div class="value">{name} &lt;{email}&gt;</div>
                    </div>
                    <div class="field-group">
                        <div class="label">Subject</div>
                        <div class="value">{subject}</div>
                    </div>
                    <div class="field-group">
                        <div class="label">Message Content</div>
                        <div class="message-box">"{message}"</div>
                    </div>
                </div>
                <div class="footer">
                    Sent from portfolio website contact form.
                </div>
            </div>
        </body>
        </html>
        """

        if brevo_api_key:
            logger.info("BREVO_API_KEY detected. Sending notification via Brevo API...")
            send_via_brevo_api(
                api_key=brevo_api_key,
                sender_email='shivam4918@gmail.com',
                sender_name='Shivam Portfolio',
                recipient_email='shivam4918@gmail.com',
                recipient_name='Shivam Prajapati',
                subject=notification_subject,
                text_content=notification_text,
                html_content=notification_html
            )
        else:
            logger.info("BREVO_API_KEY not set. Falling back to SMTP for notification...")
            try:
                email_msg = EmailMultiAlternatives(
                    subject=notification_subject,
                    body=notification_text,
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    to=['shivam4918@gmail.com']
                )
                email_msg.attach_alternative(notification_html, "text/html")
                email_msg.send()
                logger.info("Notification HTML email successfully sent via SMTP to shivam4918@gmail.com.")
            except Exception as e:
                logger.error(f"Failed to send email notification via SMTP: {str(e)}")

        # --- 2. Auto-Reply Email to Visitor ---
        visitor_subject = 'Thank You for Contacting Me'
        visitor_text = (
            f"Hello {name},\n\n"
            f"Thank you for reaching out through my portfolio website.\n"
            f"I have successfully received your message and will get back to you as soon as possible.\n\n"
            f"Regards,\n"
            f"Shivam Prajapati\n"
            f"Software Engineer"
        )
        visitor_html = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <style>
                body {{ font-family: 'Segoe UI', Helvetica, Arial, sans-serif; background-color: #f1f5f9; color: #1e293b; margin: 0; padding: 20px; }}
                .container {{ max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05); border: 1px solid #e2e8f0; }}
                .header {{ background: #0f172a; padding: 30px; text-align: center; border-bottom: 3px solid #14b8a6; }}
                .logo {{ font-size: 24px; font-weight: 800; color: #14b8a6; text-decoration: none; font-family: 'Courier New', Courier, monospace; }}
                .logo-span {{ color: #6366f1; }}
                .title {{ color: #ffffff; font-size: 18px; margin: 10px 0 0 0; font-weight: 500; }}
                .content {{ padding: 40px 30px; line-height: 1.7; }}
                .salutation {{ font-size: 18px; font-weight: 700; color: #0f172a; margin-bottom: 16px; }}
                .body-text {{ font-size: 15px; color: #334155; margin-bottom: 20px; }}
                .btn-wrapper {{ text-align: center; margin: 30px 0; }}
                .btn {{ display: inline-block; background: linear-gradient(135deg, #6366f1, #4f46e5); color: #ffffff !important; text-decoration: none; padding: 12px 30px; border-radius: 8px; font-weight: 600; font-size: 15px; box-shadow: 0 4px 15px rgba(99, 102, 241, 0.2); }}
                .signature {{ margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; }}
                .sig-name {{ font-size: 16px; font-weight: 700; color: #0f172a; }}
                .sig-title {{ font-size: 13px; color: #14b8a6; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }}
                .sig-desc {{ font-size: 13px; color: #64748b; margin-top: 2px; }}
                .footer {{ background: #f8fafc; text-align: center; padding: 20px; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <div class="logo">&lt;<span class="logo-span">PrajapatiShivam</span> /&gt;</div>
                    <div class="title">Message Received Successfully</div>
                </div>
                <div class="content">
                    <div class="salutation">Hello {name},</div>
                    <div class="body-text">
                        Thank you for reaching out through my portfolio website. I have successfully received your message and will review it shortly.
                    </div>
                    <div class="body-text">
                        I am passionate about building highly performant backend architectures and machine learning systems. I'll get back to you as soon as possible to discuss how we can collaborate.
                    </div>
                    <div class="btn-wrapper">
                        <a href="https://prajapatishivam.vercel.app" class="btn">Visit My Portfolio</a>
                    </div>
                    <div class="signature">
                        <div class="sig-name">Shivam Prajapati</div>
                        <div class="sig-title">Software Engineer & Backend Developer</div>
                        <div class="sig-desc">Gujarat, India</div>
                    </div>
                </div>
                <div class="footer">
                    This is an automated receipt confirmation from my portfolio. Please do not reply to this email directly.
                </div>
            </div>
        </body>
        </html>
        """

        if brevo_api_key:
            logger.info(f"Sending auto-reply to {email} via Brevo API...")
            send_via_brevo_api(
                api_key=brevo_api_key,
                sender_email='shivam4918@gmail.com',
                sender_name='Shivam Prajapati',
                recipient_email=email,
                recipient_name=name,
                subject=visitor_subject,
                text_content=visitor_text,
                html_content=visitor_html
            )
        else:
            logger.info(f"Falling back to SMTP for auto-reply to {email}...")
            try:
                email_msg = EmailMultiAlternatives(
                    subject=visitor_subject,
                    body=visitor_text,
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    to=[email]
                )
                email_msg.attach_alternative(visitor_html, "text/html")
                email_msg.send()
                logger.info(f"Auto-reply HTML email successfully sent via SMTP to {email}.")
            except Exception as e:
                logger.error(f"Failed to send auto-reply email via SMTP: {str(e)}")

    thread = threading.Thread(target=send_task)
    thread.start()

class ContactCreateView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

    def get_client_ip(self):
        x_forwarded_for = self.request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0].strip()
        else:
            ip = self.request.META.get('REMOTE_ADDR')
        return ip

    def perform_create(self, serializer):
        ip = self.get_client_ip()
        instance = serializer.save(ip_address=ip)
        
        # Trigger async emails
        send_contact_emails_async(
            name=instance.name,
            email=instance.email,
            subject=instance.subject,
            message=instance.message
        )
