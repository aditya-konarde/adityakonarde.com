# Codebase Concerns

**Analysis Date:** 2026-01-25

## Tech Debt

**Lint-Staged Configuration Placeholder:**
- Issue: Pre-commit hook configured but linting is disabled with placeholder message
- Files: `package.json` (line 18), `.husky/pre-commit`
- Impact: No code quality checks run on commit despite having linters installed (eslint, markdownlint, stylelint, htmlhint)
- Fix approach: Configure actual linting commands in `lint-staged` config to run appropriate linters per file type

**Missing ESLint Configuration:**
- Issue: ESLint is installed as devDependency but no configuration file exists
- Files: `package.json` (eslint ^9.39.2 installed)
- Impact: JavaScript linting cannot run; no code quality enforcement for JS files
- Fix approach: Create `eslint.config.js` or `.eslintrc.json` with appropriate rules for the project

**Outdated npm Dependencies:**
- Issue: Major version updates available for stylelint packages
- Files: `package.json`
- Impact: Missing bug fixes and new features; stylelint 16.26.1 → 17.0.0, stylelint-config-standard 39.0.1 → 40.0.0
- Fix approach: Test and update to latest versions; review breaking changes in migration guides

**Bun Lock File Without Bun Configuration:**
- Issue: `bun.lock` exists but project uses npm based on `package.json` scripts
- Files: `bun.lock`, `package.json`
- Impact: Potential confusion about package manager; inconsistent dependency resolution
- Fix approach: Decide on single package manager (npm vs bun) and remove unused lockfile

**Missing Package Lock File:**
- Issue: No `package-lock.json` found in root (expected for npm-based project)
- Files: Root directory
- Impact: Unreliable dependency versions across installations; potential breakage
- Fix approach: Run `npm install` to generate lockfile and commit it

**Committed Build Artifacts:**
- Issue: `public/` directory with generated HTML/CSS/JS is tracked in git
- Files: `public/**/*` (2.0M of generated content)
- Impact: Bloated repository; merge conflicts; unnecessary history; already excluded in `.gitignore` but present in repo
- Fix approach: Remove `public/` from git history with `git rm -r --cached public/`, ensure `.gitignore` is respected

**Theme as Subdirectory Instead of Submodule:**
- Issue: PaperMod theme appears to be committed directly rather than as git submodule
- Files: `themes/PaperMod/**/*` (671K)
- Impact: Cannot easily update theme; loses upstream update path; harder to track modifications
- Fix approach: Convert to git submodule or document intentional fork decision

**Hardcoded Hugo Version:**
- Issue: Hugo version specified as "latest" in CI but pinned to 0.146.0 in Netlify
- Files: `.github/workflows/hugo-checks.yml` (line 20), `netlify.toml` (lines 6, 14, 21, 27)
- Impact: CI and production could run different Hugo versions causing build inconsistencies
- Fix approach: Pin to same specific version in both places; update together intentionally

## Known Bugs

**Console.log in Production Code:**
- Symptoms: Debug console output exposed in production search functionality
- Files: `themes/PaperMod/assets/js/fastsearch.js:47`
- Trigger: XHR request failure when loading search index
- Workaround: Error logged but not handled; search silently fails

**No Error Handling for Failed Search Index Load:**
- Symptoms: Search feature breaks silently if `index.json` fails to load
- Files: `themes/PaperMod/assets/js/fastsearch.js` (lines 11-53)
- Trigger: Network error, 404, or malformed JSON when fetching `../index.json`
- Workaround: None; users see non-functional search with no feedback

**Draft Post Visible in Repository:**
- Symptoms: `devconf-cz-2020.md` has `draft: true` frontmatter
- Files: `content/posts/devconf-cz-2020.md`
- Trigger: Always present
- Workaround: Hugo excludes from production builds by default but file is incomplete

## Security Considerations

**Google Analytics ID Exposed:**
- Risk: GA tracking ID visible in source code (expected but worth noting)
- Files: `config.yaml:11`
- Current mitigation: Public tracking ID is normal practice
- Recommendations: None needed; not sensitive data

**No CSP or Security Headers Configuration:**
- Risk: Missing Content-Security-Policy and other security headers
- Files: `netlify.toml` (no headers section)
- Current mitigation: None detected
- Recommendations: Add `[[headers]]` section to `netlify.toml` with CSP, X-Frame-Options, X-Content-Type-Options

**XMLHttpRequest Instead of Fetch API:**
- Risk: Using legacy API more prone to CORS issues and less secure defaults
- Files: `themes/PaperMod/assets/js/fastsearch.js:11`
- Current mitigation: Relative URL reduces risk
- Recommendations: Migrate to modern `fetch()` API with better error handling

**No Subresource Integrity (SRI) for External Scripts:**
- Risk: If using CDN resources without integrity checks (not detected currently)
- Files: Not applicable (self-hosted assets)
- Current mitigation: All scripts self-hosted
- Recommendations: Maintain self-hosting or add SRI if adding CDN resources

## Performance Bottlenecks

