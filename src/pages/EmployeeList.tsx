// components/EmployeeList.js
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GymPanel from "../components/Gympanel";
import SearchIcon from "../assets/icons/search-icon.svg";
import WhatsappIcon from "../assets/icons/whatsapp-icon.svg";
import { getEmployees } from "../service/employees/getEmployees";

const EmployeeList = () => {
  const [employees, setEmployees] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { gymId } = useParams();

  useEffect(() => {
    if (!gymId) return;

    fetchEmployees();
  }, [gymId]);

  const fetchEmployees = async () => {
    try {
      const data = await getEmployees(gymId!);
      setEmployees(data);
    } catch (error: any) {
      setError(error.message || "Failed to fetch employees");
    } finally {
      setIsLoading(false);
    }
  };

  const filterEmployees = () => {
    return employees.filter((employee: any) =>
      employee.userId.firstName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const sendMessageOnWhatsApp = (user: any) => {
    const phoneNumber = user.phone.replace(/[^0-9]/g, ""); // Ensure phone number is digits only
    const message = `Hello ${user.name},`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  const filteredEmployees = filterEmployees();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <GymPanel>
      <div className="p-6">
        <div className="p-4 rounded-lg mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Employees</h1>
          <button
            onClick={() => navigate(`/gym/${gymId}/add-employee`)}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
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
          {filteredEmployees.map((employee: any) => (
            <div
              key={employee._id}
              onClick={() => navigate(`/employee-details/${employee._id}`)}
              className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg duration-500 flex items-start"
            >
              <img
                src={`${import.meta.env.VITE_BACKEND_URI}/image/${employee.userId.image}`}
                alt={`${employee.name}'s profile`}
                className="w-20 h-20 rounded-full mr-4 object-cover"
              />
              <div>
                <h2 className="text-xl font-bold">{employee.userId.firstName} {employee.userId.lastName}</h2>
                <p className="text-gray-400">{employee.email}</p>
                <p className="text-gray-400">{employee.phoneNo}</p>
                <p className="mt-2 text-gray-300">Role: {employee.role}</p>
              </div>
              <div className="flex-1 flex justify-end">
                <img
                  src={WhatsappIcon}
                  onClick={(e) => {
                    e.stopPropagation();
                    sendMessageOnWhatsApp(employee);
                  }}
                  className="h-10 w-10 cursor-pointer"
                  alt="WhatsApp Icon"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </GymPanel>
  );
};

export default EmployeeList;
