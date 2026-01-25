# External Integrations

**Analysis Date:** 2026-01-25

## APIs & External Services

**Analytics:**
- Google Analytics - Web traffic analytics
  - SDK/Client: GA4 (Google Analytics 4)
  - Configuration: `config.yaml` → `services.googleAnalytics.ID`
  - ID: `G-32YZMDJ7FF`
  - Integration: Client-side tracking via Hugo template

**Social Media:**
- LinkedIn - Profile link integration (`https://www.linkedin.com/in/adityakonarde/`)
- GitHub - Profile link integration (`https://github.com/aditya-konarde`)
- Twitter/X - Profile link integration (`https://twitter.com/aditya_konarde`)
- Instagram - Profile link integration (`https://instagram.com/aditya.konarde`)
- No API integrations, display-only social icons

## Data Storage

**Databases:**
- None - Static site with no database backend

**File Storage:**
- Local filesystem only
  - Content: `content/**/*.md`
  - Images: `assets/images/` and `static/images/`
  - Generated output: `public/`

**Caching:**
- None - Hugo generates static files, browser caching only

## Authentication & Identity

**Auth Provider:**
- None - Public read-only website with no authentication

## Monitoring & Observability

**Error Tracking:**
- None detected

**Logs:**
- Build logs via Netlify deployment
- GitHub Actions logs for CI checks (`.github/workflows/hugo-checks.yml`)

**Analytics:**
- Google Analytics 4 for user behavior tracking

## CI/CD & Deployment

**Hosting:**
- Netlify
  - Deploy status badge: `https://api.netlify.com/api/v1/badges/c17db709-ff18-4e4a-8eb5-b00c5523c812/deploy-status`
  - Site ID: `amazing-hamilton-d87547`
  - Configuration: `netlify.toml`
  - Build command: `hugo --gc --minify`
  - Publish directory: `public`

**CI Pipeline:**
- GitHub Actions (`.github/workflows/hugo-checks.yml`)
  - Triggers: Push/PR to main branch
  - Checks:
    - Hugo build validation (`hugo --minify`)
    - Markdown linting (`actionshub/markdownlint@2`)
    - Spell checking (`rojopolis/spellcheck-github-actions@0.25.0`)
    - Link checking (`gaurav-nelson/github-action-markdown-link-check@v1`)
  - Actions used:
    - `actions/checkout@v3` with submodule support
    - `peaceiris/actions-hugo@v2` for Hugo setup

**Deployment Contexts:**
- Production: `HUGO_VERSION=0.146.0`, `HUGO_ENV=production`, Git info enabled
- Deploy preview: Future posts enabled, dynamic base URL
- Branch deploy: Dynamic base URL
- Split testing: Environment id `split1`

## Environment Configuration

**Required env vars:**
- None for local development
- Netlify sets: `HUGO_VERSION`, `HUGO_ENV`, `HUGO_ENABLEGITINFO`, `DEPLOY_PRIME_URL`

**Secrets location:**
- Google Analytics ID stored in plain text in `config.yaml` (public, non-sensitive)
- No other secrets required

## Webhooks & Callbacks

**Incoming:**
- None detected

**Outgoing:**
- None detected

## Third-Party Libraries (Client-Side)

**Bundled in Theme:**
- Fuse.js - Client-side search functionality (bundled in `themes/PaperMod/assets/js/`)
- Highlight.js - Syntax highlighting for code blocks
- Feather Icons - Icon set for UI elements
- Simple Icons - Social media icons

## Git Submodules

**Themes:**
- `themes/PaperMod`
  - URL: `https://github.com/adityatelange/hugo-PaperMod.git`
  - Purpose: Core theme providing all frontend functionality
- `themes/hello-friend` (legacy, not active)
  - URL: `https://github.com/aditya-konarde/hugo-theme-hello-friend.git`
  - Status: Not currently used

## External Resources

**CDNs:**
- None detected - All assets bundled and served from static hosting

**Fonts:**
- System fonts used (no external font services)

---

*Integration audit: 2026-01-25*
