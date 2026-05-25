# UBA Upgrade Calculator — Agent Guide

## Project state

Pre-code planning phase. All source of truth is in `docs/`. Read these before any codegen:

1. `docs/uba_calculator_plan.md` — master plan, features, phases
2. `docs/uba_attribute_caps.md` — cap system, archetype categories, height/weight matrices
3. `docs/uba_badge_thresholds.csv` — badge unlock thresholds by tier (Bronze–HOF)

## Tech stack (settled — do not debate)

| Layer | Choice |
|---|---|
| Framework | React + TypeScript + Vite |
| Styling | Tailwind CSS |
| State | Zustand |
| Config data | Flat JSON files (badges, attributes, caps, cost scale) |
| Hosting | Cloudflare Pages (domain TBD) |

No backend. Fully client-side. All logic in JSON config + TypeScript utilities.

## Non-negotiable constraints

- **Never hardcode badge thresholds or cap values** into components. Always read from JSON config files.
- All cap calculation logic must derive from the three inputs: Height, Weight, Archetype (Primary / Secondary / Weakness), following the rules in `docs/uba_attribute_caps.md`.

## Before writing any code

The plan doc lists 13 questions that must be answered first (domain, archetypes, height/weight tables, badge data, starting values, tendencies, save/load, multi-player, theme, mobile support). Do not skip this step.

## Phased delivery

Follow the phases in `docs/uba_calculator_plan.md#phased-build-plan` strictly:
- Phase 1 (MVP): build setup form, attribute sliders, UC tracker, badge detection, submission output
- Phase 2: polish (animations, progress indicators, color-coded categories, mobile responsiveness)
- Phase 3: advanced (save/load, multi-player, session history, tendencies)

## Data files

Create these flat JSON files under `src/data/` (never hardcode in components):
- `badges.json` — badge names + thresholds per tier
- `attributes.json` — attribute names, categories, defaults
- `caps.json` — height / weight / archetype cap tables
- `costScale.json` — UC cost per bracket

## No CI, build config, or tests exist yet

Vite scaffold will happen at the start of Phase 1. Standard `npm create vite` setup expected.
