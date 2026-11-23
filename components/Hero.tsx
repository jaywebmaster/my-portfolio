import Image from "next/image";
import type { CSSProperties } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Blocks,
  CodeXml,
  Download,
  LayoutTemplate,
  ShoppingBag,
  type LucideIcon,
} from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { profile, resumePdf } from "@/data/profile";

/** Staggers the entrance animation of each hero element. */
const delay = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` });

const chips: {
  label: string;
  Icon: LucideIcon;
  position: string;
  /** Negative delays start each float at a different point in its cycle. */
  floatDelay: string;
  mobile: boolean;
}[] = [
  {
    label: "WordPress",
    Icon: Blocks,
    position: "left-3 top-3 sm:-left-7 sm:top-10",
    floatDelay: "0s",
    mobile: true,
  },
  {
    label: "Elementor",
    Icon: LayoutTemplate,
    position: "sm:-right-8 sm:top-[34%]",
    floatDelay: "-2.4s",
    mobile: false,
  },
  {
    label: "Shopify",
    Icon: ShoppingBag,
    position: "sm:-left-10 sm:bottom-[38%]",
    floatDelay: "-4.6s",
    mobile: false,
  },
  {
    label: "Web Development",
    Icon: CodeXml,
    position: "right-3 bottom-[5.75rem] sm:-right-6 sm:bottom-28",
    floatDelay: "-1.2s",
    mobile: true,
  },
];

const facts = [
  { label: "Experience", value: `${profile.yearsExperience} years` },
  { label: "Works", value: profile.workArrangement },
  { label: "Based in", value: profile.location },
];

export function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      {/* Atmosphere: hairline grid plus a warm glow that echoes the portrait backdrop. */}
      <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="absolute top-[-8%] right-[-18%] -z-10 size-[44rem] rounded-full bg-[radial-gradient(closest-side,rgb(244_138_66/0.17),transparent)] lg:right-[-6%]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-ink-900"
      />

      <div className="container-page grid items-center gap-12 pt-24 pb-20 sm:pt-28 lg:grid-cols-12 lg:gap-10 lg:pt-36 lg:pb-28 xl:gap-16">
        <div className="lg:col-span-7">
          <p className="label-mono inline-flex animate-rise items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] py-1.5 pr-3.5 pl-3 text-paper-dim">
            <span className="relative flex size-2" aria-hidden="true">
              <span className="absolute inset-0 animate-ping-soft rounded-full bg-signal" />
              <span className="relative size-2 rounded-full bg-signal" />
            </span>
            {profile.availability}
          </p>

          <h1
            id="hero-title"
            className="mt-7 animate-rise text-[clamp(2.625rem,6.2vw,4.75rem)]"
            style={delay(80)}
          >
            <span className="font-medium text-mute">Hi, I’m </span>
            {profile.name}.
          </h1>

          <p
            className="mt-5 max-w-[24ch] animate-rise font-display text-[clamp(1.375rem,2.6vw,2rem)] leading-[1.18] font-medium tracking-[-0.02em] text-paper-dim"
            style={delay(160)}
          >
            Building modern, <span className="text-accent">high-performing</span> websites for
            businesses.
          </p>

          <p
            className="mt-6 max-w-[36rem] animate-rise text-[1.0625rem] leading-relaxed text-mute"
            style={delay(240)}
          >
            I’m a WordPress and full-stack developer with {profile.yearsExperience} years of
            experience building, customizing and maintaining websites for agencies and direct
            clients, on WordPress and Elementor, WooCommerce, Shopify, Webflow and Next.js.
            Pixel-perfect, fast, and built to work on every screen.
          </p>

          <div
            className="mt-9 flex animate-rise flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
            style={delay(320)}
          >
            <ButtonLink href="#projects">
              View My Work
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </ButtonLink>
            <ButtonLink href={resumePdf} download variant="secondary">
              <Download aria-hidden="true" className="size-4" />
              Download Resume
            </ButtonLink>
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-1.5 rounded-full px-3 py-3 text-[0.9375rem] font-medium text-paper-dim transition-colors hover:text-paper sm:ml-1"
            >
              <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 ease-out-quint group-hover:bg-[length:100%_1px]">
                Let’s Work Together
              </span>
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 text-accent transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>

          <dl
            className="mt-12 grid max-w-xl animate-rise grid-cols-3 divide-x divide-white/[0.07] border-t border-white/[0.07] pt-6"
            style={delay(400)}
          >
            {facts.map((fact) => (
              <div key={fact.label} className="px-4 first:pl-0 sm:px-6">
                <dt className="label-mono text-mute">{fact.label}</dt>
                <dd className="mt-1.5 font-display text-[1.0625rem] font-semibold tracking-tight sm:text-xl">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* The photo card itself never animates: it is the page's largest element,
            and any entrance motion on it delays when browsers count it as painted.
            The frame and glow behind it carry the entrance instead. */}
        <figure className="relative order-first mx-auto w-full max-w-[26rem] lg:order-none lg:col-span-5 lg:max-w-none">
          <div
            aria-hidden="true"
            className="absolute inset-0 translate-x-2.5 translate-y-2.5 animate-frame rounded-[1.75rem] border border-accent/25 sm:translate-x-4 sm:translate-y-4"
          />
          <div
            aria-hidden="true"
            className="absolute inset-[8%] -z-10 animate-glow rounded-full bg-accent/25 blur-[70px]"
          />

          <div className="relative overflow-hidden rounded-[1.75rem] bg-ink-850 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.8)] ring-1 ring-white/10">
            <div className="relative aspect-[5/4] bg-accent lg:aspect-[4/5]">
              <Image
                src={profile.photo.src}
                alt={profile.photo.alt}
                fill
                loading="eager"
                fetchPriority="high"
                quality={90}
                sizes="(min-width: 80rem) 30rem, (min-width: 64rem) 38vw, (min-width: 28rem) 26rem, 100vw"
                className="object-cover object-[50%_22%] lg:object-[50%_30%]"
              />
            </div>
            <figcaption className="flex items-center justify-between gap-4 border-t border-white/[0.07] px-5 py-4">
              <div>
                <p className="font-display text-[1.0625rem] font-semibold tracking-tight">
                  {profile.name}
                </p>
                <p className="label-mono mt-1 text-mute">WordPress · Web · Full-Stack</p>
              </div>
              <p className="label-mono text-right leading-relaxed text-mute">
                PH
                <br />
                {profile.timezone}
              </p>
            </figcaption>
          </div>

          {chips.map(({ label, Icon, position, floatDelay, mobile }) => (
            <div
              key={label}
              className={`absolute ${position} ${mobile ? "flex" : "hidden sm:flex"} animate-float items-center gap-2 rounded-full border border-white/10 bg-ink-850/80 py-1.5 pr-3.5 pl-2 text-[0.8125rem] font-medium text-paper shadow-[0_12px_32px_-8px_rgb(0_0_0/0.6)] backdrop-blur-md`}
              style={{ animationDelay: floatDelay }}
            >
              <span className="grid size-6 place-items-center rounded-full bg-accent/15 text-accent">
                <Icon aria-hidden="true" className="size-3.5" />
              </span>
              {label}
            </div>
          ))}
        </figure>
      </div>
    </section>
  );
}
