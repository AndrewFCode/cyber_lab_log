---
title: Draft — do types replace tests
description: Half-formed, kept in draft on purpose to prove drafts stay unpublished
tags: [types, testing]
pubDate: 2026-09-14
draft: true
---

This entry exists as a fixture: it is visible in `pnpm dev` and absent from `pnpm build` output.

The half-formed thought: a type says "this function cannot be called with a string", a test says
"this function returns 4 for this input". People argue about which subsumes the other, but they
answer different questions — types constrain the shape of the space, tests sample points in it.

Where I get stuck is that a sufficiently expressive type system *can* encode the sampled points
too, and at that stage the distinction seems to be about ergonomics rather than kind. Not sure I
believe that yet, which is exactly why this is still a draft.
