
import { Switch } from "@/components/ui/switch";
import { FormLabel } from "@/components/ui/form";

interface SecuritySettingsProps {
  settings: any;
  onSettingsChange: (settings: any) => void;
}

export function SecuritySettings({ settings, onSettingsChange }: SecuritySettingsProps) {
  return (
    <div className="border p-4 rounded-md space-y-4">
      <h3 className="font-medium">Security Settings</h3>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span>Require Password</span>
          <Switch 
            checked={settings?.password?.required} 
            onCheckedChange={(checked) => {
              onSettingsChange({
                ...settings,
                password: {
                  ...settings?.password,
                  required: checked
                }
              });
            }}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <span>Require Device Encryption</span>
          <Switch 
            checked={settings?.encryption?.enabled} 
            onCheckedChange={(checked) => {
              onSettingsChange({
                ...settings,
                encryption: {
                  ...settings?.encryption,
                  enabled: checked
                }
              });
            }}
          />
        </div>
      </div>
    </div>
  );
}
