
import React, { useState } from 'react';
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
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  ExternalLink, 
  Download, 
  Filter,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

interface LogsTableProps {
  logs: InvestigationLog[];
}

export const LogsTable: React.FC<LogsTableProps> = ({ logs }) => {
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

  const getBadgeVariant = (type: string) => {
    switch (type.toLowerCase()) {
      case 'error':
        return 'destructive';
      case 'warning':
        return 'warning';
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

  return (
    <div className="border rounded-md shadow-sm">
      <div className="p-3 bg-slate-50 border-b flex justify-between items-center">
        <h3 className="font-medium flex items-center">
          <FileText className="h-4 w-4 mr-2 text-blue-600" />
          Investigation Logs
        </h3>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8">
                <Filter className="h-3.5 w-3.5 mr-2" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>All Logs</DropdownMenuItem>
              <DropdownMenuItem>Errors Only</DropdownMenuItem>
              <DropdownMenuItem>Warnings Only</DropdownMenuItem>
              <DropdownMenuItem>System Logs</DropdownMenuItem>
              <DropdownMenuItem>User Activity</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="sm" className="h-8">
            <Download className="h-3.5 w-3.5 mr-2" />
            Export
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead 
              className="w-[130px] cursor-pointer" 
              onClick={() => handleSort('timestamp')}
            >
              <div className="flex items-center">
                Time
                {sortField === 'timestamp' && (
                  sortDirection === 'asc' ? 
                    <ChevronUp className="h-4 w-4 ml-1" /> : 
                    <ChevronDown className="h-4 w-4 ml-1" />
                )}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer"
              onClick={() => handleSort('type')}
            >
              <div className="flex items-center">
                Type
                {sortField === 'type' && (
                  sortDirection === 'asc' ? 
                    <ChevronUp className="h-4 w-4 ml-1" /> : 
                    <ChevronDown className="h-4 w-4 ml-1" />
                )}
              </div>
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort('source')}
            >
              <div className="flex items-center">
                Source
                {sortField === 'source' && (
                  sortDirection === 'asc' ? 
                    <ChevronUp className="h-4 w-4 ml-1" /> : 
                    <ChevronDown className="h-4 w-4 ml-1" />
                )}
              </div>
            </TableHead>
            <TableHead className="w-full">Content</TableHead>
            <TableHead className="w-[80px] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedLogs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                No logs found matching your criteria.
              </TableCell>
            </TableRow>
          ) : (
            sortedLogs.map((log) => (
              <React.Fragment key={log.id}>
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
                {expandedLog === log.id && (
                  <TableRow className="bg-slate-50">
                    <TableCell colSpan={5} className="p-4">
                      <div className="bg-white p-3 rounded border text-sm font-mono whitespace-pre-wrap">
                        {log.content}
                      </div>
                      <div className="mt-3 flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <Download className="h-3.5 w-3.5 mr-2" />
                          Export Log
                        </Button>
                        <Button size="sm">View Full Details</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
