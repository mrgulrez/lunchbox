# backend/orders/urls.py

from django.urls import path
from .views import UpdateOrderStatus, OrderHistoryView

urlpatterns = [
    path('<int:order_id>/status/', UpdateOrderStatus.as_view(), name='update_order_status'),
    path('history/', OrderHistoryView.as_view(), name='order_history'),
]
