import { Download } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { mailto, profile, resumePdf, socials } from "@/data/profile";
import { certifications, education, experience, skillGroups, summary } from "@/data/resume";

function SheetHeading({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="label-mono flex items-center gap-3 font-sans text-accent-ink">
      {children}
      <span aria-hidden="true" className="h-px flex-1 bg-ink-900/15" />
    </h4>
  );
}

export function ResumeSection() {
  return (
    <section
      id="resume"
      aria-labelledby="resume-title"
      className="border-t border-white/[0.06] py-24 sm:py-32"
    >
      <div className="container-page">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal>
            <SectionHeader
              index="06"
              eyebrow="Resume"
              titleId="resume-title"
              title="My resume, on one page."
              intro="The short version of my experience and skills. The PDF is a plain, single-column layout that reads cleanly in applicant tracking systems."
            />
          </Reveal>
          <Reveal delay={80}>
            <ButtonLink href={resumePdf} download className="h-14 px-7 text-base">
              <Download aria-hidden="true" className="size-5" />
              Download Resume (PDF)
            </ButtonLink>
          </Reveal>
        </div>

        <Reveal delay={100}>
          <article
            aria-label={`Resume of ${profile.name}`}
            className="relative mt-14 overflow-hidden rounded-[1.25rem] bg-paper text-ink-900 shadow-[0_50px_100px_-40px_rgb(0_0_0/0.9)]"
          >
            <div aria-hidden="true" className="h-1.5 bg-accent" />
            <div className="p-6 sm:p-10 lg:p-14">
              <header className="flex flex-col justify-between gap-6 border-b border-ink-900/15 pb-8 md:flex-row md:items-end">
                <div>
                  <h3 className="text-[clamp(2rem,4vw,2.75rem)] text-ink-950">{profile.name}</h3>
                  <p className="mt-2 font-medium text-ink-700">{profile.titles.join(" · ")}</p>
                </div>
                <ul className="space-y-1 text-[0.9375rem] text-ink-700 md:text-right">
                  <li>
                    <a href={mailto} className="underline-offset-4 hover:underline">
                      {profile.email}
                    </a>
                  </li>
                  <li>
                    <a href={profile.phone.href} className="underline-offset-4 hover:underline">
                      {profile.phone.display}
                    </a>
                  </li>
                  <li>
                    {profile.location} · {profile.workArrangement}
                  </li>
                </ul>
              </header>

              <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_19rem] lg:gap-14">
                <div className="space-y-10">
                  <section aria-label="Professional summary">
                    <SheetHeading>Professional summary</SheetHeading>
                    <p className="mt-4 leading-relaxed text-ink-700">{summary}</p>
                  </section>

                  <section aria-label="Work experience">
                    <SheetHeading>Work experience</SheetHeading>
                    <div className="mt-5 space-y-8">
                      {experience.map((role) => (
                        <div key={role.company}>
                          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                            <p className="font-display text-[1.1875rem] font-semibold tracking-tight text-ink-950">
                              {role.title}, {role.company}
                            </p>
                            <p className="font-mono text-[0.8125rem] text-ink-700">{role.period}</p>
                          </div>
                          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[0.9375rem] leading-relaxed text-ink-700 marker:text-accent-ink">
                            {role.highlights.slice(0, 3).map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section aria-label="Education">
                    <SheetHeading>Education</SheetHeading>
                    <div className="mt-5 space-y-4">
                      {education.map((item) => (
                        <div
                          key={item.credential}
                          className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1"
                        >
                          <div>
                            <p className="font-semibold text-ink-950">{item.credential}</p>
                            <p className="text-[0.9375rem] text-ink-700">{item.school}</p>
                          </div>
                          <p className="font-mono text-[0.8125rem] text-ink-700">{item.period}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  {certifications.length > 0 ? (
                    <section aria-label="Certifications">
                      <SheetHeading>Certifications</SheetHeading>
                      <ul className="mt-4 list-disc space-y-1 pl-5 text-ink-700">
                        {certifications.map((c) => (
                          <li key={c}>{c}</li>
                        ))}
                      </ul>
                    </section>
                  ) : null}
                </div>

                <div className="space-y-10">
                  <section aria-label="Technical skills">
                    <SheetHeading>Technical skills</SheetHeading>
                    <dl className="mt-5 space-y-4">
                      {skillGroups.map((group) => (
                        <div key={group.id}>
                          <dt className="text-[0.875rem] font-semibold text-ink-950">{group.title}</dt>
                          <dd className="mt-1 text-[0.875rem] leading-relaxed text-ink-700">
                            {group.items.join(", ")}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </section>

                  <section aria-label="Links">
                    <SheetHeading>Links</SheetHeading>
                    <ul className="mt-4 space-y-1.5 text-[0.9375rem]">
                      {socials.map((s) => (
                        <li key={s.label}>
                          <a
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-ink-700 underline-offset-4 hover:text-accent-ink hover:underline"
                          >
                            {s.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
