import { useState, useRef, useEffect } from 'react';

type Tab = 'home' | 'projects' | 'playground' | 'arcade';
type Game = 'menu' | 'pong' | 'snake' | 'tetris';

const projects = [
  {
    title: 'CityPulse',
    tagline: 'Civic accountability, city-scale.',
    desc: 'Full-stack platform ingesting live NYC 311 complaint data, clustering geospatial incidents with PostGIS, and running Gemini Vision AI to auto-triage citizen photo reports — turning raw city noise into actionable civic intelligence.',
    bullets: [
      'Architected async FastAPI + Celery/Redis task queue for non-blocking 311 API ingestion across 50,000+ records',
      'Integrated Gemini 1.5 Flash Vision to auto-classify citizen photo submissions, reducing manual review to zero',
      'Built PostGIS geospatial clustering engine grouping nearby complaints into civic action items in real time',
    ],
    tags: ['Next.js', 'FastAPI', 'PostgreSQL', 'PostGIS', 'Redis', 'Docker', 'Gemini AI', 'Celery'],
    link: 'https://citypulsebyash.vercel.app/',
    github: 'https://github.com/ashfaqshaikmohamed/CitypulseApp',
    year: '2025',
    stats: [{ n: '50K+', l: 'records ingested' }, { n: '~0', l: 'manual reviews' }, { n: '8', l: 'Docker services' }],
  },
  {
    title: 'Receipt',
    tagline: 'Split bills. No drama.',
    desc: 'On-device OCR bill-splitter using Tesseract.js to parse itemized receipts directly in the browser — no server, no uploads, no accounts. Detects quantities, tip, and tax, then splits the check with one tap.',
    bullets: [
      'Built Tesseract.js OCR pipeline with quantity-prefix detection ("2x Steak") and tip/tax auto-extraction',
      'Zero-backend architecture: all parsing runs client-side for complete privacy, deployed on Vercel',
      'Framer Motion animated tutorial with adaptive layout — bottom sheet on mobile, dialog on desktop',
    ],
    tags: ['React', 'TypeScript', 'Tesseract.js', 'Firebase', 'Framer Motion', 'Tailwind CSS'],
    link: 'https://receiptifybyashfaq.vercel.app/',
    github: 'https://github.com/ashfaqshaikmohamed/receipt-project',
    year: '2025',
    stats: [{ n: '100%', l: 'on-device OCR' }, { n: '<2s', l: 'parse time' }, { n: '0', l: 'servers needed' }],
  },
];

const stack = ['Python', 'React', 'Java', 'JavaScript', 'TypeScript', 'Rust', 'C', 'Node.js'];

