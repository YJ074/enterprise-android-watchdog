
import { addDays, format, subDays } from "date-fns";
import { metrics } from "@/lib/mock-data";

export type ChartDataPoint = {
  date: string;
  timestamp: string;
  enrollments: number;
  compliance: number;
  securityRisk: number;
};

// Time ranges for the dropdown
export const timeRanges = [
  { label: "Last 7 Days", value: 7 },
  { label: "Last 14 Days", value: 14 },
  { label: "Last 30 Days", value: 30 },
  { label: "Last 90 Days", value: 90 }
];

// Generate historical data based on current metrics
export const generateHistoricalData = (days: number): ChartDataPoint[] => {
  const data = [];
  const today = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = subDays(today, i);
    const varFactor = Math.sin(i * 0.2) * 0.15 + 1; // Create some variation
    
    const entry = {
      date: format(date, "MMM dd"),
      timestamp: date.toISOString(),
      enrollments: Math.round(metrics[0].value * varFactor * (1 - (i / days) * 0.2)),
      compliance: Math.round(metrics[1].value * varFactor * (1 - (i / days) * 0.1)),
      securityRisk: Math.round(metrics[2].value * varFactor * (1 + (i / days) * 0.3))
    };
    
    data.push(entry);
  }
  
  return data;
};

// Generate forecast data
export const generateForecastData = (days: number): ChartDataPoint[] => {
  const data = [];
  const today = new Date();
  const historicalData = generateHistoricalData(30);
  const lastHistoricalEntry = historicalData[historicalData.length - 1];
  
  // Basic linear regression values based on historical trends
  const enrollmentSlope = (lastHistoricalEntry.enrollments - historicalData[0].enrollments) / 30;
  const complianceSlope = (lastHistoricalEntry.compliance - historicalData[0].compliance) / 30;
  const securityRiskSlope = (lastHistoricalEntry.securityRisk - historicalData[0].securityRisk) / 30;
  
  for (let i = 1; i <= days; i++) {
    const date = addDays(today, i);
    const randomFactor = 0.95 + Math.random() * 0.1; // Add some randomness
    
    const entry = {
      date: format(date, "MMM dd"),
      timestamp: date.toISOString(),
      enrollments: Math.round((lastHistoricalEntry.enrollments + (enrollmentSlope * i)) * randomFactor),
      compliance: Math.min(100, Math.round((lastHistoricalEntry.compliance + (complianceSlope * i)) * randomFactor)),
      securityRisk: Math.max(0, Math.round((lastHistoricalEntry.securityRisk + (securityRiskSlope * i)) * randomFactor))
    };
    
    data.push(entry);
  }
  
  return data;
};
