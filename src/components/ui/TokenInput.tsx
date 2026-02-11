"use client";

import { Input } from "./Input";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

export interface TokenInputProps {
  value: string;
  onValueChange: (v: string) => void;
  balance?: string;
  symbol?: string;
  logo?: string;
  onMax?: () => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  className?: string;
}

export function TokenInput({
  value,
  onValueChange,
  balance,
  symbol,
  logo,
  onMax,
  placeholder = "0.0",
  disabled,
  error,
  className,
}: TokenInputProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-3",
        className
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <input
          type="text"
          inputMode="decimal"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onValueChange(e.target.value.replace(/[^0-9.]/g, ""))}
          disabled={disabled}
          className="min-w-0 flex-1 bg-transparent text-lg font-medium outline-none placeholder:text-[var(--color-muted)] disabled:opacity-50"
        />
        <div className="flex items-center gap-2">
          {onMax && (
            <Button
              type="button"
              variant="tertiary"
              size="sm"
              onClick={onMax}
              className="text-xs"
            >
              Max
            </Button>
          )}
          {symbol && (
            <span className="flex items-center gap-1.5 font-medium">
              {logo && (
                <img src={logo} alt="" className="h-6 w-6 rounded-full" />
              )}
              {symbol}
            </span>
          )}
        </div>
      </div>
      {balance != null && (
        <p className="mt-1 text-xs text-[var(--color-muted)]">
          Balance: {balance}
        </p>
      )}
    </div>
  );
}
