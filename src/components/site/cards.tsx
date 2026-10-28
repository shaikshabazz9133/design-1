import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BedDouble, Building2, ChefHat, Hammer, Home, MessagesSquare, Sofa, type LucideIcon } from "lucide-react";
import { Counter } from "@/components/motion/primitives";
import { formatDate } from "@/lib/content/helpers";
import type { Post, Project, Service, Stat } from "@/lib/types";

/** Project card: the photo slowly zooms, the title shifts to pine on hover. */
export function ProjectCard({ project, base, aspect = "aspect-[4/3]", sizes = "(min-width: 1024px) 45vw, 100vw", eager }: { project: Project; base: string; aspect?: string; sizes?: string; eager?: boolean; index?: number }) {
  return (
    <Link href={`${base}/projects/${project.slug}`} data-cursor="View" className="group block">
      <div className={`relative ${aspect} overflow-hidden bg-shell`}>
        <Image src={project.hero} alt={project.heroAlt} fill sizes={sizes} loading={eager ? "eager" : undefined} className="object-cover transition-transform duration-[1.4s] ease-luxe group-hover:scale-[1.04]" />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 font-label text-[11px] uppercase tracking-[0.16em] text-forest backdrop-blur">{project.category}</span>
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="font-display text-[1.7rem] font-normal leading-tight text-ink transition-colors duration-300 group-hover:text-pine">{project.title}</h3>
        <span className="font-label text-[12px] tracking-[0.14em] text-mute">{project.year}</span>
      </div>
      <p className="mt-1 font-sans text-sm font-light text-mute">{project.location}</p>
    </Link>
  );
}

const icons: Record<string, LucideIcon> = {
  "residential-interiors": Home,
  "commercial-interiors": Building2,
  "modular-kitchens": ChefHat,
  "bedroom-design": BedDouble,
  "living-room-design": Sofa,
  renovation: Hammer,
  consultation: MessagesSquare,
};

export function ServiceIcon({ slug, className }: { slug: string; className?: string }) {
  const Icon = icons[slug] ?? Home;
  return <Icon aria-hidden strokeWidth={1.25} className={className} />;
}

/** Service tile on a soft card; lifts and gains a sand edge on hover. */
export function ServiceCard({ service, base }: { service: Service; base: string; index?: number }) {
  return (
    <Link href={`${base}/services#${service.slug}`} className="group flex h-full flex-col bg-white p-7 transition-all duration-500 ease-luxe hover:-translate-y-1 hover:shadow-[0_24px_48px_-28px_rgba(28,58,49,0.35)]">
      <span className="grid h-12 w-12 place-items-center rounded-full bg-sand-light text-pine transition-colors duration-500 group-hover:bg-pine group-hover:text-white">
        <ServiceIcon slug={service.slug} className="h-5 w-5" />
      </span>
      <h3 className="mt-6 font-display text-[1.6rem] font-normal leading-tight">{service.title}</h3>
      <p className="mt-2 font-sans text-[15px] font-light leading-relaxed text-mute">{service.short}</p>
      <span className="mt-auto inline-flex items-center gap-1.5 pt-6 font-label text-[12px] uppercase tracking-[0.18em] text-pine">
        Learn more <ArrowUpRight size={14} strokeWidth={1.5} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
      </span>
    </Link>
  );
}

export function PostCard({ post, base, eager }: { post: Post; base: string; eager?: boolean }) {
  return (
    <Link href={`${base}/journal/${post.slug}`} data-cursor="Read" className="group block">
      <div className="relative aspect-[3/2] overflow-hidden bg-shell">
        <Image src={post.image} alt={post.imageAlt} fill loading={eager ? "eager" : undefined} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-[1.4s] ease-luxe group-hover:scale-[1.04]" />
      </div>
      <div className="mt-4 flex items-center gap-3 font-label text-[11px] uppercase tracking-[0.18em] text-mute">
        <span className="text-pine">{post.category}</span>
        <span aria-hidden className="h-1 w-1 rounded-full bg-sand" />
        <time dateTime={post.date}>{formatDate(post.date)}</time>
      </div>
      <h3 className="mt-2 font-display text-[1.6rem] font-normal leading-snug text-ink transition-colors duration-300 group-hover:text-pine">{post.title}</h3>
      <p className="mt-2 line-clamp-2 font-sans text-[15px] font-light leading-relaxed text-mute">{post.excerpt}</p>
    </Link>
  );
}

/** Compact figures, counting up on first view. */
export function StatChips({ stats, light }: { stats: Stat[]; light?: boolean }) {
  return (
    <dl className="grid grid-cols-2 gap-6 lg:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className={`flex flex-col-reverse gap-2 border-t pt-5 ${light ? "border-white/20" : "border-ink/10"}`}>
          <dt className={`font-sans text-sm font-light ${light ? "text-white/65" : "text-mute"}`}>{s.label}</dt>
          <dd className={`font-display text-[clamp(2.4rem,4vw,3.25rem)] leading-none ${light ? "text-white" : "text-pine"}`}>
            <Counter value={s.value} suffix={s.suffix} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
