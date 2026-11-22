import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { profile } from "@/data/profile";
import { experience } from "@/data/resume";

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="border-t border-white/[0.06] py-24 sm:py-32"
    >
      <div className="container-page">
        <Reveal>
          <SectionHeader
            index="03"
            eyebrow="Experience"
            titleId="experience-title"
            title={`${profile.yearsExperience} years building for agencies and their clients.`}
          />
        </Reveal>

        <ol className="mt-16 space-y-16">
          {experience.map((role, index) => (
            <li key={role.company} className="grid gap-6 lg:grid-cols-12 lg:gap-10">
              <Reveal className="lg:col-span-4">
                <div className="lg:sticky lg:top-28">
                  <p className="label-mono text-accent">{role.period}</p>
                  <h3 className="mt-3 text-[clamp(1.75rem,3vw,2.25rem)]">{role.company}</h3>
                  <p className="mt-2 text-paper-dim">{role.title}</p>
                </div>
              </Reveal>

              <Reveal delay={80} className="lg:col-span-8">
                <div className="relative border-l border-white/10 pl-7 sm:pl-9">
                  <span
                    aria-hidden="true"
                    className="absolute top-1.5 -left-[5px] size-2.5 rounded-full bg-accent ring-4 ring-ink-900"
                  />
                  <p className="text-lg text-paper">{role.focus}</p>
                  <ul className="mt-6 space-y-3.5">
                    {role.highlights.map((item) => (
                      <li key={item} className="flex gap-3.5 leading-relaxed text-mute">
                        <span
                          aria-hidden="true"
                          className="mt-[0.6em] h-px w-3 shrink-0 bg-accent/60"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-7">
                    <h4 className="sr-only">Technologies used at {role.company}</h4>
                    <ul className="flex flex-wrap gap-2">
                      {role.tech.map((tech) => (
                        <li
                          key={tech}
                          className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[0.8125rem] text-paper-dim"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {index < experience.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-16 -left-px h-16 w-px bg-gradient-to-b from-white/10 to-transparent"
                    />
                  ) : null}
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
