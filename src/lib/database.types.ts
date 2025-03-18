
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      devices: {
        Row: {
          id: string;
          name: string;
          model: string;
          os_version: string;
          last_seen: string;
          status: 'online' | 'offline' | 'warning' | 'compromised';
          battery_level: number;
          storage_used: number;
          total_storage: number;
          user_id: string;
          department: string;
          created_at: string;
          updated_at: string;
          location_latitude?: number;
          location_longitude?: number;
          location_address?: string;
        };
        Insert: {
          id?: string;
          name: string;
          model: string;
          os_version: string;
          last_seen?: string;
          status?: 'online' | 'offline' | 'warning' | 'compromised';
          battery_level?: number;
          storage_used?: number;
          total_storage?: number;
          user_id: string;
          department: string;
          created_at?: string;
          updated_at?: string;
          location_latitude?: number;
          location_longitude?: number;
          location_address?: string;
        };
        Update: {
          id?: string;
          name?: string;
          model?: string;
          os_version?: string;
          last_seen?: string;
          status?: 'online' | 'offline' | 'warning' | 'compromised';
          battery_level?: number;
          storage_used?: number;
          total_storage?: number;
          user_id?: string;
          department?: string;
          updated_at?: string;
          location_latitude?: number;
          location_longitude?: number;
          location_address?: string;
        };
      };
      applications: {
        Row: {
          id: string;
          device_id: string;
          name: string;
          install_date: string;
          version: string;
          size: number;
          permissions: string[];
          is_system_app: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          device_id: string;
          name: string;
          install_date?: string;
          version: string;
          size?: number;
          permissions?: string[];
          is_system_app?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          device_id?: string;
          name?: string;
          install_date?: string;
          version?: string;
          size?: number;
          permissions?: string[];
          is_system_app?: boolean;
          updated_at?: string;
        };
      };
      activity_logs: {
        Row: {
          id: string;
          device_id: string;
          timestamp: string;
          type: string;
          details: string;
          severity: 'info' | 'warning' | 'critical';
          metadata?: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          device_id: string;
          timestamp?: string;
          type: string;
          details: string;
          severity?: 'info' | 'warning' | 'critical';
          metadata?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          device_id?: string;
          timestamp?: string;
          type?: string;
          details?: string;
          severity?: 'info' | 'warning' | 'critical';
          metadata?: Json;
        };
      };
      users: {
        Row: {
          id: string;
          username: string;
          full_name: string;
          email: string;
          role: string;
          status: 'Active' | 'Inactive';
          last_active: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          username: string;
          full_name: string;
          email: string;
          role: string;
          status?: 'Active' | 'Inactive';
          last_active?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          username?: string;
          full_name?: string;
          email?: string;
          role?: string;
          status?: 'Active' | 'Inactive';
          last_active?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
