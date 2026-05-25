import { useMemo, useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useBuilderStore } from '../stores/useBuilderStore'
import { checkBadges } from '../utils/badges'
import type { Tier } from '../types'

const TIER_COLORS: Record<Tier, string> = {
  Bronze: 'from-amber-700 to-amber-500',
  Silver: 'from-slate-400 to-slate-300',
  Gold: 'from-yellow-600 to-yellow-400',
  HOF: 'from-purple-700 to-purple-400',
}

const TIER_BG: Record<Tier, string> = {
  Bronze: 'border-amber-700/40 bg-amber-950/20',
  Silver: 'border-slate-400/40 bg-slate-800/20',
  Gold: 'border-yellow-600/40 bg-yellow-950/20',
  HOF: 'border-purple-600/40 bg-purple-950/20',
}

export function BadgeFeed() {
  const { attributes, previouslyUnlocked } = useBuilderStore()
  const [showNewOnly, setShowNewOnly] = useState(false)
  const [justUnlocked, setJustUnlocked] = useState<string[]>([])
  const prevResultsRef = useRef<Set<string>>(new Set())

  const hasAttributes = Object.keys(attributes).length > 0

  const results = useMemo(
    () => checkBadges(attributes, previouslyUnlocked),
    [attributes, previouslyUnlocked],
  )

  const unlocked = useMemo(
    () => results.filter((r) => r.newlyUnlocked !== null),
    [results],
  )

  const badgeCount = results.filter((r) => r.newlyUnlocked).length

  useEffect(() => {
    const current = new Set(results.filter((r) => r.newlyUnlocked).map((r) => r.name))
    const prev = prevResultsRef.current

    if (prev.size > 0) {
      const newOnes = [...current].filter((n) => !prev.has(n))
      if (newOnes.length > 0) {
        setJustUnlocked((old) => [...newOnes, ...old])
        setTimeout(() => setJustUnlocked([]), 3000)
      }
    }

    prevResultsRef.current = current
  }, [results])

  if (!hasAttributes) {
    return (
      <div className="rounded-2xl border border-uba-border/60 bg-uba-card/80 p-6 backdrop-blur-sm">
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
            Bronze · Silver · Gold · HOF
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-uba-border/60 bg-uba-card/80 p-6 backdrop-blur-sm">
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

      <div className="mt-3 max-h-80 space-y-1.5 overflow-y-auto pr-1">
        <AnimatePresence mode="popLayout">
          {results
            .filter((r) => !showNewOnly || r.newlyUnlocked)
            .map((r) => {
              const isNew = justUnlocked.includes(r.name)
              const tier = r.newlyUnlocked

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
                      : 'border-uba-border/40 bg-uba-surface/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium ${tier ? 'text-uba-text' : 'text-uba-text-dim'}`}>
                      {r.name}
                    </span>
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

                  {r.progress > 0 && !tier && (
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

        {showNewOnly && unlocked.length === 0 && (
          <div className="py-8 text-center text-sm text-uba-text-dim">
            No new badges unlocked yet.
          </div>
        )}
      </div>
    </div>
  )
}
