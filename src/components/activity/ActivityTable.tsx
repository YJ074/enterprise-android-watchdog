
import { useState } from "react";
import { ActivityLog } from "@/lib/mock-data";
import { TableWrapper } from "./table/TableWrapper";
import { EmptyState } from "./table/EmptyState";
import { ActivityLogRows } from "./table/ActivityLogRows";

interface ActivityTableProps {
  logs: ActivityLog[];
  isFiltered?: boolean;
}

export function ActivityTable({ logs, isFiltered = false }: ActivityTableProps) {
  const [expandedLog, setExpandedLog] = useState<string | null>(null);
  
  const handleToggleExpand = (id: string) => {
    setExpandedLog(expandedLog === id ? null : id);
  };
  
  return (
    <TableWrapper>
      {logs.length > 0 ? (
        <ActivityLogRows 
          logs={logs}
          expandedLog={expandedLog}
          onToggleExpand={handleToggleExpand}
        />
      ) : (
        <EmptyState filterActive={isFiltered} />
      )}
    </TableWrapper>
  );
}
