"use client";

import { useQuery } from "@tanstack/react-query";
import { getBestQuote } from "@/services/aggregator";

export function useQuote(
  fromAddress: string | null,
  toAddress: string | null,
  amountWei: string,
  slippagePercent: number,
  enabled: boolean
) {
  return useQuery({
    queryKey: ["quote", fromAddress, toAddress, amountWei, slippagePercent],
    queryFn: () =>
      getBestQuote(
        fromAddress!,
        toAddress!,
        amountWei,
        slippagePercent
      ),
    enabled:
      enabled &&
      !!fromAddress &&
      !!toAddress &&
      fromAddress !== toAddress &&
      amountWei !== "" &&
      BigInt(amountWei || "0") > BigInt(0),
    staleTime: 15_000,
  });
}
