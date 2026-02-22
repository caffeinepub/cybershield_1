import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Lock, Key, CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react';
import { type SecurityPolicy } from '../../backend';
import { useUpdatePolicy, useSignPolicy, useVerifyPolicySignature } from '../../hooks/useQueries';
import { toast } from 'sonner';

interface PolicyCardProps {
  policy: SecurityPolicy;
}

export default function PolicyCard({ policy }: PolicyCardProps) {
  const updatePolicy = useUpdatePolicy();
  const signPolicy = useSignPolicy();
  const { data: isSignatureValid, isLoading: isVerifying } = useVerifyPolicySignature(policy);

  const handleToggle = (enabled: boolean) => {
    updatePolicy.mutate(
      { policyId: policy.id, enabled },
      {
        onSuccess: () => {
          toast.success(`Policy ${enabled ? 'enabled' : 'disabled'}`);
        },
        onError: () => {
          toast.error('Failed to update policy');
        },
      }
    );
  };

  const handleSign = () => {
    signPolicy.mutate(
      { policyId: policy.id, policy },
      {
        onSuccess: () => {
          toast.success('Policy signed successfully');
        },
        onError: () => {
          toast.error('Failed to sign policy');
        },
      }
    );
  };

  const getIcon = () => {
    if (policy.policyType.toLowerCase().includes('firewall')) return Shield;
    if (policy.policyType.toLowerCase().includes('access')) return Lock;
    return Key;
  };

  const getSignatureStatus = () => {
    if (!policy.digitalSignature) {
      return {
        label: 'Unsigned',
        variant: 'secondary' as const,
        icon: AlertCircle,
        color: 'text-muted-foreground',
      };
    }

    if (isVerifying) {
      return {
        label: 'Verifying...',
        variant: 'secondary' as const,
        icon: Loader2,
        color: 'text-muted-foreground',
      };
    }

    if (isSignatureValid) {
      return {
        label: 'Signed & Valid',
        variant: 'default' as const,
        icon: CheckCircle,
        color: 'text-[#00ff41]',
      };
    }

    return {
      label: 'Invalid Signature',
      variant: 'destructive' as const,
      icon: XCircle,
      color: 'text-destructive',
    };
  };

  const Icon = getIcon();
  const signatureStatus = getSignatureStatus();
  const StatusIcon = signatureStatus.icon;

  return (
    <Card
      className={`border transition-all ${
        policy.enabled
          ? 'border-[#00ff41]/30 bg-[#00ff41]/5 shadow-[0_0_20px_rgba(0,255,65,0.1)]'
          : 'border-[#00ff41]/10 bg-card/50'
      } backdrop-blur-xl`}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div
              className={`rounded-lg p-2 ${
                policy.enabled ? 'bg-[#00ff41]/20' : 'bg-muted'
              }`}
            >
              <Icon
                className={`h-4 w-4 ${
                  policy.enabled ? 'text-[#00ff41]' : 'text-muted-foreground'
                }`}
              />
            </div>
            <CardTitle className="text-base">{policy.name}</CardTitle>
          </div>
          <Switch
            checked={policy.enabled}
            onCheckedChange={handleToggle}
            disabled={updatePolicy.isPending}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-xs text-muted-foreground">{policy.description}</p>
        <div className="text-xs text-muted-foreground">
          Type: <span className="text-foreground">{policy.policyType}</span>
        </div>
        
        <div className="flex items-center justify-between gap-2 pt-2">
          <Badge variant={signatureStatus.variant} className="flex items-center gap-1">
            <StatusIcon className={`h-3 w-3 ${signatureStatus.color} ${isVerifying ? 'animate-spin' : ''}`} />
            <span>{signatureStatus.label}</span>
          </Badge>
          
          <Button
            size="sm"
            variant="outline"
            onClick={handleSign}
            disabled={!!policy.digitalSignature || signPolicy.isPending}
            className="border-[#00ff41]/30 text-xs hover:bg-[#00ff41]/10"
          >
            {signPolicy.isPending ? (
              <>
                <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                Signing...
              </>
            ) : (
              'Sign Policy'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
