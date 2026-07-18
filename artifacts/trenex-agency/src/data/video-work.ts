/* ─────────────────────────────────────────────────────────
   Trenex Video Editing — YouTube Shorts Portfolio
   Add or remove Shorts by editing this array only.
   `id`  → YouTube video ID (the part after /shorts/)
   `url` → full YouTube Shorts URL (opens in new tab)
───────────────────────────────────────────────────────── */

export interface YouTubeShort {
  id: string;
  url: string;
  /** Optional custom thumbnail — used when YouTube's CDN serves a broken/grey image */
  customThumb?: string;
}

export const YOUTUBE_SHORTS: YouTubeShort[] = [
  { id: "lD1Zz9hzKuQ", url: "https://youtube.com/shorts/lD1Zz9hzKuQ" },
  {
    id: "CK8wAcglKpI",
    url: "https://youtube.com/shorts/CK8wAcglKpI",
    customThumb: `${import.meta.env.BASE_URL}portfolio/shorts-thumbs/CK8wAcglKpI.png`,
  },
  { id: "1ZB5w6jFaFI", url: "https://youtube.com/shorts/1ZB5w6jFaFI" },
  { id: "QFEJbQrKnn0", url: "https://youtube.com/shorts/QFEJbQrKnn0" },
  { id: "6S7o5XwwsME", url: "https://youtube.com/shorts/6S7o5XwwsME" },
  { id: "j0OSbts9OG4", url: "https://youtube.com/shorts/j0OSbts9OG4" },
  { id: "AbTz5WrZhRo", url: "https://youtube.com/shorts/AbTz5WrZhRo" },
  { id: "wPmmv7ugJgg", url: "https://youtube.com/shorts/wPmmv7ugJgg" },
  { id: "xCKgWmAiriU", url: "https://youtube.com/shorts/xCKgWmAiriU" },
  { id: "mYMvvOAWevQ", url: "https://youtube.com/shorts/mYMvvOAWevQ" },
];

/* ─────────────────────────────────────────────────────────
   Long-Form Content
───────────────────────────────────────────────────────── */
export interface LongFormVideo {
  id: string;
  url: string;
  /** Optional custom thumbnail override */
  customThumb?: string;
}

export const LONG_FORM_VIDEOS: LongFormVideo[] = [
  { id: "61Nz3BDpOrQ", url: "https://youtu.be/61Nz3BDpOrQ" },
  {
    id: "uBKw3_OFNu4",
    url: "https://youtu.be/uBKw3_OFNu4",
    customThumb: `${import.meta.env.BASE_URL}portfolio/shorts-thumbs/uBKw3_OFNu4.jpg`,
  },
];

/* Legacy type kept for VideoLightbox — no longer used by the video page */
export interface VideoWorkItem {
  youtubeId: string;
  title: string;
}
export interface VideoWorkCategory {
  id: string;
  title: string;
  items: VideoWorkItem[];
}
export const VIDEO_WORK_CATEGORIES: VideoWorkCategory[] = [];
