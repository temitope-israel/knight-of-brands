export const siteConfig = {
  name: "Knight of Brands",
  tagline: "We don't just design brands. We build legacies.",
  footerTagline: "Strategy. Design. Impact.",
  description:
    "Knight of Brands is a Nigerian branding and advertising agency helping ambitious businesses build memorable brands through strategy, design, and digital experiences.",
  url: "https://knightofbrands.com",
} as const;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const contactConfig = {
  email: "info@knightofbrands.com",
  phone: "+2348115973776",
  address:
    "4 Babatope Bejide Street, Off Fola Osibo, Lekki Phase 1 Lagos – Nigeria",
  whatsapp: {
    number: "23470351623577",
    defaultMessage: "Hi Knight of Brands, I'd like to talk about a project.",
  },
} as const;

export const socialLinks = [
  { label: "Instagram", href: "https://instagram.com/knightofbrands_" },
  { label: "Facebook", href: "https://facebook.com/knightofbrands" },
  { label: "LinkedIn", href: "https://linkedin.com/knightofbrands" },
  { label: "X", href: "https://instagram.com/knightofbrands" },
] as const;

export const services = [
  {
    number: "01",
    title: "Branding",
    description: "Building strong brand identities that connect and inspire.",
    href: "/services#branding",
  },
  {
    number: "02",
    title: "Advertising",
    description: "Creating campaigns that capture attention and drive results.",
    href: "/services#advertising",
  },
  {
    number: "03",
    title: "Marketing",
    description: "Data-driven strategies that grow your brand and reach.",
    href: "/services#marketing",
  },
  {
    number: "04",
    title: "Consultancy",
    description:
      "Expert guidance to position your brand for long-term success.",
    href: "/services#consultancy",
  },
] as const;



export const stats = [
  {
    value: "120+",
    label: "Projects Delivered",
    description: "Across diverse industries",
  },
  {
    value: "8+",
    label: "Years of Experience",
    description: "Solving real business problems",
  },
  {
    value: "8+",
    label: "Industries Served",
    description: "From startups to enterprises",
  },
  {
    value: "35+",
    label: "Brands Transformed",
    description: "Built for growth and impact",
  },
] as const; // TODO: confirm real figures with client before launch


// Placeholder portfolio entries — replace with real client projects before
// launch. Deliberately generic (not real company names) so it's obvious
// this is placeholder content, not actual case studies.
export const workPreview = [
  {
    title: "Case Study 01",
    category: "Branding",
  },
  {
    title: "Case Study 02",
    category: "Digital Campaign",
  },
  {
    title: "Case Study 03",
    category: "Web Design",
  },
] as const;