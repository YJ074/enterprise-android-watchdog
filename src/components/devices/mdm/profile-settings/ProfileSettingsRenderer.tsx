
import { SecuritySettings } from "./SecuritySettings";
import { WifiSettings } from "./WifiSettings";
import { VpnSettings } from "./VpnSettings";
import { EmailSettings } from "./EmailSettings";

interface ProfileSettingsRendererProps {
  type?: string;
  settings: any;
  onSettingsChange: (settings: any) => void;
}

export function ProfileSettingsRenderer({ 
  type, 
  settings, 
  onSettingsChange 
}: ProfileSettingsRendererProps) {
  if (!type) return null;
  
  switch (type) {
    case "security":
      return (
        <SecuritySettings 
          settings={settings} 
          onSettingsChange={onSettingsChange} 
        />
      );
    case "wifi":
      return (
        <WifiSettings 
          settings={settings} 
          onSettingsChange={onSettingsChange} 
        />
      );
    case "vpn":
      return (
        <VpnSettings
          settings={settings}
          onSettingsChange={onSettingsChange}
        />
      );
    case "email":
      return (
        <EmailSettings
          settings={settings}
          onSettingsChange={onSettingsChange}
        />
      );
    default:
      return null;
  }
}
