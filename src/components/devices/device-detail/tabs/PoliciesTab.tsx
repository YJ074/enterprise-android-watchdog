
import { ShieldCheck } from "lucide-react";

export function PoliciesTab() {
  return (
    <div className="p-4 border rounded-md mt-2">
      <div className="text-sm font-medium mb-4 flex items-center gap-2">
        <ShieldCheck className="h-5 w-5 text-muted-foreground" />
        Device Policies
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        <div className="p-4 border rounded-md bg-muted/30">
          <h4 className="font-medium">Security Policy</h4>
          <p className="text-sm text-muted-foreground mt-1">
            Default security policies are applied to this device.
          </p>
        </div>
        
        <div className="p-4 border rounded-md bg-muted/30">
          <h4 className="font-medium">Application Policy</h4>
          <p className="text-sm text-muted-foreground mt-1">
            Restricted application access is enabled.
          </p>
        </div>
        
        <div className="p-4 border rounded-md bg-muted/30">
          <h4 className="font-medium">Data Policy</h4>
          <p className="text-sm text-muted-foreground mt-1">
            Data encryption and access controls are enabled.
          </p>
        </div>
      </div>
    </div>
  );
}
