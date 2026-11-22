"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, Mail, Menu, Phone, X } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { mailto, navItems, profile, type SectionId } from "@/data/profile";

const SECTION_IDS = navItems.map((item) => item.id);

/**
 * The section crossing a thin band just above the middle of the viewport is
 * "active". At the very bottom of the page the last section wins, since a
 * short Contact section may never reach the band.
 */
function useActiveSection(): SectionId {
  const [inBand, setInBand] = useState<SectionId>("home");
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const visible = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) visible.set(entry.target.id, entry.isIntersecting);
        const current = SECTION_IDS.find((id) => visible.get(id));
        if (current) setInBand(current);
      },
      { rootMargin: "-42% 0px -52% 0px", threshold: 0 },
    );
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    const onScroll = () => {
      const doc = document.documentElement;
      setAtBottom(window.innerHeight + window.scrollY >= doc.scrollHeight - 4);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return atBottom ? SECTION_IDS[SECTION_IDS.length - 1] : inBand;
}

function useScrolled(offset = 8): boolean {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [offset]);
  return scrolled;
}

/**
 * `onHome` false (project pages): links point back to the home page sections
 * and no section is highlighted.
 */
export function SiteHeader({ onHome = true }: { onHome?: boolean }) {
  const sectionInView = useActiveSection();
  const active: SectionId | null = onHome ? sectionInView : null;
  const hrefFor = (id: SectionId) => (onHome ? `#${id}` : `/#${id}`);
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);

  // Sliding pill behind the active desktop link.
  const listRef = useRef<HTMLUListElement>(null);
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);

  const measurePill = useCallback(() => {
    // Measure the <li>: it is positioned (so links paint above the pill), which
    // makes it the link's offsetParent; its own offsets are relative to the <ul>.
    const item = listRef.current
      ?.querySelector<HTMLAnchorElement>(`a[data-section="${active}"]`)
      ?.closest("li");
    if (item) setPill({ left: item.offsetLeft, width: item.offsetWidth });
  }, [active]);

  useEffect(() => {
    measurePill();
    window.addEventListener("resize", measurePill);
    // Re-measure once web fonts settle, since link widths change with them.
    document.fonts?.ready.then(measurePill).catch(() => {});
    return () => window.removeEventListener("resize", measurePill);
  }, [measurePill]);

  const close = useCallback((restoreFocus = false) => {
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  // While the mobile menu is open: lock page scroll, close on Escape or when
  // the viewport grows past the desktop breakpoint, and focus the first link.
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    firstMobileLinkRef.current?.focus({ preventScroll: true });

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close(true);
    };
    const desktop = window.matchMedia("(min-width: 64rem)");
    const onChange = () => desktop.matches && close();
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onChange);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onChange);
    };
  }, [open, close]);

  const solid = scrolled || open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500 ${
          solid
            ? "border-white/[0.06] bg-ink-900/80 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="container-page flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
          <a
            href={onHome ? "#home" : "/"}
            className="group flex items-center gap-3 rounded-lg"
            aria-label={`${profile.name}, back to top`}
            onClick={() => close()}
          >
            <span
              aria-hidden="true"
              className="grid size-9 place-items-center rounded-[10px] bg-accent font-display text-[0.875rem] font-bold tracking-tight text-ink-950 transition-transform duration-500 ease-out-quint group-hover:-rotate-6"
            >
              JD
            </span>
            <span className="font-display text-[1.0625rem] font-semibold tracking-tight">
              {profile.name}
            </span>
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul
              ref={listRef}
              className="relative flex items-center gap-0.5 rounded-full border border-white/[0.07] bg-white/[0.025] p-1"
            >
              <span
                aria-hidden="true"
                className="absolute top-1 bottom-1 rounded-full bg-white/[0.08] transition-[left,width,opacity] duration-500 ease-out-quint"
                style={{
                  left: pill?.left ?? 0,
                  width: pill?.width ?? 0,
                  opacity: pill ? 1 : 0,
                }}
              />
              {navItems.map((item) => {
                const isActive = active === item.id;
                return (
                  <li key={item.id} className="relative">
                    <a
                      href={hrefFor(item.id)}
                      data-section={item.id}
                      aria-current={isActive ? "true" : undefined}
                      className={`block rounded-full px-3.5 py-1.5 text-sm transition-colors duration-300 ${
                        isActive ? "text-paper" : "text-mute hover:text-paper"
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            {/* Wrapper owns visibility so it can't fight the button's own display class. */}
            <div className="hidden min-[22.5rem]:block">
              <ButtonLink href={hrefFor("contact")} size="sm">
                Let’s Talk
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </ButtonLink>
            </div>
            <button
              ref={toggleRef}
              type="button"
              className="grid size-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-paper transition-colors hover:bg-white/[0.07] lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? (
                <X aria-hidden="true" className="size-5" />
              ) : (
                <Menu aria-hidden="true" className="size-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        inert={!open}
        // Opening switches visibility instantly (so the first link can take focus
        // right away); closing keeps it visible until the fade-out finishes.
        className={`fixed inset-x-0 top-16 bottom-0 z-40 bg-ink-950/95 backdrop-blur-xl duration-300 lg:hidden ${
          open
            ? "visible opacity-100 transition-opacity"
            : "invisible opacity-0 transition-[opacity,visibility]"
        }`}
      >
        <nav
          aria-label="Mobile"
          className="container-page flex h-full flex-col justify-between overflow-y-auto pt-6 pb-[max(2rem,env(safe-area-inset-bottom))]"
        >
          <ol>
            {navItems.map((item, index) => {
              const isActive = active === item.id;
              return (
                <li
                  key={item.id}
                  className={`transition-[opacity,transform] duration-500 ease-out-quint ${
                    open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                  }`}
                  style={{ transitionDelay: open ? `${60 + index * 40}ms` : "0ms" }}
                >
                  <a
                    ref={index === 0 ? firstMobileLinkRef : undefined}
                    href={hrefFor(item.id)}
                    aria-current={isActive ? "true" : undefined}
                    onClick={() => close()}
                    className="flex items-baseline gap-4 border-b border-white/[0.06] py-3.5"
                  >
                    <span aria-hidden="true" className="label-mono w-6 text-faint">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`font-display text-[1.875rem] leading-none font-semibold tracking-tight transition-colors ${
                        isActive ? "text-accent" : "text-paper"
                      }`}
                    >
                      {item.label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ol>

          <div
            className={`mt-10 space-y-5 transition-[opacity,transform] delay-300 duration-500 ease-out-quint ${
              open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
          >
            <ul className="space-y-2 text-[0.9375rem] text-paper-dim">
              <li>
                <a href={mailto} className="inline-flex items-center gap-3 py-1 hover:text-paper">
                  <Mail aria-hidden="true" className="size-4 text-accent" />
                  {profile.email}
                </a>
              </li>
              <li>
                <a
                  href={profile.phone.href}
                  className="inline-flex items-center gap-3 py-1 hover:text-paper"
                >
                  <Phone aria-hidden="true" className="size-4 text-accent" />
                  {profile.phone.display}
                </a>
              </li>
            </ul>
            <ButtonLink href={hrefFor("contact")} className="w-full" onClick={() => close()}>
              Let’s Talk
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </ButtonLink>
          </div>
        </nav>
      </div>
    </>
  );
}
