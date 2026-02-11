"use client";

import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { useState, useEffect } from "react";

/**
 * Manifest URL for TonConnect.
 * - If NEXT_PUBLIC_TONCONNECT_MANIFEST_URL is set (e.g. for localhost): use it so wallets load the manifest from GitHub.
 * - Otherwise: same-origin (origin + basePath + /tonconnect-manifest.json) for production.
 */
function getManifestUrl(): string {
  if (typeof window === "undefined") return "";
  const explicit =
    typeof process !== "undefined" && process.env.NEXT_PUBLIC_TONCONNECT_MANIFEST_URL
      ? process.env.NEXT_PUBLIC_TONCONNECT_MANIFEST_URL.trim()
      : "";
  if (explicit) return explicit;
  const basePath =
    typeof process !== "undefined" && process.env.NEXT_PUBLIC_APP_BASE_PATH
      ? process.env.NEXT_PUBLIC_APP_BASE_PATH.replace(/\/$/, "").replace(/^\//, "")
      : "";
  const prefix = basePath ? `/${basePath}` : "";
  return `${window.location.origin}${prefix}/tonconnect-manifest.json`;
}

export function TONConnectProvider({ children }: { children: React.ReactNode }) {
  const [manifestUrl, setManifestUrl] = useState<string>("");

  useEffect(() => {
    setManifestUrl(getManifestUrl());
  }, []);

  if (!manifestUrl) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--background)]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-primary)] border-t-transparent" aria-hidden />
      </div>
    );
  }

  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      {children}
    </TonConnectUIProvider>
  );
}
