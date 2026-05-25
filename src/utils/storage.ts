// storage.ts — localStorage persistence for player builds.
// if localStorage breaks (safari private mode, storage full, your cat walked on the keyboard),
// we just return empty results and move on.

import type { BuildSetup } from '../types'

const STORAGE_KEY = 'uba-saved-builds'
const MAX_BUILDS = 50

export interface SavedBuild {
  playerName: string
  build: BuildSetup
  startingValues: Record<string, number>
  ucBalance: number
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

export function loadAllBuilds(): SavedBuild[] {
  try {
    const raw = getRaw()
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (b: unknown): b is SavedBuild =>
        typeof b === 'object' &&
        b !== null &&
        typeof (b as SavedBuild).playerName === 'string' &&
        typeof (b as SavedBuild).build === 'object',
    )
  } catch {
    return []
  }
}

export function loadBuild(name: string): SavedBuild | null {
  const builds = loadAllBuilds()
  return builds.find((b) => b.playerName.toLowerCase() === name.toLowerCase()) ?? null
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
  ucBalance: number,
): void {
  if (!playerName.trim()) return

  try {
    const builds = loadAllBuilds()
    const entry: SavedBuild = {
      playerName: playerName.trim(),
      build,
      startingValues,
      ucBalance,
      updatedAt: new Date().toISOString(),
    }

    const idx = builds.findIndex(
      (b) => b.playerName.toLowerCase() === playerName.toLowerCase(),
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
    const builds = loadAllBuilds().filter(
      (b) => b.playerName.toLowerCase() !== name.toLowerCase(),
    )
    setRaw(builds)
  } catch (e) {
    console.warn('Failed to delete build:', e)
  }
}

export function getSavedPlayerNames(): string[] {
  return loadAllBuilds().map((b) => b.playerName)
}
