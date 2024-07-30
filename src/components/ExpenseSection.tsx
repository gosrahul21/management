import React from 'react';

interface ExpenseItem {
  id: number;
  description: string;
  amount: number;
  date: string;
}

interface ExpenseProps {
  data: ExpenseItem[];
  viewMode: "summary" | "detailed";
}

const Expense: React.FC<ExpenseProps> = ({ data, viewMode }) => {
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
