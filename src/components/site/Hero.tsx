"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useState } from "react";
import { EASE_OUT, ImageReveal, pageEntranceDelay, SplitText } from "@/components/motion/primitives";
import { Button, container, Eyebrow } from "./ui";

/** Split hero: headline and actions on the left, a tall photograph on the right, all above the fold. */
export function Hero({ image, imageAlt, detail, detailAlt }: { image: string; imageAlt: string; detail: string; detailAlt: string }) {
  const [base] = useState(pageEntranceDelay);
  const fade = (d: number) => ({ initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: base + d, ease: EASE_OUT } });

  return (
    <section className={`${container} pt-24 sm:pt-28`}>
      <div className="grid items-center gap-10 lg:min-h-[calc(100svh-7rem)] lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <motion.div {...fade(0)}><Eyebrow>Interior design · Copenhagen</Eyebrow></motion.div>
          <h1 className="mt-6 font-display text-[clamp(2.9rem,5.6vw,5rem)] leading-[1.02] text-ink">
            <SplitText text="Calm homes, shaped by nature." immediate delay={0.05} accentWords={["nature"]} accentClassName="italic text-pine" />
          </h1>
          <motion.p {...fade(0.5)} className="mt-6 max-w-md font-sans text-[17px] font-light leading-relaxed text-mute">
            Light-filled interiors in oak, linen and stone — designed in Frederiksberg for slow mornings and long dinners.
          </motion.p>
          <motion.div {...fade(0.6)} className="mt-9 flex flex-wrap gap-3">
            <Button href="/projects">Explore projects</Button>
            <Button href="/contact" variant="outline">Book a home visit</Button>
          </motion.div>
          <motion.dl {...fade(0.75)} className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-ink/10 pt-6">
            {[["15", "Years"], ["210", "Homes"], ["92%", "Natural materials"]].map(([v, k]) => (
              <div key={k} className="flex flex-col-reverse gap-1">
                <dt className="font-sans text-[13px] font-light text-mute">{k}</dt>
                <dd className="font-display text-[2rem] leading-none text-pine">{v}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <div className="relative lg:col-span-7">
          <ImageReveal className="relative aspect-[4/5] overflow-hidden bg-shell sm:aspect-[5/4] lg:aspect-[4/4.4]" immediate delay={0.15}>
            <Image src={image} alt={imageAlt} fill preload sizes="(min-width: 1024px) 680px, 100vw" className="object-cover" />
          </ImageReveal>
          <motion.div
            className="absolute -bottom-6 -left-4 hidden w-44 border-[6px] border-white bg-white shadow-[0_24px_50px_-24px_rgba(28,58,49,0.4)] sm:block lg:-left-10 lg:w-52"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: base + 0.7, ease: EASE_OUT }}
          >
            <div className="relative aspect-square overflow-hidden bg-shell">
              <Image src={detail} alt={detailAlt} fill sizes="208px" className="object-cover" />
            </div>
            <p className="px-1 pb-1 pt-2.5 font-label text-[11px] uppercase tracking-[0.18em] text-mute">Oak &amp; linen bedroom</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
