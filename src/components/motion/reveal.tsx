"use client";

import { motion, useReducedMotion } from "framer-motion";

export function Reveal({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      variants={{
        hidden: prefersReducedMotion ? {} : { opacity: 0, y: 12 },
        show: prefersReducedMotion ? {} : { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
