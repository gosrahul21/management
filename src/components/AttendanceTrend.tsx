import { Line } from 'react-chartjs-2';

const AttendanceTrends = ({ records }: any) => {
  const dates = records.map((record: any) => record.date);
  const attendanceCounts = records.map((record: any) => record.participants.length);

  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Attendance Over Time',
        data: attendanceCounts,
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
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

  return <Line data={data} options={options} />;
};

export default AttendanceTrends;
