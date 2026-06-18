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
    color: '#2C3E2D',
  },
  {
    title: 'Receiptify',
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
    color: '#3D2C1E',
  },
];

const stack = ['Python', 'React', 'Java', 'JavaScript', 'TypeScript', 'Rust', 'C', 'Node.js'];

export default function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [tab, setTab] = useState<Tab>('home');
  const [cursor, setCursor] = useState({ x: -200, y: -200 });
  const [cursorHover, setCursorHover] = useState(false);
  const [game, setGame] = useState<Game>('menu');
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
    const move = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  // Browsers block audio autoplay with sound until a user gesture.
  // We try immediately, and also arm a one-time listener on first
  // click/keypress anywhere on the page to start the music quietly.
  useEffect(() => {
    const tryStart = () => {
      if (audioRef.current && !audioStarted) {
        audioRef.current.volume = 0.35;
        audioRef.current.play().then(() => setAudioStarted(true)).catch(() => {});
      }
    };
    tryStart();
    const onFirstInteract = () => { tryStart(); };
    window.addEventListener('click', onFirstInteract, { once: true });
    window.addEventListener('keydown', onFirstInteract, { once: true });
    return () => {
      window.removeEventListener('click', onFirstInteract);
      window.removeEventListener('keydown', onFirstInteract);
    };
  }, [audioStarted]);

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (!audioStarted) {
      audioRef.current.volume = 0.35;
      audioRef.current.play().then(() => setAudioStarted(true)).catch(() => {});
      return;
    }
    audioRef.current.muted = !muted;
    setMuted(!muted);
  };

  const hov = {
    onMouseEnter: () => setCursorHover(true),
    onMouseLeave: () => setCursorHover(false),
  };

  return (
    <div style={{ minHeight: '100vh', width: '100vw', background: '#F8F5F0', overflowX: 'hidden' }}>

      {/* Background lofi/jazz audio — drop an mp3 named lofi.mp3 into /public */}
      <audio ref={audioRef} loop preload="auto">
        <source src="/lofi.mp3" type="audio/mpeg" />
      </audio>

      {/* Jukebox — bottom-left mute toggle */}
      <button onClick={toggleMute} {...hov}
        title={muted ? 'Unmute music' : 'Mute music'}
        style={{
          position: 'fixed', left: '24px', bottom: '24px', zIndex: 200,
          width: '44px', height: '44px', borderRadius: '50%',
          background: 'rgba(248,245,240,0.92)', backdropFilter: 'blur(10px)',
          border: '1px solid rgba(10,9,8,0.12)', cursor: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'border-color 0.2s, transform 0.2s',
          boxShadow: '0 2px 10px rgba(10,9,8,0.06)',
        }}
        onMouseOver={e => { (e.currentTarget as HTMLElement).style.borderColor = '#0A0908'; (e.currentTarget as HTMLElement).style.transform = 'scale(1.06)'; }}
        onMouseOut={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(10,9,8,0.12)'; (e.currentTarget as HTMLElement).style.transform = 'none'; }}>
        {muted || !audioStarted ? (
          // muted / not-yet-started icon
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#0A0908" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          // playing icon — little sound bars, animated via CSS
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#0A0908" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        )}
      </button>

      {/* Custom cursor */}
      <div style={{
        position: 'fixed', left: cursor.x, top: cursor.y, zIndex: 9999,
        width: cursorHover ? 36 : 7, height: cursorHover ? 36 : 7,
        borderRadius: '50%',
        background: cursorHover ? 'transparent' : '#0A0908',
        border: cursorHover ? '1px solid #0A0908' : 'none',
        transform: 'translate(-50%,-50%)',
        transition: 'width 0.16s ease, height 0.16s ease, background 0.16s ease',
        pointerEvents: 'none', mixBlendMode: 'multiply',
      }} />

      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'grid', gridTemplateColumns: '60px 1fr 60px',
        alignItems: 'center',
        padding: '0 48px', height: '56px',
        background: 'rgba(248,245,240,0.95)', backdropFilter: 'blur(14px)',
        borderBottom: '1px solid rgba(10,9,8,0.07)',
      }}>
        {/* "a" — small serif logo mark, clicks home */}
        <button onClick={() => setTab('home')} {...hov}
          style={{
            background: 'none', border: 'none', cursor: 'none',
            fontFamily: '"Times New Roman", Times, serif',
            fontSize: '22px', fontWeight: 400, color: '#0A0908',
            letterSpacing: '-0.5px', lineHeight: 1, userSelect: 'none', padding: 0,
          }}>a</button>

        {/* Nav tabs — center */}
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center', justifyContent: 'center' }}>
          {(['home','projects','playground','arcade'] as Tab[]).map(t => (
            <button key={t} {...hov}
              onClick={() => { setTab(t); if (t === 'arcade') setGame('menu'); }}
              style={{
                background: 'none', border: 'none', cursor: 'none',
                fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500,
                letterSpacing: '2.5px', textTransform: 'uppercase',
                color: tab === t ? '#0A0908' : '#6B5E52',
                borderBottom: tab === t ? '1px solid #0A0908' : '1px solid transparent',
                paddingBottom: '2px', transition: 'all 0.2s', lineHeight: 1,
              }}>
              {t === 'playground' ? 'quiz' : t}
            </button>
          ))}
        </div>

        {/* Social icons */}
        <div style={{ display: 'flex', gap: '14px', alignItems: 'center', justifyContent: 'flex-end' }}>
          {[
            { href: 'https://github.com/ashfaqshaikmohamed', title: 'GitHub', svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg> },
            { href: 'https://www.linkedin.com/in/ashfaqece/', title: 'LinkedIn', svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
            { href: 'mailto:ashfaq.shaikmohamed@rutgers.edu', title: 'Email', svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/></svg> },
          ].map(({ href, title, svg }) => (
            <a key={title} href={href} target={href.startsWith('mailto') ? undefined : '_blank'} title={title} {...hov}
              style={{ color: '#6B5E52', display: 'flex', transition: 'color 0.18s' }}
              onMouseOver={e => (e.currentTarget.style.color = '#0A0908')}
              onMouseOut={e => (e.currentTarget.style.color = '#6B5E52')}>
              {svg}
            </a>
          ))}
        </div>
      </nav>

      {/* ── HOME ─────────────────────────────────────────────────── */}
      {tab === 'home' && (
        <div>

          {/* HERO — name sits between nav and video, then video below */}
          <div style={{
            paddingTop: '56px', /* nav height */
            display: 'flex', flexDirection: 'column',
            alignItems: 'center',
            minHeight: 'auto',
            position: 'relative',
          }}>

            {/* "ashfaq" — centered between nav and video */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              paddingTop: '8px', paddingBottom: '0px',
              width: '100%',
              userSelect: 'none',
              textAlign: 'center',
              lineHeight: 0,
            }}>
              <h1 style={{
                fontFamily: '"Times New Roman", Times, serif',
                fontWeight: 400,
                fontSize: 'clamp(72px, 10vw, 148px)',
                color: '#0A0908',
                letterSpacing: '-3px',
                lineHeight: 1,
                margin: 0, padding: 0,
              }}>
                ashfaq
              </h1>
            </div>

            {/* Video + side labels row — 33% larger */}
            <div style={{ position: 'relative', width: '95vw', maxWidth: '1730px', margin: '0 auto', lineHeight: 0, fontSize: 0 }}>
              {/* Left floating labels */}
              <div style={{
                position: 'absolute', left: '-80px', top: '50%', transform: 'translateY(-50%)',
                display: 'flex', flexDirection: 'column', gap: '12px', zIndex: 3,
              }}>
                {['ECE + Math', 'Rutgers · NB', 'Class of 2028'].map(tag => (
                  <span key={tag} style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: '9px', fontWeight: 500,
                    letterSpacing: '1.8px', textTransform: 'uppercase',
                    color: 'rgba(10,9,8,0.35)', whiteSpace: 'nowrap', display: 'block',
                  }}>{tag}</span>
                ))}
              </div>

              {/* Video */}
              <video ref={videoRef} autoPlay loop muted playsInline
                style={{ width: '100%', height: 'auto', display: 'block', mixBlendMode: 'multiply', margin: '0 auto', verticalAlign: 'top' }}>
                <source src="/usethis.mp4" type="video/mp4" />
              </video>

              {/* Right floating labels */}
              <div style={{
                position: 'absolute', right: '-80px', top: '50%', transform: 'translateY(-50%)',
                display: 'flex', flexDirection: 'column', gap: '12px', zIndex: 3, alignItems: 'flex-end',
              }}>
                {['Full-Stack', 'ML', 'Infra'].map(tag => (
                  <span key={tag} style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: '9px', fontWeight: 500,
                    letterSpacing: '1.8px', textTransform: 'uppercase',
                    color: 'rgba(10,9,8,0.25)', whiteSpace: 'nowrap', display: 'block',
                  }}>{tag}</span>
                ))}
              </div>
            </div>

            {/* Scroll hint */}
            <div style={{
              paddingTop: '8px', paddingBottom: '8px',
              fontFamily: "'DM Sans', sans-serif", fontSize: '8px',
              letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(10,9,8,0.22)',
            }}>scroll</div>
          </div>

          {/* ── ABOUT ─────────────────────────────────────────── */}
          <div style={{ maxWidth: '900px', margin: '0 auto', padding: '24px 48px 0' }}>
            <div style={{ borderTop: '1px solid rgba(10,9,8,0.07)', paddingTop: '40px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>

                <div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9px', letterSpacing: '2.5px', textTransform: 'uppercase', color: '#6B5E52', marginBottom: '28px' }}>About</p>
                  <p style={{
                    fontFamily: '"Times New Roman", Times, serif',
                    fontSize: '21px', color: '#0A0908', lineHeight: 1.75, marginBottom: '20px',
                  }}>
                    Double majoring in ECE and Math at Rutgers — New Brunswick. I like building things that push me, and problems without obvious answers.
                  </p>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '14px', color: 'rgba(10,9,8,0.48)', lineHeight: 1.9, marginBottom: '28px',
                  }}>
                    My work sits across full-stack, machine learning, and infrastructure. Not because I can't pick — because the interesting problems usually touch all three.
                  </p>
                  <a href="mailto:ashfaq.shaikmohamed@rutgers.edu"
                    style={{
                      fontFamily: "'DM Sans', sans-serif", fontSize: '11px',
                      color: '#0A0908', textDecoration: 'none',
                      borderBottom: '1px solid rgba(10,9,8,0.22)', paddingBottom: '2px',
                    }}>
                    ashfaq.shaikmohamed@rutgers.edu
                  </a>
                </div>

                <div style={{ paddingTop: '37px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '13px', marginBottom: '36px' }}>
                    {[
                      { label: 'Degree', value: 'B.Eng ECE & Mathematics' },
                      { label: 'School', value: 'Rutgers University' },
                      { label: 'Class',  value: '2028' },
                      { label: 'Focus',  value: 'Full-Stack · ML · Infra' },
                    ].map(item => (
                      <div key={item.label} style={{ display: 'flex', gap: '20px', alignItems: 'baseline' }}>
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '8px', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(10,9,8,0.28)', minWidth: '48px', flexShrink: 0 }}>{item.label}</span>
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: 'rgba(10,9,8,0.6)' }}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(10,9,8,0.28)', marginBottom: '12px' }}>Stack</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 0' }}>
                    {stack.map((s, i) => (
                      <span key={s} style={{ fontFamily: '"Times New Roman", Times, serif', fontStyle: 'italic', fontSize: '17px', color: 'rgba(10,9,8,0.65)', lineHeight: 1.5 }}>
                        {s}{i < stack.length - 1 ? <span style={{ color: 'rgba(10,9,8,0.18)', margin: '0 6px' }}>·</span> : ''}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* ── PROJECTS (homepage version — big and obvious) ─── */}
          <div style={{ maxWidth: '900px', margin: '56px auto 0', padding: '0 48px' }}>
            <div style={{ borderTop: '1px solid rgba(10,9,8,0.07)', paddingTop: '48px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '40px' }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9px', letterSpacing: '2.5px', textTransform: 'uppercase', color: '#6B5E52' }}>Work</p>
                <button {...hov} onClick={() => setTab('projects')}
                  style={{ background: 'none', border: 'none', cursor: 'none', fontFamily: "'DM Sans', sans-serif", fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: '#6B5E52', borderBottom: '1px solid rgba(107,94,82,0.4)', paddingBottom: '1px' }}>
                  all projects →
                </button>
              </div>

              {/* Big project cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {projects.map((p, i) => (
                  <a key={i} href={p.link} target="_blank"
                    style={{ textDecoration: 'none', display: 'block' }}
                    {...hov}>
                    <div
                      style={{
                        padding: '40px 40px',
                        border: '1px solid rgba(10,9,8,0.08)',
                        background: '#F8F5F0',
                        transition: 'background 0.25s, transform 0.2s',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                      onMouseOver={e => {
                        (e.currentTarget as HTMLElement).style.background = '#F0EBE3';
                        (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
                      }}
                      onMouseOut={e => {
                        (e.currentTarget as HTMLElement).style.background = '#F8F5F0';
                        (e.currentTarget as HTMLElement).style.transform = 'none';
                      }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '10px' }}>
                            <h3 style={{ fontFamily: '"Times New Roman", Times, serif', fontSize: '36px', fontWeight: 400, color: '#0A0908', lineHeight: 1, margin: 0 }}>{p.title}</h3>
                            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: '#6B5E52' }}>{p.year}</span>
                          </div>
                          <p style={{ fontFamily: '"Times New Roman", Times, serif', fontStyle: 'italic', fontSize: '16px', color: '#6B5E52', marginBottom: '14px' }}>{p.tagline}</p>
                          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: 'rgba(10,9,8,0.46)', lineHeight: 1.75, maxWidth: '520px', marginBottom: '20px' }}>{p.desc}</p>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                            {p.tags.slice(0, 4).map(t => (
                              <span key={t} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '8px', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(10,9,8,0.38)', border: '1px solid rgba(10,9,8,0.12)', padding: '3px 9px' }}>{t}</span>
                            ))}
                          </div>
                        </div>
                        <div style={{ paddingLeft: '32px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'flex-end' }}>
                          {p.stats.map(s => (
                            <div key={s.l} style={{ textAlign: 'right' }}>
                              <div style={{ fontFamily: '"Times New Roman", Times, serif', fontSize: '28px', color: '#0A0908', fontWeight: 400, lineHeight: 1 }}>{s.n}</div>
                              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '8px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#6B5E52', marginTop: '4px' }}>{s.l}</div>
                            </div>
                          ))}
                          <div style={{ fontFamily: '"Times New Roman", Times, serif', fontStyle: 'italic', fontSize: '15px', color: '#B8974A', marginTop: '8px', textDecoration: 'underline' }}>visit site →</div>
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div style={{ maxWidth: '900px', margin: '80px auto 0', padding: '32px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(10,9,8,0.06)' }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: '#6B5E52' }}>Ashfaq Shaik-Mohamed · 2025</span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(10,9,8,0.2)' }}>Jersey City, NJ</span>
          </div>
        </div>
      )}

      {/* ── PROJECTS (full page) ─────────────────────────────── */}
      {tab === 'projects' && (
        <div style={{ maxWidth: '860px', margin: '0 auto', padding: '120px 48px 80px' }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9px', letterSpacing: '2.5px', textTransform: 'uppercase', color: '#6B5E52', marginBottom: '56px' }}>Selected Work</p>
          {projects.map((p, i) => (
            <div key={i} style={{ borderTop: '1px solid rgba(10,9,8,0.08)', padding: '52px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                <h2 style={{ fontFamily: '"Times New Roman", Times, serif', fontSize: '38px', fontWeight: 400, color: '#0A0908', letterSpacing: '-0.5px' }}>{p.title}</h2>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: '#6B5E52' }}>{p.year}</span>
              </div>
              <p style={{ fontFamily: '"Times New Roman", Times, serif', fontStyle: 'italic', fontSize: '15px', color: '#6B5E52', marginBottom: '20px' }}>{p.tagline}</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(10,9,8,0.55)', lineHeight: 1.9, marginBottom: '24px' }}>{p.desc}</p>
              <ul style={{ listStyle: 'none', marginBottom: '28px' }}>
                {p.bullets.map((b, j) => (
                  <li key={j} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: 'rgba(10,9,8,0.5)', lineHeight: 1.8, marginBottom: '8px', paddingLeft: '18px', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: '#B8974A' }}>—</span>{b}
                  </li>
                ))}
              </ul>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', borderTop: '1px solid rgba(10,9,8,0.06)', borderBottom: '1px solid rgba(10,9,8,0.06)', padding: '20px 0', marginBottom: '24px' }}>
                {p.stats.map(s => (
                  <div key={s.l}>
                    <div style={{ fontFamily: '"Times New Roman", Times, serif', fontSize: '28px', fontWeight: 400, color: '#0A0908' }}>{s.n}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '8px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#6B5E52', marginTop: '4px' }}>{s.l}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                {p.tags.map(t => (
                  <span key={t} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '8px', fontWeight: 500, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(10,9,8,0.38)', border: '1px solid rgba(10,9,8,0.13)', padding: '4px 10px' }}>{t}</span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '24px' }}>
                <a href={p.link} target="_blank" {...hov} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: '#0A0908', textDecoration: 'none', borderBottom: '1px solid #0A0908', paddingBottom: '2px' }}>Live →</a>
                <a href={p.github} target="_blank" {...hov} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: '#6B5E52', textDecoration: 'none', borderBottom: '1px solid #6B5E52', paddingBottom: '2px' }}>GitHub</a>
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

// ─── Playground — "This or That" opinion machine ─────────────────────────────
function PlaygroundTab({ setCursorHover }: { setCursorHover: (v: boolean) => void }) {
  const hov = { onMouseEnter: () => setCursorHover(true), onMouseLeave: () => setCursorHover(false) };

  // Ashfaq's actual answers are marked — used for match scoring
  const questions = [
    { q: 'What year did Ashfaq start at Rutgers?', a: '2024', b: '2023', ans: 'a' },
    { q: 'Which of Ashfaq\'s majors came first?', a: 'Math', b: 'ECE', ans: 'b' },
    { q: 'What\'s Ashfaq\'s go-to language for backend work?', a: 'Python', b: 'Java', ans: 'a' },
    { q: 'CityPulse or Receipt — which shipped first?', a: 'CityPulse', b: 'Receipt', ans: 'b' },
    { q: 'Does Ashfaq prefer building solo or with a team?', a: 'Solo', b: 'Team', ans: 'b' },
    { q: 'What\'s the AI model powering CityPulse\'s image triage?', a: 'GPT-4V', b: 'Gemini Flash', ans: 'b' },
    { q: 'Does Ashfaq care more about clean UI or clean architecture?', a: 'Clean UI', b: 'Clean architecture', ans: 'b' },
    { q: 'What type of problems does Ashfaq gravitate toward?', a: 'Well-defined', b: 'No obvious answer', ans: 'b' },
    { q: 'What does Receipt use for its OCR?', a: 'Tesseract.js', b: 'AWS Textract', ans: 'a' },
    { q: 'What\'s Ashfaq\'s hometown?', a: 'Newark', b: 'Jersey City', ans: 'b' },
    { q: 'Which does Ashfaq lean toward: ML or infrastructure?', a: 'ML', b: 'Infrastructure', ans: 'a' },
    { q: 'Does Ashfaq write the docs or skip them?', a: 'Writes them', b: 'Skips them', ans: 'a' },
  ];

  type Vote = { a: number; b: number };
  const [votes, setVotes] = useState<Vote[]>(() => questions.map(() => ({ a: 0, b: 0 })));
  const [answered, setAnswered] = useState<(null | 'a' | 'b')[]>(() => questions.map(() => null));
  const [revealed, setRevealed] = useState<boolean[]>(() => questions.map(() => false));
  const [activeQ, setActiveQ] = useState(0);

  // Results intentionally do NOT persist across a page refresh — fresh state every visit/reload.

  const vote = (qi: number, side: 'a' | 'b') => {
    if (answered[qi]) return;
    const newVotes = votes.map((v, i) => i === qi ? { ...v, [side]: v[side] + 1 } : v);
    const newAnswered = answered.map((a, i) => i === qi ? side : a);
    const newRevealed = revealed.map((r, i) => i === qi ? true : r);
    setVotes(newVotes);
    setAnswered(newAnswered);
    setRevealed(newRevealed);
    // advance to next unanswered
    const nextUnanswered = newAnswered.findIndex((a, i) => a === null && i !== qi);
    if (nextUnanswered !== -1) setTimeout(() => setActiveQ(nextUnanswered), 400);
  };

  const total = (v: Vote) => v.a + v.b || 1;
  const pct = (n: number, v: Vote) => Math.round((n / total(v)) * 100);
  const allDone = answered.every(a => a !== null);

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '120px 48px 80px' }}>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9px', letterSpacing: '2.5px', textTransform: 'uppercase', color: '#6B5E52', marginBottom: '16px' }}>Quiz</p>
      <h2 style={{ fontFamily: '"Times New Roman", Times, serif', fontSize: '36px', fontWeight: 400, color: '#0A0908', marginBottom: '10px', letterSpacing: '-0.5px' }}>
        {allDone ? 'results.' : 'how well do you know me?'}
      </h2>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: 'rgba(10,9,8,0.4)', marginBottom: '56px', lineHeight: 1.7 }}>
        {allDone
          ? 'Here\'s how your answers stack up against mine.'
          : '12 questions about me. Pick what you think is right — then see if you got it.'}
      </p>

      {/* Tab selector */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '40px', flexWrap: 'wrap' }}>
        {questions.map((q, i) => (
          <button key={i} onClick={() => setActiveQ(i)} {...hov}
            style={{
              background: activeQ === i ? '#0A0908' : answered[i] ? 'rgba(10,9,8,0.06)' : 'none',
              border: `1px solid ${activeQ === i ? '#0A0908' : 'rgba(10,9,8,0.12)'}`,
              cursor: 'none', borderRadius: '2px',
              fontFamily: "'DM Sans', sans-serif", fontSize: '9px', letterSpacing: '1px',
              color: activeQ === i ? '#F8F5F0' : answered[i] ? 'rgba(10,9,8,0.35)' : 'rgba(10,9,8,0.5)',
              padding: '5px 11px', transition: 'all 0.15s',
            }}>{i + 1}</button>
        ))}
      </div>

      {/* Active question */}
      {questions.map((q, qi) => qi !== activeQ ? null : (
        <div key={qi} style={{ animation: 'fadeUp 0.25s ease' }}>
          <p style={{ fontFamily: '"Times New Roman", Times, serif', fontSize: '26px', color: '#0A0908', marginBottom: '32px', lineHeight: 1.3 }}>{q.q}</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '32px' }}>
            {(['a','b'] as const).map(side => {
              const label = side === 'a' ? q.a : q.b;
              const count = side === 'a' ? votes[qi].a : votes[qi].b;
              const percent = pct(count, votes[qi]);
              const isMyPick = answered[qi] === side;
              const isOtherPick = answered[qi] && answered[qi] !== side;
              return (
                <button key={side} onClick={() => vote(qi, side)} {...hov}
                  disabled={!!answered[qi]}
                  style={{
                    background: 'none', cursor: answered[qi] ? 'default' : 'none',
                    border: `1px solid ${isMyPick ? '#0A0908' : 'rgba(10,9,8,0.12)'}`,
                    padding: '28px 24px', textAlign: 'left',
                    transition: 'all 0.2s', position: 'relative', overflow: 'hidden',
                    opacity: isOtherPick ? 0.5 : 1,
                  }}
                  onMouseOver={e => { if (!answered[qi]) (e.currentTarget as HTMLElement).style.borderColor = '#0A0908'; }}
                  onMouseOut={e => { if (!answered[qi]) (e.currentTarget as HTMLElement).style.borderColor = 'rgba(10,9,8,0.12)'; }}>

                  {/* fill bar */}
                  {revealed[qi] && (
                    <div style={{
                      position: 'absolute', left: 0, top: 0, bottom: 0,
                      width: `${percent}%`,
                      background: isMyPick ? 'rgba(10,9,8,0.06)' : 'rgba(10,9,8,0.03)',
                      transition: 'width 0.6s ease',
                    }} />
                  )}

                  <span style={{ fontFamily: '"Times New Roman", Times, serif', fontSize: '22px', color: '#0A0908', display: 'block', marginBottom: '8px', position: 'relative', zIndex: 1 }}>{label}</span>
                  {revealed[qi] && (
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9px', letterSpacing: '1.5px', textTransform: 'uppercase', color: side === (questions[qi] as any).ans ? '#2C7A2C' : '#6B5E52', position: 'relative', zIndex: 1 }}>
                      {side === (questions[qi] as any).ans ? '✓ correct' : '✗ wrong'} · {percent}%
                    </span>
                  )}
                  {!revealed[qi] && (
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9px', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(10,9,8,0.25)', position: 'relative', zIndex: 1 }}>pick this</span>
                  )}
                </button>
              );
            })}
          </div>
          {answered[qi] && (
            <p style={{ fontFamily: '"Times New Roman", Times, serif', fontStyle: 'italic', fontSize: '14px', color: answered[qi] === (q as any).ans ? '#2C7A2C' : '#8B2A2A' }}>
              {answered[qi] === (q as any).ans ? `${answered[qi] === 'a' ? q.a : q.b} — you got it.` : `${answered[qi] === 'a' ? q.a : q.b} — not quite.`}
              {activeQ < questions.length - 1 && !allDone && (
                <button onClick={() => {
                  const next = answered.findIndex((a, i) => a === null);
                  if (next !== -1) setActiveQ(next);
                }} {...hov} style={{ background: 'none', border: 'none', cursor: 'none', fontFamily: "'DM Sans', sans-serif", fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: '#6B5E52', marginLeft: '16px', borderBottom: '1px solid #6B5E52', paddingBottom: '1px' }}>
                  next →
                </button>
              )}
            </p>
          )}
        </div>
      ))}

      {/* Score card */}
      {allDone && (() => {
        const correct = questions.filter((q, i) => answered[i] === (q as any).ans).length;
        const pctMatch = Math.round((correct / questions.length) * 100);
        const label = correct >= 10 ? 'You basically know me.' : correct >= 7 ? 'Solid. You\'ve been paying attention.' : correct >= 4 ? 'A few gaps. Worth exploring.' : 'We\'d have to properly meet.';
        return (
          <div style={{ marginTop: '64px', borderTop: '1px solid rgba(10,9,8,0.08)', paddingTop: '48px' }}>
            <div style={{ marginBottom: '48px' }}>
              <p style={{ fontFamily: '"Times New Roman", Times, serif', fontSize: '72px', fontWeight: 400, color: '#0A0908', lineHeight: 1, margin: '0 0 8px' }}>{pctMatch}<span style={{ fontSize: '28px' }}>%</span></p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: '#6B5E52', marginBottom: '12px' }}>match with Ashfaq</p>
              <p style={{ fontFamily: '"Times New Roman", Times, serif', fontStyle: 'italic', fontSize: '17px', color: '#6B5E52' }}>{label}</p>
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9px', letterSpacing: '2.5px', textTransform: 'uppercase', color: '#6B5E52', marginBottom: '20px' }}>breakdown</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {questions.map((q, i) => {
                const isCorrect = answered[i] === (q as any).ans;
                const myPick = answered[i] === 'a' ? q.a : q.b;
                const rightAnswer = (q as any).ans === 'a' ? q.a : q.b;
                return (
                  <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'baseline' }}>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '8px', color: 'rgba(10,9,8,0.28)', minWidth: '220px', lineHeight: 1.5 }}>{q.q}</span>
                    <span style={{ fontFamily: '"Times New Roman", Times, serif', fontStyle: 'italic', fontSize: '14px', color: isCorrect ? '#2C7A2C' : '#8B2A2A' }}>{myPick}</span>
                    {!isCorrect && <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '8px', color: 'rgba(10,9,8,0.3)', letterSpacing: '1px' }}>→ {rightAnswer}</span>}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })()}
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
    <div style={{ maxWidth: '860px', margin: '0 auto', padding: '120px 48px 80px' }}>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9px', letterSpacing: '2.5px', textTransform: 'uppercase', color: '#6B5E52', marginBottom: '16px' }}>Arcade</p>
      <h2 style={{ fontFamily: '"Times New Roman", Times, serif', fontSize: '42px', fontWeight: 400, color: '#0A0908', marginBottom: '12px', letterSpacing: '-0.5px' }}>take a break.</h2>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: 'rgba(10,9,8,0.4)', lineHeight: 1.7, maxWidth: '480px', marginBottom: '56px' }}>
        three games. no scores saved. no pressure. built from scratch, right here in the browser.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }}>
        {[
          { id: 'pong' as Game, title: 'Pong', tag: '1972', desc: 'You vs. a machine that knows you too well.', controls: '↑ ↓ to move',
            icon: <svg width="40" height="40" viewBox="0 0 48 48" fill="none"><rect x="4" y="14" width="4" height="20" fill="currentColor" opacity="0.8"/><rect x="40" y="14" width="4" height="20" fill="currentColor" opacity="0.8"/><circle cx="24" cy="24" r="3" fill="currentColor"/></svg> },
          { id: 'snake' as Game, title: 'Snake', tag: '1976', desc: 'Eat. Grow. Panic. Repeat.', controls: 'Arrow keys',
            icon: <svg width="40" height="40" viewBox="0 0 48 48" fill="none"><rect x="6" y="22" width="8" height="8" rx="1" fill="currentColor" opacity="0.9"/><rect x="14" y="22" width="8" height="8" rx="1" fill="currentColor" opacity="0.65"/><rect x="22" y="22" width="8" height="8" rx="1" fill="currentColor" opacity="0.45"/><rect x="22" y="14" width="8" height="8" rx="1" fill="currentColor" opacity="0.25"/><circle cx="36" cy="14" r="4" fill="#B8974A" opacity="0.9"/></svg> },
          { id: 'tetris' as Game, title: 'Tetris', tag: '1984', desc: 'Stack it. Clear it. Watch lines vanish.', controls: '← → ↑ Space',
            icon: <svg width="40" height="40" viewBox="0 0 48 48" fill="none"><rect x="10" y="30" width="8" height="8" rx="1" fill="currentColor" opacity="0.8"/><rect x="18" y="30" width="8" height="8" rx="1" fill="currentColor" opacity="0.8"/><rect x="18" y="22" width="8" height="8" rx="1" fill="currentColor" opacity="0.5"/><rect x="26" y="22" width="8" height="8" rx="1" fill="#B8974A" opacity="0.8"/></svg> },
        ].map(g => (
          <button key={g.id} onClick={() => setGame(g.id)} {...hov}
            style={{ background: 'none', border: '1px solid rgba(10,9,8,0.1)', cursor: 'none', padding: '32px 24px', textAlign: 'left', transition: 'border-color 0.2s, transform 0.2s, background 0.2s' }}
            onMouseOver={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor='#0A0908'; el.style.transform='translateY(-3px)'; el.style.background='rgba(10,9,8,0.015)'; }}
            onMouseOut={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor='rgba(10,9,8,0.1)'; el.style.transform='none'; el.style.background='none'; }}>
            <div style={{ color: '#0A0908', marginBottom: '18px' }}>{g.icon}</div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '8px', letterSpacing: '2.5px', textTransform: 'uppercase', color: '#6B5E52', marginBottom: '6px' }}>{g.tag}</p>
            <h3 style={{ fontFamily: '"Times New Roman", Times, serif', fontSize: '26px', fontWeight: 400, color: '#0A0908', marginBottom: '10px' }}>{g.title}</h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: 'rgba(10,9,8,0.45)', lineHeight: 1.7, marginBottom: '16px' }}>{g.desc}</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '8px', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(10,9,8,0.22)', marginBottom: '16px' }}>{g.controls}</p>
            <span style={{ fontFamily: '"Times New Roman", Times, serif', fontStyle: 'italic', fontSize: '14px', color: '#B8974A' }}>Play →</span>
          </button>
        ))}
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
    <div style={{ display:'flex',flexDirection:'column',alignItems:'center',padding:'100px 48px 80px' }}>
      <div style={{ width:'100%',maxWidth:'860px',display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'32px' }}>
        <button onClick={onBack} style={{ background:'none',border:'none',cursor:'pointer',fontFamily:"'DM Sans',sans-serif",fontSize:'9px',letterSpacing:'2px',textTransform:'uppercase',color:'#6B5E52' }}>← Back</button>
        <span style={{ fontFamily:'"Times New Roman", Times, serif',fontSize:'16px',color:'#0A0908',fontWeight:400 }}>{title}</span>
        <span style={{ width:'48px' }}/>
      </div>
      {children}
      <p style={{ marginTop:'16px',fontFamily:"'DM Sans',sans-serif",fontSize:'9px',letterSpacing:'2px',textTransform:'uppercase',color:'#6B5E52' }}>{hint}</p>
    </div>
  );
}