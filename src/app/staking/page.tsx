import { PhasePlaceholder } from "../placeholders/PhasePlaceholder";

export default function StakingPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center p-4">
      <PhasePlaceholder
        phase={2}
        title="Staking"
        description="Stake Nobody Network tokens. Flexible and locked tiers with rewards. Coming in Phase 2."
      />
    </div>
  );
}
