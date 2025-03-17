
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Bell, Info, Shield } from "lucide-react";
import { Link } from "react-router-dom";

interface AlertItem {
  id: string;
  title: string;
  description: string;
  severity: "critical" | "warning" | "info";
  timestamp: string;
  read: boolean;
}

const recentAlerts: AlertItem[] = [
  {
    id: "a1",
    title: "Security Breach Detected",
    description: "A potential security breach was detected on device MDA-5432.",
    severity: "critical",
    timestamp: "2025-03-17T08:15:44Z",
    read: false,
  },
  {
    id: "a2",
    title: "Device Update Required",
    description: "10 devices require a security update.",
    severity: "warning",
    timestamp: "2025-03-17T07:30:22Z",
    read: false,
  },
  {
    id: "a3",
    title: "New Policy Applied",
    description: "New security policy has been applied to all devices.",
    severity: "info",
    timestamp: "2025-03-16T14:45:12Z",
    read: true,
  },
];

export function RecentAlerts() {
  const getAlertIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "warning":
        return <Shield className="h-5 w-5 text-yellow-500" />;
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return <Info className="h-5 w-5" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Recent Alerts
        </CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/alerts">View all</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentAlerts.map((alert) => (
            <div
              key={alert.id}
              className="flex items-start gap-3 p-3 rounded-md bg-muted/30"
            >
              {getAlertIcon(alert.severity)}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-sm">{alert.title}</h4>
                  {!alert.read && (
                    <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-800">
                      New
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {alert.description}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatDate(alert.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
