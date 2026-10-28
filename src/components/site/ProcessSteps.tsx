"use client";

import { motion } from "motion/react";
import { EASE_OUT } from "@/components/motion/primitives";
import type { ProcessStep } from "@/lib/types";

/** Six steps on a tidy three-column grid, each with a pine numeral and a sand rule. */
export function ProcessSteps({ steps }: { steps: ProcessStep[] }) {
  return (
    <ol className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {steps.map((s, i) => (
        <motion.li
          key={s.title}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: EASE_OUT }}
          className="group"
        >
          <div className="flex items-baseline justify-between border-b border-ink/10 pb-3">
            <span className="font-display text-[2.6rem] italic leading-none text-pine">{String(i + 1).padStart(2, "0")}</span>
            <span className="font-label text-[11px] uppercase tracking-[0.18em] text-mute">{s.duration}</span>
          </div>
          <span aria-hidden className="-mt-px block h-px w-0 bg-sand transition-all duration-700 ease-luxe group-hover:w-full" />
          <h3 className="mt-5 font-display text-[1.6rem] font-normal leading-tight">{s.title}</h3>
          <p className="mt-2 font-sans text-[15px] font-light leading-relaxed text-mute">{s.description}</p>
        </motion.li>
      ))}
    </ol>
  );
}
