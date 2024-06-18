import { Link } from 'react-router-dom';

const SubscribeButton = () => {
  return (
    <Link to="/subscribe-gym" className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
      Subscribe to Gym
    </Link>
  );
};

export default SubscribeButton;
