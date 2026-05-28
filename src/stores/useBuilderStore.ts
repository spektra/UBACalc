import { create } from 'zustand'
import type { BuildSetup, Tier } from '../types'
import { clearAllBuilds, loadBuild, saveBuild, getSavedPlayerNames, deleteBuild } from '../utils/storage'
import { sanitizePlayerName, clampAttribute, clampUC } from '../utils/sanitize'
import { getAttributeCap, getAttributeBase, lbsToWeightClass } from '../utils/caps'
import attributesData from '../data/attributes.json'

interface BuilderState {
  build: BuildSetup
  attributes: Record<string, number>
  startingValues: Record<string, number>
  touchedStartingValues: Record<string, true>
  ucBalance: number
  previouslyUnlocked: Record<string, Tier>
  saveAnchorName: string
  savedPlayers: string[]

  setBuild: (setup: Partial<BuildSetup>) => void
  setAttribute: (name: string, value: number) => void
  setStartingValue: (name: string, value: number) => void
  setStartingValuesBatch: (values: Record<string, number>) => void
  setPreviouslyUnlockedBatch: (badges: Record<string, Tier>) => void
  replacePreviouslyUnlocked: (badges: Record<string, Tier>) => void
  importPlayerAttributes: (playerName: string, values: Record<string, number>, ownedBadges: Record<string, Tier>) => void
  restoreSharedBuild: (
    build: BuildSetup,
    startingValues: Record<string, number>,
    attributes: Record<string, number>,
    ucBalance: number,
  ) => void
  setUCBalance: (balance: number) => void
  loadPlayerBuild: (name: string) => boolean
  resetBuild: () => void
  triggerSave: (manual?: boolean) => void
  deletePlayerBuild: (name: string) => void
  clearPlayerHistory: () => void
  refreshSavedPlayers: () => void
  resetAttribute: (name: string) => void
  resetAllAttributes: () => void
}

const defaultBuild: BuildSetup = {
  playerName: '',
  height: '',
  weightClass: '',
  primaryArchetype: '',
  secondaryArchetype: '',
  weakness: '',
  weightLbs: '',
}

const rawAttrs = attributesData as unknown as Record<string, { label: string; attributes: { name: string; default: number }[] }>
const attributeNames = Array.from(new Set(
  Object.entries(rawAttrs)
    .filter(([key]) => key !== '_comment')
    .flatMap(([, cat]) => cat.attributes.map((attr) => attr.name)),
))

const capDrivingFields: (keyof BuildSetup)[] = [
  'height',
  'weightClass',
  'primaryArchetype',
  'secondaryArchetype',
  'weakness',
]

function deriveStartingValues(
  build: BuildSetup,
  current: Record<string, number>,
  touched: Record<string, true>,
): Record<string, number> {
  const next: Record<string, number> = {}
  for (const name of attributeNames) {
    next[name] = touched[name] && current[name] !== undefined
      ? current[name]
      : getAttributeBase(name, build)
  }
  return next
}

function clampAttributesForBuild(
  build: BuildSetup,
  attributes: Record<string, number>,
): Record<string, number> {
  const next: Record<string, number> = {}
  for (const [name, value] of Object.entries(attributes)) {
    next[name] = clampAttribute(value, 25, getAttributeCap(name, build))
  }
  return next
}

