"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

/* ─── Types ─────────────────────────────────────────── */
interface Particle {
  x: number; y: number; r: number;
  dx: number; dy: number; a: number; c: string;
}

/* ─── Constants ─────────────────────────────────────── */
const SECTIONS = ["about", "events", "team", "giveaway", "join"] as const;
type SectionId = typeof SECTIONS[number];

const NAV_LINKS: { label: string; id: SectionId }[] = [
  { label: "About",     id: "about"    },
  { label: "Events",    id: "events"   },
  { label: "Team",      id: "team"     },
  { label: "Giveaways", id: "giveaway" },
  { label: "Join",      id: "join"     },
];

/* ─── Helpers ───────────────────────────────────────── */
function smoothScroll(id: string, closeMenu?: () => void) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  closeMenu?.();
}

/* ─── Component ─────────────────────────────────────── */
export default function YRNRPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [stuck, setStuck]       = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  /* Particle canvas */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let animId: number;

    const particles: Particle[] = Array.from({ length: 40 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      a: Math.random() * 0.4 + 0.05,
      c: Math.random() > 0.5 ? "168,85,247" : "236,72,153",
    }));

    function resize() {
      if (!canvas) return;
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function animate() {
      if (!canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.c},${p.a})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(animate);
    }
    animate();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  /* Scroll tracking */
  useEffect(() => {
    const onScroll = () => {
      setStuck(window.scrollY > 20);
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i]);
        if (el && el.getBoundingClientRect().top <= 160) {
          setActiveSection(SECTIONS[i]);
          return;
        }
      }
      setActiveSection(null);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Scroll-reveal */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("v"); }),
      { threshold: 0.06 }
    );
    document.querySelectorAll(".rv,.rvl,.rvr").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        :root{
          --bg:#08060f;--bg1:#0d0a18;--bg2:#110e1f;
          --surface:#17132a;--surface2:#1e1934;
          --purple:#a855f7;--purple2:#7c3aed;--purple3:#4c1d95;
          --pink:#ec4899;--pink2:#be185d;
          --red:#ef4444;--red2:#b91c1c;
          --border:rgba(168,85,247,0.12);--border2:rgba(168,85,247,0.35);
          --text:#f0eaff;--muted:#6b5d8a;--muted2:#9d8cbd;
          --display:'Orbitron',monospace;--head:'Rajdhani',sans-serif;--body:'Inter',sans-serif;
          --glow-p:0 0 40px rgba(168,85,247,0.2);--glow-r:0 0 40px rgba(239,68,68,0.2);
        }
        html{scroll-behavior:smooth}
        body{background:var(--bg);color:var(--text);font-family:var(--body);font-weight:400;line-height:1.7;overflow-x:hidden}
        a{text-decoration:none;color:inherit}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-track{background:var(--bg)}
        ::-webkit-scrollbar-thumb{background:var(--purple2);border-radius:2px}

        /* NAV */
        .nav-wrap{position:fixed;top:0;left:0;right:0;z-index:200;transition:all .4s}
        .nav-wrap.stuck{background:rgba(8,6,15,0.95);backdrop-filter:blur(20px);border-bottom:1px solid var(--border)}
        .nav-inner{max-width:1280px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;padding:0 2rem;height:70px}
        .logo{font-family:var(--display);font-size:1.4rem;font-weight:900;letter-spacing:.08em;background:linear-gradient(135deg,var(--purple),var(--pink));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .logo-sub{font-family:var(--head);font-size:.6rem;letter-spacing:.22em;color:var(--muted2);display:block;margin-top:-4px;text-transform:uppercase;-webkit-text-fill-color:var(--muted2)}
        .nav-links{display:flex;align-items:center;gap:.5rem}
        .nav-link{padding:6px 16px;border-radius:4px;font-family:var(--head);font-size:.85rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--muted2);background:none;border:none;cursor:pointer;transition:color .2s,background .2s}
        .nav-link:hover,.nav-link.on{color:var(--purple);background:rgba(168,85,247,0.08)}
        .nav-right{display:flex;align-items:center;gap:1rem}
        .nav-tag{font-family:var(--head);font-size:.65rem;letter-spacing:.14em;text-transform:uppercase;display:flex;align-items:center;gap:6px;color:var(--muted2)}
        .live-dot{width:7px;height:7px;border-radius:50%;background:var(--purple);box-shadow:0 0 10px var(--purple);animation:livepulse 2s ease-in-out infinite}
        @keyframes livepulse{0%,100%{box-shadow:0 0 6px var(--purple)}50%{box-shadow:0 0 18px var(--purple),0 0 30px rgba(168,85,247,0.3)}}
        .btn-join{padding:9px 22px;border-radius:4px;font-family:var(--head);font-weight:700;font-size:.8rem;letter-spacing:.12em;text-transform:uppercase;background:var(--purple2);color:#fff;border:none;cursor:pointer;transition:all .2s;clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)}
        .btn-join:hover{background:var(--purple);box-shadow:var(--glow-p)}
        .ham{display:none;background:none;border:none;cursor:pointer;padding:6px;flex-direction:column;gap:5px}
        .ham span{display:block;width:22px;height:1.5px;background:var(--text);transition:all .2s;border-radius:1px}
        .ham.open span:nth-child(1){transform:rotate(45deg) translate(4px,4px)}
        .ham.open span:nth-child(2){opacity:0}
        .ham.open span:nth-child(3){transform:rotate(-45deg) translate(4px,-4px)}
        @media(max-width:768px){.nav-links,.nav-tag{display:none}.ham{display:flex}.nav-inner{padding:0 1.25rem}}
        .mob-menu{display:none;position:fixed;inset:0;z-index:190;background:rgba(8,6,15,.98);backdrop-filter:blur(20px);flex-direction:column;align-items:center;justify-content:center;gap:2rem}
        .mob-menu.open{display:flex}
        .mob-menu button{background:none;border:none;cursor:pointer;font-family:var(--head);font-size:2rem;font-weight:700;color:var(--muted2);letter-spacing:.12em;text-transform:uppercase;transition:color .2s}
        .mob-menu button:hover{color:var(--purple)}

        /* HERO */
        .hero{min-height:100vh;position:relative;overflow:hidden;display:flex;flex-direction:column;justify-content:center;padding:120px 2rem 6rem;max-width:1280px;margin:0 auto}
        .hero-bg{position:fixed;inset:0;z-index:0;pointer-events:none;background:radial-gradient(ellipse 60% 50% at 20% 40%,rgba(124,58,237,0.08) 0%,transparent 70%),radial-gradient(ellipse 40% 60% at 80% 60%,rgba(239,68,68,0.06) 0%,transparent 70%)}
        .hero-grid{position:fixed;inset:0;z-index:0;pointer-events:none;background-image:linear-gradient(rgba(168,85,247,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(168,85,247,0.04) 1px,transparent 1px);background-size:60px 60px}
        .hero-content{position:relative;z-index:2}
        .hero-eyebrow{display:flex;align-items:center;gap:1rem;margin-bottom:2rem;font-family:var(--head);font-size:.7rem;letter-spacing:.18em;text-transform:uppercase;color:var(--muted2);opacity:0;animation:fadeup .6s .2s forwards}
        .eyebrow-pill{background:rgba(168,85,247,0.12);border:1px solid rgba(168,85,247,0.25);padding:4px 14px;border-radius:2px;color:var(--purple);clip-path:polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)}
        .eyebrow-slash{color:var(--muted)}
        .hero-title{font-family:var(--display);font-weight:900;font-size:clamp(3.5rem,10vw,8rem);line-height:.9;letter-spacing:-.02em;margin-bottom:2rem}
        .hero-title .line{display:block;overflow:hidden}
        .hero-title .line span{display:block;opacity:0;transform:translateY(110%);animation:lineup .9s cubic-bezier(.16,1,.3,1) forwards}
        .hero-title .line:nth-child(1) span{animation-delay:.3s}
        .hero-title .line:nth-child(2) span{animation-delay:.45s;background:linear-gradient(135deg,var(--purple),var(--pink));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .hero-title .line:nth-child(3) span{animation-delay:.6s;color:var(--red);font-size:.6em}
        @keyframes lineup{to{opacity:1;transform:none}}
        .hero-desc{max-width:580px;font-size:1rem;color:var(--muted2);line-height:1.8;margin-bottom:2.5rem;opacity:0;animation:fadeup .7s .8s forwards}
        .hero-desc strong{color:var(--text);font-weight:500}
        .hero-btns{display:flex;gap:1rem;flex-wrap:wrap;opacity:0;animation:fadeup .7s 1s forwards}
        .btn-primary{padding:14px 34px;font-family:var(--head);font-weight:700;font-size:.85rem;letter-spacing:.12em;text-transform:uppercase;background:var(--purple2);color:#fff;border:none;cursor:pointer;clip-path:polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%);transition:all .2s;box-shadow:0 0 30px rgba(124,58,237,0.3)}
        .btn-primary:hover{background:var(--purple);box-shadow:0 0 50px rgba(168,85,247,0.45);transform:translateY(-2px)}
        .btn-sec{padding:13px 34px;font-family:var(--head);font-weight:700;font-size:.85rem;letter-spacing:.12em;text-transform:uppercase;background:transparent;color:var(--text);border:1px solid rgba(255,255,255,0.15);cursor:pointer;clip-path:polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%);transition:all .2s}
        .btn-sec:hover{border-color:rgba(168,85,247,0.5);color:var(--purple);transform:translateY(-2px)}
        .hero-games{display:flex;align-items:center;gap:1.5rem;margin-top:3rem;opacity:0;animation:fadeup .7s 1.1s forwards}
        .hero-games-label{font-family:var(--head);font-size:.65rem;letter-spacing:.2em;text-transform:uppercase;color:var(--muted)}
        .game-badge{display:flex;align-items:center;gap:8px;padding:6px 14px;border-radius:3px;border:1px solid var(--border);background:rgba(255,255,255,0.03);font-family:var(--head);font-size:.75rem;font-weight:600;letter-spacing:.08em;color:var(--muted2);transition:all .2s}
        .game-badge:hover{border-color:var(--border2);color:var(--purple)}
        .game-badge .dot{width:6px;height:6px;border-radius:50%;flex-shrink:0}
        .hero-stats{position:absolute;right:2rem;bottom:5rem;display:flex;gap:2.5rem;z-index:2;opacity:0;animation:fadeup .7s 1.2s forwards}
        @media(max-width:900px){.hero-stats{display:none}}
        .hstat{text-align:center}
        .hstat-val{font-family:var(--display);font-size:2.2rem;font-weight:900;line-height:1;background:linear-gradient(135deg,var(--purple),var(--pink));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .hstat-label{font-family:var(--head);font-size:.6rem;letter-spacing:.16em;text-transform:uppercase;color:var(--muted);margin-top:4px}
        @keyframes fadeup{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}

        /* MARQUEE */
        .mq{overflow:hidden;padding:1rem 0;border-top:1px solid var(--border);border-bottom:1px solid var(--border);position:relative;z-index:2;background:var(--bg)}
        .mq-track{display:flex;gap:2rem;animation:mq 30s linear infinite;width:max-content}
        .mq-track.rev{animation:mqr 36s linear infinite}
        @keyframes mq{to{transform:translateX(-50%)}}
        @keyframes mqr{from{transform:translateX(-50%)}to{transform:none}}
        .mq-item{font-family:var(--head);font-size:.7rem;letter-spacing:.16em;text-transform:uppercase;color:var(--muted);display:flex;align-items:center;gap:.75rem;white-space:nowrap}
        .mq-sep{width:4px;height:4px;border-radius:50%;background:var(--purple);flex-shrink:0;opacity:.5}
        .mq-item.hi{color:rgba(168,85,247,0.6)}
        .mq-item.red{color:rgba(239,68,68,0.5)}

        /* SECTIONS */
        section{position:relative;z-index:2}
        .sec{padding:8rem 2rem;max-width:1280px;margin:0 auto}
        .sec-label{font-family:var(--head);font-size:.65rem;letter-spacing:.22em;text-transform:uppercase;color:var(--purple);display:flex;align-items:center;gap:8px;margin-bottom:.75rem}
        .sec-label::before{content:'//';color:var(--muted)}
        .sec-h2{font-family:var(--display);font-size:clamp(2rem,4.5vw,3.8rem);font-weight:900;letter-spacing:-.02em;line-height:1;margin-bottom:1rem}
        .sec-sub{color:var(--muted2);font-size:.95rem;max-width:520px;line-height:1.8;margin-bottom:4rem}

        /* GAMES/ABOUT */
        .games-split{display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:start}
        @media(max-width:800px){.games-split{grid-template-columns:1fr;gap:2rem}}
        .game-card{border-radius:8px;overflow:hidden;border:1px solid var(--border);background:var(--surface);transition:all .3s;position:relative}
        .game-card:hover{transform:translateY(-4px)}
        .game-card-header{padding:2rem 1.75rem 1.5rem;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:1rem}
        .game-icon{width:52px;height:52px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-family:var(--display);font-size:1rem;font-weight:900}
        .game-icon.idate{background:rgba(236,72,153,0.15);color:var(--pink);border:1px solid rgba(236,72,153,0.25)}
        .game-icon.valo{background:rgba(239,68,68,0.15);color:var(--red);border:1px solid rgba(239,68,68,0.25)}
        .game-name{font-family:var(--head);font-size:1.2rem;font-weight:700;letter-spacing:.06em}
        .game-type{font-size:.75rem;color:var(--muted2);letter-spacing:.1em;text-transform:uppercase;margin-top:2px;font-family:var(--head)}
        .game-card-body{padding:1.75rem}
        .game-card p{font-size:.9rem;color:var(--muted2);line-height:1.75;margin-bottom:1rem}
        .game-tags{display:flex;flex-wrap:wrap;gap:.5rem;margin-top:.75rem}
        .game-tag{font-family:var(--head);font-size:.65rem;letter-spacing:.1em;text-transform:uppercase;padding:4px 10px;border-radius:3px;border:1px solid var(--border);background:rgba(255,255,255,0.02);color:var(--muted2)}
        .game-tag.p{border-color:rgba(168,85,247,0.25);color:rgba(168,85,247,.8);background:rgba(168,85,247,0.06)}
        .game-tag.r{border-color:rgba(239,68,68,0.25);color:rgba(239,68,68,.8);background:rgba(239,68,68,0.06)}
        .about-body{display:flex;flex-direction:column;gap:1.5rem}
        .about-body p{color:var(--muted2);font-size:.95rem;line-height:1.8}
        .about-body strong{color:var(--text);font-weight:500}
        .accent-bar{width:60px;height:3px;border-radius:2px;background:linear-gradient(90deg,var(--purple),var(--pink));margin-bottom:1.5rem}
        .unity-badge{display:inline-flex;align-items:center;gap:10px;padding:12px 20px;border-radius:6px;border:1px solid rgba(168,85,247,0.2);background:rgba(168,85,247,0.05);margin-top:1rem}
        .unity-badge span{font-family:var(--head);font-size:.8rem;letter-spacing:.1em;text-transform:uppercase;color:var(--muted2)}
        .unity-badge strong{color:var(--purple)}

        /* EVENTS */
        .events-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem}
        @media(max-width:900px){.events-grid{grid-template-columns:1fr 1fr}}
        @media(max-width:560px){.events-grid{grid-template-columns:1fr}}
        .event-card{background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:1.75rem;transition:all .3s;position:relative;overflow:hidden}
        .event-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:var(--accent,linear-gradient(90deg,var(--purple),var(--pink)));opacity:.8}
        .event-card:hover{border-color:var(--border2);transform:translateY(-4px);box-shadow:var(--glow-p)}
        .event-type{font-family:var(--head);font-size:.62rem;letter-spacing:.18em;text-transform:uppercase;padding:4px 10px;border-radius:2px;display:inline-block;margin-bottom:1rem}
        .event-type.tournament{background:rgba(239,68,68,0.12);color:rgba(239,68,68,.9);border:1px solid rgba(239,68,68,.2)}
        .event-type.giveaway{background:rgba(168,85,247,0.12);color:rgba(168,85,247,.9);border:1px solid rgba(168,85,247,.2)}
        .event-type.dance{background:rgba(236,72,153,0.12);color:rgba(236,72,153,.9);border:1px solid rgba(236,72,153,.2)}
        .event-type.community{background:rgba(34,211,238,0.12);color:rgba(34,211,238,.9);border:1px solid rgba(34,211,238,.2)}
        .event-title{font-family:var(--head);font-size:1.1rem;font-weight:700;margin-bottom:.6rem;line-height:1.3}
        .event-desc{font-size:.82rem;color:var(--muted2);line-height:1.6;margin-bottom:1rem}
        .event-meta{display:flex;align-items:center;justify-content:space-between;padding-top:1rem;border-top:1px solid var(--border)}
        .event-game{font-family:var(--head);font-size:.65rem;letter-spacing:.1em;text-transform:uppercase;color:var(--muted2);display:flex;align-items:center;gap:5px}
        .event-status{font-family:var(--head);font-size:.62rem;letter-spacing:.12em;text-transform:uppercase}
        .event-status.upcoming{color:var(--purple)}
        .event-status.soon{color:var(--pink)}
        .event-status.open{color:#22d3ee}
        .featured-event{grid-column:1/-1;display:grid;grid-template-columns:1fr 1fr;background:var(--surface2);border:1px solid rgba(168,85,247,0.2);border-radius:10px;overflow:hidden}
        @media(max-width:700px){.featured-event{grid-template-columns:1fr}}
        .fe-left{padding:2.5rem;border-right:1px solid var(--border)}
        @media(max-width:700px){.fe-left{border-right:none;border-bottom:1px solid var(--border)}}
        .fe-right{padding:2.5rem;display:flex;flex-direction:column;justify-content:center;gap:1rem}
        .fe-badge{display:inline-flex;align-items:center;gap:6px;font-family:var(--head);font-size:.62rem;letter-spacing:.18em;text-transform:uppercase;padding:5px 12px;border-radius:2px;background:rgba(168,85,247,0.1);color:var(--purple);border:1px solid rgba(168,85,247,.25);margin-bottom:1rem}
        .fe-title{font-family:var(--display);font-size:1.8rem;font-weight:900;line-height:1.1;margin-bottom:.75rem}
        .fe-desc{font-size:.9rem;color:var(--muted2);line-height:1.75}
        .fe-detail{display:flex;align-items:center;gap:10px;font-size:.82rem;color:var(--muted2)}
        .fe-detail strong{color:var(--text);font-weight:500}
        .fe-prize{font-family:var(--display);font-size:2.5rem;font-weight:900;line-height:1;background:linear-gradient(135deg,var(--purple),var(--pink));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .fe-prize-label{font-family:var(--head);font-size:.65rem;letter-spacing:.16em;text-transform:uppercase;color:var(--muted);margin-top:4px}

        /* MEMBERS */
        .members-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:1rem}
        @media(max-width:1000px){.members-grid{grid-template-columns:repeat(3,1fr)}}
        @media(max-width:560px){.members-grid{grid-template-columns:1fr 1fr}}
        .member-card{background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:1.5rem 1rem;text-align:center;transition:all .3s}
        .member-card:hover{border-color:var(--border2);transform:translateY(-3px);box-shadow:var(--glow-p)}
        .member-avatar{width:56px;height:56px;border-radius:10px;margin:0 auto 1rem;display:flex;align-items:center;justify-content:center;font-family:var(--display);font-size:1rem;font-weight:900;letter-spacing:.05em;position:relative}
        .member-avatar::after{content:'';position:absolute;inset:0;border-radius:10px;background:inherit;filter:blur(12px);opacity:.3;z-index:-1;transform:scale(1.3)}
        .role-gm .member-avatar{background:linear-gradient(135deg,rgba(168,85,247,.3),rgba(236,72,153,.3));color:var(--purple);border:1px solid rgba(168,85,247,.3)}
        .role-dev .member-avatar{background:linear-gradient(135deg,rgba(34,211,238,.2),rgba(96,165,250,.2));color:#22d3ee;border:1px solid rgba(34,211,238,.25)}
        .role-mod .member-avatar{background:linear-gradient(135deg,rgba(239,68,68,.2),rgba(251,146,60,.2));color:var(--red);border:1px solid rgba(239,68,68,.25)}
        .role-cm .member-avatar{background:linear-gradient(135deg,rgba(34,197,94,.2),rgba(20,184,166,.2));color:#22c55e;border:1px solid rgba(34,197,94,.25)}
        .member-tag{font-family:var(--head);font-size:.6rem;letter-spacing:.16em;text-transform:uppercase;padding:3px 8px;border-radius:2px;display:inline-block;margin-bottom:.5rem}
        .role-gm .member-tag{background:rgba(168,85,247,0.1);color:var(--purple);border:1px solid rgba(168,85,247,.2)}
        .role-dev .member-tag{background:rgba(34,211,238,0.1);color:#22d3ee;border:1px solid rgba(34,211,238,.2)}
        .role-mod .member-tag{background:rgba(239,68,68,0.1);color:var(--red);border:1px solid rgba(239,68,68,.2)}
        .role-cm .member-tag{background:rgba(34,197,94,0.1);color:#22c55e;border:1px solid rgba(34,197,94,.2)}
        .member-name{font-family:var(--head);font-size:.95rem;font-weight:700;letter-spacing:.06em;line-height:1.2}

        /* GIVEAWAY */
        .gw-banner{border:1px solid rgba(168,85,247,0.25);border-radius:12px;background:var(--surface2);overflow:hidden;position:relative}
        .gw-banner::before{content:'';position:absolute;top:-80px;right:-80px;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(168,85,247,0.12) 0%,transparent 70%);pointer-events:none}
        .gw-banner::after{content:'';position:absolute;bottom:-60px;left:20%;width:200px;height:200px;border-radius:50%;background:radial-gradient(circle,rgba(239,68,68,0.08) 0%,transparent 70%);pointer-events:none}
        .gw-inner{display:grid;grid-template-columns:1fr auto;gap:3rem;align-items:center;padding:3rem;position:relative;z-index:1}
        @media(max-width:700px){.gw-inner{grid-template-columns:1fr;gap:2rem}}
        .gw-eyebrow{display:flex;align-items:center;gap:.75rem;margin-bottom:1rem}
        .gw-pulse{width:8px;height:8px;border-radius:50%;background:var(--purple);box-shadow:0 0 12px var(--purple);animation:livepulse 2s ease-in-out infinite}
        .gw-eyebrow-text{font-family:var(--head);font-size:.65rem;letter-spacing:.2em;text-transform:uppercase;color:var(--purple)}
        .gw-title{font-family:var(--display);font-size:clamp(1.6rem,3vw,2.8rem);font-weight:900;line-height:1.05;margin-bottom:1rem}
        .gw-desc{font-size:.9rem;color:var(--muted2);line-height:1.75;max-width:520px;margin-bottom:1.5rem}
        .gw-steps{display:flex;flex-direction:column;gap:.75rem;margin-bottom:2rem}
        .gw-step{display:flex;align-items:center;gap:12px;font-size:.85rem;color:var(--muted2)}
        .gw-step-num{width:26px;height:26px;border-radius:4px;flex-shrink:0;background:rgba(168,85,247,0.12);border:1px solid rgba(168,85,247,.25);display:flex;align-items:center;justify-content:center;font-family:var(--display);font-size:.7rem;font-weight:900;color:var(--purple)}
        .gw-prizes{display:flex;flex-direction:column;gap:1rem;align-items:flex-end}
        @media(max-width:700px){.gw-prizes{align-items:flex-start}}
        .gw-prize-card{background:rgba(168,85,247,0.08);border:1px solid rgba(168,85,247,.2);border-radius:8px;padding:1.25rem 1.75rem;text-align:center;min-width:160px}
        .gw-prize-rank{font-family:var(--head);font-size:.62rem;letter-spacing:.16em;text-transform:uppercase;color:var(--muted2);margin-bottom:.35rem}
        .gw-prize-val{font-family:var(--display);font-size:1.5rem;font-weight:900;background:linear-gradient(135deg,var(--purple),var(--pink));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .gw-prize-item{font-size:.75rem;color:var(--muted2);margin-top:.25rem}

        /* DISCORD */
        .discord-section{border-radius:10px;border:1px solid rgba(88,101,242,0.25);background:linear-gradient(135deg,rgba(88,101,242,0.06) 0%,rgba(168,85,247,0.06) 100%);padding:3rem;display:flex;align-items:center;justify-content:space-between;gap:2rem;flex-wrap:wrap}
        .discord-left h3{font-family:var(--display);font-size:1.8rem;font-weight:900;margin-bottom:.5rem}
        .discord-left p{font-size:.9rem;color:var(--muted2);max-width:440px;line-height:1.7}
        .btn-discord{padding:14px 32px;border-radius:6px;font-family:var(--head);font-weight:700;font-size:.85rem;letter-spacing:.12em;text-transform:uppercase;background:#5865f2;color:#fff;border:none;cursor:pointer;white-space:nowrap;transition:all .2s;flex-shrink:0}
        .btn-discord:hover{background:#4752c4;transform:translateY(-2px);box-shadow:0 0 30px rgba(88,101,242,0.4)}

        /* FOOTER */
        footer{position:relative;z-index:2;border-top:1px solid var(--border);padding:3rem 2rem 2rem}
        .footer-inner{max-width:1280px;margin:0 auto}
        .footer-top{display:grid;grid-template-columns:1.5fr 1fr 1fr;gap:3rem;margin-bottom:3rem}
        @media(max-width:768px){.footer-top{grid-template-columns:1fr;gap:2rem}}
        .footer-logo{font-family:var(--display);font-size:1.6rem;font-weight:900;background:linear-gradient(135deg,var(--purple),var(--pink));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:.5rem}
        .footer-tagline{font-size:.82rem;color:var(--muted2);line-height:1.7;max-width:280px}
        .footer-col-title{font-family:var(--head);font-size:.65rem;letter-spacing:.2em;text-transform:uppercase;color:var(--purple);margin-bottom:1rem}
        .footer-col ul{list-style:none;display:flex;flex-direction:column;gap:.6rem}
        .footer-col li{font-size:.82rem;color:var(--muted2)}
        .footer-col a{color:var(--muted2);transition:color .2s}
        .footer-col a:hover{color:var(--purple)}
        .footer-bottom{border-top:1px solid var(--border);padding-top:1.5rem;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem}
        .footer-copy{font-family:var(--head);font-size:.65rem;letter-spacing:.08em;color:var(--muted)}
        .footer-copy span{color:var(--purple)}
        .footer-links{display:flex;gap:1.5rem}
        .footer-links a{font-family:var(--head);font-size:.62rem;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);transition:color .2s}
        .footer-links a:hover{color:var(--purple)}

        /* REVEAL */
        .rv{opacity:0;transform:translateY(28px);transition:opacity .75s cubic-bezier(.4,0,.2,1),transform .75s cubic-bezier(.4,0,.2,1)}
        .rv.v{opacity:1;transform:none}
        .rvl{opacity:0;transform:translateX(-28px);transition:opacity .75s cubic-bezier(.4,0,.2,1),transform .75s cubic-bezier(.4,0,.2,1)}
        .rvl.v{opacity:1;transform:none}
        .rvr{opacity:0;transform:translateX(28px);transition:opacity .75s cubic-bezier(.4,0,.2,1),transform .75s cubic-bezier(.4,0,.2,1)}
        .rvr.v{opacity:1;transform:none}
        .div-line{height:1px;background:linear-gradient(90deg,transparent,var(--border2),transparent);margin:0 2rem}
        #particles{position:fixed;inset:0;z-index:0;pointer-events:none}
      `}</style>

      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Inter:wght@300;400;500;600&family=Orbitron:wght@700;900&display=swap" rel="stylesheet" />

      <canvas id="particles" ref={canvasRef} />
      <div className="hero-bg" />
      <div className="hero-grid" />

      {/* ── NAV ─────────────────────────────────────── */}
      <nav className={`nav-wrap${stuck ? " stuck" : ""}`}>
        <div className="nav-inner">
          <div>
            <div className="logo">YRNR</div>
            <span className="logo-sub">Yearner Community</span>
          </div>
          <div className="nav-links">
            {NAV_LINKS.map(({ label, id }) => (
              <button
                key={id}
                className={`nav-link${activeSection === id ? " on" : ""}`}
                onClick={() => smoothScroll(id)}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="nav-right">
            <div className="nav-tag">
              <div className="live-dot" />
              <span>Open to all players</span>
            </div>
            <button className="btn-join" onClick={() => smoothScroll("join")}>Join YRNR</button>
          </div>
          <button className={`ham${menuOpen ? " open" : ""}`} onClick={() => setMenuOpen((v) => !v)}>
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mob-menu${menuOpen ? " open" : ""}`}>
        {NAV_LINKS.map(({ label, id }) => (
          <button key={id} onClick={() => { smoothScroll(id); closeMenu(); }}>{label}</button>
        ))}
      </div>

      {/* ── HERO ────────────────────────────────────── */}
      <section>
        <div className="hero">
          <div className="hero-content">
            <div className="hero-eyebrow">
              <span className="eyebrow-pill">Est. 2024</span>
              <span className="eyebrow-slash">//</span>
              <span>PH-based · Open to all · Events · Giveaways</span>
            </div>
            <h1 className="hero-title">
              <span className="line"><span>One Org.</span></span>
              <span className="line"><span>All Games.</span></span>
              <span className="line"><span>No matter what you play.</span></span>
            </h1>
            <p className="hero-desc">
              <strong>YRNR (Yearner)</strong> is a gaming community organization that brings together players of{" "}
              <strong>iDate: ReVibe</strong> and <strong>Valorant</strong>. We run events, tournaments, and giveaways — and we welcome everyone, no matter what they play.
            </p>
            <div className="hero-btns">
              <button className="btn-primary" onClick={() => smoothScroll("join")}>Join the Community</button>
              <button className="btn-sec" onClick={() => smoothScroll("events")}>See Upcoming Events</button>
            </div>
            <div className="hero-games">
              <span className="hero-games-label">// we play</span>
              <div className="game-badge"><div className="dot" style={{ background: "var(--pink)" }} />iDate: ReVibe</div>
              <div className="game-badge"><div className="dot" style={{ background: "var(--red)" }} />Valorant</div>
            </div>
          </div>
          <div className="hero-stats">
            <div className="hstat"><div className="hstat-val">10+</div><div className="hstat-label">Members</div></div>
            <div className="hstat"><div className="hstat-val">2</div><div className="hstat-label">Games</div></div>
            <div className="hstat"><div className="hstat-val">PH</div><div className="hstat-label">Based</div></div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE 1 ───────────────────────────────── */}
      <Marquee />

      {/* ── ABOUT ───────────────────────────────────── */}
      <section id="about">
        <div className="sec">
          <div className="rv">
            <div className="sec-label">about us</div>
            <h2 className="sec-h2">Built for every<br />kind of gamer.</h2>
            <p className="sec-sub">Whether you're dancing in iDate or clutching rounds in Valorant — YRNR is your home. We don't gatekeep games, we build community.</p>
          </div>
          <div className="games-split">
            <div className="rvl">
              <div className="about-body">
                <div className="accent-bar" />
                <p><strong>YRNR (Yearner)</strong> was formed by a group of passionate Filipino gamers who wanted one thing — a place where players from different games could exist together without judgment.</p>
                <p>We organize <strong>in-game events, tournaments, giveaways</strong>, and community hangouts for both iDate: ReVibe and Valorant players. We believe gaming is about connection, not competition between games.</p>
                <p>Our team spans <strong>Game Masters, Developers, Moderators, and Community Managers</strong> — all working together to keep this community alive, fair, and fun.</p>
                <div className="unity-badge">
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--purple)", boxShadow: "0 0 10px var(--purple)" }} />
                  <span>Powered by <strong>passion</strong>, united by <strong>gaming</strong></span>
                </div>
              </div>
            </div>
            <div className="rvr" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div className="game-card">
                <div className="game-card-header">
                  <div className="game-icon idate">iD</div>
                  <div><div className="game-name">iDate: ReVibe</div><div className="game-type">Music · Dance · Social</div></div>
                </div>
                <div className="game-card-body">
                  <p>The first online interactive dating game with music, dance, and friendly competition. Express yourself, meet people, and move to the beat.</p>
                  <div className="game-tags">
                    <span className="game-tag p">Dance Battles</span>
                    <span className="game-tag p">Social Events</span>
                    <span className="game-tag p">Music</span>
                    <span className="game-tag p">PH Server</span>
                  </div>
                </div>
              </div>
              <div className="game-card">
                <div className="game-card-header">
                  <div className="game-icon valo">VAL</div>
                  <div><div className="game-name">Valorant</div><div className="game-type">Tactical FPS · Competitive</div></div>
                </div>
                <div className="game-card-body">
                  <p>A character-based tactical shooter where precise gunplay meets unique agent abilities. Compete, rank up, and rep YRNR on the battlefield.</p>
                  <div className="game-tags">
                    <span className="game-tag r">Tournaments</span>
                    <span className="game-tag r">Ranked Grind</span>
                    <span className="game-tag r">5v5</span>
                    <span className="game-tag r">Custom Games</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="div-line" />

      {/* ── EVENTS ──────────────────────────────────── */}
      <section id="events" style={{ background: "var(--bg1)" }}>
        <div className="sec">
          <div className="rv">
            <div className="sec-label">events</div>
            <h2 className="sec-h2">Something for<br />everyone, always.</h2>
            <p className="sec-sub">From iDate dance showdowns to Valorant scrims — YRNR runs events for every type of player, every week.</p>
          </div>
          <div className="rv events-grid">
            {/* Featured */}
            <div className="featured-event">
              <div className="fe-left">
                <div className="fe-badge">
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--purple)", boxShadow: "0 0 8px var(--purple)" }} />
                  Featured Event
                </div>
                <h3 className="fe-title">YRNR Grand Showdown<br />Season 1</h3>
                <p className="fe-desc">Our biggest cross-game event yet. Compete in both iDate: ReVibe and Valorant for a chance at our largest prize pool. Open registration for all YRNR members.</p>
                <div style={{ display: "flex", flexDirection: "column", gap: ".6rem", marginTop: "1.5rem" }}>
                  <div className="fe-detail"><strong>Date:</strong> TBA — July 2025</div>
                  <div className="fe-detail"><strong>Who:</strong> All YRNR members</div>
                  <div className="fe-detail"><strong>Games:</strong> iDate: ReVibe + Valorant</div>
                  <div className="fe-detail"><strong>Format:</strong> Brackets + Dance Battle</div>
                </div>
              </div>
              <div className="fe-right">
                <div>
                  <div className="fe-prize-label">Prize Pool</div>
                  <div className="fe-prize">TBA</div>
                </div>
                <div style={{ height: 1, background: "var(--border)", width: "100%" }} />
                <p style={{ fontSize: ".82rem", color: "var(--muted2)", lineHeight: 1.7 }}>Registration opens soon. Stay tuned to our Discord for announcements, bracket releases, and schedule updates.</p>
                <button className="btn-primary" style={{ marginTop: ".5rem", clipPath: "none", borderRadius: 6 }} onClick={() => smoothScroll("join")}>Get Notified</button>
              </div>
            </div>
            {/* Regular */}
            {[
              { type: "tournament", title: "Weekly Scrim Night", desc: "Casual 5v5 custom games every Friday. Practice your aim, learn new agents, and rep YRNR in custom lobbies.", game: "Valorant", dotColor: "var(--red)", status: "upcoming", statusLabel: "Every Friday" },
              { type: "dance", title: "Dance Battle Thursdays", desc: "Show off your best moves in iDate: ReVibe every Thursday. Open to all skill levels — newbies welcome!", game: "iDate ReVibe", dotColor: "var(--pink)", status: "soon", statusLabel: "Every Thursday" },
              { type: "giveaway", title: "Weekly Member Giveaway", desc: "Active members get entered into our weekly raffle for in-game items, skins, VP, and exclusive YRNR merch.", game: "All Games", dotColor: "var(--purple)", status: "open", statusLabel: "Weekly" },
              { type: "community", title: "YRNR Movie / Game Night", desc: "Not everything has to be competitive. Monthly chill nights where the community hangs out, plays party games, and just vibes.", game: "All Members", dotColor: "#22d3ee", status: "open", statusLabel: "Monthly" },
              { type: "tournament", title: "1v1 Aim Duel Series", desc: "Test your mechanical skill in a bracket-style 1v1 tournament on Range maps. Small prizes for top performers.", game: "Valorant", dotColor: "var(--red)", status: "upcoming", statusLabel: "Bi-weekly" },
            ].map((e) => (
              <div className="event-card" key={e.title}>
                <div className={`event-type ${e.type}`}>{e.type === "dance" ? "iDate" : e.type.charAt(0).toUpperCase() + e.type.slice(1)}</div>
                <div className="event-title">{e.title}</div>
                <div className="event-desc">{e.desc}</div>
                <div className="event-meta">
                  <div className="event-game"><div className="dot" style={{ width: 5, height: 5, borderRadius: "50%", background: e.dotColor }} />{e.game}</div>
                  <div className={`event-status ${e.status}`}>{e.statusLabel}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MARQUEE 2 ───────────────────────────────── */}
      <Marquee reverse />

      {/* ── TEAM ────────────────────────────────────── */}
      <section id="team">
        <div className="sec">
          <div className="rv">
            <div className="sec-label">the team</div>
            <h2 className="sec-h2">The people behind<br />YRNR.</h2>
            <p className="sec-sub">From leadership to server management — here's everyone na may wow at bitaw both Valorant at iDate Revibe,Revival at Next Generation.</p>
          </div>
          <div className="rv members-grid">
            {[
              { role: "gm",  initials: "GM",  tag: "GM",  name: "Bombszee" },
              { role: "dev", initials: "DEV", tag: "Dev", name: "Jay"      },
              { role: "dev", initials: "DEV", tag: "Dev", name: "Xuxi"     },
              { role: "mod", initials: "MOD", tag: "Mod", name: "Jaydee"   },
              { role: "mod", initials: "MOD", tag: "Mod", name: "Tzukii"   },
              { role: "mod", initials: "MOD", tag: "Mod", name: "Lawther"  },
              { role: "mod", initials: "MOD", tag: "Mod", name: "Ceejay"   },
              { role: "mod", initials: "MOD", tag: "Mod", name: "Solana"   },
              { role: "cm",  initials: "CM",  tag: "CM",  name: "Hakan"    },
              { role: "cm",  initials: "CM",  tag: "CM",  name: "Yeji"     },
              { role: "cm",  initials: "CM",  tag: "CM",  name: "Mina"     },
            ].map((m) => (
              <div className={`member-card role-${m.role}`} key={m.name}>
                <div className="member-avatar">{m.initials}</div>
                <div className="member-tag">{m.tag}</div>
                <div className="member-name">{m.name}</div>
              </div>
            ))}
          </div>
          <div className="rv" style={{ marginTop: "2.5rem", display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            {[
              { color: "rgba(168,85,247,.3)", border: "rgba(168,85,247,.4)", label: "GM — Game Master" },
              { color: "rgba(34,211,238,.2)", border: "rgba(34,211,238,.3)", label: "Dev — Developer" },
              { color: "rgba(239,68,68,.2)",  border: "rgba(239,68,68,.3)",  label: "Mod — Moderator" },
              { color: "rgba(34,197,94,.2)",  border: "rgba(34,197,94,.3)",  label: "CM — Community Manager" },
            ].map((l) => (
              <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "var(--head)", fontSize: ".72rem", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--muted2)" }}>
                <div style={{ width: 10, height: 10, borderRadius: 3, background: l.color, border: `1px solid ${l.border}` }} />
                {l.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GIVEAWAY ────────────────────────────────── */}
      <section id="giveaway" style={{ background: "var(--bg1)" }}>
        <div className="sec">
          <div className="rv">
            <div className="sec-label">giveaways</div>
            <h2 className="sec-h2">We give back to<br />our community.</h2>
            <p className="sec-sub">Active members are always entered into our ongoing giveaways — just show up, participate, and win.</p>
          </div>
          <div className="rv gw-banner">
            <div className="gw-inner">
              <div>
                <div className="gw-eyebrow">
                  <div className="gw-pulse" />
                  <div className="gw-eyebrow-text">Ongoing Giveaway Program</div>
                </div>
                <h3 className="gw-title">YRNR Member<br />Rewards Drop</h3>
                <p className="gw-desc">Every active YRNR member is automatically entered into our weekly giveaway rotation. Participate in events, be active in our community, and you'll earn your shot at exclusive prizes.</p>
                <div className="gw-steps">
                  {["Join the YRNR Discord server","Participate in any YRNR event or activity","Get entered into the weekly raffle automatically","Winners announced every Sunday on Discord"].map((step, i) => (
                    <div className="gw-step" key={i}>
                      <div className="gw-step-num">0{i + 1}</div>
                      {step}
                    </div>
                  ))}
                </div>
                <button className="btn-primary" onClick={() => smoothScroll("join")} style={{ clipPath: "none", borderRadius: 6 }}>Join to Enter Giveaways</button>
              </div>
              <div className="gw-prizes">
                {[
                  { rank: "Weekly Prize",  val: "VP / GC", item: "Valorant Points or Game Cash" },
                  { rank: "Monthly Prize", val: "Skins",   item: "Exclusive in-game cosmetics"  },
                  { rank: "Grand Prize",   val: "TBA",     item: "Announced per event season"   },
                ].map((p) => (
                  <div className="gw-prize-card" key={p.rank}>
                    <div className="gw-prize-rank">{p.rank}</div>
                    <div className="gw-prize-val">{p.val}</div>
                    <div className="gw-prize-item">{p.item}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── JOIN / DISCORD ───────────────────────────── */}
      <section id="join">
        <div className="sec">
          <div className="rv discord-section">
            <div className="discord-left">
              <h3>Come hang with us<br /><span style={{ color: "var(--purple)" }}>on Discord.</span></h3>
              <p style={{ marginTop: ".75rem" }}>Our Discord is where everything happens — event announcements, giveaway drops, looking for party (LFP) channels, and just general good vibes. Free to join, no strings attached.</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: ".75rem", marginTop: "1.5rem" }}>
                {["📣 Event Announcements","🎁 Giveaway Drops","🕹️ Looking for Party","💬 Chilling & Vibing"].map((b) => (
                  <div className="game-badge" key={b} style={{ fontSize: ".8rem", padding: "8px 16px" }}>{b}</div>
                ))}
              </div>
            </div>
            <a href="https://discord.gg/U7xan4K2N7"><button className="btn-discord">Join YRNR Discord</button></a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────── */}
      <footer>
        <div className="footer-inner">
          <div className="footer-top">
            <div>
              <div className="footer-logo">YRNR</div>
              <p className="footer-tagline">Yearner Gaming Community — where iDate: ReVibe dancers and Valorant fraggers exist under one roof. No walls, no gatekeeping, just gaming.</p>
            </div>
            <div className="footer-col">
              <div className="footer-col-title">Navigate</div>
              <ul>
                {NAV_LINKS.map(({ label, id }) => (
                  <li key={id}><a href={`#${id}`}>{label === "Giveaways" ? "Giveaways" : label}</a></li>
                ))}
              </ul>
            </div>
            <div className="footer-col">
              <div className="footer-col-title">Games We Play</div>
              <ul>
                <li><a href="https://idate.mythgames.net/" target="_blank" rel="noreferrer">iDate: ReVibe ↗</a></li>
                <li><a href="https://playvalorant.com" target="_blank" rel="noreferrer">Valorant ↗</a></li>
                <li><span>More games coming soon</span></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-copy">© 2026 <span>YRNR</span> · Yearner Community · PH-based · Open to all</div>
            <div className="footer-links">
              <a href="#join">Discord</a>
              <a href="#events">Events</a>
              <a href="#team">Team</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

/* ─── Marquee sub-component ─────────────────────────── */
const MARQUEE_ITEMS = [
  { cls: "hi", text: "iDate ReVibe" },
  { cls: "red", text: "Valorant" },
  { cls: "", text: "Weekly Giveaways" },
  { cls: "", text: "Tournaments" },
  { cls: "hi", text: "Community Events" },
  { cls: "", text: "PH Gaming" },
  { cls: "", text: "Open to All" },
  { cls: "red", text: "Competitive & Casual" },
  { cls: "", text: "Dance & Frag" },
  { cls: "hi", text: "Yearner Org" },
];

const MARQUEE_ITEMS_2 = [
  { cls: "", text: "Weekly Scrims" },
  { cls: "hi", text: "Dance Battles" },
  { cls: "", text: "Member Giveaways" },
  { cls: "red", text: "Valorant Duels" },
  { cls: "", text: "PH Community" },
  { cls: "hi", text: "iDate Events" },
  { cls: "", text: "Game Nights" },
  { cls: "red", text: "Tournament Brackets" },
  { cls: "", text: "Open Membership" },
  { cls: "hi", text: "YRNR Forever" },
];

function Marquee({ reverse = false }: { reverse?: boolean }) {
  const items = reverse ? MARQUEE_ITEMS_2 : MARQUEE_ITEMS;
  const doubled = [...items, ...items]; // seamless loop
  return (
    <div className="mq">
      <div className={`mq-track${reverse ? " rev" : ""}`}>
        {doubled.map((item, i) => (
          <div className={`mq-item${item.cls ? ` ${item.cls}` : ""}`} key={i}>
            <div className="mq-sep" />
            {item.text}
          </div>
        ))}
      </div>
    </div>
  );
}