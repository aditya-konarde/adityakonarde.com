# Redesign of adityakonarde.com

Branch `redesign`. Method: the `redesign-existing-projects` skill
(github.com/elayadesign/redesign-skill) for diagnosis, with every concrete value taken from
`landing-page-design` (github.com/elayadesign/ai-design-skills). This file is the diagnosis
the skill asks for before fixes, plus the decisions taken.

## Revision 2: a personal brand, not a newsletter (2026-10-25)

Feedback: the site should be about Aditya, not the newsletter, which he may drop. The
intake below is superseded where it puts the weekly issue first.

- Primary action: read his writing. Second: connect on LinkedIn (email for longer notes).
  Third: follow on LinkedIn, GitHub, X or RSS.
- Home, in order: hero (who, where, what he works on, portrait with a role spec), tagline
  reveal, "What I think about" (three threads: site reliability, observability, building
  with AI, each linking to his own essays), Writing (six latest essays), Work and
  community (Grafana Labs, Red Hat, meetups, one Cloud Native Berlin photo), Questions,
  "Say hello" card. Pages 2+ of the home paginator stay as a plain date stream.
- Every claim comes from existing content: the about page, the 2020 SRE post, the
  August 2026 meetup post and the live tagline. Nothing new was invented.
- Newsletter framing removed everywhere: nav, footer, hero, latest issue card, "every
  Friday", subscribe and RSS calls to action, newsletter Q and A, 404 link.
- The 31 issues stay, at the same URLs, as "Weekly notes": `/posts/` page 1 lists the 11
  essays by year, then a quiet "Weekly notes" note linking to `/tags/weekly-roundup/`,
  which now reads "Weekly notes" (title, Open Graph, schema, tag chips). Issue pages say
  "Weekly notes" in the back link and eyebrow, and the Writing nav item stays current.
- `content/tags/weekly-roundup/_index.md` is untouched so every feed stays byte
  identical; the display name is overridden in templates (`page-title.html`,
  `page-desc.html`, `tag-label.html`). Renaming it later changes the feed channel title.
- Visual system unchanged: Geist, paper tone, dark mode, orange accent, same motion.

## Intake assumptions (not asked, recorded per skill A1)

- Site type: personal site of a Berlin engineering leader, not a product landing page.
- Primary action: read the writing, mainly the weekly AI, SRE and observability issue.
- Follow action: subscribe via RSS (there is deliberately no email list, see /privacy/).
- Secondary action: get in touch for leadership roles, speaking or meetups, via LinkedIn.
- Audience: SREs, platform and observability engineers, engineering managers.
- Traffic: search (long tail on posts), LinkedIn and X shares of weekly issues, RSS readers.
- Tone: professional, warm, editorial. Plain words, no hype (matches AGENTS.md no slop rules).
- Proof available: weekly issue count, Grafana Labs role, Kubernetes / Prometheus /
  OpenTelemetry work, four meetup communities. No testimonials exist, none were invented.
- Risk reversal for a free blog: no tracking, no cookies, no email capture, RSS only.
- Layout choice (A3): B, long form story, trimmed. The homepage has to explain who he is
  and why the weekly issue is worth reading, then get out of the way of the writing.

## Scan

- Hugo 0.146 extended on Netlify, theme PaperMod (git submodule) with seven root overrides:
  `head.html`, `extend_head.html`, `author.html`, `anchored_headings.html`,
  `templates/schema_json.html`, `_default/list.html`, `shortcodes/figure.html`.
- Vanilla CSS from the theme, no Tailwind, no JS framework. One inline theme script,
  Fuse search bundle configured but no search page exists.
- Content: 42 posts (31 weekly issues, 11 essays), about, uses, privacy, a Newsletter
  term page (`/tags/weekly-roundup/`). Outputs: HTML, RSS, home JSON index.
- The old `_default/list.html` override tries to hide weekly issues from `/posts/`, but the
  live build still lists all 42 posts there (`/posts/page/2/` to `/posts/page/9/`), and the
  home page paginates all posts (`/page/2/` to `/page/9/`). Both define live URLs, so the
  redesign keeps them: `/posts/` becomes "All writing" with issues labelled, and the
  newsletter page is the issues-only view.

## Diagnosis: what reads as generic

Typography
- Default PaperMod system stack, which resolves to Roboto / Helvetica / Arial on most
  machines. All three are on the never list.
- Only regular and bold in use; headings have no presence (24px post titles over 18px body
  on a 720px column with no tracking adjustments).
- Title Case tags (`Time-Management`, `Engineering Culture`) and the site title in the logo
  slot ("Aditya Konarde's Blog") instead of a name.
