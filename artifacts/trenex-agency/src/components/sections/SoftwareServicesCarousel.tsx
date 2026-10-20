import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const SOFTWARE_SERVICES = [
  {
    title: "School Management System",
    description:
      "Simplify student records, attendance, fee tracking, and academic administration in one place.",
  },
  {
    title: "Restaurant POS System",
    description:
      "Manage orders, billing, menus, and daily restaurant operations with greater speed and accuracy.",
  },
  {
    title: "ERP Software",
    description:
      "Connect your core business operations, data, and workflows through one centralized system.",
  },
  {
    title: "Bakery Management System",
    description:
      "Track orders, production, inventory, and sales to keep bakery operations organized.",
  },
  {
    title: "Gym Management System",
    description:
      "Manage memberships, attendance, payments, and daily gym operations more efficiently.",
  },
  {
    title: "Custom Software Development",
    description:
      "Need a better way to manage your workload? Let’s build software around your business processes, goals, and requirements.",
  },
];

const SOFTWARE_WHATSAPP_URL =
  "https://wa.me/923323848135?text=Hi%20Trenex%20Agency%2C%20I%27d%20like%20to%20discuss%20my%20custom%20software%20requirements.";

export function SoftwareServicesCarousel() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const scrollTimeoutRef = useRef<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const syncControls = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    setCanScrollPrev(viewport.scrollLeft > 1);
    setCanScrollNext(
      viewport.scrollLeft < viewport.scrollWidth - viewport.clientWidth - 1,
    );

    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;
    slideRefs.current.forEach((slide, index) => {
      if (!slide) return;
      const distance = Math.abs(slide.offsetLeft - viewport.scrollLeft);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });
    setSelectedIndex(nearestIndex);
  }, []);

  const handleScroll = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    setCanScrollPrev(viewport.scrollLeft > 1);
    setCanScrollNext(
      viewport.scrollLeft < viewport.scrollWidth - viewport.clientWidth - 1,
    );
    if (scrollTimeoutRef.current !== null) {
      window.clearTimeout(scrollTimeoutRef.current);
    }
    scrollTimeoutRef.current = window.setTimeout(syncControls, 100);
  }, [syncControls]);

  const scrollToSlide = useCallback((index: number) => {
    const viewport = viewportRef.current;
    const slide = slideRefs.current[index];
    if (!viewport || !slide) return;

    viewport.scrollTo({ left: slide.offsetLeft, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    syncControls();
    const observer = new ResizeObserver(syncControls);
    observer.observe(viewport);
    return () => {
      observer.disconnect();
      if (scrollTimeoutRef.current !== null) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [syncControls]);

  return (
    <div
      className="mt-7"
      role="region"
      aria-roledescription="carousel"
      aria-labelledby="software-development-heading"
      data-testid="carousel-software-services"
    >
      <div
        ref={viewportRef}
        onScroll={handleScroll}
        className="snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="relative flex w-full gap-4">
          {SOFTWARE_SERVICES.map((service, index) => {
            const isCustomSoftware = index === SOFTWARE_SERVICES.length - 1;

            return (
              <div
                key={service.title}
                ref={(element) => {
                  slideRefs.current[index] = element;
                }}
                className="min-w-0 shrink-0 grow-0 snap-start basis-[84%] sm:basis-[80%] lg:basis-[76%]"
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${SOFTWARE_SERVICES.length}: ${service.title}`}
                aria-hidden={selectedIndex !== index}
                data-testid={`card-software-service-${index + 1}`}
              >
                <article className="flex h-full min-h-[300px] flex-col rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.045] to-white/[0.01] p-6 transition-colors duration-300 hover:border-[#eb1b24]/35 sm:min-h-[290px] sm:p-8">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#eb1b24]">
                      {String(index + 1).padStart(2, "0")} / 06
                    </span>
                    <span
                      aria-hidden="true"
                      className="h-px w-12 bg-[#eb1b24]/55"
                    />
                  </div>

                  <div className="mt-8">
                    <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                      {service.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/55 md:text-base">
                      {service.description}
                    </p>
                  </div>

                  {isCustomSoftware && (
                    <a
                      href={SOFTWARE_WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      tabIndex={selectedIndex === index ? 0 : -1}
                      data-testid="link-discuss-software-requirements"
                      className="mt-auto inline-flex w-fit items-center gap-2 rounded-lg border border-[#eb1b24]/55 bg-[#eb1b24]/10 px-4 py-2.5 text-xs font-semibold tracking-[0.06em] text-white transition-all duration-200 hover:border-[#eb1b24] hover:bg-[#eb1b24]/20 hover:shadow-[0_0_20px_rgba(235,27,36,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eb1b24] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
                    >
                      Discuss Your Requirements
                      <span aria-hidden="true">→</span>
                    </a>
                  )}
                </article>
              </div>
            );
          })}
          <div
            aria-hidden="true"
            className="shrink-0 basis-[calc(16%_-_1rem)] sm:basis-[calc(20%_-_1rem)] lg:basis-[calc(24%_-_1rem)]"
          />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-0.5" aria-label="Choose a slide">
          {SOFTWARE_SERVICES.map((service, index) => (
            <button
              key={service.title}
              type="button"
              aria-label={`Go to slide ${index + 1}: ${service.title}`}
              aria-current={selectedIndex === index ? "true" : undefined}
              data-testid={`button-software-service-slide-${index + 1}`}
              onClick={() => scrollToSlide(index)}
              className="flex h-10 w-6 items-center justify-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eb1b24]"
            >
              <span
                aria-hidden="true"
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  selectedIndex === index
                    ? "w-5 bg-[#eb1b24]"
                    : "w-1.5 bg-white/30 hover:bg-white/60"
                }`}
              />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous software service"
            data-testid="button-software-service-previous"
            disabled={!canScrollPrev}
            onClick={() => scrollToSlide(Math.max(0, selectedIndex - 1))}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/75 transition-colors hover:border-[#eb1b24]/60 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eb1b24] disabled:cursor-not-allowed disabled:opacity-35"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Next software service"
            data-testid="button-software-service-next"
            disabled={!canScrollNext}
            onClick={() =>
              scrollToSlide(
                Math.min(SOFTWARE_SERVICES.length - 1, selectedIndex + 1),
              )
            }
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#eb1b24]/55 bg-[#eb1b24]/10 text-white transition-colors hover:border-[#eb1b24] hover:bg-[#eb1b24]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eb1b24] disabled:cursor-not-allowed disabled:opacity-35"
          >
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        Slide {selectedIndex + 1} of {SOFTWARE_SERVICES.length}:{" "}
        {SOFTWARE_SERVICES[selectedIndex]?.title}
      </p>
    </div>
  );
}
