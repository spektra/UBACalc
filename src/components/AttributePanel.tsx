// AttributePanel — the core of the calculator. one slider per attribute, caps per build, cost tracking.
// each slider shows: attribute name, start value, current value, upgrade cost, and a revert button.
// there's also a "revert all" button in the header, because sometimes you just want to start over.

import { useMemo, useState, useCallback } from 'react'
import type { CSSProperties } from 'react'
import { motion } from 'framer-motion'
import { useBuilderStore } from '../stores/useBuilderStore'
import { computeUpgradeCost } from '../utils/cost'
import { getAttributeCap, getCapColor } from '../utils/caps'
import attributesData from '../data/attributes.json'
import attributeDescriptionsData from '../data/attributeDescriptions.json'

interface AttrCategory {
  label: string
  color?: string
  _comment?: string
  attributes: { name: string; default: number }[]
}

interface AttributeDescription {
  abbreviation: string
  category: string
  description: string
}

const CAP_COLORS: Record<string, string> = {
  blue: '#2563EB',
  purple: '#7C3AED',
  cyan: '#06B6D4',
  magenta: '#C026D3',
  green: '#16A34A',
  orange: '#F97316',
  red: '#EF4444',
  grey: '#F8FAFC',
  yellow: '#EAB308',
  darkGreen: '#15803D',
  'dark green': '#15803D',
}

