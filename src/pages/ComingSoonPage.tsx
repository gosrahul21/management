import React from 'react';
import { Link } from 'react-router-dom';
import 'tailwindcss/tailwind.css'; // Ensure Tailwind CSS is imported

const ComingSoonPage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col justify-center items-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 animate-pulse">Coming Soon</h1>
        <p className="text-xl mb-8">
          We are working hard to bring you a new experience. Stay tuned!
        </p>
        <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-full text-lg transition-transform transform hover:scale-110">
          Go Back Home
        </Link>
      </div>
      <div className="mt-12">
        <img
          src="https://via.placeholder.com/400"
          alt="Coming Soon Illustration"
          className="w-64 h-64 object-cover rounded-full border-4 border-blue-600 shadow-lg"
        />
      </div>
      <div className="absolute bottom-4 text-gray-500 text-sm">
        © 2024 SharpEdge Software. All rights reserved.
      </div>
    </div>
  );
};

export default ComingSoonPage;
