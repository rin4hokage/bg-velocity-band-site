// Visual effects: scroll reveal, marquee, cursor glow, shimmer
// All progressive — degrades gracefully if slow.

const { useEffect, useRef } = React;

// ── Scroll reveal via IntersectionObserver ────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('revealed');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  });
}

// ── Cursor glow ───────────────────────────────────────────
function CursorGlow() {
  const dot = useRef(null);
  useEffect(() => {
    const el = dot.current;
    if (!el) return;
    let raf;
    let mx = -200, my = -200;
    function onMove(e) {
      mx = e.clientX; my = e.clientY;
      if (!raf) raf = requestAnimationFrame(tick);
    }
    function tick() {
      el.style.left = mx + 'px';
      el.style.top  = my + 'px';
      raf = null;
    }
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);
  return (
    <div
      ref={dot}
      style={{
        position: 'fixed',
        width: 400,
        height: 400,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 70%)',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 0,
        top: -200,
        left: -200,
        transition: 'opacity 0.3s',
      }}
    />
  );
}

// ── Marquee strip ─────────────────────────────────────────
const MARQUEE_ITEMS = [
  'Barry Golden', 'Velocity Band', 'Soul', 'Funk', 'R&B',
  'Est. Velocity Sound', 'Live Performances', 'Private Events',
  'Festivals', 'BG', 'Barry Golden', 'Velocity Band', 'Soul', 'Funk',
];

function Marquee() {
  return (
    <div className="bg-marquee-wrap">
      <div className="bg-marquee-track">
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
          <span key={i} className="bg-marquee-item">
            {item}
            <span className="bg-marquee-dot">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Effects orchestrator ──────────────────────────────────
function SiteEffects() {
  useReveal();
  return <CursorGlow />;
}

Object.assign(window, { SiteEffects, Marquee, useReveal });
