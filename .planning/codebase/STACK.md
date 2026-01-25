# Technology Stack

**Analysis Date:** 2026-01-25

## Languages

**Primary:**
- YAML - Site configuration (`config.yaml`)
- Markdown - Content authoring (`content/**/*.md`)
- HTML - Generated static output

**Secondary:**
- JavaScript - Theme functionality (Fuse.js search, highlight.js)
- CSS - Styling (generated via Hugo pipeline)

## Runtime

**Environment:**
- Hugo v0.153.4 (Static Site Generator)
- Minimum required: v0.146.0 (per theme requirements)

**Package Manager:**
- Bun - JavaScript dependencies and task runner
- Lockfile: `bun.lock` (present, v1)
- Node.js v25.2.1 / npm 11.6.2 also available

## Frameworks

**Core:**
- Hugo v0.153.4 - Static site generator with templating, asset pipeline, and content management
- PaperMod theme (git submodule) - Hugo theme providing responsive design, dark mode, search, and social features

**Testing:**
- None detected for application code

**Build/Dev:**
- Hugo - Build and development server
- Bun - JavaScript package management and script execution

## Key Dependencies

**Critical:**
- `hugo-PaperMod` (git submodule) - Core theme providing all UI/UX functionality
- Fuse.js (bundled in theme) - Client-side search functionality
- Highlight.js (bundled in theme) - Code syntax highlighting

**Infrastructure:**
- `husky` ^9.1.7 - Git hooks automation
- `lint-staged` ^16.2.7 - Pre-commit linting orchestration

**Linting/Quality:**
- `eslint` ^9.39.2 - JavaScript linting
- `htmlhint` ^1.8.0 - HTML validation
- `markdownlint-cli` ^0.47.0 - Markdown linting
- `stylelint` ^16.26.1 - CSS linting
- `stylelint-config-standard` ^39.0.1 - CSS linting rules
- `yaml-lint` ^1.7.0 - YAML validation

## Configuration

**Environment:**
- No environment variables required for local development
- No `.env` files detected
- Configuration via `config.yaml` (static YAML config)

**Build:**
- `config.yaml` - Hugo site configuration (base URL, theme, params, menus, services)
- `netlify.toml` - Deployment configuration with Hugo version pinning
- `.markdownlint.json` - Markdown linting rules
- `.stylelintrc.json` - CSS linting rules
- `.spellcheck.yml` - Spell checking configuration
- `package.json` - Minimal npm scripts (husky prepare hook)

**Git Hooks:**
- `.husky/pre-commit` - Runs `bunx lint-staged` before commits
- `lint-staged` configured but currently set to echo (no active linting)

## Platform Requirements

**Development:**
- Hugo v0.146.0 or higher (extended version recommended)
- Bun or Node.js/npm for dependency management
- Git with submodule support (for theme)

**Production:**
- Netlify (configured deployment target)
- Hugo v0.146.0 specified in `netlify.toml`
- Static file hosting (no server-side runtime required)

---

*Stack analysis: 2026-01-25*
