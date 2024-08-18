// src/App.js

import React from 'react';
import OrderTracking from './components/OrderTracking';
import WrappedPaymentForm from './components/PaymentForm';
import OrderHistory from './components/OrderHistory';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <h1>Lunchbox Order Management</h1>

      {/* User Authentication */}
      <Login />

      {/* Order Tracking */}
      <OrderTracking orderId={1} />

      {/* Payment Form */}
      <WrappedPaymentForm amount={20.00} />

      {/* Order History */}
      <OrderHistory customerId={1} />
    </div>
  );
}

export default App;
