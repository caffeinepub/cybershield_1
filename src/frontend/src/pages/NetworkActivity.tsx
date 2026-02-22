import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ConnectionList from '../components/network/ConnectionList';
import ConnectionFilter from '../components/network/ConnectionFilter';
import DataTransferChart from '../components/network/DataTransferChart';
import { Network, Activity } from 'lucide-react';

export default function NetworkActivity() {
  const [filterType, setFilterType] = useState<string>('all');
  const [showSuspicious, setShowSuspicious] = useState(false);

  return (
    <div
      className="space-y-6"
      style={{
        backgroundImage: 'url(/assets/generated/network-bg.dim_1920x1080.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundBlendMode: 'overlay',
      }}
    >
      <div>
        <h1 className="mb-2 flex items-center gap-2 text-3xl font-bold text-foreground">
          <Network className="h-8 w-8 text-[#00d9ff]" />
          Network Activity
        </h1>
        <p className="text-sm text-muted-foreground">
          Monitor active connections and data transfer
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-[#00d9ff]/20 bg-card/80 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-sm">Active Connections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#00d9ff]">247</div>
          </CardContent>
        </Card>

        <Card className="border-[#00ff41]/20 bg-card/80 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-sm">Data Transfer Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#00ff41]">1.2 GB/s</div>
          </CardContent>
        </Card>

        <Card className="border-red-500/20 bg-card/80 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-sm">Suspicious Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-400">3</div>
          </CardContent>
        </Card>
      </div>

      <DataTransferChart />

      <Card className="border-[#00ff41]/20 bg-card/80 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-[#00ff41]" />
            Active Connections
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ConnectionFilter
            filterType={filterType}
            setFilterType={setFilterType}
            showSuspicious={showSuspicious}
            setShowSuspicious={setShowSuspicious}
          />
          <ConnectionList filterType={filterType} showSuspicious={showSuspicious} />
        </CardContent>
      </Card>
    </div>
  );
}
