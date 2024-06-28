import { useState, useEffect } from 'react';
import moment from 'moment'; // Import moment for date manipulation
import { useNavigate } from 'react-router-dom';
import GymPanel from '../components/Gympanel';
import SearchIcon from '../assets/icons/search-icon.svg';
import Users from '../config/user';
import WhatsappIcon from '../assets/icons/whatsapp-icon.svg'


const SubscriberList = () => {
  const [subscribers, setSubscribers] = useState<Record<string, string>[]>([]);
  const [filter, setFilter] = useState('all'); // State to handle the filter
  const [planFilter, setPlanFilter] = useState('all'); // State to handle subscription plan filter
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const gymDetails = {
    name: 'Fitness Zone',
    location: '123 Gym Street, Cityville',
    members: {
      total: 200,
      active: 180,
    },
    subscriptions: [
      { id: 1, name: 'Basic Membership', price: '$50/month' },
      { id: 2, name: 'Premium Membership', price: '$100/month' },
    ],
    staff: [
      { id: 1, name: 'John Doe', role: 'Manager' },
      { id: 2, name: 'Jane Smith', role: 'Trainer' },
    ],
    classes: [
      { id: 1, name: 'Yoga Class', time: 'Monday, Wednesday, Friday 9:00 AM' },
      { id: 2, name: 'Boxing Class', time: 'Tuesday, Thursday 6:00 PM' },
    ],
    // Add more details as needed
  };
  useEffect(() => {
    // Simulated fetch for subscriber data (replace with actual API call)
    const fetchSubscribers = async () => {
      // Simulated data
      const data = [
        {
          id: 1,
          name: 'John Doe',
          email: 'john.doe@example.com',
          phone: '123-456-7890',
          profilePhoto: 'https://imgs.search.brave.com/jT7IUn2ncPcSP3ti97qt6nxlDHvMYHv9IuTNUnN_iyY/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9j/bG9zZS11cC1wb3J0/cmFpdC1hdHRyYWN0/aXZlLW1hbGUtbW9k/ZWwteW91bmctaGFu/ZHNvbWUtbWFuLWJh/cl8xNTg1OTUtNTEz/NC5qcGc_c2l6ZT02/MjYmZXh0PWpwZw',
          subscriptionPlan: 'Premium Membership',
          subscriptionExpiry: '2024-12-31', // Expiry date
        },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'jane.smith@example.com',
          phone: '098-765-4321',
          profilePhoto: 'https://imgs.search.brave.com/Hv5Z7zQWfTTqpwY_AQ5XBDcyQMr14UwMAB09ZkBrLrI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE0/OTQ3OTAxMDgzNzct/YmU5YzI5YjI5MzMw/P3E9ODAmdz0xMDAw/JmF1dG89Zm9ybWF0/JmZpdD1jcm9wJml4/bGliPXJiLTQuMC4z/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4elpX/RnlZMmg4TVRGOGZH/aGhjSEI1SlRJd1oy/bHliSHhsYm53d2ZI/d3dmSHg4TUE9PQ',
          subscriptionPlan: 'Basic Membership',
          subscriptionExpiry: '2024-06-30', // Expiry date
        },
        {
          id: 3,
          name: 'Alice Johnson',
          email: 'alice.johnson@example.com',
          phone: '555-555-5555',
          profilePhoto: 'https://imgs.search.brave.com/fQBwT69WtgI4WG1WgU_LZZDt7So-3C_J3-_vETtT-Vg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzI0L2Vj/L2M0LzI0ZWNjNDFk/YzE2YTlkOTliZjVk/ZGIxNTU3YTE1MjA0/LmpwZw',
          subscriptionPlan: 'Basic Membership',
          subscriptionExpiry: '2023-06-10', // Expired
        },
        {
          id: 4,
          name: 'Bob Brown',
          email: 'bob.brown@example.com',
          phone: '234-567-8901',
          profilePhoto: 'https://imgs.search.brave.com/eEVp_V-cmLi9LgqftEJwlzgp6zoUdZ-det8nnW0yADY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAyMC8w/My8yNi8wOS8wOC9n/aXJsLTQ5Njk2OTBf/NjQwLmpwZw',
          subscriptionPlan: 'Standard Membership',
          subscriptionExpiry: '2023-11-01', // Expiry date
        },
        {
          id: 5,
          name: 'Charlie Davis',
          email: 'charlie.davis@example.com',
          phone: '987-654-3210',
          profilePhoto: 'https://imgs.search.brave.com/gb6CllNKgkpTsD3gfiw7l9f1MBoCNM2RoQZK6KgZCew/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbW1l/cnNpdmVwb3JuLmNv/bS93cC1jb250ZW50/L3VwbG9hZHMvMjAy/NC8wNi9Qb3JuQUkt/MjAtc2Vjb25kcy0x/MC1wZXJjZW50LWVy/cm9yLXJhdGUtNjQw/eDQ4MC5qcGc',
          subscriptionPlan: 'Premium Membership',
          subscriptionExpiry: '2024-08-15', // Expiry date
        },
        {
          id: 6,
          name: 'Dana Evans',
          email: 'dana.evans@example.com',
          phone: '345-678-9012',
          profilePhoto: 'https://imgs.search.brave.com/-kGCdxocIvAvUFCSP7tvkaBWr8YzE6b4nuMt0rCB5uo/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/bXJwb3JuZ2Vlay5j/b20vd3AtY29udGVu/dC91cGxvYWRzL01J/TEYtVHViZS1TaXRl/cy5qcGc',
          subscriptionPlan: 'Standard Membership',
          subscriptionExpiry: '2023-07-20', // Expiry date
        },
        {
          id: 7,
          name: 'Ella Green',
          email: 'ella.green@example.com',
          phone: '456-789-0123',
          profilePhoto: 'https://imgs.search.brave.com/-kGCdxocIvAvUFCSP7tvkaBWr8YzE6b4nuMt0rCB5uo/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/bXJwb3JuZ2Vlay5j/b20vd3AtY29udGVu/dC91cGxvYWRzL01J/TEYtVHViZS1TaXRl/cy5qcGc',
          subscriptionPlan: 'Basic Membership',
          subscriptionExpiry: '2024-03-25', // Expiry date
        },
        {
          id: 8,
          name: 'Frank Harris',
          email: 'frank.harris@example.com',
          phone: '567-890-1234',
          profilePhoto: 'https://imgs.search.brave.com/-kGCdxocIvAvUFCSP7tvkaBWr8YzE6b4nuMt0rCB5uo/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/bXJwb3JuZ2Vlay5j/b20vd3AtY29udGVu/dC91cGxvYWRzL01J/TEYtVHViZS1TaXRl/cy5qcGc',
          subscriptionPlan: 'Premium Membership',
          subscriptionExpiry: '2023-12-10', // Expiry date
        },
        {
          id: 9,
          name: 'Grace Ivers',
          email: 'grace.ivers@example.com',
          phone: '678-901-2345',
          profilePhoto: "https://img.uralesbian.com/tour/28/3s.jpg",
          subscriptionPlan: 'Standard Membership',
          subscriptionExpiry: '2024-01-05', // Expiry date
        },
        {
          id: 10,
          name: 'Hank Jackson',
          email: 'hank.jackson@example.com',
          phone: '789-012-3456',
          profilePhoto: "https://img.uralesbian.com/tour/28/2s.jpg",
          subscriptionPlan: 'Basic Membership',
          subscriptionExpiry: '2024-05-10', // Expiry date
        },
      ];
      setSubscribers(Users as any);
    };

    fetchSubscribers();
  }, []);

  const filterSubscribers = () => {
    const currentDate = moment();
    return subscribers.filter((subscriber) => {
      const expiryDate = moment(subscriber.membershipExpiryDate);
      const isExpired = expiryDate.isBefore(currentDate);
      const isActive = !isExpired;

      let passesFilter = true;

      if (filter === 'subscribed') passesFilter = isActive;
      if (filter === 'expired') passesFilter = isExpired;

      if (planFilter !== 'all') passesFilter = passesFilter && subscriber.membershipType === planFilter;

      if( subscriber.fullName.toLowerCase().includes(searchTerm.toLowerCase()))
        passesFilter = passesFilter;
      else 
        passesFilter = false;

      return passesFilter;
    });
  };

  const sendMessageOnWhatsApp = (user) => {
    const phoneNumber = user.phone.replace(/[^0-9]/g, ''); // Ensure phone number is digits only
    const message = `Hello ${user.fullName},`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };


  const filteredSubscribers = filterSubscribers();

  return (
    <GymPanel>
      <div className='p-6'>
        <div className=" p-4 rounded-lg mb-6 flex justify-between items-center">
            <h1 className="text-3xl font-bold">Subscribers</h1>
            <button onClick={()=>navigate('/subscribe-gym')} className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
                Add Subscriber
            </button>
        </div>

      {/* Filter Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex">
          <button
            onClick={() => setFilter('all')}
            className={`mx-2 px-4 py-2 rounded ${filter === 'all' ? 'bg-blue-600' : 'bg-gray-700'} hover:bg-blue-700`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('subscribed')}
            className={`mx-2 px-4 py-2 rounded ${filter === 'subscribed' ? 'bg-blue-600' : 'bg-gray-700'} hover:bg-blue-700`}
          >
            Subscribed
          </button>
          <button
            onClick={() => setFilter('expired')}
            className={`mx-2 px-4 py-2 rounded ${filter === 'expired' ? 'bg-blue-600' : 'bg-gray-700'} hover:bg-blue-700`}
          >
            Expired
          </button>
        </div>
        <select
          value={planFilter}
          onChange={(e) => setPlanFilter(e.target.value)}
          className="bg-gray-700 text-white p-2 rounded"
        >
          <option value="all">All Plans</option>
          <option value="Premium Membership">Premium Membership</option>
          <option value="Basic Membership">Basic Membership</option>
          <option value="Standard Membership">Standard Membership</option>
        </select>
        <div className="flex items-center flex-1 px-6">
            <input
              type="text"
              placeholder="Search by member name."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-700 text-white p-2 rounded-l-md w-1/3 focus:outline-none"
            />
            <button className="bg-blue-600 text-white py-2 px-4 rounded-r-md hover:bg-blue-700">
              <img src={SearchIcon} alt="Search Icon" />
            </button>
          </div>
      </div>

  {/* Subscribers List */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {filteredSubscribers.map((subscriber) => {
      const daysLeft = moment(subscriber.membershipExpiryDate).diff(moment(), 'days');
      const isExpired = daysLeft < 0;
      return (
        <div key={subscriber.id} onClick={()=>navigate(`/subscriber/profile/${subscriber.id}`)} className=" bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg  duration-500 flex items-start">
          <img
            src={subscriber.profilePhoto}
            alt={`${subscriber.fullName}'s profile`}
            className="w-20 h-20 rounded-full mr-4 object-cover"
          />
          <div>
            <h2 className="text-xl font-bold">{subscriber.fullName}</h2>
            <p className="text-gray-400">{subscriber.email}</p>
            <p className="text-gray-400">{subscriber.phone}</p>
            <p className="mt-2 text-gray-300">Plan: {subscriber.membershipType}</p>
            <p className={`mt-1 ${isExpired ? 'text-red-500' : 'text-green-400'}`}>
              {isExpired ? 'Expired' : `${daysLeft} days left`} 
            </p>
            {isExpired && (
              <button className="mt-2 bg-green-600 hover:bg-green-700 text-white py-1 px-2 rounded">
                Renew
              </button>
            )}
          </div>
          <div className='flex-1 flex justify-end'>
            <img src={WhatsappIcon} onClick={()=>sendMessageOnWhatsApp(subscriber)} className='h-10 w-10 cursor-pointer'/>
            </div>
        </div>
      );
    })}
  </div>
      </div>
      </GymPanel>
  );
};

export default SubscriberList;
