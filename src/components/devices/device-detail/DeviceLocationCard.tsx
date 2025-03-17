
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";

type DeviceLocationCardProps = {
  device: {
    user: string;
    department: string;
    location?: {
      address: string;
      latitude: number;
      longitude: number;
    };
  };
};

export function DeviceLocationCard({ device }: DeviceLocationCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">User & Location</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <span className="text-sm text-muted-foreground">Assigned To</span>
            <div className="font-medium text-lg">{device.user}</div>
            <div className="text-sm text-muted-foreground">{device.department} Department</div>
          </div>
          
          {device.location && (
            <div>
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Last Known Location</span>
              </div>
              <div className="text-sm">{device.location.address}</div>
              <div className="text-xs text-muted-foreground mt-1">
                Lat: {device.location.latitude.toFixed(4)}, Long: {device.location.longitude.toFixed(4)}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
