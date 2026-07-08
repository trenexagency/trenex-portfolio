/* ─────────────────────────────────────────────────────────
   Trenex Portfolio Data
   Add future projects by appending to PORTFOLIO_PROJECTS.
   Each entry is self-contained — no page redesign needed.
───────────────────────────────────────────────────────── */

export type PortfolioCategory =
  | "Branding"
  | "Logos"
  | "Social Media Design"
  | "YouTube Thumbnails"
  | "Posters"
  | "UI/UX";

export interface PortfolioProject {
  id: string;
  category: PortfolioCategory;
  title: string;
  description: string;
  thumbnail: string;
}

export const PORTFOLIO_CATEGORIES: PortfolioCategory[] = [
  "Branding",
  "Logos",
  "Social Media Design",
  "YouTube Thumbnails",
  "Posters",
  "UI/UX",
];

/* ── Add new projects here ───────────────────────────── */
export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: "brand-01",
    category: "Branding",
    title: "Brand Identity System",
    description: "Full visual identity including wordmark, color palette, and typography suite.",
    thumbnail: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "brand-02",
    category: "Branding",
    title: "Corporate Brand Refresh",
    description: "Strategic rebrand elevating a B2B firm into a premium market position.",
    thumbnail: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "logo-01",
    category: "Logos",
    title: "Minimal Wordmark",
    description: "Clean, geometric wordmark built for versatility across print and digital.",
    thumbnail: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "logo-02",
    category: "Logos",
    title: "Symbol Mark Design",
    description: "Abstract icon mark expressing movement and precision for a tech brand.",
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "social-01",
    category: "Social Media Design",
    title: "Instagram Feed System",
    description: "Cohesive grid aesthetic with reusable templates across content types.",
    thumbnail: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "social-02",
    category: "Social Media Design",
    title: "Campaign Visual Suite",
    description: "Multi-platform ad creatives optimized for engagement and conversion.",
    thumbnail: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "yt-01",
    category: "YouTube Thumbnails",
    title: "Esports Channel Thumbnails",
    description: "High-CTR thumbnail series with bold type and cinematic composition.",
    thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "yt-02",
    category: "YouTube Thumbnails",
    title: "Creator Growth Package",
    description: "Thumbnail templates engineered to increase click-through rate by design.",
    thumbnail: "https://images.unsplash.com/photo-1614728423169-3f65fd722b7e?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "poster-01",
    category: "Posters",
    title: "Concert Event Poster",
    description: "Atmospheric event poster with layered depth and cinematic color grading.",
    thumbnail: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "poster-02",
    category: "Posters",
    title: "Corporate Event Design",
    description: "Premium conference collateral balancing authority with creative distinction.",
    thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "uiux-01",
    category: "UI/UX",
    title: "Mobile App Interface",
    description: "End-to-end UI design for a fintech app — clarity meets visual sophistication.",
    thumbnail: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "uiux-02",
    category: "UI/UX",
    title: "SaaS Dashboard Design",
    description: "Data-rich dashboard built for decision-makers who value speed and precision.",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=85",
  },
];
