# Codebase Structure

**Analysis Date:** 2026-01-25

## Directory Layout

```
adityakonarde.com/
├── .github/
│   └── workflows/          # CI/CD pipeline definitions
├── .husky/                 # Git hooks (pre-commit)
├── .planning/              # Planning and documentation
│   └── codebase/           # Codebase analysis documents
├── archetypes/             # Content templates for new posts
├── assets/                 # Custom site assets
│   └── images/             # Site images (profile photo)
├── content/                # All site content (markdown)
│   ├── posts/              # Blog post markdown files
│   └── about.md            # About page content
├── public/                 # Generated static site (not committed)
├── resources/              # Hugo cache and generated resources
│   └── _gen/               # Auto-generated assets
├── themes/                 # Hugo themes (Git submodules)
│   └── PaperMod/           # Active theme
├── config.yaml             # Main Hugo configuration
├── netlify.toml            # Netlify deployment config
├── package.json            # Node.js dependencies for linting
└── .gitmodules             # Git submodule configuration
```

## Directory Purposes

**`.github/workflows/`:**
- Purpose: GitHub Actions CI/CD automation
- Contains: Workflow YAML files
- Key files: `hugo-checks.yml` (builds site, runs markdown lint, spell check, link check)

**`.husky/`:**
- Purpose: Git hooks for pre-commit validation
- Contains: Hook scripts
- Key files: `pre-commit` (runs lint-staged via bunx)

**`.planning/`:**
- Purpose: Project planning and documentation
- Contains: Codebase analysis documents
- Key files: `codebase/ARCHITECTURE.md`, `codebase/STRUCTURE.md`

**`archetypes/`:**
- Purpose: Templates for creating new content
- Contains: Markdown templates with default frontmatter
- Key files: `default.md` (default post template with title, date, toc, cover image placeholders)

**`assets/`:**
- Purpose: Site-specific static assets
- Contains: Images and custom theme overrides
- Key files: `images/propic-square.jpeg` (profile photo used in config)

**`content/`:**
- Purpose: All site content in markdown format
- Contains: Blog posts and static pages
- Key files: 
  - `posts/*.md` (individual blog posts)
  - `about.md` (about page)

**`public/`:**
- Purpose: Hugo build output directory (deployment artifact)
- Contains: Complete generated static site
- Generated: Yes
- Committed: No (in `.gitignore`)
- Structure: Mirrors site URL structure with HTML files, assets, taxonomy pages

**`resources/`:**
- Purpose: Hugo's build cache and processed assets
- Contains: Generated/cached assets for faster rebuilds
- Generated: Yes
- Committed: No (in `.gitignore`)

**`themes/`:**
- Purpose: Hugo theme(s) as Git submodules
- Contains: PaperMod theme
- Key files: `PaperMod/` (complete theme with layouts, assets, i18n)

**`themes/PaperMod/`:**
- Purpose: Active Hugo theme providing all presentation layer
- Contains:
  - `layouts/` - HTML templates
  - `assets/` - CSS and JavaScript
  - `i18n/` - Internationalization files
  - `images/` - Theme images
- Managed as Git submodule from `https://github.com/adityatelange/hugo-PaperMod.git`

## Key File Locations

**Entry Points:**
- `config.yaml`: Main Hugo configuration (site settings, theme config, menus, params)
- `netlify.toml`: Netlify deployment configuration (build command, Hugo version, contexts)

**Configuration:**
- `config.yaml`: Hugo site configuration
- `.markdownlint.json`: Markdown linting rules
- `.spellcheck.yml`: Spell check configuration for CI
- `.stylelintrc.json`: CSS linting rules
- `.gitmodules`: Git submodule configuration for themes
- `package.json`: Node.js dev dependencies (linters, husky)

**Core Content:**
- `content/posts/*.md`: Individual blog post markdown files
- `content/about.md`: About page content

**Templates:**
- `archetypes/default.md`: Template for new content creation
- `themes/PaperMod/layouts/_default/baseof.html`: Base HTML template
- `themes/PaperMod/layouts/_default/single.html`: Single post template
- `themes/PaperMod/layouts/_default/list.html`: Post listing template
- `themes/PaperMod/layouts/partials/`: Reusable template components

**Quality Assurance:**
- `.github/workflows/hugo-checks.yml`: CI pipeline for validation
- `.husky/pre-commit`: Pre-commit git hook script

## Naming Conventions

