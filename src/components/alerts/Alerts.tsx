
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  AlertTriangle,
  Bell,
  CheckCircle,
  Info,
  Search,
  Shield,
  X,
} from "lucide-react";

interface AlertItem {
  id: string;
  title: string;
  description: string;
  severity: "critical" | "warning" | "info";
  timestamp: string;
  read: boolean;
}

const initialAlerts: AlertItem[] = [
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
  {
    id: "a4",
    title: "Multiple Login Attempts",
    description: "Multiple failed login attempts detected for user john.doe@enterprise.com",
    severity: "critical",
    timestamp: "2025-03-16T10:22:45Z",
    read: true,
  },
  {
    id: "a5",
    title: "Low Storage Space",
    description: "5 devices are running low on storage space.",
    severity: "warning",
    timestamp: "2025-03-15T16:08:33Z",
    read: true,
  },
];

export function Alerts() {
  const [alerts, setAlerts] = useState<AlertItem[]>(initialAlerts);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const filteredAlerts = alerts.filter(alert => 
    alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alert.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const unreadCount = alerts.filter(alert => !alert.read).length;

  const markAsRead = (id: string) => {
    setAlerts(
      alerts.map((alert) =>
        alert.id === id ? { ...alert, read: true } : alert
      )
    );
    toast({
      title: "Alert marked as read",
      duration: 3000,
    });
  };

  const deleteAlert = (id: string) => {
    setAlerts(alerts.filter((alert) => alert.id !== id));
    toast({
      title: "Alert deleted",
      duration: 3000,
    });
  };

  const markAllAsRead = () => {
    setAlerts(alerts.map((alert) => ({ ...alert, read: true })));
    toast({
      title: "All alerts marked as read",
      duration: 3000,
    });
  };

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

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge className="bg-red-500">Critical</Badge>;
      case "warning":
        return <Badge className="bg-yellow-500">Warning</Badge>;
      case "info":
        return <Badge className="bg-blue-500">Info</Badge>;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Alerts</h1>
          {unreadCount > 0 && (
            <Badge className="bg-red-500">{unreadCount} new</Badge>
          )}
        </div>
        
        <div className="flex space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search alerts..."
              className="pl-8 w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0}>
            <CheckCircle className="h-4 w-4 mr-2" />
            Mark all as read
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Alert Center
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredAlerts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No alerts match your search
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={cn(
                    "p-4 rounded-md border transition-colors",
                    !alert.read && "bg-muted"
                  )}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3">
                      {getAlertIcon(alert.severity)}
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{alert.title}</h3>
                          {getSeverityBadge(alert.severity)}
                          {!alert.read && (
                            <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-800">
                              New
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {alert.description}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {formatDate(alert.timestamp)}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {!alert.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(alert.id)}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteAlert(alert.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
