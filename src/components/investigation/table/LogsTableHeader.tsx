
import React from 'react';
import { TableHeader, TableRow, TableHead } from '@/components/ui/table';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface LogsTableHeaderProps {
  sortField: 'timestamp' | 'type' | 'source';
  sortDirection: 'asc' | 'desc';
  handleSort: (field: 'timestamp' | 'type' | 'source') => void;
}

export const LogsTableHeader: React.FC<LogsTableHeaderProps> = ({
  sortField,
  sortDirection,
  handleSort
}) => {
  return (
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
  );
};
