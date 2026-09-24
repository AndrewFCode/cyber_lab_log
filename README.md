# Cyber Journey

A personal log of learning cyber security, from “can just about use a computer” toward working in the field. Cheat sheets, class notes, explainers, and the projects behind them live here as Markdown.

**Live site:** https://andrewfcode.github.io/cyber_lab_log/

## Run it locally

Needs Node 22 or newer and [pnpm](https://pnpm.io/) 12.

```bash
pnpm install
pnpm dev
```

Open http://localhost:4321/cyber_lab_log/

`pnpm build` builds the site and the search index. `pnpm preview` serves that build.

Drafts (`draft: true`) show up in `pnpm dev` and are left out of the production build.

## Sections

| Section | Folder | What it is |
|---|---|---|
| Ultimate Cheatsheet | `src/content/cheatsheets/ultimate.md` | One short living sheet. Each topic links to the full chapter. |
| Resource Cheatsheets | `src/content/cheatsheets/` | One file per chapter or lesson, grouped into tabs by book or course. |
| Explainers | `src/content/explainers/` | Longer “how this actually works” pieces. |
| Lesson Notes | `src/content/notes/` | Class notes and shorter thoughts. The URL stays `/notes`. |
| Example Projects | `src/content/projects/` | Book exercises: the code only. |
| Full Picture | `src/content/labs/` | The same exercises with screenshots of what happened. |

Resource tabs, in order: Code (2nd ed.), Help Desk, TryHackMe, A+ Core 1, The Linux Command Line, Learn Windows PowerShell, Networking for Sysadmins. A new `resource` key still appears; add a label for it in `src/lib/collections.ts` (`RESOURCE_ORDER` and `RESOURCE_LABELS`).

## Add a page

Create a `.md` file in the matching folder. The filename becomes the URL slug. Schemas are enforced by `src/content.config.ts` — a bad frontmatter block fails the build.

A resource cheat sheet:

```yaml
---
title: "Networking for Sysadmins 1: Network Layers"
description: "One sentence on what this chapter covers."
tags: ["networking"]
draft: false
updated: "2026-09-22"
kind: "resource"
resource: "networking-sysadmins"
module: "Ch. 1"
moduleOrder: 64
unit: 1
---
```

`unit` is the chapter or section number. One sheet in a unit is served at `/resources/{resource}/{unit}/`. Several sheets in the same unit share a hub at that address, and each sheet is `/resources/{resource}/{unit}/{filename}/`.

There is only one Ultimate sheet (`kind: ultimate`). It lives at `/cheatsheets/`.

A lesson note:

```yaml
---
title: "Networking for Sysadmins 1: Network Layers — Class Notes"
description: "One sentence."
tags: ["class-notes", "networking"]
draft: false
pubDate: 2026-09-22
---
```

Lesson Notes has a **Download for OneNote** button. It saves one zip: a folder for each course tab (Help Desk, TryHackMe, A+ Core 1, and the rest), and one HTML file per note inside that folder. OneNote does not open the zip on its own. Unpack it, then import each folder as its own notebook. On Windows, OneNote Batch Cloud can do that in one step: Import Tree, choose the unpacked folder, and turn on “The first-tier subdirectory is recognized as a notebook.”

An explainer also needs `pubDate`. Optional fields: `updated`, `difficulty` (`beginner`, `intermediate`, or `advanced`).

An example project needs `pubDate`, `why`, and `origin` (`handwritten` or `ai`). An AI project must include the original command in `prompt`. Optional: `status` (`active`, `paused`, `shipped`, `archived`) and `repo`.

A Full Picture page needs `pubDate` and `series` (`powershell` or `linux`). Screenshots go in `public/media/labs/` and are referenced as `/media/labs/your-file.png`.

Links inside Markdown that should survive GitHub Pages need the site prefix, for example `/cyber_lab_log/resources/networking-sysadmins/1/`.

## Publish

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and deploys it to GitHub Pages. The usual path is a branch, a pull request, then merge.

Do not commit `GH_PAT` or any other token. The deploy workflow reads `GH_PAT` from GitHub Actions secrets when it fetches GitHub activity.
