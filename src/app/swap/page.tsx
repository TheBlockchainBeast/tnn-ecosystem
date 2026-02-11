"use client";

import { useState, useCallback } from "react";
import { ArrowDownUp, Settings } from "lucide-react";
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import { TokenInput } from "@/components/ui/TokenInput";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Slider } from "@/components/ui/Slider";
import { TokenSelectModal } from "@/components/swap/TokenSelectModal";
import { ConfirmSwapModal } from "@/components/swap/ConfirmSwapModal";
import { PriceChart } from "@/components/swap/PriceChart";
import { useQuote } from "@/hooks/useQuote";
import { useSwapHistoryStore } from "@/stores/swapHistory";
import { executeStonfiSwap } from "@/services/swapExecution";
import { executeDedustSwap } from "@/services/dedustExecution";
import { TON } from "@/lib/tokens";
import { DEFAULT_TOKENS } from "@/lib/tokens";
import type { TokenInfo } from "@/types/swap";
import { cn } from "@/lib/utils";

function toWei(amount: string, decimals: number): string {
  if (!amount || amount === ".") return "0";
  const [int, frac = ""] = amount.split(".");
  const padded = frac.padEnd(decimals, "0").slice(0, decimals);
  return (int || "0") + padded;
}

function fromWei(wei: string, decimals: number): string {
  try {
    const n = BigInt(wei);
    const div = BigInt(10) ** BigInt(decimals);
    const int = n / div;
    const frac = n % div;
    const fracStr = frac.toString().padStart(decimals, "0").replace(/0+$/, "");
    return fracStr ? `${int}.${fracStr}` : String(int);
  } catch {
    return "0";
  }
}