export default function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [tab, setTab] = useState<Tab>('home');
  const [cursor, setCursor] = useState({ x: -200, y: -200 });
  const [cursorHover, setCursorHover] = useState(false);
  const [game, setGame] = useState<Game>('menu');

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
    const move = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  const hov = {
    onMouseEnter: () => setCursorHover(true),
    onMouseLeave: () => setCursorHover(false),
  };

  return (
    <div style={{ minHeight: '100vh', width: '100vw', background: 'var(--cream)', overflowX: 'hidden' }}>

      {/* Custom cursor */}
      <div style={{
        position: 'fixed', left: cursor.x, top: cursor.y, zIndex: 9999,
        width: cursorHover ? 36 : 7, height: cursorHover ? 36 : 7,
        borderRadius: '50%',
        background: cursorHover ? 'transparent' : 'var(--ink)',
        border: cursorHover ? '1px solid var(--ink)' : 'none',
        transform: 'translate(-50%,-50%)',
        transition: 'width 0.16s ease, height 0.16s ease, background 0.16s ease',
        pointerEvents: 'none', mixBlendMode: 'multiply',
      }} />

      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 48px',
        background: 'rgba(248,245,240,0.9)', backdropFilter: 'blur(14px)',
        borderBottom: '1px solid rgba(10,9,8,0.07)',
      }}>
        <span style={{ fontFamily: 'Georgia,"Times New Roman",serif', fontSize: '14px', fontWeight: 400, color: 'var(--ink)', letterSpacing: '0.3px' }}>
          ashfaq
        </span>
        <div style={{ display: 'flex', gap: '32px' }}>
          {(['home','projects','playground','arcade'] as Tab[]).map(t => (
            <button key={t} {...hov}
              onClick={() => { setTab(t); if (t === 'arcade') setGame('menu'); }}
              style={{
                background: 'none', border: 'none', cursor: 'none',
                fontFamily: "'DM Sans',sans-serif", fontSize: '10px', fontWeight: 500,
                letterSpacing: '2.5px', textTransform: 'uppercase',
                color: tab === t ? 'var(--ink)' : 'var(--warm-mid)',
                borderBottom: tab === t ? '1px solid var(--ink)' : '1px solid transparent',
                paddingBottom: '2px', transition: 'all 0.2s',
              }}>
              {t === 'playground' ? 'play' : t}
            </button>
          ))}
        </div>
        {/* Social icons */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          {[
            { href: 'https://github.com/ashfaqshaikmohamed', title: 'GitHub', svg: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg> },
            { href: 'https://www.linkedin.com/in/ashfaqece/', title: 'LinkedIn', svg: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
            { href: 'mailto:ashad.shaikmohamed@rutgers.edu', title: 'Email', svg: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/></svg> },
          ].map(({ href, title, svg }) => (
            <a key={title} href={href} target={href.startsWith('mailto') ? undefined : '_blank'} title={title} {...hov}
              style={{ color: 'var(--warm-mid)', display: 'flex', transition: 'color 0.18s' }}
              onMouseOver={e=>(e.currentTarget.style.color='var(--ink)')}
              onMouseOut={e=>(e.currentTarget.style.color='var(--warm-mid)')}>
              {svg}
            </a>
          ))}
        </div>
      </nav>

      {/* HOME */}
      {tab === 'home' && (
        <div>
          {/* HERO */}
          <div style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            paddingTop: '60px',
          }}>

            {/* Name — sits in normal flow, guaranteed above video */}
            <h1 style={{
              fontFamily: '"Times New Roman", Times, serif',
              fontWeight: 400,
              fontSize: 'clamp(56px, 9vw, 120px)',
              color: '#0A0908',
              letterSpacing: '-2px',
              lineHeight: 1,
              margin: '0 0 12px 0',
              padding: 0,
              userSelect: 'none',
              textAlign: 'center',
              flexShrink: 0,
              zIndex: 2,
              position: 'relative',
            }}>
              ashfaq
            </h1>

            {/* Video — larger, centered */}
            <div style={{
              width: '72vw',
              maxWidth: '1000px',
              minWidth: '480px',
              flexShrink: 0,
              position: 'relative',
              zIndex: 1,
            }}>
              <video ref={videoRef} autoPlay loop muted playsInline
                style={{ width: '100%', height: 'auto', display: 'block', mixBlendMode: 'multiply' }}>
                <source src="/background.webm" type="video/webm" />
                <source src="/background.mp4" type="video/mp4" />
              </video>
            </div>

            {/* Left floating info */}
            <div style={{
              position: 'absolute', left: '4%', top: '50%', transform: 'translateY(-50%)',
              display: 'flex', flexDirection: 'column', gap: '12px', zIndex: 3,
            }}>
              {['ECE + Math', 'Rutgers · New Brunswick', 'Class of 2028'].map(tag => (
                <span key={tag} style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: '9px', fontWeight: 500,
                  letterSpacing: '1.8px', textTransform: 'uppercase',
                  color: 'rgba(10,9,8,0.35)', whiteSpace: 'nowrap', display: 'block',
                }}>{tag}</span>
              ))}
            </div>

            {/* Right floating interests */}
            <div style={{
              position: 'absolute', right: '4%', top: '50%', transform: 'translateY(-50%)',
              display: 'flex', flexDirection: 'column', gap: '12px', zIndex: 3, alignItems: 'flex-end',
            }}>
              {['Full-Stack', 'Machine Learning', 'Infrastructure'].map(tag => (
                <span key={tag} style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: '9px', fontWeight: 500,
                  letterSpacing: '1.8px', textTransform: 'uppercase',
                  color: 'rgba(10,9,8,0.25)', whiteSpace: 'nowrap', display: 'block',
                }}>{tag}</span>
              ))}
            </div>

            {/* Scroll hint */}
            <div style={{
              position: 'absolute', bottom: '28px',
              fontFamily: "'DM Sans', sans-serif", fontSize: '8px',
              letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(10,9,8,0.25)',
            }}>
              scroll
            </div>
          </div>

          {/* ABOUT ME */}
          <div style={{ maxWidth: '820px', margin: '0 auto', padding: '96px 48px 0' }}>
            <div style={{ borderTop: '1px solid rgba(10,9,8,0.08)', paddingTop: '64px' }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9px', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--warm-mid)', marginBottom: '40px' }}>About</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '80px', alignItems: 'start' }}>

                {/* Bio */}
                <div>
                  <p style={{ fontFamily: '"Times New Roman", Times, serif', fontSize: '19px', color: 'var(--ink)', lineHeight: 1.85, marginBottom: '22px' }}>
                    Double majoring in ECE and Mathematics at Rutgers — New Brunswick. I like building things that actually push me, and working on problems where the answer isn't obvious from the start.
                  </p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: 'rgba(10,9,8,0.52)', lineHeight: 1.9, marginBottom: '28px' }}>
                    My work sits across full-stack, machine learning, and infrastructure. Not because I can't pick — because the interesting problems usually touch all three. If something catches your eye, reach out:
                  </p>
                  <a href="mailto:ashfaq.shaikmohamed@rutgers.edu"
                    style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', letterSpacing: '0.5px', color: 'var(--ink)', textDecoration: 'none', borderBottom: '1px solid rgba(10,9,8,0.3)', paddingBottom: '2px', transition: 'border-color 0.2s' }}
                    onMouseOver={e => (e.currentTarget.style.borderColor = 'var(--ink)')}
                    onMouseOut={e => (e.currentTarget.style.borderColor = 'rgba(10,9,8,0.3)')}>
                    ashfaq.shaikmohamed@rutgers.edu
                  </a>
                </div>

                {/* Details + Stack */}
                <div>
                  <div style={{ marginBottom: '36px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[
                      { label: 'Degree', value: 'B.Eng ECE & Mathematics' },
                      { label: 'School', value: 'Rutgers University' },
                      { label: 'Class', value: '2028' },
                      { label: 'Focus', value: 'Full-Stack · ML · Infra' },
                    ].map(item => (
                      <div key={item.label} style={{ display: 'flex', gap: '20px', alignItems: 'baseline' }}>
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '8px', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(10,9,8,0.28)', minWidth: '52px' }}>{item.label}</span>
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: 'rgba(10,9,8,0.6)', lineHeight: 1.5 }}>{item.value}</span>
                      </div>
                    ))}
                  </div>

                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(10,9,8,0.28)', marginBottom: '14px' }}>Stack</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {stack.map((s) => (
                      <span key={s} style={{
                        fontFamily: '"Times New Roman", Times, serif',
                        fontStyle: 'italic',
                        fontSize: '16px',
                        color: 'rgba(10,9,8,0.7)',
                        lineHeight: 1.4,
                      }}>{s}</span>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* STATS */}
          <div style={{ maxWidth: '820px', margin: '0 auto', padding: '64px 48px 0' }}>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
              borderTop: '1px solid rgba(10,9,8,0.08)', borderBottom: '1px solid rgba(10,9,8,0.08)',
              padding: '40px 0',
            }}>
              {[
                { n: '50K+', l: 'Records ingested' },
                { n: '2028', l: 'Graduating' },
                { n: '2', l: 'Live products' },
                { n: '∞', l: 'Problems left' },
              ].map(s => (
                <div key={s.l} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: '"Times New Roman", Times, Georgia, serif', fontSize: '32px', color: 'var(--ink)', fontWeight: 400, lineHeight: 1 }}>{s.n}</div>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--warm-mid)', marginTop: '8px' }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* PROJECT PREVIEW CARDS */}
          <div style={{ maxWidth: '820px', margin: '0 auto', padding: '64px 48px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '32px' }}>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '9px', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--warm-mid)' }}>Recent Work</p>
              <button {...hov} onClick={() => setTab('projects')}
                style={{ background: 'none', border: 'none', cursor: 'none', fontFamily: "'DM Sans',sans-serif", fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--warm-mid)', borderBottom: '1px solid var(--warm-mid)', paddingBottom: '1px', transition: 'color 0.2s' }}
                onMouseOver={e=>(e.currentTarget.style.color='var(--ink)')}
                onMouseOut={e=>(e.currentTarget.style.color='var(--warm-mid)')}>
                see all →
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              {projects.map((p, i) => (
                <a key={i} href={p.link} target="_blank"
                  style={{ textDecoration: 'none', display: 'block' }}
                  {...hov}>
                  <div style={{
                    border: '1px solid rgba(10,9,8,0.08)', padding: '28px 24px',
                    transition: 'border-color 0.2s, transform 0.2s',
                  }}
                    onMouseOver={e=>{(e.currentTarget as HTMLElement).style.borderColor='var(--ink)';(e.currentTarget as HTMLElement).style.transform='translateY(-2px)';}}
                    onMouseOut={e=>{(e.currentTarget as HTMLElement).style.borderColor='rgba(10,9,8,0.08)';(e.currentTarget as HTMLElement).style.transform='none';}}>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--warm-mid)', marginBottom: '8px' }}>{p.year}</p>
                    <h3 style={{ fontFamily: '"Times New Roman", Times, Georgia, serif', fontSize: '22px', fontWeight: 400, color: 'var(--ink)', marginBottom: '8px' }}>{p.title}</h3>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '12px', color: 'rgba(10,9,8,0.45)', lineHeight: 1.7, marginBottom: '16px' }}>{p.tagline}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {p.tags.slice(0,3).map(t => (
                        <span key={t} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '8px', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(10,9,8,0.35)', border: '1px solid rgba(10,9,8,0.12)', padding: '3px 8px' }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* FOOTER */}
          <div style={{ maxWidth: '820px', margin: '80px auto 0', padding: '32px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(10,9,8,0.06)' }}>
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--warm-mid)' }}>Ashfaq Shaik-Mohamed · 2025</span>
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(10,9,8,0.2)' }}>Jersey City, NJ</span>
          </div>
        </div>
      )}

      {/* PROJECTS */}
      {tab === 'projects' && (
        <div style={{ maxWidth: '820px', margin: '0 auto', padding: '140px 48px 80px' }}>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '9px', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--warm-mid)', marginBottom: '56px' }}>Selected Work</p>
          {projects.map((p, i) => (
            <div key={i} style={{ borderTop: '1px solid rgba(10,9,8,0.08)', padding: '52px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                <h2 style={{ fontFamily: '"Times New Roman", Times, Georgia, serif', fontSize: '34px', fontWeight: 400, color: 'var(--ink)', letterSpacing: '-0.5px' }}>{p.title}</h2>
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--warm-mid)' }}>{p.year}</span>
              </div>
              <p style={{ fontFamily: '"Times New Roman", Times, Georgia, serif', fontStyle: 'italic', fontSize: '15px', color: 'var(--warm-mid)', marginBottom: '20px' }}>{p.tagline}</p>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '14px', color: 'rgba(10,9,8,0.55)', lineHeight: 1.9, marginBottom: '24px' }}>{p.desc}</p>
              <ul style={{ listStyle: 'none', marginBottom: '28px' }}>
                {p.bullets.map((b, j) => (
                  <li key={j} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '13px', color: 'rgba(10,9,8,0.5)', lineHeight: 1.8, marginBottom: '8px', paddingLeft: '18px', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: 'var(--gold)' }}>—</span>{b}
                  </li>
                ))}
              </ul>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', borderTop: '1px solid rgba(10,9,8,0.06)', borderBottom: '1px solid rgba(10,9,8,0.06)', padding: '20px 0', marginBottom: '24px' }}>
                {p.stats.map(s => (
                  <div key={s.l}>
                    <div style={{ fontFamily: '"Times New Roman", Times, Georgia, serif', fontSize: '26px', fontWeight: 400, color: 'var(--ink)' }}>{s.n}</div>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '8px', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--warm-mid)', marginTop: '4px' }}>{s.l}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                {p.tags.map(t => (
                  <span key={t} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '8px', fontWeight: 500, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(10,9,8,0.38)', border: '1px solid rgba(10,9,8,0.13)', padding: '4px 10px' }}>{t}</span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '24px' }}>
                <a href={p.link} target="_blank" {...hov} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--ink)', textDecoration: 'none', borderBottom: '1px solid var(--ink)', paddingBottom: '2px' }}>Live →</a>
                <a href={p.github} target="_blank" {...hov} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--warm-mid)', textDecoration: 'none', borderBottom: '1px solid var(--warm-mid)', paddingBottom: '2px' }}>GitHub</a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PLAYGROUND */}
      {tab === 'playground' && <PlaygroundTab setCursorHover={setCursorHover} />}

      {/* ARCADE */}
      {tab === 'arcade' && <ArcadeTab game={game} setGame={setGame} setCursorHover={setCursorHover} />}
    </div>
  );
}

