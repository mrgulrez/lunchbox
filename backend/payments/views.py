# backend/payments/views.py

import stripe
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Payment

stripe.api_key = settings.STRIPE_SECRET_KEY

class CreatePaymentIntent(APIView):
    def post(self, request):
        amount = request.data.get('amount')

        intent = stripe.PaymentIntent.create(
            amount=int(amount * 100),  # Stripe expects the amount in cents
            currency='usd',
            payment_method_types=['card'],
        )

        Payment.objects.create(
            payment_intent_id=intent['id'],
            amount=amount,
            status='pending',
        )

        return Response({
            'client_secret': intent['client_secret']
        })

class ConfirmPayment(APIView):
    def post(self, request, payment_intent_id):
        intent = stripe.PaymentIntent.retrieve(payment_intent_id)

        if intent['status'] == 'succeeded':
            Payment.objects.filter(payment_intent_id=payment_intent_id).update(status='succeeded')
            return Response({"status": "Payment successful"})
        else:
            return Response({"status": "Payment failed"})
