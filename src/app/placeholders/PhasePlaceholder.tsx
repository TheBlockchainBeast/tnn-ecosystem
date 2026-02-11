import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function PhasePlaceholder({
  phase,
  title,
  description,
}: {
  phase: number;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center justify-center gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-8 text-center">
      <span className="rounded-full bg-[var(--color-primary)]/20 px-3 py-1 text-sm font-medium text-[var(--color-primary)]">
        Phase {phase}
      </span>
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-[var(--color-muted)]">{description}</p>
      <div className="flex gap-3">
        <Link href="/">
          <Button variant="tertiary">Back to Dashboard</Button>
        </Link>
        <Link href="/swap">
          <Button>Go to Swap</Button>
        </Link>
      </div>
    </div>
  );
}
