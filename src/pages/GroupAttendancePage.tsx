import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';;
import Modal from '../components/Modal';
import AttendanceForm from '../components/AttendanceForm'; // Form component to add/edit attendance
import AttendanceCalendar from '../components/AttendanceCalendar'; // Calendar view component
import GymPanel from '../components/Gympanel';
import AttendanceTrends from '../components/AttendanceTrend';

const GroupAttendancePage = () => {
  const [groups, setGroups] = useState<any>([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch groups data (replace with actual API call)
    const fetchGroups = async () => {
      const data = [
        { id: 1, name: 'Yoga Class' },
        { id: 2, name: 'Boxing Class' },
        // Add more group data as needed
      ];
      setGroups(data);
    };

    fetchGroups();
  }, []);

  useEffect(() => {
    if (selectedGroup) {
      // Fetch attendance records for the selected group (replace with actual API call)
      const fetchAttendanceRecords = async () => {
        const data = [
          {
            id: 1,
            date: '2024-06-01',
            time: '9:00 AM',
            participants: [
              { name: 'John Doe', status: 'Present' },
              { name: 'Jane Smith', status: 'Absent' },
            ],
          },
          // Add more attendance records as needed
        ];
        setAttendanceRecords(data);
      };

      fetchAttendanceRecords();
    }
  }, [selectedGroup]);

  const openForm = (record = null) => {
    setSelectedRecord(record);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setSelectedRecord(null);
    setIsFormOpen(false);
  };

  return (
    <GymPanel>
      <div className="p-6">
        <Modal isOpen={isFormOpen} onClose={closeForm} title={selectedRecord ? 'Edit Attendance' : 'Add Attendance'}>
          <AttendanceForm record={selectedRecord} onSubmit={closeForm} />
        </Modal>
        <div className="p-4 rounded-lg mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Group Attendance</h1>
          <button onClick={() => openForm()} className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
            Add Attendance
          </button>
        </div>

        {/* Group Selection */}
        <div className="mb-6">
          <select
            className="bg-gray-700 text-white p-2 rounded w-full"
            value={selectedGroup ? selectedGroup.id : ''}
            onChange={(e) => setSelectedGroup(groups.find((group) => group.id === parseInt(e.target.value)))}
          >
            <option value="" disabled>Select Group</option>
            {groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
        </div>

        {/* Attendance Calendar */}
        <AttendanceCalendar records={attendanceRecords} />

        {/* Attendance List */}
        <div className="grid grid-cols-1 gap-6">
          {attendanceRecords.map((record) => (
            <div key={record.id} className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg duration-500">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold">{record.date}</h2>
                  <p className="text-gray-400">Time: {record.time}</p>
                </div>
                <button
                  onClick={() => openForm(record)}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded"
                >
                  Edit
                </button>
              </div>
              <div className="mt-4">
                {record.participants.map((participant, index) => (
                  <p key={index} className="text-gray-400">
                    {participant.name}: {participant.status}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Attendance Trends */}
        <div className="mt-6">
          <AttendanceTrends records={attendanceRecords} />
        </div>
      </div>
    </GymPanel>
  );
};

export default GroupAttendancePage;
