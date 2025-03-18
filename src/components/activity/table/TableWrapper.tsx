
import { ReactNode } from "react";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody 
} from "@/components/ui/table";

interface TableWrapperProps {
  children: ReactNode;
}

export function TableWrapper({ children }: TableWrapperProps) {
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
          {children}
        </TableBody>
      </Table>
    </div>
  );
}
