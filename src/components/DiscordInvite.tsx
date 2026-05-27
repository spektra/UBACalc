import { motion } from 'framer-motion'

export function DiscordInvite() {
  return (
    <motion.a
      href="https://discord.gg/EBmvWjtnx"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="premium-chip fixed bottom-4 right-3 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2 rounded-2xl border border-uba-gold/30 bg-uba-card/90 px-3 py-2 sm:px-4 sm:py-3 text-sm font-semibold text-uba-text shadow-lg shadow-black/30 transition-all duration-300 hover:border-uba-gold/60 hover:shadow-[0_0_30px_-8px_rgba(242,211,153,0.34)]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 127.14 96.36"
        className="h-5 w-5 fill-current text-uba-gold"
      >
        <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,56.6,124.52,32.64,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
      </svg>
      <span className="hidden sm:inline">Join the UBA Discord</span>
      <span className="sm:hidden">Discord</span>
    </motion.a>
  )
}
