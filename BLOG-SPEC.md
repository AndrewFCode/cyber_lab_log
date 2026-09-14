# Personal Knowledge Blog — Build Spec & Setup Guide

A static site for **cheat sheets**, **explainers**, **thoughts**, and **chapter-by-chapter book notes written in my own words**. Content lives as Markdown in a GitHub repo; every push auto-deploys.

**How to use this file:** Part 1 is the build spec — hand it to Claude Code (or any coding agent) and say "build this". Part 2 is the setup you run yourself. Part 3 is the day-to-day writing workflow.

---

## Part 1 — Build Spec

### 1. Goal

A fast, minimal, searchable site where the author can dump technical reference material and half-formed ideas without friction. Writing a post = adding a `.md` file to a folder and pushing.

Non-goals: comments, user accounts, a database, a WYSIWYG editor, newsletter signup (phase 2 at the earliest).

### 2. Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Astro 7** (Node 22+ required) | Content-first, ships zero JS by default, Markdown/MDX is a first-class citizen, best-in-class for this exact use case |
| Content | Markdown + MDX via **Content Collections** (Content Layer API) | Typed frontmatter, schema validation at build time, fails the build on a bad post |
| Styling | **Tailwind CSS 4** + `@tailwindcss/typography` | Fast iteration, prose styles for long-form content out of the box |
| Search | **Pagefind** | Static, index built at build time, no service, no API key, works offline |
| Hosting | **GitHub Pages**, built and deployed by GitHub Actions | Free, no third-party account, lives in the same repo as the content. Static-only, which this site is anyway |
| Source of truth | **GitHub repo** | Content + code in one place, full history, editable from anywhere |

Package manager: `pnpm`. Language: TypeScript, strict.

**Two GitHub Pages constraints the build must respect:**

1. **Name the repo `<username>.github.io`.** Any other name serves the site from a subpath (`/knowledge-blog/`), which forces an Astro `base` value and means *every* internal link, asset path and script URL has to be prefixed. It is a permanent source of subtle 404s — broken OG images, a Pagefind index that won't load, a sitemap full of wrong URLs. Avoid it entirely by naming the repo correctly up front. If a subpath is unavoidable, set `base` in `astro.config.mjs` and build every internal link with `import.meta.env.BASE_URL` rather than hardcoding `/`.
2. **Everything must be prerendered.** No SSR, no adapters, no server islands, no API routes. Nothing in this spec needs them — OG images generate at build time, search is a static index — but don't let an agent reach for on-demand rendering.

The site is served over plain static hosting, so there is no control over redirects or response headers. Trailing-slash behaviour should be set explicitly in `astro.config.mjs` (`trailingSlash: 'ignore'`) to avoid link inconsistencies.

### 3. Content model

Three collections, each a folder of Markdown files:

| Collection | Folder | URL | Purpose |
|---|---|---|---|
| `cheatsheets` | `src/content/cheatsheets/` | `/cheatsheets/[slug]` | Dense reference — commands, syntax, tables. Living documents, updated often. |
| `explainers` | `src/content/explainers/` | `/explainers/[slug]` | Long-form "how X works" pieces. Written once, dated. |
| `notes` | `src/content/notes/` | `/notes/[slug]` | Short thoughts, opinions, work-in-progress. Low ceremony. |
| `books` | `src/content/books/` | `/books/[book]` | One file per book. Metadata, reading status, and overall takeaways. |
| `chapters` | `src/content/chapters/[book]/` | `/books/[book]/[chapter]` | One page per chapter — the author's own retelling of what happens in it. |

**Books and chapters are two collections joined by a reference**, not one nested collection. A book file is the hub page; chapter files live in a folder named after the book slug and point back at it via frontmatter. This keeps book metadata in one place instead of repeated in every chapter, and lets a book page render progress, a chapter list and prev/next navigation from typed data.

The point of the books section is the *explaining* — writing a chapter down in plain language is the test of whether it was understood. The schema is built around that: each chapter records how confident the retelling felt and what's still unclear, so weak spots are visible rather than buried.

### 4. Repo structure

