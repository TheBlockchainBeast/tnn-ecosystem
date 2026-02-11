export interface TokenInfo {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  logoURI?: string;
}

/** STON.fi simulation result - needed to build tx */
export interface StonfiSimulation {
  router: {
    address: string;
    majorVersion: number;
    minorVersion: number;
    ptonMasterAddress: string;
    ptonVersion: string;
    ptonWalletAddress: string;
    routerType: string;
    poolCreationEnabled: boolean;
  };
  offerAddress: string;
  askAddress: string;
  offerUnits: string;
  minAskUnits: string;
  askUnits: string;
}

export interface SwapQuote {
  provider: "stonfi" | "dedust";
  amountIn: string;
  amountOut: string;
  priceImpact?: string;
  fee?: string;
  route?: string[];
  routeLabel?: string;
  /** STON.fi only: full simulation for building tx */
  stonfiSimulation?: StonfiSimulation;
}

export interface SwapQuoteResult {
  best: SwapQuote;
  all: SwapQuote[];
  savePercent?: number;
}

export interface SwapHistoryItem {
  id: string;
  fromToken: string;
  toToken: string;
  fromAmount: string;
  toAmount: string;
  provider: string;
  txHash?: string;
  timestamp: number;
}
