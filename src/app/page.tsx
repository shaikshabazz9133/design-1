import Image from "next/image";
import { PostCard, ProjectCard, ServiceCard } from "@/components/site/cards";
import { MarqueeBand } from "@/components/motion/extras";
import { Hero } from "@/components/site/Hero";
import { MaterialSpecimens } from "@/components/site/MaterialSpecimens";
import { ProcessSteps } from "@/components/site/ProcessSteps";
import { ProjectIndex } from "@/components/site/ProjectIndex";
import { CtaBand } from "@/components/site/sections";
import { TestimonialCards } from "@/components/site/TestimonialCards";
import { Button, container, Heading, Mark, TextLink } from "@/components/site/ui";
import { ImageReveal, Reveal, Stagger, StaggerItem } from "@/components/motion/primitives";
import { site } from "@/lib/content/site";
import { unsplash } from "@/lib/content/helpers";

const { base } = site;

const specimens = [
  { name: "Soaped oak", note: "Floors that glow with age", src: unsplash("1617325247661-675ab4b64ae2") },
  { name: "Raw linen", note: "Softer with every wash", src: unsplash("1616627561950-9f746e330187") },
  { name: "Bouclé wool", note: "Warm, quiet, durable", src: unsplash("1631679706909-1844bbd07221") },
  { name: "Living green", note: "A plant in every room", src: unsplash("1502672260266-1c1ef2d93688") },
];

const section = "py-16 sm:py-20";

/** Heading on the left, an action on the right, aligned to the same baseline. */
function SectionHead({ children, action }: { children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      {children}
      {action && <Reveal className="shrink-0">{action}</Reveal>}
    </div>
  );
}

