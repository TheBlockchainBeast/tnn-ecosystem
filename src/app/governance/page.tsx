import { PhasePlaceholder } from "../placeholders/PhasePlaceholder";

export default function GovernancePage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center p-4">
      <PhasePlaceholder
        phase={4}
        title="Governance"
        description="Vote on proposals, delegate power, and shape the Nobody Network. Coming in Phase 4."
      />
    </div>
  );
}
