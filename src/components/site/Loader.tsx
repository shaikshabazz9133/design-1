"use client";

import { motion } from "motion/react";
import { RouteLoader } from "@/components/motion/extras";
import { EASE_OUT } from "@/components/motion/primitives";

/** Linen screen: a leaf draws itself inside a softly breathing circle. */
export function Loader() {
  return (
    <RouteLoader
      className="grid place-items-center bg-snow text-ink"
      enter={{ opacity: 0, filter: "blur(6px)" }}
      exit={{ opacity: 0, filter: "blur(10px)" }}
    >
      <div className="flex flex-col items-center">
        <div className="relative grid h-32 w-32 place-items-center">
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full bg-sage/40"
            animate={{ scale: [0.88, 1.06, 0.88] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.span
            aria-hidden
            className="absolute inset-4 rounded-full bg-sage/40"
            animate={{ scale: [1.05, 0.9, 1.05] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <svg aria-hidden viewBox="0 0 24 24" className="relative h-14 w-14 text-sage-deep" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            <motion.path d="M4 20c0-9 6-15 16-16-1 10-7 16-16 16Z" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.1, ease: EASE_OUT }} />
            <motion.path d="M4 20 13 11" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.6, ease: EASE_OUT }} />
          </svg>
        </div>
        <motion.p
          className="mt-6 font-display text-3xl italic tracking-[-0.01em]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE_OUT }}
        >
          linnea<span className="text-sage-deep">.</span>
        </motion.p>
        <motion.p className="mt-2 font-sans text-sm text-mute" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }}>
          Letting the light in…
        </motion.p>
      </div>
    </RouteLoader>
  );
}