- Off scale sizes throughout the theme (`.9rem`, `13px`, `40px`, `1.4em`).

Colour and surfaces
- Light theme `rgb(245,245,245)` and dark theme `rgb(29,30,32)`: neither dark value is in
  the approved palette; cool grey family with no accent at all, so links are invisible
  until underlined.
- Generic card look on list entries: grey box plus radius plus shadow on hover.

Layout
- Home is a centred column: round avatar, name, pipe separated tagline, three grey ghost
  buttons. It is the stock PaperMod profile mode used by thousands of sites, and it says
  nothing about the writing, which is the reason to visit.
- No route from the home page to the weekly issue, the most frequent and most recent
  content. The newsletter lives in the nav only.
- List pages are a stack of identical cards with no year grouping and no hierarchy between
  an essay and a weekly issue.

Interactivity and states
- Standard docked navbar with five equal links, Privacy among them.
- Light and dark toggle is the sun and moon icon (skill flags this pattern).
- Default 0.1s to 0.2s `ease` transitions. No visible focus ring styling beyond browser
  default; no current page indicator in the nav.
- No skip to content link.

Ship requirements found broken on the live site
- Favicons: `<head>` points at `/favicon.ico`, `/favicon-16x16.png`, `/favicon-32x32.png`,
  `/apple-touch-icon.png`, `/safari-pinned-tab.svg`. All return 404 today.
- The home page preloads `/images/propic-square.jpeg` as its LCP image. That URL is a 404;
  the real image is the processed `/images/propic-square_hu_*.jpeg`, so the preload costs a
  wasted request and helps nothing.
- Organisation schema uses `site.Title` and a missing favicon as its logo.
- Footer: "Powered by Hugo & PaperMod" and an emoji heart; no RSS link anywhere on the
  home page.

Content
- Tagline "Engineering Leader | Technology Enthusiast | Photographer": three labels, no
  claim, Title Case, pipe separated. The meta description is better than the tagline.
- CTAs "About", "Blog", "Contact" are nouns, not actions ("Contact" silently opens
  LinkedIn in a new tab).

## What to keep

- All content, permalinks (`/posts/:slug/`, `/tags/:tag/`, pagination paths), RSS feeds
  for home, sections and terms, `index.json`, sitemap, robots.txt.
- SEO metadata: title pattern, descriptions, canonical (including the paginated self
  canonical fix), robots logic, Open Graph, Twitter cards, JSON-LD (BlogPosting,
  BreadcrumbList, home entity).
- The profile photo (`assets/images/propic-square.jpeg`), now processed to WebP sizes.
- The Netlify CSP: the new theme stays inside `default-src 'self'`; fonts are self hosted
  so `font-src 'self'` holds. No new third party requests of any kind.
- The editorial decisions already in the content: weekly issue format, no slop rules,
  "AI gathers, I read" disclosure on the newsletter page.

## Fixes applied (in skill fix priority order)

1. Font: Geist variable, self hosted, one typeface. Geist Mono only for code and dates.
2. Colour: warm grey family. Dark `#131209` (approved palette) with `#1F1F1F`/`#272727`
   surfaces; light is warm paper. One accent, a muted signal orange that nods to alerting
   dashboards, saturation under 80%, contrast checked.
3. States: hover, active `translateY(1px)`, visible 2px accent focus ring, current page in
   nav, skip link.
4. Layout: left aligned hero over an asymmetric grid, 680px hero measure, 65ch reading
   measure, spacing only from the approved scale, Tailwind radius values.
5. Motion: `cubic-bezier(0.32,0.72,0,1)` everywhere, IntersectionObserver reveals at 900ms,
   floating island nav, hamburger that morphs into an X, full screen glass menu with
   staggered links. Everything is off under `prefers-reduced-motion` and content is fully
   visible without JS.
6. Components: issue list instead of cards, essays grouped by year, theme preference moved
   to a footer select (auto, light, dark) instead of a sun and moon toggle.
7. States: empty states for lists, branded 404 with a way back.
8. Copy: name as identity, a specific headline, verb led CTA ("Read this week's issue"),
   RSS as the follow action, Q and A section for AEO.
9. Type scale: every size snapped to the Tailwind scale.

## Deliberate deviations from the skill, and why

- No terms page: a personal blog with no accounts or transactions has nothing to put in
  terms. Privacy stays in the footer.
- No cookie banner: the site sets no cookies (see /privacy/).
- No email form, so no form validation: the owner chose RSS over an email list.
- Hyphen rule applies to the new interface copy only. Existing post prose is untouched;
  that is the author's voice and governed by AGENTS.md.
