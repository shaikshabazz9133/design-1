"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { EASE_OUT } from "@/components/motion/primitives";

type Orb = { name: string; note: string; src: string; offset: string; delay: number };

/** Natural-material samples as softly floating discs; labelled beneath, with a hover highlight. */
export function MaterialOrbs({ orbs }: { orbs: Orb[] }) {
  return (
    <ul className="mx-auto grid max-w-xl grid-cols-2 gap-x-4 gap-y-4 sm:gap-x-8">
      {orbs.map((o, i) => (
        <motion.li
          key={o.name}
          className={o.offset}
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, delay: o.delay, ease: EASE_OUT }}
        >
          <div className={i % 2 ? "animate-float-slow" : "animate-float"} style={{ animationDelay: `${i * -2}s` }}>
            <figure className={`group relative mx-auto aspect-square w-36 overflow-hidden rounded-full sm:w-48 lg:w-56 shadow-[0_25px_50px_-25px_rgba(43,46,41,0.55)] ring-4 ring-snow`}>
              <Image src={o.src} alt="" fill sizes="16rem" className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <figcaption className="absolute inset-0 grid place-items-center bg-ink/0 p-4 text-center transition-colors duration-500 group-hover:bg-ink/55">
                <span aria-hidden className="translate-y-2 font-display text-lg text-snow opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">{o.name}</span>
              </figcaption>
            </figure>
            <p className="mt-3 text-center font-sans text-sm font-medium text-ink">
              {o.name}
              <span className="block font-normal text-mute">{o.note}</span>
            </p>
          </div>
        </motion.li>
      ))}
    </ul>
  );
}
