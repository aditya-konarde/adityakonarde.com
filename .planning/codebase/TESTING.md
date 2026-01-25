# Testing Patterns

**Analysis Date:** 2026-01-25

## Test Framework

**Runner:**
- No JavaScript/TypeScript test framework detected
- No Jest, Vitest, Mocha, or similar test runners configured
- This is a static Hugo site without programmatic tests

**Validation Tools:**
- markdownlint-cli for Markdown validation
- stylelint for CSS validation
- htmlhint for HTML validation
- yaml-lint for YAML validation
- spellcheck-github-actions for spelling

**Run Commands:**
```bash
# No test command in package.json
# Quality checks run via CI/CD only
```

## Test File Organization

**Location:**
- No test files found (no `*.test.*` or `*.spec.*` files)
- Not applicable - this is a content-focused static site

**Validation Files:**
- `.markdownlint.json` - Markdown linting rules
- `.stylelintrc.json` - CSS linting rules
- `.spellcheck.yml` - Spelling configuration
- `.github/workflows/hugo-checks.yml` - CI validation workflow

## Validation Structure

**CI/CD Pipeline:**
```yaml
# .github/workflows/hugo-checks.yml
jobs:
  build:
    steps:
      - Hugo Build Test
      - Markdown Lint
      - Spell Check
      - Link Check
```

**GitHub Actions Workflow:**
- Runs on: push and pull_request to `main` branch
- Platform: ubuntu-latest
- Hugo setup: peaceiris/actions-hugo@v2 with extended version
- Sequential validation steps (not parallel)

## Quality Gates

**Build Validation:**
```bash
hugo --minify
```
- Validates Hugo site builds successfully
- Catches template errors, frontmatter issues, broken references
- Minification checks for asset processing issues

**Markdown Validation:**
- Action: `actionshub/markdownlint@2`
- Config: `.markdownlint.json`
- Disabled rules:
  - MD013: Line length (no enforcement)
  - MD024: Duplicate headers (allowed)
  - MD033: Inline HTML (allowed)
  - MD040: Code fence language (not required)

**Spell Checking:**
- Action: `rojopolis/spellcheck-github-actions@0.25.0`
- Config: `.spellcheck.yml`
- Locale: en-US
- Wordlist: `.spellcheck-words.txt`
- Ignores: node_modules, .git, themes, public, resources

**Link Validation:**
- Action: `gaurav-nelson/github-action-markdown-link-check@v1`
- Modes: quiet and verbose
- Checks all markdown links for broken URLs

## Pre-commit Hooks

**Husky Configuration:**
```bash
# .husky/pre-commit
bunx lint-staged
```

**lint-staged Config:**
```json
{
  "lint-staged": {
    "*": "echo 'No linting configured'"
  }
}
```
- Hook is installed but not actively enforcing checks
- Placeholder implementation
- Could be extended for pre-commit validation

## Coverage

**Requirements:** Not applicable (no code coverage for static content)

**Content Quality Metrics:**
- All markdown files must pass lint
- All links must be valid
- All content must pass spell check
- Site must build successfully

## Build Testing

**Local Build:**
```bash
hugo --gc --minify
```
- Garbage collection of unused cache
- Minification of output
- Local preview: `hugo server`

**Production Build:**
```bash
# Netlify production
hugo --gc --minify --enableGitInfo
```
- Git info enabled for last modified dates
- Environment: `HUGO_ENV = "production"`
- Hugo version: 0.146.0

**Preview Builds:**
```bash
# Deploy preview
hugo --gc --minify --buildFuture -b $DEPLOY_PRIME_URL
```
- Future-dated posts included
- Dynamic base URL for preview environments

## Test Types

**Unit Tests:**
- Not applicable - no programmatic code to unit test

**Integration Tests:**
- Build test acts as integration test
- Validates Hugo + theme + content integration
- Catches template/content mismatches

**Content Validation:**
- Markdown syntax validation
- Frontmatter schema validation (implicit via Hugo build)
- Link integrity checks
- Spelling accuracy

**Visual/E2E Tests:**
- Not implemented
- Manual verification of deployed site

## Common Patterns

**Validation Workflow:**
1. Developer commits changes
2. Husky pre-commit runs (currently placeholder)
3. Push triggers GitHub Actions
4. Hugo build validates site generation
5. Markdown lint checks formatting
6. Spell check validates content
7. Link check validates URLs
8. All must pass for green status

**Error Detection:**
- Hugo build errors appear in CI logs
- Markdown lint errors show line numbers
- Spell check highlights unknown words
- Link check reports broken URLs

## Content Testing Best Practices

**Before Committing:**
```bash
# Local validation
hugo --minify                    # Test build
hugo server -D                    # Preview with drafts
# Manual: Review in browser
```

**Frontmatter Validation:**
- Required fields: title, date
- Optional fields validated by archetype template
- Schema enforced by Hugo build process

**Link Testing:**
- Internal links: validated by Hugo build
- External links: validated by link-check action
- Relative links preferred for internal content

## Deployment Validation

**Netlify Checks:**
- Build command: `hugo --gc --minify`
- Publish directory: `public`
- Deploy preview for every PR
- Production deploys only from main branch

**Environment-Specific:**
- Production: Full validation with Git info
- Preview: Includes future-dated posts
- Branch deploys: Custom base URLs

## Missing Testing Infrastructure

**Not Implemented:**
- JavaScript unit tests (none needed)
- Visual regression testing
- Performance testing
- Accessibility testing (automated)
- SEO validation
- Mobile responsiveness testing

**Potential Additions:**
- Pre-commit hooks for markdown lint
- Pre-commit hooks for spell check
- Pa11y for accessibility testing
- Lighthouse CI for performance
- HTML validator in CI pipeline

## Quality Assurance Strategy

**Current Approach:**
- Lint-first: Catch formatting issues
- Build-validation: Catch structural issues
- Content-validation: Catch spelling/links
- Manual review: Visual/UX validation

**Strengths:**
- Fast feedback via CI
- Comprehensive markdown validation
- Link integrity guaranteed
- Consistent spelling

**Gaps:**
- No pre-commit validation enforcement
- No automated accessibility checks
- No performance monitoring
- No visual regression testing

---

*Testing analysis: 2026-01-25*
