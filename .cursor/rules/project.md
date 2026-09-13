---
alwaysApply: true
---

- This site deploys to GitHub Pages, which serves static files only.
  Never add server-side code, API routes, SSR, or runtime fetches for
  data that could be resolved at build time.
- The authoritative spec is knowledge-blog-instructions.md. Follow it.
  If something in it is wrong or outdated, say so instead of silently
  doing something different.
- src/content/config.ts is the authority for frontmatter. Any change
  there must be mirrored in .pages.yml in the same commit.
- Never write API tokens into source files. Tokens come from
  environment variables supplied by GitHub Actions secrets.
- Check current package and action versions rather than copying
  version numbers from the spec.
- Explain what a command does before running it.