import { ExternalLink } from "lucide-react";
import { SoftwareServicesCarousel } from "@/components/sections/SoftwareServicesCarousel";

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

const APP_PROJECTS = [
  {
    name: "Dropshipy",
    url: "https://play.google.com/store/apps/details?id=com.ecomlix.dropshipy",
    image: "1_1792314487359.png",
  },
  {
    name: "Black Men Fashion",
    url: "https://play.google.com/store/apps/details?id=com.forefo.black_men_fashion",
    image: "2_1792314487358.png",
  },
  {
    name: "African Fashion Design",
    url: "https://play.google.com/store/apps/details?id=com.fastyle.African.Fashion.Design",
    image: "3_1792314487358.png",
  },
  {
    name: "GharPar",
    url: "https://play.google.com/store/apps/details?id=com.onebyte.gharpar",
    image: "4_1792314487357.png",
  },
  {
    name: "Apni Sawari",
    url: "https://play.google.com/store/apps/details?id=com.apnisawari.customerApp",
    image: "5_1792314487356.png",
  },
  {
    name: "FitHero",
    url: "https://play.google.com/store/apps/details?id=com.fnp.fithero",
    image: "6_1792314487355.png",
  },
];

type PortfolioProjectCardProps = {
  name: string;
  url: string;
  imageSrc: string;
  imageAlt: string;
  linkLabel: string;
  imageFit?: "cover" | "contain";
  nameTextTransform?: "lowercase" | "normal";
};

function PortfolioProjectCard({
  name,
  url,
  imageSrc,
  imageAlt,
  linkLabel,
  imageFit = "cover",
  nameTextTransform = "lowercase",
}: PortfolioProjectCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-[#eb1b24]/40 hover:shadow-[0_18px_48px_-24px_rgba(235,27,36,0.35)] focus-within:border-[#eb1b24]/50">
      <div className="aspect-[16/10] overflow-hidden bg-white/[0.025]">
        <img
          src={imageSrc}
          alt={imageAlt}
          loading="lazy"
          decoding="async"
          className={`h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.035] ${
            imageFit === "contain" ? "object-contain" : "object-cover object-top"
          }`}
        />
      </div>

      <div className="flex items-center justify-between gap-4 p-5 sm:p-6">
        <h3
          className={`min-w-0 break-words text-lg font-semibold text-white sm:text-xl ${
            nameTextTransform === "lowercase" ? "lowercase" : ""
          }`}
        >
          {name}
        </h3>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-2 rounded-md border border-[#eb1b24]/45 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-white transition-colors duration-200 hover:border-[#eb1b24] hover:bg-[#eb1b24]/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eb1b24] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] sm:px-3.5 sm:text-xs"
        >
          {linkLabel}
          <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
        </a>
      </div>
    </article>
  );
}

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
            <PortfolioProjectCard
              key={name}
              name={name}
              url={url}
              imageSrc={`${import.meta.env.BASE_URL}portfolio/web-projects/${image}`}
              imageAlt={`${name} website preview`}
              linkLabel="Visit Website"
            />
          ))}
        </div>

        <section
          aria-labelledby="professional-work-heading"
          className="mt-8 border-t border-white/10 pt-6"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <div className="min-w-0">
              <h2
                id="professional-work-heading"
                className="text-lg font-semibold tracking-tight text-white sm:text-xl"
              >
                Explore Our Professional Work
              </h2>
              <p className="mt-1 text-xs leading-relaxed text-white/55 sm:text-sm">
                Discover our portfolio and completed projects.
              </p>
            </div>
            <a
              href={`${import.meta.env.BASE_URL}portfolio/trenex-portfolio_1792312947355.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-lg border border-[#eb1b24]/55 bg-[#eb1b24]/10 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-white transition-all duration-200 hover:border-[#eb1b24] hover:bg-[#eb1b24]/20 hover:shadow-[0_0_20px_rgba(235,27,36,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eb1b24] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] sm:w-auto"
            >
              View Our Portfolio PDF
              <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
            </a>
          </div>
        </section>

        <section
          id="application-projects"
          aria-labelledby="application-development-heading"
          className="mt-12 border-t border-white/10 pt-8 sm:mt-14 sm:pt-10"
        >
          <header className="mb-8 sm:mb-10">
            <span aria-hidden="true" className="mb-5 block h-px w-10 bg-[#eb1b24]/75" />
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-[#eb1b24]">
              Explore Our App Projects
            </p>
            <h2
              id="application-development-heading"
              className="text-3xl font-semibold uppercase tracking-tight text-white sm:text-4xl"
            >
              Application Development
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/55 md:text-base">
              Our app development expertise transforms your ideas into functional and engaging mobile applications.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {APP_PROJECTS.map(({ name, url, image }) => (
              <PortfolioProjectCard
                key={name}
                name={name}
                url={url}
                imageSrc={`${import.meta.env.BASE_URL}portfolio/application-projects/${image}`}
                imageAlt={`${name} app listing preview`}
                linkLabel="View on Google Play"
                imageFit="contain"
                nameTextTransform="normal"
              />
            ))}
          </div>

          <section
            aria-labelledby="app-contact-heading"
            className="mt-9 border-t border-white/10 pt-7 text-center sm:mt-10 sm:pt-8"
          >
            <h2
              id="app-contact-heading"
              className="text-2xl font-semibold tracking-tight text-white sm:text-3xl"
            >
              Have an App Idea?
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-white/55 md:text-base">
              Let&apos;s turn your idea into reality. Contact us to discuss your app development project.
            </p>
            <a
              href="https://wa.me/923323848135?text=Hi%20Trenex%20Agency%2C%20I%27m%20interested%20in%20your%20app%20development%20services.%20I%27d%20like%20to%20discuss%20my%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="relative mt-5 inline-flex items-center justify-center rounded-lg border border-[#eb1b24]/55 bg-[#eb1b24]/10 px-5 py-3 text-xs font-semibold tracking-[0.08em] text-white transition-all duration-200 hover:border-[#eb1b24] hover:bg-[#eb1b24]/20 hover:shadow-[0_0_20px_rgba(235,27,36,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eb1b24] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
            >
              Discuss Your App Project
              <span
                aria-hidden="true"
                className="absolute right-[9px] top-1/2 -translate-y-1/2 text-[13px] leading-none text-white/70"
              >
                →
              </span>
            </a>
          </section>
          <h2
            id="software-development-heading"
            className="mt-12 text-3xl font-semibold uppercase tracking-tight text-white sm:text-4xl"
          >
            SOFTWARE DEVELOPMENT
          </h2>
          <SoftwareServicesCarousel />
        </section>
      </div>
    </section>
  );
}
