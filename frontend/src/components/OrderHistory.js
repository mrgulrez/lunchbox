// src/components/OrderHistory.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderHistory = ({ customerId }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`/api/orders/history/?customer_id=${customerId}`);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };

    fetchOrders();
  }, [customerId]);

  return (
    <div>
      <h2>Order History</h2>
      <ul>
        {orders.map(order => (
          <li key={order.order_id}>
            <p>Order ID: {order.order_id}</p>
            <p>Restaurant ID: {order.restaurant_id}</p>
            <p>Total Amount: ${order.total_amount}</p>
            <p>Payment Status: {order.payment_status}</p>
            <p>Date: {new Date(order.created_at).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderHistory;
