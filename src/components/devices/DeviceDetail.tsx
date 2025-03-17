
import { useParams, Link } from "react-router-dom";
import { devices } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Lock, RefreshCw, ShieldCheck } from "lucide-react";
import { DeviceHeader } from "@/components/devices/device-detail/DeviceHeader";
import { DeviceInfoCard } from "@/components/devices/device-detail/DeviceInfoCard";
import { DeviceStorageCard } from "@/components/devices/device-detail/DeviceStorageCard";
import { DeviceLocationCard } from "@/components/devices/device-detail/DeviceLocationCard";
import { DeviceTabs } from "@/components/devices/device-detail/DeviceTabs";

export function DeviceDetail() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  
  const device = devices.find(d => d.id === id);
  
  if (!device) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Device Not Found</h1>
        <p>The device with ID {id} was not found.</p>
        <Button asChild className="mt-4">
          <Link to="/devices">Back to Devices</Link>
        </Button>
      </div>
    );
  }

  const handleLockDevice = () => {
    toast({
      title: "Device Locked",
      description: `${device.name} has been locked remotely.`,
      duration: 3000,
    });
  };

  const handleRefreshData = () => {
    toast({
      title: "Data Refreshed",
      description: `${device.name} data has been refreshed.`,
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6">
      <DeviceHeader 
        device={device} 
        onLockDevice={handleLockDevice} 
        onRefreshData={handleRefreshData} 
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DeviceInfoCard device={device} />
        <DeviceStorageCard device={device} />
        <DeviceLocationCard device={device} />
      </div>

      <DeviceTabs deviceId={device.id} />
    </div>
  );
}
