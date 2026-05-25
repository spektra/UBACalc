# UBA Upgrade Calculator - Project Plan### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)## Overview### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)A web-based NBA 2K26 fantasy league upgrade calculator for the UBA (and potentially other leagues). Users input their UC balance, adjust attribute sliders, and receive real-time feedback on budget, badge unlocks, and attribute caps. The app outputs a formatted upgrade submission ready to paste into the league sheet.### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)---### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)## Core Features### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)### 1. Build Setup### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)- Input player name### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)- Select height (from dropdown, affects physical caps)### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)- Select weight class (affects Speed/Agility caps and Strength cap)### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)- Select Primary Strength, Secondary Strength, and Weakness (affects attribute caps per category)### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)- Input starting attribute values### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)### 2. UC Budget Tracker### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)- Input current UC balance### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)- Real-time spend counter as sliders are moved### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)- Clear over/under budget indicator### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)- Warning when approaching or exceeding budget### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)### 3. Attribute Sliders### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)- One slider per attribute### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)- Each slider respects the player's personal cap (derived from build setup)### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)- Color coded to show current value vs cap### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)- Cost shown per point as you drag### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)- Cumulative cost shown### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)### 4. Badge Unlock Notifications### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)- Real-time badge unlock detection as sliders move### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)- Shows badge name and tier (Bronze, Silver, Gold, HOF, Legend)### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)- Clearly distinguishes newly unlocked vs already owned badges### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)- Shows what attributes are still needed for unmet badges### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)### 5. Submission Output### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)- Generates formatted upgrade text automatically### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)- Matches exact format required for league submission### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)- One click copy to clipboard### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)---### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)## Tech Stack### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)| Layer | Technology | Reason |### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)|---|---|---|### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)| Framework | React + TypeScript + Vite | Fast, familiar, great DX |### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)| Styling | Tailwind CSS | Rapid UI, consistent design |### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)| State | Zustand | Lightweight, simple global state |### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)| Data | JSON config files | Badge thresholds, cap rules, archetypes all in flat JSON, easy to update |### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)| Hosting | Cloudflare Pages | Free, fast, custom domain support |### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)| Domain | Spare domain (TBC) | To be connected via Cloudflare DNS |### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)No backend required. Fully client-side. All logic lives in JSON config and TypeScript utilities.### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)---### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)## Data Architecture### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)### Key Config Files### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)- `badges.json` - All badge names, Bronze/Silver/Gold/HOF/Legend thresholds### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)- `attributes.json` - All attribute names, categories, default values### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)- `caps.json` - Height cap table, weight cap table, archetype cap modifiers### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)- `costScale.json` - UC cost per point by bracket (40-50, 51-60 etc.)### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)### Cap System### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)Caps are calculated from three inputs:### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)1. **Height** - affects Vertical cap and base Speed cap### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)2. **Weight class** - applies Speed/Agility penalty, sets Strength cap ceiling### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)3. **Archetype (Primary/Secondary/Weakness)** - sets skill attribute caps per category### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)---### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)## Questions for OpenCode to Ask Before Building### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)OpenCode should ask the following before writing any code:### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)1. **Domain name** - What is the spare domain? Will it be connected via Cloudflare?### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)2. **Hosting** - Confirm Cloudflare Pages or alternative (Vercel, Netlify)?### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)3. **League name** - Is this UBA-specific or generic for any 2K26 league?### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)4. **Full archetype list** - What are all possible Primary Strengths, Secondary Strengths, and Weaknesses, and what cap does each apply per attribute category?### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)5. **Full height cap table** - Confirm all height brackets and their corresponding Vertical and Speed base caps### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)6. **Full weight cap table** - Confirm all weight brackets, Speed/Agility penalty, and Strength cap ceiling### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)7. **Full badge threshold data** - Confirm all Bronze, Silver, Gold, HOF, and Legend thresholds for every badge### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)8. **Starting attribute values** - Should users input their own starting values, or select from preset builds?### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)9. **Tendency changes** - Should tendency changes (250 UC each) be included in the calculator?### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)10. **Save/load builds** - Should users be able to save their build locally (localStorage) for future sessions?### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)11. **Multi-player** - Should multiple players be manageable in one session, or one player at a time?### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)12. **Visual style** - Dark mode, light mode, or both? Any colour scheme preferences?### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)13. **Mobile support** - Should it be fully responsive for mobile, or desktop-first?### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)---### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)## Phased Build Plan### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)### Phase 1: Core Calculator (MVP)### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)- Build setup form (name, height, weight, archetype)### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)- Attribute sliders with real-time cost tracking### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)- UC budget tracker with over/under indicator### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)- Basic badge unlock detection### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)- Submission output formatter### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)### Phase 2: Polish### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)- Visual badge unlock animations### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)- Badge progress indicators (e.g. "2 of 3 requirements met")### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)- Color-coded attribute categories (Offensive, Defensive, Physical, Mental)### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)- Mobile responsiveness### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)### Phase 3: Advanced Features### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)- Save/load builds via localStorage### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)- Multiple player profiles### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)- Session history (what was upgraded last time)### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)- Tendency change calculator### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)---### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)## Notes### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)- All badge threshold and cap data should be stored in editable JSON so the league admin can update it each season without touching code### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)- The submission output format must exactly match the UBA league format### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)- Do not hardcode any badge thresholds or cap values into components - always read from config files### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)---### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)## Implementation Progress (May 25, 2026)### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)### What's Built### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode, accent gold card borders### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)### Additional Features Added### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`), maps 35 sheet columns to internal names via `sheetColumns.json`, messy-data parser in `sheetImport.ts`, bulk `setStartingValuesBatch` store action### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)- **PWA**: Service worker for offline support, manifest for installability### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)- **Build Rating**: Auto-generated roast/compliment text generation### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)### Testing### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)- **Framework**: Playwright 1.60 (Chromium only, headless, 1 worker)### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)- **37 tests** all passing — 34 e2e + 3 smoke### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)- **Port handling**: `npm run test:run` script kills stale port 4173 before starting preview### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)- **Key findings**: documented in `docs/playwright-notes.md`### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)### Known Quirks### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)- `fill()` on range sliders and number inputs does NOT trigger React 19 onChange → must use keyboard events in tests### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)- `startingValues` in store is empty until user interacts with spinbutton → per-slider revert falls back to `attr.default` (50)### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)- Badge delimiter ` -and- ` vs ` -and ` required data normalization in 3 badges### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)- Three badges (`On-Ball Menace`, `Pick Dodger`, `Post Lockdown`) had mismatched delimiters### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)### Next Steps### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)- Push to GitHub, connect Cloudflare Pages### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)- Have league admin audit/update `caps.json` and `badges.json` before launch### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)- Mobile responsiveness improvements (Phase 2)### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)- Multi-player save/load (Phase 3)### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)- Tendency change calculator (Phase 3)### Implementation Progress (May 25, 2026)

