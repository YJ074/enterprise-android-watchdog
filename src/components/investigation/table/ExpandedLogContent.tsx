
import React from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface ExpandedLogContentProps {
  content: string;
}

export const ExpandedLogContent: React.FC<ExpandedLogContentProps> = ({ content }) => {
  return (
    <TableRow className="bg-slate-50">
      <TableCell colSpan={5} className="p-4">
        <div className="bg-white p-3 rounded border text-sm font-mono whitespace-pre-wrap">
          {content}
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
  );
};
