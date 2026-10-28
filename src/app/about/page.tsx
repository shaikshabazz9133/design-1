import type { Metadata } from "next";
import Image from "next/image";
import { StatChips } from "@/components/site/cards";
import { MarqueeBand } from "@/components/motion/extras";
import { CtaBand } from "@/components/site/sections";
import { container, Heading, Leaf, PageHero } from "@/components/site/ui";
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
        className="border-y border-ink/5 py-5 font-display text-[clamp(1.8rem,4vw,3.25rem)] font-light text-ink sm:mt-24"
        accentClassName="italic text-sage-deep"
        separator={<Leaf className="h-6 w-6 shrink-0 text-oak" />}
      />
      <section className="bg-linen py-24 sm:py-32">
        <div className={`${container} grid gap-14 lg:grid-cols-12 lg:items-center`}>
          <div className="grid grid-cols-2 gap-4 lg:col-span-6">
            <ImageReveal className="relative aspect-[3/4] overflow-hidden rounded-[2rem] rounded-tl-[6rem] bg-sand">
              <Image src={unsplash("1556020685-ae41abfc9365")} alt="White sideboard with a round mirror and plant" fill sizes="(min-width: 1024px) 24vw, 45vw" className="object-cover" />
            </ImageReveal>
            <ImageReveal className="relative mt-16 aspect-[3/4] overflow-hidden rounded-[2rem] rounded-br-[6rem] bg-sand" delay={0.15}>
              <Image src={unsplash("1519710164239-da123dc03ef4")} alt="White dining corner with plants" fill sizes="(min-width: 1024px) 24vw, 45vw" className="object-cover" />
            </ImageReveal>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <Heading eyebrow="Our story" title="From a furniture workshop to whole homes" accent={["whole", "homes"]} />
            <div className="mt-6 space-y-4 font-sans text-[17px] leading-relaxed text-mute">
              <Reveal><p>Linnea Holm trained as a furniture maker. She started the studio in a small Vesterbro workshop in 2011, designing tables and shelving for friends — and then the rooms around them.</p></Reveal>
              <Reveal delay={0.1}><p>Fifteen years on, we design whole homes, kitchens and workplaces, but the maker&apos;s mindset remains: understand the material, respect the craft, design things to last.</p></Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className={`${container} py-24 sm:py-32`}>
        <Heading eyebrow="Our values" title="What guides every project" accent={["guides"]} align="center" />
        <Stagger as="ul" className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <StaggerItem as="li" key={v.title} className="rounded-[2rem] bg-snow p-7 ring-1 ring-ink/5 transition-shadow duration-500 hover:shadow-[0_25px_50px_-30px_rgba(43,46,41,0.45)]">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-sage/35 font-display text-lg text-sage-deep">{i + 1}</span>
              <h3 className="mt-5 font-display text-xl">{v.title}</h3>
              <p className="mt-2 font-sans text-[15px] leading-relaxed text-mute">{v.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="bg-sage/25 py-24 sm:py-32">
        <div className={container}>
          <Heading eyebrow="The team" title="The people behind the work" accent={["people"]} />
          <Stagger as="ul" className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {site.team.map((m) => (
              <StaggerItem as="li" key={m.name} className="group rounded-[2rem] bg-snow p-3 pb-6">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-sand">
                  <Image src={m.image} alt={`Portrait of ${m.name}`} fill sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 92vw" className="object-cover transition-transform duration-[1.2s] ease-luxe group-hover:scale-105" />
                </div>
                <div className="px-3 pt-5">
                  <h3 className="font-display text-xl">{m.name}</h3>
                  <p className="font-sans text-sm text-sage-deep">{m.role}</p>
                  <p className="mt-3 font-sans text-[15px] leading-relaxed text-mute">{m.bio}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className={`${container} py-24 sm:py-32`}>
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Heading eyebrow="Our journey" title="Fifteen years, step by step" accent={["step", "by", "step"]} />
          </div>
          <ol className="relative space-y-4 lg:col-span-7 lg:col-start-6">
            {site.milestones.map((m, i) => (
              <Reveal as="li" key={m.year} delay={i * 0.06} className="flex gap-5 rounded-[1.75rem] bg-linen p-6">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-snow text-sage-deep"><Leaf className="h-5 w-5" /></span>
                <div>
                  <p className="font-sans text-sm font-medium text-oak-deep">{m.year}</p>
                  <h3 className="mt-0.5 font-display text-xl">{m.title}</h3>
                  <p className="mt-1 font-sans text-[15px] text-mute">{m.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
        <div className="mt-20"><StatChips stats={site.stats} /></div>
      </section>

      <CtaBand title="We'd love to hear about your home" accent={["love"]} />
    </>
  );
}
