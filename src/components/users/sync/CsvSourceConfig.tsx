
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadCloud } from "lucide-react";

export function CsvSourceConfig() {
  return (
    <div className="space-y-2">
      <Label htmlFor="csv-upload">Upload CSV File</Label>
      <div className="flex items-center gap-2">
        <Input id="csv-upload" type="file" accept=".csv" />
        <Button size="sm">
          <UploadCloud className="h-4 w-4 mr-2" />
          Upload
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">
        Upload a CSV file with user data.
      </p>
    </div>
  );
}
