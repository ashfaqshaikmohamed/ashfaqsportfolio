import { useState, useRef, useEffect, useCallback } from 'react';

// ─── Data ───────────────────────────────────────────────────────────────────

type Tab = 'home' | 'projects' | 'playground' | 'relax';
type Game = 'menu' | 'pong' | 'snake' | 'tetris';

const projects = [
  {
    title: 'CityPulse',
    tagline: 'Civic accountability, city-scale.',
    desc: 'Full-stack platform that ingests live NYC 311 complaint data, clusters geospatial incidents with PostGIS, and runs Gemini Vision AI to auto-triage citizen photo reports — turning raw city noise into actionable civic intelligence.',
    bullets: [
      'Architected async FastAPI + Celery/Redis task queue for non-blocking 311 API ingestion across 50K+ records',
      'Integrated Gemini 1.5 Flash Vision to auto-classify photo submissions, cutting manual review to zero',
    ],
    tags: ['Next.js', 'FastAPI', 'PostgreSQL', 'PostGIS', 'Redis', 'Docker', 'Gemini AI'],
    link: 'https://citypulsebyash.vercel.app/',
    github: 'https://github.com/ashfaqshaikmohamed/CitypulseApp',
    year: '2025',
    stat1: '50K+', stat1label: 'records ingested',
    stat2: '~0ms', stat2label: 'manual triage',
    stat3: '8', stat3label: 'Docker services',
  },
  {
    title: 'Receipt',
    tagline: 'Split bills. No drama.',
    desc: 'On-device OCR bill-splitter that uses Tesseract.js to parse itemized receipts directly in the browser — no server, no uploads, no accounts. Detects quantities, tip, and tax, then splits the check with one tap.',
    bullets: [
      'Built Tesseract.js OCR pipeline with quantity-prefix detection ("2x Steak") and tip/tax auto-extraction',
      'Deployed on Vercel with Firebase Auth, Framer Motion animations, and zero-backend processing for full privacy',
    ],
    tags: ['React', 'TypeScript', 'Tesseract.js', 'Firebase', 'Framer Motion', 'Tailwind'],
    link: 'https://receiptifybyashfaq.vercel.app/',
    github: 'https://github.com/ashfaqshaikmohamed/receipt-project',
    year: '2025',
    stat1: '100%', stat1label: 'on-device OCR',
    stat2: '<2s', stat2label: 'parse time',
    stat3: '0', stat3label: 'servers needed',
  },
];

