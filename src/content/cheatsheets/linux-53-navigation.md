---
title: "Linux: Navigation"
description: "The Linux Command Line ch. 2 — the single directory tree, pwd, ls and cd, absolute vs relative paths, shortcuts, and the rules for filenames."
tags: ["linux", "bash", "the-linux-command-line"]
draft: false
updated: "2026-09-18"
kind: "resource"
resource: "linux"
module: "Ch. 2"
moduleOrder: 53
unit: 2
---
> **In one line:** one tree starting at `/`, three commands to move around it — `pwd`, `ls`, `cd`.

*Companion to: William Shotts, The Linux Command Line, chapter 2.*

---

## One tree, no drive letters

| | Linux | Windows |
|---|---|---|
| Top of the tree | `/` (root directory) | One per drive: `C:\`, `D:\` |
| Separator | `/` | `\` |
| Other disks | **Mounted** somewhere inside the one tree | Get their own drive letter |
| Home folder | `/home/andrew` (shown as `~`) | `C:\Users\andrew` |

---

## The three commands

| Command | Does |
|---|---|
| `pwd` | Print working directory — where am I? |
| `ls` | List the current directory's contents (`ls /etc` lists another one) |
| `cd <dir>` | Change directory |

---

## Absolute vs relative paths

| Type | Starts from | Example |
|---|---|---|
| Absolute | The root, `/` | `cd /usr/share/doc` |
| Relative | Where you are now | `cd share/doc` (from `/usr`) |

| Symbol | Means |
|---|---|
| `.` | This directory |
| `..` | The parent directory |
| `./` | Usually optional in paths — but needed to *run* a program in the current directory (`./script.sh`) |

```bash
cd /usr/bin     # absolute
cd ..           # up to /usr
cd ./lib        # into /usr/lib — same as: cd lib
```

---

## Shortcuts

| Shortcut | Goes to |
|---|---|
| `cd` | Your home directory |
| `cd ~` | Your home directory |
| `cd -` | The previous directory — toggles back and forth |
| `cd ~alice` | Alice's home directory |

---

## Filename rules

| Rule | Detail |
|---|---|
| Leading `.` = hidden | `ls` skips them; `ls -a` shows them. Config files live here (`.bashrc`, `.ssh/`) |
| Case-sensitive | `File1`, `file1` and `FILE1` are three different files |
| No real extensions | `.txt` is naming convention; the system doesn't care |
| Stick to `. - _` for punctuation | **No spaces** — `quarterly_report.txt`, not `quarterly report.txt` |

---

## 🔐 Security notes

- **Hidden means "not listed", not "protected".** Attackers love dot-names — `/tmp/.x`, `/dev/shm/.cache`, a stray `~/.config/...`. When investigating, always use `ls -la`.
- **`~/.ssh/authorized_keys` is a classic persistence spot.** An attacker's key added there means password-free logins. It's hidden inside a hidden directory — check it on any box you're triaging.

---

## Practice drills

<details>
<summary>1. You're in <code>/usr/share</code>. Give the absolute and relative paths to <code>/usr/share/doc</code>.</summary>

Absolute: `/usr/share/doc`. Relative: `doc` (or `./doc`).
</details>

<details>
<summary>2. Jump between <code>/var/log</code> and <code>/etc</code> repeatedly with the fewest keystrokes.</summary>

`cd /var/log`, `cd /etc`, then `cd -` toggles between them.
</details>

<details>
<summary>3. Why doesn't <code>ls</code> show your <code>.bashrc</code>?</summary>

Names starting with `.` are hidden — use `ls -a`.
</details>

<details>
<summary>4. Are <code>Notes.txt</code> and <code>notes.txt</code> the same file?</summary>

No — Linux filenames are case-sensitive.
</details>

---

## Key takeaways

- Everything hangs off `/`; other disks are mounted into the tree.
- `pwd` where, `ls` what, `cd` go.
- Absolute paths start with `/`; relative paths start from where you are.
- `cd`, `cd -` and `..` cover most movement.
- Hidden files start with `.`; names are case-sensitive; avoid spaces.
