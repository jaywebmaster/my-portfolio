"use client";
import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";

const SKILLS = [
  { cat: "Frontend", items: ["HTML5", "CSS3", "JavaScript ES6+", "TypeScript", "React", "Next.js", "Tailwind CSS", "GSAP"] },
  { cat: "Backend", items: ["PHP 8", "MySQL", "REST APIs", "Node.js", "WordPress Core", "WooCommerce", "Custom Plugins"] },
  { cat: "Page Builders", items: ["Elementor Pro", "Divi Builder", "Beaver Builder", "Gutenberg", "Oxygen Builder", "Bricks Builder"] },
  { cat: "AI & Tools", items: ["ChatGPT API", "Claude API", "GitHub Copilot", "Midjourney", "Vercel AI SDK", "Cursor IDE"] },
];

const STACK_ICONS = [
  { name: "HTML5", color: "#e34f26" },
  { name: "CSS3", color: "#1572b6" },
  { name: "JS", color: "#f7df1e" },
  { name: "PHP", color: "#777bb4" },
  { name: "React", color: "#61dafb" },
  { name: "Next", color: "#ffffff" },
  { name: "WP", color: "#21759b" },
  { name: "Node", color: "#68a063" },
  { name: "MySQL", color: "#4479a1" },
  { name: "GPT", color: "#10a37f" },
  { name: "Git", color: "#f05032" },
  { name: "TS", color: "#3178c6" },
];

const PROJECTS = [
  { title: "AI-Powered CMS", desc: "Custom WordPress CMS with integrated ChatGPT API for auto-content generation and SEO optimization. Serving 500k+ monthly visitors.", tags: ["PHP", "WordPress", "ChatGPT API", "MySQL"], color: "#10a37f" },
  { title: "E-Commerce Platform", desc: "WooCommerce store with custom Elementor theme and AI product recommendations engine. 3x conversion rate improvement.", tags: ["Elementor", "WooCommerce", "PHP", "AI"], color: "#6c63ff" },
  { title: "SaaS Dashboard", desc: "Full-featured Next.js analytics dashboard with real-time data, Vercel AI SDK integration, and custom REST API.", tags: ["Next.js", "React", "Vercel AI", "API"], color: "#00d4ff" },
  { title: "Custom Plugin Suite", desc: "Suite of 12 custom WordPress plugins replacing $2,000/yr in subscriptions. Clean PHP 8 OOP architecture.", tags: ["PHP 8", "WordPress", "OOP", "MySQL"], color: "#ff6b35" },
  { title: "Headless Blog Engine", desc: "Headless WordPress with Next.js frontend, ISR caching, and Claude API for intelligent content tagging.", tags: ["Next.js", "WordPress", "Claude API", "ISR"], color: "#f59e0b" },
  { title: "Page Builder Theme", desc: "Commercial Oxygen Builder theme sold on ThemeForest with 800+ sales. Fully responsive, WCAG 2.1 compliant.", tags: ["Oxygen", "CSS", "PHP", "JS"], color: "#ec4899" },
];

const SERVICES = [
  { icon: "⬡", title: "Custom WordPress Dev", desc: "Bespoke themes, plugins, and full WordPress ecosystems built from scratch — no bloat, no shortcuts." },
  { icon: "◈", title: "Page Builder Mastery", desc: "Elementor, Divi, Beaver, Gutenberg, Oxygen — pixel-perfect builds at speed without sacrificing performance." },
  { icon: "◎", title: "AI Integration", desc: "Embedding ChatGPT, Claude, and other AI APIs directly into your web products for intelligent, dynamic experiences." },
  { icon: "⬟", title: "Full-Stack Development", desc: "End-to-end web apps: PHP/MySQL backends, React/Next.js frontends, REST APIs, and everything in between." },
];

