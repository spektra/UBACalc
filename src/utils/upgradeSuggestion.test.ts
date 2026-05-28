import { describe, expect, it } from 'vitest'
import { findBadgeUpgradeSuggestion } from './upgradeSuggestion'

const lowCaps = new Proxy<Record<string, number>>({}, {
  get: (_target, prop) => (prop === 'Vertical' || prop === 'Driving Dunk' ? 99 : 50),
})

describe('findBadgeUpgradeSuggestion', () => {
  it('uses previously unlocked badges as the baseline when scoring suggestions', () => {
    const suggestion = findBadgeUpgradeSuggestion({
      attrs: { Vertical: 70, 'Driving Dunk': 70 },
      caps: lowCaps,
      previouslyUnlocked: { 'Aerial Wizard': 'Bronze' },
      remainingBudget: 6_000,
    })

    expect(suggestion).not.toBeNull()
    expect(suggestion?.targets).toEqual({ 'Driving Dunk': 80 })
    expect(suggestion?.newBadges).toContain('Posterizer Bronze')
    expect(suggestion?.newBadges).not.toContain('Aerial Wizard Bronze')
  })

  it('can exclude a prior suggestion to try another path', () => {
    const focusedCaps = new Proxy<Record<string, number>>({}, {
      get: (_target, prop) => (
        prop === 'Vertical' ||
        prop === 'Driving Dunk' ||
        prop === 'Driving Layup' ||
        prop === 'Close Shot'
          ? 99
          : 50
      ),
    })
    const first = findBadgeUpgradeSuggestion({
      attrs: {},
      caps: focusedCaps,
      previouslyUnlocked: {},
      remainingBudget: 20_000,
    })
    expect(first).not.toBeNull()

    const second = findBadgeUpgradeSuggestion({
      attrs: {},
      caps: focusedCaps,
      previouslyUnlocked: {},
      remainingBudget: 20_000,
      excludedKeys: [first?.key ?? ''],
    })

    expect(second).not.toBeNull()
    expect(second?.key).not.toBe(first?.key)
  })
})
