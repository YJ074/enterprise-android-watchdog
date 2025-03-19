
import React from 'react';
import { Button } from '@/components/ui/button';
import { Filter, Download, FileText } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

interface LogsTableFilterProps {
  onFilterChange?: (filter: string) => void;
  onExport?: () => void;
}

export const LogsTableFilter: React.FC<LogsTableFilterProps> = ({
  onFilterChange,
  onExport
}) => {
  return (
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
            <DropdownMenuItem onClick={() => onFilterChange?.('all')}>All Logs</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onFilterChange?.('errors')}>Errors Only</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onFilterChange?.('warnings')}>Warnings Only</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onFilterChange?.('system')}>System Logs</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onFilterChange?.('user')}>User Activity</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="outline" size="sm" className="h-8" onClick={onExport}>
          <Download className="h-3.5 w-3.5 mr-2" />
          Export
        </Button>
      </div>
    </div>
  );
};
