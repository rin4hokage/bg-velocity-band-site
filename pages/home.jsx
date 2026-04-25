function HomePage() {
  const { navigate } = useRouter();
  return (
    <div className="bg-page">
      <Nav />

      {/* Hero */}
      <section className="bg-hero-fullbleed">
        <div className="bg-hero-img-slot">
          <BreathingGradient
            colors={['#0F0520', '#3A0D7A', '#5C1A9E', 'rgba(212,175,55,0.15)', 'transparent']}
            stops={[0, 25, 50, 75, 100]}
            speed={0.012}
            range={8}
            startGap={115}
          />
          <img src="hero.png" alt="BG Barry Golden and the Velocity Band performing live" style={{ position: 'relative', zIndex: 1 }} />
        </div>
        <div className="bg-hero-overlay-left" />
        <div className="bg-hero-overlay-bottom" />
        <div className="bg-hero-content">
          <div className="bg-hero-content-inner">
            <div style={{ marginBottom: 28 }}><Eyebrow>Est. Velocity Sound</Eyebrow></div>
            <h1 className="bg-hero-name">
              <span className="line-1">Barry</span>
              <span className="line-2">Golden</span>
              <span className="line-3">&amp; The Velocity Band</span>
            </h1>
            <div className="bg-hero-ctas">
              <a href="#" className="bg-btn solid" onClick={e => { e.preventDefault(); navigate('booking'); }}>Book the Band</a>
              <a href="#" className="bg-btn" onClick={e => { e.preventDefault(); navigate('press'); }}>View Press Kit</a>
            </div>
          </div>
        </div>
        <div className="bg-hero-ticker">
          <span>Soul · Funk · R&amp;B</span>
          <span className="ticker-dot">·</span>
          <span>Est. Velocity Sound</span>
          <span className="ticker-dot">·</span>
          <span>Available for Private Events &amp; Festivals</span>
          <span className="ticker-dot">·</span>
          <span>Booking Open · 2026</span>
        </div>
      </section>

      <GoldDivider />

      {/* About teaser */}
      <section className="bg-section reveal">
        <div className="bg-two-col narrow-left">
          <Portrait label="[ BARRY · PORTRAIT 01 ]" glyph="BG" />
          <div className="bg-bio-copy">
            <div><Eyebrow>The Man Behind the Sound</Eyebrow></div>
            <h2 style={{ marginTop: 14 }}>Header 1</h2>
            <p style={{ marginTop: 20 }}>
              <span className="bg-placeholder">[ BIO PARAGRAPH 1 ]</span>.
            </p>
            <p>
              <span className="bg-placeholder">[ BIO PARAGRAPH 2 ]</span>
            </p>
            <a href="#" className="bg-btn small" style={{ marginTop: 14 }} onClick={e => { e.preventDefault(); navigate('bio'); }}>Read Full Bio</a>
          </div>
        </div>
      </section>

      <GoldDivider />
      <FinalCTA />
      <Footer />
    </div>
  );
}
Object.assign(window, { HomePage });
