import { Globe2, Mail, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { mailto, profile } from "@/data/profile";

export function Contact() {
  const methods = [
    { label: "Email", value: profile.email, href: mailto, Icon: Mail },
    { label: "Mobile", value: profile.phone.display, href: profile.phone.href, Icon: Phone },
    {
      label: "Availability",
      value: "Open to remote opportunities worldwide",
      sub: `${profile.location} · ${profile.timezone}`,
      Icon: Globe2,
    },
  ];

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative isolate overflow-hidden border-t border-white/[0.06] py-24 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="absolute bottom-[-20%] left-[-15%] -z-10 size-[48rem] rounded-full bg-[radial-gradient(closest-side,rgb(244_138_66/0.12),transparent)]"
      />
      <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-12">
        {/* min-w-0: grid items otherwise grow to fit their longest unbreakable line. */}
        <div className="min-w-0 lg:col-span-5">
          <Reveal>
            <SectionHeader
              index="07"
              eyebrow="Contact"
              titleId="contact-title"
              title={
                <>
                  Have a project in mind? <span className="text-accent">Let’s work together.</span>
                </>
              }
              intro="Tell me about the site you need, the fix that’s been waiting, or the maintenance you’d like off your plate. Prefer email or a call? Use the details below."
            />
          </Reveal>

          <Reveal delay={80}>
            <ul className="mt-10 space-y-3">
              {methods.map(({ label, value, href, sub, Icon }) => {
                const body = (
                  <>
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-accent transition-colors group-hover:border-accent/40">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="label-mono block text-mute">{label}</span>
                      <span className="mt-1 block font-medium break-words text-paper">{value}</span>
                      {sub ? <span className="mt-0.5 block text-sm text-mute">{sub}</span> : null}
                    </span>
                  </>
                );
                return (
                  <li key={label}>
                    {href ? (
                      <a
                        href={href}
                        className="group flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-ink-850/60 p-4 transition-colors hover:border-white/20"
                      >
                        {body}
                      </a>
                    ) : (
                      <div className="flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-ink-850/60 p-4">
                        {body}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={mailto}>
                <Mail aria-hidden="true" className="size-4" />
                Email Me
              </ButtonLink>
              <ButtonLink href={profile.phone.href} variant="secondary">
                <Phone aria-hidden="true" className="size-4" />
                Call Me
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        <Reveal delay={100} className="min-w-0 lg:col-span-7">
          <h3 className="sr-only">Send a message</h3>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
