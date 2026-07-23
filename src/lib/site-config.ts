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
    number: "2348162599233",
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

// Placeholder portfolio entries — replace with real client projects before
// launch. Deliberately generic (not real company names) so it's obvious
// this is placeholder content, not actual case studies.
// export const workProjects = [
//   {
//     slug: "case-study-01",
//     title: "Case Study 01",
//     category: "Branding",
//     summary:
//       "A full brand identity system built from the ground up — logo, color, typography, and voice.",
//   },
//   {
//     slug: "case-study-02",
//     title: "Case Study 02",
//     category: "Digital Campaign",
//     summary:
//       "A multi-channel campaign designed to grow awareness and drive measurable engagement.",
//   },
//   {
//     slug: "case-study-03",
//     title: "Case Study 03",
//     category: "Web Design",
//     summary:
//       "A modern, conversion-focused website built for clarity, speed, and brand consistency.",
//   },
//   {
//     slug: "case-study-04",
//     title: "Case Study 04",
//     category: "Brand Strategy",
//     summary:
//       "Positioning and messaging strategy that gave a growing business a clear market voice.",
//   },
//   {
//     slug: "case-study-05",
//     title: "Case Study 05",
//     category: "Social Media",
//     summary:
//       "An ongoing content and community strategy built to grow an engaged, loyal audience.",
//   },
//   {
//     slug: "case-study-06",
//     title: "Case Study 06",
//     category: "Consultancy",
//     summary:
//       "Strategic guidance that helped a business reposition and scale with confidence.",
//   },
// ] as const;

export const workProjects = [
  {
    slug: "swampsea",
    title: "Swampsea",
    image: "/images/work/swampsea.jpg",
    category: "Website Design & Development",
    brief:
      "The objective was to create a compelling outlook for the client's brand.",
    about:
      "Swampsea Nigeria is a dedicated engineering service company registered in Nigeria to provide bespoke Engineering services in Nigeria and other parts of Africa.",
    activities: [
      "Web Development",
      "Web Design",
      "Content Management System",
      "Mobile Responsive Development",
      "Map Integration",
      "Contact Form Integration",
      "Search Engine Optimization",
    ],
    date: "Redesign & maintenance scheduled — May 2020",
    summary:
      "A full engineering-services brand brought to life through a bespoke, SEO-ready website.",
  },
  {
    slug: "glyde-lubricants",
    title: "Glyde Lubricants",
    image: "/images/work/glyde-lubricants.jpg",
    category: "Website Design & Development",
    brief:
      "Creating a dynamic and responsive multi-site website for the client.",
    about:
      "Glyde Lubricants is one of the fastest growing independent lubricant producers in Nigeria, providing custom-made lubrication solutions for heavy-duty machines, automobiles, and generators — minimizing wear and maximizing up-time.",
    activities: [
      "Web Development",
      "Web Design",
      "Content Management System",
      "Mobile Responsive Development",
      "Map Integration",
      "Contact Form Integration",
      "S.E.O",
      "Live Chat",
    ],
    date: null,
    summary:
      "A multi-site, responsive web presence for a fast-growing lubricant producer.",
  },
  {
    slug: "elegusi-royal-gardens",
    title: "Elegusi Royal Gardens",
    image: "/images/work/elegusi-royal-gardens.jpg",
    category: "Graphics & Design",
    brief: null,
    about:
      "Our client approached us to design a unique marketing brochure to effectively advance the sales of the off-plan real estate development project.",
    activities: [
      "Brochure design",
      "Product research & content creation",
      "Logo design",
      "Graphic designs",
      "Compilation and arrangement of page content",
      "Print and publication",
    ],
    date: null,
    summary:
      "A brochure and brand collateral system built to drive off-plan real estate sales.",
  },
  {
    slug: "the-oranges",
    title: "The Oranges",
    image: "/images/work/the-oranges.jpg",
    category: "Graphics & Design",
    brief: "Brochure design for Spur3IO Ltd.",
    about:
      "Our client approached us to design a unique marketing brochure to effectively advance the sales of their real estate development project.",
    activities: [
      "Brochure design",
      "Product research & content creation",
      "Logo design",
      "Graphic designs",
      "Compilation and arrangement of page content",
      "Print and publication",
    ],
    date: null,
    summary:
      "A marketing brochure built to advance a real estate development's sales, marketed by Spur3IO.",
  },
  {
    slug: "ss-quartz",
    title: "SS Quartz",
    image: "/images/work/ss-quartz.jpg",
    category: "Logo Design",
    brief:
      "SS Quartz is a company involved in logistics, real estate investment, and development.",
    about:
      "Understanding the client's needs through questions and research, creating and developing the concepts, then discussing and expanding the design into various forms for the client's needs.",
    activities: [
      "Brand ID",
      "Conceptualization",
      "Logo sketches",
      "Design execution",
      "Brand Collateral",
      "Delivery",
    ],
    date: "March 05, 2020",
    summary:
      "A full logo identity built from concept sketches through to final brand collateral.",
  },
  {
    slug: "sperone-developments",
    title: "Sperone Developments Ltd",
    image: "/images/work/sperone-developments.jpg",
    category: "Website Design & Development",
    brief: "Bespoke Website Design.",
    about:
      "Sperone Developments Limited is a real estate development, investment, and management company committed to delivering innovative solutions across the real estate spectrum.",
    activities: [
      "Web Development",
      "Web Design",
      "Content Management System",
      "Mobile Responsive Development",
      "Map Integration",
      "Contact Form Integration",
      "S.E.O",
    ],
    date: null,
    summary:
      "A bespoke website built for a real estate development and investment company.",
  },
  {
    slug: "royal-mansonia",
    title: "Royal Mansonia",
    image: "/images/work/royal-mansonia.jpg",
    category: "Graphics & Design",
    brief: null,
    about:
      "Our client approached us to design a unique marketing brochure to effectively advance the sales of the off-plan real estate development project in Oworonshoki, Lagos, Nigeria.",
    activities: [
      "Brochure design",
      "Product research",
      "Content creation",
      "Graphic designs",
      "Compilation and arrangement of page content",
      "Print and publication",
    ],
    date: "December 12, 2019",
    summary:
      "A marketing brochure for an off-plan real estate development, marketed by Spur3IO.",
  },
  {
    slug: "edmund-crescent-gardens",
    title: "Edmund Crescent Gardens",
    image: "/images/work/edmund-crescent-gardens.jpg",
    category: "Graphics & Design",
    brief: "Marketing Brochure Design and Content Creation.",
    about:
      "Here we designed a dynamic and unique marketing brochure to effectively advance the sales of the off-plan real estate development project in Yaba, Lagos, Nigeria.",
    activities: [
      "Brochure design",
      "Product research",
      "Content creation",
      "Graphic designs",
      "Compilation and arrangement of page content",
      "Print and publication",
    ],
    date: null,
    summary:
      "A marketing brochure and content system for an off-plan development in Yaba, Lagos.",
  },
] as const; // TODO: replace placeholder image blocks with real project images

