
import React from "react";
import { LogsTable } from "./LogsTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Log } from "@/lib/types/activity.types"; // Assuming this is the type for logs

interface InvestigationResultsProps {
  logs: Log[];
  isLoading: boolean;
}

export function InvestigationResults({ logs, isLoading }: InvestigationResultsProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Investigation Results</CardTitle>
      </CardHeader>
      <CardContent>
        <LogsTable logs={logs} isLoading={isLoading} />
      </CardContent>
    </Card>
  );
}
