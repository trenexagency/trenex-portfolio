/* ─────────────────────────────────────────────────────────
   Trenex Portfolio Data
   Four fixed categories, each a pure image gallery.
   Add future work by appending image URLs to the relevant
   category's `images` array — no page redesign needed.
───────────────────────────────────────────────────────── */

export interface PortfolioCategory {
  id: string;
  title: string;
  images: string[];
}

export const PORTFOLIO_CATEGORIES: PortfolioCategory[] = [
  {
    id: "social-media-posts",
    title: "Social Media Posts",
    images: [
      "https://cdn.dribbble.com/userupload/5426267/file/original-9bb3a724f131e614402910775ba6cbcd.png?format=webp&resize=600x450&vertical=center",
      "https://cdn.dribbble.com/userupload/10265388/file/original-cdd6edbb302e2a6b7d21b05330d945c9.jpg?format=webp&resize=600x450&vertical=center",
      "https://cdn.dribbble.com/userupload/3864873/file/original-78a4ed4f88d64d81074dbd27c2b6c6e8.png?format=webp&resize=600x450&vertical=center",
      "https://cdn.dribbble.com/userupload/37865290/file/still-2ef46cbdca6224011237bd2e5e7df7ff.png?format=webp&resize=600x450&vertical=center",
      "https://cdn.dribbble.com/userupload/7954910/file/original-512460eb133099a730e1828043165ef7.png?format=webp&resize=600x450&vertical=center",
      "https://blog.hootsuite.com/wp-content/uploads/2022/07/social-media-graphics-10.png",
    ],
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
