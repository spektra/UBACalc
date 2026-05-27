// storage.ts — localStorage persistence for player builds.
// if localStorage breaks (safari private mode, storage full, your cat walked on the keyboard),
// we just return empty results and move on.

import type { BuildSetup, Tier } from '../types'
import {
  sanitizeAttributeRecord,
  sanitizeBuildSetup,
  sanitizeTierRecord,
  sanitizeTouchedRecord,
  sanitizeUC,
} from './validation'

const STORAGE_KEY = 'uba-saved-builds'
const MAX_BUILDS = 50

export interface SavedBuild {
  playerName: string
  build: BuildSetup
  startingValues: Record<string, number>
  attributes: Record<string, number>
  ucBalance: number
  previouslyUnlocked?: Record<string, Tier>
  touchedStartingValues?: Record<string, true>
  updatedAt: string
}

function getRaw(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

function setRaw(data: SavedBuild[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (e) {
    console.warn('Failed to save to localStorage:', e)
  }
}

function normalizeSavedBuild(input: unknown): SavedBuild | null {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return null
  const candidate = input as Partial<SavedBuild>
  if (typeof candidate.playerName !== 'string') return null

  const playerName = sanitizeBuildSetup({ playerName: candidate.playerName }).playerName
  if (!playerName) return null

  const build = sanitizeBuildSetup({ ...candidate.build, playerName })
  const startingValues = sanitizeAttributeRecord(candidate.startingValues)
  const attributes = sanitizeAttributeRecord(candidate.attributes)
  const previouslyUnlocked = sanitizeTierRecord(candidate.previouslyUnlocked)
  const touchedStartingValues = sanitizeTouchedRecord(candidate.touchedStartingValues)
  const updatedAt = typeof candidate.updatedAt === 'string' && !Number.isNaN(Date.parse(candidate.updatedAt))
    ? candidate.updatedAt
    : new Date(0).toISOString()

  return {
    playerName,
    build,
    startingValues,
    attributes,
    ucBalance: sanitizeUC(candidate.ucBalance),
    previouslyUnlocked,
    touchedStartingValues,
    updatedAt,
  }
}

export function loadAllBuilds(): SavedBuild[] {
  try {
    const raw = getRaw()
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed
      .map(normalizeSavedBuild)
      .filter((b): b is SavedBuild => b !== null)
  } catch {
    return []
  }
}

export function loadBuild(name: string): SavedBuild | null {
  const builds = loadAllBuilds()
  const normalized = name.trim().toLowerCase()
  return builds.find((b) => b.playerName.toLowerCase() === normalized) ?? null
}

export function searchBuilds(query: string): SavedBuild[] {
  if (!query.trim()) return []
  const q = query.toLowerCase()
  return loadAllBuilds().filter((b) => b.playerName.toLowerCase().includes(q))
}

export function saveBuild(
  playerName: string,
  build: BuildSetup,
  startingValues: Record<string, number>,
  attributes: Record<string, number>,
  ucBalance: number,
  previouslyUnlocked?: Record<string, Tier>,
  touchedStartingValues?: Record<string, true>,
): void {
  const cleanPlayerName = sanitizeBuildSetup({ playerName }).playerName
  if (!cleanPlayerName) return

  try {
    const builds = loadAllBuilds()
    const cleanBuild = sanitizeBuildSetup({ ...build, playerName: cleanPlayerName })
    const entry: SavedBuild = {
      playerName: cleanPlayerName,
      build: cleanBuild,
      startingValues: sanitizeAttributeRecord(startingValues),
      attributes: sanitizeAttributeRecord(attributes),
      ucBalance: sanitizeUC(ucBalance),
      previouslyUnlocked: sanitizeTierRecord(previouslyUnlocked),
      touchedStartingValues: sanitizeTouchedRecord(touchedStartingValues),
      updatedAt: new Date().toISOString(),
    }

    const idx = builds.findIndex(
      (b) => b.playerName.toLowerCase() === cleanPlayerName.toLowerCase(),
    )

    if (idx >= 0) {
      builds[idx] = entry
    } else {
      builds.push(entry)
    }

    if (builds.length > MAX_BUILDS) {
      builds.sort(
        (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      )
      builds.length = MAX_BUILDS
    }

    setRaw(builds)
  } catch (e) {
    console.warn('Failed to save build:', e)
  }
}

export function deleteBuild(name: string): void {
  try {
    const normalized = name.trim().toLowerCase()
    const builds = loadAllBuilds().filter(
      (b) => b.playerName.toLowerCase() !== normalized,
    )
    setRaw(builds)
  } catch (e) {
    console.warn('Failed to delete build:', e)
  }
}

export function clearAllBuilds(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (e) {
    console.warn('Failed to clear saved builds:', e)
  }
}

export function getSavedPlayerNames(): string[] {
  return loadAllBuilds().map((b) => b.playerName)
}
