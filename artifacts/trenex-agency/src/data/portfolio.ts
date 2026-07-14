/* ─────────────────────────────────────────────────────────
   Trenex Portfolio Data
   Four fixed categories, each a pure image gallery.
   Add future work by appending image URLs to the relevant
   category's `images` array — no page redesign needed.
───────────────────────────────────────────────────────── */

import { socialMediaFiles } from "virtual:portfolio-social-media-posts";
import { logoFiles } from "virtual:portfolio-logos";

export interface PortfolioCategory {
  id: string;
  title: string;
  images: string[];
}

const SOCIAL_MEDIA_IMAGES = socialMediaFiles.map(
  (file) => `${import.meta.env.BASE_URL}portfolio/social-media-posts/${file}`,
);

const LOGO_IMAGES = logoFiles.map(
  (file) => `${import.meta.env.BASE_URL}portfolio/logos/${file}`,
);

export const PORTFOLIO_CATEGORIES: PortfolioCategory[] = [
  {
    id: "social-media-posts",
    title: "Social Media Designs",
    images: SOCIAL_MEDIA_IMAGES,
  },
  {
    id: "logos",
    title: "Logos",
    images: LOGO_IMAGES,
  },
];
