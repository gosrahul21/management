// src/components/Revenue.js
import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const mockRevenueData = [
  { month: 'January', revenue: 5000 },
  { month: 'February', revenue: 6000 },
  { month: 'March', revenue: 7000 },
  { month: 'April', revenue: 8000 },
  { month: 'May', revenue: 9000 },
  { month: 'June', revenue: 10000 },
];

const Revenue = () => {
  const [data, setData] = useState<any>();

  useEffect(() => {
    console.log(mockRevenueData)
    const chartData = {
      labels: mockRevenueData.map(item => item.month),
      datasets: [
        {
          label: 'Revenue',
          data: mockRevenueData.map(item => item.revenue),
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
        },
      ],
    };
    setData(chartData);
  }, []);

  

  return (
    <div className="w-full max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Revenue</h2>
      {data && <Bar data={data} />}
    </div>
  );
};

export default Revenue;
