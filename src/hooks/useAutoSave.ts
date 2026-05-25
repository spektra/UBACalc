// useAutoSave — debounced auto-save for player builds.
// waits 1.5s after the last change, then saves to localStorage.
// it's not perfect, but it's better than losing your build.

import { useEffect, useRef } from 'react'
import { useBuilderStore } from '../stores/useBuilderStore'

export function useAutoSave(delay = 1500) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const build = useBuilderStore((s) => s.build)
  const startingValues = useBuilderStore((s) => s.startingValues)
  const ucBalance = useBuilderStore((s) => s.ucBalance)
  const triggerSave = useBuilderStore((s) => s.triggerSave)

  useEffect(() => {
    if (!build.playerName.trim()) return

    if (timerRef.current) clearTimeout(timerRef.current)

    timerRef.current = setTimeout(() => {
      triggerSave()
    }, delay)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [build, startingValues, ucBalance, delay, triggerSave])
}
