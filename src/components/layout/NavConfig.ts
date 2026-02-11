export const NAV_ITEMS = [
  { href: "/", label: "Dashboard", icon: "LayoutDashboard", phase: 0 },
  { href: "/swap", label: "Swap", icon: "ArrowLeftRight", phase: 1 },
  { href: "/liquidity", label: "Liquidity", icon: "Droplets", phase: 2 },
  { href: "/staking", label: "Staking", icon: "Lock", phase: 2 },
  { href: "/launchpad", label: "Launchpad", icon: "Rocket", phase: 3 },
  { href: "/bridge", label: "Bridge", icon: "Bridge", phase: 3 },
  { href: "/governance", label: "Governance", icon: "Vote", phase: 4 },
  { href: "/portfolio", label: "Portfolio", icon: "Wallet", phase: 0 },
] as const;

export const BOTTOM_NAV_MAIN = [
  { href: "/", label: "Home", icon: "LayoutDashboard" },
  { href: "/swap", label: "Swap", icon: "ArrowLeftRight" },
  { href: "/portfolio", label: "Portfolio", icon: "Wallet" },
] as const;
