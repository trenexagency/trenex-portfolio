/// <reference types="vite/client" />

interface PortfolioImageMeta {
  file: string;
  width: number;
  height: number;
}

declare module "virtual:portfolio-fiverr-gigs" {
  export const fiverrGigFiles: PortfolioImageMeta[];
}

declare module "virtual:portfolio-thumbnails" {
  export const thumbnailFiles: PortfolioImageMeta[];
}

declare module "virtual:portfolio-social-media-posts" {
  export const socialMediaFiles: PortfolioImageMeta[];
}

declare module "virtual:portfolio-logos" {
  export const logoFiles: PortfolioImageMeta[];
}
