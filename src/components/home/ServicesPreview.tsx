"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  BrandingIcon,
  AdvertisingIcon,
  MarketingIcon,
  ConsultancyIcon,
} from "@/components/home/ServiceIcons";
import { services } from "@/lib/site-config";

const icons = [BrandingIcon, AdvertisingIcon, MarketingIcon, ConsultancyIcon];

// Sample deliverables to enrich the interactive hover state
const deliverables = [
  ["Brand Strategy", "Visual Identity", "Design Systems", "Brand Guidelines"],
  ["Campaign Strategy", "Creative Direction", "Media Planning", "Copywriting"],
  ["SEO & Performance", "Social Strategy", "Content Production", "Analytics"],
  ["Market Analysis", "Growth Strategy", "Digital Transformation", "CX Audits"],
];

export default function ServicesPreview() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-parchment-dim text-ink border-stone-light/20 border-y px-6 py-20 md:px-12 md:py-28 lg:px-20">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="border-stone-light/20 mb-16 flex flex-col justify-between gap-6 border-b pb-8 md:flex-row md:items-end">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-body text-crimson-bright text-xs font-bold tracking-widest uppercase">
                03 // CAPABILITIES
              </span>
              <span className="bg-crimson-bright h-2 w-2 animate-pulse rounded-full" />
            </div>
            <h2 className="font-display text-ink text-3xl font-light tracking-tight md:text-4xl lg:text-5xl">
              Transforming Ideas Into Market Leadership
            </h2>
          </div>

          <Link
            href="/services"
            className="group text-crimson-bright hover:text-ink focus-visible:outline-crimson-bright inline-flex shrink-0 items-center gap-2 font-mono text-xs font-bold tracking-wider uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            <span>View All Capabilities</span>
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>

        {/* Interactive Accordion List */}
        <div className="border-stone-light/20 border-t">
          {services.map((service, index) => {
            const Icon = icons[index];
            const isActive = activeIndex === index;
            const items = deliverables[index % deliverables.length];

            return (
              <div
                key={service.href}
                onMouseEnter={() => setActiveIndex(index)}
                className="group border-stone-light/20 border-b transition-colors duration-300"
              >
                <div className="py-8 md:py-10">
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    {/* Left: Number, Icon & Service Title */}
                    <div className="flex items-start gap-6 md:items-center">
                      <span className="text-stone-light/50 group-hover:text-crimson-bright pt-1 font-mono text-xs font-bold transition-colors duration-300 md:pt-0">
                        {"// 0"}
                        {index + 1}
                      </span>

                      <div className="flex items-center gap-4">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-300 ${
                            isActive
                              ? "bg-crimson-bright text-parchment scale-105 shadow-md"
                              : "bg-stone-light/10 text-crimson-bright group-hover:bg-stone-light/20"
                          }`}
                        >
                          <Icon className="h-6 w-6" />
                        </div>
                        <h3 className="font-display text-2xl font-normal tracking-tight md:text-3xl lg:text-4xl">
                          <Link
                            href={service.href}
                            className="hover:text-crimson-bright focus-visible:outline-crimson-bright transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
                          >
                            {service.title}
                          </Link>
                        </h3>
                      </div>
                    </div>

                    {/* Right: Description & CTA Link */}
                    <div className="flex items-center justify-between gap-8 lg:max-w-md">
                      <p className="font-body text-stone text-sm leading-relaxed">
                        {service.description}
                      </p>

                      <Link
                        href={service.href}
                        aria-label={`Learn more about ${service.title}`}
                        className="bg-stone-light/10 group-hover:bg-crimson-bright group-hover:text-parchment text-ink flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-300"
                      >
                        <span className="font-mono text-sm transition-transform duration-300 group-hover:translate-x-0.5">
                          →
                        </span>
                      </Link>
                    </div>
                  </div>

                  {/* Expandable Deliverables Bar */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={
                          prefersReducedMotion
                            ? { opacity: 1, height: "auto" }
                            : { opacity: 0, height: 0 }
                        }
                        animate={{ opacity: 1, height: "auto" }}
                        exit={
                          prefersReducedMotion
                            ? { opacity: 0, height: 0 }
                            : { opacity: 0, height: 0 }
                        }
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="border-stone-light/15 mt-6 flex flex-wrap items-center gap-2 border-t pt-6 pl-0 md:pl-16">
                          <span className="text-stone-light mr-2 font-mono text-[11px] font-semibold tracking-wider uppercase">
                            Key Deliverables:
                          </span>
                          {items.map((item) => (
                            <span
                              key={item}
                              className="bg-parchment border-stone-light/25 text-ink rounded-full border px-3 py-1 font-mono text-xs shadow-2xs"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
