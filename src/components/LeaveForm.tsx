import React, { useState } from "react";
import { FaSave, FaTimes } from "react-icons/fa";
import EmployeeSearch from "./EmployeeSearch"; // Import the EmployeeSearch component
import Input from "../widgets/Input";

const LeaveForm = ({ leave, onSave, onClose }) => {
  const [employee, setEmployee] = useState(leave ? leave.employee : null);
  const [startDate, setStartDate] = useState(leave ? leave.startDate : "");
  const [endDate, setEndDate] = useState(leave ? leave.endDate : "");
  const [type, setType] = useState(leave ? leave.type : "");
  const [comments, setComments] = useState(leave ? leave.comments : "");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!employee || !startDate || !endDate || !type) {
      setError("All fields are required.");
      return;
    }
    if (new Date(startDate) > new Date(endDate)) {
      setError("End date should be after start date.");
      return;
    }

    // Save the leave request
    onSave({ id: leave?.id, employee, startDate, endDate, type, comments });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 md:w-[30vw]">
      {error && <p className="text-red-500">{error}</p>}

      {/* Employee Search */}
      <EmployeeSearch onSelect={(emp) => setEmployee(emp)} />
      <div className="mb-4 p-2 bg-gray-700 text-white rounded min-h-[40px] flex items-center">
        {employee ? `${employee.name}` : "No employee selected"}
      </div>

      <div>
        <label
          htmlFor="startDate"
          className="block text-sm font-medium text-gray-300"
        >
          Start Date
        </label>
        <Input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="mt-1 block w-full p-2 bg-gray-700 text-white border border-gray-600 rounded"
          required
        />
      </div>

      <div>
        <label
          htmlFor="endDate"
          className="block text-sm font-medium text-gray-300"
        >
          End Date
        </label>
        <Input
          type="date"
          id="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="mt-1 block w-full p-2 bg-gray-700 text-white border border-gray-600 rounded"
          required
        />
      </div>

      <div>
        <label
          htmlFor="type"
          className="block text-sm font-medium text-gray-300"
        >
          Leave Type
        </label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="mt-1 block w-full p-2 bg-gray-700 text-white border border-gray-600 rounded"
          required
        >
          <option value="">Select Type</option>
          <option value="Sick Leave">Sick Leave</option>
          <option value="Annual Leave">Annual Leave</option>
          <option value="Maternity Leave">Maternity Leave</option>
          {/* Add more leave types as needed */}
        </select>
      </div>

      <div>
        <label
          htmlFor="comments"
          className="block text-sm font-medium text-gray-300"
        >
          Comments
        </label>
        <textarea
          id="comments"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          className="mt-1 block w-full p-2 bg-gray-700 text-white border border-gray-600 rounded"
          rows="3"
        />
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 flex items-center"
          onClick={onClose}
        >
          <FaTimes className="mr-2" /> Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 flex items-center"
        >
          <FaSave className="mr-2" /> Save
        </button>
      </div>
    </form>
  );
};

export default LeaveForm;
