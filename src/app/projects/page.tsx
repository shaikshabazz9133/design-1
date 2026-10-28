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
  return (
    <>
      <header className={`${container} pb-12 pt-32 text-center sm:pt-40`}>
        <Reveal y={10}><Eyebrow>Projects</Eyebrow></Reveal>
        <h1 className="mx-auto mt-6 max-w-3xl font-display text-[clamp(2.6rem,6.2vw,5rem)] font-light leading-[1.04] tracking-[-0.02em]">
          <SplitText text="Homes full of light and life" immediate delay={0.2} accentWords={["light", "life"]} accentClassName="italic text-sage-deep" />
        </h1>
        <Reveal delay={0.4}>
          <p className="mx-auto mt-5 max-w-xl font-sans text-lg leading-relaxed text-mute">A selection of recent homes and workplaces. Filter by type to find spaces like yours.</p>
        </Reveal>
      </header>
      <section className={`${container} pb-16`}>
        <ProjectsExplorer projects={site.projects} categories={projectCategories(site.projects)} base={site.base} />
      </section>
      <CtaBand title="Picture your own home here" accent={["own"]} />
    </>
  );
}
