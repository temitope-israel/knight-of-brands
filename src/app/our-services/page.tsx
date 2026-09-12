// src/app/services/page.tsx

"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, MessageSquare, Plus, Sparkles } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import CtaBand from "@/components/home/CtaBand";
import {
  BrandingIcon,
  AdvertisingIcon,
  MarketingIcon,
  ConsultancyIcon,
} from "@/components/home/ServiceIcons";
import { services, contactConfig } from "@/lib/site-config";

const icons = [BrandingIcon, AdvertisingIcon, MarketingIcon, ConsultancyIcon];
const anchors = ["branding", "advertising", "marketing", "consultancy"];

const serviceDeliverables: Record<string, string[]> = {
  Branding: [
    "Brand Architecture & Strategy",
    "Visual Identity & Typographic Systems",
    "Brand Guidelines & Tokenized Specs",
    "Collateral & High-Touch Packaging",
  ],
  Advertising: [
    "360° Multi-Channel Campaign Strategy",
    "Creative Direction & Editorial Copy",
    "Digital Performance & OOH Activations",
    "Media Placement & Analytics",
  ],
  Marketing: [
    "Content Strategy & Narrative Systems",
    "Social Media & Community Architecture",
    "SEO & Inbound Conversion Funnels",
    "Lifecycle & Marketing Automation",
  ],
  Consultancy: [
    "Brand Audits & Market Intelligence",
    "Go-To-Market (GTM) Strategy",
    "Executive Leadership Workshops",
    "Scalability & Growth Roadmaps",
  ],
};

// Interactive 3D Canvas Graphic
function Interactive3DGraphic({ index }: { index: number }) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotate({ x: y * -25, y: x * 25 });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  const graphics = [
    <div
      key="branding"
      className="relative h-28 w-28 [transform-style:preserve-3d]"
    >
      <div className="border-crimson-bright/40 bg-crimson-bright/10 absolute inset-0 [transform:translateZ(20px)] rounded-2xl border-2 backdrop-blur-sm" />
      <div className="border-stone/20 bg-ink/5 absolute inset-2 [transform:translateZ(-20px)] rounded-xl border" />
      <div className="border-crimson-bright/20 absolute inset-4 [transform:translateZ(40px)] rounded-lg border-2 border-dashed" />
    </div>,

    <div
      key="advertising"
      className="relative h-28 w-28 [transform-style:preserve-3d]"
    >
      <div className="border-crimson-bright/50 bg-crimson-bright/20 absolute inset-0 rotate-45 [transform:translateZ(30px)] border-2" />
      <div className="border-ink/20 bg-ink/10 absolute inset-3 -rotate-12 [transform:translateZ(-15px)] border" />
    </div>,

    <div
      key="marketing"
      className="relative h-28 w-28 [transform-style:preserve-3d]"
    >
      <div className="border-crimson-bright/60 absolute inset-0 [transform:translateZ(25px)] rounded-full border-2 border-dashed" />
      <div className="border-stone/30 bg-crimson-bright/15 absolute inset-4 [transform:translateZ(0px)] rounded-full border" />
      <div className="bg-ink/80 absolute inset-9 [transform:translateZ(45px)] rounded-full" />
    </div>,

    <div
      key="consultancy"
      className="relative h-28 w-28 [transform-style:preserve-3d]"
    >
      <div className="border-crimson-bright/40 bg-crimson-bright/10 absolute inset-0 rotate-12 [transform:translateZ(35px)] rounded-3xl border-2" />
      <div className="border-stone/20 bg-parchment-dim absolute inset-3 -rotate-6 [transform:translateZ(-20px)] rounded-2xl border" />
    </div>,
  ];

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-parchment/60 border-stone/15 flex h-48 w-full items-center justify-center rounded-2xl border backdrop-blur-md transition-transform duration-200 ease-out [perspective:1000px] lg:h-56"
    >
      <div
        className="transition-transform duration-200 ease-out [transform-style:preserve-3d]"
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        }}
      >
        {graphics[index % graphics.length]}
      </div>
    </div>
  );
}

