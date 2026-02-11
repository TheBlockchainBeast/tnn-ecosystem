# Design system

## Tokens (Tailwind / CSS)

Defined in `src/app/globals.css`. Use CSS variables for theming.

### Colors

- **Primary:** Electric blue – main CTAs, active states.
- **Secondary:** Accent (e.g. cyan) – secondary CTAs.
- **Semantic:** Success (green), Warning (amber), Error (red).
- **Neutrals:** Background, foreground, muted text, border, card.

Dark mode: `prefers-color-scheme: dark` or `[data-theme="dark"]`; true black or deep navy background.

### Typography

- **Headings / body:** Sans-serif (Geist Sans via Next.js font).
- **Numbers / addresses:** Monospace (Geist Mono). Use class `font-mono`.

### Spacing and radius

- Radius: 6px (sm), 8px (md), 12px (lg), 16px (xl). Prefer `rounded-xl` for cards and buttons.
- Shadows: `shadow-sm`, `shadow-md`, `shadow-lg` for depth.

## Component usage

- **Button:** `variant="primary" | "secondary" | "tertiary" | "ghost" | "destructive"`, `size="sm" | "md" | "lg"`, `loading`, `leftIcon` / `rightIcon`.
- **Card:** `Card` > `CardHeader` (optional) > `CardTitle` / `CardDescription` > `CardContent` > `CardFooter` (optional).
- **TokenInput:** `value`, `onValueChange`, `balance`, `symbol`, `onMax`, `placeholder`.
- **Modal:** `open`, `onClose`, `title`, `description`, `children`.
- **Tabs:** `Tabs` (defaultValue or value/onValueChange) > `TabsList` > `TabsTrigger` (value) + `TabsContent` (value).

All components live under `src/components/ui/` and are re-exported from `src/components/ui/index.ts`.
