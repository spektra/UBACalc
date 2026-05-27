import { readFileSync } from 'node:fs'
import { describe, expect, test } from 'vitest'
import { parsePastedAttributes, parsePastedBadges } from './sheetImport'

const sample = readFileSync(new URL('../../docs/ImportSample.md', import.meta.url), 'utf8')

describe('sheet import utilities', () => {
  test('parses the documented import sample attributes', () => {
    const parsed = parsePastedAttributes(sample)
    expect(parsed.playerName).toBe('Marius de Romanus')
    expect(parsed.parsed).toBeGreaterThan(25)
    expect(parsed.startingValues['Driving Layup']).toBe(85)
    expect(parsed.startingValues['Mid Range']).toBe(70)
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
