"use client";

import { useEffect, useRef } from "react";

export function PriceChart({
  fromSymbol,
  toSymbol,
  className,
}: {
  fromSymbol: string;
  toSymbol: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;
    import("lightweight-charts").then((mod) => {
      const { createChart, AreaSeries } = mod;
      const chart = createChart(containerRef.current!, {
        layout: {
          background: { color: "transparent" },
          textColor: "var(--color-muted)",
        },
        grid: {
          vertLines: { color: "var(--color-border)" },
          horzLines: { color: "var(--color-border)" },
        },
        width: containerRef.current!.clientWidth,
        height: 200,
        timeScale: { visible: true, borderColor: "var(--color-border)" },
        rightPriceScale: { borderColor: "var(--color-border)" },
      });
      const area = chart.addSeries(AreaSeries, {
        lineColor: "var(--color-primary)",
        topColor: "var(--color-primary)",
        bottomColor: "transparent",
        lineWidth: 2,
      });
      const now = Math.floor(Date.now() / 1000);
      const data = Array.from({ length: 50 }, (_, i) => {
        const time = (now - (50 - i) * 3600) as import("lightweight-charts").UTCTimestamp;
        const base = 5 + Math.sin(i * 0.2) * 2;
        return { time, value: base + Math.random() * 0.5 };
      });
      area.setData(data);
      chart.timeScale().fitContent();
      return () => chart.remove();
    });
  }, [fromSymbol, toSymbol]);

  return (
    <div className={className}>
      <p className="mb-2 text-sm text-[var(--color-muted)]">
        {fromSymbol} / {toSymbol}
      </p>
      <div ref={containerRef} className="h-[200px] w-full" />
    </div>
  );
}
