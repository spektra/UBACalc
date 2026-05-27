// share.ts — encode/decode build state as base64 JSON in the URL hash.
// this lets you share your build with a single link.
// is it secure? no. is it practical? surprisingly yes.

import type { BuildSetup } from '../types'
import { clampAttribute, clampUC, sanitizePlayerName } from './sanitize'

interface ShareData {
  b: BuildSetup
  s: Record<string, number> // startingValues
  a: Record<string, number> // attributes
  u: number // ucBalance
}

function sanitizeBuild(build: BuildSetup): BuildSetup {
  return {
    playerName: sanitizePlayerName(build.playerName ?? ''),
    height: typeof build.height === 'string' ? build.height.slice(0, 8) : '',
    weightClass: typeof build.weightClass === 'string' ? build.weightClass.slice(0, 30) : '',
    primaryArchetype: typeof build.primaryArchetype === 'string' ? build.primaryArchetype.slice(0, 30) : '',
    secondaryArchetype: typeof build.secondaryArchetype === 'string' ? build.secondaryArchetype.slice(0, 30) : '',
    weakness: typeof build.weakness === 'string' ? build.weakness.slice(0, 30) : '',
    weightLbs: typeof build.weightLbs === 'string' ? build.weightLbs.replace(/[^0-9]/g, '').slice(0, 3) : '',
  }
}

function sanitizeNumberRecord(input: unknown): Record<string, number> {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return {}
  const result: Record<string, number> = {}
  for (const [name, value] of Object.entries(input)) {
    if (typeof name !== 'string' || name === '__proto__' || name === 'constructor' || name === 'prototype') continue
    const num = typeof value === 'number' ? value : Number(value)
    if (Number.isFinite(num)) result[name] = clampAttribute(num)
  }
  return result
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
    const json = decodeURIComponent(atob(cleaned))
    const data = JSON.parse(json) as ShareData
    if (!data.b || !data.s || data.u === undefined) return null
    return {
      b: sanitizeBuild(data.b),
      s: sanitizeNumberRecord(data.s),
      a: sanitizeNumberRecord(data.a),
      u: clampUC(Number(data.u)),
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
