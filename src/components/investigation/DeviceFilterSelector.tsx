
import React, { useState } from 'react';
import { Check, ChevronDown, LaptopIcon, SmartphoneIcon, TabletIcon, DevicesIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface DeviceOption {
  id: string;
  name: string;
  type: string;
  model: string;
  status: string;
}

interface DeviceFilterSelectorProps {
  devices: DeviceOption[];
  selectedDevices: string[];
  onSelectionChange: (selectedIds: string[]) => void;
  className?: string;
}

export function DeviceFilterSelector({
  devices,
  selectedDevices,
  onSelectionChange,
  className,
}: DeviceFilterSelectorProps) {
  const [open, setOpen] = useState(false);

  const getDeviceIcon = (type: string) => {
    const typeLC = type.toLowerCase();
    if (typeLC.includes('laptop') || typeLC.includes('computer')) {
      return <LaptopIcon className="h-4 w-4 mr-2 text-blue-500" />;
    } else if (typeLC.includes('tablet')) {
      return <TabletIcon className="h-4 w-4 mr-2 text-green-500" />;
    } else if (typeLC.includes('phone') || typeLC.includes('mobile')) {
      return <SmartphoneIcon className="h-4 w-4 mr-2 text-purple-500" />;
    } else {
      return <DevicesIcon className="h-4 w-4 mr-2 text-gray-500" />;
    }
  };

  const toggleDevice = (deviceId: string) => {
    if (selectedDevices.includes(deviceId)) {
      onSelectionChange(selectedDevices.filter(id => id !== deviceId));
    } else {
      onSelectionChange([...selectedDevices, deviceId]);
    }
  };

  const selectAll = () => {
    onSelectionChange(devices.map(device => device.id));
  };

  const clearAll = () => {
    onSelectionChange([]);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("justify-between", className)}
        >
          <div className="flex items-center gap-1 truncate">
            <DevicesIcon className="h-4 w-4 mr-1" />
            {selectedDevices.length === 0
              ? "Select devices..."
              : selectedDevices.length === 1
              ? `${devices.find(d => d.id === selectedDevices[0])?.name || 'Unknown device'}`
              : `${selectedDevices.length} devices selected`}
          </div>
          <ChevronDown className="h-4 w-4 ml-1 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[300px]" align="start">
        <Command>
          <CommandInput placeholder="Search devices..." />
          <CommandList>
            <CommandEmpty>No devices found.</CommandEmpty>
            <CommandGroup>
              <div className="p-2 flex justify-between">
                <Button variant="ghost" size="sm" onClick={selectAll}>Select all</Button>
                <Button variant="ghost" size="sm" onClick={clearAll}>Clear all</Button>
              </div>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Devices">
              {devices.map((device) => (
                <CommandItem
                  key={device.id}
                  onSelect={() => toggleDevice(device.id)}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center">
                    {getDeviceIcon(device.type)}
                    <span className="mr-1">{device.name}</span>
                    <Badge variant="outline" className="ml-1 text-xs">
                      {device.status}
                    </Badge>
                  </div>
                  <Check
                    className={cn(
                      "h-4 w-4 shrink-0",
                      selectedDevices.includes(device.id)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
