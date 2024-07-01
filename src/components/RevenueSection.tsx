import React from 'react';

const Revenue = ({ data, viewMode }) => {
  const totalRevenue = data.reduce((acc, item) => acc + item.amount, 0);

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Revenue ({viewMode})</h2>
      <p className="text-2xl font-semibold text-green-400">₹{totalRevenue}</p>
      {/* Add more detailed revenue display as needed */}
    </div>
  );
};

export default Revenue;
