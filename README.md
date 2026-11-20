# Muskan Sailth — Premium Personal Portfolio Website

A fast, SEO-optimised, fully responsive single-page portfolio built with **semantic HTML, modern CSS and lightweight vanilla JavaScript** (no build step, no framework overhead — which keeps Core Web Vitals excellent).

---

## 1. How to run it

No installation or build is required.

- **Option A (quickest):** double-click `index.html` — the site opens in your browser.
- **Option B (recommended, closer to production):** serve the folder over HTTP so all SEO paths behave correctly. Any of these works:
  - VS Code → install the *Live Server* extension → "Go Live"
  - `npx serve .` (needs Node.js)
  - `python -m http.server` (needs Python)

Tested features: navigation links, theme switching, mobile menu, scroll animations, back-to-top, contact-form validation, keyboard navigation, responsive layouts (mobile / tablet / desktop), reduced-motion support.

---

## 2. Project structure

```
ms-web/
├── index.html                  ← the entire portfolio (all sections)
├── 404.html                    ← branded not-found page
├── robots.txt                  ← crawl rules (update domain after purchase)
├── sitemap.xml                 ← sitemap (update domain after purchase)
├── site.webmanifest            ← PWA/branding metadata
├── assets/
│   ├── css/style.css           ← design system + all styles (dark colorful default, light editorial alt)
│   ├── js/site-config.js       ← YOUR editable settings (email, links, form, analytics)
│   ├── js/main.js              ← theme, nav, scroll animations, progress bar, form logic
│   └── img/
│       ├── og-image-muskan-sailth-light.png  ← 1200×630 social preview card
│       ├── apple-touch-icon-light.png        ← iOS home-screen icon
│       ├── favicon.svg                       ← MS monogram favicon
│       └── ms-monogram.svg                   ← MS monogram logo (header/footer/hero)
└── README.md
```

> **Design note:** the portfolio is intentionally typography-led — no personal photograph is used anywhere. Professionalism is communicated through type, layout and content. (Remove this note if you ever reintroduce a photo.)

**Content lives in `index.html`; your settings live in `assets/js/site-config.js`** — so you can update your information later without touching code.

---

## 3. Personal brand identity (created for you)

- **MS monogram** — a minimal, premium monogram with a violet→amber gradient inside a rounded square. Used as the header/footer logo and the favicon (`favicon.svg`).
- **Recommended colour identity:** charcoal base, violet `#8B7CFF` → lilac `#C084FC` → amber `#F5A524` gradient. Use these consistently on LinkedIn banners, resumes, etc.
- Recommended handles/domain style: `muskansailth.com` or `muskan-sailth.com`.

---

## 4. Things you must replace before going live (clearly marked placeholders)

| Item | Where | Action |
|---|---|---|
| Personal email | `site-config.js → email` | Live: `muskansailth03@gmail.com`. Update here if it ever changes (all mailto links + the contact card update automatically). |
| LinkedIn URL | `site-config.js → linkedin` | Currently `https://www.linkedin.com/in/muskan-sailth` — **verify it is actually yours** or create the profile and paste the correct URL. |
| Contact form delivery | `site-config.js → formEndpoint` | Currently empty — see section 6. |
| Resume PDF (optional) | `site-config.js → resume` | Drop your PDF in `assets/` and set the path; the "Download Resume" button appears automatically. |

Nothing fake is published anywhere: no phone number, date of birth or home address; no invented statistics, testimonials or achievements.

---

## 5. Live URL & connecting a custom domain (when purchased)

The site is currently deployed at **https://ms-0003.github.io/** (GitHub Pages, from the `MS-0003.github.io` repository) — `SITE_URL` in `site-config.js`, the canonical tag and `og:url` in `index.html`, plus `sitemap.xml` and `robots.txt` are all set to this address.

When you buy your own domain later, update all five places together:

1. `assets/js/site-config.js` → `SITE_URL: "https://www.yourdomain.com"`
2. `index.html` → the `<link rel="canonical" ...>` tag, `<meta property="og:url" ...>` **and** the `og:image` / `twitter:image` URLs
3. `sitemap.xml` → `<loc>`
4. `robots.txt` → the `Sitemap:` line
5. Re-upload the updated files to the GitHub repository (Settings → Pages redeploys automatically).

Then point the domain's DNS at the host, enable HTTPS, and redirect `http://` and the apex domain to `https://www.` (or whichever you choose) so there is exactly **one** canonical address.

---

## 6. Contact form — real submission mechanism (Formspree)

The form validates locally, but a message needs somewhere to be delivered. Free, no-server option:

1. Create a free account at **formspree.io**.
2. Create a form → copy the endpoint, e.g. `https://formspree.io/f/abcd1234`.
3. In `site-config.js` set: `formEndpoint: "https://formspree.io/f/abcd1234"`.

That's it — submissions POST to Formspree and arrive in your inbox. Until it is configured, the form **honestly tells the visitor that delivery isn't connected yet** instead of pretending a message was sent. (Alternatives: Getform, Web3Forms, Netlify Forms — any JSON-POST endpoint works with a one-line change.)

---

## 7. SEO setup after launch

- **Google Search Console:** verify via the domain registrar (DNS) or by pasting the verification code into `site-config.js → gscVerification`; submit `sitemap.xml`.
- **Bing Webmaster Tools:** same approach with `bingVerification`.
- **Google Analytics 4:** create a property, then set `ga4MeasurementId: "G-XXXXXXXXXX"`. The script is injected only when an ID is configured — zero third-party scripts until then.
- Submit the site to Google with accurate information only. Good rankings take time and legitimate signals (real content, real backlinks); nothing here guarantees results and nothing here tries to fake them.

---

## 8. Performance & accessibility notes

- Single small CSS file + two small JS files (~15 KB total) — no frameworks.
- Hero image is local, preloaded; everything below the fold lazy-loads.
- `prefers-reduced-motion` disables all animation for users who opt out.
- Semantic landmarks, correct heading hierarchy, labelled alt text, visible focus rings, skip-link, keyboard-operable menu, ARIA live regions on form feedback.
- Dark colorful theme by default (deep navy base, violet → cyan → amber accents); light ivory editorial theme via the toggle. Accessible-contrast palette on both.

---

## 9. Verified links used in the content

- Company: https://30days.in/ (established 2016)
- Products with verified official sites: EZHRM (ezhrm.in), BharatBills (bharatbills.com), Proprite (proprite.com)
- EZCRM and EZNEXT link to 30days.in (no separate official sites were verified)

Company products are always labelled as the company's — never as personal projects.
