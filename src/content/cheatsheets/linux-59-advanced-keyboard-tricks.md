---
title: "The Linux Command Line 8: Advanced Keyboard Tricks"
description: "TLCL ch. 8 — readline cursor movement/editing, kill and yank, tab completion, and command history/expansion."
tags: ["linux", "bash", "shell", "command-line", "readline", "command-history", "tab-completion", "kill-and-yank"]
draft: false
updated: "2026-09-27"
kind: "resource"
resource: "linux"
module: "Ch. 8"
moduleOrder: 59
unit: 8
---

> **Drafted from general knowledge:** the source was the chapter's heading list with an instruction to draft from general knowledge, not a transcript — verify against your own copy of Shotts's book for his specific wording/examples.


> **In one line:** bash's readline (default emacs-mode) gives you cursor movement, text editing, kill/yank cut-and-paste, tab completion, and command history with search and expansion shortcuts — all without touching the mouse.

*Companion to: The Linux Command Line (3rd ed.), William Shotts, Chapter 8.* The full version is the Advanced Keyboard Tricks class notes; the chapter overview is The Linux Command Line resource sheet.

## Cursor movement

| Keys | Moves |
| --- | --- |
| `Ctrl-A` | Start of line |
| `Ctrl-E` | End of line |
| `Ctrl-F` / → | Forward one character |
| `Ctrl-B` / ← | Backward one character |
| `Alt-F` | Forward one word |
| `Alt-B` | Backward one word |
| `Ctrl-L` | Clear screen |

## Modifying text

| Keys | Effect |
| --- | --- |
| `Ctrl-D` / Delete | Delete char forward |
| Backspace | Delete char backward |
| `Ctrl-T` | Transpose two chars |
| `Alt-T` | Transpose two words |
| `Alt-L` / `Alt-U` / `Alt-C` | Lowercase / uppercase / capitalise word |

## Kill and yank (cut and paste)

| Keys | Effect |
| --- | --- |
| `Ctrl-K` | Kill to end of line |
| `Ctrl-U` | Kill to start of line |
| `Ctrl-W` | Kill word before cursor |
| `Alt-D` | Kill word after cursor |
| `Ctrl-Y` | Yank (paste) last killed text |

## Tab completion

- Tab **once**: completes as far as matches agree.
- Tab **twice**: lists all possible matches.

## History

| Keys | Effect |
| --- | --- |
| `Ctrl-P` / ↑ | Previous command |
| `Ctrl-N` / ↓ | Next command |
| `Ctrl-R` | Incremental reverse search (again = older match, Enter runs, `Ctrl-G` cancels) |

`history` lists stored commands with line numbers.

## History expansion

| Expression | Expands to |
| --- | --- |
| `!!` | Previous command |
| `!n` | Command at history line `n` |
| `!string` | Most recent command **starting with** string |
| `!?string?` | Most recent command **containing** string |
| `!$` | Last argument of previous command |
| `!*` | All arguments of previous command |
| `^old^new` | Rerun previous command, `old` → `new` |

## 🔐 Security notes

- **History is a plaintext record** — a command run with a password/API key as an argument sits in `~/.bash_history` readable later.
- **Ctrl-R can accidentally resurface old secrets** onto your screen/scrollback while searching.
- **A leading space can skip history** (with `HISTCONTROL=ignorespace` set) — useful for a one-off sensitive command.
- **`history -c` clears the session, not necessarily the on-disk file** — don't rely on it as cleanup after the fact.
- **Tab completion reveals filenames** — useful for you, and for anyone doing local recon on a shell they've gained access to.

## Practice drills

<details>
<summary>1. Keystrokes for start and end of line?</summary>

Ctrl-A (start), Ctrl-E (end).
</details>

<details>
<summary>2. What does Ctrl-T do?</summary>

Transposes (swaps) the two characters around the cursor.
</details>

<details>
<summary>3. Kill vs yank?</summary>

Kill cuts text into a buffer; yank pastes that buffer's contents back.
</details>

<details>
<summary>4. Tab once vs Tab twice with multiple matches?</summary>

Once completes as far as the matches agree; twice lists every possible match.
</details>

<details>
<summary>5. What does Ctrl-R do?</summary>

Starts an incremental reverse search through history; pressing it again moves to an older match.
</details>

<details>
<summary>6. !! vs !$?</summary>

!! is the previous command in full; !$ is just its last argument.
</details>

<details>
<summary>7. What does ^old^new do?</summary>

Reruns the previous command with the first occurrence of "old" replaced by "new".
</details>

## Key takeaways

- **Ctrl-A/Ctrl-E** for line start/end; **Ctrl-T** to fix a swapped-character typo.
- **Kill (Ctrl-K/U/W) then yank (Ctrl-Y)** = readline's cut-and-paste.
- **Tab, Tab-Tab** for completion and listing matches.
- **Ctrl-R** searches history live; **!!**, **!$**, **^old^new** reuse past commands by expression.
- **Security:** never trust history to keep secrets out of sight — plaintext, persistent, and searchable.
