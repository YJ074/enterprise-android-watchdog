
import React from 'react';
import { InvestigationLog } from '@/lib/api/investigation/investigationService';
import { 
  Table,
  TableBody,
  TableCell,
  TableRow 
} from '@/components/ui/table';
import { FileText } from 'lucide-react';
import { useLogsTable } from './hooks/useLogsTable';
import { LogsTableHeader } from './table/LogsTableHeader';
import { LogRow } from './table/LogRow';
import { ExpandedLogContent } from './table/ExpandedLogContent';

interface LogsTableProps {
  logs: InvestigationLog[];
}

export const LogsTable: React.FC<LogsTableProps> = ({ logs }) => {
  const {
    expandedLog,
    sortField,
    sortDirection,
    sortedLogs,
    handleSort,
    toggleLogExpand,
    getBadgeVariant
  } = useLogsTable(logs);

  return (
    <div className="border rounded-md shadow-sm">
      <div className="p-3 bg-slate-50 border-b flex justify-between items-center">
        <h3 className="font-medium flex items-center">
          <FileText className="h-4 w-4 mr-2 text-blue-600" />
          Investigation Logs
        </h3>
        <div className="flex items-center gap-2">
          {/* Reusing the existing buttons for simplicity in this refactor */}
          <Button variant="outline" size="sm" className="h-8">
            <Filter className="h-3.5 w-3.5 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="h-8">
            <Download className="h-3.5 w-3.5 mr-2" />
            Export
          </Button>
        </div>
      </div>
      <Table>
        <LogsTableHeader 
          sortField={sortField}
          sortDirection={sortDirection}
          handleSort={handleSort}
        />
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
                <LogRow 
                  log={log}
                  expandedLog={expandedLog}
                  toggleLogExpand={toggleLogExpand}
                  getBadgeVariant={getBadgeVariant}
                />
                {expandedLog === log.id && (
                  <ExpandedLogContent content={log.content} />
                )}
              </React.Fragment>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

// Adding missing imports from the refactored components
import { Button } from '@/components/ui/button';
import { Filter, Download } from 'lucide-react';
