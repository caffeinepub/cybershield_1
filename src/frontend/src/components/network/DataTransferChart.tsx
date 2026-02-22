import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

const mockData = [
  { time: '00:00', upload: 0.8, download: 1.2 },
  { time: '04:00', upload: 0.6, download: 0.9 },
  { time: '08:00', upload: 1.5, download: 2.3 },
  { time: '12:00', upload: 2.1, download: 3.5 },
  { time: '16:00', upload: 1.8, download: 2.8 },
  { time: '20:00', upload: 1.2, download: 1.9 },
];

export default function DataTransferChart() {
  return (
    <Card className="border-[#00ff41]/20 bg-card/80 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-[#00ff41]" />
          Data Transfer Rate (24h)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={mockData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,255,65,0.1)" />
            <XAxis dataKey="time" stroke="rgba(255,255,255,0.5)" />
            <YAxis stroke="rgba(255,255,255,0.5)" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(13, 17, 23, 0.95)',
                border: '1px solid rgba(0,255,65,0.3)',
                borderRadius: '8px',
              }}
            />
            <Line
              type="monotone"
              dataKey="upload"
              stroke="#00d9ff"
              strokeWidth={2}
              dot={{ fill: '#00d9ff', r: 4 }}
              name="Upload (GB/s)"
            />
            <Line
              type="monotone"
              dataKey="download"
              stroke="#00ff41"
              strokeWidth={2}
              dot={{ fill: '#00ff41', r: 4 }}
              name="Download (GB/s)"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
