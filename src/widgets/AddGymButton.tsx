import { Link } from 'react-router-dom';
import AddIcon from '../assets/icons/'
const AddGymButton = () => {
  return (
    <Link to="/add-gym" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
      Add Gym
    </Link>
  );
};

export default AddGymButton;
