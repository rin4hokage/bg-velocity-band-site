function MediaPage() {
  const videos = [
    { id: 'MoItM1mnubc', type: 'video', title: 'BG Barry Golden & The Velocity Band', caption: 'Live Performance' },
    { id: 'YwFkqXzdFJI', type: 'video', title: '[ Video Title ]', caption: 'Live · [ Month Year ]' },
    { id: '09gRndX_frE', type: 'video', title: '[ Video Title ]', caption: 'Live · [ Month Year ]' },
    { id: '9lgrpQ8r8jM', type: 'video', title: '[ Video Title ]', caption: 'Live · [ Month Year ]' },
    { id: 'PLc7S8dU2dujWKuKYIHOLXMiklIzRC9kZQ', type: 'playlist', title: 'Full Performance Playlist', caption: 'All Videos · Barry Golden' },
  ];

  function getUrl(v) {
    return v.type === 'playlist'
      ? `https://www.youtube.com/playlist?list=${v.id}`
      : `https://www.youtube.com/watch?v=${v.id}`;
  }
  function getThumb(v) {
    return v.type === 'playlist' ? null : `https://img.youtube.com/vi/${v.id}/hqdefault.jpg`;
  }

  const filters = ['All', 'Live', 'Studio', 'Portraits', 'Behind The Scenes'];
  const [activeFilter, setActiveFilter] = React.useState('All');

  const photos = Array.from({ length: 6 }, (_, i) => {
    const tags = ['LIVE', 'STUDIO', 'PORTRAIT', 'BTS', 'LIVE', 'PORTRAIT'];
    return { id: i + 1, tag: tags[i] };
  });

  return (
    <div className="bg-page">
      <Nav />
      <PageHeader eyebrow="Live & In Frame" title={<em>Media</em>}
        lede="Footage from the road, the studio, and the quiet hour before doors." />

      <section className="bg-section narrow">
        <SectionHead eyebrow="On Video" title="Selected Performances" />
        <div className="bg-video-grid">
          {videos.map((v, i) => {
            const url = getUrl(v);
            const thumb = getThumb(v);
            return (
              <div key={i} className={`bg-video-thumb${v.type === 'playlist' ? ' bg-video-playlist' : ''}`}
                onClick={() => window.open(url, '_blank', 'noopener')}
                role="button" tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && window.open(url, '_blank', 'noopener')}
              >
                {thumb && <img src={thumb} alt={v.title} onError={e => e.target.style.display='none'} />}
                <div className="bg-video-thumb-overlay">
                  {v.type === 'playlist' && (
                    <div className="playlist-badge">&#9776; Playlist</div>
                  )}
                  <div className="play-btn">{v.type === 'playlist' ? '▶▶' : '▶'}</div>
                  <div className="v-label">{v.title}</div>
                  <div className="v-caption">{v.caption}</div>
                  <div style={{ fontSize: 9, letterSpacing: '0.2em', color: 'var(--gold)', textTransform: 'uppercase', marginTop: 4, opacity: 0.7 }}>
                    {v.type === 'playlist' ? 'View Playlist on YouTube ↗' : 'Watch on YouTube ↗'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ textAlign: 'center', marginTop: 44 }}>
          <a href="#" className="bg-btn">See The Full Channel</a>
        </div>
      </section>

      <GoldDivider />

      <section className="bg-section narrow">
        <SectionHead eyebrow="Photography" title="The Gallery" />
        <ExpandCards items={[
          { tag: 'LIVE', label: '[ Live Performance ]' },
          { tag: 'STUDIO', label: '[ Studio Session ]' },
          { tag: 'PORTRAIT', label: '[ Portrait ]' },
          { tag: 'BTS', label: '[ Behind The Scenes ]' },
          { tag: 'LIVE', label: '[ Live Performance ]' },
          { tag: 'PORTRAIT', label: '[ Portrait ]' },
        ]} />
      </section>

      <GoldDivider />
      <FinalCTA title="Want the show in your room?" body="Book a call or write us. We will build the set to the night you have in mind." />
      <Footer />
    </div>
  );
}
Object.assign(window, { MediaPage });
