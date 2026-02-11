import Link from "next/link";
import { ArrowLeftRight, Droplets, Lock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { DashboardHero } from "@/components/dashboard/DashboardHero";

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4">
      <DashboardHero />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Portfolio breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[var(--color-muted)]">
              Connect a wallet to see your assets
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Active positions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[var(--color-muted)]">
              LP and staking positions will appear here (Phase 2)
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent activity</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentActivity />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Market overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[var(--color-muted)]">
              Top TON tokens by volume
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Gas tracker</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[var(--color-muted)]">TON network fees</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Nobody Network stats</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[var(--color-muted)]">
              TVL, users, 24h volume
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
