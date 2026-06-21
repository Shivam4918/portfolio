from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.http import FileResponse, Http404
from django.views.decorators.csrf import ensure_csrf_cookie
import os

@ensure_csrf_cookie
def serve_index(request):
    index_path = os.path.join(settings.ROOT_DIR, 'index.html')
    if os.path.exists(index_path):
        return FileResponse(open(index_path, 'rb'), content_type='text/html')
    raise Http404("Index file not found")

def serve_css(request):
    css_path = os.path.join(settings.ROOT_DIR, 'index.css')
    if os.path.exists(css_path):
        return FileResponse(open(css_path, 'rb'), content_type='text/css')
    raise Http404("CSS file not found")

def serve_js(request):
    js_path = os.path.join(settings.ROOT_DIR, 'index.js')
    if os.path.exists(js_path):
        return FileResponse(open(js_path, 'rb'), content_type='application/javascript')
    raise Http404("JS file not found")

def serve_pdf(request):
    pdf_path = os.path.join(settings.ROOT_DIR, 'Resume1.pdf')
    if os.path.exists(pdf_path):
        return FileResponse(open(pdf_path, 'rb'), content_type='application/pdf')
    raise Http404("Resume file not found")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/contact/', include('contacts.urls')),
    
    # Serve static frontend files directly at root urls
    path('', serve_index, name='index'),
    path('index.css', serve_css, name='css'),
    path('index.js', serve_js, name='js'),
    path('Resume1.pdf', serve_pdf, name='resume'),
]
