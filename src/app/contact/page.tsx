"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { HiArrowUpRight } from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa";
import PageHeader from "@/components/layout/PageHeader";
import { contactConfig } from "@/lib/site-config";

// --- ANIMATION VARIANTS (Declared as const) ---

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1], // Custom editorial ease-out
    },
  },
} as const;

const errorVariants = {
  hidden: { opacity: 0, y: -4, height: 0 },
  visible: {
    opacity: 1,
    y: 0,
    height: "auto",
    transition: { duration: 0.2, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -4,
    height: 0,
    transition: { duration: 0.15, ease: "easeIn" },
  },
} as const;

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  subject: "General Inquiry",
  message: "",
};

const SUBJECT_OPTIONS = [
  "Brand Identity",
  "Digital Experience",
  "Strategic Advisory",
  "General Inquiry",
];

export default function ContactPage() {
  const prefersReducedMotion = useReducedMotion();
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<FormState>>({});

  function validate(): boolean {
    const nextErrors: Partial<FormState> = {};
    if (!form.name.trim()) nextErrors.name = "Name is required.";
    if (!form.email.trim()) {
      nextErrors.email = "Email address is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      nextErrors.email = "Please provide a valid email address.";
    }
    if (!form.message.trim()) nextErrors.message = "Please enter your message.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSend(method: "whatsapp" | "email") {
    if (!validate()) return;

    if (method === "whatsapp") {
      const whatsappMessage = `Hi Knight of Brands,\n\nName: ${form.name}\nTopic: ${form.subject}\n\n${form.message}\n\n(Reply to: ${form.email})`;
      const url = `https://wa.me/${contactConfig.whatsapp.number}?text=${encodeURIComponent(
        whatsappMessage
      )}`;
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      const subject = `[${form.subject}] Enquiry from ${form.name}`;
      const body = `${form.message}\n\n— ${form.name}\n${form.email}`;
      window.location.href = `mailto:${contactConfig.email}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
    }
  }

  function handleChange(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  return (
    <>
      <PageHeader
        eyebrow="Initiate Contact"
        title="Start the Conversation"
        description="We partner with select visionaries and brands aiming to define their market. Tell us about your vision."
      />

      <section className="bg-parchment text-ink px-6 pt-8 pb-32 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={containerVariants}
            initial={prefersReducedMotion ? "visible" : "hidden"}
            animate="visible"
            className="grid gap-20 lg:grid-cols-12 lg:gap-24"
          >
            {/* Left Column: Direct Agency Index & Details */}
            {/* Left Column: Refined Editorial Index & Direct Reach */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col justify-between gap-12 lg:col-span-5"
            >
              <div className="border-stone-light/20 relative overflow-hidden rounded-3xl border bg-stone-50/50 p-8 shadow-sm backdrop-blur-sm md:p-10">
                {/* Subtle Ambient Glow */}
                <div className="bg-ember/5 pointer-events-none absolute -top-16 -left-16 h-48 w-48 rounded-full blur-3xl" />

                {/* Section Header */}
                <div className="border-stone-light/15 mb-10 flex items-center justify-between border-b pb-6">
                  <span className="text-stone-light font-mono text-xs font-semibold tracking-widest uppercase">
                    Agency Directory
                  </span>
                  <span className="text-crimson-bright font-mono text-xs tracking-wider">
                    [HQ / NG]
                  </span>
                </div>

                <div className="space-y-8">
                  {/* 01. Direct Email */}
                  <a
                    href={`mailto:${contactConfig.email}`}
                    className="group border-stone-light/10 hover:border-stone-light/30 hover:bg-parchment/60 -mx-3 flex items-start justify-between rounded-2xl border p-3 transition-all duration-300"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-crimson-bright font-mono text-xs font-bold">
                          01 /
                        </span>
                        <span className="text-stone-light font-mono text-xs tracking-widest uppercase">
                          Direct Mail
                        </span>
                      </div>
                      <span className="font-display text-ink group-hover:text-crimson-bright block text-lg font-normal tracking-tight transition-colors md:text-xl">
                        {contactConfig.email}
                      </span>
                    </div>
                    <HiArrowUpRight className="text-stone-light group-hover:text-ink h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>

                  {/* 02. Direct Line */}
                  <a
                    href={`tel:${contactConfig.phone}`}
                    className="group border-stone-light/10 hover:border-stone-light/30 hover:bg-parchment/60 -mx-3 flex items-start justify-between rounded-2xl border p-3 transition-all duration-300"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-crimson-bright font-mono text-xs font-bold">
                          02 /
                        </span>
                        <span className="text-stone-light font-mono text-xs tracking-widest uppercase">
                          Telephone
                        </span>
                      </div>
                      <span className="text-stone text-ink group-hover:text-crimson-bright block font-mono text-base transition-colors md:text-lg">
                        {contactConfig.phone}
                      </span>
                    </div>
                    <HiArrowUpRight className="text-stone-light group-hover:text-ink h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>

                  {/* 03. Studio Address */}
                  <div className="border-stone-light/10 -mx-3 border-t p-3 pt-6">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="text-crimson-bright font-mono text-xs font-bold">
                        03 /
                      </span>
                      <span className="text-stone-light font-mono text-xs tracking-widest uppercase">
                        Location
                      </span>
                    </div>
                    <p className="font-body text-stone max-w-xs text-sm leading-relaxed">
                      {contactConfig.address}
                    </p>
                  </div>
                </div>

                {/* Footer Meta / Hours */}
                <div className="border-stone-light/15 mt-10 border-t pt-6">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-stone-light font-mono">Hours:</span>
                    <span className="text-stone font-mono font-medium">
                      09:00 — 18:00 WAT
                    </span>
                  </div>
                </div>
              </div>

              {/* Live Availability Note */}
              <div className="border-stone-light/20 bg-parchment/80 flex items-center gap-4 rounded-2xl border p-5 shadow-sm">
                <div className="relative flex h-3 w-3 shrink-0 items-center justify-center">
                  <span className="bg-crimson-bright absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
                  <span className="bg-crimson-bright relative inline-flex h-2.5 w-2.5 rounded-full" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-ink font-mono text-xs font-bold tracking-wider uppercase">
                    Currently Accepting Projects
                  </p>
                  <p className="font-body text-stone-light text-xs">
                    Typical initial response time is within 24 hours.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Editorial Minimalist Form */}
            <motion.div variants={itemVariants} className="lg:col-span-7">
              <form
                onSubmit={(e) => e.preventDefault()}
                noValidate
                className="space-y-12"
              >
                {/* Minimal Subject Selector Tabs */}
                <div>
                  <span className="text-stone-light mb-4 block font-mono text-xs tracking-widest uppercase">
                    Inquiry Type
                  </span>
                  <div className="border-stone-light/20 flex flex-wrap gap-x-6 gap-y-3 border-b pb-4">
                    {SUBJECT_OPTIONS.map((topic) => {
                      const isActive = form.subject === topic;
                      return (
                        <button
                          key={topic}
                          type="button"
                          onClick={() => handleChange("subject", topic)}
                          className={`font-body relative py-1 text-sm tracking-wide transition-all ${
                            isActive
                              ? "text-ink font-semibold"
                              : "text-stone-light hover:text-stone"
                          }`}
                        >
                          {topic}
                          {isActive && (
                            <motion.div
                              layoutId="activeUnderline"
                              className="bg-crimson-bright absolute right-0 bottom-0 left-0 h-0.5"
                              transition={{
                                duration: 0.3,
                                ease: [0.16, 1, 0.3, 1],
                              }}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Editorial Underlined Input - Name */}
                <div className="relative space-y-2">
                  <label
                    htmlFor="name"
                    className="text-stone-light block font-mono text-xs tracking-widest uppercase"
                  >
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="e.g. Samuel Adewale"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    aria-invalid={Boolean(errors.name)}
                    className="border-stone-light/30 font-display text-ink placeholder:text-stone-light/40 focus:border-ink w-full border-b bg-transparent py-3 text-xl transition-colors focus:outline-none"
                  />
                  <AnimatePresence>
                    {errors.name && (
                      <motion.p
                        variants={errorVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="text-crimson-bright pt-1 font-mono text-xs"
                      >
                        {errors.name}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Editorial Underlined Input - Email */}
                <div className="relative space-y-2">
                  <label
                    htmlFor="email"
                    className="text-stone-light block font-mono text-xs tracking-widest uppercase"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="samuel@brand.com"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    aria-invalid={Boolean(errors.email)}
                    className="border-stone-light/30 font-display text-ink placeholder:text-stone-light/40 focus:border-ink w-full border-b bg-transparent py-3 text-xl transition-colors focus:outline-none"
                  />
                  <AnimatePresence>
                    {errors.email && (
                      <motion.p
                        variants={errorVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="text-crimson-bright pt-1 font-mono text-xs"
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Editorial Underlined Textarea - Message */}
                <div className="relative space-y-2">
                  <label
                    htmlFor="message"
                    className="text-stone-light block font-mono text-xs tracking-widest uppercase"
                  >
                    Brief Overview
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Describe your objectives, timing, and project vision..."
                    value={form.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    aria-invalid={Boolean(errors.message)}
                    className="border-stone-light/30 font-body text-ink placeholder:text-stone-light/40 focus:border-ink w-full resize-none border-b bg-transparent py-3 text-base transition-colors focus:outline-none"
                  />
                  <AnimatePresence>
                    {errors.message && (
                      <motion.p
                        variants={errorVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="text-crimson-bright pt-1 font-mono text-xs"
                      >
                        {errors.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Minimalist Action Controls */}
                <div className="flex flex-col items-stretch gap-4 pt-6 sm:flex-row sm:items-center">
                  <button
                    type="button"
                    onClick={() => handleSend("whatsapp")}
                    className="group bg-ink text-parchment hover:bg-crimson-bright flex items-center justify-between gap-4 rounded-full px-8 py-5 text-xs font-bold tracking-widest uppercase transition-colors sm:justify-center"
                  >
                    <span className="flex items-center gap-2">
                      <FaWhatsapp className="h-4 w-4" />
                      Send via WhatsApp
                    </span>
                    <HiArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSend("email")}
                    className="group border-stone-light/40 text-ink hover:border-ink flex items-center justify-between gap-4 rounded-full border px-8 py-5 text-xs font-bold tracking-widest uppercase transition-colors sm:justify-center"
                  >
                    <span>Send via Email</span>
                    <HiArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
// import {
//   HiOutlineMail,
//   HiOutlinePhone,
//   HiOutlineLocationMarker,
//   HiOutlineCheckCircle,
//   HiArrowRight,
// } from "react-icons/hi";
// import { FaWhatsapp } from "react-icons/fa";
// import PageHeader from "@/components/layout/PageHeader";
// import { contactConfig } from "@/lib/site-config";

// // --- ANIMATION VARIANTS (Declared as const) ---

// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.12,
//       delayChildren: 0.05,
//     },
//   },
// } as const;

// const itemVariants = {
//   hidden: { opacity: 0, y: 24 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.6,
//       ease: [0.215, 0.61, 0.355, 1],
//     },
//   },
// } as const;

// const errorVariants = {
//   hidden: { opacity: 0, y: -6, height: 0 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     height: "auto",
//     transition: { duration: 0.25, ease: "easeOut" },
//   },
//   exit: {
//     opacity: 0,
//     y: -6,
//     height: 0,
//     transition: { duration: 0.2, ease: "easeIn" },
//   },
// } as const;

// type FormState = {
//   name: string;
//   email: string;
//   service: string;
//   budget: string;
//   message: string;
// };

// const SERVICES = [
//   "Brand Identity",
//   "Web Development",
//   "Marketing Strategy",
//   "UI/UX Design",
// ];

// const BUDGETS = ["<$5k", "$5k - $10k", "$10k - $25k", "$25k+"];

// const initialState: FormState = {
//   name: "",
//   email: "",
//   service: SERVICES[0],
//   budget: BUDGETS[1],
//   message: "",
// };

// export default function ContactPage() {
//   const prefersReducedMotion = useReducedMotion();
//   const [form, setForm] = useState<FormState>(initialState);
//   const [errors, setErrors] = useState<Partial<FormState>>({});
//   const [sendMethod, setSendMethod] = useState<"whatsapp" | "email">(
//     "whatsapp"
//   );

//   function validate(): boolean {
//     const nextErrors: Partial<FormState> = {};
//     if (!form.name.trim()) nextErrors.name = "Please enter your full name.";
//     if (!form.email.trim()) {
//       nextErrors.email = "Please enter your email address.";
//     } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
//       nextErrors.email = "Please enter a valid email address.";
//     }
//     if (!form.message.trim())
//       nextErrors.message = "Please share a few details about your project.";
//     setErrors(nextErrors);
//     return Object.keys(nextErrors).length === 0;
//   }

//   function handleSubmit(event: React.FormEvent) {
//     event.preventDefault();
//     if (!validate()) return;

//     if (sendMethod === "whatsapp") {
//       const whatsappMessage = `Hi Knight of Brands, my name is ${form.name}.\n\n*Service:* ${form.service}\n*Budget:* ${form.budget}\n\n*Project Details:*\n${form.message}\n\n(Reply to: ${form.email})`;
//       const url = `https://wa.me/${contactConfig.whatsapp.number}?text=${encodeURIComponent(
//         whatsappMessage
//       )}`;
//       window.open(url, "_blank", "noopener,noreferrer");
//     } else {
//       const subject = `New enquiry from ${form.name} — ${form.service}`;
//       const body = `Service Interested: ${form.service}\nEstimated Budget: ${form.budget}\n\nProject Details:\n${form.message}\n\n— ${form.name} (${form.email})`;
//       window.location.href = `mailto:${contactConfig.email}?subject=${encodeURIComponent(
//         subject
//       )}&body=${encodeURIComponent(body)}`;
//     }
//   }

//   function handleChange(field: keyof FormState, value: string) {
//     setForm((prev) => ({ ...prev, [field]: value }));
//     if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
//   }

//   return (
//     <>
//       <PageHeader
//         eyebrow="Contact"
//         title="Let's build something iconic."
//         description="Have a high-stakes project or brand transformation in mind? Share your vision and we will response swiftly."
//       />

//       <section className="bg-parchment border-stone-light/10 text-ink relative overflow-hidden border-t px-6 pt-12 pb-28 md:px-10 lg:pb-36">
//         <div className="mx-auto max-w-7xl">
//           <motion.div
//             variants={containerVariants}
//             initial={prefersReducedMotion ? "visible" : "hidden"}
//             animate="visible"
//             className="grid gap-12 lg:grid-cols-12 lg:gap-16"
//           >
//             {/* Main Interactive Form Area */}
//             <motion.form
//               variants={itemVariants}
//               onSubmit={handleSubmit}
//               noValidate
//               className="border-stone-light/30 bg-parchment/60 relative flex flex-col gap-8 rounded-3xl border p-8 shadow-xl backdrop-blur-sm md:p-12 lg:col-span-7"
//             >
//               {/* Service Selection Chips */}
//               <div>
//                 <label className="font-body text-ink mb-3 block text-xs font-bold tracking-widest uppercase">
//                   1. What service do you need?
//                 </label>
//                 <div className="flex flex-wrap gap-2.5">
//                   {SERVICES.map((srv) => {
//                     const isSelected = form.service === srv;
//                     return (
//                       <button
//                         key={srv}
//                         type="button"
//                         onClick={() => handleChange("service", srv)}
//                         className={`font-body relative rounded-full px-5 py-2.5 text-xs font-semibold tracking-wide transition-all ${
//                           isSelected
//                             ? "bg-ink text-parchment shadow-md"
//                             : "border-stone-light/30 bg-parchment text-stone hover:border-crimson-bright hover:text-ink border"
//                         }`}
//                       >
//                         {srv}
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>

//               {/* Budget Chips */}
//               <div>
//                 <label className="font-body text-ink mb-3 block text-xs font-bold tracking-widest uppercase">
//                   2. Expected Project Budget
//                 </label>
//                 <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
//                   {BUDGETS.map((bgt) => {
//                     const isSelected = form.budget === bgt;
//                     return (
//                       <button
//                         key={bgt}
//                         type="button"
//                         onClick={() => handleChange("budget", bgt)}
//                         className={`font-body rounded-xl px-4 py-3 text-center text-xs font-semibold transition-all ${
//                           isSelected
//                             ? "border-crimson-bright bg-crimson-bright/10 text-crimson-bright border-2"
//                             : "border-stone-light/30 bg-parchment text-stone hover:border-ink border"
//                         }`}
//                       >
//                         {bgt}
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>

//               {/* Text Fields */}
//               <div className="space-y-6">
//                 <div>
//                   <label
//                     htmlFor="name"
//                     className="font-body text-ink mb-2 block text-xs font-bold tracking-widest uppercase"
//                   >
//                     3. Your Name
//                   </label>
//                   <input
//                     id="name"
//                     type="text"
//                     placeholder="e.g. Alexander Vance"
//                     value={form.name}
//                     onChange={(e) => handleChange("name", e.target.value)}
//                     aria-invalid={Boolean(errors.name)}
//                     className={`font-body border-stone-light/30 bg-parchment text-ink focus:border-crimson-bright focus:ring-crimson-bright/20 w-full rounded-2xl border px-5 py-4 text-sm transition-all outline-none focus:ring-4 ${
//                       errors.name ? "border-crimson-bright" : ""
//                     }`}
//                   />
//                   <AnimatePresence>
//                     {errors.name && (
//                       <motion.p
//                         variants={errorVariants}
//                         initial="hidden"
//                         animate="visible"
//                         exit="exit"
//                         className="font-body text-crimson-bright mt-2 text-xs font-medium"
//                       >
//                         {errors.name}
//                       </motion.p>
//                     )}
//                   </AnimatePresence>
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="email"
//                     className="font-body text-ink mb-2 block text-xs font-bold tracking-widest uppercase"
//                   >
//                     4. Email Address
//                   </label>
//                   <input
//                     id="email"
//                     type="email"
//                     placeholder="alexander@company.com"
//                     value={form.email}
//                     onChange={(e) => handleChange("email", e.target.value)}
//                     aria-invalid={Boolean(errors.email)}
//                     className={`font-body border-stone-light/30 bg-parchment text-ink focus:border-crimson-bright focus:ring-crimson-bright/20 w-full rounded-2xl border px-5 py-4 text-sm transition-all outline-none focus:ring-4 ${
//                       errors.email ? "border-crimson-bright" : ""
//                     }`}
//                   />
//                   <AnimatePresence>
//                     {errors.email && (
//                       <motion.p
//                         variants={errorVariants}
//                         initial="hidden"
//                         animate="visible"
//                         exit="exit"
//                         className="font-body text-crimson-bright mt-2 text-xs font-medium"
//                       >
//                         {errors.email}
//                       </motion.p>
//                     )}
//                   </AnimatePresence>
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="message"
//                     className="font-body text-ink mb-2 block text-xs font-bold tracking-widest uppercase"
//                   >
//                     5. Project Scope & Goals
//                   </label>
//                   <textarea
//                     id="message"
//                     rows={5}
//                     placeholder="Tell us about your brand vision, key deliverables, and target timeline..."
//                     value={form.message}
//                     onChange={(e) => handleChange("message", e.target.value)}
//                     aria-invalid={Boolean(errors.message)}
//                     className={`font-body border-stone-light/30 bg-parchment text-ink focus:border-crimson-bright focus:ring-crimson-bright/20 w-full resize-none rounded-2xl border px-5 py-4 text-sm transition-all outline-none focus:ring-4 ${
//                       errors.message ? "border-crimson-bright" : ""
//                     }`}
//                   />
//                   <AnimatePresence>
//                     {errors.message && (
//                       <motion.p
//                         variants={errorVariants}
//                         initial="hidden"
//                         animate="visible"
//                         exit="exit"
//                         className="font-body text-crimson-bright mt-2 text-xs font-medium"
//                       >
//                         {errors.message}
//                       </motion.p>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className="border-stone-light/20 flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center">
//                 <motion.button
//                   whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
//                   whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
//                   type="submit"
//                   onClick={() => setSendMethod("whatsapp")}
//                   className="font-body bg-crimson-bright text-parchment hover:bg-ember focus-visible:outline-crimson-bright shadow-crimson-bright/20 inline-flex flex-1 items-center justify-center gap-3 rounded-full px-8 py-4 text-xs font-bold tracking-widest uppercase shadow-xl transition-all focus-visible:outline-2"
//                 >
//                   <FaWhatsapp className="h-4 w-4" />
//                   Send via WhatsApp
//                   <HiArrowRight className="h-4 w-4" />
//                 </motion.button>

//                 <motion.button
//                   whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
//                   whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
//                   type="submit"
//                   onClick={() => setSendMethod("email")}
//                   className="font-body border-stone-light/40 text-ink hover:border-ink hover:bg-ink hover:text-parchment focus-visible:outline-ink inline-flex items-center justify-center gap-2 rounded-full border px-8 py-4 text-xs font-bold tracking-widest uppercase transition-all focus-visible:outline-2"
//                 >
//                   <HiOutlineMail className="h-4 w-4" />
//                   Email Client
//                 </motion.button>
//               </div>

//               <p className="font-body text-stone-light text-center text-xs">
//                 ⚡ Direct dispatch — WhatsApp opens with your project summary
//                 prefilled.
//               </p>
//             </motion.form>

//             {/* Sidebar / Direct Details Area */}
//             <motion.div
//               variants={itemVariants}
//               className="flex flex-col gap-8 lg:col-span-5"
//             >
//               {/* Direct Info Card */}
//               <div className="bg-ink text-parchment border-parchment/10 relative overflow-hidden rounded-3xl border p-8 shadow-2xl md:p-10">
//                 <div className="bg-ember/10 pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full blur-3xl" />

//                 <h3 className="font-display text-2xl font-light tracking-tight md:text-3xl">
//                   Direct Inquiries
//                 </h3>
//                 <p className="font-body text-parchment/70 mt-2 text-sm leading-relaxed">
//                   Prefer a traditional introduction? Connect directly with our
//                   strategy team.
//                 </p>

//                 <ul className="mt-8 space-y-6">
//                   <li>
//                     <a
//                       href={`mailto:${contactConfig.email}`}
//                       className="group flex items-start gap-4 transition-colors"
//                     >
//                       <div className="bg-parchment/10 group-hover:bg-crimson-bright group-hover:text-parchment text-ember flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors">
//                         <HiOutlineMail className="h-5 w-5" />
//                       </div>
//                       <div>
//                         <span className="font-body text-parchment/50 block text-xs font-semibold tracking-wider uppercase">
//                           Email Us
//                         </span>
//                         <span className="text-parchment group-hover:text-ember font-mono text-sm transition-colors">
//                           {contactConfig.email}
//                         </span>
//                       </div>
//                     </a>
//                   </li>

//                   <li>
//                     <a
//                       href={`tel:${contactConfig.phone}`}
//                       className="group flex items-start gap-4 transition-colors"
//                     >
//                       <div className="bg-parchment/10 group-hover:bg-crimson-bright group-hover:text-parchment text-ember flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors">
//                         <HiOutlinePhone className="h-5 w-5" />
//                       </div>
//                       <div>
//                         <span className="font-body text-parchment/50 block text-xs font-semibold tracking-wider uppercase">
//                           Call Us Directly
//                         </span>
//                         <span className="text-parchment group-hover:text-ember font-mono text-sm transition-colors">
//                           {contactConfig.phone}
//                         </span>
//                       </div>
//                     </a>
//                   </li>

//                   <li className="flex items-start gap-4">
//                     <div className="bg-parchment/10 text-ember flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
//                       <HiOutlineLocationMarker className="h-5 w-5" />
//                     </div>
//                     <div>
//                       <span className="font-body text-parchment/50 block text-xs font-semibold tracking-wider uppercase">
//                         Headquarters
//                       </span>
//                       <span className="font-body text-parchment/90 text-sm leading-snug">
//                         {contactConfig.address}
//                       </span>
//                     </div>
//                   </li>
//                 </ul>

//                 <div className="border-parchment/10 mt-10 border-t pt-8">
//                   <Link
//                     href={`https://wa.me/${contactConfig.whatsapp.number}?text=${encodeURIComponent(
//                       contactConfig.whatsapp.defaultMessage
//                     )}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="group border-crimson-bright/40 text-parchment hover:bg-crimson-bright flex items-center justify-between rounded-2xl border bg-white/5 p-4 transition-all"
//                   >
//                     <span className="font-body text-xs font-bold tracking-widest uppercase">
//                       Quick WhatsApp Chat
//                     </span>
//                     <HiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
//                   </Link>
//                 </div>
//               </div>

//               {/* Guarantees Box */}
//               <div className="border-stone-light/30 bg-parchment/40 rounded-3xl border p-8">
//                 <h4 className="font-display text-ink text-lg font-semibold">
//                   What happens next?
//                 </h4>
//                 <ul className="mt-4 space-y-3">
//                   {[
//                     "Response within 24 business hours guaranteed.",
//                     "Direct consultation with lead design strategist.",
//                     "Customized scope & proposal roadmap provided.",
//                   ].map((text, idx) => (
//                     <li key={idx} className="flex items-start gap-3">
//                       <HiOutlineCheckCircle className="text-crimson-bright mt-0.5 h-4 w-4 shrink-0" />
//                       <span className="font-body text-stone text-xs leading-relaxed">
//                         {text}
//                       </span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </motion.div>
//           </motion.div>
//         </div>
//       </section>
//     </>
//   );
// }

// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { motion, useReducedMotion } from "framer-motion";
// import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from "react-icons/hi";
// import PageHeader from "@/components/layout/PageHeader";
// import { contactConfig } from "@/lib/site-config";

// type FormState = {
//   name: string;
//   email: string;
//   message: string;
// };

// const initialState: FormState = { name: "", email: "", message: "" };

// export default function ContactPage() {
//   const prefersReducedMotion = useReducedMotion();
//   const [form, setForm] = useState<FormState>(initialState);
//   const [errors, setErrors] = useState<Partial<FormState>>({});
//   const [sendMethod, setSendMethod] = useState<"whatsapp" | "email">(
//     "whatsapp"
//   );

//   function validate(): boolean {
//     const nextErrors: Partial<FormState> = {};
//     if (!form.name.trim()) nextErrors.name = "Please enter your name.";
//     if (!form.email.trim()) {
//       nextErrors.email = "Please enter your email.";
//     } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
//       nextErrors.email = "Please enter a valid email.";
//     }
//     if (!form.message.trim()) nextErrors.message = "Please enter a message.";
//     setErrors(nextErrors);
//     return Object.keys(nextErrors).length === 0;
//   }

// function handleSubmit(event: React.FormEvent) {
//   event.preventDefault();
//   if (!validate()) return;

//   if (sendMethod === "whatsapp") {
//     const whatsappMessage = `Hi Knight of Brands, my name is ${form.name}.\n\n${form.message}\n\n(Reply to: ${form.email})`;
//     const url = `https://wa.me/${contactConfig.whatsapp.number}?text=${encodeURIComponent(
//       whatsappMessage
//     )}`;
//     window.open(url, "_blank", "noopener,noreferrer");
//   } else {
//     const subject = `New enquiry from ${form.name}`;
//     const body = `${form.message}\n\n— ${form.name} (${form.email})`;
//     window.location.href = `mailto:${contactConfig.email}?subject=${encodeURIComponent(
//       subject
//     )}&body=${encodeURIComponent(body)}`;
//   }
// }

//   function handleChange(field: keyof FormState, value: string) {
//     setForm((prev) => ({ ...prev, [field]: value }));
//     if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
//   }

//   return (
//     <>
//       <PageHeader
//         eyebrow="Contact"
//         title="Let's Talk"
//         description="Tell us about your project and we'll get back to you — fastest via WhatsApp."
//       />

//       <section className="bg-parchment px-6 pb-24 md:px-10">
//         <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-[1.2fr_1fr] md:gap-16">
//           {/* Form */}
//           <motion.form
//             onSubmit={handleSubmit}
//             noValidate
//             initial={
//               prefersReducedMotion
//                 ? { opacity: 1, y: 0 }
//                 : { opacity: 0, y: 24 }
//             }
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, ease: "easeOut" as const }}
//             className="flex flex-col gap-5"
//           >
//             <div>
//               <label
//                 htmlFor="name"
//                 className="font-body text-ink mb-1.5 block text-sm font-medium"
//               >
//                 Name
//               </label>
//               <input
//                 id="name"
//                 type="text"
//                 value={form.name}
//                 onChange={(event) => handleChange("name", event.target.value)}
//                 aria-invalid={Boolean(errors.name)}
//                 aria-describedby={errors.name ? "name-error" : undefined}
//                 className="font-body border-stone-light/40 bg-parchment text-ink focus:border-crimson-bright w-full rounded-lg border px-4 py-3 text-sm outline-none"
//               />
//               {errors.name && (
//                 <p
//                   id="name-error"
//                   className="font-body text-crimson-bright mt-1.5 text-xs"
//                 >
//                   {errors.name}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label
//                 htmlFor="email"
//                 className="font-body text-ink mb-1.5 block text-sm font-medium"
//               >
//                 Email
//               </label>
//               <input
//                 id="email"
//                 type="email"
//                 value={form.email}
//                 onChange={(event) => handleChange("email", event.target.value)}
//                 aria-invalid={Boolean(errors.email)}
//                 aria-describedby={errors.email ? "email-error" : undefined}
//                 className="font-body border-stone-light/40 bg-parchment text-ink focus:border-crimson-bright w-full rounded-lg border px-4 py-3 text-sm outline-none"
//               />
//               {errors.email && (
//                 <p
//                   id="email-error"
//                   className="font-body text-crimson-bright mt-1.5 text-xs"
//                 >
//                   {errors.email}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label
//                 htmlFor="message"
//                 className="font-body text-ink mb-1.5 block text-sm font-medium"
//               >
//                 Message
//               </label>
//               <textarea
//                 id="message"
//                 rows={5}
//                 value={form.message}
//                 onChange={(event) =>
//                   handleChange("message", event.target.value)
//                 }
//                 aria-invalid={Boolean(errors.message)}
//                 aria-describedby={errors.message ? "message-error" : undefined}
//                 className="font-body border-stone-light/40 bg-parchment text-ink focus:border-crimson-bright w-full resize-none rounded-lg border px-4 py-3 text-sm outline-none"
//               />
//               {errors.message && (
//                 <p
//                   id="message-error"
//                   className="font-body text-crimson-bright mt-1.5 text-xs"
//                 >
//                   {errors.message}
//                 </p>
//               )}
//             </div>

//             <div className="mt-2 flex flex-col gap-3 sm:flex-row">
//               <button
//                 type="submit"
//                 onClick={() => setSendMethod("whatsapp")}
//                 className="font-body bg-crimson-bright text-parchment hover:bg-ember focus-visible:outline-crimson-bright inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
//               >
//                 Send via WhatsApp
//                 <span aria-hidden="true">→</span>
//               </button>
//               <button
//                 type="submit"
//                 onClick={() => setSendMethod("email")}
//                 className="font-body border-stone-light/40 text-ink hover:border-crimson-bright hover:text-crimson-bright focus-visible:outline-crimson-bright inline-flex items-center justify-center gap-2 rounded-full border px-7 py-3.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
//               >
//                 Send via Email
//               </button>
//             </div>
//             <p className="font-body text-stone-light text-xs">
//               WhatsApp opens instantly with your message ready to send. Email
//               opens your device's mail app prefilled — it may not work if you
//               don't have one set up.
//             </p>
//             <p className="font-body text-stone-light text-xs">
//               Opens WhatsApp with your message prefilled — nothing sends
//               automatically.
//             </p>
//           </motion.form>

//           {/* Contact info */}
//           <motion.div
//             initial={
//               prefersReducedMotion
//                 ? { opacity: 1, y: 0 }
//                 : { opacity: 0, y: 24 }
//             }
//             animate={{ opacity: 1, y: 0 }}
//             transition={{
//               duration: 0.5,
//               delay: prefersReducedMotion ? 0 : 0.1,
//               ease: "easeOut" as const,
//             }}
//             className="flex flex-col gap-6"
//           >
//             <div className="border-stone-light/20 rounded-2xl border p-6">
//               <h2 className="font-display text-ink text-lg font-semibold">
//                 Prefer to reach out directly?
//               </h2>
//               <ul className="mt-4 flex flex-col gap-4">
//                 <li>
//                   <a
//                     href={`mailto:${contactConfig.email}`}
//                     className="font-body text-stone hover:text-crimson-bright flex items-center gap-2.5 text-sm transition-colors"
//                   >
//                     <HiOutlineMail
//                       className="h-4 w-4 shrink-0"
//                       aria-hidden="true"
//                     />
//                     {contactConfig.email}
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href={`tel:${contactConfig.phone}`}
//                     className="font-body text-stone hover:text-crimson-bright flex items-center gap-2.5 text-sm transition-colors"
//                   >
//                     <HiOutlinePhone
//                       className="h-4 w-4 shrink-0"
//                       aria-hidden="true"
//                     />
//                     {contactConfig.phone}
//                   </a>
//                 </li>
//                 <li className="font-body text-stone flex items-start gap-2.5 text-sm">
//                   <HiOutlineLocationMarker
//                     className="mt-0.5 h-4 w-4 shrink-0"
//                     aria-hidden="true"
//                   />
//                   {contactConfig.address}
//                 </li>
//               </ul>
//             </div>

//             <Link
//               href={`https://wa.me/${contactConfig.whatsapp.number}?text=${encodeURIComponent(
//                 contactConfig.whatsapp.defaultMessage
//               )}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="font-body border-crimson-bright text-crimson-bright hover:bg-crimson-bright hover:text-parchment flex items-center justify-center gap-2 rounded-full border px-6 py-3.5 text-sm font-medium transition-colors"
//             >
//               Chat on WhatsApp Now
//               <span aria-hidden="true">→</span>
//             </Link>
//           </motion.div>
//         </div>
//       </section>
//     </>
//   );
// }
