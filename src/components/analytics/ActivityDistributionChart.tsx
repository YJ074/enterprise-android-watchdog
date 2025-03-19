
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { activityLogs } from "@/lib/mock-data";
import { useMemo } from 'react';

export function ActivityDistributionChart() {
  // Calculate distribution of activity types
  const activityDistribution = useMemo(() => {
    const counts: Record<string, number> = {};
    
    activityLogs.forEach(log => {
      counts[log.type] = (counts[log.type] || 0) + 1;
    });
    
    return Object.entries(counts).map(([type, count]) => ({
      name: formatActivityType(type),
      value: count,
      color: getActivityColor(type)
    }));
  }, []);

  // Helper to format activity type for display
  function formatActivityType(type: string): string {
    return type
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  // Get color based on activity type
  function getActivityColor(type: string): string {
    switch (type) {
      case 'app_install':
        return '#4ade80';
      case 'app_uninstall':
        return '#f87171';
      case 'login':
        return '#60a5fa';
      case 'logout':
        return '#93c5fd';
      case 'location_change':
        return '#fcd34d';
      case 'policy_violation':
        return '#fb7185';
      case 'system_update':
        return '#a78bfa';
      default:
        return '#94a3b8';
    }
  }

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        style={{ fontSize: '12px', fontWeight: 'bold' }}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Activity Distribution</CardTitle>
        <CardDescription>Distribution of activities by type</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={activityDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={100}
                innerRadius={50}
                fill="#8884d8"
                dataKey="value"
              >
                {activityDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`${value} activities`, 'Count']}
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
