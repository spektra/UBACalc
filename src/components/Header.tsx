// Header — app header with logo, title, theme toggle, season label, unsaved changes indicator.
// the amber dot in the corner tells you if there are unsaved changes since the last auto-save.

import { useMemo } from 'react'
import logo from '/logo.png'
import { useThemeStore } from '../stores/useThemeStore'
import { useBuilderStore } from '../stores/useBuilderStore'

export function Header({ onImportClick }: { onImportClick?: () => void }) {
  const { theme, toggle } = useThemeStore()
  const { build, attributes } = useBuilderStore()

  const hasUnsaved = useMemo(() => {
    if (!build.playerName.trim()) return false
    const saved = localStorage.getItem('uba-saved-builds')
    if (!saved) return true
    try {
      const builds = JSON.parse(saved)
      const existing = Array.isArray(builds)
        ? builds.find((b: { playerName: string }) => b.playerName?.toLowerCase() === build.playerName.toLowerCase())
        : null
      if (!existing) return true
      const currentAttr = JSON.stringify(attributes)
      const savedAttr = JSON.stringify(existing.attributes || {})
      return currentAttr !== savedAttr
    } catch {
      return false
    }
  }, [build.playerName, attributes])

  return (
    <header className="relative z-10 border-b border-uba-border/50 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img src={logo} alt="UBA" className="h-10 w-10 rounded-lg object-cover ring-1 ring-uba-gold/20" />
            {hasUnsaved && (
              <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.6)]" />
            )}
          </div>
          <span className="text-lg font-semibold tracking-tight text-uba-text">
            UBA <span className="text-uba-gold">Upgrade Calculator</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className="flex items-center gap-1.5 rounded-xl border border-uba-border/50 px-3 py-1.5 text-xs font-medium text-uba-text-muted transition-all duration-200 hover:border-uba-gold/30 hover:text-uba-gold active:scale-95"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
              </svg>
            )}
            <span className="hidden sm:inline">{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>
          <button
            onClick={onImportClick}
            className="sheet-import-trigger flex items-center gap-1.5 rounded-xl border border-uba-gold/20 bg-uba-gold/10 px-3 py-1.5 text-xs font-medium text-uba-gold transition-all duration-200 hover:bg-uba-gold/20 hover:shadow-[0_0_12px_-4px_rgba(230,198,147,0.25)] active:scale-95"
            title="Import player attributes from Google Sheets"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
              <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
            </svg>
            <span className="hidden sm:inline">Import</span>
          </button>
          <div className="flex items-center gap-2 text-sm text-uba-text-muted">
            <span className="hidden sm:inline">NBA 2K26</span>
            <span className="hidden sm:inline">·</span>
            <span>Season 1</span>
          </div>
        </div>
      </div>
    </header>
  )
}
