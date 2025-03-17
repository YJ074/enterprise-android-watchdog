
import { useState } from "react";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { ActivityLog } from "@/lib/mock-data";
import { ActivityLogItem } from "./ActivityLogItem";

interface ActivityTableProps {
  logs: ActivityLog[];
}

export function ActivityTable({ logs }: ActivityTableProps) {
  const [expandedLog, setExpandedLog] = useState<string | null>(null);
  
  const handleToggleExpand = (id: string) => {
    setExpandedLog(expandedLog === id ? null : id);
  };
  
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Device ID</TableHead>
            <TableHead className="hidden md:table-cell">Category</TableHead>
            <TableHead>Activity</TableHead>
            <TableHead className="hidden md:table-cell">Severity</TableHead>
            <TableHead className="hidden md:table-cell">Timestamp</TableHead>
            <TableHead className="w-[70px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.length > 0 ? (
            logs.map((log) => (
              <ActivityLogItem 
                key={log.id}
                log={log}
                expandedLog={expandedLog}
                onToggleExpand={handleToggleExpand}
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                No activities found matching your filters
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
