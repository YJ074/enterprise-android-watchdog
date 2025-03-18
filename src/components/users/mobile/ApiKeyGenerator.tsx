
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Key } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { PlatformType } from "../MobileAppFeatures";

interface ApiKeyGeneratorProps {
  platform: PlatformType;
}

export function ApiKeyGenerator({ platform }: ApiKeyGeneratorProps) {
  const { toast } = useToast();
  const [apiKeyGenerated, setApiKeyGenerated] = useState(false);
  
  const handleGenerateApiKey = () => {
    setApiKeyGenerated(true);
    toast({
      title: `${platform === "ios" ? "iOS" : "Android"} API Key Generated`,
      description: "The API key for data access has been generated successfully.",
    });
  };
  
  return (
    <div className="pt-2">
      {apiKeyGenerated ? (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Key className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-green-600">API Key Generated</span>
          </div>
          <div className="p-2 bg-gray-50 border rounded text-xs font-mono break-all">
            iosmb_{platform}_dataacc_{Math.random().toString(36).substring(2, 10)}
          </div>
          <p className="text-xs text-muted-foreground">
            Use this API key in your {platform === "ios" ? "iOS" : "Android"} app to authenticate data access requests.
          </p>
        </div>
      ) : (
        <Button 
          onClick={handleGenerateApiKey} 
          className="w-full gap-2"
        >
          <Key className="h-4 w-4" />
          Generate Data Access API Key
        </Button>
      )}
    </div>
  );
}
