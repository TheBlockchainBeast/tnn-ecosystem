"use client";

import { Client, dexFactory } from "@ston-fi/sdk";
import { Address } from "@ton/core";
import type { SwapQuote, StonfiSimulation } from "@/types/swap";

const TON_ADDRESS = "EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c";

export interface ExecuteSwapParams {
  quote: SwapQuote;
  userAddress: string;
  sendTransaction: (tx: {
    validUntil: number;
    messages: Array<{
      address: string;
      amount: string;
      payload?: string;
    }>;
  }) => Promise<unknown>;
}

/**
 * Build and send STON.fi swap transaction via TonConnect.
 * See: https://docs.ston.fi/developer-section/quickstart/swap
 */
export async function executeStonfiSwap(params: ExecuteSwapParams): Promise<void> {
  const { quote, userAddress, sendTransaction } = params;
  const sim = quote.stonfiSimulation;
  if (!sim || quote.provider !== "stonfi") {
    throw new Error("Missing STON.fi simulation");
  }

  const client = new Client({
    endpoint: "https://toncenter.com/api/v2/jsonRPC",
  });

  const dexContracts = dexFactory(sim.router);
  const routerContract = dexContracts.Router.create(Address.parse(sim.router.address));
  const provider = client.provider(routerContract.address);

  const shared = {
    userWalletAddress: Address.parse(userAddress),
    offerAmount: BigInt(sim.offerUnits),
    minAskAmount: BigInt(sim.minAskUnits),
  };

  const proxyTon = dexContracts.pTON.create(Address.parse(sim.router.ptonMasterAddress));

  type TxParams = { to: Address; value: bigint; body?: import("@ton/core").Cell | null };
  let txParams: TxParams;

  if (sim.offerAddress === TON_ADDRESS) {
    txParams = await routerContract.getSwapTonToJettonTxParams(provider, {
      ...shared,
      proxyTon,
      askJettonAddress: Address.parse(sim.askAddress),
    });
  } else if (sim.askAddress === TON_ADDRESS) {
    txParams = await routerContract.getSwapJettonToTonTxParams(provider, {
      ...shared,
      proxyTon,
      offerJettonAddress: Address.parse(sim.offerAddress),
    });
  } else {
    txParams = await routerContract.getSwapJettonToJettonTxParams(provider, {
      ...shared,
      offerJettonAddress: Address.parse(sim.offerAddress),
      askJettonAddress: Address.parse(sim.askAddress),
    });
  }

  await sendTransaction({
    validUntil: Math.floor(Date.now() / 1000) + 300,
    messages: [
      {
        address: txParams.to.toString(),
        amount: txParams.value.toString(),
        payload: txParams.body != null ? txParams.body.toBoc().toString("base64") : undefined,
      },
    ],
  });
}
