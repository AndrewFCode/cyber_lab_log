---
title: Cache invalidation is a naming problem (AI Example)
description: Why content-addressed keys dissolve most of the difficulty
tags:
  - caching
  - architecture
draft: false
pubDate: 2026-09-08
---
The old joke is that the two hard problems are naming things and cache invalidation. I think
those are one problem.

Invalidation is only hard when the key is a *location* — `user:42`, `/api/posts`. The name says
where the data lives, not what it contains, so every write forces you to hunt down every place
that name has been cached and evict it. You are maintaining a dependency graph by hand.

If the key is a hash of the content, invalidation stops existing as an operation. New content is
a new key. Nothing needs evicting; the old entry just stops being asked for and ages out on its
own. This is why asset hashing works so well and why nobody debugs stale JavaScript bundles
anymore.

The catch is that you have moved the problem rather than removing it: something still has to map
"the current version" to a hash, and that pointer is itself a location-keyed cache. But it is
one small pointer instead of a graph, and one thing being hard beats everything being hard.