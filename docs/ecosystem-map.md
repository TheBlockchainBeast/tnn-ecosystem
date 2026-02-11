# The Nobody Network – Ecosystem Map

## Product relationship diagram

```mermaid
flowchart TB
  subgraph shell [App Shell]
    Dashboard[Dashboard]
    Portfolio[Portfolio]
    Nav[Navigation]
    Wallet[Wallet]
    Notifications[Notifications]
  end
  subgraph phase1 [Phase 1]
    Swap[Swap]
  end
  subgraph phase2 [Phase 2]
    Liquidity[Liquidity]
    Staking[Staking]
  end
  subgraph phase3 [Phase 3]
    Launchpad[Launchpad]
    Bridge[Bridge]
  end
  subgraph phase4 [Phase 4]
    Governance[Governance]
  end
  Dashboard --> Swap
  Dashboard --> Liquidity
  Dashboard --> Staking
  Portfolio --> Swap
  Portfolio --> Liquidity
  Portfolio --> Staking
  Swap --> Liquidity
  Staking --> Governance
  Launchpad --> Staking
  Nav --> Dashboard
  Nav --> Swap
  Nav --> Portfolio
  Nav --> Liquidity
  Nav --> Staking
  Nav --> Launchpad
  Nav --> Bridge
  Nav --> Governance
```

## Routes

| Route | Product | Phase | Status |
|------|---------|-------|--------|
| `/` | Dashboard | — | Live |
| `/swap` | Swap | 1 | Live |
| `/portfolio` | Portfolio | — | Live |
| `/liquidity` | Liquidity | 2 | Placeholder |
| `/staking` | Staking | 2 | Placeholder |
| `/launchpad` | Launchpad | 3 | Placeholder |
| `/bridge` | Bridge | 3 | Placeholder |
| `/governance` | Governance | 4 | Placeholder |

## Shared capabilities

- **Design system:** Tokens and UI components used by all products.
- **TON Connect:** Single wallet connection for the app.
- **Notifications:** In-app center; future Telegram/email opt-in.
