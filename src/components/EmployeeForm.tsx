import { useState } from 'react';

const EmployeeForm = () => {
  const [name, setName] = useState('');
  const [employeeType, setEmployeeType] = useState('');
  const employeeTypes = ['Trainer', 'Admin', 'Cleaner'];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEmployee = {
      name,
      employeeType,
      userId: 'user_id_here', // Replace with actual user ID from your application state or context
    };
    console.log(newEmployee);
    // You can implement API calls or state management logic here to save the employee
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded shadow-md text-white">
      <h2 className="text-2xl mb-4">Add Employee</h2>
      <label className="block mb-2">Username</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 bg-gray-700 border border-gray-600 rounded mb-4 text-white"
        required
      />
      <label className="block mb-2">Employee Type</label>
      <select
        value={employeeType}
        onChange={(e) => setEmployeeType(e.target.value)}
        className="w-full p-2 bg-gray-700 border border-gray-600 rounded mb-4 text-white"
        required
      >
        <option value="">Select Employee Type</option>
        {employeeTypes.map((type) => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>
      <button type="submit" className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700">
        Add Employee
      </button>
    </form>
  );
};

export default EmployeeForm;
