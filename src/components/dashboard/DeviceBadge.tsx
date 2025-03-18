
import { AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DeviceBadgeProps {
  status: 'online' | 'offline' | 'warning' | 'compromised';
}

export function DeviceBadge({ status }: DeviceBadgeProps) {
  return (
    <Badge 
      variant="outline" 
      className={status === 'offline' ? 'border-red-200 bg-red-50 text-red-700' : 'border-amber-200 bg-amber-50 text-amber-700'}
    >
      <AlertCircle className="h-3 w-3 mr-1" />
      {status === 'offline' ? 'Offline' : 'Inactive'}
    </Badge>
  );
}
