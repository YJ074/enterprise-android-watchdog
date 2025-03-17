import { ReactNode } from "react";
import { 
  User, 
  Shield, 
  Monitor, 
  Info, 
  MessageSquare, 
  Mail, 
  PhoneCall, 
  Globe, 
  FileText,
  FileAudio,
  FileVideo,
  FileImage,
  Share2,
  Download
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Activity type icon mapping
export const getActivityIcon = (type: string): string => {
  switch (type) {
    case 'app_install':
      return "📲";
    case 'app_uninstall':
      return "🗑️";
    case 'login':
      return "🔐";
    case 'logout':
      return "👋";
    case 'location_change':
      return "📍";
    case 'policy_violation':
      return "⚠️";
    case 'system_update':
      return "⬆️";
    case 'whatsapp_message':
      return "💬";
    case 'gmail_access':
      return "📧";
    case 'call_recorded':
      return "📞";
    case 'screenshot':
      return "📸";
    case 'keylogger':
      return "⌨️";
    case 'browsing_history':
      return "🌐";
    case 'file_access':
      return "📄";
    case 'audio_recording':
      return "🎙️";
    case 'video_recording':
      return "🎥";
    case 'photo_captured':
      return "📷";
    case 'media_shared':
      return "↗️";
    case 'file_downloaded':
      return "⬇️";
    default:
      return "📱";
  }
};

// Activity category icon mapping
export const getActivityCategoryIcon = (type: string): ReactNode => {
  switch (type) {
    case 'app_install':
    case 'app_uninstall':
    case 'system_update':
      return <Monitor className="h-4 w-4" />;
    case 'login':
    case 'logout':
      return <User className="h-4 w-4" />;
    case 'policy_violation':
    case 'location_change':
      return <Shield className="h-4 w-4" />;
    case 'whatsapp_message':
      return <MessageSquare className="h-4 w-4" />;
    case 'gmail_access':
      return <Mail className="h-4 w-4" />;
    case 'call_recorded':
      return <PhoneCall className="h-4 w-4" />;
    case 'browsing_history':
      return <Globe className="h-4 w-4" />;
    case 'screenshot':
    case 'keylogger':
      return <Monitor className="h-4 w-4" />;
    case 'file_access':
      return <FileText className="h-4 w-4" />;
    case 'audio_recording':
      return <FileAudio className="h-4 w-4" />;
    case 'video_recording':
      return <FileVideo className="h-4 w-4" />;
    case 'photo_captured':
      return <FileImage className="h-4 w-4" />;
    case 'media_shared':
      return <Share2 className="h-4 w-4" />;
    case 'file_downloaded':
      return <Download className="h-4 w-4" />;
    default:
      return <Info className="h-4 w-4" />;
  }
};

// Get activity category
export const getActivityCategory = (type: string): string => {
  switch (type) {
    case 'app_install':
    case 'app_uninstall':
    case 'system_update':
      return "system";
    case 'login':
    case 'logout':
      return "user";
    case 'policy_violation':
    case 'location_change':
      return "security";
    case 'whatsapp_message':
    case 'gmail_access':
    case 'call_recorded':
      return "communication";
    case 'screenshot':
    case 'keylogger':
    case 'browsing_history':
    case 'file_access':
      return "monitoring";
    case 'audio_recording':
    case 'video_recording':
    case 'photo_captured':
    case 'media_shared':
    case 'file_downloaded':
      return "multimedia";
    default:
      return "other";
  }
};

// Extract app name from details string
export const getAppNameFromDetails = (details: string): string | null => {
  const appMatches = details.match(/in (.*?)( on| at|$)/);
  if (appMatches && appMatches[1]) {
    return appMatches[1];
  }
  return null;
};

// Extract duration from details string
export const getDurationFromDetails = (details: string): { value: number, unit: string } | null => {
  const durationMatches = details.match(/for (\d+) (second|minute|hour|day)s?/);
  if (durationMatches && durationMatches[1] && durationMatches[2]) {
    return {
      value: parseInt(durationMatches[1], 10),
      unit: durationMatches[2]
    };
  }
  return null;
};

// Format duration for display
export const formatDuration = (duration: { value: number, unit: string }): string => {
  return `${duration.value} ${duration.unit}${duration.value !== 1 ? 's' : ''}`;
};

// Format file size for display
export const formatFileSize = (sizeInMB: number): string => {
  if (sizeInMB < 1) {
    return `${(sizeInMB * 1024).toFixed(0)} KB`;
  } else if (sizeInMB >= 1000) {
    return `${(sizeInMB / 1024).toFixed(2)} GB`;
  } else {
    return `${sizeInMB.toFixed(1)} MB`;
  }
};

// Format duration in seconds to mm:ss format
export const formatMediaDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

// Get severity badge component
export const getSeverityBadge = (severity: string): ReactNode => {
  switch (severity) {
    case 'info':
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Info</Badge>;
    case 'warning':
      return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Warning</Badge>;
    case 'critical':
      return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Critical</Badge>;
    default:
      return null;
  }
};
