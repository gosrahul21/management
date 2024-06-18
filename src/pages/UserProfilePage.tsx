import moment from 'moment';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement } from 'chart.js';
import QRCode from 'react-qr-code';
import GymPanel from '../components/Gympanel';
import { useParams } from 'react-router-dom';
import users from '../config/user';
import WhatsappIcon from '../assets/icons/whatsapp-icon.svg'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement);

const UserProfile = () => {
  const {id} = useParams();
  const user = users[parseInt(id!)-1];
  // Mock data for visualizations
  const attendanceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Visits',
        data: [10, 12, 8, 15, 20, 18, 14, 22, 19, 23, 25, 30],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const activityData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Classes',
        data: [2, 3, 4, 1],
        fill: false,
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
      {
        label: 'PT Sessions',
        data: [1, 2, 1, 3],
        fill: false,
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
    ],
  };

  const healthData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Weight (kg)',
        data: [75, 74.5, 74, 73.5],
        fill: false,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const bmiData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'BMI',
        data: [24.5, 24.3, 24.0, 23.8],
        fill: false,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const caloriesData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Calories Burned (kcal)',
        data: [2000, 2100, 2200, 2300],
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const sendMessageOnWhatsApp = () => {
    const phoneNumber = user.phone.replace(/[^0-9]/g, ''); // Ensure phone number is digits only
    const message = `Hello ${user.fullName},`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };


  return (
    <GymPanel>
      <div className="bg-gray-900 text-white min-h-screen p-6">
        <header className="bg-gray-800 p-4 rounded-lg mb-6 flex justify-start items-center">
          <h1 className="text-3xl font-bold">User Profile</h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col md:flex-row items-start">
            <img
              src={user.profilePhoto}
              alt={`${user.fullName}'s profile`}
              className="w-32 h-32 rounded-full object-cover mr-4 mb-4 md:mb-0"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{user.fullName}</h2>
              <p className="text-gray-400">{user.email}</p>
              <p className="text-gray-400">{user.phone}</p>
              <p className="text-gray-300">Username: {user.username}</p>
              <p className="text-gray-300">DOB: {moment(user.dob).format('LL')}</p>
              <p className="text-gray-300">Gender: {user.gender}</p>
              <div className='flex'>
              <img src={WhatsappIcon} className='h-8 w-8 cursor-pointer' onClick={sendMessageOnWhatsApp}/>
              </div>
            </div>
            <div className="ml-auto">
              <QRCode value={user.username} size={64} bgColor="#ffffff" fgColor="#000000" />
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Membership & Subscription Information</h3>
            <div>
              <p className="text-gray-300">Membership Type: {user.membershipType}</p>
              <p className="text-gray-300">Start Date: {moment(user.membershipStartDate).format('LL')}</p>
              <p className="text-gray-300">Expiry Date: {moment(user.membershipExpiryDate).format('LL')}</p>
              <p className={`text-lg ${user.membershipStatus === 'Active' ? 'text-green-400' : 'text-red-500'}`}>
                Status: {user.membershipStatus}
              </p>
            </div>
            <div className="mt-4">
              <h4 className="text-lg font-bold mb-2">Subscriptions</h4>
              {user.subscriptions.map((sub) => (
                <div key={sub.id} className="mb-4">
                  <p className="text-gray-300">Plan: {sub.plan}</p>
                  <p className="text-gray-300">Expiry Date: {moment(sub.expiryDate).format('LL')}</p>
                  <p className={`text-lg ${moment(sub.expiryDate).isBefore(moment()) ? 'text-red-500' : 'text-green-400'}`}>
                    Status: {moment(sub.expiryDate).isBefore(moment()) ? 'Expired' : 'Active'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Attendance and Activity</h3>
            <p className="text-gray-300 mb-4">Total Visits: {user.attendance.length}</p>
            <Bar data={attendanceData} options={{ maintainAspectRatio: true }} height={120} />
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <Line data={activityData} options={{ maintainAspectRatio: false }} height={120} />
          </div>
        </div>

        <div  className="mt-6">
          <h3 className="text-2xl font-bold mb-4">Health and Fitness Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {/* <div className="flex-1">
              <p className="text-gray-300">Weight: {user.weight} kg</p>
              <p className="text-gray-300">Body Measurements: {user.bodyMeasurements}</p>
              <p className="text-gray-300">Body Fat Percentage: {user.bodyFatPercentage}%</p>
              <p className="text-gray-300">BMI: {user.bmi}</p>
              <p className="text-gray-300">Fitness Level: {user.fitnessLevel}</p>
              <p className="text-gray-300">Exercise Frequency: {user.exerciseFrequency} times/week</p>
              <p className="text-gray-300">Calories Burned: {user.caloriesBurned} kcal</p>
              <p className="text-gray-300">Diet and Nutrition: {user.diet}</p>
              <p className="text-gray-300">Sleep Patterns: {user.sleepPatterns}</p>
              <p className="text-gray-300">Hydration: {user.hydration} L/day</p>
              <p className="text-gray-300">Steps: {user.steps} steps/day</p>
              <p className="text-gray-300">Heart Rate: {user.heartRate} bpm</p>
              <p className="text-gray-300">Blood Pressure: {user.bloodPressure}</p>
              <p className="text-gray-300">Goals and Achievements: {user.goals}</p>
            </div> */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <Line data={healthData} options={{ maintainAspectRatio: false }} height={200} />
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <Line data={bmiData} options={{ maintainAspectRatio: false }} height={200} />
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <Line data={caloriesData} options={{ maintainAspectRatio: false }} height={200} />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-md mt-6">
          <h3 className="text-xl font-bold mb-4">Communication Preferences</h3>
          <div>
            <p className="text-gray-300">Preferred Contact Method: {user.contactMethod}</p>
            <p className="text-gray-300">Marketing Preferences: {user.marketingPreferences}</p>
            <p className="text-gray-300">Notifications: {user.notifications}</p>
          </div>
        </div>
      </div>
    </GymPanel>
  );
};

export default UserProfile;