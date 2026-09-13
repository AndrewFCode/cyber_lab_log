# Knowledge Blog — Build Instructions

A spec for building a personal knowledge site that hosts **cheat sheets**, **explainer documents**, and **thoughts**, published from a GitHub repo to GitHub Pages, editable from a browser CMS, with live GitHub activity on the site.

Hand this file to a coding agent (Claude Code, Cursor, etc.) or follow it manually. Replace every `<PLACEHOLDER>` before starting.

---

## 0. Placeholders

| Placeholder | Meaning | Example |
|---|---|---|
| `<GH_USER>` | GitHub username | `andrew-dev` |
| `<REPO>` | Repo name | `andrew-dev.github.io` |
| `<SITE_NAME>` | Display name of the site | `Andrew's Notes` |
| `<SITE_URL>` | Final public URL | `https://andrew-dev.github.io` |

> **Repo naming matters.** Name the repo `<GH_USER>.github.io` and the site lives at the domain root with no base path. Any other repo name means the site lives at `/<REPO>/` and every internal link needs a `base` prefix. **Use `<GH_USER>.github.io`** unless there's a reason not to.

---

## 1. Goals

1. One place to write and find cheat sheets, explainers, and short notes.
2. Content is plain Markdown in a Git repo — portable, diffable, no lock-in.
3. Publishing is a commit. No manual build or upload step, ever.
4. Editable from any browser, including a phone, without touching a terminal.
5. The site shows what's being worked on via live GitHub repo and contribution data.
6. Free to run.

### Non-goals (v1)
- Comments, newsletter, analytics dashboards, multi-author support.
- A database or any server-side runtime. GitHub Pages serves static files only — every "dynamic" feature is resolved at build time.

---

## 2. Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Astro** (latest, TypeScript) | Content-first, ships zero JS by default, built-in Markdown/MDX content collections with schema validation. |
| Styling | **Tailwind CSS** via `@astrojs/tailwind` | Fast, no CSS file sprawl. |
| Content | Markdown + MDX in `src/content/` | Human-readable, CMS-compatible. |
| Search | **Pagefind** | Static full-text search, indexes at build, no service needed. |
| Editing | **Pages CMS** (`pagescms.org`) | Browser CMS that commits straight to GitHub. Needs no backend, so it works with GitHub Pages. |
| CI/CD | **GitHub Actions** → GitHub Pages | Build + deploy on every push to `main`. |
| Feeds | `@astrojs/rss`, `@astrojs/sitemap` | RSS and sitemap out of the box. |

Install baseline:

```bash
npm create astro@latest -- --template minimal --typescript strict
npx astro add tailwind mdx sitemap
npm i @astrojs/rss
npm i -D pagefind
```

---

## 3. Repo structure

```
/
├── .github/workflows/deploy.yml     # build + deploy to Pages
├── .pages.yml                       # Pages CMS config (browser editing)
├── astro.config.mjs
├── public/
│   ├── images/                      # CMS uploads land here
│   └── favicon.svg
├── scripts/
│   └── fetch-github.mjs             # pulls repo + contribution data at build time
├── src/
│   ├── components/
│   │   ├── BaseHead.astro
│   │   ├── Header.astro  Footer.astro
│   │   ├── PostCard.astro
│   │   ├── TagList.astro
│   │   ├── TableOfContents.astro
│   │   ├── CopyButton.astro         # copy-to-clipboard on code blocks
│   │   ├── GitHubRepos.astro
│   │   └── ContributionGraph.astro
│   ├── content/
│   │   ├── config.ts                # collection schemas
│   │   ├── cheatsheets/
│   │   ├── explainers/
│   │   └── thoughts/
│   ├── data/
│   │   └── github.json              # generated at build, git-ignored
│   ├── layouts/
│   │   ├── Base.astro
│   │   └── Doc.astro                # shared article layout
│   ├── pages/
│   │   ├── index.astro
│   │   ├── cheatsheets/[...slug].astro + index.astro
│   │   ├── explainers/[...slug].astro + index.astro
│   │   ├── thoughts/[...slug].astro + index.astro
│   │   ├── tags/[tag].astro + index.astro
│   │   ├── search.astro
│   │   ├── github.astro
│   │   ├── about.astro
│   │   ├── rss.xml.js
│   │   └── 404.astro
│   └── styles/global.css
└── package.json
```

---

## 4. Content model

Three collections, one shared base schema. Create `src/content/config.ts`:

```ts
import { defineCollection, z } from 'astro:content';

const base = {
  title: z.string(),
  description: z.string().max(200),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
};

const cheatsheets = defineCollection({
  type: 'content',
  schema: z.object({
    ...base,
    tool: z.string(),                                   // e.g. "nmap", "bash", "git"
    level: z.enum(['beginner', 'intermediate', 'advanced']).default('beginner'),
  }),
});

const explainers = defineCollection({
  type: 'content',
  schema: z.object({
    ...base,
    readingLevel: z.enum(['intro', 'deep-dive']).default('intro'),
    related: z.array(z.string()).default([]),           // slugs of related docs
  }),
});

const thoughts = defineCollection({
  type: 'content',
  schema: z.object({ ...base }),
});

export const collections = { cheatsheets, explainers, thoughts };
```

