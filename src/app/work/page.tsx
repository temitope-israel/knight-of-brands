import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import WorkGrid from "@/components/work/WorkGrid";
import CtaBand from "@/components/home/CtaBand";

export const metadata: Metadata = {
  title: "Our Work | Knight of Brands",
  description:
    "Explore branding, campaigns, and digital experiences delivered by Knight of Brands.",
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Work"
        title="Proof of Every Pixel"
        description="Every project reflects thoughtful strategy, purposeful design, and measurable impact."
      />

      <section className="bg-parchment px-6 pb-24 md:px-10">
        <div className="mx-auto max-w-6xl">
          <WorkGrid />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
