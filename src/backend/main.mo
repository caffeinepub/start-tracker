import Nat "mo:core/Nat";

actor {
  var startCount = 0;
  var noStartCount = 0;

  public shared ({ caller }) func clickStart() : async Nat {
    startCount += 1;
    startCount;
  };

  public shared ({ caller }) func clickNoStart() : async Nat {
    noStartCount += 1;
    noStartCount;
  };

  public shared ({ caller }) func resetCounts() : async () {
    startCount := 0;
    noStartCount := 0;
  };

  public query ({ caller }) func getCounts() : async (Nat, Nat) {
    (startCount, noStartCount);
  };
};
