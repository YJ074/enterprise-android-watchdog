
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
    recentIssues: 7,
    models: [
      { name: "ThinkPad X1", count: 45, osVersion: "Windows 11" },
      { name: "MacBook Pro", count: 32, osVersion: "macOS Ventura" },
      { name: "Dell XPS", count: 21, osVersion: "Windows 10" }
    ]
  },
  {
    type: "Desktop PC",
    count: 64,
    compliance: 95,
    recentIssues: 2,
    models: [
      { name: "Dell OptiPlex", count: 28, osVersion: "Windows 11" },
      { name: "HP EliteDesk", count: 22, osVersion: "Windows 10" },
      { name: "iMac", count: 14, osVersion: "macOS Ventura" }
    ]
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

// PC and Laptop specific metrics
export const computerMetrics = {
  totalCount: 162, // Laptops + Desktop PCs
  osDistribution: [
    { name: "Windows 11", count: 73, percentage: 45 },
    { name: "Windows 10", count: 43, percentage: 27 },
    { name: "macOS Ventura", count: 32, percentage: 20 },
    { name: "macOS Monterey", count: 8, percentage: 5 },
    { name: "Linux", count: 6, percentage: 3 }
  ],
  updateStatus: {
    upToDate: 132,
    needsUpdate: 24,
    critical: 6
  },
  averageAge: {
    laptop: 2.4, // years
    desktopPC: 3.2 // years
  },
  securityStatus: {
    secured: 148,
    atRisk: 14
  }
};