```
.
├── .github/
│   └── workflows/
│       └── deploy.yml         # builds and deploys to GitHub Pages
├── src/
│   ├── content/
│   │   ├── cheatsheets/       # *.md / *.mdx
│   │   ├── explainers/
│   │   ├── notes/
│   │   ├── books/             # one file per book: atomic-habits.md
│   │   └── chapters/
│   │       └── atomic-habits/ # 01-the-surprising-power.md, 02-...
│   ├── content.config.ts      # collection schemas
│   ├── components/
│   │   ├── BaseHead.astro     # meta, OG, canonical
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── PostCard.astro
│   │   ├── BookCard.astro
│   │   ├── ChapterList.astro
│   │   ├── ReadingProgress.astro
│   │   ├── TableOfContents.astro
│   │   ├── TagList.astro
│   │   └── Search.astro       # Pagefind UI
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── ContentLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── cheatsheets/[...slug].astro
│   │   ├── cheatsheets/index.astro
│   │   ├── explainers/[...slug].astro
│   │   ├── explainers/index.astro
│   │   ├── notes/[...slug].astro
│   │   ├── notes/index.astro
│   │   ├── books/index.astro            # the shelf
│   │   ├── books/[book]/index.astro     # book hub page
│   │   ├── books/[book]/[chapter].astro # a single chapter
│   │   ├── tags/[tag].astro
│   │   ├── tags/index.astro
│   │   ├── search.astro
│   │   ├── about.astro
│   │   ├── 404.astro
│   │   └── rss.xml.ts
│   └── styles/global.css
├── public/
│   └── CNAME                  # only if using a custom domain
├── astro.config.mjs
├── pnpm-lock.yaml             # must be committed — the action reads it
├── CONTENT.md                 # agent must generate: how to add a post
└── package.json
```

### 5. Frontmatter schemas

Create `src/content.config.ts` exactly along these lines:

```ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const base = {
  title: z.string(),
  description: z.string().optional(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
};

const cheatsheets = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/cheatsheets' }),
  schema: z.object({
    ...base,
    updated: z.coerce.date(),
    category: z.string().optional(),   // e.g. "git", "sql", "ffmpeg"
    pinned: z.boolean().default(false),
  }),
});

const explainers = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/explainers' }),
  schema: z.object({
    ...base,
    pubDate: z.coerce.date(),
    updated: z.coerce.date().optional(),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  }),
});

const notes = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/notes' }),
  schema: z.object({
    ...base,
    pubDate: z.coerce.date(),
  }),
});

const books = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/books' }),
  schema: z.object({
    ...base,                                    // title = the book's title
    author: z.string(),
    status: z.enum(['reading', 'paused', 'finished', 'abandoned']).default('reading'),
    started: z.coerce.date(),
    finished: z.coerce.date().optional(),
    totalChapters: z.number().optional(),       // drives the progress bar
    cover: z.string().optional(),               // path under /public
    rating: z.number().min(1).max(5).optional(),
    fiction: z.boolean().default(false),
  }),
});

const chapters = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/chapters' }),
  schema: z.object({
    book: reference('books'),                   // must match a filename in books/
    number: z.number(),
    title: z.string(),                          // my title for the retelling
    chapterTitle: z.string().optional(),        // the book's own chapter title
    written: z.coerce.date(),
    confidence: z.enum(['solid', 'shaky', 'lost']).default('solid'),
    questions: z.array(z.string()).default([]), // what I still don't get
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { cheatsheets, explainers, notes, books, chapters };
```

`reference` comes from `astro:content` — update the import to `import { defineCollection, reference, z } from 'astro:content';`.

Rules:
- `draft: true` excludes the entry from all listings, the RSS feed, the sitemap and the search index in production, but it still renders in `pnpm dev`.
- Slug comes from the filename. Filenames are lowercase-kebab-case.
- Chapter filenames carry a zero-padded number prefix for ordering on disk (`03-the-plateau.md`). **Strip the prefix when building the URL** — `/books/atomic-habits/the-plateau`. Ordering on the page uses the `number` field, not the filename.
- A chapter whose `book` reference doesn't resolve must fail the build. This is the main thing that will go wrong in practice, so the error must name both the chapter file and the missing book id.
- Missing or malformed frontmatter must **fail the build**, not silently pass.

### 6. Pages and behaviour

- **Home** — short intro line, then the 5 most recent items across cheat sheets, explainers and notes, mixed and sorted by date, each labelled with its type. Below that, a "currently reading" strip showing books with `status: reading` and their progress. Links to each section index.
- **Books shelf** (`/books`) — all books grouped by status, `reading` first. Each shows cover (or a typographic fallback), title, author, and "12 of 20 chapters written".
- **Book page** (`/books/[book]`) — metadata, progress bar, the body of the book file as overall takeaways, then the full chapter list. Chapters not yet written appear greyed out and unlinked when `totalChapters` is set, so the gaps are obvious. Any chapter marked `shaky` or `lost` is flagged in the list.
- **Chapter page** (`/books/[book]/[chapter]`) — breadcrumb back to the book, chapter number and both titles, the retelling, then an "open questions" block rendered from `questions` if non-empty, and prev/next chapter navigation.
- **Section indexes** — all entries in that collection. Cheat sheets sort pinned first, then by `updated` descending, and group by `category` if present. Explainers and notes sort by `pubDate` descending.
- **Entry pages** — title, dates, tag list, reading time, then the content. Explainers and any entry with 3+ headings get a sticky table of contents on desktop (collapsible `<details>` on mobile). Show "Updated {date}" when `updated` differs from `pubDate`.
- **Tags** — `/tags` lists every tag with a count; `/tags/[tag]` lists matching entries from all collections, chapters included.
- **Search** — `/search` with Pagefind UI, plus a `⌘K` / `Ctrl+K` modal available site-wide. Filterable by collection. Chapter pages are indexed and show their book title in the result.
- **404** — links back to the section indexes and search.

