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
      className="border-stone-light/20 mx-auto  bg-ink/20 inline-flex flex-wrap items-center gap-4 rounded-2xl border p-1.5 backdrop-blur-xl"
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
            className="object-cover opacity-35 transition-all duration-700 group-hover:scale-105 group-hover:opacity-30"
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
    <div className="space-y-8">
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
        className="grid gap-y-10 sm:grid-cols-2 md:gap-y-20 md:gap-x-6 lg:grid-cols-3"
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

// "use client";

// import { useState, useMemo } from "react";
// import Image from "next/image";
// import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
// import { workProjects } from "@/lib/site-config";
// import ProjectModal from "@/components/work/ProjectModal";

// type Project = (typeof workProjects)[number];

// // Type Guards for safe property access
// function getProjectImage(project: Project): string | null {
//   return "image" in project && typeof project.image === "string"
//     ? project.image
//     : null;
// }

// function getProjectSummary(project: Project): string | null {
//   return "summary" in project && typeof project.summary === "string"
//     ? project.summary
//     : null;
// }

// /* -------------------------------------------------------------------------- */
// /* Subcomponent: Editorial Filter Bar with Counts                             */
// /* -------------------------------------------------------------------------- */
// interface FilterBarProps {
//   categories: { name: string; count: number }[];
//   selectedCategory: string;
//   onSelectCategory: (category: string) => void;
// }

// function FilterBar({
//   categories,
//   selectedCategory,
//   onSelectCategory,
// }: FilterBarProps) {
//   return (
//     <div
//       role="tablist"
//       aria-label="Filter portfolio projects"
//       className="flex flex-wrap items-center gap-2 pb-2"
//     >
//       {categories.map(({ name, count }) => {
//         const isActive = selectedCategory === name;
//         return (
//           <button
//             key={name}
//             role="tab"
//             aria-selected={isActive}
//             type="button"
//             onClick={() => onSelectCategory(name)}
//             className={`font-body focus-visible:outline-crimson-bright relative flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold tracking-wider uppercase transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 ${
//               isActive
//                 ? "text-parchment shadow-lg"
//                 : "bg-parchment-dim/40 text-stone hover:bg-parchment-dim/80 hover:text-ink border-stone-light/15 border"
//             }`}
//           >
//             <span className="relative z-10">{name}</span>
//             <span
//               className={`relative z-10 rounded-full px-1.5 py-0.5 font-mono text-[10px] transition-colors ${
//                 isActive
//                   ? "bg-parchment/20 text-parchment"
//                   : "bg-stone-light/20 text-stone group-hover:text-ink"
//               }`}
//             >
//               {count}
//             </span>

//             {isActive && (
//               <motion.div
//                 layoutId="activeFilterPill"
//                 className="bg-ink absolute inset-0 z-0 rounded-full shadow-md"
//                 transition={{ type: "spring", stiffness: 380, damping: 28 }}
//               />
//             )}
//           </button>
//         );
//       })}
//     </div>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* Subcomponent: Visual-First Project Card                                   */
// /* -------------------------------------------------------------------------- */
// interface VisualCardProps {
//   project: Project;
//   index: number;
//   onSelect: (project: Project) => void;
// }

// function VisualCard({ project, index, onSelect }: VisualCardProps) {
//   const imageUrl = getProjectImage(project);
//   const summary = getProjectSummary(project);
//   const projectNumber = (index + 1).toString().padStart(2, "0");

//   return (
//     <motion.div
//       layout
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, scale: 0.94 }}
//       transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
//       className="group border-stone-light/20 bg-ink hover:border-crimson-bright/40 relative flex h-[380px] w-full flex-col justify-end overflow-hidden rounded-3xl border p-6 text-left transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40"
//     >
//       <button
//         type="button"
//         onClick={() => onSelect(project)}
//         className="focus-visible:outline-crimson-bright absolute inset-0 z-20 h-full w-full rounded-3xl text-left focus-visible:outline-2 focus-visible:outline-offset-4"
//         aria-label={`View details for ${project.title}`}
//       />

