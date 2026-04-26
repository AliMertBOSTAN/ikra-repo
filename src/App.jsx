import { useEffect, useMemo, useRef, useState } from 'react';
import { useT } from './i18n.jsx';
import { certifications } from './certifications.js';

function formatCertDate(iso, lang) {
  const [y, m] = iso.split('-').map(Number);
  return new Intl.DateTimeFormat(lang === 'tr' ? 'tr-TR' : 'en-US', {
    month: 'short', year: 'numeric',
  }).format(new Date(y, m - 1, 1));
}

const profile = {
  name: 'İkra Uğurlu',
  email: 'ikraugurluuu@gmail.com',
  linkedin: 'linkedin.com/in/ikra-ugurlu',
  github: 'github.com/ikraugurlu',
  birth: '12.06.2002',
  location: 'Ankara, Türkiye',
};

const skills = [
  { name: 'C / C++', level: 88 },
  { name: 'Python', level: 80 },
  { name: 'MATLAB', level: 75 },
  { name: 'STM32 / Embedded', level: 78 },
  { name: 'AutoCAD', level: 70 },
  { name: 'TinkerCAD', level: 72 },
  { name: 'Proteus', level: 74 },
  { name: 'VS Code', level: 90 },
  { name: 'Office Suite', level: 85 },
];

function useNavLinks() {
  const { t } = useT();
  return [
    { id: 'home', label: t.nav.home },
    { id: 'about', label: t.nav.profile },
    { id: 'experience', label: t.nav.experience },
    { id: 'education', label: t.nav.education },
    { id: 'skills', label: t.nav.skills },
    { id: 'contact', label: t.nav.contact },
  ];
}

function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light';
    const saved = localStorage.getItem('theme');
    return saved === 'dark' || saved === 'light' ? saved : 'light';
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);
  return [theme, () => setTheme((t) => (t === 'light' ? 'dark' : 'light'))];
}

function SunIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2.2" x2="12" y2="4.6" />
      <line x1="12" y1="19.4" x2="12" y2="21.8" />
      <line x1="2.2" y1="12" x2="4.6" y2="12" />
      <line x1="19.4" y1="12" x2="21.8" y2="12" />
      <line x1="4.95" y1="4.95" x2="6.65" y2="6.65" />
      <line x1="17.35" y1="17.35" x2="19.05" y2="19.05" />
      <line x1="19.05" y1="4.95" x2="17.35" y2="6.65" />
      <line x1="6.65" y1="17.35" x2="4.95" y2="19.05" />
      <circle cx="10.6" cy="11.5" r="0.4" fill="currentColor" stroke="none" />
      <circle cx="13.4" cy="11.5" r="0.4" fill="currentColor" stroke="none" />
      <path d="M10.6 13 q1.4 0.95 2.8 0" strokeWidth="0.75" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <path d="M15.6 3.8 a8.6 8.6 0 1 0 0 16.4 a6.5 6.5 0 1 1 0 -16.4 z" />
      <path d="M8.4 10.8 q1.1 -0.7 2.2 0" strokeWidth="0.85" />
      <path d="M8.4 13.2 q1.1 0.7 2.2 0" strokeWidth="0.7" />
      <circle cx="19.4" cy="5.8" r="0.55" fill="currentColor" stroke="none" />
      <circle cx="20.6" cy="12.6" r="0.45" fill="currentColor" stroke="none" />
      <circle cx="17.6" cy="19.6" r="0.4" fill="currentColor" stroke="none" />
      <path d="M4.6 4.2 l0.35 0.75 l0.75 0.35 l-0.75 0.35 l-0.35 0.75 l-0.35 -0.75 l-0.75 -0.35 l0.75 -0.35 z"
        fill="currentColor" stroke="none" />
    </svg>
  );
}

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

function useActiveSection(navLinks) {
  const [active, setActive] = useState('home');
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    navLinks.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [navLinks]);
  return active;
}

function LangSwitch() {
  const { lang, setLang } = useT();
  return (
    <div className="lang-switch" role="group" aria-label="Language">
      <button
        type="button"
        className={lang === 'tr' ? 'active' : ''}
        onClick={() => setLang('tr')}
      >TR</button>
      <span className="lang-sep">/</span>
      <button
        type="button"
        className={lang === 'en' ? 'active' : ''}
        onClick={() => setLang('en')}
      >EN</button>
    </div>
  );
}

