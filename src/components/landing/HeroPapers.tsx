import { motion, useReducedMotion } from 'motion/react'
import papers from '@/assets/rfp-papers.avif'

/**
 * The RFP-papers illustration. Large and static (a quiet one-time fade-in on
 * load, no perpetual motion). Sized to fill the hero's right column and bleed
 * slightly past it. Hidden below lg.
 */
export function HeroPapers() {
  const reduce = useReducedMotion()

  return (
    <div className="relative hidden items-center justify-center lg:flex">
      <motion.img
        src={papers}
        alt="Documentos de licitación elevándose"
        className="relative w-[460px] max-w-none drop-shadow-2xl xl:w-[540px]"
        width={480}
        height={718}
        loading="eager"
        initial={reduce ? false : { opacity: 0, scale: 0.97 }}
        animate={reduce ? undefined : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  )
}