**Rules the build must enforce:**
- `draft: true` entries are excluded from every listing, feed, sitemap, and search index in production, but render in `astro dev`.
- Sort every listing by `pubDate` descending.
- Slug comes from the filename. Filenames are kebab-case, no dates in the name.

---

## 5. Pages and behaviour

| Route | Contents |
|---|---|
| `/` | Short intro line, then the 5 most recent items across all three collections, mixed and labelled by type. Links to each section. |
| `/cheatsheets` | All cheat sheets, grouped by `tool`, filterable by tag. |
| `/explainers` | All explainers as cards with description and reading time. |
| `/thoughts` | Reverse-chronological list, title + date + first ~30 words. |
| `/cheatsheets/[slug]` etc. | Article layout (see below). |
| `/tags` | Every tag with a count. |
| `/tags/[tag]` | All items with that tag, across collections, type labelled. |
| `/search` | Pagefind UI, searches all three collections. |
| `/github` | Repo cards + contribution graph (section 7). |
| `/about` | Static MDX page. |
| `/rss.xml` | All non-draft items. |
| `/404` | Custom, with a link back and to search. |

### Article layout (`Doc.astro`)
- Title, description, date (plus "Updated" when `updatedDate` is set), tags, reading time.
- Sticky table of contents on desktop, built from `h2`/`h3` headings; collapses to a details/summary block on mobile.
- Code blocks: syntax highlighting (Shiki), language label, and a copy button. **This is the most-used feature on a cheat sheet page — get it right.**
- Tables must scroll horizontally on mobile rather than overflow the viewport.
- Prev/next links within the same collection.
- "Edit this page on GitHub" link pointing at `https://github.com/<GH_USER>/<REPO>/edit/main/src/content/{collection}/{file}`.

### Design direction
Reference-material first. High-contrast, generous line height, a real monospace stack for code, and a system-respecting dark mode (`prefers-color-scheme`) with a manual toggle persisted in `localStorage`. Cheat sheets should be scannable at a glance — dense, tight vertical rhythm, clear heading hierarchy. Avoid hero images and decorative animation.

---

## 6. GitHub integration

Three separate things, all required.

### 6a. Content lives in the repo
Markdown files under `src/content/` are the single source of truth. Pushing to `main` is publishing. No other store.

### 6b. Auto-deploy on push

`.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:
  schedule:
    - cron: '0 6 * * *'   # daily rebuild to refresh GitHub activity data

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - name: Fetch GitHub activity
        env:
          GH_PAT: ${{ secrets.GH_PAT }}
          GH_USER: <GH_USER>
        run: node scripts/fetch-github.mjs
      - run: npm run build          # build script must run astro build && pagefind
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

`package.json`:
```json
"scripts": {
  "build": "astro build && pagefind --site dist",
  "dev": "astro dev"
}
```

In repo **Settings → Pages**, set Source to **GitHub Actions**.

### 6c. GitHub activity on the site

`scripts/fetch-github.mjs` runs before the build, hits the GitHub API, and writes `src/data/github.json`. Nothing is fetched in the browser.

- **Repos** — REST: `GET https://api.github.com/users/<GH_USER>/repos?sort=updated&per_page=6`. Keep `name`, `description`, `html_url`, `language`, `stargazers_count`, `pushed_at`. Public data, so a token is optional here but use one anyway to avoid rate limits.
- **Contributions** — GraphQL only:

```graphql
query($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks { contributionDays { date contributionCount color } }
      }
    }
  }
}
```

**Important:** the contributions query needs a **classic Personal Access Token with `read:user`** stored as the repo secret `GH_PAT`. The default `GITHUB_TOKEN` cannot read a user's contribution calendar. Never commit the token; never expose it client-side.

The script must fail soft: if the API errors or the token is missing, write an empty/last-known payload and let the build succeed with the activity section hidden. A broken token should not take the blog offline.

Add `src/data/github.json` to `.gitignore`. The daily cron in the workflow keeps the graph fresh without needing a content push.

---

## 7. Browser editing (Pages CMS)

Pages CMS is a hosted editor at `app.pagescms.org` that authenticates with GitHub and commits directly to the repo. Since it commits to `main`, every save triggers the deploy workflow and the site updates in a minute or two. That completes the loop: **edit in browser → commit → rebuild → live**.

Create `.pages.yml` at the repo root:

