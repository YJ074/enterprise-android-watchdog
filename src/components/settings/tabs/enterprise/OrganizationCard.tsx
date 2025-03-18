
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building } from "lucide-react";

export function OrganizationCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building className="h-5 w-5" />
          <span>Organization</span>
        </CardTitle>
        <CardDescription>
          Configure your organization settings.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="org-name">Organization Name</Label>
          <Input id="org-name" defaultValue="Acme Corporation" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="org-domain">Organization Domain</Label>
          <Input id="org-domain" defaultValue="acmecorp.com" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="org-logo">Organization Logo URL</Label>
          <Input id="org-logo" placeholder="https://example.com/logo.png" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="org-support-email">Support Email</Label>
          <Input id="org-support-email" defaultValue="support@acmecorp.com" type="email" />
        </div>
      </CardContent>
    </Card>
  );
}
