import Map "mo:core/Map";
import Nat "mo:core/Nat";

module {
  type OldSecurityPolicy = {
    id : Nat;
    name : Text;
    enabled : Bool;
    description : Text;
    policyType : Text;
  };

  type OldActor = {
    policies : Map.Map<Nat, OldSecurityPolicy>;
  };

  type NewSecurityPolicy = {
    id : Nat;
    name : Text;
    enabled : Bool;
    description : Text;
    policyType : Text;
    digitalSignature : ?Text;
  };

  type NewActor = {
    policies : Map.Map<Nat, NewSecurityPolicy>;
  };

  public func run(old : OldActor) : NewActor {
    let newPolicies = old.policies.map<Nat, OldSecurityPolicy, NewSecurityPolicy>(
      func(_id, oldPolicy) {
        { oldPolicy with digitalSignature = null };
      }
    );
    { policies = newPolicies };
  };
};
