"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { EASE_OUT } from "@/components/motion/primitives";

/** Route entrance: content drifts up out of a soft blur, like morning mist clearing. */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    // Filter is cleared once done: any lingering filter would trap fixed-position children (lightbox).
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)", transitionEnd: { filter: "none" } }}
      transition={{ duration: 0.9, ease: EASE_OUT }}
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
