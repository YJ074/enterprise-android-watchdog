
import { BaseApiService } from '../BaseApiService';
import { Device } from '../../types/device.types';
import { isMockEnvironment } from '../../supabase';
import { devices } from '../../mock/devices.data';
import { ApiResponse } from '../apiClient';

class DeviceService extends BaseApiService<Device> {
  constructor() {
    super('/devices');
  }

  /**
   * Override getAll to support mock data in development
   */
  async getAllDevices(): Promise<ApiResponse<Device[]>> {
    if (isMockEnvironment) {
      return {
        data: devices,
        error: null,
        status: 200
      };
    }
    
    return super.getAll();
  }
  
  /**
   * Override getById to support mock data in development
   */
  async getDeviceById(id: string): Promise<ApiResponse<Device | null>> {
    if (isMockEnvironment) {
      const device = devices.find(d => d.id === id) || null;
      return {
        data: device,
        error: device ? null : 'Device not found',
        status: device ? 200 : 404
      };
    }
    
    return super.getById(id);
  }
  
  /**
   * Create a new device - uses base implementation
   */
  async createDevice(deviceData: Omit<Device, 'id'>): Promise<ApiResponse<Device>> {
    return super.create(deviceData);
  }
  
  /**
   * Update an existing device - uses base implementation
   */
  async updateDevice(id: string, deviceData: Partial<Device>): Promise<ApiResponse<Device>> {
    return super.update(id, deviceData);
  }
  
  /**
   * Delete a device - uses base implementation
   */
  async deleteDevice(id: string): Promise<ApiResponse<void>> {
    return super.delete(id);
  }
  
  /**
   * Get devices filtered by department
   */
  async getDevicesByDepartment(department: string): Promise<ApiResponse<Device[]>> {
    if (isMockEnvironment) {
      const filteredDevices = devices.filter(d => 
        d.department.toLowerCase() === department.toLowerCase()
      );
      return {
        data: filteredDevices,
        error: null,
        status: 200
      };
    }
    
    return super.getAll({ department });
  }
  
  /**
   * Get devices with a specific status
   */
  async getDevicesByStatus(status: 'online' | 'offline' | 'warning' | 'compromised'): Promise<ApiResponse<Device[]>> {
    if (isMockEnvironment) {
      const filteredDevices = devices.filter(d => d.status === status);
      return {
        data: filteredDevices,
        error: null,
        status: 200
      };
    }
    
    return super.getAll({ status });
  }
  
  /**
   * Get only PC and laptop devices
   */
  async getPCAndLaptopDevices(): Promise<ApiResponse<Device[]>> {
    if (isMockEnvironment) {
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
    
    return super.query<Device[]>('/computers', 'GET', undefined, { types: 'laptop,desktop' });
  }
  
  /**
   * Get device metrics by type (PC, laptop, mobile, etc.)
   */
  async getDeviceMetricsByType(): Promise<ApiResponse<any>> {
    if (isMockEnvironment) {
      // Return mock metrics data
      const { deviceTypeMetrics } = await import('../../mock/metrics.data');
      
      return {
        data: deviceTypeMetrics,
        error: null,
        status: 200
      };
    }
    
    return super.query('/metrics/device-types', 'GET');
  }
}

// Export a singleton instance
export const deviceService = new DeviceService();