// ─── Playground ───────────────────────────────────────────────────────────────
function PlaygroundTab({ setCursorHover }: { setCursorHover: (v: boolean) => void }) {
  const hov = { onMouseEnter: () => setCursorHover(true), onMouseLeave: () => setCursorHover(false) };
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [wordList, setWordList] = useState<{ text: string; x: number; y: number; size: number; opacity: number; color: string }[]>([]);
  const [input, setInput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -999, y: -999 });

  const colors = ['rgba(10,9,8,', 'rgba(184,151,74,', 'rgba(107,94,82,'];

  useEffect(() => {
    try {
      const saved = localStorage.getItem('portfolio-words-v2');
      if (saved) setWordList(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    wordList.forEach(w => {
      const dx = w.x - mousePos.x;
      const dy = w.y - mousePos.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      const boost = dist < 80 ? 1 : 0;
      ctx.font = `italic ${w.size + boost * 4}px "Times New Roman", Georgia, serif`;
      ctx.fillStyle = w.color + (w.opacity + boost * 0.3) + ')';
      ctx.fillText(w.text, w.x, w.y);
    });
  }, [wordList, mousePos]);

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const addWord = () => {
    const trimmed = input.trim().replace(/\s+/g, '').slice(0, 20);
    if (!trimmed || submitted) return;
    const canvas = canvasRef.current!;
    const size = 14 + Math.random() * 32;
    const w = {
      text: trimmed,
      x: 20 + Math.random() * (canvas.width - 160),
      y: size + Math.random() * (canvas.height - size - 20),
      size, opacity: 0.3 + Math.random() * 0.6,
      color: colors[Math.floor(Math.random() * colors.length)],
    };
    const next = [...wordList, w];
    setWordList(next);
    try { localStorage.setItem('portfolio-words-v2', JSON.stringify(next)); } catch {}
    setInput('');
    setSubmitted(true);
  };

  return (
    <div style={{ maxWidth: '820px', margin: '0 auto', padding: '140px 48px 80px' }}>
      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '9px', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--warm-mid)', marginBottom: '12px' }}>Playground</p>
      <h2 style={{ fontFamily: '"Times New Roman", Times, Georgia, serif', fontSize: '30px', fontWeight: 400, color: 'var(--ink)', marginBottom: '8px' }}>Leave a mark.</h2>
      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '13px', color: 'rgba(10,9,8,0.4)', marginBottom: '40px', lineHeight: 1.7 }}>
        Drop one word. It stays here alongside everyone else who found this page — hover over the canvas to stir things up.
      </p>

      <canvas ref={canvasRef} width={724} height={320}
        onMouseMove={handleCanvasMouseMove}
        onMouseLeave={() => setMousePos({ x: -999, y: -999 })}
        style={{ width: '100%', border: '1px solid rgba(10,9,8,0.08)', display: 'block', marginBottom: '24px', background: 'rgba(10,9,8,0.01)', cursor: 'none' }} />

      {submitted ? (
        <p style={{ fontFamily: '"Times New Roman", Times, Georgia, serif', fontStyle: 'italic', fontSize: '15px', color: 'var(--warm-mid)' }}>
          your word is up there. thanks for stopping by.
        </p>
      ) : (
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <input value={input}
            onChange={e => setInput(e.target.value.replace(/\s/g,'').slice(0,20))}
            onKeyDown={e => e.key === 'Enter' && addWord()}
            maxLength={20} placeholder="one word..."
            style={{ fontFamily: '"Times New Roman", Times, Georgia, serif', fontStyle: 'italic', fontSize: '15px', background: 'none', border: 'none', borderBottom: '1px solid rgba(10,9,8,0.2)', outline: 'none', color: 'var(--ink)', padding: '8px 0', width: '200px', cursor: 'text' }} />
          <button onClick={addWord} {...hov}
            style={{ background: 'none', border: '1px solid var(--ink)', cursor: 'none', fontFamily: "'DM Sans',sans-serif", fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--ink)', padding: '9px 20px', transition: 'all 0.2s' }}
            onMouseOver={e=>{(e.currentTarget as HTMLElement).style.background='var(--ink)';(e.currentTarget as HTMLElement).style.color='var(--cream)';}}
            onMouseOut={e=>{(e.currentTarget as HTMLElement).style.background='none';(e.currentTarget as HTMLElement).style.color='var(--ink)';}}>
            Add
          </button>
        </div>
      )}

      <div style={{ marginTop: '64px', borderTop: '1px solid rgba(10,9,8,0.08)', paddingTop: '48px' }}>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '9px', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--warm-mid)', marginBottom: '12px' }}>Visitors</p>
        <p style={{ fontFamily: '"Times New Roman", Times, Georgia, serif', fontSize: '40px', fontWeight: 400, color: 'var(--ink)', lineHeight: 1 }}>{wordList.length}</p>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(10,9,8,0.3)', marginTop: '8px' }}>words left so far</p>
      </div>
    </div>
  );
}

