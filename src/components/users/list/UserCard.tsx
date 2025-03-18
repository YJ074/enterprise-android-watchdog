
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserSearchFilter } from "./UserSearchFilter";
import { UserTable } from "./UserTable";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  lastActive: string;
  created: string;
}

interface UserCardProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  sortField: string;
  handleSort: (field: string) => void;
  filteredUsers: User[];
}

export function UserCard({ 
  searchTerm, 
  setSearchTerm, 
  sortField, 
  handleSort, 
  filteredUsers 
}: UserCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>User Management</CardTitle>
        <CardDescription>
          View and manage all users in the system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UserSearchFilter 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        
        <UserTable 
          filteredUsers={filteredUsers}
          sortField={sortField}
          handleSort={handleSort}
        />
      </CardContent>
    </Card>
  );
}
