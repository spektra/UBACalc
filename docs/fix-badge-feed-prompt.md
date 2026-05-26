# Fix: BadgeFeed "Just Unlocked" Logic — ✅ Implemented

Implemented during the v2 Badge Overhaul session. Changes applied to `src/components/BadgeFeed.tsx`:
- Replaced `justUnlocked`/`prevResultsRef` with `sessionUnlocked` Set
- Populated from the `prevTiersRef` diff inside the banner `useEffect`
- Fixed tab filter and empty-state check to use `sessionUnlocked`
- Also changed display tier from `r.newlyUnlocked` to `r.highestEarned`

## Original plan (kept for reference)

## File to edit
`src/components/BadgeFeed.tsx`

## Bug Summary
There are two competing systems for tracking newly unlocked badges. They diverged
when the slide-down banner was introduced, breaking the "New unlocks" tab.

- **`prevResultsRef` / `justUnlocked`** — diffs `r.newlyUnlocked`, which is a
  persistent store value comparing against a saved baseline (not this upgrade session).
  This is the OLD system and is now stale/wrong.
- **`prevTiersRef` / `displayBanner`** — diffs `r.highestEarned` changing between
  renders. This IS the correct "badge was just earned this upgrade" signal.

The "New unlocks" tab filter still uses `r.newlyUnlocked` (old system), so it shows
all badges new since the last save point — not just the ones earned during this session.

## What to fix

### 1. Add a session-accumulated unlocked set
Replace `justUnlocked: string[]` state with a `sessionUnlocked` state that is a
`Set<string>` (or array). It accumulates badge names as they are earned during
this session and is never auto-cleared (unlike the old 3-second timeout).

```ts
const [sessionUnlocked, setSessionUnlocked] = useState<Set<string>>(new Set())
```

### 2. Populate it from the `prevTiersRef` diff (banner useEffect)
Inside the existing `useEffect` that computes `newAchievements` (the one that
drives `displayBanner`), also update `sessionUnlocked`:

```ts
if (newAchievements.length > 0) {
  const names = newAchievements.map((a) => a.name)

  setSessionUnlocked((prev) => {
    const next = new Set(prev)
    for (const name of names) next.add(name)
    return next
  })

  // ... rest of existing banner/glow logic unchanged
}
```

### 3. Fix the "New unlocks" tab filter
Change the badge list filter from using `r.newlyUnlocked` to `sessionUnlocked`:

```ts
// BEFORE
.filter((r) => !showNewOnly || r.newlyUnlocked)

// AFTER
.filter((r) => !showNewOnly || sessionUnlocked.has(r.name))
```

### 4. Fix the empty-state check
Change:
```ts
{showNewOnly && unlocked.length === 0 && (
```
To:
```ts
{showNewOnly && sessionUnlocked.size === 0 && (
```

### 5. Remove the old dead system
Delete or comment out:
- `prevResultsRef` ref
- The first `useEffect` that diffs `r.newlyUnlocked` and calls `setJustUnlocked`
- The `justUnlocked` useState (if it was only used for the tab filter)

> NOTE: Keep `justUnlocked` if it is still used for the entry animation ring
> (`isNew ? 'ring-2 ring-uba-gold ...'`). If so, repopulate it from
> `newAchievements` inside the banner useEffect the same way the glow badges are,
> with the same 800ms clear timeout.

### 6. Keep `r.newlyUnlocked` only where it is semantically correct
The `unlocked` memo and any existing usage of `r.newlyUnlocked` for displaying
the "New badge unlocked!" inline label inside a card should remain as-is, OR be
switched to `sessionUnlocked.has(r.name)` depending on the intent (session-based
is most likely correct here too).

## Expected result after fix
- **Toaster (slide-down banner):** fires only when a badge tier changes this upgrade ✓ (already correct)
- **"New unlocks" tab:** shows only badges earned during this session (since page load / since last build reset), not a persistent store baseline
- **Both are driven by the same `prevTiersRef` diff** so they are always in sync
