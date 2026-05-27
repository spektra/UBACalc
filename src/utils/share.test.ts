import { describe, expect, test } from 'vitest'
import { decodeBuild, encodeBuild } from './share'
import type { BuildSetup } from '../types'

const build: BuildSetup = {
  playerName: '<img src=x onerror=alert(1)>Share',
  height: "6'6\"",
  weightClass: 'Average',
  primaryArchetype: 'Shooting',
  secondaryArchetype: 'Defense',
  weakness: 'Rebounding',
  weightLbs: '220',
}

describe('share utilities', () => {
  test('decodes shared builds as sanitized, clamped state', () => {
    const encoded = encodeBuild(build, { 'Mid Range': 60 }, { 'Mid Range': 120 }, 2_000_000)
    const decoded = decodeBuild(`#${encoded}`)

    expect(decoded?.b.playerName).toBe('img src=x onerror=alert(1)Share')
    expect(decoded?.a['Mid Range']).toBe(99)
    expect(decoded?.u).toBe(999999)
  })
})
