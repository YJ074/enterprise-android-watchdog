
import { useState, useCallback } from "react";
import { ActivityLog } from "@/lib/mock-data";

interface ActivityListStateProps {
  filteredLogs: ActivityLog[];
  page: number;
  itemsPerPage: number;
}

export function useActivityListState({ 
  filteredLogs, 
  page, 
  itemsPerPage 
}: ActivityListStateProps) {
  // Calculate pagination values
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const paginatedLogs = filteredLogs.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  
  return {
    paginatedLogs,
    totalPages
  };
}
