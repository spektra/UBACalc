import { useEffect, useRef } from 'react'

export function useAudioGreeting() {
  const playedRef = useRef(false)

  useEffect(() => {
    function handleInteraction() {
      if (playedRef.current) return
      playedRef.current = true

      const audio = new Audio('/welcome.opus')
      audio.volume = 0.4
      audio.play().catch(() => {
        // browser probably blocked autoplay, whatever, it's fine
      })

      document.removeEventListener('click', handleInteraction)
      document.removeEventListener('touchstart', handleInteraction)
    }

    document.addEventListener('click', handleInteraction)
    document.addEventListener('touchstart', handleInteraction)

    return () => {
      document.removeEventListener('click', handleInteraction)
      document.removeEventListener('touchstart', handleInteraction)
    }
  }, [])
}