// Service Card component with explicit useInView hook
function ServiceCard({
  service,
  index,
  deliverables,
}: {
  service: (typeof services)[number];
  index: number;
  deliverables: string[];
}) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  const Icon = icons[index];
  const anchorId = anchors[index];
  const whatsappMessage = `Hi Knight of Brands, I'd like to consult on ${service.title} for my business.`;

  return (
    <motion.article
      ref={ref}
      id={anchorId}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group border-stone/15 bg-parchment-dim/30 hover:border-stone/30 hover:shadow-crimson-bright/10 relative scroll-mt-36 overflow-hidden rounded-3xl border p-8 transition-all duration-500 hover:shadow-2xl md:p-12 lg:p-16"
    >
      <div className="bg-crimson-bright/10 pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

      <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
        {/* Left Column */}
        <div className="space-y-8 lg:col-span-5">
          <div className="flex items-center justify-between">
            <div className="bg-parchment text-crimson-bright border-stone/15 group-hover:border-crimson-bright/40 group-hover:bg-crimson-bright group-hover:text-parchment flex h-16 w-16 items-center justify-center rounded-2xl border shadow-sm transition-all duration-300">
              <Icon className="h-8 w-8 transition-transform duration-300 group-hover:scale-110" />
            </div>
            <span className="text-stone-light/30 font-mono text-5xl font-light tracking-tighter">
              {service.number}
            </span>
          </div>

          <div className="space-y-2">
            <span className="font-body text-crimson-bright text-xs font-bold tracking-widest uppercase">
              Practice Area 0{index + 1}
            </span>
            <h2 className="font-display text-ink text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
              {service.title}
            </h2>
          </div>

          <Interactive3DGraphic index={index} />

          <div className="pt-2">
            <Link
              href={`https://wa.me/${contactConfig.whatsapp.number}?text=${encodeURIComponent(
                whatsappMessage
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn bg-ink text-parchment hover:bg-crimson-bright inline-flex w-full items-center justify-center gap-3 rounded-full px-6 py-4 text-xs font-bold tracking-widest uppercase shadow-lg transition-all duration-300 sm:w-auto"
            >
              <span>Consult on {service.title}</span>
              <MessageSquare className="h-4 w-4 transition-transform group-hover/btn:scale-110" />
            </Link>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:border-stone/10 space-y-10 lg:col-span-7 lg:border-l lg:pl-12">
          <p className="font-body text-stone text-lg leading-relaxed md:text-xl">
            {service.description}
          </p>

          <div className="border-stone/10 border-t pt-8">
            <h3 className="font-body text-stone-light mb-6 text-xs font-bold tracking-widest uppercase">
              Scope & Strategic Capabilities
            </h3>
            <ul className="grid gap-4 sm:grid-cols-2">
              {deliverables.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -16 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }
                  }
                  transition={{
                    delay: 0.15 + i * 0.08,
                    duration: 0.4,
                    ease: "easeOut",
                  }}
                  className="font-body text-ink flex items-center gap-3 text-sm font-medium"
                >
                  <span className="bg-crimson-bright/10 text-crimson-bright flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
                    <Plus className="h-3 w-3" />
                  </span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="border-stone/10 border-t pt-6">
            <Link
              href="/contact"
              className="text-stone hover:text-crimson-bright group/link font-body inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase transition-colors"
            >
              Request tailored proposal
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function ServicesPage() {
  const navRef = useRef<HTMLDivElement>(null);

  return (
    <main className="bg-parchment text-ink selection:bg-crimson-bright selection:text-parchment min-h-screen">
      {/* Header animation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <PageHeader
          eyebrow="Capabilities & Disciplines"
          title="Engineering Unforgettable Brands"
          description="Four interconnected practices built to take enterprise and high-growth businesses from positioning to market dominance."
        />
      </motion.div>

      {/* Navigation Bar */}
      <nav
        ref={navRef}
        aria-label="Services Navigation"
        className="border-stone/15 bg-parchment/85 sticky top-20 z-30 border-y py-3.5 backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 md:px-10">
          <div className="flex items-center gap-2">
            <Sparkles className="text-crimson-bright h-3.5 w-3.5 animate-pulse" />
            <span className="font-body text-stone hidden text-xs font-semibold tracking-widest uppercase md:inline-block">
              Disciplines Index
            </span>
          </div>
          <div className="no-scrollbar flex w-full items-center justify-start gap-1.5 overflow-x-auto md:w-auto md:justify-end">
            {services.map((service, index) => (
              <a
                key={service.title}
                href={`#${anchors[index]}`}
                className="font-body border-stone/15 text-stone hover:border-crimson-bright hover:bg-crimson-bright/5 hover:text-crimson-bright shrink-0 rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wider transition-all duration-200"
              >
                [{service.number}] {service.title}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Services Section */}
      <section className="px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-6xl space-y-20 md:space-y-32">
          {services.map((service, index) => {
            const deliverables = serviceDeliverables[service.title] || [];
            return (
              <ServiceCard
                key={service.title}
                service={service}
                index={index}
                deliverables={deliverables}
              />
            );
          })}
        </div>
      </section>

      {/* Call to Action Band */}
      <CtaBand />
    </main>
  );
}

