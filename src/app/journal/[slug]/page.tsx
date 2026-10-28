import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft } from "lucide-react";
import { PostCard } from "@/components/site/cards";
import { CtaBand } from "@/components/site/sections";
import { container, Eyebrow, Heading, MetaRow } from "@/components/site/ui";
import { ImageReveal, Reveal, SplitText } from "@/components/motion/primitives";
import { ShareButton } from "@/components/ui/ShareButton";
import { site } from "@/lib/content/site";
import { findPost, formatDate, relatedPosts } from "@/lib/content/helpers";

export function generateStaticParams() {
  return site.posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = findPost(site, slug);
  if (!post) return { title: "Article not found" };
  return { title: post.title, description: post.excerpt, openGraph: { type: "article", publishedTime: post.date, authors: [post.author] } };
}

function Skeleton() {
  return (
    <div role="status" aria-label="Loading article" className={`${container} animate-pulse pb-16 pt-36`}>
      <div className="max-w-4xl space-y-6">
        <div className="h-4 w-28 bg-shell" />
        <div className="h-28 bg-shell" />
      </div>
      <div className="mt-12 aspect-[21/9] bg-shell" />
    </div>
  );
}

export default function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<Skeleton />}>
      <ArticleContent params={params} />
    </Suspense>
  );
}

async function ArticleContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = findPost(site, slug);
  if (!post) notFound();
  const related = relatedPosts(site, post);
  const firstP = post.body.findIndex((b) => b.type === "p");
  const dropCap = "first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-[4rem] first-letter:leading-[0.8] first-letter:text-pine";

  return (
    <article>
      <header className={`${container} pb-10 pt-28 sm:pt-32`}>
        <Link href={`${site.base}/journal`} className="group inline-flex min-h-11 items-center gap-2 font-label text-[11px] uppercase tracking-[0.16em] text-mute hover:text-ink">
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" aria-hidden /> Journal
        </Link>
        <Reveal y={8} className="mt-6"><Eyebrow>{post.category}</Eyebrow></Reveal>
        <h1 className="mt-6 max-w-[22ch] font-display text-[clamp(2.4rem,4.6vw,4.25rem)] leading-[1.08]">
          <SplitText text={post.title} immediate delay={0.1} stagger={0.04} />
        </h1>
        <Reveal delay={0.4}>
          <MetaRow className="mt-6" items={[post.author, formatDate(post.date), post.readTime]} />
        </Reveal>
      </header>

      <ImageReveal className="relative mx-auto aspect-[16/9] w-[calc(100%-2.5rem)] max-w-[1216px] overflow-hidden bg-shell sm:w-[calc(100%-4rem)]" immediate delay={0.2}>
          <Image src={post.image} alt={post.imageAlt} fill preload sizes="100vw" className="object-cover" />
      </ImageReveal>

      <div className={`${container} py-16 sm:py-20`}>
        <div className="mx-auto max-w-2xl font-sans">
          <Reveal>
            <p className="mb-10 font-display text-[clamp(1.6rem,2.4vw,2rem)] leading-[1.3] text-ink">{post.excerpt}</p>
          </Reveal>
          {post.body.map((b, i) => {
            if (b.type === "p") return <Reveal key={i} y={14}><p className={`mb-7 text-[17px] font-light leading-[1.85] text-ink/85 ${i === firstP ? dropCap : ""}`}>{b.text}</p></Reveal>;
            if (b.type === "h2") return <Reveal key={i} y={14}><h2 className="mb-5 mt-12 font-display text-[2rem] font-normal leading-tight">{b.text}</h2></Reveal>;
            if (b.type === "quote")
              return (
                <Reveal key={i}>
                  <figure className="my-16 border-l-2 border-sand pl-8 sm:-ml-10">
                    <blockquote className="font-display text-[clamp(1.6rem,2.6vw,2.1rem)] italic leading-[1.25]">“{b.text}”</blockquote>
                    {b.cite && <figcaption className="mt-5 font-label text-[11px] uppercase tracking-[0.16em] text-mute">— {b.cite}</figcaption>}
                  </figure>
                </Reveal>
              );
            if (b.type === "list")
              return (
                <Reveal key={i} y={14}>
                  <ul className="mb-10 border-t border-ink/10">
                    {b.items.map((it, j) => (
                      <li key={it} className="flex gap-4 border-b border-ink/10 py-3.5 text-[17px] leading-relaxed"><span className="mt-1 font-label text-[11px] text-pine">{String(j + 1).padStart(2, "0")}</span>{it}</li>
                    ))}
                  </ul>
                </Reveal>
              );
            return (
              <figure key={i} className="my-14 lg:-mx-24">
                <ImageReveal className="relative aspect-[4/3] overflow-hidden bg-shell"><Image src={b.src} alt={b.alt} fill sizes="(min-width: 1024px) 54rem, 100vw" className="object-cover" /></ImageReveal>
                {b.caption && <figcaption className="mt-3 font-label text-[11px] uppercase tracking-[0.14em] text-mute">{b.caption}</figcaption>}
              </figure>
            );
          })}
          <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-y border-ink/10 py-4">
            <p className="text-[15px] text-mute">Written by <span className="font-medium text-ink">{post.author}</span></p>
            <ShareButton title={post.title} className="px-5 text-[15px] font-medium text-ink ring-1 ring-inset ring-ink/20 transition-colors hover:bg-ink hover:text-white" />
          </div>
        </div>
      </div>

      <section className="bg-shell py-16 sm:py-20">
        <div className={container}>
          <Heading eyebrow="Keep reading" title="More from the journal" />
          <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => <PostCard key={p.slug} post={p} base={site.base} />)}
          </div>
        </div>
      </section>
      <CtaBand />
    </article>
  );
}
