/**
 * Central place for static site content (copy, nav links, service data, etc.)
 * Populate this as sections are built so components stay presentation-only.
 */

export const siteConfig = {
  name: "TRENEX AGENCY",
  headline: "We Build Digital Experiences.",
  subheadline: "Design. Motion. Code.",
  description:
    "TRENEX is a futuristic creative agency engineering premium brands, cinematic motion, and high-performance digital products.",
};

export const navLinks: { label: string; href: string }[] = [
  { label: "Home", href: "#hero" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export interface Service {
  title: string;
  description: string;
  index: string;
}

export const services: Service[] = [
  {
    index: "01",
    title: "Graphic Design",
    description:
      "Distinct visual identities, brand systems, and design assets crafted to make your brand unforgettable.",
  },
  {
    index: "02",
    title: "Video Editing",
    description:
      "Cinematic edits, motion graphics, and story-driven content that captures attention and holds it.",
  },
  {
    index: "03",
    title: "Web Development",
    description:
      "Fast, immersive, and meticulously engineered websites built to convert and impress.",
  },
];
