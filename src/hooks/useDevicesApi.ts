
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { deviceService } from '@/lib/api/services/deviceService';
import { Device } from '@/lib/types/device.types';
import { useToast } from '@/components/ui/use-toast';

export function useDevicesApi() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch all devices
  const {
    data: devices = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['devices'],
    queryFn: async () => {
      const response = await deviceService.getAllDevices();
      
      if (response.error) {
        console.error('Error fetching devices:', response.error);
        toast({
          title: 'Error fetching devices',
          description: response.error,
          variant: 'destructive',
        });
        throw new Error(response.error);
      }
      
      return response.data || [];
    },
  });

  // Add a new device
  const addDeviceMutation = useMutation({
    mutationFn: async (newDevice: Omit<Device, 'id'>) => {
      const response = await deviceService.createDevice(newDevice);
      
      if (response.error) {
        console.error('Error adding device:', response.error);
        toast({
          title: 'Error adding device',
          description: response.error,
          variant: 'destructive',
        });
        throw new Error(response.error);
      }
      
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devices'] });
      toast({
        title: 'Device Added',
        description: 'The device has been added successfully.',
      });
    },
  });

  // Update a device
  const updateDeviceMutation = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Device> & { id: string }) => {
      const response = await deviceService.updateDevice(id, updates);
      
      if (response.error) {
        console.error('Error updating device:', response.error);
        toast({
          title: 'Error updating device',
          description: response.error,
          variant: 'destructive',
        });
        throw new Error(response.error);
      }
      
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devices'] });
      toast({
        title: 'Device Updated',
        description: 'The device has been updated successfully.',
      });
    },
  });

  // Delete a device
  const deleteDeviceMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await deviceService.deleteDevice(id);
      
      if (response.error) {
        console.error('Error deleting device:', response.error);
        toast({
          title: 'Error deleting device',
          description: response.error,
          variant: 'destructive',
        });
        throw new Error(response.error);
      }
      
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devices'] });
      toast({
        title: 'Device Deleted',
        description: 'The device has been deleted successfully.',
      });
    },
  });

  const handleRefresh = () => {
    refetch();
    toast({
      title: 'Refreshing Data',
      description: 'Fetching the latest device information...',
    });
  };

  return {
    devices,
    isLoading,
    error,
    addDevice: addDeviceMutation.mutate,
    updateDevice: updateDeviceMutation.mutate,
    deleteDevice: deleteDeviceMutation.mutate,
    handleRefresh,
  };
}

// Hook to fetch a single device by ID
export function useDeviceApi(id: string | undefined) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: device,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['device', id],
    queryFn: async () => {
      if (!id) return null;

      const response = await deviceService.getDeviceById(id);
      
      if (response.error) {
        console.error('Error fetching device:', response.error);
        toast({
          title: 'Error fetching device',
          description: response.error,
          variant: 'destructive',
        });
        throw new Error(response.error);
      }
      
      return response.data;
    },
    enabled: !!id,
  });

  // Update a device
  const updateDeviceMutation = useMutation({
    mutationFn: async (updates: Partial<Device>) => {
      if (!id || !device) {
        throw new Error('No device ID provided for update');
      }

      const response = await deviceService.updateDevice(id, updates);
      
      if (response.error) {
        console.error('Error updating device:', response.error);
        toast({
          title: 'Error updating device',
          description: response.error,
          variant: 'destructive',
        });
        throw new Error(response.error);
      }
      
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['device', id] });
      queryClient.invalidateQueries({ queryKey: ['devices'] });
      toast({
        title: 'Device Updated',
        description: 'The device has been updated successfully.',
      });
    },
  });

  const handleRefresh = () => {
    refetch();
    toast({
      title: 'Refreshing Device',
      description: 'Fetching the latest device information...',
    });
  };

  return {
    device,
    isLoading,
    error,
    updateDevice: updateDeviceMutation.mutate,
    handleRefresh,
  };
}
