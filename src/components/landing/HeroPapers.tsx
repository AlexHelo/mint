import { motion, useReducedMotion } from 'motion/react'
import papers from '@/assets/rfp-papers.avif'

/**
 * The RFP-papers illustration with a layered entrance:
 * the stack rises and settles on load, then breathes with a slow drift +
 * tilt (not a flat up-down bob). A soft mint halo pulses behind it to give
 * the "documents lifting off" energy. Reduced-motion shows it static.
 */
export function HeroPapers() {
  const reduce = useReducedMotion()

  if (reduce) {
    return (
      <div className="relative hidden justify-center lg:flex">
        <img
          src={papers}
          alt="Documentos de licitación elevándose"
          className="w-[360px] drop-shadow-2xl"
          width={480}
          height={718}
        />
      </div>
    )
  }

  return (
    <div className="relative hidden items-center justify-center lg:flex">
      {/* pulsing halo behind the papers */}
      <motion.div
        className="absolute h-72 w-72 rounded-full bg-mint/30 blur-[90px]"
        animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.img
        src={papers}
        alt="Documentos de licitación elevándose"
        className="relative w-[360px] drop-shadow-2xl"
        width={480}
        height={718}
        // Entrance: rise up from below and settle.
        initial={{ opacity: 0, y: 60, scale: 0.92 }}
        animate={{
          opacity: 1,
          // settle, then a slow continuous drift + tilt
          y: [0, -14, 0],
          rotate: [0, 1.2, 0, -1.2, 0],
          scale: 1,
        }}
        transition={{
          opacity: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
          scale: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
          y: { duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.7 },
          rotate: {
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.7,
          },
        }}
        style={{ transformOrigin: 'bottom center' }}
      />
    </div>
  )
}
