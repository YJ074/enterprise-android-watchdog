
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

interface EmailSettingsProps {
  settings: any;
  onSettingsChange: (settings: any) => void;
}

export function EmailSettings({ settings, onSettingsChange }: EmailSettingsProps) {
  const handleEmailChange = (field: string, value: any) => {
    onSettingsChange({
      ...settings,
      email: {
        ...(settings?.email || {}),
        [field]: value
      }
    });
  };
  
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Email Configuration</CardTitle>
          <CardDescription>Configure email account settings for managed devices</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="email-account">Account Description</Label>
            <Input
              id="email-account"
              placeholder="Corporate Email"
              value={settings?.email?.accountDescription || ""}
              onChange={(e) => handleEmailChange("accountDescription", e.target.value)}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="email-host">Mail Server</Label>
            <Input
              id="email-host"
              placeholder="mail.example.com"
              value={settings?.email?.mailServer || ""}
              onChange={(e) => handleEmailChange("mailServer", e.target.value)}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="email-domain">Domain</Label>
            <Input
              id="email-domain"
              placeholder="example.com"
              value={settings?.email?.domain || ""}
              onChange={(e) => handleEmailChange("domain", e.target.value)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="email-ssl">Use SSL</Label>
            <Switch
              id="email-ssl"
              checked={settings?.email?.useSSL || false}
              onCheckedChange={(checked) => handleEmailChange("useSSL", checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="email-s-mime">S/MIME Enabled</Label>
            <Switch
              id="email-s-mime"
              checked={settings?.email?.smimeEnabled || false}
              onCheckedChange={(checked) => handleEmailChange("smimeEnabled", checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="email-signature">Allow Signature Editing</Label>
            <Switch
              id="email-signature"
              checked={settings?.email?.allowSignatureEditing || true}
              onCheckedChange={(checked) => handleEmailChange("allowSignatureEditing", checked)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
