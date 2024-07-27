import { useState, useEffect } from "react";
import Input from "../widgets/Input";
import { MdDelete } from "react-icons/md";

interface Group {
  _id?: string;
  groupName: string;
  gymId: string;
  weekdays: string[];
  startTime: string;
  endTime: string;
}

interface AddGroupFormProps {
  initialGroupData?: Group;
  onFormSubmit: (groupData: any) => void;
  onDelete?: (groupId: string) => void;
}

const AddGroupForm = ({ initialGroupData, onFormSubmit, onDelete }: AddGroupFormProps) => {
  const [groupName, setGroupName] = useState(initialGroupData?.groupName || "");
  const [weekdays, setWeekdays] = useState<string[]>(initialGroupData?.weekdays || []);
  const [startTime, setStartTime] = useState(initialGroupData?.startTime || "");
  const [endTime, setEndTime] = useState(initialGroupData?.endTime || "");

  useEffect(() => {
    if (initialGroupData) {
      setGroupName(initialGroupData.groupName);
      setWeekdays(initialGroupData.weekdays);
      setStartTime(initialGroupData.startTime);
      setEndTime(initialGroupData.endTime);
    }
  }, [initialGroupData]);

  const handleWeekdayChange = (day: string) => {
    if (weekdays.includes(day)) {
      setWeekdays(weekdays.filter((d) => d !== day));
    } else {
      setWeekdays([...weekdays, day]);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      onFormSubmit({
        groupName,
        weekdays,
        startTime,
        endTime,
      });
    } catch (error) {
      console.log("error occurred on creating group");
    }
  };

  const handleDelete = () => {
    if (initialGroupData?._id && onDelete) {
      onDelete(initialGroupData._id);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-dark-primary rounded-lg shadow-md">
      <div className="mb-4">
        <label htmlFor="groupName" className="block text-sm font-medium text-gray-200">
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
        <label className="block text-sm font-medium text-gray-200">Weekdays:</label>
        <div className="mt-1 grid grid-cols-7 gap-2">
          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
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
        <label htmlFor="startTime" className="block text-sm font-medium text-gray-200">
          Start Time:
        </label>
        <input
          type="time"
          id="startTime"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="mt-1 block w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="endTime" className="block text-sm font-medium text-gray-200">
          End Time:
        </label>
        <input
          type="time"
          id="endTime"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="mt-1 block w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          required
        />
      </div>
      <div className="flex justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          {initialGroupData ? "Update Group" : "Add Group"}
        </button>
        {initialGroupData && (
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            <MdDelete size={18}/> 
          </button>
        )}
      </div>
    </form>
  );
};

export default AddGroupForm;
