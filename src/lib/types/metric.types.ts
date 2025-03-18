
export interface MetricData {
  name: string;
  value: number;
  change: number;
  changeType: 'positive' | 'negative' | 'neutral';
}
