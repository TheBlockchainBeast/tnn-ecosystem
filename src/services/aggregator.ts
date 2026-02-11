import type { SwapQuote, SwapQuoteResult } from "@/types/swap";
import { getStonfiQuote } from "./stonfi";
import { getDedustQuote } from "./dedust";

export async function getBestQuote(
  fromTokenAddress: string,
  toTokenAddress: string,
  amountWei: string,
  slippagePercent = 0.5
): Promise<SwapQuoteResult | null> {
  const [stonfiQuote, dedustQuote] = await Promise.all([
    getStonfiQuote(fromTokenAddress, toTokenAddress, amountWei, slippagePercent),
    getDedustQuote(fromTokenAddress, toTokenAddress, amountWei, slippagePercent),
  ]);

  const quotes: SwapQuote[] = [stonfiQuote, dedustQuote].filter(
    (q): q is SwapQuote => q != null
  );

  if (quotes.length === 0) return null;

  const sorted = [...quotes].sort(
    (a, b) => Number(BigInt(b.amountOut) - BigInt(a.amountOut))
  );
  const best = sorted[0];
  const second = sorted[1];
  let savePercent: number | undefined;
  if (second && BigInt(second.amountOut) > BigInt(0)) {
    const diff = BigInt(best.amountOut) - BigInt(second.amountOut);
    savePercent = Number((diff * BigInt(10000)) / BigInt(second.amountOut)) / 100;
  }

  return { best, all: quotes, savePercent };
}
