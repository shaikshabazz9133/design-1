"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ZoomIn } from "lucide-react";
import { useState } from "react";
import { EASE_OUT } from "@/components/motion/primitives";
import { Lightbox } from "@/components/ui/Lightbox";

type Img = { src: string; alt: string };

/** Rounded bento gallery; images ease up on scroll and open full-screen on click. */
export function ProjectGallery({ images }: { images: Img[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const spans = ["md:col-span-2 md:row-span-2", "", "", "md:col-span-2"];

  return (
    <>
      <ul className="grid auto-rows-[16rem] gap-4 sm:auto-rows-[18rem] md:grid-cols-3">
        {images.map((img, i) => (
          <motion.li key={img.src} className={spans[i % spans.length]} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.8, delay: i * 0.08, ease: EASE_OUT }}>
            <button type="button" onClick={() => setIndex(i)} aria-label={`Open image ${i + 1} of ${images.length}: ${img.alt}`} className="group relative block h-full w-full overflow-hidden rounded-[1.75rem] bg-sand">
              <Image src={img.src} alt={img.alt} fill sizes="(min-width: 768px) 60vw, 100vw" className="object-cover transition-transform duration-[1.2s] ease-luxe group-hover:scale-105" />
              <span aria-hidden className="absolute bottom-4 right-4 grid h-11 w-11 place-items-center rounded-full bg-snow/90 text-ink opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                <ZoomIn size={18} />
              </span>
            </button>
          </motion.li>
        ))}
      </ul>
      <Lightbox
        images={images}
        index={index}
        onChange={setIndex}
        backdropClassName="bg-ink/90 backdrop-blur-md text-snow"
        controlClassName="bg-snow/90 text-ink hover:bg-sage"
        captionClassName="font-sans text-snow/80"
      />
    </>
  );
}
