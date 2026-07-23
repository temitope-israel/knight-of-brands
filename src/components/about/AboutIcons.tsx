export function VisionIcon({ className }: IconProps) {
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
      <path d="M4 24s7-13 20-13 20 13 20 13-7 13-20 13S4 24 4 24z" />
      <circle cx="24" cy="24" r="6" />
    </svg>
  );
}

export function MissionIcon({ className }: IconProps) {
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
      <circle cx="24" cy="24" r="18" />
      <circle cx="24" cy="24" r="10" />
      <path d="M24 6v6M24 36v6M6 24h6M36 24h6" />
    </svg>
  );
}

type IconProps = { className?: string };

export function ProcessIcon({ className }: IconProps) {
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
      <path d="M8 24a16 16 0 1 1 5 11.6" />
      <path d="M8 30v6h6" />
      <path d="M24 16v8l6 4" />
    </svg>
  );
}

export function TechniqueIcon({ className }: IconProps) {
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
      <path d="M24 6l4 8 9 1.5-6.5 6.3 1.5 9L24 26l-8 4.8 1.5-9-6.5-6.3L20 14z" />
      <path d="M14 34h20M17 40h14" />
    </svg>
  );
}
