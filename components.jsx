// Router + shared components for BG Velocity Band SPA

const { useState, useContext, createContext, useEffect, useRef } = React;

// ─── Router ───────────────────────────────────────────────
const RouterCtx = createContext(null);

function useRouter() {return useContext(RouterCtx);}

function RouterProvider({ children }) {
  const [page, setPage] = useState(() => {
    try {return localStorage.getItem('bg-page') || 'home';} catch {return 'home';}
  });

  function navigate(p) {
    setPage(p);
    try {localStorage.setItem('bg-page', p);} catch {}
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  return (
    <RouterCtx.Provider value={{ page, navigate }}>
      {children}
    </RouterCtx.Provider>);

}

// ─── Wordmark ─────────────────────────────────────────────
function Wordmark({ size = 24 }) {
  const { navigate } = useRouter();
  return (
    <div
      className="bg-wordmark"
      style={{ fontSize: size, cursor: 'pointer' }}
      onClick={() => navigate('home')}>
      
      <span className="purple">Barry</span><span className="gold">Golden</span>
    </div>);

}

// ─── Nav ──────────────────────────────────────────────────
const NAV_ITEMS = [
{ label: 'Home', key: 'home' },
{ label: 'Bio', key: 'bio' },
{ label: 'Press Kit', key: 'press' },
{ label: 'Booking', key: 'booking' },
{ label: 'Contact', key: 'contact' },
{ label: 'Media', key: 'media' }];


function Nav() {
  const { page, navigate } = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);
  const collapseY = useRef(0);

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      setScrolled(y > 20);
      if (!collapsed && y > lastY.current && y > 150) {
        setCollapsed(true);
        collapseY.current = y;
      } else if (collapsed && y < lastY.current && collapseY.current - y > 80) {
        setCollapsed(false);
      }
      lastY.current = y;
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [collapsed]);

  return (
    <>
      {/* Collapsed pill — appears when nav hides */}
      <div
        className={`bg-nav-pill${collapsed ? ' visible' : ''}`}
        onClick={() => setCollapsed(false)}
        role="button"
        aria-label="Expand navigation">
        
        <span className="bg-nav-pill-mono">BG</span>
        <span className="bg-nav-pill-hint">Menu</span>
      </div>

      {/* Full nav */}
      <nav className={`bg-nav${scrolled ? ' scrolled' : ''}${collapsed ? ' nav-hidden' : ''}`}>
        <Wordmark />

        <ul className="bg-nav-links">
          {NAV_ITEMS.map((n) =>
          <li key={n.key}>
              <a
              href="#"
              className={page === n.key ? 'active' : ''}
              onClick={(e) => {e.preventDefault();navigate(n.key);}}>
              
                {n.label}
                {page === n.key && <span className="nav-active-dot" />}
              </a>
            </li>
          )}
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button className="bg-hamburger" onClick={() => setMenuOpen((o) => !o)} aria-label="Menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {menuOpen &&
      <div className="bg-mobile-overlay" onClick={() => setMenuOpen(false)}>
          <div className="bg-mobile-menu" onClick={(e) => e.stopPropagation()}>
            <button className="bg-mobile-close" onClick={() => setMenuOpen(false)}>✕</button>
            <Wordmark size={30} />
            <ul>
              {NAV_ITEMS.map((n) =>
            <li key={n.key}>
                  <a
                href="#"
                className={page === n.key ? 'active' : ''}
                onClick={(e) => {e.preventDefault();navigate(n.key);setMenuOpen(false);}}>
                {n.label}</a>
                </li>
            )}
              <li>
                <a href="#" className="bg-btn solid" style={{ display: 'inline-flex', marginTop: 24 }}
              onClick={(e) => {e.preventDefault();navigate('booking');setMenuOpen(false);}}>
                  Book the Band
                </a>
              </li>
            </ul>
          </div>
        </div>
      }
    </>);

}