//       {/* Image Container with Gradient Mask */}
//       {imageUrl ? (
//         <div className="absolute inset-0 z-0 overflow-hidden">
//           <Image
//             src={imageUrl}
//             alt={project.title}
//             fill
//             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//             className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
//           />
//           {/* Subtle gradient dark layer so text remains crisp */}
//           <div className="from-ink via-ink/65 to-ink/20 absolute inset-0 bg-gradient-to-t opacity-90 transition-opacity duration-500 group-hover:opacity-80" />
//         </div>
//       ) : (
//         <div className="from-ink via-stone/20 to-ink absolute inset-0 z-0 bg-gradient-to-br" />
//       )}

//       {/* Top Glassmorphism Badges */}
//       <div className="pointer-events-none relative z-10 mb-auto flex items-center justify-between">
//         <span className="bg-ink/60 text-ember border-parchment/10 font-body rounded-full border px-3 py-1 text-[10px] font-bold tracking-widest uppercase shadow-sm backdrop-blur-md">
//           {project.category}
//         </span>
//         <span className="bg-ink/60 text-parchment/60 border-parchment/10 rounded-full border px-2.5 py-0.5 font-mono text-xs backdrop-blur-md">
//           {projectNumber}
//         </span>
//       </div>

//       {/* Content Section */}
//       <div className="pointer-events-none relative z-10">
//         <h3 className="font-display text-parchment group-hover:text-ember text-2xl font-normal tracking-tight transition-colors duration-300 md:text-3xl">
//           {project.title}
//         </h3>

//         {summary && (
//           <p className="font-body text-parchment/70 group-hover:text-parchment/90 mt-2 line-clamp-2 text-xs leading-relaxed transition-opacity duration-300">
//             {summary}
//           </p>
//         )}

//         {/* Footer Link Button */}
//         <div className="text-parchment/80 group-hover:text-parchment mt-5 flex items-center gap-2 pt-2 text-xs font-bold tracking-wider uppercase transition-colors duration-300">
//           <span>Explore Case Study</span>
//           <div className="bg-parchment/10 group-hover:bg-crimson-bright group-hover:text-parchment flex h-7 w-7 items-center justify-center rounded-full transition-all duration-300 group-hover:translate-x-1">
//             <svg
//               className="h-3.5 w-3.5"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               strokeWidth={2.5}
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M14 5l7 7m0 0l-7 7m7-7H3"
//               />
//             </svg>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* Main WorkGrid Component                                                    */
// /* -------------------------------------------------------------------------- */
// export default function WorkGrid() {
//   const prefersReducedMotion = useReducedMotion();
//   const [activeProject, setActiveProject] = useState<Project | null>(null);
//   const [selectedCategory, setSelectedCategory] = useState<string>("All");

//   // Dynamically calculate category stats for counts
//   const categoriesWithCounts = useMemo(() => {
//     const counts: Record<string, number> = {};
//     workProjects.forEach((p) => {
//       counts[p.category] = (counts[p.category] || 0) + 1;
//     });

//     const list = Object.entries(counts).map(([name, count]) => ({
//       name,
//       count,
//     }));

//     return [{ name: "All", count: workProjects.length }, ...list];
//   }, []);

//   // Filter projects by category
//   const filteredProjects = useMemo(() => {
//     if (selectedCategory === "All") return workProjects;
//     return workProjects.filter(
//       (project) => project.category === selectedCategory
//     );
//   }, [selectedCategory]);

//   return (
//     <div className="space-y-10">
//       {/* Category Navigation Bar */}
//       <FilterBar
//         categories={categoriesWithCounts}
//         selectedCategory={selectedCategory}
//         onSelectCategory={setSelectedCategory}
//       />

//       {/* Projects Grid Display */}
//       <motion.div
//         layout
//         initial={prefersReducedMotion ? false : { opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
//       >
//         <AnimatePresence mode="popLayout">
//           {filteredProjects.map((project, idx) => (
//             <VisualCard
//               key={project.slug}
//               project={project}
//               index={idx}
//               onSelect={setActiveProject}
//             />
//           ))}
//         </AnimatePresence>
//       </motion.div>

