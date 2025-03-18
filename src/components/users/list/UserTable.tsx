
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { UserTableHeader } from "./UserTableHeader";
import { UserTableRow } from "./UserTableRow";

interface UserTableProps {
  filteredUsers: any[];
  sortField: string;
  handleSort: (field: string) => void;
}

export function UserTable({ filteredUsers, sortField, handleSort }: UserTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <UserTableHeader sortField={sortField} handleSort={handleSort} />
        <TableBody>
          {filteredUsers.map(user => (
            <UserTableRow key={user.id} user={user} />
          ))}
          
          {filteredUsers.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                No users found matching your search
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
