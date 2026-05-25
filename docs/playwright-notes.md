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

### 3. hasUpgrades requires startingValues to be set

The `↩ All` button (`hasUpgrades`) and `resetAttribute` both check `startingValues[name] !== undefined`. If users never set a starting value (which they can't do via fill()), the revert-all button won't appear and per-slider revert silently does nothing.

**Per-slider revert button** uses `button[title="Revert to start"]` as locator.

### 4. Theme toggle button also has an SVG — be specific with locators

`page.locator('button').filter({ has: page.locator('svg') }).first()` matches the theme toggle **before** the per-slider revert button. Use `page.locator('button[title="Revert to start"]')` instead.

### 5. Port conflicts are a recurring token waste

Preview server often crashes because port 4173 is already in use from a prior run. Use the `test:run` script (`bash scripts/test.sh`) which kills the port first. Or use Playwright's `webServer` config (see `playwright.config.ts`).

### 6. Setup order matters — select height and archetype first

Cap calculations require both `build.height` AND `build.primaryArchetype` to be set (guarded in `caps.ts`). Tests should always select these before interacting with sliders.

### 7. Badge detection is case-sensitive

Badge threshold checks use exact attribute names from `attributes.json`. Three badges (`On-Ball Menace`, `Pick Dodger`, `Post Lockdown`) had a ` -and ` delimiter that was mismatched with the data file's ` -and- ` format. Fixed by normalizing `badges.json` data directly.

### 8. Test timeout defaults are tight

Default Playwright timeout is 15,000ms. Tests with 49 keyboard presses (15ms each = 735ms) plus waits (~300ms) fit easily, but the initial page load + interaction can be slow on the first run. Consider 30s for the first test in a file.

## Running Tests

```bash
# Using the safe script (kills port 4173 first):
npm run test:run

# With custom port:
bash scripts/test.sh 4173

# Standard Playwright (requires preview server running separately):
npm test
```

## Test Structure

- `e2e/smoke.spec.ts` — 3 quick smoke tests (title, sections loaded)
- `e2e/app.spec.ts` — 31 full e2e tests across all features
- Browser: Chromium only, headless, 1 worker (state leaking between tests)

## Recap — 34 tests, all passing as of May 25, 2026

```
[chromium] ✓ 34 passed (45.4s)
```
