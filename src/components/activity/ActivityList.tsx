
import { useState } from "react";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";
import { activityLogs } from "@/lib/mock-data";
import { format } from "date-fns";

export function ActivityList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [severityFilter, setSeverityFilter] = useState("all");

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'app_install':
        return "📲";
      case 'app_uninstall':
        return "🗑️";
      case 'login':
        return "🔐";
      case 'logout':
        return "👋";
      case 'location_change':
        return "📍";
      case 'policy_violation':
        return "⚠️";
      case 'system_update':
        return "⬆️";
      default:
        return "📱";
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'info':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Info</Badge>;
      case 'warning':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Warning</Badge>;
      case 'critical':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Critical</Badge>;
      default:
        return null;
    }
  };

  const filteredLogs = activityLogs.filter(log => {
    const matchesSearch = 
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.deviceId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === "all" || log.type === typeFilter;
    const matchesSeverity = severityFilter === "all" || log.severity === severityFilter;
    
    return matchesSearch && matchesType && matchesSeverity;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search activities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex gap-2">
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="app_install">App Install</SelectItem>
              <SelectItem value="app_uninstall">App Uninstall</SelectItem>
              <SelectItem value="login">Login</SelectItem>
              <SelectItem value="logout">Logout</SelectItem>
              <SelectItem value="location_change">Location Change</SelectItem>
              <SelectItem value="policy_violation">Policy Violation</SelectItem>
              <SelectItem value="system_update">System Update</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={severityFilter} onValueChange={setSeverityFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severities</SelectItem>
              <SelectItem value="info">Info</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Device ID</TableHead>
              <TableHead>Activity</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium text-xl">{getActivityIcon(log.type)}</TableCell>
                  <TableCell>{log.deviceId}</TableCell>
                  <TableCell className="max-w-md">{log.details}</TableCell>
                  <TableCell>{getSeverityBadge(log.severity)}</TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {format(new Date(log.timestamp), "PPp")}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                  No activities found matching your filters
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
