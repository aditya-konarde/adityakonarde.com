# AGENTS.md

Guidance for AI coding agents working in this repository. This site is a Hugo + PaperMod blog; the main content is the weekly newsletter roundup ("Week in Review: AI, SRE & Observability") in `content/posts/week-in-review-*.md`.

## Content standard: no-slop (REQUIRED for all prose)

Every roundup post must satisfy the [Byk3y/no-slop](https://github.com/Byk3y/no-slop) standard (13 rules based on Wikipedia's "Signs of AI writing"). Run this pass on any prose you write or edit before opening a PR.

### Banned vocabulary — never use in prose

`leverage`, `utilize`, `facilitate`, `delve`, `tapestry`, `pivotal`, `vibrant`, `meticulous`, `landscape` (metaphorical), `testament`, `underscore`, `intricate`, `interplay`, `garner`, `bolster`, `foster`, `showcase`, `emphasize`, `enduring`, `crucial`, `enhance` (as verb in prose), `highlight` (as verb), `renowned`, `groundbreaking`, `profound`, `comprehensive`, `multifaceted`, `encompasses`, `spearhead`, `harness` (as verb), `elevate`, `streamline`, `robust` (in prose), `seamless`, `holistic`, `synergy`, `paradigm`, `ecosystem` (metaphorical), `additionally`.

Plain alternatives: use → *use*; showcase → *show*; crucial → *important*; enhance → *improve*; ecosystem → *community / market / platform*.

### Banned phrases

"not just X, but Y" / "not only X, but also Y", "it's not X, it's Y", "serves as", "stands as", "in an era where", "at the heart of", "it is worth noting", "paving the way", "a testament to", "it remains to be seen", "the intersection of", "a beacon of", "plays a crucial role", "in today's world/landscape", "let's explore/dive in", "marks a pivotal moment", "represents a significant shift", "deeply rooted", "rich history", "boasts a".

Also avoid: rule-of-three padding, present-participle filler ("highlighting…", "underscoring…"), "challenges-and-prospects" closers, vague attributions ("experts say", "industry reports"), generic upbeat endings ("the future looks bright"), and announcement signposting ("let's dive in", "here's what you need to know").

### Em-dash discipline

- House norm is **1–2 em dashes per body paragraph**. A body paragraph with 3+ dashes is a violation — trim the least essential dash(es) with commas, colons, or parentheses. Do not rewrite the author's voice to do it.
- Count BOTH `--` and `—` (the archive mixes them; prefer `--` in new posts to match recent house style).
- **Structural dashes are exempt** (do not count, do not touch):
  - `**Title** --` story separators (title on its own line, dash at end)
  - `- **Quick Link** -- description [Source](url)` list items
  - `[Source](url)` lines
  - Literal CLI flags in code spans (`` `--feature-gates=…` ``)

### Formatting conventions

- Story format: `**Title** --` on its own line, then body prose, then `[Source](url)` (optionally `[Source (Publication)](url)`).
- Section headers: `## AI and Machine Learning`, `## Site Reliability Engineering`, `## Observability`, `## 🔗 Quick Links` — sentence case; the only emoji in the whole archive is the 🔗 in the Quick Links header.
- Straight quotes only; no curly quotes. No emoji elsewhere. Light bold (story titles only).
- Prefer plain copulas: "is", "has" — not "serves as", "stands as", "boasts".
- Vary sentence length; contractions are fine; specific numbers and named sources over adjectives.

### Repo-specific false positives (do NOT "fix" these)

Learned from repeated audits of this archive — a naive scan will flag them; they are correct as-is:

- `ecosystem` — "Python ecosystem", "Kubernetes ecosystem", "cloud-native ecosystem" are idiomatic technical usage.
- `enhancements` — Kubernetes release terminology ("68 enhancements"); "Git Sync enhancements" is a Grafana feature name.
- `harness` — "execution harness", "agent harnesses" (technical terms); "Harness" (uppercase) is a company name.
- `elevated` — SRE terminology ("elevated HTTP 5xx errors").
- `paradigm` — inside quoted article titles; "the LLM paradigm" is accepted ML jargon.
- `crucial` / `key` / `robust` / `seamless` — allowed in technical/code contexts (conditional bans).
- `enduring` — inside URL slugs and press-release titles.
- Direct quotes — never alter quoted speech, even if it contains a banned word.

## Link verification (for any new or edited link)

1. A 403/429 from a CI/datacenter IP is **not** a dead link — it's bot-blocking. Verify with a browser User-Agent first: `curl -A "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/126.0" <url>`.
2. If content returns (or `web_extract` gets the page), the link is live — leave it.
3. 404 / connection refused / no DNS = genuinely dead → replace with a Wayback Machine snapshot (`https://archive.org/wayback/available?url=<url>`) or another canonical source the archive already cites.
4. The repo's CI link check uses `.markdown-link-check.json` — check its ignore list before concluding a domain is broken.

## Checks (run before pushing)

```bash
npx markdownlint-cli2 "content/**/*.md"   # must be: 0 issues
# link check runs in CI via .markdown-link-check.json
# hugo build runs in CI (Netlify); the local Debian hugo (v0.111) is too old to build the current PaperMod theme — trust the Netlify preview
```

- Local commits: the husky pre-commit hook runs `bunx lint-staged`. If bun isn't installed the hook fails silently — commit with `git commit --no-verify` and confirm the new HEAD SHA after pushing.

## Repo workflow notes

- `main` is branch-protected: PRs require 1 approving review. The maintenance bot (`aditya-konarde-assistant-bot`) reviews and merges roundup + dependency PRs; bot-authored PRs are approved by the repo owner.
- Keep PRs minimal and idiomatic. Squash-merge is the convention.
- Netlify deploys every merged PR to production automatically.
