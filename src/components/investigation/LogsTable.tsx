
import React from 'react';
import { InvestigationLog } from '@/lib/api/investigation/investigationService';
import { 
  Table,
  TableBody
} from '@/components/ui/table';
import { LogsTableHeader } from './table/LogsTableHeader';
import { LogRow } from './table/LogRow';
import { ExpandedLogContent } from './table/ExpandedLogContent';
import { LogsTableFilter } from './table/LogsTableFilter';
import { useLogsTable } from './hooks/useLogsTable';
import { TableRow, TableCell } from '@/components/ui/table';

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

  const handleFilterChange = (filter: string) => {
    // Filter implementation can be added here
    console.log('Filter changed:', filter);
  };

  const handleExport = () => {
    // Export implementation can be added here
    console.log('Exporting logs...');
  };

  return (
    <div className="border rounded-md shadow-sm">
      <LogsTableFilter 
        onFilterChange={handleFilterChange} 
        onExport={handleExport} 
      />
      
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
