# Playwright Testing Notes — UBACalc

## Key Findings (saves you from rediscovering these)

### 1. React 19 + Slider `fill()` does NOT trigger onChange

Playwright's `locator.fill('60')` on `<input type="range">` sets the DOM value but does **not** trigger React's `onChange` handler. The React state never updates.

**✅ Working approach for sliders:**
```ts
await slider.focus()
for (let i = 0; i < n; i++) {
  await page.keyboard.press('ArrowRight')
  await page.waitForTimeout(15)
}
```
Each ArrowRight triggers `onKeyDown` → `setAttribute` → store update → re-render.

### 2. React 19 + Spinbutton `fill()` also does NOT trigger onChange

Same issue applies to `<input type="number">` (spinbutton). `fill('60')` sets the DOM but React doesn't see it.

**✅ Working approach for spinbuttons:**
```ts
await input.click()
await input.press('Backspace')
await page.keyboard.type('60')
```

### 3. Starting values now derive from build setup until touched

Untouched `startingValues` are recalculated when height, weight, primary, secondary, or weakness changes. Imported or manually edited starting values are marked touched and preserved.

**Per-slider revert button** uses `button[title="Revert to start"]` as locator.

### 4. Theme toggle button also has an SVG — be specific with locators

`page.locator('button').filter({ has: page.locator('svg') }).first()` matches the theme toggle **before** the per-slider revert button. Use `page.locator('button[title="Revert to start"]')` instead.

### 5. Port conflicts are a recurring token waste

Port 4173 can still be left busy by old runs. Use the `test:run` script (`bash scripts/test.sh`) which kills the port first. Playwright's `webServer` config then starts and stops the Vite dev server itself.

### 6. Tests run against Vite dev server on purpose

Some e2e tests use the dev/test-only `window.__builderStore` hook. The hook is available in Vite dev mode and when `VITE_E2E=true`, but it is not exposed in normal production preview/build output. Do not switch Playwright back to `vite preview` unless the tests are rewritten as black-box UI-only tests.

### 7. Badge detection is case-sensitive

Badge threshold checks use exact attribute names from `attributes.json`. Three badges (`On-Ball Menace`, `Pick Dodger`, `Post Lockdown`) had a ` -and ` delimiter that was mismatched with the data file's ` -and- ` format. Fixed by normalizing `badges.json` data directly.

### 8. Test timeout defaults are tight

Default Playwright timeout is 15,000ms. Tests with 49 keyboard presses (15ms each = 735ms) plus waits (~300ms) fit easily, but the initial page load + interaction can be slow on the first run. Consider 30s for the first test in a file.

## Running Tests

```bash
# Using the safe script (kills port 4173 first, then lets Playwright start Vite):
npm run test:run

# With custom port:
bash scripts/test.sh 4173

# Standard Playwright (uses webServer from playwright.config.ts):
npm test

# Unit regression tests for pure calculator utilities:
npm run test:unit
```

## Test Structure

- `e2e/smoke.spec.ts` — 3 quick smoke tests (title, sections loaded)
- `e2e/app.spec.ts` — 37 full e2e tests across all features
- `src/utils/*.test.ts` — Vitest unit tests for badge parsing, caps, cost, import parsing, share decoding, and sanitization
- Browser: Chromium only, headless, 1 worker (state leaking between tests)

## Recap — all passing as of May 27, 2026

```
Playwright: [chromium] ✓ 40 passed
Vitest: 6 files, 17 tests passed
```
