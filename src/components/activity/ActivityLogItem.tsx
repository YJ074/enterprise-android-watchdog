
import { useState } from "react";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableRow, TableCell } from "@/components/ui/table";
import { format } from "date-fns";
import { ActivityLog } from "@/lib/mock-data";
import { 
  getActivityIcon, 
  getActivityCategoryIcon, 
  getActivityCategory, 
  getAppNameFromDetails,
  getDurationFromDetails, 
  formatDuration, 
  getSeverityBadge 
} from "./utils/activityHelpers";

interface ActivityLogItemProps {
  log: ActivityLog;
  expandedLog: string | null;
  onToggleExpand: (id: string) => void;
}

export function ActivityLogItem({ log, expandedLog, onToggleExpand }: ActivityLogItemProps) {
  const isExpanded = expandedLog === log.id;
  
  return (
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
            onClick={() => onToggleExpand(log.id)}
          >
            <Eye className="h-4 w-4" />
          </Button>
        </TableCell>
      </TableRow>
      
      {isExpanded && (
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
  );
}
