"use client";

import { useSwapHistoryStore } from "@/stores/swapHistory";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function PortfolioPage() {
  const items = useSwapHistoryStore((s) => s.items);

  const exportCsv = () => {
    const headers = "Date,From Token,From Amount,To Token,To Amount,Provider\n";
    const rows = items
      .map(
        (i) =>
          `${new Date(i.timestamp).toISOString()},${i.fromToken},${i.fromAmount},${i.toToken},${i.toAmount},${i.provider}`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `swap-history-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-4">
      <h1 className="text-2xl font-bold">Portfolio</h1>
      <Card>
        <CardHeader>
          <CardTitle>All assets</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-[var(--color-muted)]">
            Connect a wallet to see your tokens. Balances will appear here when
            we read from the chain (Phase 1 shows swap history below).
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Transaction history</CardTitle>
          {items.length > 0 && (
            <Button variant="tertiary" size="sm" onClick={exportCsv}>
              Export CSV
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {items.length === 0 ? (
            <p className="text-sm text-[var(--color-muted)]">
              Your swaps will appear here after you trade on the Swap page.
            </p>
          ) : (
            <ul className="space-y-2">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm"
                >
                  <span>
                    {item.fromAmount} {item.fromToken} → {item.toAmount}{" "}
                    {item.toToken}
                  </span>
                  <span className="text-[var(--color-muted)]">
                    {item.provider} ·{" "}
                    {new Date(item.timestamp).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
