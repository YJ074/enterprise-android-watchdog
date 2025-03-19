import { apiClient } from '../apiClient';
import { Device } from '../../types/device.types';
import { isMockEnvironment } from '../../supabase';
import { devices } from '../../mock/devices.data';

/**
 * Device API service for handling device-related operations
 */
export const deviceService = {
  /**
   * Get all devices
   */
  async getAllDevices() {
    if (isMockEnvironment) {
      // Use mock data in development
      return {
        data: devices,
        error: null,
        status: 200
      };
    }
    
    return apiClient.get<Device[]>('/devices');
  },
  
  /**
   * Get a single device by ID
   */
  async getDeviceById(id: string) {
    if (isMockEnvironment) {
      // Use mock data in development
      const device = devices.find(d => d.id === id) || null;
      return {
        data: device,
        error: device ? null : 'Device not found',
        status: device ? 200 : 404
      };
    }
    
    return apiClient.get<Device>(`/devices/${id}`);
  },
  
  /**
   * Create a new device
   */
  async createDevice(deviceData: Omit<Device, 'id'>) {
    return apiClient.post<Device>('/devices', deviceData);
  },
  
  /**
   * Update an existing device
   */
  async updateDevice(id: string, deviceData: Partial<Device>) {
    return apiClient.put<Device>(`/devices/${id}`, deviceData);
  },
  
  /**
   * Delete a device
   */
  async deleteDevice(id: string) {
    return apiClient.delete(`/devices/${id}`);
  },
  
  /**
   * Get devices filtered by department
   */
  async getDevicesByDepartment(department: string) {
    if (isMockEnvironment) {
      // Use mock data in development
      const filteredDevices = devices.filter(d => 
        d.department.toLowerCase() === department.toLowerCase()
      );
      return {
        data: filteredDevices,
        error: null,
        status: 200
      };
    }
    
    return apiClient.get<Device[]>('/devices', { 
      params: { department } 
    });
  },
  
  /**
   * Get devices with a specific status
   */
  async getDevicesByStatus(status: 'online' | 'offline' | 'warning' | 'compromised') {
    if (isMockEnvironment) {
      // Use mock data in development
      const filteredDevices = devices.filter(d => d.status === status);
      return {
        data: filteredDevices,
        error: null,
        status: 200
      };
    }
    
    return apiClient.get<Device[]>('/devices', { 
      params: { status } 
    });
  },
  
  /**
   * Get only PC and laptop devices
   */
  async getPCAndLaptopDevices() {
    if (isMockEnvironment) {
      // Use mock data in development
      const pcAndLaptopDevices = devices.filter(d => 
        d.model.toLowerCase().includes('laptop') || 
        d.model.toLowerCase().includes('desktop') ||
        d.model.toLowerCase().includes('pc')
      );
      
      return {
        data: pcAndLaptopDevices,
        error: null,
        status: 200
      };
    }
    
    return apiClient.get<Device[]>('/devices/computers', { 
      params: { types: 'laptop,desktop' } 
    });
  },
  
  /**
   * Get device metrics by type (PC, laptop, mobile, etc.)
   */
  async getDeviceMetricsByType() {
    if (isMockEnvironment) {
      // Return mock metrics data
      const { deviceTypeMetrics } = await import('../../mock/metrics.data');
      
      return {
        data: deviceTypeMetrics,
        error: null,
        status: 200
      };
    }
    
    return apiClient.get('/metrics/device-types');
  }
};