const wordDescriptions: Record<string, string> = {
  builder: 'Ships products people actually use.',
  engineer: 'CS + Math @ Rutgers Honors College.',
  thinker: 'Drawn to open-ended problems.',
  maker: 'Hardware to full-stack, whatever it takes.',
  curious: 'Currently deep in AI/ML and civic tech.',
};

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [tab, setTab] = useState<Tab>('home');
  const [cursor, setCursor] = useState({ x: -200, y: -200 });
  const [cursorHover, setCursorHover] = useState(false);
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);
  const [game, setGame] = useState<Game>('menu');

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
    const move = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  const hover = { onMouseEnter: () => setCursorHover(true), onMouseLeave: () => setCursorHover(false) };

  return (
    <div style={{ minHeight: '100vh', width: '100vw', background: 'var(--cream)', overflowX: 'hidden' }}>

      {/* Custom cursor */}
      <div style={{
        position: 'fixed', left: cursor.x, top: cursor.y, zIndex: 9999,
        width: cursorHover ? 40 : 8, height: cursorHover ? 40 : 8,
        borderRadius: '50%',
        background: cursorHover ? 'transparent' : 'var(--ink)',
        border: cursorHover ? '1px solid var(--ink)' : 'none',
        transform: 'translate(-50%,-50%)',
        transition: 'width 0.18s ease, height 0.18s ease, background 0.18s ease',
        pointerEvents: 'none', mixBlendMode: 'multiply',
      }} />

      {/* ── NAV ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '22px 48px',
        background: 'rgba(248,245,240,0.88)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(10,9,8,0.06)',
      }}>
        <span style={{ fontFamily: 'Georgia, Times New Roman, serif', fontSize: '15px', color: 'var(--ink)', letterSpacing: '0.5px' }}>
          ashfaq
        </span>
        <div style={{ display: 'flex', gap: '36px' }}>
          {(['home','projects','playground','relax'] as Tab[]).map(t => (
            <button key={t} {...hover} onClick={() => { setTab(t); if (t === 'relax') setGame('menu'); }}
              style={{
                background: 'none', border: 'none', cursor: 'none',
                fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500,
                letterSpacing: '2.5px', textTransform: 'uppercase',
                color: tab === t ? 'var(--ink)' : 'var(--warm-mid)',
                borderBottom: tab === t ? '1px solid var(--ink)' : '1px solid transparent',
                paddingBottom: '2px', transition: 'all 0.2s',
              }}>
              {t}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '18px', alignItems: 'center' }}>
          <a href="https://github.com/ashfaqshaikmohamed" target="_blank" {...hover}
            style={{ color: 'var(--warm-mid)', textDecoration: 'none', transition: 'color 0.2s', display: 'flex' }}
            onMouseOver={e=>(e.currentTarget.style.color='var(--ink)')}
            onMouseOut={e=>(e.currentTarget.style.color='var(--warm-mid)')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
          </a>
          <a href="https://www.linkedin.com/in/ashfaqece/" target="_blank" {...hover}
            style={{ color: 'var(--warm-mid)', textDecoration: 'none', transition: 'color 0.2s', display: 'flex' }}
            onMouseOver={e=>(e.currentTarget.style.color='var(--ink)')}
            onMouseOut={e=>(e.currentTarget.style.color='var(--warm-mid)')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
          <a href="mailto:shaikmohamedashfaq@gmail.com" {...hover}
            style={{ color: 'var(--warm-mid)', textDecoration: 'none', transition: 'color 0.2s', display: 'flex' }}
            onMouseOver={e=>(e.currentTarget.style.color='var(--ink)')}
            onMouseOut={e=>(e.currentTarget.style.color='var(--warm-mid)')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/></svg>
          </a>
        </div>
      </nav>

      {/* ── HOME ── */}
      {tab === 'home' && (
        <div style={{ paddingTop: '70px' }}>

          {/* Hero: name + image stacked, truly centered */}
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', minHeight: 'calc(100vh - 70px)',
            position: 'relative',
          }}>
            {/* Name */}
            <h1 style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontWeight: 400, fontStyle: 'normal',
              fontSize: 'clamp(72px, 14vw, 200px)',
              color: 'var(--ink)', letterSpacing: '-2px',
              lineHeight: 1, userSelect: 'none',
              marginBottom: '0px', zIndex: 2, position: 'relative',
            }}>
              ashfaq
            </h1>

            {/* Image / Video — centered, 70% width */}
            <div style={{ width: '70%', maxWidth: '900px', zIndex: 1 }}>
              <video
                ref={videoRef} autoPlay loop muted playsInline
                style={{ width: '100%', height: 'auto', display: 'block', mixBlendMode: 'multiply' }}>
                <source src="/background.webm" type="video/webm" />
                <source src="/background.mp4" type="video/mp4" />
              </video>
            </div>

            {/* Scroll hint */}
            <div style={{
              position: 'absolute', bottom: '32px',
              fontFamily: "'DM Sans', sans-serif", fontSize: '9px',
              letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--warm-mid)',
              animation: 'fadeUp 1s ease 0.8s both',
            }}>
              scroll
            </div>
          </div>

          {/* ── Info strip (like Christian's) ── */}
          <div style={{
            maxWidth: '900px', margin: '0 auto', padding: '80px 40px',
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px',
            borderTop: '1px solid rgba(10,9,8,0.08)',
          }}>
            <div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9px', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--warm-mid)', marginBottom: '16px' }}>Status</p>
              <p style={{ fontFamily: 'Georgia, serif', fontSize: '15px', color: 'var(--ink)', lineHeight: 1.7 }}>
                Sophomore · Rutgers Honors College<br/>
                CS + Mathematics · GPA 3.90<br/>
                SWE Intern @ Google · Summer 2025
              </p>
            </div>
            <div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9px', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--warm-mid)', marginBottom: '16px' }}>Currently building with</p>
              <p style={{ fontFamily: 'Georgia, serif', fontSize: '15px', color: 'var(--ink)', lineHeight: 1.7 }}>
                Next.js · FastAPI · PostgreSQL<br/>
                Redis · Docker · Gemini AI<br/>
                React · TypeScript · Firebase
              </p>
            </div>
          </div>

          {/* ── About ── */}
          <div style={{ maxWidth: '660px', margin: '0 auto', padding: '0 40px 80px' }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9px', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--warm-mid)', marginBottom: '28px' }}>About</p>
            <p style={{ fontFamily: 'Georgia, serif', fontSize: '17px', color: 'var(--ink)', lineHeight: 1.85, marginBottom: '20px' }}>
              I build things that are actually useful — products that solve problems I've personally run into, built with the kind of care that makes them feel inevitable.
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(10,9,8,0.55)', lineHeight: 1.85 }}>
              Drawn to open-ended challenges. Lately exploring civic tech, AI/ML infrastructure, and consumer-facing products with real impact. When I'm not building, I'm thinking about what to build next.
            </p>
          </div>

          {/* ── Word hover game ── */}
          <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 40px 80px', borderTop: '1px solid rgba(10,9,8,0.08)', paddingTop: '60px' }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9px', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--warm-mid)', marginBottom: '32px' }}>Who is Ashfaq?</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px 24px', marginBottom: '32px' }}>
              {Object.keys(wordDescriptions).map(w => (
                <span key={w} {...hover}
                  onMouseEnter={() => { setHoveredWord(w); setCursorHover(true); }}
                  onMouseLeave={() => { setHoveredWord(null); setCursorHover(false); }}
                  style={{
                    fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '28px',
                    fontWeight: hoveredWord === w ? 700 : 400,
                    color: hoveredWord === w ? 'var(--ink)' : 'rgba(10,9,8,0.18)',
                    cursor: 'none', transition: 'all 0.2s ease', userSelect: 'none',
                  }}>
                  {w}
                </span>
              ))}
            </div>
            <div style={{ minHeight: '28px' }}>
              {hoveredWord && (
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'var(--ink)', animation: 'fadeUp 0.15s ease' }}>
                  {wordDescriptions[hoveredWord]}
                </p>
              )}
            </div>
          </div>

          {/* ── Stats bar ── */}
          <div style={{
            borderTop: '1px solid rgba(10,9,8,0.08)', borderBottom: '1px solid rgba(10,9,8,0.08)',
            padding: '48px 40px',
            display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', maxWidth: '900px', margin: '0 auto 80px',
          }}>
            {[
              { n: '50K+', l: 'Records ingested' },
              { n: '3.90', l: 'GPA · Rutgers Honors' },
              { n: '2', l: 'Live products' },
              { n: '∞', l: 'Problems left to solve' },
            ].map(s => (
              <div key={s.l} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: '36px', color: 'var(--ink)', lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--warm-mid)', marginTop: '8px' }}>{s.l}</div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div style={{ textAlign: 'center', padding: '40px', fontFamily: "'DM Sans', sans-serif", fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--warm-mid)' }}>
            Portfolio — 2025 · Ashfaq Shaik-Mohamed
          </div>
        </div>
      )}

      {/* ── PROJECTS ── */}
      {tab === 'projects' && (
        <div style={{ paddingTop: '70px', maxWidth: '860px', margin: '0 auto', padding: '120px 40px 80px' }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9px', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--warm-mid)', marginBottom: '60px' }}>Selected Work</p>
          {projects.map((p, i) => (
            <div key={i} style={{ borderTop: '1px solid rgba(10,9,8,0.08)', padding: '48px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '32px', fontWeight: 400, color: 'var(--ink)' }}>{p.title}</h2>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9px', letterSpacing: '2px', color: 'var(--warm-mid)' }}>{p.year}</span>
              </div>
              <p style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '15px', color: 'var(--warm-mid)', marginBottom: '24px' }}>{p.tagline}</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(10,9,8,0.6)', lineHeight: 1.85, marginBottom: '24px' }}>{p.desc}</p>
              <ul style={{ listStyle: 'none', marginBottom: '28px' }}>
                {p.bullets.map((b, j) => (
                  <li key={j} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: 'rgba(10,9,8,0.55)', lineHeight: 1.75, marginBottom: '8px', paddingLeft: '16px', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: 'var(--gold)' }}>—</span>{b}
                  </li>
                ))}
              </ul>
              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px', marginBottom: '28px', borderTop: '1px solid rgba(10,9,8,0.06)', borderBottom: '1px solid rgba(10,9,8,0.06)', padding: '20px 0' }}>
                {[{n:p.stat1,l:p.stat1label},{n:p.stat2,l:p.stat2label},{n:p.stat3,l:p.stat3label}].map(s => (
                  <div key={s.l}>
                    <div style={{ fontFamily: 'Georgia, serif', fontSize: '24px', color: 'var(--ink)' }}>{s.n}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9px', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--warm-mid)', marginTop: '4px' }}>{s.l}</div>
                  </div>
                ))}
              </div>
              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                {p.tags.map(t => (
                  <span key={t} style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: '9px', fontWeight: 500,
                    letterSpacing: '1.5px', textTransform: 'uppercase',
                    color: 'rgba(10,9,8,0.4)', border: '1px solid rgba(10,9,8,0.15)',
                    padding: '4px 10px', borderRadius: '2px',
                  }}>{t}</span>
                ))}
              </div>
              {/* Links */}
              <div style={{ display: 'flex', gap: '24px' }}>
                <a href={p.link} target="_blank" {...hover}
                  style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--ink)', textDecoration: 'none', borderBottom: '1px solid var(--ink)', paddingBottom: '2px' }}>
                  Live →
                </a>
                <a href={p.github} target="_blank" {...hover}
                  style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--warm-mid)', textDecoration: 'none', borderBottom: '1px solid var(--warm-mid)', paddingBottom: '2px' }}>
                  GitHub
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── PLAYGROUND ── */}
      {tab === 'playground' && (
        <PlaygroundTab hover={hover} setCursorHover={setCursorHover} />
      )}

      {/* ── RELAX ── */}
      {tab === 'relax' && (
        <RelaxTab game={game} setGame={setGame} hover={hover} setCursorHover={setCursorHover} />
      )}

    </div>
  );
}

