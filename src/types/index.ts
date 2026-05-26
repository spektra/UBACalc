export interface Badge {
  name: string
  thresholds: Partial<Record<Tier, string>>
}

export type Tier = 'Bronze' | 'Silver' | 'Gold' | 'HOF' | 'Legend'

export type BadgeTierState = 'EARNED' | 'ACHIEVABLE' | 'LOCKED'

export interface BadgeConditionDetail {
  attrName: string
  threshold: number
  currentValue: number
  hardCap: number
  met: boolean
  cappedBelow: boolean
}

export interface BadgeTierResult {
  tier: Tier
  state: BadgeTierState
  conditions: BadgeConditionDetail[]
}

export interface BadgeResult {
  name: string
  tiers: BadgeTierResult[]
  highestEarned: Tier | null
  highestAchievable: Tier | null
  previouslyUnlocked: Tier | null
  newlyUnlocked: Tier | null
  progress: number
  totalConditions: number
  metConditions: number
}

export interface Attribute {
  name: string
  default: number
}

export interface AttributeCategory {
  label: string
  attributes: Attribute[]
}

export interface HeightCap {
  vertical: number
  speed: number
  speedBase: number
  verticalBase: number
}

export interface WeightClass {
  speedPenalty: number
  agilityPenalty: number
  strengthCap: number
  strengthBase: number
}

export interface ArchetypeModifier {
  cap: number
  base: number
  color: string
}

export interface CostBracket {
  range: string
  costPerPoint: number
}

export interface BuildSetup {
  playerName: string
  height: string
  weightClass: string
  primaryArchetype: string
  secondaryArchetype: string
  weakness: string
  weightLbs: string
}

export interface PlayerBuild extends BuildSetup {
  attributes: Record<string, number>
}
