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
    id: "youtube-thumbnails",
    title: "YouTube Thumbnails",
    images: [
      "https://mir-s3-cdn-cf.behance.net/projects/404/c04043243888481.Y3JvcCwxNjE2LDEyNjQsMCww.jpg",
      "https://imgv3.fotor.com/images/side/use-transparent-png-as-the-Youtube-thumbnail-design-material.jpg",
      "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/141814761/original/591ba1d802560cb6fefcd96cf24389b88ce9f860.png",
      "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/389359686/original/35c55a9b8856d3442badd6b76db05ab4139eb813.png",
      "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/379041746/original/1d71ef148a24ed79f830bd961e0c2d647905c8b2.jpg",
      "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/new-phone-review-youtube-channel-thumbnail-design-template-ec409103e096dcca72fb571a47b99e3d.webp?ts=1737322218",
    ],
  },
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
  {
    id: "event-posters",
    title: "Event Posters",
    images: [
      "https://cdn.dribbble.com/userupload/43180877/file/original-f2c4d2a0bf37f4937815699799778388.png?format=webp&resize=600x450&vertical=center",
      "https://dcassetcdn.com/design_img/3825439/644908/23739863/zwxp25mbb4mcpm6e5m16kw7xxk_thumbnail.png",
      "https://cdn.dribbble.com/userupload/11147243/file/original-5a776b3d1104c2dccb78dc53019b923b.jpg?format=webp&resize=600x450&vertical=center",
      "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/428119850/original/c3ecf48933996986c65cd04b0bf71519fb2b701e.jpg",
      "https://cdn.dribbble.com/userupload/17122709/file/original-47f04e1bb45984b256f793848ae10e6b.jpg?format=webp&resize=600x450&vertical=center",
      "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/blue-neon-this-is-a-striking-poster-design-te-template-66d21f5867f99f30cd724b168eedd75a.webp?ts=1749506543",
    ],
  },
];
