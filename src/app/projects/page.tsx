import type { Metadata } from "next";
import { ProjectsExplorer } from "@/components/site/ProjectsExplorer";
import { CtaBand } from "@/components/site/sections";
import { container, Eyebrow } from "@/components/site/ui";
import { Reveal, SplitText } from "@/components/motion/primitives";
import { site } from "@/lib/content/site";
import { projectCategories } from "@/lib/content/helpers";

export const metadata: Metadata = {
  title: "Projects",
  description: "Homes, kitchens, bedrooms and workplaces across Copenhagen and North Zealand by Linnea Studio.",
};

export default function ProjectsPage() {
  const years = site.projects.map((p) => p.year);
  return (
    <>
      <header className={`${container} pb-10 pt-28 sm:pt-32`}>
        <div className="flex items-start justify-between gap-6">
          <Reveal y={8}><Eyebrow>Projects</Eyebrow></Reveal>
          <Reveal y={8} className="font-label text-[11px] uppercase tracking-[0.16em] text-mute">{String(site.projects.length).padStart(2, "0")} works · {Math.min(...years)}—{Math.max(...years)}</Reveal>
        </div>
        <h1 className="mt-5 max-w-[16ch] font-display text-[clamp(2.6rem,5.2vw,4.75rem)] leading-[1.04]">
          <SplitText text="Homes full of light and life" immediate delay={0.1} accentWords={["light", "life"]} accentClassName="italic text-pine" />
        </h1>
        <Reveal delay={0.4}>
          <p className="mt-5 max-w-xl font-sans text-[17px] font-light leading-relaxed text-mute">A selection of recent homes and workplaces. Filter by type to find spaces like yours.</p>
        </Reveal>
      </header>
      <section className={`${container} pb-16`}>
        <ProjectsExplorer projects={site.projects} categories={projectCategories(site.projects)} base={site.base} />
      </section>
      <CtaBand title="Picture your own home here" accent={["own"]} />
    </>
  );
}
