import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const SubscriberForm = () => {
  const [subscriptions, setSubscriptions] = useState([
    "Basic Membership",
    "Preminum Membership",
    "Ultra Premium Membership"
  ]);
  const [selectedSubscription, setSelectedSubscription] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Fetch subscription plans from your backend API
    axios.get('/api/subscriptions') // Replace with your actual API endpoint for fetching subscriptions
      .then(response => {
        // setSubscriptions(response.data); // Assuming response.data is an array of subscription objects
      })
      .catch(error => {
        console.error('Error fetching subscriptions:', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Prepare the subscriber object payload
    const newSubscriber = {
      subscriptionId: selectedSubscription,
      name,
      email,
      phone,
    };
    console.log(newSubscriber);

    // Navigate to the payment page
    navigate('/payment', { state: { subscriber: newSubscriber } });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded shadow-md text-white">
      <h2 className="text-2xl mb-4">Add Subscriber</h2>
      <label className="block mb-2">Subscription Plan</label>
      <select
        value={selectedSubscription}
        onChange={(e) => setSelectedSubscription(e.target.value)}
        className="w-full p-2 border border-gray-600 rounded mb-4 bg-gray-700 text-white"
        required
      >
        <option value="">Select Subscription Plan</option>
        {subscriptions?.map((subscription, index) => (
          <option key={index} value={subscription}>{subscription}</option> // Updated to use subscription directly
        ))}
      </select>

      <label className="block mb-2">Phone Number</label>
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full p-2 border border-gray-600 rounded mb-4 bg-gray-700 text-white"
        required
      />

      <label className="block mb-2">Subscriber Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border border-gray-600 rounded mb-4 bg-gray-700 text-white"
        required
      />
      
      <label className="block mb-2">Email Address</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border border-gray-600 rounded mb-4 bg-gray-700 text-white"
        required
      />
      <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
        Proceed to payment
      </button>
    </form>
  );
};

export default SubscriberForm;
