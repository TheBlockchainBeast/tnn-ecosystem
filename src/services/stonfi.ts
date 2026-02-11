import { StonApiClient } from "@ston-fi/api";
import type { SwapQuote, StonfiSimulation } from "@/types/swap";

const stonApi = new StonApiClient();

export async function getStonfiQuote(
  fromTokenAddress: string,
  toTokenAddress: string,
  amountWei: string,
  slippagePercent = 0.5
): Promise<SwapQuote | null> {
  try {
    const slippageFraction = (slippagePercent / 100).toFixed(4);
    const result = await stonApi.simulateSwap({
      offerAddress: fromTokenAddress,
      askAddress: toTokenAddress,
      offerUnits: amountWei,
      slippageTolerance: slippageFraction,
    });
    const amountOut = result?.minAskUnits ?? result?.askUnits ?? "0";
    const stonfiSimulation: StonfiSimulation = {
      router: result.router,
      offerAddress: result.offerAddress,
      askAddress: result.askAddress,
      offerUnits: result.offerUnits,
      minAskUnits: result.minAskUnits,
      askUnits: result.askUnits,
    };
    return {
      provider: "stonfi",
      amountIn: amountWei,
      amountOut: String(amountOut),
      routeLabel: "STON.fi",
      route: [fromTokenAddress, toTokenAddress],
      stonfiSimulation,
    };
  } catch {
    return null;
  }
}
