"use client";

import { useTonConnectUI, useTonAddress } from "@tonconnect/ui-react";
import { Bell, Settings, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/providers/ThemeProvider";
import { Button } from "@/components/ui/Button";
import { cn, truncateAddress } from "@/lib/utils";

const EXPLORER = "https://tonscan.org/address/";

export function TopBar() {
  const [tonConnectUI] = useTonConnectUI();
  const address = useTonAddress();
  const { theme, setTheme, resolved } = useTheme();

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-card)] px-4">
      <div className="flex-1" />
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
          TON Mainnet
        </span>
        <button
          type="button"
          onClick={() =>
            setTheme(theme === "dark" ? "light" : theme === "light" ? "system" : "dark")
          }
          className="rounded-lg p-2 hover:bg-[var(--color-border)]"
          aria-label="Toggle theme"
        >
          {resolved === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </button>
        <Link
          href="/notifications"
          className="rounded-lg p-2 hover:bg-[var(--color-border)]"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
        </Link>
        <Link
          href="/settings"
          className="rounded-lg p-2 hover:bg-[var(--color-border)]"
          aria-label="Settings"
        >
          <Settings className="h-5 w-5" />
        </Link>
        {address ? (
          <a
            href={`${EXPLORER}${address}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-[var(--color-muted)] hover:text-[var(--color-foreground)]"
          >
            {truncateAddress(address)}
          </a>
        ) : null}
        <Button
          variant={address ? "tertiary" : "primary"}
          size="sm"
          onClick={() => tonConnectUI.openModal()}
        >
          {address ? "Wallet" : "Connect Wallet"}
        </Button>
      </div>
    </header>
  );
}
