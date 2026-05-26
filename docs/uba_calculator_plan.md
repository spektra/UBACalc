# UBA Upgrade Calculator - Project Plan

## Overview

A web-based NBA 2K26 fantasy league upgrade calculator for the UBA. Users input their UC balance, adjust attribute sliders, and receive real-time feedback on budget, badge unlocks, and attribute caps. The app outputs a formatted upgrade submission ready to paste into the league sheet.

Fully client-side. No backend. All game parameters in flat JSON for season-to-season updates without touching code.

---

## Tech Stack (Actual)

| Layer | Choice |
|---|---|
| Framework | React 19 + TypeScript + Vite 6 |
| Styling | Tailwind CSS v4 |
| State | Zustand 5 |
| Animation | Framer Motion 12 |
| Hosting | Cloudflare Pages |
| Analytics | Cloudflare Web Analytics (free, no cookies) |
| Error Tracking | Client-side `window.onerror` + `unhandledrejection` → localStorage logger |
| PWA | Service worker + manifest (installable, offline-capable) |
| Testing | Playwright 1.60 (Chromium, headless, 40 tests) |
| Donations | Ko-fi floating button ("Tip Marius") |

---

## Build Progress — May 26, 2026

### Phase 1: Core Calculator (MVP) ✅ Built
- [x] Build setup form — player name, height dropdown, weight class, weight lbs input (160-275), primary/secondary archetypes, weakness
- [x] 31 attribute sliders across 7 categories (Shooting, Slashing, Playmaking, Defense, Rebounding, Post Scoring, Physical)
- [x] UC budget tracker — running total vs balance, over-budget warning, clear/reset
- [x] Badge unlock detection — 40 badges, Bronze/Silver/Gold/HOF thresholds from `badges.json`
- [x] Submission output — formatted text with copy button, per-attribute upgrade lines

### Phase 2: Polish ✅ Built
- [x] Framer Motion animations — staggered entrance, spring badge feed, AnimatePresence transitions
- [x] Color-coded caps — `getCapColor()` with hex map, cap badges with dynamic background/text styles
- [x] Dark/light theme toggle — CSS custom properties, `.light` class on `<html>`
- [x] Summer Mode — seasonal gold/orange theme toggle
- [x] Gold accent borders — `border-uba-gold/10` default, `hover:border-uba-gold/20`
- [x] Mobile responsiveness — `sm:` breakpoint padding, touch-friendly slider thumbs (22px), compact header, scrollable badge feed, mobile-stacked buttons
- [x] Background images — 2K-style wallpapers with gradient overlays

### Phase 3: Advanced Features ✅ Built
- [x] Save/load via localStorage — `saveBuild()` / `loadBuild()`, auto-save on attribute change
- [x] Share URL encoding — `encodeBuild()`/`decodeBuild()` via base64 JSON in URL hash
- [x] Auto-save — `useAutoSave` hook debounces store changes to localStorage
- [x] Audio greeting — `useAudioGreeting` hook plays `welcome.mp3` on first visit (once per session)
- [x] Build Rating — auto-generated roast/compliment text from `rating.ts`

### Additional Features
- [x] **Sheet Import** — slide-out drawer (`SheetImportDrawer.tsx`) pastes tab/comma/space-separated data from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values. Badge import via 41-column mapping in `badgeColumns.json`. Uses `findDataLine` to skip header rows.
- [x] **Weight lbs Input** — number field (160-300) next to weight dropdown. Auto-detects weight class on blur from 7 classes (Very Light through Very Heavy, including Below Average).
- [x] **Badge Previously-Unlocked Tracking** — imported badges stored in `previouslyUnlocked` state, persisted in localStorage, correctly diffed against current stat-based unlocks so previously-owned badges aren't re-announced as "new."
- [x] **Per-Slider Revert** — each attribute has a "Revert to start" button that resets to the starting value, plus "↩ All" to reset all upgrades.

