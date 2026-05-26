# Badge Logic Audit & Reimplementation Plan

## Canonical Attribute Names

| # | Canonical Key | Used in Badge Conditions? |
|---|--------------|--------------------------|
| 1 | `midRange` | Yes |
| 2 | `3PT` | Yes |
| 3 | `freeThrow` | No |
| 4 | `drivingLayup` | Yes |
| 5 | `drivingDunk` | Yes |
| 6 | `drawFoul` | No |
| 7 | `speedWithBall` | Yes |
| 8 | `passAccuracy` | Yes |
| 9 | `passVision` | Yes |
| 10 | `ballHandle` | Yes |
| 11 | `steal` | Yes |
| 12 | `block` | Yes |
| 13 | `perimeterDefense` | Yes |
| 14 | `interiorDefense` | Yes |
| 15 | `passPerception` | Yes |
| 16 | `offensiveRebound` | Yes |
| 17 | `defensiveRebound` | Yes |
| 18 | `standingDunk` | Yes |
| 19 | `closeShot` | Yes |
| 20 | `postHook` | Yes |
| 21 | `postControl` | Yes |
| 22 | `postFade` | Yes |
| 23 | `speed` | Yes |
| 24 | `agility` | Yes |
| 25 | `strength` | Yes |
| 26 | `vertical` | Yes |

## Boolean Expressions Per Badge

### Finishing (Inside)

**Aerial Wizard** — AND-EITHER-or across all 4 tiers
- Bronze: `vertical >= 70 AND (drivingDunk >= 80 OR standingDunk >= 80)`
- Silver: `vertical >= 75 AND (drivingDunk >= 85 OR standingDunk >= 85)`
- Gold: `vertical >= 80 AND (drivingDunk >= 90 OR standingDunk >= 90)`
- HOF: `vertical >= 85 AND (drivingDunk >= 95 OR standingDunk >= 95)`

**Float Game** — Simple OR
- Bronze: `closeShot >= 80 OR drivingLayup >= 80`
- Silver/HOF: 85/90/95

**Hook Specialist** — Simple AND
- Bronze: `closeShot >= 80 AND postHook >= 80`
- Silver/HOF: 85/90/95

**Layup Mixmaster** — Single
- Bronze: `drivingLayup >= 80`
- Silver/HOF: 85/90/95

**Paint Prodigy** — Simple AND
- Bronze: `closeShot >= 80 AND postControl >= 80`
- Silver/HOF: 85/90/95

**Physical Finisher** — Simple AND (asymmetric at B/S)
- Bronze: `strength >= 70 AND drivingLayup >= 80`
- Silver: `strength >= 80 AND drivingLayup >= 85`
- Gold: `strength >= 90 AND drivingLayup >= 90`
- HOF: `strength >= 95 AND drivingLayup >= 95`

**Post Fade Phenom** — Simple AND
- Bronze: `postControl >= 80 AND postFade >= 80`
- Silver/HOF: 85/90/95

**Post Powerhouse** — Simple AND (asymmetric Strength)
- Bronze: `postControl >= 80 AND strength >= 70`
- Silver: `postControl >= 85 AND strength >= 75`
- Gold: `postControl >= 90 AND strength >= 80`
- HOF: `postControl >= 95 AND strength >= 85`

**Post-Up Poet** — Single
- Bronze: `postControl >= 80`
- Silver/HOF: 85/90/95

**Posterizer** — Simple AND
- Bronze: `vertical >= 70 AND drivingDunk >= 80`
- Silver: `vertical >= 75 AND drivingDunk >= 85`
- Gold: `vertical >= 80 AND drivingDunk >= 90`
- HOF: `vertical >= 85 AND drivingDunk >= 95`

**Lightning Launch** — Single
- Bronze: `speedWithBall >= 80`
- Silver/HOF: 85/90/95

**Rise Up** — Simple AND (asymmetric Vertical)
- Bronze: `standingDunk >= 80 AND vertical >= 60`
- Silver: `standingDunk >= 85 AND vertical >= 70`
- Gold: `standingDunk >= 90 AND vertical >= 80`
- HOF: `standingDunk >= 95 AND vertical >= 90`

### Shooting

**Deadeye** — Simple OR
- Bronze: `midRange >= 80 OR threePt >= 80`
- Silver/HOF: 85/90/95

**Limitless Range** — Single
- Bronze: `threePt >= 80`
- Silver/HOF: 85/90/95

