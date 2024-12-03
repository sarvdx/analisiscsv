export interface ChartConfig {
  id: string;
  type: 'bar' | 'line' | 'pie' | 'scatter';
  title: string;
  xAxis: string;
  yAxis?: string;
  aggregation?: 'sum' | 'average' | 'count';
  filter?: {
    column: string;
    operator: 'equals' | 'contains' | 'greater' | 'less';
    value: string;
  };
}

export interface Dashboard {
  id: string;
  name: string;
  description: string;
  charts: ChartConfig[];
  createdAt: number;
  updatedAt: number;
  datasetId: string;
}

export interface Dataset {
  id: string;
  name: string;
  data: Record<string, string>[];
  headers: string[];
  createdAt: number;
}