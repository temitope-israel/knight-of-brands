"use client";

import { useState, useMemo, MouseEvent } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { workProjects } from "@/lib/site-config";
import ProjectModal from "@/components/work/ProjectModal";

type Project = (typeof workProjects)[number];

function getProjectImage(project: Project): string | null {
  return "image" in project && typeof project.image === "string"
    ? project.image
    : null;
}

function getProjectSummary(project: Project): string | null {
  return "summary" in project && typeof project.summary === "string"
    ? project.summary
    : null;
}

/* -------------------------------------------------------------------------- */
/* Subcomponent: Glass Segmented Filter Control                              */
/* -------------------------------------------------------------------------- */
interface SegmentedFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

function SegmentedFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: SegmentedFilterProps) {
  return (
    <div
      role="tablist"
      aria-label="Work Filter"
      className="border-stone-light/20 bg-ink/20 mx-auto inline-flex flex-wrap items-center gap-4 rounded-2xl border p-1.5 backdrop-blur-xl"
    >
      {categories.map((category) => {
        const isActive = selectedCategory === category;
        return (
          <button
            key={category}
            role="tab"
            aria-selected={isActive}
            type="button"
            onClick={() => onSelectCategory(category)}
            className={`font-body focus-visible:outline-crimson-bright relative rounded-xl px-4 py-2 text-xs font-semibold tracking-wide transition-colors duration-200 focus-visible:outline-2 ${
              isActive ? "text-parchment" : "text-stone hover:text-parchment/90"
            }`}
          >
            <span className="relative z-10">{category}</span>
            {isActive && (
              <motion.div
                layoutId="segmentedTabBg"
                className="bg-stone-light/20 border-parchment/10 absolute inset-0 z-0 rounded-xl border shadow-inner backdrop-blur-md"
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Subcomponent: Bento Card with Interactive Mouse Spotlight                 */
/* -------------------------------------------------------------------------- */
interface BentoCardProps {
  project: Project;
  index: number;
  isFeatured: boolean;
  onSelect: (project: Project) => void;
}

function BentoCard({ project, index, isFeatured, onSelect }: BentoCardProps) {
  const imageUrl = getProjectImage(project);
  const summary = getProjectSummary(project);
  const projectNumber = (index + 1).toString().padStart(2, "0");

  // Mouse spotlight positioning
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className={`group border-stone-light/20 bg-ink hover:border-crimson-bright/40 relative overflow-hidden rounded-3xl border p-7 text-left transition-all duration-500 ${
        isFeatured ? "md:col-span-2" : "col-span-1"
      }`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        type="button"
        onClick={() => onSelect(project)}
        className="focus-visible:outline-crimson-bright absolute inset-0 z-30 h-full w-full text-left focus-visible:outline-2 focus-visible:outline-offset-4"
        aria-label={`Open project ${project.title}`}
      />

      {/* Interactive Cursor Glow Layer */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px z-10 transition-opacity duration-300"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(220, 38, 38, 0.15), transparent 80%)`,
          }}
        />
      )}

      {/* Background Image / Ambient Background */}
      {imageUrl ? (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src={imageUrl}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover  transition-all duration-700 group-hover:scale-105 group-hover:opacity-30"
          />
          <div className="from-ink via-ink/80 absolute inset-0 bg-gradient-to-t to-transparent" />
        </div>
      ) : (
        <div className="from-stone-light/5 via-ink to-ink absolute inset-0 z-0 bg-gradient-to-br" />
      )}

      {/* Bento Layout Structure */}
      <div className="relative z-20 flex h-full min-h-[280px] flex-col justify-between">
        {/* Header Badges */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="bg-stone-light/10 text-stone-light border-parchment/10 font-body rounded-lg border px-3 py-1 text-[10px] font-extrabold tracking-widest uppercase backdrop-blur-md">
              {project.category}
            </span>
            {isFeatured && (
              <span className="bg-crimson-bright/20 text-crimson-bright border-crimson-light/70 font-body rounded-lg border px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase backdrop-blur-md">
                Featured
              </span>
            )}
          </div>
          <span className="text-parchment/40 font-mono text-xs tracking-wider">
            [{projectNumber}]
          </span>
        </div>

        {/* Content Details */}
        <div className="mt-auto pt-8">
          <h3
            className={`font-display text-parchment group-hover:text-ember font-normal tracking-tight transition-colors duration-300 ${
              isFeatured ? "text-2xl md:text-4xl" : "text-xl md:text-2xl"
            }`}
          >
            {project.title}
          </h3>

          {summary && (
            <p
              className={`font-body text-parchment/70 group-hover:text-parchment/90 mt-2.5 line-clamp-2 text-xs leading-relaxed transition-colors duration-300 ${
                isFeatured ? "max-w-xl md:text-sm" : ""
              }`}
            >
              {summary}
            </p>
          )}

          {/* Bottom Action Footer */}
          <div className="border-parchment/10 mt-6 flex items-center justify-between border-t pt-4">
            <span className="text-parchment/70 group-hover:text-parchment font-body text-[11px] font-bold tracking-widest uppercase transition-colors">
              Explore Project
            </span>
            <div className="border-parchment/20 bg-parchment/5 group-hover:bg-crimson-bright group-hover:border-crimson-bright group-hover:text-parchment text-parchment/70 flex h-8 w-8 items-center justify-center rounded-xl border transition-all duration-300 group-hover:rotate-45">
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 17L17 7M17 7H7M17 7V17"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* Main WorkGrid Component                                                    */
/* -------------------------------------------------------------------------- */
export default function WorkGrid() {
  const prefersReducedMotion = useReducedMotion();
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = useMemo(() => {
    const cats = Array.from(new Set(workProjects.map((p) => p.category)));
    return ["All", ...cats];
  }, []);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "All") return workProjects;
    return workProjects.filter(
      (project) => project.category === selectedCategory
    );
  }, [selectedCategory]);

  return (
    <div className="space-y-24">
      {/* Segmented Glass Navigation */}
      <div className="flex justify-start">
        <SegmentedFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>

      {/* Dynamic Bento Grid */}
      <motion.div
        layout
        initial={prefersReducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid gap-y-10 sm:grid-cols-2 md:gap-x-6 md:gap-y-20 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => {
            // Make the first item featured when in "All" view or if only 1 item in filter
            const isFeatured =
              idx === 0 &&
              (selectedCategory === "All" || filteredProjects.length === 1);

            return (
              <BentoCard
                key={project.slug}
                project={project}
                index={idx}
                isFeatured={isFeatured}
                onSelect={setActiveProject}
              />
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="border-stone-light/20 bg-ink/40 rounded-3xl border p-12 text-center backdrop-blur-md">
          <p className="font-display text-parchment text-lg font-light">
            No projects found in this category.
          </p>
          <button
            type="button"
            onClick={() => setSelectedCategory("All")}
            className="text-crimson-bright hover:text-parchment font-body focus-visible:outline-crimson-bright mt-4 text-xs font-bold tracking-widest uppercase transition-colors"
          >
            Reset Filters &rarr;
          </button>
        </div>
      )}

      {/* Detail Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </div>
  );
}


