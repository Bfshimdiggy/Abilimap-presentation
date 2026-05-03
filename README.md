# AbiliMap — STEAM Scholars Showcase Deck

Built per `docs/superpowers/specs/2026-04-26-steam-scholars-presentation-design.md`.

## Run locally

```bash
cd presentation
python3 -m http.server 8000
# open http://localhost:8000
```

Or open `presentation/index.html` directly in a browser. (Some browsers block
local asset loading; the `http.server` form is more reliable.)

## Present

- `→` / `Space` — next slide
- `←` — previous
- `Esc` — overview mode (helpful when rehearsing)
- `f` — fullscreen
- `s` — speaker notes view (notes aren't authored yet; safe to ignore)

## Swap in the real assets

1. **Origin photo (slide 2):** save the family photo as `assets/liv-photo.jpg`.
   The placeholder SVG drops out automatically.
2. **Real demo recording (slide 6):** record 20–30 seconds of AbiliMap on the
   author's phone. iPhone: Control Center → record button. Save as
   `assets/demo.mp4`. The fallback animation hands off automatically when the
   video loads.

## What if something fails on showcase day?

- **No internet:** the deck is fully local. Reveal.js is bundled in
  `lib/reveal/`. All CSS, fonts, and assets ship with the folder.
- **Demo video won't play:** the CSS fallback animation auto-activates. It
  mimics the real app — dark map, glowing teal route around an obstacle pin,
  AbiliMap header, bottom sheet with a typewriter search.
- **Photo missing:** the placeholder SVG renders.

## Run the automated test

From the repo root:

```bash
npm run test:presentation
```

Confirms the slide-6 fallback animation activates when `demo.mp4` is missing.
