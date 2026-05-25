# UBA Calc — NBA 2K26 Fantasy League Upgrade Calculator

A fully client-side web app for UBA league members to plan attribute upgrades, track UC spending, and detect badge unlocks in real time.

## Tech Stack

- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS v4
- **State:** Zustand 5
- **Animation:** Framer Motion 12
- **Hosting:** Cloudflare Pages

## Features

- **Build Setup** — player name, height, weight class, primary/secondary archetypes, weakness
- **Attribute Sliders** — real-time UC cost, cap-aware (height/weight/archetype), keyboard-nudgeable, per-slider revert
- **UC Budget Tracker** — running total vs balance, over-budget warning
- **Badge Feed** — live badge unlock detection with framer-motion animations
- **Build Rating** — auto-generated roast or compliment for your build
- **Share URL** — encodes build into URL hash for sharing
- **PWA** — installable, works offline
- **Themes** — dark/light toggle + summer mode
- **Save/Load** — localStorage-based player profiles
- **Discord** — community invite in bottom-right corner

## Development

```bash
npm install
npm run dev      # Vite dev server
npm run build    # TypeScript check + production build
npm run preview  # Preview production build
```

## Project Structure

```
src/
├── components/     # React components (AttributePanel, BadgeFeed, Header, etc.)
├── data/           # Flat JSON config (badges, attributes, caps, costScale)
├── hooks/          # Custom hooks (useAutoSave, useAudioGreeting)
├── stores/         # Zustand stores (useBuilderStore, useThemeStore)
├── utils/          # Utilities (caps, badges, cost, sanitize, storage, share, rating)
├── types/          # TypeScript interfaces
├── App.tsx         # Root component
├── main.tsx        # Entry point + PWA registration
└── index.css       # Tailwind + theme variables
```

## Config Data

All game parameters are in `src/data/*.json` and can be updated per season without touching code:

- `badges.json` — 41 badges with Bronze/Silver/Gold/HOF thresholds
- `attributes.json` — 6 attribute categories with defaults
- `caps.json` — height/weight tables and archetype cap modifiers
- `costScale.json` — UC cost brackets (40-99)

## Deployment

Push to GitHub and connect to Cloudflare Pages. No build config needed — standard Vite output in `dist/`.
