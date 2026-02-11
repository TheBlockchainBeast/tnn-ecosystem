import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { QueryProvider } from "@/providers/QueryProvider";
import { TONConnectProvider } from "@/providers/TONConnectProvider";
import { AppShell } from "@/components/layout/AppShell";
import { TelegramThemeSync } from "@/components/TelegramThemeSync";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Nobody Network | DeFi on TON",
  description:
    "Where Nobodies Become Somebodies. Swap, stake, and grow in the TON ecosystem.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <QueryProvider>
            <TONConnectProvider>
              <TelegramThemeSync />
              <AppShell>{children}</AppShell>
            </TONConnectProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
