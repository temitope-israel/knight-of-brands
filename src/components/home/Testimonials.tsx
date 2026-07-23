"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { TbArrowLeft, TbArrowRight, TbQuote } from "react-icons/tb";
import { testimonials } from "@/lib/site-config";

// 1.2s transition + 5.0s reading display time = 6.2s total cycle interval
const SLIDE_TRANSITION_DURATION = 1.2; // 1.2 seconds smooth glide
const READ_HOLD_TIME = 5000; // 5 seconds of resting display time
const AUTO_SLIDE_INTERVAL = READ_HOLD_TIME + SLIDE_TRANSITION_DURATION * 1000;

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const current = testimonials[index];

  function handleNavigate(nextIndex: number, dir: "left" | "right") {
    setDirection(dir);
    setIndex((nextIndex + testimonials.length) % testimonials.length);
  }

  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;

    const timer = setInterval(() => {
      handleNavigate(index + 1, "right");
    }, AUTO_SLIDE_INTERVAL);

    return () => clearInterval(timer);
  }, [index, isPaused, prefersReducedMotion]);

  // Gentle, slow glide variants
  const slideVariants = {
    enter: (dir: "left" | "right") => ({
      x: dir === "right" ? 40 : -40,
      opacity: 0,
      filter: "blur(4px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
    },
    exit: (dir: "left" | "right") => ({
      x: dir === "right" ? -40 : 40,
      opacity: 0,
      filter: "blur(4px)",
    }),
  };

  return (
    <section className="bg-parchment-dim text-ink border-stone-light/20 overflow-hidden border-y px-6 py-20 md:px-12 md:py-28 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
          {/* Left Column: Fixed Context Controls */}
          <div className="space-y-6 lg:sticky lg:top-24 lg:col-span-4">
            <div className="flex items-center gap-2">
              <span className="font-body text-crimson-bright text-xs font-bold tracking-widest uppercase">
                05 // ENDORSEMENTS
              </span>
              <span className="bg-crimson-bright h-2 w-2 animate-pulse rounded-full" />
            </div>

            <h2 className="font-display text-ink text-2xl font-light tracking-tight md:text-3xl lg:text-4xl">
              Trusted by Ambitious Brands
            </h2>

            <p className="font-body text-stone max-w-sm text-sm leading-relaxed">
              Discover how strategic design, crisp execution, and brand clarity
              drive outcomes for enterprise leaders.
            </p>

            {/* Controls */}
            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleNavigate(index - 1, "left")}
                  aria-label="Previous testimonial"
                  className="group bg-parchment border-stone-light/25 hover:border-crimson-bright hover:bg-crimson-bright hover:text-parchment text-ink focus-visible:outline-crimson-bright flex h-12 w-12 items-center justify-center rounded-full border shadow-2xs transition-all duration-300 focus-visible:outline-2"
                >
                  <TbArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
                </button>

                <button
                  type="button"
                  onClick={() => handleNavigate(index + 1, "right")}
                  aria-label="Next testimonial"
                  className="group bg-parchment border-stone-light/25 hover:border-crimson-bright hover:bg-crimson-bright hover:text-parchment text-ink focus-visible:outline-crimson-bright flex h-12 w-12 items-center justify-center rounded-full border shadow-2xs transition-all duration-300 focus-visible:outline-2"
                >
                  <TbArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>

              <div className="text-stone-light flex items-center gap-3 font-mono text-xs font-bold tracking-wider">
                <span>
                  <span className="text-crimson-bright">0{index + 1}</span> / 0
                  {testimonials.length}
                </span>
                {isPaused && (
                  <span className="bg-stone-light/20 text-stone rounded-full px-2 py-0.5 text-[10px] uppercase">
                    Paused
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Slow-Gliding Card */}
          <div className="lg:col-span-8">
            <div
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="border-stone-light/20 bg-parchment relative flex min-h-[360px] flex-col justify-between rounded-3xl border p-8 shadow-sm md:p-12"
            >
              <TbQuote className="text-crimson-bright/15 pointer-events-none absolute top-6 right-8 z-0 h-24 w-24 select-none" />

              {/* Seamless Quote Box */}
              <div className="relative z-10 flex flex-1 items-center overflow-hidden">
                <AnimatePresence mode="popLayout" custom={direction}>
                  <motion.figure
                    key={index}
                    custom={direction}
                    variants={prefersReducedMotion ? undefined : slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      duration: SLIDE_TRANSITION_DURATION, // Slower 1.2s slide duration
                      ease: [0.25, 1, 0.5, 1], // Gentle ease-out curve
                    }}
                    className="w-full space-y-6"
                  >
                    <blockquote className="font-display text-ink text-2xl leading-relaxed font-normal tracking-tight md:text-xl lg:text-2xl">
                      &ldquo;{current.quote}&rdquo;
                    </blockquote>

                    <figcaption className="border-stone-light/15 flex items-center justify-between border-t pt-4">
                      <div>
                        <div className="font-display text-ink text-lg font-medium">
                          {current.name}
                        </div>
                        {current.company && (
                          <div className="text-stone mt-0.5 font-mono text-xs font-semibold tracking-wider uppercase">
                            {current.company}
                          </div>
                        )}
                      </div>

                      <span className="bg-crimson-bright/10 text-crimson-bright rounded-full px-3 py-1 font-mono text-[11px] font-bold tracking-wider uppercase">
                        Verified Partner
                      </span>
                    </figcaption>
                  </motion.figure>
                </AnimatePresence>
              </div>

              {/* Progress Indicators matching the new total slide timing */}
              <div className="relative z-10 mt-8 flex gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() =>
                      handleNavigate(idx, idx > index ? "right" : "left")
                    }
                    aria-label={`Go to slide ${idx + 1}`}
                    className="bg-stone-light/15 relative h-1.5 flex-1 overflow-hidden rounded-full transition-all duration-300 hover:h-2"
                  >
                    {idx === index && (
                      <motion.div
                        key={`progress-${index}-${isPaused}`}
                        className="bg-crimson-bright h-full"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{
                          duration:
                            isPaused || prefersReducedMotion
                              ? 0
                              : AUTO_SLIDE_INTERVAL / 1000,
                          ease: "linear",
                        }}
                      />
                    )}
                    {idx < index && (
                      <div className="bg-crimson-bright h-full w-full" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
