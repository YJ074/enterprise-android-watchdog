
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";

interface VpnSettingsProps {
  settings: any;
  onSettingsChange: (settings: any) => void;
}

export function VpnSettings({ settings, onSettingsChange }: VpnSettingsProps) {
  const [advanced, setAdvanced] = useState(false);
  
  const handleVpnChange = (field: string, value: any) => {
    onSettingsChange({
      ...settings,
      vpn: {
        ...(settings?.vpn || {}),
        [field]: value
      }
    });
  };
  
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">VPN Configuration</CardTitle>
          <CardDescription>Configure VPN settings for secure remote access</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="vpn-server">Server Address</Label>
            <Input
              id="vpn-server"
              placeholder="vpn.example.com"
              value={settings?.vpn?.server || ""}
              onChange={(e) => handleVpnChange("server", e.target.value)}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="vpn-identifier">Connection Identifier</Label>
            <Input
              id="vpn-identifier"
              placeholder="Corporate VPN"
              value={settings?.vpn?.identifier || ""}
              onChange={(e) => handleVpnChange("identifier", e.target.value)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="vpn-alwayson">Always-On VPN</Label>
            <Switch
              id="vpn-alwayson"
              checked={settings?.vpn?.alwaysOn || false}
              onCheckedChange={(checked) => handleVpnChange("alwaysOn", checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="vpn-advanced">Show Advanced Settings</Label>
            <Switch
              id="vpn-advanced"
              checked={advanced}
              onCheckedChange={setAdvanced}
            />
          </div>
          
          {advanced && (
            <div className="space-y-4 pt-2 border-t mt-2">
              <div className="grid gap-2">
                <Label htmlFor="vpn-protocol">Protocol</Label>
                <Input
                  id="vpn-protocol"
                  placeholder="IKEv2"
                  value={settings?.vpn?.protocol || ""}
                  onChange={(e) => handleVpnChange("protocol", e.target.value)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="vpn-oncert">Use Certificate</Label>
                <Switch
                  id="vpn-oncert"
                  checked={settings?.vpn?.useCertificate || false}
                  onCheckedChange={(checked) => handleVpnChange("useCertificate", checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="vpn-splitunnel">Split Tunneling</Label>
                <Switch
                  id="vpn-splitunnel"
                  checked={settings?.vpn?.splitTunneling || false}
                  onCheckedChange={(checked) => handleVpnChange("splitTunneling", checked)}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
