import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand, FaqSection } from "@/components/site/sections";
import { container, PageHero } from "@/components/site/ui";
import { ImageReveal, Reveal } from "@/components/motion/primitives";
import { site } from "@/lib/content/site";
import { unsplash } from "@/lib/content/helpers";

export const metadata: Metadata = {
  title: "Our Process",
  description: "Consultation, planning, concept, material selection, execution and handover — how a Linnea Studio project unfolds.",
};

const images = ["1597665863042-47e00964d899", "1513694203232-719a280e022f", "1631679706909-1844bbd07221", "1585128792020-803d29415281", "1524758631624-e2822e304c36", "1617325247661-675ab4b64ae2"];

export default function ProcessPage() {
  return (
    <>
      <PageHero eyebrow="Our process" title="Six calm steps, no surprises" accent={["calm"]} intro="We keep the process simple and transparent. You'll always know what's happening, what's next and what it costs." image={unsplash("1556020685-ae41abfc9365")} imageAlt="White sideboard with a round mirror and plant" />

      <section className={`${container} pb-16 sm:pb-20`}>
        <ol>
          {site.process.map((s, i) => (
            <li key={s.title} className="grid gap-8 border-t border-ink/10 py-10 sm:py-14 lg:grid-cols-12 lg:gap-12">
              {/* The step number pins beside its content while the step scrolls past. */}
              <div className="lg:col-span-2">
                <div className="lg:sticky lg:top-28">
                  <Reveal y={10}>
                    <span className="block font-display text-[3rem] italic leading-none text-pine">{String(i + 1).padStart(2, "0")}</span>
                    <span className="mt-4 block font-label text-[11px] uppercase tracking-[0.16em] text-mute">{s.duration}</span>
                  </Reveal>
                </div>
              </div>
              <div className="lg:col-span-4 lg:col-start-4">
                <Reveal>
                  <h2 className="font-display text-[clamp(2rem,3vw,2.75rem)] leading-[1.1]">{s.title}</h2>
                  <p className="mt-5 font-sans text-[16px] font-light leading-relaxed text-mute">{s.description}</p>
                </Reveal>
                <Reveal delay={0.1}>
                  <p className="mt-8 font-label text-[11px] uppercase tracking-[0.16em] text-mute">You receive</p>
                  <ul className="mt-3 border-t border-ink/10">
                    {s.deliverables.map((d) => (
                      <li key={d} className="flex items-center gap-3 border-b border-ink/10 py-3 font-sans text-[15px]"><span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-sand" />{d}</li>
                    ))}
                  </ul>
                </Reveal>
              </div>
              <ImageReveal className="relative aspect-[4/3] overflow-hidden bg-shell lg:col-span-5 lg:col-start-8">
                  <Image src={unsplash(images[i])} alt="" fill loading={i === 0 ? "eager" : undefined} sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
              </ImageReveal>
            </li>
          ))}
        </ol>
      </section>

      <FaqSection eyebrow="Practical details" title="Fees, timing and more" accent={["more"]} defaultOpen={1} />
      <CtaBand title="Ready for the first step?" accent={["first"]} />
    </>
  );
}
