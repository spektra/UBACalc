import badgesData from '../data/badges.json'
import type { Badge, Tier, BadgeTierState, BadgeConditionDetail, BadgeTierResult, BadgeResult } from '../types'

const TIER_ORDER: Tier[] = ['Bronze', 'Silver', 'Gold', 'HOF', 'Legend']

const SPLIT_OR = ' -or- '
const SPLIT_AND = ' -and- '
const SPLIT_AND_CAPS = ' AND '  // non-depth-aware — fine as no data nests AND inside EITHER

function splitOr(input: string): string[] {
  const parts: string[] = []
  let depth = 0
  let current = ''
  let i = 0
  while (i < input.length) {
    if (input[i] === '(') depth++
    else if (input[i] === ')') depth--
    if (depth === 0 && input.startsWith(SPLIT_OR, i)) {
      parts.push(current.trim())
      current = ''
      i += SPLIT_OR.length
      continue
    }
    current += input[i]
    i++
  }
  if (current.trim()) parts.push(current.trim())
  return parts
}

function getAttrValue(condition: string, lookup: Record<string, number>): { threshold: number; attrName: string; value: number } | null {
  const match = condition.match(/^(\d+)\s+(.+)$/)
  if (!match) return null
  const threshold = Number(match[1])
  const attrName = match[2].trim()
  const value = lookup[attrName] ?? 0
  return { threshold, attrName, value }
}

function evalCondition(condition: string, attrs: Record<string, number>): boolean {
  const s = condition.trim()

  if (s.startsWith('EITHER ')) {
    const inner = s.slice(7)
    const parts = splitOr(inner)
    return parts.some((p) => evalCondition(p, attrs))
  }

  if (s.includes(SPLIT_AND_CAPS)) {
    const parts = s.split(SPLIT_AND_CAPS)
    return parts.every((p) => evalCondition(p, attrs))
  }

  if (s.includes(SPLIT_OR)) {
    const parts = splitOr(s)
    return parts.some((p) => evalCondition(p, attrs))
  }

  if (s.includes(SPLIT_AND)) {
    const parts = s.split(SPLIT_AND)
    return parts.every((p) => evalCondition(p, attrs))
  }

  const resolved = getAttrValue(s, attrs)
  if (!resolved) return false
  return resolved.value >= resolved.threshold
}

function canEverAchieve(condition: string, caps: Record<string, number>): boolean {
  const s = condition.trim()

  if (s.startsWith('EITHER ')) {
    const inner = s.slice(7)
    const parts = splitOr(inner)
    return parts.some((p) => canEverAchieve(p, caps))
  }

  if (s.includes(SPLIT_AND_CAPS)) {
    const parts = s.split(SPLIT_AND_CAPS)
    return parts.every((p) => canEverAchieve(p, caps))
  }

  if (s.includes(SPLIT_OR)) {
    const parts = splitOr(s)
    return parts.some((p) => canEverAchieve(p, caps))
  }

  if (s.includes(SPLIT_AND)) {
    const parts = s.split(SPLIT_AND)
    return parts.every((p) => canEverAchieve(p, caps))
  }

  const match = s.match(/^(\d+)\s+(.+)$/)
  if (!match) return false
  const requiredVal = Number(match[1])
  const attrName = match[2].trim()
  const cap = caps[attrName] ?? 99
  return cap >= requiredVal
}

function parseConditionDetails(
  condition: string,
  attrs: Record<string, number>,
  caps: Record<string, number>,
): BadgeConditionDetail[] {
  const s = condition.trim()

  if (s.includes(SPLIT_AND_CAPS)) {
    const parts = s.split(SPLIT_AND_CAPS)
    return parts.flatMap((p) => parseConditionDetails(p, attrs, caps))
  }

  if (s.includes(SPLIT_AND)) {
    const parts = s.split(SPLIT_AND)
    return parts.flatMap((p) => parseConditionDetails(p, attrs, caps))
  }

  if (s.startsWith('EITHER ') || s.includes(SPLIT_OR)) {
    return []
  }

  const match = s.match(/^(\d+)\s+(.+)$/)
  if (!match) return []
  const threshold = Number(match[1])
  const attrName = match[2].trim()
  const currentValue = attrs[attrName] ?? 0
  const hardCap = caps[attrName] ?? 99

  return [{
    attrName,
    threshold,
    currentValue,
    hardCap,
    met: currentValue >= threshold,
    cappedBelow: hardCap < threshold,
  }]
}

