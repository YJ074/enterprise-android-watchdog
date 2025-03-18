
export interface ActivityLog {
  id: string;
  deviceId: string;
  timestamp: string;
  type: 'app_install' | 'app_uninstall' | 'login' | 'logout' | 'location_change' | 
        'policy_violation' | 'system_update' | 'whatsapp_message' | 'gmail_access' | 
        'call_recorded' | 'screenshot' | 'keylogger' | 'browsing_history' | 'file_access' |
        'audio_recording' | 'video_recording' | 'photo_captured' | 'media_shared' | 'file_downloaded';
  details: string;
  severity: 'info' | 'warning' | 'critical';
  metadata?: {
    fileType?: string;
    fileSize?: number;
    duration?: number;
    location?: string;
    destination?: string;
    thumbnail?: string;
  };
}
