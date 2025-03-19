
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

// Device metrics by type
export const deviceTypeMetrics = [
  {
    type: "Smartphone",
    count: 145,
    compliance: 92,
    recentIssues: 3
  },
  {
    type: "Laptop",
    count: 98,
    compliance: 89,
    recentIssues: 7
  },
  {
    type: "Desktop PC",
    count: 64,
    compliance: 95,
    recentIssues: 2
  },
  {
    type: "Tablet",
    count: 37,
    compliance: 88,
    recentIssues: 5
  },
  {
    type: "IoT Devices",
    count: 18,
    compliance: 76,
    recentIssues: 12
  }
];
