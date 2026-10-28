import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft, Calendar, Clock, MapPin, Ruler, User } from "lucide-react";
import { ProjectCard } from "@/components/site/cards";
import { ProjectGallery } from "@/components/site/ProjectGallery";
import { CtaBand } from "@/components/site/sections";
import { container, Eyebrow, Heading, TextLink } from "@/components/site/ui";
import { ImageReveal, Parallax, Reveal, SplitText, Stagger, StaggerItem } from "@/components/motion/primitives";
import { BeforeAfter } from "@/components/ui/BeforeAfter";
import { site } from "@/lib/content/site";
import { findProject, nextProject, relatedProjects } from "@/lib/content/helpers";

export function generateStaticParams() {
  return site.projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = findProject(site, slug);
  if (!p) return { title: "Project not found" };
  return { title: p.title, description: p.summary };
}

function Skeleton() {
  return (
    <div role="status" aria-label="Loading project" className={`${container} animate-pulse pb-16 pt-32`}>
      <div className="h-6 w-32 rounded-full bg-sand" />
      <div className="mt-6 h-16 w-2/3 rounded-2xl bg-linen" />
      <div className="mt-10 aspect-[21/9] rounded-[2.5rem] bg-linen" />
    </div>
  );
}

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<Skeleton />}>
      <ProjectContent params={params} />
    </Suspense>
  );
}

async function ProjectContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = findProject(site, slug);
  if (!project) notFound();
  const next = nextProject(site, project);
  const related = relatedProjects(site, project, 2);
  const facts = [
    { icon: MapPin, k: "Location", v: project.location },
    { icon: Calendar, k: "Completed", v: String(project.year) },
    { icon: Ruler, k: "Size", v: project.area },
    { icon: Clock, k: "Duration", v: project.duration },
    { icon: User, k: "Client", v: project.client },
  ];

  return (
    <article>
      <header className={`${container} pb-10 pt-28 sm:pt-36`}>
        <Link href={`${site.base}/projects`} className="group inline-flex min-h-11 items-center gap-2 font-sans text-[15px] text-mute hover:text-ink">
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" aria-hidden /> All projects
        </Link>
        <div className="mt-6 grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal y={10}><Eyebrow>{project.category}</Eyebrow></Reveal>
            <h1 className="mt-5 font-display text-[clamp(2.6rem,6.5vw,5.5rem)] font-light leading-[1.02] tracking-[-0.025em]">
              <SplitText text={project.title} immediate delay={0.15} />
            </h1>
          </div>
          <Reveal delay={0.35} className="lg:col-span-5">
            <p className="font-sans text-lg leading-relaxed text-mute">{project.summary}</p>
          </Reveal>
        </div>
      </header>

      <div className={container}>
        <ImageReveal className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem] bg-sand sm:aspect-[21/9]" immediate delay={0.2}>
          <Parallax className="absolute inset-0" range={50}>
            <Image src={project.hero} alt={project.heroAlt} fill preload sizes="(min-width: 1320px) 1260px, 100vw" className="object-cover" />
          </Parallax>
        </ImageReveal>
      </div>

      <section className={`${container} pt-6`}>
        <Stagger as="ul" className="grid grid-cols-2 gap-3 rounded-[2rem] bg-linen p-3 sm:grid-cols-3 lg:grid-cols-5" stagger={0.06}>
          {facts.map(({ icon: Icon, k, v }) => (
            <StaggerItem as="li" key={k} className="rounded-[1.4rem] bg-snow p-4">
              <p className="flex items-center gap-2 font-sans text-sm text-mute"><Icon size={15} className="text-sage-deep" aria-hidden />{k}</p>
              <p className="mt-1.5 font-display text-lg">{v}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className={`${container} py-24 sm:py-28`}>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Heading eyebrow="Overview" title="The brief" />
            <Reveal delay={0.2}>
              <ul className="mt-6 flex flex-wrap gap-2">
                {project.services.map((s) => <li key={s} className="rounded-full bg-sage/30 px-3.5 py-1.5 font-sans text-sm text-sage-deep">{s}</li>)}
              </ul>
            </Reveal>
          </div>
          <div className="space-y-5 font-sans text-[17px] leading-relaxed text-mute lg:col-span-7">
            {project.overview.map((p, i) => <Reveal key={i} delay={i * 0.1}><p className={i === 0 ? "font-display text-[1.45rem] font-light leading-snug text-ink" : ""}>{p}</p></Reveal>)}
          </div>
        </div>
        <div className="mt-16 grid gap-4 md:grid-cols-2">
          <Reveal className="rounded-[2rem] bg-sage/30 p-8 sm:p-10">
            <p className="font-sans text-sm font-medium text-sage-deep">Design concept</p>
            <p className="mt-4 font-display text-[1.45rem] font-light leading-snug">{project.concept}</p>
          </Reveal>
          <Reveal className="rounded-[2rem] bg-sand/70 p-8 sm:p-10" delay={0.1}>
            <p className="font-sans text-sm font-medium text-oak-deep">The challenge</p>
            <p className="mt-4 font-sans text-[17px] leading-relaxed text-mute">{project.challenge}</p>
          </Reveal>
        </div>
      </section>

      <section className={`${container} pb-24 sm:pb-28`} aria-label="Project gallery">
        <ProjectGallery images={project.gallery} />
      </section>

      {project.beforeAfter && (
        <section className="bg-linen py-24 sm:py-28">
          <div className={container}>
            <Heading eyebrow="Before & after" title="A gentle transformation" accent={["gentle"]} intro="Drag the handle (or use the arrow keys) to compare the room before and after." />
            <Reveal className="mt-10">
              <BeforeAfter
                {...project.beforeAfter}
                className="aspect-[4/3] rounded-[2rem] sm:aspect-[16/9]"
                labelClassName="rounded-full bg-snow/90 px-3 py-1 font-sans text-sm text-ink backdrop-blur"
                handleClassName="h-12 w-12 rounded-full bg-snow text-sage-deep shadow-lg"
                lineClassName="bg-snow w-0.5"
              />
            </Reveal>
          </div>
        </section>
      )}

      <section className={`${container} py-24 sm:py-28`}>
        <Heading eyebrow="Materials" title="What it's made of" accent={["made"]} />
        <Stagger as="ul" className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {project.materials.map((m) => (
            <StaggerItem as="li" key={m.name} className="group flex items-center gap-4 rounded-[1.75rem] bg-linen p-4 transition-colors hover:bg-sand">
              <span aria-hidden className="h-16 w-16 shrink-0 rounded-[1.2rem] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)] transition-transform duration-500 group-hover:rotate-6" style={{ background: m.swatch }} />
              <div>
                <p className="font-display text-lg">{m.name}</p>
                <p className="font-sans text-sm text-mute">{m.note}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="bg-sage/20 py-24 sm:py-28">
        <div className={container}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <Heading eyebrow="More projects" title="You may also like" />
            <TextLink href={`${site.base}/projects/${next.slug}`}>Next project: {next.title}</TextLink>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {related.map((p) => <ProjectCard key={p.slug} project={p} base={site.base} sizes="(min-width: 768px) 50vw, 100vw" />)}
          </div>
        </div>
      </section>

      <CtaBand />
    </article>
  );
}
