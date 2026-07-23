// src/components/home/CtaBand.tsx

"use client";

import Link from "next/link";
import React, { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  useInView,
} from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { contactConfig, ctaStats, siteConfig } from "@/lib/site-config";

export default function CtaBand() {
  const prefersReducedMotion = useReducedMotion();
  const ctaRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Scroll observer
  const isInView = useInView(ctaRef, {
    once: true,
    margin: "0px 0px -100px 0px",
  });

  // Mouse Glow Motion Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const backgroundGradient = useTransform(
    [smoothX, smoothY],
    ([x, y]) =>
      `radial-gradient(600px circle at ${x}px ${y}px, rgba(185, 6, 26, 0.35), transparent 40%)`
  );

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ctaRef.current || prefersReducedMotion) return;
    const rect = ctaRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  // Variants respecting Reduced Motion
  const containerVariants = {
    hidden: { opacity: prefersReducedMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.15,
        delayChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  } as const;

  const itemVariants = {
    hidden: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] },
    },
  } as const;

  return (
    <section className="bg-ink text-parchment border-parchment/10 w-full border-t py-24 md:py-30">
      <div className="w-full px-6 md:px-12 lg:px-18">
        <motion.div
          ref={ctaRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="bg-ink border-parchment/10 relative overflow-hidden rounded-3xl border p-10 shadow-2xl md:p-20"
        >
          {/* Dynamic Cursor-Follow Glow (Fades in only when hovered) */}
          {!prefersReducedMotion && (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-px transition-opacity duration-500"
              style={{
                background: backgroundGradient,
                opacity: isHovered ? 0.45 : 0,
              }}
            />
          )}

          {/* Rotating Decorative Ring */}
          {!prefersReducedMotion && (
            <motion.div
              aria-hidden="true"
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="border-parchment/5 pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full border border-dashed"
            />
          )}

          <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Content Area */}
            <div className="space-y-6 lg:col-span-8">
              {/* Availability Badge */}
              <motion.div
                variants={itemVariants}
                className="border-ember/30 bg-ember/10 font-body text-ember inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold tracking-widest uppercase"
              >
                <span className="relative flex h-2 w-2">
                  <span
                    className={`bg-crimson-bright absolute inline-flex h-full w-full rounded-full opacity-75 ${
                      prefersReducedMotion ? "" : "animate-ping"
                    }`}
                  />
                  <span className="bg-ember relative inline-flex h-2 w-2 rounded-full" />
                </span>
                Accepting New Projects
              </motion.div>

              {/* Heading */}
              <motion.h2
                variants={itemVariants}
                className="font-display text-parchment text-4xl font-light tracking-tight sm:text-6xl md:text-7xl lg:leading-[1.1]"
              >
                Ready to build a <br />
                <span className="text-ember font-serif italic">
                  lasting brand
                </span>{" "}
                legacy?
              </motion.h2>

              {/* Description */}
              <motion.p
                variants={itemVariants}
                className="font-body text-parchment/70 max-w-xl text-lg leading-relaxed md:text-xl"
              >
                {`Partner with ${siteConfig.name} to refine your identity, clarify your positioning, and scale your brand's market reach.`}
              </motion.p>

              {/* Key Stats */}
              <motion.div
                variants={itemVariants}
                className="border-parchment/10 grid grid-cols-2 gap-6 border-t pt-6 sm:grid-cols-3"
              >
                {ctaStats.map((stat, idx) => (
                  <div
                    key={stat.label || idx}
                    className={idx === 2 ? "col-span-2 sm:col-span-1" : ""}
                  >
                    <div className="text-parchment font-mono text-2xl font-bold">
                      {stat.value}
                    </div>
                    <div className="font-body text-stone-light mt-1 text-xs">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right Call to Action Area */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-start justify-center gap-6 lg:col-span-4 lg:items-end"
            >
              <motion.div
                whileHover={prefersReducedMotion ? {} : { scale: 1.04, y: -2 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                className="w-full sm:w-auto"
              >
                <Link
                  href="/contact"
                  className="group bg-parchment text-ink hover:bg-crimson-bright hover:text-parchment hover:shadow-crimson-bright/30 relative inline-flex w-full items-center justify-between gap-6 overflow-hidden rounded-full px-8 py-5 text-sm font-bold tracking-widest uppercase shadow-2xl transition-all sm:w-auto"
                >
                  <span className="relative z-10">Start a Project</span>
                  <div className="bg-ink text-parchment group-hover:bg-parchment group-hover:text-crimson-bright relative z-10 flex h-10 w-10 items-center justify-center rounded-full transition-transform group-hover:translate-x-1">
                    <ArrowUpRight className="h-5 w-5" />
                  </div>
                </Link>
              </motion.div>

              <a
                href={`mailto:${contactConfig.email}`}
                className="text-stone-light hover:text-parchment inline-flex items-center gap-2 font-mono text-sm transition-colors"
              >
                <Mail className="h-3.5 w-3.5" />
                or email {contactConfig.email}
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
