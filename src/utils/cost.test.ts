import { describe, expect, test } from 'vitest'
import { computeAllUpgrades, computeUpgradeCost, getCostPerPoint } from './cost'

describe('cost utilities', () => {
  test('uses configured bracket costs', () => {
    expect(getCostPerPoint(50)).toBe(50)
    expect(getCostPerPoint(61)).toBe(200)
    expect(getCostPerPoint(99)).toBe(1600)
  })

  test('computes upgrade totals across brackets', () => {
    expect(computeUpgradeCost(60, 62)).toBe(400)
    expect(computeUpgradeCost(90, 91)).toBe(1600)
  })

  test('only returns real upgrades', () => {
    expect(computeAllUpgrades({ Speed: 70, Strength: 75 }, { Speed: 72, Strength: 74 })).toEqual([
      { name: 'Speed', from: 70, to: 72, cost: 800 },
    ])
  })
})
