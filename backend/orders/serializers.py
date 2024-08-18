# backend/orders/serializers.py

from rest_framework import serializers
from .models import Order

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['order_id', 'restaurant_id', 'total_amount', 'payment_status', 'created_at']
