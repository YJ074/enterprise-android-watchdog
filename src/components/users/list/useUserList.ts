
import { useState, useMemo } from "react";
import { devices } from "@/lib/mock-data";

// Generate mock users based on device users
const generateMockUsers = () => {
  const uniqueUsers = new Set();
  devices.forEach(device => uniqueUsers.add(device.user));
  
  return Array.from(uniqueUsers).map((userId: any, index) => ({
    id: userId,
    username: `user_${userId.substring(0, 5)}`,
    fullName: `User ${index + 1}`,
    email: `user${index + 1}@example.com`,
    role: index % 3 === 0 ? "Admin" : "User",
    status: index % 5 === 0 ? "Inactive" : "Active",
    lastActive: new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000),
    devices: devices.filter(d => d.user === userId).length
  }));
};

export function useUserList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("lastActive");
  const [sortDirection, setSortDirection] = useState("desc");
  
  const users = generateMockUsers();
  
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };
  
  const sortedAndFilteredUsers = useMemo(() => {
    // First sort the users
    const sortedUsers = [...users].sort((a: any, b: any) => {
      const directionModifier = sortDirection === "asc" ? 1 : -1;
      
      if (sortField === "lastActive") {
        return (new Date(a.lastActive).getTime() - new Date(b.lastActive).getTime()) * directionModifier;
      }
      
      if (sortField === "devices") {
        return (a.devices - b.devices) * directionModifier;
      }
      
      return String(a[sortField]).localeCompare(String(b[sortField])) * directionModifier;
    });
    
    // Then filter them
    return sortedUsers.filter(user => 
      user.username.includes(searchTerm) || 
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, sortField, sortDirection, searchTerm]);
  
  return {
    sortField,
    sortDirection,
    searchTerm,
    setSearchTerm,
    handleSort,
    filteredUsers: sortedAndFilteredUsers
  };
}
