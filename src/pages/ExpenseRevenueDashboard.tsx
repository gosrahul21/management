import { useState } from "react";
import GymPanel from "../components/Gympanel";
import RevenueExpensesTable from "../components/RevenueExpenseTable";
import Expense from "../components/ExpenseSection";
import Revenue from "../components/RevenueSection";

const ExpenseRevenueDashboard = () => {
  const [activeTab, setActiveTab] = useState<any>("revenue");
  const [viewMode, setViewMode] = useState<any>("monthly");

  // Mock data for demonstration
  const monthlyRevenueData = [
    {
      id: 1,
      description: "Basic Membership",
      amount: 5000,
      date: "2024-06-01",
    },
    {
      id: 2,
      description: "Premium Membership",
      amount: 8000,
      date: "2024-06-02",
    },
    // Add more monthly revenue items as needed
  ];

  const yearlyRevenueData = [
    {
      id: 1,
      description: "Basic Membership",
      amount: 260000,
      date: "2023-01-01",
    },
    {
      id: 2,
      description: "Premium Membership",
      amount: 96000,
      date: "2023-01-01",
    },
    {
      id: 2,
      description: "Standard Membership",
      amount: 196000,
      date: "2023-01-01",
    },

    // Add more yearly revenue items as needed
  ];

  const monthlyExpenseData = [
    { id: 1, description: "Utilities", amount: 1500, date: "2024-06-05" },
    { id: 2, description: "Rent", amount: 3000, date: "2024-06-10" },
    // Add more monthly expense items as needed
  ];

  const yearlyExpenseData = [
    { id: 1, description: "Utilities", amount: 18000, date: "2023-01-01" },
    { id: 2, description: "Rent", amount: 36000, date: "2023-01-01" },
    // Add more yearly expense items as needed
  ];

  const toggleViewMode = () => {
    setViewMode((prevMode: any) => (prevMode === "monthly" ? "yearly" : "monthly"));
  };

  const getCurrentData = (type: any) => {
    if (type === "revenue") {
      return viewMode === "monthly" ? monthlyRevenueData : yearlyRevenueData;
    } else {
      return viewMode === "monthly" ? monthlyExpenseData : yearlyExpenseData;
    }
  };

  return (
    <GymPanel>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Revenue & Expenses</h1>
          <button
            onClick={toggleViewMode}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded focus:outline-none hover:bg-gray-300"
          >
            {viewMode === "monthly" ? "Switch to Yearly" : "Switch to Monthly"}
          </button>
        </div>
        <div className="grid grid-cols-2 gap-6 mb-6">
          <Revenue data={getCurrentData("revenue")} viewMode={viewMode} />
          <Expense data={getCurrentData("expense")} viewMode={viewMode} />
        </div>
        <div className="flex items-center justify-start mb-6">
          <button
            onClick={() => setActiveTab("revenue")}
            className={`mr-4 px-4 py-2 rounded focus:outline-none ${
              activeTab === "revenue"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            Revenue
          </button>
          <button
            onClick={() => setActiveTab("expenses")}
            className={`px-4 py-2 rounded focus:outline-none ${
              activeTab === "expenses"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            Expenses
          </button>
        </div>
        {activeTab === "revenue" && (
          <RevenueExpensesTable
            data={getCurrentData("revenue")}
            type="revenue"
            darkMode
          />
        )}

        {activeTab === "expenses" && (
          <RevenueExpensesTable
            data={getCurrentData("expense")}
            type="expenses"
            darkMode
          />
        )}
      </div>
    </GymPanel>
  );
};

export default ExpenseRevenueDashboard;
