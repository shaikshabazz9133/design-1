import Image from "next/image";
import { PostCard, ProjectCard, ServiceCard, StatChips } from "@/components/site/cards";
import { MarqueeBand } from "@/components/motion/extras";
import { Hero } from "@/components/site/Hero";
import { MaterialOrbs } from "@/components/site/MaterialOrbs";
import { ProcessSteps } from "@/components/site/ProcessSteps";
import { CtaBand } from "@/components/site/sections";
import { TestimonialCards } from "@/components/site/TestimonialCards";
import { Button, container, Eyebrow, Heading, Leaf, TextLink } from "@/components/site/ui";
import { ImageReveal, Reveal, Stagger, StaggerItem } from "@/components/motion/primitives";
import { site } from "@/lib/content/site";
import { unsplash } from "@/lib/content/helpers";

const { base } = site;

const orbs = [
  { name: "Soaped oak", note: "Floors that glow", src: unsplash("1617325247661-675ab4b64ae2"), offset: "", delay: 0 },
  { name: "Raw linen", note: "Soft with every wash", src: unsplash("1616627561950-9f746e330187"), offset: "mt-12 sm:mt-20", delay: 0.15 },
  { name: "Bouclé wool", note: "Warm, quiet, durable", src: unsplash("1631679706909-1844bbd07221"), offset: "-mt-4 sm:-mt-6", delay: 0.3 },
  { name: "Living green", note: "A plant in every room", src: unsplash("1502672260266-1c1ef2d93688"), offset: "mt-8 sm:mt-14", delay: 0.45 },
];

