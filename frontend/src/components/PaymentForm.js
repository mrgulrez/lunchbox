// src/components/PaymentForm.js

import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { createPaymentIntent } from '../api';

// Load Stripe.js with your public key from environment variables
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a payment intent on the backend
    const { data: { client_secret } } = await createPaymentIntent(amount);

    // Confirm the payment on the frontend
    const result = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      setStatus('Payment failed: ' + result.error.message);
    } else if (result.paymentIntent.status === 'succeeded') {
      setStatus('Payment successful');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay ${amount}
      </button>
      <p>{status}</p>
    </form>
  );
};

// Wrapper component to load Stripe and render the form
export default function WrappedPaymentForm(props) {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm {...props} />
    </Elements>
  );
}
