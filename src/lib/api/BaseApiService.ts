
import { apiClient, ApiResponse } from './apiClient';

/**
 * Base class for API services that provides common CRUD operations
 */
export abstract class BaseApiService<T, CreateDto = Omit<T, 'id'>, UpdateDto = Partial<T>> {
  constructor(protected baseEndpoint: string) {}

  /**
   * Get all entities
   */
  async getAll(params: Record<string, string | number | boolean | undefined> = {}): Promise<ApiResponse<T[]>> {
    return apiClient.get<T[]>(this.baseEndpoint, { params });
  }

  /**
   * Get entity by ID
   */
  async getById(id: string): Promise<ApiResponse<T>> {
    return apiClient.get<T>(`${this.baseEndpoint}/${id}`);
  }

  /**
   * Create new entity
   */
  async create(data: CreateDto): Promise<ApiResponse<T>> {
    return apiClient.post<T>(this.baseEndpoint, data);
  }

  /**
   * Update entity
   */
  async update(id: string, data: UpdateDto): Promise<ApiResponse<T>> {
    return apiClient.put<T>(`${this.baseEndpoint}/${id}`, data);
  }

  /**
   * Delete entity
   */
  async delete(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(`${this.baseEndpoint}/${id}`);
  }

  /**
   * Perform custom query with specified endpoint, method and data
   */
  async query<R>(endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' = 'GET', data?: unknown, params?: Record<string, string | number | boolean | undefined>): Promise<ApiResponse<R>> {
    const fullEndpoint = endpoint.startsWith('/')
      ? endpoint
      : `${this.baseEndpoint}/${endpoint}`;

    switch (method) {
      case 'GET':
        return apiClient.get<R>(fullEndpoint, { params });
      case 'POST':
        return apiClient.post<R>(fullEndpoint, data);
      case 'PUT':
        return apiClient.put<R>(fullEndpoint, data);
      case 'DELETE':
        return apiClient.delete<R>(fullEndpoint);
      case 'PATCH':
        return apiClient.patch<R>(fullEndpoint, data);
      default:
        throw new Error(`Unsupported method: ${method}`);
    }
  }
}
