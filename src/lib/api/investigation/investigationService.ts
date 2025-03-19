
import { BaseApiService } from '../BaseApiService';
import { ApiResponse } from '../apiClient';

export interface InvestigationLog {
  id: string;
  timestamp: string;
  type: 'whatsapp' | 'call' | 'email' | 'screen' | 'file' | 'social' | 'system';
  content: string;
  source: string;
  metadata: Record<string, any>;
}

export interface Investigation {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate?: string;
  status: 'active' | 'completed' | 'archived';
  deviceIds: string[];
  logs: InvestigationLog[];
}

type CreateInvestigationDto = Omit<Investigation, 'id' | 'logs'>;
type UpdateInvestigationDto = Partial<Omit<Investigation, 'id' | 'logs'>>;

class InvestigationService extends BaseApiService<Investigation, CreateInvestigationDto, UpdateInvestigationDto> {
  constructor() {
    super('/investigations');
  }

  /**
   * Get all investigations - uses base implementation
   */
  async getInvestigations(): Promise<ApiResponse<Investigation[]>> {
    return super.getAll();
  }
  
  /**
   * Get a specific investigation - uses base implementation
   */
  async getInvestigation(id: string): Promise<ApiResponse<Investigation>> {
    return super.getById(id);
  }
  
  /**
   * Create a new investigation - uses base implementation
   */
  async createInvestigation(data: CreateInvestigationDto): Promise<ApiResponse<Investigation>> {
    return super.create(data);
  }
  
  /**
   * Update an investigation - uses base implementation
   */
  async updateInvestigation(id: string, data: UpdateInvestigationDto): Promise<ApiResponse<Investigation>> {
    return super.update(id, data);
  }
  
  /**
   * Delete an investigation - uses base implementation
   */
  async deleteInvestigation(id: string): Promise<ApiResponse<void>> {
    return super.delete(id);
  }
  
  /**
   * Get logs for a specific device
   */
  async getDeviceInvestigationLogs(deviceId: string, options: {
    startDate?: string;
    endDate?: string;
    types?: string[];
  } = {}): Promise<ApiResponse<InvestigationLog[]>> {
    return this.query<InvestigationLog[]>(`/devices/${deviceId}/logs`, 'GET', undefined, options as any);
  }
  
  /**
   * Search logs with filters
   */
  async searchLogs(query: string, options: {
    deviceIds?: string[];
    startDate?: string;
    endDate?: string;
    types?: string[];
  } = {}): Promise<ApiResponse<InvestigationLog[]>> {
    return this.query<InvestigationLog[]>('/logs/search', 'GET', undefined, {
      query,
      ...options
    } as any);
  }
}

// Export a singleton instance
export const investigationService = new InvestigationService();
