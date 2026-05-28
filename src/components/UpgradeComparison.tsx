import { useMemo, useState } from 'react'
import { useBuilderStore } from '../stores/useBuilderStore'
import attributesData from '../data/attributes.json'
import { checkBadges } from '../utils/badges'
import { computeAllUpgrades } from '../utils/cost'
import { getAttributeCap } from '../utils/caps'
import { findBadgeUpgradeSuggestion, suggestionTargetKey, type BadgeUpgradeSuggestion } from '../utils/upgradeSuggestion'

interface AttrCategory {
  attributes?: { name: string; default: number }[]
}

const rawAttrs = attributesData as unknown as Record<string, AttrCategory>
const attributeDefaults = new Map<string, number>()
for (const [key, category] of Object.entries(rawAttrs)) {
  if (key === '_comment' || !category.attributes) continue
  for (const attr of category.attributes) {
    if (!attributeDefaults.has(attr.name)) attributeDefaults.set(attr.name, attr.default)
  }
}

const attributeNames = [...attributeDefaults.keys()]

interface UpgradeSnapshot {
  label: string
  attributes: Record<string, number>
  upgrades: ReturnType<typeof computeAllUpgrades>
  totalCost: number
  remaining: number
  newBadges: string[]
}

type Slot = 'A' | 'B'

function summarizeSnapshot(snapshot: UpgradeSnapshot | null, other: UpgradeSnapshot | null) {
  if (!snapshot) return 'Not saved yet'
  if (!other) return `${snapshot.totalCost.toLocaleString()} UC planned`
  const diff = snapshot.totalCost - other.totalCost
  if (diff === 0) return 'Same UC spend'
  return `${Math.abs(diff).toLocaleString()} UC ${diff > 0 ? 'more' : 'less'}`
}

