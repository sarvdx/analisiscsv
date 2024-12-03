import Papa from 'papaparse';
import { CSVData, ColumnStats } from '../types/csv';

export const parseCSV = (file: File): Promise<CSVData> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const headers = results.meta.fields || [];
        const rows = results.data as Record<string, string>[];
        const preview = rows.slice(0, 5);
        
        resolve({ headers, rows, preview });
      },
      error: (error) => reject(error),
    });
  });
};

export const analyzeColumn = (data: CSVData, columnName: string): ColumnStats => {
  const values = data.rows.map(row => row[columnName]).filter(Boolean);
  const missing = data.rows.length - values.length;
  const unique = new Set(values).size;
  
  // Detect column type
  const type = detectColumnType(values);
  
  const stats: ColumnStats = {
    name: columnName,
    type,
    unique,
    missing,
  };
  
  if (type === 'number') {
    const numbers = values.map(v => parseFloat(v)).filter(n => !isNaN(n));
    stats.mean = numbers.reduce((a, b) => a + b, 0) / numbers.length;
    stats.median = getMedian(numbers);
    stats.min = Math.min(...numbers);
    stats.max = Math.max(...numbers);
  } else {
    stats.min = values.length ? values.reduce((a, b) => a < b ? a : b) : undefined;
    stats.max = values.length ? values.reduce((a, b) => a > b ? a : b) : undefined;
  }
  
  return stats;
};

const detectColumnType = (values: string[]): 'number' | 'string' | 'date' | 'boolean' => {
  const sample = values.slice(0, 100);
  
  if (sample.every(v => !isNaN(parseFloat(v)))) return 'number';
  if (sample.every(v => !isNaN(Date.parse(v)))) return 'date';
  if (sample.every(v => ['true', 'false', '0', '1'].includes(v.toLowerCase()))) return 'boolean';
  
  return 'string';
};

const getMedian = (numbers: number[]): number => {
  const sorted = numbers.slice().sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  
  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }
  
  return sorted[middle];
};