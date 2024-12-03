export interface CSVData {
  headers: string[];
  rows: Record<string, string>[];
  preview: Record<string, string>[];
}

export interface ColumnStats {
  name: string;
  type: 'number' | 'string' | 'date' | 'boolean';
  unique: number;
  missing: number;
  mean?: number;
  median?: number;
  min?: number | string;
  max?: number | string;
}