// // src/app/services/page.tsx

// "use client";

// import React, { useRef, useState } from "react";
// import Link from "next/link";
// import { motion, Variants } from "framer-motion";
// import { ArrowUpRight, MessageSquare, Plus, Sparkles } from "lucide-react";
// import PageHeader from "@/components/layout/PageHeader";
// import CtaBand from "@/components/home/CtaBand";
// import {
//   BrandingIcon,
//   AdvertisingIcon,
//   MarketingIcon,
//   ConsultancyIcon,
// } from "@/components/home/ServiceIcons";
// import { services, contactConfig } from "@/lib/site-config";

// const icons = [BrandingIcon, AdvertisingIcon, MarketingIcon, ConsultancyIcon];
// const anchors = ["branding", "advertising", "marketing", "consultancy"];

// const serviceDeliverables: Record<string, string[]> = {
//   Branding: [
//     "Brand Architecture & Strategy",
//     "Visual Identity & Typographic Systems",
//     "Brand Guidelines & Tokenized Specs",
//     "Collateral & High-Touch Packaging",
//   ],
//   Advertising: [
//     "360° Multi-Channel Campaign Strategy",
//     "Creative Direction & Editorial Copy",
//     "Digital Performance & OOH Activations",
//     "Media Placement & Analytics",
//   ],
//   Marketing: [
//     "Content Strategy & Narrative Systems",
//     "Social Media & Community Architecture",
//     "SEO & Inbound Conversion Funnels",
//     "Lifecycle & Marketing Automation",
//   ],
//   Consultancy: [
//     "Brand Audits & Market Intelligence",
//     "Go-To-Market (GTM) Strategy",
//     "Executive Leadership Workshops",
//     "Scalability & Growth Roadmaps",
//   ],
// };

// // Interactive 3D Canvas Graphic
// function Interactive3DGraphic({ index }: { index: number }) {
//   const [rotate, setRotate] = useState({ x: 0, y: 0 });

//   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     const rect = e.currentTarget.getBoundingClientRect();
//     const x = (e.clientX - rect.left) / rect.width - 0.5;
//     const y = (e.clientY - rect.top) / rect.height - 0.5;
//     setRotate({ x: y * -25, y: x * 25 });
//   };

//   const handleMouseLeave = () => {
//     setRotate({ x: 0, y: 0 });
//   };

//   const graphics = [
//     <div
//       key="branding"
//       className="relative h-28 w-28 [transform-style:preserve-3d]"
//     >
//       <div className="border-crimson-bright/40 bg-crimson-bright/10 absolute inset-0 [transform:translateZ(20px)] rounded-2xl border-2 backdrop-blur-sm" />
//       <div className="border-stone/20 bg-ink/5 absolute inset-2 [transform:translateZ(-20px)] rounded-xl border" />
//       <div className="border-crimson-bright/20 absolute inset-4 [transform:translateZ(40px)] rounded-lg border-2 border-dashed" />
//     </div>,

