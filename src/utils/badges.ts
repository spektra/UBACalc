import badgesData from '../data/badges.json'
import type { Badge, Tier, BadgeTierState, BadgeConditionDetail, BadgeTierResult, BadgeResult } from '../types'

const TIER_ORDER: Tier[] = ['Bronze', 'Silver', 'Gold', 'HOF', 'Legend']

const SPLIT_OR = ' -or- '
const SPLIT_AND = ' -and- '
const SPLIT_AND_CAPS = ' AND '

function splitTopLevel(input: string, delimiter: string): string[] {
  const parts: string[] = []
  let depth = 0
  let current = ''
  let i = 0
  while (i < input.length) {
    if (input[i] === '(') depth++
    else if (input[i] === ')') depth = Math.max(0, depth - 1)
    if (depth === 0 && input.startsWith(delimiter, i)) {
      parts.push(current.trim())
      current = ''
      i += delimiter.length
      continue
    }
    current += input[i]
    i++
  }
  if (current.trim()) parts.push(current.trim())
  return parts
}

function stripOuterParens(input: string): string {
  let s = input.trim()

  while (s.startsWith('(') && s.endsWith(')')) {
    let depth = 0
    let wrapsWholeExpression = true

    for (let i = 0; i < s.length; i++) {
      if (s[i] === '(') depth++
      else if (s[i] === ')') depth--

      if (depth === 0 && i < s.length - 1) {
        wrapsWholeExpression = false
        break
      }
    }

    if (!wrapsWholeExpression) break
    s = s.slice(1, -1).trim()
  }

  return s
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
  const s = stripOuterParens(condition)

  if (s.startsWith('EITHER ')) {
    const inner = stripOuterParens(s.slice(7))
    const parts = splitTopLevel(inner, SPLIT_OR)
    return parts.some((p) => evalCondition(p, attrs))
  }

  const andCapsParts = splitTopLevel(s, SPLIT_AND_CAPS)
  if (andCapsParts.length > 1) {
    const parts = andCapsParts
    return parts.every((p) => evalCondition(p, attrs))
  }

  const orParts = splitTopLevel(s, SPLIT_OR)
  if (orParts.length > 1) {
    const parts = orParts
    return parts.some((p) => evalCondition(p, attrs))
  }

  const andParts = splitTopLevel(s, SPLIT_AND)
  if (andParts.length > 1) {
    const parts = andParts
    return parts.every((p) => evalCondition(p, attrs))
  }

  const resolved = getAttrValue(s, attrs)
  if (!resolved) return false
  return resolved.value >= resolved.threshold
}

function canEverAchieve(condition: string, caps: Record<string, number>): boolean {
  const s = stripOuterParens(condition)

  if (s.startsWith('EITHER ')) {
    const inner = stripOuterParens(s.slice(7))
    const parts = splitTopLevel(inner, SPLIT_OR)
    return parts.some((p) => canEverAchieve(p, caps))
  }

  const andCapsParts = splitTopLevel(s, SPLIT_AND_CAPS)
  if (andCapsParts.length > 1) {
    const parts = andCapsParts
    return parts.every((p) => canEverAchieve(p, caps))
  }

  const orParts = splitTopLevel(s, SPLIT_OR)
  if (orParts.length > 1) {
    const parts = orParts
    return parts.some((p) => canEverAchieve(p, caps))
  }

  const andParts = splitTopLevel(s, SPLIT_AND)
  if (andParts.length > 1) {
    const parts = andParts
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
  const seen = new Set<string>()
  return requirementGroups(condition, attrs, caps).flatMap((group) => group).filter((detail) => {
    const key = `${detail.attrName}:${detail.threshold}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

function combineRequirementGroups(groups: BadgeConditionDetail[][][]): BadgeConditionDetail[][] {
  return groups.reduce<BadgeConditionDetail[][]>(
    (combined, nextGroups) => combined.flatMap((group) => nextGroups.map((next) => [...group, ...next])),
    [[]],
  )
}

function requirementGroups(
  condition: string,
  attrs: Record<string, number>,
  caps: Record<string, number>,
): BadgeConditionDetail[][] {
  const s = stripOuterParens(condition)

  if (s.startsWith('EITHER ')) {
    const inner = stripOuterParens(s.slice(7))
    return splitTopLevel(inner, SPLIT_OR).flatMap((part) => requirementGroups(part, attrs, caps))
  }

  const andCapsParts = splitTopLevel(s, SPLIT_AND_CAPS)
  if (andCapsParts.length > 1) {
    return combineRequirementGroups(andCapsParts.map((part) => requirementGroups(part, attrs, caps)))
  }

  const orParts = splitTopLevel(s, SPLIT_OR)
  if (orParts.length > 1) {
    return orParts.flatMap((part) => requirementGroups(part, attrs, caps))
  }

  const andParts = splitTopLevel(s, SPLIT_AND)
  if (andParts.length > 1) {
    return combineRequirementGroups(andParts.map((part) => requirementGroups(part, attrs, caps)))
  }

  const match = s.match(/^(\d+)\s+(.+)$/)
  if (!match) return []
  const threshold = Number(match[1])
  const attrName = match[2].trim()
  const currentValue = attrs[attrName] ?? 0
  const hardCap = caps[attrName] ?? 99

  return [[{
    attrName,
    threshold,
    currentValue,
    hardCap,
    met: currentValue >= threshold,
    cappedBelow: hardCap < threshold,
  }]]
}

function countConditions(threshold: string): number {
  const s = stripOuterParens(threshold)

  const andCapsParts = splitTopLevel(s, SPLIT_AND_CAPS)
  if (andCapsParts.length > 1) {
    return andCapsParts.length
  }

  const andParts = splitTopLevel(s, SPLIT_AND)
  if (andParts.length > 1) {
    return andParts.length
  }

  const orParts = splitTopLevel(s, SPLIT_OR)
  if (s.startsWith('EITHER ') || orParts.length > 1) {
    return 1
  }

  return 1
}

function countMetConditions(threshold: string, attrs: Record<string, number>): number {
  const s = stripOuterParens(threshold)

  const andCapsParts = splitTopLevel(s, SPLIT_AND_CAPS)
  if (andCapsParts.length > 1) {
    const parts = andCapsParts
    return parts.filter((p) => evalCondition(p, attrs)).length
  }

  const andParts = splitTopLevel(s, SPLIT_AND)
  if (andParts.length > 1) {
    const parts = andParts
    return parts.filter((p) => evalCondition(p, attrs)).length
  }

  const orParts = splitTopLevel(s, SPLIT_OR)
  if (s.startsWith('EITHER ') || orParts.length > 1) {
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
      const groups = requirementGroups(threshold, attrs, caps)

      let state: BadgeTierState
      if (currentMet) {
        state = 'EARNED'
        highestEarned = tier
      } else if (feasible) {
        state = 'ACHIEVABLE'
      } else {
        state = 'LOCKED'
      }

      tiers.push({ tier, state, threshold, conditions, requirementGroups: groups })
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