### Phase 4: Badge Engine Overhaul ✅ Built
- [x] **Operator precedence fix** — `evalCondition`, `canEverAchieve`, `countConditions`, `countMetConditions`, and `parseConditionDetails` all evaluate ` AND ` before ` -or- `, fixing false positives on AND-EITHER-or patterns (e.g. Boxout Beast)
- [x] **Legend tier support** — added to `Tier` type, `TIER_ORDER`, `checkBadges` loop, `TIER_COLORS`/`TIER_BG` in BadgeFeed
- [x] **Per-tier 3-state detection** — each badge tier gets `EARNED/ACHIEVABLE/LOCKED` based on current attrs vs caps vs threshold
- [x] **Cap-aware feasibility** — `canEverAchieve()` checks each condition against hard caps to determine if a tier is permanently locked
- [x] **Badge condition detail** — `parseConditionDetails()` returns per-attribute `{attrName, threshold, currentValue, hardCap, met, cappedBelow}`
- [x] **Session-based tracking** — `sessionUnlocked` Set replaces old `prevResultsRef`/`justUnlocked` system; banner, glow, tab filter, and entry animation all driven by same `prevTiersRef` diff
- [x] **Banner queue** — sequential slide-down notification with ref-based timer guard, dedupe, and unmount cleanup
- [x] **Glow animation** — `@keyframes badge-pop` CSS animation (gold glow pulse, 800ms) on newly earned badges

---

## Testing

- **Framework:** Playwright 1.60, Chromium only, headless, 1 worker
- **Coverage:** 40 tests all passing — 37 e2e (`app.spec.ts` + `smoke.spec.ts`) + 3 smoke
- **Key testing quirks** documented in `docs/playwright-notes.md`:
  - `fill()` on range sliders and number inputs does NOT trigger React 19 onChange → must use keyboard events
  - `startingValues` empty until first interaction → per-slider revert falls back to `attr.default` (50)
  - Three badges had mismatched ` -and ` vs ` -and- ` delimiters (fixed by normalizing `badges.json`)
- **Port handling:** `npm run test:run` kills stale port 4173 before starting preview

---

## Known Quirks & Limitations

- `startingValues` is stored per-slider on first interaction, not populated from sheet import immediately; the import does populate it via `setStartingValuesBatch`
- Badge `progress` field in `checkBadges()` only reflects the last iterated tier, not cumulative progress across all tiers (design limitation of `BadgeCheck` type)
- `caps.json` has an unused `positionHeightRanges` field — leftover from original spec, never referenced in code
- Share URL uses `btoa(encodeURIComponent(json))` — theoretically can throw on characters outside BMP (> U+FFFF), but practically impossible with JSON-encoded build data
- No unit tests for business logic (`caps.ts`, `badges.ts`, `cost.ts`) — only e2e tests
- Summer mode `--uba-track-upgrade` CSS var is hardcoded blue in `.light` block instead of using the gold/orange summer palette

---

## Code Review — May 26, 2026

Full audit of all 24 source files, 4 doc files, 4 data files, 2 test files, and config files.

### Positives
- Clean Zustand store patterns with good separation of concerns
- Consistent error handling throughout (try/catch on all localStorage calls, graceful fallbacks)
- All game parameters in JSON files — zero hardcoded badge thresholds or caps in components
- Consistent card styling with Tailwind: `rounded-2xl border border-uba-gold/10 bg-uba-card/80 backdrop-blur-sm`
- 40 Playwright tests passing reliably
- Good TypeScript usage — few `any` types, proper interfaces for all game data
- Strong data validation in sheet import (`findDataLine`, `isReasonableValue` guards)

### Issues Found & Fixed This Session — v2 Badge Overhaul & Code Audit

