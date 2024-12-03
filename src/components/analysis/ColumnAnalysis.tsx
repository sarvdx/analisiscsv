import React from 'react';
import { ColumnStats } from '../../types/csv';
import { BarChart, Calculator, Calendar, Type, Hash } from 'lucide-react';

interface ColumnAnalysisProps {
  stats: ColumnStats;
}

export function ColumnAnalysis({ stats }: ColumnAnalysisProps) {
  const getTypeIcon = () => {
    switch (stats.type) {
      case 'number':
        return <Hash className="h-5 w-5" />;
      case 'date':
        return <Calendar className="h-5 w-5" />;
      case 'string':
        return <Type className="h-5 w-5" />;
      default:
        return <Calculator className="h-5 w-5" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center space-x-3 mb-4">
        {getTypeIcon()}
        <h3 className="text-lg font-medium text-gray-900">{stats.name}</h3>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Type</span>
          <span className="font-medium">{stats.type}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Unique Values</span>
          <span className="font-medium">{stats.unique}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Missing Values</span>
          <span className="font-medium">{stats.missing}</span>
        </div>
        
        {stats.type === 'number' && (
          <>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Mean</span>
              <span className="font-medium">{stats.mean?.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Median</span>
              <span className="font-medium">{stats.median?.toFixed(2)}</span>
            </div>
          </>
        )}
        
        {(stats.min !== undefined && stats.max !== undefined) && (
          <>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Min</span>
              <span className="font-medium">{stats.min}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Max</span>
              <span className="font-medium">{stats.max}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}