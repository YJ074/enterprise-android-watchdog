
import { Button } from "@/components/ui/button";
import { User, UserPlus, RefreshCw } from "lucide-react";

interface UserListHeaderProps {
  toggleSyncOptions: () => void;
  handleAddUser: () => void;
}

export function UserListHeader({ toggleSyncOptions, handleAddUser }: UserListHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <User className="h-6 w-6" />
          Users
        </h1>
        <p className="text-muted-foreground">
          Manage user accounts and permissions
        </p>
      </div>
      <div className="flex gap-2">
        <Button onClick={toggleSyncOptions} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Sync
        </Button>
        <Button onClick={handleAddUser}>
          <UserPlus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>
    </div>
  );
}
