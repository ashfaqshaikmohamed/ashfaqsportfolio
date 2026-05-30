import { useState, useRef, useEffect } from 'react';
import { X, Menu } from 'lucide-react';

type Section = 'about' | 'projects' | 'experience';

export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<Section>('about');
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  // ─── EDIT YOUR PROJECTS HERE ───────────────────────────────────────────────
  const projects = [
    {
      title: 'Project One',
      desc: 'Add your project description here.',
      tech: 'React / Node.js',
    },
    {
      title: 'Project Two',
      desc: 'Add your project description here.',
      tech: 'Python / ML',
    },
    {
      title: 'Project Three',
      desc: 'Add your project description here.',
      tech: 'Go / AWS',
    },
  ];

  // ─── EDIT YOUR EXPERIENCE HERE ─────────────────────────────────────────────
  const experience = [
    {
      company: 'Company Name',
      role: 'Your Role',
      period: '2024 - Present',
    },
    {
      company: 'Company Name',
      role: 'Your Role',
      period: '2023 - 2024',
    },
  ];

  return (
    <div style={{
      position: 'relative',
      height: '100vh',
      width: '100vw',
      overflow: 'hidden',
      background: '#e0cfc8',
    }}>

      {/* ── NAME — sits behind the video ── */}
      <div style={{
        position: 'absolute',
        top: '-0.12em',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1,
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        lineHeight: 1,
      }}>
        <h1 style={{
          fontFamily: "'Georgia', 'Times New Roman', serif",
          fontWeight: 900,
          fontStyle: 'italic',
          fontSize: 'clamp(100px, 22vw, 280px)',
          color: '#0a0908',
          letterSpacing: '-4px',
          lineHeight: 0.85,
          userSelect: 'none',
        }}>
          ashfaq
        </h1>
      </div>

      {/* ── VIDEO — sits on top of the name, covering the top portion ── */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '62%',
        maxWidth: '780px',
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

      {/* ── HAMBURGER (bottom left) ── */}
      <button
        onClick={() => setDrawerOpen(true)}
        style={{
          position: 'fixed',
          bottom: '36px',
          left: '36px',
          zIndex: 10,
          background: 'rgba(34,51,59,0.08)',
          border: '1px solid rgba(34,51,59,0.18)',
          borderRadius: '2px',
          padding: '11px 13px',
          cursor: 'pointer',
          color: '#22333b',
          transition: 'all 0.25s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(6px)',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.background = 'rgba(34,51,59,0.15)';
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(34,51,59,0.4)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.background = 'rgba(34,51,59,0.08)';
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(34,51,59,0.18)';
        }}
      >
        <Menu size={22} strokeWidth={1.5} />
      </button>

      {/* ── BACKDROP ── */}
      {drawerOpen && (
        <div
          onClick={() => setDrawerOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 20,
            background: 'rgba(10,9,8,0.25)',
            backdropFilter: 'blur(3px)',
          }}
        />
      )}

      {/* ── DRAWER ── */}
      <div style={{
        position: 'fixed',
        left: 0,
        top: 0,
        height: '100vh',
        width: '360px',
        zIndex: 30,
        background: '#22333b',
        borderRight: '1px solid rgba(198,172,143,0.15)',
        transform: drawerOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex',
        flexDirection: 'column',
        padding: '36px 40px',
        overflowY: 'auto',
      }}>

        {/* Close */}
        <button
          onClick={() => setDrawerOpen(false)}
          style={{
            alignSelf: 'flex-end',
            background: 'none',
            border: 'none',
            color: 'rgba(198,172,143,0.5)',
            cursor: 'pointer',
            padding: '4px',
            marginBottom: '40px',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.color = '#c6ac8f'}
          onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.color = 'rgba(198,172,143,0.5)'}
        >
          <X size={22} strokeWidth={1.5} />
        </button>

        {/* Drawer name */}
        <p style={{
          fontFamily: "'Georgia', serif",
          fontStyle: 'italic',
          fontSize: '13px',
          color: 'rgba(198,172,143,0.5)',
          letterSpacing: '1px',
          marginBottom: '32px',
        }}>
          Ashfaq Shaik-Mohamed
        </p>

        {/* Tabs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginBottom: '44px' }}>
          {(['about', 'projects', 'experience'] as Section[]).map(s => (
            <button
              key={s}
              onClick={() => setActiveSection(s)}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: activeSection === s ? '1px solid #c6ac8f' : '1px solid transparent',
                color: activeSection === s ? '#c6ac8f' : 'rgba(198,172,143,0.35)',
                fontFamily: "'Georgia', serif",
                fontStyle: 'italic',
                fontSize: '15px',
                padding: '10px 0',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s',
                letterSpacing: '0.5px',
              }}
            >
              {s === 'experience' ? 'Work Experience' : s === 'projects' ? 'Projects' : 'About Me'}
            </button>
          ))}
        </div>

        {/* ── ABOUT ── */}
        {activeSection === 'about' && (
          <div style={{ animation: 'fadeUp 0.35s ease' }}>
            <p style={{
              color: 'rgba(224,207,200,0.85)',
              lineHeight: 1.9,
              fontSize: '14px',
              marginBottom: '18px',
              fontFamily: "'Georgia', serif",
            }}>
              Hey, I'm Ashfaq Shaik-Mohamed. I'm studying Electrical and Computer Engineering and Mathematics at Rutgers University–New Brunswick.
            </p>
            <p style={{
              color: 'rgba(224,207,200,0.85)',
              lineHeight: 1.9,
              fontSize: '14px',
              marginBottom: '18px',
              fontFamily: "'Georgia', serif",
            }}>
              I like building things that are actually useful — projects that make everyday life a little easier or solve problems I've personally run into.
            </p>
            <p style={{
              color: 'rgba(224,207,200,0.85)',
              lineHeight: 1.9,
              fontSize: '14px',
              marginBottom: '36px',
              fontFamily: "'Georgia', serif",
            }}>
              I'm especially drawn to open-ended challenges where there isn't a clear path forward. Lately I've been exploring full-stack development, machine learning, and infrastructure.
            </p>
            <a
              href="mailto:ashfaq.shaikmohamed@rutgers.edu"
              style={{
                color: '#c6ac8f',
                fontSize: '12px',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(198,172,143,0.35)',
                paddingBottom: '3px',
                fontFamily: "'Georgia', serif",
                fontStyle: 'italic',
              }}
            >
              ashfaq.shaikmohamed@rutgers.edu
            </a>
          </div>
        )}

        {/* ── PROJECTS ── */}
        {activeSection === 'projects' && (
          <div style={{ animation: 'fadeUp 0.35s ease' }}>
            {projects.map((p, i) => (
              <div key={i} style={{
                borderBottom: '1px solid rgba(198,172,143,0.1)',
                paddingBottom: '24px',
                marginBottom: '24px',
              }}>
                <h4 style={{
                  color: '#e0cfc8',
                  fontSize: '16px',
                  fontWeight: 700,
                  fontFamily: "'Georgia', serif",
                  fontStyle: 'italic',
                  marginBottom: '8px',
                }}>
                  {p.title}
                </h4>
                <p style={{
                  color: 'rgba(224,207,200,0.55)',
                  fontSize: '13px',
                  marginBottom: '12px',
                  lineHeight: 1.7,
                  fontFamily: "'Georgia', serif",
                }}>
                  {p.desc}
                </p>
                <span style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: '#c6ac8f',
                  fontFamily: 'sans-serif',
                }}>
                  {p.tech}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* ── EXPERIENCE ── */}
        {activeSection === 'experience' && (
          <div style={{ animation: 'fadeUp 0.35s ease' }}>
            {experience.map((e, i) => (
              <div key={i} style={{
                position: 'relative',
                paddingLeft: '20px',
                borderLeft: '1px solid rgba(198,172,143,0.25)',
                marginBottom: '36px',
              }}>
                <div style={{
                  position: 'absolute',
                  left: '-4px',
                  top: '6px',
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  background: '#c6ac8f',
                }} />
                <h4 style={{
                  color: '#e0cfc8',
                  fontSize: '15px',
                  fontWeight: 700,
                  fontFamily: "'Georgia', serif",
                  fontStyle: 'italic',
                }}>
                  {e.company}
                </h4>
                <p style={{
                  color: 'rgba(224,207,200,0.55)',
                  fontSize: '13px',
                  marginTop: '4px',
                  fontFamily: "'Georgia', serif",
                }}>
                  {e.role}
                </p>
                <p style={{
                  color: '#c6ac8f',
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  marginTop: '8px',
                  fontFamily: 'sans-serif',
                }}>
                  {e.period}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(198,172,143,0.2); border-radius: 10px; }
      `}</style>
    </div>
  );
}
