import Image from "next/image";
import Link from "next/link";
import MobileMenu from "@/components/layout/MobileMenu";
import { siteConfig } from "@/lib/site-config";

export default function Navbar() {
  return (
    <header className="bg-crimson-dark shadow-ink/30 fixed top-0 left-0 z-30 w-full shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <Link
          href="/"
          className="flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          <Image
            src="/images/new-nav-logo.png"
            alt={siteConfig.name}
            width={300}
            height={150}
            priority
            unoptimized
            className="h-18 w-auto md:h-20"
          />
        </Link>

        <div className="flex items-center gap-8">
          <MobileMenu />

          <Link
            href="/contact"
            className="border-crimson-bright font-body hover:bg-crimson-bright hidden items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white lg:inline-flex"
          >
            Get In Touch
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
