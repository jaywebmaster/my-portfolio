"use client";
import { useState, useEffect, useRef } from "react";

const NAV = ["About", "Skills", "Projects", "Contact"];

const SKILLS = [
  { label: "HTML & CSS", pct: 95 },
  { label: "JavaScript", pct: 90 },
  { label: "TypeScript", pct: 80 },
  { label: "React", pct: 88 },
  { label: "Next.js", pct: 82 },
  { label: "Node.js", pct: 75 },
  { label: "Git & GitHub", pct: 85 },
  { label: "REST APIs", pct: 80 },
];

const PROJECTS = [
  {
    title: "Project One",
    desc: "A full-stack web app built with Next.js and a REST API backend. Replace this with your real project description.",
    tags: ["Next.js", "TypeScript", "REST API"],
    link: "#",
  },
  {
    title: "Project Two",
    desc: "A responsive React application with dynamic data fetching and modern UI. Replace this with your real project description.",
    tags: ["React", "CSS", "Node.js"],
    link: "#",
  },
  {
    title: "Project Three",
    desc: "An interactive front-end project showcasing CSS animations and JavaScript logic. Replace with your real description.",
    tags: ["HTML", "CSS", "JavaScript"],
    link: "#",
  },
];

export default function Portfolio() {
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const skillsRef = useRef<HTMLDivElement>(null);
  const [skillsVisible, setSkillsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const sections = NAV.map((n) => document.getElementById(n.toLowerCase()));
      for (let i = sections.length - 1; i >= 0; i--) {
        const s = sections[i];
        if (s && s.getBoundingClientRect().top <= 120) {
          setActive(NAV[i]);
          return;
        }
      }
      setActive("");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setSkillsVisible(true); },
      { threshold: 0.2 }
    );
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
    setTimeout(() => { setSending(false); setSent(true); }, 1500);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #080b12;
          --bg2: #0d1117;
          --card: #111720;
          --border: #1e2a3a;
          --accent: #00c2ff;
          --accent2: #7b5ea7;
          --text: #e8edf5;
          --muted: #6b7a90;
          --glow: 0 0 24px rgba(0,194,255,0.18);
          --glow-lg: 0 0 60px rgba(0,194,255,0.12);
        }

        html { scroll-behavior: smooth; }

        body {
          background: var(--bg);
          color: var(--text);
          font-family: 'DM Sans', sans-serif;
          font-weight: 300;
          line-height: 1.7;
          overflow-x: hidden;
        }

        nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 2rem; height: 64px;
          background: rgba(8,11,18,0.85);
          backdrop-filter: blur(14px);
          border-bottom: 1px solid var(--border);
        }
        .nav-logo {
          font-family: 'Syne', sans-serif;
          font-weight: 800; font-size: 1.2rem;
          background: linear-gradient(90deg, var(--accent), var(--accent2));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          letter-spacing: -0.02em;
        }
        .nav-links { display: flex; gap: 2rem; list-style: none; }
        .nav-links button {
          background: none; border: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif; font-size: .875rem;
          color: var(--muted); letter-spacing: .04em; text-transform: uppercase;
          transition: color .2s; padding: 4px 0; position: relative;
        }
        .nav-links button::after {
          content: ''; position: absolute; bottom: -2px; left: 0; right: 0;
          height: 1px; background: var(--accent);
          transform: scaleX(0); transition: transform .2s;
        }
        .nav-links button:hover, .nav-links button.active { color: var(--text); }
        .nav-links button.active::after, .nav-links button:hover::after { transform: scaleX(1); }

        .hamburger { display: none; background: none; border: none; cursor: pointer; padding: 8px; }
        .hamburger span { display: block; width: 22px; height: 2px; background: var(--text); margin: 5px 0; transition: all .2s; border-radius: 2px; }

        .mobile-menu {
          display: none; position: fixed; top: 64px; left: 0; right: 0; z-index: 99;
          background: rgba(8,11,18,0.97); backdrop-filter: blur(14px);
          border-bottom: 1px solid var(--border); padding: 1.5rem 2rem;
          flex-direction: column; gap: 1rem;
        }
        .mobile-menu.open { display: flex; }
        .mobile-menu button {
          background: none; border: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif; font-size: 1rem;
          color: var(--muted); text-align: left; padding: 4px 0; transition: color .2s;
        }
        .mobile-menu button:hover { color: var(--text); }

        @media (max-width: 640px) {
          .nav-links { display: none; }
          .hamburger { display: block; }
        }

        section { position: relative; z-index: 1; }

        .hero {
          min-height: 100vh;
          display: flex; align-items: center; justify-content: center;
          padding: 100px 2rem 4rem; text-align: center; overflow: hidden;
        }
        .hero-glow {
          position: absolute; width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(0,194,255,0.07) 0%, transparent 70%);
          top: 50%; left: 50%; transform: translate(-50%,-60%); pointer-events: none;
        }
        .hero-glow2 {
          position: absolute; width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(123,94,167,0.08) 0%, transparent 70%);
          top: 60%; left: 40%; transform: translate(-50%,-50%); pointer-events: none;
        }
        .hero-content { position: relative; max-width: 780px; }
        .hero-tag {
          display: inline-block; margin-bottom: 1.5rem;
          padding: 6px 16px; border: 1px solid var(--border);
          border-radius: 999px; font-size: .75rem; letter-spacing: .12em;
          text-transform: uppercase; color: var(--accent);
          background: rgba(0,194,255,0.05);
        }
        h1 {
          font-family: 'Syne', sans-serif; font-weight: 800;
          font-size: clamp(2.8rem, 8vw, 5.5rem); line-height: 1.05;
          letter-spacing: -0.03em; margin-bottom: 1.5rem;
        }
        .hero-name {
          background: linear-gradient(135deg, #fff 0%, var(--accent) 60%, var(--accent2) 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .hero-sub {
          font-size: clamp(1rem, 2.5vw, 1.2rem); color: var(--muted);
          max-width: 520px; margin: 0 auto 2.5rem; font-weight: 300;
        }
        .hero-btns { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
        .btn-primary {
          padding: 12px 28px; border-radius: 8px; font-size: .9rem;
          background: var(--accent); color: #080b12; font-weight: 500;
          border: none; cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: box-shadow .2s, transform .15s;
          box-shadow: 0 0 20px rgba(0,194,255,0.3);
        }
        .btn-primary:hover { box-shadow: 0 0 32px rgba(0,194,255,0.5); transform: translateY(-1px); }
        .btn-outline {
          padding: 12px 28px; border-radius: 8px; font-size: .9rem;
          background: transparent; color: var(--text); font-weight: 400;
          border: 1px solid var(--border); cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: border-color .2s, transform .15s;
        }
        .btn-outline:hover { border-color: var(--accent); transform: translateY(-1px); }

        .section-inner { max-width: 1000px; margin: 0 auto; padding: 6rem 2rem; }
        .section-label {
          font-size: .7rem; letter-spacing: .18em; text-transform: uppercase;
          color: var(--accent); margin-bottom: .75rem; font-weight: 500;
        }
        h2 {
          font-family: 'Syne', sans-serif; font-weight: 700;
          font-size: clamp(2rem, 5vw, 3rem); letter-spacing: -0.02em;
          margin-bottom: 1rem; line-height: 1.1;
        }
        .divider {
          width: 48px; height: 2px; margin-bottom: 3rem;
          background: linear-gradient(90deg, var(--accent), transparent);
        }

        .about-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center;
        }
        @media (max-width: 700px) { .about-grid { grid-template-columns: 1fr; gap: 2.5rem; } }
        .about-text p { color: var(--muted); margin-bottom: 1rem; font-size: .975rem; }
        .about-stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .about-stat {
          background: var(--card); border: 1px solid var(--border);
          border-radius: 12px; padding: 1.25rem;
        }
        .about-stat-num {
          font-family: 'Syne', sans-serif; font-size: 2rem;
          font-weight: 800; color: var(--accent); line-height: 1; margin-bottom: .25rem;
        }
        .about-stat-label { font-size: .8rem; color: var(--muted); text-transform: uppercase; letter-spacing: .06em; }

        #skills { background: var(--bg2); }
        .skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem 3rem; }
        @media (max-width: 600px) { .skills-grid { grid-template-columns: 1fr; } }
        .skill-top { display: flex; justify-content: space-between; margin-bottom: .5rem; font-size: .875rem; }
        .skill-name { color: var(--text); }
        .skill-pct { color: var(--accent); font-weight: 500; }
        .skill-bar-bg { height: 4px; background: var(--border); border-radius: 2px; overflow: hidden; }
        .skill-bar-fill {
          height: 100%; border-radius: 2px;
          background: linear-gradient(90deg, var(--accent2), var(--accent));
          width: 0; transition: width 1.2s cubic-bezier(.4,0,.2,1);
          box-shadow: 0 0 8px rgba(0,194,255,0.4);
        }

        .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; }
        .project-card {
          background: var(--card); border: 1px solid var(--border);
          border-radius: 16px; padding: 1.75rem;
          transition: border-color .2s, transform .2s, box-shadow .2s;
          cursor: pointer; position: relative; overflow: hidden;
        }
        .project-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, var(--accent), transparent);
          opacity: 0; transition: opacity .3s;
        }
        .project-card:hover { border-color: rgba(0,194,255,0.3); transform: translateY(-4px); box-shadow: 0 0 60px rgba(0,194,255,0.12); }
        .project-card:hover::before { opacity: 1; }
        .project-num { font-family: 'Syne', sans-serif; font-size: .75rem; color: var(--accent); letter-spacing: .1em; margin-bottom: 1rem; }
        .project-title { font-family: 'Syne', sans-serif; font-size: 1.2rem; font-weight: 700; margin-bottom: .75rem; }
        .project-desc { font-size: .875rem; color: var(--muted); margin-bottom: 1.25rem; line-height: 1.6; }
        .project-tags { display: flex; flex-wrap: wrap; gap: .5rem; margin-bottom: 1.25rem; }
        .project-tag {
          font-size: .7rem; padding: 3px 10px; border-radius: 999px;
          border: 1px solid var(--border); color: var(--muted);
          letter-spacing: .06em; text-transform: uppercase;
        }
        .project-link { font-size: .8rem; color: var(--accent); text-decoration: none; display: inline-flex; align-items: center; gap: 6px; transition: gap .15s; }
        .project-link:hover { gap: 10px; }

        #contact { background: var(--bg2); }
        .contact-wrap { max-width: 560px; }
        .contact-wrap p { color: var(--muted); margin-bottom: 2.5rem; font-size: .975rem; }
        .form-group { margin-bottom: 1.25rem; }
        .form-group label { display: block; font-size: .75rem; text-transform: uppercase; letter-spacing: .1em; color: var(--muted); margin-bottom: .5rem; }
        .form-group input, .form-group textarea {
          width: 100%; background: var(--card); border: 1px solid var(--border);
          border-radius: 10px; padding: 12px 16px; color: var(--text);
          font-family: 'DM Sans', sans-serif; font-size: .95rem; font-weight: 300;
          outline: none; transition: border-color .2s, box-shadow .2s; resize: vertical;
        }
        .form-group input:focus, .form-group textarea:focus {
          border-color: var(--accent); box-shadow: 0 0 0 3px rgba(0,194,255,0.08);
        }
        .form-group textarea { min-height: 130px; }
        .sent-msg { color: var(--accent); font-size: .9rem; margin-top: .75rem; }

        footer {
          text-align: center; padding: 2.5rem 2rem;
          border-top: 1px solid var(--border);
          font-size: .8rem; color: var(--muted);
          position: relative; z-index: 1;
        }
        footer span { color: var(--accent); }

        .reveal { opacity: 0; transform: translateY(24px); transition: opacity .7s ease, transform .7s ease; }
        .reveal.visible { opacity: 1; transform: none; }
      `}</style>

      <nav>
        <div className="nav-logo">YourName.dev</div>
        <ul className="nav-links">
          {NAV.map((n) => (
            <li key={n}>
              <button className={active === n ? "active" : ""} onClick={() => scrollTo(n)}>
                {n}
              </button>
            </li>
          ))}
        </ul>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {NAV.map((n) => <button key={n} onClick={() => scrollTo(n)}>{n}</button>)}
      </div>

      <section className="hero">
        <div className="hero-glow" />
        <div className="hero-glow2" />
        <div className="hero-content">
          <div className="hero-tag">Available for work</div>
          <h1>Hi, I'm <span className="hero-name">Your Name</span></h1>
          <p className="hero-sub">
            Full-stack web developer with 4 years of experience building fast, beautiful, and user-focused web applications.
          </p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => scrollTo("Projects")}>View My Work</button>
            <button className="btn-outline" onClick={() => scrollTo("Contact")}>Get In Touch</button>
          </div>
        </div>
      </section>

      <section id="about">
        <div className="section-inner">
          <RevealDiv>
            <p className="section-label">Who I am</p>
            <h2>About Me</h2>
            <div className="divider" />
          </RevealDiv>
          <div className="about-grid">
            <RevealDiv className="about-text">
              <p>I'm a passionate full-stack web developer based in the Philippines with 4 years of hands-on experience building modern web applications — from pixel-perfect frontends to robust backend systems.</p>
              <p>I love turning ideas into clean, performant products. Whether it's a sleek landing page or a complex web app, I bring the same level of care and precision to every project.</p>
              <p>When I'm not coding, I'm exploring new technologies and sharpening my skills to stay at the edge of the web.</p>
            </RevealDiv>
            <RevealDiv>
              <div className="about-stat-grid">
                {[
                  { num: "4+", label: "Years Experience" },
                  { num: "20+", label: "Projects Built" },
                  { num: "10+", label: "Happy Clients" },
                  { num: "100%", label: "Dedication" },
                ].map((s) => (
                  <div className="about-stat" key={s.label}>
                    <div className="about-stat-num">{s.num}</div>
                    <div className="about-stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </RevealDiv>
          </div>
        </div>
      </section>

      <section id="skills">
        <div className="section-inner">
          <RevealDiv>
            <p className="section-label">What I know</p>
            <h2>Skills</h2>
            <div className="divider" />
          </RevealDiv>
          <div className="skills-grid" ref={skillsRef}>
            {SKILLS.map((s) => (
              <div className="skill-item" key={s.label}>
                <div className="skill-top">
                  <span className="skill-name">{s.label}</span>
                  <span className="skill-pct">{s.pct}%</span>
                </div>
                <div className="skill-bar-bg">
                  <div className="skill-bar-fill" style={{ width: skillsVisible ? `${s.pct}%` : "0%" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects">
        <div className="section-inner">
          <RevealDiv>
            <p className="section-label">What I've built</p>
            <h2>Projects</h2>
            <div className="divider" />
          </RevealDiv>
          <div className="projects-grid">
            {PROJECTS.map((p, i) => (
              <RevealDiv key={p.title} style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="project-card" onClick={() => window.open(p.link, "_blank")}>
                  <div className="project-num">0{i + 1}</div>
                  <div className="project-title">{p.title}</div>
                  <p className="project-desc">{p.desc}</p>
                  <div className="project-tags">
                    {p.tags.map((t) => <span className="project-tag" key={t}>{t}</span>)}
                  </div>
                  <a className="project-link" href={p.link}>View Project →</a>
                </div>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      <section id="contact">
        <div className="section-inner">
          <RevealDiv>
            <p className="section-label">Let's work together</p>
            <h2>Contact</h2>
            <div className="divider" />
          </RevealDiv>
          <RevealDiv className="contact-wrap">
            <p>Have a project in mind or just want to say hi? My inbox is always open.</p>
            {!sent ? (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Name</label>
                  <input type="text" placeholder="Your name" required />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" placeholder="your@email.com" required />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea placeholder="Tell me about your project..." required />
                </div>
                <button className="btn-primary" type="submit" style={{ marginTop: "0.5rem" }}>
                  {sending ? "Sending..." : "Send Message"}
                </button>
              </form>
            ) : (
              <p className="sent-msg">✓ Message sent! I'll get back to you soon.</p>
            )}
          </RevealDiv>
        </div>
      </section>

      <footer>
        <p>Built with <span>Next.js</span> & deployed on <span>Vercel</span> — © {new Date().getFullYear()} Your Name</p>
      </footer>
    </>
  );
}

function RevealDiv({
  children,
  className = "",
  style = {},
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${vis ? "visible" : ""} ${className}`} style={style}>
      {children}
    </div>
  );
}
