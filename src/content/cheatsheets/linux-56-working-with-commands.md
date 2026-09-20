---
title: "Linux: Working with Commands"
description: "The Linux Command Line ch. 5 — the four kinds of command, type and which, help, man, apropos, whatis and info, and making your own aliases."
tags: ["linux", "bash", "the-linux-command-line"]
draft: false
updated: "2026-09-18"
kind: "resource"
resource: "linux"
module: "Ch. 5"
moduleOrder: 56
unit: 5
---
> **In one line:** every command is one of four things — find out which with `type`, then read its docs with `help`, `--help` or `man`.

*Companion to: William Shotts, The Linux Command Line, chapter 5.*

---

## The four kinds of command

| Kind | What it is | Example |
|---|---|---|
| Executable program | A compiled binary or script on disk (e.g. in `/usr/bin`) | `cp`, `ls`, `python3` |
| Shell builtin | Built into bash itself | `cd`, `echo`, `type` |
| Shell function | A small script loaded into the shell | Often defined in `~/.bashrc` |
| Alias | A nickname you define | `ll`, `la` on many distros |

---

## Identifying a command

| Command | Tells you |
|---|---|
| `type ls` | What kind it is — e.g. `ls is aliased to 'ls --color=auto'` |
| `type -a ls` | **Every** match, in the order bash would try them |
| `which ls` | Path of the executable — ignores builtins, aliases and functions |

`type` is the one to trust. `which` can point at a file on disk when an alias or function actually runs first.

---

## Getting documentation

| Command | Use for |
|---|---|
| `help cd` | Bash builtins (`help` alone lists them all) |
| `ls --help` | Quick usage summary from most programs |
| `man ls` | The full manual page (opens in `less` — `q` quits, `/` searches) |
| `man 5 passwd` | A specific **section** — here, the `/etc/passwd` file format |
| `apropos partition` | Search man page names and descriptions — same as `man -k` |
| `whatis ls` | One-line description |
| `info coreutils` | GNU info pages — longer, hyperlinked docs |
| `ls /usr/share/doc/` | Package READMEs; read `.gz` files with `zless` |

### Man page sections

| Section | Contents |
|---|---|
| 1 | User commands |
| 2 | System calls (kernel interfaces) |
| 3 | C library functions |
| 4 | Special files, such as devices |
| 5 | File formats and conventions |
| 6 | Games |
| 7 | Miscellaneous |
| 8 | System administration commands |

### Reading usage lines

| Notation | Means |
|---|---|
| `[ ]` | Optional |
| `...` | Can repeat |
| `a\|b` | Pick one |
| `UPPERCASE` or `<word>` | Replace with your value |

Same idea as PowerShell's syntax blocks — see [PowerShell ch. 3](/resources/powershell/3/).

### `info` keys

| Key | Does |
|---|---|
| `?` | Help |
| `Space` / `Backspace` | Next / previous page |
| `n` / `p` | Next / previous node |
| `u` | Up a level |
| `Enter` | Follow the link under the cursor |
| `q` | Quit |

---

## Making your own: `alias`

```bash
type foo                          # check the name is free first
alias foo='cd /var/log; ls -lt'   # ; runs commands one after another
foo                               # use it
alias                             # list all aliases
unalias foo                       # remove it
```

- **Session only:** aliases disappear when the shell closes. To keep one, add it to `~/.bashrc`.
- **Bypassing an alias:** `\ls` runs the real `ls`, and `command ls` skips aliases and functions.

---

## 🔐 Security notes

- **Aliases and functions can impersonate real commands.**
  - The trick: a malicious line in `~/.bashrc` such as `alias sudo='...'` can capture passwords.
  - The check: on any box you're triaging, run `type -a sudo` and look through `~/.bashrc`.
  - The bypass: `\sudo` or `command sudo` runs the real thing.
- **`which` only looks on disk**, so it won't reveal an alias or function hijack. Use `type -a`.
- **Man pages are offline and version-matched** to what's installed. They're more trustworthy than a random forum answer for a different version.

---

## Practice drills

<details>
<summary>1. Is <code>cd</code> a program on disk?</summary>

No — `type cd` shows it's a shell builtin. That's why `help cd` works and `man cd` usually doesn't.
</details>

<details>
<summary>2. Find commands related to "network" without knowing any names.</summary>

`apropos network` (or `man -k network`)
</details>

<details>
<summary>3. Open the manual for the <code>crontab</code> file format, not the command.</summary>

`man 5 crontab`
</details>

<details>
<summary>4. Make <code>logs</code> jump to <code>/var/log</code> and list newest files first.</summary>

`alias logs='cd /var/log; ls -lt'`
</details>

<details>
<summary>5. You suspect <code>ls</code> has been tampered with. How do you see what really runs?</summary>

`type -a ls`, then run `\ls` or `command ls` to bypass any alias.
</details>

---

## Key takeaways

- Commands are executables, builtins, functions or aliases — `type -a` tells you which.
- `help` for builtins, `--help` for a quick summary, `man` for the full story.
- `apropos` finds commands you don't know the name of.
- Aliases are quick to make, gone at logout unless they're in `~/.bashrc` — and a place attackers hide.
