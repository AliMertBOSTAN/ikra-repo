const { useState, useEffect, useRef } = React;

// ---------- Data ----------
const profile = {
  name: "İkra Uğurlu",
  role: "Electrical & Electronic Engineer",
  location: "Ankara, Türkiye",
  email: "ikraugurluuu@gmail.com",
  linkedin: "linkedin.com/in/ikra-ugurlu",
  github: "github.com/ikraugurlu",
  birth: "12.06.2002",
};

const aboutTextTr =
  "Üçüncü sınıf Elektrik–Elektronik Mühendisliği öğrencisiyim. Gömülü sistemler ve yazılım geliştirmeye duyduğum tutku ile C programlama, STM32 mikrodenetleyici entegrasyonu ve gömülü uygulama geliştirme alanlarında ilerliyorum. Akademik titizliğim ve sahada edindiğim deneyim, karmaşık mühendislik problemlerine sakin ve özenli çözümler üretmeme imkân veriyor.";

const aboutTextEn =
  "A motivated third-year Electrical & Electronics Engineering student passionate about embedded systems and software development. I bring hands-on experience in C programming, STM32 microcontroller integration, and embedded application development — paired with academic rigor and a careful, considered approach to engineering problems.";

const experience = [
  {
    period: "Jul — Aug 2025",
    role: "Engineering Intern",
    company: "OYAK Çimento",
    location: "Ankara, Türkiye",
    bullets: [
      "Worked on-site within an industrial production environment, observing electrical systems and automation processes in a cement plant.",
      "Followed maintenance routines for motors, drives, and control panels — learning how reliability is engineered into heavy industry.",
      "Documented field findings and connected classroom theory to real plant operations under engineer mentorship.",
    ],
  },
  {
    period: "Jul — Aug 2024",
    role: "Engineering Intern",
    company: "IVEO Defence Industries Inc.",
    location: "Ankara, Türkiye",
    bullets: [
      "Worked extensively in C, deepening fluency in algorithms and software logic for resource-constrained targets.",
      "Developed and optimized firmware on STM32 microcontrollers for embedded application scenarios.",
      "Strengthened low-level programming and hardware–software integration through close mentorship and code review.",
    ],
  },
];

const education = [
  {
    period: "2022 — Present",
    degree: "B.Sc. Electrical & Electronic Engineering",
    school: "Kırıkkale University",
    detail: "Faculty of Engineering and Architecture",
  },
];

const skills = [
  { name: "C / C++", level: 88 },
  { name: "Python", level: 80 },
  { name: "MATLAB", level: 75 },
  { name: "STM32 / Embedded", level: 78 },
  { name: "AutoCAD", level: 70 },
  { name: "TinkerCAD", level: 72 },
  { name: "Proteus", level: 74 },
  { name: "VS Code", level: 90 },
  { name: "Office Suite", level: 85 },
];

const languages = [
  { name: "Türkçe", level: "Native" },
  { name: "English", level: "B2 — Upper Intermediate" },
];

const navLinks = [
  { id: "home", label: "01 — Home" },
  { id: "about", label: "02 — Profile" },
  { id: "experience", label: "03 — Experience" },
  { id: "education", label: "04 — Education" },
  { id: "skills", label: "05 — Skills" },
  { id: "contact", label: "06 — Contact" },
];

// ---------- Hooks ----------
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function useActiveSection() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    navLinks.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
  return active;
}

// ---------- Nav ----------
function Nav({ active }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="nav">
      <div className="nav-inner">
        <a href="#home" className="brand">
          <span className="brand-mark">İU</span>
          <span className="brand-name">İkra Uğurlu</span>
        </a>
        <nav className={`nav-links ${open ? "open" : ""}`}>
          {navLinks.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={active === l.id ? "active" : ""}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a href="assets/Ikra-Ugurlu-CV.pdf" download className="cv-btn cv-btn--nav">
          <span>Download CV</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1v8m0 0L4 6m3 3l3-3M2 12h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
        <button className="burger" onClick={() => setOpen(!open)} aria-label="Menu">
          <span></span><span></span>
        </button>
      </div>
    </header>
  );
}

