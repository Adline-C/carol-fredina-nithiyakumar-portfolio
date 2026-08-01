import { useState, useEffect, useRef } from 'react'

// ── Theme definitions ──────────────────────────────────────────────────────
type ThemeKey = 'light' | 'dark' | 'forest' | 'dusk'

const themes: Record<ThemeKey, {
  bg: string; fg: string; surface: string; border: string; muted: string
  navScrollBg: string; navScrollBorder: string; navScrollFg: string
  label: string; icon: string; greenSectionBg: string; greenSectionFg: string
}> = {
  light: {
    bg: '#ffffff', fg: '#000000', surface: '#f7f5f2', border: '#e0e0e0', muted: '#888',
    navScrollBg: 'rgba(255,255,255,0.96)', navScrollBorder: '#e8e8e8', navScrollFg: '#000',
    label: 'Light', icon: '○', greenSectionBg: '#02110c', greenSectionFg: '#ffffff',
  },
  dark: {
    bg: '#0d0d0d', fg: '#ededed', surface: '#161616', border: '#2a2a2a', muted: '#666',
    navScrollBg: 'rgba(13,13,13,0.96)', navScrollBorder: '#222', navScrollFg: '#ededed',
    label: 'Dark', icon: '●', greenSectionBg: '#050f0a', greenSectionFg: '#c9d7e1',
  },
  forest: {
    bg: '#02110c', fg: '#ddeade', surface: '#04190f', border: '#0e2e1c', muted: 'rgba(201,215,225,0.55)',
    navScrollBg: 'rgba(2,17,12,0.97)', navScrollBorder: '#0e2e1c', navScrollFg: '#ddeade',
    label: 'Forest', icon: '◆', greenSectionBg: '#000d07', greenSectionFg: '#C9D7E1',
  },
  dusk: {
    bg: '#f5ede0', fg: '#1a1208', surface: '#ede3d3', border: '#d4c4aa', muted: '#7a6a55',
    navScrollBg: 'rgba(245,237,224,0.97)', navScrollBorder: '#d4c4aa', navScrollFg: '#1a1208',
    label: 'Dusk', icon: '◐', greenSectionBg: '#1a0f06', greenSectionFg: '#f5ede0',
  },
}

const THEME_ORDER: ThemeKey[] = ['light', 'dark', 'forest', 'dusk']

// ── Data ──────────────────────────────────────────────────────────────────
const CASE_STUDIES = [
  {
    image: 'https://images.unsplash.com/photo-1742744652734-d5ec6598b5da?w=900&h=600&fit=crop&auto=format&q=80',
    imageAlt: 'Formula 1 car at speed — strategic velocity',
    tag: 'Case Study — 2026',
    client: 'McLaren Racing',
    title: 'Organisational Effectiveness During the 2026 Regulation Reset',
    body: [
      'An independent executive case study analysing how technical transformation impacts organisational design, operating models and decision-making in high-performance environments.',
      "Supported by publicly available business and performance data, the analysis examines how McLaren Racing navigated structural, cultural, and strategic challenges during Formula 1's most significant regulatory overhaul in a generation.",
    ],
    themes: [
      'Operating Model Design',
      'High-Performance Org Culture',
      'Regulatory Change Management',
      'Decision-Making Under Constraint',
    ],
  },
  {
    image: 'https://images.unsplash.com/photo-1775163024488-e88e4a71179f?w=900&h=600&fit=crop&auto=format&q=80',
    imageAlt: 'Two professionals reviewing documents — legal merger integration',
    tag: 'Case Study — People & Operations',
    client: 'A&O Shearman',
    title: 'People Operations & Partner Continuity During the Transatlantic Merger Integration',
    body: [
      'An independent executive case study analysing how large-scale legal mergers impact partnership structures, talent retention, and financial reporting metrics in elite corporate law firms.',
      'Supported by public financial filings and legal market lateral data, the analysis examines how A&O Shearman navigated structural integration, partner attrition, and compensation resets following its high-profile transatlantic combination.',
    ],
    themes: [
      'Denominator-Driven Financials',
      'Compensation Architecture',
      'Strategic Talent Risk Management',
      'Integrated Corporate Communications',
    ],
  },
  {
    image: 'https://images.unsplash.com/photo-1606132653399-36248f2e2a99?w=900&h=600&fit=crop&auto=format&q=80',
    imageAlt: 'Elegant fashion retail environment — luxury brand transformation',
    tag: 'Case Study — Transformation Capacity',
    client: 'Burberry',
    title: 'People Operations & Transformation Capacity During the "Burberry Forward" Efficiency Programme',
    body: [
      'An independent executive case study analysing how aggressive cost-reduction and structural downsizing impact organizational capacity, creative execution, and workforce stability within luxury heritage brands.',
      'Supported by public financial performance data and corporate statements, the analysis evaluates how Burberry managed the structural and operational balance between aggressive cost-cutting targets and the creative demands of a high-end brand turnaround.',
    ],
    themes: [
      'Downsizing vs. Strategy Delivery',
      'Organizational Capacity Metrics',
      'Targeted Creative Risk Mitigation',
      'Transformation Cadence Realignment',
    ],
  },
  {
    image: 'https://images.unsplash.com/photo-1729997309795-203b2e1b0234?w=900&h=600&fit=crop&auto=format&q=80',
    imageAlt: 'Factory floor — manufacturing and operational restructuring',
    tag: 'Case Study — Structural Restructuring',
    client: 'Dr. Martens',
    title: 'People Operations & Structural Restructuring During the "Levers for Growth" Turnaround Plan',
    body: [
      'An independent executive case study analysing how organizational design choices, leadership succession models, and internal promotion strategies impact governance, execution risk, and accountability frameworks in public retail turnarounds.',
      'Supported by corporate restructuring announcements and public financial performance data, the analysis evaluates how Dr. Martens managed the operational and reporting alignment of its organizational transformation alongside traditional consumer, product, and market strategy levers.',
    ],
    themes: [
      'Governance & Evaluation Asymmetry',
      'Leadership Cohort Risk Management',
      'Quantifying Organizational Performance',
      'Independent Oversight Architecture',
    ],
  },
]

