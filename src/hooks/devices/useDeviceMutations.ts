
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import { Device, NewDevice, UpdateDevice } from './types';

export function useDeviceMutations() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Add a new device
  const addDeviceMutation = useMutation({
    mutationFn: async (newDevice: NewDevice) => {
      const { data, error } = await supabase
        .from('devices')
        .insert([{
          ...newDevice,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          last_seen: new Date().toISOString(),
        }])
        .select()
        .single();

      if (error) {
        console.error('Error adding device:', error);
        toast({
          title: 'Error adding device',
          description: error.message,
          variant: 'destructive',
        });
        throw error;
      }

      return data;
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
    mutationFn: async ({ id, ...updates }: UpdateDevice & { id: string }) => {
      const { data, error } = await supabase
        .from('devices')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating device:', error);
        toast({
          title: 'Error updating device',
          description: error.message,
          variant: 'destructive',
        });
        throw error;
      }

      return data;
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
      const { error } = await supabase
        .from('devices')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting device:', error);
        toast({
          title: 'Error deleting device',
          description: error.message,
          variant: 'destructive',
        });
        throw error;
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
