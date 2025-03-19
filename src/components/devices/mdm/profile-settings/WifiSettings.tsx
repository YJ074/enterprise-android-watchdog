
import { FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface WifiSettingsProps {
  settings: any;
  onSettingsChange: (settings: any) => void;
}

export function WifiSettings({ settings, onSettingsChange }: WifiSettingsProps) {
  return (
    <div className="border p-4 rounded-md space-y-4">
      <h3 className="font-medium">WiFi Settings</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <FormLabel>SSID</FormLabel>
            <Input 
              placeholder="Network Name" 
              value={settings?.ssid || ""} 
              onChange={(e) => {
                onSettingsChange({
                  ...settings,
                  ssid: e.target.value
                });
              }}
            />
          </div>
          
          <div>
            <FormLabel>Security Type</FormLabel>
            <Select 
              value={settings?.security || "WPA2"}
              onValueChange={(value) => {
                onSettingsChange({
                  ...settings,
                  security: value
                });
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="WPA2">WPA2</SelectItem>
                <SelectItem value="WPA2-Enterprise">WPA2-Enterprise</SelectItem>
                <SelectItem value="WPA3">WPA3</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
