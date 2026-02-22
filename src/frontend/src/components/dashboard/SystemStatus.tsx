import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Server, Database, Shield, Network } from 'lucide-react';

export default function SystemStatus() {
  const systems = [
    { name: 'Firewall', status: 'operational', icon: Shield },
    { name: 'IDS/IPS', status: 'operational', icon: Network },
    { name: 'Database', status: 'operational', icon: Database },
    { name: 'API Gateway', status: 'operational', icon: Server },
  ];

  return (
    <Card
      className="relative overflow-hidden border-[#00ff41]/20 bg-card/50 backdrop-blur-xl"
      style={{
        backgroundImage: 'url(/assets/generated/network-bg.dim_1920x1080.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-background/95 to-background/80"></div>
      <CardHeader className="relative">
        <CardTitle className="flex items-center gap-2">
          <Server className="h-5 w-5 text-[#00d9ff]" />
          System Status
        </CardTitle>
      </CardHeader>
      <CardContent className="relative">
        <div className="space-y-3">
          {systems.map((system) => {
            const Icon = system.icon;
            return (
              <div
                key={system.name}
                className="flex items-center justify-between rounded-lg border border-[#00ff41]/10 bg-[#00ff41]/5 p-3"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-[#00d9ff]/10 p-2">
                    <Icon className="h-4 w-4 text-[#00d9ff]" />
                  </div>
                  <span className="text-sm font-medium">{system.name}</span>
                </div>
                <Badge className="bg-[#00ff41]/20 text-[#00ff41] hover:bg-[#00ff41]/30">
                  <div className="mr-2 h-2 w-2 animate-pulse rounded-full bg-[#00ff41]"></div>
                  Operational
                </Badge>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
