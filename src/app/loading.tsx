import { Mark } from "@/components/site/ui";

export default function Loading() {
  return (
    <div role="status" aria-live="polite" className="grid min-h-[70vh] place-items-center pt-24">
      <div className="flex flex-col items-center gap-5">
        <Mark className="h-8 w-8 animate-spin-slow text-pine" />
        <span className="font-label text-[11px] uppercase tracking-[0.18em] text-mute">Loading</span>
      </div>
    </div>
  );
}
