"use client";

import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import type { TokenInfo } from "@/types/swap";
import type { SwapQuote } from "@/types/swap";

export function ConfirmSwapModal({
  open,
  onClose,
  onConfirm,
  fromToken,
  toToken,
  fromAmount,
  quote,
  slippagePercent,
  deadlineMinutes,
  loading,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  fromToken: TokenInfo;
  toToken: TokenInfo;
  fromAmount: string;
  quote: SwapQuote | null;
  slippagePercent: number;
  deadlineMinutes: number;
  loading: boolean;
}) {
  if (!quote) return null;

  const fromAmountFormatted = formatAmount(fromAmount, fromToken.decimals);
  const toAmountFormatted = formatAmount(quote.amountOut, toToken.decimals);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Confirm swap"
      description="Review the details before confirming."
    >
      <div className="space-y-4">
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--background)] p-4">
          <div className="flex items-center justify-between">
            <span className="text-[var(--color-muted)]">You pay</span>
            <span className="font-mono font-medium">
              {fromAmountFormatted} {fromToken.symbol}
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-[var(--color-muted)]">You receive</span>
            <span className="font-mono font-medium">
              {toAmountFormatted} {toToken.symbol}
            </span>
          </div>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-[var(--color-muted)]">Route</span>
            <span>{quote.routeLabel ?? quote.provider}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--color-muted)]">Slippage</span>
            <span>{slippagePercent}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--color-muted)]">Deadline</span>
            <span>{deadlineMinutes} min</span>
          </div>
        </div>
        <div className="flex gap-2 pt-2">
          <Button variant="tertiary" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="flex-1"
            onClick={onConfirm}
            loading={loading}
            disabled={loading}
          >
            Confirm swap
          </Button>
        </div>
      </div>
    </Modal>
  );
}

function formatAmount(raw: string, decimals: number): string {
  try {
    const n = BigInt(raw);
    const div = BigInt(10) ** BigInt(decimals);
    const int = n / div;
    const frac = n % div;
    const fracStr = frac.toString().padStart(decimals, "0").slice(0, 6);
    return fracStr ? `${int}.${fracStr}` : String(int);
  } catch {
    return "0";
  }
}