// ─── Playground Tab ───────────────────────────────────────────────────────────

function PlaygroundTab({ hover, setCursorHover }: { hover: any; setCursorHover: (v: boolean) => void }) {
  const [words, setWords] = useState<{ text: string; x: number; y: number; size: number; opacity: number }[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('portfolio-words');
    if (saved) setWords(JSON.parse(saved));
  }, []);

  const addWord = () => {
    const trimmed = input.trim().split(/\s+/)[0];
    if (!trimmed) return;
    const newWord = {
      text: trimmed,
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 80,
      size: 14 + Math.random() * 28,
      opacity: 0.25 + Math.random() * 0.6,
    };
    const next = [...words, newWord];
    setWords(next);
    localStorage.setItem('portfolio-words', JSON.stringify(next));
    setInput('');
  };

  return (
    <div style={{ paddingTop: '70px', maxWidth: '900px', margin: '0 auto', padding: '120px 40px 80px' }}>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9px', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--warm-mid)', marginBottom: '16px' }}>Playground</p>
      <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '28px', fontWeight: 400, color: 'var(--ink)', marginBottom: '8px' }}>Leave a mark.</h2>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: 'rgba(10,9,8,0.45)', marginBottom: '40px' }}>Drop one word. It lives here with everyone else who visited.</p>

      {/* Word cloud canvas */}
      <div style={{
        position: 'relative', width: '100%', height: '340px',
        border: '1px solid rgba(10,9,8,0.08)', borderRadius: '2px',
        overflow: 'hidden', background: 'rgba(10,9,8,0.015)', marginBottom: '28px',
      }}>
        {words.map((w, i) => (
          <span key={i} style={{
            position: 'absolute', left: `${w.x}%`, top: `${w.y}%`,
            fontFamily: 'Georgia, serif', fontSize: `${w.size}px`, fontStyle: 'italic',
            color: `rgba(10,9,8,${w.opacity})`, userSelect: 'none', whiteSpace: 'nowrap',
            transform: 'translate(-50%,-50%)',
          }}>{w.text}</span>
        ))}
        {words.length === 0 && (
          <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '16px', color: 'rgba(10,9,8,0.2)' }}>
            be the first.
          </p>
        )}
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value.split(' ')[0])}
          onKeyDown={e => e.key === 'Enter' && addWord()}
          maxLength={20}
          placeholder="one word..."
          style={{
            fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '15px',
            background: 'none', border: 'none', borderBottom: '1px solid rgba(10,9,8,0.2)',
            outline: 'none', color: 'var(--ink)', padding: '8px 0', width: '200px',
            cursor: 'text',
          }}
        />
        <button onClick={addWord} {...hover}
          style={{
            background: 'none', border: '1px solid var(--ink)', cursor: 'none',
            fontFamily: "'DM Sans', sans-serif", fontSize: '9px', letterSpacing: '2px',
            textTransform: 'uppercase', color: 'var(--ink)', padding: '8px 20px',
            transition: 'all 0.2s',
          }}>
          Add
        </button>
      </div>
    </div>
  );
}

