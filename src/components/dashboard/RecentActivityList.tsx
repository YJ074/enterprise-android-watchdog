
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { activityLogs } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export function RecentActivityList() {
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

  const recentLogs = [...activityLogs].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  ).slice(0, 5);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentLogs.map((log) => (
            <div key={log.id} className="flex items-start gap-4 p-3 rounded-md bg-muted/30">
              <div className="text-2xl">{getActivityIcon(log.type)}</div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm">{log.details}</h4>
                  {getSeverityBadge(log.severity)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Device ID: {log.deviceId} • {format(new Date(log.timestamp), "PPpp")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
