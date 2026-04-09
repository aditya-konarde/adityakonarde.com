# Visual Upgrades Research: Refero + Remotion

> Branch: `feature/visual-upgrades-refero-remotion`
> Date: 2025-04-09

## Current State (Audit Summary)

- **Theme**: PaperMod v8.0, stock configuration
- **Homepage**: profileMode (centered photo, title, subtitle, 3 buttons, 4 social icons)
- **Custom CSS**: None. `assets/css/extended/` does not exist.
- **Layout overrides**: Only `layouts/_default/list.html` (filters weekly-roundup posts)
- **Cover images**: No post has cover images
- **Content**: 11 blog posts + 4 weekly roundups
- **Features unused**: cover images, comments, share buttons, reading time, word count, breadcrumbs, series, archives page, drop caps, code copy button

**Bottom line**: The blog is vanilla PaperMod with zero visual branding. Massive room for improvement.

---

## Part 1: Refero Design Inspiration

### 1A. Dark Mode Palette Upgrade

PaperMod's default dark is fine but generic. Top-tier sites (Linear, Vercel, Josh Comeau) use layered grays with subtle glow effects.

**Technique**: Override PaperMod's dark theme CSS variables.

```css
:root[data-theme="dark"] {
  --background: #0A0A0B;
  --surface: #141415;
  --elevated: #1C1C1E;
  --border: rgba(255, 255, 255, 0.08);
  --text-primary: #E4E4E7;
  --text-secondary: #8B8B8F;
  --accent: #818CF8;  /* soft indigo, or pick your own */
}
```

Add a subtle glow on interactive elements:

```css
.dark-glow {
  box-shadow: 0 0 20px rgba(129, 140, 248, 0.15),
              0 0 60px rgba(129, 140, 248, 0.05);
}
```

**Source inspiration**: Linear, Qase, Josh Comeau's dark mode guide.

---

### 1B. Typography: Serif Headings + Sans Body

Stripe, Tailwind Blog, and editorial sites pair a serif heading font with a sans-serif body for a distinctive, professional look.

```css
:root {
  --font-heading: 'Source Serif Pro', Georgia, serif;
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
}

.post-single h1, .post-single h2, .post-single h3 {
  font-family: var(--font-heading);
  font-weight: 700;
  letter-spacing: -0.02em;
}
```

Optimize reading comfort:

```css
.post-single .post-content {
  font-size: 1.125rem;    /* 18px */
  line-height: 1.75;
  max-width: 65ch;
}
```

Optional: drop cap on first paragraph for editorial flair.

---

### 1C. Featured Post Hero (Vercel-style)

Make the first post in listings span full width with a larger treatment.

```css
.post-entry:first-child {
  grid-column: 1 / -1;
}
.post-entry:first-child .entry-cover {
  max-height: 400px;
}
```

Pairs well with adding cover images to posts.

---

### 1D. Code Block Facelift

Dark, rounded code blocks with padding, even in light mode. Matches the Stripe/Vercel aesthetic.

```css
.highlight {
  background: #1a1b26 !important;
  border-radius: 12px;
  padding: 1.25rem;
  margin: 1.5rem 0;
  overflow-x: auto;
  border: 1px solid rgba(255,255,255,0.05);
}
```

---

### 1E. Scroll Progress Bar

Thin accent bar at top of page showing reading position. Two implementations:

**Pure CSS (modern browsers)**:
```css
.progress-bar {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 3px;
  background: var(--accent);
  transform-origin: left;
  transform: scaleX(0);
  animation: progress linear;
  animation-timeline: scroll(root block);
}
@keyframes progress {
  to { transform: scaleX(1); }
}
@supports not (animation-timeline: scroll(root block)) {
  .progress-bar { display: none; }
}
```

**JS fallback (broad support)**:
```js
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? scrollTop / docHeight : 0;
  document.querySelector('.progress-bar').style.transform = `scaleX(${progress})`;
}, { passive: true });
```

---

