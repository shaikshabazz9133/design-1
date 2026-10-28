import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/site/sections";
import { container, Eyebrow, Stars } from "@/components/site/ui";
import { ImageReveal, Reveal, SplitText, Stagger, StaggerItem } from "@/components/motion/primitives";
import { site } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Client Stories",
  description: "Families, homeowners and teams on what it was like to work with Linnea Studio.",
};

export default function TestimonialsPage() {
  const [lead, ...rest] = site.testimonials;
  const leadProject = site.projects.find((p) => p.title === lead.project)!;

  return (
    <>
      <header className={`${container} pb-12 pt-28 sm:pt-32`}>
        <Reveal y={8}><Eyebrow>Client stories</Eyebrow></Reveal>
        <h1 className="mt-5 max-w-[16ch] font-display text-[clamp(2.6rem,5.2vw,4.75rem)] leading-[1.04]">
          <SplitText text="Kind words from calmer homes" immediate delay={0.1} accentWords={["calmer"]} accentClassName="italic text-pine" />
        </h1>
      </header>

      <section className="bg-forest text-white">
        <div className={`${container} grid gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:items-center`}>
          <ImageReveal className="relative aspect-[4/5] overflow-hidden bg-ink lg:col-span-5" immediate delay={0.2}>
            <Image src={leadProject.hero} alt={leadProject.heroAlt} fill loading="eager" sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </ImageReveal>
          <Reveal as="figure" className="lg:col-span-6 lg:col-start-7">
            <Stars count={lead.rating} />
            <blockquote className="mt-8 font-display text-[clamp(1.7rem,2.8vw,2.5rem)] leading-[1.2]"><span className="text-sand">“</span>{lead.quote}<span className="text-sand">”</span></blockquote>
            <figcaption className="mt-10 flex flex-wrap items-baseline gap-x-4 border-t border-white/15 pt-6">
              <span className="font-sans font-medium">{lead.name}</span>
              <Link href={`${site.base}/projects/${leadProject.slug}`} className="font-label text-[11px] uppercase tracking-[0.16em] text-white/60 underline-offset-4 hover:text-white hover:underline">{lead.project} ↗</Link>
            </figcaption>
          </Reveal>
        </div>
      </section>

      <section className={`${container} py-16 sm:py-20`}>
        <Stagger as="ul" className="grid border-t border-ink/10 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {rest.map((t, i) => {
            const project = site.projects.find((p) => p.title === t.project);
            return (
              <StaggerItem as="li" key={t.name} className={`border-b border-ink/10 ${i % 2 ? "sm:border-l" : ""} ${i % 3 ? "lg:border-l" : "lg:border-l-0"}`}>
                <figure className="group flex h-full flex-col py-8 sm:px-6">
                  <div className="flex items-center justify-between">
                    <Stars count={t.rating} />
                    <span className="font-label text-[11px] tracking-[0.14em] text-mute">{String(i + 2).padStart(2, "0")}</span>
                  </div>
                  <blockquote className="mt-8 font-display text-[1.4rem] leading-[1.3]">“{t.quote}”</blockquote>
                  <figcaption className="mt-auto flex items-center gap-4 pt-10 font-sans text-sm">
                    {project && (
                      <span className="relative h-14 w-14 shrink-0 overflow-hidden bg-shell">
                        <Image src={project.hero} alt="" fill sizes="56px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                      </span>
                    )}
                    <span>
                      <span className="block font-medium">{t.name}</span>
                      {project ? <Link href={`${site.base}/projects/${project.slug}`} className="font-label text-[11px] uppercase tracking-[0.14em] text-mute underline-offset-4 hover:text-pine hover:underline">{t.project}</Link> : <span className="font-label text-[11px] uppercase tracking-[0.14em] text-mute">{t.project}</span>}
                    </span>
                  </figcaption>
                </figure>
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>

      <CtaBand title="Let’s write your story next" accent={["your"]} />
    </>
  );
}
