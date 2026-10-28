import type { Metadata } from "next";
import Image from "next/image";
import { Check, ChevronDown } from "lucide-react";
import { CtaBand } from "@/components/site/sections";
import { container, Heading, PageHero } from "@/components/site/ui";
import { ImageReveal, Reveal } from "@/components/motion/primitives";
import { Accordion } from "@/components/ui/Accordion";
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

      <section className={`${container} pb-24 sm:pb-32`}>
        <ol className="relative">
          <span aria-hidden className="absolute bottom-0 left-6 top-0 w-px border-l-2 border-dashed border-sage/70 lg:left-1/2" />
          {site.process.map((s, i) => {
            const right = i % 2 === 1;
            return (
              <li key={s.title} className="relative grid gap-6 pb-14 pl-16 last:pb-0 lg:grid-cols-2 lg:gap-16 lg:pl-0">
                <Reveal className="absolute left-0 top-0 lg:left-1/2 lg:-translate-x-1/2" y={0}>
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-sage-deep font-display text-lg text-snow ring-8 ring-snow">{i + 1}</span>
                </Reveal>
                <Reveal className={`${right ? "lg:order-2 lg:pl-12" : "lg:pr-12 lg:text-right"}`}>
                  <p className="font-sans text-sm font-medium text-oak-deep">{s.duration}</p>
                  <h2 className="mt-1 font-display text-[clamp(1.8rem,3vw,2.5rem)] font-light tracking-[-0.02em]">{s.title}</h2>
                  <p className={`mt-3 max-w-md font-sans text-[17px] leading-relaxed text-mute ${right ? "" : "lg:ml-auto"}`}>{s.description}</p>
                  <ul className={`mt-5 flex flex-wrap gap-2 ${right ? "" : "lg:justify-end"}`}>
                    {s.deliverables.map((d) => (
                      <li key={d} className="inline-flex items-center gap-1.5 rounded-full bg-linen px-3 py-1.5 font-sans text-sm"><Check size={14} className="text-sage-deep" aria-hidden />{d}</li>
                    ))}
                  </ul>
                </Reveal>
                <ImageReveal className={`relative aspect-[16/10] overflow-hidden rounded-[2rem] bg-sand ${right ? "lg:order-1 lg:mr-12" : "lg:ml-12"}`}>
                  <Image src={unsplash(images[i])} alt="" fill loading={i === 0 ? "eager" : undefined} sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
                </ImageReveal>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="bg-sage/25 py-24 sm:py-32">
        <div className={`${container} grid gap-12 lg:grid-cols-12`}>
          <div className="lg:col-span-4">
            <Heading eyebrow="Practical details" title="Fees, timing and more" accent={["more"]} />
          </div>
          <div className="lg:col-span-8">
            <Accordion
              items={site.faqs}
              defaultOpen={1}
              className="space-y-3"
              itemClassName="rounded-[1.5rem] bg-snow px-6 shadow-[0_10px_30px_-25px_rgba(43,46,41,0.5)]"
              buttonClassName="min-h-16 py-5"
              questionClassName="font-display text-lg"
              panelClassName="pb-6 font-sans text-[16px] leading-relaxed text-mute"
              icon={<ChevronDown size={20} />}
              iconClassName="grid h-10 w-10 place-items-center rounded-full bg-linen text-sage-deep transition-transform duration-500 ease-luxe"
              iconOpenClassName="rotate-180 bg-sage/40"
            />
          </div>
        </div>
      </section>

      <CtaBand title="Ready for the first step?" accent={["first"]} />
    </>
  );
}
