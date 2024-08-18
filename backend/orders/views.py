# backend/orders/views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from .models import Order, OrderStatus
from .serializers import OrderSerializer
from rest_framework.generics import ListAPIView

class UpdateOrderStatus(APIView):
    def post(self, request, order_id):
        status = request.data.get('status')
        order = Order.objects.get(order_id=order_id)
        OrderStatus.objects.create(order=order, status=status)

        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            f'order_{order_id}',
            {
                'type': 'order_status_update',
                'status': status,
                'timestamp': str(OrderStatus.objects.filter(order=order).latest('updated_at').updated_at),
            }
        )
        return Response({"status": "Order status updated"})


class OrderHistoryView(ListAPIView):
    serializer_class = OrderSerializer

    def get_queryset(self):
        customer_id = self.request.query_params.get('customer_id')
        return Order.objects.filter(customer_id=customer_id).order_by('-created_at')