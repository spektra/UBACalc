// badges.ts — badge unlock evaluation engine.
// parses threshold conditions like "80 Close Shot -or- 80 Driving Layup"
// and figures out which badges you've unlocked. the threshold syntax is a little jank
// but it works, and that's what matters.

import badgesData from '../data/badges.json'
import type { Badge, Tier } from '../types'

export interface BadgeResult {
  name: string
  tier: Tier
  unlocked: boolean
}

export interface BadgeCheck {
  name: string
  previouslyUnlocked: Tier | null
  newlyUnlocked: Tier | null
  progress: number
  totalConditions: number
  metConditions: number
}

const TIER_ORDER: Tier[] = ['Bronze', 'Silver', 'Gold', 'HOF']

function evalCondition(condition: string, attrs: Record<string, number>): boolean {
  const upper = condition.trim()

  if (upper.startsWith('EITHER ')) {
    const inner = upper.slice(7)
    const parts = splitOr(inner)
    return parts.some((p) => evalCondition(p, attrs))
  }

  if (upper.includes(' -or- ')) {
    const parts = splitOr(upper)
    return parts.some((p) => evalCondition(p, attrs))
  }

  if (upper.includes(' -and- ')) {
    const parts = upper.split(' -and- ')
    return parts.every((p) => evalCondition(p, attrs))
  }

  if (upper.includes(' AND ')) {
    const parts = upper.split(' AND ')
    return parts.every((p) => evalCondition(p, attrs))
  }

  if (upper.startsWith('EITHER ')) {
    const inner = upper.slice(7)
    const parts = splitOr(inner)
    return parts.some((p) => evalCondition(p, attrs))
  }

  const match = upper.match(/^(\d+)\s+(.+)$/)
  if (!match) return false

  const requiredVal = Number(match[1])
  const attrName = match[2].trim()

  const currentVal = attrs[attrName]
  if (currentVal === undefined) return false

  return currentVal >= requiredVal
}

function splitOr(input: string): string[] {
  const parts: string[] = []
  let depth = 0
  let current = ''
  for (let i = 0; i < input.length; i++) {
    if (input[i] === '(') depth++
    else if (input[i] === ')') depth--
    if (depth === 0 && input.slice(i, i + 5) === ' -or- ') {
      parts.push(current.trim())
      current = ''
      i += 5
      continue
    }
    current += input[i]
  }
  if (current.trim()) parts.push(current.trim())
  return parts
}

function countConditions(threshold: string): number {
  const upper = threshold.trim()

  if (upper.startsWith('EITHER ')) {
    return 1
  }

  if (upper.includes(' -or- ')) {
    return 1
  }

  if (upper.includes(' -and- ')) {
    return upper.split(' -and- ').length
  }

  if (upper.includes(' AND ')) {
    const count = upper.split(' AND ').length
    if (upper.includes('EITHER')) return count
    return count
  }

  return 1
}

function countMetConditions(threshold: string, attrs: Record<string, number>): number {
  const upper = threshold.trim()

  if (upper.startsWith('EITHER ') || upper.includes(' -or- ')) {
    return evalCondition(threshold, attrs) ? 1 : 0
  }

  if (upper.includes(' -and- ')) {
    const parts = upper.split(' -and- ')
    return parts.filter((p) => evalCondition(p, attrs)).length
  }

  if (upper.includes(' AND ')) {
    const parts = upper.split(' AND ')
    return parts.map((p) => p.trim()).filter((p) => {
      if (p.startsWith('EITHER ') || p.includes(' -or- ')) {
        return evalCondition(p, attrs)
      }
      return evalCondition(p, attrs)
    }).length
  }

  return evalCondition(threshold, attrs) ? 1 : 0
}

export function checkBadges(
  attrs: Record<string, number>,
  previouslyUnlocked: Record<string, Tier>,
): BadgeCheck[] {
  const results: BadgeCheck[] = []

  for (const badge of badgesData as Badge[]) {
    let newlyUnlockedTier: Tier | null = null
    let totalConditions = 1
    let metConditions = 0

    for (const tier of TIER_ORDER) {
      const threshold = badge.thresholds[tier]
      if (!threshold) break

      totalConditions = countConditions(threshold)
      const met = countMetConditions(threshold, attrs)
      metConditions = met

      if (evalCondition(threshold, attrs)) {
        if (!previouslyUnlocked[badge.name] || TIER_ORDER.indexOf(previouslyUnlocked[badge.name]) < TIER_ORDER.indexOf(tier)) {
          newlyUnlockedTier = tier
        }
      } else {
        break
      }
    }

    results.push({
      name: badge.name,
      previouslyUnlocked: previouslyUnlocked[badge.name] ?? null,
      newlyUnlocked: newlyUnlockedTier,
      progress: metConditions / Math.max(totalConditions, 1),
      totalConditions,
      metConditions,
    })
  }

  return results
}
