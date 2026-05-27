import type { BuildSetup, Tier } from '../types'
import attributesData from '../data/attributes.json'
import badgesData from '../data/badges.json'
import buildOptions from '../data/buildOptions.json'
import { clampAttribute, clampUC, sanitizePlayerName } from './sanitize'

const rawAttrs = attributesData as unknown as Record<string, { attributes?: { name: string }[] }>
const rawBadges = badgesData as unknown as { name: string }[]

export const ATTRIBUTE_NAMES = new Set(
  Object.entries(rawAttrs)
    .filter(([key]) => key !== '_comment')
    .flatMap(([, category]) => category.attributes?.map((attr) => attr.name) ?? []),
)

export const BADGE_NAMES = new Set(rawBadges.map((badge) => badge.name))

const HEIGHTS = new Set(buildOptions.heights)
const WEIGHT_CLASSES = new Set(buildOptions.weightClasses)
const ARCHETYPES = new Set(buildOptions.archetypes)
const TIERS = new Set<Tier>(['Bronze', 'Silver', 'Gold', 'HOF', 'Legend'])

const MAX_ATTRIBUTE_RECORD_ENTRIES = ATTRIBUTE_NAMES.size
const MAX_BADGE_RECORD_ENTRIES = BADGE_NAMES.size

function asRecord(input: unknown): Record<string, unknown> | null {
  return input && typeof input === 'object' && !Array.isArray(input)
    ? input as Record<string, unknown>
    : null
}

function safeKey(name: string): string | null {
  if (name === '__proto__' || name === 'constructor' || name === 'prototype') return null
  return name
}

function cleanAttributeKey(name: string): string | null {
  const key = safeKey(name)
  return key && ATTRIBUTE_NAMES.has(key) ? key : null
}

function cleanBadgeKey(name: string): string | null {
  const key = safeKey(name)
  return key && BADGE_NAMES.has(key) ? key : null
}

export function sanitizeBuildSetup(input: unknown): BuildSetup {
  const source = asRecord(input) ?? {}
  const height = typeof source.height === 'string' && HEIGHTS.has(source.height) ? source.height : ''
  const weightClass = typeof source.weightClass === 'string' && WEIGHT_CLASSES.has(source.weightClass) ? source.weightClass : ''
  const primaryArchetype = typeof source.primaryArchetype === 'string' && ARCHETYPES.has(source.primaryArchetype) ? source.primaryArchetype : ''
  const secondaryArchetype = typeof source.secondaryArchetype === 'string' && ARCHETYPES.has(source.secondaryArchetype) ? source.secondaryArchetype : ''
  const weakness = typeof source.weakness === 'string' && ARCHETYPES.has(source.weakness) ? source.weakness : ''
  const weightLbs = typeof source.weightLbs === 'string'
    ? source.weightLbs.replace(/[^0-9]/g, '').slice(0, 3)
    : ''

  return {
    playerName: sanitizePlayerName(typeof source.playerName === 'string' ? source.playerName : ''),
    height,
    weightClass,
    primaryArchetype,
    secondaryArchetype,
    weakness,
    weightLbs,
  }
}

export function sanitizeAttributeRecord(input: unknown): Record<string, number> {
  const source = asRecord(input)
  if (!source) return {}

  const result: Record<string, number> = {}
  for (const [name, value] of Object.entries(source)) {
    if (Object.keys(result).length >= MAX_ATTRIBUTE_RECORD_ENTRIES) break
    const key = cleanAttributeKey(name)
    if (!key) continue
    const num = typeof value === 'number' ? value : Number(value)
    if (Number.isFinite(num)) result[key] = clampAttribute(num)
  }
  return result
}

export function sanitizeTierRecord(input: unknown): Record<string, Tier> {
  const source = asRecord(input)
  if (!source) return {}

  const result: Record<string, Tier> = {}
  for (const [name, value] of Object.entries(source)) {
    if (Object.keys(result).length >= MAX_BADGE_RECORD_ENTRIES) break
    const key = cleanBadgeKey(name)
    if (!key || typeof value !== 'string' || !TIERS.has(value as Tier)) continue
    result[key] = value as Tier
  }
  return result
}

export function sanitizeTouchedRecord(input: unknown): Record<string, true> {
  const source = asRecord(input)
  if (!source) return {}

  const result: Record<string, true> = {}
  for (const name of Object.keys(source)) {
    if (Object.keys(result).length >= MAX_ATTRIBUTE_RECORD_ENTRIES) break
    const key = cleanAttributeKey(name)
    if (key) result[key] = true
  }
  return result
}

export function sanitizeUC(value: unknown): number {
  return clampUC(typeof value === 'number' ? value : Number(value))
}
