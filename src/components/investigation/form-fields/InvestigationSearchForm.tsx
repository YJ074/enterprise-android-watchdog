
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DateRangePicker } from "../DateRangePicker";
import { LogTypeSelector } from "../LogTypeSelector";
import { DateRange } from "react-day-picker";

interface InvestigationSearchFormProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedLogTypes: string[];
  setSelectedLogTypes: (types: string[]) => void;
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;
  searchTarget: string;
  setSearchTarget: (target: string) => void;
  isSearching: boolean;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  deviceId?: string;
}

export function InvestigationSearchForm({
  searchQuery,
  setSearchQuery,
  selectedLogTypes,
  setSelectedLogTypes,
  dateRange,
  setDateRange,
  searchTarget,
  setSearchTarget,
  isSearching,
  onSubmit,
  deviceId
}: InvestigationSearchFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Input
              placeholder="Search communications, activities, files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              disabled={isSearching}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-2">
          <DateRangePicker 
            value={dateRange} 
            onChange={setDateRange} 
          />
          
          {!deviceId && (
            <Select
              value={searchTarget}
              onValueChange={setSearchTarget}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Search Target" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Devices</SelectItem>
                <SelectItem value="selected">Selected Devices</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <LogTypeSelector 
          selectedTypes={selectedLogTypes}
          onChange={setSelectedLogTypes}
        />
        
        <Button type="submit" disabled={isSearching}>
          {isSearching && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isSearching ? "Searching..." : "Search"}
        </Button>
      </div>
    </form>
  );
}
