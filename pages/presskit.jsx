function PressKitPage() {
  const { navigate } = useRouter();

  const downloads = [
    { icon: '§', title: 'Full Press Kit', meta: 'PDF · Available on request', desc: 'Bio, one-sheet, stage plot, and high-resolution imagery in a single download.' },
    { icon: '&', title: 'Logo & Wordmark Pack', meta: 'ZIP · SVG, PNG, EPS', desc: 'The BG monogram, wordmark, and usage guidelines in every format a printer will ask for.' },
    { icon: '¶', title: 'Hi-Res Promo Photos', meta: 'ZIP · Available on request', desc: 'Live, studio, and portrait imagery cleared for press and promoter use.' },
  ];

  return (
    <div className="bg-page">
      <Nav />
      <PageHeader
        eyebrow="For Promoters & Press"
        title={<em>Press Kit</em>}
        lede="Everything you need to write us up or book the room."
      />

      <section className="bg-section narrow">
        {downloads.map((d, i) => (
          <div key={i} className="bg-press-download">
            <div className="icon"><em>{d.icon}</em></div>
            <div>
              <h3>{d.title}</h3>
              <div className="meta">{d.meta}</div>
              <p style={{ color: 'var(--ivory-muted)', fontSize: 13, marginTop: 8, lineHeight: 1.6 }}>{d.desc}</p>
            </div>
            <a href="mailto:booking@barrygolden.com" className="bg-btn small">Request</a>
          </div>
        ))}
      </section>

      <GoldDivider />

      <FinalCTA title="Need something else?" body="" />
      <Footer />
    </div>
  );
}
Object.assign(window, { PressKitPage });