export const aboutContent = {
  intro: {
    title: "We Provide Creative & Tailored Solutions",
    body: "At Knight of Brands, we use a systematic process that synchronizes all contributing elements in order to achieve your brand goals. We determine the most effective mix to achieve the design and marketing objective for our client, tailored within their budgets.",
  },
  profile: {
    foundedYear: 2017,
    paragraphs: [
      "Knight of Brands is a world-class branding, advertising, and marketing agency in Nigeria, specialized in the conceptualization, creation, and implementation of our clients' goals and brand objectives.",
      "The company started in the year 2017 and has efficiently delivered a lot of well-strategized branding geared towards helping our clients establish and promote their brands, as well as properly position them within their specific sectors.",
    ],
  },
  process: {
    title: "Our Process",
    paragraphs: [
      "Our process extends from concept creation, corporate identity to design, graphic design, and brand strategy.",
      "We are dedicated to helping our clients develop the right brand strategy and identity while ensuring the brand's proper positioning from advertising and print to web design, packaging, and apps.",
    ],
  },
  technique: {
    title: "Our Technique",
    paragraphs: [
      "We are open to startup businesses, small businesses, medium-scale, and large-scale enterprises irrespective of the sector or industry.",
      "We work creatively together with our clients to develop amazing brand concepts and identity, design direction, ideas, and storytelling.",
    ],
  },
} as const;

// Vision/Mission — TODO: replace with real copy from client
export const aboutMission = {
  vision:
    "To create innovative solutions that would strategically position our clients as industry leaders.",
  mission:
    "Helping brands evolve with cutting-edge brand strategies, designs and targeted marketing.",
} as const;

export const clientLogos = [
  { name: "SS Quartz", src: "/images/clients/ss-quartz.png" },
  { name: "Spurio", src: "/images/clients/spurio.png" },
  { name: "Sperone", src: "/images/clients/sperone.png" },
  { name: "Beny NG", src: "/images/clients/rent-ng.png" },
  { name: "Orange Island", src: "/images/clients/orange-island.png" },
  { name: "Glyde", src: "/images/clients/glyde.png" },
  {
    name: "Elegusi Royal Gardens",
    src: "/images/clients/elegusi-royal-gardens.png",
  },
  {
    name: "Amber Ville Events",
    src: "/images/clients/amber-ville-events.png",
  },
] as const;

// Placeholder CTA stats — confirm real figures with client before launch
export const ctaStats = [
  { value: "Within 24h", label: "Average Response Time" },
  { value: "100%", label: "Custom Strategy" },
  { value: "Global", label: "Reach & Positioning" },
] as const; // TODO: replace names with real logo image files once provided

export const testimonials = [
  {
    quote:
      "Thank you for delivering the brochure design on time even with the short notice. The attention to details and professionalism during the project was top notch.",
    name: "Managing Director",
    company: "Spur 3IO",
  },
  {
    quote:
      "I will really commend you and your team and let you know that you guys do a really good job. I'm glad I decided to work with you. My website is responsive, fast and professionally done. Thank you!",
    name: "Michael A.",
    company: "CEO, Sperone Developments",
  },
  {
    quote:
      "Knight of Brands did an incredible job designing our Logo and brand collateral. Simple, Classy, Professional design at a pocket friendly rate.",
    name: "Demisi Henry",
    company: "CEO, RentNG",
  },
  {
    quote:
      "True value for money indeed. Working with your team on the digital marketing project was so much fun and I garnered a lot of experience especially on proper brand positioning.",
    name: "Mrs Ejike O.",
    company: null,
  },
] as const;
