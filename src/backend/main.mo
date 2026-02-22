import Time "mo:core/Time";
import Map "mo:core/Map";
import CoreArray "mo:core/Array";
import Text "mo:core/Text";
import List "mo:core/List";
import Order "mo:core/Order";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Migration "migration";

(with migration = Migration.run)
actor {
  type ThreatType = {
    #malware;
    #phishing;
    #unauthorizedAccess;
    #ddos;
  };

  type Severity = {
    #low;
    #medium;
    #high;
    #critical;
  };

  type Threat = {
    id : Nat;
    threatType : ThreatType;
    severity : Severity;
    timestamp : Time.Time;
    description : Text;
    resolved : Bool;
  };

  type SecurityAlert = {
    id : Nat;
    message : Text;
    timestamp : Time.Time;
    acknowledged : Bool;
    severity : Severity;
  };

  type SecurityPolicy = {
    id : Nat;
    name : Text;
    enabled : Bool;
    description : Text;
    policyType : Text;
    digitalSignature : ?Text;
  };

  module SecurityPolicy {
    public func compare(p1 : SecurityPolicy, p2 : SecurityPolicy) : Order.Order {
      Text.compare(p1.name, p2.name);
    };
  };

  type Role = {
    #admin;
    #user;
    #viewer;
  };

  type User = {
    principal : Principal;
    username : Text;
    role : Role;
  };

  type Incident = {
    id : Nat;
    description : Text;
    severity : Severity;
    status : { #open; #inProgress; #resolved };
    timestamp : Time.Time;
    resolutionNotes : ?Text;
  };

  type SecurityScan = {
    id : Nat;
    status : { #pending; #inProgress; #completed };
    startTime : Time.Time;
    endTime : ?Time.Time;
    findings : [Text];
    severity : Severity;
  };

  let threats = Map.empty<Nat, Threat>();
  let alerts = Map.empty<Nat, SecurityAlert>();
  let policies = Map.empty<Nat, SecurityPolicy>();
  let users = Map.empty<Principal, User>();
  let incidents = Map.empty<Nat, Incident>();
  let scans = Map.empty<Nat, SecurityScan>();

  var nextThreatId = 1;
  var nextAlertId = 1;
  var nextPolicyId = 1;
  var nextIncidentId = 1;
  var nextScanId = 1;

  public shared ({ caller }) func registerUser(username : Text, _role : Role) : async () {
    if (users.containsKey(caller)) {
      Runtime.trap("User already registered");
    };
    let user : User = {
      principal = caller;
      username;
      role = #user;
    };
    users.add(caller, user);
  };

  public shared ({ caller }) func addThreat(threatType : ThreatType, severity : Severity, description : Text) : async Nat {
    let id = nextThreatId;
    nextThreatId += 1;
    let threat : Threat = {
      id;
      threatType;
      severity;
      timestamp = Time.now();
      description;
      resolved = false;
    };
    threats.add(id, threat);
    id;
  };

  public shared ({ caller }) func acknowledgeAlert(alertId : Nat) : async () {
    switch (alerts.get(alertId)) {
      case (null) { Runtime.trap("Alert not found") };
      case (?alert) {
        let updatedAlert = {
          alert with
          acknowledged = true;
        };
        alerts.add(alertId, updatedAlert);
      };
    };
  };

  public shared ({ caller }) func updatePolicy(policyId : Nat, enabled : Bool) : async () {
    switch (policies.get(policyId)) {
      case (null) { Runtime.trap("Policy not found") };
      case (?policy) {
        let updatedPolicy = {
          policy with
          enabled;
        };
        policies.add(policyId, updatedPolicy);
      };
    };
  };

  public shared ({ caller }) func addIncident(description : Text, severity : Severity) : async Nat {
    let id = nextIncidentId;
    nextIncidentId += 1;
    let incident : Incident = {
      id;
      description;
      severity;
      status = #open;
      timestamp = Time.now();
      resolutionNotes = null;
    };
    incidents.add(id, incident);
    id;
  };

  public shared ({ caller }) func addScan(findings : [Text], severity : Severity) : async Nat {
    let id = nextScanId;
    nextScanId += 1;
    let scan : SecurityScan = {
      id;
      status = #completed;
      startTime = Time.now();
      endTime = ?Time.now();
      findings;
      severity;
    };
    scans.add(id, scan);
    id;
  };

  public shared ({ caller }) func enablePolicy(policyId : Nat) : async () {
    switch (policies.get(policyId)) {
      case (null) { Runtime.trap("Policy not found") };
      case (?policy) {
        let updatedPolicy = {
          policy with
          enabled = true;
        };
        policies.add(policyId, updatedPolicy);
      };
    };
  };

  public query ({ caller }) func getAllPolicies() : async [SecurityPolicy] {
    policies.values().toArray().sort();
  };

  public query ({ caller }) func getUnresolvedThreats() : async [Threat] {
    let unresolved = List.empty<Threat>();
    for (threat in threats.values()) {
      if (not threat.resolved) {
        unresolved.add(threat);
      };
    };
    unresolved.toArray();
  };

  type NewPolicy = {
    id : Nat;
    name : Text;
    description : Text;
    policyType : Text;
  };

  type UpdatePolicyParams = {
    enabled : Bool;
    name : Text;
    description : Text;
    policyType : Text;
  };

  public shared ({ caller }) func addSecurityPolicy(newPolicy : NewPolicy) : async Nat {
    let policyId = nextPolicyId;
    let policy = {
      id = policyId;
      name = newPolicy.name;
      enabled = false;
      description = newPolicy.description;
      policyType = newPolicy.policyType;
      digitalSignature = null;
    };

    policies.add(policyId, policy);
    nextPolicyId += 1;
    policyId;
  };

  public shared ({ caller }) func updateSecurityPolicy(id : Nat, update : UpdatePolicyParams) : async () {
    switch (policies.get(id)) {
      case (null) { Runtime.trap("Policy not found") };
      case (?_) {
        let updatedPolicy = {
          update with
          id;
          digitalSignature = null;
        };
        policies.add(id, updatedPolicy);
      };
    };
  };

  public shared ({ caller }) func storePolicySignature(policyId : Nat, signature : Text) : async () {
    switch (policies.get(policyId)) {
      case (null) { Runtime.trap("Policy not found") };
      case (?policy) {
        let updatedPolicy = {
          policy with
          digitalSignature = ?signature;
        };
        policies.add(policyId, updatedPolicy);
      };
    };
  };

  public query ({ caller }) func getPolicySignature(policyId : Nat) : async ?Text {
    switch (policies.get(policyId)) {
      case (null) { Runtime.trap("Policy not found") };
      case (?policy) { policy.digitalSignature };
    };
  };
};
