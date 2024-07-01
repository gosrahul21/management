import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import Sidebar from '../components/Sidebar';

const Attendance = () => {
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [userType, setUserType] = useState('staff');
  const [attendances, setAttendances] = useState([]);

  const fetchAttendances = async () => {
    const response = await axios.get('http://localhost:5000/api/attendance');
    setAttendances(response.data);
  };

  useEffect(() => {
    fetchAttendances();
  }, []);

  const handleAttendance = async () => {
    const response = await axios.post('http://localhost:5000/api/attendance', {
      userId,
      userName,
      userType,
    });
    setAttendances([response.data, ...attendances]);
    setUserId('');
    setUserName('');
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-900 text-white min-h-screen p-6">
        <header className="bg-gray-800 p-4 rounded-lg mb-6">
          <h1 className="text-3xl font-bold">Mark Attendance</h1>
        </header>

        <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-bold mb-4">Mark Yourself Present</h2>
          <div className="mb-4">
            <label className="block text-gray-400">User ID</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="mt-1 block w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400">User Name</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400">User Type</label>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="mt-1 block w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="staff">Staff</option>
              <option value="member">Member</option>
            </select>
          </div>
          <button
            onClick={handleAttendance}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Mark Present
          </button>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Attendance Records</h2>
          <table className="min-w-full text-left text-gray-400">
            <thead>
              <tr>
                <th className="px-4 py-2">User Name</th>
                <th className="px-4 py-2">User Type</th>
                <th className="px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {attendances.map((attendance) => (
                <tr key={attendance._id} className="hover:bg-gray-700">
                  <td className="px-4 py-2">{attendance.userName}</td>
                  <td className="px-4 py-2">{attendance.userType}</td>
                  <td className="px-4 py-2">{moment(attendance.date).format('LL')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
