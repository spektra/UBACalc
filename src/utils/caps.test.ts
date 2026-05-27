import { describe, expect, test } from 'vitest'
import { getAttributeBase, getAttributeCap, lbsToWeightClass } from './caps'
import type { BuildSetup } from '../types'

function build(overrides: Partial<BuildSetup> = {}): BuildSetup {
  return {
    playerName: '',
    height: "6'6\"",
    weightClass: 'Average',
    primaryArchetype: '',
    secondaryArchetype: '',
    weakness: '',
    weightLbs: '',
    ...overrides,
  }
}

describe('cap utilities', () => {
  test('derives skill bases from archetype role', () => {
    expect(getAttributeBase('Mid Range', build({ primaryArchetype: 'Shooting' }))).toBe(80)
    expect(getAttributeBase('Mid Range', build({ secondaryArchetype: 'Shooting' }))).toBe(70)
    expect(getAttributeBase('Mid Range', build({ weakness: 'Shooting' }))).toBe(40)
  })

  test('derives physical caps from height and weight', () => {
    const average = build({ height: "6'6\"", weightClass: 'Average' })
    const heavy = build({ height: "6'6\"", weightClass: 'Very Heavy' })
    expect(getAttributeCap('Speed', average)).toBeGreaterThan(getAttributeCap('Speed', heavy))
    expect(getAttributeBase('Speed', heavy)).toBe(60)
  })

  test('maps pounds to league weight class', () => {
    expect(lbsToWeightClass(160)).toBe('Very Light')
    expect(lbsToWeightClass(250)).toBe('Above Average')
    expect(lbsToWeightClass(300)).toBe('Very Heavy')
  })
})
