import { Leaf } from "@/components/site/ui";

export default function Loading() {
  return (
    <div role="status" aria-live="polite" className="grid min-h-[70vh] place-items-center pt-24">
      <div className="flex flex-col items-center gap-4 text-sage-deep">
        <Leaf className="h-8 w-8 animate-pulse" />
        <span className="font-sans text-sm text-mute">Letting the light in…</span>
      </div>
    </div>
  );
}
