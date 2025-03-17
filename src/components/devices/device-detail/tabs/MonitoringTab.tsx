
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Monitor } from "lucide-react";

export function MonitoringTab() {
  return (
    <div className="p-4 border rounded-md mt-2">
      <div className="text-sm font-medium mb-4 flex items-center gap-2">
        <Monitor className="h-5 w-5 text-muted-foreground" />
        Monitoring Controls
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm">Communication Monitoring</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>WhatsApp Tracking</span>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
              <div className="flex justify-between items-center">
                <span>Gmail Monitoring</span>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
              <div className="flex justify-between items-center">
                <span>Call Recording</span>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm">Screen Monitoring</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Screenshot Interval</span>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
              <div className="flex justify-between items-center">
                <span>Keylogger</span>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
              <div className="flex justify-between items-center">
                <span>Browsing History</span>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-4">
        <Button className="w-full">Enable All Monitoring</Button>
      </div>
    </div>
  );
}
