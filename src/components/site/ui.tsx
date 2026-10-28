import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { ImageReveal, Reveal, SplitText } from "@/components/motion/primitives";

export const container = "mx-auto w-full max-w-[1280px] px-5 sm:px-8";

type ButtonProps = { href: string; children: ReactNode; variant?: "pine" | "light" | "outline" | "outline-light"; className?: string };

const styles = {
  pine: "bg-pine text-white hover:bg-forest",
  light: "bg-white text-forest hover:bg-sand-light",
  outline: "text-ink ring-1 ring-inset ring-ink/20 hover:bg-ink hover:text-white hover:ring-ink",
  "outline-light": "text-white ring-1 ring-inset ring-white/40 hover:bg-white hover:text-forest",
};

/** Soft pill button; the arrow nudges forward on hover. */
export function Button({ href, children, variant = "pine", className }: ButtonProps) {
  return (
    <Link
      href={href}
      className={`group inline-flex min-h-12 shrink-0 items-center justify-center gap-2.5 whitespace-nowrap rounded-full px-6 font-sans text-[15px] tracking-[0.01em] transition-colors duration-300 ${styles[variant]} ${className ?? ""}`}
    >
      {children}
      <ArrowRight aria-hidden size={16} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}

export function TextLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link href={href} className={`group inline-flex min-h-11 items-center gap-2 font-sans text-[15px] text-pine ${className ?? ""}`}>
      <span className="relative">
        {children}
        <span aria-hidden className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-500 ease-luxe group-hover:scale-x-100" />
      </span>
      <ArrowRight aria-hidden size={15} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}

/** Small uppercase label with a short sand rule. */
export function Eyebrow({ children, index, className }: { children: ReactNode; index?: string; className?: string }) {
  return (
    <p className={`inline-flex items-center gap-3 font-label text-[12px] uppercase tracking-[0.22em] text-pine ${className ?? ""}`}>
      <span aria-hidden className="h-px w-8 bg-sand" />
      {index && <span>{index}</span>}
      {children}
    </p>
  );
}

type HeadingProps = { eyebrow?: string; index?: string; title: string; accent?: string[]; intro?: string; align?: "left" | "center"; as?: "h1" | "h2"; className?: string; light?: boolean };

export function Heading({ eyebrow, index, title, accent, intro, align = "left", as: Tag = "h2", className, light }: HeadingProps) {
  const center = align === "center";
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-2xl ${className ?? ""}`}>
      {eyebrow && (
        <Reveal y={8}>
          <Eyebrow index={index} className={light ? "text-sand" : ""}>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <Tag className={`mt-4 font-display text-[clamp(2.2rem,3.8vw,3.4rem)] leading-[1.08] ${light ? "text-white" : "text-ink"}`}>
        <SplitText text={title} accentWords={accent} accentClassName={light ? "italic text-sand" : "italic text-pine"} stagger={0.04} />
      </Tag>
      {intro && (
        <Reveal delay={0.1}>
          <p className={`mt-4 font-sans text-[16px] font-light leading-relaxed ${center ? "mx-auto" : ""} max-w-xl ${light ? "text-white/75" : "text-mute"}`}>{intro}</p>
        </Reveal>
      )}
    </div>
  );
}

/** A small four-petal flower: the studio's graphic mark. */
export function Mark({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className={className}>
      {[0, 90, 180, 270].map((r) => (
        <ellipse key={r} cx="12" cy="6.5" rx="3" ry="5" transform={`rotate(${r} 12 12)`} />
      ))}
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Thin row of article/project metadata. */
export function MetaRow({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap items-center gap-x-6 gap-y-2 font-label text-[12px] uppercase tracking-[0.18em] text-mute ${className ?? ""}`}>
      {items.map((it, i) => <li key={it} className="flex items-center gap-6">{i > 0 && <span aria-hidden className="h-1 w-1 rounded-full bg-sand" />}{it}</li>)}
    </ul>
  );
}

/** Inner-page header: title and intro beside a photograph, all within one screen. */
export function PageHero({ eyebrow, title, accent, intro, image, imageAlt, children }: { eyebrow: string; title: string; accent?: string[]; intro: string; image: string; imageAlt: string; children?: ReactNode }) {
  return (
    <header className={`${container} pb-16 pt-28 sm:pb-20 sm:pt-32`}>
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-6">
          <Reveal y={8}>
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>
          <h1 className="mt-5 font-display text-[clamp(2.6rem,5vw,4.5rem)] leading-[1.04] text-ink">
            <SplitText text={title} immediate delay={0.1} accentWords={accent} accentClassName="italic text-pine" />
          </h1>
          <Reveal delay={0.35}>
            <p className="mt-6 max-w-lg font-sans text-[17px] font-light leading-relaxed text-mute">{intro}</p>
          </Reveal>
          {children && <Reveal delay={0.45} className="mt-8">{children}</Reveal>}
        </div>
        <ImageReveal className="relative aspect-[4/3] overflow-hidden bg-shell lg:col-span-6" immediate delay={0.2}>
          <Image src={image} alt={imageAlt} fill preload sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />
        </ImageReveal>
      </div>
    </header>
  );
}

export function Stars({ count }: { count: number }) {
  return (
    <span className="inline-flex gap-1 text-sand" role="img" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} aria-hidden width="14" height="14" viewBox="0 0 24 24" fill={i < count ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.4l-5.9 3.2 1.3-6.6L2.5 9.4l6.6-.8z" />
        </svg>
      ))}
    </span>
  );
}
