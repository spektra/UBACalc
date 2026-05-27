import { useState, useRef, useEffect, useMemo } from 'react'
import { useBuilderStore } from '../stores/useBuilderStore'
import { searchBuilds } from '../utils/storage'
import { lbsToWeightClass } from '../utils/caps'
import buildOptions from '../data/buildOptions.json'

const { heights, weightClasses, archetypes } = buildOptions

export function BuildSetupForm() {
  const build = useBuilderStore((s) => s.build)
  const setBuild = useBuilderStore((s) => s.setBuild)
  const loadPlayerBuild = useBuilderStore((s) => s.loadPlayerBuild)
  const resetBuild = useBuilderStore((s) => s.resetBuild)
  const triggerSave = useBuilderStore((s) => s.triggerSave)
  const deletePlayerBuild = useBuilderStore((s) => s.deletePlayerBuild)
  const clearPlayerHistory = useBuilderStore((s) => s.clearPlayerHistory)
  const [saved, setSaved] = useState(false)
  const [historyCleared, setHistoryCleared] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const suggestions = useMemo(() => {
    if (!build.playerName.trim()) return []
    return searchBuilds(build.playerName).map((b: { playerName: string }) => b.playerName)
  }, [build.playerName])

  const showDropdown = suggestions.length > 0 && !dismissed

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node) &&
          inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setDismissed(true)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function handleSelect(name: string) {
    loadPlayerBuild(name)
  }

  function handleSave() {
    if (!build.playerName.trim()) return
    triggerSave(true)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
    // suggestion updates are now handled by useMemo
  }

  function handleClearPlayerHistory() {
    const confirmed = window.confirm(
      'Clear all saved player/build history from this browser? This cannot be undone.',
    )
    if (!confirmed) return
    clearPlayerHistory()
    setDismissed(true)
    setHistoryCleared(true)
    setTimeout(() => setHistoryCleared(false), 2500)
  }

  function handleArchetypeChange(field: 'primaryArchetype' | 'secondaryArchetype' | 'weakness', value: string) {
    setBuild({
      [field]: value,
      ...(field !== 'primaryArchetype' && build.primaryArchetype === value ? { primaryArchetype: '' } : {}),
      ...(field !== 'secondaryArchetype' && build.secondaryArchetype === value ? { secondaryArchetype: '' } : {}),
      ...(field !== 'weakness' && build.weakness === value ? { weakness: '' } : {}),
    })
  }

  function isArchetypeUsedElsewhere(field: 'primaryArchetype' | 'secondaryArchetype' | 'weakness', value: string) {
    if (!value) return false
    return (field !== 'primaryArchetype' && build.primaryArchetype === value) ||
      (field !== 'secondaryArchetype' && build.secondaryArchetype === value) ||
      (field !== 'weakness' && build.weakness === value)
  }

  const selectClass = "w-full rounded-xl border border-uba-border/60 bg-uba-surface/80 px-3 py-2.5 text-sm font-medium text-uba-text outline-none transition-all duration-200 focus:border-uba-gold/70 focus:shadow-[0_0_18px_-5px_rgba(242,211,153,0.45)] appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22%238A8A92%22%3E%3Cpath%20d%3D%22M7%2010l5%205%205-5z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[right_8px_center] bg-no-repeat pr-8"
  const labelClass = "premium-label mb-1.5 block text-xs font-semibold uppercase text-uba-text-dim"

  return (
    <div className="premium-card premium-glass group rounded-2xl border border-uba-gold/10 p-4 sm:p-6">
      <div className="mb-1 flex items-center justify-between">
        <h2 className="premium-label text-sm font-bold uppercase text-uba-gold">
          Build Setup
        </h2>
        <div className="h-px flex-1 ml-4 bg-gradient-to-r from-uba-border/40 to-transparent" />
      </div>

      <div className="mt-5 space-y-4">
        <div className="relative">
          <label htmlFor="playerName" className={labelClass}>
            Player Name
          </label>
          <input
            ref={inputRef}
            id="playerName"
            type="text"
            value={build.playerName}
            onChange={(e) => setBuild({ playerName: e.target.value })}
            onFocus={() => setDismissed(false)}
            placeholder="Enter player name (auto-loads saved builds)..."
            maxLength={40}
            className="w-full rounded-xl border border-uba-border/60 bg-uba-surface/80 px-4 py-2.5 text-sm text-uba-text placeholder:text-uba-text-dim/40 outline-none transition-all duration-200 focus:border-uba-blue/60 focus:shadow-[0_0_12px_-4px_rgba(2,76,166,0.15)]"
          />
          {showDropdown && (
            <div
              ref={dropdownRef}
               className="absolute z-20 mt-1 w-full overflow-hidden rounded-xl border border-uba-border/60 bg-uba-surface shadow-lg shadow-black/30"
            >
              {suggestions.map((name) => (
                <div
                  key={name}
                  className="group/item flex items-center justify-between px-4 py-2.5 transition-colors hover:bg-uba-blue/10"
                >
                  <button
                    onClick={() => handleSelect(name)}
                    className="flex-1 text-left text-sm text-uba-text truncate"
                  >
                    {name}
                  </button>
                  <button
                    type="button"
                    tabIndex={-1}
                    aria-label={`Delete ${name}`}
                    title={`Delete ${name}`}
                    onClick={(e) => { e.stopPropagation(); deletePlayerBuild(name); }}
                    className="ml-2 rounded p-1 text-uba-text-dim opacity-0 transition-all group-hover/item:opacity-100 hover:opacity-100 hover:text-uba-danger focus:opacity-100 focus:text-uba-danger"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                      <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c-.84 0-1.673.025-2.5.075V3.75c0-.69.56-1.25 1.25-1.25h2.5c.69 0 1.25.56 1.25 1.25v.325C11.673 4.025 10.84 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="height" className={labelClass}>
              Height
            </label>
            <select
              id="height"
              value={build.height}
              onChange={(e) => setBuild({ height: e.target.value })}
              className={selectClass}
            >
              <option value="">Select</option>
            {heights.map((h: string) => (
              <option key={h} value={h}>{h}</option>
            ))}
            </select>
          </div>
          <div>
            <label htmlFor="weight" className={labelClass}>
              Weight
            </label>
              <div className="flex gap-2">
              <select
                id="weight"
                value={build.weightClass}
                onChange={(e) => {
                  setBuild({ weightClass: e.target.value, weightLbs: '' })
                }}
                className={selectClass + " flex-1"}
              >
                <option value="">Select</option>
                {weightClasses.map((w: string) => (
                  <option key={w} value={w}>{w}</option>
                ))}
              </select>
              <div className="flex items-center gap-1 rounded-xl border border-uba-border/60 bg-uba-surface/80 px-2.5">
                <input
                  type="number"
                  min={160}
                  max={300}
                  value={build.weightLbs}
                  onChange={(e) => {
                    const raw = e.target.value
                    const lbs = parseInt(raw, 10)
                    if (!isNaN(lbs) && lbs >= 160 && lbs <= 300) {
                      const klass = lbsToWeightClass(lbs)
                      if (klass) setBuild({ weightClass: klass, weightLbs: raw })
                    } else {
                      setBuild({ weightLbs: raw })
                    }
                  }}
                  placeholder="lbs"
                  className="w-14 rounded-md bg-transparent py-2.5 text-sm text-uba-text placeholder:text-uba-text-dim/40 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="text-xs text-uba-text-dim">lbs</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="primary" className={labelClass}>
            Primary Strength
          </label>
          <select
            id="primary"
            value={build.primaryArchetype}
            onChange={(e) => handleArchetypeChange('primaryArchetype', e.target.value)}
            className={selectClass}
          >
            <option value="">Select</option>
            {archetypes.map((a: string) => (
              <option key={a} value={a} disabled={isArchetypeUsedElsewhere('primaryArchetype', a)}>{a}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="secondary" className={labelClass}>
              Secondary
            </label>
            <select
              id="secondary"
              value={build.secondaryArchetype}
              onChange={(e) => handleArchetypeChange('secondaryArchetype', e.target.value)}
              className={selectClass}
            >
              <option value="">Select</option>
              {archetypes.map((a: string) => (
                <option key={a} value={a} disabled={isArchetypeUsedElsewhere('secondaryArchetype', a)}>{a}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="weakness" className={labelClass}>
              Weakness
            </label>
            <select
              id="weakness"
              value={build.weakness}
              onChange={(e) => handleArchetypeChange('weakness', e.target.value)}
              className={selectClass}
            >
              <option value="">Select</option>
              {archetypes.map((a: string) => (
                <option key={a} value={a} disabled={isArchetypeUsedElsewhere('weakness', a)}>{a}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-2 pt-1">
          <button
            onClick={handleSave}
            className="premium-chip flex-1 rounded-xl border border-uba-gold/30 bg-uba-gold/10 px-3 py-2 text-xs font-semibold text-uba-gold transition-all duration-200 hover:bg-uba-gold/20 active:scale-[0.98]"
          >
            {saved ? 'Saved!' : 'Save Build'}
          </button>
          <button
            onClick={resetBuild}
            className="rounded-xl border border-uba-border/50 bg-uba-surface/60 px-3 py-2 text-xs font-medium text-uba-gold transition-all duration-200 hover:bg-uba-surface active:scale-[0.98]"
          >
            Reset
          </button>
        </div>

        <div className="rounded-xl border border-uba-danger/25 bg-uba-danger/5 p-3">
          <button
            type="button"
            onClick={handleClearPlayerHistory}
            className="w-full rounded-lg border border-uba-danger/40 bg-uba-danger/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-uba-danger transition-all duration-200 hover:bg-uba-danger/20 hover:shadow-[0_0_16px_-6px_rgba(239,68,68,0.55)] active:scale-[0.98]"
          >
            {historyCleared ? 'Saved Player History Cleared' : 'Clear All Saved Player History'}
          </button>
          <p className="mt-2 text-[11px] leading-relaxed text-uba-text-dim">
            Removes every saved player/build from this browser only. Current sliders stay on screen until you reset or load another build.
          </p>
        </div>
      </div>
    </div>
  )
}
