"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { TbBrandWhatsapp } from "react-icons/tb";
import { contactConfig } from "@/lib/site-config";

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    function handleScroll() {
      const currentScrollY = window.scrollY;
      const scrolledDown = currentScrollY > lastScrollY.current;
      const scrolledPastThreshold = currentScrollY > 80;

      setIsVisible(!(scrolledDown && scrolledPastThreshold));
      lastScrollY.current = currentScrollY;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const whatsappUrl = `https://wa.me/${contactConfig.whatsapp.number}?text=${encodeURIComponent(contactConfig.whatsapp.defaultMessage)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      animate={{
        y: isVisible ? 0 : 100,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.3, ease: "easeOut" as const }}
      className="focus-visible:outline-crimson fixed right-6 bottom-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 md:right-8 md:bottom-8"
    >
      {!prefersReducedMotion && (
        <span className="opacicy-75 absolute inset-0 animate-ping rounded-full bg-[#25d366]" />
      )}
      <TbBrandWhatsapp className="relative h-7 w-7" />
    </motion.a>
  );
}
