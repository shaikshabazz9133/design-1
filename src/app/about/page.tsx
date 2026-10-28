import type { Metadata } from "next";
import Image from "next/image";
import { StatChips } from "@/components/site/cards";
import { MarqueeBand } from "@/components/motion/extras";
import { CtaBand } from "@/components/site/sections";
import { container, Heading, Mark, PageHero } from "@/components/site/ui";
import { ImageReveal, Reveal, Stagger, StaggerItem } from "@/components/motion/primitives";
import { site } from "@/lib/content/site";
import { unsplash } from "@/lib/content/helpers";

export const metadata: Metadata = {
  title: "About",
  description: "Linnea Studio is a team of eleven designers, architects and makers in Frederiksberg, creating calm and natural interiors since 2011.",
};

const values = [
  { title: "Light first", text: "We plan every room around daylight before choosing a single material." },
  { title: "Natural & honest", text: "Wood, linen, wool, stone and clay — materials that age gracefully and can be repaired." },
  { title: "Made to last", text: "We'd rather you buy one good chair than three average ones." },
  { title: "Room to breathe", text: "Space is a luxury. We protect it as carefully as we fill it." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About us" title="A small studio with a calm approach" accent={["calm"]} intro="We're eleven designers, architects and makers in Frederiksberg, creating homes and workplaces that feel close to nature." image={unsplash("1615529182904-14819c35db37")} imageAlt="Living room with rattan pendants, a grey sofa and plants" />

      <MarqueeBand
        items={["Light first", "Natural & honest", "Made to last", "Room to breathe"]}
        className="bg-shell py-5 font-display text-[clamp(1.5rem,2.4vw,2rem)] text-ink"
        accentClassName="italic text-pine"
        separator={<Mark className="h-4 w-4 shrink-0 text-sand" />}
      />

      <section className={`${container} py-16 sm:py-20`}>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="grid grid-cols-2 gap-4 lg:col-span-6">
            <ImageReveal className="relative aspect-[3/4] overflow-hidden bg-shell">
                <Image src={unsplash("1556020685-ae41abfc9365")} alt="White sideboard with a round mirror and plant" fill sizes="(min-width: 1024px) 24vw, 45vw" className="object-cover" />
            </ImageReveal>
            <ImageReveal className="relative mt-10 aspect-[3/4] overflow-hidden bg-shell" delay={0.15}>
                <Image src={unsplash("1519710164239-da123dc03ef4")} alt="White dining corner with plants" fill sizes="(min-width: 1024px) 24vw, 45vw" className="object-cover" />
            </ImageReveal>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <Heading eyebrow="Our story" title="From a furniture workshop to whole homes" accent={["whole", "homes"]} />
            <div className="mt-8 space-y-5 font-sans text-[16px] font-light leading-relaxed text-mute">
              <Reveal><p>Linnea Holm trained as a furniture maker. She started the studio in a small Vesterbro workshop in 2011, designing tables and shelving for friends — and then the rooms around them.</p></Reveal>
              <Reveal delay={0.1}><p>Fifteen years on, we design whole homes, kitchens and workplaces, but the maker&apos;s mindset remains: understand the material, respect the craft, design things to last.</p></Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-shell py-16 sm:py-20">
        <div className={container}>
          <Heading eyebrow="Our values" title="What guides every project" accent={["guides"]} />
          <Stagger as="ul" className="mt-12 grid border-t border-ink/10 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <StaggerItem as="li" key={v.title} className={`border-b border-ink/10 py-7 sm:pr-8 ${i % 2 ? "sm:border-l sm:pl-8" : ""} ${i > 0 ? "lg:border-l lg:pl-8" : ""}`}>
                <span className="font-display text-[2.6rem] italic leading-none text-pine">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-5 font-display text-[1.6rem] font-normal leading-tight">{v.title}</h3>
                <p className="mt-3 font-sans text-[15px] font-light leading-relaxed text-mute">{v.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className={`${container} py-16 sm:py-20`}>
        <Heading eyebrow="The team" title="The people behind the work" accent={["people"]} />
        <Stagger as="ul" className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {site.team.map((m) => (
            <StaggerItem as="li" key={m.name} className="group">
              <div className="relative aspect-[4/5] overflow-hidden bg-shell">
                <Image src={m.image} alt={`Portrait of ${m.name}`} fill sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 92vw" className="object-cover transition-transform duration-[1.2s] ease-luxe group-hover:scale-[1.04]" />
              </div>
              <div className="mt-4 border-b border-ink/10 pb-3">
                <h3 className="font-display text-[1.5rem] font-normal leading-none">{m.name}</h3>
                <p className="mt-1.5 font-label text-[11px] uppercase tracking-[0.16em] text-pine">{m.role}</p>
              </div>
              <p className="mt-3 font-sans text-[15px] font-light leading-relaxed text-mute">{m.bio}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="bg-forest py-16 text-white sm:py-20">
        <div className={`${container} grid gap-10 lg:grid-cols-12`}>
          <div className="lg:col-span-4">
            <Heading eyebrow="Our journey" title="Fifteen years, step by step" accent={["step", "by", "step"]} light />
          </div>
          <ol className="border-t border-white/15 lg:col-span-7 lg:col-start-6">
            {site.milestones.map((m, i) => (
              <Reveal as="li" key={m.year} delay={i * 0.05} className="grid grid-cols-[5rem_1fr] gap-6 border-b border-white/15 py-5 sm:grid-cols-[7rem_1fr]">
                <p className="font-display text-[1.9rem] italic leading-none text-sand">{m.year}</p>
                <div>
                  <h3 className="font-display text-[1.5rem] font-normal leading-tight">{m.title}</h3>
                  <p className="mt-2 font-sans text-[15px] font-light leading-relaxed text-white/65">{m.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
        <div className={`${container} mt-14`}><StatChips stats={site.stats} light /></div>
      </section>

      <CtaBand title="We’d love to hear about your home" accent={["love"]} />
    </>
  );
}
