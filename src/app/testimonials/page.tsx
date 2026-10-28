import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/site/sections";
import { container, Eyebrow, Stars } from "@/components/site/ui";
import { Reveal, SplitText, Stagger, StaggerItem } from "@/components/motion/primitives";
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
      <header className={`${container} pb-14 pt-32 text-center sm:pt-40`}>
        <Reveal y={10}><Eyebrow>Client stories</Eyebrow></Reveal>
        <h1 className="mx-auto mt-6 max-w-3xl font-display text-[clamp(2.6rem,6.2vw,5rem)] font-light leading-[1.04] tracking-[-0.02em]">
          <SplitText text="Kind words from calmer homes" immediate delay={0.2} accentWords={["calmer"]} accentClassName="italic text-sage-deep" />
        </h1>
      </header>

      <section className={container}>
        <Reveal className="grid overflow-hidden rounded-[2.5rem] bg-sage-deep text-snow lg:grid-cols-2">
          <div className="relative min-h-[18rem] lg:min-h-[28rem]">
            <Image src={leadProject.hero} alt={leadProject.heroAlt} fill loading="eager" sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <figure className="flex flex-col justify-center p-8 sm:p-14">
            <span className="text-sand"><Stars count={lead.rating} /></span>
            <blockquote className="mt-6 font-display text-[clamp(1.6rem,3vw,2.4rem)] font-light leading-snug tracking-[-0.02em]">“{lead.quote}”</blockquote>
            <figcaption className="mt-8 font-sans">
              <span className="block font-medium">{lead.name}</span>
              <Link href={`${site.base}/projects/${leadProject.slug}`} className="text-snow/75 underline underline-offset-4 hover:text-snow">{lead.project}</Link>
            </figcaption>
          </figure>
        </Reveal>
      </section>

      <section className={`${container} py-16 sm:py-24`}>
        <Stagger as="ul" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {rest.map((t, i) => {
            const project = site.projects.find((p) => p.title === t.project);
            return (
              <StaggerItem as="li" key={t.name}>
                <figure className={`group flex h-full flex-col rounded-[2rem] p-7 transition-all duration-500 ease-soft hover:-translate-y-1 hover:shadow-[0_30px_60px_-35px_rgba(43,46,41,0.5)] sm:p-8 ${["bg-linen", "bg-sage/30", "bg-sand/70"][i % 3]}`}>
                  <Stars count={t.rating} />
                  <blockquote className="mt-5 font-display text-[1.3rem] font-light leading-snug">“{t.quote}”</blockquote>
                  <figcaption className="mt-auto flex items-center gap-3 pt-7 font-sans text-sm">
                    {project && (
                      <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                        <Image src={project.hero} alt="" fill sizes="48px" className="object-cover transition-transform duration-500 group-hover:scale-110" />
                      </span>
                    )}
                    <span>
                      <span className="block font-semibold">{t.name}</span>
                      {project ? <Link href={`${site.base}/projects/${project.slug}`} className="text-mute underline-offset-4 hover:underline">{t.project}</Link> : <span className="text-mute">{t.project}</span>}
                    </span>
                  </figcaption>
                </figure>
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>

      <CtaBand title="Let's write your story next" accent={["your"]} />
    </>
  );
}
