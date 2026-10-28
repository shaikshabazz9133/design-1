"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { EASE_OUT } from "@/components/motion/primitives";

/** Route entrance: content settles up into place as the loader curtain lifts. */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    // Ends at y: 0, which motion renders as `transform: none`, so fixed children (lightbox) aren't trapped.
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}

export function SubTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
      {children}
    </motion.div>
  );
}