//       {/* Empty State Fallback */}
//       {filteredProjects.length === 0 && (
//         <div className="border-stone-light/20 bg-parchment-dim/30 rounded-3xl border p-12 text-center backdrop-blur-sm">
//           <p className="font-display text-ink text-lg font-light">
//             No projects found in this category.
//           </p>
//           <button
//             type="button"
//             onClick={() => setSelectedCategory("All")}
//             className="text-crimson-bright hover:text-ink font-body focus-visible:outline-crimson-bright mt-4 rounded-full px-4 py-2 text-xs font-bold tracking-widest uppercase transition-colors focus-visible:outline-2"
//           >
//             Clear Filters &rarr;
//           </button>
//         </div>
//       )}

//       {/* Project Detail Modal */}
//       <ProjectModal
//         project={activeProject}
//         onClose={() => setActiveProject(null)}
//       />
//     </div>
//   );
// }

// "use client";

// import { useState, useMemo } from "react";
// import Image from "next/image";
// import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
// import { workProjects } from "@/lib/site-config";
// import ProjectModal from "@/components/work/ProjectModal";

// type Project = (typeof workProjects)[number];

// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.08,
//       delayChildren: 0.05,
//     },
//   },
// } as const;

// const cardVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.5,
//       ease: [0.16, 1, 0.3, 1],
//     },
//   },
//   exit: {
//     opacity: 0,
//     scale: 0.95,
//     transition: { duration: 0.2 },
//   },
// } as const;

// export default function WorkGrid() {
//   const prefersReducedMotion = useReducedMotion();
//   const [activeProject, setActiveProject] = useState<Project | null>(null);
//   const [selectedCategory, setSelectedCategory] = useState<string>("All");

//   // Dynamically extract categories from workProjects
//   const categories = useMemo(() => {
//     const cats = Array.from(
//       new Set(workProjects.map((project) => project.category))
//     );
//     return ["All", ...cats];
//   }, []);

//   // Filter projects by category
//   const filteredProjects = useMemo(() => {
//     if (selectedCategory === "All") return workProjects;
//     return workProjects.filter(
//       (project) => project.category === selectedCategory
//     );
//   }, [selectedCategory]);

//   return (
//     <div className="space-y-10">
//       {/* Category Filter Tabs */}
//       <div className="flex flex-wrap items-center gap-2 pb-2">
//         {categories.map((category) => {
//           const isActive = selectedCategory === category;
//           return (
//             <button
//               key={category}
//               type="button"
//               onClick={() => setSelectedCategory(category)}
//               className={`font-body focus-visible:outline-crimson-bright relative rounded-full px-4 py-2 text-xs font-bold tracking-wider uppercase transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 ${
//                 isActive
//                   ? "bg-ink text-parchment shadow-md"
//                   : "bg-parchment-dim/80 text-stone hover:bg-parchment-dim hover:text-ink border-stone-light/20 border"
//               }`}
//             >
//               <span className="relative z-10">{category}</span>
//               {isActive && (
//                 <motion.div
//                   layoutId="activeFilterBg"
//                   className="bg-ink absolute inset-0 z-0 rounded-full"
//                   transition={{ type: "spring", stiffness: 380, damping: 30 }}
//                 />
//               )}
//             </button>
//           );
//         })}
//       </div>

//       {/* Grid Display */}
//       <motion.div
//         layout
//         variants={containerVariants}
//         initial={prefersReducedMotion ? "visible" : "hidden"}
//         animate="visible"
//         className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
//       >
//         <AnimatePresence mode="popLayout">
//           {filteredProjects.map((project, idx) => {
//             const projectNumber = (idx + 1).toString().padStart(2, "0");