**Large Minified fuse.js Library:**
- Problem: 15KB minified search library loaded on every page
- Files: `themes/PaperMod/assets/js/fuse.basic.min.js` (15,408 bytes)
- Cause: Full fuzzy search library for client-side search
- Improvement path: Lazy-load only on search page; consider lighter alternatives; use code splitting

**No Image Optimization Pipeline:**
- Problem: Images served as-is without modern formats or responsive srcset
- Files: `static/images/*.{jpg,png}`, theme templates in `themes/PaperMod/layouts/partials/cover.html`
- Cause: Hugo image processing not configured; templates use simple img tags
- Improvement path: Configure Hugo image processing; use `.Resize`, `.Fit`; add WebP format; implement responsive images

**Search Index Generated as Single JSON:**
- Problem: Entire search index loaded at once regardless of content size
- Files: Search index pattern in `themes/PaperMod/assets/js/fastsearch.js:51` (`../index.json`)
- Cause: Simple static search implementation
- Improvement path: Paginate search index or use build-time search with server-side component

## Fragile Areas

**Search Functionality:**
- Files: `themes/PaperMod/assets/js/fastsearch.js`
- Why fragile: No error handling, assumes DOM elements exist, tightly coupled to specific HTML structure, legacy XHR API
- Safe modification: Add null checks for DOM elements, wrap XHR in try-catch, add user-facing error messages
- Test coverage: None detected (no test files found)

**Theme Customization:**
- Files: `themes/PaperMod/**/*`
- Why fragile: Direct modifications to theme files instead of overrides; updates will overwrite changes
- Safe modification: Use Hugo's layout override pattern - copy files to root `layouts/` directory instead of editing theme
- Test coverage: None

**CI/CD Pipeline Fragility:**
- Files: `.github/workflows/hugo-checks.yml`
- Why fragile: Uses third-party actions with potentially breaking updates; markdown-link-check may break on external link rot
- Safe modification: Pin action versions with SHA instead of tags; add continue-on-error for link checks
- Test coverage: Workflow runs but no test suite exists

## Scaling Limits

**Static Site Generation:**
- Current capacity: ~8 blog posts currently, Hugo can handle thousands
- Limit: Build time increases linearly with posts; at ~1000+ posts may need optimization
- Scaling path: Use Hugo's paginate, implement incremental builds, add CDN caching

**Client-Side Search:**
- Current capacity: Works well for small sites (<50 posts)
- Limit: Search index size grows with content; 100+ posts may cause slow initial load
- Scaling path: Switch to Algolia/Meilisearch or implement server-side search

## Dependencies at Risk

**Husky Pre-commit Hooks:**
- Risk: Using `bunx` in pre-commit hook but project is npm-based
- Files: `.husky/pre-commit:4` (`bunx lint-staged`)
- Impact: Hook will fail if bun is not installed
- Migration plan: Change to `npx lint-staged` for consistency with npm

**Third-Party GitHub Actions:**
- Risk: Unversioned or loosely versioned action dependencies
- Files: `.github/workflows/hugo-checks.yml`
- Impact: `actionshub/markdownlint@2`, `rojopolis/spellcheck-github-actions@0.25.0` could break
- Migration plan: Pin to commit SHAs or migrate to maintained alternatives

## Missing Critical Features

**No Automated Testing:**
- Problem: No unit, integration, or e2e tests for JavaScript, layout templates, or build process
- Blocks: Confident refactoring, preventing regressions, validating builds
- Priority: Medium - static site has lower risk but search/JS features need coverage

**No RSS/Atom Feed Configuration:**
- Problem: Hugo generates default feeds but not customized
- Blocks: Advanced feed features, custom feed formats, filtered feeds
- Priority: Low - default feeds likely sufficient

**No Sitemap Customization:**
- Problem: Default sitemap generation without priority/changefreq tuning
- Blocks: SEO optimization
- Priority: Low - default sitemap exists at `/sitemap.xml`

**No Content Security Policy:**
- Problem: Missing CSP headers for XSS protection
- Blocks: Enhanced security posture
- Priority: Medium - adds defense in depth

## Test Coverage Gaps

**JavaScript Functionality:**
- What's not tested: Search functionality, keyboard navigation, theme toggle
- Files: `themes/PaperMod/assets/js/fastsearch.js`, theme JS files
- Risk: Regressions in search, navigation breaking silently
- Priority: High - user-facing interactive features

**Hugo Build Process:**
- What's not tested: Template rendering, shortcodes, content generation
- Files: All `themes/PaperMod/layouts/**/*.html`
- Risk: Template errors not caught until runtime, broken pages deployed
- Priority: Medium - CI builds but doesn't validate output

**Markdown Content Rendering:**
- What's not tested: Whether posts render correctly, links work, images load
- Files: `content/posts/*.md`
- Risk: Broken posts go unnoticed until manual review
- Priority: Medium - link checker in CI helps but not comprehensive

**Accessibility:**
- What's not tested: ARIA labels, keyboard navigation, screen reader compatibility
- Files: All template files
- Risk: Accessibility regressions, WCAG compliance issues
- Priority: Medium - impacts usability for users with disabilities

---

*Concerns audit: 2026-01-25*
