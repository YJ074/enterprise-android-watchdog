
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { timeRanges } from "./useHistoricalData";

interface ChartConfigProps {
  timeRange: number;
  showForecast: boolean;
  onTimeRangeChange: (value: number) => void;
  onForecastToggle: (show: boolean) => void;
}

export function ChartConfig({ 
  timeRange, 
  showForecast, 
  onTimeRangeChange, 
  onForecastToggle 
}: ChartConfigProps) {
  return (
    <div className="flex gap-2">
      <Select 
        value={timeRange.toString()} 
        onValueChange={(value) => onTimeRangeChange(parseInt(value))}
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
          onChange={(e) => onForecastToggle(e.target.checked)}
          className="rounded border-gray-300"
        />
        <label htmlFor="showForecast" className="text-sm">Show 7-day Forecast</label>
      </div>
    </div>
  );
}
