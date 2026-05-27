import { describe, expect, test } from 'vitest'
import { clampAttribute, clampUC, sanitizePlainText, sanitizePlayerName } from './sanitize'

describe('sanitize utilities', () => {
  test('removes executable markup from player names', () => {
    expect(sanitizePlayerName('<img src=x onerror=alert(1)>Marius`"\'')).toBe('img src=x onerror=alert(1)Marius')
  })

  test('keeps pasted sheet text as plain text only', () => {
    expect(sanitizePlainText('A\u0000<script>B</script>', 20)).toBe('AscriptB/script')
  })

  test('clamps attributes and UC to supported ranges', () => {
    expect(clampAttribute(120)).toBe(99)
    expect(clampAttribute(10)).toBe(25)
    expect(clampUC(-1)).toBe(0)
    expect(clampUC(2_000_000)).toBe(999999)
  })
})
