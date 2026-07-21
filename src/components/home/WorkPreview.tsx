"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { workPreview } from "@/lib/site-config";

export default function WorkPreview() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-parchment px-6 py-20 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="font-body text-crimson-bright text-sm font-semibold tracking-widest uppercase">
            Our Work
          </span>
          <h2 className="font-display text-ink max-w-xl text-3xl font-semibold md:text-4xl">
            Proof of Every <span className="text-crimson-bright">Pixel</span>
          </h2>
          <p className="font-body text-stone max-w-md text-sm md:text-base">
            Every project reflects thoughtful strategy, purposeful design, and
            measurable impact.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {workPreview.map((project, index) => (
            <motion.div
              key={project.title}
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
            >
              <Link
                href="/work"
                className="group from-crimson-dark via-ink to-ink focus-visible:outline-crimson-bright relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-2xl bg-gradient-to-br p-6 focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                {/* Decorative ring accent — consistent across every card,
                    since we don't have real project imagery yet */}
                <div
                  aria-hidden="true"
                  className="border-parchment/10 absolute -top-10 -right-10 h-32 w-32 rounded-full border transition-transform duration-500 group-hover:scale-110"
                />
                <div
                  aria-hidden="true"
                  className="border-parchment/10 absolute top-8 right-8 h-16 w-16 rounded-full border"
                />

                <span className="font-body text-ember relative text-xs font-semibold tracking-widest uppercase">
                  {project.category}
                </span>
                <h3 className="font-display text-parchment relative mt-2 text-xl font-semibold">
                  {project.title}
                </h3>
                <span
                  aria-hidden="true"
                  className="font-body text-parchment/70 group-hover:text-parchment relative mt-3 inline-flex items-center gap-1.5 text-sm transition-colors"
                >
                  View Case Study
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/work"
            className="font-body bg-crimson-bright text-parchment hover:bg-ember focus-visible:outline-crimson-bright inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            View All Projects
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
