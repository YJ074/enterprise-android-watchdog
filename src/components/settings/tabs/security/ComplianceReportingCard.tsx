
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardCheck, Bell, Shield } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function ComplianceReportingCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ClipboardCheck className="h-5 w-5" />
          <span>Compliance Reporting</span>
        </CardTitle>
        <CardDescription>
          Configure automated compliance reporting and notifications.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="weekly-report">Weekly Compliance Reports</Label>
            <p className="text-sm text-muted-foreground">
              Generate and email compliance reports every week.
            </p>
          </div>
          <Switch id="weekly-report" defaultChecked />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="compliance-alerts">Critical Compliance Alerts</Label>
            <p className="text-sm text-muted-foreground">
              Send immediate alerts for critical compliance issues.
            </p>
          </div>
          <Switch id="compliance-alerts" defaultChecked />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="remediation">Automatic Remediation</Label>
            <p className="text-sm text-muted-foreground">
              Attempt to automatically fix compliance issues when possible.
            </p>
          </div>
          <Switch id="remediation" />
        </div>
        
        <div className="space-y-2 pt-2">
          <Label htmlFor="compliance-standard">Compliance Standard</Label>
          <Select defaultValue="nist">
            <SelectTrigger id="compliance-standard">
              <SelectValue placeholder="Select standard" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nist">NIST Cybersecurity Framework</SelectItem>
              <SelectItem value="iso27001">ISO 27001</SelectItem>
              <SelectItem value="hipaa">HIPAA</SelectItem>
              <SelectItem value="gdpr">GDPR</SelectItem>
              <SelectItem value="soc2">SOC 2</SelectItem>
              <SelectItem value="custom">Custom Standard</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2 pt-2">
          <Label htmlFor="risk-threshold">Risk Alert Threshold</Label>
          <Select defaultValue="medium">
            <SelectTrigger id="risk-threshold">
              <SelectValue placeholder="Select threshold" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low (25+)</SelectItem>
              <SelectItem value="medium">Medium (50+)</SelectItem>
              <SelectItem value="high">High (75+)</SelectItem>
              <SelectItem value="critical">Critical Only (90+)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
