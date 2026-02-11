"use client";

import {
  Factory,
  MAINNET_FACTORY_ADDR,
  Asset,
  PoolType,
  VaultNative,
  VaultJetton,
  wrapTonConnect,
} from "@dedust/sdk";
import { Address, toNano } from "@ton/core";
import { TonClient } from "@ton/ton";
import type { ITonConnect } from "@tonconnect/sdk";
import type { SwapQuote } from "@/types/swap";

const TON_ADDRESS = "EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c";

/**
 * Execute DeDust swap via SDK and TonConnect.
 * Supports TON <-> Jetton. Jetton <-> Jetton would need multi-hop (next step).
 * See: https://docs.dedust.io/docs/swaps
 */
export async function executeDedustSwap(
  quote: SwapQuote,
  fromTokenAddress: string,
  toTokenAddress: string,
  amountWei: string,
  minAmountOut: string,
  userAddress: string,
  tonConnect: ITonConnect
): Promise<void> {
  if (quote.provider !== "dedust") {
    throw new Error("Not a DeDust quote");
  }

  const client = new TonClient({
    endpoint: "https://toncenter.com/api/v2/jsonRPC",
  });

  const factory = Factory.createFromAddress(MAINNET_FACTORY_ADDR);
  const factoryProvider = client.provider(factory.address);

  const fromIsTon = fromTokenAddress === TON_ADDRESS;
  const toIsTon = toTokenAddress === TON_ADDRESS;

  const assetIn = fromIsTon ? Asset.native() : Asset.jetton(Address.parse(fromTokenAddress));
  const assetOut = toIsTon ? Asset.native() : Asset.jetton(Address.parse(toTokenAddress));

  const pool = await factory.getPool(factoryProvider, PoolType.VOLATILE, [assetIn, assetOut]);
  const poolAddress = pool.address;

  const sender = wrapTonConnect(tonConnect, 300);

  if (fromIsTon) {
    const tonVault = await factory.getNativeVault(factoryProvider);
    const vaultProvider = client.provider(tonVault.address);
    await tonVault.sendSwap(vaultProvider, sender, {
      poolAddress,
      amount: BigInt(amountWei),
      limit: BigInt(minAmountOut),
      gasAmount: toNano("0.25"),
    });
  } else {
    const jettonVault = await factory.getJettonVault(factoryProvider, Address.parse(fromTokenAddress));
    const { JettonRoot, JettonWallet } = await import("@dedust/sdk");
    const root = JettonRoot.createFromAddress(Address.parse(fromTokenAddress));
    const rootProvider = client.provider(root.address);
    const walletAddr = await root.getWalletAddress(rootProvider, Address.parse(userAddress));
    const wallet = JettonWallet.createFromAddress(walletAddr);
    const walletProvider = client.provider(wallet.address);
    await wallet.sendTransfer(walletProvider, sender, toNano("0.3"), {
      amount: BigInt(amountWei),
      destination: jettonVault.address,
      responseAddress: Address.parse(userAddress),
      forwardAmount: toNano("0.25"),
      forwardPayload: VaultJetton.createSwapPayload({
        poolAddress,
        limit: BigInt(minAmountOut),
      }),
    });
  }
}