// ─── Arcade ───────────────────────────────────────────────────────────────────
function ArcadeTab({ game, setGame, setCursorHover }: { game: Game; setGame: (g: Game) => void; setCursorHover: (v: boolean) => void }) {
  const hov = { onMouseEnter: () => setCursorHover(true), onMouseLeave: () => setCursorHover(false) };
  if (game === 'pong') return <PongGame onBack={() => setGame('menu')} />;
  if (game === 'snake') return <SnakeGame onBack={() => setGame('menu')} />;
  if (game === 'tetris') return <TetrisGame onBack={() => setGame('menu')} />;

  return (
    <div style={{ maxWidth: '860px', margin: '0 auto', padding: '140px 48px 80px' }}>
      {/* Header */}
      <div style={{ marginBottom: '64px' }}>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '9px', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--warm-mid)', marginBottom: '16px' }}>Arcade</p>
        <h2 style={{ fontFamily: '"Times New Roman", Times, Georgia, serif', fontSize: '42px', fontWeight: 400, color: 'var(--ink)', marginBottom: '12px', letterSpacing: '-0.5px' }}>
          take a break.
        </h2>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '13px', color: 'rgba(10,9,8,0.4)', lineHeight: 1.7, maxWidth: '480px' }}>
          three games. no scores saved. no pressure. just you and the classics — built from scratch, right here in the browser.
        </p>
      </div>

      {/* Scanline decoration */}
      <div style={{ borderTop: '1px solid rgba(10,9,8,0.06)', marginBottom: '48px', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, var(--gold) 40%, transparent 100%)',
          opacity: 0.4,
        }} />
      </div>

      {/* Game cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px' }}>
        {[
          {
            id: 'pong' as Game,
            title: 'Pong',
            tag: '1972',
            desc: 'The original. You vs. a machine that knows you too well.',
            controls: '↑ ↓ to move',
            icon: (
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <rect x="4" y="14" width="4" height="20" fill="currentColor" opacity="0.8"/>
                <rect x="40" y="14" width="4" height="20" fill="currentColor" opacity="0.8"/>
                <circle cx="24" cy="24" r="3" fill="currentColor"/>
              </svg>
            ),
          },
          {
            id: 'snake' as Game,
            title: 'Snake',
            tag: '1976',
            desc: 'Eat. Grow. Panic. Repeat until the walls close in.',
            controls: '← → ↑ ↓ to steer',
            icon: (
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <rect x="6" y="22" width="8" height="8" rx="1" fill="currentColor" opacity="0.9"/>
                <rect x="14" y="22" width="8" height="8" rx="1" fill="currentColor" opacity="0.65"/>
                <rect x="22" y="22" width="8" height="8" rx="1" fill="currentColor" opacity="0.45"/>
                <rect x="22" y="14" width="8" height="8" rx="1" fill="currentColor" opacity="0.25"/>
                <circle cx="36" cy="14" r="4" fill="var(--gold)" opacity="0.9"/>
              </svg>
            ),
          },
          {
            id: 'tetris' as Game,
            title: 'Tetris',
            tag: '1984',
            desc: 'Stack it. Clear it. Watch the lines vanish.',
            controls: '← → move · ↑ rotate · Space drop',
            icon: (
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <rect x="10" y="30" width="8" height="8" rx="1" fill="currentColor" opacity="0.8"/>
                <rect x="18" y="30" width="8" height="8" rx="1" fill="currentColor" opacity="0.8"/>
                <rect x="18" y="22" width="8" height="8" rx="1" fill="currentColor" opacity="0.5"/>
                <rect x="26" y="22" width="8" height="8" rx="1" fill="var(--gold)" opacity="0.8"/>
              </svg>
            ),
          },
        ].map(g => (
          <button key={g.id} onClick={() => setGame(g.id)} {...hov}
            style={{
              background: 'none', border: '1px solid rgba(10,9,8,0.1)', cursor: 'none',
              padding: '36px 28px', textAlign: 'left', transition: 'border-color 0.2s, transform 0.2s, background 0.2s',
              position: 'relative', overflow: 'hidden',
            }}
            onMouseOver={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = 'var(--ink)';
              el.style.transform = 'translateY(-4px)';
              el.style.background = 'rgba(10,9,8,0.02)';
            }}
            onMouseOut={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = 'rgba(10,9,8,0.1)';
              el.style.transform = 'none';
              el.style.background = 'none';
            }}>
            <div style={{ color: 'var(--ink)', marginBottom: '20px' }}>{g.icon}</div>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '8px', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--warm-mid)', marginBottom: '8px' }}>{g.tag}</p>
            <h3 style={{ fontFamily: '"Times New Roman", Times, Georgia, serif', fontSize: '28px', fontWeight: 400, color: 'var(--ink)', marginBottom: '12px' }}>{g.title}</h3>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '12px', color: 'rgba(10,9,8,0.45)', lineHeight: 1.7, marginBottom: '20px' }}>{g.desc}</p>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '8px', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(10,9,8,0.25)', marginBottom: '20px' }}>{g.controls}</p>
            <span style={{ fontFamily: '"Times New Roman", Times, Georgia, serif', fontStyle: 'italic', fontSize: '15px', color: 'var(--gold)' }}>Play →</span>
          </button>
        ))}
      </div>

      {/* Flavor text at bottom */}
      <div style={{ marginTop: '64px', borderTop: '1px solid rgba(10,9,8,0.06)', paddingTop: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: '"Times New Roman", Times, Georgia, serif', fontStyle: 'italic', fontSize: '13px', color: 'rgba(10,9,8,0.25)' }}>built with canvas. no libraries.</span>
        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(10,9,8,0.2)' }}>3 games</span>
      </div>
    </div>
  );
}

