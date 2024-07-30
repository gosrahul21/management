import { useState, useEffect } from "react";
import GymPanel from "../components/Gympanel";

const Notifications = () => {
  const [notifications, setNotifications] = useState<any>([]);

  useEffect(() => {
    // Fetch notifications data (replace with actual API call)
    const fetchNotifications = async () => {
      const data = [
        { id: 1, message: "New member joined!", date: "2024-06-28" },
        {
          id: 2,
          message: "Yoga class rescheduled to 10:00 AM.",
          date: "2024-06-27",
        },
        {
          id: 3,
          message: "Don't miss our Boxing class tomorrow!",
          date: "2024-06-26",
        },
        { id: 4, message: "Membership renewal reminder.", date: "2024-06-25" },
        { id: 5, message: "New discounts on supplements.", date: "2024-06-24" },
        {
          id: 6,
          message: "Upcoming event: Summer Bootcamp.",
          date: "2024-06-23",
        },
        {
          id: 7,
          message: "New personal training slots available.",
          date: "2024-06-22",
        },
        {
          id: 8,
          message: "Locker room maintenance scheduled.",
          date: "2024-06-21",
        },
        { id: 9, message: "Join our new Pilates class!", date: "2024-06-20" },
        {
          id: 10,
          message: "Your feedback matters - leave a review.",
          date: "2024-06-19",
        },
      ];
      setNotifications(data);
    };

    fetchNotifications();
  }, []);

  return (
    <GymPanel>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Notifications</h1>
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-gray-400">Message</th>
                <th className="px-4 py-2 text-left text-gray-400">Date</th>
              </tr>
            </thead>
            <tbody>
              {notifications.map((notification: any) => (
                <tr key={notification.id} className="hover:bg-gray-700">
                  <td className="px-4 py-2 text-white">
                    {notification.message}
                  </td>
                  <td className="px-4 py-2 text-gray-400">
                    {notification.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </GymPanel>
  );
};

export default Notifications;
