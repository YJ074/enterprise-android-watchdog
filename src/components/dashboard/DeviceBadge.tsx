
import { AlertCircle, Wifi, AlertTriangle, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DeviceBadgeProps {
  status: 'online' | 'offline' | 'warning' | 'compromised';
}

export function DeviceBadge({ status }: DeviceBadgeProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'online':
        return {
          icon: <Wifi className="h-3 w-3 mr-1" />,
          text: 'Online',
          className: 'border-green-200 bg-green-50 text-green-700'
        };
      case 'offline':
        return {
          icon: <AlertCircle className="h-3 w-3 mr-1" />,
          text: 'Offline',
          className: 'border-gray-200 bg-gray-50 text-gray-700'
        };
      case 'warning':
        return {
          icon: <AlertTriangle className="h-3 w-3 mr-1" />,
          text: 'Warning',
          className: 'border-amber-200 bg-amber-50 text-amber-700'
        };
      case 'compromised':
        return {
          icon: <ShieldAlert className="h-3 w-3 mr-1" />,
          text: 'Compromised',
          className: 'border-red-200 bg-red-50 text-red-700'
        };
      default:
        return {
          icon: <AlertCircle className="h-3 w-3 mr-1" />,
          text: 'Unknown',
          className: 'border-gray-200 bg-gray-50 text-gray-700'
        };
    }
  };

  const { icon, text, className } = getStatusConfig();

  return (
    <Badge 
      variant="outline" 
      className={className}
    >
      {icon}
      {text}
    </Badge>
  );
}
