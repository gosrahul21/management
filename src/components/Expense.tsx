// src/components/Expenses.js
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const mockExpenseData = [
  { month: 'January', expense: 3000 },
  { month: 'February', expense: 3500 },
  { month: 'March', expense: 4000 },
  { month: 'April', expense: 4500 },
  { month: 'May', expense: 5000 },
  { month: 'June', expense: 5500 },
];

const Expenses = () => {
  const [data, setData] = useState<any>();

  useEffect(() => {
    const chartData = {
      labels: mockExpenseData.map(item => item.month),
      datasets: [
        {
          label: 'Expenses',
          data: mockExpenseData.map(item => item.expense),
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgb(255, 99, 132)',
          borderWidth: 1,
        },
      ],
    };
    setData(chartData);
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Expenses</h2>
      {data && <Bar data={data} />}
    </div>
  );
};

export default Expenses;
