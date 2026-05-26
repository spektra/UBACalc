import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useBuilderStore } from '../stores/useBuilderStore'
import { parsePastedAttributes, parsePastedBadges } from '../utils/sheetImport'
import type { Tier } from '../types'
import { checkBadges } from '../utils/badges'

type Tab = 'attributes' | 'badges'

interface Props {
  open: boolean
  onClose: () => void
}

export function SheetImportDrawer({ open, onClose }: Props) {
  const [tab, setTab] = useState<Tab>('attributes')
  const [text, setText] = useState('')
  const [result, setResult] = useState<{ ok: boolean; msg: string } | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { setBuild, setStartingValuesBatch, setPreviouslyUnlockedBatch } = useBuilderStore()

  const handleApply = useCallback(() => {
    if (tab === 'attributes') {
      const parsed = parsePastedAttributes(text)
      if (parsed.parsed === 0) {
        setResult({ ok: false, msg: 'Could not parse any attributes. Try pasting a row of tab-separated numbers.' })
        return
      }
      if (parsed.playerName) {
        setBuild({ playerName: parsed.playerName })
      }
      setStartingValuesBatch(parsed.startingValues)
      const badgeResults = checkBadges(parsed.startingValues, {}, {})
      const ownedBadges: Record<string, Tier> = {}
      for (const r of badgeResults) {
        if (r.newlyUnlocked) ownedBadges[r.name] = r.newlyUnlocked
      }
      if (Object.keys(ownedBadges).length > 0) {
        setPreviouslyUnlockedBatch(ownedBadges)
      }
      setResult({ ok: true, msg: `Imported ${parsed.parsed} attributes for ${parsed.playerName || 'player'} (${parsed.skipped} skipped).` })
    } else {
      const parsed = parsePastedBadges(text)
      const count = Object.keys(parsed).length
      if (count === 0) {
        setResult({ ok: false, msg: 'Could not parse any badges. Try pasting a row of tab-separated tiers (Bronze, Silver, Gold, HOF).' })
        return
      }
      setPreviouslyUnlockedBatch(parsed)
      setResult({ ok: true, msg: `Imported ${count} owned badges.` })
    }
  }, [tab, text, setBuild, setStartingValuesBatch, setPreviouslyUnlockedBatch])

  const handleClose = useCallback(() => {
    onClose()
    setTimeout(() => {
      setText('')
      setResult(null)
    }, 200)
  }, [onClose])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={handleClose}
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 h-full w-full w-full sm:max-w-md border-l border-uba-gold/20 bg-uba-card p-4 sm:p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-uba-text-muted">
                Paste from Sheet
              </h2>
              <button
                onClick={handleClose}
                className="rounded-lg p-1.5 text-uba-text-muted transition-colors hover:bg-uba-surface hover:text-uba-text"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            <div className="mb-4 flex gap-1 rounded-xl bg-uba-surface/60 p-1">
              <button
                onClick={() => { setTab('attributes'); setText(''); setResult(null) }}
                className={`flex-1 rounded-lg py-1.5 text-xs font-medium transition-all ${
                  tab === 'attributes' ? 'bg-uba-card text-uba-text shadow-sm' : 'text-uba-text-muted hover:text-uba-text'
                }`}
              >
                Attributes
              </button>
              <button
                onClick={() => { setTab('badges'); setText(''); setResult(null) }}
                className={`flex-1 rounded-lg py-1.5 text-xs font-medium transition-all ${
                  tab === 'badges' ? 'bg-uba-card text-uba-text shadow-sm' : 'text-uba-text-muted hover:text-uba-text'
                }`}
              >
                Badges
              </button>
            </div>

            {tab === 'attributes' ? (
              <p className="mb-4 text-xs leading-relaxed text-uba-text-muted">
                Copy a row from your league sheet and paste it below. First column is player name, followed by attribute values in sheet order.
              </p>
            ) : (
              <p className="mb-4 text-xs leading-relaxed text-uba-text-muted">
                Copy a row from your league badge sheet and paste it below. First column is player name, then badge tiers (Bronze, Silver, Gold, HOF). Leave blank for unowned.
              </p>
            )}

            <textarea
              ref={textareaRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={tab === 'attributes'
                ? "Paste your data here...\n\nExample:\nPlayerName\t75\t60\t70\t65\t80..."
                : "Paste badge data here...\n\nExample:\nPlayerName\tGold\t\tSilver\tBronze..."
              }
              rows={tab === 'badges' ? 4 : 6}
              className="w-full resize-none rounded-xl border border-uba-border/60 bg-uba-surface/60 p-3 text-sm text-uba-text placeholder:text-uba-text-muted/40 focus:border-uba-gold/40 focus:outline-none focus:ring-1 focus:ring-uba-gold/30"
            />

            {result && (
              <div
                className={`mt-3 rounded-xl px-3 py-2 text-xs ${
                  result.ok
                    ? 'bg-green-900/20 text-green-400'
                    : 'bg-red-900/20 text-red-400'
                }`}
              >
                {result.msg}
              </div>
            )}

            <button
              onClick={handleApply}
              disabled={!text.trim()}
              className="mt-4 w-full rounded-xl bg-uba-gold py-2.5 text-sm font-semibold text-black transition-all hover:bg-uba-gold/90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Apply Import
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