### 1F. Search Modal (Linear-style Cmd+K)

Replace PaperMod's default search page with a centered overlay modal:

```css
.search-modal-overlay {
  position: fixed; inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 100;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 20vh;
}
.search-modal {
  background: var(--surface);
  border-radius: 16px;
  width: min(90vw, 600px);
  border: 1px solid var(--border);
  box-shadow: 0 25px 50px rgba(0,0,0,0.25);
}
```

---

### 1G. SVG Curve Section Dividers

Add visual flow between homepage sections using `clip-path`:

```css
.section-divider::after {
  content: '';
  position: absolute;
  bottom: -2px; left: 0;
  width: 100%; height: 80px;
  background: var(--next-bg);
  clip-path: ellipse(55% 100% at 50% 0%);
}
```

---

### Refero Sources

- wittl.co, exactly.ai, contra.com (blog page designs)
- Linear, Vercel, Stripe, Tailwind CSS Blog (homepage + article patterns)
- Josh W. Comeau (dark mode, header transparency, interactive elements)
- Paco Coursey (minimalist typography-first portfolio)
- Refero font data: Inter (9,254 pages), SF Pro (7,436), Poppins (869)

---

## Part 2: Remotion Animation Techniques (Adapted for Static Sites)

Remotion's core ideas: frame-accurate timing, spring physics, interpolation, and composition structure. Here's how to translate them to lightweight CSS/JS for Hugo.

### 2A. Spring-Like Easing with CSS `linear()`

Modern CSS supports arbitrary easing curves via `linear()`, which can mimic spring overshoot. No JS needed.

```css
:root {
  /* Gentle spring (subtle settle) */
  --spring-gentle: linear(0, 0.25, 0.5, 0.75, 1, 0.98, 1);
  /* Snappy spring (more bounce) */
  --spring-snappy: linear(0, 0.35, 0.65, 1, 0.92, 1.02, 1);
  /* Bouncy entrance */
  --spring-bounce: linear(
    0, 0.25 12%, 0.82 36%, 1.04 54%, 0.96 66%,
    1.01 78%, 1 90%
  );
}

.article-card {
  transition: transform 600ms var(--spring-bounce),
              opacity 400ms ease-out;
}
```

Generate custom values at: https://linear-easing-generator.netlify.app/

Browser support: Chrome 112+, Safari 17.5+, Firefox 128+. Graceful fallback to standard easing.

---

### 2B. Staggered Card Entrances (Remotion's `<Sequence offset>` pattern)

Use CSS custom properties for stagger delays:

```css
.animate-in {
  --stagger: 0;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 500ms ease-out calc(var(--stagger) * 100ms),
              transform 500ms var(--spring-gentle) calc(var(--stagger) * 100ms);
}
.animate-in.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

Trigger via IntersectionObserver:

```js
document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
  );

  document.querySelectorAll('.animate-in').forEach((el) => observer.observe(el));
});
```

---

### 2C. Page Transitions (View Transitions API)

Zero-JS cross-page transitions for Hugo's multi-page architecture:

```css
@view-transition {
  navigation: auto;
}

/* Disable for reduced-motion users */
@media (prefers-reduced-motion: reduce) {
  @view-transition { navigation: none; }
}

/* Customize fade */
::view-transition-old(root) {
  animation: fade-out 200ms ease-out forwards;
}
::view-transition-new(root) {
  animation: fade-in 300ms ease-in forwards;
}

@keyframes fade-out { to { opacity: 0; } }
@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

This makes every internal link navigation animate smoothly. Browser support: Chrome 111+, Safari 18+, Firefox not yet.

---

### 2D. Text Reveal Animations

```css
.text-reveal {
  clip-path: inset(0 100% 0 0);
  transition: clip-path 700ms var(--spring-gentle);
}
.text-reveal.is-visible {
  clip-path: inset(0 0% 0 0);
}
```

---

### 2E. Micro-Interactions (Hover States)

