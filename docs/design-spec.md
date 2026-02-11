# Design specification (developers)

## Breakpoints

| Name | Min width | Usage |
|------|-----------|--------|
| Mobile | 0–639px | Telegram WebApp primary; single column; bottom nav. |
| Tablet | 640px–1024px | Two columns where useful; sidebar can collapse. |
| Desktop | 1024px+ | Sidebar + main content; top bar. |
| Large | 1440px+ | Max content width; comfortable reading. |

## Layout

- **Desktop:** Collapsible sidebar (icons + labels), top bar (wallet, network, theme, notifications, settings). Main content `max-w-6xl` or `max-w-xl` (Swap) centered.
- **Mobile:** Bottom tab bar (Home, Swap, Portfolio, More). "More" opens list of Liquidity, Staking, Launchpad, Bridge, Governance. Hamburger or top-left menu for secondary nav if needed.

## Design tokens (CSS variables)

- **Primary:** `--color-primary`, `--color-primary-hover`
- **Secondary:** `--color-secondary`, `--color-secondary-hover`
- **Semantic:** `--color-success`, `--color-warning`, `--color-error`
- **Surfaces:** `--background`, `--foreground`, `--muted`, `--border`, `--card`, `--card-foreground`
- **Radius:** 8–16px (e.g. `rounded-xl` = 12px)
- **Typography:** Sans for UI (Geist/Inter), mono for addresses and amounts (Geist Mono / JetBrains Mono)

## Components

- **Buttons:** Primary (filled), secondary (accent), tertiary (border), ghost, destructive. Sizes: sm, md, lg. Loading state: spinner.
- **Cards:** Border + card background; optional header/title/description/content/footer.
- **Forms:** TokenInput (amount + Max + symbol), Input, Select, Slider, SearchInput.
- **Modals:** Overlay + panel; title/description optional; close on overlay or Escape.
- **Data:** Tables for history/leaderboard; Progress bar; Tooltips.

## States to handle

- **Loading:** Skeleton or spinner; disable primary actions.
- **Error:** Inline message or toast; retry where applicable.
- **Empty:** Message + CTA (e.g. "No swaps yet – Make your first swap").
- **Success:** Confirmation message or redirect.

See `state-catalog.md` for a full list.
