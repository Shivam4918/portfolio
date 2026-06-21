import csv
from django.http import HttpResponse
from django.contrib import admin
from .models import ContactMessage

@admin.action(description="Export selected messages to CSV")
def export_as_csv(modeladmin, request, queryset):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="contact_messages.csv"'
    writer = csv.writer(response)
    writer.writerow(['ID', 'Name', 'Email', 'Subject', 'Message', 'IP Address', 'Is Read', 'Created At'])
    for message in queryset:
        writer.writerow([
            message.id, 
            message.name, 
            message.email, 
            message.subject, 
            message.message, 
            message.ip_address, 
            message.is_read, 
            message.created_at
        ])
    return response

@admin.action(description="Mark selected messages as read")
def mark_as_read(modeladmin, request, queryset):
    queryset.update(is_read=True)

@admin.action(description="Mark selected messages as unread")
def mark_as_unread(modeladmin, request, queryset):
    queryset.update(is_read=False)

class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'is_read', 'created_at', 'ip_address')
    list_filter = ('is_read', 'created_at')
    search_fields = ('name', 'email', 'subject', 'message')
    readonly_fields = ('name', 'email', 'subject', 'message', 'ip_address', 'created_at', 'updated_at')
    actions = [export_as_csv, mark_as_read, mark_as_unread]

admin.site.register(ContactMessage, ContactMessageAdmin)
