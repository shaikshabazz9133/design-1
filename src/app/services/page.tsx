import type { Metadata } from "next";
import Image from "next/image";
import { ServiceIcon } from "@/components/site/cards";
import { CtaBand, FaqSection } from "@/components/site/sections";
import { Button, container, PageHero } from "@/components/site/ui";
import { ImageReveal, Reveal } from "@/components/motion/primitives";
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
            <a key={s.slug} href={`#${s.slug}`} className="inline-flex min-h-10 items-center gap-2 px-3.5 font-sans text-sm text-ink ring-1 ring-inset ring-ink/20 transition-colors duration-300 hover:bg-ink hover:text-white">
              <ServiceIcon slug={s.slug} className="h-4 w-4" />
              {s.title}
            </a>
          ))}
        </nav>
      </PageHero>

      <div className={`${container} pb-16 sm:pb-20`}>
        {site.services.map((s, i) => (
          <section key={s.slug} id={s.slug} aria-labelledby={`${s.slug}-t`} className="grid scroll-mt-28 gap-10 border-t border-ink/10 py-12 sm:py-14 lg:grid-cols-12 lg:gap-12">
            <div className={`lg:col-span-6 ${i % 2 ? "lg:order-2 lg:col-start-7" : ""}`}>
              <ImageReveal className="relative aspect-[4/3] overflow-hidden bg-shell">
                  <Image src={s.image} alt={s.imageAlt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
              </ImageReveal>
            </div>
            <div className={`flex flex-col justify-between lg:col-span-5 ${i % 2 ? "lg:order-1" : "lg:col-start-8"}`}>
              <Reveal>
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-[2.6rem] italic leading-none text-pine">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-label text-[11px] uppercase tracking-[0.16em] text-mute">Typically {s.timeline}</span>
                </div>
                <h2 id={`${s.slug}-t`} className="mt-5 font-display text-[clamp(2rem,3vw,2.75rem)] leading-[1.1]">{s.title}</h2>
                <p className="mt-5 max-w-lg font-sans text-[16px] font-light leading-relaxed text-mute">{s.description}</p>
              </Reveal>
              <Reveal delay={0.1}>
                <ul className="mt-6 border-t border-ink/10">
                  {s.includes.map((inc) => (
                    <li key={inc} className="flex items-center gap-3 border-b border-ink/10 py-3 font-sans text-[15px]">
                      <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-sand" />
                      {inc}
                    </li>
                  ))}
                </ul>
                <Button href="/contact" className="mt-8">Book a visit</Button>
              </Reveal>
            </div>
          </section>
        ))}
      </div>

      <FaqSection />
      <CtaBand />
    </>
  );
}
