
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Download, AlertCircle, CheckCircle2, ShieldAlert } from "lucide-react";
import { Device } from "@/lib/types/device.types";
import { useDeviceRiskAssessment } from "@/hooks/useDeviceRiskAssessment";

interface ComplianceReportCardProps {
  devices: Device[];
}

export function ComplianceReportCard({ devices }: ComplianceReportCardProps) {
  const { calculateDeviceRiskScore, getComplianceIssues } = useDeviceRiskAssessment();
  const [showDetails, setShowDetails] = useState(false);
  
  // Calculate compliance metrics
  const totalDevices = devices.length;
  const compliantDevices = devices.filter(device => 
    calculateDeviceRiskScore(device) < 25 && getComplianceIssues(device).length === 0
  ).length;
  
  const atRiskDevices = devices.filter(device => 
    calculateDeviceRiskScore(device) >= 50
  ).length;
  
  const complianceRate = totalDevices > 0 ? Math.round((compliantDevices / totalDevices) * 100) : 0;
  
  // Find all non-compliant devices with their issues
  const nonCompliantDevicesWithIssues = devices
    .map(device => ({
      device,
      issues: getComplianceIssues(device),
      riskScore: calculateDeviceRiskScore(device)
    }))
    .filter(item => item.issues.length > 0 || item.riskScore >= 25)
    .sort((a, b) => b.riskScore - a.riskScore);
  
  const handleExportReport = () => {
    // Create CSV data
    const headers = ["Device ID", "Name", "User", "Department", "Risk Score", "Status", "Compliance Issues"];
    const csvData = devices.map(device => {
      const riskScore = calculateDeviceRiskScore(device);
      const issues = getComplianceIssues(device).join("; ");
      
      return [
        device.id,
        device.name,
        device.user,
        device.department,
        riskScore.toString(),
        device.status,
        issues
      ];
    });
    
    // Create and download CSV file
    const csvContent = [headers, ...csvData].map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `compliance_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldAlert className="h-5 w-5" />
          Compliance Report
        </CardTitle>
        <CardDescription>
          Device compliance status and risk assessment
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center mb-1">
            <div>Compliance Rate</div>
            <div className="font-medium">{complianceRate}%</div>
          </div>
          <Progress value={complianceRate} className="h-2" />
        </div>
        
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="border rounded-md p-3 text-center">
            <div className="flex items-center justify-center gap-2 text-green-600 mb-1">
              <CheckCircle2 className="h-5 w-5" />
              <span className="font-medium">Compliant</span>
            </div>
            <div className="text-2xl font-bold">{compliantDevices}</div>
            <div className="text-xs text-muted-foreground">devices</div>
          </div>
          
          <div className="border rounded-md p-3 text-center">
            <div className="flex items-center justify-center gap-2 text-orange-600 mb-1">
              <AlertCircle className="h-5 w-5" />
              <span className="font-medium">At Risk</span>
            </div>
            <div className="text-2xl font-bold">{atRiskDevices}</div>
            <div className="text-xs text-muted-foreground">devices</div>
          </div>
        </div>
        
        {nonCompliantDevicesWithIssues.length > 0 && (
          <div className="pt-4">
            <Button variant="outline" size="sm" onClick={() => setShowDetails(!showDetails)}>
              {showDetails ? "Hide Details" : "Show Details"}
            </Button>
            
            {showDetails && (
              <div className="space-y-3 mt-3">
                <h4 className="text-sm font-medium">Non-compliant Devices</h4>
                
                {nonCompliantDevicesWithIssues.slice(0, 5).map(({ device, issues, riskScore }) => (
                  <Alert key={device.id} className="py-3">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-medium">{device.name}</div>
                      <div className="text-sm">Risk Score: {riskScore}</div>
                    </div>
                    <AlertDescription className="text-sm">
                      <ul className="list-disc pl-5 space-y-1">
                        {issues.map((issue, index) => (
                          <li key={index}>{issue}</li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </Alert>
                ))}
                
                {nonCompliantDevicesWithIssues.length > 5 && (
                  <div className="text-center text-sm text-muted-foreground">
                    {nonCompliantDevicesWithIssues.length - 5} more devices have compliance issues
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={handleExportReport}>
          <Download className="h-4 w-4 mr-2" />
          Export Full Report
        </Button>
      </CardFooter>
    </Card>
  );
}
