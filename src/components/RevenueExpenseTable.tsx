import { useState } from "react";
import Modal from "./Modal";

interface Item {
  id: number;
  description: string;
  amount: number;
  date: string;
}

interface RevenueExpensesTableProps {
  data: Item[];
  type: "revenue" | "expenses";
  darkMode: boolean;
}

const RevenueExpensesTable = ({ data, type, darkMode }: RevenueExpensesTableProps) => {
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState<boolean>(false);

  const tableHeaderClass = darkMode ? "bg-gray-800 text-white" : "bg-gray-200";
  const tableRowClass = darkMode ? "bg-gray-700" : "bg-white";
  const tableRowHoverClass = darkMode ? "hover:bg-gray-600" : "hover:bg-gray-300";
  const addButtonClass = "bg-blue-500 hover:bg-blue-600";

  const openExpenseModal = () => setIsExpenseModalOpen(true);
  const closeExpenseModal = () => setIsExpenseModalOpen(false);

  const handleEditExpense = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Logic to handle editing expense
    closeExpenseModal(); // Close the modal after editing
  };

  return (
    <div
      className={`shadow-md rounded my-6 ${
        darkMode ? "dark:bg-gray-800" : "bg-white"
      }`}
    >
      <div className={`flex justify-between ${tableHeaderClass} px-6 py-2`}>
        <h2 className="text-lg font-semibold">
          {type === "revenue" ? "Revenue" : "Expenses"}
        </h2>
        <button
          onClick={openExpenseModal}
          className={`px-4 py-1 rounded text-white focus:outline-none ${addButtonClass}`}
        >
          Add {type === "revenue" ? "Revenue" : "Expense"}
        </button>
      </div>
      <div className="overflow-x-auto">
        <table
          className={`min-w-full ${
            darkMode ? "dark:bg-gray-800" : "bg-white"
          } text-gray-700`}
        >
          <thead className={tableHeaderClass}>
            <tr>
              <th className="w-1/3 py-2 px-4 font-semibold text-left">
                {type === "revenue" ? "Description" : "Expense Item"}
              </th>
              <th className="w-1/3 py-2 px-4 font-semibold text-left">
                Amount
              </th>
              <th className="w-1/3 py-2 px-4 font-semibold text-left">Date</th>
              <th className="w-1/3 py-2 px-4 font-semibold text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {data.map((item) => (
              <tr
                key={item.id}
                className={`${tableRowClass} ${tableRowHoverClass}`}
              >
                <td
                  className={`border px-4 py-2 ${
                    darkMode
                      ? "dark:border-gray-700 text-white"
                      : "border-gray-300"
                  }`}
                >
                  {item.description}
                </td>
                <td
                  className={`border px-4 py-2 ${
                    darkMode
                      ? "dark:border-gray-700 text-white"
                      : "border-gray-300"
                  }`}
                >
                  ${item.amount.toFixed(2)}
                </td>
                <td
                  className={`border px-4 py-2 ${
                    darkMode
                      ? "dark:border-gray-700 text-white"
                      : "border-gray-300"
                  }`}
                >
                  {item.date}
                </td>
                <td
                  className={`border flex gap-1 px-4 py-2 ${
                    darkMode
                      ? "dark:border-gray-700 text-white"
                      : "border-gray-300"
                  }`}
                >
                  <button
                    className={`px-2 py-1 rounded text-white focus:outline-none ${
                      darkMode
                        ? "bg-blue-500 hover:bg-blue-600"
                        : "bg-blue-400 hover:bg-blue-500"
                    }`}
                  >
                    Edit
                  </button>
                  <button
                    className={`ml-2 px-2 py-1 rounded text-white focus:outline-none ${
                      darkMode
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-red-400 hover:bg-red-500"
                    }`}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isExpenseModalOpen}
        onClose={closeExpenseModal}
        title="Edit Expense"
      >
        <form onSubmit={handleEditExpense} className="space-y-4 gap-1">
          {/* Form fields for editing expense */}
          <label htmlFor="expenseAmount" className="block text-gray-100 text-sm font-bold mb-2">
            Expense Amount:
          </label>
          <input
            type="text"
            id="expenseAmount"
            name="expenseAmount"
            className="bg-gray-700 border border-gray-600 rounded mb-4 text-white ml-1 p-2"
            // Add necessary onChange handlers
            // Set initial values using state or props
          />

          {/* Add more form fields as needed */}

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500"
              onClick={closeExpenseModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
            >
              Save
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default RevenueExpensesTable;
