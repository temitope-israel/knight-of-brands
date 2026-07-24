"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks } from "@/lib/site-config";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <ul className="hidden items-center gap-8 lg:flex">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-body group relative text-sm font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                {link.label}

                {!isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute -top-1 left-1/2 h-0.5 w-1/2 -translate-x-1/2 bg-white opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                  />
                )}

                {isActive && (
                  <span
                    aria-hidden="true"
                    className="bg-crimson-bright absolute -bottom-1 left-1/2 h-0.5 w-1/2 -translate-x-1/2"
                  />
                )}
              </Link>
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white lg:hidden"
      >
        <motion.span
          animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={`h-0.5 w-6 transition-colors duration-200 ${
            isOpen ? "bg-crimson-bright" : "bg-white"
          }`}
        />
        <motion.span
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={`h-0.5 w-6 transition-colors duration-200 ${
            isOpen ? "bg-crimson-bright" : "bg-white"
          }`}
        />
        <motion.span
          animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={`h-0.5 w-6 transition-colors duration-200 ${
            isOpen ? "bg-crimson-bright" : "bg-white"
          }`}
        />
      </button>

      {/* <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white lg:hidden"
      >
        <motion.span
          animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" as const }}
          className="h-px w-6 bg-white"
        />
        <motion.span
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.2, ease: "easeOut" as const }}
          className="h-px w-6 bg-white"
        />
        <motion.span
          animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" as const }}
          className="h-px w-6 bg-white"
        />
      </button> */}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" as const }}
            className="bg-parchment fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 lg:hidden"
          >
            {navLinks.map((link, index) => {
              const isActive = pathname === link.href;
              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.05,
                    ease: "easeOut" as const,
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`font-display text-3xl ${
                      isActive ? "text-crimson-bright" : "text-ink"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