export default function Home() {
  const featured = site.projects.filter((p) => p.featured);
  const more = site.projects.filter((p) => !p.featured);

  return (
    <>
      <Hero
        image={unsplash("1583847268964-b28dc8f51f92")}
        imageAlt="Bright living room with a pale sofa, round side table, framed art and plants by the window"
        detail={unsplash("1617325247661-675ab4b64ae2")}
        detailAlt="Bedroom with an oak bed frame and soft linen bedding"
      />

      <MarqueeBand
        items={["Light", "Oak", "Linen", "Wool", "Stone", "Living green", "Calm"]}
        className="mt-16 bg-shell py-5 font-display text-[clamp(1.5rem,2.4vw,2rem)] text-ink sm:mt-20"
        accentClassName="italic text-pine"
        separator={<Mark className="h-4 w-4 shrink-0 text-sand" />}
      />

      {/* Studio intro */}
      <section className={`${container} ${section}`}>
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <ImageReveal className="relative aspect-[4/3] overflow-hidden bg-shell lg:col-span-6">
            <Image src={unsplash("1585128792020-803d29415281")} alt="Oak sideboard with ceramics and plants beside a soft white armchair" fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />
          </ImageReveal>
          <div className="lg:col-span-6">
            <Heading eyebrow="The studio" title="We design homes that feel like a deep breath" accent={["deep", "breath"]} intro="For fifteen years we've helped Copenhagen families, makers and teams create spaces that are calm, practical and close to nature — using materials that grow more beautiful with time." />
            <Reveal delay={0.2}>
              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {["1,500 natural samples in our library", "A senior designer on every project", "Locally made wherever possible", "A planting plan in every home"].map((t) => (
                  <li key={t} className="flex items-start gap-3 font-sans text-[15px] font-light text-ink"><Mark className="mt-0.5 h-4 w-4 shrink-0 text-pine" />{t}</li>
                ))}
              </ul>
              <TextLink href={`${base}/about`} className="mt-7">Our story</TextLink>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Selected work */}
      <section className={`${container} ${section}`} aria-labelledby="projects">
        <SectionHead action={<Button href={`${base}/projects`} variant="outline">All projects</Button>}>
          <div id="projects"><Heading eyebrow="Selected work" title="Light, wood & living green" accent={["living", "green"]} /></div>
        </SectionHead>
        <Stagger className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
          {featured.map((p, i) => (
            <StaggerItem key={p.slug} className={i === 2 ? "sm:col-span-2 lg:col-span-1" : ""}>
              <ProjectCard project={p} base={base} aspect={i === 2 ? "aspect-[4/5] sm:aspect-[16/9] lg:aspect-[4/5]" : "aspect-[4/5]"} sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" />
            </StaggerItem>
          ))}
        </Stagger>
        {more.length > 0 && (
          <div className="mt-14">
            <Reveal y={8}><p className="mb-4 font-label text-[12px] uppercase tracking-[0.22em] text-mute">More work</p></Reveal>
            <ProjectIndex projects={more} base={base} />
          </div>
        )}
      </section>

      {/* Services */}
      <section className={`bg-shell ${section}`} aria-labelledby="services">
        <div className={container}>
          <SectionHead action={<TextLink href={`${base}/services`}>All services</TextLink>}>
            <div id="services"><Heading eyebrow="What we do" title="Services for every room" accent={["every"]} intro="Whole homes, single rooms, workplaces or just a little direction — every service starts with listening." /></div>
          </SectionHead>
          <Stagger as="ul" className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
            {site.services.map((s) => (
              <StaggerItem as="li" key={s.slug}>
                <ServiceCard service={s} base={base} />
              </StaggerItem>
            ))}
            <StaggerItem as="li" className="flex flex-col justify-between bg-pine p-7 text-white">
              <Mark className="h-7 w-7 text-sand" />
              <div className="mt-8">
                <p className="font-display text-[1.6rem] font-normal leading-tight">Not sure where to start?</p>
                <Button href={`${base}/services#consultation`} variant="light" className="mt-5">Book a consultation</Button>
              </div>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      {/* Materials */}
      <section className={`${container} ${section}`} aria-labelledby="materials">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div id="materials" className="lg:col-span-7"><Heading eyebrow="Our philosophy" title="Honest materials, gently used" accent={["gently"]} /></div>
          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="font-sans text-[16px] font-light leading-relaxed text-mute">We build with a short list of natural materials and let them do the talking. They age beautifully, can be repaired, and make a home feel quietly alive.</p>
          </Reveal>
        </div>
        <div className="mt-10"><MaterialSpecimens items={specimens} /></div>
      </section>

      {/* Process */}
      <section className={`${container} ${section}`} aria-labelledby="process">
        <SectionHead action={<TextLink href={`${base}/process`}>Read about our process</TextLink>}>
          <div id="process"><Heading eyebrow="How we work" title="Six unhurried steps" accent={["unhurried"]} /></div>
        </SectionHead>
        <div className="mt-10"><ProcessSteps steps={site.process} /></div>
      </section>

      {/* Stories */}
      <section className={`bg-forest text-white ${section}`} aria-labelledby="stories">
        <div className={`${container} grid gap-10 lg:grid-cols-12 lg:items-center`}>
          <div className="lg:col-span-4" id="stories">
            <Heading eyebrow="Client stories" title="Homes that feel right" accent={["right"]} light />
            <Reveal delay={0.2} className="mt-6">
              <TextLink href={`${base}/testimonials`} className="text-sand!">More stories</TextLink>
            </Reveal>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <TestimonialCards items={site.testimonials} />
          </div>
        </div>
      </section>

      {/* Journal */}
      <section className={`${container} ${section}`} aria-labelledby="journal">
        <SectionHead action={<Button href={`${base}/journal`} variant="outline">Visit the journal</Button>}>
          <div id="journal"><Heading eyebrow="Journal" title="Ideas for slower living" accent={["slower"]} /></div>
        </SectionHead>
        <Stagger className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
          {site.posts.slice(0, 3).map((p) => (
            <StaggerItem key={p.slug}><PostCard post={p} base={base} /></StaggerItem>
          ))}
        </Stagger>
      </section>

      <CtaBand />
    </>
  );
}
