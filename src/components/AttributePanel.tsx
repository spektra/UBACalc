// AttributePanel — the core of the calculator. one slider per attribute, caps per build, cost tracking.
// each slider shows: attribute name, start value, current value, upgrade cost, and a revert button.
// there's also a "revert all" button in the header, because sometimes you just want to start over.

import { useMemo, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useBuilderStore } from '../stores/useBuilderStore'
import { computeUpgradeCost } from '../utils/cost'
import { getAttributeCap, getCapColor } from '../utils/caps'
import attributesData from '../data/attributes.json'

interface AttrCategory {
  label: string
  color?: string
  _comment?: string
  attributes: { name: string; default: number }[]
}

const CAP_COLORS: Record<string, string> = {
  blue: '#024CA6',
  purple: '#8B5CF6',
  magenta: '#D946EF',
  cyan: '#06B6D4',
  green: '#10B981',
  orange: '#F59E0B',
  red: '#EF4444',
  grey: '#6B7280',
  yellow: '#EAB308',
  'dark green': '#047857',
}

export function AttributePanel() {
  const { build, attributes, setAttribute, startingValues, setStartingValue, resetAttribute, resetAllAttributes } = useBuilderStore()
  const [revertCooldown, setRevertCooldown] = useState(false)

  const rawAttrs = attributesData as unknown as Record<string, AttrCategory>
  const categories = Object.entries(rawAttrs).filter(([key]) => key !== '_comment')

  const handleRevertAll = useCallback(() => {
    if (revertCooldown) return
    resetAllAttributes()
    setRevertCooldown(true)
    setTimeout(() => setRevertCooldown(false), 3000)
  }, [revertCooldown, resetAllAttributes])

  function handleStartInput(name: string, raw: string) {
    const val = parseInt(raw, 10)
    if (isNaN(val)) return
    setStartingValue(name, val)
  }

  function handleSliderInput(name: string, raw: string) {
    const val = parseInt(raw, 10)
    if (isNaN(val)) return
    setAttribute(name, val)
  }

  function handleKeyDown(name: string, e: React.KeyboardEvent, currentVal: number) {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault()
      const step = e.shiftKey ? 5 : 1
      setAttribute(name, currentVal - step)
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault()
      const step = e.shiftKey ? 5 : 1
      setAttribute(name, currentVal + step)
    }
  }

  const hasUpgrades = useMemo(() => {
    return Object.entries(attributes).some(([name, val]) => {
      const start = startingValues[name]
      return start !== undefined && val > start
    })
  }, [attributes, startingValues])

  return (
    <div className="rounded-2xl border border-uba-gold/10 bg-uba-card/80 p-6 backdrop-blur-sm transition-all duration-300 hover:border-uba-gold/20 hover:shadow-[0_0_30px_-8px_rgba(230,198,147,0.08)]">
      <div className="mb-1 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-uba-text-muted">
          Attributes
        </h2>
        <div className="flex items-center gap-2">
          {hasUpgrades && (
            <button
              onClick={handleRevertAll}
              disabled={revertCooldown}
              className="rounded-lg border border-uba-border/50 px-2.5 py-1 text-[11px] text-uba-text-dim transition-all hover:border-uba-danger/30 hover:text-uba-danger active:scale-95 disabled:opacity-40"
            >
              {revertCooldown ? 'Wait 3s...' : '↩ All'}
            </button>
          )}
          <div className="h-px w-8 bg-gradient-to-r from-uba-border/40 to-transparent" />
        </div>
      </div>

      <div className="mt-5 space-y-5">
        {categories.map(([key, cat]) => (
          <div key={key}>
            <div className="mb-2 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: CAP_COLORS[cat.color ?? "blue"] }} />
              <h3 className="text-xs font-semibold uppercase tracking-[0.1em] text-uba-text-muted">
                {cat.label}
              </h3>
              <div className="h-px flex-1 bg-gradient-to-r from-uba-border/30 to-transparent" />
            </div>

            <div className="space-y-2.5">
              {cat.attributes.map((attr) => {
                const currentVal = attributes[attr.name] ?? startingValues[attr.name] ?? attr.default
                const startVal = startingValues[attr.name] ?? attr.default
                const isUpgraded = currentVal > startVal
                const hasCap = !!(build.height && build.primaryArchetype)
                const cap = hasCap ? getAttributeCap(attr.name, build) : 99
                const capColor = hasCap ? getCapColor(attr.name, build) : 'blue'
                const hexColor = CAP_COLORS[capColor] || CAP_COLORS.blue
                const upgradeCost = isUpgraded ? computeUpgradeCost(startVal, currentVal) : 0

                const startPct = ((startVal - 25) / (cap - 25)) * 100
                const currentPct = ((currentVal - 25) / (cap - 25)) * 100

                return (
                  <div key={attr.name}>
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className="text-uba-text-dim">{attr.name}</span>
                        {hasCap && (
                          <span
                            className="rounded px-1 py-0.5 text-[10px] font-medium uppercase tracking-wider"
                            style={{ backgroundColor: `${hexColor}20`, color: hexColor }}
                          >
                            {cap}
                          </span>
                        )}
                        {isUpgraded && (
                          <button
                            onClick={() => resetAttribute(attr.name)}
                            className="rounded p-0.5 text-uba-text-dim transition-all hover:text-uba-danger"
                            title="Revert to start"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
                              <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z" clipRule="evenodd" />
                            </svg>
                          </button>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <span className="text-uba-text-dim">Start:</span>
                          <input
                            type="number"
                            min={25}
                            max={99}
                            value={startVal}
                            onChange={(e) => handleStartInput(attr.name, e.target.value)}
                            className="w-11 rounded-md border border-uba-border/40 bg-uba-surface/60 px-1 py-0.5 text-center text-xs text-uba-text outline-none transition-all focus:border-uba-blue/60 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                        </div>
                        <span className="text-uba-text-muted">→</span>
                        <div className="flex items-center gap-1">
                          <span className={`min-w-[1.5rem] text-right font-semibold tabular-nums ${
                            isUpgraded ? 'text-uba-gold' : 'text-uba-text'
                          }`}>
                            {currentVal}
                          </span>
                          {isUpgraded && (
                            <motion.span
                              key={upgradeCost}
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-[10px] text-uba-gold/70 tabular-nums"
                            >
                              (+{upgradeCost.toLocaleString()} UC)
                            </motion.span>
                          )}
                        </div>
                      </div>
                    </div>
                    <input
                      type="range"
                      min={25}
                      max={cap}
                      value={currentVal}
                      onKeyDown={(e) => handleKeyDown(attr.name, e, currentVal)}
                      onChange={(e) => handleSliderInput(attr.name, e.target.value)}
                      className="w-full h-1.5 rounded-full appearance-none bg-uba-border/40 outline-none
                        [&::-webkit-slider-thumb]:appearance-none
                        [&::-webkit-slider-thumb]:h-4
                        [&::-webkit-slider-thumb]:w-4
                        [&::-webkit-slider-thumb]:rounded-full
                        [&::-webkit-slider-thumb]:border-2
                        [&::-webkit-slider-thumb]:border-uba-gold
                        [&::-webkit-slider-thumb]:bg-uba-card
                        [&::-webkit-slider-thumb]:shadow-md
                        [&::-webkit-slider-thumb]:transition-transform
                        [&::-webkit-slider-thumb]:duration-150
                        [&::-webkit-slider-thumb]:hover:scale-110
                        [&::-webkit-slider-thumb]:active:scale-95
                        [&::-moz-range-thumb]:h-4
                        [&::-moz-range-thumb]:w-4
                        [&::-moz-range-thumb]:rounded-full
                        [&::-moz-range-thumb]:border-2
                        [&::-moz-range-thumb]:border-uba-gold
                        [&::-moz-range-thumb]:bg-uba-card
                        [&::-moz-range-thumb]:shadow-md"
                      style={{
                        background: isUpgraded
                          ? `linear-gradient(to right, ${hexColor}40 0%, ${hexColor} ${startPct}%, #E6C693 ${startPct}%, #E6C693 ${currentPct}%, #2A2A32 ${currentPct}%)`
                          : `linear-gradient(to right, ${hexColor} 0%, ${hexColor} ${currentPct}%, #2A2A32 ${currentPct}%)`,
                      }}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
