// AttendanceDashboard.tsx
import { Bar, Line } from 'react-chartjs-2';
import GymPanel from '../components/Gympanel';
import { ArcElement, Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AttendanceDashboard = () => {
  // Sample data for demonstration
  const dailyAttendanceData = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    datasets: [
      {
        label: 'Daily Attendance',
        backgroundColor: '#4CAF50',
        borderColor: '#4CAF50',
        borderWidth: 1,
        hoverBackgroundColor: '#388E3C',
        hoverBorderColor: '#388E3C',
        data: [30, 25, 40, 35, 50, 45], // Sample data for daily attendance
      },
    ],
  };

  const weeklyAttendanceData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Weekly Attendance',
        fill: false,
        lineTension: 0.1,
        backgroundColor: '#03A9F4',
        borderColor: '#03A9F4',
        pointBorderColor: '#03A9F4',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#03A9F4',
        pointHoverBorderColor: '#03A9F4',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [150, 180, 160, 200], // Sample data for weekly attendance
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <GymPanel>
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Attendance Summary</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Daily Attendance</h3>
              <Bar data={dailyAttendanceData} options={options} />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Weekly Attendance</h3>
              <Line data={weeklyAttendanceData} options={options} />
            </div>
          </div>
        </div>
      </div>
    </GymPanel>
  );
};

export default AttendanceDashboard;
