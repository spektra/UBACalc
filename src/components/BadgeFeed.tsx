import { useMemo, useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useBuilderStore } from '../stores/useBuilderStore'
import { checkBadges } from '../utils/badges'
import { getAttributeCap } from '../utils/caps'
import type { BadgeTierState, Tier } from '../types'

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
  const { attributes, previouslyUnlocked, startingValues, build } = useBuilderStore()
  const [showNewOnly, setShowNewOnly] = useState(false)
  const [sessionUnlocked, setSessionUnlocked] = useState<Set<string>>(new Set())

  const [glowingBadges, setGlowingBadges] = useState<Set<string>>(new Set())
  const [displayBanner, setDisplayBanner] = useState<{ name: string; tier: Tier } | null>(null)
  const prevTiersRef = useRef<Record<string, Tier | null> | null>(null)
  const bannerQueueRef = useRef<{ name: string; tier: Tier }[]>([])
  const bannerTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
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
      setTimeout(fn, 300)
    }, 3000)
  }, [])

  useEffect(() => {
    const prev = prevTiersRef.current
    const newAchievements: { name: string; tier: Tier }[] = []

    for (const r of results) {
      const prevTier = prev ? prev[r.name] : undefined
      const currTier = r.highestEarned
      if (prev !== null && currTier && currTier !== prevTier) {
        newAchievements.push({ name: r.name, tier: currTier })
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

      setTimeout(() => {
        setGlowingBadges((current) => {
          const next = new Set(current)
          for (const name of names) next.delete(name)
          return next
        })
      }, 800)

      const alreadyQueued = new Set(bannerQueueRef.current.map((a) => a.name))
      const deduped = newAchievements.filter((a) => !alreadyQueued.has(a.name))
      if (deduped.length === 0) return
      bannerQueueRef.current.push(...deduped)
      if (!bannerTimerRef.current) flushBannerQueue()
    }

    const newRef: Record<string, Tier | null> = {}
    for (const r of results) newRef[r.name] = r.highestEarned
    prevTiersRef.current = newRef
  }, [results, flushBannerQueue])

  useEffect(() => {
    return () => {
      if (bannerTimerRef.current) clearTimeout(bannerTimerRef.current)
      bannerTimerRef.current = null
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

  if (!hasAttributes) {
    return (
      <div className="rounded-2xl border border-uba-gold/10 bg-uba-card/80 p-4 sm:p-6 backdrop-blur-sm">
        <div className="mb-1 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-uba-text-muted">
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
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="rounded-2xl border border-uba-gold/10 bg-uba-card/80 p-4 sm:p-6 backdrop-blur-sm">
        <div className="mb-1 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-uba-text-muted">
            Badges
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-xs text-uba-gold">{badgeCount} unlocked</span>
            <div className="h-px flex-1 ml-2 bg-gradient-to-r from-uba-border/40 to-transparent" />
          </div>
        </div>

        <div className="mt-4 flex gap-1.5">
          <button
            onClick={() => setShowNewOnly(false)}
            className={`rounded-lg px-3 py-1 text-xs transition-all ${
              !showNewOnly
                ? 'bg-uba-blue/20 text-uba-blue-light'
                : 'text-uba-text-dim hover:text-uba-text-muted'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setShowNewOnly(true)}
            className={`rounded-lg px-3 py-1 text-xs transition-all ${
              showNewOnly
                ? 'bg-uba-gold/20 text-uba-gold'
                : 'text-uba-text-dim hover:text-uba-text-muted'
            }`}
          >
            New unlocks
          </button>
        </div>

        <div className="mt-3 max-h-[60vh] sm:max-h-80 space-y-1.5 overflow-y-auto pr-1">
          <AnimatePresence mode="popLayout">
            {results
              .filter((r) => !showNewOnly || (
                sessionBaselineRef.current !== null &&
                r.highestEarned !== null &&
                r.highestEarned !== (sessionBaselineRef.current[r.name] ?? null)
              ))
              .map((r) => {
                const isNew = sessionUnlocked.has(r.name)
                const tier = r.highestEarned
                const fneState = firstNonEarnedState(r.tiers)

                return (
                  <motion.div
                    key={r.name}
                    layout
                    initial={isNew ? { scale: 0.8, opacity: 0, y: -10 } : undefined}
                    animate={isNew ? { scale: 1, opacity: 1, y: 0 } : undefined}
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className={`rounded-xl border p-3 transition-all ${
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
                            className={`rounded-md bg-gradient-to-r ${TIER_COLORS[tier]} px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-black`}
                          >
                            {tier}
                          </motion.span>
                        )}
                      </div>
                    </div>

                    {fneState === 'ACHIEVABLE' && !tier && r.progress > 0 && (
                      <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-uba-border/40">
                        <motion.div
                          className="h-full rounded-full bg-uba-blue"
                          initial={{ width: 0 }}
                          animate={{ width: `${r.progress * 100}%` }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </div>
                    )}

                    {tier && isNew && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-1.5 text-xs text-uba-gold/80"
                      >
                        New badge unlocked!
                      </motion.div>
                    )}
                  </motion.div>
                )
              })}
          </AnimatePresence>

          {showNewOnly && !results.some((r) =>
            sessionBaselineRef.current !== null &&
            r.highestEarned !== null &&
            r.highestEarned !== (sessionBaselineRef.current[r.name] ?? null)
          ) && (
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
