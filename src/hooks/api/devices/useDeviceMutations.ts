
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deviceService } from '@/lib/api/services/deviceService';
import { Device } from '@/lib/types/device.types';
import { useToast } from '@/components/ui/use-toast';

export function useDeviceUpdateMutation(id: string | undefined) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Update a device
  const updateDeviceMutation = useMutation({
    mutationFn: async (updates: Partial<Device>) => {
      if (!id || !updates) {
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

  return {
    updateDevice: updateDeviceMutation.mutate
  };
}
