// SubmissionOutput — generates formatted upgrade text, shows build rating, and offers copy/share.
// also displays a sassy auto-generated build rating because why not.

import { useMemo, useState } from 'react'
import { useBuilderStore } from '../stores/useBuilderStore'
import { computeAllUpgrades, formatUpgradeText } from '../utils/cost'
import { generateBuildRating } from '../utils/rating'
import { buildShareUrl } from '../utils/share'

export function SubmissionOutput() {
  const { build, attributes, startingValues, ucBalance } = useBuilderStore()
  const [copied, setCopied] = useState(false)
  const [shareCopied, setShareCopied] = useState(false)
  const [copyError, setCopyError] = useState('')

  const upgrades = useMemo(
    () => computeAllUpgrades(startingValues, attributes),
    [startingValues, attributes],
  )

  const text = useMemo(
    () => formatUpgradeText(build.playerName, upgrades),
    [build.playerName, upgrades],
  )

  const totalCost = upgrades.reduce((s, u) => s + u.cost, 0)
  const overBudget = totalCost > ucBalance

  const rating = useMemo(
    () => generateBuildRating(upgrades, totalCost),
    [upgrades, totalCost],
  )

  const shareUrl = useMemo(() => {
    if (!build.playerName.trim()) return ''
    return buildShareUrl(build, startingValues, attributes, ucBalance)
  }, [build, startingValues, attributes, ucBalance])

  const handleCopy = async (textToCopy: string, setter: (v: boolean) => void) => {
    try {
      await navigator.clipboard.writeText(textToCopy)
      setter(true)
      setCopyError('')
      setTimeout(() => setter(false), 2000)
    } catch {
      try {
        const ta = document.createElement('textarea')
        ta.value = textToCopy
        ta.style.position = 'fixed'
        ta.style.opacity = '0'
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        document.body.removeChild(ta)
        setter(true)
        setCopyError('')
        setTimeout(() => setter(false), 2000)
      } catch {
        setCopyError('Clipboard unavailable. Select and copy manually.')
      }
    }
  }

  return (
    <div className="rounded-2xl border border-uba-gold/10 bg-uba-card/80 p-6 backdrop-blur-sm transition-all duration-300 hover:border-uba-gold/20 hover:shadow-[0_0_30px_-8px_rgba(230,198,147,0.08)]">
      <div className="mb-1 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-uba-gold">
          Submission
        </h2>
        <div className="h-px flex-1 ml-4 bg-gradient-to-r from-uba-gold/40 to-transparent" />
      </div>

      {upgrades.length === 0 ? (
        <div className="mt-5 flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-3 text-3xl text-uba-text-dim">{ }</div>
          <p className="text-sm text-uba-gold">
            Adjust attribute sliders above the starting values to generate upgrade text.
          </p>
          <p className="mt-1 text-xs text-uba-text-dim">
            Formatted for copy and paste into the league sheet.
          </p>
        </div>
      ) : (
        <div className="mt-5 space-y-3">
          {overBudget && (
            <div className="rounded-lg border border-uba-danger/30 bg-uba-danger/10 px-3 py-2 text-xs text-uba-danger">
              Over budget by {(totalCost - ucBalance).toLocaleString()} UC
            </div>
          )}

          <div className="rounded-lg border border-uba-gold/20 bg-uba-gold/5 px-3 py-2 text-xs italic text-uba-gold leading-relaxed">
            {rating}
          </div>

          <pre className="overflow-x-auto rounded-xl border border-uba-border/40 bg-uba-surface/60 p-4 font-mono text-sm leading-relaxed text-uba-text whitespace-pre-wrap">
            {text}
          </pre>

          {copyError && (
            <p className="text-xs text-uba-danger">{copyError}</p>
          )}

          <div className="flex gap-2">
            <button
              onClick={() => handleCopy(text, setCopied)}
              className="flex-1 rounded-xl border border-uba-gold/30 bg-uba-gold/10 px-4 py-2.5 text-sm font-medium text-uba-gold transition-all duration-200 hover:bg-uba-gold/20 hover:shadow-[0_0_16px_-4px_rgba(230,198,147,0.2)] active:scale-[0.98]"
            >
              {copied ? 'Copied!' : 'Copy to Clipboard'}
            </button>
            {shareUrl && (
              <button
                onClick={() => handleCopy(shareUrl, setShareCopied)}
                className="rounded-xl border border-uba-border/50 bg-uba-surface/60 px-4 py-2.5 text-sm font-medium text-uba-gold transition-all duration-200 hover:border-uba-blue/30 hover:text-uba-blue-light active:scale-[0.98]"
                title="Copy share link"
              >
                {shareCopied ? 'Link Copied!' : '🔗 Share'}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
