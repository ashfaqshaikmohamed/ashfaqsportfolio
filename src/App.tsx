import { useState, useRef, useEffect, useCallback } from 'react';
import { Github, Linkedin, Mail, ExternalLink, ArrowUpRight } from 'lucide-react';

type Page = 'home' | 'projects' | 'play' | 'relax';
type Game = 'none' | 'pong' | 'snake' | 'tetris';

const projects = [
  {
    title: 'CityPulse',
    tagline: 'Civic intelligence platform',
    desc: 'Most city complaints die in a 311 inbox. CityPulse changes that — ingesting live government API data, running Gemini Vision AI on citizen photo reports, and clustering nearby issues into unified action groups so neighborhoods can actually hold their city accountable.',
    impact: [
      { label: 'API records indexed', value: '50K+' },
      { label: 'AI classification accuracy', value: '94%' },
      { label: 'Response time', value: '<2s' },
    ],
    tags: ['Next.js', 'FastAPI', 'PostGIS', 'Gemini AI', 'Docker', 'Redis'],
    url: 'https://citypulsebyash.vercel.app/',
    year: '2025',
  },
  {
    title: 'Receipt Scanner',
    tagline: 'AI-powered expense intelligence',
    desc: 'Point your phone at a receipt and get back a fully structured, categorized expense — no typing, no manual entry. Gemini Vision extracts itemized line-item data in real time, with per-user Firebase isolation and a zero-downtime CI/CD pipeline from GitHub to Vercel.',
    impact: [
      { label: 'Parse time per receipt', value: '<2s' },
      { label: 'Line item accuracy', value: '~91%' },
      { label: 'Data isolation', value: '100%' },
    ],
    tags: ['React', 'TypeScript', 'Gemini AI', 'Firebase', 'Vite', 'Vercel'],
    url: 'https://receiptifybyashfaq.vercel.app/',
    year: '2025',
  },
];

const WORDS_KEY = 'ashfaq_words_v1';
const CREAM = '#F8F5F0';
const INK = '#0A0908';
const GOLD = '#B8974A';
const MID = 'rgba(10,9,8,0.35)';

// ─── PONG ────────────────────────────────────────────────────────────────────
function PongGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const state = useRef({
    ball: { x: 300, y: 200, vx: 3, vy: 2 },
    p1: 160, p2: 160,
    score: [0, 0],
    running: true,
  });
  const aiRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    const PH = 80, PW = 8, BR = 6;

    const onKey = (e: KeyboardEvent) => {
      const s = state.current;
      if (e.key === 'ArrowUp') s.p1 = Math.max(0, s.p1 - 18);
      if (e.key === 'ArrowDown') s.p1 = Math.min(H - PH, s.p1 + 18);
    };
    window.addEventListener('keydown', onKey);

    let raf: number;
    const loop = () => {
      const s = state.current;
      if (!s.running) return;

      // AI
      aiRef.current += (s.ball.y - PH/2 - s.p2) * 0.07;
      s.p2 = Math.max(0, Math.min(H - PH, s.p2 + aiRef.current * 0.9));

      // Ball
      s.ball.x += s.ball.vx;
      s.ball.y += s.ball.vy;
      if (s.ball.y <= BR || s.ball.y >= H - BR) s.ball.vy *= -1;

      // Paddle collisions
      if (s.ball.x - BR <= 24 + PW && s.ball.y >= s.p1 && s.ball.y <= s.p1 + PH) {
        s.ball.vx = Math.abs(s.ball.vx) * 1.05;
        s.ball.vy += (s.ball.y - (s.p1 + PH/2)) * 0.1;
      }
      if (s.ball.x + BR >= W - 24 - PW && s.ball.y >= s.p2 && s.ball.y <= s.p2 + PH) {
        s.ball.vx = -Math.abs(s.ball.vx) * 1.05;
        s.ball.vy += (s.ball.y - (s.p2 + PH/2)) * 0.1;
      }

      // Speed cap
      const spd = Math.sqrt(s.ball.vx**2 + s.ball.vy**2);
      if (spd > 9) { s.ball.vx = s.ball.vx/spd*9; s.ball.vy = s.ball.vy/spd*9; }

      // Score
      if (s.ball.x < 0) {
        s.score[1]++; s.ball = { x: W/2, y: H/2, vx: 3, vy: 2 }; aiRef.current = 0;
      }
      if (s.ball.x > W) {
        s.score[0]++; s.ball = { x: W/2, y: H/2, vx: -3, vy: 2 }; aiRef.current = 0;
      }

      // Draw
      ctx.fillStyle = CREAM; ctx.fillRect(0, 0, W, H);

      // Center line
      ctx.setLineDash([6, 8]);
      ctx.strokeStyle = 'rgba(10,9,8,0.1)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(W/2, 0); ctx.lineTo(W/2, H); ctx.stroke();
      ctx.setLineDash([]);

      // Paddles
      ctx.fillStyle = INK;
      ctx.fillRect(24, s.p1, PW, PH);
      ctx.fillRect(W - 24 - PW, s.p2, PW, PH);

      // Ball
      ctx.beginPath(); ctx.arc(s.ball.x, s.ball.y, BR, 0, Math.PI*2);
      ctx.fillStyle = INK; ctx.fill();

      // Score
      ctx.fillStyle = 'rgba(10,9,8,0.15)';
      ctx.font = `300 48px Georgia, serif`;
      ctx.textAlign = 'center';
      ctx.fillText(`${s.score[0]}`, W/2 - 60, 56);
      ctx.fillText(`${s.score[1]}`, W/2 + 60, 56);

      // Labels
      ctx.fillStyle = 'rgba(10,9,8,0.3)';
      ctx.font = `500 9px DM Sans, sans-serif`;
      ctx.letterSpacing = '2px';
      ctx.fillText('YOU', 60, H - 12);
      ctx.fillText('CPU', W - 60, H - 12);

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => { cancelAnimationFrame(raf); window.removeEventListener('keydown', onKey); state.current.running = false; };
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
      <canvas ref={canvasRef} width={600} height={340}
        style={{ border: '1px solid rgba(10,9,8,0.1)', display: 'block' }} />
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: MID }}>
        ↑ ↓ arrow keys to move
      </p>
    </div>
  );
}

