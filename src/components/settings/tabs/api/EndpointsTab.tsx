
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Key, Plus, Trash2 } from "lucide-react";
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

interface Endpoint {
  path: string;
  method: string;
  enabled: boolean;
}

export function EndpointsTab() {
  const [endpoints, setEndpoints] = useState<Endpoint[]>([
    { path: "/devices", method: "GET", enabled: true },
    { path: "/users", method: "GET", enabled: true },
    { path: "/activities", method: "GET", enabled: true }
  ]);

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
  );
}
