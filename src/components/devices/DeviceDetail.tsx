
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Loader2 } from "lucide-react";
import { DeviceHeader } from "@/components/devices/device-detail/DeviceHeader";
import { DeviceInfoCard } from "@/components/devices/device-detail/DeviceInfoCard";
import { DeviceStorageCard } from "@/components/devices/device-detail/DeviceStorageCard";
import { DeviceLocationCard } from "@/components/devices/device-detail/DeviceLocationCard";
import { DeviceTabs } from "@/components/devices/device-detail/DeviceTabs";
import { useDevice, useDevices } from "@/hooks/useDevices";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export function DeviceDetail() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const { device, isLoading, error, handleRefresh } = useDevice(id);
  const { updateDevice } = useDevices();
  
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-[200px]" />
          <Skeleton className="h-[200px]" />
          <Skeleton className="h-[200px]" />
        </div>
        <Skeleton className="h-[300px]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Error loading device: {error instanceof Error ? error.message : 'Unknown error'}
          </AlertDescription>
        </Alert>
        <Button asChild className="mt-4">
          <Link to="/devices">Back to Devices</Link>
        </Button>
      </div>
    );
  }

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
    // This would connect to your MDM API
    updateDevice({
      id: device.id,
      status: 'offline'
    });
    
    toast({
      title: "Device Locked",
      description: `${device.name} has been locked remotely.`,
      duration: 3000,
    });
  };

  // Check for location using the correct property structure
  const hasLocation = device.location && device.location.latitude && device.location.longitude;

  return (
    <div className="space-y-6">
      <DeviceHeader 
        device={device} 
        onLockDevice={handleLockDevice} 
        onRefreshData={handleRefresh} 
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DeviceInfoCard device={device} />
        <DeviceStorageCard device={device} />
        {hasLocation && (
          <DeviceLocationCard device={device} />
        )}
      </div>

      <DeviceTabs deviceId={device.id} />
    </div>
  );
}
