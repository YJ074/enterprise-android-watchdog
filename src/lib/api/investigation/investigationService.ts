
import { apiClient } from '../apiClient';

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

export const investigationService = {
  async getInvestigations() {
    return apiClient.get<Investigation[]>('/investigations');
  },
  
  async getInvestigation(id: string) {
    return apiClient.get<Investigation>(`/investigations/${id}`);
  },
  
  async createInvestigation(data: Omit<Investigation, 'id' | 'logs'>) {
    return apiClient.post<Investigation>('/investigations', data);
  },
  
  async updateInvestigation(id: string, data: Partial<Omit<Investigation, 'id' | 'logs'>>) {
    return apiClient.put<Investigation>(`/investigations/${id}`, data);
  },
  
  async deleteInvestigation(id: string) {
    return apiClient.delete(`/investigations/${id}`);
  },
  
  async getDeviceInvestigationLogs(deviceId: string, options: {
    startDate?: string;
    endDate?: string;
    types?: string[];
  } = {}) {
    return apiClient.get<InvestigationLog[]>(`/devices/${deviceId}/logs`, { 
      params: options as any 
    });
  },
  
  async searchLogs(query: string, options: {
    deviceIds?: string[];
    startDate?: string;
    endDate?: string;
    types?: string[];
  } = {}) {
    return apiClient.get<InvestigationLog[]>('/logs/search', {
      params: {
        query,
        ...options
      } as any
    });
  }
};