export function UpgradeComparison() {
  const build = useBuilderStore((s) => s.build)
  const attributes = useBuilderStore((s) => s.attributes)
  const startingValues = useBuilderStore((s) => s.startingValues)
  const ucBalance = useBuilderStore((s) => s.ucBalance)
  const previouslyUnlocked = useBuilderStore((s) => s.previouslyUnlocked)
  const setAttribute = useBuilderStore((s) => s.setAttribute)
  const resetAllAttributes = useBuilderStore((s) => s.resetAllAttributes)
  const [snapshots, setSnapshots] = useState<Record<Slot, UpgradeSnapshot | null>>({ A: null, B: null })
  const [suggestion, setSuggestion] = useState<BadgeUpgradeSuggestion | null>(null)
  const [suggestionSearched, setSuggestionSearched] = useState(false)
  const [comparisonBaseline, setComparisonBaseline] = useState<Record<string, number> | null>(null)
  const [excludedSuggestionKeys, setExcludedSuggestionKeys] = useState<string[]>([])
  const [appliedMessage, setAppliedMessage] = useState('')

  const currentAttributeValues = useMemo(() => {
    const values: Record<string, number> = {}
    for (const [name, defaultValue] of attributeDefaults) {
      values[name] = startingValues[name] ?? defaultValue
    }
    return { ...values, ...attributes }
  }, [startingValues, attributes])

  const capMap = useMemo(() => {
    const caps: Record<string, number> = {}
    for (const name of attributeNames) {
      caps[name] = getAttributeCap(name, build)
    }
    return caps
  }, [build])

  const currentUpgrades = useMemo(
    () => computeAllUpgrades(startingValues, attributes),
    [startingValues, attributes],
  )

  const currentTotal = currentUpgrades.reduce((sum, upgrade) => sum + upgrade.cost, 0)
  const remainingBudget = ucBalance - currentTotal
  const hasCurrentPath = currentUpgrades.length > 0

  function captureBaseline() {
    if (comparisonBaseline) return comparisonBaseline
    const baseline = { ...attributes }
    setComparisonBaseline(baseline)
    return baseline
  }

  function restoreAttributes(nextAttributes: Record<string, number>) {
    resetAllAttributes()
    for (const [name, value] of Object.entries(nextAttributes)) {
      setAttribute(name, value)
    }
  }

  function resetToBaseline() {
    restoreAttributes(comparisonBaseline ?? {})
    setSuggestion(null)
    setSuggestionSearched(false)
    setAppliedMessage('')
  }

  function makeSnapshot(label: string): UpgradeSnapshot {
    const badgeResults = checkBadges(currentAttributeValues, capMap, previouslyUnlocked)
    const newBadges = badgeResults
      .filter((badge) => badge.newlyUnlocked)
      .map((badge) => `${badge.name} ${badge.newlyUnlocked}`)

    return {
      label,
      attributes: { ...attributes },
      upgrades: currentUpgrades,
      totalCost: currentTotal,
      remaining: ucBalance - currentTotal,
      newBadges,
    }
  }

  function saveSlot(slot: Slot) {
    if (!hasCurrentPath) return
    const snapshot = makeSnapshot(`Path ${slot}`)
    setSnapshots((current) => ({ ...current, [slot]: snapshot }))
    if (Object.keys(snapshot.attributes).length > 0) {
      setExcludedSuggestionKeys((current) => Array.from(new Set([
        ...current,
        ...(suggestion ? [suggestion.key] : []),
        suggestionTargetKey(snapshot.attributes),
      ])))
    }
    resetToBaseline()
  }

  function restoreSnapshot(snapshot: UpgradeSnapshot) {
    captureBaseline()
    restoreAttributes(snapshot.attributes)
    setSuggestion(null)
    setSuggestionSearched(false)
    setAppliedMessage(`Restored ${snapshot.label}.`)
  }

  function clearSlot(slot: Slot) {
    setSnapshots((current) => ({ ...current, [slot]: null }))
  }

  function findSuggestion() {
    captureBaseline()
    setSuggestionSearched(true)
    setAppliedMessage('')
    const next = findBadgeUpgradeSuggestion({
      attrs: currentAttributeValues,
      caps: capMap,
      previouslyUnlocked,
      remainingBudget,
      excludedKeys: excludedSuggestionKeys,
    })

    if (!next && excludedSuggestionKeys.length > 0) {
      setExcludedSuggestionKeys([])
      setSuggestion(findBadgeUpgradeSuggestion({
        attrs: currentAttributeValues,
        caps: capMap,
        previouslyUnlocked,
        remainingBudget,
      }))
      return
    }

    setSuggestion(next)
  }

  function tryAnotherSuggestion() {
    setSuggestionSearched(true)
    setAppliedMessage('')
    const excluded = suggestion
      ? Array.from(new Set([...excludedSuggestionKeys, suggestion.key]))
      : excludedSuggestionKeys
    setExcludedSuggestionKeys(excluded)
    const next = findBadgeUpgradeSuggestion({
      attrs: currentAttributeValues,
      caps: capMap,
      previouslyUnlocked,
      remainingBudget,
      excludedKeys: excluded,
    })

    if (!next && excluded.length > 0) {
      setExcludedSuggestionKeys([])
      setSuggestion(findBadgeUpgradeSuggestion({
        attrs: currentAttributeValues,
        caps: capMap,
        previouslyUnlocked,
        remainingBudget,
      }))
      return
    }

    setSuggestion(next)
  }

  function applySuggestion() {
    if (!suggestion) return
    captureBaseline()
    for (const [name, target] of Object.entries(suggestion.targets)) {
      setAttribute(name, target)
    }
    setAppliedMessage('Suggestion applied to current build. Save to Path A or B to compare; the current path resets after saving.')
  }

  const slots: Slot[] = ['A', 'B']

  return (
    <section className="premium-card premium-glass rounded-2xl border border-uba-blue/10 bg-uba-card/80 p-4 sm:p-5">
      <div className="mb-1 flex items-center justify-between gap-3">
        <div>
          <h2 className="premium-label text-sm font-bold uppercase text-uba-blue-light">
            Path Compare
          </h2>
          <p className="mt-1 text-xs leading-relaxed text-uba-text-dim">
            Save the current sliders as Path A or B, adjust another route, then compare UC and badge upside.
          </p>
        </div>
        <div className="hidden h-px flex-1 bg-gradient-to-r from-uba-blue/40 to-transparent sm:block" />
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {slots.map((slot) => {
          const snapshot = snapshots[slot]
          const other = snapshots[slot === 'A' ? 'B' : 'A']
          const overBudget = snapshot ? snapshot.remaining < 0 : false
          return (
            <div
              key={slot}
              className="rounded-xl border border-uba-border/60 bg-uba-surface/70 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="premium-label text-[11px] font-bold uppercase tracking-[0.18em] text-uba-gold">
                    Path {slot}
                  </p>
                  <p className="mt-1 text-xs text-uba-text-dim" aria-live="polite">
                    {summarizeSnapshot(snapshot, other)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => saveSlot(slot)}
                  disabled={!hasCurrentPath}
                  className="rounded-lg border border-uba-blue/30 bg-uba-blue/10 px-2.5 py-1.5 text-xs font-semibold text-uba-blue-light transition-all hover:bg-uba-blue/20 focus:outline-none focus:ring-2 focus:ring-uba-blue/40 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Save to Path {slot}
                </button>
              </div>

              {snapshot ? (
                <div className="mt-3 space-y-3">
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="rounded-lg border border-uba-border/40 bg-uba-card/50 px-2 py-2">
                      <div className="text-[10px] uppercase tracking-wider text-uba-text-dim">UC</div>
                      <div className="font-bold tabular-nums text-uba-text">{snapshot.totalCost.toLocaleString()}</div>
                    </div>
                    <div className={`rounded-lg border px-2 py-2 ${overBudget ? 'border-uba-danger/30 bg-uba-danger/10' : 'border-uba-gold/20 bg-uba-gold/5'}`}>
                      <div className="text-[10px] uppercase tracking-wider text-uba-text-dim">Left</div>
                      <div className={`font-bold tabular-nums ${overBudget ? 'text-uba-danger' : 'text-uba-gold'}`}>
                        {snapshot.remaining.toLocaleString()}
                      </div>
                    </div>
                    <div className="rounded-lg border border-uba-border/40 bg-uba-card/50 px-2 py-2">
                      <div className="text-[10px] uppercase tracking-wider text-uba-text-dim">Moves</div>
                      <div className="font-bold tabular-nums text-uba-text">{snapshot.upgrades.length}</div>
                    </div>
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-uba-text-dim">Top upgrades</p>
                    <ul className="mt-1 space-y-1 text-xs text-uba-text-muted">
                      {snapshot.upgrades.slice(0, 3).map((upgrade) => (
                        <li key={upgrade.name} className="flex justify-between gap-2">
                          <span className="truncate">{upgrade.name} {upgrade.from} to {upgrade.to}</span>
                          <span className="shrink-0 tabular-nums text-uba-text-dim">{upgrade.cost.toLocaleString()}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {snapshot.newBadges.length > 0 && (
                    <div className="rounded-lg border border-uba-gold/20 bg-uba-gold/5 px-2.5 py-2">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-uba-gold">New badges</p>
                      <p className="mt-1 text-xs text-uba-text-muted">{snapshot.newBadges.slice(0, 3).join(', ')}</p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => restoreSnapshot(snapshot)}
                      className="flex-1 rounded-lg border border-uba-gold/30 bg-uba-gold/10 px-3 py-2 text-xs font-semibold text-uba-gold transition-all hover:bg-uba-gold/20 focus:outline-none focus:ring-2 focus:ring-uba-gold/40"
                    >
                      Restore Path {slot}
                    </button>
                    <button
                      type="button"
                      onClick={() => clearSlot(slot)}
                      className="rounded-lg border border-uba-border/50 px-3 py-2 text-xs font-semibold text-uba-text-dim transition-all hover:border-uba-danger/40 hover:text-uba-danger focus:outline-none focus:ring-2 focus:ring-uba-danger/30"
                    >
                      Clear Path {slot}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-3 rounded-lg border border-dashed border-uba-border/60 px-3 py-4 text-center text-xs text-uba-text-dim">
                  Move a slider above its start value, then save this slot.
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-4 rounded-xl border border-uba-gold/20 bg-gradient-to-br from-uba-gold/10 via-uba-surface/70 to-uba-blue/10 p-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="premium-label text-[11px] font-bold uppercase tracking-[0.18em] text-uba-gold">
              Badge Upgrade Finder
            </p>
            <p className="mt-1 text-xs leading-relaxed text-uba-text-dim">
              Finds the best single upgrade package that unlocks the most new badge tiers inside your remaining UC.
            </p>
          </div>
          <button
            type="button"
            onClick={findSuggestion}
            disabled={remainingBudget <= 0}
            className="rounded-lg border border-uba-gold/30 bg-uba-gold/10 px-3 py-2 text-xs font-semibold text-uba-gold transition-all hover:bg-uba-gold/20 focus:outline-none focus:ring-2 focus:ring-uba-gold/40 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Find Upgrade
          </button>
        </div>

        <div className="mt-3" aria-live="polite">
          {suggestion ? (
            <div className="space-y-3 rounded-lg border border-uba-border/50 bg-uba-card/60 p-3">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-bold text-uba-text">
                    Aim for {suggestion.targetBadge} {suggestion.targetTier}
                  </p>
                  <p className="mt-1 text-xs text-uba-text-dim">{suggestion.reason}</p>
                </div>
                <div className="text-left text-xs sm:text-right">
                  <div className="font-bold tabular-nums text-uba-gold">{suggestion.cost.toLocaleString()} UC</div>
                  <div className="text-uba-text-dim">{suggestion.remainingAfter.toLocaleString()} left after</div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-uba-text-dim">Suggested moves</p>
                  <ul className="mt-1 space-y-1 text-xs text-uba-text-muted">
                    {Object.entries(suggestion.targets).map(([name, target]) => (
                      <li key={name} className="flex justify-between gap-2">
                        <span>{name}</span>
                        <span className="tabular-nums text-uba-text">{currentAttributeValues[name] ?? 0} to {target}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-uba-text-dim">New badge tiers</p>
                  <p className="mt-1 text-xs text-uba-text-muted">{suggestion.newBadges.slice(0, 4).join(', ')}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={applySuggestion}
                className="w-full rounded-lg border border-uba-blue/30 bg-uba-blue/10 px-3 py-2 text-xs font-semibold text-uba-blue-light transition-all hover:bg-uba-blue/20 focus:outline-none focus:ring-2 focus:ring-uba-blue/40 sm:w-auto"
              >
                Apply to Current Build
              </button>
              <button
                type="button"
                onClick={tryAnotherSuggestion}
                className="w-full rounded-lg border border-uba-border/50 px-3 py-2 text-xs font-semibold text-uba-text-dim transition-all hover:border-uba-gold/30 hover:text-uba-gold focus:outline-none focus:ring-2 focus:ring-uba-gold/30 sm:w-auto"
              >
                Try Another Suggestion
              </button>
            </div>
          ) : suggestionSearched ? (
            <div className="rounded-lg border border-dashed border-uba-border/60 px-3 py-3 text-xs text-uba-text-dim">
              No badge unlock package fits your remaining UC and caps right now.
            </div>
          ) : (
            <p className="text-[11px] text-uba-text-dim">
              Tip: imported or saved owned badges are treated as already owned, so they never inflate recommendations.
            </p>
          )}
        </div>
        {appliedMessage && (
          <p className="mt-3 rounded-lg border border-uba-blue/20 bg-uba-blue/10 px-3 py-2 text-xs text-uba-blue-light" aria-live="polite">
            {appliedMessage}
          </p>
        )}
      </div>

      {!hasCurrentPath && (
        <p className="mt-3 text-[11px] text-uba-text-dim">
          Path saving unlocks after at least one upgrade is planned.
        </p>
      )}
    </section>
  )
}
