import type { Metadata } from "next";
import Image from "next/image";
import { Check, ChevronDown } from "lucide-react";
import { ServiceIcon } from "@/components/site/cards";
import { CtaBand } from "@/components/site/sections";
import { Button, container, Heading, PageHero } from "@/components/site/ui";
import { ImageReveal, Reveal } from "@/components/motion/primitives";
import { Accordion } from "@/components/ui/Accordion";
import { site } from "@/lib/content/site";
import { unsplash } from "@/lib/content/helpers";

export const metadata: Metadata = {
  title: "Services",
  description: "Residential interiors, workplaces, kitchens, bedrooms, living rooms, renovation and consultations from Linnea Studio in Copenhagen.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Services" title="Thoughtful design for every room" accent={["every", "room"]} intro="Choose a whole-home project, a single room or a short consultation. Every service begins with a visit to see how the light moves through your space." image={unsplash("1567767292278-a4f21aa2d36e")} imageAlt="Light living space with a glass coffee table and large plants">
        <nav aria-label="Services on this page" className="flex flex-wrap gap-2">
          {site.services.map((s) => (
            <a key={s.slug} href={`#${s.slug}`} className="inline-flex min-h-10 items-center gap-2 rounded-full bg-linen px-3.5 font-sans text-sm text-ink transition-colors hover:bg-sage/50">
              <ServiceIcon slug={s.slug} className="h-4 w-4 text-sage-deep" />
              {s.title}
            </a>
          ))}
        </nav>
      </PageHero>

      <div className={`${container} space-y-5 pb-24 sm:pb-32`}>
        {site.services.map((s, i) => (
          <section key={s.slug} id={s.slug} aria-labelledby={`${s.slug}-t`} className="grid scroll-mt-28 overflow-hidden rounded-[2.5rem] bg-linen lg:grid-cols-2">
            <ImageReveal className={`relative min-h-[18rem] sm:min-h-[24rem] ${i % 2 ? "lg:order-2" : ""}`}>
              <Image src={s.image} alt={s.imageAlt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </ImageReveal>
            <div className="flex flex-col justify-center p-7 sm:p-12 lg:p-14">
              <Reveal>
                <span className="grid h-14 w-14 place-items-center rounded-full bg-snow text-sage-deep"><ServiceIcon slug={s.slug} className="h-6 w-6" /></span>
                <h2 id={`${s.slug}-t`} className="mt-6 font-display text-[clamp(1.9rem,3.4vw,2.75rem)] font-light tracking-[-0.02em]">{s.title}</h2>
                <p className="mt-4 max-w-lg font-sans text-[17px] leading-relaxed text-mute">{s.description}</p>
              </Reveal>
              <Reveal delay={0.1}>
                <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                  {s.includes.map((inc) => (
                    <li key={inc} className="flex items-start gap-2.5 font-sans text-[15px]">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-sage-deep text-snow"><Check size={12} strokeWidth={3} aria-hidden /></span>
                      {inc}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Button href="/contact">Book a visit</Button>
                  <span className="rounded-full bg-snow px-4 py-2 font-sans text-sm text-mute">Typically {s.timeline}</span>
                </div>
              </Reveal>
            </div>
          </section>
        ))}
      </div>

      <section className="bg-sage/25 py-24 sm:py-32" aria-labelledby="faq">
        <div className={`${container} grid gap-12 lg:grid-cols-12`}>
          <div className="lg:col-span-4" id="faq">
            <Heading eyebrow="FAQ" title="Good questions" accent={["questions"]} intro="Anything else? Write to us — we answer every email within two working days." />
          </div>
          <div className="lg:col-span-8">
            <Accordion
              items={site.faqs}
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

      <CtaBand />
    </>
  );
}
