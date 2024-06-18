import { useNavigate, useParams } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2'; // Import Pie component from react-chartjs-2
import { ArcElement, Chart, Tooltip, Legend, plugins } from 'chart.js';
import { chartColors } from '../utils/color';
import GymPanel from '../components/Gympanel';

Chart.register(ArcElement, Legend, Tooltip);
const GymDashboard = () => {
  // Simulated gym details (replace with actual data fetching)
  const { gymId } = useParams();
  const navigate = useNavigate();
  const gymDetails = {
    name: 'Fitness Zone',
    location: '123 Gym Street, Cityville',
    members: {
      total: 350,
      active: 300,
    },
    subscriptions: [
      { id: 1, name: 'Basic Membership', price: '$50/month' },
      { id: 2, name: 'Premium Membership', price: '$100/month' },
    ],
    staff: [
      { id: 1, name: 'John Doe', role: 'Manager' },
      { id: 2, name: 'Jane Smith', role: 'Trainer' },
    ],
    classes: [
      { id: 1, name: 'Yoga Class', time: 'Monday, Wednesday, Friday 9:00 AM' },
      { id: 2, name: 'Boxing Class', time: 'Tuesday, Thursday 6:00 PM' },
    ],
    // Add more details as needed
  };

  const options = {
    cutout: '50%',
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        align: 'left'
      }
    },
    // legend: {
    //   display: false,
    //   position: "bottom"
    // },
    elements: {
      arc: {
        borderWidth: 0
      }
    }
  };

  const data = {
    maintainAspectRatio: true,
    responsive: false,
    labels: [
      "Active users", 
      "Inactive Users"
    ],
    datasets: [
      {
        data: [gymDetails.members.active, gymDetails.members.total-gymDetails.members.active,],
        backgroundColor: chartColors,
        hoverBackgroundColor: chartColors,
        borderWidth: 0,
      }
    ]
  };

  return (
    <GymPanel>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Gym Overview */}
          <div onClick={()=>navigate('/subscribers')} className="bg-gray-800 p-4 rounded-lg flex shadow-md justify-center cursor-pointer">
            <div className=''>
                <h2 className="text-2xl font-bold mb-2">Gym Overview</h2>
                <div className="flex justify-between mb-2">
                <p>Total Members</p>
                <p className="font-semibold">{gymDetails.members.total}</p>
                </div>
                <div className="flex justify-between mb-2">
                <p>Active Members</p>
                <p className="font-semibold">{gymDetails.members.active}</p>
                </div>
            </div>

            {/* Pie Chart */}
            <div className="mt-4 h-[200px] flex justify-center w-[400px]">
              {/* <Pie data={pieChartData} /> */}
                <Doughnut  data={data} options={options} />
            </div>
          </div>

          {/* Management Tools */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-2">Management Tools</h2>
            <ul className="list-disc list-inside">
              <li>Member Management</li>
              <li>Staff Management</li>
              <li>Subscription Plans</li>
              <li>Schedule Management</li>
            </ul>
          </div>

          {/* Operations */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-2">Operations</h2>
            <ul className="list-disc list-inside">
              <li>Facility Management</li>
              <li>Finance and Billing</li>
            </ul>
          </div>

          {/* Analytics and Reports */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-2">Analytics and Reports</h2>
            <ul className="list-disc list-inside">
              <li>Membership Analytics</li>
              <li>Financial Reports</li>
              <li>Attendance Tracking</li>
            </ul>
          </div>
        </section>
      </main>
    </GymPanel>
  );
};

export default GymDashboard;