//     <div
//       key="advertising"
//       className="relative h-28 w-28 [transform-style:preserve-3d]"
//     >
//       <div className="border-crimson-bright/50 bg-crimson-bright/20 absolute inset-0 rotate-45 [transform:translateZ(30px)] border-2" />
//       <div className="border-ink/20 bg-ink/10 absolute inset-3 -rotate-12 [transform:translateZ(-15px)] border" />
//     </div>,

//     <div
//       key="marketing"
//       className="relative h-28 w-28 [transform-style:preserve-3d]"
//     >
//       <div className="border-crimson-bright/60 absolute inset-0 [transform:translateZ(25px)] rounded-full border-2 border-dashed" />
//       <div className="border-stone/30 bg-crimson-bright/15 absolute inset-4 [transform:translateZ(0px)] rounded-full border" />
//       <div className="bg-ink/80 absolute inset-9 [transform:translateZ(45px)] rounded-full" />
//     </div>,

//     <div
//       key="consultancy"
//       className="relative h-28 w-28 [transform-style:preserve-3d]"
//     >
//       <div className="border-crimson-bright/40 bg-crimson-bright/10 absolute inset-0 rotate-12 [transform:translateZ(35px)] rounded-3xl border-2" />
//       <div className="border-stone/20 bg-parchment-dim absolute inset-3 -rotate-6 [transform:translateZ(-20px)] rounded-2xl border" />
//     </div>,
//   ];

//   return (
//     <div
//       onMouseMove={handleMouseMove}
//       onMouseLeave={handleMouseLeave}
//       className="bg-parchment/60 border-stone/15 flex h-48 w-full items-center justify-center rounded-2xl border backdrop-blur-md transition-transform duration-200 ease-out [perspective:1000px] lg:h-56"
//     >
//       <div
//         className="transition-transform duration-200 ease-out [transform-style:preserve-3d]"
//         style={{
//           transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
//         }}
//       >
//         {graphics[index % graphics.length]}
//       </div>
//     </div>
//   );
// }

// // Standalone Motion Article to isolate intersection observer state
// function ServiceCard({
//   service,
//   index,
//   deliverables,
// }: {
//   service: (typeof services)[number];
//   index: number;
//   deliverables: string[];
// }) {
//   const Icon = icons[index];
//   const anchorId = anchors[index];
//   const whatsappMessage = `Hi Knight of Brands, I'd like to consult on ${service.title} for my business.`;

//   const cardVariants: Variants = {
//     offscreen: { opacity: 0, y: 60 },
//     onscreen: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         type: "spring",
//         bounce: 0.2,
//         duration: 0.9,
//       },
//     },
//   };

//   const deliverableVariants: Variants = {
//     offscreen: { opacity: 0, x: -16 },
//     onscreen: (i: number) => ({
//       opacity: 1,
//       x: 0,
//       transition: {
//         delay: 0.2 + i * 0.08,
//         duration: 0.4,
//         ease: "easeOut",
//       },
//     }),
//   };

//   return (
//     <motion.article
//       id={anchorId}
//       initial="offscreen"
//       whileInView="onscreen"
//       viewport={{ once: true, margin: "-50px" }}
//       variants={cardVariants}
//       className="group border-stone/15 bg-parchment-dim/30 hover:border-stone/30 hover:shadow-crimson-bright/10 relative scroll-mt-36 overflow-hidden rounded-3xl border p-8 transition-all duration-500 hover:shadow-2xl md:p-12 lg:p-16"
//     >
//       <div className="bg-crimson-bright/10 pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

//       <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
//         {/* Left Column */}
//         <div className="space-y-8 lg:col-span-5">
//           <div className="flex items-center justify-between">
//             <div className="bg-parchment text-crimson-bright border-stone/15 group-hover:border-crimson-bright/40 group-hover:bg-crimson-bright group-hover:text-parchment flex h-16 w-16 items-center justify-center rounded-2xl border shadow-sm transition-all duration-300">
//               <Icon className="h-8 w-8 transition-transform duration-300 group-hover:scale-110" />
//             </div>
//             <span className="text-stone-light/30 font-mono text-5xl font-light tracking-tighter">
//               {service.number}
//             </span>
//           </div>

