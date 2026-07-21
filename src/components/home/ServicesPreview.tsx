"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  BrandingIcon,
  AdvertisingIcon,
  MarketingIcon,
  ConsultancyIcon,
} from "@/components/home/ServiceIcons";
import { services } from "@/lib/site-config";

const icons = [BrandingIcon, AdvertisingIcon, MarketingIcon, ConsultancyIcon];

export default function ServicesPreview() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-parchment-dim px-6 py-20 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="font-body text-crimson-bright text-sm font-semibold tracking-widest uppercase">
            What We Do
          </span>
          <h2 className="font-display text-ink max-w-xl text-3xl font-semibold md:text-4xl">
            Giving Your Business Some Great Ideas
          </h2>
        </div>

        <div className="border-stone-light/20 bg-stone-light/20 mt-14 grid gap-px overflow-hidden rounded-2xl border md:grid-cols-2">
          {services.map((service, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={service.href}
                initial={
                  prefersReducedMotion
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 20 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.5,
                  delay: prefersReducedMotion ? 0 : index * 0.1,
                  ease: "easeOut" as const,
                }}
                className="group bg-parchment-dim hover:bg-parchment p-8 transition-colors md:p-10"
              >
                <Link
                  href={service.href}
                  className="focus-visible:outline-crimson-bright flex flex-col gap-4 focus-visible:outline-2 focus-visible:outline-offset-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="bg-crimson-bright/10 text-crimson-bright flex h-14 w-14 items-center justify-center rounded-xl">
                      <Icon className="h-7 w-7" />
                    </div>
                    <span className="font-display text-stone-light/60 text-2xl font-semibold">
                      {service.number}
                    </span>
                  </div>
                  <h3 className="font-display text-ink text-xl font-semibold">
                    {service.title}
                  </h3>
                  <p className="font-body text-stone text-sm">
                    {service.description}
                  </p>
                  <span
                    aria-hidden="true"
                    className="font-body text-crimson-bright mt-1 inline-flex items-center gap-1.5 text-sm font-medium opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    Learn more →
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/services"
            className="font-body border-crimson-bright text-crimson-bright hover:bg-crimson-bright hover:text-parchment focus-visible:outline-crimson-bright inline-flex items-center gap-2 rounded-full border px-7 py-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            All Services
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
