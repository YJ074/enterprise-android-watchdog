
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { devices } from "@/lib/mock-data";
import { useMemo } from 'react';

export function DeviceStatusDistributionChart() {
  // Calculate distribution of device statuses
  const statusDistribution = useMemo(() => {
    const counts: Record<string, number> = {};
    
    devices.forEach(device => {
      counts[device.status] = (counts[device.status] || 0) + 1;
    });
    
    return Object.entries(counts).map(([status, count]) => ({
      name: status.charAt(0).toUpperCase() + status.slice(1),
      value: count,
      color: getStatusColor(status)
    }));
  }, []);

  // Get color based on device status
  function getStatusColor(status: string): string {
    switch (status) {
      case 'online':
        return '#22c55e'; // green
      case 'offline':
        return '#94a3b8'; // gray
      case 'warning':
        return '#eab308'; // yellow
      case 'compromised':
        return '#ef4444'; // red
      default:
        return '#94a3b8'; // gray
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Device Status Distribution</CardTitle>
        <CardDescription>Current status of all managed devices</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusDistribution}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                labelLine={true}
              >
                {statusDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`${value} devices`, 'Count']}
                contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', border: '1px solid #e2e8f0' }}
              />
              <Legend layout="horizontal" verticalAlign="bottom" align="center" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
