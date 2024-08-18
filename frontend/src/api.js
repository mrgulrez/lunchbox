// src/api.js

import axios from 'axios';

// Base API URL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Update Order Status
export const updateOrderStatus = (orderId, status) => {
  return axios.post(`${API_URL}/orders/${orderId}/status/`, { status });
};

// Create Payment Intent
export const createPaymentIntent = (amount) => {
  return axios.post(`${API_URL}/payments/create-intent/`, { amount });
};

// Confirm Payment
export const confirmPayment = (paymentIntentId) => {
  return axios.post(`${API_URL}/payments/confirm/${paymentIntentId}/`);
};
