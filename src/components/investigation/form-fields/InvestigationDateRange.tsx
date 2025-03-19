
import { FormLabel } from "@/components/ui/form";
import { DateRangePicker } from "../DateRangePicker";
import { DateRange } from "react-day-picker";
import { CalendarRange } from "lucide-react";

interface InvestigationDateRangeProps {
  dateRange: DateRange | undefined;
  setDateRange: (dateRange: DateRange | undefined) => void;
}

export function InvestigationDateRange({ dateRange, setDateRange }: InvestigationDateRangeProps) {
  return (
    <div className="space-y-2">
      <FormLabel className="flex items-center gap-1">
        <CalendarRange className="h-4 w-4" />
        Investigation Date Range
      </FormLabel>
      <DateRangePicker 
        value={dateRange}
        onChange={setDateRange}
        className="w-full border-gray-300 rounded-md"
      />
      {!dateRange?.from && (
        <p className="text-sm text-destructive">Please select a start date</p>
      )}
    </div>
  );
}
