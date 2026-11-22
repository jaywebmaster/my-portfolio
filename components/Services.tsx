import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { services } from "@/data/services";

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="border-t border-white/[0.06] py-24 sm:py-32"
    >
      <div className="container-page">
        <Reveal>
          <SectionHeader
            index="02"
            eyebrow="Services"
            titleId="services-title"
            title="What I can help you with."
            intro="Work I do regularly for agencies and business owners, from a single landing page to a full build and the upkeep that follows."
          />
        </Reveal>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ title, description, Icon }, index) => (
            <li key={title} className="flex">
              <Reveal delay={(index % 4) * 70} className="flex w-full">
                <article className="group flex w-full flex-col rounded-2xl border border-white/[0.07] bg-ink-850/60 p-6 transition-[border-color,background-color,transform] duration-500 ease-out-quint hover:border-accent/30 hover:bg-ink-850 motion-safe:hover:-translate-y-1">
                  <span className="grid size-11 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-accent transition-colors duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-ink-950">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <h3 className="mt-6 text-[1.1875rem] leading-snug">{title}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-mute">{description}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal delay={100}>
          <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-2xl border border-dashed border-white/12 px-6 py-5 sm:flex-row sm:items-center">
            <p className="text-paper-dim">
              Need something that isn’t listed? Tell me about it and I’ll say honestly whether it’s a
              fit.
            </p>
            <a
              href="#contact"
              className="group inline-flex shrink-0 items-center gap-2 font-medium text-accent transition-colors hover:text-accent-bright"
            >
              Ask me
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
