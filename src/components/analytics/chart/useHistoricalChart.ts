
import { useState } from "react";
import { generateHistoricalData, generateForecastData, ChartDataPoint } from "./useHistoricalData";

export function useHistoricalChart() {
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

  return {
    timeRange,
    setTimeRange,
    showForecast,
    setShowForecast,
    historicalData,
    forecastData,
    combinedData,
    forecastStartIndex
  };
}
