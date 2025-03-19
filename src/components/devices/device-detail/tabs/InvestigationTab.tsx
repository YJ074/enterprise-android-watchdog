
import { InvestigationConsole } from "@/components/investigation/InvestigationConsole";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";

interface InvestigationTabProps {
  deviceId: string;
}

export function InvestigationTab({ deviceId }: InvestigationTabProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Device Investigation</h3>
        <Button variant="outline" asChild>
          <Link to="/investigation" className="flex items-center gap-1">
            <ExternalLink className="h-4 w-4" />
            Advanced Investigation
          </Link>
        </Button>
      </div>
      
      <div className="bg-muted/20 p-4 rounded-md text-sm space-y-2">
        <p>This tab provides investigation capabilities specific to this device. For more advanced investigation features, use the Advanced Investigation page.</p>
        <p>Use the search tools below to explore all communications, activities, files, and application usage on this device.</p>
      </div>
      
      <InvestigationConsole />
    </div>
  );
}
