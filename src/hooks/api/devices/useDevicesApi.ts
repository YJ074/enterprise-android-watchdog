
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { deviceService } from '@/lib/api/services/deviceService';
import { useToast } from '@/components/ui/use-toast';
import { useDevicesMutations } from './useDevicesMutations';
import { useDevicesQuery } from './useDevicesQuery';
import { Device } from '@/lib/types/device.types';

export function useDevicesApi() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Use the extracted query hook
  const { devices, isLoading, error, refetch } = useDevicesQuery();
  
  // Use the extracted mutations
  const { addDevice, updateDevice, deleteDevice } = useDevicesMutations();

  const handleRefresh = () => {
    refetch();
    toast({
      title: 'Refreshing Data',
      description: 'Fetching the latest device information...',
    });
  };

  // Bulk operations
  const bulkUpdateDevices = (deviceIds: string[], updates: Partial<Device>) => {
    const promises = deviceIds.map(id => 
      deviceService.updateDevice(id, updates)
    );
    
    Promise.all(promises)
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ['devices'] });
        toast({
          title: 'Bulk Update Successful',
          description: `Updated ${deviceIds.length} devices successfully.`,
        });
      })
      .catch(error => {
        console.error('Error performing bulk update:', error);
        toast({
          title: 'Bulk Update Failed',
          description: 'Some devices could not be updated. Please try again.',
          variant: 'destructive',
        });
      });
  };
  
  const bulkDeleteDevices = (deviceIds: string[]) => {
    const promises = deviceIds.map(id => 
      deviceService.deleteDevice(id)
    );
    
    Promise.all(promises)
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ['devices'] });
        toast({
          title: 'Bulk Delete Successful',
          description: `Deleted ${deviceIds.length} devices successfully.`,
        });
      })
      .catch(error => {
        console.error('Error performing bulk delete:', error);
        toast({
          title: 'Bulk Delete Failed',
          description: 'Some devices could not be deleted. Please try again.',
          variant: 'destructive',
        });
      });
  };

  return {
    devices,
    isLoading,
    error,
    addDevice,
    updateDevice,
    deleteDevice,
    bulkUpdateDevices,
    bulkDeleteDevices,
    handleRefresh,
  };
}
