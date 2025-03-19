
import { Button } from "@/components/ui/button";
import { Download, UploadCloud, RefreshCw } from "lucide-react";

type ExportActionButtonsProps = {
  onExportData: () => void;
};

export function ExportActionButtons({ onExportData }: ExportActionButtonsProps) {
  return (
    <div className="flex flex-col space-y-2 pt-4">
      <Button className="w-full sm:w-auto" onClick={onExportData}>
        <Download className="mr-2 h-4 w-4" />
        Export Analytics Data
      </Button>
      
      <div className="flex gap-2">
        <Button variant="outline" className="w-full sm:w-auto">
          <UploadCloud className="mr-2 h-4 w-4" />
          Import Historical Data
        </Button>
        
        <Button variant="outline" className="w-full sm:w-auto">
          <RefreshCw className="mr-2 h-4 w-4" />
          Reset Analytics
        </Button>
      </div>
    </div>
  );
}
