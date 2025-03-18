
import { ActivityLog } from "@/lib/mock-data";
import { ActivityLogItem } from "../ActivityLogItem";

interface ActivityLogRowsProps {
  logs: ActivityLog[];
  expandedLog: string | null;
  onToggleExpand: (id: string) => void;
}

export function ActivityLogRows({ logs, expandedLog, onToggleExpand }: ActivityLogRowsProps) {
  return (
    <>
      {logs.map((log) => (
        <ActivityLogItem 
          key={log.id}
          log={log}
          expandedLog={expandedLog}
          onToggleExpand={onToggleExpand}
        />
      ))}
    </>
  );
}
