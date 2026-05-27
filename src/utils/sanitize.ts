// sanitize.ts — input cleaning so nobody injects XSS into their own player name.
// it's client-side only, but still, better safe than sorry.

export function sanitizePlayerName(input: string): string {
  if (typeof input !== 'string') return ''
  return sanitizePlainText(input, 40).replace(/[\t\r\n<>"'`]/g, '')
}

export function sanitizePlainText(input: string, maxLength = 2000): string {
  if (typeof input !== 'string') return ''
  return Array.from(input.normalize('NFKC'))
    .filter((char) => {
      const code = char.charCodeAt(0)
      const allowedWhitespace = char === '\t' || char === '\n' || char === '\r'
      return allowedWhitespace || (code >= 32 && code !== 127)
    })
    .join('')
    .replace(/[<>]/g, '')
    .slice(0, maxLength)
}

export function clampAttribute(value: number, min = 25, max = 99): number {
  const n = Number.isFinite(value) ? Math.round(value) : min
  if (n < min) return min
  if (n > max) return max
  return n
}

export function clampUC(value: number): number {
  const n = Number.isFinite(value) ? Math.round(value) : 0
  if (n < 0) return 0
  if (n > 999999) return 999999
  return n
}

export function validateBuildSetup(setup: {
  playerName?: string
  height?: string
  weightClass?: string
  primaryArchetype?: string
  secondaryArchetype?: string
  weakness?: string
}): string[] {
  const errors: string[] = []
  if (setup.playerName !== undefined && setup.playerName.trim().length === 0) {
    errors.push('Player name is required')
  }
  if (setup.height !== undefined && setup.height === '') {
    errors.push('Height is required')
  }
  if (setup.weightClass !== undefined && setup.weightClass === '') {
    errors.push('Weight class is required')
  }
  if (setup.primaryArchetype !== undefined && setup.primaryArchetype === '') {
    errors.push('Primary archetype is required')
  }
  return errors
}
