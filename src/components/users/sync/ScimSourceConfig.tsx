
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Clipboard, Copy, Key, RefreshCcw } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";

export function ScimSourceConfig() {
  const { toast } = useToast();
  const [scimEndpoint] = useState("https://api.yourdomain.com/scim/v2");
  const [scimToken, setScimToken] = useState("scim-token-xxxxx-xxxxx-xxxxx-xxxxx");
  const [showToken, setShowToken] = useState(false);

  const generateNewToken = () => {
    // In a real app, this would make an API call to generate a new token
    const newToken = `scim-token-${Math.random().toString(36).substring(2, 10)}`;
    setScimToken(newToken);
    toast({
      title: "New SCIM token generated",
      description: "The new token has been created. Copy it now - you won't be able to see it again.",
      variant: "success",
    });
  };

  const copyToClipboard = (text: string, what: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: `${what} copied to clipboard`,
        description: `The ${what.toLowerCase()} has been copied to your clipboard.`,
      });
    });
  };

  return (
    <div className="space-y-4">
      <Alert variant="success" className="mb-4">
        <AlertDescription>
          SCIM 2.0 allows automated user provisioning and deprovisioning with supported identity providers.
        </AlertDescription>
      </Alert>
      
      <div className="space-y-2">
        <Label htmlFor="scim-endpoint">SCIM 2.0 Endpoint URL</Label>
        <div className="flex space-x-2">
          <Input 
            id="scim-endpoint" 
            value={scimEndpoint} 
            readOnly 
            className="flex-grow font-mono text-sm"
          />
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => copyToClipboard(scimEndpoint, "Endpoint URL")}
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Use this endpoint URL when configuring SCIM in your identity provider.
        </p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="scim-token">SCIM 2.0 Bearer Token</Label>
        <div className="flex space-x-2">
          <Input 
            id="scim-token" 
            type={showToken ? "text" : "password"} 
            value={scimToken} 
            readOnly 
            className="flex-grow font-mono text-sm"
          />
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => setShowToken(!showToken)}
          >
            <Key className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => copyToClipboard(scimToken, "Bearer token")}
          >
            <Clipboard className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          This token is required for authentication when configuring SCIM in your identity provider.
        </p>
      </div>
      
      <Button 
        variant="outline" 
        onClick={generateNewToken}
        className="mt-2"
      >
        <RefreshCcw className="h-4 w-4 mr-2" />
        Generate New Token
      </Button>
    </div>
  );
}
