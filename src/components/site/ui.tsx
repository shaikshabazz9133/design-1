import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { ImageReveal, Reveal, SplitText } from "@/components/motion/primitives";

export const container = "mx-auto w-full max-w-[1320px] px-5 sm:px-8";

type ButtonProps = { href: string; children: ReactNode; variant?: "sage" | "light" | "ghost" | "oak"; className?: string };

const styles = {
  sage: "bg-sage-deep text-snow hover:bg-ink",
  oak: "bg-oak-deep text-snow hover:bg-ink",
  light: "bg-snow text-ink hover:bg-sand",
  ghost: "bg-transparent text-ink ring-1 ring-ink/20 hover:bg-ink hover:text-snow hover:ring-ink",
};

/** Soft rounded button; the arrow nudges forward on hover. */
export function Button({ href, children, variant = "sage", className }: ButtonProps) {
  return (
    <Link
      href={href}
      className={`group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-6 font-sans text-[15px] font-medium shadow-[0_8px_24px_-14px_rgba(43,46,41,0.45)] transition-all duration-300 ease-soft hover:-translate-y-0.5 ${styles[variant]} ${className ?? ""}`}
    >
      {children}
      <ArrowRight aria-hidden size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}

export function TextLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link href={href} className={`group inline-flex min-h-11 items-center gap-2 font-sans text-[15px] font-medium text-sage-deep ${className ?? ""}`}>
      <span className="relative">
        {children}
        <span aria-hidden className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-500 ease-luxe group-hover:scale-x-100" />
      </span>
      <ArrowRight aria-hidden size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={`inline-flex items-center gap-2.5 rounded-full bg-sage/30 px-3.5 py-1.5 font-sans text-[13px] font-medium text-sage-deep ${className ?? ""}`}>
      <Leaf className="h-3.5 w-3.5" />
      {children}
    </p>
  );
}

type HeadingProps = { eyebrow?: string; title: string; accent?: string[]; intro?: string; align?: "left" | "center"; as?: "h1" | "h2"; className?: string; light?: boolean };

export function Heading({ eyebrow, title, accent, intro, align = "left", as: Tag = "h2", className, light }: HeadingProps) {
  const center = align === "center";
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-2xl ${className ?? ""}`}>
      {eyebrow && (
        <Reveal y={10}>
          <Eyebrow className={light ? "bg-snow/15 text-snow" : ""}>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <Tag className={`mt-5 font-display text-[clamp(2.1rem,4.6vw,3.6rem)] font-light leading-[1.08] tracking-[-0.025em] ${light ? "text-snow" : "text-ink"}`}>
        <SplitText text={title} accentWords={accent} accentClassName={light ? "italic text-sage" : "italic text-sage-deep"} stagger={0.05} />
      </Tag>
      {intro && (
        <Reveal delay={0.15}>
          <p className={`mt-5 font-sans text-[17px] leading-relaxed ${center ? "mx-auto" : ""} max-w-xl ${light ? "text-snow/80" : "text-mute"}`}>{intro}</p>
        </Reveal>
      )}
    </div>
  );
}

export function Leaf({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 20c0-9 6-15 16-16-1 10-7 16-16 16Z" />
      <path d="M4 20 13 11" />
    </svg>
  );
}

/** Large decorative leaf silhouette that drifts gently. */
export function FloatingLeaf({ className, slow }: { className?: string; slow?: boolean }) {
  return (
    <svg aria-hidden viewBox="0 0 120 160" className={`${slow ? "animate-float-slow" : "animate-float"} ${className ?? ""}`}>
      <path d="M60 4C96 30 112 70 100 108c-9 28-26 44-40 48-14-4-31-20-40-48C8 70 24 30 60 4Z" fill="currentColor" />
      <path d="M60 18v138M60 60l-22-16M60 84l26-20M60 108l-24-16M60 130l20-14" stroke="rgba(255,255,255,0.45)" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/** Inner-page header: calm intro beside a large rounded photograph. */
export function PageHero({ eyebrow, title, accent, intro, image, imageAlt, children }: { eyebrow: string; title: string; accent?: string[]; intro: string; image: string; imageAlt: string; children?: ReactNode }) {
  return (
    <header className={`${container} relative pb-16 pt-32 sm:pb-24 sm:pt-40`}>
      <FloatingLeaf className="absolute -left-6 top-28 hidden h-28 w-20 -rotate-12 text-sage/40 lg:block" slow />
      <div className="grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Reveal y={10}>
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>
          <h1 className="mt-6 font-display text-[clamp(2.6rem,6.2vw,5.25rem)] font-light leading-[1.02] tracking-[-0.02em] text-ink">
            <SplitText text={title} immediate delay={0.2} accentWords={accent} accentClassName="italic text-sage-deep" />
          </h1>
          <Reveal delay={0.45}>
            <p className="mt-6 max-w-lg font-sans text-lg leading-relaxed text-mute">{intro}</p>
          </Reveal>
          {children && <Reveal delay={0.6} className="mt-8">{children}</Reveal>}
        </div>
        <div className="relative lg:col-span-6">
          <ImageReveal className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem] bg-sand shadow-[0_40px_80px_-50px_rgba(43,46,41,0.6)] lg:aspect-[5/4]" immediate delay={0.2} direction="up">
            <Image src={image} alt={imageAlt} fill preload sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </ImageReveal>
          <span aria-hidden className="animate-float absolute -bottom-6 -left-4 h-20 w-20 rounded-full bg-oak/70 sm:h-24 sm:w-24" />
        </div>
      </div>
    </header>
  );
}

export function Stars({ count }: { count: number }) {
  return (
    <span className="inline-flex gap-0.5 text-oak" role="img" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} aria-hidden width="15" height="15" viewBox="0 0 24 24" fill={i < count ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.4l-5.9 3.2 1.3-6.6L2.5 9.4l6.6-.8z" />
        </svg>
      ))}
    </span>
  );
}