function countConditions(threshold: string): number {
  const s = threshold.trim()

  if (s.includes(SPLIT_AND_CAPS)) {
    return s.split(SPLIT_AND_CAPS).length
  }

  if (s.includes(SPLIT_AND)) {
    return s.split(SPLIT_AND).length
  }

  if (s.startsWith('EITHER ') || s.includes(SPLIT_OR)) {
    return 1
  }

  return 1
}

function countMetConditions(threshold: string, attrs: Record<string, number>): number {
  const s = threshold.trim()

  if (s.includes(SPLIT_AND_CAPS)) {
    const parts = s.split(SPLIT_AND_CAPS)
    return parts.filter((p) => evalCondition(p, attrs)).length
  }

  if (s.includes(SPLIT_AND)) {
    const parts = s.split(SPLIT_AND)
    return parts.filter((p) => evalCondition(p, attrs)).length
  }

  if (s.startsWith('EITHER ') || s.includes(SPLIT_OR)) {
    return evalCondition(threshold, attrs) ? 1 : 0
  }

  return evalCondition(threshold, attrs) ? 1 : 0
}

export function checkBadges(
  attrs: Record<string, number>,
  caps: Record<string, number>,
  previouslyUnlocked: Record<string, Tier>,
): BadgeResult[] {
  const results: BadgeResult[] = []

  for (const badge of badgesData as Badge[]) {
    const tiers: BadgeTierResult[] = []
    let highestEarned: Tier | null = null

    for (const tier of TIER_ORDER) {
      const threshold = badge.thresholds[tier]
      if (!threshold) continue

      const currentMet = evalCondition(threshold, attrs)
      const feasible = canEverAchieve(threshold, caps)
      const conditions = parseConditionDetails(threshold, attrs, caps)

      let state: BadgeTierState
      if (currentMet) {
        state = 'EARNED'
        highestEarned = tier
      } else if (feasible) {
        state = 'ACHIEVABLE'
      } else {
        state = 'LOCKED'
      }

      tiers.push({ tier, state, conditions })
    }

    const prev = previouslyUnlocked[badge.name] ?? null
    if (prev) {
      const prevIdx = TIER_ORDER.indexOf(prev)
      for (const tr of tiers) {
        if (TIER_ORDER.indexOf(tr.tier) <= prevIdx) {
          tr.state = 'EARNED'
        }
      }
      if (!highestEarned || TIER_ORDER.indexOf(highestEarned) < prevIdx) {
        highestEarned = prev
      }
    }

    let highestAchievable: Tier | null = null
    for (let i = TIER_ORDER.length - 1; i >= 0; i--) {
      const tr = tiers.find((t) => t.tier === TIER_ORDER[i])
      if (tr?.state === 'ACHIEVABLE') {
        highestAchievable = TIER_ORDER[i]
        break
      }
    }

    let newlyUnlocked: Tier | null = null
    if (highestEarned && (!prev || TIER_ORDER.indexOf(highestEarned) > TIER_ORDER.indexOf(prev))) {
      newlyUnlocked = highestEarned
    }

    let progress = 0
    let totalConditions = 0
    let metConditions = 0

    for (const tr of tiers) {
      if (tr.state === 'EARNED') continue
      if (tr.state === 'ACHIEVABLE') {
        const threshold = badge.thresholds[tr.tier]
        if (threshold) {
          totalConditions = countConditions(threshold)
          metConditions = countMetConditions(threshold, attrs)
          progress = totalConditions > 0 ? metConditions / totalConditions : 0
        }
      }
      break  // only care about progress toward first non-earned tier
    }

    results.push({
      name: badge.name,
      tiers,
      highestEarned,
      highestAchievable,
      previouslyUnlocked: prev,
      newlyUnlocked,
      progress,
      totalConditions,
      metConditions,
    })
  }

  return results
}
