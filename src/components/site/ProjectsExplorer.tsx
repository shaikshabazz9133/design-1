"use client";

import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useState } from "react";
import { EASE_OUT } from "@/components/motion/primitives";
import type { Project } from "@/lib/types";
import { ProjectCard } from "./cards";

/** Text-tab filter with a sliding underline, over a staggered two-column grid. */
export function ProjectsExplorer({ projects, categories, base }: { projects: Project[]; categories: string[]; base: string }) {
  const [filter, setFilter] = useState("All");
  const shown = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      <div className="flex flex-col gap-4 border-y border-ink/10 sm:flex-row sm:items-center sm:justify-between">
        <LayoutGroup id="filter">
          <div role="group" aria-label="Filter projects" className="-mx-5 flex gap-6 overflow-x-auto px-5 sm:mx-0 sm:px-0">
            {["All", ...categories].map((c) => {
              const active = c === filter;
              const count = c === "All" ? projects.length : projects.filter((p) => p.category === c).length;
              return (
                <button key={c} type="button" aria-pressed={active} onClick={() => setFilter(c)} className={`relative flex min-h-14 shrink-0 items-center gap-1.5 whitespace-nowrap font-sans text-[15px] transition-colors ${active ? "text-ink" : "text-mute hover:text-ink"}`}>
                  {c}
                  <sup className="font-label text-[10px] text-mute">{count}</sup>
                  {active && <motion.span layoutId="filter-line" className="absolute inset-x-0 -bottom-px h-0.5 bg-pine" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                </button>
              );
            })}
          </div>
        </LayoutGroup>
        <p className="pb-4 font-label text-[11px] uppercase tracking-[0.16em] text-mute sm:pb-0" aria-live="polite">Showing {String(shown.length).padStart(2, "0")}</p>
      </div>

      {shown.length === 0 ? (
        <p className="py-24 text-center font-display text-3xl text-mute">No projects here yet — check back soon.</p>
      ) : (
        <motion.ul layout className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.map((p, i) => (
              <motion.li
                key={p.slug}
                layout
                
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.25 } }}
                transition={{ duration: 0.8, delay: i * 0.06, ease: EASE_OUT }}
              >
                <ProjectCard project={p} base={base} index={projects.indexOf(p)} eager={i < 2} aspect="aspect-[4/5]" sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </>
  );
}
