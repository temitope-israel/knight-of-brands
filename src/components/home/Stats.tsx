"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ProjectsIcon,
  ExperienceIcon,
  IndustriesIcon,
  BrandsIcon,
} from "@/components/home/StatIcons";
import { stats } from "@/lib/site-config";

const icons = [ProjectsIcon, ExperienceIcon, IndustriesIcon, BrandsIcon];

export default function Stats() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-parchment px-6 py-20 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 md:grid-cols-4 md:gap-8">
        {stats.map((stat, index) => {
          const Icon = icons[index];
          return (
            <motion.div
              key={stat.label}
              initial={
                prefersReducedMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 24 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.5,
                delay: prefersReducedMotion ? 0 : index * 0.12,
                ease: "easeOut" as const,
              }}
              className="flex flex-col items-center gap-3 text-center md:items-start md:text-left"
            >
              <Icon className="text-crimson-bright h-9 w-9 md:h-10 md:w-10" />
              <div>
                <p className="font-display text-ink text-3xl font-semibold md:text-4xl">
                  {stat.value}
                </p>
                <p className="font-body text-ink mt-1 text-sm font-medium">
                  {stat.label}
                </p>
                <p className="font-body text-stone mt-1 text-xs">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
