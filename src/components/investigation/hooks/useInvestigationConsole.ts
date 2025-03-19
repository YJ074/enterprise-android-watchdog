import { useState } from "react";
import { useInvestigation } from "@/hooks/useInvestigation";
import { DateRange } from "react-day-picker";
import { InvestigationLog } from "@/lib/api/investigation/investigationService";

export function useInvestigationConsole(deviceId?: string) {
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
  
  const [logs, setLogs] = useState<InvestigationLog[]>([]);
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
  
  return {
    searchQuery,
    setSearchQuery,
    selectedLogTypes,
    setSelectedLogTypes,
    dateRange,
    setDateRange,
    searchTarget,
    setSearchTarget,
    logs,
    isSearching,
    handleSubmit
  };
}
