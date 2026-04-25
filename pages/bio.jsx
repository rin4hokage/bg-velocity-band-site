function BioPage() {
  const { navigate } = useRouter();

  const bandMembers = [
  { name: '[ Member Name ]', role: '[ Instrument · Role ]', location: '[ City, State ]', bio: '[ SHORT BIO — 2 to 3 sentences about this member, their background, and what they bring to the band. ]' },
  { name: '[ Member Name ]', role: '[ Instrument · Role ]', location: '[ City, State ]', bio: '[ SHORT BIO — 2 to 3 sentences about this member, their background, and what they bring to the band. ]' },
  { name: '[ Member Name ]', role: '[ Instrument · Role ]', location: '[ City, State ]', bio: '[ SHORT BIO — 2 to 3 sentences about this member, their background, and what they bring to the band. ]' },
  { name: '[ Member Name ]', role: '[ Instrument · Role ]', location: '[ City, State ]', bio: '[ SHORT BIO — 2 to 3 sentences about this member, their background, and what they bring to the band. ]' },
  { name: '[ Member Name ]', role: '[ Instrument · Role ]', location: '[ City, State ]', bio: '[ SHORT BIO — 2 to 3 sentences about this member, their background, and what they bring to the band. ]' },
  { name: '[ Member Name ]', role: '[ Instrument · Role ]', location: '[ City, State ]', bio: '[ SHORT BIO — 2 to 3 sentences about this member, their background, and what they bring to the band. ]' }];


  return (
    <div className="bg-page">
      <Nav />
      <PageHeader
        eyebrow="The Man Behind The Sound"
        title={<em>Bio</em>}
        lede="short bio" />
      

      {/* ── Barry featured card ── */}
      <section className="bg-section narrow" style={{ paddingTop: 0 }}>
        <div className="bio-featured-card">
          {/* Circular portrait */}
          <div className="bio-circle-wrap bio-circle-featured">
            <div className="bio-circle">
              <span className="bio-circle-initials">BG</span>
              <span className="bio-circle-label">[ PORTRAIT ]</span>
            </div>
            <div className="bio-circle-ring" />
          </div>

          <div className="bio-featured-body">
            <div style={{ marginBottom: 10 }}><Eyebrow>Bandleader · Vocalist</Eyebrow></div>
            <h2 className="bio-featured-name">Barry <em style={{ color: 'var(--gold)' }}>Golden</em></h2>
            <p className="bio-featured-role">[ Instrument / Role ] &nbsp;·&nbsp; <span style={{ color: 'var(--ivory-muted)', fontStyle: 'italic' }}>Based in [ City, State ]</span></p>

            <div className="pull-quote" style={{ marginTop: 28 }}>

            </div>

            <p style={{ color: 'var(--ivory-muted)', fontSize: 15, lineHeight: 1.85, marginBottom: 16 }}>
              <span className="bg-placeholder">[ BIO PARAGRAPH 1 ]</span>
            </p>
            <p style={{ color: 'var(--ivory-muted)', fontSize: 15, lineHeight: 1.85, marginBottom: 16 }}>
              <span className="bg-placeholder">[ BIO PARAGRAPH 2 ]</span>
            </p>
            <p style={{ color: 'var(--ivory-muted)', fontSize: 15, lineHeight: 1.85 }}>
              <span className="bg-placeholder"></span>
            </p>
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* ── Stats ── */}
      <section className="bg-section narrow" style={{ paddingTop: 0 }}>
        <div className="bg-stats">
          <div className="bg-stat"><div className="bg-stat-number"><em>[  ]</em></div><div className="bg-stat-label">Years Performing</div></div>
          <div className="bg-stat"><div className="bg-stat-number"><em>[  ]</em></div><div className="bg-stat-label">Shows Played</div></div>
          <div className="bg-stat"><div className="bg-stat-number"><em>[  ]</em></div><div className="bg-stat-label">States Toured</div></div>
        </div>
      </section>

      <GoldDivider />

      {/* ── Band member cards ── */}
      <section className="bg-section narrow">
        <SectionHead eyebrow="The Velocity Band" title="Meet the Members" subtitle="Eight players deep when the room calls for it, four when it calls for something tighter." />

        <div className="bio-grid">
          {bandMembers.map((m, i) =>
          <div key={i} className="bio-member-card">
              {/* Circle photo */}
              <div className="bio-circle-wrap">
                <div className="bio-circle bio-circle-sm">
                  <span className="bio-circle-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="bio-circle-label">[ PHOTO ]</span>
                </div>
                <div className="bio-circle-ring bio-circle-ring-sm" />
              </div>

              <div className="bio-card-body">
                <h3 className="bio-member-name">{m.name}</h3>
                <p className="bio-member-role">{m.role}</p>
                <p className="bio-member-bio">{m.bio}</p>
                <p className="bio-member-location">
                  <em>(Located in {m.location})</em>
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      <GoldDivider />
      <FinalCTA title="Bring the room to life." body="Tell us the date and the vibe. We will build the set around it." />
      <Footer />
    </div>);

}
Object.assign(window, { BioPage });