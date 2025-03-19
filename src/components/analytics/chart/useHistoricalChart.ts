
import { useState } from "react";
import { 
  generateHistoricalData, 
  generateForecastData, 
  ChartDataPoint,
  forecastRanges
} from "./useHistoricalData";

export function useHistoricalChart() {
  const [timeRange, setTimeRange] = useState(30);
  const [showForecast, setShowForecast] = useState(true);
  const [forecastDays, setForecastDays] = useState(7);
  
  const historicalData = generateHistoricalData(timeRange);
  const forecastData = generateForecastData(forecastDays);
  
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
    forecastStartIndex,
    forecastDays,
    setForecastDays,
    forecastRanges
  };
}
