"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { HiArrowUpRight } from "react-icons/hi2";
import { aboutContent } from "@/lib/site-config";

export default function WhoWeAre() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-parchment text-ink px-6 py-24 md:px-12 md:py-32 lg:px-20">
      <div className="mx-auto max-w-7xl space-y-12">
        <motion.div
          initial={
            prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2">
            <span className="font-body text-crimson-bright text-xs font-bold tracking-widest uppercase">
              01 // WHO WE ARE
            </span>
            <span className="bg-crimson-bright h-2 w-2 animate-pulse rounded-full" />
          </div>

          <h2 className="font-display text-ink text-3xl leading-tight font-light tracking-tight md:text-5xl lg:text-6xl">
            “{aboutContent.intro.title}”
          </h2>
        </motion.div>

        <motion.div
          initial={
            prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="border-stone-light/20 flex flex-col items-start justify-between gap-8 border-t pt-8 md:flex-row md:items-center"
        >
          <p className="font-body text-stone max-w-xl text-base leading-relaxed md:text-lg">
            {aboutContent.intro.body}
          </p>

          <Link
            href="/about"
            className="group bg-ink text-parchment hover:bg-crimson-bright shrink-0 rounded-full px-8 py-4 text-xs font-bold tracking-widest uppercase transition-colors"
          >
            <span className="flex items-center gap-2">
              More About Us
              <HiArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// "use client";

// import Link from "next/link";
// import { motion, useReducedMotion } from "framer-motion";
// import { HiArrowUpRight } from "react-icons/hi2";
// import { aboutContent } from "@/lib/site-config";

// // Staggered motion variants (Strictly typed as const)
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
//   hidden: { opacity: 0, y: 28 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.7,
//       ease: [0.16, 1, 0.3, 1], // Editorial smooth ease-out
//     },
//   },
// } as const;

// export default function WhoWeAre() {
//   const prefersReducedMotion = useReducedMotion();

//   return (
//     <section className="bg-parchment text-ink overflow-hidden px-6 py-24 md:px-12 md:py-32 lg:px-20">
//       <div className="mx-auto max-w-7xl">
//         <motion.div
//           variants={containerVariants}
//           initial={prefersReducedMotion ? "visible" : "hidden"}
//           whileInView="visible"
//           viewport={{ once: true, margin: "-100px" }}
//           className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16"
//         >
//           {/* Left Column: Index Tag & Lead Statement */}
//           <div className="space-y-6 lg:col-span-7">
//             <motion.div
//               variants={itemVariants}
//               className="flex items-center gap-3"
//             >
//               <span className="text-crimson-bright font-mono text-xs font-bold tracking-widest uppercase">
//                 01 // Manifesto
//               </span>
//               <span className="bg-stone-light/30 h-px w-12" />
//             </motion.div>

//             <motion.h2
//               variants={itemVariants}
//               className="font-display text-ink text-3xl leading-[1.15] font-light tracking-tight md:text-4xl lg:text-5xl"
//             >
//               {aboutContent.intro.title}
//             </motion.h2>
//           </div>

//           {/* Right Column: Narrative Body & Action Button */}
//           <motion.div
//             variants={itemVariants}
//             className="flex flex-col items-start justify-between space-y-8 lg:col-span-5 lg:pt-10"
//           >
//             <p className="font-body text-stone text-base leading-relaxed md:text-lg">
//               {aboutContent.intro.body}
//             </p>

//             {/* Editorial Link CTA */}
//             <Link
//               href="/about"
//               className="group border-stone-light/30 hover:border-ink hover:bg-ink hover:text-parchment inline-flex items-center gap-3 rounded-full border px-7 py-4 text-xs font-bold tracking-widest uppercase transition-all duration-300"
//             >
//               <span>More About Us</span>
//               <HiArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
//             </Link>
//           </motion.div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

// "use client";

// import Link from "next/link";
// import { motion, useReducedMotion } from "framer-motion";
// import { aboutContent } from "@/lib/site-config";

// export default function WhoWeAre() {
//   const prefersReducedMotion = useReducedMotion();

//   return (
//     <section className="bg-parchment px-6 py-20 md:px-10 md:py-28">
//       <motion.div
//         initial={
//           prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }
//         }
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true, margin: "-100px" }}
//         transition={{ duration: 0.6, ease: "easeOut" as const }}
//         className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center"
//       >
//         <span className="font-body text-crimson-bright text-sm font-semibold tracking-widest uppercase">
//           Who We Are
//         </span>
//         <p className="font-display text-ink text-2xl leading-snug font-medium md:text-3xl">
//           {aboutContent.intro.title}
//         </p>
//         <p className="font-body text-stone max-w-2xl text-base md:text-lg">
//           {aboutContent.intro.body}
//         </p>
//         <Link
//           href="/about"
//           className="font-body text-crimson-bright hover:text-ember mt-2 inline-flex items-center gap-2 text-sm font-medium transition-colors"
//         >
//           More About Us
//           <span aria-hidden="true">→</span>
//         </Link>
//       </motion.div>
//     </section>
//   );
// }
