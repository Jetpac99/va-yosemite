# Virgin Atlantic Yosemite

Adobe Edge Delivery Services-ready static pages in the style of Virgin Atlantic and Virgin Atlantic Holidays.

This repo keeps authored page content as plain HTML, with a small shared styling and enhancement layer. The pages are designed to be portable, editable in AEM/DA, and independent of the live Virgin Atlantic runtime.

## Pages

- `/yosemite.html` - Yosemite hiking trails holiday guide
- `/south-beach-miami.html` - South Beach Miami destination guide
- `/florida-keys-destination-guide.html` - Florida Keys destination guide
- `/404.html` - fallback page

DA-authored source copies live under `/content/`.

## Structure

- `/assets/<page>/` - page imagery
- `/fonts/` - local Gotham font files used by the Virgin Atlantic style layer
- `/styles/styles.css` - shared Virgin Atlantic static page CSS
- `/scripts/scripts.js` - progressive enhancements for carousels, tabs, accordions, and form-like controls
- `/scripts/aem.js` and `/scripts/delayed.js` - standard Edge Delivery Services support scripts
- `/head.html` - shared document head metadata and asset links
- `/package.json` - lint scripts and development dependencies

## Local Preview

Run a local static server from the repo root:

```bash
python3 -m http.server 8000
```

Then open:

- `http://localhost:8000/yosemite.html`
- `http://localhost:8000/south-beach-miami.html`
- `http://localhost:8000/florida-keys-destination-guide.html`

## Development

Install dependencies and run linting:

```bash
npm install
npm run lint
```

The lint script runs JavaScript and CSS checks:

```bash
npm run lint:js
npm run lint:css
```

## Authoring Notes

- Keep page content in simple, semantic HTML so it remains editable after DA normalization.
- Put reusable visual patterns in `/styles/styles.css` and reusable behaviour in `/scripts/scripts.js`.
- Keep page-specific assets under `/assets/<page>/`.
- Use concise Virgin Atlantic-style copy: useful, direct, upbeat, and travel-specific.
- Do not depend on live-site JavaScript for core layout or interactions.
