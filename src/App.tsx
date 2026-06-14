import { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

type Section = 'about' | 'projects' | 'interactive';

const projects = [
  {
    title: 'CityPulse',
    desc: 'Civic accountability platform that syncs with city 311 APIs, runs Gemini Vision AI on citizen photo reports, and clusters nearby complaints into action groups — built on a full async Python/PostgreSQL backend with geospatial indexing.',
    tech: 'Next.js · FastAPI · PostgreSQL/PostGIS · Gemini AI · Docker',
    year: '2025',
  },
  {
    title: 'Receipt Scanner',
    desc: 'AI-powered expense tracker that uses Gemini Vision to parse and categorize receipts from photos in real time, with Firebase-backed persistence and a clean split-view UI deployed on Vercel.',
    tech: 'React · TypeScript · Gemini AI · Firebase · Vite',
    year: '2025',
  },
  {
    title: 'BillSplit',
    desc: 'A clean, frictionless app for splitting expenses among friends — no accounts, no bloat, just math done right.',
    tech: 'React · TypeScript · Vite',
    year: '2025',
  },
];

export default function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<Section>('about');
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  const [cursorHover, setCursorHover] = useState(false);

  // Interactive: magnetic word game
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);
  const words = ['builder', 'engineer', 'thinker', 'maker', 'curious'];
  const wordDescriptions: Record<string, string> = {
    builder: 'Ships products people actually use.',
    engineer: 'ECE + Math @ Rutgers New Brunswick.',
    thinker: 'Drawn to open-ended problems.',
    maker: 'Hardware to full-stack, whatever it takes.',
    curious: 'Currently exploring ML + infrastructure.',
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
    const move = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <div
      style={{ position: 'relative', height: '100vh', width: '100vw', overflow: 'hidden', background: 'var(--cream)' }}
      onMouseLeave={() => setCursor({ x: -100, y: -100 })}
    >
      {/* Custom cursor */}
      <div style={{
        position: 'fixed',
        left: cursor.x,
        top: cursor.y,
        width: cursorHover ? 44 : 10,
        height: cursorHover ? 44 : 10,
        borderRadius: '50%',
        background: cursorHover ? 'transparent' : 'var(--ink)',
        border: cursorHover ? '1px solid var(--ink)' : 'none',
        transform: 'translate(-50%, -50%)',
        transition: 'width 0.2s ease, height 0.2s ease, background 0.2s ease',
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'multiply',
      }} />

      {/* ── NAME — behind the video ── */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        zIndex: 1,
        pointerEvents: 'none',
        paddingTop: '0.02em',
      }}>
        <h1 style={{
          fontFamily: "'Playfair Display', 'Georgia', serif",
          fontWeight: 900,
          fontStyle: 'italic',
          fontSize: 'clamp(110px, 23vw, 300px)',
          color: 'var(--ink)',
          letterSpacing: '-3px',
          lineHeight: 0.82,
          userSelect: 'none',
          whiteSpace: 'nowrap',
        }}>
          ashfaq
        </h1>
      </div>

      {/* ── VIDEO / IMAGE — centered, 65% width ── */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '66%',
        maxWidth: '960px',
        zIndex: 2,
        pointerEvents: 'none',
      }}>
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            mixBlendMode: 'multiply',
          }}
        >
          <source src="/background.webm" type="video/webm" />
          <source src="/background.mp4" type="video/mp4" />
        </video>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px 32px',
        pointerEvents: 'none',
      }}>
        {/* Left: subtle label */}
        <div style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '10px',
          fontWeight: 500,
          letterSpacing: '2.5px',
          textTransform: 'uppercase',
          color: 'var(--warm-mid)',
          pointerEvents: 'none',
        }}>
          Portfolio — 2025
        </div>

        {/* Center: nav tabs */}
        <div style={{ display: 'flex', gap: '32px', pointerEvents: 'auto' }}>
          {(['about', 'projects', 'interactive'] as Section[]).map(s => (
            <button
              key={s}
              onClick={() => { setActiveSection(s); setDrawerOpen(true); }}
              onMouseEnter={() => setCursorHover(true)}
              onMouseLeave={() => setCursorHover(false)}
              style={{
                background: 'none',
                border: 'none',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: 'var(--ink)',
                cursor: 'none',
                padding: '0',
                opacity: drawerOpen && activeSection === s ? 1 : 0.45,
                borderBottom: drawerOpen && activeSection === s ? '1px solid var(--ink)' : '1px solid transparent',
                paddingBottom: '2px',
                transition: 'all 0.2s ease',
              }}
            >
              {s === 'interactive' ? 'Play' : s === 'about' ? 'About' : 'Work'}
            </button>
          ))}
        </div>

        {/* Right: email */}
        <a
          href="mailto:ashfaq.shaikmohamed@rutgers.edu"
          onMouseEnter={() => setCursorHover(true)}
          onMouseLeave={() => setCursorHover(false)}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: 'var(--warm-mid)',
            textDecoration: 'none',
            pointerEvents: 'auto',
            transition: 'color 0.2s',
          }}
          onMouseOver={e => (e.currentTarget.style.color = 'var(--ink)')}
          onMouseOut={e => (e.currentTarget.style.color = 'var(--warm-mid)')}
        >
          Contact
        </a>
      </div>

      {/* ── BACKDROP ── */}
      {drawerOpen && (
        <div
          onClick={() => setDrawerOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 20,
            background: 'rgba(10,9,8,0.18)',
            backdropFilter: 'blur(2px)',
            animation: 'fadeIn 0.3s ease',
          }}
        />
      )}

      {/* ── DRAWER (right side, editorial panel) ── */}
      <div style={{
        position: 'fixed',
        right: 0,
        top: 0,
        height: '100vh',
        width: '420px',
        zIndex: 30,
        background: 'var(--cream)',
        borderLeft: '1px solid rgba(10,9,8,0.08)',
        transform: drawerOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex',
        flexDirection: 'column',
        padding: '40px 44px',
        overflowY: 'auto',
      }}>
        {/* Close */}
        <button
          onClick={() => setDrawerOpen(false)}
          onMouseEnter={() => setCursorHover(true)}
          onMouseLeave={() => setCursorHover(false)}
          style={{
            alignSelf: 'flex-end',
            background: 'none',
            border: 'none',
            color: 'rgba(10,9,8,0.3)',
            cursor: 'none',
            padding: '4px',
            marginBottom: '48px',
            transition: 'color 0.2s',
          }}
          onMouseOver={e => (e.currentTarget.style.color = 'var(--ink)')}
          onMouseOut={e => (e.currentTarget.style.color = 'rgba(10,9,8,0.3)')}
        >
          <X size={18} strokeWidth={1.5} />
        </button>

        {/* Inline section switcher */}
        <div style={{ display: 'flex', gap: '20px', marginBottom: '48px' }}>
          {(['about', 'projects', 'interactive'] as Section[]).map(s => (
            <button
              key={s}
              onClick={() => setActiveSection(s)}
              onMouseEnter={() => setCursorHover(true)}
              onMouseLeave={() => setCursorHover(false)}
              style={{
                background: 'none',
                border: 'none',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '10px',
                fontWeight: 500,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: activeSection === s ? 'var(--ink)' : 'rgba(10,9,8,0.3)',
                cursor: 'none',
                padding: '0 0 4px',
                borderBottom: activeSection === s ? '1px solid var(--ink)' : '1px solid transparent',
                transition: 'all 0.2s',
              }}
            >
              {s === 'interactive' ? 'Play' : s === 'about' ? 'About' : 'Work'}
            </button>
          ))}
        </div>

        {/* ── ABOUT ── */}
        {activeSection === 'about' && (
          <div style={{ animation: 'fadeUp 0.4s ease' }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: 'italic',
              fontSize: '32px',
              fontWeight: 700,
              color: 'var(--ink)',
              lineHeight: 1.15,
              marginBottom: '32px',
              letterSpacing: '-0.5px',
            }}>
              Ashfaq<br/>Shaik-Mohamed
            </h2>
            <p style={{ color: 'rgba(10,9,8,0.65)', lineHeight: 1.85, fontSize: '14px', marginBottom: '18px', fontFamily: "'DM Sans', sans-serif" }}>
              Studying Electrical and Computer Engineering and Mathematics at Rutgers University–New Brunswick.
            </p>
            <p style={{ color: 'rgba(10,9,8,0.65)', lineHeight: 1.85, fontSize: '14px', marginBottom: '18px', fontFamily: "'DM Sans', sans-serif" }}>
              I build things that are actually useful — projects that make everyday life a little easier or solve problems I've personally run into.
            </p>
            <p style={{ color: 'rgba(10,9,8,0.65)', lineHeight: 1.85, fontSize: '14px', marginBottom: '44px', fontFamily: "'DM Sans', sans-serif" }}>
              Drawn to open-ended challenges without a clear path forward. Lately exploring full-stack development, machine learning, and infrastructure.
            </p>
            <div style={{ borderTop: '1px solid rgba(10,9,8,0.08)', paddingTop: '28px' }}>
              <a
                href="mailto:ashfaq.shaikmohamed@rutgers.edu"
                onMouseEnter={() => setCursorHover(true)}
                onMouseLeave={() => setCursorHover(false)}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: 'var(--ink)',
                  textDecoration: 'none',
                  display: 'inline-block',
                  borderBottom: '1px solid var(--ink)',
                  paddingBottom: '3px',
                }}
              >
                ashfaq.shaikmohamed@rutgers.edu
              </a>
            </div>
          </div>
        )}

        {/* ── PROJECTS ── */}
        {activeSection === 'projects' && (
          <div style={{ animation: 'fadeUp 0.4s ease' }}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '2.5px',
              textTransform: 'uppercase',
              color: 'var(--warm-mid)',
              marginBottom: '36px',
            }}>
              Selected Work
            </p>
            {projects.map((p, i) => (
              <div
                key={i}
                onMouseEnter={() => setCursorHover(true)}
                onMouseLeave={() => setCursorHover(false)}
                style={{
                  borderTop: i === 0 ? '1px solid rgba(10,9,8,0.08)' : 'none',
                  borderBottom: '1px solid rgba(10,9,8,0.08)',
                  padding: '24px 0',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '10px' }}>
                  <h4 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: 'italic',
                    fontSize: '20px',
                    fontWeight: 700,
                    color: 'var(--ink)',
                  }}>
                    {p.title}
                  </h4>
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '10px',
                    fontWeight: 500,
                    color: 'var(--warm-mid)',
                    letterSpacing: '1px',
                  }}>
                    {p.year}
                  </span>
                </div>
                <p style={{
                  color: 'rgba(10,9,8,0.55)',
                  fontSize: '13px',
                  lineHeight: 1.75,
                  marginBottom: '14px',
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                  {p.desc}
                </p>
                <span style={{
                  fontSize: '9px',
                  fontWeight: 500,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                  {p.tech}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* ── INTERACTIVE ── */}
        {activeSection === 'interactive' && (
          <div style={{ animation: 'fadeUp 0.4s ease' }}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '2.5px',
              textTransform: 'uppercase',
              color: 'var(--warm-mid)',
              marginBottom: '36px',
            }}>
              Who is Ashfaq?
            </p>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '13px',
              color: 'rgba(10,9,8,0.5)',
              marginBottom: '36px',
              lineHeight: 1.7,
            }}>
              Hover over a word.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '48px' }}>
              {words.map(w => (
                <span
                  key={w}
                  onMouseEnter={() => { setHoveredWord(w); setCursorHover(true); }}
                  onMouseLeave={() => { setHoveredWord(null); setCursorHover(false); }}
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: 'italic',
                    fontSize: '26px',
                    fontWeight: hoveredWord === w ? 900 : 400,
                    color: hoveredWord === w ? 'var(--ink)' : 'rgba(10,9,8,0.2)',
                    cursor: 'none',
                    transition: 'all 0.25s ease',
                    lineHeight: 1.2,
                    userSelect: 'none',
                  }}
                >
                  {w}
                </span>
              ))}
            </div>

            {/* Description reveal */}
            <div style={{
              minHeight: '80px',
              borderTop: '1px solid rgba(10,9,8,0.08)',
              paddingTop: '28px',
            }}>
              {hoveredWord ? (
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '15px',
                  color: 'var(--ink)',
                  lineHeight: 1.7,
                  animation: 'fadeUp 0.2s ease',
                }}>
                  {wordDescriptions[hoveredWord]}
                </p>
              ) : (
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '13px',
                  color: 'rgba(10,9,8,0.25)',
                  fontStyle: 'italic',
                  lineHeight: 1.7,
                }}>
                  &nbsp;
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
