"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useState } from "react";
import { EASE_CURTAIN } from "@/components/motion/primitives";
import { Lightbox } from "@/components/ui/Lightbox";

type Img = { src: string; alt: string };

/** Editorial bento gallery; each image wipes in on scroll and opens full-screen on click. */
export function ProjectGallery({ images }: { images: Img[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const spans = ["md:col-span-2 md:row-span-2", "", "", "md:col-span-2"];

  return (
    <>
      <ul className="grid auto-rows-[16rem] gap-3 sm:auto-rows-[20rem] md:grid-cols-3">
        {images.map((img, i) => (
          <motion.li key={img.src} className={spans[i % spans.length]} initial={{ clipPath: "inset(100% 0% 0% 0%)" }} whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 1.2, delay: (i % 3) * 0.1, ease: EASE_CURTAIN }}>
            <button type="button" onClick={() => setIndex(i)} aria-label={`Open image ${i + 1} of ${images.length}: ${img.alt}`} data-cursor="Zoom" className="group relative block h-full w-full overflow-hidden bg-shell">
              <Image src={img.src} alt={img.alt} fill sizes="(min-width: 768px) 60vw, 100vw" className="object-cover transition-transform duration-[1.2s] ease-luxe group-hover:scale-105" />
              <span aria-hidden className="absolute bottom-3 left-3 bg-white/90 px-2 py-1 font-label text-[10px] tracking-[0.14em] text-ink">{String(i + 1).padStart(2, "0")}</span>
            </button>
          </motion.li>
        ))}
      </ul>
      <Lightbox
        images={images}
        index={index}
        onChange={setIndex}
        backdropClassName="bg-forest/95 backdrop-blur-md text-white"
        controlClassName="text-white ring-1 ring-inset ring-white/25 hover:bg-white hover:text-ink"
        captionClassName="font-label text-[11px] uppercase tracking-[0.14em] text-white/70"
      />
    </>
  );
}
