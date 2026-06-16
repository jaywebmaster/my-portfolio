import React, { useEffect, useRef } from 'react';

const YRNR: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Smooth scroll
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  // Mobile menu
  const toggleMenu = () => {
    const ham = document.getElementById('ham');
    const menu = document.getElementById('mobMenu');

    ham?.classList.toggle('open');
    menu?.classList.toggle('open');
  };

  const closeMenu = () => {
    document.getElementById('ham')?.classList.remove('open');
    document.getElementById('mobMenu')?.classList.remove('open');
  };

  useEffect(() => {
    // NAV SCROLL
    const nav = document.getElementById('nav');

    const onScroll = () => {
      nav?.classList.toggle('stuck', window.scrollY > 20);

      const links = document.querySelectorAll('.nav-link');
      const ids = ['about', 'games', 'members', 'events', 'join'];

      let active = '';

      ids.forEach((id) => {
        const el = document.getElementById(id);

        if (el && el.getBoundingClientRect().top <= 140) {
          active = id;
        }
      });

      links.forEach((link) => {
        link.classList.toggle(
          'on',
          link.textContent
            ?.toLowerCase()
            .trim()
            .replace(' ', '') === active
        );
      });
    };

    window.addEventListener('scroll', onScroll, {
      passive: true,
    });

    // REVEAL ANIMATION
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.07,
      }
    );

    document
      .querySelectorAll('.reveal, .reveal-left, .reveal-right')
      .forEach((el) => observer.observe(el));

    // CANVAS BG
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    let t = 0;
    let raf: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();

    window.addEventListener('resize', resize);

    const drawGrid = () => {
      t += 0.003;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cols = Math.ceil(canvas.width / 70) + 1;
      const rows = Math.ceil(canvas.height / 70) + 1;

      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          const wave =
            Math.sin(x * 0.5 + t) *
              Math.cos(y * 0.4 + t) *
              0.5 +
            0.5;

          ctx.beginPath();

          ctx.arc(x * 70, y * 70, 1, 0, Math.PI * 2);

          ctx.fillStyle = `rgba(255,77,143,${
            wave * 0.1
          })`;

          ctx.fill();
        }
      }

      raf = requestAnimationFrame(drawGrid);
    };

    drawGrid();

    // MEMBER STAGGER
    document
      .querySelectorAll('.member-card')
      .forEach((card, i) => {
        (card as HTMLElement).style.transitionDelay = `${i * 0.06}s`;
      });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', resize);

      observer.disconnect();

      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* BG */}
      <div className="hero-bg">
        <canvas ref={canvasRef} id="bgCanvas"></canvas>

        <div className="hero-blob1"></div>
        <div className="hero-blob2"></div>
      </div>

      {/* NAV */}
      <nav id="nav">
        <div className="nav-inner">
          <div className="nav-logo">YRNR</div>

          <div className="nav-links">
            <button
              className="nav-link"
              onClick={() => scrollToSection('about')}
            >
              About
            </button>

            <button
              className="nav-link"
              onClick={() => scrollToSection('games')}
            >
              Games
            </button>

            <button
              className="nav-link"
              onClick={() => scrollToSection('members')}
            >
              Members
            </button>

            <button
              className="nav-link"
              onClick={() => scrollToSection('events')}
            >
              Events
            </button>
          </div>

          <button
            className="nav-join"
            onClick={() => scrollToSection('join')}
          >
            Join Us
          </button>

          <button
            className="ham"
            id="ham"
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div className="mob-menu" id="mobMenu">
        <button
          onClick={() => {
            scrollToSection('about');
            closeMenu();
          }}
        >
          About
        </button>

        <button
          onClick={() => {
            scrollToSection('games');
            closeMenu();
          }}
        >
          Games
        </button>

        <button
          onClick={() => {
            scrollToSection('members');
            closeMenu();
          }}
        >
          Members
        </button>

        <button
          onClick={() => {
            scrollToSection('events');
            closeMenu();
          }}
        >
          Events
        </button>

        <button
          onClick={() => {
            scrollToSection('join');
            closeMenu();
          }}
        >
          Join Us
        </button>
      </div>

      {/* HERO */}
      <section
        style={{
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div className="hero">
          <div className="hero-tag">
            Yearner · Est. 2024 · Gaming Community
          </div>

          <h1 className="hero-title">
            YEAR
            <span className="line2">NER</span>
          </h1>

          <p className="hero-sub">
            One community. <strong>All games.</strong>{' '}
            Whether you're dancing in iDate Revibe or
            fragging in Valorant — if you're a Yearner,
            you belong here.
          </p>

          <div className="hero-btns">
            <button
              className="btn-primary"
              onClick={() => scrollToSection('join')}
            >
              Join the Clan
            </button>

            <button
              className="btn-ghost"
              onClick={() => scrollToSection('events')}
            >
              View Events
            </button>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="section" id="about">
        <div className="sec-inner">
          <div className="about-split">
            <div className="reveal-left">
              <div className="sec-tag">
                About YRNR
              </div>

              <h2 className="sec-h2">
                We stay.
                <br />
                <span className="accent">
                  No matter
                </span>
                <br />
                what we play.
              </h2>

              <div className="divider-line"></div>

              <div className="about-text">
                <p>
                  YRNR — <strong>Yearner</strong> — is
                  a Filipino gaming community built on
                  one simple belief: the games don't
                  matter as much as the people you play
                  with.
                </p>

                <p>
                  Whether you're hitting S-rank in{' '}
                  <strong>iDate Revibe</strong> or
                  clutching rounds in{' '}
                  <strong>Valorant</strong>, you're
                  family here.
                </p>
              </div>
            </div>

            <div className="reveal-right">
              <div
                className="games-grid"
                id="games"
              >
                <div className="game-card idate">
                  <div className="game-card-icon">
                    🎵
                  </div>

                  <div className="game-card-name pink">
                    iDate Revibe
                  </div>

                  <div className="game-card-desc">
                    The online dancing and dating game
                    where music brings people together.
                  </div>
                </div>

                <div className="game-card valorant">
                  <div className="game-card-icon">
                    🔫
                  </div>

                  <div className="game-card-name red">
                    Valorant
                  </div>

                  <div className="game-card-desc">
                    Riot's tactical FPS. YRNR runs
                    scrims and ranked pushes.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MEMBERS */}
      <section
        className="section dark"
        id="members"
      >
        <div className="sec-inner">
          <div className="reveal">
            <div className="sec-tag">
              The Crew
            </div>

            <h2 className="sec-h2">
              Meet the
              <br />
              <span className="accent">
                Yearners.
              </span>
            </h2>
          </div>

          <div className="members-grid reveal">
            <div className="member-card">
              <div className="member-avatar avatar-gm">
                BZ
              </div>

              <span className="member-role-badge badge-gm">
                GM
              </span>

              <div className="member-name">
                Bombszee
              </div>
            </div>

            <div className="member-card">
              <div className="member-avatar avatar-dev">
                JY
              </div>

              <span className="member-role-badge badge-dev">
                Dev
              </span>

              <div className="member-name">
                Jay
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EVENTS */}
      <section className="section" id="events">
        <div className="sec-inner">
          <div className="reveal">
            <div className="sec-tag">
              Events & Giveaways
            </div>

            <h2 className="sec-h2">
              Always something
              <br />
              <span className="accent">
                going on.
              </span>
            </h2>
          </div>

          <div className="events-grid reveal">
            <div className="event-card">
              <div className="event-title">
                Monthly Drop
              </div>

              <div className="event-desc">
                Monthly giveaway open to all YRNR
                members.
              </div>
            </div>

            <div className="event-card">
              <div className="event-title">
                Ranked Push
              </div>

              <div className="event-desc">
                Weekly Valorant sessions and scrims.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="section dark"
        id="join"
      >
        <div className="sec-inner">
          <div className="cta-banner reveal">
            <h2>
              Ready to be a
              <br />
              <span>Yearner?</span>
            </h2>

            <p>
              Join the YRNR community and play with
              us.
            </p>

            <div className="cta-btns">
              <a
                className="btn-primary"
                href="#"
              >
                Join Discord
              </a>

              <a
                className="btn-ghost"
                href="#"
              >
                Facebook Page
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <div>
            <div className="footer-logo">
              YRNR
            </div>

            <div className="footer-tagline">
              // Yearner — Stay no matter what you
              play
            </div>
          </div>

          <div className="footer-copy">
            © 2024–2026 <span>YRNR</span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default YRNR;