//           <div className="space-y-2">
//             <span className="font-body text-crimson-bright text-xs font-bold tracking-widest uppercase">
//               Practice Area 0{index + 1}
//             </span>
//             <h2 className="font-display text-ink text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
//               {service.title}
//             </h2>
//           </div>

//           <Interactive3DGraphic index={index} />

//           <div className="pt-2">
//             <Link
//               href={`https://wa.me/${contactConfig.whatsapp.number}?text=${encodeURIComponent(
//                 whatsappMessage
//               )}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="group/btn bg-ink text-parchment hover:bg-crimson-bright inline-flex w-full items-center justify-center gap-3 rounded-full px-6 py-4 text-xs font-bold tracking-widest uppercase shadow-lg transition-all duration-300 sm:w-auto"
//             >
//               <span>Consult on {service.title}</span>
//               <MessageSquare className="h-4 w-4 transition-transform group-hover/btn:scale-110" />
//             </Link>
//           </div>
//         </div>

//         {/* Right Column */}
//         <div className="lg:border-stone/10 space-y-10 lg:col-span-7 lg:border-l lg:pl-12">
//           <p className="font-body text-stone text-lg leading-relaxed md:text-xl">
//             {service.description}
//           </p>

//           <div className="border-stone/10 border-t pt-8">
//             <h3 className="font-body text-stone-light mb-6 text-xs font-bold tracking-widest uppercase">
//               Scope & Strategic Capabilities
//             </h3>
//             <ul className="grid gap-4 sm:grid-cols-2">
//               {deliverables.map((item, i) => (
//                 <motion.li
//                   key={item}
//                   custom={i}
//                   initial="offscreen"
//                   whileInView="onscreen"
//                   viewport={{ once: true }}
//                   variants={deliverableVariants}
//                   className="font-body text-ink flex items-center gap-3 text-sm font-medium"
//                 >
//                   <span className="bg-crimson-bright/10 text-crimson-bright flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
//                     <Plus className="h-3 w-3" />
//                   </span>
//                   <span>{item}</span>
//                 </motion.li>
//               ))}
//             </ul>
//           </div>

//           <div className="border-stone/10 border-t pt-6">
//             <Link
//               href="/contact"
//               className="text-stone hover:text-crimson-bright group/link font-body inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase transition-colors"
//             >
//               Request tailored proposal
//               <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
//             </Link>
//           </div>
//         </div>
//       </div>
//     </motion.article>
//   );
// }

// export default function ServicesPage() {
//   const navRef = useRef<HTMLDivElement>(null);

//   return (
//     <main className="bg-parchment text-ink selection:bg-crimson-bright selection:text-parchment min-h-screen">
//       {/* Header with entrance animation */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         <PageHeader
//           eyebrow="Capabilities & Disciplines"
//           title="Engineering Unforgettable Brands"
//           description="Four interconnected practices built to take enterprise and high-growth businesses from positioning to market dominance."
//         />
//       </motion.div>

//       {/* Navigation Bar */}
//       <nav
//         ref={navRef}
//         aria-label="Services Navigation"
//         className="border-stone/15 bg-parchment/85 sticky top-20 z-30 border-y py-3.5 backdrop-blur-md"
//       >
//         <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 md:px-10">
//           <div className="flex items-center gap-2">
//             <Sparkles className="text-crimson-bright h-3.5 w-3.5 animate-pulse" />
//             <span className="font-body text-stone hidden text-xs font-semibold tracking-widest uppercase md:inline-block">
//               Disciplines Index
//             </span>
//           </div>
//           <div className="no-scrollbar flex w-full items-center justify-start gap-1.5 overflow-x-auto md:w-auto md:justify-end">
//             {services.map((service, index) => (
//               <a
//                 key={service.title}
//                 href={`#${anchors[index]}`}
//                 className="font-body border-stone/15 text-stone hover:border-crimson-bright hover:bg-crimson-bright/5 hover:text-crimson-bright shrink-0 rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wider transition-all duration-200"
//               >
//                 [{service.number}] {service.title}
//               </a>
//             ))}
//           </div>
//         </div>
//       </nav>

