import { ArrowUp } from "lucide-react";
import { CurrentYear } from "@/components/CurrentYear";
import { SocialIcon } from "@/components/SocialIcon";
import { mailto, navItems, profile, socials } from "@/data/profile";

export function SiteFooter({ onHome = true }: { onHome?: boolean }) {
  const prefix = onHome ? "" : "/";
  return (
    <footer className="border-t border-white/[0.06] bg-ink-950">
      <div className="container-page grid gap-12 py-16 sm:py-20 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <a href={onHome ? "#home" : "/"} className="group inline-flex items-center gap-3 rounded-lg">
            <span
              aria-hidden="true"
              className="grid size-9 place-items-center rounded-[10px] bg-accent font-display text-[0.875rem] font-bold text-ink-950"
            >
              JD
            </span>
            <span className="font-display text-[1.0625rem] font-semibold tracking-tight">
              {profile.name}
            </span>
          </a>
          <p className="mt-4 text-paper-dim">{profile.titles.join(" · ")}</p>
          <p className="mt-2 max-w-sm text-mute">
            {profile.availability}. Based in the {profile.location} ({profile.timezone}).
          </p>
          <a
            href={mailto}
            className="mt-6 inline-block font-display text-[clamp(1.25rem,2.4vw,1.625rem)] font-semibold tracking-tight text-paper underline decoration-accent/40 decoration-2 underline-offset-[6px] transition-colors hover:text-accent"
          >
            {profile.email}
          </a>
        </div>

        <nav aria-label="Footer" className="lg:col-span-3">
          <h2 className="label-mono font-sans text-mute">Navigate</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-1 lg:grid-cols-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`${prefix}#${item.id}`}
                  className="inline-block py-1 text-paper-dim transition-colors hover:text-paper"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-4">
          <h2 className="label-mono font-sans text-mute">Get in touch</h2>
          <ul className="mt-4 space-y-1">
            <li>
              <a href={mailto} className="inline-block py-1 text-paper-dim transition-colors hover:text-paper">
                {profile.email}
              </a>
            </li>
            <li>
              <a href={profile.phone.href} className="inline-block py-1 text-paper-dim transition-colors hover:text-paper">
                {profile.phone.display}
              </a>
            </li>
          </ul>
          <ul className="mt-6 flex gap-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.label} (opens in a new tab)`}
                  className="grid size-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-paper-dim transition-colors hover:border-accent/50 hover:text-accent"
                >
                  <SocialIcon name={s.label} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/[0.06]">
        <div className="container-page flex flex-col gap-4 py-6 text-sm text-mute sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CurrentYear buildYear={new Date().getFullYear()} /> {profile.name}. Designed and
            developed by {profile.name}.
          </p>
          <a
            href={onHome ? "#home" : "#top"}
            className="group inline-flex items-center gap-2 self-start transition-colors hover:text-paper sm:self-auto"
          >
            Back to top
            <ArrowUp
              aria-hidden="true"
              className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
