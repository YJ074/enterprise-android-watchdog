
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useHistoricalChart } from "./chart/useHistoricalChart";
import { ChartConfig } from "./chart/ChartConfig";
import { TrendsChartContent } from "./chart/TrendsChartContent";

export function HistoricalTrendsChart() {
  const {
    timeRange,
    setTimeRange,
    showForecast,
    setShowForecast,
    combinedData,
    forecastStartIndex
  } = useHistoricalChart();
  
  return (
    <Card className="col-span-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Historical Trends & Forecast</CardTitle>
        <ChartConfig 
          timeRange={timeRange}
          showForecast={showForecast}
          onTimeRangeChange={setTimeRange}
          onForecastToggle={setShowForecast}
        />
      </CardHeader>
      <CardContent>
        <TrendsChartContent 
          combinedData={combinedData}
          showForecast={showForecast}
          forecastStartIndex={forecastStartIndex}
        />
      </CardContent>
    </Card>
  );
}
