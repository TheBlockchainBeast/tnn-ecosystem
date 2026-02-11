declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        ready: () => void;
        expand: () => void;
        close: () => void;
        themeParams: { bg_color?: string; text_color?: string };
        colorScheme: "light" | "dark";
        setHeaderColor: (color: string) => void;
        hapticFeedback?: { impactOccurred: (style: "light" | "medium" | "heavy") => void };
      };
    };
  }
}

export function isTelegramWebApp(): boolean {
  return typeof window !== "undefined" && !!window.Telegram?.WebApp;
}

export function useTelegramTheme(syncTheme: (theme: "light" | "dark") => void): void {
  if (typeof window === "undefined") return;
  const twa = window.Telegram?.WebApp;
  if (!twa) return;
  twa.ready();
  twa.expand();
  const scheme = twa.colorScheme ?? "dark";
  syncTheme(scheme);
}

export function telegramHaptic(type: "light" | "medium" | "heavy" = "light"): void {
  if (typeof window !== "undefined" && window.Telegram?.WebApp?.hapticFeedback) {
    window.Telegram.WebApp.hapticFeedback.impactOccurred(type);
  }
}
