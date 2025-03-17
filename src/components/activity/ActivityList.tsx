
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
import { User, Shield, Monitor, Info, Eye, MessageSquare, Mail, PhoneCall, Globe, Clock, FileText } from "lucide-react";

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
  const [appFilter, setAppFilter] = useState("all");
  const [durationFilter, setDurationFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [expandedLog, setExpandedLog] = useState<string | null>(null);
  const itemsPerPage = 10;

  // Enhanced activity type mapping
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
      case 'whatsapp_message':
        return "💬";
      case 'gmail_access':
        return "📧";
      case 'call_recorded':
        return "📞";
      case 'screenshot':
        return "📸";
      case 'keylogger':
        return "⌨️";
      case 'browsing_history':
        return "🌐";
      case 'file_access':
        return "📄";
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
      case 'location_change':
        return <Shield className="h-4 w-4" />;
      case 'whatsapp_message':
        return <MessageSquare className="h-4 w-4" />;
      case 'gmail_access':
        return <Mail className="h-4 w-4" />;
      case 'call_recorded':
        return <PhoneCall className="h-4 w-4" />;
      case 'browsing_history':
        return <Globe className="h-4 w-4" />;
      case 'screenshot':
      case 'keylogger':
        return <Monitor className="h-4 w-4" />;
      case 'file_access':
        return <FileText className="h-4 w-4" />;
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
      case 'whatsapp_message':
      case 'gmail_access':
      case 'call_recorded':
        return "communication";
      case 'screenshot':
      case 'keylogger':
      case 'browsing_history':
      case 'file_access':
        return "monitoring";
      default:
        return "other";
    }
  };

  const getAppNameFromDetails = (details: string) => {
    const appMatches = details.match(/in (.*?)( on| at|$)/);
    if (appMatches && appMatches[1]) {
      return appMatches[1];
    }
    return null;
  };

  const getDurationFromDetails = (details: string) => {
    const durationMatches = details.match(/for (\d+) (second|minute|hour|day)s?/);
    if (durationMatches && durationMatches[1] && durationMatches[2]) {
      return {
        value: parseInt(durationMatches[1], 10),
        unit: durationMatches[2]
      };
    }
    return null;
  };

  const formatDuration = (duration: { value: number, unit: string }) => {
    return `${duration.value} ${duration.unit}${duration.value !== 1 ? 's' : ''}`;
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

  // Enhanced filtering logic
  const filteredLogs = activityLogs.filter(log => {
    // Filter by search term
    const matchesSearch = 
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.deviceId.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by type
    const matchesType = typeFilter === "all" || log.type === typeFilter;
    
    // Filter by severity
    const matchesSeverity = severityFilter === "all" || log.severity === severityFilter;
    
    // Filter by app if applicable
    let matchesApp = true;
    if (appFilter !== "all") {
      const appName = getAppNameFromDetails(log.details);
      matchesApp = appName?.toLowerCase().includes(appFilter.toLowerCase()) || false;
    }
    
    // Filter by duration if applicable
    let matchesDuration = true;
    if (durationFilter !== "all") {
      const duration = getDurationFromDetails(log.details);
      
      if (durationFilter === "short" && duration) {
        matchesDuration = 
          (duration.unit === "second") || 
          (duration.unit === "minute" && duration.value <= 5);
      } else if (durationFilter === "medium" && duration) {
        matchesDuration = 
          (duration.unit === "minute" && duration.value > 5 && duration.value <= 30) ||
          (duration.unit === "hour" && duration.value === 1);
      } else if (durationFilter === "long" && duration) {
        matchesDuration = 
          (duration.unit === "hour" && duration.value > 1) ||
          (duration.unit === "day");
      } else if (!duration) {
        matchesDuration = false;
      }
    }
    
    // Filter by tab
    let matchesTab = activeTab === "all";
    
    if (!matchesTab) {
      const category = getActivityCategory(log.type);
      
      if (activeTab === "security" && category === "security") {
        matchesTab = true;
      } else if (activeTab === "system" && category === "system") {
        matchesTab = true;
      } else if (activeTab === "user" && category === "user") {
        matchesTab = true;
      } else if (activeTab === "communication" && category === "communication") {
        matchesTab = true;
      } else if (activeTab === "monitoring" && category === "monitoring") {
        matchesTab = true;
      }
    }
    
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
    
    return matchesSearch && matchesType && matchesSeverity && matchesTab && matchesDateRange && matchesApp && matchesDuration;
  });
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const paginatedLogs = filteredLogs.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // Collect unique app names for filter
  const uniqueApps = new Set<string>();
  activityLogs.forEach(log => {
    const appName = getAppNameFromDetails(log.details);
    if (appName) {
      uniqueApps.add(appName);
    }
  });

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [searchTerm, typeFilter, severityFilter, appFilter, durationFilter, activeTab, dateRange]);

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
        <div className="flex flex-wrap gap-2">
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
              <SelectItem value="whatsapp_message">WhatsApp Message</SelectItem>
              <SelectItem value="gmail_access">Gmail Access</SelectItem>
              <SelectItem value="call_recorded">Call Recording</SelectItem>
              <SelectItem value="screenshot">Screenshot</SelectItem>
              <SelectItem value="keylogger">Keylogger</SelectItem>
              <SelectItem value="browsing_history">Browsing History</SelectItem>
              <SelectItem value="file_access">File Access</SelectItem>
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
          
          <Select value={appFilter} onValueChange={setAppFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by application" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Applications</SelectItem>
              {Array.from(uniqueApps).map(app => (
                <SelectItem key={app} value={app}>{app}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={durationFilter} onValueChange={setDurationFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Durations</SelectItem>
              <SelectItem value="short">Short (< 5 min)</SelectItem>
              <SelectItem value="medium">Medium (5-30 min)</SelectItem>
              <SelectItem value="long">Long (> 30 min)</SelectItem>
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
                              {log.type === 'call_recorded' && (
                                <p><strong>Duration:</strong> {getDurationFromDetails(log.details) ? 
                                  formatDuration(getDurationFromDetails(log.details)!) : 'N/A'}</p>
                              )}
                              {log.type === 'whatsapp_message' && (
                                <>
                                  <p><strong>Contact:</strong> {log.details.match(/with (.*?)( at|$)/) ? 
                                    log.details.match(/with (.*?)( at|$)/)![1] : 'Unknown'}</p>
                                  <p><strong>Direction:</strong> {log.details.includes('sent to') ? 'Outgoing' : 'Incoming'}</p>
                                </>
                              )}
                            </div>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-1">Device Information</h4>
                            <div className="text-sm">
                              <p><strong>Device ID:</strong> {log.deviceId}</p>
                              <p><strong>Timestamp:</strong> {format(new Date(log.timestamp), "PPpp")}</p>
                              {getAppNameFromDetails(log.details) && (
                                <p><strong>Application:</strong> {getAppNameFromDetails(log.details)}</p>
                              )}
                              {log.type === 'browsing_history' && (
                                <p><strong>Browser:</strong> {log.details.includes('Chrome') ? 'Chrome' : 
                                  log.details.includes('Firefox') ? 'Firefox' : 
                                  log.details.includes('Safari') ? 'Safari' : 'Unknown'}</p>
                              )}
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
                              {(log.type === 'screenshot' || log.type === 'call_recorded') && (
                                <div className="mt-2">
                                  <Button variant="outline" size="sm">
                                    <Eye className="h-4 w-4 mr-2" />
                                    View Content
                                  </Button>
                                </div>
                              )}
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
