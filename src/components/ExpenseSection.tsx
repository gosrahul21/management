import React from 'react';

const Expense = ({ data, viewMode }) => {
  const totalExpense = data.reduce((acc, item) => acc + item.amount, 0);

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Expenses ({viewMode})</h2>
      <p className="text-2xl font-semibold text-red-400">₹{totalExpense}</p>
      {/* Add more detailed expense display as needed */}
    </div>
  );
};

export default Expense;
