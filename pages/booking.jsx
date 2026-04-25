function BookingPage() {
  const steps = [
  { n: '01', title: 'Pick a Time', body: 'Grab a 15 minute slot that works. We answer every inquiry, usually the same day.' },
  { n: '02', title: 'Quick Call', body: 'Room, date, headcount, vibe. We talk through the set and the tech, and send a hold the next morning.' },
  { n: '03', title: 'Lock It In', body: 'Contract, deposit, rider. You get a single point of contact from here to the downbeat.' }];


  return (
    <div className="bg-page">
      <Nav />
      <PageHeader eyebrow="Reserve The Band" title={<em>Booking</em>}
      lede="" />

      <section className="bg-section narrow">
        <SectionHead eyebrow="How It Works" title="From first note to first song." />
        <div className="bg-steps">
          {steps.map((s, i) =>
          <div key={i} className="bg-step">
              <div className="num"><em>{s.n}</em></div>
              <h4>{s.title}</h4>
              <p>{s.body}</p>
            </div>
          )}
        </div>
      </section>

      <GoldDivider />

      <section className="bg-section narrow">
        <SectionHead eyebrow="Schedule The Call" title="Pick a time that works." />
        <div className="bg-calendly">
          <div className="pill" style={{ marginBottom: 20 }}>Calendly Widget Embed</div>
          <div className="label"><em>Scheduler loads here.</em></div>
          <div className="helper">
            Set <code style={{ color: 'var(--gold)' }}>NEXT_PUBLIC_CALENDLY_URL</code> in environment to render
            the live inline widget. Until then, this placeholder stays put.
          </div>
          <a href="mailto:booking@barrygolden.com" className="bg-btn" style={{ marginTop: 8 }}>
            Or Email booking@barrygolden.com
          </a>
        </div>
      </section>

      <GoldDivider />

      <section className="bg-section narrow" style={{ paddingTop: 20, textAlign: 'center' }}>
        <div style={{ marginBottom: 18 }}><Eyebrow>Prefer Email?</Eyebrow></div>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: 44, color: 'var(--gold)', fontWeight: 400, marginBottom: 18 }}>barrygolden@gmail.com

        </h2>
        <p style={{ color: 'var(--ivory-muted)', fontSize: 15, lineHeight: 1.7 }}>
          Send the date, the room, and the headcount. We will reply within 24 hours with a hold and a proposal.
        </p>
      </section>

      <Footer />
    </div>);

}
Object.assign(window, { BookingPage });