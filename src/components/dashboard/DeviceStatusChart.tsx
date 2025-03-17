
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { devices } from "@/lib/mock-data";

export function DeviceStatusChart() {
  // Calculate status counts
  const statusCount = devices.reduce((acc, device) => {
    acc[device.status] = (acc[device.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const data = [
    { name: "Online", value: statusCount.online || 0, color: "#22c55e" },
    { name: "Offline", value: statusCount.offline || 0, color: "#94a3b8" },
    { name: "Warning", value: statusCount.warning || 0, color: "#eab308" },
    { name: "Compromised", value: statusCount.compromised || 0, color: "#ef4444" },
  ];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Device Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} devices`, 'Count']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
