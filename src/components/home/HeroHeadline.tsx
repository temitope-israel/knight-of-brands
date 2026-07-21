"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

function splitTagline(tagline: string): [string, string] {
  const [first, second] = tagline.split(". ").filter(Boolean);
  const lineOne = first?.endsWith(".") ? first : `${first}.`;
  return [lineOne, second ?? ""];
}

const TYPE_SPEED_MS = 85;
const ERASE_SPEED_MS = 30;
const HOLD_DURATION_MS = 6000; // how long the fully-typed line stays before erasing
const INITIAL_DELAY_MS = 700; // lets line one's entrance finish first

type Phase = "typing" | "holding" | "erasing" | "pausing";

export default function HeroHeadline({ tagline }: { tagline: string }) {
  const [lineOne, lineTwo] = splitTagline(tagline);
  const prefersReducedMotion = useReducedMotion();

  const [typedChars, setTypedChars] = useState(
    prefersReducedMotion ? lineTwo.length : 0
  );
  const [phase, setPhase] = useState<Phase>("typing");

  useEffect(() => {
    // Reduced motion: show the full line once, never animate or loop.
    if (prefersReducedMotion) return;

    let timeoutId: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      const delay = typedChars === 0 ? INITIAL_DELAY_MS : TYPE_SPEED_MS;
      timeoutId = setTimeout(() => {
        if (typedChars < lineTwo.length) {
          setTypedChars((count) => count + 1);
        } else {
          setPhase("holding");
        }
      }, delay);
    } else if (phase === "holding") {
      timeoutId = setTimeout(() => setPhase("erasing"), HOLD_DURATION_MS);
    } else if (phase === "erasing") {
      timeoutId = setTimeout(() => {
        if (typedChars > 0) {
          setTypedChars((count) => count - 1);
        } else {
          setPhase("pausing");
        }
      }, ERASE_SPEED_MS);
    } else if (phase === "pausing") {
      timeoutId = setTimeout(() => setPhase("typing"), 400);
    }

    return () => clearTimeout(timeoutId);
  }, [phase, typedChars, lineTwo.length, prefersReducedMotion]);

  //   const isIdle = phase === "holding" || phase === "pausing";

  return (
    <h1 className="font-display text-4xl leading-tight font-semibold text-white uppercase sm:text-5xl md:text-6xl">
      <motion.span
        initial={
          prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
        }
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" as const }}
        className="block"
      >
        {lineOne}
      </motion.span>

      <span className="text-ember mt-2 block md:mt-3">
        <span aria-hidden="true">
          {lineTwo.slice(0, typedChars)}
          <span
            aria-hidden="true"
            className={`bg-ember ml-1 inline-block h-[0.9em] w-[3px] translate-y-1 align-middle ${
              !prefersReducedMotion && phase !== "typing" ? "animate-pulse" : ""
            } ${prefersReducedMotion ? "opacity-0" : "opacity-100"}`}
          />
          {/* <span
            aria-hidden="true"
            className={`bg-ember ml-1 inline-block h-[0.9em] w-[3px] translate-y-1 align-middle ${
              !prefersReducedMotion && !isIdle ? "animate-pulse" : ""
            } ${prefersReducedMotion ? "opacity-0" : "opacity-100"}`}
          /> */}
        </span>
        <span className="sr-only">{lineTwo}</span>
      </span>
    </h1>
  );
}
