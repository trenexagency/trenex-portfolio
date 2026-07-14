import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import fs from "fs";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

const rawPort = process.env.PORT || "3000";
const port = Number(rawPort);
const basePath = process.env.BASE_PATH || "/";

/* ══════════════════════════════════════════════════════
   PORTFOLIO FOLDER MANIFESTS
   Exposes the list of image filenames in a
   public/portfolio/<folder>/ directory as a virtual module,
   so galleries load whatever is dropped in that folder
   without any code changes. Hot-reloads in dev when files
   in the watched folder change.
══════════════════════════════════════════════════════ */
const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif", ".gif"]);

function portfolioFolderManifest(folder: string, exportName: string): Plugin {
  const virtualModuleId = `virtual:portfolio-${folder}`;
  const resolvedVirtualModuleId = "\0" + virtualModuleId;
  const dir = path.resolve(import.meta.dirname, "public/portfolio", folder);

  function listFiles(): string[] {
    if (!fs.existsSync(dir)) return [];
    return fs
      .readdirSync(dir)
      .filter((f) => IMAGE_EXTENSIONS.has(path.extname(f).toLowerCase()))
      .sort((a, b) => a.localeCompare(b));
  }

  return {
    name: `portfolio-${folder}-manifest`,
    resolveId(id) {
      if (id === virtualModuleId) return resolvedVirtualModuleId;
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        return `export const ${exportName} = ${JSON.stringify(listFiles())};`;
      }
    },
    configureServer(server) {
      server.watcher.add(dir);
      server.watcher.on("all", (_event, changedPath) => {
        if (path.resolve(changedPath).startsWith(dir)) {
          const mod = server.moduleGraph.getModuleById(resolvedVirtualModuleId);
          if (mod) {
            server.moduleGraph.invalidateModule(mod);
            server.ws.send({ type: "full-reload" });
          }
        }
      });
    },
  };
}

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    runtimeErrorOverlay(),
    portfolioFolderManifest("fiverr-gigs", "fiverrGigFiles"),
    portfolioFolderManifest("thumbnails", "thumbnailFiles"),
    portfolioFolderManifest("social-media-posts", "socialMediaFiles"),
    portfolioFolderManifest("logos", "logoFiles"),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, ".."),
            }),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
