---
title: "The Linux Command Line 8: Advanced Keyboard Tricks — Class Notes"
description: "Full class notes for TLCL ch. 8: readline cursor movement and editing, cut/paste (kill and yank), tab completion, and command history/expansion."
tags: ["class-notes", "linux", "bash", "readline", "command-history", "tab-completion", "kill-and-yank"]
draft: false
pubDate: 2026-09-27
---

> **How these notes were made:** the material supplied for this lesson was the
> chapter's own **heading list** — "Command Line Editing", "Cursor Movement",
> "Modifying Text", "Cutting and Pasting (Killing and Yanking) Text", "Command
> Completion", "Using History", "Searching History", "History Expansion" —
> with an explicit instruction to draft the content from general knowledge
> rather than a transcript. These notes follow that structure, but the
> explanations, keybindings and examples are written from general knowledge of
> **bash's default (emacs-mode) readline behaviour**, **not** reproduced or
> paraphrased from William Shotts's actual book text, which was not supplied.
> Worth checking against your own copy of the chapter for Shotts's specific
> wording and any examples particular to his presentation.


**Class notes · The Linux Command Line (3rd ed.), William Shotts · Chapter 8**

> **Quick reference:** the short version of this lesson lives in the
> [The Linux Command Line resource sheets](/cyber_lab_log/resources/linux/8/). This follows
> Chapter 7 (Seeing the World as the Shell Sees It) — that chapter covered how
> the shell interprets what you type; this one covers **typing it faster**,
> through the line-editing engine bash uses, called **readline**.

## Learning objectives

By the end of these notes you should be able to:

1. Move the cursor around a command line efficiently without arrow keys.
2. Edit and transform text on the command line using keyboard shortcuts.
3. Cut (kill) and paste (yank) text on the command line.
4. Use tab completion for commands, filenames and arguments.
5. Recall, search and reuse previous commands from shell history.
6. Use history expansion to reference and reuse specific past commands.

## 1. Command line editing and readline

Bash does not simply collect raw keystrokes — it uses a library called
**readline** to provide proper **line editing**: moving the cursor, deleting
and rearranging text, and recalling history, all without leaving the
keyboard. By default, readline uses **emacs-style** keybindings (an
alternative **vi-style** mode also exists, but emacs-style is the default and
what this chapter covers).

Most of these shortcuts use **Control** (written `Ctrl-x`) or **Alt/Meta**
(written `Alt-x`) held with another key.

## 2. Cursor movement

| Keys | Moves |
| --- | --- |
| `Ctrl-A` | To the **beginning** of the line |
| `Ctrl-E` | To the **end** of the line |
| `Ctrl-F` (or Right Arrow) | Forward one **character** |
| `Ctrl-B` (or Left Arrow) | Backward one **character** |
| `Alt-F` | Forward one **word** |
| `Alt-B` | Backward one **word** |
| `Ctrl-L` | Clears the screen (cursor stays at the current line) |

> **Exam tip:** `Ctrl-A` / `Ctrl-E` (start/end of line) are worth memorising
> first — they are by far the most useful pair for quickly jumping to either
> end of a long command you are editing.

## 3. Modifying text

| Keys | Effect |
| --- | --- |
| `Ctrl-D` (or Delete) | Delete the character **under/after** the cursor |
| `Backspace` | Delete the character **before** the cursor |
| `Ctrl-T` | **Transpose** (swap) the two characters around the cursor |
| `Alt-T` | Transpose the two **words** before the cursor |
| `Alt-L` | Convert the word from the cursor onward to **lowercase** |
| `Alt-U` | Convert the word from the cursor onward to **uppercase** |
| `Alt-C` | **Capitalise** the word from the cursor onward |

```
Example of Ctrl-T (transpose characters):

  before:  ls -la /hmoe/user     (cursor just after 'o' in "hmoe")
  Ctrl-T:  ls -la /home/user     (the two characters around the
                                   cursor have swapped)
```

## 4. Cutting and pasting (killing and yanking)

Readline calls cutting text **killing**, and pasting it back **yanking** —
older terminology than "cut and paste," but functionally the same idea. Killed
text goes into a small internal buffer (the **kill ring**) that you can yank
back later.

| Keys | Effect |
| --- | --- |
| `Ctrl-K` | **Kill** from the cursor to the **end** of the line |
| `Ctrl-U` | **Kill** from the cursor to the **beginning** of the line |
| `Ctrl-W` | **Kill** the word **before** the cursor |
| `Alt-D` | **Kill** the word **after/under** the cursor |
| `Ctrl-Y` | **Yank** (paste) the most recently killed text at the cursor |

```
Kill and yank in practice:

  ls -la /var/log/syslog     (cursor at the end of the line)
  Ctrl-U                     -> kills the whole line to the buffer
  (empty line)
  cd /tmp
  Ctrl-Y                     -> yanks "ls -la /var/log/syslog" back,
                                 inserted wherever the cursor now is
```

