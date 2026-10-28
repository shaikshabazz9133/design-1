"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { EASE_OUT, pageEntranceDelay, SplitText } from "@/components/motion/primitives";
import { Button, container, FloatingLeaf, Leaf } from "./ui";

export function Hero({ image, imageAlt }: { image: string; imageAlt: string }) {
  const [base] = useState(pageEntranceDelay);
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.12]);
  const radius = useTransform(scrollYProgress, [0, 1], ["2.5rem", "4.5rem"]);

  return (
    <section ref={ref} className={`${container} relative pt-24 sm:pt-28`}>
      <motion.div
        className="relative h-[calc(100svh-7rem)] min-h-[560px] overflow-hidden bg-sand sm:h-[calc(100svh-8rem)]"
        style={{ borderRadius: radius }}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: EASE_OUT }}
      >
        <motion.div className="absolute inset-0" style={{ scale }}>
          <motion.div className="absolute inset-0" initial={{ scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: 2.4, ease: EASE_OUT }}>
            <Image src={image} alt={imageAlt} fill preload sizes="(min-width: 1320px) 1260px, 100vw" className="object-cover" />
          </motion.div>
        </motion.div>
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />

        <FloatingLeaf className="absolute right-[8%] top-[10%] hidden h-24 w-16 rotate-12 text-snow/60 sm:block" />
        <FloatingLeaf className="absolute right-[18%] top-[22%] hidden h-14 w-10 -rotate-12 text-sage/80 sm:block" slow />

        <motion.div
          className="absolute inset-x-3 bottom-3 rounded-[2rem] bg-snow/92 p-6 shadow-[0_30px_60px_-30px_rgba(43,46,41,0.5)] backdrop-blur-md sm:inset-x-auto sm:bottom-6 sm:left-6 sm:max-w-xl sm:p-9 lg:bottom-10 lg:left-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: base + 0.5, ease: EASE_OUT }}
        >
          <p className="inline-flex items-center gap-2 font-sans text-sm font-medium text-sage-deep">
            <Leaf className="h-4 w-4" /> Interior design · Copenhagen
          </p>
          <h1 className="mt-4 font-display text-[clamp(2.3rem,5.4vw,4.4rem)] font-light leading-[1.02] tracking-[-0.02em] text-ink">
            <SplitText text="Calm homes, shaped by nature." immediate delay={0.3} accentWords={["nature."]} accentClassName="italic text-sage-deep" />
          </h1>
          <motion.p className="mt-4 max-w-md font-sans text-[17px] leading-relaxed text-mute" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: base + 1.2, duration: 0.8 }}>
            Light-filled interiors in oak, linen and stone — designed for slow mornings and long dinners.
          </motion.p>
          <motion.div className="mt-6 flex flex-col gap-3 sm:flex-row" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: base + 1.35, duration: 0.8, ease: EASE_OUT }}>
            <Button href="/projects">Explore projects</Button>
            <Button href="/contact" variant="ghost">Book a home visit</Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
