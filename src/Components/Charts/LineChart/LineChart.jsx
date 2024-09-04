import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Paper } from '@mui/material';
import { useTheme } from '@emotion/react';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const LineChart = ({ chartData, height }) => {
  const theme = useTheme();

  const dates = Object.keys(chartData);
  const views = dates.map(date => chartData[date].views);
  const visitors = dates.map(date => chartData[date].visitors);

  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Views',
        data: views,
        fill: false,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.dark,
      },
      {
        label: 'Visitors',
        data: visitors,
        fill: false,
        backgroundColor: theme.palette.secondary.main,
        borderColor: theme.palette.secondary.dark,
      },
    ],
  };

  const options = {
    responsive: true,
    animations: false,  // Disable animations
    plugins: {
      title: {
        display: true,
        text: 'Views and Visitors Over Time',
        font: {
          size: 20,
          weight: 'bold',
        },
        color: theme.palette.text.primary,
      },
      tooltip: {
        enabled: true,
        backgroundColor: theme.palette.background.paper,
        titleColor: theme.palette.text.primary,
        bodyColor: theme.palette.text.secondary,
      },
      legend: {
        display: true,
        labels: {
          color: theme.palette.text.primary,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
          color: theme.palette.text.primary,
        },
        ticks: {
          color: theme.palette.text.secondary,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Count',
          color: theme.palette.text.primary,
        },
        ticks: {
          color: theme.palette.text.secondary,
        },
      },
    },
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Line data={data} options={options} style={{ maxHeight: 300, color: theme.palette.primary.contrastText }} />
    </Paper>
  );
};

export default LineChart;