// ─── Relax Tab ────────────────────────────────────────────────────────────────

function RelaxTab({ game, setGame, hover, setCursorHover }: { game: Game; setGame: (g: Game) => void; hover: any; setCursorHover: (v: boolean) => void }) {
  if (game === 'pong') return <PongGame onBack={() => setGame('menu')} />;
  if (game === 'snake') return <SnakeGame onBack={() => setGame('menu')} />;
  if (game === 'tetris') return <TetrisGame onBack={() => setGame('menu')} />;

  const games = [
    { id: 'pong' as Game, title: 'Pong', sub: 'Classic', desc: 'Arrow keys to move. First to 7 wins.' },
    { id: 'snake' as Game, title: 'Snake', sub: 'Arcade', desc: 'Arrow keys to turn. Eat, grow, survive.' },
    { id: 'tetris' as Game, title: 'Tetris', sub: 'Strategy', desc: 'Arrow keys + Space to drop. Clear lines.' },
  ];

  return (
    <div style={{ paddingTop: '70px', maxWidth: '860px', margin: '0 auto', padding: '120px 40px 80px' }}>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9px', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--warm-mid)', marginBottom: '16px' }}>Relax</p>
      <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '28px', fontWeight: 400, color: 'var(--ink)', marginBottom: '8px' }}>Take a moment.</h2>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: 'rgba(10,9,8,0.45)', marginBottom: '60px' }}>Three games. No stakes.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px' }}>
        {games.map(g => (
          <button key={g.id} onClick={() => setGame(g.id)} {...hover}
            style={{
              background: 'none', border: '1px solid rgba(10,9,8,0.12)', cursor: 'none',
              padding: '40px 28px', textAlign: 'left', transition: 'border-color 0.2s, transform 0.2s',
            }}
            onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--ink)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(10,9,8,0.12)'; e.currentTarget.style.transform = 'none'; }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--warm-mid)', marginBottom: '12px' }}>{g.sub}</p>
            <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '28px', fontWeight: 400, color: 'var(--ink)', marginBottom: '12px' }}>{g.title}</h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: 'rgba(10,9,8,0.45)', lineHeight: 1.6 }}>{g.desc}</p>
            <p style={{ fontFamily: 'Georgia, serif', fontSize: '18px', color: 'var(--gold)', marginTop: '20px' }}>Play →</p>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Pong ─────────────────────────────────────────────────────────────────────

