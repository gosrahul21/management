import React, { act, useState } from 'react';
import GymPanel from '../components/Gympanel';
import RevenueExpensesTable from '../components/RevenueExpenseTable';
import Expense from '../components/Expense';
import Revenue from '../components/Revenue';

const ExpenseRevenueDashboard = () => {
  const [activeTab, setActiveTab] = useState('revenue');


  // Mock data for demonstration
  const revenueData = [
    { id: 1, description: 'Basic Membership', amount: 5000, date: '2024-06-01' },
    { id: 2, description: 'Premium Membership', amount: 8000, date: '2024-06-02' },
    // Add more revenue items as needed
  ];

  const expenseData = [
    { id: 1, description: 'Utilities', amount: 1500, date: '2024-06-05' },
    { id: 2, description: 'Rent', amount: 3000, date: '2024-06-10' },
    // Add more expense items as needed
  ];

  return (
    <GymPanel>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className='grid grid-cols-2'>
          <Revenue/>
          <Expense/>
        </div>
        <div className="flex items-center justify-start mb-6">
          <button
            onClick={() => setActiveTab('revenue')}
            className={`mr-4 px-4 py-2 rounded focus:outline-none ${activeTab === 'revenue' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            Revenue
          </button>
          <button
            onClick={() => setActiveTab('expenses')}
            className={`px-4 py-2 rounded focus:outline-none ${activeTab === 'expenses' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            Expenses
          </button>
        </div>
        {/* {activeTab==='revenue'?<Expense/>:<Revenue/>} */}
        {activeTab === 'revenue' && (
          <RevenueExpensesTable data={revenueData} type="revenue" darkMode />
        )}

        {activeTab === 'expenses' && (
          <RevenueExpensesTable data={expenseData} type="expense" darkMode />
        )}
      </div>
    </GymPanel>
  );
};

export default ExpenseRevenueDashboard;
