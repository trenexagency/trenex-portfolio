/**
 * Central place for static site content (copy, nav links, service data, etc.)
 * Populate this as sections are built so components stay presentation-only.
 */

export const siteConfig = {
  name: "Trenex Agency",
  tagline: "We build brands that move.",
  description:
    "A premium creative studio crafting bold visuals, cinematic video, and high-performance web experiences.",
};

export const navLinks: { label: string; href: string }[] = [
  { label: "Home", href: "#hero" },
  { label: "Services", href: "#services" },
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
