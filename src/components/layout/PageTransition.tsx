"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -12 }}
        transition={{ duration: 0.35, ease: "easeOut" as const }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
