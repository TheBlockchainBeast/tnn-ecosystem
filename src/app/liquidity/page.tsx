import { PhasePlaceholder } from "../placeholders/PhasePlaceholder";

export default function LiquidityPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center p-4">
      <PhasePlaceholder
        phase={2}
        title="Liquidity"
        description="Add liquidity to DeDust and STON.fi pools. Manage LP positions and earn fees. Coming in Phase 2."
      />
    </div>
  );
}
