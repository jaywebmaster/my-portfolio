import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { skillGroups } from "@/data/resume";

export function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="border-t border-white/[0.06] py-24 sm:py-32"
    >
      <div className="container-page">
        <Reveal>
          <SectionHeader
            index="04"
            eyebrow="Skills"
            titleId="skills-title"
            title="The platforms and tools I work with."
            intro="Grouped by what they’re for. No skill bars or percentages: the projects below show the work better than a number could."
          />
        </Reveal>

        <ul className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, index) => {
            const primary = group.id === "wordpress";
            // WordPress spans two columns, so the last group closes the grid at full width.
            const span = primary ? "lg:col-span-2" : index === skillGroups.length - 1 ? "lg:col-span-3" : "";
            return (
              <li key={group.id} className={`flex ${span}`}>
                <Reveal delay={(index % 3) * 70} className="flex w-full">
                  <article
                    className={`flex w-full flex-col rounded-2xl border p-6 sm:p-7 ${
                      primary
                        ? "border-accent/25 bg-[linear-gradient(135deg,rgb(244_138_66/0.10),transparent_60%)]"
                        : "border-white/[0.07] bg-ink-850/60"
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="text-[1.25rem]">{group.title}</h3>
                      <span aria-hidden="true" className="label-mono text-faint">
                        {String(group.items.length).padStart(2, "0")}
                      </span>
                    </div>
                    <p className="mt-2 text-[0.9375rem] text-mute">{group.note}</p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className={`rounded-full border px-3 py-1.5 text-[0.875rem] ${
                            primary
                              ? "border-accent/25 bg-accent/[0.07] text-paper"
                              : "border-white/10 bg-white/[0.03] text-paper-dim"
                          }`}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