//             return (
//               <motion.div
//                 key={project.slug}
//                 layout
//                 variants={cardVariants}
//                 initial="hidden"
//                 animate="visible"
//                 exit="exit"
//               >
//                 <button
//                   type="button"
//                   onClick={() => setActiveProject(project)}
//                   className="group border-stone-light/20 bg-ink text-parchment hover:border-crimson-bright/40 focus-visible:outline-crimson-bright relative flex aspect-[4/3] w-full flex-col justify-between overflow-hidden rounded-3xl border p-7 text-left transition-all duration-500 hover:shadow-2xl focus-visible:outline-2 focus-visible:outline-offset-4"
//                 >
//                   {/* Background Image Preview with Scale Effect */}
//                   {"image" in project &&
//                     (project as { image?: string }).image && (
//                       <div className="absolute inset-0 z-0 opacity-20 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:opacity-35">
//                         <Image
//                           src={(project as { image: string }).image}
//                           alt={project.title}
//                           fill
//                           className="object-cover"
//                         />
//                       </div>
//                     )}

//                   {/* Ambient Glow Effects */}
//                   <div className="bg-crimson-bright/15 pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full opacity-30 blur-2xl transition-opacity duration-500 group-hover:opacity-80" />

//                   {/* Top Badge */}
//                   <div className="relative z-10 flex items-center justify-between">
//                     <span className="bg-stone-light/20 text-ember font-body rounded-md px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase backdrop-blur-sm">
//                       {project.category}
//                     </span>
//                     <span className="text-parchment/50 font-body font-mono text-xs">
//                       {projectNumber}
//                     </span>
//                   </div>

//                   {/* Content */}
//                   <div className="relative z-10 mt-auto">
//                     <h3 className="font-display text-parchment group-hover:text-ember text-xl font-normal tracking-tight transition-colors duration-200 md:text-2xl">
//                       {project.title}
//                     </h3>
//                     {"summary" in project && (
//                       <p className="font-body text-parchment/70 mt-2 line-clamp-2 text-xs leading-relaxed">
//                         {project.summary}
//                       </p>
//                     )}
//                   </div>

//                   {/* Bottom Action Footer */}
//                   <div className="border-parchment/15 relative z-10 mt-5 flex items-center justify-between border-t pt-4">
//                     <span className="text-parchment/80 group-hover:text-parchment font-body text-xs font-bold tracking-wider uppercase transition-colors">
//                       View Work
//                     </span>
//                     <div className="bg-parchment/10 group-hover:bg-crimson-bright text-parchment flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110">
//                       <svg
//                         className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                         strokeWidth={2}
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           d="M14 5l7 7m0 0l-7 7m7-7H3"
//                         />
//                       </svg>
//                     </div>
//                   </div>
//                 </button>
//               </motion.div>
//             );
//           })}
//         </AnimatePresence>
//       </motion.div>

//       {/* Empty State Fallback */}
//       {filteredProjects.length === 0 && (
//         <div className="border-stone-light/20 bg-parchment-dim/30 rounded-3xl border p-12 text-center">
//           <p className="font-display text-ink text-lg font-light">
//             No projects found in this category.
//           </p>
//           <button
//             type="button"
//             onClick={() => setSelectedCategory("All")}
//             className="text-crimson-bright hover:text-ink font-body mt-4 text-xs font-bold tracking-widest uppercase transition-colors"
//           >
//             Clear Filters &rarr;
//           </button>
//         </div>
//       )}

//       {/* Detail Modal */}
//       <ProjectModal
//         project={activeProject}
//         onClose={() => setActiveProject(null)}
//       />
//     </div>
//   );
// }

// "use client";

// import { useState, useMemo } from "react";
// import Image from "next/image";
// import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
// import { workProjects } from "@/lib/site-config";
// import ProjectModal from "@/components/work/ProjectModal";

// type Project = (typeof workProjects)[number];

// /* Type Guards */
// function getProjectImage(project: Project): string | null {
//   return "image" in project && typeof project.image === "string"
//     ? project.image
//     : null;
// }

// function getProjectSummary(project: Project): string | null {
//   return "summary" in project && typeof project.summary === "string"
//     ? project.summary
//     : null;
// }

// /* -------------------------------------------------------------------------- */
// /* Subcomponent: Editorial Header & Category Control                         */
// /* -------------------------------------------------------------------------- */
// interface HeaderControlProps {
//   categories: string[];
//   selectedCategory: string;
//   totalCount: number;
//   filteredCount: number;
//   onSelectCategory: (category: string) => void;
// }

