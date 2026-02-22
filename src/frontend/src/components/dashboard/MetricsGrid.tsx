import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, AlertTriangle, Activity, Lock } from 'lucide-react';
import { Severity, type Threat, type SecurityPolicy } from '../../backend';

interface MetricsGridProps {
  threats: Threat[];
  policies: SecurityPolicy[];
}

export default function MetricsGrid({ threats, policies }: MetricsGridProps) {
  const criticalThreats = threats.filter((t) => t.severity === Severity.critical).length;
  const activePolicies = policies.filter((p) => p.enabled).length;

  const metrics = [
    {
      title: 'Active Threats',
      value: threats.length,
      icon: AlertTriangle,
      color: 'text-red-400',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/30',
    },
    {
      title: 'Critical Alerts',
      value: criticalThreats,
      icon: Shield,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/30',
    },
    {
      title: 'Active Policies',
      value: activePolicies,
      icon: Lock,
      color: 'text-[#00ff41]',
      bgColor: 'bg-[#00ff41]/10',
      borderColor: 'border-[#00ff41]/30',
    },
    {
      title: 'System Status',
      value: 'Operational',
      icon: Activity,
      color: 'text-[#00d9ff]',
      bgColor: 'bg-[#00d9ff]/10',
      borderColor: 'border-[#00d9ff]/30',
      isText: true,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <Card
            key={metric.title}
            className={`glow-card border ${metric.borderColor} bg-card/50 backdrop-blur-xl transition-all hover:shadow-[0_0_30px_rgba(0,255,65,0.15)]`}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <div className={`rounded-lg ${metric.bgColor} p-2`}>
                <Icon className={`h-4 w-4 ${metric.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold ${metric.color}`}>
                {metric.isText ? metric.value : metric.value}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
