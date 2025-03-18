
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import { Database } from '@/lib/database.types';

export type Device = Database['public']['Tables']['devices']['Row'];
export type NewDevice = Database['public']['Tables']['devices']['Insert'];
export type UpdateDevice = Database['public']['Tables']['devices']['Update'];

export function useDevices() {
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
      const { data, error } = await supabase
        .from('devices')
        .select('*')
        .order('last_seen', { ascending: false });

      if (error) {
        console.error('Error fetching devices:', error);
        toast({
          title: 'Error fetching devices',
          description: error.message,
          variant: 'destructive',
        });
        throw error;
      }

      return data || [];
    },
  });

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
export function useDevice(id: string | undefined) {
  const { toast } = useToast();

  const {
    data: device,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['device', id],
    queryFn: async () => {
      if (!id) return null;

      const { data, error } = await supabase
        .from('devices')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching device:', error);
        toast({
          title: 'Error fetching device',
          description: error.message,
          variant: 'destructive',
        });
        throw error;
      }

      return data;
    },
    enabled: !!id,
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
    handleRefresh,
  };
}
