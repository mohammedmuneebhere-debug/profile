import { motion, useScroll, useTransform } from 'framer-motion'

export default function SpatialDepthField() {
  const { scrollYProgress } = useScroll()
  const farY = useTransform(scrollYProgress, [0, 1], [0, -90])
  const midY = useTransform(scrollYProgress, [0, 1], [0, -45])
  const nearY = useTransform(scrollYProgress, [0, 1], [0, 30])

  return (
    <div className="spatial-depth-field" aria-hidden="true">
      <span className="spatial-hud-core" />
      <motion.span className="spatial-orb spatial-orb-a" style={{ y: farY }} />
      <motion.span className="spatial-orb spatial-orb-b" style={{ y: midY }} />
      <motion.span className="spatial-orb spatial-orb-c" style={{ y: nearY }} />
      <motion.span className="spatial-plane spatial-plane-a" style={{ y: farY }} />
      <motion.span className="spatial-plane spatial-plane-b" style={{ y: midY }} />
      <motion.span className="spatial-ring spatial-ring-a" style={{ y: nearY }} />
      <div className="spatial-floor-grid" />
    </div>
  )
}
