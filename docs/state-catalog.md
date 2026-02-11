# State catalog

All UI states (loading, error, empty, success) for main screens.

## Swap

| State | Trigger | UI |
|-------|---------|-----|
| Idle | No amount / no wallet | "Connect Wallet" or "Enter amount"; button disabled when amount missing. |
| Loading quote | Fetching from DeDust/STON.fi | Button shows "Fetching quote…"; spinner; disable confirm. |
| Quote ready | Best quote received | Route and "Save X%" shown; "Review swap" enabled. |
| One provider failed | Only one DEX returned | Show best quote; optional warning "One route unavailable". |
| Confirm open | User clicked Review | Modal with from/to, route, slippage, deadline; Confirm / Cancel. |
| Submitting | After Confirm | Button loading; optional optimistic "Pending" in history. |
| Success | Swap recorded | Modal close; clear amount; history updated. |
| Error | API or tx failed | Error message in modal or inline; allow retry. |

## Dashboard

| State | Trigger | UI |
|-------|---------|-----|
| No wallet | Not connected | Portfolio $0; quick actions visible; connect CTA in top bar. |
| No activity | No swaps yet | Recent activity: "Your latest swaps will appear here" + link to Swap. |
| Has activity | ≥1 swap | Last 5 swaps listed; "View all" to Portfolio. |

## Portfolio

| State | Trigger | UI |
|-------|---------|-----|
| No history | No swaps | "Your swaps will appear here after you trade." |
| Has history | ≥1 swap | List with date, from/to, provider; "Export CSV" button. |

## Placeholder pages (Liquidity, Staking, etc.)

| State | Trigger | UI |
|-------|---------|-----|
| Phase N | Any visit | "Coming in Phase N" + Back to Dashboard + Go to Swap. |

## Global

| State | Trigger | UI |
|-------|---------|-----|
| Theme | User or system | Light/dark via `data-theme`; toggle in top bar and Settings. |
| Notifications | Bell clicked | List (Phase 1: tx confirmations, price alerts). |
