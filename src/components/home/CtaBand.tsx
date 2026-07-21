"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { contactConfig } from "@/lib/site-config";

export default function CtaBand() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-ink relative overflow-hidden px-6 py-24 text-center md:px-10 md:py-32">
      {/* Same seal-watermark language as the Hero, reused sparingly per brief */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.08]"
        stroke="var(--color-parchment)"
        fill="none"
      >
        <circle cx="90%" cy="20%" r="120" strokeWidth="1" />
        <circle cx="90%" cy="20%" r="160" strokeWidth="1" />
        {Array.from({ length: 8 }).map((_, i) => (
          <circle
            key={i}
            cx={40 + i * 16}
            cy={280 - i * 10}
            r="2"
            fill="var(--color-parchment)"
            stroke="none"
          />
        ))}
      </svg>

      <motion.div
        initial={
          prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }
        }
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" as const }}
        className="relative mx-auto flex max-w-2xl flex-col items-center gap-5"
      >
        <h2 className="font-display text-parchment text-3xl font-semibold md:text-5xl">
          Let&apos;s build something{" "}
          <span className="text-ember">extraordinary together.</span>
        </h2>
        <p className="font-body text-stone-light max-w-md text-sm md:text-base">
          Ready to transform your brand and achieve lasting impact?
        </p>
        <Link
          href={`https://wa.me/${contactConfig.whatsapp.number}?text=${encodeURIComponent(
            contactConfig.whatsapp.defaultMessage
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-body bg-crimson-bright text-parchment hover:bg-ember focus-visible:outline-parchment mt-2 inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          Start a Project
          <span aria-hidden="true">→</span>
        </Link>
      </motion.div>
    </section>
  );
}
