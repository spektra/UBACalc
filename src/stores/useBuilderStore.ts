import { create } from 'zustand'
import type { BuildSetup } from '../types'
import { loadBuild, saveBuild, getSavedPlayerNames } from '../utils/storage'
import { sanitizePlayerName, clampAttribute, clampUC } from '../utils/sanitize'
import { getAttributeCap, getAttributeBase } from '../utils/caps'
import attributesData from '../data/attributes.json'

interface BuilderState {
  build: BuildSetup
  attributes: Record<string, number>
  startingValues: Record<string, number>
  ucBalance: number
  previouslyUnlocked: Record<string, 'Bronze' | 'Silver' | 'Gold' | 'HOF'>
  savedPlayers: string[]

  setBuild: (setup: Partial<BuildSetup>) => void
  setAttribute: (name: string, value: number) => void
  setStartingValue: (name: string, value: number) => void
  setStartingValuesBatch: (values: Record<string, number>) => void
  setUCBalance: (balance: number) => void
  loadPlayerBuild: (name: string) => boolean
  resetBuild: () => void
  triggerSave: () => void
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
}

export const useBuilderStore = create<BuilderState>((set, get) => ({
  build: defaultBuild,
  attributes: {},
  startingValues: {},
  ucBalance: 0,
  previouslyUnlocked: {},
  savedPlayers: [],

  setBuild: (setup) => {
    const sanitized: Partial<BuildSetup> = {}
    if (setup.playerName !== undefined) sanitized.playerName = sanitizePlayerName(setup.playerName)
    if (setup.height !== undefined) sanitized.height = setup.height
    if (setup.weightClass !== undefined) sanitized.weightClass = setup.weightClass
    if (setup.primaryArchetype !== undefined) sanitized.primaryArchetype = setup.primaryArchetype
    if (setup.secondaryArchetype !== undefined) sanitized.secondaryArchetype = setup.secondaryArchetype
    if (setup.weakness !== undefined) sanitized.weakness = setup.weakness

    const { build: currentBuild } = get()
    const newBuild = { ...currentBuild, ...sanitized }

    const rawAttrs = attributesData as unknown as Record<string, { label: string; attributes: { name: string; default: number }[] }>
    const cats = Object.entries(rawAttrs).filter(([k]) => k !== '_comment')
    const newStartingValues: Record<string, number> = {}
    for (const [, cat] of cats) {
      for (const attr of cat.attributes) {
        newStartingValues[attr.name] = getAttributeBase(attr.name, newBuild)
      }
    }

    set({ build: newBuild, startingValues: newStartingValues })
  },

  setAttribute: (name, value) => {
    const { build } = get()
    const cap = build.height && build.primaryArchetype ? getAttributeCap(name, build) : 99
    const clamped = clampAttribute(value, 25, cap)
    set((state) => ({
      attributes: { ...state.attributes, [name]: clamped },
    }))
  },

  setStartingValue: (name, value) => {
    const clamped = clampAttribute(value)
    set((state) => ({
      startingValues: { ...state.startingValues, [name]: clamped },
    }))
  },

  setStartingValuesBatch: (values) => {
    const clamped: Record<string, number> = {}
    for (const [name, val] of Object.entries(values)) {
      clamped[name] = clampAttribute(val)
    }
    set((state) => ({
      startingValues: { ...state.startingValues, ...clamped },
    }))
  },

  setUCBalance: (balance) => {
    const clamped = clampUC(balance)
    set({ ucBalance: clamped })
  },

  loadPlayerBuild: (name) => {
    try {
      const saved = loadBuild(name)
      if (!saved) return false
      set({
        build: { ...saved.build },
        startingValues: { ...saved.startingValues },
        attributes: {},
        ucBalance: saved.ucBalance,
        previouslyUnlocked: {},
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
      ucBalance: 0,
      previouslyUnlocked: {},
    })
  },

  triggerSave: () => {
    const { build, startingValues, ucBalance } = get()
    if (!build.playerName.trim()) return
    saveBuild(build.playerName, build, startingValues, ucBalance)
    get().refreshSavedPlayers()
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
