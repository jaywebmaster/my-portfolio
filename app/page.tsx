<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Toxic Tempo — Valorant Team Portfolio</title>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600;700;800&family=Barlow:wght@400;500&display=swap" rel="stylesheet">
<style>
:root {
  --red: #FF2A3C;
  --gold: #E8C84A;
  --white: #F0EDE8;
  --bg: #09080D;
  --bg2: #0F0D16;
  --bg3: #15121F;
  --muted: rgba(240,237,232,0.42);
  --border: rgba(240,237,232,0.07);
}
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { background: var(--bg); color: var(--white); font-family: 'Barlow', sans-serif; overflow-x: hidden; }

/* NOISE */
body::before {
  content: ''; position: fixed; inset: 0; pointer-events: none; z-index: 0; opacity: 0.55;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");
}

/* NAV */
nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 3rem; height: 64px;
  background: rgba(9,8,13,0.88); backdrop-filter: blur(18px);
  border-bottom: 1px solid var(--border);
}
.nav-brand { display: flex; align-items: center; gap: 12px; text-decoration: none; }
.nav-vlogo { height: 22px; width: auto; filter: brightness(0) invert(1); opacity: 0.9; }
.nav-sep { width: 1px; height: 20px; background: rgba(240,237,232,0.15); }
.nav-name {
  font-family: 'Bebas Neue', sans-serif; font-size: 20px; letter-spacing: 0.12em;
  color: var(--white);
}
.nav-name span { color: var(--red); }
.nav-links { display: flex; gap: 2rem; }
.nav-links a {
  font-family: 'Barlow Condensed', sans-serif; font-size: 12px; font-weight: 700;
  letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); text-decoration: none;
  transition: color 0.2s;
}
.nav-links a:hover { color: var(--white); }
.nav-cta {
  font-family: 'Barlow Condensed', sans-serif; font-size: 12px; font-weight: 700;
  letter-spacing: 0.12em; text-transform: uppercase; color: var(--red);
  border: 1px solid var(--red); padding: 7px 18px; text-decoration: none; transition: all 0.2s;
}
.nav-cta:hover { background: var(--red); color: #fff; }

/* HERO */
.hero {
  min-height: 100vh; display: flex; flex-direction: column; justify-content: center;
  padding: 100px 3rem 4rem; position: relative; overflow: hidden;
}
.hero-grid {
  position: absolute; inset: 0;
  background-image: linear-gradient(rgba(255,42,60,0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,42,60,0.035) 1px, transparent 1px);
  background-size: 56px 56px; pointer-events: none;
}
.hero-glow {
  position: absolute; top: -180px; right: -180px; width: 650px; height: 650px;
  background: radial-gradient(circle, rgba(255,42,60,0.09) 0%, transparent 65%); pointer-events: none;
}
.hero-glow2 {
  position: absolute; bottom: -80px; left: 8%; width: 380px; height: 380px;
  background: radial-gradient(circle, rgba(232,200,74,0.05) 0%, transparent 65%); pointer-events: none;
}
.hero-eyebrow {
  font-family: 'Barlow Condensed', sans-serif; font-size: 11px; font-weight: 700;
  letter-spacing: 0.25em; text-transform: uppercase; color: var(--red); margin-bottom: 1.25rem;
  display: flex; align-items: center; gap: 10px;
  opacity: 0; animation: fadeUp 0.7s 0.2s forwards;
}
.hero-eyebrow::before { content: ''; display: block; width: 28px; height: 1px; background: var(--red); }
.hero-vbrand {
  margin-bottom: 1.2rem; opacity: 0; animation: fadeUp 0.7s 0.3s forwards;
  display: flex; align-items: center; gap: 14px;
}
.hero-vbrand img { height: 28px; filter: brightness(0) invert(1); opacity: 0.5; }
.hero-vbrand-sep { font-family: 'Barlow Condensed', sans-serif; font-size: 13px; color: rgba(240,237,232,0.25); letter-spacing: 0.05em; }
.hero-vbrand-txt { font-family: 'Barlow Condensed', sans-serif; font-size: 13px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(240,237,232,0.35); }
.hero-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(68px, 11.5vw, 155px);
  line-height: 0.88; letter-spacing: 0.03em; margin-bottom: 0.35em;
  opacity: 0; animation: fadeUp 0.8s 0.38s forwards;
}
.hero-title .outline {
  display: block; color: transparent;
  -webkit-text-stroke: 2px var(--red);
}
.hero-desc {
  font-size: 15px; color: var(--muted); max-width: 500px; margin-bottom: 2.5rem;
  line-height: 1.75; opacity: 0; animation: fadeUp 0.8s 0.52s forwards;
}
.hero-stats { display: flex; gap: 2.5rem; opacity: 0; animation: fadeUp 0.8s 0.65s forwards; flex-wrap: wrap; }
.hstat-n { font-family: 'Bebas Neue', sans-serif; font-size: 38px; line-height: 1; color: var(--white); }
.hstat-n .r { color: var(--red); }
.hstat-l { font-family: 'Barlow Condensed', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); margin-top: 3px; }
.hero-scroll {
  position: absolute; bottom: 2rem; left: 3rem;
  font-family: 'Barlow Condensed', sans-serif; font-size: 10px; font-weight: 700;
  letter-spacing: 0.2em; text-transform: uppercase; color: var(--muted);
  display: flex; align-items: center; gap: 10px;
}
.hero-scroll::after {
  content: ''; display: block; width: 40px; height: 1px; background: var(--muted);
  animation: pulse 1.6s ease-in-out infinite;
}
@keyframes pulse { 0%,100%{opacity:0.4;width:40px} 50%{opacity:1;width:68px} }