**Mini Marksman** — Simple OR
- Bronze: `midRange >= 80 OR threePt >= 80`
- Silver/HOF: 85/90/95

**Set Shot Specialist** — Simple OR
- Bronze: `midRange >= 80 OR threePt >= 80`
- Silver/HOF: 85/90/95

**Slippery Off-Ball** — Simple AND
- Bronze: `speed >= 80 AND agility >= 80`
- Silver/HOF: 85/90/95

**Shifty Shooter** — AND-EITHER-or
- Bronze: `agility >= 80 AND (midRange >= 80 OR threePt >= 80)`
- Silver/HOF: 85/90/95

### Playmaking

**Ankle Assassin** — Single
- Bronze: `ballHandle >= 80`
- Silver/HOF: 85/90/95

**Bail Out** — Simple AND
- Bronze: `passAccuracy >= 80 AND passVision >= 80`
- Silver/HOF: 85/90/95

**Break Starter** — Simple AND (asymmetric B/S/G)
- Bronze: `passAccuracy >= 65 AND passVision >= 65`
- Silver: `passAccuracy >= 75 AND passVision >= 75`
- Gold: `passAccuracy >= 85 AND passVision >= 85`
- HOF: `passAccuracy >= 95 AND passVision >= 95`

**Dimer** — Simple AND
- Bronze: `passAccuracy >= 80 AND passVision >= 80`
- Silver/HOF: 85/90/95

**Handles for Days** — Single
- Bronze: `ballHandle >= 80`
- Silver/HOF: 85/90/95

**Strong Handle** — Single (asymmetric)
- Bronze: `strength >= 60`
- Silver: `strength >= 70`
- Gold: `strength >= 80`
- HOF: `strength >= 90`

**Unpluckable** — Simple OR
- Bronze: `postControl >= 80 OR ballHandle >= 80`
- Silver/HOF: 85/90/95

**Versatile Visionary** — Single
- Bronze: `passVision >= 80`
- Silver/HOF: 85/90/95

### Defense

**Challenger** — Single
- Bronze: `perimeterDefense >= 80`
- Silver/HOF: 85/90/95

**Glove** — Single
- Bronze: `steal >= 80`
- Silver/HOF: 85/90/95

**High-Flying Denier** — Triple AND
- Bronze: `block >= 80 AND speed >= 70 AND vertical >= 70`
- Silver: `block >= 85 AND speed >= 80 AND vertical >= 80`
- Gold: `block >= 90 AND speed >= 90 AND vertical >= 90`
- HOF: `block >= 95 AND speed >= 95 AND vertical >= 95`

**Pogo Stick** — AND-EITHER-or
- Bronze: `vertical >= 70 AND (block >= 80 OR defensiveRebound >= 80)`
- Silver: `vertical >= 75 AND (block >= 85 OR defensiveRebound >= 85)`
- Gold: `vertical >= 80 AND (block >= 90 OR defensiveRebound >= 90)`
- HOF: `vertical >= 85 AND (block >= 95 OR defensiveRebound >= 95)`

**Immovable Enforcer** — AND-EITHER-or
- Bronze: `strength >= 80 AND (interiorDefense >= 80 OR defensiveRebound >= 80)`
- Silver/HOF: thresholds climb

**Interceptor** — Simple AND
- Bronze: `steal >= 80 AND passPerception >= 80`
- Silver/HOF: 85/90/95

**Off-Ball Pest** — Simple OR
- Bronze: `interiorDefense >= 80 OR perimeterDefense >= 80`
- Silver/HOF: 85/90/95

**On-Ball Menace** — Simple AND
- Bronze: `perimeterDefense >= 80 AND agility >= 80`
- Silver/HOF: 85/90/95

**Paint Patroller** — Simple AND
- Bronze: `interiorDefense >= 80 AND block >= 80`
- Silver/HOF: 85/90/95

**Pick Dodger** — Simple AND
- Bronze: `perimeterDefense >= 80 AND agility >= 80`
- Silver/HOF: 85/90/95

**Post Lockdown** — Simple AND (asymmetric Strength)
- Bronze: `interiorDefense >= 80 AND strength >= 70`
- Silver: `interiorDefense >= 85 AND strength >= 75`
- Gold: `interiorDefense >= 90 AND strength >= 80`
- HOF: `interiorDefense >= 95 AND strength >= 85`

### Rebounding

