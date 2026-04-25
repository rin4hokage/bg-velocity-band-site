# BG — Barry Golden and the Velocity Band

Static site implementing the Claude Design handoff for **Barry Golden and the Velocity Band**. Single-page React app served via CDN (no build step) with client-side routing across Home, Bio, Press Kit, Booking, Contact, and Media pages.

## Stack

- React 18 + Babel standalone (loaded via unpkg)
- Plain HTML/CSS — no build, no bundler
- Deployed as static files

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8000
```

## Files

- `index.html` / `BG Band Site.html` / `BG Velocity Band Site.html` — entry points (identical)
- `styles.css` — full design system (eggplant + antique gold)
- `components.jsx` — shared layout components and router
- `pages/` — Home, Bio, Press Kit, Booking, Contact, Media
- `effects.jsx`, `extras.jsx` — scroll reveal, breathing gradient, animated dock
- `tweaks.jsx`, `tweaks-panel.jsx` — design-tool tweaks panel (hidden by default)
- `hero.png` — hero image
