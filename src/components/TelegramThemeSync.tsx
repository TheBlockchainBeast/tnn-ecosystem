"use client";

import { useEffect } from "react";
import { useTheme } from "@/providers/ThemeProvider";
import { useTelegramTheme } from "@/lib/telegram";

export function TelegramThemeSync() {
  const { setTheme } = useTheme();

  useEffect(() => {
    useTelegramTheme((scheme) => {
      setTheme(scheme);
    });
  }, [setTheme]);

  return null;
}