**Boxout Beast** — AND-EITHER-or
- Bronze: `strength >= 75 AND (offensiveRebound >= 80 OR defensiveRebound >= 80)`
- Silver: `strength >= 80 AND (offensiveRebound >= 85 OR defensiveRebound >= 85)`
- Gold: `strength >= 80 AND (offensiveRebound >= 90 OR defensiveRebound >= 90)`
- HOF: `strength >= 85 AND (offensiveRebound >= 95 OR defensiveRebound >= 95)`

**Rebound Chaser** — Simple OR
- Bronze: `offensiveRebound >= 80 OR defensiveRebound >= 80`
- Silver/HOF: 85/90/95

**Brick Wall** — Single
- Bronze: `strength >= 80`
- Silver/HOF: 85/90/95

## Structure Change Analysis

**All 40 badges use the SAME condition structure across ALL their tiers.** No badge switches between -or- and -and- or changes to/from AND-EITHER-or at different tier levels. Only numeric thresholds change.

## Bugs Found

### Bug 1: Parsing order in `evalCondition`
The function checks `-or-` BEFORE `AND` (uppercase). For AND-EITHER-or patterns like `"75 Strength AND EITHER 80 Offensive Rebound -or- 80 Defensive Rebound"`, the nested `-or-` triggers the `-or-` check prematurely, splitting at the wrong level. Can produce false positives (e.g. Strength=50, DefReb=80 incorrectly evaluates to true).

**Fix:** Check `AND` (uppercase) before `-or-`.

### Bug 2: `totalConditions`/`metConditions` overwritten in loop
The inner tier loop overwrites these variables each iteration, so after the loop they reflect the LAST tier (HOF) rather than the progress-relevant tier.

**Fix:** Track per-tier and expose only the relevant tier's progress.

### Bug 3: Missing `Legend` tier
Types only have Bronze/Silver/Gold/HOF. Spec includes Legend (threshold 99).

**Fix:** Add to `Tier` type; TIER_ORDER can include it; loop skips tiers with no threshold data.

## New 3-State Badge Tier System

### States
- **EARNED**: Current attributes meet all conditions for this tier.
- **ACHIEVABLE**: Not yet earned, but no required attribute's hard cap is below the threshold.
- **LOCKED**: At least one required attribute has a hard cap below the threshold.

### Cap Feasibility Logic
`canEverAchieve(condition, caps)`:
- EITHER: split by `-or-`, any branch cap-feasible
- AND (uppercase): split by ` AND `, all parts cap-feasible
- -or-: split by `-or-`, any part cap-feasible
- -and-: split by `-and-`, all parts cap-feasible
- Leaf: `N AttrName` → `caps[attrName] >= N`

## Self-Check Traces (Manual Verification)

### Hook Specialist (simple AND), Gold
- **EARNED**: closeShot=92, postHook=91 → both ≥ 90 ✓
- **ACHIEVABLE**: closeShot=85, postHook=88 → both caps=99 → can reach 90 ✓
- **LOCKED**: closeShot=92 (cap=85), postHook=95 → cap 85 < 90 → LOCKED

### Float Game (simple OR), Silver
- **EARNED**: closeShot=87, drivingLayup=50 → one ≥ 85 ✓
- **ACHIEVABLE**: closeShot=80, drivingLayup=80 → both caps=99 → can reach 85 ✓
- **LOCKED**: closeShot=75 (cap=75), drivingLayup=80 (cap=80) → neither can reach 85 → LOCKED

### Boxout Beast (AND-EITHER-or), Silver (80 S, 85 OReb/DReb)
- **EARNED**: strength=85, OReb=90 → Strength≥80 AND (OReb≥85) ✓
- **ACHIEVABLE**: strength=70, OReb=90, DReb=90 → strength<80; caps all 99 ✓
- **LOCKED**: strength=85, OReb caps=80, DReb caps=80 → neither reb can reach 85 → LOCKED

## Implementation Changes

| File | Change |
|------|--------|
| `src/types/index.ts` | Add `Legend` to `Tier`, add `BadgeTierState`, add per-tier/interfaces |
| `src/data/badges.json` | No data changes needed |
| `src/utils/badges.ts` | Fix parsing order; add `canEverAchieve`; emit 3-state per-tier results |
| `src/components/BadgeFeed.tsx` | Consume new tier-state; show LOCKED/ACHIEVABLE states |
| `src/stores/useBuilderStore.ts` | Update type references if needed |