const ART_WORKS = [
  {
    src: '/florence.JPG',
    alt: 'Florence Pugh — graphite portrait, looking over shoulder',
    title: 'Florence Pugh',
    medium: 'Graphite on Paper',
  },
  {
    src: '/george.PNG',
    alt: 'George Russell — graphite portrait, gaze upward',
    title: 'George Russell',
    medium: 'Graphite on Paper',
  },
  {
    src: '/selena.PNG',
    alt: 'Selena Gomez — charcoal portrait with hoop earrings',
    title: 'Selena Gomez',
    medium: 'Charcoal on Paper',
  },
]

const impact = [
  { stat: '1 of 4', label: "Consultants globally selected to pilot Rippling's next-gen US payroll platform" },
  { stat: '99%+', label: 'Payroll accuracy maintained across a 500+ employee multi-state US workforce' },
  { stat: '0', label: 'Compliance failures during entire platform pilot engagement' },
  { stat: '2026', label: 'McLaren organisational effectiveness case study authored ahead of regulation reset' },
]

const experience = [
  {
    company: 'Rippling',
    role: 'Business Operations Consultant — Payroll Platform',
    period: 'Aug 2024 – Aug 2025',
    points: [
      'Selected for next-generation US payroll platform pilot alongside Product, Engineering & Operations.',
      'Managed end-to-end payroll for a complex multi-state workforce of 500+ employees.',
      'Converted recurring customer scenarios into structured product feedback, improving platform scalability.',
      'Improved process documentation across global teams for delivery consistency.',
    ],
  },
  {
    company: 'CAN Fabs',
    role: 'Independent Consultant',
    period: 'Oct 2025 – Present',
    points: [
      "Established the organisation's first formal HR operating model for a growing manufacturing business.",
      'Designed policies, governance frameworks and workforce processes to improve operational consistency.',
      'Advising leadership on workforce planning, organisational structure and process improvement.',
    ],
  },
]

const expertise = [
  'Business Transformation', 'Strategy & Operations', 'Business Analysis',
  'Organisational Effectiveness', 'Process Improvement', 'Stakeholder Management',
  'Cross-functional Collaboration', 'Change Management', 'Operating Models',
  'Project Coordination', 'Executive Communication',
]

// ── Animated counter ──────────────────────────────────────────────────────
function AnimatedStat({ from, to, suffix, duration = 1800, color }: {
  from: number; to: number; suffix?: string; duration?: number; color: string
}) {
  const [value, setValue] = useState(from)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const startTime = performance.now()
        const range = to - from
        const tick = (now: number) => {
          const elapsed = now - startTime
          const progress = Math.min(elapsed / duration, 1)
          // ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3)
          setValue(Math.round(from + range * eased))
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
        observer.disconnect()
      }
    }, { threshold: 0.4 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [from, to, duration])

  return (
    <div ref={ref} className="impact-number" style={{ color }}>
      {value}{suffix}
    </div>
  )
}

// ── Helpers ───────────────────────────────────────────────────────────────
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
  )
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    setIsMobile(mq.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [breakpoint])
  return isMobile
}

