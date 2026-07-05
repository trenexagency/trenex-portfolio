import { motion } from "framer-motion";
import { services } from "@/data/site";

export function Services() {
  return (
    <section id="services" className="relative w-full bg-[#050505]/90 px-6 py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-16 flex flex-col items-start gap-4 md:mb-24"
        >
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-[#FF1F1F]">
            What We Do
          </span>
          <h2 className="text-4xl font-semibold uppercase tracking-tight text-white md:text-5xl">
            Our Services
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              data-testid={`card-service-${service.index}`}
              className="group relative flex flex-col justify-between gap-12 overflow-hidden rounded-sm border border-white/10 bg-white/[0.02] p-8 transition-all duration-500 hover:-translate-y-2 hover:border-[#FF1F1F]/60 hover:shadow-[0_0_45px_rgba(255,31,31,0.18)] md:p-10"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
            >
              <span
                className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "radial-gradient(circle, rgba(255,31,31,0.35), transparent 70%)" }}
              />

              <span className="relative font-mono text-sm text-white/30 transition-colors duration-500 group-hover:text-[#FF1F1F]">
                {service.index}
              </span>

              <div className="relative">
                <h3 className="mb-4 text-2xl font-semibold text-white md:text-3xl">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/50 md:text-base">
                  {service.description}
                </p>
              </div>

              <span className="relative h-px w-0 bg-[#FF1F1F] transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
