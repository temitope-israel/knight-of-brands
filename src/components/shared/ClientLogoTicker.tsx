"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { clientLogos } from "@/lib/site-config";

function LogoBadge({ name, src }: { name: string; src: string }) {
  const [imageError, setImageError] = useState(false);

  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2);

  if (imageError) {
    return (
      <div className="bg-parchment flex h-32 w-56 shrink-0 items-center justify-center rounded-xl px-8 py-6">
        <span className="font-display text-ink/70 text-2xl font-bold tracking-wider">
          {initials}
        </span>
      </div>
    );
  }

  return (
    <div className="bg-parchment flex h-32 w-56 shrink-0 items-center justify-center rounded-xl px-8 py-6">
      <Image
        src={src}
        alt={`${name} logo`}
        width={220}
        height={110}
        onError={() => setImageError(true)}
        className="h-full w-full object-contain"
      />
    </div>
  );
}

export default function ClientLogoTicker() {
  const prefersReducedMotion = useReducedMotion();
  const doubledLogos = [...clientLogos, ...clientLogos];

  return (
    <div className="relative flex w-full overflow-hidden">
      <motion.div
        className="flex gap-6 px-6"
        animate={prefersReducedMotion ? {} : { x: ["0%", "-50%"] }}
        transition={{ ease: "linear", duration: 24, repeat: Infinity }}
      >
        {doubledLogos.map((client, index) => (
          <LogoBadge
            key={`${client.name}-${index}`}
            name={client.name}
            src={client.src}
          />
        ))}
      </motion.div>
    </div>
  );
}