export default function Design3Home() {
  const featured = site.projects.filter((p) => p.featured);

  return (
    <>
      <Hero image={unsplash("1583847268964-b28dc8f51f92")} imageAlt="Bright living room with a pale sofa, round side table, framed art and plants by the window" />

      <MarqueeBand
        items={["Light", "Oak", "Linen", "Wool", "Stone", "Living green", "Calm"]}
        className="mt-16 py-4 font-display text-[clamp(1.8rem,4vw,3.25rem)] font-light text-ink sm:mt-24"
        accentClassName="italic text-sage-deep"
        separator={<Leaf className="h-6 w-6 shrink-0 text-oak" />}
      />

      {/* Intro */}
      <section className={`${container} py-24 sm:py-32`}>
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <Heading eyebrow="Welcome" title="We design homes that feel like a deep breath" accent={["deep", "breath"]} intro="For fifteen years we've helped Copenhagen families, makers and teams create spaces that are calm, practical and close to nature — using materials that grow more beautiful with time." />
            <Reveal delay={0.3} className="mt-8">
              <TextLink href={`${base}/about`}>Our story</TextLink>
            </Reveal>
          </div>
          <div className="relative lg:col-span-5 lg:col-start-8">
            <ImageReveal className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] rounded-tr-[8rem] bg-sand">
              <Image src={unsplash("1585128792020-803d29415281")} alt="Oak sideboard with ceramics and plants beside a soft white armchair" fill sizes="(min-width: 1024px) 38vw, 100vw" className="object-cover" />
            </ImageReveal>
            <Reveal delay={0.4} className="absolute -bottom-6 -left-3 rounded-[1.5rem] bg-snow p-5 shadow-[0_25px_50px_-25px_rgba(43,46,41,0.5)] sm:-left-10">
              <p className="font-display text-4xl font-light tracking-[-0.025em] text-sage-deep">1,500</p>
              <p className="mt-1 max-w-[10rem] font-sans text-sm text-mute">natural samples in our material library</p>
            </Reveal>
          </div>
        </div>
        <div className="mt-24">
          <StatChips stats={site.stats} />
        </div>
      </section>

      {/* Projects */}
      <section className="bg-linen py-24 sm:py-32" aria-labelledby="projects">
        <div className={container}>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div id="projects">
              <Heading eyebrow="Selected projects" title="Light, wood & living green" accent={["living", "green"]} />
            </div>
            <Reveal><Button href={`${base}/projects`} variant="ghost">All projects</Button></Reveal>
          </div>
          <Stagger className="mt-14 grid gap-5 md:grid-cols-2" stagger={0.12}>
            {featured.map((p, i) => (
              <StaggerItem key={p.slug} className={i === 0 ? "md:col-span-2" : ""}>
                <ProjectCard project={p} base={base} aspect={i === 0 ? "aspect-[4/3] md:aspect-[21/9]" : "aspect-[4/3]"} sizes={i === 0 ? "(min-width: 1320px) 1260px, 100vw" : "(min-width: 768px) 50vw, 100vw"} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Services */}
      <section className={`${container} py-24 sm:py-32`} aria-labelledby="services">
        <div id="services">
          <Heading eyebrow="What we do" title="Services for every room" accent={["every"]} align="center" intro="Whole homes, single rooms, workplaces or just a little direction — every service starts with listening." />
        </div>
        <Stagger as="ul" className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
          {site.services.map((s) => (
            <StaggerItem as="li" key={s.slug}>
              <ServiceCard service={s} base={base} />
            </StaggerItem>
          ))}
          <StaggerItem as="li" className="flex flex-col justify-between rounded-[2rem] bg-sage-deep p-7 text-snow">
            <p className="font-display text-2xl font-light leading-snug">Not sure where to start?</p>
            <Button href={`${base}/services#consultation`} variant="light" className="mt-6 self-start">Book a consultation</Button>
          </StaggerItem>
        </Stagger>
      </section>

      {/* Materials philosophy */}
      <section className="overflow-hidden bg-sand/60 py-24 sm:py-32" aria-labelledby="materials">
        <div className={`${container} grid items-center gap-14 lg:grid-cols-2`}>
          <div id="materials">
            <Heading eyebrow="Our philosophy" title="Honest materials, gently used" accent={["gently"]} intro="We build with a short list of natural materials and let them do the talking. They age beautifully, can be repaired, and make a home feel quietly alive." />
            <Reveal delay={0.25}>
              <ul className="mt-8 space-y-3 font-sans text-[15px] text-ink">
                {["Locally made wherever possible", "Repairable before replaceable", "A planting plan in every project"].map((t) => (
                  <li key={t} className="flex items-center gap-3"><span aria-hidden className="h-2 w-2 rounded-full bg-sage-deep" />{t}</li>
                ))}
              </ul>
            </Reveal>
          </div>
          <MaterialOrbs orbs={orbs} />
        </div>
      </section>

      {/* Process */}
      <section className={`${container} py-24 sm:py-32`} aria-labelledby="process">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div id="process">
            <Heading eyebrow="How we work" title="Six unhurried steps" accent={["unhurried"]} />
          </div>
          <Reveal><TextLink href={`${base}/process`}>Read about our process</TextLink></Reveal>
        </div>
        <div className="mt-14 rounded-[2.5rem] bg-linen p-3 sm:p-5">
          <ProcessSteps steps={site.process} />
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-sage/30 py-24 sm:py-32" aria-labelledby="stories">
        <div className={`${container} grid gap-12 lg:grid-cols-12`}>
          <div className="lg:col-span-4" id="stories">
            <Heading eyebrow="Client stories" title="Homes that feel right" accent={["right"]} />
            <Reveal delay={0.2} className="mt-8">
              <TextLink href={`${base}/testimonials`}>More stories</TextLink>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <TestimonialCards items={site.testimonials} />
          </div>
        </div>
      </section>

      {/* Journal */}
      <section className={`${container} py-24 sm:py-32`} aria-labelledby="journal">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div id="journal">
            <Eyebrow>Journal</Eyebrow>
            <h2 className="mt-5 font-display text-[clamp(2.1rem,4.6vw,3.6rem)] font-light tracking-[-0.025em]">Ideas for slower living</h2>
          </div>
          <Reveal><Button href={`${base}/journal`} variant="ghost">Visit the journal</Button></Reveal>
        </div>
        <Stagger className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
          {site.posts.slice(0, 3).map((p) => (
            <StaggerItem key={p.slug}><PostCard post={p} base={base} /></StaggerItem>
          ))}
        </Stagger>
      </section>

      <CtaBand />
    </>
  );
}
