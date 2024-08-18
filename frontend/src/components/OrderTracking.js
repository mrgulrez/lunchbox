// src/components/OrderTracking.js

import React, { useEffect, useState } from 'react';

const OrderTracking = ({ orderId }) => {
  const [status, setStatus] = useState('Pending');
  const [timestamp, setTimestamp] = useState(null);

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8000/ws/orders/${orderId}/`);

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setStatus(data.status);
      setTimestamp(data.timestamp);
    };

    return () => ws.close();
  }, [orderId]);

  return (
    <div>
      <h3>Order Status: {status}</h3>
      <p>Last updated: {timestamp}</p>
    </div>
  );
};

export default OrderTracking;