- Light background is not specified by the skill (it lists dark values only). Chosen:
  warm paper `#F7F6F2`, the same hue family as `#131209`.

## Verification (local, Hugo 0.146.0 extended, after revision 2)

- `HUGO_ENV=production hugo --gc --minify --cleanDestinationDir`: 0 warnings, 0 errors.
- URL parity: all 92 URLs in the live sitemap exist in the new `public/`, plus the home and
  `/posts/` paginator pages 2 to 9. Every file in a PaperMod baseline build exists except
  one content hashed image derivative. All 48 XML files (every RSS feed and
  `sitemap.xml`) and `robots.txt` are byte identical to the baseline.
- Head metadata matches the baseline except: the home and list description (new site
  description), and the weekly-roundup page title "Weekly notes".
- Lighthouse 12, local static server, mobile / desktop performance: home 98 / 100,
  `/posts/` 99 / 100, a post 99 / 100, weekly notes 99 / 100. Accessibility, best
  practices and SEO 100 everywhere. CLS 0, TBT 0 ms.
- Playwright: mobile menu opens and closes on Escape with focus returned, theme preference
  persists, first Tab reaches the skip link, no console errors or failed requests on 11
  pages.
- Screenshots at 2x: `python3 tools/screenshots.py http://localhost:PORT screenshots`.

## Revision 3: The Room (branch `room`)

Feedback on revision 2 was "zero creativity". Aditya picked "The Room": the home hero becomes a
painted, gently moving room of his life, and the objects in it are doors into the site.

### What changed
- Hero: headline in Instrument Serif (OFL, 21 KB, self hosted) above a full bleed painting.
  The portrait hero and spec card are gone from the home page; the portrait stays on /about/.
- Picture: one golden hour gouache still generated with Higgsfield (gpt_image_2_5), no people,
  no baked in text. A 6.5 s locked off loop (minimax_h3, start frame = end frame) adds steam,
  screen and rack light, leaves and the sunset. Shipped as AV1 webm plus H.264 mp4 at 1920 and
  1080 wide, 2.7 MB for all four files; the visitor loads one (0.35 to 1.1 MB).
- The still is the LCP: Hugo resizes it to WebP (960 to 2560), preloaded with imagesrcset.
  The poster is the video's own first frame, so the fade from still to loop does not jump.
- Loop loading: only after window load and idle, only while the room is on screen (paused when
  it leaves), never with prefers-reduced-motion or data saver. Reduced motion hides the video.
- Hotspots: real links (and two buttons for asides), focusable in left to right order, 44 px hit
  area, visible focus ring, glass tooltip on hover and focus, positioned in percentages so they
  stay on their objects at every width. Touch screens show every label as a chip.
- Mobile: the stage keeps its height (62svh) and pans sideways, starting on the desk, with the
  same destinations as a numbered list below it.
- Palette warmed to the painting in light mode (paper #F6EFE3, surface #EEE4D2); dark stays #131209.
  Display headings across the site use the serif; body stays Geist.
- Small live details: pulsing pins, a live dot and Berlin time in the caption.

### Hotspot map
| Object | Destination |
| --- | --- |
| Espresso machine | aside: "Coffee first. Then usually a new recipe" |
| Winged statue, top shelf | /tags/ai/ (Building with AI) |
| Three monitors | /posts/ (Writing) |
| Laptop | /uses/ (My setup) |
| Server rack | /posts/picoclaw-on-xiaomi-b3600-pro-router/ (Homelab) |
| Lemon tree | aside: "Still trying to keep my plants alive" |
| TV tower through the window | /posts/cloud-native-berlin-schwarz-digits-aug-2026/ |
| Framed Berlin map | /about/ |
| Bookshelf | /tags/weekly-roundup/ (Weekly notes) |
| Camera | Instagram (from site params) |

Not interactive because the site has no content for them yet: 3D printers, model train, archer
and moon figure, suitcase (travel), and no recipes, plants, photography or talks pages.

### Verification (local static server, Lighthouse 12)
- Clean `hugo --gc --minify` build. All 92 sitemap URLs plus /page/2-9/ and /posts/page/2-9/
  exist. All 49 feeds, sitemap.xml and robots.txt are byte identical to the `redesign` build.
- Only files dropped versus `redesign`: old fingerprinted CSS/JS and the hero's propic WebP resizes.
- Home, mobile: performance 92, accessibility 100, best practices 100, SEO 100 (LCP 3.2 s on an
  uncompressed python server). Desktop: 100 / 100 / 100 / 100 (LCP 0.6 s).
- No console errors or warnings. Tab order through the ten hotspots verified; Escape closes asides.
- Screenshots: `screenshots/room/` (gitignored).