// ─── SNAKE ───────────────────────────────────────────────────────────────────
const CELL = 20;
const COLS = 25, ROWS = 17;

function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameState = useRef({
    snake: [{ x: 12, y: 8 }, { x: 11, y: 8 }, { x: 10, y: 8 }],
    dir: { x: 1, y: 0 },
    nextDir: { x: 1, y: 0 },
    food: { x: 18, y: 8 },
    score: 0,
    alive: true,
    tick: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;

    const randFood = () => ({
      x: Math.floor(Math.random() * COLS),
      y: Math.floor(Math.random() * ROWS),
    });

    const onKey = (e: KeyboardEvent) => {
      const s = gameState.current;
      const map: Record<string, {x:number,y:number}> = {
        ArrowUp: {x:0,y:-1}, ArrowDown: {x:0,y:1},
        ArrowLeft: {x:-1,y:0}, ArrowRight: {x:1,y:0},
      };
      if (map[e.key]) {
        const nd = map[e.key];
        if (nd.x !== -s.dir.x || nd.y !== -s.dir.y) s.nextDir = nd;
        e.preventDefault();
      }
      if (e.key === ' ' && !s.alive) {
        gameState.current = {
          snake: [{ x: 12, y: 8 }, { x: 11, y: 8 }, { x: 10, y: 8 }],
          dir: { x: 1, y: 0 }, nextDir: { x: 1, y: 0 },
          food: randFood(), score: 0, alive: true, tick: 0,
        };
      }
    };
    window.addEventListener('keydown', onKey);

    let raf: number;
    const loop = () => {
      const s = gameState.current;
      s.tick++;

      if (s.alive && s.tick % 7 === 0) {
        s.dir = s.nextDir;
        const head = { x: s.snake[0].x + s.dir.x, y: s.snake[0].y + s.dir.y };

        // wall / self collision
        if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS ||
            s.snake.some(seg => seg.x === head.x && seg.y === head.y)) {
          s.alive = false;
        } else {
          s.snake.unshift(head);
          if (head.x === s.food.x && head.y === s.food.y) {
            s.score++;
            s.food = randFood();
          } else {
            s.snake.pop();
          }
        }
      }

      // Draw
      ctx.fillStyle = CREAM; ctx.fillRect(0, 0, W, H);

      // Grid
      ctx.strokeStyle = 'rgba(10,9,8,0.04)'; ctx.lineWidth = 0.5;
      for (let x = 0; x <= COLS; x++) { ctx.beginPath(); ctx.moveTo(x*CELL, 0); ctx.lineTo(x*CELL, H); ctx.stroke(); }
      for (let y = 0; y <= ROWS; y++) { ctx.beginPath(); ctx.moveTo(0, y*CELL); ctx.lineTo(W, y*CELL); ctx.stroke(); }

      // Snake
      s.snake.forEach((seg, i) => {
        ctx.fillStyle = i === 0 ? INK : `rgba(10,9,8,${0.75 - i * 0.015})`;
        ctx.fillRect(seg.x*CELL+1, seg.y*CELL+1, CELL-2, CELL-2);
      });

      // Food
      ctx.fillStyle = GOLD;
      ctx.fillRect(s.food.x*CELL+4, s.food.y*CELL+4, CELL-8, CELL-8);

      // Score
      ctx.fillStyle = 'rgba(10,9,8,0.2)';
      ctx.font = `300 32px Georgia, serif`;
      ctx.textAlign = 'right';
      ctx.fillText(`${s.score}`, W - 12, 36);

      if (!s.alive) {
        ctx.fillStyle = 'rgba(248,245,240,0.88)';
        ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = INK;
        ctx.font = `400 20px Georgia, serif`;
        ctx.textAlign = 'center';
        ctx.fillText(`score: ${s.score}`, W/2, H/2 - 10);
        ctx.fillStyle = MID;
        ctx.font = `500 9px DM Sans, sans-serif`;
        ctx.fillText('SPACE TO RESTART', W/2, H/2 + 20);
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('keydown', onKey); };
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
      <canvas ref={canvasRef} width={COLS*CELL} height={ROWS*CELL}
        style={{ border: '1px solid rgba(10,9,8,0.1)', display: 'block' }} />
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: MID }}>
        arrow keys to move · space to restart
      </p>
    </div>
  );
}

// ─── TETRIS ──────────────────────────────────────────────────────────────────
const TC = 24, TCOLS = 10, TROWS = 18;

const PIECES = [
  { shape: [[1,1,1,1]], color: INK },
  { shape: [[1,1],[1,1]], color: '#4A3728' },
  { shape: [[1,1,1],[0,1,0]], color: '#6B5E52' },
  { shape: [[1,1,1],[1,0,0]], color: '#8B7355' },
  { shape: [[1,1,1],[0,0,1]], color: GOLD },
  { shape: [[0,1,1],[1,1,0]], color: '#A0927A' },
  { shape: [[1,1,0],[0,1,1]], color: '#C4B49A' },
];

function TetrisGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tState = useRef({
    board: Array.from({length: TROWS}, () => Array(TCOLS).fill(null) as (string|null)[]),
    piece: null as null | { shape: number[][], color: string, x: number, y: number },
    score: 0,
    alive: true,
    tick: 0,
  });

  const spawnPiece = () => {
    const p = PIECES[Math.floor(Math.random()*PIECES.length)];
    return { ...p, shape: p.shape.map(r => [...r]), x: Math.floor(TCOLS/2) - 1, y: 0 };
  };

  const collides = (board: (string|null)[][], shape: number[][], px: number, py: number) => {
    for (let r = 0; r < shape.length; r++)
      for (let c = 0; c < shape[r].length; c++)
        if (shape[r][c]) {
          const nx = px+c, ny = py+r;
          if (nx<0 || nx>=TCOLS || ny>=TROWS || (ny>=0 && board[ny][nx])) return true;
        }
    return false;
  };

  const rotate = (shape: number[][]) => shape[0].map((_, i) => shape.map(r => r[i]).reverse());

  const lock = (s: typeof tState.current) => {
    if (!s.piece) return;
    const { shape, color, x, y } = s.piece;
    shape.forEach((row, r) => row.forEach((v, c) => {
      if (v && y+r >= 0) s.board[y+r][x+c] = color;
    }));
    // clear lines
    let lines = 0;
    s.board = s.board.filter(row => { if (row.every(c => c)) { lines++; return false; } return true; });
    while (s.board.length < TROWS) s.board.unshift(Array(TCOLS).fill(null));
    s.score += [0,10,30,60,100][lines] || 0;
    s.piece = spawnPiece();
    if (collides(s.board, s.piece.shape, s.piece.x, s.piece.y)) s.alive = false;
  };

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    tState.current.piece = spawnPiece();

    const onKey = (e: KeyboardEvent) => {
      const s = tState.current; if (!s.alive) { if (e.key===' ') { tState.current = { board: Array.from({length:TROWS},()=>Array(TCOLS).fill(null)), piece: spawnPiece(), score:0, alive:true, tick:0 }; } return; }
      if (!s.piece) return;
      if (e.key==='ArrowLeft') { s.piece.x--; if(collides(s.board,s.piece.shape,s.piece.x,s.piece.y)) s.piece.x++; e.preventDefault(); }
      if (e.key==='ArrowRight') { s.piece.x++; if(collides(s.board,s.piece.shape,s.piece.x,s.piece.y)) s.piece.x--; e.preventDefault(); }
      if (e.key==='ArrowDown') { s.piece.y++; if(collides(s.board,s.piece.shape,s.piece.x,s.piece.y)) { s.piece.y--; lock(s); } e.preventDefault(); }
      if (e.key==='ArrowUp') { const rot=rotate(s.piece.shape); if(!collides(s.board,rot,s.piece.x,s.piece.y)) s.piece.shape=rot; e.preventDefault(); }
    };
    window.addEventListener('keydown', onKey);

    let raf: number;
    const loop = () => {
      const s = tState.current;
      s.tick++;
      if (s.alive && s.piece && s.tick % 28 === 0) {
        s.piece.y++;
        if (collides(s.board, s.piece.shape, s.piece.x, s.piece.y)) { s.piece.y--; lock(s); }
      }

      ctx.fillStyle = CREAM; ctx.fillRect(0, 0, W, H);

      // Grid
      ctx.strokeStyle = 'rgba(10,9,8,0.05)'; ctx.lineWidth = 0.5;
      for (let c=0;c<=TCOLS;c++){ctx.beginPath();ctx.moveTo(c*TC,0);ctx.lineTo(c*TC,TROWS*TC);ctx.stroke();}
      for (let r=0;r<=TROWS;r++){ctx.beginPath();ctx.moveTo(0,r*TC);ctx.lineTo(TCOLS*TC,r*TC);ctx.stroke();}

      // Board
      s.board.forEach((row,r) => row.forEach((col,c) => {
        if (col) { ctx.fillStyle=col; ctx.fillRect(c*TC+1,r*TC+1,TC-2,TC-2); }
      }));

      // Active piece
      if (s.piece) {
        // Ghost
        let ghostY = s.piece.y;
        while (!collides(s.board, s.piece.shape, s.piece.x, ghostY+1)) ghostY++;
        s.piece.shape.forEach((row,r)=>row.forEach((v,c)=>{
          if(v){ ctx.fillStyle='rgba(10,9,8,0.07)'; ctx.fillRect((s.piece!.x+c)*TC+1,(ghostY+r)*TC+1,TC-2,TC-2); }
        }));
        // Piece
        s.piece.shape.forEach((row,r)=>row.forEach((v,c)=>{
          if(v){ ctx.fillStyle=s.piece!.color; ctx.fillRect((s.piece!.x+c)*TC+1,(s.piece!.y+r)*TC+1,TC-2,TC-2); }
        }));
      }

      // Score panel (right side)
      ctx.fillStyle = 'rgba(10,9,8,0.15)';
      ctx.font = `300 28px Georgia, serif`;
      ctx.textAlign = 'right';
      ctx.fillText(`${s.score}`, W-8, 32);
      ctx.fillStyle = MID; ctx.font = `500 8px DM Sans`; ctx.fillText('SCORE', W-8, 46);

      if (!s.alive) {
        ctx.fillStyle = 'rgba(248,245,240,0.9)'; ctx.fillRect(0,0,W,H);
        ctx.fillStyle=INK; ctx.font=`400 18px Georgia,serif`; ctx.textAlign='center';
        ctx.fillText(`score: ${s.score}`, TCOLS*TC/2, TROWS*TC/2-8);
        ctx.fillStyle=MID; ctx.font=`500 9px DM Sans`; ctx.fillText('SPACE TO RESTART', TCOLS*TC/2, TROWS*TC/2+18);
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('keydown', onKey); };
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
      <canvas ref={canvasRef} width={TCOLS*TC} height={TROWS*TC}
        style={{ border: '1px solid rgba(10,9,8,0.1)', display: 'block' }} />
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: MID }}>
        ← → move · ↑ rotate · ↓ drop · space restart
      </p>
    </div>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────
