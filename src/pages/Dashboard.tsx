import React, { useState } from 'react';
import { ChartBuilder } from '../components/dashboard/ChartBuilder';
import { ChartConfig, Dashboard as DashboardType } from '../types/dashboard';
import { CSVData } from '../types/csv';
import { db } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

interface DashboardProps {
  data: CSVData;
}

export function Dashboard({ data }: DashboardProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [charts, setCharts] = useState<ChartConfig[]>([]);
  const navigate = useNavigate();

  const handleSaveChart = (chart: ChartConfig) => {
    setCharts([...charts, chart]);
    toast.success('Chart added to dashboard');
  };

  const handleSaveDashboard = async () => {
    if (!name) {
      toast.error('Please enter a dashboard name');
      return;
    }

    try {
      const dashboard: Omit<DashboardType, 'id'> = {
        name,
        description,
        charts,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        datasetId: Date.now().toString(), // In a real app, this would be the actual dataset ID
      };

      await addDoc(collection(db, 'dashboards'), dashboard);
      toast.success('Dashboard saved successfully');
      navigate('/dashboards');
    } catch (error) {
      toast.error('Error saving dashboard');
      console.error(error);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Create Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Build your dashboard by adding charts and visualizations
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Dashboard Name</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Add Chart</h2>
        <ChartBuilder data={data} onSave={handleSaveChart} />
      </div>

      {charts.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Dashboard Preview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {charts.map((chart) => (
              <div key={chart.id} className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">{chart.title}</h3>
                {/* Chart preview would go here */}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={handleSaveDashboard}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save Dashboard
        </button>
      </div>
    </div>
  );
}