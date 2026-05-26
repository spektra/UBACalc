import { useState, useRef, useEffect, useMemo } from 'react'
import { useBuilderStore } from '../stores/useBuilderStore'
import { searchBuilds } from '../utils/storage'
import { lbsToWeightClass } from '../utils/caps'

const heights = [
  "5'8\"", "5'9\"", "5'10\"", "5'11\"", "6'0\"", "6'1\"", "6'2\"", "6'3\"",
  "6'4\"", "6'5\"", "6'6\"", "6'7\"", "6'8\"", "6'9\"", "6'10\"", "6'11\"",
  "7'0\"", "7'1\"", "7'2\"", "7'3\"", "7'4\"",
]

const weightClasses = [
  "Very Light", "Light", "Below Average", "Average", "Above Average", "Heavy", "Very Heavy",
]

const archetypes = [
  "Shooting", "Slashing", "Playmaking", "Defense", "Rebounding", "Post Scoring",
]

export function BuildSetupForm() {
  const { build, setBuild, loadPlayerBuild, resetBuild, triggerSave, deletePlayerBuild } = useBuilderStore()
  const [saved, setSaved] = useState(false)
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
    triggerSave()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
    // suggestion updates are now handled by useMemo
  }

  const selectClass = "w-full rounded-xl border border-uba-border/60 bg-uba-surface/80 px-3 py-2.5 text-sm text-uba-text outline-none transition-all duration-200 focus:border-uba-blue/60 focus:shadow-[0_0_12px_-4px_rgba(2,76,166,0.15)] appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22%238A8A92%22%3E%3Cpath%20d%3D%22M7%2010l5%205%205-5z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[right_8px_center] bg-no-repeat pr-8"
  const labelClass = "mb-1.5 block text-xs font-medium uppercase tracking-wider text-uba-text-dim"

  return (
    <div className="group rounded-2xl border border-uba-gold/10 bg-uba-card/80 p-4 sm:p-6 backdrop-blur-sm transition-all duration-300 hover:border-uba-gold/20 hover:shadow-[0_0_30px_-8px_rgba(230,198,147,0.08)]">
      <div className="mb-1 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-uba-gold">
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
              className="absolute z-20 mt-1 w-full overflow-hidden rounded-xl border border-uba-border/60 bg-uba-surface shadow-lg backdrop-blur-xl"
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
              {heights.map((h) => (
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
                {weightClasses.map((w) => (
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
                    setBuild({ weightLbs: raw })
                    const lbs = parseInt(raw, 10)
                    if (!isNaN(lbs) && lbs >= 160 && lbs <= 300) {
                      const klass = lbsToWeightClass(lbs)
                      if (klass) setBuild({ weightClass: klass, weightLbs: raw })
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
            onChange={(e) => setBuild({ primaryArchetype: e.target.value })}
            className={selectClass}
          >
            <option value="">Select</option>
            {archetypes.map((a) => (
              <option key={a} value={a}>{a}</option>
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
              onChange={(e) => setBuild({ secondaryArchetype: e.target.value })}
              className={selectClass}
            >
              <option value="">Select</option>
              {archetypes.map((a) => (
                <option key={a} value={a}>{a}</option>
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
              onChange={(e) => setBuild({ weakness: e.target.value })}
              className={selectClass}
            >
              <option value="">Select</option>
              {archetypes.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-2 pt-1">
          <button
            onClick={handleSave}
            className="flex-1 rounded-xl border border-uba-gold/30 bg-uba-gold/10 px-3 py-2 text-xs font-medium text-uba-gold transition-all duration-200 hover:bg-uba-gold/20 active:scale-[0.98]"
          >
            {saved ? 'Saved!' : 'Save Build'}
          </button>
          <button
            onClick={resetBuild}
            className="rounded-xl border border-uba-border/50 bg-uba-surface/60 px-3 py-2 text-xs text-uba-gold transition-all duration-200 hover:bg-uba-surface active:scale-[0.98]"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}
