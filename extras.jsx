// Extra visual components: ExpandCards, AnimatedDock, BreathingGradient

const { useRef, useState, useEffect } = React;

// ── Breathing gradient background ────────────────────────
function BreathingGradient({ colors, stops, speed = 0.015, range = 6, startGap = 120 }) {
  const ref = useRef(null);
  useEffect(() => {
    let raf, w = startGap, dir = 1;
    function tick() {
      if (w >= startGap + range) dir = -1;
      if (w <= startGap - range) dir = 1;
      w += dir * speed;
      const stopsStr = stops.map((s, i) => `${colors[i]} ${s}%`).join(', ');
      if (ref.current) {
        ref.current.style.background =
          `radial-gradient(${w}% ${w * 0.9}% at 50% 20%, ${stopsStr})`;
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <div ref={ref} style={{
      position: 'absolute', inset: 0, zIndex: 0,
      transition: 'background 0.1s',
    }} />
  );
}

// ── Expand on hover cards ─────────────────────────────────
function ExpandCards({ items }) {
  const [expanded, setExpanded] = useState(0);
  return (
    <div className="expand-cards-wrap">
      {items.map((item, i) => (
        <div
          key={i}
          className={`expand-card${expanded === i ? ' expanded' : ''}`}
          onMouseEnter={() => setExpanded(i)}
          style={{ '--expand-bg': item.bg || 'var(--bg-card)' }}
        >
          {item.img ? (
            <img src={item.img} alt={item.label} />
          ) : (
            <div className="expand-card-placeholder">
              <span className="expand-card-tag">{item.tag}</span>
              <span className="expand-card-num">{String(i + 1).padStart(2, '0')}</span>
            </div>
          )}
          <div className="expand-card-label">
            <span className="expand-tag">{item.tag}</span>
            <span className="expand-title">{item.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Animated dock ─────────────────────────────────────────
function AnimatedDock({ items }) {
  const [hovered, setHovered] = useState(null);
  const dockRef = useRef(null);
  const [mouseX, setMouseX] = useState(null);

  function handleMouseMove(e) {
    const rect = dockRef.current?.getBoundingClientRect();
    if (rect) setMouseX(e.clientX - rect.left);
  }

  function getScale(i) {
    if (mouseX === null) return 1;
    const itemW = 60;
    const center = i * (itemW + 16) + itemW / 2;
    const dist = Math.abs(mouseX - center);
    const maxDist = 120;
    if (dist > maxDist) return 1;
    return 1 + 0.7 * (1 - dist / maxDist);
  }

  return (
    <div
      ref={dockRef}
      className="animated-dock"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMouseX(null)}
    >
      {items.map((item, i) => {
        const scale = getScale(i);
        return (
          <a
            key={i}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="dock-item"
            style={{ transform: `scale(${scale}) translateY(${-(scale - 1) * 18}px)` }}
            title={item.label}
          >
            <span className="dock-icon">{item.icon}</span>
            <span className="dock-label">{item.label}</span>
          </a>
        );
      })}
    </div>
  );
}

Object.assign(window, { BreathingGradient, ExpandCards, AnimatedDock });
