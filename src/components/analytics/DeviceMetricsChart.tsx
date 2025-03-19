
import { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  LineChart,
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartBarIcon, TrendingUpIcon, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

// Mock data for device metrics over time
const deviceMetricsData = [
  { month: 'Jan', onlineRate: 92, securityScore: 88, complianceRate: 95, responseTime: 320 },
  { month: 'Feb', onlineRate: 88, securityScore: 85, complianceRate: 92, responseTime: 350 },
  { month: 'Mar', onlineRate: 91, securityScore: 89, complianceRate: 94, responseTime: 310 },
  { month: 'Apr', onlineRate: 93, securityScore: 91, complianceRate: 96, responseTime: 290 },
  { month: 'May', onlineRate: 96, securityScore: 94, complianceRate: 98, responseTime: 270 },
  { month: 'Jun', onlineRate: 95, securityScore: 92, complianceRate: 97, responseTime: 285 },
];

type MetricType = 'onlineRate' | 'securityScore' | 'complianceRate' | 'responseTime';
type ChartType = 'bar' | 'line';

export function DeviceMetricsChart() {
  const [selectedMetric, setSelectedMetric] = useState<MetricType>('onlineRate');
  const [chartType, setChartType] = useState<ChartType>('bar');
  const { toast } = useToast();

  const metricConfig = {
    onlineRate: {
      label: 'Device Online Rate (%)',
      color: '#22c55e',
      domain: [80, 100]
    },
    securityScore: {
      label: 'Security Score (%)',
      color: '#3b82f6',
      domain: [80, 100]
    },
    complianceRate: {
      label: 'Compliance Rate (%)',
      color: '#a855f7', 
      domain: [80, 100]
    },
    responseTime: {
      label: 'Avg Response Time (ms)',
      color: '#f59e0b',
      domain: [200, 400]
    }
  };

  const handleRefresh = () => {
    toast({
      title: "Refreshing metrics data",
      description: "Fetching the latest device metrics...",
    });
    // In a real app, this would fetch new data
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Device Performance Metrics</CardTitle>
          <CardDescription>Historical performance data for managed devices</CardDescription>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex bg-muted rounded-md p-1">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "h-8 rounded-sm",
                chartType === 'bar' && "bg-background shadow-sm"
              )}
              onClick={() => setChartType('bar')}
            >
              <ChartBarIcon className="h-4 w-4 mr-2" />
              Bar
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "h-8 rounded-sm",
                chartType === 'line' && "bg-background shadow-sm"
              )}
              onClick={() => setChartType('line')}
            >
              <TrendingUpIcon className="h-4 w-4 mr-2" />
              Line
            </Button>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8"
            onClick={handleRefresh}
          >
            <RefreshCw className="h-4 w-4 mr-1" />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="flex flex-wrap justify-start gap-2">
            {Object.entries(metricConfig).map(([metric, config]) => (
              <Button
                key={metric}
                variant={selectedMetric === metric ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedMetric(metric as MetricType)}
                className="h-8"
              >
                {config.label}
              </Button>
            ))}
          </div>
          
          <div className="h-[300px] w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === 'bar' ? (
                <BarChart
                  data={deviceMetricsData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="month" />
                  <YAxis 
                    domain={metricConfig[selectedMetric].domain} 
                    label={{ 
                      value: metricConfig[selectedMetric].label, 
                      angle: -90, 
                      position: 'insideLeft',
                      style: { fontSize: '12px', textAnchor: 'middle' }
                    }}
                  />
                  <Tooltip />
                  <Legend />
                  <Bar 
                    dataKey={selectedMetric} 
                    name={metricConfig[selectedMetric].label} 
                    fill={metricConfig[selectedMetric].color} 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              ) : (
                <LineChart
                  data={deviceMetricsData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="month" />
                  <YAxis 
                    domain={metricConfig[selectedMetric].domain}
                    label={{ 
                      value: metricConfig[selectedMetric].label, 
                      angle: -90, 
                      position: 'insideLeft',
                      style: { fontSize: '12px', textAnchor: 'middle' }
                    }}
                  />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey={selectedMetric} 
                    name={metricConfig[selectedMetric].label}
                    stroke={metricConfig[selectedMetric].color} 
                    strokeWidth={2} 
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
