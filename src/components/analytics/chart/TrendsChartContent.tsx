
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { ChartDataPoint } from "./useHistoricalData";

interface TrendsChartContentProps {
  combinedData: ChartDataPoint[];
  showForecast: boolean;
  forecastStartIndex: number;
}

export function TrendsChartContent({ 
  combinedData, 
  showForecast, 
  forecastStartIndex 
}: TrendsChartContentProps) {
  return (
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
  );
}
