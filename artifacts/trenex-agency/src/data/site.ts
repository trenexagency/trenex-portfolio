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

export const contactInfo = {
  email: "trenexagency@gmail.com",
  whatsapp: "https://wa.me/923323848135",
};

export interface SocialLink {
  id: string;
  label: string;
  href: string | null;
  disabled?: boolean;
}

export const socialLinks: SocialLink[] = [
  { id: "facebook", label: "Facebook", href: "https://www.facebook.com/profile.php?id=61590931302050" },
  { id: "instagram", label: "Instagram", href: "https://www.instagram.com/trenexagency/" },
  { id: "youtube", label: "YouTube", href: "https://www.youtube.com/@TrenexAgency" },
  { id: "linkedin", label: "LinkedIn", href: null, disabled: true },
  { id: "whatsapp", label: "WhatsApp", href: "https://wa.me/923323848135" },
  { id: "email", label: "Email", href: "mailto:trenexagency@gmail.com" },
];

export interface Service {
  title: string;
  tagline: string;
  description: string;
  index: string;
  capabilities: string[];
}

export const services: Service[] = [
  {
    index: "01",
    title: "Graphic Design",
    tagline: "Identity Systems",
    description:
      "Distinct visual identities, brand systems, and design assets crafted to make your brand unforgettable.",
    capabilities: ["Brand Identity", "Art Direction", "Design Systems"],
  },
  {
    index: "02",
    title: "Video Editing",
    tagline: "Motion & Story",
    description:
      "Cinematic edits, motion graphics, and story-driven content that captures attention and holds it.",
    capabilities: ["Cinematic Editing", "Motion Graphics", "Color Grading"],
  },
  {
    index: "03",
    title: "Web Development",
    tagline: "Digital Engineering",
    description:
      "Fast, immersive, and meticulously engineered websites built to convert and impress.",
    capabilities: ["Interactive Builds", "Performance", "3D & Motion"],
  },
];
