import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft } from "lucide-react";
import { ProjectCard } from "@/components/site/cards";
import { ProjectGallery } from "@/components/site/ProjectGallery";
import { CtaBand } from "@/components/site/sections";
import { container, Eyebrow, Heading, TextLink } from "@/components/site/ui";
import { ImageReveal, Reveal, SplitText, Stagger, StaggerItem } from "@/components/motion/primitives";
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
      <div className="h-4 w-32 bg-shell" />
      <div className="mt-8 h-24 w-2/3 bg-shell" />
      <div className="mt-12 aspect-[21/9] bg-shell" />
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
    { k: "Location", v: project.location },
    { k: "Completed", v: String(project.year) },
    { k: "Size", v: project.area },
    { k: "Duration", v: project.duration },
    { k: "Client", v: project.client },
  ];
  const number = String(site.projects.indexOf(project) + 1).padStart(2, "0");

  return (
    <article>
      <header className={`${container} pb-10 pt-28 sm:pt-32`}>
        <div className="flex items-center justify-between">
          <Link href={`${site.base}/projects`} className="group inline-flex min-h-11 items-center gap-2 font-label text-[12px] uppercase tracking-[0.18em] text-mute hover:text-pine">
            <ArrowLeft size={14} strokeWidth={1.5} className="transition-transform group-hover:-translate-x-1" aria-hidden /> All projects
          </Link>
          <span className="font-label text-[12px] uppercase tracking-[0.18em] text-mute">{number} / {String(site.projects.length).padStart(2, "0")}</span>
        </div>
        <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal y={8}><Eyebrow>{project.category}</Eyebrow></Reveal>
            <h1 className="mt-4 font-display text-[clamp(2.8rem,5.6vw,5rem)] leading-[1.02]">
              <SplitText text={project.title} immediate delay={0.1} />
            </h1>
            <Reveal delay={0.3}>
              <p className="mt-5 max-w-xl font-sans text-[17px] font-light leading-relaxed text-mute">{project.summary}</p>
            </Reveal>
          </div>
          <Stagger as="ul" className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-ink/10 pt-5 sm:grid-cols-3 lg:col-span-5" stagger={0.05} delay={0.35}>
            {facts.map(({ k, v }) => (
              <StaggerItem as="li" key={k}>
                <p className="font-label text-[11px] uppercase tracking-[0.18em] text-pine">{k}</p>
                <p className="mt-1 font-sans text-[15px] font-light text-ink">{v}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </header>

      <div className={container}>
        <ImageReveal className="relative aspect-[4/3] overflow-hidden bg-shell sm:aspect-[16/8]" immediate delay={0.2}>
          <Image src={project.hero} alt={project.heroAlt} fill preload sizes="(min-width: 1280px) 1216px, 100vw" className="object-cover" />
        </ImageReveal>
      </div>

      <section className={`${container} py-16 sm:py-20`}>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal y={8}><Eyebrow>Overview</Eyebrow></Reveal>
            <Reveal delay={0.15}>
              <ul className="mt-6 flex flex-wrap gap-2">
                {project.services.map((s) => <li key={s} className="rounded-full bg-sand-light px-3.5 py-1.5 font-sans text-sm font-light text-forest">{s}</li>)}
              </ul>
            </Reveal>
          </div>
          <div className="space-y-5 font-sans text-[16px] font-light leading-relaxed text-mute lg:col-span-8">
            {project.overview.map((p, i) => <Reveal key={i} delay={i * 0.1}><p className={i === 0 ? "font-display text-[clamp(1.6rem,2.4vw,2.1rem)] leading-[1.3] text-ink" : ""}>{p}</p></Reveal>)}
          </div>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <Reveal className="bg-shell p-8 sm:p-10">
            <Eyebrow>Design concept</Eyebrow>
            <p className="mt-4 font-display text-[1.6rem] leading-[1.3]">{project.concept}</p>
          </Reveal>
          <Reveal className="bg-sand-light p-8 sm:p-10" delay={0.1}>
            <Eyebrow>The challenge</Eyebrow>
            <p className="mt-4 font-sans text-[16px] font-light leading-relaxed text-ink/80">{project.challenge}</p>
          </Reveal>
        </div>
      </section>

      <section className={`${container} pb-16 sm:pb-20`} aria-label="Project gallery">
        <ProjectGallery images={project.gallery} />
      </section>

      {project.beforeAfter && (
        <section className="bg-forest py-16 text-white sm:py-20">
          <div className={container}>
            <Heading eyebrow="Before & after" title="A gentle transformation" accent={["gentle"]} intro="Drag the handle (or use the arrow keys) to compare the room before and after." light />
            <Reveal className="mt-10">
              <BeforeAfter
                {...project.beforeAfter}
                className="aspect-[4/3] sm:aspect-[16/9]"
                labelClassName="rounded-full bg-white/90 px-3 py-1 font-label text-[11px] uppercase tracking-[0.16em] text-forest backdrop-blur"
                handleClassName="h-12 w-12 rounded-full bg-white text-pine shadow-lg"
                lineClassName="bg-white w-px"
              />
            </Reveal>
          </div>
        </section>
      )}

      <section className={`${container} py-16 sm:py-20`}>
        <Heading eyebrow="Materials" title="What it’s made of" accent={["made"]} />
        <Stagger as="ul" className="mt-10 grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
          {project.materials.map((m) => (
            <StaggerItem as="li" key={m.name} className="group">
              <span aria-hidden className="block aspect-square shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)] transition-transform duration-700 ease-luxe group-hover:-translate-y-1" style={{ background: m.swatch }} />
              <p className="mt-3 font-display text-[1.3rem] font-normal leading-tight">{m.name}</p>
              <p className="mt-0.5 font-sans text-sm font-light text-mute">{m.note}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="bg-shell py-16 sm:py-20">
        <div className={container}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <Heading eyebrow="More projects" title="You may also like" />
            <TextLink href={`${site.base}/projects/${next.slug}`}>Next project: {next.title}</TextLink>
          </div>
          <div className="mt-10 grid gap-x-6 gap-y-10 md:grid-cols-2">
            {related.map((p) => <ProjectCard key={p.slug} project={p} base={site.base} sizes="(min-width: 768px) 50vw, 100vw" />)}
          </div>
        </div>
      </section>

      <CtaBand />
    </article>
  );
}
