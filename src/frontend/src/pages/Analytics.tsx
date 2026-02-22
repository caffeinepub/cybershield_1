import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetUnresolvedThreats } from '../hooks/useQueries';
import ThreatTrendChart from '../components/analytics/ThreatTrendChart';
import AttackPatternChart from '../components/analytics/AttackPatternChart';
import VulnerabilityStatsChart from '../components/analytics/VulnerabilityStatsChart';
import TimeRangeSelector from '../components/analytics/TimeRangeSelector';
import { BarChart3 } from 'lucide-react';
import { Severity } from '../backend';

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('7d');
  const { data: threats = [] } = useGetUnresolvedThreats();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2 flex items-center gap-2 text-3xl font-bold text-foreground">
            <BarChart3 className="h-8 w-8 text-[#00ff41]" />
            Security Analytics
          </h1>
          <p className="text-sm text-muted-foreground">
            Threat trends and vulnerability statistics
          </p>
        </div>
        <TimeRangeSelector timeRange={timeRange} setTimeRange={setTimeRange} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-[#00ff41]/20 bg-card/50 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-sm">Total Threats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#00ff41]">{threats.length}</div>
          </CardContent>
        </Card>

        <Card className="border-red-500/20 bg-card/50 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-sm">Critical Threats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-400">
              {threats.filter((t) => t.severity === Severity.critical).length}
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#00d9ff]/20 bg-card/50 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-sm">Avg Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#00d9ff]">2.3h</div>
          </CardContent>
        </Card>
      </div>

      <ThreatTrendChart threats={threats} />

      <div className="grid gap-6 lg:grid-cols-2">
        <AttackPatternChart threats={threats} />
        <VulnerabilityStatsChart threats={threats} />
      </div>
    </div>
  );
}
