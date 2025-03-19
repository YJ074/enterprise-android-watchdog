import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DateRangePicker } from "./DateRangePicker";
import { useInvestigation } from "@/hooks/useInvestigation";
import { LogTypeSelector } from "./LogTypeSelector";
import { LogsTable } from "./LogsTable";
import { Loader2, Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useDevice } from "@/hooks/useDevices";
import { useParams } from "react-router-dom";

export function InvestigationConsole() {
  const { id: deviceId } = useParams<{ id: string }>();
  const { device } = useDevice(deviceId);
  
  const {
    searchQuery,
    setSearchQuery,
    selectedLogTypes,
    setSelectedLogTypes,
    dateRange,
    setDateRange,
    getDeviceLogs,
    searchLogs,
  } = useInvestigation();
  
  const [logs, setLogs] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTarget, setSearchTarget] = useState(deviceId ? 'device' : 'all');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    
    try {
      let results;
      if (searchTarget === 'device' && deviceId) {
        // If we're on a device page, search only that device's logs
        results = await getDeviceLogs(deviceId);
      } else if (searchQuery) {
        // Otherwise perform a global search with the query
        results = await searchLogs(searchQuery);
      } else {
        results = [];
      }
      
      setLogs(results);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsSearching(false);
    }
  };
  
  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
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
      
      {device && (
        <div className="bg-muted/20 p-3 rounded-md">
          <p className="text-sm text-muted-foreground">
            Investigating device: <span className="font-medium text-foreground">{device.name}</span>
          </p>
        </div>
      )}
      
      <LogsTable logs={logs} isLoading={isSearching} />
    </div>
  );
}
