
import { useState, useEffect } from "react";
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { activityLogs } from "@/lib/mock-data";
import { format, isWithinInterval } from "date-fns";
import { Button } from "@/components/ui/button";
import { User, Shield, Monitor, Info, Eye } from "lucide-react";

interface ActivityListProps {
  activeTab?: string;
  dateRange?: {
    from: Date | undefined;
    to: Date | undefined;
  };
}

export function ActivityList({ activeTab = "all", dateRange }: ActivityListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [expandedLog, setExpandedLog] = useState<string | null>(null);
  const itemsPerPage = 10;

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

  const getActivityCategoryIcon = (type: string) => {
    switch (type) {
      case 'app_install':
      case 'app_uninstall':
      case 'system_update':
        return <Monitor className="h-4 w-4" />;
      case 'login':
      case 'logout':
        return <User className="h-4 w-4" />;
      case 'policy_violation':
        return <Shield className="h-4 w-4" />;
      case 'location_change':
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getActivityCategory = (type: string) => {
    switch (type) {
      case 'app_install':
      case 'app_uninstall':
      case 'system_update':
        return "system";
      case 'login':
      case 'logout':
        return "user";
      case 'policy_violation':
      case 'location_change':
        return "security";
      default:
        return "other";
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
    // Filter by search term
    const matchesSearch = 
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.deviceId.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by type
    const matchesType = typeFilter === "all" || log.type === typeFilter;
    
    // Filter by severity
    const matchesSeverity = severityFilter === "all" || log.severity === severityFilter;
    
    // Filter by tab
    const matchesTab = 
      activeTab === "all" || 
      (activeTab === "security" && (log.type === "policy_violation" || log.type === "location_change")) ||
      (activeTab === "system" && (log.type === "app_install" || log.type === "app_uninstall" || log.type === "system_update")) ||
      (activeTab === "user" && (log.type === "login" || log.type === "logout"));
    
    // Filter by date range
    let matchesDateRange = true;
    if (dateRange?.from && dateRange?.to) {
      const logDate = new Date(log.timestamp);
      matchesDateRange = isWithinInterval(logDate, {
        start: dateRange.from,
        end: dateRange.to
      });
    } else if (dateRange?.from) {
      const logDate = new Date(log.timestamp);
      matchesDateRange = logDate >= dateRange.from;
    }
    
    return matchesSearch && matchesType && matchesSeverity && matchesTab && matchesDateRange;
  });
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const paginatedLogs = filteredLogs.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [searchTerm, typeFilter, severityFilter, activeTab, dateRange]);

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
              <TableHead className="hidden md:table-cell">Category</TableHead>
              <TableHead>Activity</TableHead>
              <TableHead className="hidden md:table-cell">Severity</TableHead>
              <TableHead className="hidden md:table-cell">Timestamp</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedLogs.length > 0 ? (
              paginatedLogs.map((log) => (
                <>
                  <TableRow key={log.id}>
                    <TableCell className="font-medium text-xl">{getActivityIcon(log.type)}</TableCell>
                    <TableCell>{log.deviceId}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center gap-1">
                        {getActivityCategoryIcon(log.type)}
                        <span className="capitalize">{getActivityCategory(log.type)}</span>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-md">{log.details}</TableCell>
                    <TableCell className="hidden md:table-cell">{getSeverityBadge(log.severity)}</TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-gray-500">
                      {format(new Date(log.timestamp), "PPp")}
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setExpandedLog(expandedLog === log.id ? null : log.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  
                  {expandedLog === log.id && (
                    <TableRow>
                      <TableCell colSpan={7} className="bg-muted/20 p-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <h4 className="text-sm font-medium mb-1">Event Details</h4>
                            <div className="text-sm">
                              <p><strong>Type:</strong> {log.type}</p>
                              <p><strong>Category:</strong> {getActivityCategory(log.type)}</p>
                              <p><strong>Severity:</strong> {log.severity}</p>
                            </div>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-1">Device Information</h4>
                            <div className="text-sm">
                              <p><strong>Device ID:</strong> {log.deviceId}</p>
                              <p><strong>Timestamp:</strong> {format(new Date(log.timestamp), "PPpp")}</p>
                            </div>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-1">Additional Information</h4>
                            <div className="text-sm">
                              <p><strong>Description:</strong> {log.details}</p>
                              <p><strong>Action Required:</strong> {log.severity === 'critical' 
                                ? 'Yes - Immediate attention needed' 
                                : log.severity === 'warning' 
                                  ? 'Yes - Review when possible' 
                                  : 'No action required'}</p>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  No activities found matching your filters
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                className={page === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              // Show pages around the current page
              let pageNumber;
              if (totalPages <= 5) {
                pageNumber = i + 1;
              } else if (page <= 3) {
                pageNumber = i + 1;
              } else if (page >= totalPages - 2) {
                pageNumber = totalPages - 4 + i;
              } else {
                pageNumber = page - 2 + i;
              }
              
              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    isActive={pageNumber === page}
                    onClick={() => setPage(pageNumber)}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                className={page === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
      
      <div className="text-sm text-gray-500">
        Showing {paginatedLogs.length > 0 ? (page - 1) * itemsPerPage + 1 : 0} to {Math.min(page * itemsPerPage, filteredLogs.length)} of {filteredLogs.length} activities
      </div>
    </div>
  );
}