| Issue | File | Fix |
|---|---|---|
| Badge operator precedence: `-or-` checked before ` AND ` in 5 functions | `src/utils/badges.ts` | `evalCondition`, `canEverAchieve`, `countConditions`, `countMetConditions`, `parseConditionDetails` now check ` AND ` before `-or-`. Fixed AND-EITHER-or false positives on Boxout Beast, Post Lockdown, etc. |
| Missing Legend tier support | `src/types/index.ts`, `src/utils/badges.ts`, `src/components/BadgeFeed.tsx` | Added `Legend` to `Tier` type, `TIER_ORDER` loop, per-tier state logic, TIER_COLORS/TIER_BG |
| `totalConditions`/`metConditions` overwritten in tier loop | `src/utils/badges.ts` | Progress only computed toward first non-earned tier, then `break` |
| `canEverAchieve` returned `false` for missing caps (LOCKED) | `src/utils/badges.ts` | Changed to `caps[attrName] ?? 99` |
| `getAttrValue` returned `null` for missing attrs (inconsistent) | `src/utils/badges.ts` | Changed to `lookup[attrName] ?? 0` |
| `parseConditionDetails` OR/AND order-of-checks | `src/utils/badges.ts` | Moved ` AND ` split before `-or-` check |
| `hasAttributes` checked `attributes` instead of `effectiveAttrs` | `src/components/BadgeFeed.tsx` | Badges empty after import until slider moved. Changed to `Object.keys(effectiveAttrs).length > 0` |
| Competing badge tracking systems (prevResultsRef vs prevTiersRef) | `src/components/BadgeFeed.tsx` | Removed `prevResultsRef`/`justUnlocked`. Consolidated to `sessionUnlocked` Set fed from `prevTiersRef` diff |
| Banner timer leak on unmount | `src/components/BadgeFeed.tsx` | Added `useEffect(() => cleanup, [])` clearing `bannerTimerRef` |
| Duplicate banner queue pushes in StrictMode | `src/components/BadgeFeed.tsx` | Added dedupe guard `Set(bannerQueueRef.current.map(a => a.name))` |
| Display tier used `r.newlyUnlocked` (badges lost colors after save) | `src/components/BadgeFeed.tsx` | Changed to `r.highestEarned` — always shows current earned tier |
| HOF badge import silently failed (`'Hof' !== 'HOF'`) | `src/utils/sheetImport.ts` | Replaced fragile `charAt/toUpperCase/toLowerCase` with `TIER_MAP` lookup; added `Legend` |
| `window.__builderStore` exposed in production | `src/main.tsx` | Guarded behind `import.meta.env.DEV` |
| Dark/light DOM mutation ran on every render | `src/App.tsx` | Wrapped in `useEffect([theme])` |
| `parseBracketRange` missing NaN guard | `src/utils/cost.ts` | Added `Number.isNaN` check |
| `heightToInches` strict regex — silent 99 fallback on format mismatch | `src/utils/caps.ts` | Added `replace(/\s+/g, '')` before regex match |
| Archetype priority loop copy-pasted 3x | `src/utils/caps.ts` | Extracted `resolveBestStatus()` helper, removed 25 duplicated lines |
| Weight penalty subtracted from speed/agility caps AND starting values | `src/utils/caps.ts` | Removed all penalty subtraction. Speed cap = range.cap, Agility cap = 99, base values also raw (no `- penalty`). Speed/agility penalties still in caps.json for reference but unused in code. |
| `previouslyUnlocked` not reflected in badge state after load | `src/utils/badges.ts` | `checkBadges` now merges stored tier: forces all lower tiers to EARNED, sets highestEarned, so saved unlocks persist through badge re-evaluation |
| Weight class stale on load (dropdown default, not re-derived) | `src/stores/useBuilderStore.ts` | `loadPlayerBuild` now calls `lbsToWeightClass(weightLbs)` to re-derive correct weight class from stored pounds |
| Session baseline stale on previouslyUnlocked change | `src/components/BadgeFeed.tsx` | Added `previouslyUnlocked` to baseline effect deps, used `resultsRef` for latest value to avoid stale closure |
| Badge engine: `countConditions`, `countMetConditions`, `parseConditionDetails` checked OR before AND (same bug as evalCondition) | `src/utils/badges.ts` | Reordered all three functions to split on ` AND ` before checking `-or-`/`EITHER`, matching evalCondition/canEverAchieve precedence. Affected: Post Lockdown, Boxout Beast, Aerial Wizard, Post Prodigy, Paint Patroller |
| `lbsToWeightClass` duplicated between caps.ts and BuildSetupForm.tsx | `src/utils/caps.ts`, `src/components/BuildSetupForm.tsx` | Extracted `LBS_RANGES` array and `lbsToWeightClass()` function into caps.ts as named exports; BuildSetupForm imports from caps.ts |