> **In the real world:** `Ctrl-U` followed later by `Ctrl-Y` is a quick way to
> "park" a half-typed command, run something else, then bring the original
> command back exactly as it was.

## 5. Command completion

Pressing **Tab** triggers **completion**: bash tries to fill in the rest of
whatever you are typing — a command name, a filename, a variable, and more,
depending on context.

- **Single unambiguous match:** pressing Tab completes it immediately.
- **Multiple possible matches:** pressing Tab **once** completes as far as the
  matches agree; pressing Tab **again** lists all the possibilities.

```bash
$ cd /etc/net<Tab>
$ cd /etc/network/
```

```bash
$ ls doc<Tab><Tab>
document.txt  documentation/  docs.pdf
```

> **Exam tip:** completion is context-aware — at the start of a line it
> completes **command names**; after a command, it typically completes
> **filenames** or, for some commands, other relevant arguments.

## 6. Using history

Bash keeps a running **history** of commands you have typed, letting you
recall and reuse them without retyping.

| Keys | Effect |
| --- | --- |
| `Ctrl-P` (or Up Arrow) | Recall the **previous** command |
| `Ctrl-N` (or Down Arrow) | Move to the **next** (more recent) command |

The `history` command lists your stored command history with line numbers:

```bash
$ history
  501  cd /var/log
  502  ls -la
  503  tail -f syslog
```

### 6.1 Searching history

Rather than stepping backward one command at a time, you can **search**
history directly:

- **`Ctrl-R`** starts an **incremental reverse search** — type a few
  characters, and bash finds the most recent matching command as you type.
  Press `Ctrl-R` again to step to the **next** (older) match.
- Press **Enter** to run the found command, or an arrow key to edit it first
  without running it immediately.
- Press **`Ctrl-G`** (or `Ctrl-C`) to cancel the search and return to an empty
  prompt.

```
Ctrl-R search:

  (reverse-i-search)`tail': tail -f /var/log/syslog
  -- typing more of "tail" narrows the match further;
     Ctrl-R again steps to an older matching command;
     Enter runs it, Ctrl-G cancels
```

### 6.2 History expansion

**History expansion** lets you reference and reuse previous commands directly
by typing a short expression, without searching interactively:

| Expression | Expands to |
| --- | --- |
| `!!` | The **previous** command |
| `!n` | The command at **history line number** `n` |
| `!string` | The most recent command **starting with** `string` |
| `!?string?` | The most recent command **containing** `string` anywhere |
| `!$` | The **last argument** of the previous command |
| `!*` | **All arguments** of the previous command |
| `^old^new` | Re-runs the previous command with `old` replaced by `new` |

### 6.3 Worked example — using history expansion

You just ran a long command and want to reuse parts of it without retyping.

```bash
$ ls -la /var/log/nginx
... output ...

$ cd !$
cd /var/log/nginx
```

`!$` pulled the **last argument** (`/var/log/nginx`) from the previous
command straight into the new one.

```bash
$ grep ERROR /var/log/nginx/error.log
... output ...

$ !!
grep ERROR /var/log/nginx/error.log
... reruns the exact same command ...
```

```bash
$ cat /etc/hosts
... output ...

