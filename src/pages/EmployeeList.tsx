import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GymPanel from '../components/Gympanel';
import SearchIcon from '../assets/icons/search-icon.svg';
import Employees from '../config/employees';
import WhatsappIcon from '../assets/icons/whatsapp-icon.svg';

const EmployeeList = () => {
  const [employees, setEmployees] = useState<Record<string, string>[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Simulated fetch for employee data (replace with actual API call)
    const fetchEmployees = async () => {
      // Simulated data
      const data = [
        {
          id: 1,
          name: 'John Doe',
          email: 'john.doe@example.com',
          phone: '123-456-7890',
          profilePhoto: 'https://imgs.search.brave.com/jT7IUn2ncPcSP3ti97qt6nxlDHvMYHv9IuTNUnN_iyY/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9j/bG9zZS11cC1wb3J0/cmFpdC1hdHRyYWN0/aXZlLW1hbGUtbW9k/ZWwteW91bmctaGFu/ZHNvbWUtbWFuLWJh/cl8xNTg1OTUtNTEz/NC5qcGc_c2l6ZT02/MjYmZXh0PWpwZw',
          role: 'Manager',
        },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'jane.smith@example.com',
          phone: '098-765-4321',
          profilePhoto: 'https://imgs.search.brave.com/Hv5Z7zQWfTTqpwY_AQ5XBDcyQMr14UwMAB09ZkBrLrI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE0/OTQ3OTAxMDgzNzct/YmU5YzI5YjI5MzMw/P3E9ODAmdz0xMDAw/JmF1dG89Zm9ybWF0/JmZpdD1jcm9wJml4/bGliPXJiLTQuMC4z/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4elpX/RnlZMmg4TVRGOGZH/aGhjSEI1SlRJd1oy/bHliSHhsYm53d2ZI/d3dmSHg4TUE9PQ',
          role: 'Trainer',
        },
        // Add more employee data as needed
      ];
      setEmployees(Employees as any);
    };

    fetchEmployees();
  }, []);

  const filterEmployees = () => {
    return employees.filter((employee) =>
      employee.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const sendMessageOnWhatsApp = (user) => {
    const phoneNumber = user.phone.replace(/[^0-9]/g, ''); // Ensure phone number is digits only
    const message = `Hello ${user.name},`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const filteredEmployees = filterEmployees();

  return (
    <GymPanel>
      <div className='p-6'>
        <div className="p-4 rounded-lg mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Employees</h1>
          <button onClick={() => navigate('/add-employee')} className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
            Add Employee
          </button>
        </div>

        {/* Search Section */}
        <div className="flex items-center mb-6">
          <input
            type="text"
            placeholder="Search by employee name."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-700 text-white p-2 rounded-l-md w-1/3 focus:outline-none focus:ring-blue-700"
          />
          <button className="bg-blue-600 text-white py-2 px-4 rounded-r-md hover:bg-blue-700">
            <img src={SearchIcon} alt="Search Icon" />
          </button>
        </div>

        {/* Employees List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEmployees.map((employee) => (
            <div key={employee.id} onClick={() => navigate(`/employee-details/${employee.id}`)} className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg duration-500 flex items-start">
              <img
                src={employee.profilePhoto}
                alt={`${employee.name}'s profile`}
                className="w-20 h-20 rounded-full mr-4 object-cover"
              />
              <div>
                <h2 className="text-xl font-bold">{employee.name}</h2>
                <p className="text-gray-400">{employee.email}</p>
                <p className="text-gray-400">{employee.phone}</p>
                <p className="mt-2 text-gray-300">Role: {employee.role}</p>
              </div>
              <div className='flex-1 flex justify-end'>
                <img src={WhatsappIcon} onClick={() => sendMessageOnWhatsApp(employee)} className='h-10 w-10 cursor-pointer' />
              </div>
            </div>
          ))}
        </div>
      </div>
    </GymPanel>
  );
};

export default EmployeeList;
