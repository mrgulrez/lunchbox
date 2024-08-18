# backend/api/index.py

from django.core.wsgi import get_wsgi_application
import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'lunchbox.settings')

app = get_wsgi_application()

def handler(event, context):
    return app(event, context)