**Feed rule:** individual chapters do *not* appear on the home page or in the RSS feed — twenty chapter notes in a week would drown everything else. Books do, once when added and again when `status` becomes `finished`. Chapters remain fully indexed in search and tags.

### 7. Required features

- **Code blocks**: Shiki syntax highlighting, a copy button on every block, filename display when the fence has a `title` attribute, and line highlighting support. Cheat sheets are mostly code — this has to feel good.
- **SEO**: per-page `<title>` and meta description, canonical URLs, Open Graph and Twitter card tags, `@astrojs/sitemap`, JSON-LD `Article` schema on entry pages, RSS feed at `/rss.xml` covering all three collections.
- **OG images**: generate one per entry at build time (title + collection label on a plain branded background). Use `satori` + `sharp` or an equivalent; do not call an external service.
- **Dark mode**: system preference by default, manual toggle, choice persisted, no flash of wrong theme on load.
- **Performance budget**: Lighthouse 95+ on all four categories; no client-side JS on a content page except the theme toggle, the copy buttons and the search modal.
- **Accessibility**: semantic landmarks, visible focus states, skip-to-content link, keyboard-navigable search.

### 8. Design direction

Reference-material aesthetic, not a lifestyle blog. One accent colour, everything else greyscale. Generous line height, max content width around 70ch for prose but allow cheat-sheet tables to break out wider. System font stack for UI, a proper mono for code (JetBrains Mono or Geist Mono, self-hosted via `@fontsource`). No hero images, no card shadows, no animation beyond a fast fade on the theme toggle.

### 9. Build order

1. Scaffold Astro + TypeScript + Tailwind 4 + MDX. Verify `pnpm dev` runs.
2. `content.config.ts` with all three collections, plus two sample entries per collection covering every frontmatter field.
3. `BaseLayout`, `BaseHead`, header, footer, global styles, dark mode.
4. Entry pages and section indexes.
5. Books: shelf, book hub page, chapter pages, progress, prev/next. Seed with one book and three chapters.
6. Home page and tag pages.
7. Code block enhancements, table of contents, reading time.
8. Pagefind search + `⌘K` modal.
9. RSS, sitemap, OG image generation, JSON-LD.
10. `404`, `about`.
11. Write `CONTENT.md` documenting how to add each type of post, with a copy-paste frontmatter template for each — including how to start a new book.

### 10. Acceptance criteria

- [ ] `pnpm build` succeeds and `pnpm preview` serves the site
- [ ] Adding a `.md` file with valid frontmatter makes a new page appear with no other changes
- [ ] Invalid frontmatter fails the build with a readable error naming the file
- [ ] Draft entries are absent from every listing, the RSS feed and search in a production build
- [ ] Search returns results for text inside the body of an entry, not just the title
- [ ] Adding a chapter file to an existing book folder makes it appear on the book page and in prev/next with no other changes
- [ ] A chapter pointing at a non-existent book fails the build with an error naming both files
- [ ] Chapters are absent from the home page and RSS but present in search and tag pages
- [ ] A book with `totalChapters: 20` and 3 chapters written shows 3/20 and greys out the rest
- [ ] Dark mode survives a hard refresh with no flash
- [ ] Lighthouse 95+ on an explainer page
- [ ] `CONTENT.md` exists and its templates paste in and build cleanly

---

## Part 2 — Setup

Run these once.

**1. Prerequisites** — Node 22+ (`node -v`), `pnpm` (`npm i -g pnpm`), a GitHub account, a Vercel account (sign in with GitHub).

**2. Create the repo** — on GitHub, create a **public** repo named exactly `USERNAME.github.io` (see the constraint in §2), no README.

Two things to know before choosing: GitHub Pages on a **private** repo requires a paid GitHub plan (Pro or above), and even on a paid plan the published site is public unless you're on Enterprise. A public repo also means the raw Markdown — including anything half-finished sitting on `main` — is readable by anyone. Use `draft: true` for anything not ready, and keep genuinely private notes out of the repo.