export default function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [page, setPage] = useState<Page>('home');
  const [activeGame, setActiveGame] = useState<Game>('none');
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  const [cursorHover, setCursorHover] = useState(false);

  const [wordInput, setWordInput] = useState('');
  const [words, setWords] = useState<{text:string;x:number;y:number;size:number;opacity:number}[]>([]);
  const [wordSubmitted, setWordSubmitted] = useState(false);
  const [hoveredTag, setHoveredTag] = useState<string|null>(null);

  const tagLines: Record<string,string> = {
    builder: 'Ships products people actually use.',
    engineer: 'ECE + Math @ Rutgers New Brunswick.',
    thinker: 'Drawn to open-ended problems.',
    maker: 'Hardware to full-stack, whatever it takes.',
    curious: 'Currently exploring ML + infrastructure.',
  };
  const homeTags = Object.keys(tagLines);

  useEffect(() => {
    if (videoRef.current) videoRef.current.play().catch(()=>{});
    const move = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move);
    try { const s = localStorage.getItem(WORDS_KEY); if(s) setWords(JSON.parse(s)); } catch {}
    return () => window.removeEventListener('mousemove', move);
  }, []);

  // reset game when leaving relax page
  useEffect(() => { if (page !== 'relax') setActiveGame('none'); }, [page]);

  const hover = (on: boolean) => setCursorHover(on);

  const addWord = () => {
    const t = wordInput.trim().slice(0,20); if(!t) return;
    const w = { text:t, x:8+Math.random()*82, y:8+Math.random()*82, size:14+Math.floor(Math.random()*22), opacity:0.35+Math.random()*0.55 };
    const u = [...words, w]; setWords(u);
    try { localStorage.setItem(WORDS_KEY, JSON.stringify(u)); } catch {}
    setWordInput(''); setWordSubmitted(true); setTimeout(()=>setWordSubmitted(false),2500);
  };

  const navLinks: {label:string; page:Page}[] = [
    {label:'home',page:'home'},{label:'projects',page:'projects'},
    {label:'playground',page:'play'},{label:'relax',page:'relax'},
  ];

  const socialLinks = [
    { icon: <Github size={13} strokeWidth={1.5}/>, url:'https://github.com/ashfaqshaikmohamed' },
    { icon: <Linkedin size={13} strokeWidth={1.5}/>, url:'https://www.linkedin.com/in/ashfaqece/' },
    { icon: <Mail size={13} strokeWidth={1.5}/>, url:'mailto:shaikmohamedashfaq@gmail.com' },
  ];

  return (
    <div style={{ position:'relative', minHeight:'100vh', width:'100vw', background:'var(--cream)', fontFamily:"'DM Sans',sans-serif", cursor:'none', overflowX:'hidden' }}
      onMouseLeave={()=>setCursor({x:-100,y:-100})}>

      {/* Custom cursor */}
      <div style={{ position:'fixed', left:cursor.x, top:cursor.y, width:cursorHover?40:8, height:cursorHover?40:8, borderRadius:'50%', background:cursorHover?'transparent':INK, border:cursorHover?`1px solid ${INK}`:'none', transform:'translate(-50%,-50%)', transition:'width 0.18s ease, height 0.18s ease', pointerEvents:'none', zIndex:9999, mixBlendMode:'multiply' }} />

      {/* ── NAV ── */}
      <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:100, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'20px 44px', background:'rgba(248,245,240,0.88)', backdropFilter:'blur(12px)', borderBottom:'1px solid rgba(10,9,8,0.06)' }}>
        <button onClick={()=>setPage('home')} onMouseEnter={()=>hover(true)} onMouseLeave={()=>hover(false)}
          style={{ background:'none', border:'none', cursor:'none', fontFamily:"'Georgia','Times New Roman',serif", fontSize:'15px', fontWeight:400, color:INK, letterSpacing:'0.5px' }}>
          ashfaq
        </button>
        <div style={{ display:'flex', gap:'28px', alignItems:'center' }}>
          {navLinks.map(n=>(
            <button key={n.page} onClick={()=>setPage(n.page)} onMouseEnter={()=>hover(true)} onMouseLeave={()=>hover(false)}
              style={{ background:'none', border:'none', cursor:'none', fontFamily:"'DM Sans',sans-serif", fontSize:'10px', fontWeight:500, letterSpacing:'2px', textTransform:'uppercase', color:page===n.page?INK:'rgba(10,9,8,0.35)', borderBottom:page===n.page?`1px solid ${INK}`:'1px solid transparent', paddingBottom:'2px', transition:'all 0.2s' }}>
              {n.label}
            </button>
          ))}
          <div style={{ display:'flex', gap:'14px', marginLeft:'12px' }}>
            {socialLinks.map((s,i)=>(
              <a key={i} href={s.url} target="_blank" rel="noreferrer" onMouseEnter={()=>hover(true)} onMouseLeave={()=>hover(false)}
                style={{ color:'rgba(10,9,8,0.3)', textDecoration:'none', transition:'color 0.2s', display:'flex' }}
                onMouseOver={e=>(e.currentTarget.style.color=INK)} onMouseOut={e=>(e.currentTarget.style.color='rgba(10,9,8,0.3)')}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ══════ HOME ══════ */}
      {page==='home' && (
        <div style={{ paddingTop:'70px' }}>
          {/* Hero */}
          <div style={{ position:'relative', width:'100%', minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', overflow:'hidden' }}>
            <div style={{ position:'absolute', top:0, left:0, right:0, display:'flex', justifyContent:'center', zIndex:1, pointerEvents:'none', paddingTop:'0.01em' }}>
              <h1 style={{ fontFamily:"'Georgia','Times New Roman','Times',serif", fontWeight:400, fontStyle:'normal', fontSize:'clamp(100px,21vw,280px)', color:INK, letterSpacing:'-2px', lineHeight:0.85, userSelect:'none', whiteSpace:'nowrap' }}>
                ashfaq
              </h1>
            </div>
            <div style={{ position:'relative', zIndex:2, width:'82%', maxWidth:'1100px', marginTop:'3vw', pointerEvents:'none' }}>
              <video ref={videoRef} autoPlay loop muted playsInline style={{ width:'100%', height:'auto', display:'block', mixBlendMode:'multiply' }}>
                <source src="/background.webm" type="video/webm"/>
                <source src="/background.mp4" type="video/mp4"/>
              </video>
            </div>
            <div style={{ position:'relative', zIndex:3, width:'82%', maxWidth:'1100px', display:'flex', justifyContent:'space-between', alignItems:'flex-end', padding:'0 4px 32px' }}>
              <div>
                <p style={{ fontFamily:"'Georgia',serif", fontStyle:'italic', fontSize:'13px', color:'rgba(10,9,8,0.45)', marginBottom:'8px' }}>ECE + Math · Rutgers Honors College</p>
                <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'10px', fontWeight:500, letterSpacing:'2px', textTransform:'uppercase', color:'var(--warm-mid)' }}>Available · Summer / Fall 2026</p>
              </div>
              <div style={{ textAlign:'right' }}>
                <p style={{ fontFamily:"'Georgia',serif", fontStyle:'italic', fontSize:'13px', color:'rgba(10,9,8,0.45)', marginBottom:'8px' }}>Jersey City, NJ</p>
                <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'10px', fontWeight:500, letterSpacing:'2px', textTransform:'uppercase', color:'var(--warm-mid)' }}>Full-Stack · ML · Infra</p>
              </div>
            </div>
          </div>

          {/* Stats strip */}
          <div style={{ background:'rgba(10,9,8,0.03)', borderTop:'1px solid rgba(10,9,8,0.07)', borderBottom:'1px solid rgba(10,9,8,0.07)' }}>
            <div style={{ width:'82%', maxWidth:'1100px', margin:'0 auto', padding:'48px 0', display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'32px' }}>
              {[
                {val:'50K+', label:'API records processed'},
                {val:'94%',  label:'AI classification accuracy'},
                {val:'<2s',  label:'Real-time parse speed'},
                {val:'3',    label:'Production apps shipped'},
              ].map((s,i)=>(
                <div key={i} style={{ textAlign:'center' }}>
                  <div style={{ fontFamily:"'Georgia','Times New Roman',serif", fontSize:'36px', fontWeight:400, color:INK, letterSpacing:'-1px', marginBottom:'6px' }}>{s.val}</div>
                  <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'10px', fontWeight:500, letterSpacing:'2px', textTransform:'uppercase', color:'var(--warm-mid)' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* About */}
          <div style={{ width:'82%', maxWidth:'1100px', margin:'0 auto', borderTop:'1px solid rgba(10,9,8,0.08)', padding:'64px 0' }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1.6fr', gap:'80px', alignItems:'start' }}>
              <div>
                <p style={{ fontFamily:"'DM Sans'", fontSize:'10px', fontWeight:500, letterSpacing:'2.5px', textTransform:'uppercase', color:'var(--warm-mid)', marginBottom:'24px' }}>About</p>
                <h2 style={{ fontFamily:"'Georgia','Times New Roman',serif", fontWeight:400, fontSize:'28px', color:INK, lineHeight:1.25, letterSpacing:'-0.3px' }}>I build things<br/>that actually matter.</h2>
              </div>
              <div>
                <p style={{ color:'rgba(10,9,8,0.62)', lineHeight:1.85, fontSize:'14px', marginBottom:'18px' }}>I'm Ashfaq — an engineer drawn to messy, open-ended problems with no obvious solution. I study Electrical and Computer Engineering and Mathematics at Rutgers, and I build full-stack products from scratch: backend pipelines, AI integrations, clean UIs.</p>
                <p style={{ color:'rgba(10,9,8,0.62)', lineHeight:1.85, fontSize:'14px', marginBottom:'28px' }}>Right now I'm deep in AI-powered civic tech and developer tooling — exploring how LLMs, geospatial data, and real-time infrastructure can actually change how people interact with their cities and their money.</p>
                <div style={{ display:'flex', flexWrap:'wrap', gap:'8px', marginBottom:'16px' }}>
                  {homeTags.map(w=>(
                    <span key={w} onMouseEnter={()=>{setHoveredTag(w);hover(true);}} onMouseLeave={()=>{setHoveredTag(null);hover(false);}}
                      style={{ fontFamily:"'Georgia',serif", fontStyle:'italic', fontSize:hoveredTag===w?'16px':'14px', fontWeight:400, color:hoveredTag===w?INK:'rgba(10,9,8,0.25)', cursor:'none', transition:'all 0.2s', userSelect:'none', padding:'2px 0' }}>
                      {w}{' '}
                    </span>
                  ))}
                </div>
                {hoveredTag && <p style={{ fontFamily:"'DM Sans'", fontSize:'12px', color:'var(--warm-mid)', animation:'fadeUp 0.15s ease' }}>→ {tagLines[hoveredTag]}</p>}
              </div>
            </div>
          </div>

          {/* Recent work preview */}
          <div style={{ width:'82%', maxWidth:'1100px', margin:'0 auto', padding:'0 0 64px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:'40px' }}>
              <p style={{ fontFamily:"'DM Sans'", fontSize:'10px', fontWeight:500, letterSpacing:'2.5px', textTransform:'uppercase', color:'var(--warm-mid)' }}>Recent Work</p>
              <button onClick={()=>setPage('projects')} onMouseEnter={()=>hover(true)} onMouseLeave={()=>hover(false)}
                style={{ background:'none', border:'none', cursor:'none', fontFamily:"'DM Sans'", fontSize:'10px', fontWeight:500, letterSpacing:'1.5px', textTransform:'uppercase', color:'rgba(10,9,8,0.35)', display:'flex', alignItems:'center', gap:'4px', transition:'color 0.2s' }}
                onMouseOver={e=>(e.currentTarget.style.color=INK)} onMouseOut={e=>(e.currentTarget.style.color='rgba(10,9,8,0.35)')}>
                see all <ArrowUpRight size={10}/>
              </button>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'2px' }}>
              {projects.map((p,i)=>(
                <a key={i} href={p.url} target="_blank" rel="noreferrer" onMouseEnter={()=>hover(true)} onMouseLeave={()=>hover(false)}
                  style={{ textDecoration:'none', display:'block', border:'1px solid rgba(10,9,8,0.08)', padding:'32px', transition:'background 0.2s' }}
                  onMouseOver={e=>(e.currentTarget.style.background='rgba(10,9,8,0.02)')} onMouseOut={e=>(e.currentTarget.style.background='transparent')}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'12px' }}>
                    <span style={{ fontFamily:"'DM Sans'", fontSize:'9px', fontWeight:500, letterSpacing:'2px', textTransform:'uppercase', color:'var(--warm-mid)' }}>{p.tagline}</span>
                    <ArrowUpRight size={11} color="rgba(10,9,8,0.2)"/>
                  </div>
                  <h3 style={{ fontFamily:"'Georgia',serif", fontWeight:400, fontSize:'22px', color:INK, marginBottom:'10px', letterSpacing:'-0.3px' }}>{p.title}</h3>
                  <p style={{ fontFamily:"'DM Sans'", fontSize:'12px', color:'rgba(10,9,8,0.5)', lineHeight:1.7, marginBottom:'20px' }}>{p.desc.slice(0,110)}…</p>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:'5px' }}>
                    {p.tags.slice(0,4).map((t,ti)=>(
                      <span key={ti} style={{ fontFamily:"'DM Sans'", fontSize:'9px', fontWeight:500, letterSpacing:'1.5px', textTransform:'uppercase', color:'rgba(10,9,8,0.3)', border:'1px solid rgba(10,9,8,0.12)', borderRadius:'20px', padding:'2px 8px' }}>{t}</span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div style={{ width:'82%', maxWidth:'1100px', margin:'0 auto', borderTop:'1px solid rgba(10,9,8,0.08)', padding:'28px 0', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <span style={{ fontFamily:"'DM Sans'", fontSize:'10px', letterSpacing:'2px', textTransform:'uppercase', color:'rgba(10,9,8,0.3)' }}>Portfolio — 2025</span>
            <div style={{ display:'flex', gap:'20px' }}>
              {socialLinks.map((s,i)=>(
                <a key={i} href={s.url} target="_blank" rel="noreferrer" onMouseEnter={()=>hover(true)} onMouseLeave={()=>hover(false)}
                  style={{ color:'rgba(10,9,8,0.3)', textDecoration:'none', transition:'color 0.2s', display:'flex' }}
                  onMouseOver={e=>(e.currentTarget.style.color=INK)} onMouseOut={e=>(e.currentTarget.style.color='rgba(10,9,8,0.3)')}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══════ PROJECTS ══════ */}
      {page==='projects' && (
        <div style={{ paddingTop:'110px', width:'82%', maxWidth:'1100px', margin:'0 auto', paddingBottom:'80px' }}>
          <p style={{ fontFamily:"'DM Sans'", fontSize:'10px', fontWeight:500, letterSpacing:'2.5px', textTransform:'uppercase', color:'var(--warm-mid)', marginBottom:'12px' }}>Selected Work</p>
          <h2 style={{ fontFamily:"'Georgia','Times New Roman',serif", fontWeight:400, fontSize:'clamp(32px,5vw,56px)', color:INK, letterSpacing:'-1px', lineHeight:1.1, marginBottom:'64px' }}>Things I've built<br/>that actually work.</h2>
          {projects.map((p,i)=>(
            <div key={i} style={{ borderTop:'1px solid rgba(10,9,8,0.08)', padding:'56px 0', display:'grid', gridTemplateColumns:'1fr 1.4fr', gap:'80px', alignItems:'start' }}>
              <div>
                <div style={{ display:'flex', alignItems:'baseline', gap:'16px', marginBottom:'8px' }}>
                  <h3 style={{ fontFamily:"'Georgia',serif", fontWeight:400, fontSize:'32px', color:INK, letterSpacing:'-0.5px' }}>{p.title}</h3>
                  <span style={{ fontFamily:"'DM Sans'", fontSize:'10px', color:'var(--warm-mid)', letterSpacing:'1px' }}>{p.year}</span>
                </div>
                <p style={{ fontFamily:"'Georgia',serif", fontStyle:'italic', fontSize:'14px', color:'rgba(10,9,8,0.45)', marginBottom:'32px' }}>{p.tagline}</p>
                <div style={{ display:'flex', flexDirection:'column', gap:'16px', marginBottom:'36px' }}>
                  {p.impact.map((stat,si)=>(
                    <div key={si} style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', borderBottom:'1px solid rgba(10,9,8,0.06)', paddingBottom:'12px' }}>
                      <span style={{ fontFamily:"'DM Sans'", fontSize:'10px', fontWeight:500, letterSpacing:'1.5px', textTransform:'uppercase', color:'rgba(10,9,8,0.4)' }}>{stat.label}</span>
                      <span style={{ fontFamily:"'Georgia',serif", fontSize:'20px', color:INK, letterSpacing:'-0.3px' }}>{stat.value}</span>
                    </div>
                  ))}
                </div>
                <a href={p.url} target="_blank" rel="noreferrer" onMouseEnter={()=>hover(true)} onMouseLeave={()=>hover(false)}
                  style={{ display:'inline-flex', alignItems:'center', gap:'6px', fontFamily:"'DM Sans'", fontSize:'10px', fontWeight:500, letterSpacing:'2px', textTransform:'uppercase', color:INK, textDecoration:'none', borderBottom:`1px solid ${INK}`, paddingBottom:'3px', transition:'opacity 0.2s' }}
                  onMouseOver={e=>(e.currentTarget.style.opacity='0.5')} onMouseOut={e=>(e.currentTarget.style.opacity='1')}>
                  View Live <ExternalLink size={10}/>
                </a>
              </div>
              <div>
                <p style={{ color:'rgba(10,9,8,0.62)', lineHeight:1.85, fontSize:'14px', marginBottom:'28px' }}>{p.desc}</p>
                <div style={{ display:'flex', flexWrap:'wrap', gap:'6px' }}>
                  {p.tags.map((t,ti)=>(
                    <span key={ti} style={{ fontFamily:"'DM Sans'", fontSize:'9px', fontWeight:500, letterSpacing:'1.5px', textTransform:'uppercase', color:'rgba(10,9,8,0.35)', border:'1px solid rgba(10,9,8,0.14)', borderRadius:'20px', padding:'3px 10px' }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ══════ PLAYGROUND ══════ */}
      {page==='play' && (
        <div style={{ paddingTop:'110px', width:'82%', maxWidth:'1100px', margin:'0 auto', paddingBottom:'80px' }}>
          <p style={{ fontFamily:"'DM Sans'", fontSize:'10px', fontWeight:500, letterSpacing:'2.5px', textTransform:'uppercase', color:'var(--warm-mid)', marginBottom:'12px' }}>Playground</p>
          <h2 style={{ fontFamily:"'Georgia','Times New Roman',serif", fontWeight:400, fontSize:'clamp(32px,5vw,56px)', color:INK, letterSpacing:'-1px', lineHeight:1.1, marginBottom:'64px' }}>Leave your mark.</h2>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'48px', alignItems:'start' }}>
            <div>
              <p style={{ fontFamily:"'DM Sans'", fontSize:'11px', color:'rgba(10,9,8,0.45)', marginBottom:'24px', lineHeight:1.7 }}>Every visitor leaves one word. They accumulate here — a living portrait of everyone who's passed through.</p>
              <div style={{ position:'relative', width:'100%', paddingBottom:'90%', border:'1px solid rgba(10,9,8,0.08)', background:'rgba(10,9,8,0.015)', overflow:'hidden' }}>
                <div style={{ position:'absolute', inset:0 }}>
                  {words.map((w,i)=>(
                    <span key={i} style={{ position:'absolute', left:`${w.x}%`, top:`${w.y}%`, fontSize:`${w.size}px`, opacity:w.opacity, fontFamily:"'Georgia',serif", fontStyle:i%3===0?'italic':'normal', color:INK, transform:'translate(-50%,-50%)', whiteSpace:'nowrap', pointerEvents:'none', userSelect:'none' }}>{w.text}</span>
                  ))}
                  {words.length===0 && <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}><p style={{ fontFamily:"'Georgia',serif", fontStyle:'italic', fontSize:'14px', color:'rgba(10,9,8,0.2)' }}>be the first.</p></div>}
                </div>
              </div>
            </div>
            <div>
              <div style={{ marginBottom:'56px' }}>
                <p style={{ fontFamily:"'DM Sans'", fontSize:'10px', fontWeight:500, letterSpacing:'2.5px', textTransform:'uppercase', color:'var(--warm-mid)', marginBottom:'20px' }}>Drop a word</p>
                <div style={{ display:'flex', border:'1px solid rgba(10,9,8,0.15)', overflow:'hidden' }}>
                  <input value={wordInput} onChange={e=>setWordInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&addWord()} maxLength={20} placeholder="one word..."
                    style={{ flex:1, border:'none', outline:'none', background:'transparent', fontFamily:"'Georgia',serif", fontStyle:'italic', fontSize:'15px', color:INK, padding:'14px 16px' }}/>
                  <button onClick={addWord} onMouseEnter={()=>hover(true)} onMouseLeave={()=>hover(false)}
                    style={{ background:INK, border:'none', cursor:'none', color:CREAM, fontFamily:"'DM Sans'", fontSize:'10px', fontWeight:500, letterSpacing:'2px', textTransform:'uppercase', padding:'0 20px', transition:'opacity 0.2s' }}
                    onMouseOver={e=>(e.currentTarget.style.opacity='0.75')} onMouseOut={e=>(e.currentTarget.style.opacity='1')}>Add</button>
                </div>
                {wordSubmitted && <p style={{ fontFamily:"'Georgia',serif", fontStyle:'italic', fontSize:'12px', color:'var(--warm-mid)', marginTop:'10px', animation:'fadeUp 0.2s ease' }}>your word is out there now.</p>}
              </div>
              <div>
                <p style={{ fontFamily:"'DM Sans'", fontSize:'10px', fontWeight:500, letterSpacing:'2.5px', textTransform:'uppercase', color:'var(--warm-mid)', marginBottom:'20px' }}>Who is Ashfaq?</p>
                <p style={{ fontFamily:"'DM Sans'", fontSize:'12px', color:'rgba(10,9,8,0.4)', marginBottom:'20px' }}>Hover a word.</p>
                <div style={{ display:'flex', flexWrap:'wrap', gap:'10px', marginBottom:'24px' }}>
                  {homeTags.map(w=>(
                    <span key={w} onMouseEnter={()=>{setHoveredTag(w);hover(true);}} onMouseLeave={()=>{setHoveredTag(null);hover(false);}}
                      style={{ fontFamily:"'Georgia',serif", fontStyle:'italic', fontSize:'22px', fontWeight:hoveredTag===w?700:400, color:hoveredTag===w?INK:'rgba(10,9,8,0.18)', cursor:'none', transition:'all 0.2s', userSelect:'none' }}>
                      {w}
                    </span>
                  ))}
                </div>
                <div style={{ minHeight:'48px', borderTop:'1px solid rgba(10,9,8,0.08)', paddingTop:'16px' }}>
                  {hoveredTag ? <p style={{ fontFamily:"'DM Sans'", fontSize:'14px', color:INK, animation:'fadeUp 0.15s ease' }}>{tagLines[hoveredTag]}</p>
                    : <p style={{ fontFamily:"'DM Sans'", fontSize:'13px', color:'rgba(10,9,8,0.2)', fontStyle:'italic' }}>&nbsp;</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════ RELAX ══════ */}
      {page==='relax' && (
        <div style={{ paddingTop:'110px', width:'82%', maxWidth:'1100px', margin:'0 auto', paddingBottom:'80px' }}>
          <p style={{ fontFamily:"'DM Sans'", fontSize:'10px', fontWeight:500, letterSpacing:'2.5px', textTransform:'uppercase', color:'var(--warm-mid)', marginBottom:'12px' }}>Relax</p>
          <h2 style={{ fontFamily:"'Georgia','Times New Roman',serif", fontWeight:400, fontSize:'clamp(32px,5vw,56px)', color:INK, letterSpacing:'-1px', lineHeight:1.1, marginBottom:'16px' }}>Take a moment.</h2>
          <p style={{ fontFamily:"'Georgia',serif", fontStyle:'italic', fontSize:'15px', color:'rgba(10,9,8,0.4)', marginBottom:'56px' }}>Three games. No pressure. Play something.</p>

          {/* Game selector */}
          {activeGame === 'none' && (
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'2px' }}>
              {([
                { id:'pong' as Game, title:'Pong', sub:'A classic rally', desc:'Arrow keys to move your paddle. First to 7 wins.' },
                { id:'snake' as Game, title:'Snake', sub:'Collect & grow', desc:'Navigate with arrow keys. Don\'t bite yourself.' },
                { id:'tetris' as Game, title:'Tetris', sub:'Stack & clear', desc:'Arrange falling pieces. Clear lines to score.' },
              ]).map(g=>(
                <button key={g.id} onClick={()=>setActiveGame(g.id)} onMouseEnter={()=>hover(true)} onMouseLeave={()=>hover(false)}
                  style={{ background:'none', border:'1px solid rgba(10,9,8,0.1)', padding:'40px 32px', textAlign:'left', cursor:'none', transition:'background 0.2s', display:'flex', flexDirection:'column', gap:'12px' }}
                  onMouseOver={e=>(e.currentTarget.style.background='rgba(10,9,8,0.02)')} onMouseOut={e=>(e.currentTarget.style.background='transparent')}>
                  <span style={{ fontFamily:"'DM Sans'", fontSize:'9px', fontWeight:500, letterSpacing:'2.5px', textTransform:'uppercase', color:'var(--warm-mid)' }}>{g.sub}</span>
                  <span style={{ fontFamily:"'Georgia',serif", fontWeight:400, fontSize:'28px', color:INK, letterSpacing:'-0.5px' }}>{g.title}</span>
                  <span style={{ fontFamily:"'DM Sans'", fontSize:'12px', color:'rgba(10,9,8,0.45)', lineHeight:1.6 }}>{g.desc}</span>
                  <span style={{ fontFamily:"'DM Sans'", fontSize:'10px', fontWeight:500, letterSpacing:'1.5px', textTransform:'uppercase', color:INK, marginTop:'8px', display:'flex', alignItems:'center', gap:'4px' }}>Play <ArrowUpRight size={10}/></span>
                </button>
              ))}
            </div>
          )}

          {/* Active game */}
          {activeGame !== 'none' && (
            <div>
              <div style={{ display:'flex', alignItems:'center', gap:'24px', marginBottom:'40px' }}>
                <button onClick={()=>setActiveGame('none')} onMouseEnter={()=>hover(true)} onMouseLeave={()=>hover(false)}
                  style={{ background:'none', border:'none', cursor:'none', fontFamily:"'DM Sans'", fontSize:'10px', fontWeight:500, letterSpacing:'2px', textTransform:'uppercase', color:'rgba(10,9,8,0.35)', display:'flex', alignItems:'center', gap:'6px', transition:'color 0.2s' }}
                  onMouseOver={e=>(e.currentTarget.style.color=INK)} onMouseOut={e=>(e.currentTarget.style.color='rgba(10,9,8,0.35)')}>
                  ← back
                </button>
                <div style={{ display:'flex', gap:'16px' }}>
                  {(['pong','snake','tetris'] as Game[]).map(g=>(
                    <button key={g} onClick={()=>setActiveGame(g)} onMouseEnter={()=>hover(true)} onMouseLeave={()=>hover(false)}
                      style={{ background:'none', border:'none', cursor:'none', fontFamily:"'DM Sans'", fontSize:'10px', fontWeight:500, letterSpacing:'2px', textTransform:'uppercase', color:activeGame===g?INK:'rgba(10,9,8,0.3)', borderBottom:activeGame===g?`1px solid ${INK}`:'1px solid transparent', paddingBottom:'2px', transition:'all 0.2s' }}>
                      {g}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ display:'flex', justifyContent:'center' }}>
                {activeGame==='pong' && <PongGame key="pong"/>}
                {activeGame==='snake' && <SnakeGame key="snake"/>}
                {activeGame==='tetris' && <TetrisGame key="tetris"/>}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
