import type { Transition, Variants } from 'framer-motion'

/** Smooth cinematic ease — gentle deceleration, no snap */
export const holoEase: Transition['ease'] = [0.25, 0.1, 0.25, 1]

/** Responsive spring for interactive UI */
export const holoSpring: Transition = {
  type: 'spring',
  stiffness: 72,
  damping: 20,
  mass: 0.9,
}

export const holoSpringSoft: Transition = {
  type: 'spring',
  stiffness: 58,
  damping: 22,
  mass: 1,
}

export const holoSpringSnappy: Transition = {
  type: 'spring',
  stiffness: 88,
  damping: 24,
  mass: 0.75,
}

export const holoCardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      ...holoSpringSoft,
      opacity: { duration: 0.45, ease: holoEase },
    },
  },
}

export const holoGridVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
}

export const holoHeaderVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -24,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      ...holoSpring,
      opacity: { duration: 0.5, ease: holoEase },
    },
  },
}

export const holoModalBackdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: holoEase },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.35, ease: holoEase },
  },
}

export const holoModalVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
    y: 32,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      ...holoSpring,
      opacity: { duration: 0.42, ease: holoEase },
    },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    y: -16,
    transition: { duration: 0.35, ease: holoEase },
  },
}

export const holoHeroPanelVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ...holoSpringSoft,
      delay: 0.12,
      opacity: { duration: 0.55, ease: holoEase },
    },
  },
}

export const holoHeroProfileVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
    scale: 0.99,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      ...holoSpringSoft,
      delay: 0.22,
      opacity: { duration: 0.55, ease: holoEase },
    },
  },
}

export const holoNavVariants: Variants = {
  hidden: { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ...holoSpring,
      delay: 0.06,
      opacity: { duration: 0.45, ease: holoEase },
    },
  },
}

export const holoTerminalVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 32,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ...holoSpring,
      opacity: { duration: 0.42, ease: holoEase },
    },
  },
  exit: {
    opacity: 0,
    y: 24,
    transition: { duration: 0.32, ease: holoEase },
  },
}

export const holoBootExitVariants: Variants = {
  exit: {
    opacity: 0,
    scale: 1.02,
    filter: 'blur(8px)',
    transition: { duration: 0.75, ease: holoEase },
  },
}

export function getSectionSlide(from: 'left' | 'right' | 'bottom' = 'left') {
  const offset =
    from === 'left' ? { x: -28 } : from === 'right' ? { x: 28 } : { y: 28 }

  return {
    hidden: {
      opacity: 0,
      ...offset,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        ...holoSpringSoft,
        opacity: { duration: 0.5, ease: holoEase },
      },
    },
  } satisfies Variants
}