```bash
mkdir USERNAME.github.io && cd USERNAME.github.io
git init
git remote add origin git@github.com:USERNAME/USERNAME.github.io.git
```

**3. Build it** — open the folder in Claude Code and give it Part 1 of this file. Then:

```bash
pnpm install
pnpm dev          # http://localhost:4321
```

**4. Set the site URL** — in `astro.config.mjs`:

```js
export default defineConfig({
  site: 'https://USERNAME.github.io',
  trailingSlash: 'ignore',
  // no `base` needed with a USERNAME.github.io repo
});
```

**5. Add the deploy workflow** — create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v7
      - name: Install, build, and upload your site
        uses: withastro/action@v6
        # with:
          # package-manager: pnpm@latest   # auto-detected from the lockfile
          # node-version: 24              # defaults to 24

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v5
```

The action detects the package manager from the lockfile, so `pnpm-lock.yaml` must be committed — don't let it end up in `.gitignore`.

**6. First push**

```bash
git add -A
git commit -m "Initial build"
git branch -M main
git push -u origin main
```

**7. Turn Pages on** — repo → Settings → Pages → under **Source**, select **GitHub Actions**. Not "Deploy from a branch" — that's the old method and will serve the raw repo instead of the built site. The workflow has to be on the default branch to run. Watch the first run in the Actions tab; the site lands at `https://USERNAME.github.io`.

**8. Custom domain (optional)** — add a `public/CNAME` file containing just the domain (`blog.example.com`, no protocol, no trailing slash), point the DNS at GitHub per their docs, then add the domain under Settings → Pages and tick **Enforce HTTPS**. Update `site` in `astro.config.mjs` to the custom domain, or the sitemap, RSS and canonical URLs will all still point at `github.io`.

**9. Working on branches** — GitHub Pages has **no preview deploys**; only `main` publishes. For a risky rewrite, branch, check it locally with `pnpm build && pnpm preview`, then merge. That's the main thing given up by choosing Pages over Vercel.

---

## Part 3 — Writing workflow

**From your machine:**

```bash
# new cheat sheet
touch src/content/cheatsheets/ffmpeg.md
# write it, then:
git add -A && git commit -m "Add ffmpeg cheat sheet" && git push
```

Live in a minute or two — the Actions tab shows the build, and a red cross there means a schema error, not a broken site. The previous deploy stays up until a build succeeds.

**From anywhere without your machine:** GitHub's web editor. Press `.` on the repo page to open a full VS Code instance in the browser, add the file, commit. Works on a tablet. On a phone, the GitHub app's file editor is enough for a quick note.

**Templates** (also in `CONTENT.md` once built):

```yaml
---
title: FFmpeg
description: Commands I always forget
tags: [ffmpeg, video, cli]
updated: 2026-09-13
category: media
pinned: false
---
```

```yaml
---
title: How OAuth actually works
description: The authorisation code flow, step by step
tags: [auth, web]
pubDate: 2026-09-13
difficulty: intermediate
---
```

```yaml
---
title: On writing things down
tags: [meta]
pubDate: 2026-09-13
---
```

**Starting a new book** — create `src/content/books/atomic-habits.md`:

```yaml
---
title: Atomic Habits
author: James Clear
description: Small changes, compounding
tags: [habits, psychology]
status: reading
started: 2026-09-13
totalChapters: 20
fiction: false
---
```

Then create the folder `src/content/chapters/atomic-habits/` and add a file per chapter as you go:

```yaml
---
book: atomic-habits          # must match the book filename
number: 3
title: Why tiny changes feel like nothing until they don't
chapterTitle: The Surprising Power of Atomic Habits
written: 2026-09-14
confidence: shaky
questions:
  - Is the 1% compounding figure literal or just a metaphor?
tags: [habits]
---
```

Write the body as if explaining it to someone who hasn't read the book. If a part can't be explained without quoting, that's the part that wasn't understood — set `confidence: shaky` and put the gap in `questions` rather than papering over it.

---

## Later, if wanted

- **Decap CMS** at `/admin` — a git-backed editor UI that commits to the repo. Note that on GitHub Pages it needs an external OAuth backend (a small worker on Cloudflare or Netlify) since there's no server to handle the GitHub auth handshake. **Keystatic** is the easier fit here — it runs in local mode during `pnpm dev` and commits through the GitHub API in the browser.
- **Giscus** comments, backed by GitHub Discussions.
- **Series support** — a `series` field plus prev/next navigation on explainers.
- **Backlinks** — parse `[[wiki links]]` between entries and render a "linked from" section.