$ ^hosts^hostname
cat /etc/hostname
```

`^hosts^hostname` took the previous command and substituted the **first**
occurrence of `hosts` with `hostname`, then ran the result.

## 7. Security perspective

Command-line editing and history features are convenience tools, but they
carry real, everyday implications for anyone working at a shell:

- **Shell history is a plaintext record of what you typed.** Any command run
  with a **secret on the command line** — a password passed as an argument, an
  API key, a connection string — is saved into your history file (commonly
  `~/.bash_history`) in the clear, and stays there until it is explicitly
  cleared. Anyone with read access to that file, or to a backup of your home
  directory, can read it later.
- **Ctrl-R search makes stale secrets easy to accidentally resurface.**
  Searching history for a common word can surface an old command containing a
  credential, which is then sitting on your terminal screen (and possibly in
  your terminal's own scrollback buffer or screen-recording software) even if
  you cancel before running it.
- **A leading space can keep a single command out of history.** Many shells,
  bash included, can be configured (via `HISTCONTROL=ignorespace` or similar)
  to skip recording a command that starts with a **space** — a genuinely
  useful habit for a one-off command that must include a secret, though it
  depends on that shell option already being enabled.
- **`history -c` clears the in-memory history for the current session**, but
  does not by itself guarantee the **on-disk** history file is scrubbed of
  everything already written — clearing history after the fact is a much
  weaker control than simply never typing a secret as a plain argument in the
  first place.
- **Tab completion can leak what exists, not just help you type.** Completing
  filenames in a directory you are exploring will happily show you file and
  directory names you may not otherwise have known were there — useful for
  legitimate exploration, and just as useful for an attacker doing local
  reconnaissance on a system they have shell access to.

## Summary

- Bash uses **readline** (default **emacs-mode**) for command-line editing —
  cursor movement, text editing, and history, all from the keyboard.
- **Cursor movement:** `Ctrl-A`/`Ctrl-E` (start/end of line), `Ctrl-F`/`Ctrl-B`
  (character), `Alt-F`/`Alt-B` (word), `Ctrl-L` (clear screen).
- **Modifying text:** `Ctrl-D`/Backspace (delete), `Ctrl-T`/`Alt-T`
  (transpose char/word), `Alt-L`/`Alt-U`/`Alt-C` (lower/upper/capitalise).
- **Kill and yank:** `Ctrl-K`/`Ctrl-U` (kill to end/start of line), `Ctrl-W`/
  `Alt-D` (kill word back/forward), `Ctrl-Y` (yank/paste).
- **Tab completion:** completes commands, filenames and more; press twice to
  list ambiguous matches.
- **History navigation:** `Ctrl-P`/`Ctrl-N` (or arrow keys) step through
  history; `history` lists it with line numbers.
- **Searching history:** `Ctrl-R` for incremental reverse search, repeatable
  to step to older matches; `Ctrl-G` cancels.
- **History expansion:** `!!` (last command), `!n` (line number), `!string`
  (starts with), `!?string?` (contains), `!$` (last argument), `!*` (all
  arguments), `^old^new` (quick substitution and rerun).

## Glossary

| Term | Meaning |
| --- | --- |
| Readline | The library bash uses for command-line editing. |
| Emacs mode | Readline's default keybinding style. |
| Kill | Readline's term for cutting text into its buffer. |
| Yank | Readline's term for pasting killed text back. |
| Kill ring | The buffer holding recently killed text. |
| Tab completion | Auto-completing commands/filenames on Tab. |
| History | The shell's stored record of previous commands. |
| Incremental search | Live-matching history as you type (Ctrl-R). |
| History expansion | Shorthand (`!!`, `!$`, etc.) to reuse past commands. |
| HISTCONTROL | A shell variable controlling what's saved to history (beyond this lesson). |

## Review questions

1. What is readline, and what default keybinding style does bash use?
2. Give the keystrokes for moving to the start and end of the line.
3. What does Ctrl-T do, and give an example of when it's useful.
4. What is the difference between kill and yank in readline terminology?
5. Give the keystroke to kill from the cursor to the end of the line, and to
   yank text back.
6. What happens if you press Tab once versus twice when multiple completions
   are possible?
7. What does Ctrl-R do, and how do you move to an older match?
8. What does !! expand to? What about !$?
9. What does !?string? do differently from !string?
10. What does ^old^new do?
11. Why is a command-line password a security risk beyond just being visible
    on screen when typed?
12. Scenario: you type a long command, realise you need to run something else
    first, and don't want to lose what you typed. Which two keystrokes let you
    "park" and later restore it?
13. Scenario: your previous command was `tar -czf backup.tar.gz /home/user`.
    Using history expansion, how would you quickly `ls` the same directory?
14. Scenario: why might clearing your in-session history with `history -c`
    give a false sense of security?

## Answer key

1. **Readline is bash's line-editing library; the default style is
   emacs-mode.** Library plus default mode.
2. **Ctrl-A (start), Ctrl-E (end).** The two most-used movement shortcuts.
3. **It transposes (swaps) the two characters around the cursor — useful for
   quickly fixing a typo like a swapped pair of letters.** Character-level fix.
4. **Kill cuts text into a buffer (the kill ring); yank pastes that buffer's
   contents back.** Cut vs paste, in readline's own terms.
5. **Ctrl-K kills to the end of the line; Ctrl-Y yanks the most recently
   killed text back.** One pair for line-end cut/paste.
6. **Once completes as far as the matches agree; twice lists every possible
   match.** Progressive disambiguation.
7. **It starts an incremental reverse search through history; pressing Ctrl-R
   again moves to the next (older) match.** Live search, repeatable.
8. **!! expands to the previous command; !$ expands to the last argument of
   the previous command.** Whole command vs one argument.
9. **!string matches a command starting with that string; !?string? matches a
   command containing it anywhere.** Prefix match vs substring match.
10. **It reruns the previous command with the first occurrence of "old"
    replaced by "new".** Quick substitution and rerun.
11. **It is saved into the shell's history file in plain text, readable later
    by anyone with access to that file, not just visible at the moment of
    typing.** Persistent exposure, not just momentary.
12. **Ctrl-U to kill (park) the line, then Ctrl-Y later to yank it back.**
    Kill now, yank later.
13. **`ls !$` — !$ pulls /home/user, the last argument of the previous
    command.** Reuse the last argument directly.
14. **It clears the in-memory session history, but doesn't guarantee the
    on-disk history file has already-written entries scrubbed — a secret
    already typed may still be recorded there.** Session clear ≠ on-disk clean.
