// BuildSetupForm — the setup panel where players enter their name, height, weight, and archetypes.
// also handles loading saved builds and saving the current one.
// the autocomplete dropdown is held together by duct tape but it works.

import { useState, useRef, useEffect } from 'react'
import { useBuilderStore } from '../stores/useBuilderStore'
import { searchBuilds } from '../utils/storage'

const heights = [
  "5'8\"", "5'9\"", "5'10\"", "5'11\"", "6'0\"", "6'1\"", "6'2\"", "6'3\"",
  "6'4\"", "6'5\"", "6'6\"", "6'7\"", "6'8\"", "6'9\"", "6'10\"", "6'11\"",
  "7'0\"", "7'1\"", "7'2\"", "7'3\"", "7'4\"",
]

const weightClasses = [
  "Very Light", "Light", "Average", "Above Average", "Heavy", "Very Heavy",
]

const archetypes = [
  "Shooting", "Slashing", "Playmaking", "Defense", "Rebounding", "Post Scoring",
]

export function BuildSetupForm() {
  const { build, setBuild, loadPlayerBuild, resetBuild, triggerSave } = useBuilderStore()
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [saved, setSaved] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!build.playerName.trim()) {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }
    const matches = searchBuilds(build.playerName).map((b) => b.playerName)
    setSuggestions(matches)
    setShowSuggestions(matches.length > 0)
  }, [build.playerName])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node) &&
          inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function handleSelect(name: string) {
    loadPlayerBuild(name)
    setSuggestions([])
    setShowSuggestions(false)
  }

  function handleSave() {
    if (!build.playerName.trim()) return
    triggerSave()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="group rounded-2xl border border-uba-border/60 bg-uba-card/80 p-6 backdrop-blur-sm transition-all duration-300 hover:border-uba-gold/20 hover:shadow-[0_0_30px_-8px_rgba(230,198,147,0.08)]">
      <div className="mb-1 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-uba-text-muted">
          Build Setup
        </h2>
        <div className="h-px flex-1 ml-4 bg-gradient-to-r from-uba-border/40 to-transparent" />
      </div>

      <div className="mt-5 space-y-4">
        <div className="relative">
          <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-uba-text-dim">
            Player Name
          </label>
          <input
            ref={inputRef}
            type="text"
            value={build.playerName}
            onChange={(e) => setBuild({ playerName: e.target.value })}
            onFocus={() => build.playerName.trim() && setSuggestions(searchBuilds(build.playerName).map(b => b.playerName))}
            placeholder="Enter player name (auto-loads saved builds)..."
            maxLength={40}
            className="w-full rounded-xl border border-uba-border/60 bg-uba-surface/80 px-4 py-2.5 text-sm text-uba-text placeholder:text-uba-text-dim/40 outline-none transition-all duration-200 focus:border-uba-blue/60 focus:shadow-[0_0_12px_-4px_rgba(2,76,166,0.15)]"
          />
          {showSuggestions && suggestions.length > 0 && (
            <div
              ref={dropdownRef}
              className="absolute z-20 mt-1 w-full overflow-hidden rounded-xl border border-uba-border/60 bg-uba-surface shadow-lg backdrop-blur-xl"
            >
              {suggestions.map((name) => (
                <button
                  key={name}
                  onClick={() => handleSelect(name)}
                  className="w-full px-4 py-2.5 text-left text-sm text-uba-text transition-colors hover:bg-uba-blue/10"
                >
                  {name}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-uba-text-dim">
              Height
            </label>
            <select
              value={build.height}
              onChange={(e) => setBuild({ height: e.target.value })}
              className="w-full rounded-xl border border-uba-border/60 bg-uba-surface/80 px-3 py-2.5 text-sm text-uba-text outline-none transition-all duration-200 focus:border-uba-blue/60 focus:shadow-[0_0_12px_-4px_rgba(2,76,166,0.15)] appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22%238A8A92%22%3E%3Cpath%20d%3D%22M7%2010l5%205%205-5z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[right_8px_center] bg-no-repeat pr-8"
            >
              <option value="">Select</option>
              {heights.map((h) => (
                <option key={h} value={h}>{h}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-uba-text-dim">
              Weight
            </label>
            <select
              value={build.weightClass}
              onChange={(e) => setBuild({ weightClass: e.target.value })}
              className="w-full rounded-xl border border-uba-border/60 bg-uba-surface/80 px-3 py-2.5 text-sm text-uba-text outline-none transition-all duration-200 focus:border-uba-blue/60 focus:shadow-[0_0_12px_-4px_rgba(2,76,166,0.15)] appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22%238A8A92%22%3E%3Cpath%20d%3D%22M7%2010l5%205%205-5z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[right_8px_center] bg-no-repeat pr-8"
            >
              <option value="">Select</option>
              {weightClasses.map((w) => (
                <option key={w} value={w}>{w}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-uba-text-dim">
            Primary Strength
          </label>
          <select
            value={build.primaryArchetype}
            onChange={(e) => setBuild({ primaryArchetype: e.target.value })}
            className="w-full rounded-xl border border-uba-border/60 bg-uba-surface/80 px-3 py-2.5 text-sm text-uba-text outline-none transition-all duration-200 focus:border-uba-blue/60 focus:shadow-[0_0_12px_-4px_rgba(2,76,166,0.15)] appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22%238A8A92%22%3E%3Cpath%20d%3D%22M7%2010l5%205%205-5z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[right_8px_center] bg-no-repeat pr-8"
          >
            <option value="">Select</option>
            {archetypes.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-uba-text-dim">
              Secondary
            </label>
            <select
              value={build.secondaryArchetype}
              onChange={(e) => setBuild({ secondaryArchetype: e.target.value })}
              className="w-full rounded-xl border border-uba-border/60 bg-uba-surface/80 px-3 py-2.5 text-sm text-uba-text outline-none transition-all duration-200 focus:border-uba-blue/60 focus:shadow-[0_0_12px_-4px_rgba(2,76,166,0.15)] appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22%238A8A92%22%3E%3Cpath%20d%3D%22M7%2010l5%205%205-5z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[right_8px_center] bg-no-repeat pr-8"
            >
              <option value="">Select</option>
              {archetypes.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-uba-text-dim">
              Weakness
            </label>
            <select
              value={build.weakness}
              onChange={(e) => setBuild({ weakness: e.target.value })}
              className="w-full rounded-xl border border-uba-border/60 bg-uba-surface/80 px-3 py-2.5 text-sm text-uba-text outline-none transition-all duration-200 focus:border-uba-blue/60 focus:shadow-[0_0_12px_-4px_rgba(2,76,166,0.15)] appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22%238A8A92%22%3E%3Cpath%20d%3D%22M7%2010l5%205%205-5z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[right_8px_center] bg-no-repeat pr-8"
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
            className="rounded-xl border border-uba-border/50 bg-uba-surface/60 px-3 py-2 text-xs text-uba-text-muted transition-all duration-200 hover:bg-uba-surface active:scale-[0.98]"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}
