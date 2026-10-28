"use client";

import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { EASE_OUT } from "@/components/motion/primitives";
import type { Testimonial } from "@/lib/types";
import { Stars } from "./ui";

/** Shows two stories at a time (one on mobile) with a soft cross-slide. */
export function TestimonialCards({ items }: { items: Testimonial[] }) {
  const [page, setPage] = useState(0);
  const [dir, setDir] = useState(1);
  const pages = Math.ceil(items.length / 2);
  const go = (d: number) => {
    setDir(d);
    setPage((p) => (p + d + pages) % pages);
  };
  const visible = items.slice(page * 2, page * 2 + 2);

  return (
    <div>
      <div className="relative min-h-[34rem] sm:min-h-[19rem]">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.ul
            key={page}
            custom={dir}
            initial={{ opacity: 0, x: dir * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -40 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="grid gap-4 sm:grid-cols-2"
            aria-live="polite"
          >
            {visible.map((t) => (
              <li key={t.name}>
                <figure className="flex h-full flex-col rounded-[2rem] bg-snow p-7 shadow-[0_25px_60px_-40px_rgba(43,46,41,0.5)] sm:p-9">
                  <Stars count={t.rating} />
                  <blockquote className="mt-5 font-display text-[1.35rem] font-light leading-snug tracking-[-0.01em] text-ink">“{t.quote}”</blockquote>
                  <figcaption className="mt-auto flex items-center gap-3 pt-7">
                    <span aria-hidden className="grid h-11 w-11 place-items-center rounded-full bg-sage/40 font-display text-sage-deep">{t.name.charAt(0)}</span>
                    <span className="font-sans text-sm">
                      <span className="block font-semibold text-ink">{t.name}</span>
                      <span className="text-mute">{t.project}</span>
                    </span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>
      <div className="mt-8 flex items-center gap-4">
        <button type="button" onClick={() => go(-1)} aria-label="Previous stories" className="grid h-12 w-12 place-items-center rounded-full bg-snow text-ink shadow-sm transition-colors hover:bg-sage-deep hover:text-snow">
          <ChevronLeft size={20} />
        </button>
        <div className="flex gap-1.5">
          {Array.from({ length: pages }, (_, i) => (
            <button key={i} type="button" onClick={() => { setDir(i > page ? 1 : -1); setPage(i); }} aria-label={`Show stories page ${i + 1}`} aria-current={i === page} className="grid h-8 w-6 place-items-center">
              <span className={`block h-2 rounded-full transition-all duration-500 ${i === page ? "w-6 bg-sage-deep" : "w-2 bg-ink/20"}`} />
            </button>
          ))}
        </div>
        <button type="button" onClick={() => go(1)} aria-label="Next stories" className="grid h-12 w-12 place-items-center rounded-full bg-snow text-ink shadow-sm transition-colors hover:bg-sage-deep hover:text-snow">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
