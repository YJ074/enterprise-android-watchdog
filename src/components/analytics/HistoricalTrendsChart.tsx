
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { metrics } from "@/lib/mock-data";
import { addDays, format, subDays } from "date-fns";

// Generate historical data based on current metrics
const generateHistoricalData = (days: number) => {
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
const generateForecastData = (days: number) => {
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

// Time ranges
const timeRanges = [
  { label: "Last 7 Days", value: 7 },
  { label: "Last 14 Days", value: 14 },
  { label: "Last 30 Days", value: 30 },
  { label: "Last 90 Days", value: 90 }
];

export function HistoricalTrendsChart() {
  const [timeRange, setTimeRange] = useState(30);
  const [showForecast, setShowForecast] = useState(true);
  
  const historicalData = generateHistoricalData(timeRange);
  const forecastData = generateForecastData(7);
  
  // Combine historical and forecast data
  const combinedData = showForecast 
    ? [...historicalData, ...forecastData]
    : historicalData;
  
  // Find the index where forecast starts
  const forecastStartIndex = historicalData.length;
  
  return (
    <Card className="col-span-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Historical Trends & Forecast</CardTitle>
        <div className="flex gap-2">
          <Select 
            value={timeRange.toString()} 
            onValueChange={(value) => setTimeRange(parseInt(value))}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              {timeRanges.map((range) => (
                <SelectItem key={range.value} value={range.value.toString()}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="showForecast"
              checked={showForecast}
              onChange={(e) => setShowForecast(e.target.checked)}
              className="rounded border-gray-300"
            />
            <label htmlFor="showForecast" className="text-sm">Show 7-day Forecast</label>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ChartContainer
            config={{
              enrollments: {
                label: "Device Enrollments",
                theme: {
                  light: "#6366f1",
                  dark: "#818cf8",
                },
              },
              compliance: {
                label: "Compliance Rate",
                theme: {
                  light: "#10b981",
                  dark: "#34d399",
                },
              },
              securityRisk: {
                label: "Security Risk Score",
                theme: {
                  light: "#ef4444",
                  dark: "#f87171",
                },
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={combinedData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis 
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="enrollments"
                  name="Device Enrollments"
                  strokeWidth={2}
                  stroke="var(--color-enrollments)"
                  dot={false}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="compliance"
                  name="Compliance Rate (%)"
                  strokeWidth={2}
                  stroke="var(--color-compliance)"
                  dot={false}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="securityRisk"
                  name="Security Risk Score"
                  strokeWidth={2}
                  stroke="var(--color-securityRisk)"
                  dot={false}
                  activeDot={{ r: 6 }}
                />
                {showForecast && (
                  <Line
                    type="monotone"
                    dataKey="enrollments"
                    name="Enrollment Forecast"
                    strokeWidth={2}
                    stroke="var(--color-enrollments)"
                    strokeDasharray="5 5"
                    dot={false}
                    activeDot={{ r: 6 }}
                    data={combinedData.slice(forecastStartIndex)}
                  />
                )}
                {showForecast && (
                  <Line
                    type="monotone"
                    dataKey="compliance"
                    name="Compliance Forecast"
                    strokeWidth={2}
                    stroke="var(--color-compliance)"
                    strokeDasharray="5 5"
                    dot={false}
                    activeDot={{ r: 6 }}
                    data={combinedData.slice(forecastStartIndex)}
                  />
                )}
                {showForecast && (
                  <Line
                    type="monotone"
                    dataKey="securityRisk"
                    name="Risk Forecast"
                    strokeWidth={2}
                    stroke="var(--color-securityRisk)"
                    strokeDasharray="5 5"
                    dot={false}
                    activeDot={{ r: 6 }}
                    data={combinedData.slice(forecastStartIndex)}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
