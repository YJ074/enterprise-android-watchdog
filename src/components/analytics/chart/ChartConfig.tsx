
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { timeRanges, forecastRanges } from "./useHistoricalData";

interface ChartConfigProps {
  timeRange: number;
  showForecast: boolean;
  forecastDays?: number;
  onTimeRangeChange: (value: number) => void;
  onForecastToggle: (show: boolean) => void;
  onForecastDaysChange?: (days: number) => void;
}

export function ChartConfig({ 
  timeRange, 
  showForecast, 
  forecastDays = 7,
  onTimeRangeChange, 
  onForecastToggle,
  onForecastDaysChange
}: ChartConfigProps) {
  return (
    <div className="flex flex-wrap gap-4 items-center">
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
      
      <div className="flex items-center space-x-3">
        <Switch 
          id="showForecast" 
          checked={showForecast}
          onCheckedChange={onForecastToggle}
        />
        <Label htmlFor="showForecast">Show Forecast</Label>
      </div>
      
      {showForecast && onForecastDaysChange && (
        <Select 
          value={forecastDays.toString()} 
          onValueChange={(value) => onForecastDaysChange(parseInt(value))}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Forecast period" />
          </SelectTrigger>
          <SelectContent>
            {forecastRanges.map((range) => (
              <SelectItem key={range.value} value={range.value.toString()}>
                {range.label} Forecast
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
}
