"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Wallet,
  MoreHorizontal,
  Droplets,
  Lock,
  Rocket,
  Network,
  Vote,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "./NavConfig";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  ArrowLeftRight,
  Droplets,
  Lock,
  Rocket,
  Bridge: Network,
  Vote,
  Wallet,
};

export function BottomNav() {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);

  const mainItems = [
    { href: "/", label: "Home", icon: LayoutDashboard },
    { href: "/swap", label: "Swap", icon: ArrowLeftRight },
    { href: "/portfolio", label: "Portfolio", icon: Wallet },
  ];

  const restItems = NAV_ITEMS.filter(
    (n) => !mainItems.some((m) => m.href === n.href)
  );

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-40 flex h-16 items-center justify-around border-t border-[var(--color-border)] bg-[var(--color-card)] safe-area-pb sm:hidden">
        {mainItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 py-2 text-xs font-medium",
                isActive ? "text-[var(--color-primary)]" : "text-[var(--color-muted)]"
              )}
            >
              <item.icon className="h-6 w-6" />
              {item.label}
            </Link>
          );
        })}
        <div className="relative">
          <button
            type="button"
            onClick={() => setMoreOpen((o) => !o)}
            className={cn(
              "flex flex-col items-center gap-0.5 py-2 text-xs font-medium",
              moreOpen ? "text-[var(--color-primary)]" : "text-[var(--color-muted)]"
            )}
          >
            <MoreHorizontal className="h-6 w-6" />
            More
          </button>
          {moreOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                aria-hidden
                onClick={() => setMoreOpen(false)}
              />
              <div className="absolute bottom-full left-1/2 z-50 mb-2 w-48 -translate-x-1/2 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] py-2 shadow-lg">
                {restItems.map((item) => {
                  const Icon = ICON_MAP[item.icon];
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMoreOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-[var(--color-border)]"
                    >
                      {Icon && <Icon className="h-4 w-4" />}
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </nav>
    </>
  );
}
