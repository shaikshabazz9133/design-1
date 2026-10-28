"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { EASE_CURTAIN, EASE_OUT } from "@/components/motion/primitives";
import type { Testimonial } from "@/lib/types";
import { Stars } from "./ui";

const pad = (n: number) => String(n).padStart(2, "0");

/** One story at a time, set large; lines rise in and out of a mask. Built for a dark section. */
export function TestimonialCards({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const go = (d: number) => {
    setDir(d);
    setIndex((i) => (i + d + items.length) % items.length);
  };
  const t = items[index];

  return (
    <div>
      <div className="relative min-h-[17rem] overflow-hidden sm:min-h-[14rem]" aria-live="polite">
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.figure
            key={index}
            initial={{ y: dir * 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: dir * -24, opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          >
            <Stars count={t.rating} />
            <blockquote className="mt-6 font-display text-[clamp(1.6rem,2.6vw,2.4rem)] leading-[1.2] text-white">
              <span className="text-sand">“</span>{t.quote}<span className="text-sand">”</span>
            </blockquote>
            <figcaption className="mt-7 flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span className="font-sans text-[15px] text-white">{t.name}</span>
              <span className="font-label text-[11px] uppercase tracking-[0.16em] text-white/50">{t.project}</span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex items-center gap-6 border-t border-white/15 pt-6">
        <p className="font-label text-[12px] tracking-[0.14em] text-white/60">
          <span className="text-white">{pad(index + 1)}</span> / {pad(items.length)}
        </p>
        <div aria-hidden className="h-px flex-1 bg-white/15">
          <motion.div className="h-full origin-left bg-sand" animate={{ scaleX: (index + 1) / items.length }} transition={{ duration: 0.8, ease: EASE_CURTAIN }} />
        </div>
        <div className="flex gap-2">
          {([[-1, "Previous story", ArrowLeft], [1, "Next story", ArrowRight]] as const).map(([d, label, Icon]) => (
            <button key={label} type="button" onClick={() => go(d)} aria-label={label} className="grid h-11 w-11 place-items-center rounded-full text-white ring-1 ring-inset ring-white/30 transition-colors duration-300 hover:bg-white hover:text-forest">
              <Icon size={17} strokeWidth={1.5} aria-hidden />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
