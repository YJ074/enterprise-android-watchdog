
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Users, Shield, Network } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

export function UserManagementCard() {
  const [ssoEnabled, setSsoEnabled] = useState(false);
  const [ldapEnabled, setLdapEnabled] = useState(false);

  return (
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
  );
}
