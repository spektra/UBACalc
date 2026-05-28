import { useMemo, useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useBuilderStore } from '../stores/useBuilderStore'
import { checkBadges } from '../utils/badges'
import { getAttributeCap } from '../utils/caps'
import badgeDescriptionsData from '../data/badgeDescriptions.json'
import type { BadgeConditionDetail, BadgeTierResult, BadgeTierState, Tier } from '../types'

interface BadgeDescription {
  category: string
  description: string
}

const badgeDescriptions = badgeDescriptionsData as Record<string, BadgeDescription>

const TIER_COLORS: Record<string, string> = {
  Bronze: 'from-amber-700 to-amber-500',
  Silver: 'from-slate-400 to-slate-300',
  Gold: 'from-yellow-600 to-yellow-400',
  HOF: 'from-purple-700 to-purple-400',
  Legend: 'from-red-600 to-amber-400',
}

const TIER_BG: Record<string, string> = {
  Bronze: 'border-amber-700/40 bg-amber-950/20',
  Silver: 'border-slate-400/40 bg-slate-800/20',
  Gold: 'border-yellow-600/40 bg-yellow-950/20',
  HOF: 'border-purple-600/40 bg-purple-950/20',
  Legend: 'border-red-600/40 bg-red-950/20',
}

const BADGE_ATTR_NAMES = [
  'Mid Range', '3PT', 'Driving Layup', 'Driving Dunk', 'Speed With Ball',
  'Pass Accuracy', 'Pass Vision', 'Ball Handle', 'Steal', 'Block',
  'Perimeter Defense', 'Interior Defense', 'Pass Perception',
  'Offensive Rebound', 'Defensive Rebound', 'Standing Dunk', 'Close Shot',
  'Post Hook', 'Post Control', 'Post Fade', 'Speed', 'Agility',
  'Strength', 'Vertical',
]

