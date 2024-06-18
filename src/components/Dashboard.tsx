import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <header className="bg-primary text-white p-4">
        <h1 className="text-3xl">Dashboard</h1>
      </header>
      <main className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link to="/create-gym" className="bg-primary text-white p-4 rounded shadow">
            Create Gym
          </Link>
          <Link to="/add-employee" className="bg-secondary text-white p-4 rounded shadow">
            Add Employee
          </Link>
          <Link to="/add-subscription" className="bg-primary text-white p-4 rounded shadow">
            Add Subscription
          </Link>
          <Link to="/subscribe-gym" className="bg-secondary text-white p-4 rounded shadow">
            Subscribe to Gym
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
