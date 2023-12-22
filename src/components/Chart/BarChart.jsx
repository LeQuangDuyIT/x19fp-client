import { Bar } from 'react-chartjs-2';
// import Chart from 'chart.js/auto';
import { Chart as ChartJS } from 'chart.js/auto';
import { memo } from 'react';

const BarChart = ({ UserChartData }) => {
  return memo(<Bar data={UserChartData} />);
};

export default BarChart;
