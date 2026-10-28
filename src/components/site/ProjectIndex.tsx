"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useState } from "react";
import { EASE_CURTAIN, EASE_OUT } from "@/components/motion/primitives";
import type { Project } from "@/lib/types";

/**
 * A typographic index of every project. On hover-capable screens a preview of the
 * hovered project floats beside the pointer; touch screens see an inline thumbnail.
 */
export function ProjectIndex({ projects, base }: { projects: Project[]; base: string }) {
  const [active, setActive] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 28, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 220, damping: 28, mass: 0.6 });

  return (
    <div
      className="relative"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - r.left);
        y.set(e.clientY - r.top);
      }}
      onPointerLeave={() => setActive(null)}
    >
      <ul className="border-t border-ink/10">
        {projects.map((p, i) => (
          <motion.li
            key={p.slug}
            className="border-b border-ink/10"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: i * 0.05, ease: EASE_OUT }}
          >
            <Link
              href={`${base}/projects/${p.slug}`}
              data-cursor="View"
              onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
              onFocus={() => setActive(null)}
              className={`group grid grid-cols-[3.5rem_1fr_auto] items-center gap-4 py-4 transition-opacity duration-500 sm:grid-cols-[4rem_1fr_10rem_5rem] sm:py-5 ${active !== null && active !== i ? "opacity-35" : ""}`}
            >
              <span className="relative block aspect-square w-14 overflow-hidden bg-shell sm:hidden">
                <Image src={p.hero} alt="" fill sizes="56px" className="object-cover" />
              </span>
              <span className="hidden font-label text-[11px] tracking-[0.14em] text-mute sm:block">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-display text-[clamp(1.6rem,3vw,2.5rem)] leading-tight text-ink transition-all duration-500 ease-luxe group-hover:translate-x-3 group-hover:text-pine">
                {p.title}
              </span>
              <span className="hidden font-sans text-sm font-light text-mute sm:block">{p.category}</span>
              <span className="text-right font-label text-[11px] tracking-[0.14em] text-mute">{p.year}</span>
            </Link>
          </motion.li>
        ))}
      </ul>

      <motion.div aria-hidden style={{ x: sx, y: sy }} className="pointer-events-none absolute left-0 top-0 z-10 hidden lg:block">
        <AnimatePresence>
          {active !== null && (
            <motion.div
              key="preview"
              className="relative -ml-32 -mt-44 h-[20rem] w-[16rem] overflow-hidden bg-shell shadow-[0_30px_60px_-30px_rgba(28,58,49,0.45)]"
              initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
              exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
              transition={{ duration: 0.6, ease: EASE_CURTAIN }}
            >
              <AnimatePresence initial={false}>
                <motion.div
                  key={projects[active].slug}
                  className="absolute inset-0"
                  initial={{ clipPath: "inset(100% 0% 0% 0%)", scale: 1.15 }}
                  animate={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
                  transition={{ duration: 0.7, ease: EASE_CURTAIN }}
                >
                  <Image src={projects[active].hero} alt="" fill sizes="16rem" className="object-cover" />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
