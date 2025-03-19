
import { useState } from "react";
import { InvestigationConsole } from "@/components/investigation/InvestigationConsole";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AlertCircle, ExternalLink, Search, Shield } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface InvestigationTabProps {
  deviceId: string;
}

export function InvestigationTab({ deviceId }: InvestigationTabProps) {
  const [showCompliance, setShowCompliance] = useState(true);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold">Device Investigation</h3>
          <p className="text-sm text-muted-foreground">Analyze device activities and detect security threats</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link to={`/investigation?deviceId=${deviceId}`} className="flex items-center gap-1">
              <Search className="h-4 w-4" />
              Quick Search
            </Link>
          </Button>
          <Button variant="default" size="sm" asChild>
            <Link to="/investigation" className="flex items-center gap-1">
              <ExternalLink className="h-4 w-4" />
              Advanced Investigation
            </Link>
          </Button>
        </div>
      </div>
      
      {showCompliance && (
        <Alert variant="warning" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Compliance Notification</AlertTitle>
          <AlertDescription className="flex justify-between items-center">
            <span>
              All investigation activities are logged and must comply with your organization's security policies.
            </span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowCompliance(false)}
              className="h-7 px-2"
            >
              Dismiss
            </Button>
          </AlertDescription>
        </Alert>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Search className="h-4 w-4 text-primary" />
              Activity Search
            </CardTitle>
            <CardDescription>
              Search through device logs and activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Find suspicious activities, applications, and user behaviors on this device.
            </p>
            <Button size="sm" variant="outline" className="mt-2 w-full">Quick Activity Search</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              Security Analysis
            </CardTitle>
            <CardDescription>
              Perform security analysis on device
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Check for vulnerabilities, malware, and security compliance issues.
            </p>
            <Button size="sm" className="mt-2 w-full">Run Security Scan</Button>
          </CardContent>
        </Card>
      </div>
      
      <InvestigationConsole />
    </div>
  );
}
