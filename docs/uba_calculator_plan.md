# UBA Upgrade Calculator - Project Plan

## Overview
A web-based NBA 2K26 fantasy league upgrade calculator for the UBA (and potentially other leagues). Users input their UC balance, adjust attribute sliders, and receive real-time feedback on budget, badge unlocks, and attribute caps. The app outputs a formatted upgrade submission ready to paste into the league sheet.

---

## Core Features

### 1. Build Setup
- Input player name
- Select height (from dropdown, affects physical caps)
- Select weight class (affects Speed/Agility caps and Strength cap)
- Select Primary Strength, Secondary Strength, and Weakness (affects attribute caps per category)
- Input starting attribute values

### 2. UC Budget Tracker
- Input current UC balance
- Real-time spend counter as sliders are moved
- Clear over/under budget indicator
- Warning when approaching or exceeding budget

### 3. Attribute Sliders
- One slider per attribute
- Each slider respects the player's personal cap (derived from build setup)
- Color coded to show current value vs cap
- Cost shown per point as you drag
- Cumulative cost shown

### 4. Badge Unlock Notifications
- Real-time badge unlock detection as sliders move
- Shows badge name and tier (Bronze, Silver, Gold, HOF, Legend)
- Clearly distinguishes newly unlocked vs already owned badges
- Shows what attributes are still needed for unmet badges

### 5. Submission Output
- Generates formatted upgrade text automatically
- Matches exact format required for league submission
- One click copy to clipboard

---

## Tech Stack

| Layer | Technology | Reason |
|---|---|---|
| Framework | React + TypeScript + Vite | Fast, familiar, great DX |
| Styling | Tailwind CSS | Rapid UI, consistent design |
| State | Zustand | Lightweight, simple global state |
| Data | JSON config files | Badge thresholds, cap rules, archetypes all in flat JSON, easy to update |
| Hosting | Cloudflare Pages | Free, fast, custom domain support |
| Domain | Spare domain (TBC) | To be connected via Cloudflare DNS |

No backend required. Fully client-side. All logic lives in JSON config and TypeScript utilities.

---

## Data Architecture

### Key Config Files
- `badges.json` - All badge names, Bronze/Silver/Gold/HOF/Legend thresholds
- `attributes.json` - All attribute names, categories, default values
- `caps.json` - Height cap table, weight cap table, archetype cap modifiers
- `costScale.json` - UC cost per point by bracket (40-50, 51-60 etc.)

### Cap System
Caps are calculated from three inputs:
1. **Height** - affects Vertical cap and base Speed cap
2. **Weight class** - applies Speed/Agility penalty, sets Strength cap ceiling
3. **Archetype (Primary/Secondary/Weakness)** - sets skill attribute caps per category

---

## Questions for OpenCode to Ask Before Building

OpenCode should ask the following before writing any code:

1. **Domain name** - What is the spare domain? Will it be connected via Cloudflare?
2. **Hosting** - Confirm Cloudflare Pages or alternative (Vercel, Netlify)?
3. **League name** - Is this UBA-specific or generic for any 2K26 league?
4. **Full archetype list** - What are all possible Primary Strengths, Secondary Strengths, and Weaknesses, and what cap does each apply per attribute category?
5. **Full height cap table** - Confirm all height brackets and their corresponding Vertical and Speed base caps
6. **Full weight cap table** - Confirm all weight brackets, Speed/Agility penalty, and Strength cap ceiling
7. **Full badge threshold data** - Confirm all Bronze, Silver, Gold, HOF, and Legend thresholds for every badge
8. **Starting attribute values** - Should users input their own starting values, or select from preset builds?
9. **Tendency changes** - Should tendency changes (250 UC each) be included in the calculator?
10. **Save/load builds** - Should users be able to save their build locally (localStorage) for future sessions?
11. **Multi-player** - Should multiple players be manageable in one session, or one player at a time?
12. **Visual style** - Dark mode, light mode, or both? Any colour scheme preferences?
13. **Mobile support** - Should it be fully responsive for mobile, or desktop-first?

---

## Phased Build Plan

### Phase 1: Core Calculator (MVP)
- Build setup form (name, height, weight, archetype)
- Attribute sliders with real-time cost tracking
- UC budget tracker with over/under indicator
- Basic badge unlock detection
- Submission output formatter

### Phase 2: Polish
- Visual badge unlock animations
- Badge progress indicators (e.g. "2 of 3 requirements met")
- Color-coded attribute categories (Offensive, Defensive, Physical, Mental)
- Mobile responsiveness

### Phase 3: Advanced Features
- Save/load builds via localStorage
- Multiple player profiles
- Session history (what was upgraded last time)
- Tendency change calculator

---

## Notes
- All badge threshold and cap data should be stored in editable JSON so the league admin can update it each season without touching code
- The submission output format must exactly match the UBA league format
- Do not hardcode any badge thresholds or cap values into components - always read from config files

---

## Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode, accent gold card borders
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`), maps 35 sheet columns to internal names via `sheetColumns.json`, messy-data parser in `sheetImport.ts`, bulk `setStartingValuesBatch` store action
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation

### Testing
- **Framework**: Playwright 1.60 (Chromium only, headless, 1 worker)
- **37 tests** all passing — 34 e2e + 3 smoke
- **Port handling**: `npm run test:run` script kills stale port 4173 before starting preview
- **Key findings**: documented in `docs/playwright-notes.md`

### Known Quirks
- `fill()` on range sliders and number inputs does NOT trigger React 19 onChange → must use keyboard events in tests
- `startingValues` in store is empty until user interacts with spinbutton → per-slider revert falls back to `attr.default` (50)
- Badge delimiter ` -and- ` vs ` -and ` required data normalization in 3 badges
- Three badges (`On-Ball Menace`, `Pick Dodger`, `Post Lockdown`) had mismatched delimiters

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
