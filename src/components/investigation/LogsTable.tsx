
import React from 'react';
import { InvestigationLog } from '@/lib/api/investigation/investigationService';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from '@/components/ui/table';
import { formatDistanceToNow } from 'date-fns';

interface LogsTableProps {
  logs: InvestigationLog[];
}

export const LogsTable: React.FC<LogsTableProps> = ({ logs }) => {
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Time</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Source</TableHead>
            <TableHead className="w-full">Content</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((log) => (
            <TableRow key={log.id}>
              <TableCell className="whitespace-nowrap">
                {formatDistanceToNow(new Date(log.timestamp), { addSuffix: true })}
              </TableCell>
              <TableCell>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {log.type}
                </span>
              </TableCell>
              <TableCell>{log.source}</TableCell>
              <TableCell className="max-w-md truncate">
                {log.content}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

