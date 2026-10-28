import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JournalExplorer } from "@/components/site/JournalExplorer";
import { CtaBand } from "@/components/site/sections";
import { container, Eyebrow } from "@/components/site/ui";
import { ImageReveal, Reveal, SplitText } from "@/components/motion/primitives";
import { site } from "@/lib/content/site";
import { formatDate, postCategories } from "@/lib/content/helpers";

export const metadata: Metadata = {
  title: "Journal",
  description: "Ideas on light, natural materials, plants and slower living from the Linnea Studio team.",
};

export default function JournalPage() {
  const featured = site.posts.find((p) => p.featured) ?? site.posts[0];
  const rest = site.posts.filter((p) => p !== featured);

  return (
    <>
      <header className={`${container} pb-10 pt-28 sm:pt-32`}>
        <Reveal y={8}><Eyebrow>Journal</Eyebrow></Reveal>
        <h1 className="mt-8 max-w-[15ch] font-display text-[clamp(2.6rem,5.2vw,4.75rem)] leading-[1.04]">
          <SplitText text="Notes on light, nature & slower living" immediate delay={0.1} accentWords={["nature"]} accentClassName="italic text-pine" />
        </h1>
      </header>

      <section className={`${container} pb-16`} aria-label="Featured article">
        <Link href={`${site.base}/journal/${featured.slug}`} data-cursor="Read" className="group grid gap-8 border-t border-ink/10 pt-8 lg:grid-cols-12 lg:gap-12">
          <ImageReveal className="relative aspect-[4/3] overflow-hidden bg-shell lg:col-span-7" immediate delay={0.3}>
            <Image src={featured.image} alt={featured.imageAlt} fill loading="eager" sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover transition-transform duration-[1.6s] ease-luxe group-hover:scale-105" />
          </ImageReveal>
          <Reveal delay={0.5} className="flex flex-col justify-between lg:col-span-5">
            <div className="flex justify-between font-label text-[11px] uppercase tracking-[0.16em] text-mute">
              <span className="text-pine">Featured · {featured.category}</span>
              <time dateTime={featured.date}>{formatDate(featured.date)}</time>
            </div>
            <div className="mt-6">
              <h2 className="font-display text-[clamp(2rem,3.2vw,3rem)] leading-[1.1] transition-colors duration-500 group-hover:text-pine">{featured.title}</h2>
              <p className="mt-6 max-w-md font-sans text-[17px] leading-relaxed text-mute">{featured.excerpt}</p>
              <span className="mt-8 inline-flex items-center gap-2 font-sans text-[15px] font-medium">
                Read article <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">→</span>
              </span>
            </div>
          </Reveal>
        </Link>
      </section>

      <section className={`${container} pb-16`} aria-label="All articles">
        <JournalExplorer posts={rest} categories={postCategories(rest)} base={site.base} />
      </section>

      <CtaBand />
    </>
  );
}
