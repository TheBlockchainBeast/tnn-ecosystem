import type { SwapQuote } from "@/types/swap";

const DEDUST_QUOTE_URL = "https://api.dedust.io/v2/quote";

export async function getDedustQuote(
  fromTokenAddress: string,
  toTokenAddress: string,
  amountWei: string,
  _slippagePercent = 0.5
): Promise<SwapQuote | null> {
  try {
    const res = await fetch(DEDUST_QUOTE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        asset_in: fromTokenAddress,
        asset_out: toTokenAddress,
        amount_in: amountWei,
      }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    const amountOut = data?.amount_out ?? data?.min_amount_out ?? "0";
    return {
      provider: "dedust",
      amountIn: amountWei,
      amountOut: String(amountOut),
      routeLabel: "DeDust",
      route: [fromTokenAddress, toTokenAddress],
    };
  } catch {
    return null;
  }
}
