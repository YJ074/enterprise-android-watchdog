
import { useState } from 'react';
import { InvestigationLog } from '@/lib/api/investigation/investigationService';

export function useLogsTable(logs: InvestigationLog[]) {
  const [expandedLog, setExpandedLog] = useState<string | null>(null);
  const [sortField, setSortField] = useState<'timestamp' | 'type' | 'source'>('timestamp');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const toggleLogExpand = (logId: string) => {
    if (expandedLog === logId) {
      setExpandedLog(null);
    } else {
      setExpandedLog(logId);
    }
  };

  const handleSort = (field: 'timestamp' | 'type' | 'source') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getBadgeVariant = (type: string): "default" | "destructive" | "secondary" | "outline" => {
    switch (type.toLowerCase()) {
      case 'error':
        return 'destructive';
      case 'warning':
        return 'default';
      case 'info':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  // Apply sorting
  const sortedLogs = [...logs].sort((a, b) => {
    let comparison = 0;
    
    switch (sortField) {
      case 'timestamp':
        comparison = new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
        break;
      case 'type':
        comparison = a.type.localeCompare(b.type);
        break;
      case 'source':
        comparison = a.source.localeCompare(b.source);
        break;
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  return {
    expandedLog,
    sortField,
    sortDirection,
    sortedLogs,
    handleSort,
    toggleLogExpand,
    getBadgeVariant
  };
}
