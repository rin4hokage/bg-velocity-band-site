// Tweaks panel for BG Velocity Band site
// Applies CSS custom property overrides + body classes for structural variants.

function SiteTweaks() {
  const defaults = /*EDITMODE-BEGIN*/{
    "colorTheme": "eggplant",
    "goldTone": "#C9A047",
    "heroSize": 104,
    "cardStyle": "hairline",
    "buttonRadius": 0,
    "bgTexture": "subtle",
    "navBlur": true,
    "sectionSpacing": 80,
    "dividerStyle": "diamond",
    "fontDisplay": "playfair"
  }/*EDITMODE-END*/;

  const [tweaks, set] = useTweaks(defaults);
  const [show, setShow] = React.useState(false);

  // Theme palettes
  const themes = {
    eggplant: {
      '--bg-deep': '#1A0A2E',
      '--bg-card': '#2A1248',
      '--bg-card-soft': '#2F1656',
      '--purple-accent': '#B084FF',
    },
    midnight: {
      '--bg-deep': '#060C1A',
      '--bg-card': '#0D1A30',
      '--bg-card-soft': '#132240',
      '--purple-accent': '#6EA8FE',
    },
    obsidian: {
      '--bg-deep': '#0A0A0A',
      '--bg-card': '#161616',
      '--bg-card-soft': '#222222',
      '--purple-accent': '#C9A047',
    },
    claret: {
      '--bg-deep': '#1A050E',
      '--bg-card': '#2E0A1C',
      '--bg-card-soft': '#3A1028',
      '--purple-accent': '#FF84C8',
    },
    forest: {
      '--bg-deep': '#050F0A',
      '--bg-card': '#0A1F14',
      '--bg-card-soft': '#0F2A1C',
      '--purple-accent': '#7FFFA4',
    },
  };

  const displayFonts = {
    playfair: "'Playfair Display', serif",
    cormorant: "'Cormorant Garamond', serif",
    didot: "'Bodoni Moda', serif",
  };

  // Apply all tweaks as CSS custom properties on :root
  React.useEffect(() => {
    const root = document.documentElement;
    const palette = themes[tweaks.colorTheme] || themes.eggplant;

    // Theme colors
    Object.entries(palette).forEach(([k, v]) => root.style.setProperty(k, v));

    // Gold
    root.style.setProperty('--gold', tweaks.goldTone);
    // Derived gold tones
    root.style.setProperty('--hairline', tweaks.goldTone + '59'); // ~35% opacity

    // Hero font size — set a CSS var used in hero h1
    root.style.setProperty('--hero-font-size', tweaks.heroSize + 'px');

    // Button radius
    document.querySelectorAll('.bg-btn').forEach(el => {
      el.style.borderRadius = tweaks.buttonRadius + 'px';
    });

    // Card style
    document.querySelectorAll('.bg-card, .bg-press-download, .bg-step, .bg-stat, .bg-fact, .bg-press-quote, .bg-social-card, .bg-video-tile, .bg-photo, .bg-tour-list').forEach(el => {
      if (tweaks.cardStyle === 'glow') {
        el.style.boxShadow = '0 0 40px rgba(201,160,71,0.12), inset 0 0 0 1px rgba(201,160,71,0.3)';
      } else if (tweaks.cardStyle === 'flat') {
        el.style.boxShadow = 'none';
        el.style.background = 'rgba(255,255,255,0.03)';
      } else {
        el.style.boxShadow = '';
        el.style.background = '';
      }
    });

    // Section spacing
    document.querySelectorAll('.bg-section').forEach(el => {
      el.style.paddingTop = tweaks.sectionSpacing + 'px';
      el.style.paddingBottom = tweaks.sectionSpacing + 'px';
    });

    // Background texture
    const bgPage = document.querySelectorAll('.bg-page');
    bgPage.forEach(el => {
      if (tweaks.bgTexture === 'none') {
        el.style.backgroundImage = 'none';
      } else if (tweaks.bgTexture === 'heavy') {
        el.style.backgroundImage = `
          repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(201,160,71,0.015) 3px, rgba(201,160,71,0.015) 4px),
          repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(201,160,71,0.015) 3px, rgba(201,160,71,0.015) 4px)
        `;
      } else {
        el.style.backgroundImage = '';
      }
    });

    // Display font
    const fontVal = displayFonts[tweaks.fontDisplay] || displayFonts.playfair;
    document.querySelectorAll('h1, h2, h3, h4, .bg-wordmark, .bg-section-title, .bg-tour-date, .bg-stat-number').forEach(el => {
      el.style.fontFamily = fontVal;
    });

    // Nav blur
    document.querySelectorAll('.bg-nav').forEach(el => {
      el.style.backdropFilter = tweaks.navBlur ? 'blur(12px)' : 'none';
    });
  });

  // Listen for host toggle
  React.useEffect(() => {
    function onMsg(e) {
      if (e.data?.type === '__activate_edit_mode') setShow(true);
      if (e.data?.type === '__deactivate_edit_mode') setShow(false);
    }
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  if (!show) return null;

  return (
    <TweaksPanel title="Tweaks" onClose={() => {
      setShow(false);
      window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*');
    }}>

      <TweakSection title="Color Scheme">
        <TweakRadio
          label="Theme"
          value={tweaks.colorTheme}
          options={[
            { value: 'eggplant', label: 'Eggplant (default)' },
            { value: 'midnight', label: 'Midnight Blue' },
            { value: 'obsidian', label: 'Obsidian + Gold' },
            { value: 'claret', label: 'Claret' },
            { value: 'forest', label: 'Forest' },
          ]}
          onChange={v => set('colorTheme', v)}
        />
        <TweakColor
          label="Gold Tone"
          value={tweaks.goldTone}
          onChange={v => set('goldTone', v)}
        />
      </TweakSection>

      <TweakSection title="Typography">
        <TweakRadio
          label="Display Font"
          value={tweaks.fontDisplay}
          options={[
            { value: 'playfair', label: 'Playfair Display' },
            { value: 'cormorant', label: 'Cormorant Garamond' },
            { value: 'didot', label: 'Bodoni Moda' },
          ]}
          onChange={v => set('fontDisplay', v)}
        />
        <TweakSlider
          label={`Hero Name Size — ${tweaks.heroSize}px`}
          min={64} max={160} step={8}
          value={tweaks.heroSize}
          onChange={v => set('heroSize', v)}
        />
      </TweakSection>

      <TweakSection title="Cards & Surfaces">
        <TweakRadio
          label="Card Style"
          value={tweaks.cardStyle}
          options={[
            { value: 'hairline', label: 'Hairline (default)' },
            { value: 'glow', label: 'Gold Glow' },
            { value: 'flat', label: 'Flat / Minimal' },
          ]}
          onChange={v => set('cardStyle', v)}
        />
        <TweakSlider
          label={`Button Radius — ${tweaks.buttonRadius}px`}
          min={0} max={32} step={2}
          value={tweaks.buttonRadius}
          onChange={v => set('buttonRadius', v)}
        />
      </TweakSection>

      <TweakSection title="Layout">
        <TweakSlider
          label={`Section Spacing — ${tweaks.sectionSpacing}px`}
          min={40} max={160} step={8}
          value={tweaks.sectionSpacing}
          onChange={v => set('sectionSpacing', v)}
        />
        <TweakRadio
          label="Background Texture"
          value={tweaks.bgTexture}
          options={[
            { value: 'none', label: 'None' },
            { value: 'subtle', label: 'Subtle (default)' },
            { value: 'heavy', label: 'Grid' },
          ]}
          onChange={v => set('bgTexture', v)}
        />
        <TweakToggle
          label="Nav Frosted Glass"
          value={tweaks.navBlur}
          onChange={v => set('navBlur', v)}
        />
      </TweakSection>

    </TweaksPanel>
  );
}

Object.assign(window, { SiteTweaks });
