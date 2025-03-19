
import React from 'react';
import { Device } from '@/lib/types/device.types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DeviceBadge } from '@/components/dashboard/DeviceBadge';
import { DeviceBatteryIndicator } from '@/components/dashboard/DeviceBatteryIndicator';
import { DeviceInfoContent } from './banners/DeviceInfoContent';
import { Laptop, Smartphone, Tablet, Clock, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DeviceInfoBannerProps {
  device: Device;
}

export const DeviceInfoBanner: React.FC<DeviceInfoBannerProps> = ({ device }) => {
  const [expanded, setExpanded] = React.useState(false);

  const getDeviceIcon = () => {
    const type = device.type?.toLowerCase() || '';
    
    if (type.includes('laptop') || type.includes('computer')) {
      return <Laptop className="h-5 w-5 text-blue-600" />;
    } else if (type.includes('tablet')) {
      return <Tablet className="h-5 w-5 text-green-600" />;
    } else {
      return <Smartphone className="h-5 w-5 text-purple-600" />;
    }
  };

  return (
    <Card className="border-blue-100 bg-blue-50/50 mb-4 overflow-hidden">
      <CardContent className="p-0">
        <div className="p-4 flex flex-col md:flex-row justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-white shadow-sm">
              {getDeviceIcon()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-lg">{device.name}</h3>
                <DeviceBadge status={device.status} />
              </div>
              <p className="text-sm text-muted-foreground">
                {device.model} • {device.osVersion}
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-md shadow-sm">
              <DeviceBatteryIndicator level={device.batteryLevel} />
              <span className="font-medium">{device.batteryLevel}%</span>
            </div>
            
            <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-md shadow-sm">
              <Clock className="h-4 w-4 text-gray-500" />
              <span>Last seen: {new Date(device.lastSeen).toLocaleString()}</span>
            </div>
            
            {device.location && (
              <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-md shadow-sm">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span>{device.location}</span>
              </div>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              className="ml-auto"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-1" />
                  Less info
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-1" />
                  More info
                </>
              )}
            </Button>
            
            <Button variant="outline" size="sm" asChild>
              <Link to={`/device/${device.id}`}>
                View Device
              </Link>
            </Button>
          </div>
        </div>
        
        {expanded && (
          <div className="px-4 pb-4 pt-2 border-t border-blue-100 bg-white">
            <DeviceInfoContent device={device} />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
