"use client";

import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { BottomNav } from "./BottomNav";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Sidebar />
      <div className="lg:pl-56">
        <TopBar />
        <main className="min-h-[calc(100vh-3.5rem)] pb-20 sm:pb-8">{children}</main>
        <BottomNav />
      </div>
    </div>
  );
}
