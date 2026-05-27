# Regression Guardrails

These are project-specific things that were already working and should not be changed casually.

## Badge Ownership

- Imported or saved owned badges are keyed by badge name, not attribute name.
- Attribute values are keyed by attribute name.
- Do not reuse the attribute allowlist for badge history validation.
- `previouslyUnlocked` must survive import, save, load, and share-safe validation so already-owned badges do not appear as new submission unlocks.
- Add or update a unit test before touching badge-history sanitization, import replacement, save/load normalization, or `checkBadges` newly-unlocked logic.

## Safe Change Rule

If a hardening/performance change filters, normalizes, or batches existing state, verify that existing league workflows still round-trip:

- import documented sample attributes and badges
- save and reload owned badges
- generate submission text without listing already-owned badges as new

Prefer small allowlist-specific helpers over generic validators when different data shapes use different keys.
