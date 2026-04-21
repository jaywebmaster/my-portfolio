"use client";
import { useState, useEffect, useRef, useCallback } from "react";

const NAV = ["About", "Skills", "Projects", "Contact"];

const SKILLS = [
  { label: "HTML & CSS", pct: 100 },
  { label: "Page Builders", pct: 95, sub: "Elementor, Divi, Beaver, Guten" },
  { label: "PHP", pct: 90 },
  { label: "JavaScript", pct: 90 },
  { label: "Git & GitHub", pct: 85 },
  { label: "REST APIs", pct: 75 },
  { label: "React", pct: 70 },
  { label: "Next.js", pct: 70 },
];

const PROJECTS = [
  {
    title: "Enterprise CMS Platform",
    desc: "A scalable content management system built with PHP and custom WordPress architecture, serving 500k+ monthly visitors.",
    tags: ["PHP", "WordPress", "MySQL", "REST API"],
    year: "2024",
    link: "#",
  },
  {
    title: "E-Commerce Storefront",
    desc: "High-converting WooCommerce store with custom Elementor theme, optimized for Core Web Vitals and mobile-first UX.",
    tags: ["Elementor", "WooCommerce", "PHP", "CSS"],
    year: "2023",
    link: "#",
  },
  {
    title: "React SaaS Dashboard",
    desc: "Full-featured analytics dashboard with real-time data, dynamic charts, and a clean Next.js + REST API backend.",
    tags: ["Next.js", "React", "API", "TypeScript"],
    year: "2023",
    link: "#",
  },
  {
    title: "Portfolio System",
    desc: "Headless WordPress with Next.js frontend. Lightning-fast, SEO-optimized, and fully dynamic via WP REST API.",
    tags: ["Next.js", "WordPress", "REST API", "PHP"],
    year: "2022",
    link: "#",
  },
];

