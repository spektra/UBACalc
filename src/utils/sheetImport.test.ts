import { readFileSync } from 'node:fs'
import { describe, expect, test } from 'vitest'
import { parsePastedAttributes, parsePastedBadges } from './sheetImport'

const sample = readFileSync(new URL('../../docs/ImportSample.md', import.meta.url), 'utf8')

describe('sheet import utilities', () => {
  test('parses the documented import sample attributes', () => {
    const parsed = parsePastedAttributes(sample)
    expect(parsed.playerName).toBe('Marius de Romanus')
    expect(parsed.parsed).toBe(34)
    expect(parsed.startingValues['Driving Layup']).toBe(85)
    expect(parsed.startingValues['Mid Range']).toBe(70)
    expect(parsed.startingValues['Shot IQ']).toBe(80)
    expect(parsed.startingValues['Pass IQ']).toBe(80)
    expect(parsed.startingValues['Hands']).toBe(60)
    expect(parsed.startingValues['Stamina']).toBe(80)
    expect(parsed.startingValues['Hustle']).toBe(55)
    expect(parsed.startingValues['Defensive Consistency']).toBe(80)
    expect(parsed.startingValues['Help Defense IQ']).toBe(80)
    expect(parsed.startingValues['Offensive Consistency']).toBe(80)
  })

  test('parses the documented import sample badge tiers', () => {
    const parsed = parsePastedBadges(sample)
    expect(parsed['Float Game']).toBe('Silver')
    expect(Object.keys(parsed).length).toBeGreaterThan(10)
  })

  test('sanitizes imported player names', () => {
    const parsed = parsePastedAttributes('<script>alert(1)</script>\t99\t99\t99\t99\t99')
    expect(parsed.playerName).not.toContain('<')
    expect(parsed.playerName).not.toContain('>')
  })
})
