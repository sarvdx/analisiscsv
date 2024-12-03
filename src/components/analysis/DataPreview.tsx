import React from 'react';
import { CSVData } from '../../types/csv';

interface DataPreviewProps {
  data: CSVData;
}

export function DataPreview({ data }: DataPreviewProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {data.headers.map((header) => (
              <th
                key={header}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.preview.map((row, idx) => (
            <tr key={idx}>
              {data.headers.map((header) => (
                <td
                  key={`${idx}-${header}`}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                >
                  {row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}