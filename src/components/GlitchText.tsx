import { motion } from 'framer-motion'

type GlitchTextProps = {
  text: string
  as?: 'h1' | 'h2' | 'span'
  className?: string
}

export default function GlitchText({ text, as = 'h1', className = '' }: GlitchTextProps) {
  const Tag = as

  return (
    <Tag className={`glitch-text ${className}`} data-text={text}>
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {text}
      </motion.span>
    </Tag>
  )
}
