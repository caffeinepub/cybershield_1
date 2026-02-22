import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { Severity, ThreatType, Role, type SecurityPolicy, type Threat } from '../backend';

export function useGetUnresolvedThreats() {
  const { actor, isFetching } = useActor();

  return useQuery<Threat[]>({
    queryKey: ['threats', 'unresolved'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getUnresolvedThreats();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 10000, // Refetch every 10 seconds for real-time feel
  });
}

export function useGetAllPolicies() {
  const { actor, isFetching } = useActor();

  return useQuery<SecurityPolicy[]>({
    queryKey: ['policies'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPolicies();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddThreat() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      threatType,
      severity,
      description,
    }: {
      threatType: ThreatType;
      severity: Severity;
      description: string;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addThreat(threatType, severity, description);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['threats'] });
    },
  });
}

export function useUpdatePolicy() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ policyId, enabled }: { policyId: bigint; enabled: boolean }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.updatePolicy(policyId, enabled);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['policies'] });
    },
  });
}

export function useAddIncident() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ description, severity }: { description: string; severity: Severity }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addIncident(description, severity);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['incidents'] });
    },
  });
}

export function useAddScan() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ findings, severity }: { findings: string[]; severity: Severity }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addScan(findings, severity);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scans'] });
    },
  });
}

export function useRegisterUser() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async ({ username }: { username: string }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.registerUser(username, Role.user);
    },
  });
}

export function useSignPolicy() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ policyId, policy }: { policyId: bigint; policy: SecurityPolicy }) => {
      if (!actor) throw new Error('Actor not initialized');
      
      // Generate a signature from policy data (simulated client-side)
      const signatureData = `${policy.name}|${policy.description}|${policy.policyType}|${policy.enabled}`;
      const signature = `SIG-${btoa(signatureData)}-${Date.now()}`;
      
      await actor.storePolicySignature(policyId, signature);
      return signature;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['policies'] });
    },
  });
}

export function useVerifyPolicySignature(policy: SecurityPolicy) {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['policy-signature', policy.id.toString()],
    queryFn: async () => {
      if (!actor) return false;
      
      // If no signature exists, return false
      if (!policy.digitalSignature) {
        return false;
      }

      // Get the stored signature from backend
      const storedSignature = await actor.getPolicySignature(policy.id);
      
      if (!storedSignature) {
        return false;
      }

      // Generate expected signature from current policy data
      const signatureData = `${policy.name}|${policy.description}|${policy.policyType}|${policy.enabled}`;
      
      // Verify by checking if the stored signature contains the encoded data
      // This is a simplified verification - in production, use proper cryptographic verification
      try {
        const signatureParts = storedSignature.split('-');
        if (signatureParts.length !== 3 || signatureParts[0] !== 'SIG') {
          return false;
        }
        
        const encodedData = signatureParts[1];
        const decodedData = atob(encodedData);
        
        return decodedData === signatureData;
      } catch {
        return false;
      }
    },
    enabled: !!actor && !isFetching && !!policy.digitalSignature,
  });
}
