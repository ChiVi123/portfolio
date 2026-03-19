import type { Variants } from 'framer-motion'

export const EASE_EXPO = [0.16, 1, 0.3, 1] as const
export const EASE_OUT = [0.22, 1, 0.36, 1] as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE_EXPO },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.75, ease: 'easeOut' },
  },
}

export const slideDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT },
  },
}

export const stagger = (staggerChildren = 0.12, delayChildren = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren, delayChildren },
  },
})

export const heroLine: Variants = {
  hidden: { opacity: 0, x: -50, skewX: -5 },
  show: {
    opacity: 1,
    x: 0,
    skewX: 0,
    transition: { duration: 1.0, ease: EASE_EXPO },
  },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.82 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
}

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -28 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE_OUT },
  },
}

export const cardHoverSpring = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 28,
}
