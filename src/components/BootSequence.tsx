import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { bootLines, systemBrand } from '../data/portfolio'
import { holoBootExitVariants, holoEase, holoSpringSoft } from '../lib/hologramMotion'

type BootSequenceProps = {
  onComplete: () => void
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [lineIndex, setLineIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    if (lineIndex >= bootLines.length) {
      const timer = window.setTimeout(() => setExiting(true), 500)
      return () => window.clearTimeout(timer)
    }

    const timer = window.setTimeout(() => {
      setLineIndex((prev) => prev + 1)
      setProgress(((lineIndex + 1) / bootLines.length) * 100)
    }, 520)

    return () => window.clearTimeout(timer)
  }, [lineIndex])

  useEffect(() => {
    if (!exiting) return
    const timer = window.setTimeout(() => setDone(true), 900)
    return () => window.clearTimeout(timer)
  }, [exiting])

  useEffect(() => {
    if (!done) return
    const timer = window.setTimeout(onComplete, 200)
    return () => window.clearTimeout(timer)
  }, [done, onComplete])

  return (
    <AnimatePresence mode="wait">
      {!done ? (
        <motion.div
          className="boot-sequence"
          initial={{ opacity: 1 }}
          animate={exiting ? 'exit' : { opacity: 1 }}
          variants={holoBootExitVariants}
          exit="exit"
        >
          <div className="boot-holo-grid" aria-hidden="true" />
          <motion.div
            className="boot-scan-wipe"
            aria-hidden="true"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={
              exiting
                ? { scaleY: 1, opacity: 0.85, transition: { duration: 1.1, ease: holoEase } }
                : { scaleY: 0, opacity: 0 }
            }
          />
          <motion.div
            className="boot-core"
            initial={{ opacity: 0, y: 24, rotateX: 8, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
            transition={{ ...holoSpringSoft, opacity: { duration: 0.7, ease: holoEase } }}
          >
            <div className="boot-reactor">
              <span />
              <span />
              <span />
            </div>
            <p className="boot-label">
              {systemBrand.fullName.toUpperCase()} // {systemBrand.name.toUpperCase()}
            </p>
            <div className="boot-log">
              {bootLines.slice(0, lineIndex).map((line) => (
                <motion.p
                  key={line}
                  initial={{ opacity: 0, x: -12, filter: 'blur(2px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.55, ease: holoEase }}
                >
                  <span className="boot-prompt">&gt;</span> {line}
                </motion.p>
              ))}
            </div>
            <div className="boot-progress">
              <motion.div animate={{ width: `${progress}%` }} transition={{ duration: 0.6, ease: holoEase }} />
            </div>
            <p className="boot-percent">{Math.round(progress)}%</p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
