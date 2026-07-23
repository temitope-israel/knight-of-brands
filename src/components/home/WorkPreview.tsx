"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { workProjects } from "@/lib/site-config";
import ProjectModal from "@/components/work/ProjectModal";

type Project = (typeof workProjects)[number];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
} as const;

export default function WorkPreview() {
  const prefersReducedMotion = useReducedMotion();
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const featured = workProjects[0];
  const sideProjects = workProjects.slice(1, 3);

  return (
    <section className="border-stone-light/20 bg-parchment text-ink border-y px-6 py-20 md:px-12 md:py-28 lg:px-20">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="border-stone-light/20 mb-12 flex flex-col justify-between gap-6 border-b pb-8 md:flex-row md:items-end">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-body text-crimson-bright text-xs font-bold tracking-widest uppercase">
                04 // Selected Works
              </span>
              <span className="bg-crimson-bright h-2 w-2 animate-pulse rounded-full" />
            </div>
            <h2 className="font-display text-ink text-3xl font-light tracking-tight md:text-4xl lg:text-5xl">
              Proof of Every{" "}
              <span className="text-crimson-bright font-normal italic">
                Pixel
              </span>
            </h2>
          </div>

          <p className="font-body text-stone max-w-xs text-xs leading-relaxed md:text-sm">
            Every project reflects thoughtful strategy, purposeful execution,
            and measurable brand impact.
          </p>
        </div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial={prefersReducedMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 gap-6 lg:grid-cols-3"
        >
          {/* Featured Card (Spans 2 columns) */}
          {featured && (
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <button
                type="button"
                onClick={() => setActiveProject(featured)}
                className="group border-stone-light/20 bg-ink text-parchment hover:border-crimson-bright/40 focus-visible:outline-crimson-bright relative flex min-h-[440px] w-full flex-col justify-between overflow-hidden rounded-3xl border p-8 text-left transition-all duration-500 hover:shadow-2xl focus-visible:outline-2 focus-visible:outline-offset-4 md:p-10"
              >
                {/* Background Image Preview with Scale Effect */}
                {"image" in featured &&
                  (featured as { image?: string }).image && (
                    <div className="absolute inset-0 z-0 opacity-25 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:opacity-35">
                      <Image
                        src={(featured as { image: string }).image}
                        alt={featured.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                {/* Ambient Glow Effects */}
                <div className="bg-crimson-bright/15 pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full opacity-50 blur-3xl transition-opacity duration-500 group-hover:opacity-90" />

                {/* Top Badge */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="bg-crimson-bright text-parchment font-body rounded-full px-3 py-1 text-[10px] font-bold tracking-widest uppercase shadow-sm">
                    Featured Case Study
                  </span>
                  <span className="text-parchment/50 font-body font-mono text-xs">
                    01
                  </span>
                </div>

                {/* Card Content */}
                <div className="relative z-10 mt-20 max-w-xl">
                  <span className="text-ember font-body text-xs font-bold tracking-wider uppercase">
                    {featured.category}
                  </span>
                  <h3 className="font-display text-parchment group-hover:text-ember mt-2 text-3xl font-normal tracking-tight transition-colors duration-300 md:text-4xl lg:text-5xl">
                    {featured.title}
                  </h3>
                  <p className="font-body text-parchment/70 mt-4 line-clamp-2 text-sm leading-relaxed md:text-base">
                    {featured.summary}
                  </p>
                </div>

                {/* Bottom Action Footer */}
                <div className="border-parchment/15 relative z-10 mt-8 flex items-center justify-between border-t pt-6">
                  <span className="text-parchment/80 group-hover:text-parchment font-body text-xs font-semibold tracking-wider uppercase transition-colors">
                    Explore Project
                  </span>
                  <div className="bg-parchment/10 group-hover:bg-crimson-bright text-parchment flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110">
                    <svg
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </div>
                </div>
              </button>
            </motion.div>
          )}

          {/* Side Cards Column */}
          <div className="flex flex-col gap-6 lg:col-span-1">
            {sideProjects.map((project, idx) => (
              <motion.div
                key={project.slug}
                variants={itemVariants}
                className="flex-1"
              >
                <button
                  type="button"
                  onClick={() => setActiveProject(project)}
                  className="group border-stone-light/20 bg-ink text-parchment hover:border-crimson-bright/40 focus-visible:outline-crimson-bright relative flex h-full min-h-[200px] w-full flex-col justify-between overflow-hidden rounded-3xl border p-7 text-left transition-all duration-500 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4"
                >
                  {/* Background Image Preview with Scale Effect */}
                  {"image" in project &&
                    (project as { image?: string }).image && (
                      <div className="absolute inset-0 z-0 opacity-20 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:opacity-30">
                        <Image
                          src={(project as { image: string }).image}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                  {/* Ambient Glow Effects */}
                  <div className="bg-crimson-bright/10 pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full opacity-30 blur-2xl transition-opacity duration-500 group-hover:opacity-80" />

                  {/* Top Badge */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="bg-stone-light/20 text-ember font-body rounded-md px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase backdrop-blur-sm">
                      {project.category}
                    </span>
                    <span className="text-parchment/50 font-body font-mono text-xs">
                      0{idx + 2}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 my-6">
                    <h3 className="font-display text-parchment group-hover:text-ember text-xl font-normal tracking-tight transition-colors duration-200 md:text-2xl">
                      {project.title}
                    </h3>
                    {"summary" in project && (
                      <p className="font-body text-parchment/70 mt-2 line-clamp-2 text-xs leading-relaxed">
                        {project.summary}
                      </p>
                    )}
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="border-parchment/15 relative z-10 flex items-center justify-between border-t pt-4">
                    <span className="text-parchment/80 group-hover:text-parchment font-body text-xs font-bold tracking-wider uppercase transition-colors">
                      View Work
                    </span>
                    <div className="bg-parchment/10 group-hover:bg-crimson-bright text-parchment flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110">
                      <svg
                        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer Navigation */}
        <div className="border-stone-light/20 mt-12 flex items-center justify-end border-t pt-8">
          <Link
            href="/work"
            className="group text-crimson-bright hover:text-ink focus-visible:outline-crimson-bright font-body inline-flex items-center gap-3 text-xs font-bold tracking-widest uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            <span>View All Projects</span>
            <span
              aria-hidden="true"
              className="bg-crimson-bright/10 group-hover:bg-crimson-bright group-hover:text-parchment flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300"
            >
              &rarr;
            </span>
          </Link>
        </div>
      </div>

      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
}

// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import { motion, useReducedMotion } from "framer-motion";
// import { workProjects } from "@/lib/site-config";
// import ProjectModal from "@/components/work/ProjectModal";

// type Project = (typeof workProjects)[number];

// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.12,
//       delayChildren: 0.05,
//     },
//   },
// } as const;

// const itemVariants = {
//   hidden: { opacity: 0, y: 30 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.7,
//       ease: [0.16, 1, 0.3, 1],
//     },
//   },
// } as const;

// export default function WorkPreview() {
//   const prefersReducedMotion = useReducedMotion();
//   const [activeProject, setActiveProject] = useState<Project | null>(null);

//   const featured = workProjects[0];
//   const sideProjects = workProjects.slice(1, 3);

//   return (
//     <section className="border-stone-light/20 bg-parchment text-ink border-y px-6 py-20 md:px-12 md:py-28 lg:px-20">
//       <div className="mx-auto max-w-7xl">
//         {/* Section header */}
//         <div className="border-stone-light/20 mb-14 flex flex-col justify-between gap-6 border-b pb-8 md:flex-row md:items-end">
//           <div className="max-w-2xl space-y-3">
//             <div className="flex items-center gap-2">
//               <span className="font-body text-crimson-bright text-xs font-bold tracking-widest uppercase">
//                 Selected Works
//               </span>
//               <span className="bg-crimson-bright/20 h-1.5 w-1.5 rounded-full" />
//             </div>
//             <h2 className="font-display text-ink text-3xl font-light tracking-tight md:text-4xl lg:text-5xl">
//               Proof of Every{" "}
//               <span className="text-crimson-bright font-normal italic">
//                 Pixel
//               </span>
//             </h2>
//           </div>

//           <p className="font-body text-stone max-w-xs text-xs leading-relaxed md:text-sm">
//             Every project reflects thoughtful strategy, purposeful execution,
//             and measurable brand impact.
//           </p>
//         </div>

//         {/* Asymmetric bento layout */}
//         <motion.div
//           variants={containerVariants}
//           initial={prefersReducedMotion ? "visible" : "hidden"}
//           whileInView="visible"
//           viewport={{ once: true, margin: "-60px" }}
//           className="grid grid-cols-1 gap-6 lg:grid-cols-3"
//         >
//           {/* Featured card, spans 2 columns */}
//           {featured && (
//             <motion.div variants={itemVariants} className="lg:col-span-2">
//               <button
//                 type="button"
//                 onClick={() => setActiveProject(featured)}
//                 className="group border-stone-light/25 bg-ink text-parchment hover:border-crimson-bright/50 focus-visible:outline-crimson-bright relative flex h-full min-h-[380px] w-full flex-col justify-between overflow-hidden rounded-3xl border p-8 text-left transition-all duration-500 hover:shadow-2xl focus-visible:outline-2 focus-visible:outline-offset-4 md:p-12"
//               >
//                 <div className="bg-crimson-bright/20 pointer-events-none absolute -top-16 -right-16 h-72 w-72 rounded-full opacity-60 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
//                 <div className="border-parchment/10 absolute right-8 bottom-8 h-40 w-40 rounded-full border border-dashed transition-transform duration-700 group-hover:rotate-45" />

//                 <div className="relative z-10 flex items-center justify-between">
//                   <span className="bg-crimson-bright text-parchment font-body rounded-full px-3 py-1 text-[11px] font-bold tracking-widest uppercase">
//                     Featured Project
//                   </span>
//                 </div>

//                 <div className="relative z-10 mt-16 max-w-xl">
//                   <span className="text-ember font-body text-xs font-bold tracking-wider uppercase">
//                     {featured.category}
//                   </span>
//                   <h3 className="font-display text-parchment group-hover:text-ember mt-2 text-3xl font-normal tracking-tight transition-colors duration-300 md:text-4xl lg:text-5xl">
//                     {featured.title}
//                   </h3>
//                   <p className="font-body text-parchment/70 mt-4 line-clamp-2 text-sm leading-relaxed">
//                     {featured.summary}
//                   </p>
//                 </div>

//                 <div className="border-parchment/15 relative z-10 mt-8 flex items-center justify-between border-t pt-6">
//                   <span className="text-parchment/80 group-hover:text-parchment font-body text-xs font-semibold tracking-wider uppercase transition-colors">
//                     Explore Case Study
//                   </span>
//                   <div className="bg-parchment/10 group-hover:bg-crimson-bright text-parchment flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110">
//                     <span className="text-sm transition-transform duration-300 group-hover:translate-x-0.5">
//                       →
//                     </span>
//                   </div>
//                 </div>
//               </button>
//             </motion.div>
//           )}

//           {/* Side cards */}
//           <div className="flex flex-col gap-6 lg:col-span-1">
//             {sideProjects.map((project) => (
//               <motion.div
//                 key={project.slug}
//                 variants={itemVariants}
//                 className="flex-1"
//               >
//                 <button
//                   type="button"
//                   onClick={() => setActiveProject(project)}
//                   className="group border-stone-light/20 bg-parchment-dim hover:border-crimson-bright/40 hover:bg-parchment focus-visible:outline-crimson-bright relative flex h-full w-full flex-col justify-between overflow-hidden rounded-3xl border p-7 text-left transition-all duration-300 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4"
//                 >
//                   <div className="mb-6 flex items-center justify-between">
//                     <span className="bg-stone-light/15 text-crimson-bright font-body rounded-md px-2.5 py-1 text-[11px] font-bold tracking-wider uppercase">
//                       {project.category}
//                     </span>
//                   </div>

//                   <h3 className="font-display text-ink group-hover:text-crimson-bright text-xl font-normal tracking-tight transition-colors duration-200 md:text-2xl">
//                     {project.title}
//                   </h3>

//                   <div className="border-stone-light/15 mt-6 flex items-center justify-between border-t pt-4">
//                     <span className="text-stone group-hover:text-ink font-body text-xs font-bold tracking-wider uppercase transition-colors">
//                       View Work
//                     </span>
//                     <span className="text-crimson-bright text-sm transition-transform duration-300 group-hover:translate-x-1">
//                       →
//                     </span>
//                   </div>
//                 </button>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>

//         {/* Footer CTA */}
//         <div className="border-stone-light/20 mt-14 flex items-center justify-end border-t pt-8">
//           <Link
//             href="/work"
//             className="group text-crimson-bright hover:text-ink focus-visible:outline-crimson-bright font-body inline-flex items-center gap-3 text-xs font-bold tracking-widest uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
//           >
//             <span>View All Projects</span>
//             <span
//               aria-hidden="true"
//               className="bg-crimson-bright/10 group-hover:bg-crimson-bright group-hover:text-parchment flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300"
//             >
//               →
//             </span>
//           </Link>
//         </div>
//       </div>

//       <ProjectModal
//         project={activeProject}
//         onClose={() => setActiveProject(null)}
//       />
//     </section>
//   );
// }
