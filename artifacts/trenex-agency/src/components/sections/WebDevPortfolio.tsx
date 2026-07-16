import { motion } from "framer-motion";

/* ══════════════════════════════════════════════════════
   WEB DEVELOPMENT — REAL CLIENT PORTFOLIO
   Two sections: Shopify Development + WordPress Development.
   Each card shows the real client screenshot, project name,
   platform badge, and a "Visit Website" link that opens the
   live URL in a new tab.
   To add/edit projects: update SHOPIFY_PROJECTS / WP_PROJECTS.
══════════════════════════════════════════════════════ */

interface Project {
  name: string;
  url: string;
  image: string; /* filename inside public/portfolio/web-projects/ */
  platform: "Shopify" | "WordPress";
}

const SHOPIFY_PROJECTS: Project[] = [
  {
    name: "Trendify Mart",
    url: "https://trendifymart.online/",
    image: "trendify-mart.png",
    platform: "Shopify",
  },
  {
    name: "Nexora UAE",
    url: "https://nexorauae.online/",
    image: "nexora-uae.png",
    platform: "Shopify",
  },
  {
    name: "Ghani Collections",
    url: "https://ghanicollections.shop/",
    image: "ghani-collections.png",
    platform: "Shopify",
  },
  {
    name: "IB Collective",
    url: "https://ibcollective.online/",
    image: "ib-collective.png",
    platform: "Shopify",
  },
  {
    name: "BattleZone PK",
    url: "https://www.battlezone.pk/",
    image: "battlezone-pk.png",
    platform: "Shopify",
  },
];

const WP_PROJECTS: Project[] = [
  {
    name: "Grene Luxury",
    url: "https://greneluxury.shop/",
    image: "grene-luxury.png",
    platform: "WordPress",
  },
  {
    name: "Zulgari",
    url: "https://zulgari.com/",
    image: "zulgari.png",
    platform: "WordPress",
  },
  {
    name: "TrendVistaHub",
    url: "https://www.trendvistahub.com/",
    image: "trendvistahub.png",
    platform: "WordPress",
  },
];

const PLATFORM_COLORS: Record<Project["platform"], string> = {
  Shopify: "border-[#96bf48]/40 bg-[#96bf48]/10 text-[#96bf48]",
  WordPress: "border-[#21759b]/40 bg-[#21759b]/10 text-[#6fb8d8]",
};

function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  const imgSrc = `${import.meta.env.BASE_URL}portfolio/web-projects/${project.image}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, delay, ease: "easeOut" }}
      className="group overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] transition-colors duration-500 hover:border-[#eb1b24]/40 hover:shadow-[0_25px_80px_-20px_rgba(235,27,36,0.3)]"
    >
      {/* Screenshot preview */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0a0a0a]">
        {/* Browser chrome strip */}
        <div className="flex items-center gap-1.5 border-b border-white/8 bg-white/[0.02] px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-[#eb1b24]/70" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="ml-2 truncate rounded-full bg-white/[0.04] px-2.5 py-0.5 font-mono text-[9px] text-white/30">
            {project.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
          </span>
        </div>

        {/* Actual screenshot */}
        <div className="relative h-[calc(100%-2rem)] overflow-hidden">
          <img
            src={imgSrc}
            alt={project.name}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          {/* subtle gradient overlay at bottom for readability */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#0a0a0a]/60 to-transparent" />
        </div>
      </div>

      {/* Card footer */}
      <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5">
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold uppercase tracking-tight text-white sm:text-lg">
            {project.name}
          </h3>
          <span
            className={`mt-1.5 inline-block rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] ${PLATFORM_COLORS[project.platform]}`}
          >
            {project.platform}
          </span>
        </div>

        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 whitespace-nowrap rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-white/70 transition-all duration-300 hover:border-[#eb1b24]/50 hover:bg-[#eb1b24]/10 hover:text-white"
        >
          Visit Website
        </a>
      </div>
    </motion.div>
  );
}

function PortfolioSection({
  label,
  title,
  projects,
  baseDelay = 0,
}: {
  label: string;
  title: string;
  projects: Project[];
  baseDelay?: number;
}) {
  return (
    <div className="mb-16 sm:mb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mb-10 flex flex-col items-start gap-3 sm:mb-12"
      >
        <span className="font-mono text-xs uppercase tracking-[0.4em] text-[#eb1b24]">{label}</span>
        <h2 className="text-2xl font-semibold uppercase tracking-tight text-white sm:text-3xl md:text-4xl">
          {title}
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
        {projects.map((project, i) => (
          <ProjectCard key={project.name} project={project} delay={baseDelay + i * 0.08} />
        ))}
      </div>
    </div>
  );
}

export function WebDevPortfolio() {
  return (
    <section id="services" className="relative w-full scroll-mt-24 overflow-hidden bg-[#050505]/75 px-5 py-16 sm:scroll-mt-28 sm:px-6 sm:py-20">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full"
        style={{ background: "radial-gradient(ellipse 65% 50% at 50% 0%, rgba(235,27,36,0.065), transparent 70%)", filter: "blur(90px)" }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <PortfolioSection
          label="Our Work"
          title="Shopify Development"
          projects={SHOPIFY_PROJECTS}
          baseDelay={0}
        />
        <PortfolioSection
          label="Our Work"
          title="WordPress Development"
          projects={WP_PROJECTS}
          baseDelay={0}
        />
      </div>
    </section>
  );
}
