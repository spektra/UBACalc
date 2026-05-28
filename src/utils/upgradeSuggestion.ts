import type { BadgeResult, BadgeTierResult, Tier } from '../types'
import { checkBadges } from './badges'
import { computeUpgradeCost } from './cost'

export interface BadgeUpgradeSuggestionInput {
  attrs: Record<string, number>
  caps: Record<string, number>
  previouslyUnlocked: Record<string, Tier>
  remainingBudget: number
  excludedKeys?: string[]
}

export interface BadgeUpgradeSuggestion {
  targets: Record<string, number>
  cost: number
  remainingAfter: number
  newBadges: string[]
  targetBadge: string
  targetTier: Tier
  reason: string
  key: string
}

interface Candidate extends BadgeUpgradeSuggestion {
  moveCount: number
}

function targetsForTier(tier: BadgeTierResult): Record<string, number>[] {
  return tier.requirementGroups
    .filter((group) => group.length > 0 && group.every((condition) => !condition.cappedBelow))
    .map((group) => {
      const targets: Record<string, number> = {}
      for (const condition of group) {
        if (condition.met) continue
        targets[condition.attrName] = Math.max(targets[condition.attrName] ?? 0, condition.threshold)
      }
      return targets
    })
    .filter((targets) => Object.keys(targets).length > 0)
}

function simulateNewBadges(
  attrs: Record<string, number>,
  caps: Record<string, number>,
  previouslyUnlocked: Record<string, Tier>,
): string[] {
  return checkBadges(attrs, caps, previouslyUnlocked)
    .filter((badge) => badge.newlyUnlocked)
    .map((badge) => `${badge.name} ${badge.newlyUnlocked}`)
}

function compareCandidates(a: Candidate, b: Candidate): number {
  if (a.newBadges.length !== b.newBadges.length) return b.newBadges.length - a.newBadges.length
  if (a.cost !== b.cost) return a.cost - b.cost
  if (a.moveCount !== b.moveCount) return a.moveCount - b.moveCount
  return a.targetBadge.localeCompare(b.targetBadge)
}

export function suggestionTargetKey(targets: Record<string, number>): string {
  return Object.entries(targets)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, value]) => `${name}:${value}`)
    .join('|')
}

export function findBadgeUpgradeSuggestion(input: BadgeUpgradeSuggestionInput): BadgeUpgradeSuggestion | null {
  if (input.remainingBudget <= 0) return null

  const currentResults: BadgeResult[] = checkBadges(input.attrs, input.caps, input.previouslyUnlocked)
  const candidates: Candidate[] = []
  const excludedKeys = new Set(input.excludedKeys ?? [])

  for (const badge of currentResults) {
    for (const tier of badge.tiers) {
      if (tier.state !== 'ACHIEVABLE') continue

      for (const targets of targetsForTier(tier)) {
        const key = suggestionTargetKey(targets)
        if (excludedKeys.has(key)) continue

        let cost = 0
        let moveCount = 0
        const nextAttrs = { ...input.attrs }

        for (const [name, target] of Object.entries(targets)) {
          const current = input.attrs[name] ?? 0
          if (target <= current) continue
          cost += computeUpgradeCost(current, target)
          moveCount++
          nextAttrs[name] = target
        }

        if (moveCount === 0 || cost > input.remainingBudget) continue

        // Keep imported/saved owned badges as the baseline; never score a suggestion
        // from visible tier diffs. This protects the Aerial Wizard owned-badge case.
        const newBadges = simulateNewBadges(nextAttrs, input.caps, input.previouslyUnlocked)
        if (newBadges.length === 0) continue

        candidates.push({
          targets,
          cost,
          remainingAfter: input.remainingBudget - cost,
          newBadges,
          targetBadge: badge.name,
          targetTier: tier.tier,
          key,
          moveCount,
          reason: '',
        })
      }
    }
  }

  if (candidates.length === 0) return null

  const sorted = [...candidates].sort(compareCandidates)
  const best = sorted[0]
  const nextBest = sorted.find((candidate) => candidate.newBadges.length < best.newBadges.length)
  const comparison = nextBest
    ? `; the next best found unlocked ${nextBest.newBadges.length}`
    : ''

  return {
    targets: best.targets,
    cost: best.cost,
    remainingAfter: best.remainingAfter,
    newBadges: best.newBadges,
    targetBadge: best.targetBadge,
    targetTier: best.targetTier,
    key: best.key,
    reason: `Chosen because it unlocks ${best.newBadges.length} new badge tier${best.newBadges.length === 1 ? '' : 's'} within ${best.cost.toLocaleString()} UC${comparison}.`,
  }
}
