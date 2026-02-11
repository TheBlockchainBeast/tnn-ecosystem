"use client";

import Link from "next/link";
import { useSwapHistoryStore } from "@/stores/swapHistory";

export function RecentActivity() {
  const items = useSwapHistoryStore((s) => s.items);

  if (items.length === 0) {
    return (
      <p className="text-sm text-[var(--color-muted)]">
        Your latest swaps will appear here.{" "}
        <Link href="/swap" className="text-[var(--color-primary)] hover:underline">
          Make your first swap
        </Link>
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {items.slice(0, 5).map((item) => (
        <li
          key={item.id}
          className="flex justify-between rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm"
        >
          <span>
            {item.fromAmount} {item.fromToken} → {item.toAmount} {item.toToken}
          </span>
          <span className="text-[var(--color-muted)]">{item.provider}</span>
        </li>
      ))}
      <li>
        <Link href="/portfolio" className="text-sm text-[var(--color-primary)] hover:underline">
          View all
        </Link>
      </li>
    </ul>
  );
}
