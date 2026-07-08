import { motion } from "framer-motion";
import { Palette, Clapperboard, Code2 } from "lucide-react";
import { services } from "@/data/site";
import { ServiceCard } from "./ServiceCard";
import { SectionAmbience } from "@/components/SectionAmbience";

const icons = [
  <Palette key="palette" className="h-8 w-8" strokeWidth={1.5} />,
  <Clapperboard key="clapperboard" className="h-8 w-8" strokeWidth={1.5} />,
  <Code2 key="code" className="h-8 w-8" strokeWidth={1.5} />,
];

export function Services() {
  return (
    <motion.section
      id="services"
      className="relative w-full overflow-hidden bg-[#050505]/75 px-5 py-20 sm:px-6 sm:py-28 md:py-36"
      initial={{ opacity: 0, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1.1, ease: "easeOut" }}
    >
      <SectionAmbience variant="services" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-12 flex flex-col items-start gap-4 sm:mb-16 md:mb-24"
        >
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-[#FF1F1F]">
            What We Do
          </span>
          <h2 className="text-3xl font-semibold uppercase tracking-tight text-white sm:text-4xl md:text-5xl">
            Our Services
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} icon={icons[i]} delay={i * 0.15} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
