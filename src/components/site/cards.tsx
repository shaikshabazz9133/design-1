import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BedDouble, Building2, ChefHat, Hammer, Home, MessagesSquare, Sofa, type LucideIcon } from "lucide-react";
import { Counter } from "@/components/motion/primitives";
import { formatDate } from "@/lib/content/helpers";
import type { Post, Project, Service, Stat } from "@/lib/types";

/** Rounded project card: gentle zoom, a "view" disc that follows the corner on hover. */
export function ProjectCard({ project, base, aspect = "aspect-[4/3]", sizes = "(min-width: 1024px) 45vw, 100vw", eager }: { project: Project; base: string; aspect?: string; sizes?: string; eager?: boolean }) {
  return (
    <Link href={`${base}/projects/${project.slug}`} className="group block rounded-[2rem] bg-linen p-2.5 shadow-[0_20px_50px_-35px_rgba(43,46,41,0.5)] transition-all duration-500 ease-soft hover:-translate-y-1 hover:bg-sand hover:shadow-[0_35px_70px_-35px_rgba(43,46,41,0.55)]">
      <div className={`relative ${aspect} overflow-hidden rounded-[1.6rem] bg-sand`}>
        <Image src={project.hero} alt={project.heroAlt} fill sizes={sizes} loading={eager ? "eager" : undefined} className="object-cover transition-transform duration-[1.4s] ease-luxe group-hover:scale-[1.07]" />
        <span className="absolute left-4 top-4 rounded-full bg-snow/90 px-3 py-1 font-sans text-xs font-medium text-ink backdrop-blur">{project.category}</span>
        <span aria-hidden className="absolute bottom-4 right-4 grid h-12 w-12 scale-50 place-items-center rounded-full bg-snow text-ink opacity-0 transition-all duration-500 ease-luxe group-hover:scale-100 group-hover:opacity-100">
          <ArrowUpRight size={18} />
        </span>
      </div>
      <div className="flex items-end justify-between gap-4 px-3 pb-2 pt-4">
        <div>
          <h3 className="font-display text-[1.45rem] font-normal tracking-[-0.02em] text-ink">{project.title}</h3>
          <p className="mt-0.5 font-sans text-sm text-mute">{project.location}</p>
        </div>
        <span className="font-sans text-sm text-mute">{project.year}</span>
      </div>
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
  return <Icon aria-hidden strokeWidth={1.6} className={className} />;
}

export function ServiceCard({ service, base }: { service: Service; base: string }) {
  return (
    <Link href={`${base}/services#${service.slug}`} className="group flex h-full flex-col rounded-[2rem] bg-snow p-7 ring-1 ring-ink/5 transition-all duration-500 ease-soft hover:-translate-y-1 hover:bg-linen hover:shadow-[0_30px_60px_-35px_rgba(43,46,41,0.45)]">
      <span className="grid h-14 w-14 place-items-center rounded-full bg-sage/35 text-sage-deep transition-all duration-500 group-hover:rotate-[-8deg] group-hover:bg-sage-deep group-hover:text-snow">
        <ServiceIcon slug={service.slug} className="h-6 w-6" />
      </span>
      <h3 className="mt-6 font-display text-[1.4rem] font-normal tracking-[-0.02em]">{service.title}</h3>
      <p className="mt-2 font-sans text-[15px] leading-relaxed text-mute">{service.short}</p>
      <span className="mt-auto inline-flex items-center gap-1.5 pt-6 font-sans text-sm font-medium text-sage-deep">
        Learn more <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
      </span>
    </Link>
  );
}

export function PostCard({ post, base, eager }: { post: Post; base: string; eager?: boolean }) {
  return (
    <Link href={`${base}/journal/${post.slug}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-sand">
        <Image src={post.image} alt={post.imageAlt} fill loading={eager ? "eager" : undefined} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-[1.4s] ease-luxe group-hover:scale-105" />
      </div>
      <div className="mt-5 flex items-center gap-3 font-sans text-sm text-mute">
        <span className="rounded-full bg-sage/30 px-2.5 py-0.5 font-medium text-sage-deep">{post.category}</span>
        <time dateTime={post.date}>{formatDate(post.date)}</time>
      </div>
      <h3 className="mt-3 font-display text-[1.4rem] font-normal leading-snug tracking-[-0.02em] text-ink transition-colors group-hover:text-sage-deep">{post.title}</h3>
      <p className="mt-2 font-sans text-[15px] leading-relaxed text-mute">{post.excerpt}</p>
    </Link>
  );
}

export function StatChips({ stats }: { stats: Stat[] }) {
  return (
    <dl className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {stats.map((s, i) => (
        <div key={s.label} className={`rounded-[1.75rem] p-6 sm:p-7 ${["bg-sage/35", "bg-sand", "bg-linen", "bg-oak/25"][i % 4]}`}>
          <dt className="font-sans text-sm text-mute">{s.label}</dt>
          <dd className="mt-3 font-display text-[clamp(2.4rem,5vw,3.6rem)] font-light leading-none tracking-[-0.025em] text-ink">
            <Counter value={s.value} suffix={s.suffix} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