/* STRIP */
.strip {
  background: var(--bg2); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
  padding: 1.75rem 3rem; display: flex; overflow-x: auto; gap: 0;
}
.strip-item { flex: 1; min-width: 110px; padding: 0 2rem; border-right: 1px solid var(--border); text-align: center; }
.strip-item:last-child { border-right: none; }
.strip-val { font-family: 'Bebas Neue', sans-serif; font-size: 32px; color: var(--white); line-height: 1; }
.strip-val .r { color: var(--red); }
.strip-lbl { font-family: 'Barlow Condensed', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--muted); margin-top: 4px; }

/* SECTIONS */
section { padding: 6rem 3rem; position: relative; }
.s-eye { font-family: 'Barlow Condensed', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase; color: var(--red); margin-bottom: 0.6rem; display: flex; align-items: center; gap: 8px; }
.s-eye::before { content: ''; display: block; width: 18px; height: 1px; background: var(--red); }
.s-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(34px, 5vw, 58px); letter-spacing: 0.04em; line-height: 1; margin-bottom: 2.75rem; }

/* PLAYERS */
#players { background: var(--bg); }
.pgrid { display: grid; grid-template-columns: repeat(auto-fit, minmax(290px, 1fr)); gap: 1.5px; background: var(--border); border: 1px solid var(--border); }
.pcard { background: var(--bg2); padding: 1.75rem; position: relative; overflow: hidden; transition: background 0.3s; }
.pcard::after { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, var(--red), transparent); transform: scaleX(0); transform-origin: left; transition: transform 0.4s; }
.pcard:hover { background: var(--bg3); }
.pcard:hover::after { transform: scaleX(1); }
.pcard-bg { font-family: 'Bebas Neue', sans-serif; font-size: 80px; color: rgba(255,42,60,0.045); line-height: 1; position: absolute; top: 0.5rem; right: 1rem; letter-spacing: -0.02em; user-select: none; pointer-events: none; }
.pcard-top { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 1.1rem; }
.av { width: 50px; height: 50px; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-family: 'Bebas Neue', sans-serif; font-size: 18px; letter-spacing: 0.05em; flex-shrink: 0; }
.av-r { background: rgba(255,42,60,0.12); color: #ff4655; border: 1px solid rgba(255,42,60,0.25); }
.av-b { background: rgba(56,130,255,0.12); color: #6fa8ff; border: 1px solid rgba(56,130,255,0.25); }
.av-g { background: rgba(34,197,140,0.12); color: #3dd9a4; border: 1px solid rgba(34,197,140,0.25); }
.av-p { background: rgba(168,85,247,0.12); color: #c47dff; border: 1px solid rgba(168,85,247,0.25); }
.av-y { background: rgba(232,200,74,0.12); color: #e8c84a; border: 1px solid rgba(232,200,74,0.25); }
.pname { font-family: 'Bebas Neue', sans-serif; font-size: 26px; letter-spacing: 0.06em; line-height: 1; }
.prole { font-family: 'Barlow Condensed', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); margin-top: 3px; }
.pranks { display: flex; gap: 7px; flex-wrap: wrap; margin-bottom: 1rem; }
.rtag { font-family: 'Barlow Condensed', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 3px 9px; border-radius: 2px; }
.rt-curr { background: rgba(240,237,232,0.06); color: var(--muted); border: 1px solid rgba(240,237,232,0.1); }
.rt-rad { background: rgba(232,200,74,0.12); color: var(--gold); border: 1px solid rgba(232,200,74,0.28); }
.rt-i3 { background: rgba(178,82,255,0.12); color: #c47dff; border: 1px solid rgba(178,82,255,0.28); }
.rt-i2 { background: rgba(56,130,255,0.12); color: #6fa8ff; border: 1px solid rgba(56,130,255,0.28); }
.rt-a3 { background: rgba(34,197,140,0.12); color: #3dd9a4; border: 1px solid rgba(34,197,140,0.28); }
.rbadges { display: flex; gap: 5px; flex-wrap: wrap; margin-bottom: 1rem; }
.rb { font-family: 'Barlow Condensed', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; padding: 2px 8px; border-radius: 2px; }
.rb-d { background: rgba(255,42,60,0.13); color: #ff6b78; border: 1px solid rgba(255,42,60,0.22); }
.rb-s { background: rgba(255,159,67,0.12); color: #ffa84d; border: 1px solid rgba(255,159,67,0.22); }
.rb-i { background: rgba(56,130,255,0.12); color: #6fa8ff; border: 1px solid rgba(56,130,255,0.22); }
.rb-c { background: rgba(168,85,247,0.12); color: #c47dff; border: 1px solid rgba(168,85,247,0.22); }
.rb-f { background: rgba(34,197,140,0.12); color: #3dd9a4; border: 1px solid rgba(34,197,140,0.22); }
.agents-lbl { font-family: 'Barlow Condensed', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(240,237,232,0.28); margin-bottom: 7px; }
.agent-chips { display: flex; flex-wrap: wrap; gap: 6px; }
.achip { font-family: 'Barlow Condensed', sans-serif; font-size: 12px; font-weight: 600; letter-spacing: 0.07em; padding: 4px 10px; border-radius: 2px; border: 1px solid var(--border); color: rgba(240,237,232,0.65); background: rgba(240,237,232,0.04); display: flex; align-items: center; gap: 6px; }
.adot { width: 6px; height: 6px; border-radius: 50%; }
.dot-d { background: var(--red); }
.dot-i { background: #3882ff; }
.dot-c { background: #a855f7; }
.dot-s { background: #ff9f43; }

/* AGENTS SECTION */
#agents { background: var(--bg2); }
.agents-header-row { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 2.5rem; flex-wrap: wrap; gap: 1rem; }
.agents-header-right { display: flex; align-items: center; gap: 10px; }
.legend-item { display: flex; align-items: center; gap: 5px; font-family: 'Barlow Condensed', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); }
.legend-dot { width: 8px; height: 8px; border-radius: 50%; }
.legend-sep { width: 1px; height: 14px; background: var(--border); }

.agents-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 1.5px; background: var(--border); border: 1px solid var(--border); }
.acard {
  background: var(--bg); position: relative; overflow: hidden;
  display: flex; flex-direction: column; align-items: center;
  padding: 0 0 1.25rem; transition: background 0.25s; cursor: default;
}
.acard:hover { background: var(--bg3); }
.acard-portrait {
  width: 100%; aspect-ratio: 3/4; object-fit: cover; object-position: top center;
  display: block; filter: grayscale(15%) contrast(1.05);
  transition: filter 0.3s, transform 0.4s;
}
.acard:hover .acard-portrait { filter: grayscale(0%) contrast(1.1); transform: scale(1.03); }
.acard-portrait-placeholder {
  width: 100%; aspect-ratio: 3/4; background: var(--bg2);
  display: flex; align-items: center; justify-content: center;
  font-family: 'Bebas Neue', sans-serif; font-size: 28px; color: rgba(255,42,60,0.3);
}
.acard-overlay {
  position: absolute; bottom: 0; left: 0; right: 0; height: 55%;
  background: linear-gradient(to top, rgba(9,8,13,0.98) 0%, rgba(9,8,13,0.7) 50%, transparent 100%);
  pointer-events: none;
}
.acard-body { position: relative; z-index: 2; text-align: center; margin-top: -2.2rem; padding: 0 0.75rem; }
.acard-role-icon { width: 20px; height: 20px; object-fit: contain; margin: 0 auto 4px; display: block; opacity: 0.75; }
.acard-role-icon-placeholder { width: 20px; height: 20px; margin: 0 auto 4px; }
.acard-name { font-family: 'Bebas Neue', sans-serif; font-size: 17px; letter-spacing: 0.07em; line-height: 1; color: var(--white); margin-bottom: 3px; }
.acard-type { font-family: 'Barlow Condensed', sans-serif; font-size: 9px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 6px; }
.acard-type-d { color: #ff6b78; }
.acard-type-i { color: #6fa8ff; }
.acard-type-c { color: #c47dff; }
.acard-type-s { color: #ffa84d; }
.acard-players { font-family: 'Barlow Condensed', sans-serif; font-size: 11px; font-weight: 600; color: rgba(240,237,232,0.45); letter-spacing: 0.05em; line-height: 1.4; }
.acard-bar { position: absolute; top: 0; left: 0; right: 0; height: 2px; transform: scaleX(0); transform-origin: left; transition: transform 0.35s; }
.acard:hover .acard-bar { transform: scaleX(1); }
.bar-d { background: linear-gradient(90deg, var(--red), transparent); }
.bar-i { background: linear-gradient(90deg, #3882ff, transparent); }
.bar-c { background: linear-gradient(90deg, #a855f7, transparent); }
.bar-s { background: linear-gradient(90deg, #ff9f43, transparent); }

/* ABOUT */
#about { background: var(--bg); }
.about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: start; }
.about-text p { color: var(--muted); margin-bottom: 1.25rem; line-height: 1.8; font-size: 15px; }
.about-text p strong { color: var(--white); font-weight: 500; }
.about-list { display: flex; flex-direction: column; gap: 1.5px; background: var(--border); border: 1px solid var(--border); }
.ali { background: var(--bg2); padding: 1.25rem 1.5rem; display: flex; gap: 1rem; align-items: flex-start; transition: background 0.2s; }
.ali:hover { background: var(--bg3); }
.ali-n { font-family: 'Bebas Neue', sans-serif; font-size: 26px; color: var(--red); line-height: 1; flex-shrink: 0; width: 2ch; }
.ali-h { font-family: 'Barlow Condensed', sans-serif; font-size: 13px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--white); margin-bottom: 2px; }
.ali-b { font-size: 13px; color: var(--muted); line-height: 1.5; }

/* CONTACT */
#contact { background: var(--bg2); text-align: center; padding: 7rem 3rem; position: relative; overflow: hidden; }
#contact::before { content: 'TOXIC TEMPO'; position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); font-family: 'Bebas Neue', sans-serif; font-size: clamp(50px, 14vw, 190px); letter-spacing: 0.05em; color: rgba(255,42,60,0.03); white-space: nowrap; pointer-events: none; user-select: none; }
.ctitle { font-family: 'Bebas Neue', sans-serif; font-size: clamp(38px, 6vw, 76px); letter-spacing: 0.04em; line-height: 1; margin-bottom: 0.9rem; position: relative; }
.ctitle span { color: var(--red); }
.csub { color: var(--muted); font-size: 15px; max-width: 420px; margin: 0 auto 2.5rem; line-height: 1.75; position: relative; }
.cbtns { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; position: relative; }
.btn-p { font-family: 'Barlow Condensed', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; background: var(--red); color: #fff; border: none; padding: 13px 30px; cursor: pointer; text-decoration: none; transition: background 0.2s, transform 0.15s; }
.btn-p:hover { background: #e01f30; transform: translateY(-1px); }
.btn-s { font-family: 'Barlow Condensed', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; background: transparent; color: var(--white); border: 1px solid rgba(240,237,232,0.18); padding: 13px 30px; cursor: pointer; text-decoration: none; transition: border-color 0.2s; }
.btn-s:hover { border-color: var(--white); }

/* FOOTER */
footer { background: var(--bg); border-top: 1px solid var(--border); padding: 1.5rem 3rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; }
.footer-left { display: flex; align-items: center; gap: 10px; }
.footer-vlogo { height: 16px; filter: brightness(0) invert(1); opacity: 0.3; }
.footer-name { font-family: 'Bebas Neue', sans-serif; font-size: 16px; letter-spacing: 0.1em; }
.footer-name span { color: var(--red); }
.footer-copy { font-family: 'Barlow Condensed', sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); }

/* ANIMATIONS */
@keyframes fadeUp { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: translateY(0); } }
.reveal { opacity: 0; transform: translateY(18px); transition: opacity 0.65s, transform 0.65s; }
.reveal.visible { opacity: 1; transform: none; }

/* RESPONSIVE */
@media (max-width: 768px) {
  nav { padding: 0 1.25rem; }
  .nav-links { display: none; }
  section { padding: 4rem 1.25rem; }
  .hero { padding: 95px 1.25rem 3rem; }
  .about-grid { grid-template-columns: 1fr; gap: 2.5rem; }
  footer { padding: 1.25rem; }
  .strip { padding: 1.5rem 1.25rem; }
}
</style>
</head>
<body>

<!-- NAV -->
<nav>
  <a href="#" class="nav-brand">
    <img class="nav-vlogo" id="navVLogo" src="" alt="Valorant">
    <div class="nav-sep"></div>
    <span class="nav-name">TOXIC <span>TEMPO</span></span>
  </a>
  <div class="nav-links">
    <a href="#players">Roster</a>
    <a href="#agents">Agents</a>
    <a href="#about">About</a>
    <a href="#contact">Contact</a>
  </div>
  <a href="#contact" class="nav-cta">Apply Now</a>
</nav>

<!-- HERO -->
<section class="hero" id="home">
  <div class="hero-grid"></div>
  <div class="hero-glow"></div>
  <div class="hero-glow2"></div>
  <div class="hero-eyebrow">Valorant · Competitive Roster · Seeking Organization</div>
  <div class="hero-vbrand">
    <img id="heroVLogo" src="" alt="Valorant">
    <span class="hero-vbrand-sep">/</span>
    <span class="hero-vbrand-txt">Competitive Team</span>
  </div>
  <h1 class="hero-title">
    TOXIC<br>
    <span class="outline">TEMPO</span>
  </h1>
  <p class="hero-desc">Five players. One system. We don't just play — we dictate the pace. Two Radiant-peak players, deep role coverage, and a relentless team identity built to compete at the top.</p>
  <div class="hero-stats">
    <div><div class="hstat-n">2<span class="r">×</span></div><div class="hstat-l">Radiant Peaks</div></div>
    <div><div class="hstat-n">5</div><div class="hstat-l">Immortal+ Players</div></div>
    <div><div class="hstat-n">11<span class="r">+</span></div><div class="hstat-l">Agents Covered</div></div>
  </div>
  <div class="hero-scroll">Scroll</div>
</section>

<!-- STRIP -->
<div class="strip">
  <div class="strip-item"><div class="strip-val">IMM<span class="r">+</span></div><div class="strip-lbl">All Members</div></div>
  <div class="strip-item"><div class="strip-val"><span class="r">2</span></div><div class="strip-lbl">Radiant Peaks</div></div>
  <div class="strip-item"><div class="strip-val">5</div><div class="strip-lbl">Roster Size</div></div>
  <div class="strip-item"><div class="strip-val"><span class="r">4</span></div><div class="strip-lbl">Roles Covered</div></div>
  <div class="strip-item"><div class="strip-val">11<span class="r">+</span></div><div class="strip-lbl">Agent Pool</div></div>
</div>

<!-- PLAYERS -->
<section id="players">
  <div class="s-eye">The Roster</div>
  <h2 class="s-title">MEET THE TEAM</h2>
  <div class="pgrid">

    <div class="pcard reveal">
      <div class="pcard-bg">01</div>
      <div class="pcard-top">
        <div class="av av-r">SH</div>
        <div><div class="pname">SHION</div><div class="prole">Sentinel · Initiator · Duelist</div></div>
      </div>
      <div class="pranks">
        <span class="rtag rt-curr">Current: Immortal 1</span>
        <span class="rtag rt-rad">⭐ Peak: Radiant</span>
      </div>
      <div class="rbadges"><span class="rb rb-s">Sentinel</span><span class="rb rb-i">Initiator</span><span class="rb rb-d">Duelist</span></div>
      <div class="agents-lbl">Agent Pool</div>
      <div class="agent-chips">
        <div class="achip"><span class="adot dot-s"></span>Chamber</div>
        <div class="achip"><span class="adot dot-d"></span>Neon</div>
        <div class="achip"><span class="adot dot-s"></span>Killjoy</div>
      </div>
    </div>

    <div class="pcard reveal">
      <div class="pcard-bg">02</div>
      <div class="pcard-top">
        <div class="av av-b">JP</div>
        <div><div class="pname">JAPUUU</div><div class="prole">Duelist</div></div>
      </div>
      <div class="pranks">
        <span class="rtag rt-curr">Current: Immortal 1</span>
        <span class="rtag rt-i2">Peak: Immortal 2</span>
      </div>
      <div class="rbadges"><span class="rb rb-d">Duelist</span></div>
      <div class="agents-lbl">Agent Pool</div>
      <div class="agent-chips">
        <div class="achip"><span class="adot dot-d"></span>Neon</div>
        <div class="achip"><span class="adot dot-d"></span>Jett</div>
        <div class="achip"><span class="adot dot-d"></span>Raze</div>
      </div>
    </div>

    <div class="pcard reveal">
      <div class="pcard-bg">03</div>
      <div class="pcard-top">
        <div class="av av-g">JZ</div>
        <div><div class="pname">JAZ</div><div class="prole">Flex</div></div>
      </div>
      <div class="pranks">
        <span class="rtag rt-curr">Current: Ascendant 3</span>
        <span class="rtag rt-i3">Peak: Immortal 3</span>
      </div>
      <div class="rbadges"><span class="rb rb-f">Flex</span><span class="rb rb-d">Duelist</span></div>
      <div class="agents-lbl">Agent Pool</div>
      <div class="agent-chips">
        <div class="achip"><span class="adot dot-d"></span>Neon</div>
        <div class="achip"><span class="adot dot-d"></span>Phoenix</div>
        <div class="achip"><span class="adot dot-d"></span>Raze</div>
      </div>
    </div>

    <div class="pcard reveal">
      <div class="pcard-bg">04</div>
      <div class="pcard-top">
        <div class="av av-p">DM</div>
        <div><div class="pname">DEME1GODQQQ</div><div class="prole">Initiator · Controller</div></div>
      </div>
      <div class="pranks">
        <span class="rtag rt-curr">Current: Immortal 1</span>
        <span class="rtag rt-i3">Peak: Immortal 3</span>
      </div>
      <div class="rbadges"><span class="rb rb-i">Initiator</span><span class="rb rb-c">Controller</span></div>
      <div class="agents-lbl">Agent Pool</div>
      <div class="agent-chips">
        <div class="achip"><span class="adot dot-i"></span>Sova</div>
        <div class="achip"><span class="adot dot-i"></span>Fade</div>
        <div class="achip"><span class="adot dot-i"></span>Skye</div>
      </div>
    </div>

    <div class="pcard reveal">
      <div class="pcard-bg">05</div>
      <div class="pcard-top">
        <div class="av av-y">AR</div>
        <div><div class="pname">ARTT</div><div class="prole">Initiator · Controller</div></div>
      </div>
      <div class="pranks">
        <span class="rtag rt-curr">Current: Immortal 1</span>
        <span class="rtag rt-rad">⭐ Peak: Radiant</span>
      </div>
      <div class="rbadges"><span class="rb rb-i">Initiator</span><span class="rb rb-c">Controller</span></div>
      <div class="agents-lbl">Agent Pool</div>
      <div class="agent-chips">
        <div class="achip"><span class="adot dot-c"></span>Astra</div>
        <div class="achip"><span class="adot dot-c"></span>Omen</div>
        <div class="achip"><span class="adot dot-i"></span>Sova</div>
      </div>
    </div>

  </div>
</section>

<!-- AGENTS -->
<section id="agents">
  <div class="agents-header-row">
    <div>
      <div class="s-eye">Full Agent Pool</div>
      <h2 class="s-title" style="margin-bottom:0">AGENT ARSENAL</h2>
    </div>
    <div class="agents-header-right">
      <div class="legend-item"><span class="legend-dot" style="background:#ff6b78"></span>Duelist</div>
      <div class="legend-sep"></div>
      <div class="legend-item"><span class="legend-dot" style="background:#6fa8ff"></span>Initiator</div>
      <div class="legend-sep"></div>
      <div class="legend-item"><span class="legend-dot" style="background:#c47dff"></span>Controller</div>
      <div class="legend-sep"></div>
      <div class="legend-item"><span class="legend-dot" style="background:#ffa84d"></span>Sentinel</div>
    </div>
  </div>

  <div class="agents-grid reveal" id="agentsGrid">
    <!-- Populated by JS -->
    <div style="grid-column:1/-1;padding:3rem;text-align:center;font-family:'Barlow Condensed',sans-serif;font-size:13px;letter-spacing:0.1em;text-transform:uppercase;color:var(--muted)">Loading agent profiles...</div>
  </div>
</section>

<!-- ABOUT -->
<section id="about">
  <div class="s-eye">Who We Are</div>
  <h2 class="s-title">BUILT DIFFERENT</h2>
  <div class="about-grid">
    <div class="about-text reveal">
      <p>Toxic Tempo is a <strong>five-player competitive Valorant squad</strong> formed around a shared vision: structured, high-tempo play that keeps opponents permanently off-balance.</p>
      <p>Our roster boasts <strong>two Radiant-peak players</strong> — Shion and Artt — alongside a deep controller bench, explosive dueling firepower from Japuuu and Jaz, and the raw versatility of a true flex player.</p>
      <p>Every role is covered. Every map has a comp. We're not looking for an org to carry us — we're looking for a <strong>partner to grow with</strong>. The ceiling here is high, and we're already close.</p>
    </div>
    <div class="about-list reveal">
      <div class="ali"><div class="ali-n">01</div><div><div class="ali-h">High-Rank Foundation</div><div class="ali-b">All five members sit at Immortal 1 or higher, with peaks reaching Radiant.</div></div></div>
      <div class="ali"><div class="ali-n">02</div><div><div class="ali-h">Role Depth</div><div class="ali-b">Full coverage across Duelist, Initiator, Controller, Sentinel, and Flex. No weak spots.</div></div></div>
      <div class="ali"><div class="ali-n">03</div><div><div class="ali-h">Agent Versatility</div><div class="ali-b">11+ agents allow flexible meta-adaptive comps on any map, any patch.</div></div></div>
      <div class="ali"><div class="ali-n">04</div><div><div class="ali-h">Team Identity</div><div class="ali-b">We play fast, coordinated, and aggressive. Tempo is our weapon — and we don't give it back.</div></div></div>
    </div>
  </div>
</section>

<!-- CONTACT -->
<section id="contact">
  <h2 class="ctitle">SIGN US.<br><span>WE'RE READY.</span></h2>
  <p class="csub">If you're an org looking for a committed, high-rank team with real upside — we want to hear from you.</p>
  <div class="cbtns">
    <a href="mailto:toxictempovalorant@gmail.com" class="btn-p">Contact the Team</a>
    <a href="#players" class="btn-s">View Full Roster</a>
  </div>
</section>

<!-- FOOTER -->
<footer>
  <div class="footer-left">
    <img class="footer-vlogo" id="footerVLogo" src="" alt="Valorant">
    <span class="footer-name">TOXIC <span>TEMPO</span></span>
  </div>
  <div class="footer-copy">Valorant · Competitive Roster · 2025</div>
</footer>

<script>
// ── Reveal on scroll ──
const obs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) setTimeout(() => e.target.classList.add('visible'), i * 80);
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

// ── Agent data with UUIDs from valorant-api.com ──
const TEAM_AGENTS = [
  { name: 'Chamber',  role: 'Sentinel',   type: 's', players: 'SHION',               uuid: '22697a3d-45bf-be52-a022-899659571c73' },
  { name: 'Neon',     role: 'Duelist',    type: 'd', players: 'SHION · JAPUUU · JAZ', uuid: 'bb2a4828-46eb-8cd1-e765-15848195d751' },
  { name: 'Killjoy',  role: 'Sentinel',   type: 's', players: 'SHION',               uuid: '1dbf2edd-4729-0984-3115-daa5eed44993' },
  { name: 'Jett',     role: 'Duelist',    type: 'd', players: 'JAPUUU',              uuid: 'add6443a-41bd-e414-f6ad-e58d267f4e95' },
  { name: 'Raze',     role: 'Duelist',    type: 'd', players: 'JAPUUU · JAZ',        uuid: 'f94c3b30-42be-e959-889c-5aa313dba261' },
  { name: 'Phoenix',  role: 'Duelist',    type: 'd', players: 'JAZ',                 uuid: 'eb93336a-449b-9c1e-0ac7-dfe9992400c2' },
  { name: 'Sova',     role: 'Initiator',  type: 'i', players: 'DEME1GODQQQ · ARTT', uuid: '320b2a48-4d9b-a075-30f1-1f93a9b638fa' },
  { name: 'Fade',     role: 'Initiator',  type: 'i', players: 'DEME1GODQQQ',        uuid: 'dade69b4-4f5a-8528-247b-219e5a1facd6' },
  { name: 'Skye',     role: 'Initiator',  type: 'i', players: 'DEME1GODQQQ',        uuid: '6f2a04ca-43e0-be17-7f36-b3908627744d' },
  { name: 'Astra',    role: 'Controller', type: 'c', players: 'ARTT',               uuid: '41fb69c1-4189-7b37-f117-bcaf1e96f1bf' },
  { name: 'Omen',     role: 'Controller', type: 'c', players: 'ARTT',               uuid: '8e253930-4c05-31dd-1b6c-968525494517' },
];

const typeColor = { d: '#ff6b78', i: '#6fa8ff', c: '#c47dff', s: '#ffa84d' };
const typeBar   = { d: 'bar-d',   i: 'bar-i',   c: 'bar-c',   s: 'bar-s'  };
const typeClass = { d: 'acard-type-d', i: 'acard-type-i', c: 'acard-type-c', s: 'acard-type-s' };

async function loadAgents() {
  const grid = document.getElementById('agentsGrid');
  try {
    const res = await fetch('https://valorant-api.com/v1/agents?isPlayableCharacter=true');
    const data = await res.json();
    const apiAgents = data.data;

    // Build lookup by UUID
    const byUUID = {};
    apiAgents.forEach(a => { byUUID[a.uuid] = a; });

    // Set Valorant logo (from the first agent's role icon parent)
    // Use a well-known Valorant wordmark SVG from the CDN
    const vLogoUrl = 'https://valorant-api.com/v1/version'; // just checking connectivity

    grid.innerHTML = '';

    TEAM_AGENTS.forEach(agent => {
      const api = byUUID[agent.uuid];
      const portrait  = api ? api.fullPortrait  || api.displayIcon : null;
      const roleIcon  = api ? (api.role ? api.role.displayIcon : null) : null;

      const card = document.createElement('div');
      card.className = 'acard';
      card.innerHTML = `
        <div class="acard-bar ${typeBar[agent.type]}"></div>
        ${portrait
          ? `<img class="acard-portrait" src="${portrait}" alt="${agent.name}" loading="lazy">`
          : `<div class="acard-portrait-placeholder">${agent.name[0]}</div>`}
        <div class="acard-overlay"></div>
        <div class="acard-body">
          ${roleIcon
            ? `<img class="acard-role-icon" src="${roleIcon}" alt="${agent.role}">`
            : `<div class="acard-role-icon-placeholder"></div>`}
          <div class="acard-name">${agent.name}</div>
          <div class="acard-type ${typeClass[agent.type]}">${agent.role}</div>
          <div class="acard-players">${agent.players}</div>
        </div>`;
      grid.appendChild(card);
    });

    // Re-observe new cards
    grid.querySelectorAll('.acard').forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(14px)';
      el.style.transition = `opacity 0.5s ${i * 0.05}s, transform 0.5s ${i * 0.05}s`;
      setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'none'; }, 100 + i * 50);
    });

  } catch(err) {
    // Fallback: render without portraits
    grid.innerHTML = '';
    TEAM_AGENTS.forEach(agent => {
      const card = document.createElement('div');
      card.className = 'acard';
      card.innerHTML = `
        <div class="acard-bar ${typeBar[agent.type]}"></div>
        <div class="acard-portrait-placeholder">${agent.name[0]}</div>
        <div class="acard-overlay"></div>
        <div class="acard-body">
          <div class="acard-role-icon-placeholder"></div>
          <div class="acard-name">${agent.name}</div>
          <div class="acard-type ${typeClass[agent.type]}">${agent.role}</div>
          <div class="acard-players">${agent.players}</div>
        </div>`;
      grid.appendChild(card);
    });
  }

  // Load Valorant logos
  try {
    const vRes = await fetch('https://valorant-api.com/v1/version');
    // logo not in version API — use inline SVG wordmark fallback
  } catch(e) {}

  // Use inline SVG for the Valorant wordmark (clean, no external IP issues)
  const logoSVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 40'%3E%3Ctext y='32' font-family='Arial Black,sans-serif' font-size='28' font-weight='900' fill='white' letter-spacing='4'%3EVALOR%3C/text%3E%3Ctext x='108' y='32' font-family='Arial Black,sans-serif' font-size='28' font-weight='900' fill='%23FF4655' letter-spacing='4'%3EANT%3C/text%3E%3C/svg%3E`;
  ['navVLogo','heroVLogo','footerVLogo'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.src = logoSVG;
  });
}

loadAgents();
</script>
</body>
</html>