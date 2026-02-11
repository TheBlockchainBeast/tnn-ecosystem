"use client";

import { TonConnectUIProvider } from "@tonconnect/ui-react";

const GITHUB_REPO = "TheBlockchainBeast/tnn-ecosystem";
const GITHUB_BRANCH = "master";

export const TONCONNECT_MANIFEST_URL = `https://raw.githubusercontent.com/${GITHUB_REPO}/${GITHUB_BRANCH}/public/tonconnect-manifest.json`;

export function TONConnectProvider({ children }: { children: React.ReactNode }) {
  return (
    <TonConnectUIProvider manifestUrl={TONCONNECT_MANIFEST_URL}>
      {children}
    </TonConnectUIProvider>
  );
}