### Minor Observations (No Fix Needed)
- `storage.ts` `saveBuild()` takes 7 positional params — could be refactored to accept `SavedBuild` object
- `sheetImport.ts` badge parsing lacks `findDataLine`-equivalent validation (returns `{}` silently on garbage input)
- `useBuilderStore.ts` `setBuild` has unused `cats` variable
- `rating.ts` mid-range (10k-50k) returns `pick(MID)` — MID array has 4 entries, all reasonable
- `SubmissionOutput.tsx` share URL check only requires player name, not attribute values
- `parseConditionDetails` returns `[]` for OR conditions intentionally (no UI consumer yet)

---

## Data Architecture

### Config Files (`src/data/`)

| File | Purpose |
|---|---|
| `badges.json` | 40 badges with Bronze/Silver/Gold/HOF threshold conditions |
| `attributes.json` | 31 attributes in 6 archetype categories + 1 physical category |
| `caps.json` | Height/weight cap tables + archetype cap modifiers (Primary=99, Secondary=95, Neutral=90, Weakness=75) |
| `costScale.json` | UC cost brackets: 40-50 (50), 51-60 (100), 61-70 (200), 71-80 (400), 81-90 (800), 91-99 (1600) |
| `sheetColumns.json` | Column→attribute mapping for 35-column league export |
| `badgeColumns.json` | Column→badge name mapping for 41-column badge import |

### Cap System
Caps derived from three inputs:
1. **Height** — determines Speed & Agility cap/base via height ranges (4 ranges: ≤6'3"=99/70, 6'4-6'7=95/60, 6'8-6'10=90/50, ≥6'11=85/40). Speed and Agility always match.
2. **Weight class** — determines Strength cap/base (VL=50/40 through VH=99/75) and Vertical cap/base (VL=99/60 through VH=75/40). 7 classes: Very Light through Very Heavy.
3. **Archetype (Primary/Secondary/Weakness)** — sets skill attribute caps per category:
   - Primary Strength → Blue (99 cap), baseline 80
   - Secondary Strength → Purple (95 cap), baseline 70
   - Neutral → Cyan (90 cap), baseline 50
   - Weakness → Red (75 cap), baseline 40
   - Physical (calculated from height/weight — no weight penalty subtraction)
- **Agility**: Always matches Speed cap/base (same height-range formula).

---

## Phased Build Plan (Original)

### Phase 1: Core Calculator (MVP) ✅
Build setup form, attribute sliders, UC tracker, badge detection, submission output.

### Phase 2: Polish ✅
Animations, color-coded caps, mobile responsiveness, gold borders, background images, theme toggle.

### Phase 3: Advanced Features ✅
Save/load, share URL, auto-save, audio greeting, build rating, sheet import, weight lbs input, badge tracking.

---

## Next Steps

- [ ] Push to GitHub and connect Cloudflare Pages
- [ ] League admin audit of `caps.json` and `badges.json` data accuracy
- [ ] Multi-player save/load profiles
- [ ] Tendency change calculator
- [ ] "Recommend an Upgrade" button with reasoning
- [ ] Unit tests for `caps.ts`, `badges.ts`, `cost.ts`
- [ ] Refactor `storage.ts` `saveBuild()` to accept a `SavedBuild` object
- [ ] Add `findDataLine`-equivalent validation to badge sheet import
- [ ] Legend badge threshold data for `badges.json` (currently placeholder gaps)
- [ ] Magenta/Green/Orange/Grey/Yellow/Dark Green cap colors from spec (`caps.json` has Blue/Purple/Cyan/Red only)
