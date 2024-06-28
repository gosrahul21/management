import React, { useState, useEffect } from 'react';
import GymPanel from '../components/Gympanel';
import Modal from '../components/Modal';
import SalaryForm from '../components/SalaryForm'; // Assuming this component handles salary forms
import { useNavigate } from 'react-router-dom';

const SalaryManagementPage = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isAddEditFormOpen, setIsAddEditFormOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch employees data (replace with actual API call)
    const fetchEmployees = async () => {
      const data = [
        {
          id: 1,
          name: 'John Doe',
          position: 'Software Engineer',
          department: 'IT',
          baseSalary: 50000,
          bonus: 5000,
          deductions: 2000,
        },
        // Add more employee data as needed
      ];
      setEmployees(data);
    };

    fetchEmployees();
  }, []);

  const openAddEditForm = (employee) => {
    setSelectedEmployee(employee);
    setIsAddEditFormOpen(true);
  };

  const closeAddEditForm = () => {
    setSelectedEmployee(null);
    setIsAddEditFormOpen(false);
  };

  return (
    <GymPanel>
      <div className='p-6'>
        <Modal isOpen={isAddEditFormOpen} onClose={closeAddEditForm} title={selectedEmployee ? "Edit Salary" : "Add Salary"}>
          <SalaryForm employee={selectedEmployee} onSubmit={closeAddEditForm} />
        </Modal>
        <div className="p-4 rounded-lg mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Salary Management</h1>
          <button onClick={() => openAddEditForm(null)} className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
            Add Salary
          </button>
        </div>

        {/* Employee Salary Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {employees.map((employee) => (
            <div key={employee.id} className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg duration-500 flex items-start cursor-pointer"
              onClick={() => navigate(`/employee/profile/${employee.id}`)}>
              <div>
                <h2 className="text-xl font-bold">{employee.name}</h2>
                <p className="text-gray-400">Position: {employee.position}</p>
                <p className="text-gray-400">Department: {employee.department}</p>
                <p className="text-gray-400">Base Salary: ${employee.baseSalary}</p>
                <p className="text-gray-400">Bonus: ${employee.bonus}</p>
                <p className="text-gray-400">Deductions: ${employee.deductions}</p>
              </div>
              <div className="ml-auto">
                <button onClick={() => openAddEditForm(employee)} className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded ml-2">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </GymPanel>
  );
};

export default SalaryManagementPage;