```css
/* Card lift with spring */
.article-card {
  transition: transform 400ms var(--spring-gentle),
              box-shadow 300ms ease-out;
}
.article-card:hover {
  transform: translateY(-4px) scale(1.01);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
}

/* Link underline reveal */
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px; left: 0;
  width: 100%; height: 2px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 400ms var(--spring-snappy);
}
.nav-link:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}
```

---

### 2F. Performance Rules (from Remotion Thinking)

1. **Only animate `transform` and `opacity`** -- compositor-only, no layout recalculation
2. **Use `will-change`** during animation, remove after:
   ```css
   .animate-in { will-change: transform, opacity; }
   .animate-in.is-visible { will-change: auto; }
   ```
3. **`content-visibility: auto`** on article cards for off-screen rendering deferral
4. **Limit simultaneous animations** to ~10-15 elements
5. **Use `{ passive: true }`** on scroll listeners
6. **Never use `transition: all`** -- be explicit

### 2G. Accessibility: `prefers-reduced-motion`

```css
@media (prefers-reduced-motion: reduce) {
  .animate-in,
  .animate-in.is-visible {
    transition: none;
    opacity: 1;
    transform: none;
    animation: none;
  }
  .progress-bar { display: none; }
}
```

---

## Implementation Priority Matrix

| # | Feature | Source | Effort | Impact | Files |
|---|---------|--------|--------|--------|-------|
| 1 | Dark mode palette upgrade | Refero | Low | High | `assets/css/extended/custom.css` |
| 2 | Typography (serif headings, reading comfort) | Refero | Low | High | `assets/css/extended/custom.css` |
| 3 | Scroll progress bar | Refero + Remotion | Low | Medium | CSS + JS partial |
| 4 | Spring-like CSS easing (`linear()`) | Remotion | Low | Medium | `assets/css/extended/custom.css` |
| 5 | Card entrance animations (stagger) | Remotion | Low | High | CSS + small JS file |
| 6 | Card hover micro-interactions | Remotion | Low | Medium | `assets/css/extended/custom.css` |
| 7 | Page transitions (View Transitions API) | Remotion | Minimal | High | CSS only |
| 8 | Code block facelift | Refero | Low | Medium | `assets/css/extended/custom.css` |
| 9 | Text reveal animations | Remotion | Low-Med | Medium | CSS + JS |
| 10 | Search modal overlay | Refero | Medium | High | New partials + CSS + JS |
| 11 | Featured post hero layout | Refero | Medium | High | Layout override |
| 12 | SVG section dividers | Refero | Low | Low | Homepage layout |

**Quick wins (1 file, 30 min)**: Items 1-4 and 6-8 all go into a single `custom.css`.
**Next step (1 small JS file + CSS)**: Items 5 and 9.
**Bigger lifts**: Items 10-11 (new partials/layout overrides).

---

## Recommended File Structure

```
assets/
  css/
    extended/
      custom.css          <- all CSS overrides
  js/
    blog-animations.js    <- IntersectionObserver, scroll progress, spring helper

layouts/
  partials/
    head-custom.html      <- font preload links, inline head script
    reading-progress.html <- progress bar HTML
  _default/
    list.html             <- (existing, add stagger classes)
    single.html           <- (add reading progress, animation classes)
```

No npm, no build step. Hugo pipes the JS and CSS through its asset pipeline.

---

## What Makes This Stand Out

1. **Spring physics in CSS** -- `linear()` timing gives that polished Remotion feel without any JS animation library
2. **Serif + sans pairing** -- editorial quality that most PaperMod sites don't bother with
3. **Layered dark mode** -- not just inverted colors, but intentional surface hierarchy
4. **Cross-page transitions** -- View Transitions API makes Hugo navigation feel like an SPA
5. **Staggered entrances** -- cards don't just appear, they cascade in with spring easing
6. **Reading progress** -- subtle 3px bar that follows your scroll position
7. **Accessibility-first** -- all animations respect `prefers-reduced-motion`, progressive enhancement throughout
