import { motion } from "framer-motion";
import { services } from "@/data/site";

export function Services() {
  return (
    <section
      id="services"
      className="relative w-full bg-black px-6 py-28 md:py-36"
    >
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

        <div className="grid grid-cols-1 divide-y divide-white/10 border-y border-white/10 md:grid-cols-3 md:divide-x md:divide-y-0">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              data-testid={`card-service-${service.index}`}
              className="group relative flex flex-col justify-between gap-10 px-2 py-10 transition-colors duration-500 hover:bg-white/[0.03] md:px-8 md:py-14"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
            >
              <span className="font-mono text-sm text-white/30 transition-colors duration-500 group-hover:text-[#FF1F1F]">
                {service.index}
              </span>

              <div>
                <h3 className="mb-4 text-2xl font-semibold text-white md:text-3xl">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/50 md:text-base">
                  {service.description}
                </p>
              </div>

              <span className="absolute bottom-0 left-0 h-px w-0 bg-[#FF1F1F] transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
