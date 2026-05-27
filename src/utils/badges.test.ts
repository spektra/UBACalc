import { describe, expect, it } from 'vitest'
import { checkBadges } from './badges'

const allCaps = new Proxy<Record<string, number>>({}, {
  get: () => 99,
})

function badge(name: string, attrs: Record<string, number>, previouslyUnlocked: Record<string, 'Bronze' | 'Silver' | 'Gold' | 'HOF' | 'Legend'> = {}) {
  const result = checkBadges(attrs, allCaps, previouslyUnlocked).find((entry) => entry.name === name)
  if (!result) throw new Error(`Missing badge ${name}`)
  return result
}

describe('checkBadges', () => {
  it('earns OR badges when either side meets the threshold', () => {
    expect(badge('Float Game', { 'Driving Layup': 85 }).highestEarned).toBe('Silver')
    expect(badge('Float Game', { 'Close Shot': 70, 'Driving Layup': 79 }).highestEarned).toBeNull()
  })

  it('requires every side of dashed AND badge conditions', () => {
    expect(badge('Posterizer', { Vertical: 70, 'Driving Dunk': 79 }).highestEarned).toBeNull()
    expect(badge('Posterizer', { Vertical: 70, 'Driving Dunk': 80 }).highestEarned).toBe('Bronze')
  })

  it('evaluates uppercase AND before nested EITHER choices', () => {
    expect(badge('Boxout Beast', { Strength: 70, 'Defensive Rebound': 99 }).highestEarned).toBeNull()
    expect(badge('Boxout Beast', { Strength: 75, 'Defensive Rebound': 80 }).highestEarned).toBe('Bronze')
  })

  it('preserves imported previously unlocked tiers when current attributes are lower', () => {
    const result = badge('Float Game', {}, { 'Float Game': 'Silver' })
    expect(result.highestEarned).toBe('Silver')
    expect(result.tiers.find((tier) => tier.tier === 'Bronze')?.state).toBe('EARNED')
    expect(result.tiers.find((tier) => tier.tier === 'Silver')?.state).toBe('EARNED')
  })
})
