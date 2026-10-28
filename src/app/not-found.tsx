import { Button, FloatingLeaf } from "@/components/site/ui";

export default function NotFound() {
  return (
    <section className="relative mx-auto flex min-h-[85vh] max-w-2xl flex-col items-center justify-center px-5 pt-28 text-center">
      <FloatingLeaf className="h-32 w-24 text-sage/70" />
      <p className="mt-6 font-display text-7xl font-light tracking-[-0.025em] text-oak-deep">404</p>
      <h1 className="mt-3 font-display text-3xl font-light tracking-[-0.02em] text-ink sm:text-4xl">This path leads back into the forest.</h1>
      <p className="mt-4 max-w-md font-sans text-lg text-mute">The page you&apos;re looking for has moved or doesn&apos;t exist. Let&apos;s find you somewhere calm.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href="/">Back home</Button>
        <Button href="/projects" variant="ghost">View projects</Button>
      </div>
    </section>
  );
}
