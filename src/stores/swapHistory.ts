import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SwapHistoryItem } from "@/types/swap";

interface SwapHistoryState {
  items: SwapHistoryItem[];
  add: (item: Omit<SwapHistoryItem, "id" | "timestamp">) => void;
  clear: () => void;
}

export const useSwapHistoryStore = create<SwapHistoryState>()(
  persist(
    (set) => ({
      items: [],
      add: (item) =>
        set((s) => ({
          items: [
            {
              ...item,
              id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
              timestamp: Date.now(),
            },
            ...s.items,
          ].slice(0, 100),
        })),
      clear: () => set({ items: [] }),
    }),
    { name: "tnn-swap-history" }
  )
);
