# backend/lunchbox/urls.py

from django.urls import path, include
from django.contrib import admin

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/orders/', include('orders.urls')),
    path('api/payments/', include('payments.urls')),
    path('accounts/', include('allauth.urls')),  # Add this line
]
