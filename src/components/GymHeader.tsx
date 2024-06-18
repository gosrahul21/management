import { Link } from 'react-router-dom';

const GymHeader = ({ gymDetails }: any) => {
  return (
    <header className="bg-gray-800 p-4 sticky top-0 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{gymDetails.name}</h1>
          <p className="text-lg">{gymDetails.location}</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative dropdown">
            <button className="bg-gray-700 text-white px-4 py-2 rounded inline-flex items-center">
              <span className="mr-1">Menu</span>
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M0 0h20v20H0z" fill="none"/><path d="M5 8l5 5 5-5z"/></svg>
            </button>
            <ul className="dropdown-menu absolute hidden text-gray-700 pt-1 right-0">
              <li>
                <Link className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" to="/orders">Orders</Link>
              </li>
              <li>
                <Link className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" to="/settings">Settings</Link>
              </li>
              <li>
                <Link className="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" to="/others">Others</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <style>
        {`
          .dropdown:hover .dropdown-menu {
            display: block;
          }
        `}
      </style>
    </header>
  );
};

export default GymHeader;
