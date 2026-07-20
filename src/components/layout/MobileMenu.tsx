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
      {/* Desktop nav links */}
      <ul className="hidden items-center gap-8 md:flex">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`font-body focus-visible:outline-crimson relative text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 ${
                  isActive ? "text-crimson" : "text-ink hover:text-crimson"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="bg-crimson absolute -bottom-1 left-0 h-px w-full" />
                )}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Mobile hamburger toggle */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        className="focus-visible:outline-crimson relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 focus-visible:outline-2 focus-visible:outline-offset-4 md:hidden"
      >
        <motion.span
          animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" as const }}
          className="bg-ink h-px w-6"
        />
        <motion.span
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.2, ease: "easeOut" as const }}
          className="bg-ink h-px w-6"
        />
        <motion.span
          animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" as const }}
          className="bg-ink h-px w-6"
        />
      </button>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" as const }}
            className="bg-parchment fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 md:hidden"
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
                      isActive ? "text-crimson" : "text-ink"
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
