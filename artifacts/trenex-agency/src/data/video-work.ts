/* ─────────────────────────────────────────────────────────
   Trenex Video Editing Portfolio Data
   Three fixed categories, each a pure video reel gallery.
   Swap in real project reels by replacing `youtubeId` with
   your own YouTube video ID — no page redesign needed.
───────────────────────────────────────────────────────── */

export interface VideoWorkItem {
  youtubeId: string;
  title: string;
}

export interface VideoWorkCategory {
  id: string;
  title: string;
  items: VideoWorkItem[];
}

export const VIDEO_WORK_CATEGORIES: VideoWorkCategory[] = [
  {
    id: "commercial-editing",
    title: "Commercial Editing",
    items: [
      { youtubeId: "1CTExL19-8w", title: "TV Commercial Showreel" },
      { youtubeId: "a27Ek2AFWs4", title: "Video Editor Showreel" },
    ],
  },
  {
    id: "motion-graphics",
    title: "Motion Graphics",
    items: [
      { youtubeId: "rKr7cdwhiA0", title: "Motion Graphics Showreel" },
      { youtubeId: "D3RK5Zy7WBE", title: "Animation & Motion Reel" },
    ],
  },
  {
    id: "color-grading",
    title: "Color Grading",
    items: [
      { youtubeId: "ubF4_Jda5zA", title: "Cinematic Color Grade Reel" },
      { youtubeId: "bq4yQu32BOw", title: "Color Grading Breakdown" },
    ],
  },
];
