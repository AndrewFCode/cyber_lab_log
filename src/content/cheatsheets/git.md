---
title: Git (AI Example)
description: The recovery commands I only need when I am panicking
tags:
  - git
  - cli
  - version-control
draft: false
updated: 2026-09-12
category: git
pinned: true
---
Everything here is about getting *out* of a state, not into one. The everyday commands I
remember; these are the ones I look up every single time.

## Undoing things


| Situation | Command |
| ------------------------------------------------ | ----------------------------- |
| Staged a file by mistake | `git restore --staged <file>` |
| Want to discard local changes to a file | `git restore <file>` |
| Committed too early, want to keep changes staged | `git reset --soft HEAD~1` |
| Committed too early, want to redo from scratch | `git reset --hard HEAD~1` |
| Fix the message of the last commit | `git commit --amend` |
| Undo a commit that is already pushed | `git revert <sha>` |


`reset` rewrites history, `revert` adds a new commit that cancels an old one. Use `revert` for
anything that other people have pulled.

## Finding the commit that broke it

```bash
git log --oneline -- path/to/file   # history of one file
git log -S"functionName" --oneline  # commits that added or removed a string
git bisect start
git bisect bad                      # current commit is broken
git bisect good v1.4.0              # this tag was fine
# test, then mark each step:
git bisect good   # or: git bisect bad
git bisect reset                    # back to where you started
```

`git log -S` is the one I forget exists. It searches the *content* of diffs, so it finds the
commit where a line actually appeared rather than every commit that touched the file.

## Recovering work I thought I lost

```bash
git reflog                # every position HEAD has held, including "lost" commits
git checkout -b rescue <sha>
git stash list
git stash show -p stash@{1}
git fsck --lost-found     # dangling commits and blobs, when reflog is not enough
```

Nothing committed is truly gone until garbage collection runs. `reflog` has saved me more often
than any other command here.

## Branch hygiene

```bash
git switch -c feature/thing         # create and switch
git branch -vv                      # local branches and their upstreams
git fetch --prune                   # drop refs for branches deleted on the remote
git branch --merged main | grep -v main | xargs git branch -d
```

## Rebasing without fear

```bash
git rebase -i HEAD~5    # squash, reword, drop
git rebase --abort      # always available mid-rebase
git rebase --continue
git push --force-with-lease
```

Always `--force-with-lease` rather than `--force`. It refuses the push if someone else has
added commits since your last fetch, which is exactly the mistake plain `--force` lets through.