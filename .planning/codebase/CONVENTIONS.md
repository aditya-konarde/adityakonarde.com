# Coding Conventions

**Analysis Date:** 2026-01-25

## Naming Patterns

**Files:**
- Markdown content: lowercase-with-hyphens.md (e.g., `multiple-llm-development-workflow.md`, `sre-time-management.md`)
- Configuration files: lowercase with dots (e.g., `config.yaml`, `.markdownlint.json`, `.stylelintrc.json`)
- Frontmatter archetype: `default.md`

**Directories:**
- lowercase (e.g., `content/`, `posts/`, `archetypes/`, `assets/`)
- Hidden config directories: dot-prefixed (e.g., `.husky/`, `.github/`, `.planning/`)

**YAML Keys:**
- camelCase for Hugo parameters (e.g., `baseUrl`, `languageCode`, `showToc`, `TocOpen`, `hidemeta`)
- kebab-case for some meta fields (e.g., `lint-staged`)

## Code Style

**Formatting:**
- Markdown linting enforced via `markdownlint-cli` with config in `.markdownlint.json`
- Disabled rules: MD013 (line length), MD024 (duplicate headers), MD033 (inline HTML), MD040 (code block language)
- CSS/SCSS linting via `stylelint` with `stylelint-config-standard`
- Ignores: `node_modules/**`, `themes/PaperMod/**`, `public/**`

**Linting:**
- ESLint v9.39.2 configured but no specific ruleset detected in package.json
- lint-staged configured with placeholder: `"*": "echo 'No linting configured'"`
- Husky pre-commit hook runs `bunx lint-staged`

**Quality Checks:**
- Spell checking via `.spellcheck.yml` with US English locale
- HTMLHint for HTML validation
- yaml-lint for YAML files

## File Organization

**Content Structure:**
- Blog posts: `content/posts/[slug].md`
- Pages: `content/[page].md` (e.g., `content/about.md`)
- Assets: `assets/images/[filename]`
- Archetypes: `archetypes/default.md` for content templates

**Configuration Files:**
- Main config: `config.yaml` (YAML format, not TOML)
- Build config: `netlify.toml`
- Git hooks: `.husky/pre-commit`
- Linting configs: `.markdownlint.json`, `.stylelintrc.json`, `.spellcheck.yml`

## Frontmatter Format

**Standard Fields:**
```yaml
---
title: "Post Title"
date: YYYY-MM-DDTHH:MM:SS+TZ
draft: false
showToc: true
TocOpen: false
hidemeta: false
comments: false
canonicalURL: ""
searchHidden: false
---
```

**Optional Fields:**
- `description`: SEO description string
- `tags`: Array of tag strings
- `author`: Author name
- `weight`: Numeric ordering
- `cover`: Object with image, alt, caption, relative fields

**Archetype Template:**
- Uses Hugo templating: `{{ replace .Name "-" " " | title }}`
- Includes TOC configuration and cover image placeholders
- Default draft status: `true`

## Content Writing Style

**Headings:**
- Use `##` for top-level headings (not `#` since title comes from frontmatter)
- Progressive heading hierarchy: `##`, `###`, `####`
- No skipping levels

**Code Blocks:**
- Fenced with triple backticks
- Language identifier specified: ```yaml, ```bash (though MD040 is disabled)
- Used extensively for technical examples

**Links:**
- Inline format: `[text](url)`
- External links include full URLs: `https://kubernetes.io`
- Markdown format: `<https://github.com/aditya-konarde>` for standalone URLs

**Lists:**
- Unordered lists use `-` (hyphen)
- Consistent indentation for nested lists
- Mix of bullet points and numbered lists

## Comments and Documentation

**Markdown Comments:**
- Not extensively used in content
- YAML comments use `#` prefix
- Configuration files include descriptive inline comments

**Frontmatter Documentation:**
- Archetype includes inline comments explaining fields
- Example: `# Path to your cover image`

## Error Handling

**Build Errors:**
- Hugo build runs with `--gc --minify` flags
- GitHub Actions workflow validates builds on push/PR
- Netlify deployment uses Hugo v0.146.0

**Validation:**
- Markdown lint failures caught in CI
- Spell check failures caught in CI
- Link check runs in GitHub Actions
- No automated testing for content quality

## YAML Configuration Patterns

**Hugo Config Structure:**
```yaml
baseUrl: https://www.adityakonarde.com/
languageCode: en-us
theme: PaperMod
params:
  profileMode:
    enabled: true
    buttons:
      - name: "About"
        url: "about"
```

**Nested Objects:**
- Use proper YAML indentation (2 spaces)
- Arrays of objects for repeating structures (buttons, socialIcons)
- String values quoted when containing special characters

## Version Control

**Gitignore Patterns:**
- Generated files: `/public/`, `/resources/_gen/`, `hugo_stats.json`
- Dependencies: `node_modules/`
- Build artifacts: `hugo.exe`, `hugo.darwin`, `hugo.linux`
- IDE files: `.idea/`, `.vscode/`, `*.swp`, `*.swo`
- Environment: `.env`, `.env.*`
- OS files: `.DS_Store`, `Thumbs.db`

**Commit Patterns:**
- Husky pre-commit hooks enforced
- lint-staged runs before commits (though currently a placeholder)

## CI/CD Integration

**GitHub Actions:**
- Workflow file: `.github/workflows/hugo-checks.yml`
- Triggers: push and PR to `main` branch
- Steps: Hugo build, markdown lint, spell check, link check
- Uses external actions: `peaceiris/actions-hugo@v2`, `actionshub/markdownlint@2`, `rojopolis/spellcheck-github-actions@0.25.0`

**Netlify:**
- Command: `hugo --gc --minify`
- Production Hugo version: 0.146.0
- Context-specific builds for deploy-preview and branch-deploy
- Git info enabled in production: `HUGO_ENABLEGITINFO = "true"`

## Package Management

**Package Manager:**
- Uses `bun` for running commands (`bunx lint-staged`)
- Has both `package.json` and `bun.lock`
- npm/yarn also supported (node_modules present)

**Dependencies:**
- All devDependencies (no production dependencies)
- Linting tools: eslint, markdownlint-cli, stylelint, htmlhint, yaml-lint
- Git hooks: husky, lint-staged
- Versions pinned with caret ranges (e.g., `^9.39.2`)

## Special File Conventions

**Hugo-Specific:**
- Lock file: `.hugo_build.lock` (ignored in git)
- Submodules: `.gitmodules` for theme management
- Theme location: `themes/PaperMod` (git submodule)

**Locale:**
- en-US spelling enforced via spellcheck
- Localization support in theme: `languages.en` section in config
- Date format: `YYYY-MM-DD` for lists, ISO 8601 for posts

---

*Convention analysis: 2026-01-25*
