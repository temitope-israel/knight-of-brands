"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Layers, ShieldCheck, Sparkles, Target } from "lucide-react";

import {
  aboutContent,
  aboutMission,
  clientLogos,
  contactConfig,
  siteConfig,
} from "@/lib/site-config";

import CtaBand from "@/components/home/CtaBand";

// Variants declared strictly as const
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] },
  },
} as const;

function LogoBadge({ name, src }: { name: string; src: string }) {
  const [imageError, setImageError] = useState(false);

  // Fallback to stylized initials if image fails or is missing
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2);

  if (imageError || !src) {
    return (
      <div className="bg-parchment border-ink/5 text-ink flex h-12 w-12 items-center justify-center rounded-xl border transition-transform group-hover:scale-110">
        <span className="font-display text-ink/80 group-hover:text-crimson-bright text-sm font-bold tracking-wider transition-colors">
          {initials}
        </span>
      </div>
    );
  }

  return (
    <div className="relative h-12 w-full max-w-[130px] transition-transform duration-300 group-hover:scale-105">
      <Image
        src={src}
        alt={`${name} logo`}
        fill
        className="object-contain transition-transform duration-300"
        onError={() => setImageError(true)}
      />
    </div>
  );
}

function AboutPage() {
  // const [isMounted, setIsMounted] = useState(false);

  // Top-level hooks called unconditionally
  // const ctaRef = useRef<HTMLDivElement>(null);
  // const mouseX = useMotionValue(0);
  // const mouseY = useMotionValue(0);

  // const springConfig = { damping: 25, stiffness: 150 };
  // const smoothX = useSpring(mouseX, springConfig);
  // const smoothY = useSpring(mouseY, springConfig);

  // const backgroundGradient = useTransform(
  //   [smoothX, smoothY],
  //   ([x, y]) =>
  //     `radial-gradient(600px circle at ${x}px ${y}px, rgba(185, 6, 26, 0.35), transparent 40%)`
  // );

  // const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  //   if (!ctaRef.current) return;
  //   const rect = ctaRef.current.getBoundingClientRect();
  //   mouseX.set(e.clientX - rect.left);
  //   mouseY.set(e.clientY - rect.top);
  // };

  const doubleLogos = [...clientLogos, ...clientLogos];

  return (
    <AnimatePresence>
      <div
        className="bg-parchment text-ink selection:bg-crimson-bright selection:text-parchment overflow-x-hidden transition-opacity duration-300"
        // style={{ opacity: isMounted ? 1 : 0 }}
      >
        {/* HERO SECTION */}
        <section className="border-ink/10 relative border-b px-6 pt-28 pb-20 md:px-12 md:pt-40 md:pb-32">
          <motion.div
            initial={{ opacity: 0, rotate: -20, scale: 0.8 }}
            animate={{ opacity: 0.05, rotate: 0, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-ink pointer-events-none absolute -top-16 -right-16 h-[450px] w-[450px]"
          >
            <svg className="h-full w-full" viewBox="0 0 400 400" fill="none">
              <circle
                cx="200"
                cy="200"
                r="180"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <circle
                cx="200"
                cy="200"
                r="120"
                stroke="currentColor"
                strokeWidth="1"
              />
              <circle
                cx="200"
                cy="200"
                r="60"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <line
                x1="200"
                y1="0"
                x2="200"
                y2="400"
                stroke="currentColor"
                strokeWidth="1"
              />
              <line
                x1="0"
                y1="200"
                x2="400"
                y2="200"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>
          </motion.div>

          <div className="relative z-10 mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="border-ink/10 text-stone flex items-center justify-between border-b pb-6 font-mono text-xs tracking-widest uppercase"
            >
              <span>[ ABOUT THE AGENCY ]</span>
              <span>
                {contactConfig.address.split(" ").slice(-2).join(" ")}
              </span>
              <span className="hidden sm:inline">
                EST. {aboutContent.profile.foundedYear}
              </span>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mt-12 md:mt-20"
            >
              <motion.div
                variants={itemVariants}
                className="text-crimson-bright mb-4 inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] uppercase"
              >
                <Sparkles className="h-3.5 w-3.5" /> {siteConfig.tagline}
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="font-display text-ink text-5xl leading-[1.05] font-light tracking-tight sm:text-7xl md:text-8xl lg:text-[7.5rem]"
              >
                We shape identity, <br />
                <span className="text-crimson-bright font-serif font-normal italic">
                  engineer strategy
                </span>{" "}
                & impact.
              </motion.h1>

              <motion.div
                variants={itemVariants}
                className="mt-12 grid gap-8 md:grid-cols-12 md:items-end"
              >
                <p className="font-body text-ink/80 text-xl leading-relaxed md:col-span-8 md:text-2xl">
                  {aboutContent.intro.title}
                </p>
                <div className="md:col-span-4 md:text-right">
                  <p className="font-body text-stone text-sm leading-relaxed">
                    {aboutContent.intro.body}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ORIGIN & STORY */}
        <section className="border-ink/10 border-b px-6 py-24 md:px-12 md:py-36">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="mx-auto grid max-w-7xl gap-12 md:grid-cols-12"
          >
            <motion.div variants={itemVariants} className="md:col-span-5">
              <div className="sticky top-28 space-y-6">
                <span className="text-crimson-bright font-mono text-xs tracking-widest uppercase">
                  [ 01 ] — OUR ORIGIN
                </span>
                <div className="font-display text-ink text-8xl font-bold tracking-tighter lg:text-[10rem]">
                  {aboutContent.profile.foundedYear}
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="border-ink/10 relative flex items-center gap-4 rounded-2xl border bg-white p-5 shadow-sm"
                >
                  <div className="bg-crimson-bright/10 text-crimson-bright flex h-12 w-12 items-center justify-center rounded-xl">
                    <Compass className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-ink font-mono text-xs font-bold uppercase">
                      Brand Positioning
                    </div>
                    <div className="font-body text-stone text-xs">
                      Lagos • West Africa • Global Market
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <div className="space-y-8 md:col-span-7 md:pt-12">
              {aboutContent.profile.paragraphs.map((paragraph, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="group border-ink/10 hover:border-ink/40 border-b pb-8 transition-colors"
                >
                  <span className="text-stone-light font-mono text-xs">
                    PHASE 0{idx + 1}
                  </span>
                  <p className="font-body text-ink/80 mt-3 text-lg leading-relaxed md:text-xl">
                    {paragraph}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* VISION & MISSION */}
        <section className="border-ink/10 bg-parchment-dim border-b px-6 py-24 md:px-12 md:py-36">
          <div className="mx-auto max-w-7xl">
            <div className="border-ink/10 mb-16 flex items-center justify-between border-b pb-6">
              <span className="text-stone font-mono text-xs tracking-widest uppercase">
                [ 02 ] — INTENT & DIRECTION
              </span>
              <Target className="text-crimson-bright h-4 w-4" />
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
              className="divide-ink/10 border-ink/10 grid divide-y border-y md:grid-cols-2 md:divide-x md:divide-y-0"
            >
              <motion.div
                variants={itemVariants}
                whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
                className="group p-8 transition-colors md:p-16"
              >
                <div className="flex items-center gap-3">
                  <ShieldCheck className="text-crimson-bright h-5 w-5" />
                  <span className="text-crimson-bright font-mono text-xs font-bold tracking-widest uppercase">
                    Our Vision
                  </span>
                </div>
                <h3 className="font-display text-ink mt-6 text-3xl leading-snug font-light md:text-4xl">
                  {aboutMission.vision}
                </h3>
              </motion.div>

              <motion.div
                variants={itemVariants}
                whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
                className="group p-8 transition-colors md:p-16"
              >
                <div className="flex items-center gap-3">
                  <Layers className="text-ink h-5 w-5" />
                  <span className="text-ink font-mono text-xs font-bold tracking-widest uppercase">
                    Our Mission
                  </span>
                </div>
                <h3 className="font-display text-ink mt-6 text-3xl leading-snug font-light md:text-4xl">
                  {aboutMission.mission}
                </h3>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* METHODOLOGY */}
        <section className="bg-ink text-parchment px-6 py-28 md:px-12 md:py-40">
          <div className="mx-auto max-w-7xl">
            <div className="border-parchment/10 mb-20 flex flex-col gap-4 border-b pb-8 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="text-ember font-mono text-xs tracking-widest uppercase">
                  [ 03 ] — METHODOLOGY
                </span>
                <h2 className="font-display text-parchment mt-3 text-4xl font-light tracking-tight md:text-6xl">
                  How We Create Value
                </h2>
              </div>
              <p className="text-stone-light max-w-xs font-mono text-xs">
                Synchronizing strategy, identity, and execution.
              </p>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
              className="grid gap-12 md:grid-cols-2"
            >
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -6 }}
                className="border-parchment/10 bg-parchment/[0.02] relative rounded-2xl border p-10 md:p-14"
              >
                <h3 className="font-display text-parchment text-3xl font-normal">
                  {aboutContent.process.title}
                </h3>
                <div className="font-body text-parchment/70 mt-6 space-y-4 text-base leading-relaxed">
                  {aboutContent.process.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                whileHover={{ y: -6 }}
                className="border-parchment/10 bg-parchment/[0.02] relative rounded-2xl border p-10 md:p-14"
              >
                <h3 className="font-display text-parchment text-3xl font-normal">
                  {aboutContent.technique.title}
                </h3>
                <div className="font-body text-parchment/70 mt-6 space-y-4 text-base leading-relaxed">
                  {aboutContent.technique.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* LOGO REEL */}
        <section className="overflow-hidden py-24 md:py-36">
          <div className="mx-auto mb-16 max-w-7xl px-6 md:px-12">
            <div className="border-ink/10 flex items-center justify-between border-b pb-6">
              <div>
                <span className="text-crimson-bright font-mono text-xs tracking-widest uppercase">
                  [ 04 ] — SELECTED PARTNERSHIPS
                </span>
                <h2 className="font-display text-ink mt-2 text-3xl font-medium">
                  Trusted by Visionaries
                </h2>
              </div>
              <span className="text-stone-light hidden font-mono text-xs sm:inline">
                LIVE ARCHIVE
              </span>
            </div>
          </div>

          <div className="relative flex w-full overflow-hidden">
            <motion.div
              className="flex gap-6 pr-6"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                ease: "linear",
                duration: 25,
                repeat: Infinity,
              }}
            >
              {doubleLogos.map((client, index) => (
                <motion.div
                  key={`${client.name}-${index}`}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="group border-ink/10 hover:border-crimson-bright/40 relative flex h-36 w-48 shrink-0 cursor-pointer flex-col items-center justify-center rounded-2xl border bg-white p-6 shadow-sm transition-all hover:shadow-xl"
                >
                  <LogoBadge name={client.name} src={client.src} />
                  <span className="text-stone group-hover:text-crimson-bright mt-3 line-clamp-1 text-center font-mono text-[10px] tracking-widest uppercase transition-colors">
                    {client.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* FULL-WIDTH CTA BAND SECTION */}
        <CtaBand />
      </div>
    </AnimatePresence>
  );
}

// Explicit Default Export
export default AboutPage;
