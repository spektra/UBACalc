import { create } from 'zustand'

type Theme = 'dark' | 'light'
type SeasonMode = 'summer' | 'winter'

interface ThemeState {
  theme: Theme
  mode: SeasonMode
  toggle: () => void
  setMode: (m: SeasonMode) => void
}

function getInitialTheme(): Theme {
  try {
    const stored = localStorage.getItem('uba-theme')
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    // localStorage is a fickle mistress
  }
  return 'dark'
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: getInitialTheme(),
  mode: 'winter',

  toggle: () =>
    set((state) => {
      const next = state.theme === 'dark' ? 'light' : 'dark'
      try {
        localStorage.setItem('uba-theme', next)
      } catch {
        // probably Safari private mode being difficult
      }
      return { theme: next }
    }),

  setMode: (mode) => set({ mode }),
}))
