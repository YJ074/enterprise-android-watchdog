
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserSync } from "./UserSync";
import { UserListHeader } from "./list/UserListHeader";
import { UserSearchFilter } from "./list/UserSearchFilter";
import { UserTable } from "./list/UserTable";
import { useUserList } from "./list/useUserList";

export function UserList() {
  const { toast } = useToast();
  const [showSyncOptions, setShowSyncOptions] = useState(false);
  
  const {
    sortField,
    searchTerm,
    setSearchTerm,
    handleSort,
    filteredUsers
  } = useUserList();
  
  const handleAddUser = () => {
    toast({
      title: "Add User",
      description: "This feature is not implemented yet.",
    });
  };

  const toggleSyncOptions = () => {
    setShowSyncOptions(!showSyncOptions);
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <UserListHeader 
        toggleSyncOptions={toggleSyncOptions} 
        handleAddUser={handleAddUser} 
      />
      
      {/* Sync Options */}
      {showSyncOptions && (
        <UserSync />
      )}
      
      {/* Search and filters */}
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
    </div>
  );
}