// ---------- Hero ----------
function Hero() {
  const [ref, v] = useReveal();
  return (
    <section id="home" className="hero" ref={ref} data-screen-label="01 Hero">
      <div className="hero-grid">
        <div className={`hero-meta ${v ? "in" : ""}`}>
          <div className="eyebrow">
            <span className="dot"></span>
            Portfolio · Spring 2026
          </div>
          <div className="hero-side">
            <span>Ankara, TR</span>
            <span>EE · Embedded</span>
          </div>
        </div>

        <h1 className={`hero-title hero-title--full ${v ? "in" : ""}`}>
          <span className="line">Electrical</span>
          <span className="line italic">&amp; Electronic</span>
          <span className="line">Engineer.</span>
        </h1>

        <div className={`hero-foot ${v ? "in" : ""}`}>
          <p className="hero-lede">
            A quiet, careful engineer building reliable embedded systems — from STM32 firmware to circuit-level problem solving.
          </p>
          <div className="hero-cta">
            <a href="#about" className="link-arrow">
              Read profile
              <svg width="22" height="10" viewBox="0 0 22 10" fill="none">
                <path d="M0 5h20m0 0L16 1m4 4L16 9" stroke="currentColor" strokeWidth="1"/>
              </svg>
            </a>
            <a href="assets/Ikra-Ugurlu-CV.pdf" download className="cv-btn">
              <span>Download CV (PDF)</span>
            </a>
          </div>
        </div>
      </div>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i}>
              Embedded Systems · Firmware · STM32 · C / C++ · Python · MATLAB · Circuit Design ·{" "}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Section ----------
function Section({ id, label, title, children, screenLabel }) {
  const [ref, v] = useReveal();
  return (
    <section id={id} className="section" ref={ref} data-screen-label={screenLabel}>
      <div className={`section-head ${v ? "in" : ""}`}>
        <span className="section-num">{label}</span>
        <h2 className="section-title">{title}</h2>
        <span className="section-rule"></span>
      </div>
      <div className={`section-body ${v ? "in" : ""}`}>{children}</div>
    </section>
  );
}

// ---------- About ----------
function About() {
  return (
    <Section id="about" label="02 / Profile" title="A careful hand, a curious mind." screenLabel="02 Profile">
      <div className="about-grid">
        <div className="about-col">
          <p className="lede">{aboutTextEn}</p>
          <p className="lede lede--tr">{aboutTextTr}</p>
        </div>
        <aside className="about-aside">
          <dl>
            <div><dt>Born</dt><dd>{profile.birth}</dd></div>
            <div><dt>Based in</dt><dd>{profile.location}</dd></div>
            <div><dt>Status</dt><dd>Open to internships</dd></div>
          </dl>
          <div className="quote">
            <span className="q">“</span>
            <p>Engineering, to me, is the slow art of making things work — quietly, precisely, beautifully.</p>
          </div>
        </aside>
      </div>
    </Section>
  );
}

// ---------- Experience ----------
function Experience() {
  return (
    <Section id="experience" label="03 / Experience" title="Where I've been." screenLabel="03 Experience">
      <ol className="timeline">
        {experience.map((e, i) => (
          <li key={i} className="t-item">
            <div className="t-period">{e.period}</div>
            <div className="t-body">
              <h3 className="t-role">{e.role}</h3>
              <div className="t-company">
                <span>{e.company}</span>
                <span className="t-dot">·</span>
                <span>{e.location}</span>
              </div>
              <ul className="t-bullets">
                {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
              </ul>
            </div>
          </li>
        ))}
        <li className="t-item t-item--ghost">
          <div className="t-period">Summer 2026</div>
          <div className="t-body">
            <h3 className="t-role">Looking for the next chapter</h3>
            <div className="t-company">
              <span>Open to embedded / firmware internships across Türkiye and Europe.</span>
            </div>
          </div>
        </li>
      </ol>
    </Section>
  );
}

// ---------- Education ----------
function Education() {
  return (
    <Section id="education" label="04 / Education" title="What I'm studying." screenLabel="04 Education">
      <div className="edu-grid">
        {education.map((e, i) => (
          <article key={i} className="edu-card">
            <div className="edu-period">{e.period}</div>
            <h3>{e.degree}</h3>
            <p className="edu-school">{e.school}</p>
            <p className="edu-detail">{e.detail}</p>
            <ul className="edu-meta">
              <li><span>Focus</span><span>Embedded · Microcontrollers</span></li>
              <li><span>Languages</span><span>Türkçe · English (B2)</span></li>
              <li><span>Year</span><span>3rd of 4</span></li>
            </ul>
          </article>
        ))}
        <article className="edu-card edu-card--soft">
          <div className="edu-period">Continuous Study</div>
          <h3>Self-directed work, off the syllabus.</h3>
          <p className="edu-detail">
            STM32 HAL · RTOS fundamentals · DSP basics · low-level C optimization · PCB layout in Proteus.
          </p>
          <ul className="edu-meta">
            <li><span>Format</span><span>Books · datasheets · projects</span></li>
            <li><span>Pace</span><span>Daily, in small steady steps</span></li>
          </ul>
        </article>
      </div>
    </Section>
  );
}

// ---------- Skills ----------
function Skills() {
  const [bodyRef, bodyVisible] = useReveal();
  return (
    <Section id="skills" label="05 / Skills" title="Tools of the trade." screenLabel="05 Skills">
      <div className="skills-wrap" ref={bodyRef}>
        <ul className="skills-list">
          {skills.map((s, i) => (
            <li key={s.name} className="skill-row">
              <span className="skill-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="skill-name">{s.name}</span>
              <span className="skill-pct">{s.level}%</span>
              <div className="skill-bar">
                <div
                  className="skill-bar-fill"
                  style={{ width: bodyVisible ? `${s.level}%` : "0%", transitionDelay: `${i * 80}ms` }}
                ></div>
              </div>
            </li>
          ))}
        </ul>

        <div className="skills-side">
          <div className="lang-block">
            <h4>Languages</h4>
            <ul className="lang-list">
              {languages.map((l) => (
                <li key={l.name}>
                  <span>{l.name}</span>
                  <span>{l.level}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </Section>
  );
}

// ---------- Contact ----------
function Contact() {
  return (
    <section id="contact" className="contact" data-screen-label="06 Contact">
      <div className="contact-inner">
        <div className="contact-grid">
          <h2 className="contact-title">
            Let's <span className="em">make</span><br/>something<br/>thoughtful.
          </h2>
          <div className="contact-meta">
            <a href={`mailto:${profile.email}`}>
              <span className="lbl">Email</span>
              <span className="val">{profile.email}</span>
            </a>
            <a href={`https://${profile.linkedin}`} target="_blank" rel="noopener">
              <span className="lbl">LinkedIn</span>
              <span className="val">/ikra-ugurlu</span>
            </a>
            <a href={`https://${profile.github}`} target="_blank" rel="noopener">
              <span className="lbl">GitHub</span>
              <span className="val">@ikraugurlu</span>
            </a>
            <span>
              <span className="lbl">Location</span>
              <span className="val">{profile.location}</span>
            </span>
          </div>
        </div>
        <div className="contact-cta">
          <a href="assets/Ikra-Ugurlu-CV.pdf" download className="cv-btn">
            <span>Download Full CV (PDF)</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1v8m0 0L4 6m3 3l3-3M2 12h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href={`mailto:${profile.email}`} className="link-arrow">
            Or write me directly
            <svg width="22" height="10" viewBox="0 0 22 10" fill="none">
              <path d="M0 5h20m0 0L16 1m4 4L16 9" stroke="currentColor" strokeWidth="1"/>
            </svg>
          </a>
        </div>
      </div>
      <div className="foot">
        <span>© 2026 — İkra Uğurlu</span>
        <span>Designed with care · Ankara</span>
      </div>
    </section>
  );
}

// ---------- Cat Paw Cursor ----------
const PAW_SVG = `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <g fill="#d9a8a0" stroke="#b87a72" stroke-width="1.2">
    <ellipse cx="32" cy="42" rx="14" ry="11"/>
    <ellipse cx="14" cy="28" rx="6" ry="7.5"/>
    <ellipse cx="26" cy="18" rx="5.5" ry="7"/>
    <ellipse cx="40" cy="18" rx="5.5" ry="7"/>
    <ellipse cx="52" cy="28" rx="6" ry="7.5"/>
  </g>
  <g fill="#efd4cc" opacity="0.85">
    <ellipse cx="28" cy="40" rx="3" ry="2.2"/>
    <ellipse cx="36" cy="40" rx="3" ry="2.2"/>
    <ellipse cx="32" cy="44.5" rx="3.5" ry="2.5"/>
  </g>
</svg>`;

function PawCursor() {
  const cursorRef = useRef(null);
  const lastPrint = useRef(0);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    let rafId = null;
    let tx = window.innerWidth / 2, ty = window.innerHeight / 2;
    let cx = tx, cy = ty;

    const onMove = (e) => {
      tx = e.clientX; ty = e.clientY;

      // hover detection
      const el = e.target.closest("a, button, .skill-row, .t-item");
      setHovering(!!el);

      // paw prints trail
      const now = performance.now();
      if (now - lastPrint.current > 110) {
        lastPrint.current = now;
        const print = document.createElement("div");
        print.className = "paw-print";
        print.style.left = e.clientX + "px";
        print.style.top = e.clientY + "px";
        print.style.setProperty("--r", `${(Math.random() * 50 - 25).toFixed(0)}deg`);
        print.innerHTML = PAW_SVG;
        document.body.appendChild(print);
        setTimeout(() => print.remove(), 1300);
      }
    };
    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    const tick = () => {
      cx += (tx - cx) * 0.22;
      cy += (ty - cy) * 0.22;
      if (cursorRef.current) {
        cursorRef.current.style.left = cx + "px";
        cursorRef.current.style.top = cy + "px";
      }
      rafId = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const cls = `paw-cursor ${hovering ? "hover" : ""} ${clicking ? "click" : ""}`;
  return <div ref={cursorRef} className={cls} dangerouslySetInnerHTML={{ __html: PAW_SVG }} />;
}

// ---------- Scroll progress ribbon ----------
function ScrollRibbon() {
  const ref = useRef(null);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const p = h.scrollTop / (h.scrollHeight - h.clientHeight);
      if (ref.current) ref.current.style.transform = `scaleX(${p})`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div className="scroll-ribbon"><div ref={ref} className="scroll-ribbon-fill"></div></div>;
}

// ---------- Soft parallax wrapper ----------
function useParallax(strength = 0.05) {
  const ref = useRef(null);
  useEffect(() => {
    let rafId = null;
    const update = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      ref.current.style.transform = `translateY(${center * -strength}px)`;
    };
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => { update(); rafId = null; });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, [strength]);
  return ref;
}

// ---------- App ----------
function App() {
  const active = useActiveSection();
  return (
    <>
      <PawCursor />
      <ScrollRibbon />
      <Nav active={active} />
      <main>
        <Hero />
        <About />
        <Experience />
        <Education />
        <Skills />
        <Contact />
      </main>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