// function HeaderControl({
//   categories,
//   selectedCategory,
//   totalCount,
//   filteredCount,
//   onSelectCategory,
// }: HeaderControlProps) {
//   return (
//     <div className="border-stone-light/15 flex flex-col gap-6 border-b pb-6 lg:flex-row lg:items-end lg:justify-between">
//       {/* Title & Stats */}
//       <div>
//         <div className="flex items-center gap-3">
//           <span className="bg-crimson-bright h-2 w-2 animate-pulse rounded-full" />
//           <p className="text-parchment/60 font-mono text-xs font-semibold tracking-widest uppercase">
//             Selected Work
//           </p>
//         </div>
//         <h2 className="font-display text-parchment mt-1 text-2xl font-light tracking-tight sm:text-3xl">
//           Showing{" "}
//           <span className="text-ember font-medium">{filteredCount}</span> of{" "}
//           {totalCount} Projects
//         </h2>
//       </div>

//       {/* Pill Filter Navigation */}
//       <div
//         role="tablist"
//         aria-label="Filter projects"
//         className="flex flex-wrap items-center gap-1.5"
//       >
//         {categories.map((category) => {
//           const isActive = selectedCategory === category;
//           return (
//             <button
//               key={category}
//               role="tab"
//               aria-selected={isActive}
//               type="button"
//               onClick={() => onSelectCategory(category)}
//               className={`font-body focus-visible:outline-crimson-bright relative rounded-full px-4 py-2 text-xs font-bold tracking-wider uppercase transition-all duration-300 focus-visible:outline-2 ${
//                 isActive
//                   ? "text-parchment"
//                   : "text-stone hover:text-ink hover:bg-parchment-dim/60"
//               }`}
//             >
//               <span className="relative z-10">{category}</span>
//               {isActive && (
//                 <motion.div
//                   layoutId="editorialActiveBg"
//                   className="bg-ink absolute inset-0 z-0 rounded-full shadow-md"
//                   transition={{ type: "spring", stiffness: 400, damping: 30 }}
//                 />
//               )}
//             </button>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* Subcomponent: Luxury Showcase Card                                         */
// /* -------------------------------------------------------------------------- */
// interface ShowcaseCardProps {
//   project: Project;
//   index: number;
//   onSelect: (project: Project) => void;
// }

// function ShowcaseCard({ project, index, onSelect }: ShowcaseCardProps) {
//   const imageUrl = getProjectImage(project);
//   const summary = getProjectSummary(project);
//   const indexFormatted = (index + 1).toString().padStart(2, "0");

//   return (
//     <motion.div
//       layout
//       initial={{ opacity: 0, y: 30 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, scale: 0.95 }}
//       transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
//       className="group relative"
//     >
//       <button
//         type="button"
//         onClick={() => onSelect(project)}
//         className="focus-visible:outline-crimson-bright border-stone-light/20 bg-ink hover:border-crimson-bright/50 relative flex aspect-[16/11] w-full flex-col justify-between overflow-hidden rounded-3xl border p-7 text-left transition-all duration-500 hover:shadow-2xl hover:shadow-black/60 focus-visible:outline-2 focus-visible:outline-offset-4"
//       >
//         {/* Visual Media Layer with Smooth Zoom and Saturation Shift */}
//         {imageUrl ? (
//           <div className="absolute inset-0 z-0 overflow-hidden">
//             <Image
//               src={imageUrl}
//               alt={project.title}
//               fill
//               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//               className="object-cover opacity-25 grayscale transition-all duration-700 ease-out group-hover:scale-110 group-hover:opacity-45 group-hover:grayscale-0"
//             />
//             <div className="from-ink via-ink/75 absolute inset-0 bg-gradient-to-t to-transparent" />
//           </div>
//         ) : (
//           <div className="from-stone-light/10 via-ink to-ink absolute inset-0 z-0 bg-gradient-to-b" />
//         )}