**Files:**
- Blog posts: `kebab-case.md` (e.g., `alertmanager-deployment-patterns.md`)
- Config files: `lowercase.yaml` or `lowercase.toml`
- Templates: `lowercase.html` or `snake_case.html` in theme

**Directories:**
- All lowercase with hyphens where needed
- Plural names for content collections (`posts/`, `workflows/`)

**Frontmatter Fields:**
- camelCase: `showToc`, `TocOpen`, `hidemeta`, `searchHidden`
- lowercase: `title`, `date`, `tags`, `author`, `description`

## Where to Add New Code

**New Blog Post:**
- Primary code: `content/posts/new-post-title.md`
- Follow archetype: Use `archetypes/default.md` as template or run `hugo new posts/new-post-title.md`
- Frontmatter required: `title`, `date`, `description`, `tags`, `author`
- Images: Reference from `assets/images/` or use external URLs

**New Static Page:**
- Implementation: `content/page-name.md`
- Add to menu: Update `config.yaml` under `languages.en.menu.main`

**Custom Styling:**
- Theme overrides: Create `assets/css/extended/` directory (Hugo will merge with theme CSS)
- Custom CSS: Reference in `config.yaml` params or create file in `assets/css/`

**New Menu Item:**
- Configuration: Add to `config.yaml` under `languages.en.menu.main` array
- Format:
  ```yaml
  - identifier: unique-id
    name: Display Name
    url: /target-url
  ```

**Custom Shortcode:**
- Implementation: `layouts/shortcodes/shortcode-name.html` (create `layouts/` directory in root to override theme)
- Usage in content: `{{< shortcode-name >}}content{{< /shortcode-name >}}`

**Site Configuration:**
- Global settings: `config.yaml` (theme params, social icons, profile mode, search config)
- Deployment settings: `netlify.toml` (Hugo version, build commands, environment variables)

**New GitHub Action:**
- Implementation: `.github/workflows/workflow-name.yml`
- Triggers: Configure `on:` section for push/PR events

**Additional Linting:**
- Package: Add to `package.json` devDependencies
- Config: Create config file in root (e.g., `.eslintrc.json`)
- Hook: Update `.husky/pre-commit` or `package.json` lint-staged section

## Special Directories

**`node_modules/`:**
- Purpose: Node.js dependencies for development tooling (linters)
- Generated: Yes (via `npm install` or `bun install`)
- Committed: No (in `.gitignore`)

**`public/`:**
- Purpose: Hugo build output - complete static site ready for deployment
- Generated: Yes (via `hugo` command)
- Committed: No (Netlify builds on their servers)

**`resources/_gen/`:**
- Purpose: Hugo's internal cache for processed assets (optimized images, compiled CSS)
- Generated: Yes (during Hugo build)
- Committed: No (in `.gitignore`)

**`themes/PaperMod/`:**
- Purpose: Third-party theme providing all UI/UX templates
- Generated: No
- Committed: No (Git submodule - only reference committed)
- Update via: `git submodule update --remote themes/PaperMod`

**`.husky/_/`:**
- Purpose: Husky internal directory for hook management
- Generated: Yes (via `husky install`)
- Committed: Yes (required for hook functionality)

## Content Frontmatter Structure

**Required Fields:**
```yaml
title: "Post Title"
date: 2026-01-25T10:00:00+01:00
```

**Common Optional Fields:**
```yaml
description: "SEO description and excerpt"
tags: ["tag1", "tag2"]
author: "Author Name"
showToc: true              # Show table of contents
TocOpen: true              # Expand TOC by default
hidemeta: false            # Show post metadata
comments: false            # Enable/disable comments
canonicalURL: ""           # Canonical URL for SEO
searchHidden: false        # Exclude from search
weight: 1                  # Sort order
draft: true                # Draft status (not published)
```

**Cover Image:**
```yaml
cover:
  image: "images/cover.jpg"
  alt: "Alt text"
  caption: "Optional caption"
  relative: false
```

## Theme Customization Pattern

**To override theme files:**
1. Create matching directory structure in project root
2. Create file with same name as theme file
3. Hugo will use project file instead of theme file

**Example:**
- Override: `themes/PaperMod/layouts/_default/single.html`
- Create: `layouts/_default/single.html` in project root
- Hugo will use project version

**Extending theme CSS:**
- Create: `assets/css/extended/custom.css`
- Hugo automatically includes after theme CSS

---

*Structure analysis: 2026-01-25*
