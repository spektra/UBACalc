import attributesData from '../data/attributes.json'
import capsData from '../data/caps.json'
import type { BuildSetup } from '../types'

interface AttrCategory {
  label: string
  _comment?: string
  attributes: { name: string; default: number }[]
}

interface HeightCaps {
  [inches: string]: { vertical: number; speed: number }
}

interface WeightClasses {
  [className: string]: { speedPenalty: number; agilityPenalty: number; strengthCap: number }
}

interface ArchetypeModifier {
  cap: number
  base: number
  color: string
}

const rawCaps = capsData as unknown as {
  height: { values: HeightCaps }
  weight: { classes: WeightClasses }
  archetype: Record<string, ArchetypeModifier>
}

const heightCaps = rawCaps.height.values
const weightClasses = rawCaps.weight.classes
const archetypeMods = rawCaps.archetype

const rawAttrs = attributesData as unknown as Record<string, AttrCategory>
const categories = Object.entries(rawAttrs).filter(([key]) => key !== '_comment')

const attrToCategories = new Map<string, string[]>()
for (const [catKey, cat] of categories) {
  for (const attr of cat.attributes) {
    const existing = attrToCategories.get(attr.name) || []
    existing.push(catKey)
    attrToCategories.set(attr.name, existing)
  }
}

function heightToInches(height: string): number | null {
  const match = height.match(/(\d+)'(\d+)"/)
  if (!match) return null
  return parseInt(match[1]) * 12 + parseInt(match[2])
}

function getArchetypeStatus(categoryKey: string, build: BuildSetup): string {
  if (categoryKey === 'physical') return 'physical'
  const catLabel = categories.find(([k]) => k === categoryKey)?.[1]?.label || categoryKey
  if (build.primaryArchetype && catLabel.toLowerCase() === build.primaryArchetype.toLowerCase()) return 'primary'
  if (build.secondaryArchetype && catLabel.toLowerCase() === build.secondaryArchetype.toLowerCase()) return 'secondary'
  if (build.weakness && catLabel.toLowerCase() === build.weakness.toLowerCase()) return 'weakness'
  return 'neutral'
}

const STATUS_PRIORITY: Record<string, number> = {
  primary: 4,
  secondary: 3,
  neutral: 2,
  weakness: 1,
}

export function getAttributeCap(attrName: string, build: BuildSetup): number {
  const physicalAttrs = ['Speed', 'Agility', 'Strength', 'Vertical']

  if (physicalAttrs.includes(attrName)) {
    return getPhysicalCap(attrName, build)
  }

  const cats = attrToCategories.get(attrName)
  if (!cats || cats.length === 0) return 90

  let bestStatus = 'neutral'
  let bestPriority = 0

  for (const cat of cats) {
    const status = getArchetypeStatus(cat, build)
    const priority = STATUS_PRIORITY[status] || 0
    if (priority > bestPriority) {
      bestPriority = priority
      bestStatus = status
    }
  }

  const mod = archetypeMods[bestStatus]
  return mod?.cap ?? 90
}

export function getAttributeBase(attrName: string, build: BuildSetup): number {
  const physicalAttrs = ['Speed', 'Agility', 'Strength', 'Vertical']
  if (physicalAttrs.includes(attrName)) return 50

  const cats = attrToCategories.get(attrName)
  if (!cats || cats.length === 0) return 50

  let bestStatus = 'neutral'
  let bestPriority = 0

  for (const cat of cats) {
    const status = getArchetypeStatus(cat, build)
    const priority = STATUS_PRIORITY[status] || 0
    if (priority > bestPriority) {
      bestPriority = priority
      bestStatus = status
    }
  }

  const mod = archetypeMods[bestStatus]
  return mod?.base ?? 50
}

export function getCapColor(attrName: string, build: BuildSetup): string {
  const physicalAttrs = ['Speed', 'Agility', 'Strength', 'Vertical']
  if (physicalAttrs.includes(attrName)) return 'green'

  const cats = attrToCategories.get(attrName)
  if (!cats || cats.length === 0) return 'cyan'

  let bestStatus = 'neutral'
  let bestPriority = 0
  for (const cat of cats) {
    const status = getArchetypeStatus(cat, build)
    const priority = STATUS_PRIORITY[status] || 0
    if (priority > bestPriority) {
      bestPriority = priority
      bestStatus = status
    }
  }

  const mod = archetypeMods[bestStatus]
  return mod?.color ?? 'cyan'
}

function getPhysicalCap(attrName: string, build: BuildSetup): number {
  const inches = build.height ? heightToInches(build.height) : null
  const weight = build.weightClass ? weightClasses[build.weightClass] : undefined

  switch (attrName) {
    case 'Vertical': {
      if (!inches || !heightCaps[String(inches)]) return 99
      return heightCaps[String(inches)].vertical
    }
    case 'Speed': {
      if (!inches || !heightCaps[String(inches)]) return 99
      const base = heightCaps[String(inches)].speed
      const penalty = weight?.speedPenalty ?? 0
      return Math.max(25, base - penalty)
    }
    case 'Agility': {
      const penalty = weight?.agilityPenalty ?? 0
      return Math.max(25, 99 - penalty)
    }
    case 'Strength': {
      return weight?.strengthCap ?? 99
    }
    default:
      return 99
  }
}