export default function SwapPage() {
  const address = useTonAddress();
  const [tonConnectUI] = useTonConnectUI();
  const [fromToken, setFromToken] = useState<TokenInfo>(TON);
  const [toToken, setToToken] = useState<TokenInfo>(DEFAULT_TOKENS[1]!);
  const [fromAmount, setFromAmount] = useState("");
  const [tokenSelectFor, setTokenSelectFor] = useState<"from" | "to" | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [swapLoading, setSwapLoading] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [slippagePercent, setSlippagePercent] = useState(0.5);
  const [deadlineMinutes, setDeadlineMinutes] = useState(20);
  const addHistory = useSwapHistoryStore((s) => s.add);

  const amountWei = toWei(fromAmount, fromToken.decimals);
  const { data: quoteResult, isLoading: quoteLoading } = useQuote(
    fromToken.address,
    toToken.address,
    amountWei,
    slippagePercent,
    !!fromAmount && Number(fromAmount) > 0
  );

  const bestQuote = quoteResult?.best ?? null;
  const toAmount = bestQuote
    ? fromWei(bestQuote.amountOut, toToken.decimals)
    : "";

  const swapTokens = useCallback(() => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount("");
  }, [fromToken, toToken]);

  const handleConfirmSwap = async () => {
    if (!bestQuote || !address) return;
    setSwapLoading(true);
    try {
      if (bestQuote.provider === "stonfi" && bestQuote.stonfiSimulation) {
        await executeStonfiSwap({
          quote: bestQuote,
          userAddress: address,
          sendTransaction: (tx) => tonConnectUI.sendTransaction(tx),
        });
      } else if (bestQuote.provider === "dedust") {
        await executeDedustSwap(
          bestQuote,
          fromToken.address,
          toToken.address,
          amountWei,
          bestQuote.amountOut,
          address,
          tonConnectUI.connector
        );
      } else {
        throw new Error("Unsupported quote for execution");
      }
      addHistory({
        fromToken: fromToken.symbol,
        toToken: toToken.symbol,
        fromAmount,
        toAmount: fromWei(bestQuote.amountOut, toToken.decimals),
        provider: bestQuote.provider,
      });
      setConfirmOpen(false);
      setFromAmount("");
    } catch (err) {
      console.error("Swap failed:", err);
      throw err;
    } finally {
      setSwapLoading(false);
    }
  };

  const canSwap =
    address &&
    fromAmount &&
    Number(fromAmount) > 0 &&
    bestQuote &&
    BigInt(amountWei) > BigInt(0);

  return (
    <div className="mx-auto max-w-xl space-y-4 p-4">
      <h1 className="text-2xl font-bold">Swap</h1>

      <Card>
        <CardContent className="pt-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--color-muted)]">From</span>
              <span className="text-xs text-[var(--color-muted)]">
                Balance: —
              </span>
            </div>
            <TokenInput
              value={fromAmount}
              onValueChange={setFromAmount}
              symbol={fromToken.symbol}
              onMax={() => setFromAmount("")}
              placeholder="0.0"
              className="cursor-pointer"
            />
            <button
              type="button"
              onClick={() => setTokenSelectFor("from")}
              className="w-full rounded-lg border border-dashed border-[var(--color-border)] py-2 text-sm font-medium text-[var(--color-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
            >
              Select {fromToken.symbol}
            </button>
          </div>

          <div className="relative my-2 flex justify-center">
            <button
              type="button"
              onClick={swapTokens}
              className="rounded-full border-2 border-[var(--color-card)] bg-[var(--color-border)] p-2 hover:bg-[var(--color-muted)]"
              aria-label="Swap direction"
            >
              <ArrowDownUp className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--color-muted)]">To</span>
            </div>
            <TokenInput
              value={toAmount}
              onValueChange={() => {}}
              symbol={toToken.symbol}
              placeholder="0.0"
              className="bg-[var(--background)]"
            />
            <button
              type="button"
              onClick={() => setTokenSelectFor("to")}
              className="w-full rounded-lg border border-dashed border-[var(--color-border)] py-2 text-sm font-medium text-[var(--color-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
            >
              Select {toToken.symbol}
            </button>
          </div>

          {quoteResult && (
            <div className="mt-4 rounded-lg bg-[var(--background)] p-3 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--color-muted)]">Route</span>
                <span>{bestQuote?.routeLabel ?? bestQuote?.provider}</span>
              </div>
              {quoteResult.savePercent != null && quoteResult.savePercent > 0 && (
                <div className="mt-1 flex justify-between text-[var(--color-success)]">
                  <span>Save vs other DEX</span>
                  <span>{quoteResult.savePercent.toFixed(2)}%</span>
                </div>
              )}
            </div>
          )}

          <div className="mt-4">
            <button
              type="button"
              className="flex w-full items-center justify-between text-sm text-[var(--color-muted)]"
              onClick={() => setAdvancedOpen((o) => !o)}
            >
              <span className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Advanced
              </span>
              <span>{advancedOpen ? "Hide" : "Show"}</span>
            </button>
            {advancedOpen && (
              <div className="mt-3 space-y-3 rounded-lg border border-[var(--color-border)] p-3">
                <Slider
                  label="Slippage tolerance %"
                  value={slippagePercent}
                  onValueChange={setSlippagePercent}
                  min={0.1}
                  max={5}
                  step={0.1}
                />
                <Slider
                  label="Deadline (minutes)"
                  value={deadlineMinutes}
                  onValueChange={setDeadlineMinutes}
                  min={1}
                  max={60}
                  step={1}
                />
              </div>
            )}
          </div>

          <Button
            className="mt-6 w-full"
            size="lg"
            disabled={!!address && (!fromAmount || Number(fromAmount) <= 0 || quoteLoading || !bestQuote)}
            loading={quoteLoading}
            onClick={() => {
              if (!address) tonConnectUI.openModal();
              else if (canSwap) setConfirmOpen(true);
            }}
          >
            {!address
              ? "Connect Wallet"
              : !fromAmount || Number(fromAmount) <= 0
                ? "Enter amount"
                : quoteLoading
                  ? "Fetching quote…"
                  : "Review swap"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Price chart</CardTitle>
        </CardHeader>
        <CardContent>
          <PriceChart fromSymbol={fromToken.symbol} toSymbol={toToken.symbol} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent swaps</CardTitle>
        </CardHeader>
        <CardContent>
          <SwapHistoryList />
        </CardContent>
      </Card>

      <TokenSelectModal
        open={tokenSelectFor !== null}
        onClose={() => setTokenSelectFor(null)}
        onSelect={(t) => {
          if (tokenSelectFor === "from") {
            setFromToken(t);
            if (t.address === toToken.address) setToToken(fromToken);
          } else {
            setToToken(t);
            if (t.address === fromToken.address) setFromToken(toToken);
          }
        }}
        selectedAddress={tokenSelectFor === "from" ? fromToken.address : toToken.address}
        excludeAddress={tokenSelectFor === "from" ? toToken.address : fromToken.address}
      />

      <ConfirmSwapModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmSwap}
        fromToken={fromToken}
        toToken={toToken}
        fromAmount={fromAmount}
        quote={bestQuote}
        slippagePercent={slippagePercent}
        deadlineMinutes={deadlineMinutes}
        loading={swapLoading}
      />
    </div>
  );
}

function SwapHistoryList() {
  const items = useSwapHistoryStore((s) => s.items);
  if (items.length === 0) {
    return (
      <p className="text-sm text-[var(--color-muted)]">
        Your swap history will appear here
      </p>
    );
  }
  return (
    <ul className="space-y-2">
      {items.slice(0, 10).map((item) => (
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
    </ul>
  );
}
