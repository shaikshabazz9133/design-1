import Link from "next/link";
import { LetterReveal } from "@/components/motion/extras";
import { site } from "@/lib/content/site";
import { Button, container, FloatingLeaf, Leaf } from "./ui";

const { brand, base } = site;

const groups = [
  { title: "Studio", links: [["About", "/about"], ["Process", "/process"], ["Stories", "/testimonials"], ["Journal", "/journal"]] },
  { title: "Services", links: site.services.slice(0, 5).map((s) => [s.title, `/services#${s.slug}`]) },
];

export function Footer() {
  return (
    <footer className="relative mt-10 overflow-hidden rounded-t-[2.5rem] bg-sand text-ink sm:rounded-t-[3.5rem]">
      <FloatingLeaf className="absolute -right-6 -top-6 h-48 w-36 rotate-[25deg] text-sage/50" slow />
      <div className={`${container} relative pt-16 sm:pt-24`}>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-2" aria-label="Linnea Studio — home">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-sage/60 text-sage-deep"><Leaf className="h-5 w-5" /></span>
              <span className="font-display text-3xl italic">linnea<span className="text-sage-deep">.</span></span>
            </Link>
            <p className="mt-6 max-w-sm font-display text-[1.75rem] font-light leading-snug tracking-[-0.02em]">Calm, natural interiors for everyday life.</p>
            <Button href={`${base}/contact`} className="mt-8">Book a home visit</Button>
          </div>
          {groups.map((g) => (
            <nav key={g.title} aria-label={g.title} className="lg:col-span-2">
              <p className="font-sans text-sm font-semibold text-sage-deep">{g.title}</p>
              <ul className="mt-4 space-y-1">
                {g.links.map(([label, href]) => (
                  <li key={href}>
                    <Link href={`${base}${href}`} className="inline-flex min-h-9 items-center font-sans text-[15px] text-ink/80 transition-colors hover:text-sage-deep">{label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div className="lg:col-span-3">
            <p className="font-sans text-sm font-semibold text-sage-deep">Visit us</p>
            <address className="mt-4 font-sans text-[15px] not-italic leading-7 text-ink/80">
              {brand.address.map((l) => <span key={l} className="block">{l}</span>)}
              <a href={`mailto:${brand.email}`} className="mt-3 block break-all hover:text-sage-deep">{brand.email}</a>
              <a href={`tel:${brand.phoneHref}`} className="block hover:text-sage-deep">{brand.phone}</a>
            </address>
          </div>
        </div>
        <p aria-hidden className="mt-16 select-none overflow-hidden text-center font-display text-[clamp(4rem,18vw,15rem)] font-light italic leading-[0.9] tracking-[-0.02em] text-sage-deep/15">
          <LetterReveal text="linnea." className="justify-center" />
        </p>
        <div className="flex flex-col gap-4 border-t border-ink/10 py-8 font-sans text-sm text-mute sm:flex-row sm:items-center sm:justify-between">
          <p>© {brand.founded}–2026 Linnea Studio ApS · Demonstration concept.</p>
          <ul className="flex gap-5">
            {brand.socials.map((s) => (
              <li key={s.label}><a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-ink">{s.label}</a></li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
