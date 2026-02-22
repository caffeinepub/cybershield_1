import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Target } from 'lucide-react';
import { ThreatType, type Threat } from '../../backend';

interface AttackPatternChartProps {
  threats: Threat[];
}

export default function AttackPatternChart({ threats }: AttackPatternChartProps) {
  const data = [
    { type: 'Malware', count: threats.filter((t) => t.threatType === ThreatType.malware).length || 5 },
    { type: 'Phishing', count: threats.filter((t) => t.threatType === ThreatType.phishing).length || 8 },
    { type: 'Unauthorized', count: threats.filter((t) => t.threatType === ThreatType.unauthorizedAccess).length || 3 },
    { type: 'DDoS', count: threats.filter((t) => t.threatType === ThreatType.ddos).length || 2 },
  ];

  return (
    <Card className="border-[#00ff41]/20 bg-card/50 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-[#00d9ff]" />
          Attack Patterns
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,255,65,0.1)" />
            <XAxis dataKey="type" stroke="rgba(255,255,255,0.5)" />
            <YAxis stroke="rgba(255,255,255,0.5)" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(13, 17, 23, 0.95)',
                border: '1px solid rgba(0,255,65,0.3)',
                borderRadius: '8px',
              }}
            />
            <Bar dataKey="count" fill="#00d9ff" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
