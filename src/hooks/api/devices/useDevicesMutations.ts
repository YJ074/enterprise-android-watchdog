
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deviceService } from '@/lib/api/services/deviceService';
import { Device } from '@/lib/types/device.types';
import { useToast } from '@/components/ui/use-toast';

export function useDevicesMutations() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

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

  return {
    addDevice: addDeviceMutation.mutate,
    updateDevice: updateDeviceMutation.mutate,
    deleteDevice: deleteDeviceMutation.mutate,
  };
}
