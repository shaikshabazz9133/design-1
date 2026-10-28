import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { JournalExplorer } from "@/components/site/JournalExplorer";
import { CtaBand } from "@/components/site/sections";
import { container, Eyebrow } from "@/components/site/ui";
import { Reveal, SplitText } from "@/components/motion/primitives";
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
      <header className={`${container} pb-12 pt-32 sm:pt-40`}>
        <Reveal y={10}><Eyebrow>Journal</Eyebrow></Reveal>
        <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.6rem,6.2vw,5rem)] font-light leading-[1.04] tracking-[-0.02em]">
          <SplitText text="Notes on light, nature & slower living" immediate delay={0.2} accentWords={["nature"]} accentClassName="italic text-sage-deep" />
        </h1>
      </header>

      <section className={`${container} pb-16`} aria-label="Featured article">
        <Reveal>
          <Link href={`${site.base}/journal/${featured.slug}`} className="group relative block overflow-hidden rounded-[2.5rem]">
            <div className="relative aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9]">
              <Image src={featured.image} alt={featured.imageAlt} fill loading="eager" sizes="(min-width: 1320px) 1260px, 100vw" className="object-cover transition-transform duration-[1.6s] ease-luxe group-hover:scale-105" />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-6 text-snow sm:p-10 lg:max-w-3xl lg:p-14">
              <p className="font-sans text-sm text-snow/80">Featured · {featured.category} · <time dateTime={featured.date}>{formatDate(featured.date)}</time></p>
              <h2 className="mt-3 font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-tight tracking-[-0.02em]">{featured.title}</h2>
              <p className="mt-3 hidden font-sans text-[17px] text-snow/85 sm:block">{featured.excerpt}</p>
              <span className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-snow px-5 font-sans text-[15px] font-medium text-ink">
                Read article <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden />
              </span>
            </div>
          </Link>
        </Reveal>
      </section>

      <section className={`${container} pb-16`} aria-label="All articles">
        <JournalExplorer posts={rest} categories={postCategories(rest)} base={site.base} />
      </section>

      <CtaBand />
    </>
  );
}
