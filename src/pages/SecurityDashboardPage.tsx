
import { useState, useMemo } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { RefreshCw, Download, Shield, AlertTriangle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ComplianceReportCard } from "@/components/reports/ComplianceReportCard";
import { useDevices } from "@/hooks/useDevices";
import { getRiskLevel, calculateDeviceRiskScore } from "@/hooks/useDeviceRiskAssessment";
import { Skeleton } from "@/components/ui/skeleton";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const SecurityDashboardPage = () => {
  const { devices, isLoading, error, handleRefresh } = useDevices();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  
  const riskData = useMemo(() => {
    if (!devices.length) return [];
    
    // Group devices by risk level
    const riskGroups = {
      low: 0,
      medium: 0,
      high: 0,
      critical: 0
    };
    
    devices.forEach(device => {
      const riskScore = calculateDeviceRiskScore(device);
      const riskLevel = getRiskLevel(riskScore);
      riskGroups[riskLevel]++;
    });
    
    // Convert to chart data format
    return [
      { name: 'Low Risk', value: riskGroups.low, color: '#10b981' },
      { name: 'Medium Risk', value: riskGroups.medium, color: '#f59e0b' },
      { name: 'High Risk', value: riskGroups.high, color: '#f97316' },
      { name: 'Critical Risk', value: riskGroups.critical, color: '#ef4444' },
    ].filter(item => item.value > 0);
  }, [devices]);
  
  const handleExportSecurityReport = () => {
    toast({
      title: "Exporting Security Report",
      description: "Your security report is being generated...",
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Security Dashboard</h1>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={handleExportSecurityReport}>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            
            <Button variant="outline" onClick={handleRefresh}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="threats">Threat Detection</TabsTrigger>
            <TabsTrigger value="risks">Risk Assessment</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Risk Distribution
                  </CardTitle>
                  <CardDescription>
                    Distribution of devices by risk level
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="h-[300px] flex items-center justify-center">
                      <Skeleton className="h-[250px] w-[250px] rounded-full" />
                    </div>
                  ) : (
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={riskData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {riskData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <ComplianceReportCard devices={devices || []} />
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  Security Alerts
                </CardTitle>
                <CardDescription>
                  Recent security issues requiring attention
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                  </div>
                ) : (
                  <div className="space-y-3">
                    {devices && devices.filter(d => d.status === 'compromised' || d.status === 'warning').length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        No security alerts at this time.
                      </div>
                    ) : (
                      devices && devices
                        .filter(d => d.status === 'compromised' || d.status === 'warning')
                        .slice(0, 5)
                        .map(device => (
                          <div key={device.id} className="border rounded-md p-3 flex justify-between items-center">
                            <div>
                              <div className="font-medium">{device.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {device.status === 'compromised' 
                                  ? 'Security compromised - immediate action required' 
                                  : 'Security warning - requires attention'}
                              </div>
                            </div>
                            <Button size="sm">
                              Investigate
                            </Button>
                          </div>
                        ))
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="compliance" className="rounded-md bg-white p-6 shadow-sm">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Compliance Report</h2>
              <p className="text-muted-foreground">
                Detailed compliance status for all managed devices in your organization.
              </p>
              
              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-[400px] w-full" />
                </div>
              ) : (
                <ComplianceReportCard devices={devices || []} />
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="threats" className="rounded-md bg-white p-6 shadow-sm">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Threat Detection</h2>
              <p className="text-muted-foreground">
                Advanced threat detection monitoring and alerts.
              </p>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <Shield className="h-16 w-16 mx-auto text-muted-foreground opacity-20 mb-4" />
                    <h3 className="text-lg font-medium">Threat Detection Module</h3>
                    <p className="text-muted-foreground">
                      The advanced threat detection module will be available in an upcoming release.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="risks" className="rounded-md bg-white p-6 shadow-sm">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Risk Assessment</h2>
              <p className="text-muted-foreground">
                Detailed risk scores and assessment for all devices.
              </p>
              
              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ) : (
                <div className="border rounded-md">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="px-4 py-3 text-left font-medium">Device</th>
                        <th className="px-4 py-3 text-left font-medium">Risk Score</th>
                        <th className="px-4 py-3 text-left font-medium">Status</th>
                        <th className="px-4 py-3 text-left font-medium">Risk Factors</th>
                      </tr>
                    </thead>
                    <tbody>
                      {devices && devices.length > 0 ? (
                        devices
                          .map(device => {
                            const riskScore = calculateDeviceRiskScore(device);
                            const riskLevel = getRiskLevel(riskScore);
                            
                            return (
                              <tr key={device.id} className="border-b last:border-0">
                                <td className="px-4 py-3">
                                  <div className="font-medium">{device.name}</div>
                                  <div className="text-xs text-muted-foreground">{device.model}</div>
                                </td>
                                <td className="px-4 py-3">
                                  <div className="font-mono font-bold text-lg">
                                    {riskScore}
                                  </div>
                                </td>
                                <td className="px-4 py-3">
                                  <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium capitalize
                                    ${riskLevel === 'low' ? 'bg-green-100 text-green-800' : ''}
                                    ${riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' : ''}
                                    ${riskLevel === 'high' ? 'bg-orange-100 text-orange-800' : ''}
                                    ${riskLevel === 'critical' ? 'bg-red-100 text-red-800' : ''}
                                  `}>
                                    {riskLevel}
                                  </div>
                                </td>
                                <td className="px-4 py-3">
                                  <div className="text-sm">
                                    {device.status === 'compromised' && (
                                      <span className="block text-red-600">Security compromised</span>
                                    )}
                                    {device.status === 'offline' && (
                                      <span className="block text-orange-600">Device offline</span>
                                    )}
                                    {device.batteryLevel < 20 && (
                                      <span className="block text-amber-600">Low battery ({device.batteryLevel}%)</span>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                      ) : (
                        <tr>
                          <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                            No devices found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default SecurityDashboardPage;
