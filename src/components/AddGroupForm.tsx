import { useState } from "react";
import Input from "../widgets/Input";

const AddGroupForm = ({ onFormSubmit }: any) => {
  const [groupName, setGroupName] = useState("");
  const [weekdays, setWeekdays] = useState<string[]>([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleWeekdayChange = (day: string) => {
    if (weekdays.includes(day)) {
      setWeekdays(weekdays.filter((d) => d !== day));
    } else {
      setWeekdays([...weekdays, day]);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Handle form submission logic here
    try {
      onFormSubmit({
        groupName,
        weekdays,
        startTime,
        endTime,
      });
    } catch (error) {
      console.log("error occured on creating group");
    }

    // Reset form fields after submission if needed
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-dark-primary rounded-lg shadow-md"
    >
      <div className="mb-4">
        <label
          htmlFor="groupName"
          className="block text-sm font-medium text-gray-200"
        >
          Group Name:
        </label>
        <Input
          type="text"
          id="groupName"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-200">
          Weekdays:
        </label>
        <div className="mt-1 grid grid-cols-7 gap-2">
          {[
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ].map((day) => (
            <label key={day} className="flex items-center text-gray-200">
              <input
                type="checkbox"
                value={day}
                checked={weekdays.includes(day)}
                onChange={() => handleWeekdayChange(day)}
                className="rounded text-blue-500 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm">{day}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label
          htmlFor="startTime"
          className="block text-sm font-medium text-gray-200"
        >
          Start Time:
        </label>
        <input
          type="time"
          id="startTime"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          // className="w-full p-2 bg-gray-700 border border-gray-600 rounded mb-4 text-white"

          className="mt-1 block w-full px-3 py-2 rounded-md  bg-gray-700 border border-gray-600 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="endTime"
          className="block text-sm font-medium text-gray-200"
        >
          End Time:
        </label>
        <input
          type="time"
          id="endTime"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="mt-1 block w-full px-3 py-2 rounded-md  bg-gray-700 border border-gray-600 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Add Group
      </button>
    </form>
  );
};

export default AddGroupForm;
