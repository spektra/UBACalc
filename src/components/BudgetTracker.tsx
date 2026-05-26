// BudgetTracker — the UC budget panel. shows balance, total spend, remaining, and a progress bar.
// turns red when you're over budget, because panic is the mother of all financial decisions.

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useBuilderStore } from '../stores/useBuilderStore'
import { computeAllUpgrades } from '../utils/cost'

export function BudgetTracker() {
  const { ucBalance, setUCBalance, attributes, startingValues } = useBuilderStore()

  const upgrades = useMemo(
    () => computeAllUpgrades(startingValues, attributes),
    [startingValues, attributes],
  )
  const totalCost = upgrades.reduce((s, u) => s + u.cost, 0)
  const remaining = ucBalance - totalCost
  const pct = ucBalance > 0 ? Math.min((totalCost / ucBalance) * 100, 100) : 0
  const overBudget = remaining < 0

  function handleUCInput(raw: string) {
    const cleaned = raw.replace(/[^0-9]/g, '')
    if (cleaned === '') {
      setUCBalance(0)
      return
    }
    setUCBalance(parseInt(cleaned, 10))
  }

  return (
    <div className="rounded-2xl border border-uba-gold/10 bg-uba-card/80 p-4 sm:p-6 backdrop-blur-sm transition-all duration-300 hover:border-uba-gold/20 hover:shadow-[0_0_30px_-8px_rgba(230,198,147,0.08)]">
      <div className="mb-1 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-uba-gold">
          UC Budget
        </h2>
        <div className="h-px flex-1 ml-4 bg-gradient-to-r from-uba-gold/40 to-transparent" />
      </div>

      <div className="mt-5 flex flex-col sm:flex-row flex-wrap items-end gap-3">
        <div className="min-w-[140px] flex-1">
          <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-uba-text-dim">
            Current Balance
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-uba-text-dim">UC</span>
            <input
              type="text"
              inputMode="numeric"
              value={ucBalance || ''}
              onChange={(e) => handleUCInput(e.target.value)}
              placeholder="0"
              min={0}
              max={999999}
              className="w-full rounded-xl border border-uba-border/60 bg-uba-surface/80 py-2.5 pl-9 pr-4 text-sm text-uba-text placeholder:text-uba-text-dim/40 outline-none transition-all duration-200 focus:border-uba-blue/60 focus:shadow-[0_0_12px_-4px_rgba(2,76,166,0.15)] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
        </div>

        <div className="rounded-xl border border-uba-border/60 bg-uba-surface/80 px-4 py-2.5 text-center">
          <div className="text-[11px] font-medium uppercase tracking-wider text-uba-text-dim">Spent</div>
          <div className="text-base font-bold text-uba-text tabular-nums">{totalCost.toLocaleString()}</div>
        </div>

        <div className={`rounded-xl border px-4 py-2.5 text-center transition-colors ${
          overBudget
            ? 'border-uba-danger/30 bg-uba-danger/10'
            : 'border-uba-gold/20 bg-uba-gold/5'
        }`}>
          <div className="text-[11px] font-medium uppercase tracking-wider text-uba-gold">Remaining</div>
          <div className={`text-base font-bold tabular-nums ${overBudget ? 'text-uba-danger' : 'text-uba-gold'}`}>
            {remaining.toLocaleString()}
          </div>
        </div>
      </div>

      {overBudget && (
        <div className="mt-2 rounded-lg border border-uba-danger/30 bg-uba-danger/10 px-3 py-1.5 text-xs text-uba-danger">
          Over budget by {(totalCost - ucBalance).toLocaleString()} UC
        </div>
      )}

      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-uba-border/40">
        <motion.div
          className={`h-full rounded-full transition-colors ${
            overBudget ? 'bg-uba-danger' : 'bg-gradient-to-r from-uba-blue to-uba-gold'
          }`}
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  )
}
