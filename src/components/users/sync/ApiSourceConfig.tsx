
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ApiSourceConfigProps {
  webhookUrl: string;
  setWebhookUrl: (url: string) => void;
}

export function ApiSourceConfig({ webhookUrl, setWebhookUrl }: ApiSourceConfigProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="webhook-url">API Endpoint URL</Label>
      <Input 
        id="webhook-url" 
        placeholder="https://api.example.com/users" 
        value={webhookUrl}
        onChange={(e) => setWebhookUrl(e.target.value)}
      />
      <p className="text-sm text-muted-foreground">
        Enter the URL of the API endpoint to fetch users from.
      </p>
    </div>
  );
}
