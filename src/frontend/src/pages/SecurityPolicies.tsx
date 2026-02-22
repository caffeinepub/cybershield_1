import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetAllPolicies } from '../hooks/useQueries';
import PolicyList from '../components/policies/PolicyList';
import { Shield, Lock } from 'lucide-react';

export default function SecurityPolicies() {
  const { data: policies = [], isLoading } = useGetAllPolicies();

  const activePolicies = policies.filter((p) => p.enabled).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2 flex items-center gap-2 text-3xl font-bold text-foreground">
          <Shield className="h-8 w-8 text-[#00ff41]" />
          Security Policies
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage and configure security policies
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-[#00ff41]/20 bg-card/50 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-sm">Total Policies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#00ff41]">{policies.length}</div>
          </CardContent>
        </Card>

        <Card className="border-[#00d9ff]/20 bg-card/50 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-sm">Active Policies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#00d9ff]">{activePolicies}</div>
          </CardContent>
        </Card>

        <Card className="border-orange-500/20 bg-card/50 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-sm">Inactive Policies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-400">
              {policies.length - activePolicies}
            </div>
          </CardContent>
        </Card>
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#00ff41] border-t-transparent"></div>
            <p className="text-sm text-muted-foreground">Loading policies...</p>
          </div>
        </div>
      ) : (
        <PolicyList policies={policies} />
      )}
    </div>
  );
}