// ── Component ─────────────────────────────────────────────────────────────
export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [themeKey, setThemeKey] = useState<ThemeKey>('light')
  const [themeOpen, setThemeOpen] = useState(false)
  const [activeCase, setActiveCase] = useState(0)
  const [slideDir, setSlideDir] = useState<'left' | 'right'>('right')
  const heroRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()
  const t = themes[themeKey]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close theme dropdown on outside click
  useEffect(() => {
    if (!themeOpen) return
    const close = () => setThemeOpen(false)
    window.addEventListener('click', close)
    return () => window.removeEventListener('click', close)
  }, [themeOpen])

  // Scroll-reveal via IntersectionObserver
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [themeKey]) // re-run on theme change so new elements get observed

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const navColor = scrolled ? t.navScrollFg : '#fff'

  return (
    <div style={{ background: t.bg, color: t.fg, transition: 'background 0.5s ease, color 0.5s ease' }}>

      {/* ── NAVIGATION ── */}
      <nav
        className={`nav-transparent ${scrolled ? 'scrolled' : ''}`}
        style={scrolled ? {
          background: t.navScrollBg,
          borderBottom: `1px solid ${t.navScrollBorder}`,
        } : {}}
      >
        {/* Left: Menu */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="nav-left flex items-center gap-2"
          style={{ color: navColor, background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.3s' }}
        >
          <div className="flex flex-col gap-[5px]" style={{ width: 22 }}>
            <span style={{ display: 'block', height: 1, background: 'currentColor', transition: 'all 0.25s', transform: menuOpen ? 'rotate(45deg) translateY(6px)' : 'none' }} />
            <span style={{ display: 'block', height: 1, background: 'currentColor', opacity: menuOpen ? 0 : 1, transition: 'opacity 0.25s' }} />
            <span style={{ display: 'block', height: 1, background: 'currentColor', transition: 'all 0.25s', transform: menuOpen ? 'rotate(-45deg) translateY(-6px)' : 'none' }} />
          </div>
          <span className="label-mono" style={{ color: 'currentColor', fontSize: '0.62rem', letterSpacing: '0.2em' }}>Menu</span>
        </button>

        {/* Center: Logo */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <span
            className="nav-logo"
            style={{ color: navColor, cursor: 'pointer', transition: 'color 0.3s' }}
            onClick={() => scrollTo('hero')}
          >
            Carol Fredina
          </span>
        </div>

        {/* Right: Theme toggle + Contact */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {/* Theme picker */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={(e) => { e.stopPropagation(); setThemeOpen(o => !o) }}
              title="Switch theme"
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: 'none', border: `1px solid ${scrolled ? t.border : 'rgba(255,255,255,0.3)'}`,
                borderRadius: 2, padding: '5px 10px', cursor: 'pointer',
                color: navColor, transition: 'all 0.3s',
              }}
            >
              <span style={{ fontSize: '0.7rem', lineHeight: 1 }}>{t.icon}</span>
              {!isMobile && (
                <span className="label-mono" style={{ fontSize: '0.55rem', letterSpacing: '0.18em', color: 'currentColor' }}>
                  {t.label}
                </span>
              )}
            </button>

            {/* Dropdown */}
            {themeOpen && (
              <div
                onClick={e => e.stopPropagation()}
                style={{
                  position: 'absolute', top: 'calc(100% + 10px)', right: 0,
                  background: t.bg, border: `1px solid ${t.border}`,
                  minWidth: 140, zIndex: 200,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
                  animation: 'fadeUp 0.2s ease forwards',
                }}
              >
                {THEME_ORDER.map(key => {
                  const th = themes[key]
                  return (
                    <button
                      key={key}
                      onClick={() => { setThemeKey(key); setThemeOpen(false) }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        width: '100%', padding: '10px 14px',
                        background: key === themeKey ? t.surface : 'none',
                        border: 'none', cursor: 'pointer', color: t.fg,
                        borderBottom: `1px solid ${t.border}`,
                        transition: 'background 0.15s',
                      }}
                    >
                      <span style={{ fontSize: '0.75rem', color: '#c8813a' }}>{th.icon}</span>
                      <span className="label-mono" style={{ fontSize: '0.58rem', letterSpacing: '0.15em', color: t.fg }}>{th.label}</span>
                      {key === themeKey && (
                        <span style={{ marginLeft: 'auto', width: 4, height: 4, borderRadius: '50%', background: '#c8813a' }} />
                      )}
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          <a
            href="mailto:carolnithiyakumar@gmail.com"
            className="underline-link"
            style={{ color: navColor, fontSize: '0.62rem', transition: 'color 0.3s' }}
          >
            Contact
          </a>
        </div>
      </nav>

      {/* ── MENU OVERLAY ── */}
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: 90,
          background: '#02110c',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          transition: 'opacity 0.4s ease',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          paddingLeft: 'clamp(40px, 8vw, 120px)',
        }}
      >
        <div className="label-mono" style={{ color: '#C9D7E1', marginBottom: 48, fontSize: '0.6rem' }}>
          Navigation — CFN Portfolio
        </div>
        {[
          { label: 'Profile', id: 'profile' },
          { label: 'Selected Impact', id: 'impact' },
          { label: 'Experience', id: 'experience' },
          { label: 'Strategy Portfolio', id: 'portfolio' },
          { label: 'Education', id: 'education' },
          { label: 'Expertise', id: 'expertise' },
          { label: 'Artistry', id: 'art' },
        ].map((item, i) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className="menu-nav-item"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 200,
              fontSize: 'clamp(1.6rem, 4vw, 3rem)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: '#fff',
              marginBottom: 2,
              background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateY(0)' : 'translateY(14px)',
              transition: `opacity 0.45s ease ${0.08 + i * 0.055}s, transform 0.45s ease ${0.08 + i * 0.055}s, color 0.2s ease`,
              display: 'block', lineHeight: 1.15, padding: '4px 0',
            }}
          >
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.55rem', color: '#c8813a',
              letterSpacing: '0.15em', verticalAlign: 'super', marginRight: 12, opacity: 0.8,
            }}>0{i + 1}</span>
            {item.label}
          </button>
        ))}
        <div className="hairline-white" style={{ marginTop: 48, marginBottom: 32, maxWidth: 400 }} />
        <div style={{ display: 'flex', gap: 32 }}>
          <a href="mailto:carolnithiyakumar@gmail.com" className="underline-link" style={{ color: '#C9D7E1' }}>Email</a>
          <a href="https://linkedin.com/in/carolfredina" target="_blank" rel="noreferrer" className="underline-link" style={{ color: '#C9D7E1' }}>LinkedIn</a>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: 'rgba(201,215,225,0.4)', letterSpacing: '0.1em' }}>+91 7339557119</span>
        </div>
      </div>

      {/* ── HERO ── */}
      <section
        id="hero"
        ref={heroRef}
        style={{ position: 'relative', width: '100%', height: '100vh', minHeight: 600, overflow: 'hidden', background: '#02110c' }}
      >
        <img
          src="/image.PNG"
          alt="Carol Fredina — pencil portrait artwork"
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center 20%',
            filter: 'brightness(0.62) contrast(1.05)',
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(2,17,12,0.9) 0%, rgba(2,17,12,0.1) 45%, rgba(0,0,0,0.32) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(2,17,12,0.5) 0%, transparent 50%, rgba(2,17,12,0.4) 100%)' }} />

        {/* F1 telemetry strip */}
        <div className="data-strip hero-fade-in" style={{
          position: 'absolute', top: 100, right: 40,
          color: 'rgba(201,215,225,0.45)', display: 'flex', flexDirection: 'column', gap: 5,
          textAlign: 'right', animationDelay: '0.8s',
        }}>
          <span>Coimbatore, India</span>
          <span>Open to Relocation — UK &amp; Europe</span>
          <span style={{ color: '#c8813a', marginTop: 8 }}>MBA — Dean's Prize 2024</span>
        </div>

        {/* Centered hero content */}
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'flex-end',
          padding: 'clamp(32px, 6vw, 72px)', textAlign: 'center',
        }}>
          <div className="section-label hero-fade-in" style={{ color: '#c8813a', marginBottom: 20, animationDelay: '0.2s' }}>
            Business Transformation &nbsp;·&nbsp; Strategy &amp; Operations &nbsp;·&nbsp; Organisational Effectiveness
          </div>
          <h1 className="display-xl hero-fade-in" style={{ fontSize: 'clamp(3rem, 9vw, 8rem)', color: '#fff', marginBottom: 12, lineHeight: 0.9, animationDelay: '0.4s' }}>
            Carol Fredina
          </h1>
          <h1 className="hero-fade-in" style={{
            fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 300,
            fontSize: 'clamp(1.6rem, 4.5vw, 4.2rem)', letterSpacing: '0.22em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.52)',
            marginBottom: 48, animationDelay: '0.55s',
          }}>
            Nithiyakumar
          </h1>
          <div className="hero-fade-in" style={{ display: 'flex', alignItems: 'center', gap: 40, animationDelay: '0.7s' }}>
            <button className="underline-link hero-cta" onClick={() => scrollTo('profile')} style={{ color: '#fff' }}>View Profile</button>
            <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.2)' }} />
            <button className="underline-link hero-cta" onClick={() => scrollTo('portfolio')} style={{ color: '#C9D7E1' }}>Strategy Portfolio</button>
          </div>
          <div className="hero-fade-in scroll-bounce" style={{ marginTop: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.3)', animationDelay: '1s' }}>
            <span className="label-mono" style={{ fontSize: '0.55rem', letterSpacing: '0.25em' }}>Scroll</span>
            <div style={{ width: 1, height: 28, background: 'rgba(255,255,255,0.2)' }} />
          </div>
        </div>
      </section>

      {/* ── PROFILE ── */}
      <section id="profile" style={{ padding: 'clamp(64px, 10vw, 120px) clamp(24px, 6vw, 80px)', transition: 'background 0.5s' }}>
        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1px 1fr', gap: isMobile ? '40px 0' : '0 48px', alignItems: 'start' }}>
          <div>
            <div className="section-label" style={{ marginBottom: 24, color: '#c8813a' }}>01 — Profile</div>
            <h2 className="display-lg" style={{ fontSize: 'clamp(2rem, 5vw, 3.8rem)', marginBottom: 32, lineHeight: 0.95, color: t.fg }}>
              Driving<br />Transformation<br />at Precision<br />Scale
            </h2>
            <div style={{ height: 1, background: t.border, marginBottom: 32 }} />
            <div className="label-mono" style={{ color: t.muted, marginBottom: 16 }}>MBA — Dean's Prize</div>
            <div className="label-mono" style={{ color: t.muted }}>Leeds Beckett University, UK — 2023–2024</div>
          </div>

          <div style={{ background: '#C9D7E1', alignSelf: 'stretch' }} />

          <div style={{ paddingTop: isMobile ? 0 : 48 }}>
            <p className="body-text" style={{ marginBottom: 24, color: t.fg }}>
              MBA graduate with Dean's Prize distinction and two years' experience solving operational challenges within a global HR technology company — selected as 1 of 4 consultants globally to pilot Rippling's next-generation US payroll platform.
            </p>
            <p className="body-text" style={{ marginBottom: 40, color: t.fg }}>
              My work sits at the intersection of operational rigor and strategic thinking: partnering with Product, Engineering and Operations to improve business processes and platform capability, while advising growing businesses on organisational design and workforce planning.
            </p>
            <p className="body-text" style={{ marginBottom: 40, color: t.fg }}>
              Independent strategy research examines organisational effectiveness and transformation within high-performance organisations — most recently, a case study on McLaren Racing's structural response to the 2026 Formula 1 regulation reset.
            </p>
            <div style={{ height: 1, background: '#C9D7E1', marginBottom: 28 }} />
            <div style={{ display: 'flex', gap: 40 }}>
              {[{ lang: 'English', level: 'Fluent' }, { lang: 'Tamil', level: 'Native' }, { lang: 'French', level: 'Conversational' }].map(l => (
                <div key={l.lang}>
                  <div className="label-mono" style={{ color: '#c8813a', marginBottom: 4 }}>{l.lang}</div>
                  <div className="label-mono" style={{ color: t.muted }}>{l.level}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SELECTED IMPACT ── */}
      <section id="impact" className="tech-grid-bg" style={{ background: t.greenSectionBg, color: t.greenSectionFg, padding: 'clamp(64px, 10vw, 120px) clamp(24px, 6vw, 80px)', transition: 'background 0.5s' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 64, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div className="section-label" style={{ color: '#c8813a', marginBottom: 12 }}>02 — Selected Impact</div>
            <h2 className="display-lg" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: t.greenSectionFg }}>Results That Speak<br />In Numbers</h2>
          </div>
          <div className="label-mono" style={{ color: 'rgba(201,215,225,0.4)', alignSelf: 'flex-end', textAlign: 'right' }}>Performance Data<br />2024 – 2026</div>
        </div>
        <div style={{ height: 1, background: 'rgba(255,255,255,0.15)', marginBottom: 0 }} />
        {impact.map((item, i) => (
          <div key={i}>
            <div className="impact-row reveal" style={{
              display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'clamp(120px, 18vw, 220px) 1fr',
              gap: isMobile ? '8px 0' : '0 48px', transitionDelay: `${i * 0.1}s`,
              padding: 'clamp(24px, 4vw, 40px) 0', alignItems: 'center',
            }}>
              {i === 0 && <div className="impact-number" style={{ color: t.greenSectionFg }}>1 of 4</div>}
              {i === 1 && <AnimatedStat from={0} to={99} suffix="%+" duration={1600} color={t.greenSectionFg} />}
              {i === 2 && <AnimatedStat from={47} to={0} suffix="" duration={1400} color={t.greenSectionFg} />}
              {i === 3 && <AnimatedStat from={2018} to={2026} suffix="" duration={1200} color={t.greenSectionFg} />}
              <p className="body-text" style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1rem' }}>{item.label}</p>
            </div>
            {i < impact.length - 1 && <div style={{ height: 1, background: 'rgba(255,255,255,0.1)' }} />}
          </div>
        ))}
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" style={{ padding: 'clamp(64px, 10vw, 120px) clamp(24px, 6vw, 80px)', background: t.bg, transition: 'background 0.5s' }}>
        <div className="section-label" style={{ marginBottom: 48, color: '#c8813a' }}>03 — Professional Experience</div>
        {experience.map((job, i) => (
          <div key={i}>
            <div className="reveal" style={{
              display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr',
              gap: isMobile ? '16px 0' : `0 clamp(32px, 6vw, 80px)`,
              alignItems: 'start', padding: 'clamp(40px, 6vw, 64px) 0',
            }}>
              <div style={{ position: isMobile ? 'static' : 'sticky', top: 120 }}>
                <div style={{ fontFamily: "'Barlow Condensed'", fontWeight: 400, fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c8813a', marginBottom: 8 }}>{job.company}</div>
                <div style={{ fontFamily: "'Barlow Condensed'", fontWeight: 700, fontSize: 'clamp(1rem, 2.5vw, 1.4rem)', letterSpacing: '0.1em', textTransform: 'uppercase', color: t.fg, marginBottom: 16 }}>{job.role}</div>
                <div style={{ fontFamily: "'JetBrains Mono'", fontSize: '0.62rem', color: t.muted }}>{job.period}</div>
              </div>
              <div>
                {job.points.map((point, j) => (
                  <div key={j} style={{ display: 'grid', gridTemplateColumns: '16px 1fr', gap: '0 16px', marginBottom: 20, alignItems: 'start' }}>
                    <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#c8813a', marginTop: 8 }} />
                    <p className="body-text" style={{ color: t.fg }}>{point}</p>
                  </div>
                ))}
              </div>
            </div>
            {i < experience.length - 1 && <div style={{ height: 1, background: t.border }} />}
          </div>
        ))}
      </section>

      {/* ── STRATEGY PORTFOLIO — carousel ── */}
      <section id="portfolio" style={{ background: t.surface, padding: 'clamp(64px, 10vw, 120px) clamp(24px, 6vw, 80px)', transition: 'background 0.5s', overflow: 'hidden' }}>
        {/* Header row with nav arrows */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 56, flexWrap: 'wrap', gap: 24 }}>
          <div>
            <div className="section-label" style={{ color: '#c8813a', marginBottom: 10 }}>04 — Strategy Portfolio</div>
            <div className="label-mono" style={{ color: t.muted }}>{activeCase + 1} / {CASE_STUDIES.length}</div>
          </div>

          {/* Dot indicators + arrows */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ display: 'flex', gap: 8 }}>
              {CASE_STUDIES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setSlideDir(i > activeCase ? 'right' : 'left'); setActiveCase(i) }}
                  style={{
                    width: i === activeCase ? 24 : 6, height: 6,
                    borderRadius: 3, border: 'none', cursor: 'pointer',
                    background: i === activeCase ? '#c8813a' : t.border,
                    transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
                    padding: 0,
                  }}
                />
              ))}
            </div>
            <button
              onClick={() => { setSlideDir('left'); setActiveCase(i => (i - 1 + CASE_STUDIES.length) % CASE_STUDIES.length) }}
              style={{
                width: 44, height: 44, borderRadius: '50%',
                border: `1px solid ${t.border}`, background: 'none',
                cursor: 'pointer', color: t.fg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.1rem', transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#02110c'; (e.currentTarget as HTMLElement).style.color = '#fff'; (e.currentTarget as HTMLElement).style.borderColor = '#02110c' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'none'; (e.currentTarget as HTMLElement).style.color = t.fg; (e.currentTarget as HTMLElement).style.borderColor = t.border }}
            >←</button>
            <button
              onClick={() => { setSlideDir('right'); setActiveCase(i => (i + 1) % CASE_STUDIES.length) }}
              style={{
                width: 44, height: 44, borderRadius: '50%',
                border: `1px solid ${t.border}`, background: 'none',
                cursor: 'pointer', color: t.fg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.1rem', transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#02110c'; (e.currentTarget as HTMLElement).style.color = '#fff'; (e.currentTarget as HTMLElement).style.borderColor = '#02110c' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'none'; (e.currentTarget as HTMLElement).style.color = t.fg; (e.currentTarget as HTMLElement).style.borderColor = t.border }}
            >→</button>
          </div>
        </div>

        {/* Slide content */}
        {CASE_STUDIES.map((cs, i) => (
          <div
            key={i}
            style={{
              display: i === activeCase ? 'grid' : 'none',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: 'clamp(32px, 6vw, 80px)',
              alignItems: 'start',
              animation: i === activeCase ? `slideIn${slideDir === 'right' ? 'Right' : 'Left'} 0.55s cubic-bezier(0.16,1,0.3,1) forwards` : 'none',
            }}
          >
            {/* Image */}
            <div className="portfolio-img" style={{ position: 'relative', overflow: 'hidden', aspectRatio: '4/5', background: '#02110c' }}>
              <img src={cs.image} alt={cs.imageAlt} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.75) contrast(1.1)', display: 'block' }} />
              <div style={{ position: 'absolute', bottom: 24, left: 24, background: '#c8813a', padding: '6px 14px' }}>
                <span className="label-mono" style={{ color: '#fff', fontSize: '0.68rem' }}>{cs.tag}</span>
              </div>
            </div>

            {/* Content */}
            <div style={{ paddingTop: 16 }}>
              <div className="label-mono" style={{ color: '#c8813a', marginBottom: 24 }}>{cs.client}</div>
              <h3 className="display-lg" style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.6rem)', marginBottom: 32, lineHeight: 1.0, color: t.fg }}>
                {cs.title}
              </h3>
              <div style={{ height: 1, background: t.border, marginBottom: 32 }} />
              {cs.body.map((para, j) => (
                <p key={j} className="body-text" style={{ marginBottom: 20, color: t.fg }}>{para}</p>
              ))}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 28px', margin: '32px 0 40px' }}>
                {cs.themes.map(theme => (
                  <div key={theme} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#c8813a', marginTop: 7, flexShrink: 0 }} />
                    <span className="label-mono" style={{ color: t.muted, lineHeight: 1.6 }}>{theme}</span>
                  </div>
                ))}
              </div>
              <a href="mailto:carolnithiyakumar@gmail.com" className="underline-link" style={{ color: t.fg }}>Request Full Case Study</a>
            </div>
          </div>
        ))}
      </section>

      {/* ── EDUCATION ── */}
      <section id="education" style={{ padding: 'clamp(64px, 10vw, 120px) clamp(24px, 6vw, 80px)', background: t.bg, transition: 'background 0.5s' }}>
        <div className="section-label" style={{ marginBottom: 48, color: '#c8813a' }}>05 — Education</div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 0 }}>
          {/* MBA */}
          <div className="reveal" style={{ padding: 'clamp(32px, 5vw, 56px)', borderRight: isMobile ? 'none' : `1px solid ${t.border}`, borderBottom: `1px solid ${t.border}` }}>
            <div className="label-mono" style={{ color: '#c8813a', marginBottom: 16 }}>2023 – 2024</div>
            <h3 className="display-md" style={{ fontSize: 'clamp(1.2rem, 3vw, 1.9rem)', marginBottom: 12, color: t.fg }}>Master of Business Administration</h3>
            <div style={{ fontFamily: "'Barlow Condensed'", fontWeight: 400, fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: t.muted, marginBottom: 20 }}>
              Leeds Beckett University, United Kingdom
            </div>
            {/* Dean's Prize badge — now a link */}
            <a
              href="https://psgim.ac.in/students-highlights/"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                background: '#02110c', padding: '8px 16px',
                textDecoration: 'none',
                transition: 'background 0.22s ease, transform 0.22s ease',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#0a3324'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#02110c'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)' }}
            >
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#c8813a' }} />
              <span className="label-mono" style={{ color: '#fff', fontSize: '0.6rem' }}>Dean's Prize Recipient ↗</span>
            </a>
          </div>

          {/* BBA */}
          <div className="reveal" style={{ padding: 'clamp(32px, 5vw, 56px)', borderBottom: `1px solid ${t.border}`, transitionDelay: '0.15s' }}>
            <div className="label-mono" style={{ color: '#c8813a', marginBottom: 16 }}>2019 – 2022</div>
            <h3 className="display-md" style={{ fontSize: 'clamp(1.2rem, 3vw, 1.9rem)', marginBottom: 12, color: t.fg }}>Bachelor of Business Administration</h3>
            <div style={{ fontFamily: "'Barlow Condensed'", fontWeight: 400, fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: t.muted }}>
              KG College of Arts &amp; Science, India
            </div>
          </div>

          {/* Availability strip */}
          <div style={{ gridColumn: isMobile ? '1' : '1 / -1', padding: 'clamp(24px, 4vw, 40px)', borderBottom: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', gap: 48, flexWrap: 'wrap' }}>
            <div className="label-mono" style={{ color: t.muted }}>Current Location</div>
            <div className="display-md" style={{ fontSize: '1.1rem', color: t.fg }}>Coimbatore, India</div>
            <div style={{ width: 1, height: 24, background: '#C9D7E1' }} />
            <div className="label-mono" style={{ color: t.muted }}>Availability</div>
            <div className="display-md" style={{ fontSize: '1.1rem', color: '#02110c' }}>Open to Relocation — UK &amp; Europe</div>
          </div>
        </div>
      </section>

      {/* ── EXPERTISE TAGS ── */}
      <section id="expertise" style={{ padding: 'clamp(64px, 10vw, 120px) clamp(24px, 6vw, 80px)', background: t.bg, transition: 'background 0.5s' }}>
        <div className="section-label" style={{ marginBottom: 48, color: '#c8813a' }}>06 — Core Expertise</div>
        <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {expertise.map(tag => (
            <div key={tag} className="tag-item" style={{ borderColor: t.border, color: t.muted }}>{tag}</div>
          ))}
        </div>
      </section>

      {/* ── ART SECTION ── */}
      <section id="art" style={{ background: t.surface, padding: 'clamp(64px, 10vw, 120px) clamp(24px, 6vw, 80px)', transition: 'background 0.5s' }}>
        {/* Header row */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 'clamp(24px, 4vw, 64px)', marginBottom: 64, alignItems: 'end' }}>
          <div>
            <div className="section-label" style={{ color: '#c8813a', marginBottom: 16 }}>07 — Artistry</div>
            <h2 className="display-lg reveal" style={{ fontSize: 'clamp(2rem, 5vw, 3.8rem)', lineHeight: 0.95, color: t.fg }}>
              Precision in<br />Every Stroke
            </h2>
          </div>
          <p className="body-text reveal" style={{ color: t.muted, maxWidth: 440, transitionDelay: '0.12s' }}>
            Beyond strategy, I'm a self-taught pencil portrait artist. My work explores likeness, shadow, and form — the same commitment to precision and craft I bring to my professional life. Each portrait is rendered entirely by hand in graphite and charcoal.
          </p>
        </div>

        {/* Gallery grid: 1 large feature + 3 smaller */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gridTemplateRows: isMobile ? 'auto' : 'auto auto', gap: 16 }}>

          {/* Feature piece — spans 2 rows on desktop */}
          <div
            className="portfolio-img reveal"
            style={{
              gridRow: isMobile ? 'auto' : '1 / 3',
              position: 'relative', overflow: 'hidden',
              aspectRatio: isMobile ? '4/3' : '3/4',
              background: '#111',
              cursor: 'pointer',
            }}
          >
            <img
              src="/image.PNG"
              alt="Carol Fredina — original graphite portrait, featured work"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%', display: 'block' }}
            />
            <div className="art-caption">
              <div className="label-mono" style={{ color: '#c8813a', fontSize: '0.58rem', marginBottom: 6 }}>Featured Work</div>
              <div className="display-md" style={{ color: '#fff', fontSize: '1.1rem' }}>Carlos Sainz</div>
              <div className="label-mono" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.58rem', marginTop: 4 }}>Graphite on Paper</div>
            </div>
            {/* Always-visible badge */}
            <div style={{ position: 'absolute', top: 20, left: 20, background: '#c8813a', padding: '5px 12px' }}>
              <span className="label-mono" style={{ color: '#fff', fontSize: '0.55rem' }}>Original</span>
            </div>
          </div>

          {/* 3 smaller works */}
          {ART_WORKS.map((work, i) => (
            <div
              key={i}
              className="portfolio-img reveal"
              style={{
                position: 'relative', overflow: 'hidden',
                aspectRatio: '4/3', background: '#111',
                cursor: 'pointer', transitionDelay: `${0.1 + i * 0.08}s`,
              }}
            >
              <img
                src={work.src}
                alt={work.alt}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <div className="art-caption" style={{ padding: '24px 20px 18px' }}>
                <div className="display-md" style={{ color: '#fff', fontSize: '0.9rem' }}>{work.title}</div>
                <div className="label-mono" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.55rem', marginTop: 3 }}>{work.medium}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div style={{ marginTop: 40, display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ height: 1, background: t.border, flex: 1 }} />
          <span className="label-mono" style={{ color: t.muted, fontSize: '0.6rem', whiteSpace: 'nowrap' }}>
            All works are original — graphite &amp; charcoal on paper
          </span>
          <div style={{ height: 1, background: t.border, flex: 1 }} />
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        background: t.greenSectionBg, color: t.greenSectionFg,
        padding: 'clamp(48px, 8vw, 100px) clamp(24px, 6vw, 80px)',
        position: 'relative', overflow: 'hidden', transition: 'background 0.5s',
      }}>
        <div className="display-xl" style={{
          fontSize: 'clamp(4rem, 15vw, 14rem)', color: 'rgba(255,255,255,0.04)',
          position: 'absolute', bottom: -20, left: 0, right: 0, lineHeight: 1,
          whiteSpace: 'nowrap', overflow: 'hidden', pointerEvents: 'none', userSelect: 'none',
        }}>
          Carol Fredina Nithiyakumar
        </div>
        <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 'clamp(32px, 6vw, 80px)', alignItems: 'end' }}>
          <div>
            <div className="label-mono" style={{ color: '#C9D7E1', marginBottom: 24 }}>Available for new opportunities</div>
            <h2 className="display-lg" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', color: t.greenSectionFg, marginBottom: 40, lineHeight: 0.95 }}>
              Let's Build<br />Something<br />Exceptional.
            </h2>
            <a href="mailto:carolnithiyakumar@gmail.com" className="underline-link" style={{ color: t.greenSectionFg, fontSize: '0.75rem' }}>
              carolnithiyakumar@gmail.com
            </a>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-end', marginBottom: 40 }}>
              <a href="mailto:carolnithiyakumar@gmail.com" className="underline-link" style={{ color: 'rgba(255,255,255,0.6)' }}>Email</a>
              <a href="https://linkedin.com/in/carolfredina" target="_blank" rel="noreferrer" className="underline-link" style={{ color: 'rgba(255,255,255,0.6)' }}>LinkedIn</a>
              <span className="label-mono" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.6rem' }}>+91 7339557119</span>
            </div>
            <div style={{ height: 1, background: 'rgba(255,255,255,0.15)', marginBottom: 24 }} />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 32 }}>
              <span className="label-mono" style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.58rem' }}>© 2026 Carol Fredina Nithiyakumar</span>
              <span className="label-mono" style={{ color: 'rgba(201,215,225,0.4)', fontSize: '0.58rem' }}>MBA — Dean's Prize</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