function PongGame({ onBack }: { onBack: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    ball: { x: 400, y: 250, vx: 3.5, vy: 2.5 },
    p1: { y: 200 }, p2: { y: 200 },
    score: { p1: 0, p2: 0 },
    keys: {} as Record<string, boolean>,
  });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    const PH = 80, PW = 10, SPEED = 5;
    const s = stateRef.current;

    const onKey = (e: KeyboardEvent) => { s.keys[e.key] = e.type === 'keydown'; e.preventDefault(); };
    window.addEventListener('keydown', onKey);
    window.addEventListener('keyup', onKey);

    let raf: number;
    const loop = () => {
      // Move player
      if (s.keys['ArrowUp']) s.p1.y = Math.max(0, s.p1.y - SPEED);
      if (s.keys['ArrowDown']) s.p1.y = Math.min(H - PH, s.p1.y + SPEED);
      // AI
      const aim = s.ball.y - PH / 2;
      s.p2.y += (aim - s.p2.y) * 0.07;
      s.p2.y = Math.max(0, Math.min(H - PH, s.p2.y));
      // Ball
      s.ball.x += s.ball.vx; s.ball.y += s.ball.vy;
      if (s.ball.y <= 0 || s.ball.y >= H) s.ball.vy *= -1;
      // Paddle hit p1
      if (s.ball.x <= 30 + PW && s.ball.y >= s.p1.y && s.ball.y <= s.p1.y + PH) {
        s.ball.vx = Math.abs(s.ball.vx) * 1.05;
        s.ball.vy += (Math.random() - 0.5) * 0.8;
      }
      // Paddle hit p2
      if (s.ball.x >= W - 30 - PW && s.ball.y >= s.p2.y && s.ball.y <= s.p2.y + PH) {
        s.ball.vx = -Math.abs(s.ball.vx) * 1.05;
        s.ball.vy += (Math.random() - 0.5) * 0.8;
      }
      // Score
      if (s.ball.x < 0) { s.score.p2++; reset(); }
      if (s.ball.x > W) { s.score.p1++; reset(); }

      // Draw
      ctx.fillStyle = '#F8F5F0'; ctx.fillRect(0, 0, W, H);
      // Dotted center line
      ctx.setLineDash([6, 8]); ctx.strokeStyle = 'rgba(10,9,8,0.1)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(W/2, 0); ctx.lineTo(W/2, H); ctx.stroke(); ctx.setLineDash([]);
      // Paddles
      ctx.fillStyle = '#0A0908';
      ctx.fillRect(30, s.p1.y, PW, PH);
      ctx.fillRect(W - 30 - PW, s.p2.y, PW, PH);
      // Ball
      ctx.beginPath(); ctx.arc(s.ball.x, s.ball.y, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#0A0908'; ctx.fill();
      // Score
      ctx.fillStyle = 'rgba(10,9,8,0.2)';
      ctx.font = '400 28px Georgia';
      ctx.textAlign = 'center';
      ctx.fillText(`${s.score.p1}`, W/2 - 60, 44);
      ctx.fillText(`${s.score.p2}`, W/2 + 60, 44);

      raf = requestAnimationFrame(loop);
    };

    const reset = () => {
      s.ball = { x: 400, y: 250, vx: (Math.random() > 0.5 ? 1 : -1) * 3.5, vy: (Math.random() - 0.5) * 4 };
    };

    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('keydown', onKey); window.removeEventListener('keyup', onKey); };
  }, []);

  return (
    <div style={{ paddingTop: '70px', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '120px 40px 80px' }}>
      <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--warm-mid)', marginBottom: '32px', alignSelf: 'flex-start', maxWidth: '860px', width: '100%' }}>← Back</button>
      <canvas ref={canvasRef} width={800} height={500} style={{ border: '1px solid rgba(10,9,8,0.1)', maxWidth: '100%' }} />
      <p style={{ marginTop: '16px', fontFamily: "'DM Sans', sans-serif", fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--warm-mid)' }}>Arrow keys to move</p>
    </div>
  );
}

