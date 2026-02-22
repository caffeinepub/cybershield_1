import { useGetUnresolvedThreats, useGetAllPolicies } from '../hooks/useQueries';
import MetricsGrid from '../components/dashboard/MetricsGrid';
import ThreatLevelIndicator from '../components/dashboard/ThreatLevelIndicator';
import RecentEvents from '../components/dashboard/RecentEvents';
import SystemStatus from '../components/dashboard/SystemStatus';

export default function Dashboard() {
  const { data: threats = [], isLoading: threatsLoading } = useGetUnresolvedThreats();
  const { data: policies = [], isLoading: policiesLoading } = useGetAllPolicies();

  const isLoading = threatsLoading || policiesLoading;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2 text-3xl font-bold text-foreground">Security Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Real-time monitoring and threat intelligence
        </p>
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#00ff41] border-t-transparent"></div>
            <p className="text-sm text-muted-foreground">Loading security data...</p>
          </div>
        </div>
      ) : (
        <>
          <ThreatLevelIndicator threats={threats} />
          <MetricsGrid threats={threats} policies={policies} />
          <div className="grid gap-6 lg:grid-cols-2">
            <RecentEvents threats={threats} />
            <SystemStatus />
          </div>
        </>
      )}
    </div>
  );
}
