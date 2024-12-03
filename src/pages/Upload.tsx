import React, { useState } from 'react';
import { FileUpload } from '../components/upload/FileUpload';
import { DataPreview } from '../components/analysis/DataPreview';
import { ColumnAnalysis } from '../components/analysis/ColumnAnalysis';
import { parseCSV, analyzeColumn } from '../utils/csv';
import { CSVData, ColumnStats } from '../types/csv';
import toast from 'react-hot-toast';

export function Upload() {
  const [data, setData] = useState<CSVData | null>(null);
  const [columnStats, setColumnStats] = useState<ColumnStats[]>([]);

  const handleFileSelect = async (file: File) => {
    try {
      const parsedData = await parseCSV(file);
      setData(parsedData);
      
      const stats = parsedData.headers.map(header => 
        analyzeColumn(parsedData, header)
      );
      setColumnStats(stats);
      
      toast.success('File uploaded and analyzed successfully');
    } catch (error) {
      toast.error('Error processing file');
      console.error(error);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Upload CSV</h1>
        <p className="mt-1 text-sm text-gray-500">
          Upload your CSV file to analyze its contents and create visualizations
        </p>
      </div>

      {!data && <FileUpload onFileSelect={handleFileSelect} />}

      {data && (
        <>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Data Preview</h2>
            <DataPreview data={data} />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Column Analysis</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {columnStats.map((stats) => (
                <ColumnAnalysis key={stats.name} stats={stats} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}