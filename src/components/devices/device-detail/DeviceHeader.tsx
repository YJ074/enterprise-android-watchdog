
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Lock, RefreshCw, ShieldCheck } from "lucide-react";
import { DeviceBadge } from "@/components/dashboard/DeviceBadge";

type DeviceHeaderProps = {
  device: {
    name: string;
    status: string;
  };
  onLockDevice: () => void;
  onRefreshData: () => void;
};

export function DeviceHeader({ device, onLockDevice, onRefreshData }: DeviceHeaderProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-gray-400';
      case 'warning': return 'bg-yellow-500';
      case 'compromised': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link to="/devices">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">{device.name}</h1>
        <div className={`w-3 h-3 rounded-full ${getStatusColor(device.status)}`} />
        <DeviceBadge status={device.status as 'online' | 'offline' | 'warning' | 'compromised'} />
      </div>
      <div className="flex gap-2">
        <Button variant="outline" onClick={onRefreshData}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
        <Button variant="outline" onClick={onLockDevice}>
          <Lock className="h-4 w-4 mr-2" />
          Lock Device
        </Button>
        <Button>
          <ShieldCheck className="h-4 w-4 mr-2" />
          Security Actions
        </Button>
      </div>
    </div>
  );
}
