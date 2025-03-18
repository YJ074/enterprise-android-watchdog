
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface User {
  id: string;
  username: string;
  fullName: string;
  email: string;
  role: string;
  status: string;
  lastActive: Date;
  devices: number;
}

interface UserTableRowProps {
  user: User;
}

export function UserTableRow({ user }: UserTableRowProps) {
  return (
    <TableRow>
      <TableCell>
        <Link to={`/user/${user.id}`} className="font-medium text-blue-600 hover:underline">
          {user.fullName}
        </Link>
        <div className="text-xs text-muted-foreground">{user.username}</div>
      </TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.role}</TableCell>
      <TableCell>
        <Badge
          variant={user.status === "Active" ? "default" : "secondary"}
          className={user.status === "Active" ? "bg-green-500" : ""}
        >
          {user.status}
        </Badge>
      </TableCell>
      <TableCell>{user.devices}</TableCell>
      <TableCell>
        {user.lastActive.toLocaleDateString()}
      </TableCell>
    </TableRow>
  );
}
