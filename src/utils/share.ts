// share.ts — encode/decode build state as base64 JSON in the URL hash.
// this lets you share your build with a single link.
// is it secure? no. is it practical? surprisingly yes.

import type { BuildSetup } from '../types'
import {
  sanitizeAttributeRecord,
  sanitizeBuildSetup,
  sanitizeUC,
} from './validation'

const MAX_SHARE_HASH_LENGTH = 16000

interface ShareData {
  b: BuildSetup
  s: Record<string, number> // startingValues
  a: Record<string, number> // attributes
  u: number // ucBalance
}

export function encodeBuild(
  build: BuildSetup,
  startingValues: Record<string, number>,
  attributes: Record<string, number>,
  ucBalance: number,
): string {
  const data: ShareData = { b: build, s: startingValues, a: attributes, u: ucBalance }
  try {
    const json = JSON.stringify(data)
    return btoa(encodeURIComponent(json))
  } catch {
    return ''
  }
}

export function decodeBuild(hash: string): ShareData | null {
  try {
    const cleaned = hash.replace(/^#/, '')
    if (cleaned.length > MAX_SHARE_HASH_LENGTH) return null
    const json = decodeURIComponent(atob(cleaned))
    const data = JSON.parse(json) as ShareData
    if (!data.b || !data.s || data.u === undefined) return null
    return {
      b: sanitizeBuildSetup(data.b),
      s: sanitizeAttributeRecord(data.s),
      a: sanitizeAttributeRecord(data.a),
      u: sanitizeUC(data.u),
    }
  } catch {
    return null
  }
}

export function buildShareUrl(
  build: BuildSetup,
  startingValues: Record<string, number>,
  attributes: Record<string, number>,
  ucBalance: number,
): string {
  const encoded = encodeBuild(build, startingValues, attributes, ucBalance)
  if (!encoded) return ''
  const url = new URL(window.location.href)
  url.hash = encoded
  return url.toString()
}
