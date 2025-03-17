
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Building, Cloud, Database, HardDrive, Network, Save, Shield, Users } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function EnterpriseSettings() {
  const { toast } = useToast();
  const [ssoEnabled, setSsoEnabled] = useState(false);
  const [ldapEnabled, setLdapEnabled] = useState(false);
  const [auditLogging, setAuditLogging] = useState(true);
  const [dataRetention, setDataRetention] = useState(90);
  
  const handleSaveEnterpriseSettings = () => {
    toast({
      title: "Enterprise settings saved",
      description: "Your enterprise settings have been updated successfully."
    });
  };
  
  return (
    <div className="space-y-6">
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
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            <span>User Management</span>
          </CardTitle>
          <CardDescription>
            Configure enterprise user management options.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="sso-enabled" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Single Sign-On (SSO)
              </Label>
              <p className="text-sm text-muted-foreground">
                Enable SSO authentication for your organization.
              </p>
            </div>
            <Switch 
              id="sso-enabled" 
              checked={ssoEnabled} 
              onCheckedChange={setSsoEnabled} 
            />
          </div>
          
          {ssoEnabled && (
            <div className="ml-6 pl-2 border-l-2 border-muted space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sso-provider">SSO Provider</Label>
                <Select defaultValue="okta">
                  <SelectTrigger id="sso-provider">
                    <SelectValue placeholder="Select SSO provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="okta">Okta</SelectItem>
                    <SelectItem value="azure">Azure AD</SelectItem>
                    <SelectItem value="google">Google Workspace</SelectItem>
                    <SelectItem value="onelogin">OneLogin</SelectItem>
                    <SelectItem value="custom">Custom SAML</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sso-url">Identity Provider URL</Label>
                <Input id="sso-url" placeholder="https://example.okta.com" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sso-certificate">Identity Provider Certificate</Label>
                <Textarea 
                  id="sso-certificate" 
                  placeholder="Paste your X.509 certificate here" 
                  className="font-mono text-xs min-h-[100px]"
                />
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between pt-4">
            <div className="space-y-0.5">
              <Label htmlFor="ldap-enabled" className="flex items-center gap-2">
                <Network className="h-4 w-4" />
                LDAP Integration
              </Label>
              <p className="text-sm text-muted-foreground">
                Enable LDAP directory integration.
              </p>
            </div>
            <Switch 
              id="ldap-enabled" 
              checked={ldapEnabled} 
              onCheckedChange={setLdapEnabled} 
            />
          </div>
          
          {ldapEnabled && (
            <div className="ml-6 pl-2 border-l-2 border-muted space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ldap-server">LDAP Server</Label>
                <Input id="ldap-server" placeholder="ldap://ldap.example.com:389" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ldap-bind-dn">Bind DN</Label>
                <Input id="ldap-bind-dn" placeholder="cn=admin,dc=example,dc=com" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ldap-password">Bind Password</Label>
                <Input id="ldap-password" type="password" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ldap-search-base">Search Base</Label>
                <Input id="ldap-search-base" placeholder="ou=users,dc=example,dc=com" />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            <span>Data Management</span>
          </CardTitle>
          <CardDescription>
            Configure data retention and compliance settings.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="audit-logging" className="flex items-center gap-2">
                <HardDrive className="h-4 w-4" />
                Audit Logging
              </Label>
              <p className="text-sm text-muted-foreground">
                Keep detailed logs of all system activities.
              </p>
            </div>
            <Switch 
              id="audit-logging" 
              checked={auditLogging} 
              onCheckedChange={setAuditLogging} 
            />
          </div>
          
          <div className="pt-2 space-y-2">
            <Label htmlFor="data-retention" className="flex items-center gap-2">
              <Cloud className="h-4 w-4" />
              Data Retention Period (days)
            </Label>
            <div className="space-y-4">
              <Slider 
                id="data-retention"
                min={30}
                max={365}
                step={30}
                value={[dataRetention]}
                onValueChange={(value) => setDataRetention(value[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>30 days</span>
                <span>Current: {dataRetention} days</span>
                <span>365 days</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Data older than the retention period will be automatically archived.
            </p>
          </div>
          
          <div className="flex items-center justify-between pt-4">
            <div className="space-y-0.5">
              <Label htmlFor="data-encryption">Data Encryption</Label>
              <p className="text-sm text-muted-foreground">
                Enable end-to-end encryption for sensitive data.
              </p>
            </div>
            <Switch id="data-encryption" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <div className="space-y-0.5">
              <Label htmlFor="data-backup">Automatic Backups</Label>
              <p className="text-sm text-muted-foreground">
                Schedule regular backups of your data.
              </p>
            </div>
            <Switch id="data-backup" defaultChecked />
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end">
        <Button onClick={handleSaveEnterpriseSettings} className="gap-2">
          <Save className="h-4 w-4" />
          Save Settings
        </Button>
      </div>
    </div>
  );
}
