"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeftRight, Droplets, Lock } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function DashboardHero() {
  const [nobodyId, setNobodyId] = useState("—");

  useEffect(() => {
    const key = "tnn-nobody-id";
    let id = localStorage.getItem(key);
    if (!id) {
      id = String(Math.floor(Math.random() * 99999) + 1);
      try {
        localStorage.setItem(key, id);
      } catch {}
    }
    setNobodyId(id);
  }, []);

  return (
    <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
      <h1 className="text-2xl font-bold">Welcome back, Nobody #{nobodyId}</h1>
      <p className="mt-1 text-[var(--color-muted)]">
        Your DeFi hub on the TON blockchain
      </p>
      <div className="mt-4 flex flex-wrap gap-4">
        <div>
          <p className="text-sm text-[var(--color-muted)]">Portfolio value</p>
          <p className="text-2xl font-semibold">$0.00</p>
          <p className="text-sm text-[var(--color-success)]">+0% (24h)</p>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/swap">
          <Button leftIcon={<ArrowLeftRight className="h-4 w-4" />}>
            Swap
          </Button>
        </Link>
        <Link href="/liquidity">
          <Button variant="secondary" leftIcon={<Droplets className="h-4 w-4" />}>
            Add Liquidity
          </Button>
        </Link>
        <Link href="/staking">
          <Button variant="tertiary" leftIcon={<Lock className="h-4 w-4" />}>
            Stake
          </Button>
        </Link>
      </div>
    </section>
  );
}
