import Hero from "@/components/home/Hero";
import WhoWeAre from "@/components/home/WhoWeAre";
import Stats from "@/components/home/Stats";
import ServicesPreview from "@/components/home/ServicesPreview";
import WorkPreview from "@/components/home/WorkPreview";
import ClientLogoTicker from "@/components/shared/ClientLogoTicker";
import CtaBand from "@/components/home/CtaBand";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <WhoWeAre />
      <Stats />
      <ServicesPreview />
      <WorkPreview />
      <Testimonials />

      <section className="bg-parchment-dim overflow-hidden py-20 md:py-26">
        <div className="mx-auto max-w-5xl px-6 text-center md:px-10">
          <span className="font-body text-crimson-bright text-sm font-semibold tracking-widest uppercase">
            Trusted By
          </span>
          <h2 className="font-display text-ink mt-3 text-2xl font-semibold md:text-3xl">
            Brands We&apos;ve Worked With
          </h2>
        </div>
        <div className="mt-10">
          <ClientLogoTicker />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
