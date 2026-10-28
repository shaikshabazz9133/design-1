"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { EASE_OUT } from "@/components/motion/primitives";
import type { ProcessStep } from "@/lib/types";

/** Six soft cards joined by a path that fills as you scroll. */
export function ProcessSteps({ steps }: { steps: ProcessStep[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 22 });

  return (
    <ol ref={ref} className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
      <div aria-hidden className="absolute bottom-6 left-[1.9rem] top-6 w-0.5 rounded bg-ink/10 sm:hidden">
        <motion.div style={{ scaleY: progress }} className="h-full w-full origin-top rounded bg-sage-deep" />
      </div>
      {steps.map((s, i) => (
        <motion.li
          key={s.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, delay: (i % 3) * 0.1, ease: EASE_OUT }}
          className="group relative flex gap-5 rounded-[1.75rem] bg-snow p-5 ring-1 ring-ink/5 transition-shadow duration-500 hover:shadow-[0_25px_50px_-30px_rgba(43,46,41,0.45)] sm:flex-col sm:p-7"
        >
          <span className="relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full bg-sage-deep font-display text-lg text-snow transition-transform duration-500 group-hover:scale-110">{i + 1}</span>
          <div>
            <p className="font-sans text-sm text-oak-deep">{s.duration}</p>
            <h3 className="mt-1 font-display text-[1.35rem] font-normal tracking-[-0.02em]">{s.title}</h3>
            <p className="mt-2 font-sans text-[15px] leading-relaxed text-mute">{s.description}</p>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}
