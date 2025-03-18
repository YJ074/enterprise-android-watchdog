import { MetricData } from '../types/metric.types';

export const metrics: MetricData[] = [
  {
    name: "Active Devices",
    value: 42,
    change: 8,
    changeType: "positive"
  },
  {
    name: "Compliance Rate",
    value: 94,
    change: 2,
    changeType: "positive"
  },
  {
    name: "Policy Violations",
    value: 7,
    change: 3,
    changeType: "negative"
  },
  {
    name: "Pending Updates",
    value: 12,
    change: 5,
    changeType: "negative"
  }
];
