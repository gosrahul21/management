import React, { useState, useEffect, ChangeEvent } from "react";
import SearchIcon from "../assets/icons/search-icon.svg"; // Add the correct path to your search icon
import Input from "../widgets/Input";

interface Employee {
  id: number;
  name: string;
}

interface EmployeeSearchProps {
  onSelect: (employee: Employee) => void;
}

const EmployeeSearch: React.FC<EmployeeSearchProps> = ({ onSelect }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    // Simulated fetch for employee data (replace with actual API call)
    const fetchEmployees = async () => {
      const data: Employee[] = [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Smith" },
        { id: 3, name: "Alice Johnson" },
        // Add more employees as needed
      ];
      setEmployees(data);
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    const filtered = employees.filter((employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEmployees(filtered);
  }, [searchTerm, employees]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleEmployeeSelect = (employee: Employee) => {
    onSelect(employee);
    setSearchTerm("");
  };

  return (
    <div className="relative mb-4">
      <div className="relative">
        <Input
          id="employee-search"
          type="text"
          placeholder="Search for an employee"
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded pl-10"
        />
        <img
          src={SearchIcon}
          alt="Search Icon"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
        />
      </div>
      {searchTerm && (
        <div className="absolute z-10 w-full bg-gray-800 border border-gray-600 rounded mt-1">
          {filteredEmployees.map((employee) => (
            <div
              key={employee.id}
              onClick={() => handleEmployeeSelect(employee)}
              className="p-2 hover:bg-gray-700 cursor-pointer"
            >
              {employee.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeSearch;
