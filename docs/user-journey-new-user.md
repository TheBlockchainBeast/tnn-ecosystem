# User journey: New user (Telegram-native)

## Goal

Get from "opened the app" to "first swap completed" in under 60 seconds.

## Steps

1. **Land on Dashboard**
   - Sees "Welcome back, Nobody #[id]".
   - Sees portfolio value (e.g. $0.00) and quick actions: Swap, Add Liquidity, Stake.

2. **Connect wallet**
   - Clicks "Connect Wallet" (top bar or CTA).
   - TON Connect modal opens: Tonkeeper, MyTonWallet, Telegram Wallet, etc.
   - User selects wallet and approves connection.

3. **Optional: Skip tutorial**
   - If we show an onboarding modal, user can skip or follow a short guide.

4. **First action: Swap**
   - Clicks "Swap" (quick action or nav).
   - On Swap page: selects "From" token (e.g. TON), "To" token (e.g. USDT), enters amount.
   - Sees best route (e.g. STON.fi or DeDust) and "Save X%" if aggregator chose a better price.
   - Clicks "Review swap" → confirmation modal → "Confirm swap".

5. **Post-swap**
   - Transaction submitted (or simulated in Phase 1).
   - Achievement / badge: "Nobody #12,345" or "First swap complete".
   - Recent activity on Dashboard and Portfolio shows the swap.

## Success metrics

- Time to first transaction &lt; 60s.
- Mobile completion rate &gt; 85%.
- Error/failure rate &lt; 5%.
