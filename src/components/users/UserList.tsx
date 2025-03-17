import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Search, 
  UserPlus, 
  Filter, 
  ArrowUpDown,
  RefreshCw
} from "lucide-react";
import { devices } from "@/lib/mock-data";
import { UserSync } from "./UserSync";

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

export function UserList() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("lastActive");
  const [sortDirection, setSortDirection] = useState("desc");
  const [showSyncOptions, setShowSyncOptions] = useState(false);
  
  const users = generateMockUsers();
  
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };
  
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
  
  const filteredUsers = sortedUsers.filter(user => 
    user.username.includes(searchTerm) || 
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
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
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                className="pl-8"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="rounded-md border">
            <Table>
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
              <TableBody>
                {filteredUsers.map(user => (
                  <TableRow key={user.id}>
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
        </CardContent>
      </Card>
    </div>
  );
}
