"use client";

import { motion } from "motion/react";
import { RouteLoader } from "@/components/motion/extras";
import { EASE_OUT } from "@/components/motion/primitives";
import { Mark } from "./ui";

/** Quiet white screen: the mark turns once while a fine line draws beneath the name. */
export function Loader() {
  return (
    <RouteLoader className="grid place-items-center bg-white text-ink" enter={{ opacity: 0 }} exit={{ opacity: 0 }}>
      <div className="flex flex-col items-center">
        <motion.span initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} transition={{ duration: 0.9, ease: EASE_OUT }}>
          <Mark className="h-9 w-9 text-pine" />
        </motion.span>
        <motion.p className="mt-5 font-display text-4xl" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT }}>
          Linnea
        </motion.p>
        <div className="mt-4 h-px w-28 overflow-hidden bg-ink/10">
          <motion.div className="h-full origin-left bg-sand" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }} />
        </div>
      </div>
    </RouteLoader>
  );
}