//       {/* Main Services Section */}
//       <section className="px-6 py-20 md:px-10 md:py-28">
//         <div className="mx-auto max-w-6xl space-y-20 md:space-y-32">
//           {services.map((service, index) => {
//             const deliverables = serviceDeliverables[service.title] || [];
//             return (
//               <ServiceCard
//                 key={service.title}
//                 service={service}
//                 index={index}
//                 deliverables={deliverables}
//               />
//             );
//           })}
//         </div>
//       </section>

//       {/* Call to Action Band */}
//       <CtaBand />
//     </main>
//   );
// }

// // src/app/services/page.tsx

// "use client";

// import { useRef } from "react";
// import Link from "next/link";
// import { motion, useReducedMotion, Variants } from "framer-motion";
// import { ArrowUpRight, MessageSquare, Plus, Sparkles } from "lucide-react";
// import PageHeader from "@/components/layout/PageHeader";
// import CtaBand from "@/components/home/CtaBand";
// import {
//   BrandingIcon,
//   AdvertisingIcon,
//   MarketingIcon,
//   ConsultancyIcon,
// } from "@/components/home/ServiceIcons";
// import { services, contactConfig } from "@/lib/site-config";

// const icons = [BrandingIcon, AdvertisingIcon, MarketingIcon, ConsultancyIcon];
// const anchors = ["branding", "advertising", "marketing", "consultancy"];

// // High-end agency deliverables
// const serviceDeliverables: Record<string, string[]> = {
//   Branding: [
//     "Brand Architecture & Strategy",
//     "Visual Identity & Typographic Systems",
//     "Brand Guidelines & Tokenized Specs",
//     "Collateral & High-Touch Packaging",
//   ],
//   Advertising: [
//     "360° Multi-Channel Campaign Strategy",
//     "Creative Direction & Editorial Copy",
//     "Digital Performance & OOH Activations",
//     "Media Placement & Analytics",
//   ],
//   Marketing: [
//     "Content Strategy & Narrative Systems",
//     "Social Media & Community Architecture",
//     "SEO & Inbound Conversion Funnels",
//     "Lifecycle & Marketing Automation",
//   ],
//   Consultancy: [
//     "Brand Audits & Market Intelligence",
//     "Go-To-Market (GTM) Strategy",
//     "Executive Leadership Workshops",
//     "Scalability & Growth Roadmaps",
//   ],
// };

// export default function ServicesPage() {
//   const prefersReducedMotion = useReducedMotion();
//   const navRef = useRef<HTMLDivElement>(null);

//   // Animation Variants with explicit const assertions
//   const containerVariants: Variants = {
//     hidden: { opacity: prefersReducedMotion ? 1 : 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: prefersReducedMotion ? 0 : 0.18,
//         delayChildren: 0.1,
//       },
//     },
//   } as const;

//   const itemVariants: Variants = {
//     hidden: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.7,
//         ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for agency snap
//       },
//     },
//   } as const;

//   const deliverableVariants: Variants = {
//     hidden: prefersReducedMotion
//       ? { opacity: 1, x: 0 }
//       : { opacity: 0, x: -12 },
//     visible: {
//       opacity: 1,
//       x: 0,
//       transition: { duration: 0.4, ease: "easeOut" },
//     },
//   } as const;

//   return (
//     <main className="bg-parchment text-ink selection:bg-crimson-bright selection:text-parchment min-h-screen">
//       {/* Editorial Page Header */}
//       <PageHeader
//         eyebrow="Capabilities & Disciplines"
//         title="Engineering Unforgettable Brands"
//         description="Four interconnected practices built to take enterprise and high-growth businesses from positioning to market dominance."
//       />

