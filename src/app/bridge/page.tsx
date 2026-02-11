import { PhasePlaceholder } from "../placeholders/PhasePlaceholder";

export default function BridgePage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center p-4">
      <PhasePlaceholder
        phase={3}
        title="Bridge"
        description="Cross-chain bridge: TON ↔ Ethereum, BSC, and other EVM chains. Coming in Phase 3."
      />
    </div>
  );
}
