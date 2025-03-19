
import React from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { InvestigationLog } from '@/lib/api/investigation/investigationService';

interface LogRowProps {
  log: InvestigationLog;
  expandedLog: string | null;
  toggleLogExpand: (logId: string) => void;
  getBadgeVariant: (type: string) => "default" | "destructive" | "secondary" | "outline";
}

export const LogRow: React.FC<LogRowProps> = ({ 
  log, 
  expandedLog, 
  toggleLogExpand,
  getBadgeVariant
}) => {
  return (
    <TableRow 
      className={expandedLog === log.id ? "bg-slate-50" : "hover:bg-slate-50"}
      onClick={() => toggleLogExpand(log.id)}
    >
      <TableCell className="whitespace-nowrap font-mono text-xs">
        {formatDistanceToNow(new Date(log.timestamp), { addSuffix: true })}
      </TableCell>
      <TableCell>
        <Badge variant={getBadgeVariant(log.type)} className="capitalize">
          {log.type}
        </Badge>
      </TableCell>
      <TableCell className="font-medium">{log.source}</TableCell>
      <TableCell className={expandedLog === log.id ? "" : "max-w-md truncate"}>
        {log.content}
      </TableCell>
      <TableCell className="text-right">
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <ExternalLink className="h-4 w-4" />
          <span className="sr-only">View Details</span>
        </Button>
      </TableCell>
    </TableRow>
  );
};