//       {/* Agency Quick-Jump Navigation Bar */}
//       <nav
//         ref={navRef}
//         aria-label="Services Navigation"
//         className="border-stone/15 bg-parchment/85 sticky top-20 z-30 border-y py-3.5 backdrop-blur-md"
//       >
//         <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 md:px-10">
//           <div className="flex items-center gap-2">
//             <Sparkles className="text-crimson-bright h-3.5 w-3.5" />
//             <span className="font-body text-stone hidden text-xs font-semibold tracking-widest uppercase md:inline-block">
//               Index
//             </span>
//           </div>
//           <div className="no-scrollbar flex w-full items-center justify-start gap-1.5 overflow-x-auto md:w-auto md:justify-end">
//             {services.map((service, index) => (
//               <a
//                 key={service.title}
//                 href={`#${anchors[index]}`}
//                 className="font-body border-stone/10 text-stone hover:border-crimson-bright hover:bg-crimson-bright/5 hover:text-crimson-bright shrink-0 rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wider transition-all duration-200"
//               >
//                 [{service.number}] {service.title}
//               </a>
//             ))}
//           </div>
//         </div>
//       </nav>

//       {/* Main Services Section */}
//       <section className="px-6 py-20 md:px-10 md:py-28">
//         <motion.div
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-80px" }}
//           variants={containerVariants}
//           className="mx-auto max-w-6xl space-y-20 md:space-y-32"
//         >
//           {services.map((service, index) => {
//             const Icon = icons[index];
//             const anchorId = anchors[index];
//             const deliverables = serviceDeliverables[service.title] || [];
//             const whatsappMessage = `Hi Knight of Brands, I'd like to consult on ${service.title} for my business.`;

//             return (
//               <motion.article
//                 key={service.title}
//                 id={anchorId}
//                 variants={itemVariants}
//                 className="group border-stone/15 bg-parchment-dim/30 hover:border-stone/30 hover:shadow-crimson-bright/5 relative scroll-mt-36 overflow-hidden rounded-2xl border p-8 transition-all duration-500 hover:shadow-2xl md:p-12 lg:p-16"
//               >
//                 {/* Subtle Ambient Crimson Accent Mesh in Top Right */}
//                 <div className="bg-crimson-bright/5 pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

//                 <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
//                   {/* Left Header Column */}
//                   <div className="space-y-8 lg:col-span-5">
//                     <div className="flex items-center justify-between">
//                       {/* Icon container with border hover effect */}
//                       <div className="bg-parchment text-crimson-bright border-stone/15 group-hover:border-crimson-bright/40 group-hover:bg-crimson-bright group-hover:text-parchment flex h-16 w-16 items-center justify-center rounded-xl border transition-all duration-300">
//                         <Icon className="h-8 w-8 transition-transform duration-300 group-hover:scale-110" />
//                       </div>
//                       <span className="text-stone-light/30 font-mono text-5xl font-light tracking-tighter">
//                         {service.number}
//                       </span>
//                     </div>

//                     <div className="space-y-2">
//                       <span className="font-body text-crimson-bright text-xs font-bold tracking-widest uppercase">
//                         Service 0{index + 1}
//                       </span>
//                       <h2 className="font-display text-ink text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
//                         {service.title}
//                       </h2>
//                     </div>

//                     {/* Direct Contact Button */}
//                     <div className="pt-2">
//                       <Link
//                         href={`https://wa.me/${contactConfig.whatsapp.number}?text=${encodeURIComponent(
//                           whatsappMessage
//                         )}`}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="group/btn bg-ink text-parchment hover:bg-crimson-bright inline-flex items-center gap-3 rounded-full px-6 py-3.5 text-xs font-bold tracking-widest uppercase shadow-lg transition-all duration-300"
//                       >
//                         <span>Discuss {service.title}</span>
//                         <MessageSquare className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
//                       </Link>
//                     </div>
//                   </div>

//                   {/* Right Content Column */}
//                   <div className="lg:border-stone/10 space-y-10 lg:col-span-7 lg:border-l lg:pl-12">
//                     <p className="font-body text-stone text-lg leading-relaxed md:text-xl">
//                       {service.description}
//                     </p>

