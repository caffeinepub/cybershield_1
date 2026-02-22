import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle } from 'lucide-react';
import { Severity, type Threat } from '../../backend';

interface ThreatLevelIndicatorProps {
  threats: Threat[];
}

export default function ThreatLevelIndicator({ threats }: ThreatLevelIndicatorProps) {
  const getHighestSeverity = () => {
    if (threats.some((t) => t.severity === Severity.critical)) return 'critical';
    if (threats.some((t) => t.severity === Severity.high)) return 'high';
    if (threats.some((t) => t.severity === Severity.medium)) return 'medium';
    if (threats.some((t) => t.severity === Severity.low)) return 'low';
    return 'none';
  };

  const severity = getHighestSeverity();

  const severityConfig = {
    critical: {
      label: 'Critical',
      color: 'text-red-400',
      bgColor: 'bg-red-500/20',
      borderColor: 'border-red-500/50',
      glowColor: 'shadow-[0_0_40px_rgba(239,68,68,0.3)]',
    },
    high: {
      label: 'High',
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/20',
      borderColor: 'border-orange-500/50',
      glowColor: 'shadow-[0_0_40px_rgba(249,115,22,0.3)]',
    },
    medium: {
      label: 'Medium',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20',
      borderColor: 'border-yellow-500/50',
      glowColor: 'shadow-[0_0_40px_rgba(234,179,8,0.3)]',
    },
    low: {
      label: 'Low',
      color: 'text-[#00ff41]',
      bgColor: 'bg-[#00ff41]/20',
      borderColor: 'border-[#00ff41]/50',
      glowColor: 'shadow-[0_0_40px_rgba(0,255,65,0.3)]',
    },
    none: {
      label: 'Secure',
      color: 'text-[#00d9ff]',
      bgColor: 'bg-[#00d9ff]/20',
      borderColor: 'border-[#00d9ff]/50',
      glowColor: 'shadow-[0_0_40px_rgba(0,217,255,0.3)]',
    },
  };

  const config = severityConfig[severity];

  return (
    <Card
      className={`border ${config.borderColor} ${config.glowColor} bg-card/50 backdrop-blur-xl`}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className={`h-5 w-5 ${config.color}`} />
          Threat Level
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <div className={`text-5xl font-bold ${config.color}`}>{config.label}</div>
            <p className="mt-2 text-sm text-muted-foreground">
              {threats.length} active threat{threats.length !== 1 ? 's' : ''} detected
            </p>
          </div>
          <div className={`rounded-full ${config.bgColor} p-8`}>
            <AlertTriangle className={`h-16 w-16 ${config.color}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