```yaml
media:
  input: public/images
  output: /images

content:
  - name: cheatsheets
    label: Cheat sheets
    type: collection
    path: src/content/cheatsheets
    filename: '{fields.title}.md'
    view:
      fields: [title, tool, pubDate, draft]
    fields:
      - { name: title, label: Title, type: string, required: true }
      - { name: description, label: Description, type: text, required: true }
      - { name: tool, label: Tool, type: string, required: true }
      - { name: level, label: Level, type: select, options: { values: [beginner, intermediate, advanced] }, default: beginner }
      - { name: pubDate, label: Published, type: date, required: true }
      - { name: updatedDate, label: Updated, type: date }
      - { name: tags, label: Tags, type: string, list: true }
      - { name: draft, label: Draft, type: boolean, default: false }
      - { name: body, label: Body, type: rich-text }

  - name: explainers
    label: Explainers
    type: collection
    path: src/content/explainers
    filename: '{fields.title}.md'
    fields:
      - { name: title, label: Title, type: string, required: true }
      - { name: description, label: Description, type: text, required: true }
      - { name: readingLevel, label: Depth, type: select, options: { values: [intro, deep-dive] }, default: intro }
      - { name: pubDate, label: Published, type: date, required: true }
      - { name: updatedDate, label: Updated, type: date }
      - { name: tags, label: Tags, type: string, list: true }
      - { name: related, label: Related slugs, type: string, list: true }
      - { name: draft, label: Draft, type: boolean, default: false }
      - { name: body, label: Body, type: rich-text }

  - name: thoughts
    label: Thoughts
    type: collection
    path: src/content/thoughts
    filename: '{fields.title}.md'
    fields:
      - { name: title, label: Title, type: string, required: true }
      - { name: description, label: Description, type: text, required: true }
      - { name: pubDate, label: Published, type: date, required: true }
      - { name: tags, label: Tags, type: string, list: true }
      - { name: draft, label: Draft, type: boolean, default: false }
      - { name: body, label: Body, type: rich-text }
```

The CMS field names must stay in sync with `src/content/config.ts`. If they drift, the CMS will write frontmatter that fails schema validation and the build breaks — so change both together, and treat `config.ts` as the authority.

**Fallback that always works:** press `.` on any GitHub repo page to open the full VS Code web editor. Useful for bulk edits or when a file needs to be moved or renamed.

---

## 8. Build phases

Ship each phase working before starting the next.

- **Phase 0 — Skeleton live.** Astro + Tailwind, one hardcoded page, workflow deploying to Pages. Confirm `<SITE_URL>` loads.
- **Phase 1 — Content.** Collections, schemas, layouts, three listing pages, article pages. Add two sample entries per collection.
- **Phase 2 — Navigation.** Tags, tag pages, prev/next, reading time, TOC, code copy buttons, dark mode.
- **Phase 3 — Search.** Pagefind wired into the build and a `/search` page.
- **Phase 4 — CMS.** `.pages.yml`, connect the repo at `app.pagescms.org`, create and publish one post end-to-end from a phone.
- **Phase 5 — GitHub activity.** `GH_PAT` secret, fetch script, `/github` page, daily cron.
- **Phase 6 — Polish.** RSS, sitemap, 404, OG images, Lighthouse pass, optional custom domain via `public/CNAME` + DNS.

---

## 9. Acceptance criteria

- [ ] `<SITE_URL>` serves the site over HTTPS.
- [ ] A push to `main` redeploys automatically, within ~2 minutes.
- [ ] All three collections render listing pages and article pages.
- [ ] A `draft: true` entry appears in `astro dev` and appears nowhere in `dist`.
- [ ] Invalid frontmatter fails the build loudly rather than publishing a broken page.
- [ ] Code blocks are highlighted, labelled, and copyable in one click.
- [ ] Search returns results from all three collections.
- [ ] A post can be written, saved, and published from a phone browser with no terminal.
- [ ] `/github` shows the 6 most recent repos and a contribution graph.
- [ ] A missing or expired `GH_PAT` degrades gracefully — the build still succeeds.
- [ ] No API tokens appear anywhere in `dist`.
- [ ] Lighthouse: performance and accessibility both ≥ 95 on an article page.
- [ ] Mobile: no horizontal overflow, tables scroll within their container.

---

## 10. Conventions

- Filenames kebab-case: `nmap-host-discovery.md`.
- Tags lowercase, hyphenated, reused rather than invented: `networking`, not `Networking` or `network stuff`.
- `description` is mandatory and is what appears in cards, search results, and social previews — write it for a stranger.
- Cheat sheets: command or snippet first, one line of explanation after. No preamble.
- Explainers: lead with what the thing is and why it matters, then the detail.
- Thoughts: no minimum length. Three sentences is a valid post.
- Images go in `public/images/` and are referenced as `/images/name.png`.

---

## 11. Notes for whoever builds this

- Check current Astro and action versions before writing config — pin what's current at build time rather than copying version numbers from this file verbatim.
- Every feature must resolve at build time. GitHub Pages runs no server code, so if a feature needs a request at page load, it belongs to a later version or a different host.
- Prefer fewer dependencies. This site should still build in two years.
