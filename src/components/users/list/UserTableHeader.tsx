
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpDown } from "lucide-react";

interface UserTableHeaderProps {
  sortField: string;
  handleSort: (field: string) => void;
}

export function UserTableHeader({ sortField, handleSort }: UserTableHeaderProps) {
  return (
    <TableHeader>
      <TableRow>
        <TableHead onClick={() => handleSort("fullName")} className="cursor-pointer">
          <div className="flex items-center gap-1">
            Name
            {sortField === "fullName" && (
              <ArrowUpDown className="h-4 w-4" />
            )}
          </div>
        </TableHead>
        <TableHead onClick={() => handleSort("email")} className="cursor-pointer">
          <div className="flex items-center gap-1">
            Email
            {sortField === "email" && (
              <ArrowUpDown className="h-4 w-4" />
            )}
          </div>
        </TableHead>
        <TableHead onClick={() => handleSort("role")} className="cursor-pointer">
          <div className="flex items-center gap-1">
            Role
            {sortField === "role" && (
              <ArrowUpDown className="h-4 w-4" />
            )}
          </div>
        </TableHead>
        <TableHead onClick={() => handleSort("status")} className="cursor-pointer">
          <div className="flex items-center gap-1">
            Status
            {sortField === "status" && (
              <ArrowUpDown className="h-4 w-4" />
            )}
          </div>
        </TableHead>
        <TableHead onClick={() => handleSort("devices")} className="cursor-pointer">
          <div className="flex items-center gap-1">
            Devices
            {sortField === "devices" && (
              <ArrowUpDown className="h-4 w-4" />
            )}
          </div>
        </TableHead>
        <TableHead onClick={() => handleSort("lastActive")} className="cursor-pointer">
          <div className="flex items-center gap-1">
            Last Active
            {sortField === "lastActive" && (
              <ArrowUpDown className="h-4 w-4" />
            )}
          </div>
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}
