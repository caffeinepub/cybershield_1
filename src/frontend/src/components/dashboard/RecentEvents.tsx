import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';
import { Severity, ThreatType, type Threat } from '../../backend';

interface RecentEventsProps {
  threats: Threat[];
}

export default function RecentEvents({ threats }: RecentEventsProps) {
  const getSeverityVariant = (severity: Severity) => {
    if (severity === Severity.critical || severity === Severity.high) return 'destructive';
    if (severity === Severity.medium) return 'default';
    return 'secondary';
  };

  const getSeverityLabel = (severity: Severity) => {
    if (severity === Severity.critical) return 'Critical';
    if (severity === Severity.high) return 'High';
    if (severity === Severity.medium) return 'Medium';
    return 'Low';
  };

  const getThreatTypeLabel = (threatType: ThreatType) => {
    if (threatType === ThreatType.malware) return 'Malware';
    if (threatType === ThreatType.phishing) return 'Phishing';
    if (threatType === ThreatType.unauthorizedAccess) return 'Unauthorized Access';
    if (threatType === ThreatType.ddos) return 'DDoS';
    return 'Unknown';
  };

  const sortedThreats = [...threats].sort(
    (a, b) => Number(b.timestamp) - Number(a.timestamp)
  );

  return (
    <Card className="border-[#00ff41]/20 bg-card/50 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-[#00ff41]" />
          Recent Security Events
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          {sortedThreats.length === 0 ? (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              No recent events
            </div>
          ) : (
            <div className="space-y-3">
              {sortedThreats.map((threat) => (
                <div
                  key={Number(threat.id)}
                  className="rounded-lg border border-[#00ff41]/10 bg-[#00ff41]/5 p-3 transition-all hover:border-[#00ff41]/30"
                >
                  <div className="mb-2 flex items-start justify-between">
                    <Badge variant={getSeverityVariant(threat.severity)}>
                      {getSeverityLabel(threat.severity)}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(Number(threat.timestamp) / 1000000).toLocaleString()}
                    </span>
                  </div>
                  <p className="mb-1 text-sm font-medium">
                    {getThreatTypeLabel(threat.threatType)}
                  </p>
                  <p className="text-xs text-muted-foreground">{threat.description}</p>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
