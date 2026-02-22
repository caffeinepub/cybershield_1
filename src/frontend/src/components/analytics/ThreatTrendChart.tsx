import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { type Threat } from '../../backend';

interface ThreatTrendChartProps {
  threats: Threat[];
}

const mockData = [
  { date: 'Feb 14', critical: 2, high: 5, medium: 8, low: 12 },
  { date: 'Feb 15', critical: 1, high: 6, medium: 10, low: 15 },
  { date: 'Feb 16', critical: 3, high: 4, medium: 7, low: 11 },
  { date: 'Feb 17', critical: 2, high: 7, medium: 9, low: 13 },
  { date: 'Feb 18', critical: 4, high: 5, medium: 11, low: 14 },
  { date: 'Feb 19', critical: 1, high: 8, medium: 6, low: 10 },
  { date: 'Feb 20', critical: 2, high: 6, medium: 8, low: 12 },
];

export default function ThreatTrendChart({ threats }: ThreatTrendChartProps) {
  return (
    <Card className="border-[#00ff41]/20 bg-card/50 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-[#00ff41]" />
          Threat Trends (7 Days)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={mockData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,255,65,0.1)" />
            <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" />
            <YAxis stroke="rgba(255,255,255,0.5)" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(13, 17, 23, 0.95)',
                border: '1px solid rgba(0,255,65,0.3)',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="critical"
              stroke="#ef4444"
              strokeWidth={2}
              dot={{ fill: '#ef4444', r: 4 }}
              name="Critical"
            />
            <Line
              type="monotone"
              dataKey="high"
              stroke="#f97316"
              strokeWidth={2}
              dot={{ fill: '#f97316', r: 4 }}
              name="High"
            />
            <Line
              type="monotone"
              dataKey="medium"
              stroke="#eab308"
              strokeWidth={2}
              dot={{ fill: '#eab308', r: 4 }}
              name="Medium"
            />
            <Line
              type="monotone"
              dataKey="low"
              stroke="#00ff41"
              strokeWidth={2}
              dot={{ fill: '#00ff41', r: 4 }}
              name="Low"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
