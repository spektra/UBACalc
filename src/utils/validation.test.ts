import { describe, expect, it } from 'vitest'
import { sanitizeAttributeRecord, sanitizeTierRecord } from './validation'

describe('validation allowlists', () => {
  it('preserves owned badge history by badge name', () => {
    expect(sanitizeTierRecord({
      'Float Game': 'Silver',
      Posterizer: 'Bronze',
      'Driving Dunk': 'Gold',
      FakeBadge: 'HOF',
      '__proto__': 'Legend',
      Deadeye: 'Diamond',
    })).toEqual({
      'Float Game': 'Silver',
      Posterizer: 'Bronze',
    })
  })

  it('keeps attribute records keyed by attributes, not badges', () => {
    expect(sanitizeAttributeRecord({
      'Driving Dunk': 80,
      'Float Game': 95,
      Posterizer: 99,
    })).toEqual({
      'Driving Dunk': 80,
    })
  })
})
