export interface Badge {
  name: string
  thresholds: Record<Tier, string>
}

export type Tier = 'Bronze' | 'Silver' | 'Gold' | 'HOF'

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
}

export interface WeightClass {
  speedPenalty: number
  agilityPenalty: number
  strengthCap: number
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
}

export interface PlayerBuild extends BuildSetup {
  attributes: Record<string, number>
}
