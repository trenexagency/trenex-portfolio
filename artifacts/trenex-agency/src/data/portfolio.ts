/* ─────────────────────────────────────────────────────────
   Trenex Portfolio Data
   Four fixed categories, each a pure image gallery.
   Add future work by appending image URLs to the relevant
   category's `images` array — no page redesign needed.
───────────────────────────────────────────────────────── */

import { socialMediaFiles } from "virtual:portfolio-social-media-posts";

export interface PortfolioCategory {
  id: string;
  title: string;
  images: string[];
}

const SOCIAL_MEDIA_IMAGES = socialMediaFiles.map(
  (file) => `${import.meta.env.BASE_URL}portfolio/social-media-posts/${file}`,
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
    images: [
      "https://images-platform.99static.com//z3g8YVAmb4qtvU_TGrAcN6xzEsY=/0x1968:1969x3937/fit-in/500x500/99designs-contests-attachments/92/92571/attachment_92571238",
      "https://static.vecteezy.com/system/resources/thumbnails/075/269/414/small/minimalist-circle-logo-concept-for-branding-identity-vector.jpg",
      "https://skyryedesign.com/wp-content/uploads/2025/06/2c96457d3012cf0c138546427fb60d9d-683x1024.jpg",
      "https://static.vecteezy.com/system/resources/thumbnails/075/269/404/small/minimalist-sun-horizon-line-art-logo-concept-for-modern-branding-vector.jpg",
      "https://images-platform.99static.com//WnsdvqJtblCeD4TLMYUkg_crJOw=/531x61:1423x953/fit-in/500x500/projects-files/138/13836/1383632/09c39a55-d3a0-4a15-9b45-83217a513310.jpg",
      "https://cdn.dribbble.com/userupload/43435598/file/original-c8e3a81411c875f8f095b147a3eacc5b.jpg?format=webp&resize=600x450&vertical=center",
    ],
  },
];
