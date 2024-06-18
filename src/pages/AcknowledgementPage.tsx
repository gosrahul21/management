import React from 'react';
import { useLocation } from 'react-router-dom';

const AcknowledgementPage = () => {
  const location = useLocation();
  const { orderId, orderDetails } = location.state;

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded shadow-md text-center max-w-lg mx-auto">
        <h1 className="text-3xl font-bold mb-4">Order Completed</h1>
        <p className="text-xl mb-2">Thank you for your payment!</p>
        <p className="text-xl mb-4">Your order ID is <span className="font-bold">{orderId}</span>.</p>
        
        <h2 className="text-2xl font-bold mb-4">Order Details</h2>
        <p className="text-lg"><strong>Name:</strong> {orderDetails.name}</p>
        <p className="text-lg"><strong>Email:</strong> {orderDetails.email}</p>
        <p className="text-lg"><strong>Phone:</strong> {orderDetails.phone}</p>
        <p className="text-lg"><strong>Subscription Plan:</strong> {orderDetails.subscriptionId}</p>
        <p className="text-lg"><strong>Amount Paid:</strong> ₹{orderDetails.amount}</p>
        
        <button onClick={() => window.location.href = '/dashboard'} className="mt-6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default AcknowledgementPage;
