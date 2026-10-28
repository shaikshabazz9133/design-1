import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft } from "lucide-react";
import { PostCard } from "@/components/site/cards";
import { CtaBand } from "@/components/site/sections";
import { container, Eyebrow, Heading, Leaf } from "@/components/site/ui";
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
      <div className="mx-auto max-w-3xl space-y-5">
        <div className="h-6 w-28 rounded-full bg-sand" />
        <div className="h-20 rounded-2xl bg-linen" />
      </div>
      <div className="mt-12 aspect-[21/9] rounded-[2.5rem] bg-linen" />
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

  return (
    <article>
      <header className={`${container} pb-12 pt-28 sm:pt-36`}>
        <Link href={`${site.base}/journal`} className="group inline-flex min-h-11 items-center gap-2 font-sans text-[15px] text-mute hover:text-ink">
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" aria-hidden /> Journal
        </Link>
        <div className="mx-auto mt-8 max-w-3xl text-center">
          <Reveal y={10}><Eyebrow>{post.category}</Eyebrow></Reveal>
          <h1 className="mt-6 font-display text-[clamp(2.3rem,5.5vw,4.4rem)] font-light leading-[1.06] tracking-[-0.02em]">
            <SplitText text={post.title} immediate delay={0.15} stagger={0.04} />
          </h1>
          <Reveal delay={0.4}>
            <p className="mt-6 font-sans text-[15px] text-mute">
              {post.author} · <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readTime}
            </p>
          </Reveal>
        </div>
      </header>

      <div className={container}>
        <ImageReveal className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem] bg-sand sm:aspect-[21/9]" immediate delay={0.2}>
          <Image src={post.image} alt={post.imageAlt} fill preload sizes="(min-width: 1320px) 1260px, 100vw" className="object-cover" />
        </ImageReveal>
      </div>

      <div className={`${container} py-16 sm:py-24`}>
        <div className="mx-auto max-w-2xl font-sans">
          <Reveal>
            <p className="mb-10 font-display text-[1.5rem] font-light leading-snug text-ink">{post.excerpt}</p>
          </Reveal>
          {post.body.map((b, i) => {
            if (b.type === "p") return <Reveal key={i} y={14}><p className="mb-6 text-[18px] leading-[1.8] text-ink/80">{b.text}</p></Reveal>;
            if (b.type === "h2") return <Reveal key={i} y={14}><h2 className="mb-4 mt-12 flex items-center gap-3 font-display text-[1.75rem] font-normal tracking-[-0.02em]"><Leaf className="h-5 w-5 text-sage-deep" />{b.text}</h2></Reveal>;
            if (b.type === "quote")
              return (
                <Reveal key={i}>
                  <figure className="my-12 rounded-[2rem] bg-sage/30 p-8 sm:p-10">
                    <blockquote className="font-display text-[clamp(1.4rem,2.6vw,1.9rem)] font-light leading-snug">“{b.text}”</blockquote>
                    {b.cite && <figcaption className="mt-4 text-sm text-sage-deep">— {b.cite}</figcaption>}
                  </figure>
                </Reveal>
              );
            if (b.type === "list")
              return (
                <Reveal key={i} y={14}>
                  <ul className="mb-8 space-y-2.5 rounded-[1.75rem] bg-linen p-6">
                    {b.items.map((it) => (
                      <li key={it} className="flex gap-3 text-[17px] leading-relaxed"><span aria-hidden className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-sage-deep" />{it}</li>
                    ))}
                  </ul>
                </Reveal>
              );
            return (
              <figure key={i} className="my-10">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem]"><Image src={b.src} alt={b.alt} fill sizes="42rem" className="object-cover" /></div>
                {b.caption && <figcaption className="mt-3 text-sm text-mute">{b.caption}</figcaption>}
              </figure>
            );
          })}
          <div className="mt-14 flex flex-wrap items-center justify-between gap-4 rounded-[1.75rem] bg-linen p-4 pl-6">
            <p className="text-[15px] text-mute">Written by <span className="font-medium text-ink">{post.author}</span></p>
            <ShareButton title={post.title} className="rounded-full bg-snow px-5 text-[15px] font-medium text-ink shadow-sm hover:bg-sand" />
          </div>
        </div>
      </div>

      <section className="bg-linen py-20 sm:py-28">
        <div className={container}>
          <Heading eyebrow="Keep reading" title="More from the journal" />
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => <PostCard key={p.slug} post={p} base={site.base} />)}
          </div>
        </div>
      </section>
      <CtaBand />
    </article>
  );
}
