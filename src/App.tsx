// App — main layout component. handles theme sync, audio greeting, auto-save, and share URL loading.
// on mount, checks for a build encoded in the URL hash and restores it.

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAutoSave } from './hooks/useAutoSave'
import { useAudioGreeting } from './hooks/useAudioGreeting'
import { useThemeStore } from './stores/useThemeStore'
import { useBuilderStore } from './stores/useBuilderStore'
import { Header } from './components/Header'
import { BuildSetupForm } from './components/BuildSetupForm'
import { AttributePanel } from './components/AttributePanel'
import { BudgetTracker } from './components/BudgetTracker'
import { BadgeFeed } from './components/BadgeFeed'
import { SubmissionOutput } from './components/SubmissionOutput'
import { DiscordInvite } from './components/DiscordInvite'
import { decodeBuild } from './utils/share'

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
}

function App() {
  useAutoSave()
  useAudioGreeting()
  const { theme } = useThemeStore()
  const { setBuild, setUCBalance, setStartingValue } = useBuilderStore()

  const html = document.documentElement
  html.classList.remove('dark', 'light')
  html.classList.add(theme)

  useEffect(() => {
    if (window.location.hash) {
      const data = decodeBuild(window.location.hash)
      if (data) {
        setBuild(data.b)
        setUCBalance(data.u)
        for (const [name, val] of Object.entries(data.s)) {
          setStartingValue(name, val)
        }
        window.location.hash = ''
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="relative min-h-screen bg-uba-canvas">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 right-1/4 h-[500px] w-[500px] rounded-full bg-uba-blue/10 blur-[120px]" />
        <div className="absolute -bottom-40 left-1/4 h-[400px] w-[400px] rounded-full bg-uba-gold/5 blur-[100px]" />
      </div>

      <Header />

      <motion.main
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12"
      >
        <motion.div variants={fadeUp} className="mb-12 text-center">
          <div className="mb-4 flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-uba-gold/40" />
            <span className="text-xs font-medium uppercase tracking-[0.15em] text-uba-gold">
              Fantasy League Tool
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-uba-gold/40" />
          </div>
          <h1 className="bg-gradient-to-b from-uba-text via-uba-text to-uba-text/60 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl lg:text-6xl">
            Build Your Player
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-base text-uba-text-muted sm:text-lg">
            Set your archetype, allocate attributes, and track your UC budget in real time.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          <motion.div variants={fadeUp} className="lg:col-span-1">
            <BuildSetupForm />
          </motion.div>

          <motion.div variants={fadeUp} className="lg:col-span-2 space-y-6">
            <BudgetTracker />
            <AttributePanel />
          </motion.div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <motion.div variants={fadeUp}>
            <BadgeFeed />
          </motion.div>
          <motion.div variants={fadeUp}>
            <SubmissionOutput />
          </motion.div>
        </div>
      </motion.main>

      <DiscordInvite />
    </div>
  )
}

export default App
