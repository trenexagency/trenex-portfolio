import { ExternalLink } from "lucide-react";

const WEB_PROJECTS = [
  {
    name: "inamco",
    url: "https://inamco.com.au/",
    image: "inamco.webp",
  },
  {
    name: "scrapzone",
    url: "https://scrapzone.com.au/",
    image: "scrapzone.webp",
  },
  {
    name: "ycdo",
    url: "https://ycdo.org.pk/",
    image: "ycdo.webp",
  },
  {
    name: "briefcase",
    url: "https://briefcase.pk/",
    image: "briefcase.webp",
  },
  {
    name: "rollover",
    url: "https://rollover.com.pk/",
    image: "rollover.webp",
  },
  {
    name: "hurrcollective",
    url: "https://www.hurrcollective.com/",
    image: "hurrcollective.webp",
  },
  {
    name: "officinegullo",
    url: "https://officinegullo.com/en/",
    image: "officinegullo.webp",
  },
  {
    name: "soicher-marin",
    url: "https://soicher-marin.com/",
    image: "soicher-marin.webp",
  },
  {
    name: "mistore",
    url: "https://mistore.pk/",
    image: "mistore.webp",
  },
];

export function WebProjectsPortfolio() {
  return (
    <section
      id="website-projects"
      aria-labelledby="website-projects-heading"
      className="relative w-full bg-[#050505] px-5 pb-16 pt-4 sm:px-6 sm:pb-20 md:pb-24"
    >
      <div className="mx-auto max-w-6xl">
        <header className="mb-9 sm:mb-12">
          <span aria-hidden="true" className="mb-5 block h-px w-10 bg-[#eb1b24]/75" />
          <h2
            id="website-projects-heading"
            className="text-3xl font-semibold uppercase tracking-tight text-white sm:text-4xl"
          >
            OUR WEBSITE PROJECTS
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/55 md:text-base">
            Explore websites built for different brands and business needs.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {WEB_PROJECTS.map(({ name, url, image }) => (
            <article
              key={name}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-[#eb1b24]/40 hover:shadow-[0_18px_48px_-24px_rgba(235,27,36,0.35)] focus-within:border-[#eb1b24]/50"
            >
              <div className="aspect-[16/10] overflow-hidden bg-white/[0.025]">
                <img
                  src={`${import.meta.env.BASE_URL}portfolio/web-projects/${image}`}
                  alt={`${name} website preview`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.035]"
                />
              </div>

              <div className="flex items-center justify-between gap-4 p-5 sm:p-6">
                <h3 className="min-w-0 break-words text-lg font-semibold lowercase text-white sm:text-xl">
                  {name}
                </h3>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-2 rounded-md border border-[#eb1b24]/45 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-white transition-colors duration-200 hover:border-[#eb1b24] hover:bg-[#eb1b24]/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eb1b24] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] sm:px-3.5 sm:text-xs"
                >
                  Visit Website
                  <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
