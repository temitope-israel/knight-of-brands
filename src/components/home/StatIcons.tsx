// Custom, hand-drawn monoline icon set for the Stats section — deliberately
// not from an icon library, per brief ("custom icon set, not generic stock
// icons"). Matches the thin-stroke seal/watermark aesthetic used in the Hero.

type IconProps = {
  className?: string;
};

export function ProjectsIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="7" y="16" width="34" height="24" rx="2" />
      <path d="M17 16v-4a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v4" />
      <path d="M7 25h34" />
      <path d="M20 25v4h8v-4" />
    </svg>
  );
}

export function ExperienceIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="17" />
      <path d="M24 14v10l7 5" />
    </svg>
  );
}

export function IndustriesIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M6 40V20l10-6 10 6v20" />
      <path d="M26 40V14l10-6 6 3.6V40" />
      <path d="M12 27h4M12 33h4M32 20h4M32 26h4" />
    </svg>
  );
}

export function BrandsIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M24 6l4.5 9.2 10.1 1.5-7.3 7.1 1.7 10.1L24 29l-9 4.9 1.7-10.1-7.3-7.1 10.1-1.5z" />
    </svg>
  );
}
