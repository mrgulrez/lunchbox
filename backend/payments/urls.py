# backend/payments/urls.py

from django.urls import path
from .views import CreatePaymentIntent, ConfirmPayment

urlpatterns = [
    path('create-intent/', CreatePaymentIntent.as_view(), name='create_payment_intent'),
    path('confirm/<str:payment_intent_id>/', ConfirmPayment.as_view(), name='confirm_payment'),
]
