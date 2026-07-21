// Custom monoline icon set for Services — same aesthetic as StatIcons.tsx,
// kept in its own file since these are a distinct visual group.

type IconProps = {
  className?: string;
};

export function BrandingIcon({ className }: IconProps) {
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
      <path d="M33 8l7 7-19 19-9 2 2-9z" />
      <path d="M28 13l7 7" />
    </svg>
  );
}

export function AdvertisingIcon({ className }: IconProps) {
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
      <path d="M6 20v6a2 2 0 0 0 2 2h4l3 10h4l-2-10h5l14 8V12l-14 8H12a2 2 0 0 0-2 2" />
      <path d="M18 28v8a2 2 0 0 0 2 2h2" />
    </svg>
  );
}

export function MarketingIcon({ className }: IconProps) {
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
      <circle cx="24" cy="24" r="10" />
      <circle cx="24" cy="24" r="3" />
    </svg>
  );
}

export function ConsultancyIcon({ className }: IconProps) {
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
      {/* Simplified chess knight silhouette — echoes the brand mark */}
      <path d="M16 40V33c0-5 2-8 2-12 0-5-2-8-1-12 1-3 4-5 7-5 5 0 9 4 9 9 0 3-1 5-3 7l3 3-4 4-3-2c-2 2-3 4-3 7v8z" />
      <path d="M16 40h16" />
      <circle cx="26" cy="12" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
