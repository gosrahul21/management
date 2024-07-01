import React, { useState } from 'react';

const SalaryForm = ({ employee, onSubmit }) => {
  const [formData, setFormData] = useState({
    baseSalary: employee ? employee.baseSalary : '',
    bonus: employee ? employee.bonus : '',
    deductions: employee ? employee.deductions : '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic (e.g., API call)
    onSubmit(formData); // Passing form data to onSubmit function
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="baseSalary">
          Base Salary
        </label>
        <input
          type="number"
          name="baseSalary"
          value={formData.baseSalary}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="bonus">
          Bonus
        </label>
        <input
          type="number"
          name="bonus"
          value={formData.bonus}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="deductions">
          Deductions
        </label>
        <input
          type="number"
          name="deductions"
          value={formData.deductions}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {employee ? 'Update' : 'Add'} Salary
        </button>
      </div>
    </form>
  );
};

export default SalaryForm;
