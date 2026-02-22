import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface UpdatePolicyParams {
    policyType: string;
    name: string;
    description: string;
    enabled: boolean;
}
export interface Threat {
    id: bigint;
    resolved: boolean;
    description: string;
    threatType: ThreatType;
    timestamp: Time;
    severity: Severity;
}
export interface SecurityPolicy {
    id: bigint;
    policyType: string;
    name: string;
    digitalSignature?: string;
    description: string;
    enabled: boolean;
}
export interface NewPolicy {
    id: bigint;
    policyType: string;
    name: string;
    description: string;
}
export enum Role {
    admin = "admin",
    user = "user",
    viewer = "viewer"
}
export enum Severity {
    low = "low",
    high = "high",
    critical = "critical",
    medium = "medium"
}
export enum ThreatType {
    unauthorizedAccess = "unauthorizedAccess",
    ddos = "ddos",
    phishing = "phishing",
    malware = "malware"
}
export interface backendInterface {
    acknowledgeAlert(alertId: bigint): Promise<void>;
    addIncident(description: string, severity: Severity): Promise<bigint>;
    addScan(findings: Array<string>, severity: Severity): Promise<bigint>;
    addSecurityPolicy(newPolicy: NewPolicy): Promise<bigint>;
    addThreat(threatType: ThreatType, severity: Severity, description: string): Promise<bigint>;
    enablePolicy(policyId: bigint): Promise<void>;
    getAllPolicies(): Promise<Array<SecurityPolicy>>;
    getPolicySignature(policyId: bigint): Promise<string | null>;
    getUnresolvedThreats(): Promise<Array<Threat>>;
    registerUser(username: string, _role: Role): Promise<void>;
    storePolicySignature(policyId: bigint, signature: string): Promise<void>;
    updatePolicy(policyId: bigint, enabled: boolean): Promise<void>;
    updateSecurityPolicy(id: bigint, update: UpdatePolicyParams): Promise<void>;
}
