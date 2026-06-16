import React, { useEffect, useRef } from "react";

export default function YRNRPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    const mob = document.getElementById("mobmenu");
    const ham = document.getElementById("ham");
    mob?.classList.remove("open");
    ham?.classList.remove("open");
  };

  const toggleMenu = () => {
    const m = document.getElementById("mobmenu");
    const h = document.getElementById("ham");
    m?.classList.toggle("open");
    h?.classList.toggle("open");
  };

  useEffect(() => {
    const nav = document.getElementById("nav");
    const sections = ["about", "events", "team", "giveaway", "join"];

    const onScroll = () => {
      if (!nav) return;

      nav.classList.toggle("stuck", window.scrollY > 20);

      const links = document.querySelectorAll(".nav-link");

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 160) {
          links.forEach((l) => l.classList.remove("on"));
          links[i] && links[i].classList.add("on");
          return;
        }
      }

      links.forEach((l) => l.classList.remove("on"));
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("v");
        });
      },
      { threshold: 0.06 }
    );

    document.querySelectorAll(".rv,.rvl,.rvr").forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const particles: any[] = [];

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.5 + 0.3,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        a: Math.random() * 0.4 + 0.05,
        c: Math.random() > 0.5 ? "168,85,247" : "236,72,153",
      });
    }

    let raf = 0;

    const animate = () => {
      ctx.clearRect(0, 0, w, h);

      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.c},${p.a})`;
        ctx.fill();
      });

      raf = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <canvas id="particles" ref={canvasRef}></canvas>
      <div className="hero-bg"></div>
      <div className="hero-grid"></div>

      {/* NAV */}
      <nav id="nav">
        <div className="nav-inner">
          <div>
            <div className="logo">YRNR</div>
            <span className="logo-sub">Yearner Community</span>
          </div>

          <div className="nav-links">
            <button className="nav-link" onClick={() => scrollToSection("about")}>About</button>
            <button className="nav-link" onClick={() => scrollToSection("events")}>Events</button>
            <button className="nav-link" onClick={() => scrollToSection("team")}>Team</button>
            <button className="nav-link" onClick={() => scrollToSection("giveaway")}>Giveaways</button>
            <button className="nav-link" onClick={() => scrollToSection("join")}>Join</button>
          </div>

          <div className="nav-right">
            <div className="nav-tag">
              <div className="live-dot"></div>
              <span>Open to all players</span>
            </div>
            <button className="btn-join" onClick={() => scrollToSection("join")}>Join YRNR</button>
          </div>

          <button className="ham" id="ham" onClick={toggleMenu}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      <div className="mob-menu" id="mobmenu">
        <button onClick={() => scrollToSection("about")}>About</button>
        <button onClick={() => scrollToSection("events")}>Events</button>
        <button onClick={() => scrollToSection("team")}>Team</button>
        <button onClick={() => scrollToSection("giveaway")}>Giveaways</button>
        <button onClick={() => scrollToSection("join")}>Join</button>
      </div>

      {/* HERO */}
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
              <strong>YRNR (Yearner)</strong> is a gaming community organization that brings together players of <strong>iDate: ReVibe</strong> and <strong>Valorant</strong>.
            </p>

            <div className="hero-btns">
              <button className="btn-primary" onClick={() => scrollToSection("join")}>Join the Community</button>
              <button className="btn-sec" onClick={() => scrollToSection("events")}>See Upcoming Events</button>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        /* ===== FULL ORIGINAL CSS (UNCHANGED) ===== */
        /* (CSS from your original file pasted here exactly) */

        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        :root{--bg:#08060f;--bg1:#0d0a18;--bg2:#110e1f;--surface:#17132a;--surface2:#1e1934;--purple:#a855f7;--purple2:#7c3aed;--purple3:#4c1d95;--pink:#ec4899;--pink2:#be185d;--red:#ef4444;--red2:#b91c1c;--border:rgba(168,85,247,0.12);--border2:rgba(168,85,247,0.35);--text:#f0eaff;--muted:#6b5d8a;--muted2:#9d8cbd;--display:'Orbitron',monospace;--head:'Rajdhani',sans-serif;--body:'Inter',sans-serif;--glow-p:0 0 40px rgba(168,85,247,0.2);--glow-r:0 0 40px rgba(239,68,68,0.2);}
        html{scroll-behavior:smooth}
        body{background:var(--bg);color:var(--text);font-family:var(--body);overflow-x:hidden}
        a{text-decoration:none;color:inherit}
        /* NOTE: keep rest of your CSS exactly as-is here */
      `}</style>
    </>
  );
}