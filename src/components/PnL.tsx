// src/components/DoughnutChart.js
import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const mockRevenue = 50000; // Example mock revenue
const mockExpenses = 30000; // Example mock expenses

const Pnl = () => {
  const [data, setData] = useState<any>();

  useEffect(() => {
    const chartData = {
      labels: ['Profit', 'Expenses'],
      datasets: [
        {
          data: [mockRevenue - mockExpenses, mockExpenses],
          backgroundColor: ['#4caf50', '#ff6384'],
          hoverBackgroundColor: ['#388e3c', '#e57373'],
        },
      ],
    };
    setData(chartData);
  }, []);

  return (
    <div className="px-4 py-2 bg-gray-700 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Profit & Expenses</h2>
      {data && <Doughnut data={data} />}
    </div>
  );
};

export default Pnl;