function Nav({ active, navLinks, theme, onToggleTheme }) {
  const { t } = useT();
  const [open, setOpen] = useState(false);
  return (
    <header className="nav">
      <div className="nav-inner">
        <div className="brand">
          <button
            type="button"
            className="brand-mark brand-mark--toggle"
            onClick={onToggleTheme}
            aria-label={theme === 'light' ? 'Switch to night mode' : 'Switch to day mode'}
            title={theme === 'light' ? 'Night' : 'Day'}
          >
            {theme === 'light' ? <SunIcon /> : <MoonIcon />}
          </button>
          <a href="#home" className="brand-name">İkra Uğurlu</a>
        </div>
        <nav className={`nav-links ${open ? 'open' : ''}`}>
          {navLinks.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={active === l.id ? 'active' : ''}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <LangSwitch />
        <a href="assets/Ikra-Ugurlu-CV.pdf" download className="cv-btn cv-btn--nav">
          <span>{t.nav.downloadCV}</span>
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

function Hero() {
  const { t } = useT();
  const [ref, v] = useReveal();
  return (
    <section id="home" className="hero" ref={ref} data-screen-label="01 Hero">
      <div className="hero-grid">
        <div className={`hero-meta ${v ? 'in' : ''}`}>
          <div className="eyebrow">
            <span className="dot"></span>
            {t.hero.eyebrow}
          </div>
          <div className="hero-side">
            <span>{t.hero.location}</span>
            <span>{t.hero.field}</span>
          </div>
        </div>

        <h1 className={`hero-title hero-title--full ${v ? 'in' : ''}`}>
          <span className="line">{t.hero.title1}</span>
          <span className="line italic">{t.hero.title2}</span>
          <span className="line">{t.hero.title3}</span>
        </h1>

        <div className={`hero-foot ${v ? 'in' : ''}`}>
          <p className="hero-lede">{t.hero.lede}</p>
          <div className="hero-cta">
            <a href="#about" className="link-arrow">
              {t.hero.readProfile}
              <svg width="22" height="10" viewBox="0 0 22 10" fill="none">
                <path d="M0 5h20m0 0L16 1m4 4L16 9" stroke="currentColor" strokeWidth="1"/>
              </svg>
            </a>
            <a href="assets/Ikra-Ugurlu-CV.pdf" download className="cv-btn">
              <span>{t.hero.downloadCVPdf}</span>
            </a>
          </div>
        </div>
      </div>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i}>{t.hero.marquee}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Section({ id, label, title, children, screenLabel, slide }) {
  const [revealRef, v] = useReveal();
  const slideRef = useRef(null);

  const setRef = (node) => {
    revealRef.current = node;
    slideRef.current = node;
  };

  useEffect(() => {
    if (!slide || !slideRef.current) return;
    const el = slideRef.current;
    const dir = slide === 'right' ? 1 : -1;
    const MAX_VW = 28;
    const RANGE_FACTOR = 1.15;
    const SMOOTHING = 0.11;

    let rafId = null;
    let current = 0;
    let target = 0;

    const computeTarget = () => {
      const rect = el.getBoundingClientRect();
      const sectionCenter = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      const distance = sectionCenter - viewportCenter;
      const range = window.innerHeight * RANGE_FACTOR;
      const ratio = Math.max(0, Math.min(1, distance / range));
      const eased = 1 - Math.cos((ratio * Math.PI) / 2);
      target = dir * eased * MAX_VW;
    };

    const tick = () => {
      computeTarget();
      current += (target - current) * SMOOTHING;
      if (Math.abs(target - current) < 0.005) current = target;
      el.style.setProperty('--slide-x', `${current}vw`);
      rafId = requestAnimationFrame(tick);
    };

    tick();
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [slide]);

  return (
    <section
      id={id}
      ref={setRef}
      className={`section ${slide ? 'section--slide' : ''}`}
      data-screen-label={screenLabel}
    >
      <div className={`section-head ${v ? 'in' : ''}`}>
        <span className="section-num">{label}</span>
        <h2 className="section-title">{title}</h2>
        <span className="section-rule"></span>
      </div>
      <div className={`section-body ${v ? 'in' : ''}`}>{children}</div>
    </section>
  );
}

function About() {
  const { t } = useT();
  return (
    <Section id="about" label={t.about.label} title={t.about.title} screenLabel="02 Profile" slide="left">
      <div className="about-grid">
        <div className="about-col">
          <p className="lede">{t.about.text}</p>
        </div>
        <aside className="about-aside">
          <dl>
            <div><dt>{t.about.born}</dt><dd>{profile.birth}</dd></div>
            <div><dt>{t.about.basedIn}</dt><dd>{profile.location}</dd></div>
            <div><dt>{t.about.status}</dt><dd>{t.about.statusValue}</dd></div>
          </dl>
          <div className="quote">
            <span className="q">“</span>
            <p>{t.about.quote}</p>
          </div>
        </aside>
      </div>
    </Section>
  );
}

function Experience() {
  const { t } = useT();
  return (
    <Section id="experience" label={t.experience.label} title={t.experience.title} screenLabel="03 Experience" slide="right">
      <ol className="timeline">
        {t.experience.items.map((e, i) => (
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
          <div className="t-period">{t.experience.futurePeriod}</div>
          <div className="t-body">
            <h3 className="t-role">{t.experience.futureTitle}</h3>
            <div className="t-company">
              <span>{t.experience.futureDesc}</span>
            </div>
          </div>
        </li>
      </ol>
    </Section>
  );
}

const CERT_PAGE_SIZE = 3;

function Certifications() {
  const { t, lang } = useT();
  const items = useMemo(
    () => certifications.map((c) => ({ ...c, dateLabel: formatCertDate(c.date, lang) })),
    [lang]
  );
  const pages = useMemo(() => {
    const out = [];
    for (let i = 0; i < items.length; i += CERT_PAGE_SIZE) {
      out.push(items.slice(i, i + CERT_PAGE_SIZE));
    }
    return out;
  }, [items]);

  const [page, setPage] = useState(0);
  const total = pages.length;
  const go = (delta) => setPage((p) => Math.min(Math.max(p + delta, 0), total - 1));

  return (
    <div className="cert-block">
      <header className="cert-head">
        <h3 className="cert-block-title">{t.education.certsHeading}</h3>
        <span className="cert-block-count">
          <span>{String(items.length).padStart(2, '0')}</span>
          <span>{t.education.certsCount}</span>
        </span>
      </header>

      <div className="cert-viewport">
        <ol
          className="cert-track"
          style={{ transform: `translateX(-${page * 100}%)` }}
        >
          {pages.map((pageItems, pi) => (
            <li
              key={pi}
              className="cert-page"
              aria-hidden={pi !== page}
              inert={pi !== page ? '' : undefined}
            >
              <ol className="cert-list">
                {pageItems.map((c, i) => {
                  const idx = pi * CERT_PAGE_SIZE + i;
                  return (
                    <li key={c.id} className="cert-row">
                      <span className="cert-num">{String(idx + 1).padStart(2, '0')}</span>
                      <div className="cert-main">
                        <h4 className="cert-name">{c.name}</h4>
                        <div className="cert-meta">
                          <span className="cert-issuer">{c.issuer}</span>
                          <span className="cert-sep">·</span>
                          <span className="cert-date">{c.dateLabel}</span>
                        </div>
                      </div>
                      <div className="cert-cred" title={c.id}>
                        <span className="cert-cred-lbl">{t.education.certsCredential}</span>
                        <span className="cert-cred-id">{c.id}</span>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </li>
          ))}
        </ol>
      </div>

      <div className="cert-pager">
        <button
          type="button"
          className="cert-pager-btn"
          onClick={() => go(-1)}
          disabled={page === 0}
          aria-label={t.education.certsPrev}
        >
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
            <path d="M14 5H1m0 0l4 4M1 5l4-4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="cert-dots" role="tablist">
          {pages.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`cert-dot ${i === page ? 'active' : ''}`}
              onClick={() => setPage(i)}
              aria-label={`${i + 1} / ${total}`}
              aria-selected={i === page}
              role="tab"
            />
          ))}
        </div>
        <span className="cert-pageinfo">
          {String(page + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
        <button
          type="button"
          className="cert-pager-btn"
          onClick={() => go(1)}
          disabled={page === total - 1}
          aria-label={t.education.certsNext}
        >
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
            <path d="M0 5h13m0 0L9 1m4 4L9 9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function Education() {
  const { t } = useT();
  return (
    <Section id="education" label={t.education.label} title={t.education.title} screenLabel="04 Education" slide="left">
      <div className="edu-grid">
        {t.education.items.map((e, i) => (
          <article key={i} className="edu-card">
            <div className="edu-period">{e.period}</div>
            <h3>{e.degree}</h3>
            <p className="edu-school">{e.school}</p>
            <p className="edu-detail">{e.detail}</p>
            <ul className="edu-meta">
              <li><span>{t.education.metaFocus}</span><span>{t.education.metaFocusValue}</span></li>
              <li><span>{t.education.metaLanguages}</span><span>{t.education.metaLanguagesValue}</span></li>
              <li><span>{t.education.metaYear}</span><span>{t.education.metaYearValue}</span></li>
            </ul>
          </article>
        ))}
        <article className="edu-card edu-card--soft">
          <div className="edu-period">{t.education.softPeriod}</div>
          <h3>{t.education.softTitle}</h3>
          <p className="edu-detail">{t.education.softDetail}</p>
          <ul className="edu-meta">
            <li><span>{t.education.softFormat}</span><span>{t.education.softFormatValue}</span></li>
            <li><span>{t.education.softPace}</span><span>{t.education.softPaceValue}</span></li>
          </ul>
        </article>
      </div>

      <Certifications />
    </Section>
  );
}

function Skills() {
  const { t } = useT();
  const [bodyRef, bodyVisible] = useReveal();
  return (
    <Section id="skills" label={t.skills.label} title={t.skills.title} screenLabel="05 Skills">
      <div className="skills-wrap" ref={bodyRef}>
        <ul className="skills-list">
          {skills.map((s, i) => (
            <li key={s.name} className="skill-row">
              <span className="skill-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="skill-name">{s.name}</span>
              <span className="skill-pct">{s.level}%</span>
              <div className="skill-bar">
                <div
                  className="skill-bar-fill"
                  style={{ width: bodyVisible ? `${s.level}%` : '0%', transitionDelay: `${i * 80}ms` }}
                ></div>
              </div>
            </li>
          ))}
        </ul>

        <div className="skills-side">
          <div className="lang-block">
            <h4>{t.skills.languagesHeading}</h4>
            <ul className="lang-list">
              {t.skills.languages.map((l) => (
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

function Contact() {
  const { t } = useT();
  return (
    <section id="contact" className="contact" data-screen-label="06 Contact">
      <div className="contact-inner">
        <div className="contact-grid">
          <h2 className="contact-title">
            {t.contact.title1} <span className="em">{t.contact.titleEm}</span><br/>{t.contact.title2}<br/>{t.contact.title3}
          </h2>
          <div className="contact-meta">
            <a href={`mailto:${profile.email}`}>
              <span className="lbl">{t.contact.email}</span>
              <span className="val">{profile.email}</span>
            </a>
            <a href={`https://${profile.linkedin}`} target="_blank" rel="noopener">
              <span className="lbl">{t.contact.linkedin}</span>
              <span className="val">/ikra-ugurlu</span>
            </a>
            <a href={`https://${profile.github}`} target="_blank" rel="noopener">
              <span className="lbl">{t.contact.github}</span>
              <span className="val">@ikraugurlu</span>
            </a>
            <span>
              <span className="lbl">{t.contact.location}</span>
              <span className="val">{profile.location}</span>
            </span>
          </div>
        </div>
        <div className="contact-cta">
          <a href="assets/Ikra-Ugurlu-CV.pdf" download className="cv-btn">
            <span>{t.contact.downloadFull}</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1v8m0 0L4 6m3 3l3-3M2 12h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href={`mailto:${profile.email}`} className="link-arrow">
            {t.contact.writeMe}
            <svg width="22" height="10" viewBox="0 0 22 10" fill="none">
              <path d="M0 5h20m0 0L16 1m4 4L16 9" stroke="currentColor" strokeWidth="1"/>
            </svg>
          </a>
        </div>
      </div>
      <div className="foot">
        <span>{t.contact.footerCopyright}</span>
        <span>{t.contact.footerNote}</span>
      </div>
    </section>
  );
}

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

      const el = e.target.closest('a, button, .skill-row, .t-item');
      setHovering(!!el);

      const now = performance.now();
      if (now - lastPrint.current > 110) {
        lastPrint.current = now;
        const print = document.createElement('div');
        print.className = 'paw-print';
        print.style.left = e.clientX + 'px';
        print.style.top = e.clientY + 'px';
        print.style.setProperty('--r', `${(Math.random() * 50 - 25).toFixed(0)}deg`);
        print.innerHTML = PAW_SVG;
        document.body.appendChild(print);
        setTimeout(() => print.remove(), 1300);
      }
    };
    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    const tick = () => {
      cx += (tx - cx) * 0.22;
      cy += (ty - cy) * 0.22;
      if (cursorRef.current) {
        cursorRef.current.style.left = cx + 'px';
        cursorRef.current.style.top = cy + 'px';
      }
      rafId = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const cls = `paw-cursor ${hovering ? 'hover' : ''} ${clicking ? 'click' : ''}`;
  return <div ref={cursorRef} className={cls} dangerouslySetInnerHTML={{ __html: PAW_SVG }} />;
}

function ScrollRibbon() {
  const ref = useRef(null);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const p = h.scrollTop / (h.scrollHeight - h.clientHeight);
      if (ref.current) ref.current.style.transform = `scaleX(${p})`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div className="scroll-ribbon"><div ref={ref} className="scroll-ribbon-fill"></div></div>;
}

export default function App() {
  const navLinks = useNavLinks();
  const active = useActiveSection(navLinks);
  const [theme, toggleTheme] = useTheme();
  return (
    <>
      <PawCursor />
      <ScrollRibbon />
      <Nav active={active} navLinks={navLinks} theme={theme} onToggleTheme={toggleTheme} />
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
