import Image from "next/image";
import { ImageReveal } from "@/components/motion/primitives";

type Specimen = { name: string; note: string; src: string };

/** Natural materials as an even row of plates with small catalogue labels. */
export function MaterialSpecimens({ items }: { items: Specimen[] }) {
  return (
    <ul className="grid grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4">
      {items.map((m, i) => (
        <li key={m.name} className="group">
          <ImageReveal className="relative aspect-[4/5] overflow-hidden bg-shell" delay={i * 0.08}>
            <Image src={m.src} alt="" fill sizes="(min-width: 1024px) 300px, 45vw" className="object-cover transition-transform duration-[1.4s] ease-luxe group-hover:scale-[1.04]" />
          </ImageReveal>
          <div className="mt-4 flex items-baseline justify-between gap-3">
            <p className="font-display text-[1.45rem] font-normal leading-none">{m.name}</p>
            <span className="font-label text-[11px] tracking-[0.16em] text-sand">No.{String(i + 1).padStart(2, "0")}</span>
          </div>
          <p className="mt-1.5 font-sans text-sm font-light text-mute">{m.note}</p>
        </li>
      ))}
    </ul>
  );
}
