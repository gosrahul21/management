import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GymPanel from '../components/Gympanel';
import SearchIcon from '../assets/icons/search-icon.svg';
// import Subscriptions from '../config/subscriptions'; // Replace with actual subscription data import
import Modal from '../components/Modal';
import SubscriptionForm from '../components/SusbcriptionForm';
// import SubscriptionForm from '../components/SubscriptionForm'; // Assuming this component handles subscription forms

const SubscriptionList = () => {
  const [subscriptions, setSubscriptions] = useState<Record<string, any>[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Simulated fetch for subscription data (replace with actual API call)
    const fetchSubscriptions = async () => {
      // Simulated data
      const data = [
        {
          id: 1,
          name: 'Basic Membership',
          price: '$50/month',
        },
        {
          id: 2,
          name: 'Premium Membership',
          price: '$100/month',
        },
        // Add more subscription plans as needed
      ];
      setSubscriptions(data as any); // Assuming Subscriptions is an array of objects
    };

    fetchSubscriptions();
  }, []);

  const filterSubscriptions = () => {
    return subscriptions.filter(subscription =>
      subscription.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredSubscriptions = filterSubscriptions();

  const [isAddEditFormOpen, setIsAddEditFormOpen] = useState(false);

  const openAddEditForm = () => {
    setIsAddEditFormOpen(true);
  };

  const closeAddEditForm = () => {
    setIsAddEditFormOpen(false);
  };

  const handleEditSubscription = () => {
    // Logic to handle editing subscription
    closeAddEditForm(); // Close the modal after editing
  };

  return (
    <GymPanel>
      <div className='p-6'>
        <Modal isOpen={isAddEditFormOpen} onClose={closeAddEditForm} title={"Add Subscription"}>
          <SubscriptionForm onSubmit={handleEditSubscription} />
        </Modal>
        <div className="p-4 rounded-lg mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Subscriptions</h1>
          <button onClick={openAddEditForm} className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
            Add Subscription
          </button>
        </div>

        {/* Search Section */}
        <div className="flex items-center mb-6">
          <input
            type="text"
            placeholder="Search by subscription name."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-700 text-white p-2 rounded-l-md w-1/3 focus:outline-none"
          />
          <button className="bg-blue-600 text-white py-2 px-4 rounded-r-md hover:bg-blue-700">
            <img src={SearchIcon} alt="Search Icon" />
          </button>
        </div>

        {/* Subscriptions List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSubscriptions.map((subscription) => (
            <div key={subscription.id} className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg duration-500 flex items-start cursor-pointer"
              onClick={() => navigate(`/subscription/profile/${subscription.id}`)}>
              <div>
                <h2 className="text-xl font-bold">{subscription.name}</h2>
                <p className="text-gray-400">Price: {subscription.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </GymPanel>
  );
};

export default SubscriptionList;
