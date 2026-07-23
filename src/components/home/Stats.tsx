"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  ProjectsIcon,
  ExperienceIcon,
  IndustriesIcon,
  BrandsIcon,
} from "@/components/home/StatIcons";
import { stats } from "@/lib/site-config";

const icons = [ProjectsIcon, ExperienceIcon, IndustriesIcon, BrandsIcon];

// Helper component for animated kinetic count-up numbers
function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Extract number and suffix (e.g., "50+" -> number: 50, suffix: "+")
  const numericMatch = value.match(/(\d+)/);
  const targetNumber = numericMatch ? parseInt(numericMatch[0], 10) : null;
  const suffix = value.replace(/\d+/g, "");

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView || targetNumber === null) return;

    let start = 0;
    const duration = 2000; // 2 seconds
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = targetNumber / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= targetNumber) {
        setDisplayValue(targetNumber);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, targetNumber]);

  if (targetNumber === null) {
    return <span>{value}</span>;
  }

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
} as const;

export default function Stats() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-parchment text-ink relative overflow-hidden px-6 py-24 md:px-12 md:py-32 lg:px-20">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="border-stone-light/20 mb-14 flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-3">
            <span className="font-body text-crimson-bright text-xs font-bold tracking-widest uppercase">
              02 // PROVEN IMPACT
            </span>
            <span className="bg-crimson-bright h-2 w-2 animate-pulse rounded-full" />
          </div>
          <span className="text-stone-light hidden font-mono text-xs tracking-wider uppercase sm:inline">
            [ Agency Performance Index ]
          </span>
        </div>

        {/* Animated Grid Container */}
        <motion.div
          variants={containerVariants}
          initial={prefersReducedMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat, index) => {
            const Icon = icons[index];

            return (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                whileHover={
                  prefersReducedMotion
                    ? {}
                    : { y: -8, transition: { duration: 0.3, ease: "easeOut" } }
                }
                className="group border-stone-light/25 bg-parchment/80 hover:border-crimson-bright/40 relative flex flex-col justify-between overflow-hidden rounded-3xl border p-8 shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-stone-50/90 hover:shadow-xl"
              >
                {/* Animated Top Accent Border Bar */}
                <div className="bg-crimson-bright absolute top-0 left-0 h-1 w-0 transition-all duration-500 ease-out group-hover:w-full" />

                {/* Header Icon + Numbering */}
                <div className="mb-8 flex items-center justify-between">
                  <div className="bg-stone-light/10 group-hover:bg-crimson-bright group-hover:text-parchment text-crimson-bright flex h-12 w-12 items-center justify-center rounded-2xl transition-colors duration-300">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-stone-light/50 group-hover:text-ink font-mono text-xs font-bold transition-colors">
                    0{index + 1}
                  </span>
                </div>

                {/* Animated Counter Output */}
                <div>
                  <p className="font-display text-ink text-4xl font-normal tracking-tight md:text-5xl lg:text-6xl">
                    {prefersReducedMotion ? (
                      stat.value
                    ) : (
                      <AnimatedCounter value={stat.value} />
                    )}
                  </p>
                  <p className="text-ink mt-2 font-mono text-xs font-bold tracking-wider uppercase">
                    {stat.label}
                  </p>
                </div>

                {/* Footer Description */}
                <div className="border-stone-light/15 mt-6 border-t pt-4">
                  <p className="font-body text-stone text-xs leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

// "use client";

// import { motion, useReducedMotion } from "framer-motion";
// import {
//   ProjectsIcon,
//   ExperienceIcon,
//   IndustriesIcon,
//   BrandsIcon,
// } from "@/components/home/StatIcons";
// import { stats } from "@/lib/site-config";

// const icons = [ProjectsIcon, ExperienceIcon, IndustriesIcon, BrandsIcon];

// export default function Stats() {
//   const prefersReducedMotion = useReducedMotion();

//   return (
//     <section className="bg-parchment px-6 py-20 md:px-10 md:py-32">
//       <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 md:grid-cols-4 md:gap-8">
//         {stats.map((stat, index) => {
//           const Icon = icons[index];
//           return (
//             <motion.div
//               key={stat.label}
//               initial={
//                 prefersReducedMotion
//                   ? { opacity: 1, y: 0 }
//                   : { opacity: 0, y: 24 }
//               }
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, margin: "-80px" }}
//               transition={{
//                 duration: 0.5,
//                 delay: prefersReducedMotion ? 0 : index * 0.12,
//                 ease: "easeOut" as const,
//               }}
//               className="flex flex-col items-center gap-3 text-center md:items-start md:text-left"
//             >
//               <Icon className="text-crimson-bright h-9 w-9 md:h-10 md:w-10" />
//               <div>
//                 <p className="font-display text-ink text-3xl font-semibold md:text-4xl">
//                   {stat.value}
//                 </p>
//                 <p className="font-body text-ink mt-1 text-sm font-medium">
//                   {stat.label}
//                 </p>
//                 <p className="font-body text-stone mt-1 text-xs">
//                   {stat.description}
//                 </p>
//               </div>
//             </motion.div>
//           );
//         })}
//       </div>
//     </section>
//   );
// }
