
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { UserSync } from "./UserSync";
import { UserListHeader } from "./list/UserListHeader";
import { UserCard } from "./list/UserCard";
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
      
      {/* User Management Card */}
      <UserCard
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortField={sortField}
        handleSort={handleSort}
        filteredUsers={filteredUsers}
      />
    </div>
  );
}
