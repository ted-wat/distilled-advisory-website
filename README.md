# Distilled Advisory · Website

The public website for Distilled Advisory. Entity 01 of the Distilled house.

Live: <https://distilled-advisory-website.netlify.app>
Repository: <https://github.com/ted-wat/distilled-advisory-website>
Netlify dashboard: <https://app.netlify.com/projects/distilled-advisory-website>

---

## Stack

Plain HTML, CSS custom properties + Grid + Flexbox, and a small amount of vanilla JavaScript. No framework. No build step.

You can open any `.html` file in a text editor, change a sentence, and push it to GitHub. A GitHub Actions workflow deploys to Netlify in about a minute. There is nothing to compile, no dependency to update, no Node modules to install just to edit copy.

Why no Astro / Eleventy / Next: this is a four-page static site that changes a few times a year. Any framework would push you toward npm builds the moment you wanted to fix a typo. Plain HTML is the right answer for the next few years. If the surface area grows past about a dozen pages, revisit.

## File layout

```
distilled-advisory-website/
├── index.html                  Long-scroll main page (all sections)
├── enquire.html                Intake form page
├── thanks.html                 Post-submit confirmation page
├── 404.html                    Not-found page
├── robots.txt                  Search-engine crawl rules
├── sitemap.xml                 Sitemap (one URL today)
├── netlify.toml                Netlify deploy and headers config
├── README.md                   This file
├── LICENSE                     MIT
├── .gitignore
└── assets/
    ├── css/styles.css          All styles, including design tokens
    ├── js/site.js              Nav, mobile drawer, scroll reveal
    ├── icons/
    │   ├── favicon.svg
    │   ├── apple-touch-icon.svg
    │   └── og-image.svg        Open Graph share image
    └── logos/
        ├── distilled-wordmark.svg
        ├── distilled-wordmark-bare.svg
        ├── distilled-advisory-stacked.svg
        └── d-master-mark.svg
```

## Editing guide

Plain-English instructions for the changes you are most likely to make. Edit, save, commit, push. Netlify deploys on every push to `main`.

### Change the hero statement

File: `index.html`, around line 64 to 75.
Replace the text inside `<h1 class="hero__statement">…</h1>` and the `<p class="hero__lede">…</p>` underneath it.

### Edit any section copy

All sections are inside `index.html`, in the order they appear on the page. The `id` on each `<section>` matches the menu link.

| Section on the page    | `id` to find in the file        |
|------------------------|----------------------------------|
| The Market Problem     | `id="problem"`                   |
| An Operator's View     | `id="approach"`                  |
| How We Support Founders| `id="value"`                     |
| What We Do             | `id="work"`                      |
| The Pathway            | `id="pathway"`                   |
| Who This Is For        | `id="who"`                       |
| Results, Not Noise     | `id="results"`                   |
| Engagement Structures  | `id="engagement"`                |
| Start the Conversation | `id="contact"`                   |

Use a text editor's "find" feature with the `id` to jump straight to the section.

### Change a tile (any three-up block)

Each tile looks like this in the HTML:

```html
<article class="tile reveal">
  <div class="tile__num">01 &middot; Experience</div>
  <h3 class="tile__title">A decade of practical commercial work.</h3>
  <div class="tile__rule"></div>
  <p class="tile__body">
    The body copy.
  </p>
</article>
```

Change the three text values. Leave the surrounding tags alone.

### Change the engagement structures

File: `index.html`, search for `Engagement structures` (look for `id="engagement"`). There are five named engagements: Discovery Sprint, Commercial Reset, Route-to-Market Review, Buyer-Readiness Preparation, Operator Retainer. Each is an `<article class="engagement-row">` with three columns: title and timeframe on the left, body in the middle, deliverables list on the right.

To change one, edit the `<h3>` (title), the `engagement-row__meta` (timeframe), the `engagement-row__body` (description), and the `engagement-row__deliverables-list` (the four bullet items). Leave the surrounding tags alone.

The "Default engagement" badge sits on Commercial Reset only. To move it, cut the `<div class="engagement-row__default">Default engagement</div>` line and paste it into a different engagement's title block.

### Change the contact email

The site uses **two email addresses** by design:

- `info@distilledadvisory.au` is the **public-facing address** shown on every page. This is the institutional surface. It is a Google Workspace alias that forwards to `ted@distilledadvisory.au` for delivery.
- `ted@distilledadvisory.au` is the **operating address** that receives Netlify Forms submissions directly. Configured in the Netlify dashboard under **Forms → Form notifications**, not in the HTML.

To change the public address, search the project for `info@distilledadvisory.au` and replace each occurrence. Files involved:

- `index.html`
- `enquire.html`
- `thanks.html`
- `404.html`

To change the form-routing address (the one that receives enquiries), do it in Netlify, not in the code. **Site settings → Forms → Form notifications → edit the email notification**.

### Change the colours

Don't. The brand is monochrome by design. Adjusting colour drifts away from the positioning.

If you need to tweak the off-black or the warm white at a system level, the two tokens are at the top of `assets/css/styles.css` under the `:root` block, named `--ink-900` and `--paper-100`. Touch them only if a paper test print suggests they need recalibration.

