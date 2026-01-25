# Architecture

**Analysis Date:** 2026-01-25

## Pattern Overview

**Overall:** Static Site Generator (SSG) using Hugo framework

**Key Characteristics:**
- Content-driven architecture with markdown files as the source of truth
- Template-based rendering using Hugo's Go template system
- Build-time generation producing static HTML/CSS/JS
- Theme-based architecture using PaperMod theme as a Git submodule
- Configuration-driven behavior via YAML

## Layers

**Content Layer:**
- Purpose: Stores all content as markdown files with YAML frontmatter
- Location: `content/`
- Contains: Blog posts (`content/posts/`), static pages (`content/about.md`)
- Depends on: Archetypes for content templates
- Used by: Hugo build process to generate HTML pages

**Configuration Layer:**
- Purpose: Controls site behavior, theme settings, and build parameters
- Location: `config.yaml`, `netlify.toml`
- Contains: Site metadata, theme configuration, menu structure, social links, search settings
- Depends on: Nothing
- Used by: Hugo build process, Netlify deployment pipeline

**Theme Layer:**
- Purpose: Defines presentation and layout templates
- Location: `themes/PaperMod/`
- Contains: HTML templates (`layouts/`), CSS stylesheets (`assets/css/`), JavaScript (`assets/js/`)
- Depends on: Hugo template engine
- Used by: Hugo to render content into HTML

**Template Layer:**
- Purpose: Provides reusable HTML structures for different page types
- Location: `themes/PaperMod/layouts/`
- Contains: 
  - Base templates (`_default/baseof.html`, `_default/single.html`, `_default/list.html`)
  - Partial templates (`partials/header.html`, `partials/footer.html`, `partials/head.html`)
  - Shortcodes (`shortcodes/figure.html`, `shortcodes/collapse.html`)
- Depends on: Hugo template syntax, configuration data
- Used by: Hugo rendering engine

**Asset Layer:**
- Purpose: Static resources like images and theme assets
- Location: `assets/images/`, `themes/PaperMod/assets/`
- Contains: Profile images, CSS files, JavaScript for search functionality
- Depends on: Nothing
- Used by: Generated HTML pages, theme templates

**Build Output Layer:**
- Purpose: Final generated static site ready for deployment
- Location: `public/`
- Contains: Generated HTML files, processed CSS/JS, copied assets, sitemap, RSS feeds
- Depends on: All other layers
- Used by: Web server (Netlify CDN)

**Quality Assurance Layer:**
- Purpose: Pre-commit and CI validation
- Location: `.husky/`, `.github/workflows/`
- Contains: Git hooks, GitHub Actions workflows for linting and validation
- Depends on: Node.js dev dependencies
- Used by: Development and CI/CD processes

## Data Flow

**Content Creation to Published Site:**

1. Author creates/edits markdown file in `content/posts/` with YAML frontmatter
2. Hugo reads `config.yaml` for site-wide settings and theme configuration
3. Hugo matches content type to archetype template in `archetypes/default.md`
4. Hugo selects appropriate layout from `themes/PaperMod/layouts/_default/`
5. Hugo processes markdown to HTML using Go templates
6. Hugo applies partial templates (header, footer, metadata) from `themes/PaperMod/layouts/partials/`
7. Hugo processes CSS/JS assets and copies to `public/assets/`
8. Hugo generates taxonomy pages (tags, categories) automatically
9. Hugo creates search index JSON for client-side search
10. Hugo outputs complete static site to `public/`
11. Netlify deploys `public/` directory to CDN

**State Management:**
- No runtime state - all content is static and immutable after build
- Client-side state only for theme toggle (dark/light mode) stored in localStorage
- Search state maintained client-side using Fuse.js library

## Key Abstractions

**Content Type:**
- Purpose: Categorizes content and determines rendering behavior
- Examples: `content/posts/*.md` (blog posts), `content/about.md` (single page)
- Pattern: Markdown files with YAML frontmatter defining metadata (title, date, tags, author)

**Archetype:**
- Purpose: Templates for new content creation
- Examples: `archetypes/default.md`
- Pattern: Markdown template with placeholder frontmatter

**Layout:**
- Purpose: HTML template that defines page structure
- Examples: `themes/PaperMod/layouts/_default/single.html` (single post), `themes/PaperMod/layouts/_default/list.html` (post listing)
- Pattern: Go template syntax with Hugo-specific functions and variables

**Partial:**
- Purpose: Reusable template components
- Examples: `themes/PaperMod/layouts/partials/head.html`, `themes/PaperMod/layouts/partials/footer.html`, `themes/PaperMod/layouts/partials/cover.html`
- Pattern: Standalone template fragments included via `{{ partial "name.html" . }}`

**Shortcode:**
- Purpose: Reusable content components insertable in markdown
- Examples: `themes/PaperMod/layouts/shortcodes/figure.html`, `themes/PaperMod/layouts/shortcodes/collapse.html`
- Pattern: Template invoked via `{{< shortcode-name params >}}` in markdown

**Taxonomy:**
- Purpose: Content classification system
- Examples: Tags and categories auto-generated from frontmatter
- Pattern: Hugo automatically creates listing pages at `/tags/` and `/categories/`

## Entry Points

**Build Entry Point:**
- Location: `config.yaml`
- Triggers: `hugo` command or Netlify build process
- Responsibilities: Initiates site generation, loads configuration, processes all content through theme templates

**Content Entry Point:**
- Location: `content/posts/`
- Triggers: New markdown file creation or edit
- Responsibilities: Defines page content and metadata via frontmatter

**Theme Entry Point:**
- Location: `themes/PaperMod/layouts/_default/baseof.html`
- Triggers: Every page render
- Responsibilities: Defines base HTML structure that all pages inherit

**Deployment Entry Point:**
- Location: `netlify.toml`
- Triggers: Git push to main branch
- Responsibilities: Configures build command, Hugo version, environment variables, deployment context

**Development Entry Point:**
- Location: Git hooks at `.husky/pre-commit`
- Triggers: Git commit attempt
- Responsibilities: Runs lint-staged to validate changes before commit

## Error Handling

**Strategy:** Build-time validation with fail-fast approach

**Patterns:**
- Hugo build errors halt the process and display template/content errors
- GitHub Actions workflow runs validation checks (markdown lint, spell check, link check)
- Pre-commit hooks prevent malformed commits via lint-staged
- Netlify deployment fails if Hugo build returns non-zero exit code
- 404 page template at `themes/PaperMod/layouts/404.html` handles runtime navigation errors

## Cross-Cutting Concerns

**Logging:** Hugo build output to console; Netlify deployment logs accessible via dashboard

**Validation:** 
- Markdown linting via `markdownlint-cli` using `.markdownlint.json` config
- Spell checking via `.spellcheck.yml` config in GitHub Actions
- HTML/CSS validation through stylelint with `.stylelintrc.json`

**Authentication:** Not applicable - static public site with no auth requirements

**SEO/Metadata:**
- Configured via frontmatter in content files and `config.yaml` params
- Canonical URLs, Open Graph tags, Twitter cards generated by theme templates
- Sitemap and RSS feeds auto-generated by Hugo
- Google Analytics integration via `config.yaml` services section

**Search:**
- Client-side search using Fuse.js library
- Search index generated as JSON at build time (`_default/index.json`)
- Configuration in `config.yaml` under `params.search`

---

*Architecture analysis: 2026-01-25*
