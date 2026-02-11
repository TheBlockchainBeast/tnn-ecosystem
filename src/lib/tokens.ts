import type { TokenInfo } from "@/types/swap";

export const TON: TokenInfo = {
  address: "EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c",
  symbol: "TON",
  name: "Toncoin",
  decimals: 9,
};

export const USDT: TokenInfo = {
  address: "EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs",
  symbol: "USDT",
  name: "Tether USD",
  decimals: 6,
};

export const DEFAULT_TOKENS: TokenInfo[] = [
  TON,
  USDT,
  {
    address: "EQD0vdQ_NuRqV8Zg_9Khzd8rE2bJQpNqaV1W3SHK8zTvkfhr",
    symbol: "USDC",
    name: "USD Coin",
    decimals: 6,
  },
  {
    address: "EQB-MPwrd1G6WKN5L0zWP7e3Ue2bJQpNqaV1W3SHK8zTvkfhr",
    symbol: "NOT",
    name: "Notcoin",
    decimals: 9,
  },
];

const tokenByAddress = new Map(DEFAULT_TOKENS.map((t) => [t.address, t]));

export function getTokenByAddress(address: string): TokenInfo | undefined {
  return tokenByAddress.get(address);
}

export function getTokenBySymbol(symbol: string): TokenInfo | undefined {
  return DEFAULT_TOKENS.find((t) => t.symbol.toUpperCase() === symbol.toUpperCase());
}