### Replace the share image (Open Graph)

File: `assets/icons/og-image.svg`. Renders at 1200x630. Edit in any vector editor. Keep the wordmark hierarchy and the dark background.

### Add or change images on the page

There are currently no photographic images on the page. The brand's editorial restraint is intentional. If you add atmospheric photography later, store JPGs in `assets/images/` and reference them with relative paths. Image direction notes are in the design system: interiors, materials, observed not staged, low warm light. No people, no spirits-brand cliches.

## How the form works

The intake form on `enquire.html` is wired to Netlify Forms. There is no third-party service, no API key, no Formspree.

How submissions reach you:

1. A visitor submits the form.
2. Netlify catches the submission and emails it to `ted@distilledadvisory.au` (the operating address, even though the public-facing email shown on the site is `info@distilledadvisory.au`).
3. The visitor is redirected to `/thanks.html`.

The email address that receives submissions is configured in the Netlify dashboard under **Site settings → Forms → Form notifications → Add notification → Email notification**.

To change the receiving email or add a second address, do it there. The form itself does not need editing.

## Deploying changes

Auto-deploys are wired through GitHub Actions. Every push to `main` triggers a workflow that deploys the current state to Netlify.

```sh
git add .
git commit -m "Update hero copy"
git push
```

That is it. The Action runs in about 45 seconds (you can watch it at <https://github.com/ted-wat/distilled-advisory-website/actions>) and the live site updates immediately after.

There is no preview or PR gate, so a push to `main` is live within a minute. After any copy change, open <https://distilledadvisory.au/> in a browser (or curl it) to confirm it reads correctly before walking away.

If you prefer not to use git at all, you can also drag-and-drop the project folder onto <https://app.netlify.com/drop> to publish ad-hoc. The git flow is recommended because it preserves history and matches what is on GitHub.

### The workflow file

The deploy lives in `.github/workflows/deploy.yml`. It uses two repository secrets that are already set:

- `NETLIFY_AUTH_TOKEN`: a Netlify personal access token
- `NETLIFY_SITE_ID`: the Netlify project ID for this site

You should not need to touch these. If they ever expire or rotate, set them again at <https://github.com/ted-wat/distilled-advisory-website/settings/secrets/actions>.

## Pointing a custom domain (five steps)

**Current state:** `distilledadvisory.au` is already pointed and live, with a Let's Encrypt SSL certificate that auto-renews. The DNS is hosted at VentraIP under "DNS Hosting" mode, with A records for the apex and `www` pointing to Netlify's load balancer (`75.2.60.5`). The certificate covers both `distilledadvisory.au` and `www.distilledadvisory.au`.

The steps below are for reference if you ever move providers, change to a new domain, or rebuild the setup.

When you are ready to put a new domain in front of the Netlify URL:

1. In the Netlify dashboard, open the site, then **Domain management → Add a domain → Add a domain you already own**.
2. Enter the domain. Netlify will give you either two `NS` records (recommended, easier) or one `CNAME` record.
3. Log into the domain registrar (where you bought the domain). Open the DNS settings for the domain.
4. Replace the existing records with the ones Netlify gave you. Save.
5. Wait fifteen to ninety minutes for DNS to propagate. Netlify will automatically issue a Let's Encrypt SSL certificate (this happens by itself, no action needed).

That is the whole job. The certificate auto-renews. You never have to touch DNS again unless you change provider.

## Analytics

Analytics are off by default. There are no tracking cookies set by this site.

If you decide later that you want simple, privacy-respecting analytics, add one line of script tag to the `<head>` of `index.html`, `enquire.html`, `thanks.html`, and `404.html`. Plausible (`plausible.io`) and Fathom (`usefathom.com`) both provide a single snippet. Neither requires a cookie banner under GDPR or under the Australian Privacy Act.

## Content provenance

Section structure and value pillars (Experience, Access, Judgment; Production and Procurement, Commercial Structure, Route to Market; Foundations, Readiness, Launch & Scale; Commercially Open, Capital Ready, Value-Oriented; Time to Market, Capital Protection, Scalable Supply Chain; and the five named engagements: Discovery Sprint, Commercial Reset, Route-to-Market Review, Buyer-Readiness Preparation, Operator Retainer) come from the Distilled Advisory capability deck and the firm's Commercial Foundations document.

Prose for each section was authored for this site, in the brand voice, against the section scaffolding from the deck. Tighten or rewrite freely. The constraint is the voice, not the words.

Voice rules applied:

- No em dashes anywhere.
- Banned: *align, leverage, synergy, sense check, key takeaways, strategic alignment, unlock, ecosystem, revolutionary, game-changing, powerful*.
- Sentence case except for the wordmark and eyebrow labels.
- Australian spelling.
- Operator-direct register, slightly more institutional on external surfaces.

## Local preview (optional)

If you want to see edits before pushing, open the project folder and run:

```sh
python3 -m http.server 8080
```

Then visit `http://localhost:8080` in a browser. The site is fully static, so the file paths work locally.

Stop the server with `Ctrl+C`.

## License

MIT. See `LICENSE`.