//         {/* Top Meta Bar */}
//         <div className="relative z-10 flex items-center justify-between">
//           <span className="bg-stone-light/15 text-ember font-body rounded-full border border-white/10 px-3 py-1 text-[10px] font-bold tracking-widest uppercase backdrop-blur-md">
//             {project.category}
//           </span>
//           <span className="text-parchment/40 group-hover:text-parchment/80 font-mono text-xs font-light transition-colors duration-300">
//             /{indexFormatted}
//           </span>
//         </div>

//         {/* Content Section */}
//         <div className="relative z-10 mt-auto">
//           <h3 className="font-display text-parchment group-hover:text-ember text-2xl font-light tracking-tight transition-colors duration-300 sm:text-3xl">
//             {project.title}
//           </h3>

//           {summary && (
//             <p className="font-body text-parchment/70 group-hover:text-parchment/90 mt-2 line-clamp-2 text-xs leading-relaxed transition-colors duration-300">
//               {summary}
//             </p>
//           )}

//           {/* Bottom Action Indicator */}
//           <div className="border-parchment/15 mt-5 flex items-center justify-between border-t pt-4">
//             <span className="font-body text-parchment/70 group-hover:text-parchment text-[10px] font-bold tracking-widest uppercase transition-colors duration-300">
//               View Project
//             </span>
//             <div className="bg-parchment/10 group-hover:bg-crimson-bright group-hover:text-parchment flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110">
//               <svg
//                 className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth={2}
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M14 5l7 7m0 0l-7 7m7-7H3"
//                 />
//               </svg>
//             </div>
//           </div>
//         </div>
//       </button>
//     </motion.div>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* Main WorkGrid Component                                                    */
// /* -------------------------------------------------------------------------- */
// export default function WorkGrid() {
//   const prefersReducedMotion = useReducedMotion();
//   const [activeProject, setActiveProject] = useState<Project | null>(null);
//   const [selectedCategory, setSelectedCategory] = useState<string>("All");

//   /* Dynamic Categories Extraction */
//   const categories = useMemo(() => {
//     const cats = Array.from(new Set(workProjects.map((p) => p.category)));
//     return ["All", ...cats];
//   }, []);

//   /* Filtered List Calculation */
//   const filteredProjects = useMemo(() => {
//     if (selectedCategory === "All") return workProjects;
//     return workProjects.filter(
//       (project) => project.category === selectedCategory
//     );
//   }, [selectedCategory]);

//   return (
//     <div className="space-y-10">
//       {/* Top Header & Filter Navigation */}
//       <HeaderControl
//         categories={categories}
//         selectedCategory={selectedCategory}
//         totalCount={workProjects.length}
//         filteredCount={filteredProjects.length}
//         onSelectCategory={setSelectedCategory}
//       />

//       {/* Grid Display */}
//       <motion.div
//         layout
//         initial={prefersReducedMotion ? false : { opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
//       >
//         <AnimatePresence mode="popLayout">
//           {filteredProjects.map((project, idx) => (
//             <ShowcaseCard
//               key={project.slug}
//               project={project}
//               index={idx}
//               onSelect={setActiveProject}
//             />
//           ))}
//         </AnimatePresence>
//       </motion.div>

//       {/* Empty State Fallback */}
//       {filteredProjects.length === 0 && (
//         <div className="border-stone-light/20 bg-ink/50 rounded-3xl border p-12 text-center backdrop-blur-md">
//           <p className="font-display text-parchment text-lg font-light">
//             No projects found in this category.
//           </p>
//           <button
//             type="button"
//             onClick={() => setSelectedCategory("All")}
//             className="text-crimson-bright hover:text-parchment font-body focus-visible:outline-crimson-bright mt-4 rounded-full px-4 py-2 text-xs font-bold tracking-widest uppercase transition-colors"
//           >
//             Reset Category Filters &rarr;
//           </button>
//         </div>
//       )}

//       {/* Detailed Modal Component */}
//       <ProjectModal
//         project={activeProject}
//         onClose={() => setActiveProject(null)}
//       />
//     </div>
//   );
// }
