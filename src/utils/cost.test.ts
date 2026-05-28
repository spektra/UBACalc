import { describe, expect, test } from 'vitest'
import { computeAllUpgrades, computeUpgradeCost, getCostPerPoint } from './cost'

describe('cost utilities', () => {
  test('uses configured bracket costs', () => {
    expect(getCostPerPoint(50)).toBe(50)
    expect(getCostPerPoint(61)).toBe(200)
    expect(getCostPerPoint(79)).toBe(400)
    expect(getCostPerPoint(80)).toBe(1600)
    expect(getCostPerPoint(90)).toBe(1600)
    expect(getCostPerPoint(91)).toBe(3200)
    expect(getCostPerPoint(99)).toBe(3200)
  })

  test('computes upgrade totals across brackets', () => {
    expect(computeUpgradeCost(60, 62)).toBe(400)
    expect(computeUpgradeCost(79, 81)).toBe(3200)
    expect(computeUpgradeCost(90, 91)).toBe(3200)
  })

  test('only returns real upgrades', () => {
    expect(computeAllUpgrades({ Speed: 70, Strength: 75 }, { Speed: 72, Strength: 74 })).toEqual([
      { name: 'Speed', from: 70, to: 72, cost: 800 },
    ])
  })
})