// ─── Shared primitives ────────────────────────────────────
function GoldDivider() {
  return (
    <div className="bg-divider">
      <span className="monogram">BG</span>
    </div>);

}

function Eyebrow({ children, style }) {
  return <span className="bg-eyebrow" style={style}>{children}</span>;
}

function SectionHead({ eyebrow, title, subtitle }) {
  return (
    <div className="bg-section-head">
      {eyebrow && <div><Eyebrow>{eyebrow}</Eyebrow></div>}
      <h2 className="bg-section-title">{title}</h2>
      {subtitle &&
      <p style={{ color: 'var(--ivory-muted)', maxWidth: 580, margin: '20px auto 0', fontSize: 15, lineHeight: 1.7 }}>
          {subtitle}
        </p>
      }
    </div>);

}

function Portrait({ label = '[ PORTRAIT PLACEHOLDER ]', glyph = 'BG' }) {
  return (
    <div className="bg-portrait">
      <span className="corner tl"></span>
      <span className="corner tr"></span>
      <span className="corner bl"></span>
      <span className="corner br"></span>
      <span className="placeholder-glyph">{glyph}</span>
      <span className="placeholder-label">{label}</span>
    </div>);

}

function PageHeader({ eyebrow, title, lede }) {
  return (
    <header className="bg-page-header">
      <div><Eyebrow>{eyebrow}</Eyebrow></div>
      <h1>{title}</h1>
      {lede && <p className="lede">{lede}</p>}
    </header>);

}

function FinalCTA({
  title = 'Ready to book?',
  body = 'Tell us the room, the date, and the mood. We will send you a hold within 24 hours.'
}) {
  const { navigate } = useRouter();
  return (
    <section className="bg-final-cta">
      <div style={{ marginBottom: 18 }}><Eyebrow>Est. Velocity Sound</Eyebrow></div>
      <h2>{title}</h2>
      <p>{body}</p>
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
        <a href="#" className="bg-btn solid" onClick={(e) => {e.preventDefault();navigate('booking');}}>
          Book the Band
        </a>
        <a href="#" className="bg-btn" onClick={(e) => {e.preventDefault();navigate('press');}}>
          Download Press Kit
        </a>
      </div>
    </section>);

}

function Footer() {
  const { navigate } = useRouter();
  return (
    <footer className="bg-footer">
      <div className="bg-footer-top">
        <div>
          <Wordmark size={22} />
          <p style={{ color: 'var(--ivory-muted)', fontSize: 13, lineHeight: 1.7, marginTop: 16, maxWidth: 320 }}>
            Soul, funk, and originals out of [ HOME CITY ]. Booking private events, theatres, and festivals nationwide.
          </p>
        </div>
        <div>
          <h5>Site</h5>
          <ul>
            {[['Home', 'home'], ['Bio', 'bio'], ['Media', 'media'], ['Press Kit', 'press']].map(([l, k]) =>
            <li key={k}><a href="#" onClick={(e) => {e.preventDefault();navigate(k);}}>{l}</a></li>
            )}
          </ul>
        </div>
        <div>
          <h5>Book</h5>
          <ul>
            <li><a href="#" onClick={(e) => {e.preventDefault();navigate('booking');}}>Calendly</a></li>
            <li><a href="mailto:booking@barrygolden.com"></a></li>
          </ul>
        </div>
        <div>
          <h5>Follow</h5>
          <ul>
            {['Instagram', 'YouTube', 'Spotify', 'Facebook'].map((s) =>
            <li key={s}><a href="#">{s}</a></li>
            )}
          </ul>
        </div>
      </div>
      <div className="bg-footer-bottom">
        <div>&copy; 2026 BG Barry Golden and the Velocity Band</div>
        <div className="brand-line">Est. Velocity Sound</div>
        <div>All Rights Reserved</div>
      </div>
    </footer>);

}

Object.assign(window, {
  RouterProvider, useRouter, Nav, GoldDivider, Eyebrow, SectionHead,
  Portrait, PageHeader, FinalCTA, Footer, NAV_ITEMS
});