export default function PortfolioV3() {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [skillTab, setSkillTab] = useState(0);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [hoveredProj, setHoveredProj] = useState<number | null>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [loaded, setLoaded] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setLoaded(true);
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Scroll tracking
  useEffect(() => {
    const fn = () => {
      setScrollY(window.scrollY);
      const ids = ["about","skills","projects","contact"];
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.getBoundingClientRect().top <= 160) { setActiveSection(ids[i]); return; }
      }
      setActiveSection("");
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Mouse
  useEffect(() => {
    const fn = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  // Canvas grid
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf: number;
    let t = 0;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      t += 0.004;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cols = Math.ceil(canvas.width / 60) + 1;
      const rows = Math.ceil(canvas.height / 60) + 1;
      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          const wave = Math.sin(x * 0.4 + t) * Math.cos(y * 0.4 + t) * 0.5 + 0.5;
          ctx.beginPath();
          ctx.arc(x * 60, y * 60, 1, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(100,200,120,${wave * 0.12})`;
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    const form = formRef.current!;
    const templateParams = {
      from_name: (form.elements.namedItem("from_name") as HTMLInputElement).value,
      from_email: (form.elements.namedItem("from_email") as HTMLInputElement).value,
      project_type: (form.elements.namedItem("project_type") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    // Template 1: notify you of new inquiry
    emailjs.sendForm(
      "service_zq2lat5",
      "template_ad3cm4k",
      form,
      "ZKmUhx9DTtnWyhpHy"
    )
    .then(() => {
      // Template 2: send confirmation to the person who submitted
      return emailjs.send(
        "service_zq2lat5",
        "template_xtujx6c", // 👈 replace with your new template ID
        templateParams,
        "ZKmUhx9DTtnWyhpHy"
      );
    })
    .then(() => {
      setSending(false);
      setSent(true);
    })
    .catch((err) => {
      console.error("EmailJS error:", err);
      setSending(false);
      alert("Error: " + JSON.stringify(err));
    });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&family=Fira+Code:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #04080f;
          --bg1: #060d16;
          --bg2: #081018;
          --surface: #0c1520;
          --surface2: #101c2a;
          --green: #4ade80;
          --green2: #22c55e;
          --green3: #16a34a;
          --teal: #2dd4bf;
          --blue: #38bdf8;
          --border: rgba(74,222,128,0.08);
          --border2: rgba(74,222,128,0.2);
          --text: #e2f0e8;
          --muted: #4d7060;
          --muted2: #7a9e88;
          --mono: 'Fira Code', monospace;
          --sans: 'Plus Jakarta Sans', sans-serif;
          --glow: 0 0 40px rgba(74,222,128,0.15);
        }

        html { scroll-behavior: smooth; }
        body {
          background: var(--bg);
          color: var(--text);
          font-family: var(--sans);
          font-weight: 300;
          line-height: 1.7;
          overflow-x: hidden;
        }

        /* CURSOR */
        #c-ring {
          position: fixed; pointer-events: none; z-index: 9999;
          width: 32px; height: 32px; border-radius: 50%;
          border: 1px solid rgba(74,222,128,0.5);
          transform: translate(-50%,-50%);
          transition: left .12s ease, top .12s ease, width .2s, height .2s, border-color .2s;
          mix-blend-mode: screen;
        }
        #c-dot {
          position: fixed; pointer-events: none; z-index: 9999;
          width: 4px; height: 4px; border-radius: 50%;
          background: var(--green); transform: translate(-50%,-50%);
          box-shadow: 0 0 8px var(--green);
        }

        /* CANVAS */
        #grid-canvas { position: fixed; inset: 0; z-index: 0; pointer-events: none; }

        /* NAV */
        nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 200;
          transition: all .4s;
        }
        nav.stuck {
          background: rgba(4,8,15,0.92);
          backdrop-filter: blur(24px);
          border-bottom: 1px solid var(--border);
        }
        .nav-wrap {
          max-width: 1280px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 2.5rem; height: 72px;
        }
        .logo {
          font-family: var(--mono); font-size: .85rem; font-weight: 400;
          color: var(--green); letter-spacing: .04em;
          display: flex; align-items: center; gap: 6px;
        }
        .logo-cursor { display: inline-block; width: 8px; height: 16px; background: var(--green); margin-left: 2px; animation: cursor-blink 1.1s step-end infinite; }
        @keyframes cursor-blink { 0%,100%{opacity:1} 50%{opacity:0} }

        .nav-center { display: flex; align-items: center; gap: .25rem; }
        .nav-pill {
          padding: 6px 16px; border-radius: 999px; font-size: .72rem;
          font-family: var(--mono); letter-spacing: .08em; cursor: pointer;
          background: none; border: none; color: var(--muted2);
          transition: color .2s, background .2s;
        }
        .nav-pill:hover, .nav-pill.on { color: var(--green); background: rgba(74,222,128,0.08); }

        .nav-right { display: flex; align-items: center; gap: 1rem; }
        .nav-status {
          display: flex; align-items: center; gap: 6px;
          font-family: var(--mono); font-size: .65rem; color: var(--muted2); letter-spacing: .08em;
        }
        .status-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--green); box-shadow: 0 0 8px var(--green); animation: pulse-g 2s ease-in-out infinite; }
        @keyframes pulse-g { 0%,100%{box-shadow:0 0 6px var(--green)} 50%{box-shadow:0 0 16px var(--green),0 0 28px rgba(74,222,128,0.3)} }

        .nav-hire {
          padding: 8px 20px; border-radius: 6px; font-size: .75rem;
          font-family: var(--mono); font-weight: 500; letter-spacing: .08em;
          background: rgba(74,222,128,0.1); color: var(--green);
          border: 1px solid var(--border2); cursor: pointer;
          transition: all .2s;
        }
        .nav-hire:hover { background: rgba(74,222,128,0.18); box-shadow: var(--glow); }

        .ham { display: none; background: none; border: none; cursor: pointer; padding: 6px; }
        .ham span { display: block; width: 20px; height: 1px; background: var(--text); margin: 5px 0; transition: all .2s; }
        .ham.open span:nth-child(1) { transform: rotate(45deg) translate(4px,4px); }
        .ham.open span:nth-child(2) { opacity: 0; }
        .ham.open span:nth-child(3) { transform: rotate(-45deg) translate(4px,-4px); }
        .mob { display: none; position: fixed; inset: 0; z-index: 190; background: rgba(4,8,15,.98); backdrop-filter: blur(24px); flex-direction: column; align-items: center; justify-content: center; gap: 2rem; }
        .mob.open { display: flex; }
        .mob button { background: none; border: none; cursor: pointer; font-family: var(--sans); font-size: 1.8rem; font-weight: 700; color: var(--muted2); transition: color .2s; }
        .mob button:hover { color: var(--green); }

        @media(max-width:768px) { .nav-center, .nav-status { display: none; } .ham { display: block; } .nav-wrap { padding: 0 1.5rem; } }

        /* HERO */
        .hero {
          min-height: 100vh;
          display: flex; flex-direction: column; justify-content: center;
          padding: 120px 2.5rem 6rem;
          max-width: 1280px; margin: 0 auto;
          position: relative; z-index: 2;
        }

        .hero-eyebrow {
          display: flex; align-items: center; gap: .75rem; margin-bottom: 2.5rem;
          font-family: var(--mono); font-size: .7rem; color: var(--green); letter-spacing: .14em;
          opacity: 0; animation: up .6s .2s forwards;
        }
        .eyebrow-tag {
          background: rgba(74,222,128,0.1); border: 1px solid var(--border2);
          padding: 4px 12px; border-radius: 999px;
        }
        .eyebrow-slash { color: var(--muted); }

        .hero-h1 {
          font-weight: 800; line-height: .92; letter-spacing: -.04em;
          font-size: clamp(3.5rem, 9vw, 7.5rem);
          margin-bottom: 2rem;
        }
        .h1-line { overflow: hidden; display: block; }
        .h1-line span { display: block; opacity: 0; transform: translateY(100%); animation: lineUp .9s cubic-bezier(.16,1,.3,1) forwards; }
        .h1-line:nth-child(1) span { animation-delay: .3s; }
        .h1-line:nth-child(2) span { animation-delay: .45s; color: var(--green); }
        .h1-line:nth-child(3) span { animation-delay: .6s; color: var(--muted2); font-weight: 200; }
        @keyframes lineUp { to { opacity: 1; transform: none; } }

        .hero-desc {
          max-width: 600px; font-size: 1.05rem; color: var(--muted2); line-height: 1.8; font-weight: 300;
          margin-bottom: 3rem; opacity: 0; animation: up .7s .8s forwards;
        }
        .hero-desc strong { color: var(--text); font-weight: 500; }

        .hero-row {
          display: flex; align-items: center; gap: 2rem; flex-wrap: wrap;
          opacity: 0; animation: up .7s 1s forwards;
        }

        .btn-code {
          display: flex; align-items: center; gap: 10px;
          padding: 14px 30px; border-radius: 8px;
          background: var(--green); color: var(--bg); font-family: var(--mono);
          font-size: .8rem; font-weight: 500; letter-spacing: .06em;
          border: none; cursor: pointer; position: relative; overflow: hidden;
          transition: box-shadow .3s, transform .15s;
          box-shadow: 0 0 30px rgba(74,222,128,0.25);
        }
        .btn-code::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent);
          transform: translateX(-100%); transition: transform .5s;
        }
        .btn-code:hover { box-shadow: 0 0 50px rgba(74,222,128,0.45); transform: translateY(-2px); }
        .btn-code:hover::before { transform: translateX(100%); }

        .btn-outline-g {
          padding: 13px 30px; border-radius: 8px;
          background: transparent; color: var(--text);
          border: 1px solid rgba(255,255,255,0.1); font-family: var(--mono);
          font-size: .8rem; letter-spacing: .06em; cursor: pointer;
          transition: border-color .2s, color .2s, transform .15s;
        }
        .btn-outline-g:hover { border-color: var(--border2); color: var(--green); transform: translateY(-2px); }

        .hero-stack-row {
          display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;
          opacity: 0; animation: up .7s 1.1s forwards;
          margin-top: 3rem;
        }
        .hero-stack-label { font-family: var(--mono); font-size: .65rem; color: var(--muted); letter-spacing: .12em; }
        .stack-chips { display: flex; gap: .5rem; flex-wrap: wrap; }
        .stack-chip {
          padding: 4px 10px; border-radius: 4px; font-family: var(--mono); font-size: .65rem;
          letter-spacing: .06em; border: 1px solid var(--border);
          background: rgba(255,255,255,0.02); color: var(--muted2);
          transition: border-color .2s, color .2s;
        }
        .stack-chip:hover { border-color: var(--border2); color: var(--green); }

        .hero-numbers {
          position: absolute; right: 2.5rem; bottom: 6rem;
          display: flex; gap: 3rem; z-index: 2;
          opacity: 0; animation: up .7s 1.2s forwards;
        }
        @media(max-width:900px) { .hero-numbers { display: none; } }
        .h-num { text-align: center; }
        .h-num-val { font-family: var(--mono); font-size: 2rem; font-weight: 500; color: var(--green); line-height: 1; }
        .h-num-label { font-size: .65rem; letter-spacing: .12em; color: var(--muted); text-transform: uppercase; margin-top: 4px; font-family: var(--mono); }

        @keyframes up { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }

        /* DIVIDER */
        .div-wrap { padding: 0 2.5rem; max-width: 1280px; margin: 0 auto; }
        .div-line { height: 1px; background: linear-gradient(90deg, transparent, var(--border2), transparent); }

        /* SERVICES */
        #about { padding: 8rem 2.5rem; position: relative; z-index: 2; }
        .sec-wrap { max-width: 1280px; margin: 0 auto; }
        .sec-label { font-family: var(--mono); font-size: .65rem; letter-spacing: .2em; color: var(--green); text-transform: uppercase; margin-bottom: .75rem; display: flex; align-items: center; gap: 8px; }
        .sec-label::before { content: '//'; color: var(--muted); }
        .sec-h2 { font-size: clamp(2rem, 4vw, 3.5rem); font-weight: 800; letter-spacing: -.03em; line-height: 1; margin-bottom: 1rem; }
        .sec-sub { color: var(--muted2); font-size: .95rem; max-width: 500px; line-height: 1.75; margin-bottom: 4rem; }

        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start; }
        @media(max-width:800px) { .about-grid { grid-template-columns: 1fr; gap: 2.5rem; } }

        .about-text p { color: var(--muted2); font-size: .95rem; line-height: 1.85; margin-bottom: 1.25rem; }
        .about-text strong { color: var(--text); font-weight: 500; }
        .about-text .mono-tag { font-family: var(--mono); font-size: .75rem; color: var(--green); background: rgba(74,222,128,0.08); border: 1px solid var(--border); padding: 2px 8px; border-radius: 4px; display: inline-block; margin: 2px; }

        .services-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        @media(max-width:600px) { .services-grid { grid-template-columns: 1fr; } }
        .svc-card {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: 12px; padding: 1.5rem;
          transition: border-color .3s, transform .3s, box-shadow .3s;
          position: relative; overflow: hidden;
        }
        .svc-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, var(--green), transparent);
          opacity: 0; transition: opacity .3s;
        }
        .svc-card:hover { border-color: var(--border2); transform: translateY(-3px); box-shadow: var(--glow); }
        .svc-card:hover::before { opacity: 1; }
        .svc-icon { font-size: 1.4rem; margin-bottom: 1rem; color: var(--green); font-family: var(--mono); }
        .svc-title { font-size: .9rem; font-weight: 600; margin-bottom: .5rem; }
        .svc-desc { font-size: .8rem; color: var(--muted2); line-height: 1.6; }

        /* SKILLS */
        #skills { background: var(--bg1); padding: 8rem 2.5rem; position: relative; z-index: 2; }
        .skills-tabs { display: flex; gap: .5rem; margin-bottom: 2.5rem; flex-wrap: wrap; }
        .skill-tab {
          padding: 8px 18px; border-radius: 6px; font-family: var(--mono); font-size: .72rem;
          letter-spacing: .08em; cursor: pointer; border: 1px solid var(--border);
          background: none; color: var(--muted2); transition: all .2s;
        }
        .skill-tab.active { background: rgba(74,222,128,0.1); border-color: var(--border2); color: var(--green); }
        .skill-tab:hover:not(.active) { border-color: rgba(255,255,255,0.12); color: var(--text); }

        .skill-pills-grid { display: flex; flex-wrap: wrap; gap: .75rem; }
        .skill-pill {
          padding: 10px 18px; border-radius: 8px;
          border: 1px solid var(--border); background: var(--surface);
          font-size: .85rem; color: var(--muted2);
          transition: all .25s; cursor: default;
          display: flex; align-items: center; gap: 8px;
          animation: popIn .35s cubic-bezier(.16,1,.3,1) both;
        }
        .skill-pill::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--green); flex-shrink: 0; opacity: .4; transition: opacity .2s; }
        .skill-pill:hover { border-color: var(--border2); color: var(--text); transform: translateY(-2px); box-shadow: var(--glow); }
        .skill-pill:hover::before { opacity: 1; }
        @keyframes popIn { from{opacity:0;transform:scale(.85) translateY(10px)} to{opacity:1;transform:none} }

        /* STACK ICONS */
        .stack-icons-row { display: flex; gap: 1.5rem; flex-wrap: wrap; margin-top: 3rem; padding-top: 3rem; border-top: 1px solid var(--border); }
        .stack-icon-item {
          display: flex; flex-direction: column; align-items: center; gap: 6px;
          cursor: default;
        }
        .stack-icon-circle {
          width: 52px; height: 52px; border-radius: 12px;
          border: 1px solid var(--border); background: var(--surface);
          display: flex; align-items: center; justify-content: center;
          font-family: var(--mono); font-size: .72rem; font-weight: 500;
          transition: all .25s;
        }
        .stack-icon-item:hover .stack-icon-circle { transform: translateY(-4px); border-color: var(--border2); box-shadow: var(--glow); }
        .stack-icon-name { font-size: .6rem; color: var(--muted); font-family: var(--mono); letter-spacing: .06em; }

        /* PROJECTS */
        #projects { padding: 8rem 2.5rem; position: relative; z-index: 2; }
        .proj-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.25rem; }
        @media(max-width:1000px) { .proj-grid { grid-template-columns: 1fr 1fr; } }
        @media(max-width:640px) { .proj-grid { grid-template-columns: 1fr; } }

        .proj-card {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: 16px; padding: 1.75rem;
          transition: border-color .3s, transform .3s, box-shadow .3s;
          cursor: pointer; position: relative; overflow: hidden;
          display: flex; flex-direction: column; gap: .75rem;
        }
        .proj-card::after {
          content: ''; position: absolute; inset: 0; opacity: 0;
          background: radial-gradient(circle at 70% 0%, var(--color, var(--green)) 0%, transparent 60%);
          transition: opacity .4s;
        }
        .proj-card:hover { border-color: var(--border2); transform: translateY(-5px); box-shadow: 0 20px 60px rgba(0,0,0,0.4); }
        .proj-card:hover::after { opacity: .05; }

        .proj-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
        .proj-top { display: flex; justify-content: space-between; align-items: flex-start; }
        .proj-top-left { display: flex; align-items: center; gap: 10px; }
        .proj-arrow { width: 30px; height: 30px; border-radius: 50%; border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; font-size: 12px; color: var(--muted2); transition: all .25s; }
        .proj-card:hover .proj-arrow { background: var(--green); border-color: var(--green); color: var(--bg); transform: rotate(45deg); }
        .proj-title { font-size: 1rem; font-weight: 600; line-height: 1.3; }
        .proj-desc { font-size: .8rem; color: var(--muted2); line-height: 1.6; flex: 1; }
        .proj-tags { display: flex; flex-wrap: wrap; gap: .4rem; }
        .proj-tag { font-family: var(--mono); font-size: .62rem; padding: 3px 8px; border-radius: 4px; border: 1px solid var(--border); color: var(--muted2); letter-spacing: .04em; }

        /* CONTACT */
        #contact { background: var(--bg1); padding: 8rem 2.5rem; position: relative; z-index: 2; overflow: hidden; }
        #contact::before {
          content: ''; position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
          width: 600px; height: 600px; border-radius: 50%;
          background: radial-gradient(circle, rgba(74,222,128,0.04) 0%, transparent 70%);
          pointer-events: none;
        }

        .contact-split { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; }
        @media(max-width:800px) { .contact-split { grid-template-columns: 1fr; gap: 3rem; } }

        .contact-big-text {
          font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 800; letter-spacing: -.03em; line-height: 1;
          margin-bottom: 1.5rem;
        }
        .contact-big-text span { color: var(--green); }
        .contact-desc { color: var(--muted2); font-size: .95rem; line-height: 1.75; margin-bottom: 2.5rem; }

        .contact-chips { display: flex; flex-direction: column; gap: .75rem; }
        .contact-chip {
          display: flex; align-items: center; gap: 12px; padding: 1rem 1.25rem;
          background: var(--surface); border: 1px solid var(--border); border-radius: 10px;
          transition: border-color .2s;
        }
        .contact-chip:hover { border-color: var(--border2); }
        .contact-chip-icon { width: 34px; height: 34px; border-radius: 8px; background: rgba(74,222,128,0.08); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; font-size: 14px; flex-shrink: 0; }
        .contact-chip-label { font-family: var(--mono); font-size: .6rem; color: var(--muted); letter-spacing: .1em; text-transform: uppercase; }
        .contact-chip-val { font-size: .85rem; color: var(--text); }

        .f-group { margin-bottom: 1.1rem; }
        .f-label { font-family: var(--mono); font-size: .62rem; letter-spacing: .14em; color: var(--muted); text-transform: uppercase; display: block; margin-bottom: .5rem; }
        .f-input {
          width: 100%; background: var(--surface2); border: 1px solid var(--border);
          border-radius: 8px; padding: 12px 16px; color: var(--text);
          font-family: var(--sans); font-size: .9rem; font-weight: 300;
          outline: none; resize: none; transition: border-color .2s, box-shadow .2s;
        }
        .f-input:focus { border-color: rgba(74,222,128,0.35); box-shadow: 0 0 0 3px rgba(74,222,128,0.06); }
        .f-input::placeholder { color: var(--muted); }
        textarea.f-input { height: 110px; }
        .f-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        @media(max-width:500px) { .f-row { grid-template-columns: 1fr; } }

        .sent-wrap { text-align: center; padding: 4rem 0; }
        .sent-wrap h3 { font-size: 1.5rem; font-weight: 700; color: var(--green); margin-bottom: .5rem; }
        .sent-wrap p { color: var(--muted2); font-size: .9rem; }

        /* FOOTER */
        footer {
          position: relative; z-index: 2;
          border-top: 1px solid var(--border); padding: 2rem 2.5rem;
          display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;
        }
        @media(max-width:640px) { footer { flex-direction: column; align-items: center; text-align: center; padding: 2rem 1.5rem; } }
        .footer-logo { font-family: var(--mono); font-size: .8rem; color: var(--green); display: flex; align-items: center; gap: 6px; }
        .footer-copy { font-family: var(--mono); font-size: .62rem; color: var(--muted); letter-spacing: .06em; }
        .footer-copy span { color: var(--green); }
        .footer-links { display: flex; gap: 1.5rem; }
        .footer-links a { font-family: var(--mono); font-size: .62rem; color: var(--muted); text-decoration: none; letter-spacing: .1em; text-transform: uppercase; transition: color .2s; }
        .footer-links a:hover { color: var(--green); }

        /* REVEAL */
        .r { opacity: 0; transform: translateY(30px); transition: opacity .75s cubic-bezier(.4,0,.2,1), transform .75s cubic-bezier(.4,0,.2,1); }
        .r.v { opacity: 1; transform: none; }
        .rl { opacity: 0; transform: translateX(-30px); transition: opacity .75s cubic-bezier(.4,0,.2,1), transform .75s cubic-bezier(.4,0,.2,1); }
        .rl.v { opacity: 1; transform: none; }
        .rr { opacity: 0; transform: translateX(30px); transition: opacity .75s cubic-bezier(.4,0,.2,1), transform .75s cubic-bezier(.4,0,.2,1); }
        .rr.v { opacity: 1; transform: none; }

        /* MARQUEE */
        .mq-wrap { overflow: hidden; padding: 1.2rem 0; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); background: var(--bg); position: relative; z-index: 2; }
        .mq-track { display: flex; gap: 2.5rem; animation: mq 28s linear infinite; width: max-content; }
        .mq-track.rev { animation: mqr 32s linear infinite; }
        @keyframes mq { to { transform: translateX(-50%); } }
        @keyframes mqr { from { transform: translateX(-50%); } to { transform: translateX(0); } }
        .mq-item { font-family: var(--mono); font-size: .68rem; letter-spacing: .14em; text-transform: uppercase; color: var(--muted); display: flex; align-items: center; gap: .75rem; white-space: nowrap; }
        .mq-dot { width: 3px; height: 3px; border-radius: 50%; background: var(--green); flex-shrink: 0; }
        .mq-item.hl { color: rgba(74,222,128,0.5); }
      `}</style>

      {/* Cursor */}
      <div id="c-ring" style={{ left: mouse.x, top: mouse.y }} />
      <div id="c-dot" style={{ left: mouse.x, top: mouse.y }} />

      {/* Grid canvas */}
      <canvas id="grid-canvas" ref={canvasRef} />

      {/* NAV */}
      <nav className={scrollY > 20 ? "stuck" : ""}>
        <div className="nav-wrap">
          <div className="logo">
            <span>~Jay</span>
            <span className="logo-cursor" />
          </div>
          <div className="nav-center">
            {["about","skills","projects","contact"].map(s => (
              <button key={s} className={`nav-pill ${activeSection === s ? "on" : ""}`} onClick={() => scrollTo(s)}>{s}</button>
            ))}
          </div>
          <div className="nav-right">
            <div className="nav-status">
              <div className="status-dot" />
              Available for work
            </div>
            <button className="nav-hire" onClick={() => scrollTo("contact")}>Hire me!</button>
          </div>
          <button className={`ham ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
            <span /><span /><span />
          </button>
        </div>
      </nav>
      <div className={`mob ${menuOpen ? "open" : ""}`}>
        {["About","Skills","Projects","Contact"].map(s => (
          <button key={s} onClick={() => scrollTo(s.toLowerCase())}>{s}</button>
        ))}
      </div>

      {/* HERO */}
      <section ref={heroRef} style={{ position: "relative", zIndex: 2 }}>
        <div className="hero">
          <div className="hero-eyebrow">
            <span className="eyebrow-tag">v3.0</span>
            <span className="eyebrow-slash">//</span>
            <span>5 years · Full-Stack · WordPress · AI</span>
          </div>

          <h1 className="hero-h1">
            <span className="h1-line"><span>I build</span></span>
            <span className="h1-line"><span>the web.</span></span>
            <span className="h1-line"><span>with intent.</span></span>
          </h1>

          <p className="hero-desc">
            Full-stack web developer specializing in <strong>custom development, WordPress solutions, and modern integrations</strong>. I build fast, scalable, and reliable digital products with a focus on performance, maintainability, and real-world results.
          </p>

          <div className="hero-row">
            <button className="btn-code" onClick={() => scrollTo("projects")}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 7h12M7 1l6 6-6 6"/></svg>
              view_projects()
            </button>
            <button className="btn-outline-g" onClick={() => scrollTo("contact")}>
              get_in_touch()
            </button>
          </div>

          <div className="hero-stack-row">
            <span className="hero-stack-label">// stack</span>
            <div className="stack-chips">
              {["PHP","WordPress","React","Next.js","Elementor","ChatGPT API","Claude API","MySQL"].map(t => (
                <span className="stack-chip" key={t}>{t}</span>
              ))}
            </div>
          </div>

          <div className="hero-numbers">
            {[["05+","Years"],["25+","Projects"],["10+","Clients"]].map(([n,l]) => (
              <div className="h-num" key={l}>
                <div className="h-num-val">{n}</div>
                <div className="h-num-label">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE 1 */}
      <div className="mq-wrap">
        <div className="mq-track">
          {[...Array(2)].map((_,gi) => ["Custom WordPress","PHP 8","React","Next.js","Elementor Pro","Divi Builder","ChatGPT API","Claude API","WooCommerce","REST APIs","Oxygen Builder","TypeScript"].map(t => (
            <div className={`mq-item ${t.includes("API") ? "hl" : ""}`} key={`${gi}${t}`}>
              <div className="mq-dot" />{t}
            </div>
          )))}
        </div>
      </div>

      {/* ABOUT / SERVICES */}
      <section id="about">
        <div className="sec-wrap">
          <Rv>
            <div className="sec-label">about</div>
            <h2 className="sec-h2">A developer who<br />codes with purpose.</h2>
            <p className="sec-sub">Not just another developer who Googles Stack Overflow. 5 years of deliberate, hands-on work across the full web stack.</p>
          </Rv>

          <div className="about-grid">
            <Rv dir="l">
              <div className="about-text">
                <p>I'm a <strong>full-stack web developer</strong> with 5+ years of experience specializing in <strong>WordPress development</strong>, <strong>Shopify builds</strong>, and <strong>custom-coded solutions</strong> tailored to business needs.</p>
                <p>I focus on <strong>clean, scalable custom code</strong>—building themes, plugins, and features from the ground up—while using <strong>page builders like Elementor</strong> strategically to deliver efficient and flexible results when needed.</p>
                <p>From <strong>custom WordPress ecosystems</strong> to <strong>high-converting Shopify stores</strong>, I create fast, optimized, and maintainable websites that balance performance, usability, and long-term growth.</p>
                <div style={{ marginTop: "1.5rem", display: "flex", flexWrap: "wrap", gap: ".5rem" }}>
                  {["PHP 8","WordPress Core","Custom Plugins","REST APIs","React","Next.js","Elementor Pro","Divi","Beaver","Gutenberg","Oxygen","Bricks","ChatGPT API","Claude API"].map(t => (
                    <span className="mono-tag" key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </Rv>

            <Rv dir="r">
              <div className="services-grid">
                {SERVICES.map((s, i) => (
                  <div className="svc-card" key={s.title} style={{ animationDelay: `${i * .1}s` }}>
                    <div className="svc-icon">{s.icon}</div>
                    <div className="svc-title">{s.title}</div>
                    <div className="svc-desc">{s.desc}</div>
                  </div>
                ))}
              </div>
            </Rv>
          </div>
        </div>
      </section>

      {/* MARQUEE 2 */}
      <div className="mq-wrap">
        <div className="mq-track rev">
          {[...Array(2)].map((_,gi) => ["Performance First","Clean Code","AI Integration","Custom Plugins","Headless CMS","Core Web Vitals","WooCommerce","WCAG 2.1","PHP OOP","ISR Caching","REST API Design","Schema Markup"].map(t => (
            <div className="mq-item" key={`${gi}${t}`}><div className="mq-dot" />{t}</div>
          )))}
        </div>
      </div>

      {/* SKILLS */}
      <section id="skills">
        <div className="sec-wrap">
          <Rv>
            <div className="sec-label">skills</div>
            <h2 className="sec-h2">Every tool in<br />my arsenal.</h2>
            <p className="sec-sub">5 years of deliberate skill-building across frontend, backend, page builders, and now AI tooling.</p>

            <div className="skills-tabs">
              {SKILLS.map((s, i) => (
                <button key={s.cat} className={`skill-tab ${skillTab === i ? "active" : ""}`} onClick={() => setSkillTab(i)}>
                  {s.cat}
                </button>
              ))}
            </div>

            <div className="skill-pills-grid">
              {SKILLS[skillTab].items.map((item, i) => (
                <div className="skill-pill" key={item} style={{ animationDelay: `${i * .04}s` }}>
                  {item}
                </div>
              ))}
            </div>

            <div className="stack-icons-row">
              {STACK_ICONS.map((s, i) => (
                <div className="stack-icon-item" key={s.name}>
                  <div className="stack-icon-circle" style={{ color: s.color, borderColor: `${s.color}22` }}>
                    {s.name}
                  </div>
                  <div className="stack-icon-name">{s.name}</div>
                </div>
              ))}
            </div>
          </Rv>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects">
        <div className="sec-wrap">
          <Rv>
            <div className="sec-label">projects</div>
            <h2 className="sec-h2">Projects that<br />speak for themselves.</h2>
            <p className="sec-sub">Real work, real clients, real results. Each project below solved a genuine problem with clean, maintainable code.</p>
          </Rv>

          <div className="proj-grid">
            {PROJECTS.map((p, i) => (
              <Rv key={p.title} style={{ transitionDelay: `${i * 0.08}s` }}>
                <div
                  className="proj-card"
                  style={{ "--color": p.color } as React.CSSProperties}
                  onMouseEnter={() => setHoveredProj(i)}
                  onMouseLeave={() => setHoveredProj(null)}
                >
                  <div className="proj-top">
                    <div className="proj-top-left">
                      <div className="proj-dot" style={{ background: p.color, boxShadow: `0 0 8px ${p.color}` }} />
                    </div>
                    <div className="proj-arrow">↗</div>
                  </div>
                  <div className="proj-title">{p.title}</div>
                  <div className="proj-desc">{p.desc}</div>
                  <div className="proj-tags">
                    {p.tags.map(t => <span className="proj-tag" key={t}>{t}</span>)}
                  </div>
                </div>
              </Rv>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="sec-wrap">
          <div className="contact-split">
            <Rv dir="l">
              <div className="sec-label">contact</div>
              <div className="contact-big-text">
                Let's build<br />something<br /><span>worth using.</span>
              </div>
              <p className="contact-desc">
                Got a WordPress project, a custom PHP system, a React app, or something AI-powered? I'm open to new work and ready to start fast.
              </p>
              <div className="contact-chips">
                {[
                  { icon: "✉", label: "Email", val: "jayvan.webmaster@gmail.com" },
                  { icon: "📍", label: "Location", val: "Philippines · Remote Worldwide" },
                  { icon: "⚡", label: "Response", val: "Within 24 hours" },
                  { icon: "💡", label: "Open to", val: "Freelance · Contract · Full-time" },
                ].map(c => (
                  <div className="contact-chip" key={c.label}>
                    <div className="contact-chip-icon">{c.icon}</div>
                    <div>
                      <div className="contact-chip-label">{c.label}</div>
                      <div className="contact-chip-val">{c.val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Rv>

            <Rv dir="r">
              {!sent ? (
                <form ref={formRef} onSubmit={handleSubmit}>
                  <div className="f-row">
                    <div className="f-group">
                      <label className="f-label">Name</label>
                      <input className="f-input" type="text" name="from_name" placeholder="Your name" required />
                    </div>
                    <div className="f-group">
                      <label className="f-label">Email</label>
                      <input className="f-input" type="email" name="from_email" placeholder="your@email.com" required />
                    </div>
                  </div>
                  <div className="f-group">
                    <label className="f-label">Project type</label>
                    <input className="f-input" type="text" name="project_type" placeholder="e.g. WordPress site, React app, AI integration..." required />
                  </div>
                  <div className="f-group">
                    <label className="f-label">Message</label>
                    <textarea className="f-input" name="message" placeholder="Tell me what you need built..." required />
                  </div>
                  <button className="btn-code" type="submit" style={{ width: "100%", justifyContent: "center" }}>
                    {sending ? "sending..." : (
                      <>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 7h12M7 1l6 6-6 6"/></svg>
                        send_message()
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="sent-wrap">
                  <h3>// message sent!</h3>
                  <p>Thanks for reaching out. I'll be in touch within 24 hours.</p>
                </div>
              )}
            </Rv>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-logo">
          <span className="logo-cursor" style={{ width: 6, height: 14 }} />
          ~Jay
        </div>
        <div className="footer-copy">© {new Date().getFullYear()} <span>Jay</span> · built with next.js + vercel</div>
        <div className="footer-links">
          <a href="https://github.com/jaywebmaster" target="_blank">GitHub</a>
          <a href="https://www.linkedin.com/in/jayvan-dorig-15243b280/" target="_blank">LinkedIn</a>
          <a href="https://www.facebook.com/dorig.jayvan" target="_blank">Facebook</a>
        </div>
      </footer>
    </>
  );
}

function Rv({ children, className = "", style = {}, dir = "u" }: {
  children: React.ReactNode; className?: string; style?: React.CSSProperties; dir?: "u"|"l"|"r";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.06 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const cls = dir === "l" ? "rl" : dir === "r" ? "rr" : "r";
  return <div ref={ref} className={`${cls} ${v ? "v" : ""} ${className}`} style={style}>{children}</div>;
}