// ─── Snake ────────────────────────────────────────────────────────────────────

function SnakeGame({ onBack }: { onBack: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    snake: [{ x: 10, y: 10 }],
    dir: { x: 1, y: 0 },
    next: { x: 1, y: 0 },
    food: { x: 15, y: 15 },
    dead: false,
    score: 0,
  });

  const CELL = 20, COLS = 30, ROWS = 25;

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const s = stateRef.current;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' && s.dir.y !== 1) s.next = { x: 0, y: -1 };
      if (e.key === 'ArrowDown' && s.dir.y !== -1) s.next = { x: 0, y: 1 };
      if (e.key === 'ArrowLeft' && s.dir.x !== 1) s.next = { x: -1, y: 0 };
      if (e.key === 'ArrowRight' && s.dir.x !== -1) s.next = { x: 1, y: 0 };
      if (e.key === ' ' && s.dead) { s.snake = [{ x: 10, y: 10 }]; s.dir = { x: 1, y: 0 }; s.next = { x: 1, y: 0 }; s.dead = false; s.score = 0; s.food = randFood(); }
      e.preventDefault();
    };
    window.addEventListener('keydown', onKey);

    const randFood = () => ({ x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) });

    const interval = setInterval(() => {
      if (s.dead) return;
      s.dir = s.next;
      const head = { x: s.snake[0].x + s.dir.x, y: s.snake[0].y + s.dir.y };
      if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS) { s.dead = true; return; }
      if (s.snake.some(seg => seg.x === head.x && seg.y === head.y)) { s.dead = true; return; }
      s.snake.unshift(head);
      if (head.x === s.food.x && head.y === s.food.y) { s.score++; s.food = randFood(); } else { s.snake.pop(); }
    }, 120);

    const draw = () => {
      ctx.fillStyle = '#F8F5F0'; ctx.fillRect(0, 0, COLS * CELL, ROWS * CELL);
      // Grid
      ctx.strokeStyle = 'rgba(10,9,8,0.04)'; ctx.lineWidth = 0.5;
      for (let x = 0; x <= COLS; x++) { ctx.beginPath(); ctx.moveTo(x * CELL, 0); ctx.lineTo(x * CELL, ROWS * CELL); ctx.stroke(); }
      for (let y = 0; y <= ROWS; y++) { ctx.beginPath(); ctx.moveTo(0, y * CELL); ctx.lineTo(COLS * CELL, y * CELL); ctx.stroke(); }
      // Food
      ctx.fillStyle = '#B8974A';
      ctx.beginPath(); ctx.arc(s.food.x * CELL + CELL/2, s.food.y * CELL + CELL/2, CELL/2 - 2, 0, Math.PI * 2); ctx.fill();
      // Snake
      s.snake.forEach((seg, i) => {
        const alpha = 1 - (i / s.snake.length) * 0.6;
        ctx.fillStyle = `rgba(10,9,8,${alpha})`;
        ctx.fillRect(seg.x * CELL + 1, seg.y * CELL + 1, CELL - 2, CELL - 2);
      });
      // Score
      ctx.fillStyle = 'rgba(10,9,8,0.25)'; ctx.font = '400 16px Georgia';
      ctx.textAlign = 'left'; ctx.fillText(`${s.score}`, 12, 24);
      // Dead
      if (s.dead) {
        ctx.fillStyle = 'rgba(248,245,240,0.85)'; ctx.fillRect(0, 0, COLS * CELL, ROWS * CELL);
        ctx.fillStyle = 'var(--ink)'; ctx.font = '400 28px Georgia'; ctx.textAlign = 'center';
        ctx.fillText('Game Over', COLS * CELL / 2, ROWS * CELL / 2 - 10);
        ctx.font = '400 13px DM Sans'; ctx.fillStyle = 'rgba(10,9,8,0.4)';
        ctx.fillText('Space to restart', COLS * CELL / 2, ROWS * CELL / 2 + 24);
      }
      requestAnimationFrame(draw);
    };
    requestAnimationFrame(draw);

    return () => { clearInterval(interval); window.removeEventListener('keydown', onKey); };
  }, []);

  return (
    <div style={{ paddingTop: '70px', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '120px 40px 80px' }}>
      <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--warm-mid)', marginBottom: '32px', alignSelf: 'flex-start', maxWidth: '860px', width: '100%' }}>← Back</button>
      <canvas ref={canvasRef} width={COLS * CELL} height={ROWS * CELL} style={{ border: '1px solid rgba(10,9,8,0.1)', maxWidth: '100%' }} />
      <p style={{ marginTop: '16px', fontFamily: "'DM Sans', sans-serif", fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--warm-mid)' }}>Arrow keys · Space to restart</p>
    </div>
  );
}

