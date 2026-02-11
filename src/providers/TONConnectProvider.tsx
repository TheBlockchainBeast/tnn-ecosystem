"use client";

import { TonConnectUIProvider } from "@tonconnect/ui-react";

// Public URL so wallets (e.g. on mobile) can fetch the manifest. Use raw GitHub so it works in dev and prod.
const MANIFEST_URL =
  "https://raw.githubusercontent.com/TheBlockchainBeast/tnn-ecosystem/master/public/tonconnect-manifest.json";

export function TONConnectProvider({ children }: { children: React.ReactNode }) {
  return (
    <TonConnectUIProvider manifestUrl={MANIFEST_URL}>
      {children}
    </TonConnectUIProvider>
  );
}
