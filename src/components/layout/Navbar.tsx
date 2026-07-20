import Image from "next/image";
import Link from "next/link";
import MobileMenu from "@/components/layout/MobileMenu";
import { siteConfig } from "@/lib/site-config";

export default function Navbar() {
  return (
    <header className="border-stone-light/20 bg-parchment/80 fixed top-0 left-0 z-30 w-full border-b backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        {/* Logo */}
        <Link
          href="/"
          className="focus-visible:outline-crimson flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          <Image
            src="/images/logo.png"
            alt={siteConfig.name}
            width={160}
            height={48}
            priority
            className="h-10 w-auto md:h-12"
          />
        </Link>

        {/* Desktop nav + mobile toggle (client island) */}
        <div className="flex items-center gap-8">
          <MobileMenu />

          {/* Desktop CTA */}
          <Link
            href="/contact"
            className="border-crimson font-body text-crimson hover:bg-crimson hover:text-parchment focus-visible:outline-crimson hidden items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 md:inline-flex"
          >
            Get In Touch
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