// ─── Tetris ───────────────────────────────────────────────────────────────────

function TetrisGame({ onBack }: { onBack: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const CELL = 28, COLS = 10, ROWS = 20;
  const PIECES = [
    { shape: [[1,1,1,1]], color: 'rgba(10,9,8,0.7)' },
    { shape: [[1,1],[1,1]], color: 'rgba(184,151,74,0.8)' },
    { shape: [[0,1,0],[1,1,1]], color: 'rgba(10,9,8,0.5)' },
    { shape: [[1,0],[1,1],[0,1]], color: 'rgba(184,151,74,0.6)' },
    { shape: [[0,1],[1,1],[1,0]], color: 'rgba(10,9,8,0.4)' },
    { shape: [[1,0],[1,0],[1,1]], color: 'rgba(107,94,82,0.7)' },
    { shape: [[0,1],[0,1],[1,1]], color: 'rgba(107,94,82,0.5)' },
  ];

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    let board: (string | null)[][] = Array.from({length: ROWS}, () => Array(COLS).fill(null));
    let piece = newPiece(), px = 3, py = 0;
    let score = 0, dead = false;

    function newPiece() { return PIECES[Math.floor(Math.random() * PIECES.length)]; }
    function valid(s: number[][], x: number, y: number) {
      for (let r = 0; r < s.length; r++) for (let c = 0; c < s[r].length; c++) {
        if (!s[r][c]) continue;
        const nx = x + c, ny = y + r;
        if (nx < 0 || nx >= COLS || ny >= ROWS) return false;
        if (ny >= 0 && board[ny][nx]) return false;
      }
      return true;
    }
    function place() {
      piece.shape.forEach((row, r) => row.forEach((v, c) => { if (v) board[py+r][px+c] = piece.color; }));
      // Clear lines
      board = board.filter(row => row.some(cell => !cell));
      const cleared = ROWS - board.length;
      score += cleared * 100;
      while (board.length < ROWS) board.unshift(Array(COLS).fill(null));
      piece = newPiece(); px = 3; py = 0;
      if (!valid(piece.shape, px, py)) dead = true;
    }
    function rotate(s: number[][]) {
      return s[0].map((_, i) => s.map(row => row[i]).reverse());
    }

    const onKey = (e: KeyboardEvent) => {
      if (dead) { if (e.key === ' ') { board = Array.from({length: ROWS}, () => Array(COLS).fill(null)); piece = newPiece(); px = 3; py = 0; score = 0; dead = false; } return; }
      if (e.key === 'ArrowLeft' && valid(piece.shape, px-1, py)) px--;
      if (e.key === 'ArrowRight' && valid(piece.shape, px+1, py)) px++;
      if (e.key === 'ArrowDown' && valid(piece.shape, px, py+1)) py++;
      if (e.key === 'ArrowUp') { const r = rotate(piece.shape); if (valid(r, px, py)) piece = {...piece, shape: r}; }
      if (e.key === ' ') { while (valid(piece.shape, px, py+1)) py++; place(); }
      e.preventDefault();
    };
    window.addEventListener('keydown', onKey);

    const interval = setInterval(() => {
      if (!dead) { if (valid(piece.shape, px, py+1)) py++; else place(); }
    }, 500);

    const draw = () => {
      ctx.fillStyle = '#F8F5F0'; ctx.fillRect(0, 0, COLS*CELL, ROWS*CELL);
      // Grid
      ctx.strokeStyle = 'rgba(10,9,8,0.05)'; ctx.lineWidth = 0.5;
      for (let x = 0; x <= COLS; x++) { ctx.beginPath(); ctx.moveTo(x*CELL,0); ctx.lineTo(x*CELL,ROWS*CELL); ctx.stroke(); }
      for (let y = 0; y <= ROWS; y++) { ctx.beginPath(); ctx.moveTo(0,y*CELL); ctx.lineTo(COLS*CELL,y*CELL); ctx.stroke(); }
      // Board
      board.forEach((row,r) => row.forEach((cell,c) => { if (cell) { ctx.fillStyle=cell; ctx.fillRect(c*CELL+1,r*CELL+1,CELL-2,CELL-2); } }));
      // Current piece
      piece.shape.forEach((row,r) => row.forEach((v,c) => {
        if (v && py+r >= 0) { ctx.fillStyle=piece.color; ctx.fillRect((px+c)*CELL+1,(py+r)*CELL+1,CELL-2,CELL-2); }
      }));
      // Ghost
      let gy = py; while (valid(piece.shape, px, gy+1)) gy++;
      piece.shape.forEach((row,r) => row.forEach((v,c) => {
        if (v && gy+r >= 0) { ctx.fillStyle='rgba(10,9,8,0.08)'; ctx.fillRect((px+c)*CELL+1,(gy+r)*CELL+1,CELL-2,CELL-2); }
      }));
      // Score
      ctx.fillStyle='rgba(10,9,8,0.25)'; ctx.font='400 14px Georgia'; ctx.textAlign='left'; ctx.fillText(`${score}`,8,20);
      if (dead) {
        ctx.fillStyle='rgba(248,245,240,0.88)'; ctx.fillRect(0,0,COLS*CELL,ROWS*CELL);
        ctx.fillStyle='#0A0908'; ctx.font='400 24px Georgia'; ctx.textAlign='center';
        ctx.fillText('Game Over', COLS*CELL/2, ROWS*CELL/2-10);
        ctx.font='400 12px sans-serif'; ctx.fillStyle='rgba(10,9,8,0.4)';
        ctx.fillText('Space to restart', COLS*CELL/2, ROWS*CELL/2+22);
      }
      requestAnimationFrame(draw);
    };
    requestAnimationFrame(draw);

    return () => { clearInterval(interval); window.removeEventListener('keydown', onKey); };
  }, []);

  return (
    <div style={{ paddingTop: '70px', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '120px 40px 80px' }}>
      <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--warm-mid)', marginBottom: '32px', alignSelf: 'flex-start', maxWidth: '860px', width: '100%' }}>← Back</button>
      <canvas ref={canvasRef} width={COLS * CELL} height={ROWS * CELL} style={{ border: '1px solid rgba(10,9,8,0.1)' }} />
      <p style={{ marginTop: '16px', fontFamily: "'DM Sans', sans-serif", fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--warm-mid)' }}>← → move · ↑ rotate · ↓ drop · Space instant drop</p>
    </div>
  );
}
