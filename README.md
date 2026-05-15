# GaimControl · Clickable prototype

A hand-coded HTML/CSS/JS prototype of GaimControl across mobile (iPhone 14 frame) and web. No build step. Every screen is wired straight from the spec section IDs (ON1, BK1, AN1, etc.) so engineers and reviewers can compare side-by-side with the canonical spec files in `../ui-specs/`.

**Status:** 11 / 11 mobile flows + 13 / 13 web surfaces ready — 100%.

---

## What's inside

| Device | Flow count | Entry point |
|---|---|---|
| Mobile | 11 flows · §04 → §16 | [`prototype/mobile-prototype.html`](./mobile-prototype.html) |
| Web | 13 flows · §04 → §16 + Admin + Marketing | [`prototype/web-prototype.html`](./web-prototype.html) |
| Both | overview index | [`prototype/index.html`](./index.html) |

### Mobile flows (11)

1. §04 Auth & session — `mobile-auth.html`
2. §05 Onboarding intake — `mobile-onboarding.html`
3. §06 Banking dashboard — `mobile-banking.html`
4. §07 Cards + sponsor — `mobile-cards.html`
5. §08 Anna · CBT — `mobile-anna.html`
6. §09 Loan + SECCI — `mobile-loan.html`
7. §10 Repayment + Hold — `mobile-repayment.html`
8. §11 Safeguarding — `mobile-safeguarding.html`
9. §12 Profile & settings — `mobile-profile.html`
10. §15 Sponsor onboarding — `mobile-sponsor-onboarding.html`
11. §16 Off-boarding — `mobile-offboarding.html`

### Web flows (13)

§04 → §16 same as mobile, plus:

- §13 Admin console (ops-only, `admin.gaimcontrol.com`) — `web-admin.html`
- §14 Marketing site (public, `gaimcontrol.com`) — `web-marketing.html`

---

## How to navigate

Every per-flow page has three layers of navigation:

1. **Within a flow** — click the ← / → arrows in the centre toolbar to step between screens, or click any screen ID in the left scrubber. Plain **←** / **→** arrow keys do the same.
2. **Between flows** — the sticky top bar shows every flow as a §xx pill (current one highlighted). Click any pill to jump, or use the **← prev-flow / next-flow →** buttons on the right. Keyboard: **Shift + ←** / **Shift + →**.
3. **Direct entry** — the index pages list every flow with a "Ready · open →" button.

**Dark/light theme toggle** lives in the left sidebar of every per-flow page. State persists in `localStorage`.

---

## Running locally

The prototype is pure static HTML. No npm install, no build.

```bash
cd prototype
python3 -m http.server 8000
# or
npx serve .
```

Open `http://localhost:8000/index.html`.

**Why a server, not file://** — the flow-chain script and a couple of in-flow features use relative paths to `../assets/`. Some browsers refuse to load those from `file://`. Any static server works.

---

## Folder layout

```
gaimcontrol-prototype/
├── README.md              ← this file
├── prototype/             ← all HTML pages (this folder)
│   ├── index.html         ← cover · pick mobile or web
│   ├── mobile-prototype.html  ← full mobile tour cover
│   ├── web-prototype.html     ← full web tour cover
│   ├── flow-chain.js      ← shared top-strip navigation
│   ├── mobile-*.html      ← 11 mobile per-flow pages
│   └── web-*.html         ← 13 web per-flow pages
└── assets/                ← brand marks · favicons
    ├── gc-mark-mono-light.svg
    └── gc-favicon.svg
```

**Important:** the HTML files reference `../assets/...` so the `assets/` folder must remain a sibling of `prototype/`. If you flatten the layout, the brand marks will 404.

---

## Decisions log

Every screen has a "context" panel underneath citing the relevant entries in the canonical decisions log (`../ui-specs/41-decisions-log.html`). Decision IDs follow the pattern `GEN-01`, `ON-04`, `BK-03`, `SF-02`, `PR-07`, etc. — matched to the screens that implement them.

---

## Hosting

### Vercel (free, supports private repos)

1. Push this repo to GitHub (public **or** private).
2. Sign in at [vercel.com](https://vercel.com) with GitHub.
3. **Import Project** → pick this repo.
4. **Root Directory:** leave empty (so `assets/` and `prototype/` both serve at the deploy root).
5. **Output Directory:** leave empty.
6. Deploy. Share `https://<project>.vercel.app/prototype/index.html`.

Add a custom domain (e.g. `demo.gaimcontrol.com`) from the project's **Settings → Domains** — free.

### Cloudflare Pages (free, supports private repos)

1. Push to GitHub.
2. [pages.cloudflare.com](https://pages.cloudflare.com) → **Create a project** → connect GitHub → select repo.
3. **Build command:** none. **Output directory:** `/`.
4. Deploy. Share `https://<project>.pages.dev/prototype/index.html`.

### GitHub Pages (free **but public-repo only**)

1. **Settings → Pages → Source: Deploy from a branch → main / `(root)`**.
2. Wait ~60 seconds.
3. Share `https://<user>.github.io/<repo>/prototype/index.html`.

For a **private** repo + GitHub Pages, you need [GitHub Pro](https://github.com/pricing) (~$4/mo).

### Drag-and-drop (no GitHub at all)

1. Zip the whole repo folder.
2. Drag onto [netlify.com](https://app.netlify.com/drop) → instant URL like `tender-hummingbird-1a2b3c.netlify.app/prototype/index.html`. Rename to taste in site settings.

---

## Editing

Each per-flow file is self-contained — no shared CSS or JS dependency except `flow-chain.js` (the top nav strip). Inside any file:

- **SCREENS array** at the top of the `<script>` block declares the screens in that flow.
- **CTX object** has the contextual decision-log copy shown beneath each screen.
- **builders object** has one HTML-returning function per screen kind.
- **render()** swaps the stage content when the user moves between screens.

To add a screen to a flow: append to `SCREENS`, add a `CTX` entry, add a `builders.xxN` function, save. No build step.

To add a whole new flow: copy the closest existing per-flow file, rename, then register the new file in `flow-chain.js` (in `MOBILE_FLOWS` or `WEB_FLOWS`) so it appears in the top strip.

---

## Brand

Colours, type, and tone are documented in `../ui-specs/01-brand.html` and `../ui-specs/02-design-system.html`. Inline summary:

- **Primary navy:** `#20273C` (logo)
- **Secondary purple:** `#8576C2` (Anna · accent)
- **Tertiary teal:** `#399971` (recovery green · OK states)
- **Brand gradient:** `linear-gradient(120deg, #8576C2, #4D608C, #399971)`
- **Type:** Inter (display + body) · JetBrains Mono (labels, screen IDs, timestamps)

---

## Spec source

Each prototype file links back to its canonical spec section in the sidebar footer. The canonical specs live in `../ui-specs/` and are the source of truth — the prototype reflects them, not the other way round.

For the spec index: [`../ui-specs/00-index.html`](../ui-specs/00-index.html).
For decisions: [`../ui-specs/41-decisions-log.html`](../ui-specs/41-decisions-log.html).

---

## Licence + status

Internal · GaimControl Ltd · FCA Sandbox Cohort 9 · 2026.

Built as the working artefact for stakeholder demos and engineer hand-off. Not user-facing code. Versions reflect spec sign-off — see commit history.
