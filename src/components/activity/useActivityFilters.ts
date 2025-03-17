
import { useState, useEffect } from "react";
import { ActivityLog } from "@/lib/mock-data";
import { 
  getActivityCategory, 
  getAppNameFromDetails, 
  getDurationFromDetails 
} from "./utils/activityHelpers";
import { isWithinInterval } from "date-fns";

interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

export function useActivityFilters(logs: ActivityLog[], activeTab: string, dateRange?: DateRange) {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [appFilter, setAppFilter] = useState("all");
  const [durationFilter, setDurationFilter] = useState("all");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [searchTerm, typeFilter, severityFilter, appFilter, durationFilter, activeTab, dateRange]);

  // Apply all filters to logs
  const filteredLogs = logs.filter(log => {
    // Filter by search term
    const matchesSearch = 
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.deviceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.metadata?.fileType && log.metadata.fileType.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Filter by type
    const matchesType = typeFilter === "all" || log.type === typeFilter;
    
    // Filter by severity
    const matchesSeverity = severityFilter === "all" || log.severity === severityFilter;
    
    // Filter by app if applicable
    let matchesApp = true;
    if (appFilter !== "all") {
      const appName = getAppNameFromDetails(log.details);
      matchesApp = appName?.toLowerCase().includes(appFilter.toLowerCase()) || false;
    }
    
    // Filter by duration if applicable
    let matchesDuration = true;
    if (durationFilter !== "all") {
      // Check both duration from details and metadata
      const durationFromDetails = getDurationFromDetails(log.details);
      const durationFromMetadata = log.metadata?.duration;
      
      let hasDuration = false;
      let isShort = false;
      let isMedium = false;
      let isLong = false;
      
      if (durationFromDetails) {
        hasDuration = true;
        isShort = 
          (durationFromDetails.unit === "second") || 
          (durationFromDetails.unit === "minute" && durationFromDetails.value <= 5);
        isMedium = 
          (durationFromDetails.unit === "minute" && durationFromDetails.value > 5 && durationFromDetails.value <= 30) ||
          (durationFromDetails.unit === "hour" && durationFromDetails.value === 1);
        isLong = 
          (durationFromDetails.unit === "hour" && durationFromDetails.value > 1) ||
          (durationFromDetails.unit === "day");
      } else if (durationFromMetadata) {
        hasDuration = true;
        const durationInSeconds = durationFromMetadata;
        isShort = durationInSeconds <= 300; // 5 minutes
        isMedium = durationInSeconds > 300 && durationInSeconds <= 1800; // 5-30 minutes
        isLong = durationInSeconds > 1800; // > 30 minutes
      }
      
      if (durationFilter === "short") {
        matchesDuration = hasDuration && isShort;
      } else if (durationFilter === "medium") {
        matchesDuration = hasDuration && isMedium;
      } else if (durationFilter === "long") {
        matchesDuration = hasDuration && isLong;
      } else {
        matchesDuration = hasDuration;
      }
    }
    
    // Filter by tab
    let matchesTab = activeTab === "all";
    
    if (!matchesTab) {
      const category = getActivityCategory(log.type);
      
      if (activeTab === "security" && category === "security") {
        matchesTab = true;
      } else if (activeTab === "system" && category === "system") {
        matchesTab = true;
      } else if (activeTab === "user" && category === "user") {
        matchesTab = true;
      } else if (activeTab === "communication" && category === "communication") {
        matchesTab = true;
      } else if (activeTab === "monitoring" && category === "monitoring") {
        matchesTab = true;
      } else if (activeTab === "multimedia" && category === "multimedia") {
        matchesTab = true;
      }
    }
    
    // Filter by date range
    let matchesDateRange = true;
    if (dateRange?.from && dateRange?.to) {
      const logDate = new Date(log.timestamp);
      matchesDateRange = isWithinInterval(logDate, {
        start: dateRange.from,
        end: dateRange.to
      });
    } else if (dateRange?.from) {
      const logDate = new Date(log.timestamp);
      matchesDateRange = logDate >= dateRange.from;
    }
    
    return matchesSearch && matchesType && matchesSeverity && matchesTab && 
           matchesDateRange && matchesApp && matchesDuration;
  });

  // Collect unique app names for filter dropdown
  const uniqueApps = new Set<string>();
  logs.forEach(log => {
    const appName = getAppNameFromDetails(log.details);
    if (appName) {
      uniqueApps.add(appName);
    }
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const paginatedLogs = filteredLogs.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return {
    filteredLogs,
    paginatedLogs,
    page,
    setPage,
    totalPages,
    searchTerm,
    setSearchTerm,
    typeFilter,
    setTypeFilter,
    severityFilter,
    setSeverityFilter,
    appFilter,
    setAppFilter,
    durationFilter,
    setDurationFilter,
    uniqueApps,
    itemsPerPage
  };
}
