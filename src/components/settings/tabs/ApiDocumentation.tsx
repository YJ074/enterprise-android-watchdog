
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

export function ApiDocumentation() {
  const [language, setLanguage] = useState("curl");
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            <span>API Documentation</span>
          </CardTitle>
          <CardDescription>
            Learn how to use our REST API to integrate with external systems.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center justify-between">
            <Label htmlFor="code-language">Code Examples</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger id="code-language" className="w-[180px]">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="curl">cURL</SelectItem>
                <SelectItem value="js">JavaScript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="ruby">Ruby</SelectItem>
                <SelectItem value="go">Go</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Tabs defaultValue="authentication" className="w-full">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="authentication">Authentication</TabsTrigger>
              <TabsTrigger value="devices">Devices</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="activities">Activities</TabsTrigger>
            </TabsList>
            
            <TabsContent value="authentication" className="space-y-4">
              <div className="rounded-md bg-slate-950 p-4 text-sm text-slate-50 overflow-auto">
                {language === "curl" && (
                  <pre>
                    <code>{`# Authenticate and get an access token
curl -X POST https://api.yourdomain.com/v1/auth/token \\
  -H "Content-Type: application/json" \\
  -d '{"apiKey": "YOUR_API_KEY"}'`}</code>
                  </pre>
                )}
                {language === "js" && (
                  <pre>
                    <code>{`// Authenticate and get an access token
fetch('https://api.yourdomain.com/v1/auth/token', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ apiKey: 'YOUR_API_KEY' })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`}</code>
                  </pre>
                )}
                {language === "python" && (
                  <pre>
                    <code>{`# Authenticate and get an access token
import requests
import json

url = "https://api.yourdomain.com/v1/auth/token"
payload = json.dumps({ "apiKey": "YOUR_API_KEY" })
headers = { 'Content-Type': 'application/json' }

response = requests.post(url, headers=headers, data=payload)
print(response.json())`}</code>
                  </pre>
                )}
              </div>
              
              <p className="text-sm text-muted-foreground">
                Use this token in subsequent requests in the Authorization header:
                <code className="ml-2 px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-xs">
                  Authorization: Bearer YOUR_TOKEN
                </code>
              </p>
            </TabsContent>
            
            <TabsContent value="devices" className="space-y-4">
              <div className="rounded-md bg-slate-950 p-4 text-sm text-slate-50 overflow-auto">
                {language === "curl" && (
                  <pre>
                    <code>{`# Get all devices
curl -X GET https://api.yourdomain.com/v1/devices \\
  -H "Authorization: Bearer YOUR_TOKEN"

# Get a specific device
curl -X GET https://api.yourdomain.com/v1/devices/dev-123 \\
  -H "Authorization: Bearer YOUR_TOKEN"

# Create a new device
curl -X POST https://api.yourdomain.com/v1/devices \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -d '{
    "name": "New Device",
    "model": "iPhone 15",
    "osVersion": "iOS 17.0",
    "user": "John Doe",
    "department": "Sales"
  }'`}</code>
                  </pre>
                )}
                {language === "js" && (
                  <pre>
                    <code>{`// Get all devices
fetch('https://api.yourdomain.com/v1/devices', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));

// Create a new device
fetch('https://api.yourdomain.com/v1/devices', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_TOKEN'
  },
  body: JSON.stringify({
    name: 'New Device',
    model: 'iPhone 15',
    osVersion: 'iOS 17.0',
    user: 'John Doe',
    department: 'Sales'
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`}</code>
                  </pre>
                )}
              </div>
              
              <h3 className="text-lg font-semibold mt-2">Response Format</h3>
              <div className="rounded-md bg-slate-950 p-4 text-sm text-slate-50 overflow-auto">
                <pre>
                  <code>{`{
  "data": [
    {
      "id": "dev-123",
      "name": "iPhone 13-David",
      "model": "iPhone 13",
      "osVersion": "iOS 17.0",
      "lastSeen": "2023-10-15T09:55:00",
      "status": "online",
      "batteryLevel": 63,
      "storageUsed": 86,
      "totalStorage": 128,
      "user": "David Wilson",
      "department": "Sales",
      "applications": [...]
    },
    ...
  ],
  "pagination": {
    "total": 42,
    "page": 1,
    "limit": 10
  }
}`}</code>
                </pre>
              </div>
            </TabsContent>
            
            <TabsContent value="users" className="space-y-4">
              <div className="rounded-md bg-slate-950 p-4 text-sm text-slate-50 overflow-auto">
                {language === "curl" && (
                  <pre>
                    <code>{`# Get all users
curl -X GET https://api.yourdomain.com/v1/users \\
  -H "Authorization: Bearer YOUR_TOKEN"

# Get a specific user
curl -X GET https://api.yourdomain.com/v1/users/user-123 \\
  -H "Authorization: Bearer YOUR_TOKEN"

# Create a new user
curl -X POST https://api.yourdomain.com/v1/users \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -d '{
    "username": "johndoe",
    "fullName": "John Doe",
    "email": "john@example.com",
    "role": "User",
    "department": "Sales"
  }'`}</code>
                  </pre>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="activities" className="space-y-4">
              <div className="rounded-md bg-slate-950 p-4 text-sm text-slate-50 overflow-auto">
                {language === "curl" && (
                  <pre>
                    <code>{`# Get all activity logs
curl -X GET https://api.yourdomain.com/v1/activities \\
  -H "Authorization: Bearer YOUR_TOKEN"

# Get activities for a specific device
curl -X GET https://api.yourdomain.com/v1/devices/dev-123/activities \\
  -H "Authorization: Bearer YOUR_TOKEN"

# Filter activities by type
curl -X GET https://api.yourdomain.com/v1/activities?type=security \\
  -H "Authorization: Bearer YOUR_TOKEN"

# Search activities by keyword
curl -X GET https://api.yourdomain.com/v1/activities?search=login \\
  -H "Authorization: Bearer YOUR_TOKEN"`}</code>
                  </pre>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