export function AttributePanel() {
  const build = useBuilderStore((s) => s.build)
  const attributes = useBuilderStore((s) => s.attributes)
  const setAttribute = useBuilderStore((s) => s.setAttribute)
  const startingValues = useBuilderStore((s) => s.startingValues)
  const setStartingValue = useBuilderStore((s) => s.setStartingValue)
  const resetAttribute = useBuilderStore((s) => s.resetAttribute)
  const resetAllAttributes = useBuilderStore((s) => s.resetAllAttributes)
  const [revertCooldown, setRevertCooldown] = useState(false)
  const [startDrafts, setStartDrafts] = useState<Record<string, string>>({})
  const [openAttributeHelp, setOpenAttributeHelp] = useState<string | null>(null)

  const rawAttrs = attributesData as unknown as Record<string, AttrCategory>
  const attributeDescriptions = attributeDescriptionsData as Record<string, AttributeDescription>
  const categories = Object.entries(rawAttrs).filter(([key]) => key !== '_comment')
  const sharedAttributes = useMemo(() => {
    const counts = new Map<string, number>()

    for (const [, category] of categories) {
      for (const attr of category.attributes) {
        counts.set(attr.name, (counts.get(attr.name) ?? 0) + 1)
      }
    }

    return new Set(
      Array.from(counts.entries())
        .filter(([, count]) => count > 1)
        .map(([name]) => name),
    )
  }, [categories])

  const handleRevertAll = useCallback(() => {
    if (revertCooldown) return
    resetAllAttributes()
    setRevertCooldown(true)
    setTimeout(() => setRevertCooldown(false), 3000)
  }, [revertCooldown, resetAllAttributes])

  function handleStartInput(name: string, raw: string) {
    if (!/^\d*$/.test(raw)) return
    setStartDrafts((drafts) => ({ ...drafts, [name]: raw }))
  }

  function commitStartInput(name: string, raw: string) {
    const val = parseInt(raw, 10)
    if (!isNaN(val)) setStartingValue(name, val)
    setStartDrafts((drafts) => {
      const { [name]: _draft, ...rest } = drafts
      void _draft
      return rest
    })
  }

  function handleSliderInput(name: string, raw: string) {
    const val = parseInt(raw, 10)
    if (isNaN(val)) return
    setAttribute(name, val)
  }

  function attributeHelpId(categoryKey: string, name: string): string {
    return `attr-help-${categoryKey}-${name.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`
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
    <div className="premium-card premium-glass premium-data-card rounded-2xl border border-uba-gold/10 p-4 sm:p-6">
      <div className="mb-1 flex items-center justify-between">
        <h2 className="premium-label text-sm font-bold uppercase text-uba-gold">
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
      <p className="premium-muted mt-2 text-[11px] leading-relaxed text-uba-text-dim">
        Shared attributes use one value and one UC cost everywhere they appear.
      </p>
      <p className="premium-muted mt-1 text-[10px] leading-relaxed text-uba-text-dim/80">
        Badge and attribute descriptions are compiled from community and internet sources, may be debated, and are best used with your own judgement.
      </p>

      <div className="mt-5 space-y-5">
        {categories.map(([key, cat]) => {
          const categoryColor = CAP_COLORS[cat.color ?? 'blue'] ?? CAP_COLORS.blue
          const categoryStyle = {
            color: categoryColor,
            textShadow: `0 0 12px ${categoryColor}66`,
          } as CSSProperties

          return (
          <div key={key}>
            <div className="mb-2 flex items-center gap-2">
              <div
                className="h-2.5 w-2.5 rounded-full shadow-[0_0_14px_var(--category-color)]"
                style={{ '--category-color': categoryColor, backgroundColor: categoryColor } as CSSProperties}
              />
              <h3 className="premium-label text-xs font-bold uppercase" style={categoryStyle}>
                {cat.label}
              </h3>
              <div
                className="h-px flex-1"
                style={{ background: `linear-gradient(to right, ${categoryColor}66, transparent)` }}
              />
            </div>

            <div className="space-y-2.5">
              {cat.attributes.map((attr) => {
                const currentVal = attributes[attr.name] ?? startingValues[attr.name] ?? attr.default
                const startVal = startingValues[attr.name] ?? attr.default
                const startDraft = startDrafts[attr.name]
                const isUpgraded = currentVal > startVal
                const hasCap = !!(build.height || build.weightClass || build.primaryArchetype || build.secondaryArchetype || build.weakness)
                const cap = hasCap ? getAttributeCap(attr.name, build) : 99
                const capColor = hasCap ? getCapColor(attr.name, build) : 'blue'
                const hexColor = CAP_COLORS[capColor] || CAP_COLORS.blue
                const sliderColor = categoryColor
                const upgradeCost = isUpgraded ? computeUpgradeCost(startVal, currentVal) : 0
                const description = attributeDescriptions[attr.name]
                const helpKey = `${key}:${attr.name}`
                const helpOpen = openAttributeHelp === helpKey
                const helpId = attributeHelpId(key, attr.name)

                const startPct = ((startVal - 25) / (cap - 25)) * 100
                const currentPct = ((currentVal - 25) / (cap - 25)) * 100
                const sliderStyle = {
                  '--slider-glow': sliderColor,
                  background: isUpgraded
                    ? `linear-gradient(to right, color-mix(in srgb, ${sliderColor} 58%, white) 0%, ${sliderColor} ${startPct}%, color-mix(in srgb, ${sliderColor} 70%, white) ${startPct}%, color-mix(in srgb, ${sliderColor} 70%, white) ${currentPct}%, var(--uba-track-base) ${currentPct}%)`
                    : `linear-gradient(to right, color-mix(in srgb, ${sliderColor} 64%, white) 0%, ${sliderColor} ${currentPct}%, var(--uba-track-base) ${currentPct}%)`,
                } as CSSProperties

                return (
                  <div key={attr.name}>
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className="text-uba-text-dim [.light_&]:font-semibold">{attr.name}</span>
                        {description && (
                          <button
                            type="button"
                            aria-label={`${helpOpen ? 'Hide' : 'Show'} ${attr.name} description`}
                            aria-expanded={helpOpen}
                            aria-controls={helpId}
                            onClick={() => setOpenAttributeHelp((current) => (current === helpKey ? null : helpKey))}
                            className="premium-chip rounded-full border border-uba-border/50 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-uba-text-dim transition-all hover:border-uba-gold/40 hover:text-uba-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-uba-gold/50"
                            title={`${description.abbreviation}: ${description.description}`}
                          >
                            Info
                          </button>
                        )}
                        {sharedAttributes.has(attr.name) && (
                          <span
                            className="premium-chip rounded-full border border-uba-border/50 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-uba-text-dim"
                            title={`${attr.name} is shared across categories. Editing it here updates the same value everywhere.`}
                          >
                            Shared
                          </span>
                        )}
                        {hasCap && (
                          <span
                            className="premium-chip rounded px-1 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                            style={{ backgroundColor: `${hexColor}20`, color: hexColor }}
                            title={`Attribute cap for ${attr.name} with this build: ${cap}`}
                          >
                            {cap}
                          </span>
                        )}
                        {isUpgraded && (
                          <button
                            onClick={() => resetAttribute(attr.name)}
                            className="rounded p-0.5 text-uba-text-dim transition-all hover:text-uba-danger"
                            title={`Revert ${attr.name} to start`}
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
                            max={cap}
                            value={startDraft ?? startVal}
                            onFocus={(e) => {
                              e.currentTarget.select()
                              setStartDrafts((drafts) => ({ ...drafts, [attr.name]: String(startVal) }))
                            }}
                            onChange={(e) => handleStartInput(attr.name, e.target.value)}
                            onBlur={(e) => commitStartInput(attr.name, e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                commitStartInput(attr.name, e.currentTarget.value)
                                e.currentTarget.blur()
                              } else if (e.key === 'Escape') {
                                setStartDrafts((drafts) => {
                                  const { [attr.name]: _draft, ...rest } = drafts
                                  void _draft
                                  return rest
                                })
                                e.currentTarget.blur()
                              }
                            }}
                            className="w-11 rounded-md border border-uba-border/40 bg-uba-surface/60 px-1 py-0.5 text-center text-xs text-uba-text outline-none transition-all focus:border-uba-blue/60 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                        </div>
                        <span className="text-uba-gold">→</span>
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
                    {description && helpOpen && (
                      <div
                        id={helpId}
                        className="mb-2 rounded-lg border border-uba-gold/15 bg-uba-canvas/45 px-3 py-2 text-[11px] leading-relaxed shadow-inner shadow-black/10"
                      >
                        <div className="mb-1 flex flex-wrap items-center gap-1.5">
                          <span className="premium-chip rounded-md border border-uba-gold/25 bg-uba-gold/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em] text-uba-gold">
                            {description.abbreviation}
                          </span>
                          <span className="text-[10px] uppercase tracking-[0.12em] text-uba-text-dim">
                            {description.category}
                          </span>
                        </div>
                        <p className="text-uba-text-muted">{description.description}</p>
                      </div>
                    )}
                    <input
                      type="range"
                      min={25}
                      max={cap}
                      value={currentVal}
                      onKeyDown={(e) => handleKeyDown(attr.name, e, currentVal)}
                      onChange={(e) => handleSliderInput(attr.name, e.target.value)}
                      data-upgraded={isUpgraded}
                      className="attribute-slider w-full h-1.5 rounded-full appearance-none bg-uba-border/40 outline-none
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
                      style={sliderStyle}
                    />
                  </div>
                )
              })}
            </div>
          </div>
          )
        })}
      </div>
    </div>
  )
}
