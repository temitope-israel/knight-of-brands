import Link from "next/link";
import Image from "next/image";
import {
  TbBrandFacebook,
  TbBrandInstagram,
  TbBrandLinkedin,
  TbBrandX,
} from "react-icons/tb";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import {
  siteConfig,
  navLinks,
  services,
  socialLinks,
  contactConfig,
} from "@/lib/site-config";

const socialIconMap = {
  Facebook: TbBrandFacebook,
  Instagram: TbBrandInstagram,
  LinkedIn: TbBrandLinkedin,
  X: TbBrandX,
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-stone-light/20 bg-parchment text-ink border-t">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          {/* Brand column */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2">
              <Image
                src="/images/footer-logo.png"
                alt={siteConfig.name}
                width={160}
                height={48}
                className="h-26 w-auto"
              />
            </Link>

            <p className="font-body text-stone mt-2 max-w-xs text-sm">
              {siteConfig.footerTagline}
            </p>

            <ul className="mt-6 flex items-center gap-5">
              {socialLinks.map((social) => {
                const Icon =
                  socialIconMap[social.label as keyof typeof socialIconMap];
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="text-stone hover:text-crimson focus-visible:outline-crimson transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.5} />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-body text-ink text-sm font-semibold tracking-wide uppercase">
              Quick Links
            </h3>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-stone hover:text-crimson focus-visible:outline-crimson text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-body text-ink text-sm font-semibold tracking-wide uppercase">
              Services
            </h3>
            <ul className="mt-5 space-y-3">
              {services.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="font-body text-stone hover:text-crimson focus-visible:outline-crimson text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-body text-ink text-sm font-semibold tracking-wide uppercase">
              Let&apos;s Connect
            </h3>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href={`mailto:${contactConfig.email}`}
                  className="font-body text-stone hover:text-crimson focus-visible:outline-crimson flex items-center gap-2.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
                >
                  <HiOutlineMail
                    className="h-4 w-4 shrink-0"
                    aria-hidden="true"
                  />
                  {contactConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contactConfig.phone}`}
                  className="font-body text-stone hover:text-crimson focus-visible:outline-crimson flex items-center gap-2.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
                >
                  <HiOutlinePhone
                    className="h-4 w-4 shrink-0"
                    aria-hidden="true"
                  />
                  {contactConfig.phone}
                </a>
              </li>
              <li className="font-body text-stone flex items-center gap-2.5 text-sm">
                <HiOutlineLocationMarker
                  className="h-4 w-4 shrink-0"
                  aria-hidden="true"
                />
                {contactConfig.address}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-stone-light/20 mt-16 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p className="font-body text-stone text-xs">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy-policy"
              className="font-body text-stone hover:text-crimson text-xs transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="font-body text-stone hover:text-crimson text-xs transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
