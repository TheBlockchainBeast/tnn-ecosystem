"use client";

import { Modal } from "@/components/ui/Modal";
import { SearchInput } from "@/components/ui/SearchInput";
import { useState } from "react";
import type { TokenInfo } from "@/types/swap";
import { DEFAULT_TOKENS } from "@/lib/tokens";
import { cn } from "@/lib/utils";

export function TokenSelectModal({
  open,
  onClose,
  onSelect,
  selectedAddress,
  excludeAddress,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (token: TokenInfo) => void;
  selectedAddress?: string;
  excludeAddress?: string;
}) {
  const [search, setSearch] = useState("");

  const filtered = DEFAULT_TOKENS.filter((t) => {
    if (excludeAddress && t.address === excludeAddress) return false;
    const s = search.toLowerCase();
    return (
      t.symbol.toLowerCase().includes(s) || t.name.toLowerCase().includes(s)
    );
  });

  return (
    <Modal open={open} onClose={onClose} title="Select token">
      <SearchInput
        placeholder="Search name or symbol"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4"
      />
      <div className="max-h-80 overflow-y-auto">
        {filtered.map((token) => (
          <button
            key={token.address}
            type="button"
            onClick={() => {
              onSelect(token);
              onClose();
            }}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-[var(--color-border)]",
              selectedAddress === token.address && "bg-[var(--color-primary)]/10"
            )}
          >
            {token.logoURI ? (
              <img
                src={token.logoURI}
                alt=""
                className="h-8 w-8 rounded-full"
              />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-border)] text-sm font-medium">
                {token.symbol.slice(0, 1)}
              </div>
            )}
            <div>
              <p className="font-medium">{token.symbol}</p>
              <p className="text-xs text-[var(--color-muted)]">{token.name}</p>
            </div>
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="py-4 text-center text-sm text-[var(--color-muted)]">
            No tokens found
          </p>
        )}
      </div>
    </Modal>
  );
}