//                     {/* Deliverables List with Micro-animations */}
//                     <div className="border-stone/10 border-t pt-8">
//                       <h3 className="font-body text-stone-light mb-6 text-xs font-bold tracking-widest uppercase">
//                         Scope & Strategic Deliverables
//                       </h3>
//                       <motion.ul
//                         initial="hidden"
//                         whileInView="visible"
//                         viewport={{ once: true }}
//                         transition={{ staggerChildren: 0.08 }}
//                         className="grid gap-4 sm:grid-cols-2"
//                       >
//                         {deliverables.map((item) => (
//                           <motion.li
//                             key={item}
//                             variants={deliverableVariants}
//                             className="font-body text-ink flex items-center gap-3 text-sm font-medium"
//                           >
//                             <span className="bg-crimson-bright/10 text-crimson-bright flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
//                               <Plus className="h-3 w-3" />
//                             </span>
//                             <span>{item}</span>
//                           </motion.li>
//                         ))}
//                       </motion.ul>
//                     </div>

//                     {/* Proposal Request Link */}
//                     <div className="border-stone/10 border-t pt-6">
//                       <Link
//                         href="/contact"
//                         className="text-stone hover:text-crimson-bright group/link font-body inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase transition-colors"
//                       >
//                         Request tailored proposal
//                         <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </motion.article>
//             );
//           })}
//         </motion.div>
//       </section>

//       {/* Primary Call to Action Band */}
//       <CtaBand />
//     </main>
//   );
// }

// //src/app/services/page.tsx

// import type { Metadata } from "next";
// import Link from "next/link";
// import PageHeader from "@/components/layout/PageHeader";
// import CtaBand from "@/components/home/CtaBand";
// import {
//   BrandingIcon,
//   AdvertisingIcon,
//   MarketingIcon,
//   ConsultancyIcon,
// } from "@/components/home/ServiceIcons";
// import { services, contactConfig } from "@/lib/site-config";

// export const metadata: Metadata = {
//   title: "Services | Knight of Brands",
//   description:
//     "Branding, advertising, marketing, and consultancy services from Knight of Brands — helping ambitious businesses build memorable brands.",
// };

// const icons = [BrandingIcon, AdvertisingIcon, MarketingIcon, ConsultancyIcon];
// const anchors = ["branding", "advertising", "marketing", "consultancy"];

// export default function ServicesPage() {
//   return (
//     <>
//       <PageHeader
//         eyebrow="What We Do"
//         title="Our Services"
//         description="Four disciplines, one goal — helping ambitious businesses build brands that last."
//       />

//       <section className="bg-parchment px-6 pb-24 md:px-10">
//         <div className="divide-stone-light/20 mx-auto flex max-w-4xl flex-col divide-y">
//           {services.map((service, index) => {
//             const Icon = icons[index];
//             const whatsappMessage = `Hi Knight of Brands, I'd like to talk about ${service.title}.`;
//             return (
//               <div
//                 key={service.title}
//                 id={anchors[index]}
//                 className="scroll-mt-28 py-12 first:pt-0 md:py-16"
//               >
//                 <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
//                   <div className="flex items-center gap-4 md:w-64 md:flex-col md:items-start">
//                     <div className="bg-crimson-bright/10 text-crimson-bright flex h-16 w-16 shrink-0 items-center justify-center rounded-xl">
//                       <Icon className="h-8 w-8" />
//                     </div>
//                     <div className="flex items-center gap-3 md:mt-2">
//                       <span className="font-display text-stone-light text-lg">
//                         {service.number}
//                       </span>
//                       <h2 className="font-display text-ink text-2xl font-semibold md:text-3xl">
//                         {service.title}
//                       </h2>
//                     </div>
//                   </div>

//                   <div className="flex flex-1 flex-col gap-4">
//                     <p className="font-body text-stone max-w-xl text-base md:text-lg">
//                       {service.description}
//                     </p>
//                     <Link
//                       href={`https://wa.me/${contactConfig.whatsapp.number}?text=${encodeURIComponent(
//                         whatsappMessage
//                       )}`}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="font-body text-crimson-bright hover:text-ember inline-flex w-fit items-center gap-1.5 text-sm font-medium transition-colors"
//                     >
//                       Discuss {service.title}
//                       <span aria-hidden="true">→</span>
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </section>

//       <CtaBand />
//     </>
//   );
// }
