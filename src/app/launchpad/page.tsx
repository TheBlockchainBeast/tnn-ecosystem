import { PhasePlaceholder } from "../placeholders/PhasePlaceholder";

export default function LaunchpadPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center p-4">
      <PhasePlaceholder
        phase={3}
        title="Launchpad"
        description="Discover and participate in IDOs. Community voting and tier-based allocation. Coming in Phase 3."
      />
    </div>
  );
}
