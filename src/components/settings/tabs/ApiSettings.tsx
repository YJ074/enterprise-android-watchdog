
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Copy, Key, Plus, RefreshCw, Save, Trash2, Webhook } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ApiSettings() {
  const { toast } = useToast();
  const [apiEnabled, setApiEnabled] = useState(true);
  const [webhookEnabled, setWebhookEnabled] = useState(false);
  const [baseUrl, setBaseUrl] = useState("");
  const [apiVersion, setApiVersion] = useState("v1");
  const [authType, setAuthType] = useState("bearer");
  const [endpoints, setEndpoints] = useState([
    { path: "/devices", method: "GET", enabled: true },
    { path: "/users", method: "GET", enabled: true },
    { path: "/activities", method: "GET", enabled: true }
  ]);
  
  const handleSaveApiSettings = () => {
    toast({
      title: "API settings saved",
      description: "Your API and integration settings have been updated successfully."
    });
  };
  
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

  const toggleEndpoint = (index: number) => {
    const newEndpoints = [...endpoints];
    newEndpoints[index].enabled = !newEndpoints[index].enabled;
    setEndpoints(newEndpoints);
  };

  const addEndpoint = () => {
    setEndpoints([...endpoints, { path: "", method: "GET", enabled: true }]);
  };

  const removeEndpoint = (index: number) => {
    const newEndpoints = [...endpoints];
    newEndpoints.splice(index, 1);
    setEndpoints(newEndpoints);
  };

  const updateEndpoint = (index: number, field: 'path' | 'method', value: string) => {
    const newEndpoints = [...endpoints];
    newEndpoints[index][field] = value;
    setEndpoints(newEndpoints);
  };
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="access">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="access">API Access</TabsTrigger>
          <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
        </TabsList>

        <TabsContent value="access" className="space-y-4">
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
        </TabsContent>

        <TabsContent value="endpoints" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                <span>API Endpoints</span>
              </CardTitle>
              <CardDescription>
                Configure which API endpoints are exposed to external applications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Endpoint Path</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {endpoints.map((endpoint, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Input 
                          value={endpoint.path} 
                          onChange={(e) => updateEndpoint(index, 'path', e.target.value)}
                          className="font-mono text-xs"
                        />
                      </TableCell>
                      <TableCell>
                        <Select 
                          value={endpoint.method} 
                          onValueChange={(value) => updateEndpoint(index, 'method', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="GET">GET</SelectItem>
                            <SelectItem value="POST">POST</SelectItem>
                            <SelectItem value="PUT">PUT</SelectItem>
                            <SelectItem value="DELETE">DELETE</SelectItem>
                            <SelectItem value="PATCH">PATCH</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Switch 
                          checked={endpoint.enabled} 
                          onCheckedChange={() => toggleEndpoint(index)} 
                        />
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" onClick={() => removeEndpoint(index)}>
                          <Trash2 className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={addEndpoint}
                className="mt-4 gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Endpoint
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Webhook className="h-5 w-5" />
                <span>Webhooks</span>
              </CardTitle>
              <CardDescription>
                Configure webhook endpoints to receive event notifications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="webhook-enabled">Enable Webhooks</Label>
                  <p className="text-sm text-muted-foreground">
                    Send event notifications to specified endpoints.
                  </p>
                </div>
                <Switch 
                  id="webhook-enabled" 
                  checked={webhookEnabled} 
                  onCheckedChange={setWebhookEnabled} 
                />
              </div>
              
              {webhookEnabled && (
                <>
                  <div className="pt-4">
                    <Label className="mb-2 block">Webhook Endpoints</Label>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>URL</TableHead>
                          <TableHead>Events</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-mono text-xs">https://example.com/webhooks</TableCell>
                          <TableCell>All events</TableCell>
                          <TableCell>
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                              Active
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Trash2 className="h-4 w-4 text-muted-foreground" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-4 gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Add Webhook
                    </Button>
                  </div>
                  
                  <div className="pt-4 space-y-2">
                    <Label>Webhook Secret</Label>
                    <div className="flex gap-2">
                      <Input 
                        value="whsec_f1e2d3c4b5a6"
                        readOnly 
                        className="font-mono text-sm"
                      />
                      <Button variant="outline" size="icon" onClick={() => {
                        navigator.clipboard.writeText("whsec_f1e2d3c4b5a6");
                        toast({
                          title: "Webhook secret copied",
                          description: "The webhook secret has been copied to your clipboard."
                        });
                      }}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Use this secret to verify webhook payloads.
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end">
        <Button onClick={handleSaveApiSettings} className="gap-2">
          <Save className="h-4 w-4" />
          Save Settings
        </Button>
      </div>
    </div>
  );
}