export const useBuilderStore = create<BuilderState>((set, get) => ({
  build: defaultBuild,
  attributes: {},
  startingValues: {},
  touchedStartingValues: {},
  ucBalance: 0,
  previouslyUnlocked: {},
  saveAnchorName: '',
  savedPlayers: [],

  setBuild: (setup) => {
    const sanitized: Partial<BuildSetup> = {}
    if (setup.playerName !== undefined) sanitized.playerName = sanitizePlayerName(setup.playerName)
    if (setup.height !== undefined) sanitized.height = setup.height
    if (setup.weightClass !== undefined) sanitized.weightClass = setup.weightClass
    if (setup.primaryArchetype !== undefined) sanitized.primaryArchetype = setup.primaryArchetype
    if (setup.secondaryArchetype !== undefined) sanitized.secondaryArchetype = setup.secondaryArchetype
    if (setup.weakness !== undefined) sanitized.weakness = setup.weakness
    if (setup.weightLbs !== undefined) sanitized.weightLbs = setup.weightLbs

    const { build: currentBuild, startingValues: currentSV, touchedStartingValues, attributes } = get()
    const newBuild = { ...currentBuild, ...sanitized }
    const changed = Object.entries(sanitized).some(([key, value]) => currentBuild[key as keyof BuildSetup] !== value)
    if (!changed) return

    const capInputsChanged = capDrivingFields.some((field) => sanitized[field] !== undefined)
    set(capInputsChanged
      ? {
          build: newBuild,
          startingValues: deriveStartingValues(newBuild, currentSV, touchedStartingValues),
          attributes: clampAttributesForBuild(newBuild, attributes),
        }
      : { build: newBuild })
  },

  setAttribute: (name, value) => {
    const { build } = get()
    const hasCap = !!(build.height || build.weightClass || build.primaryArchetype || build.secondaryArchetype || build.weakness)
    const cap = hasCap ? getAttributeCap(name, build) : 99
    const clamped = clampAttribute(value, 25, cap)
    if (get().attributes[name] === clamped) return
    set((state) => ({
      attributes: { ...state.attributes, [name]: clamped },
    }))
  },

  setStartingValue: (name, value) => {
    const { build, startingValues, touchedStartingValues } = get()
    const hasCap = !!(build.height || build.weightClass || build.primaryArchetype || build.secondaryArchetype || build.weakness)
    const cap = hasCap ? getAttributeCap(name, build) : 99
    const clamped = clampAttribute(value, 25, cap)
    if (startingValues[name] === clamped && touchedStartingValues[name]) return
    set((state) => ({
      startingValues: { ...state.startingValues, [name]: clamped },
      touchedStartingValues: { ...state.touchedStartingValues, [name]: true },
    }))
  },

  setStartingValuesBatch: (values) => {
    const clamped: Record<string, number> = {}
    for (const [name, val] of Object.entries(values)) {
      clamped[name] = clampAttribute(val)
    }
    set((state) => ({
      startingValues: { ...state.startingValues, ...clamped },
      touchedStartingValues: {
        ...state.touchedStartingValues,
        ...Object.fromEntries(Object.keys(clamped).map((name) => [name, true])),
      },
    }))
  },

  setPreviouslyUnlockedBatch: (badges) => {
    set((state) => ({
      previouslyUnlocked: { ...state.previouslyUnlocked, ...badges },
    }))
  },

  replacePreviouslyUnlocked: (badges) => {
    set({ previouslyUnlocked: { ...badges } })
  },

  importPlayerAttributes: (playerName, values, ownedBadges) => {
    const clamped: Record<string, number> = {}
    for (const [name, val] of Object.entries(values)) {
      clamped[name] = clampAttribute(val)
    }

    set((state) => ({
      build: playerName ? { ...state.build, playerName: sanitizePlayerName(playerName) } : state.build,
      startingValues: clamped,
      touchedStartingValues: Object.fromEntries(Object.keys(clamped).map((name) => [name, true])),
      attributes: {},
      previouslyUnlocked: { ...ownedBadges },
      saveAnchorName: '',
    }))
  },

  restoreSharedBuild: (build, startingValues, attributes, ucBalance) => {
    const clampedStartingValues: Record<string, number> = {}
    for (const [name, val] of Object.entries(startingValues)) {
      clampedStartingValues[name] = clampAttribute(val)
    }

    set({
      build,
      startingValues: clampedStartingValues,
      touchedStartingValues: Object.fromEntries(Object.keys(clampedStartingValues).map((name) => [name, true])),
      attributes: clampAttributesForBuild(build, attributes),
      ucBalance: clampUC(ucBalance),
      saveAnchorName: '',
    })
  },

  setUCBalance: (balance) => {
    const clamped = clampUC(balance)
    if (get().ucBalance === clamped) return
    set({ ucBalance: clamped })
  },

  loadPlayerBuild: (name) => {
    try {
      const saved = loadBuild(name)
      if (!saved) return false
      const build = { ...saved.build }
      const lbs = parseInt(build.weightLbs, 10)
      if (!isNaN(lbs) && lbs >= 160 && lbs <= 300) {
        const derived = lbsToWeightClass(lbs)
        if (derived) build.weightClass = derived
      }
      set({
        build,
        startingValues: { ...saved.startingValues },
        touchedStartingValues: saved.touchedStartingValues ?? Object.fromEntries(
          Object.keys(saved.startingValues).map((key) => [key, true]),
        ),
        attributes: { ...(saved.attributes ?? {}) },
        ucBalance: saved.ucBalance,
        previouslyUnlocked: saved.previouslyUnlocked ?? {},
        saveAnchorName: saved.playerName,
      })
      return true
    } catch {
      return false
    }
  },

  resetBuild: () => {
    set({
      build: { ...defaultBuild },
      attributes: {},
      startingValues: {},
      touchedStartingValues: {},
      ucBalance: 0,
      previouslyUnlocked: {},
      saveAnchorName: '',
    })
  },

  triggerSave: (manual = false) => {
    const { build, startingValues, attributes, ucBalance, previouslyUnlocked, touchedStartingValues, saveAnchorName } = get()
    if (!build.playerName.trim()) return
    if (!manual && saveAnchorName.toLowerCase() !== build.playerName.trim().toLowerCase()) return
    saveBuild(build.playerName, build, startingValues, attributes, ucBalance, previouslyUnlocked, touchedStartingValues)
    set({ saveAnchorName: build.playerName.trim() })
    get().refreshSavedPlayers()
  },

  deletePlayerBuild: (name) => {
    try {
      deleteBuild(name)
      get().refreshSavedPlayers()
    } catch {
      // storage unavailable
    }
  },

  clearPlayerHistory: () => {
    try {
      clearAllBuilds()
      set({ savedPlayers: [], saveAnchorName: '' })
    } catch {
      // storage unavailable
    }
  },

  refreshSavedPlayers: () => {
    try {
      set({ savedPlayers: getSavedPlayerNames() })
    } catch {
      // storage unavailable
    }
  },

  resetAttribute: (name) => {
    const { startingValues } = get()
    if (startingValues[name] !== undefined) {
      if (get().attributes[name] === startingValues[name]) return
      set((state) => ({ attributes: { ...state.attributes, [name]: startingValues[name] } }))
    } else {
      set((state) => {
        const { [name]: _del, ...rest } = state.attributes
        void _del
        return { attributes: rest }
      })
    }
  },

  resetAllAttributes: () => {
    const { startingValues } = get()
    set({ attributes: { ...startingValues } })
  },
}))
