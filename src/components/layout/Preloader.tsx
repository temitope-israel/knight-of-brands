"use client";

import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/lib/site-config";

const STORAGE_KEY = "kob-preloader-shown";
const TAGLINE_WORDS = siteConfig.footerTagline.split(" ");

function subscribe() {
  return () => {};
}

function getSnapshot() {
  return sessionStorage.getItem(STORAGE_KEY) === "true";
}

function getServerSnapshot() {
  return true;
}

function useHasPreloaderAlreadyShown() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export default function Preloader() {
  const alreadyShown = useHasPreloaderAlreadyShown();
  const [dismissed, setDismissed] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (alreadyShown) return;

    sessionStorage.setItem(STORAGE_KEY, "true");
    const dismissDelay = prefersReducedMotion ? 600 : 1800;
    const timer = setTimeout(() => setDismissed(true), dismissDelay);

    return () => clearTimeout(timer);
  }, [alreadyShown, prefersReducedMotion]);

  const shouldShow = !alreadyShown && !dismissed;

  useEffect(() => {
    document.body.style.overflow = shouldShow ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [shouldShow]);

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" as const }}
          role="status"
          aria-label={`Loading ${siteConfig.name}`}
          className="bg-crimson-bright fixed inset-0 z-50 flex flex-col items-center justify-center gap-6"
        >
          <motion.div
            initial={
              prefersReducedMotion
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.6 }
            }
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: "easeOut" as const }}
            className="bg-parchment flex h-32 w-32 items-center justify-center rounded-full shadow-xl md:h-40 md:w-40"
          >
            <motion.div
              initial={
                prefersReducedMotion
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.85 }
              }
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.4,
                delay: prefersReducedMotion ? 0 : 0.3,
                ease: "easeOut" as const,
              }}
            >
              <Image
                src="/images/logo.png"
                alt={siteConfig.name}
                width={160}
                height={48}
                priority
                className="h-14 w-auto md:h-16"
              />
            </motion.div>
          </motion.div>

          <div className="flex gap-2">
            {TAGLINE_WORDS.map((word, index) => (
              <motion.span
                key={word}
                initial={
                  prefersReducedMotion
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 8 }
                }
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: prefersReducedMotion ? 0 : 0.75 + index * 0.15,
                  ease: "easeOut" as const,
                }}
                className="font-body text-parchment text-sm tracking-wide uppercase"
              >
                {word}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