export default function Portfolio() {
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [skillsVisible, setSkillsVisible] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -200, y: -200 });
  const skillsRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number; pulse: number }[] = [];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.3,
        alpha: Math.random() * 0.4 + 0.1,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.01;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        const a = p.alpha * (0.7 + 0.3 * Math.sin(p.pulse));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,194,255,${a})`;
        ctx.fill();
      });
      // draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,194,255,${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  // Cursor glow
  useEffect(() => {
    const move = (e: MouseEvent) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // Scroll
  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
      const sections = NAV.map((n) => document.getElementById(n.toLowerCase()));
      for (let i = sections.length - 1; i >= 0; i--) {
        const s = sections[i];
        if (s && s.getBoundingClientRect().top <= 130) { setActive(NAV[i]); return; }
      }
      setActive("");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Skills reveal
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setSkillsVisible(true); }, { threshold: 0.15 });
    if (skillsRef.current) obs.observe(skillsRef.current);
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); }, 1800);
  };

  const navOpacity = Math.min(scrollY / 80, 1);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&family=Cabinet+Grotesk:wght@300;400;500;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;700&family=Syne:wght@400;700;800&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #05070f;
          --bg2: #080c17;
          --card: #0c1120;
          --card2: #0f1526;
          --border: rgba(255,255,255,0.06);
          --border-h: rgba(0,194,255,0.25);
          --accent: #00c2ff;
          --accent2: #6c3de8;
          --accent3: #00ffb3;
          --text: #dce8f5;
          --muted: #5a6a80;
          --muted2: #8899aa;
        }

        html { scroll-behavior: smooth; }
        body {
          background: var(--bg);
          color: var(--text);
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 300;
          line-height: 1.7;
          overflow-x: hidden;
          cursor: none;
        }

        /* Custom cursor */
        #cursor {
          position: fixed; pointer-events: none; z-index: 9999;
          width: 400px; height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0,194,255,0.04) 0%, transparent 70%);
          transform: translate(-50%, -50%);
          transition: transform 0.05s linear;
        }
        #cursor-dot {
          position: fixed; pointer-events: none; z-index: 9999;
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--accent);
          transform: translate(-50%, -50%);
          box-shadow: 0 0 10px var(--accent);
          transition: width .2s, height .2s;
        }

        /* NAV */
        nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 200;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 3rem; height: 68px;
          transition: background .3s, border-color .3s;
        }
        nav.scrolled {
          background: rgba(5,7,15,0.92);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border);
        }
        .nav-logo {
          font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.15rem;
          letter-spacing: -0.02em; color: var(--text);
          display: flex; align-items: center; gap: 10px;
        }
        .nav-logo-dot {
          width: 8px; height: 8px; border-radius: 50%; background: var(--accent);
          box-shadow: 0 0 12px var(--accent);
          animation: pulse-dot 2s ease-in-out infinite;
        }
        @keyframes pulse-dot { 0%,100%{box-shadow:0 0 8px var(--accent)} 50%{box-shadow:0 0 18px var(--accent), 0 0 32px rgba(0,194,255,0.4)} }

        .nav-links { display: flex; gap: 2.5rem; list-style: none; align-items: center; }
        .nav-links button {
          background: none; border: none; cursor: none;
          font-family: 'Space Grotesk', sans-serif; font-size: .8rem; font-weight: 400;
          color: var(--muted); letter-spacing: .08em; text-transform: uppercase;
          transition: color .2s; padding: 6px 0; position: relative;
        }
        .nav-links button::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
          background: var(--accent); transform: scaleX(0); transform-origin: left;
          transition: transform .3s cubic-bezier(.4,0,.2,1);
        }
        .nav-links button:hover, .nav-links button.active { color: var(--text); }
        .nav-links button.active::after, .nav-links button:hover::after { transform: scaleX(1); }

        .nav-cta {
          padding: 8px 20px; border-radius: 6px; font-size: .8rem; font-weight: 500;
          background: rgba(0,194,255,0.08); color: var(--accent);
          border: 1px solid rgba(0,194,255,0.2); cursor: none;
          font-family: 'Space Grotesk', sans-serif; letter-spacing: .06em;
          transition: background .2s, border-color .2s, box-shadow .2s;
          text-transform: uppercase;
        }
        .nav-cta:hover { background: rgba(0,194,255,0.15); border-color: rgba(0,194,255,0.4); box-shadow: 0 0 20px rgba(0,194,255,0.15); }

        .hamburger { display: none; background: none; border: none; cursor: none; padding: 8px; }
        .hamburger span { display: block; width: 22px; height: 1.5px; background: var(--text); margin: 6px 0; transition: all .25s; }
        .hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(5px,5px); }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(5px,-5px); }

        .mobile-menu {
          display: none; position: fixed; inset: 0; z-index: 190;
          background: rgba(5,7,15,0.98); backdrop-filter: blur(20px);
          flex-direction: column; align-items: center; justify-content: center; gap: 2rem;
          opacity: 0; pointer-events: none; transition: opacity .3s;
        }
        .mobile-menu.open { display: flex; opacity: 1; pointer-events: all; }
        .mobile-menu button {
          background: none; border: none; cursor: none;
          font-family: 'Syne', sans-serif; font-size: 2rem; font-weight: 700;
          color: var(--muted); transition: color .2s;
        }
        .mobile-menu button:hover { color: var(--text); }

        @media (max-width: 768px) {
          nav { padding: 0 1.5rem; }
          .nav-links, .nav-cta { display: none; }
          .hamburger { display: block; }
        }

        /* HERO */
        .hero {
          min-height: 100vh; display: flex; align-items: center; justify-content: center;
          padding: 120px 3rem 6rem; text-align: left; position: relative; overflow: hidden;
        }
        canvas#particles { position: absolute; inset: 0; z-index: 0; }

        .hero-grid-lines {
          position: absolute; inset: 0; z-index: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(0,194,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,194,255,0.025) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent);
        }

        .hero-inner { position: relative; z-index: 1; max-width: 1100px; margin: 0 auto; width: 100%; }

        .hero-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          margin-bottom: 2rem; opacity: 0;
          animation: fadeUp .8s .2s forwards;
        }
        .hero-eyebrow-line { width: 32px; height: 1px; background: var(--accent); }
        .hero-eyebrow-text {
          font-size: .72rem; letter-spacing: .2em; text-transform: uppercase;
          color: var(--accent); font-weight: 500;
        }

        .hero-headline {
          font-family: 'Syne', sans-serif; font-weight: 800;
          font-size: clamp(3rem, 8vw, 6.5rem); line-height: 0.95;
          letter-spacing: -0.04em; margin-bottom: 2rem;
          opacity: 0; animation: fadeUp .9s .35s forwards;
        }
        .hero-headline .line { display: block; overflow: hidden; }
        .hero-headline .line span { display: block; animation: slideUp .9s cubic-bezier(.16,1,.3,1) forwards; opacity: 0; }
        .hero-headline .line:nth-child(1) span { animation-delay: .3s; }
        .hero-headline .line:nth-child(2) span { animation-delay: .45s; }
        .hero-headline .line:nth-child(3) span { animation-delay: .6s; }

        @keyframes slideUp { from{transform:translateY(100%);opacity:0} to{transform:translateY(0);opacity:1} }

        .gradient-text {
          background: linear-gradient(135deg, var(--accent) 0%, var(--accent2) 50%, var(--accent3) 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-desc {
          max-width: 520px; font-size: 1.05rem; color: var(--muted2); line-height: 1.75;
          margin-bottom: 3rem; font-weight: 300;
          opacity: 0; animation: fadeUp .8s .75s forwards;
        }

        .hero-actions {
          display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap;
          opacity: 0; animation: fadeUp .8s .9s forwards;
        }
        .btn-glow {
          position: relative; overflow: hidden;
          padding: 14px 32px; border-radius: 8px; font-size: .9rem; font-weight: 500;
          background: var(--accent); color: #05070f;
          border: none; cursor: none; font-family: 'Space Grotesk', sans-serif;
          letter-spacing: .04em;
          box-shadow: 0 0 30px rgba(0,194,255,0.3), 0 0 60px rgba(0,194,255,0.1);
          transition: box-shadow .3s, transform .15s;
        }
        .btn-glow::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transform: translateX(-100%); transition: transform .5s;
        }
        .btn-glow:hover { box-shadow: 0 0 50px rgba(0,194,255,0.5), 0 0 80px rgba(0,194,255,0.2); transform: translateY(-2px); }
        .btn-glow:hover::before { transform: translateX(100%); }

        .btn-ghost {
          padding: 13px 32px; border-radius: 8px; font-size: .9rem; font-weight: 400;
          background: transparent; color: var(--text);
          border: 1px solid var(--border); cursor: none;
          font-family: 'Space Grotesk', sans-serif; letter-spacing: .04em;
          transition: border-color .25s, color .25s, transform .15s;
        }
        .btn-ghost:hover { border-color: var(--border-h); color: var(--accent); transform: translateY(-2px); }

        .hero-scroll-hint {
          position: absolute; bottom: 2.5rem; left: 50%; transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 8px; z-index: 1;
          opacity: 0; animation: fadeUp .8s 1.2s forwards;
        }
        .hero-scroll-hint span { font-size: .65rem; letter-spacing: .18em; text-transform: uppercase; color: var(--muted); }
        .scroll-line { width: 1px; height: 48px; background: linear-gradient(to bottom, var(--accent), transparent); animation: scrollLine 2s ease-in-out infinite; }
        @keyframes scrollLine { 0%{transform:scaleY(0);transform-origin:top} 50%{transform:scaleY(1);transform-origin:top} 51%{transform-origin:bottom} 100%{transform:scaleY(0);transform-origin:bottom} }

        .hero-stats {
          position: absolute; right: 3rem; top: 50%; transform: translateY(-50%);
          display: flex; flex-direction: column; gap: 2rem; z-index: 1;
          opacity: 0; animation: fadeRight .8s 1s forwards;
        }
        @keyframes fadeRight { from{opacity:0;transform:translateY(-50%) translateX(30px)} to{opacity:1;transform:translateY(-50%) translateX(0)} }
        .hero-stat { text-align: right; }
        .hero-stat-num { font-family: 'Syne', sans-serif; font-size: 2.5rem; font-weight: 800; line-height: 1; color: var(--text); }
        .hero-stat-num sup { font-size: 1rem; color: var(--accent); }
        .hero-stat-label { font-size: .65rem; letter-spacing: .14em; text-transform: uppercase; color: var(--muted); margin-top: 4px; }

        @media (max-width: 900px) { .hero-stats { display: none; } .hero { text-align: center; } .hero-desc { margin: 0 auto 3rem; } .hero-actions { justify-content: center; } .hero-eyebrow { justify-content: center; } }

        @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }

        /* SECTION SHARED */
        .section-inner { max-width: 1100px; margin: 0 auto; padding: 7rem 3rem; }
        @media (max-width: 640px) { .section-inner { padding: 5rem 1.5rem; } }

        .section-header { margin-bottom: 4rem; }
        .section-eyebrow {
          display: inline-flex; align-items: center; gap: 10px; margin-bottom: 1rem;
        }
        .section-eyebrow-line { width: 24px; height: 1px; background: var(--accent); }
        .section-eyebrow-text { font-size: .68rem; letter-spacing: .2em; text-transform: uppercase; color: var(--accent); font-weight: 500; }

        h2 {
          font-family: 'Syne', sans-serif; font-weight: 800;
          font-size: clamp(2.4rem, 5vw, 3.8rem); letter-spacing: -0.03em; line-height: 1.0;
          color: var(--text);
        }

        /* ABOUT */
        #about { position: relative; overflow: hidden; }
        #about::before {
          content: ''; position: absolute; left: -200px; top: 50%; transform: translateY(-50%);
          width: 500px; height: 500px; border-radius: 50%;
          background: radial-gradient(circle, rgba(108,61,232,0.06) 0%, transparent 70%);
          pointer-events: none;
        }
        .about-layout { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 5rem; align-items: start; }
        @media (max-width: 800px) { .about-layout { grid-template-columns: 1fr; gap: 3rem; } }

        .about-body p { color: var(--muted2); font-size: 1rem; line-height: 1.85; margin-bottom: 1.25rem; }
        .about-body p strong { color: var(--text); font-weight: 500; }

        .about-tags { display: flex; flex-wrap: wrap; gap: .6rem; margin-top: 2rem; }
        .about-tag {
          font-size: .72rem; padding: 5px 14px; border-radius: 999px;
          border: 1px solid var(--border); color: var(--muted2);
          letter-spacing: .06em; text-transform: uppercase;
          transition: border-color .2s, color .2s;
        }
        .about-tag:hover { border-color: var(--border-h); color: var(--accent); }

        .about-cards { display: grid; grid-template-columns: 1fr 1fr; gap: .875rem; }
        .about-card {
          background: var(--card); border: 1px solid var(--border);
          border-radius: 16px; padding: 1.5rem;
          transition: border-color .3s, transform .3s;
          position: relative; overflow: hidden;
        }
        .about-card::before {
          content: ''; position: absolute; inset: 0; opacity: 0;
          background: radial-gradient(circle at top left, rgba(0,194,255,0.05), transparent 60%);
          transition: opacity .3s;
        }
        .about-card:hover { border-color: var(--border-h); transform: translateY(-3px); }
        .about-card:hover::before { opacity: 1; }
        .about-card-num {
          font-family: 'Syne', sans-serif; font-size: 2.6rem; font-weight: 800;
          line-height: 1; margin-bottom: .4rem;
          background: linear-gradient(135deg, var(--text), var(--accent));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .about-card-label { font-size: .72rem; letter-spacing: .1em; text-transform: uppercase; color: var(--muted); }

        /* SKILLS */
        #skills { background: var(--bg2); position: relative; overflow: hidden; }
        #skills::after {
          content: ''; position: absolute; right: -100px; bottom: -100px;
          width: 400px; height: 400px; border-radius: 50%;
          background: radial-gradient(circle, rgba(0,194,255,0.04), transparent 70%);
          pointer-events: none;
        }

        .skills-list { display: flex; flex-direction: column; gap: 1.5rem; }
        .skill-row { display: grid; grid-template-columns: 200px 1fr 48px; align-items: center; gap: 1.5rem; }
        @media (max-width: 600px) { .skill-row { grid-template-columns: 1fr 40px; gap: 1rem; } .skill-row .skill-label { grid-column: 1 / -1; margin-bottom: -.5rem; } }

        .skill-label { font-size: .875rem; font-weight: 400; color: var(--text); }
        .skill-sub { font-size: .7rem; color: var(--muted); display: block; margin-top: 1px; }

        .skill-track {
          height: 3px; background: rgba(255,255,255,0.05); border-radius: 2px; overflow: visible;
          position: relative;
        }
        .skill-fill {
          height: 100%; border-radius: 2px; width: 0;
          background: linear-gradient(90deg, var(--accent2), var(--accent));
          transition: width 1.4s cubic-bezier(.4,0,.2,1);
          position: relative;
        }
        .skill-fill::after {
          content: ''; position: absolute; right: -1px; top: 50%;
          transform: translateY(-50%);
          width: 8px; height: 8px; border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 12px var(--accent);
          opacity: 0; transition: opacity .3s 1.2s;
        }
        .skills-visible .skill-fill::after { opacity: 1; }

        .skill-pct { font-size: .8rem; color: var(--accent); font-weight: 500; text-align: right; font-family: 'Syne', sans-serif; }

        /* PROJECTS */
        #projects { position: relative; }
        .projects-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 3.5rem; }
        @media (max-width: 600px) { .projects-header { flex-direction: column; align-items: flex-start; gap: 1rem; } }
        .projects-count { font-size: .8rem; color: var(--muted); letter-spacing: .06em; }

        .projects-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
        @media (max-width: 700px) { .projects-grid { grid-template-columns: 1fr; } }

        .proj-card {
          background: var(--card); border: 1px solid var(--border);
          border-radius: 20px; padding: 2rem; position: relative; overflow: hidden;
          transition: border-color .3s, transform .3s;
          display: flex; flex-direction: column; cursor: none;
        }
        .proj-card::before {
          content: ''; position: absolute; inset: 0; opacity: 0;
          background: radial-gradient(ellipse at top right, rgba(0,194,255,0.06), transparent 60%);
          transition: opacity .4s;
        }
        .proj-card:hover { border-color: var(--border-h); transform: translateY(-5px); }
        .proj-card:hover::before { opacity: 1; }

        .proj-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.25rem; }
        .proj-year { font-size: .7rem; letter-spacing: .12em; color: var(--muted); text-transform: uppercase; }
        .proj-arrow {
          width: 32px; height: 32px; border-radius: 50%; border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center; color: var(--muted);
          transition: background .2s, border-color .2s, color .2s, transform .2s;
          font-size: 14px;
        }
        .proj-card:hover .proj-arrow { background: var(--accent); border-color: var(--accent); color: #05070f; transform: rotate(45deg); }

        .proj-title { font-family: 'Syne', sans-serif; font-size: 1.25rem; font-weight: 700; margin-bottom: .75rem; line-height: 1.2; }
        .proj-desc { font-size: .875rem; color: var(--muted2); line-height: 1.65; margin-bottom: 1.5rem; flex: 1; }
        .proj-tags { display: flex; flex-wrap: wrap; gap: .5rem; }
        .proj-tag {
          font-size: .65rem; padding: 3px 10px; border-radius: 999px;
          border: 1px solid var(--border); color: var(--muted);
          letter-spacing: .07em; text-transform: uppercase;
        }

        /* CONTACT */
        #contact { background: var(--bg2); position: relative; overflow: hidden; }
        #contact::before {
          content: ''; position: absolute; left: 50%; top: 0; transform: translateX(-50%);
          width: 600px; height: 2px;
          background: linear-gradient(90deg, transparent, var(--accent), var(--accent2), transparent);
          opacity: 0.3;
        }

        .contact-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; }
        @media (max-width: 800px) { .contact-layout { grid-template-columns: 1fr; gap: 3rem; } }

        .contact-info p { color: var(--muted2); font-size: 1rem; line-height: 1.8; margin-bottom: 2.5rem; }
        .contact-detail { display: flex; flex-direction: column; gap: 1rem; }
        .contact-item {
          display: flex; align-items: center; gap: 12px;
          font-size: .875rem; color: var(--muted2);
        }
        .contact-item-icon {
          width: 36px; height: 36px; border-radius: 10px;
          background: rgba(0,194,255,0.06); border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          font-size: 14px; flex-shrink: 0;
        }

        .form-group { margin-bottom: 1.25rem; }
        .form-group label { display: block; font-size: .68rem; text-transform: uppercase; letter-spacing: .14em; color: var(--muted); margin-bottom: .6rem; }
        .form-group input, .form-group textarea, .form-group select {
          width: 100%; background: var(--card); border: 1px solid var(--border);
          border-radius: 12px; padding: 13px 16px; color: var(--text);
          font-family: 'Space Grotesk', sans-serif; font-size: .9rem; font-weight: 300;
          outline: none; transition: border-color .25s, box-shadow .25s; resize: none;
          -webkit-appearance: none;
        }
        .form-group input:focus, .form-group textarea:focus {
          border-color: rgba(0,194,255,0.4);
          box-shadow: 0 0 0 4px rgba(0,194,255,0.06);
        }
        .form-group textarea { height: 120px; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        @media (max-width: 500px) { .form-row { grid-template-columns: 1fr; } }

        .sent-state { text-align: center; padding: 3rem 0; }
        .sent-icon { width: 56px; height: 56px; border-radius: 50%; background: rgba(0,255,179,0.1); border: 1px solid rgba(0,255,179,0.3); display: flex; align-items: center; justify-content: center; font-size: 22px; margin: 0 auto 1.25rem; }
        .sent-state h3 { font-family: 'Syne', sans-serif; font-size: 1.5rem; margin-bottom: .5rem; }
        .sent-state p { color: var(--muted2); font-size: .9rem; }

        /* FOOTER */
        footer {
          border-top: 1px solid var(--border); padding: 2rem 3rem;
          display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;
          position: relative; z-index: 1;
        }
        .footer-logo { font-family: 'Syne', sans-serif; font-size: .9rem; font-weight: 700; color: var(--muted); }
        .footer-copy { font-size: .78rem; color: var(--muted); }
        .footer-copy span { color: var(--accent); }
        .footer-links { display: flex; gap: 1.5rem; }
        .footer-links a { font-size: .75rem; color: var(--muted); text-decoration: none; letter-spacing: .06em; text-transform: uppercase; transition: color .2s; }
        .footer-links a:hover { color: var(--accent); }

        /* REVEAL */
        .reveal { opacity: 0; transform: translateY(32px); transition: opacity .75s cubic-bezier(.4,0,.2,1), transform .75s cubic-bezier(.4,0,.2,1); }
        .reveal.visible { opacity: 1; transform: none; }
        .reveal-left { opacity: 0; transform: translateX(-32px); transition: opacity .75s cubic-bezier(.4,0,.2,1), transform .75s cubic-bezier(.4,0,.2,1); }
        .reveal-left.visible { opacity: 1; transform: none; }
        .reveal-right { opacity: 0; transform: translateX(32px); transition: opacity .75s cubic-bezier(.4,0,.2,1), transform .75s cubic-bezier(.4,0,.2,1); }
        .reveal-right.visible { opacity: 1; transform: none; }

        /* MARQUEE */
        .marquee-wrap { overflow: hidden; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); padding: 1.25rem 0; background: var(--bg2); }
        .marquee-track { display: flex; gap: 3rem; animation: marquee 22s linear infinite; width: max-content; }
        .marquee-track:hover { animation-play-state: paused; }
        @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .marquee-item { display: flex; align-items: center; gap: .75rem; white-space: nowrap; font-size: .75rem; letter-spacing: .14em; text-transform: uppercase; color: var(--muted); }
        .marquee-dot { width: 4px; height: 4px; border-radius: 50%; background: var(--accent); }

        input::placeholder, textarea::placeholder { color: var(--muted); }
      `}</style>

      {/* Custom cursor */}
      <div id="cursor" style={{ left: cursorPos.x, top: cursorPos.y }} />
      <div id="cursor-dot" style={{ left: cursorPos.x, top: cursorPos.y }} />

      {/* NAV */}
      <nav className={scrollY > 20 ? "scrolled" : ""}>
        <div className="nav-logo">
          <div className="nav-logo-dot" />
          YN.dev
        </div>
        <ul className="nav-links">
          {NAV.map((n) => (
            <li key={n}>
              <button className={active === n ? "active" : ""} onClick={() => scrollTo(n)}>{n}</button>
            </li>
          ))}
          <li><button className="nav-cta" onClick={() => scrollTo("Contact")}>Hire Me</button></li>
        </ul>
        <button className={`hamburger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {NAV.map((n) => <button key={n} onClick={() => scrollTo(n)}>{n}</button>)}
        <button onClick={() => scrollTo("Contact")} style={{ color: "var(--accent)" }}>Hire Me</button>
      </div>

      {/* HERO */}
      <section className="hero" ref={heroRef}>
        <canvas id="particles" ref={canvasRef} />
        <div className="hero-grid-lines" />
        <div className="hero-inner">
          <div className="hero-eyebrow">
            <div className="hero-eyebrow-line" />
            <span className="hero-eyebrow-text">10 Years of Building the Web</span>
          </div>
          <h1 className="hero-headline">
            <span className="line"><span>Crafting</span></span>
            <span className="line"><span className="gradient-text">Digital</span></span>
            <span className="line"><span>Experiences</span></span>
          </h1>
          <p className="hero-desc">
            Senior web developer specializing in PHP, WordPress, and modern JavaScript frameworks. I build fast, scalable, and beautifully crafted web products that drive real results.
          </p>
          <div className="hero-actions">
            <button className="btn-glow" onClick={() => scrollTo("Projects")}>View My Work</button>
            <button className="btn-ghost" onClick={() => scrollTo("Contact")}>Let's Talk</button>
          </div>
        </div>
        <div className="hero-stats">
          {[{ num: "10", label: "Years Experience" }, { num: "50", label: "Projects Shipped" }, { num: "30", label: "Happy Clients" }].map((s) => (
            <div className="hero-stat" key={s.label}>
              <div className="hero-stat-num">{s.num}<sup>+</sup></div>
              <div className="hero-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="hero-scroll-hint">
          <div className="scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {[...Array(2)].map((_, gi) =>
            ["HTML & CSS", "PHP", "JavaScript", "React", "Next.js", "WordPress", "Elementor", "REST APIs", "Git", "MySQL", "WooCommerce", "Divi"].map((t) => (
              <div className="marquee-item" key={`${gi}-${t}`}>
                <div className="marquee-dot" />
                {t}
              </div>
            ))
          )}
        </div>
      </div>

      {/* ABOUT */}
      <section id="about">
        <div className="section-inner">
          <div className="about-layout">
            <RevealDiv dir="left">
              <div className="section-header">
                <div className="section-eyebrow">
                  <div className="section-eyebrow-line" />
                  <span className="section-eyebrow-text">About Me</span>
                </div>
                <h2>A developer<br />who cares<br />about craft.</h2>
              </div>
              <div className="about-body">
                <p>I'm a <strong>senior full-stack web developer</strong> with over a decade of experience turning complex problems into elegant, high-performance web solutions.</p>
                <p>From building custom <strong>PHP backends</strong> and pixel-perfect WordPress themes to crafting modern <strong>React and Next.js</strong> applications — I bring full-stack expertise to every project I take on.</p>
                <p>I've worked with startups, agencies, and enterprise clients across the globe, always prioritizing <strong>performance, maintainability, and user experience</strong>.</p>
              </div>
              <div className="about-tags">
                {["PHP", "WordPress", "Next.js", "React", "Elementor", "WooCommerce", "MySQL", "REST APIs"].map((t) => (
                  <span className="about-tag" key={t}>{t}</span>
                ))}
              </div>
            </RevealDiv>
            <RevealDiv dir="right">
              <div className="about-cards">
                {[
                  { num: "10+", label: "Years Experience" },
                  { num: "50+", label: "Projects Shipped" },
                  { num: "30+", label: "Happy Clients" },
                  { num: "100%", label: "Dedication" },
                ].map((s) => (
                  <div className="about-card" key={s.label}>
                    <div className="about-card-num">{s.num}</div>
                    <div className="about-card-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills">
        <div className="section-inner">
          <RevealDiv>
            <div className="section-header">
              <div className="section-eyebrow">
                <div className="section-eyebrow-line" />
                <span className="section-eyebrow-text">Skills & Expertise</span>
              </div>
              <h2>What I bring<br />to the table.</h2>
            </div>
          </RevealDiv>
          <div className={`skills-list ${skillsVisible ? "skills-visible" : ""}`} ref={skillsRef}>
            {SKILLS.map((s, i) => (
              <RevealDiv key={s.label} style={{ transitionDelay: `${i * 0.07}s` }}>
                <div className="skill-row">
                  <div className="skill-label">
                    {s.label}
                    {s.sub && <span className="skill-sub">{s.sub}</span>}
                  </div>
                  <div className="skill-track">
                    <div className="skill-fill" style={{ width: skillsVisible ? `${s.pct}%` : "0%", transitionDelay: `${i * 0.08}s` }} />
                  </div>
                  <div className="skill-pct">{s.pct}%</div>
                </div>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects">
        <div className="section-inner">
          <RevealDiv>
            <div className="projects-header">
              <div>
                <div className="section-eyebrow">
                  <div className="section-eyebrow-line" />
                  <span className="section-eyebrow-text">Selected Work</span>
                </div>
                <h2>Projects that<br />speak for<br />themselves.</h2>
              </div>
              <div className="projects-count">{PROJECTS.length} Projects</div>
            </div>
          </RevealDiv>
          <div className="projects-grid">
            {PROJECTS.map((p, i) => (
              <RevealDiv key={p.title} style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="proj-card" onClick={() => window.open(p.link, "_blank")}>
                  <div className="proj-top">
                    <span className="proj-year">{p.year}</span>
                    <div className="proj-arrow">↗</div>
                  </div>
                  <div className="proj-title">{p.title}</div>
                  <p className="proj-desc">{p.desc}</p>
                  <div className="proj-tags">
                    {p.tags.map((t) => <span className="proj-tag" key={t}>{t}</span>)}
                  </div>
                </div>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="section-inner">
          <RevealDiv>
            <div className="section-header" style={{ marginBottom: "3rem" }}>
              <div className="section-eyebrow">
                <div className="section-eyebrow-line" />
                <span className="section-eyebrow-text">Get In Touch</span>
              </div>
              <h2>Let's build<br />something great.</h2>
            </div>
          </RevealDiv>
          <div className="contact-layout">
            <RevealDiv dir="left">
              <div className="contact-info">
                <p>Have a project in mind? Whether it's a complex web application, a WordPress site, or a React frontend — I'm available for new opportunities and collaborations.</p>
                <div className="contact-detail">
                  {[
                    { icon: "✉", label: "yourname@email.com" },
                    { icon: "📍", label: "Philippines · Available Worldwide" },
                    { icon: "⚡", label: "Usually responds within 24 hours" },
                  ].map((c) => (
                    <div className="contact-item" key={c.label}>
                      <div className="contact-item-icon">{c.icon}</div>
                      {c.label}
                    </div>
                  ))}
                </div>
              </div>
            </RevealDiv>
            <RevealDiv dir="right">
              {!sent ? (
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Name</label>
                      <input type="text" placeholder="Your name" required />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input type="email" placeholder="your@email.com" required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Subject</label>
                    <input type="text" placeholder="Project inquiry" required />
                  </div>
                  <div className="form-group">
                    <label>Message</label>
                    <textarea placeholder="Tell me about your project..." required />
                  </div>
                  <button className="btn-glow" type="submit" style={{ width: "100%", justifyContent: "center" }}>
                    {sending ? "Sending..." : "Send Message"}
                  </button>
                </form>
              ) : (
                <div className="sent-state">
                  <div className="sent-icon">✓</div>
                  <h3>Message received!</h3>
                  <p>Thanks for reaching out. I'll get back to you within 24 hours.</p>
                </div>
              )}
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-logo">YN.dev</div>
        <div className="footer-copy">© {new Date().getFullYear()} <span>Your Name</span>. Built with Next.js & Vercel.</div>
        <div className="footer-links">
          <a href="#">GitHub</a>
          <a href="#">LinkedIn</a>
          <a href="#">Twitter</a>
        </div>
      </footer>
    </>
  );
}

function RevealDiv({
  children, className = "", style = {}, dir = "up",
}: {
  children: React.ReactNode; className?: string; style?: React.CSSProperties; dir?: "up" | "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const cls = dir === "left" ? "reveal-left" : dir === "right" ? "reveal-right" : "reveal";
  return (
    <div ref={ref} className={`${cls} ${vis ? "visible" : ""} ${className}`} style={style}>
      {children}
    </div>
  );
}