// ─── Pong ─────────────────────────────────────────────────────────────────────
function PongGame({ onBack }: { onBack: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const S = useRef({ ball:{x:400,y:250,vx:3.8,vy:2.5}, p1:{y:200}, p2:{y:200}, score:{p1:0,p2:0}, keys:{} as Record<string,boolean> });
  useEffect(() => {
    const canvas = canvasRef.current!; const ctx = canvas.getContext('2d')!;
    const W=800,H=500,PH=80,PW=10,SPD=5; const s=S.current;
    const onKey=(e:KeyboardEvent)=>{s.keys[e.key]=e.type==='keydown';e.preventDefault();};
    window.addEventListener('keydown',onKey); window.addEventListener('keyup',onKey);
    const reset=()=>{s.ball={x:400,y:250,vx:(Math.random()>.5?1:-1)*3.8,vy:(Math.random()-.5)*4};};
    let raf:number;
    const loop=()=>{
      if(s.keys['ArrowUp']) s.p1.y=Math.max(0,s.p1.y-SPD);
      if(s.keys['ArrowDown']) s.p1.y=Math.min(H-PH,s.p1.y+SPD);
      s.p2.y+=(s.ball.y-PH/2-s.p2.y)*0.07; s.p2.y=Math.max(0,Math.min(H-PH,s.p2.y));
      s.ball.x+=s.ball.vx; s.ball.y+=s.ball.vy;
      if(s.ball.y<=0||s.ball.y>=H) s.ball.vy*=-1;
      if(s.ball.x<=30+PW&&s.ball.y>=s.p1.y&&s.ball.y<=s.p1.y+PH){s.ball.vx=Math.abs(s.ball.vx)*1.04;s.ball.vy+=(Math.random()-.5)*0.8;}
      if(s.ball.x>=W-30-PW&&s.ball.y>=s.p2.y&&s.ball.y<=s.p2.y+PH){s.ball.vx=-Math.abs(s.ball.vx)*1.04;s.ball.vy+=(Math.random()-.5)*0.8;}
      if(s.ball.x<0){s.score.p2++;reset();} if(s.ball.x>W){s.score.p1++;reset();}
      ctx.fillStyle='#F8F5F0';ctx.fillRect(0,0,W,H);
      ctx.setLineDash([5,8]);ctx.strokeStyle='rgba(10,9,8,0.08)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(W/2,0);ctx.lineTo(W/2,H);ctx.stroke();ctx.setLineDash([]);
      ctx.fillStyle='#0A0908';ctx.fillRect(30,s.p1.y,PW,PH);ctx.fillRect(W-30-PW,s.p2.y,PW,PH);
      ctx.beginPath();ctx.arc(s.ball.x,s.ball.y,5,0,Math.PI*2);ctx.fillStyle='#0A0908';ctx.fill();
      ctx.fillStyle='rgba(10,9,8,0.18)';ctx.font='400 26px "Times New Roman",Georgia';ctx.textAlign='center';
      ctx.fillText(`${s.score.p1}`,W/2-60,42);ctx.fillText(`${s.score.p2}`,W/2+60,42);
      raf=requestAnimationFrame(loop);
    };
    raf=requestAnimationFrame(loop);
    return()=>{cancelAnimationFrame(raf);window.removeEventListener('keydown',onKey);window.removeEventListener('keyup',onKey);};
  },[]);
  return <GameShell title="Pong" hint="Arrow keys to move" onBack={onBack}><canvas ref={canvasRef} width={800} height={500} style={{border:'1px solid rgba(10,9,8,0.1)',maxWidth:'100%'}}/></GameShell>;
}

// ─── Snake ────────────────────────────────────────────────────────────────────
function SnakeGame({ onBack }: { onBack: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const CELL=20,COLS=30,ROWS=25;
  useEffect(() => {
    const canvas=canvasRef.current!;const ctx=canvas.getContext('2d')!;
    let snake=[{x:10,y:10}],dir={x:1,y:0},next={x:1,y:0},food={x:15,y:15},dead=false,score=0;
    const rand=()=>({x:Math.floor(Math.random()*COLS),y:Math.floor(Math.random()*ROWS)});
    const onKey=(e:KeyboardEvent)=>{
      if(e.key==='ArrowUp'&&dir.y!==1)next={x:0,y:-1};
      if(e.key==='ArrowDown'&&dir.y!==-1)next={x:0,y:1};
      if(e.key==='ArrowLeft'&&dir.x!==1)next={x:-1,y:0};
      if(e.key==='ArrowRight'&&dir.x!==-1)next={x:1,y:0};
      if(e.key===' '&&dead){snake=[{x:10,y:10}];dir={x:1,y:0};next={x:1,y:0};dead=false;score=0;food=rand();}
      e.preventDefault();
    };
    window.addEventListener('keydown',onKey);
    const iv=setInterval(()=>{
      if(dead)return;dir=next;
      const h={x:snake[0].x+dir.x,y:snake[0].y+dir.y};
      if(h.x<0||h.x>=COLS||h.y<0||h.y>=ROWS){dead=true;return;}
      if(snake.some(s=>s.x===h.x&&s.y===h.y)){dead=true;return;}
      snake.unshift(h);
      if(h.x===food.x&&h.y===food.y){score++;food=rand();}else snake.pop();
    },115);
    const draw=()=>{
      ctx.fillStyle='#F8F5F0';ctx.fillRect(0,0,COLS*CELL,ROWS*CELL);
      ctx.strokeStyle='rgba(10,9,8,0.04)';ctx.lineWidth=0.5;
      for(let x=0;x<=COLS;x++){ctx.beginPath();ctx.moveTo(x*CELL,0);ctx.lineTo(x*CELL,ROWS*CELL);ctx.stroke();}
      for(let y=0;y<=ROWS;y++){ctx.beginPath();ctx.moveTo(0,y*CELL);ctx.lineTo(COLS*CELL,y*CELL);ctx.stroke();}
      ctx.fillStyle='#B8974A';ctx.beginPath();ctx.arc(food.x*CELL+CELL/2,food.y*CELL+CELL/2,CELL/2-2,0,Math.PI*2);ctx.fill();
      snake.forEach((seg,i)=>{const a=1-(i/snake.length)*0.65;ctx.fillStyle=`rgba(10,9,8,${a})`;ctx.fillRect(seg.x*CELL+1,seg.y*CELL+1,CELL-2,CELL-2);});
      ctx.fillStyle='rgba(10,9,8,0.22)';ctx.font='400 15px "Times New Roman",Georgia';ctx.textAlign='left';ctx.fillText(`${score}`,10,22);
      if(dead){ctx.fillStyle='rgba(248,245,240,0.88)';ctx.fillRect(0,0,COLS*CELL,ROWS*CELL);ctx.fillStyle='#0A0908';ctx.font='400 26px "Times New Roman",Georgia';ctx.textAlign='center';ctx.fillText('Game Over',COLS*CELL/2,ROWS*CELL/2-8);ctx.font='400 12px DM Sans';ctx.fillStyle='rgba(10,9,8,0.4)';ctx.fillText('Space to restart',COLS*CELL/2,ROWS*CELL/2+22);}
      requestAnimationFrame(draw);
    };
    requestAnimationFrame(draw);
    return()=>{clearInterval(iv);window.removeEventListener('keydown',onKey);};
  },[]);
  return <GameShell title="Snake" hint="Arrow keys · Space to restart" onBack={onBack}><canvas ref={canvasRef} width={COLS*CELL} height={ROWS*CELL} style={{border:'1px solid rgba(10,9,8,0.1)',maxWidth:'100%'}}/></GameShell>;
}

// ─── Tetris ───────────────────────────────────────────────────────────────────
function TetrisGame({ onBack }: { onBack: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const CELL=28,COLS=10,ROWS=20;
  const PIECES=[
    {shape:[[1,1,1,1]],color:'rgba(10,9,8,0.72)'},{shape:[[1,1],[1,1]],color:'rgba(184,151,74,0.85)'},
    {shape:[[0,1,0],[1,1,1]],color:'rgba(10,9,8,0.5)'},{shape:[[1,0],[1,1],[0,1]],color:'rgba(184,151,74,0.6)'},
    {shape:[[0,1],[1,1],[1,0]],color:'rgba(10,9,8,0.38)'},{shape:[[1,0],[1,0],[1,1]],color:'rgba(107,94,82,0.75)'},
    {shape:[[0,1],[0,1],[1,1]],color:'rgba(107,94,82,0.5)'},
  ];
  useEffect(()=>{
    const canvas=canvasRef.current!;const ctx=canvas.getContext('2d')!;
    let board:((string|null)[][])=Array.from({length:ROWS},()=>Array(COLS).fill(null));
    let piece=PIECES[Math.floor(Math.random()*PIECES.length)],px=3,py=0,score=0,dead=false;
    const valid=(s:number[][],x:number,y:number)=>{for(let r=0;r<s.length;r++)for(let c=0;c<s[r].length;c++){if(!s[r][c])continue;const nx=x+c,ny=y+r;if(nx<0||nx>=COLS||ny>=ROWS)return false;if(ny>=0&&board[ny][nx])return false;}return true;};
    const place=()=>{piece.shape.forEach((row,r)=>row.forEach((v,c)=>{if(v)board[py+r][px+c]=piece.color;}));board=board.filter(row=>row.some(cell=>!cell));const cl=ROWS-board.length;score+=cl*100;while(board.length<ROWS)board.unshift(Array(COLS).fill(null));piece=PIECES[Math.floor(Math.random()*PIECES.length)];px=3;py=0;if(!valid(piece.shape,px,py))dead=true;};
    const rotate=(s:number[][])=>s[0].map((_,i)=>s.map(row=>row[i]).reverse());
    const onKey=(e:KeyboardEvent)=>{
      if(dead){if(e.key===' '){board=Array.from({length:ROWS},()=>Array(COLS).fill(null));piece=PIECES[Math.floor(Math.random()*PIECES.length)];px=3;py=0;score=0;dead=false;}return;}
      if(e.key==='ArrowLeft'&&valid(piece.shape,px-1,py))px--;
      if(e.key==='ArrowRight'&&valid(piece.shape,px+1,py))px++;
      if(e.key==='ArrowDown'&&valid(piece.shape,px,py+1))py++;
      if(e.key==='ArrowUp'){const r=rotate(piece.shape);if(valid(r,px,py))piece={...piece,shape:r};}
      if(e.key===' '){while(valid(piece.shape,px,py+1))py++;place();}
      e.preventDefault();
    };
    window.addEventListener('keydown',onKey);
    const iv=setInterval(()=>{if(!dead){if(valid(piece.shape,px,py+1))py++;else place();}},480);
    const draw=()=>{
      ctx.fillStyle='#F8F5F0';ctx.fillRect(0,0,COLS*CELL,ROWS*CELL);
      ctx.strokeStyle='rgba(10,9,8,0.04)';ctx.lineWidth=0.5;
      for(let x=0;x<=COLS;x++){ctx.beginPath();ctx.moveTo(x*CELL,0);ctx.lineTo(x*CELL,ROWS*CELL);ctx.stroke();}
      for(let y=0;y<=ROWS;y++){ctx.beginPath();ctx.moveTo(0,y*CELL);ctx.lineTo(COLS*CELL,y*CELL);ctx.stroke();}
      board.forEach((row,r)=>row.forEach((cell,c)=>{if(cell){ctx.fillStyle=cell;ctx.fillRect(c*CELL+1,r*CELL+1,CELL-2,CELL-2);}}));
      let gy=py;while(valid(piece.shape,px,gy+1))gy++;
      piece.shape.forEach((row,r)=>row.forEach((v,c)=>{if(v&&gy+r>=0){ctx.fillStyle='rgba(10,9,8,0.07)';ctx.fillRect((px+c)*CELL+1,(gy+r)*CELL+1,CELL-2,CELL-2);}}));
      piece.shape.forEach((row,r)=>row.forEach((v,c)=>{if(v&&py+r>=0){ctx.fillStyle=piece.color;ctx.fillRect((px+c)*CELL+1,(py+r)*CELL+1,CELL-2,CELL-2);}}));
      ctx.fillStyle='rgba(10,9,8,0.2)';ctx.font='400 13px "Times New Roman",Georgia';ctx.textAlign='left';ctx.fillText(`${score}`,6,18);
      if(dead){ctx.fillStyle='rgba(248,245,240,0.9)';ctx.fillRect(0,0,COLS*CELL,ROWS*CELL);ctx.fillStyle='#0A0908';ctx.font='400 24px "Times New Roman",Georgia';ctx.textAlign='center';ctx.fillText('Game Over',COLS*CELL/2,ROWS*CELL/2-8);ctx.font='400 11px sans-serif';ctx.fillStyle='rgba(10,9,8,0.4)';ctx.fillText('Space to restart',COLS*CELL/2,ROWS*CELL/2+22);}
      requestAnimationFrame(draw);
    };
    requestAnimationFrame(draw);
    return()=>{clearInterval(iv);window.removeEventListener('keydown',onKey);};
  },[]);
  return <GameShell title="Tetris" hint="← → move · ↑ rotate · ↓ soft drop · Space instant drop" onBack={onBack}><canvas ref={canvasRef} width={COLS*CELL} height={ROWS*CELL} style={{border:'1px solid rgba(10,9,8,0.1)'}}/></GameShell>;
}

function GameShell({ title, hint, onBack, children }: { title: string; hint: string; onBack: () => void; children: React.ReactNode }) {
  return (
    <div style={{ display:'flex',flexDirection:'column',alignItems:'center',padding:'120px 48px 80px' }}>
      <div style={{ width:'100%',maxWidth:'860px',display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'32px' }}>
        <button onClick={onBack} style={{ background:'none',border:'none',cursor:'pointer',fontFamily:"'DM Sans',sans-serif",fontSize:'9px',letterSpacing:'2px',textTransform:'uppercase',color:'var(--warm-mid)' }}>← Back</button>
        <span style={{ fontFamily:'"Times New Roman", Times, Georgia, serif',fontSize:'16px',color:'var(--ink)',fontWeight:400 }}>{title}</span>
        <span style={{ width:'48px' }}/>
      </div>
      {children}
      <p style={{ marginTop:'16px',fontFamily:"'DM Sans',sans-serif",fontSize:'9px',letterSpacing:'2px',textTransform:'uppercase',color:'var(--warm-mid)' }}>{hint}</p>
    </div>
  );
}