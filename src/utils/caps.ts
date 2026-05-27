import attributesData from '../data/attributes.json'
import capsData from '../data/caps.json'
import type { BuildSetup } from '../types'

interface AttrCategory {
  label: string
  _comment?: string
  attributes: { name: string; default: number }[]
}

interface SpeedRange {
  label: string
  maxInches: number
  cap: number
  base: number
}

interface WeightClasses {
  [className: string]: { speedPenalty: number; agilityPenalty: number; strengthCap: number; strengthBase: number; verticalCap: number; verticalBase: number }
}

interface ArchetypeModifier {
  cap: number
  base: number
  color: string
}

const rawCaps = capsData as unknown as {
  speedRanges: SpeedRange[]
  weight: { classes: WeightClasses }
  archetype: Record<string, ArchetypeModifier>
}

export const LBS_RANGES: [number, number, string][] = [
  [160, 174, 'Very Light'],
  [175, 188, 'Light'],
  [189, 213, 'Below Average'],
  [214, 233, 'Average'],
  [234, 253, 'Above Average'],
  [254, 274, 'Heavy'],
  [275, 300, 'Very Heavy'],
]

export function lbsToWeightClass(lbs: number): string | null {
  for (const [lo, hi, klass] of LBS_RANGES) {
    if (lbs >= lo && lbs <= hi) return klass
  }
  return null
}

const weightClasses = rawCaps.weight.classes
const archetypeMods = rawCaps.archetype
const speedRanges = [...rawCaps.speedRanges].sort((a, b) => a.maxInches - b.maxInches)

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
  const normalised = height.replace(/\s+/g, '')
  const match = normalised.match(/(\d+)'(\d+)"/)
  if (!match) return null
  return parseInt(match[1]) * 12 + parseInt(match[2])
}

function findSpeedRange(inches: number): SpeedRange {
  for (const r of speedRanges) {
    if (inches <= r.maxInches) return r
  }
  return speedRanges[speedRanges.length - 1]
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

function resolveBestStatus(attrName: string, build: BuildSetup): string {
  const cats = attrToCategories.get(attrName)
  if (!cats || cats.length === 0) return 'neutral'
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
  return bestStatus
}

export function getAttributeCap(attrName: string, build: BuildSetup): number {
  const physicalAttrs = ['Speed', 'Agility', 'Strength', 'Vertical']
  if (physicalAttrs.includes(attrName)) return getPhysicalCap(attrName, build)

  const mod = archetypeMods[resolveBestStatus(attrName, build)]
  return mod?.cap ?? 90
}

export function getAttributeBase(attrName: string, build: BuildSetup): number {
  const physicalAttrs = ['Speed', 'Agility', 'Strength', 'Vertical']
  if (physicalAttrs.includes(attrName)) {
    const inches = build.height ? heightToInches(build.height) : null
    const weight = build.weightClass ? weightClasses[build.weightClass] : undefined

    switch (attrName) {
      case 'Speed': {
        if (!inches) return 50
        const range = findSpeedRange(inches)
        return Math.max(25, range.base)
      }
      case 'Agility': {
        if (!inches) return 50
        const range = findSpeedRange(inches)
        return Math.max(25, range.base)
      }
      case 'Strength':
        return weight?.strengthBase ?? 50
      case 'Vertical':
        return weight?.verticalBase ?? 50
    }
    return 50
  }

  const mod = archetypeMods[resolveBestStatus(attrName, build)]
  return mod?.base ?? 50
}

function capValueToColor(cap: number): string {
  if (cap >= 99) return 'blue'
  if (cap >= 95) return 'purple'
  if (cap >= 94) return 'magenta'
  if (cap >= 90) return 'blue'
  if (cap >= 85) return 'green'
  if (cap >= 80) return 'orange'
  if (cap >= 75) return 'red'
  if (cap >= 70) return 'grey'
  if (cap >= 60) return 'yellow'
  return 'darkGreen'
}

export function getCapColor(attrName: string, build: BuildSetup): string {
  const physicalAttrs = ['Speed', 'Agility', 'Strength', 'Vertical']
  if (physicalAttrs.includes(attrName)) {
    return capValueToColor(getPhysicalCap(attrName, build))
  }

  const mod = archetypeMods[resolveBestStatus(attrName, build)]
  return mod?.color ?? 'blue'
}

function getPhysicalCap(attrName: string, build: BuildSetup): number {
  const inches = build.height ? heightToInches(build.height) : null
  const weight = build.weightClass ? weightClasses[build.weightClass] : undefined

  if (!weight && build.weightClass) {
    console.warn(`[caps] Weight class "${build.weightClass}" not found in caps.json`)
  }

  switch (attrName) {
    case 'Vertical':
      return weight?.verticalCap ?? 99
    case 'Speed': {
      if (!inches) return 99
      const range = findSpeedRange(inches)
      return Math.max(25, range.cap - (weight?.speedPenalty ?? 0))
    }
    case 'Agility': {
      if (!inches) return 99
      const range = findSpeedRange(inches)
      return Math.max(25, range.cap - (weight?.agilityPenalty ?? 0))
    }
    case 'Strength':
      return weight?.strengthCap ?? 99
    default:
      return 99
  }
}
