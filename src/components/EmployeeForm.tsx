import React, { useState } from 'react';

const mockCheckUserExists = async (username) => {
  // Mock API call to check if the user exists
  // Replace this with your actual API call
  const existingUsers = ['existingUser1', 'existingUser2'];
  return existingUsers.includes(username);
};

const mockCreateUser = async (username) => {
  // Mock API call to create a new user
  // Replace this with your actual API call
  return { userId: 'new_user_id' }; // Mock response
};

const EmployeeForm = () => {
  const [name, setName] = useState('');
  const [employeeType, setEmployeeType] = useState('');
  const [userExists, setUserExists] = useState(null); // null, true, false
  const [isSubmitting, setIsSubmitting] = useState(false);
  const employeeTypes = ['Trainer', 'Admin', 'Cleaner'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const exists = await mockCheckUserExists(name);
      setUserExists(exists);

      if (!exists) {
        const newUser = await mockCreateUser(name);
        const newEmployee = {
          name,
          employeeType,
          userId: newUser.userId,
        };
        console.log('New User and Employee Added:', newEmployee);
        // Save the new employee to the database
      } else {
        const newEmployee = {
          name,
          employeeType,
          userId: 'existing_user_id', // Replace with actual user ID from your check
        };
        console.log('Existing User Added as Employee:', newEmployee);
        // Save the employee to the database
      }
    } catch (error) {
      console.error('Error checking user existence or creating user:', error);
    } finally {
      setIsSubmitting(false);
    }
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
        disabled={isSubmitting}
      />
      {userExists === false && (
        <div className="mb-4 text-red-500">
          User does not exist. A new user will be created.
        </div>
      )}
      <label className="block mb-2">Employee Type</label>
      <select
        value={employeeType}
        onChange={(e) => setEmployeeType(e.target.value)}
        className="w-full p-2 bg-gray-700 border border-gray-600 rounded mb-4 text-white"
        required
        disabled={isSubmitting}
      >
        <option value="">Select Employee Type</option>
        {employeeTypes.map((type) => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>
      <button
        type="submit"
        className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Processing...' : 'Add Employee'}
      </button>
    </form>
  );
};

export default EmployeeForm;