### What's Built
- Full MVP (Phase 1): build setup, attribute sliders, UC tracker, badge detection, submission output
- Phase 2 items: animations (framer-motion), color-coded caps, dark/light theme toggle, Summer Mode
- Phase 3 items: save/load via localStorage, share URL encoding, auto-save, audio greeting

### Additional Features Added
- **Analytics**: Cloudflare Web Analytics (free, privacy-first, no cookies)
- **Error Tracking**: Client-side `window.onerror` + `unhandledrejection` → localStorage logger (`src/lib/errorReporter.ts`). Zero cost, no third-party.
- **Donations**: Ko-fi floating chat button ("Tip Marius") — 0% platform fee, no backend needed
- **PWA**: Service worker for offline support, manifest for installability
- **Build Rating**: Auto-generated roast/compliment text generation
- **Sheet Import**: Slide-out drawer for pasting Google Sheets attribute data (`SheetImportDrawer.tsx`). Parses tab/comma/space-separated values from the 35-column league export format. Column-to-attribute mapping in `src/data/sheetColumns.json`. Auto-sets player name and all starting values.
- **Weight lbs Input**: Number field (160-275 lbs) next to weight dropdown. Auto-detects weight class on blur (Very Light/Light/Average/Above Average/Heavy/Very Heavy).
- **Gold Accent Borders**: All cards use `border-uba-gold/10` default, hover to `border-uba-gold/20`.

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
- Keyboard-based interaction with sliders/inputs unreliable — deprioritized, logged as known bug

### Next Steps
- Push to GitHub, connect Cloudflare Pages
- Have league admin audit/update `caps.json` and `badges.json` before launch
- Mobile responsiveness improvements (Phase 2)
- Multi-player save/load (Phase 3)
- Tendency change calculator (Phase 3)
- "Recommend an Upgrade" button (future feature — user will provide reasoning)