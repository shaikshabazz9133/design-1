"use client";

import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useState } from "react";
import { EASE_OUT } from "@/components/motion/primitives";
import type { Project } from "@/lib/types";
import { ProjectCard } from "./cards";

/** Segmented-control filter with a sliding thumb, over a clean two-column grid. */
export function ProjectsExplorer({ projects, categories, base }: { projects: Project[]; categories: string[]; base: string }) {
  const [filter, setFilter] = useState("All");
  const shown = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <LayoutGroup id="filter">
          <div role="group" aria-label="Filter projects" className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
            <div className="inline-flex gap-1 rounded-full bg-linen p-1.5">
              {["All", ...categories].map((c) => {
                const active = c === filter;
                return (
                  <button key={c} type="button" aria-pressed={active} onClick={() => setFilter(c)} className={`relative min-h-11 shrink-0 whitespace-nowrap rounded-full px-4 font-sans text-[15px] transition-colors ${active ? "text-ink" : "text-mute hover:text-ink"}`}>
                    {active && <motion.span layoutId="filter-thumb" className="absolute inset-0 rounded-full bg-snow shadow-[0_6px_18px_-10px_rgba(43,46,41,0.5)]" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                    <span className="relative">{c}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </LayoutGroup>
        <p className="font-sans text-sm text-mute" aria-live="polite">{shown.length} {shown.length === 1 ? "project" : "projects"}</p>
      </div>

      {shown.length === 0 ? (
        <p className="py-24 text-center font-display text-2xl font-light text-mute">No projects here yet — check back soon.</p>
      ) : (
        <motion.ul layout className="mt-10 grid gap-5 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {shown.map((p, i) => (
              <motion.li key={p.slug} layout initial={{ opacity: 0, y: 24, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.55, delay: i * 0.05, ease: EASE_OUT }}>
                <ProjectCard project={p} base={base} eager={i < 2} sizes="(min-width: 768px) 50vw, 100vw" />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </>
  );
}
