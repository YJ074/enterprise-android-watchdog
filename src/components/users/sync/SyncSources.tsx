
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface SyncSourcesProps {
  syncSource: string;
  setSyncSource: (value: string) => void;
}

export function SyncSources({ syncSource, setSyncSource }: SyncSourcesProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="sync-source">Synchronization Source</Label>
      <Select value={syncSource} onValueChange={setSyncSource}>
        <SelectTrigger id="sync-source">
          <SelectValue placeholder="Select source" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ldap">LDAP Directory</SelectItem>
          <SelectItem value="azure">Azure Active Directory</SelectItem>
          <SelectItem value="google">Google Workspace</SelectItem>
          <SelectItem value="okta">Okta</SelectItem>
          <SelectItem value="csv">CSV Upload</SelectItem>
          <SelectItem value="api">External API</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
