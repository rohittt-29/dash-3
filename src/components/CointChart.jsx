import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { HistoricalChart } from '../utils/constants';
import { useParams } from 'react-router-dom';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import Loading from './Loading';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const CoinChart = ({ currency = 'usd' }) => {
  const { id } = useParams();
  const [days, setDays] = useState(1);  // ← yeh line add kar

  const [historicalData, setHistoricalData] = useState([]);
  
  const chartDays = [
    { label: "24H", value: 1 },
    { label: "7D", value: 7 },
    { label: "30D", value: 30 },
    { label: "90D", value: 90 },
    { label: "1Y", value: 365 },

  ];
  

  const fetchChartData = async () => {
    try {
      const res = await fetch(HistoricalChart(id, days, currency));
      const data = await res.json();
      setHistoricalData(data.prices);
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, [id, days, currency]);

  return (
    <div className="w-full p-4 md:p-8">
      {Array.isArray(historicalData) && historicalData.length > 0 ? (
        <Line
          data={{
            labels: historicalData.map((coin) => {
              const date = new Date(coin[0]);
              return days === 1
                ? `${date.getHours()}:${date.getMinutes()}`
                : date.toLocaleDateString();
            }),
            datasets: [
              {
                data: historicalData.map((coin) => coin[1]),
                label: `Price (Past ${days} Days) in ${currency.toUpperCase()}`,
                borderColor: '#00ffcc',
                fill: false,
              },
            ],
          }}
          options={{
            elements: {
              point: {
                radius: 1,
              },
            },
            responsive: true,
            plugins: {
              legend: {
                labels: {
                  color: '#fff',
                },
              },
            },
            scales: {
              x: {
                ticks: {
                  color: '#ccc',
                },
              },
              y: {
                ticks: {
                  color: '#ccc',
                },
              },
            },
          }}
        />
      ) : (
        <Loading/>
      )}
      <div className="flex gap-2 my-4 justify-center flex-wrap">
  {chartDays.map((day) => (
    <button
      key={day.value}
      onClick={() => setDays(day.value)}
      className={`px-4 py-1 cursor-pointer rounded border ${
        days === day.value
          ? "bg-green-500 text-white"
          : "bg-transparent text-gray-300"
      }`}
    >
      {day.label}
    </button>
  ))}
</div>

    </div>
    
  );
};

export default CoinChart;
