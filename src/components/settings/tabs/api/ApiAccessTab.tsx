
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Copy, Key, RefreshCw } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ApiAccessTabProps {
  apiEnabled: boolean;
  setApiEnabled: (enabled: boolean) => void;
  baseUrl: string;
  setBaseUrl: (url: string) => void;
  apiVersion: string;
  setApiVersion: (version: string) => void;
  authType: string;
  setAuthType: (type: string) => void;
}

export function ApiAccessTab({
  apiEnabled,
  setApiEnabled,
  baseUrl,
  setBaseUrl,
  apiVersion,
  setApiVersion,
  authType,
  setAuthType
}: ApiAccessTabProps) {
  const { toast } = useToast();

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText("sk_test_a1b2c3d4e5f6g7h8i9j0");
    toast({
      title: "API key copied",
      description: "The API key has been copied to your clipboard."
    });
  };
  
  const handleRegenerateApiKey = () => {
    toast({
      title: "API key regenerated",
      description: "A new API key has been generated. The old key is no longer valid."
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="h-5 w-5" />
          <span>API Access</span>
        </CardTitle>
        <CardDescription>
          Manage your API keys and access settings.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="api-enabled">Enable API Access</Label>
            <p className="text-sm text-muted-foreground">
              Allow applications to access your data via API.
            </p>
          </div>
          <Switch 
            id="api-enabled" 
            checked={apiEnabled} 
            onCheckedChange={setApiEnabled} 
          />
        </div>
        
        {apiEnabled && (
          <>
            <div className="space-y-2 pt-2">
              <Label htmlFor="base-url">API Base URL</Label>
              <Input 
                id="base-url" 
                value={baseUrl} 
                onChange={(e) => setBaseUrl(e.target.value)}
                placeholder="https://api.yourdomain.com"
              />
            </div>

            <div className="space-y-2 pt-2">
              <Label htmlFor="api-version">API Version</Label>
              <Select value={apiVersion} onValueChange={setApiVersion}>
                <SelectTrigger id="api-version">
                  <SelectValue placeholder="Select version" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="v1">v1</SelectItem>
                  <SelectItem value="v2">v2</SelectItem>
                  <SelectItem value="latest">latest</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 pt-2">
              <Label htmlFor="auth-type">Authentication Type</Label>
              <Select value={authType} onValueChange={setAuthType}>
                <SelectTrigger id="auth-type">
                  <SelectValue placeholder="Select auth type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bearer">Bearer Token</SelectItem>
                  <SelectItem value="apikey">API Key</SelectItem>
                  <SelectItem value="basic">Basic Auth</SelectItem>
                  <SelectItem value="oauth2">OAuth 2.0</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2 pt-2">
              <Label htmlFor="api-key">API Key</Label>
              <div className="flex gap-2">
                <Input 
                  id="api-key" 
                  value="sk_test_a1b2c3d4e5f6g7h8i9j0" 
                  readOnly 
                  className="font-mono text-sm"
                />
                <Button variant="outline" size="icon" onClick={handleCopyApiKey}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                This API key provides full access to your account. Keep it secure.
              </p>
            </div>
            
            <div className="pt-2 flex justify-end">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRegenerateApiKey}
                className="gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Regenerate Key
              </Button>
            </div>
            
            <div className="pt-4 space-y-2">
              <div className="flex items-center justify-between">
                <Label>API Rate Limits</Label>
                <Select defaultValue="medium">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select limit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low (100 req/min)</SelectItem>
                    <SelectItem value="medium">Medium (500 req/min)</SelectItem>
                    <SelectItem value="high">High (1000 req/min)</SelectItem>
                    <SelectItem value="unlimited">Unlimited</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
