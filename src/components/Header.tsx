import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gym Management</h1>
        <nav>
          <Link to="/dashboard" className="text-white mr-4 hover:text-gray-300">Dashboard</Link>
          <Link to="/create-gym" className="text-white mr-4 hover:text-gray-300">Create Gym</Link>
          <Link to="/add-employee" className="text-white mr-4 hover:text-gray-300">Add Employee</Link>
          <Link to="/add-subscription" className="text-white mr-4 hover:text-gray-300">Add Subscription</Link>
          <Link to="/" className="text-white hover:text-gray-300">Logout</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
