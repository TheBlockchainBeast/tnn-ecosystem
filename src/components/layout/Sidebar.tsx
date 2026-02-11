"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Droplets,
  Lock,
  Rocket,
  Network,
  Vote,
  Wallet,
  ChevronLeft,
  Menu,
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

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="fixed left-4 top-4 z-50 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-2 lg:hidden"
        onClick={() => setMobileOpen((o) => !o)}
        aria-label="Toggle menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <aside
        className={cn(
          "fixed left-0 top-0 z-40 flex h-full flex-col border-r border-[var(--color-border)] bg-[var(--color-card)] transition-[width] duration-200",
          collapsed ? "w-[72px]" : "w-56",
          "max-lg:translate-x-0 max-lg:pt-14",
          !mobileOpen && "max-lg:-translate-x-full"
        )}
      >
        <div className="flex h-14 items-center justify-between border-b border-[var(--color-border)] px-3">
          {!collapsed && (
            <Link href="/" className="font-semibold">
              Nobody Network
            </Link>
          )}
          <button
            type="button"
            onClick={() => setCollapsed((c) => !c)}
            className="hidden rounded p-1 hover:bg-[var(--color-border)] lg:block"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronLeft
              className={cn("h-5 w-5 transition-transform", collapsed && "rotate-180")}
            />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto p-2">
          {NAV_ITEMS.map((item) => {
            const Icon = ICON_MAP[item.icon];
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "mb-1 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-[var(--color-primary)] text-white"
                    : "text-[var(--color-foreground)] hover:bg-[var(--color-border)]"
                )}
              >
                {Icon && <Icon className="h-5 w-5 shrink-0" />}
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          aria-hidden
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}
