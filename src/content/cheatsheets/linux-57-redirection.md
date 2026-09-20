---
title: "Linux: Redirection"
description: "The Linux Command Line ch. 6 — stdin, stdout and stderr, redirecting to and from files, /dev/null, pipelines, and the core filters."
tags: ["linux", "bash", "the-linux-command-line"]
draft: false
updated: "2026-09-18"
kind: "resource"
resource: "linux"
module: "Ch. 6"
moduleOrder: 57
unit: 6
---
> **In one line:** every program has three streams — point them at files with `>` and `<`, or chain programs together with `|`.

*Companion to: William Shotts, The Linux Command Line, chapter 6.*

---

## The three streams

| Stream | Number | Default |
|---|---|---|
| Standard input (stdin) | 0 | The keyboard |
| Standard output (stdout) | 1 | The screen |
| Standard error (stderr) | 2 | The screen — separate from stdout |

---

## Redirection

| Syntax | Does |
|---|---|
| `cmd > file` | Stdout to a file — **overwrites** |
| `cmd >> file` | Stdout to a file — appends |
| `cmd 2> file` | Stderr to a file |
| `cmd > file 2>&1` | Both streams into one file |
| `cmd &> file` | Same thing, shorter |
| `cmd &>> file` | Both streams, appended |
| `cmd 2> /dev/null` | Throw errors away |
| `> file` | Create an empty file, or empty an existing one |
| `cmd < file` | Feed a file to stdin |

**Order matters.** `cmd > file 2>&1` catches both streams; `cmd 2>&1 > file` still prints errors to the screen. Redirections are processed left to right.

```bash
ls /etc /nope > out.txt           # errors still hit the screen
ls /etc /nope > out.txt 2>&1      # everything in the file
ls /etc /nope 2> /dev/null        # just the good output
```

---

## `cat` — concatenate

| Use | Example |
|---|---|
| Show a file | `cat notes.txt` |
| Join files | `cat part1 part2 part3 > whole` |
| Type into a file | `cat > notes.txt` — type your lines, then `Ctrl+D` on a new line |
| Read stdin | `cat < notes.txt` |

---

## Pipelines

`cmd1 | cmd2` sends cmd1's stdout into cmd2's stdin.

```bash
ls -l /usr/bin | less                  # page through long output
ls /bin /usr/bin | sort | uniq | wc -l # count distinct program names
```

**`>` vs `|`:** `>` connects a command to a **file**; `|` connects it to another **command**. Typing `ls > less` doesn't page anything — it creates a file named `less` (and could overwrite something important if you're root in `/usr/bin`).

---

## Filters

| Command | Does |
|---|---|
| `sort` | Sort lines |
| `uniq` | Drop *adjacent* duplicates — so `sort` first. `-d` shows only the duplicates |
| `wc` | Count lines, words, bytes. `-l` for lines only |
| `grep pattern` | Lines that match. `-i` ignore case · `-v` lines that *don't* match |
| `head` / `tail` | First / last 10 lines. `-n 20` for 20 |
| `tail -f file` | Keep following a file as it grows — live logs (`Ctrl+C` to stop) |
| `tee file` | Write to a file **and** pass the data on down the pipe |

```bash
grep -i error /var/log/syslog | tail -n 20
ls /usr/bin | grep zip
ls -l /usr/bin | tee listing.txt | grep -v root
```

---

## 🔐 Security notes

These are SOC triage one-liners (a couple of flags come from later chapters):

```bash
# How many failed SSH logins?
grep "Failed password" /var/log/auth.log | wc -l

# Which IPs are hammering the box? (grep -o and uniq -c: later chapters)
grep "Failed password" /var/log/auth.log | grep -o "from [0-9.]*" | sort | uniq -c | sort -rn | head

# Watch logins live
tail -f /var/log/auth.log
```

- On RHEL-family systems the log is `/var/log/secure`. On journald-only systems, use `journalctl -u ssh`.
- **`tee` keeps evidence.** Save exactly what you looked at while still viewing it.
- **`2> /dev/null` hides problems too.** Discard errors deliberately, not by habit — a "permission denied" can be the finding.

---

## Practice drills

<details>
<summary>1. Save a directory listing to a file, with any errors going into a separate file.</summary>

`ls -l /etc /nope > list.txt 2> errors.txt`
</details>

<details>
<summary>2. Append today's date to <code>log.txt</code> without overwriting it.</summary>

`date >> log.txt`
</details>

<details>
<summary>3. Count the lines in <code>/etc/passwd</code> that don't contain <code>nologin</code>.</summary>

`grep -v nologin /etc/passwd | wc -l`
</details>

<details>
<summary>4. Why does <code>sort names.txt | uniq</code> work but <code>uniq names.txt</code> miss duplicates?</summary>

`uniq` only removes duplicates that sit next to each other — sorting puts them together.
</details>

<details>
<summary>5. Search a big log for "denied", save the matches, and see only the last five on screen.</summary>

`grep denied big.log | tee denied.txt | tail -n 5`
</details>

---

## Key takeaways

- Streams: 0 stdin, 1 stdout, 2 stderr.
- `>` overwrites, `>>` appends, `2>` catches errors, `&>` catches both, `/dev/null` discards.
- `|` joins commands; `>` goes to files — never mix them up.
- `sort | uniq`, `grep -i/-v`, `head`/`tail -f`, `wc -l` and `tee` are the everyday filters.
