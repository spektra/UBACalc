import { describe, expect, it } from 'vitest'
import { checkBadges } from './badges'

const allCaps = new Proxy<Record<string, number>>({}, {
  get: () => 99,
})

type PreviousBadges = Record<string, 'Bronze' | 'Silver' | 'Gold' | 'HOF' | 'Legend'>

function badge(
  name: string,
  attrs: Record<string, number>,
  previouslyUnlocked: PreviousBadges = {},
  caps: Record<string, number> = allCaps,
) {
  const result = checkBadges(attrs, caps, previouslyUnlocked).find((entry) => entry.name === name)
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

  it('does not let an EITHER branch bypass an AND prerequisite', () => {
    expect(badge('Aerial Wizard', { Vertical: 69, 'Standing Dunk': 80 }).highestEarned).toBeNull()
    expect(badge('Aerial Wizard', { Vertical: 70, 'Standing Dunk': 80 }).highestEarned).toBe('Bronze')
    expect(badge('Aerial Wizard', { Vertical: 70, 'Driving Dunk': 80 }).highestEarned).toBe('Bronze')
  })

  it('returns concrete requirement options for AND plus EITHER conditions', () => {
    const result = badge('Aerial Wizard', { Vertical: 69, 'Standing Dunk': 75 })
    const bronze = result.tiers.find((tier) => tier.tier === 'Bronze')

    expect(bronze?.requirementGroups.map((group) => group.map((condition) => condition.attrName))).toEqual([
      ['Vertical', 'Driving Dunk'],
      ['Vertical', 'Standing Dunk'],
    ])
    expect(bronze?.requirementGroups[1]?.find((condition) => condition.attrName === 'Standing Dunk')?.threshold).toBe(80)
  })

  it('marks AND plus EITHER badges locked when the shared prerequisite cap is too low', () => {
    const locked = badge('Aerial Wizard', {}, {}, {
      Vertical: 69,
      'Driving Dunk': 99,
      'Standing Dunk': 99,
    })
    expect(locked.tiers.find((tier) => tier.tier === 'Bronze')?.state).toBe('LOCKED')

    const achievable = badge('Aerial Wizard', {}, {}, {
      Vertical: 70,
      'Driving Dunk': 79,
      'Standing Dunk': 80,
    })
    expect(achievable.tiers.find((tier) => tier.tier === 'Bronze')?.state).toBe('ACHIEVABLE')
  })

  it('preserves imported previously unlocked tiers when current attributes are lower', () => {
    const result = badge('Float Game', {}, { 'Float Game': 'Silver' })
    expect(result.highestEarned).toBe('Silver')
    expect(result.tiers.find((tier) => tier.tier === 'Bronze')?.state).toBe('EARNED')
    expect(result.tiers.find((tier) => tier.tier === 'Silver')?.state).toBe('EARNED')
  })
})