export function BadgeFeed() {
  const attributes = useBuilderStore((s) => s.attributes)
  const previouslyUnlocked = useBuilderStore((s) => s.previouslyUnlocked)
  const startingValues = useBuilderStore((s) => s.startingValues)
  const build = useBuilderStore((s) => s.build)
  const [showNewOnly, setShowNewOnly] = useState(false)
  const [expandedBadge, setExpandedBadge] = useState<string | null>(null)
  const [sessionUnlocked, setSessionUnlocked] = useState<Set<string>>(new Set())

  const [glowingBadges, setGlowingBadges] = useState<Set<string>>(new Set())
  const [displayBanner, setDisplayBanner] = useState<{ name: string; tier: Tier } | null>(null)
  const prevTiersRef = useRef<Record<string, Tier | null> | null>(null)
  const bannerQueueRef = useRef<{ name: string; tier: Tier }[]>([])
  const bannerTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const nextBannerTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const glowTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const sessionBaselineRef = useRef<Record<string, Tier | null> | null>(null)

  const effectiveAttrs = useMemo(
    () => ({ ...startingValues, ...attributes }),
    [startingValues, attributes],
  )

  const hasAttributes = Object.keys(effectiveAttrs).length > 0

  const caps = useMemo(() => {
    const result: Record<string, number> = {}
    for (const name of BADGE_ATTR_NAMES) {
      result[name] = getAttributeCap(name, build)
    }
    return result
  }, [build])

  const results = useMemo(
    () => checkBadges(effectiveAttrs, caps, previouslyUnlocked),
    [effectiveAttrs, caps, previouslyUnlocked],
  )

  const badgeCount = results.filter((r) => r.highestEarned).length

  const resultsRef = useRef(results)
  resultsRef.current = results

  useEffect(() => {
    const baseline: Record<string, Tier | null> = {}
    for (const r of resultsRef.current) baseline[r.name] = r.highestEarned
    sessionBaselineRef.current = baseline
    setSessionUnlocked(new Set())
  }, [build.playerName, previouslyUnlocked])

  useEffect(() => {
    prevTiersRef.current = null
    setSessionUnlocked(new Set())
  }, [previouslyUnlocked])

  const flushBannerQueue = useCallback(function fn() {
    if (bannerQueueRef.current.length === 0) {
      bannerTimerRef.current = null
      return
    }
    const next = bannerQueueRef.current.shift()!
    setDisplayBanner(next)
    bannerTimerRef.current = setTimeout(() => {
      setDisplayBanner(null)
      nextBannerTimerRef.current = setTimeout(fn, 300)
    }, 3000)
  }, [])

  useEffect(() => {
    const prev = prevTiersRef.current
    const newAchievements: { name: string; tier: Tier }[] = []
    const newRef: Record<string, Tier | null> = {}

    for (const r of results) {
      const prevTier = prev ? prev[r.name] : undefined
      const currTier = r.highestEarned
      newRef[r.name] = currTier
      if (prev !== null && r.newlyUnlocked && r.newlyUnlocked !== prevTier) {
        newAchievements.push({ name: r.name, tier: r.newlyUnlocked })
      }
    }

    if (newAchievements.length > 0) {
      const names = newAchievements.map((a) => a.name)

      setSessionUnlocked((prev) => {
        const next = new Set(prev)
        for (const name of names) next.add(name)
        return next
      })

      setGlowingBadges((current) => {
        const next = new Set(current)
        for (const name of names) next.add(name)
        return next
      })

      if (glowTimerRef.current) clearTimeout(glowTimerRef.current)
      glowTimerRef.current = setTimeout(() => {
        setGlowingBadges((current) => {
          const next = new Set(current)
          for (const name of names) next.delete(name)
          return next
        })
      }, 800)

      const alreadyQueued = new Set(bannerQueueRef.current.map((a) => a.name))
      const deduped = newAchievements.filter((a) => !alreadyQueued.has(a.name))
      if (deduped.length > 0) {
        bannerQueueRef.current.push(...deduped)
        if (!bannerTimerRef.current) flushBannerQueue()
      }
    }

    prevTiersRef.current = newRef
  }, [results, flushBannerQueue])

  useEffect(() => {
    return () => {
      if (bannerTimerRef.current) clearTimeout(bannerTimerRef.current)
      if (nextBannerTimerRef.current) clearTimeout(nextBannerTimerRef.current)
      if (glowTimerRef.current) clearTimeout(glowTimerRef.current)
      bannerTimerRef.current = null
      nextBannerTimerRef.current = null
      glowTimerRef.current = null
    }
  }, [])

  function stateBorder(state: BadgeTierState): string {
    switch (state) {
      case 'LOCKED': return 'border-uba-border/30 bg-uba-surface/20 opacity-50'
      case 'ACHIEVABLE': return 'border-uba-border/40 bg-uba-surface/30'
      default: return ''
    }
  }

  function firstNonEarnedState(trs: { state: BadgeTierState }[]): BadgeTierState | null {
    for (const tr of trs) {
      if (tr.state !== 'EARNED') return tr.state
    }
    return null
  }

  function nextTargetTier(tiers: BadgeTierResult[]): BadgeTierResult {
    return tiers.find((tr) => tr.state !== 'EARNED') ?? tiers[tiers.length - 1]
  }

  function conditionText(condition: BadgeConditionDetail): string {
    if (condition.met) return 'Met'
    if (condition.cappedBelow) return `Cap ${condition.hardCap}`
    return `+${condition.threshold - condition.currentValue} needed`
  }

  function detailId(name: string): string {
    return `badge-detail-${name.replace(/\s+/g, '-').toLowerCase()}`
  }

  if (!hasAttributes) {
    return (
      <div className="premium-card rounded-2xl border border-uba-gold/10 p-4 sm:p-6">
        <div className="mb-1 flex items-center justify-between">
          <h2 className="premium-label text-sm font-bold uppercase text-uba-text-muted">
            Badges
          </h2>
          <div className="h-px flex-1 ml-4 bg-gradient-to-r from-uba-border/40 to-transparent" />
        </div>
        <div className="mt-5 flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-3 text-3xl text-uba-text-dim">◆</div>
          <p className="text-sm text-uba-text-muted">
            Set attribute values to check badge unlocks.
          </p>
          <p className="mt-1 text-xs text-uba-text-dim">
            Bronze · Silver · Gold · HOF · Legend
          </p>
          <p className="mt-3 text-[11px] text-uba-text-dim">
            Once badges appear, click one to view next-tier requirements.
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="premium-card rounded-2xl border border-uba-gold/10 p-4 sm:p-6">
        <div className="mb-1 flex items-center justify-between">
          <h2 className="premium-label text-sm font-bold uppercase text-uba-text-muted">
            Badges
          </h2>
          <div className="flex items-center gap-2">
            <span className="premium-chip rounded-full border border-uba-gold/25 bg-uba-gold/10 px-2 py-0.5 text-xs font-semibold text-uba-gold">{badgeCount} unlocked</span>
            <div className="h-px flex-1 ml-2 bg-gradient-to-r from-uba-border/40 to-transparent" />
          </div>
        </div>

        <div className="mt-4 flex gap-1.5">
          <button
            onClick={() => setShowNewOnly(false)}
            className={`premium-chip rounded-lg px-3 py-1 text-xs font-medium transition-all ${
              !showNewOnly
                ? 'bg-uba-blue/20 text-uba-blue-light'
                : 'text-uba-text-dim hover:text-uba-text-muted'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setShowNewOnly(true)}
            className={`premium-chip rounded-lg px-3 py-1 text-xs font-medium transition-all ${
              showNewOnly
                ? 'bg-uba-gold/20 text-uba-gold'
                : 'text-uba-text-dim hover:text-uba-text-muted'
            }`}
          >
            New unlocks
          </button>
        </div>
        <p className="premium-muted mt-2 text-[11px] leading-relaxed text-uba-text-dim">
          Click any badge row to view next-tier requirements and exact attribute gaps.
        </p>
        <p className="premium-muted mt-1 text-[10px] leading-relaxed text-uba-text-dim/80">
          Badge descriptions are community-sourced and may vary by opinion.
        </p>

        <div className="mt-3 max-h-[60vh] sm:max-h-80 space-y-1.5 overflow-y-auto pr-1">
          <AnimatePresence mode="popLayout">
            {results
              .filter((r) => !showNewOnly || sessionUnlocked.has(r.name))
              .map((r) => {
                const isNew = sessionUnlocked.has(r.name)
                const tier = r.highestEarned
                const fneState = firstNonEarnedState(r.tiers)
                const badgeDescription = badgeDescriptions[r.name]

                return (
                  <motion.div
                    key={r.name}
                    role="button"
                    tabIndex={0}
                    aria-expanded={expandedBadge === r.name}
                    aria-controls={detailId(r.name)}
                    onClick={() => setExpandedBadge((current) => (current === r.name ? null : r.name))}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        setExpandedBadge((current) => (current === r.name ? null : r.name))
                      }
                    }}
                    layout
                    initial={isNew ? { scale: 0.8, opacity: 0, y: -10 } : undefined}
                    animate={isNew ? { scale: 1, opacity: 1, y: 0 } : undefined}
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className={`group cursor-pointer rounded-xl border p-3 outline-none transition-all duration-200 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-uba-gold/60 ${
                      tier
                        ? `${TIER_BG[tier]} ${isNew ? 'ring-2 ring-uba-gold shadow-lg shadow-uba-gold/20' : ''}`
                        : fneState === 'LOCKED'
                          ? stateBorder('LOCKED')
                          : fneState === 'ACHIEVABLE'
                            ? stateBorder('ACHIEVABLE')
                            : 'border-uba-border/40 bg-uba-surface/30'
                    } ${glowingBadges.has(r.name) ? 'badge-pop' : ''}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium ${tier ? 'text-uba-text' : 'text-uba-text-dim'}`}>
                        {r.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="premium-chip rounded-full border border-uba-border/50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-uba-text-dim transition-all group-hover:border-uba-gold/30 group-hover:text-uba-gold">
                          {expandedBadge === r.name ? 'Hide requirements' : 'View requirements'} {expandedBadge === r.name ? '^' : 'v'}
                        </span>
                        {fneState === 'LOCKED' && !tier && (
                          <span className="text-xs text-uba-text-dim" title="Permanently locked due to attribute caps">
                            🔒
                          </span>
                        )}
                        {tier && (
                          <motion.span
                            initial={isNew ? { scale: 0 } : undefined}
                            animate={isNew ? { scale: [0, 1.3, 1] } : undefined}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                            className={`premium-chip rounded-md bg-gradient-to-r ${TIER_COLORS[tier]} px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-black`}
                          >
                            {tier}
                          </motion.span>
                        )}
                      </div>
                    </div>

                    {fneState === 'ACHIEVABLE' && !tier && r.progress > 0 && (
                      <div className="premium-progress-track mt-1.5 h-1 overflow-hidden rounded-full bg-uba-border/40">
                        <motion.div
                          className="premium-progress-fill h-full w-full rounded-full bg-gradient-to-r from-uba-gold to-uba-blue-light"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: r.progress }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </div>
                    )}

                    {tier && isNew && (
                      <motion.div
                        initial={{ opacity: 0, scaleY: 0.85 }}
                        animate={{ opacity: 1, scaleY: 1 }}
                        className="mt-1.5 origin-top text-xs font-medium text-uba-gold/80"
                      >
                        New badge unlocked!
                      </motion.div>
                    )}

                    {expandedBadge === r.name && (() => {
                      const target = nextTargetTier(r.tiers)
                      const complete = r.tiers.every((tr) => tr.state === 'EARNED')
                      const groups = target.requirementGroups.length > 0 ? target.requirementGroups : [target.conditions]

                      return (
                        <div
                          id={detailId(r.name)}
                          className="mt-3 rounded-lg border border-uba-border/50 bg-uba-canvas/50 p-3"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="text-xs font-bold uppercase tracking-[0.14em] text-uba-gold">
                                {complete ? 'Top tier earned' : `Next target: ${target.tier}`}
                              </div>
                              <div className="mt-1 text-[11px] leading-relaxed text-uba-text-dim">
                                {complete ? 'All configured tiers are already unlocked.' : target.threshold}
                              </div>
                            </div>
                            <span className={`premium-chip rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${target.state === 'LOCKED' ? 'border border-uba-danger/30 text-uba-danger' : 'border border-uba-gold/25 text-uba-gold'}`}>
                              {target.state.toLowerCase()}
                            </span>
                          </div>

                          {badgeDescription && (
                            <div className="mt-3 rounded-md border border-uba-gold/15 bg-uba-gold/5 p-2">
                              <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.14em] text-uba-gold/85">
                                {badgeDescription.category}
                              </div>
                              <p className="text-[11px] leading-relaxed text-uba-text-muted">
                                {badgeDescription.description}
                              </p>
                            </div>
                          )}

                          {!complete && groups.map((group, idx) => (
                            <div key={`${target.tier}-${idx}`} className="mt-2 rounded-md border border-uba-border/40 bg-uba-surface/40 p-2">
                              {groups.length > 1 && (
                                <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.12em] text-uba-blue-light">
                                  Option {idx + 1}
                                </div>
                              )}
                              <div className="space-y-1">
                                {group.map((condition) => (
                                  <div key={`${condition.attrName}-${condition.threshold}`} className="flex items-center justify-between gap-2 text-xs">
                                    <span className="text-uba-text-muted">
                                      {condition.attrName} <span className="text-uba-text-dim">{condition.currentValue}/{condition.threshold}</span>
                                    </span>
                                    <span className={condition.met ? 'text-emerald-400' : condition.cappedBelow ? 'text-uba-danger' : 'text-uba-gold'}>
                                      {conditionText(condition)}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )
                    })()}
                  </motion.div>
                )
              })}
          </AnimatePresence>

          {showNewOnly && !results.some((r) => sessionUnlocked.has(r.name)) && (
            <div className="py-8 text-center text-sm text-uba-text-dim">
              No new badges unlocked yet.
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {displayBanner && (
          <motion.div
            key="badge-banner"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 pointer-events-none
              px-5 py-3 rounded-xl border border-uba-gold/30 bg-uba-card/95
              shadow-lg shadow-uba-gold/10 text-sm"
          >
            Badge Unlocked:{' '}
            <span className="text-uba-gold font-semibold">{displayBanner.name}</span>
            {' '}—{' '}
            <span className="font-bold">{displayBanner.tier}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
