
import { Database } from '@/lib/database.types';

export type Device = Database['public']['Tables']['devices']['Row'];
export type NewDevice = Database['public']['Tables']['devices']['Insert'];
export type UpdateDevice = Database['public']['Tables']['devices']['Update'];

export interface MdmProfile {
  id: string;
  name: string;
  description: string;
  type: 'security' | 'restrictions' | 'wifi' | 'email' | 'vpn' | 'custom';
  settings: Record<string, any>;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

export interface NewMdmProfile {
  name: string;
  description: string;
  type: 'security' | 'restrictions' | 'wifi' | 'email' | 'vpn' | 'custom';
  settings: Record<string, any>;
  is_active?: boolean;
}

export interface MdmProfileAssignment {
  id: string;
  profile_id: string;
  device_id: string;
  deployed_at: string;
  status: 'pending' | 'deployed' | 'failed';
}
