import Link from "next/link";
import HeroHeadline from "@/components/home/HeroHeadline";
import { siteConfig } from "@/lib/site-config";

export default function Hero() {
  return (
    <section className="from-crimson-bright via-crimson-dark to-ink relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b px-6 pt-32 pb-20 text-center">
      {/* Radial highlight layer — adds depth on top of the linear base */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_0%,_var(--color-crimson-bright)_0%,_transparent_70%)]" />

      {/* Decorative watermark artwork — approximated from the reference
          mockup (concentric rings, dot grid, outline circle). Not the
          brand's seal mark; that's a separate signature element still
          parked pending real artwork. */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.22]"
        stroke="white"
        fill="none"
      >
        {/* Concentric rings, top-left */}
        <circle cx="60" cy="60" r="70" strokeWidth="1" />
        <circle cx="60" cy="60" r="110" strokeWidth="1" />
        <circle cx="60" cy="60" r="150" strokeWidth="1" />

        {/* Diagonal dot trail, center-left flowing down */}
        {Array.from({ length: 10 }).map((_, i) => (
          <circle
            key={i}
            cx={30 + i * 14}
            cy={340 + i * 26}
            r="2.5"
            fill="white"
            stroke="none"
          />
        ))}

        {/* Large outline circle, bottom-right, bleeding off-canvas */}
        <circle cx="100%" cy="95%" r="180" strokeWidth="1" />
        <circle cx="100%" cy="95%" r="140" strokeWidth="1" />
      </svg>

      <div className="relative z-10 flex max-w-3xl flex-col items-center gap-6">
        <HeroHeadline tagline={siteConfig.tagline} />

        <p className="font-body max-w-xl text-base text-white/85 md:text-lg">
          Helping ambitious businesses build memorable brands through strategy,
          design, and digital experiences.
        </p>

        <div className="mt-2 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/work"
            className="font-body bg-crimson-bright text-parchment hover:bg-ember focus-visible:outline-parchment inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            Explore Our Work
            <span aria-hidden="true">→</span>
          </Link>
          <Link
            href="/contact"
            className="font-body hover:text-crimson-dark inline-flex items-center justify-center gap-2 rounded-full border border-white px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Book a Consultation
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
