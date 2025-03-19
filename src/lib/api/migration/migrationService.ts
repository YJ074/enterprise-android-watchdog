
import { BaseApiService } from '../BaseApiService';
import { ApiResponse } from '../apiClient';

export type MigrationType = 'device' | 'user' | 'policy' | 'settings';
export type MigrationStatus = 'pending' | 'in-progress' | 'completed' | 'failed';

export interface Migration {
  id: string;
  name: string;
  description?: string;
  type: MigrationType;
  status: MigrationStatus;
  source: string;
  destination: string;
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
  recordCount: number;
  includeAttachments: boolean;
  includeHistoricalData: boolean;
  createdBy: string;
  logs?: MigrationLog[];
}

export interface MigrationLog {
  id: string;
  migrationId: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error';
  message: string;
  metadata?: Record<string, any>;
}

type CreateMigrationDto = Omit<Migration, 'id' | 'status' | 'createdAt' | 'startedAt' | 'completedAt' | 'logs'>;
type UpdateMigrationDto = Partial<Omit<Migration, 'id' | 'logs'>>;

class MigrationService extends BaseApiService<Migration, CreateMigrationDto, UpdateMigrationDto> {
  constructor() {
    super('/migrations');
  }

  /**
   * Get all migrations
   */
  async getMigrations(params?: Record<string, any>): Promise<ApiResponse<Migration[]>> {
    return super.getAll(params);
  }

  /**
   * Get a specific migration
   */
  async getMigration(id: string): Promise<ApiResponse<Migration>> {
    return super.getById(id);
  }

  /**
   * Create a new migration
   */
  async createMigration(data: CreateMigrationDto): Promise<ApiResponse<Migration>> {
    return super.create(data);
  }

  /**
   * Update a migration
   */
  async updateMigration(id: string, data: UpdateMigrationDto): Promise<ApiResponse<Migration>> {
    return super.update(id, data);
  }

  /**
   * Delete a migration
   */
  async deleteMigration(id: string): Promise<ApiResponse<void>> {
    return super.delete(id);
  }

  /**
   * Execute a migration
   */
  async executeMigration(id: string): Promise<ApiResponse<Migration>> {
    return this.query<Migration>(`${id}/execute`, 'POST');
  }

  /**
   * Get logs for a specific migration
   */
  async getMigrationLogs(id: string): Promise<ApiResponse<MigrationLog[]>> {
    return this.query<MigrationLog[]>(`${id}/logs`);
  }

  /**
   * Import a migration from file
   */
  async importMigration(file: File): Promise<ApiResponse<Migration>> {
    const formData = new FormData();
    formData.append('file', file);
    
    return this.query<Migration>('/import', 'POST', formData);
  }

  /**
   * Export a migration to file
   */
  async exportMigration(id: string): Promise<ApiResponse<Blob>> {
    return this.query<Blob>(`${id}/export`, 'GET');
  }
}

// Export a singleton instance
export const migrationService = new MigrationService();
