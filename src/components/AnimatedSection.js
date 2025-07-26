// components/AnimatedSection.js
import { motion } from "framer-motion";

export default function AnimatedSection({
  children,
  effect = "fade", // fade | up | left | right | zoom
  duration = 0.6,
  delay = 0,
  className = "",
}) {
  // Variants preset
  const effects = {
    fade:   { initial: { opacity: 0 },          whileInView: { opacity: 1 } },
    up:     { initial: { opacity: 0, y: 60 },   whileInView: { opacity: 1, y: 0 } },
    left:   { initial: { opacity: 0, x: -60 },  whileInView: { opacity: 1, x: 0 } },
    right:  { initial: { opacity: 0, x: 60 },   whileInView: { opacity: 1, x: 0 } },
    zoom:   { initial: { opacity: 0, scale: 0.8 }, whileInView: { opacity: 1, scale: 1 } },
  };
  const v = effects[effect] || effects.fade;

  return (
    <motion.section
      className={className}
      initial={v.initial}
      whileInView={v.whileInView}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}
