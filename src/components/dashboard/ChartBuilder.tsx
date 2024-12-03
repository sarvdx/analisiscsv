import React, { useState } from 'react';
import { ChartConfig } from '../../types/dashboard';
import { CSVData } from '../../types/csv';
import { Bar, Line, Pie, Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface ChartBuilderProps {
  data: CSVData;
  onSave: (config: ChartConfig) => void;
}

export function ChartBuilder({ data, onSave }: ChartBuilderProps) {
  const [config, setConfig] = useState<Partial<ChartConfig>>({
    type: 'bar',
    title: '',
  });

  const prepareChartData = () => {
    if (!config.xAxis || !config.yAxis) return null;

    const labels = data.rows.map(row => row[config.xAxis!]);
    const values = data.rows.map(row => parseFloat(row[config.yAxis!]));

    return {
      labels,
      datasets: [
        {
          label: config.yAxis,
          data: values,
          backgroundColor: 'rgba(99, 102, 241, 0.5)',
          borderColor: 'rgb(99, 102, 241)',
          borderWidth: 1,
        },
      ],
    };
  };

  const chartData = prepareChartData();

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Chart Type</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={config.type}
            onChange={(e) => setConfig({ ...config, type: e.target.value as ChartConfig['type'] })}
          >
            <option value="bar">Bar Chart</option>
            <option value="line">Line Chart</option>
            <option value="pie">Pie Chart</option>
            <option value="scatter">Scatter Plot</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={config.title}
            onChange={(e) => setConfig({ ...config, title: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">X Axis</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={config.xAxis}
            onChange={(e) => setConfig({ ...config, xAxis: e.target.value })}
          >
            <option value="">Select column</option>
            {data.headers.map((header) => (
              <option key={header} value={header}>
                {header}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Y Axis</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={config.yAxis}
            onChange={(e) => setConfig({ ...config, yAxis: e.target.value })}
          >
            <option value="">Select column</option>
            {data.headers.map((header) => (
              <option key={header} value={header}>
                {header}
              </option>
            ))}
          </select>
        </div>

        {chartData && (
          <div className="mt-4 h-64">
            {config.type === 'bar' && <Bar data={chartData} />}
            {config.type === 'line' && <Line data={chartData} />}
            {config.type === 'pie' && <Pie data={chartData} />}
            {config.type === 'scatter' && <Scatter data={chartData} />}
          </div>
        )}

        <button
          onClick={() => {
            if (config.title && config.type && config.xAxis && config.yAxis) {
              onSave({
                id: Date.now().toString(),
                ...config as ChartConfig,
              });
            }
          }}
          className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add to Dashboard
        </button>
      </div>
    </div>
  );
}