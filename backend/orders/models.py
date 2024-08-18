from django.db import models

class Order(models.Model):
    order_id = models.AutoField(primary_key=True)
    customer_id = models.IntegerField()
    restaurant_id = models.IntegerField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_status = models.CharField(max_length=50, default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class OrderStatus(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    status = models.CharField(max_length=50)
    updated_at = models.DateTimeField(auto_now_add=True)