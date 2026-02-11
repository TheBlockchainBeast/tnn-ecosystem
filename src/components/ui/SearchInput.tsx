"use client";

import { Search } from "lucide-react";
import { Input } from "./Input";
import { cn } from "@/lib/utils";

export function SearchInput(
  props: React.InputHTMLAttributes<HTMLInputElement> & { className?: string }
) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-muted)]" />
      <Input className={cn("pl-9", props.className)} {...props} />
    </div>
  );
}
