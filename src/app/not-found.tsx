import { Button, container } from "@/components/site/ui";

export default function NotFound() {
  return (
    <section className={`${container} flex min-h-[80vh] flex-col justify-center pb-16 pt-32`}>
      <p className="font-label text-[11px] uppercase tracking-[0.18em] text-pine">Error 404 — page not found</p>
      <p aria-hidden className="mt-4 font-display text-[clamp(6rem,18vw,13rem)] italic leading-none text-pine text-ink">404</p>
      <div className="mt-10 grid gap-8 border-t border-ink/10 pt-8 lg:grid-cols-12">
        <h1 className="font-display text-[clamp(2rem,4vw,3.4rem)] leading-[1] lg:col-span-6">This room hasn&apos;t been designed yet.</h1>
        <div className="lg:col-span-5 lg:col-start-8">
          <p className="max-w-md font-sans text-lg text-mute">The page you&apos;re looking for has moved or doesn&apos;t exist. Let&apos;s find you somewhere calm.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/">Back home</Button>
            <Button href="/projects" variant="outline">View projects</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
