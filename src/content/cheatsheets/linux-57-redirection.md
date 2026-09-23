---
title: "The Linux Command Line 6: Redirection"
description: "TLCL chapter 6 — stdin/stdout/stderr, > >> 2> &> and 2>&1 ordering, /dev/null, group commands, pipelines, and the filters uniq, wc, grep, head, tail and tee."
tags: ["linux", "bash", "shell", "redirection", "pipelines", "filters", "command-line"]
draft: false
updated: "2026-09-23"
kind: "resource"
resource: "linux"
module: "Ch. 6"
moduleOrder: 57
unit: 6
---

> **In one line:** every program has three streams — stdin (0), stdout (1), stderr (2) — and redirection points them at files while pipelines point them at other commands, which is what lets small filters combine into big answers.

*Companion to: Shotts, The Linux Command Line (2nd ed.), chapter 6.* The full version is the Redirection class notes; the section overview is the Linux chapter 6 sheet.

---

## The three streams

| Stream | Descriptor | Default | Carries |
|---|---|---|---|
| stdin | 0 | Keyboard | Input to the program |
| stdout | 1 | Screen | Results |
| stderr | 2 | Screen | Error and diagnostic messages |

`>` on its own always means `1>`.

## Redirection operators

| Operator | Does |
|---|---|
| `> file` | stdout to file — **truncates first**, before the command runs |
| `>> file` | stdout appended to file |
| `> file` (no command) | Creates or empties a file |
| `2> file` / `2>> file` | stderr only, overwrite / append |
| `> file 2>&1` | Both streams to one file — **portable**, order matters |
| `&> file` / `&>> file` | Both streams, bash only, overwrite / append |
| `< file` | file becomes stdin |
| `cmd1 \| cmd2` | cmd1's stdout becomes cmd2's stdin |

**The ordering trap:**

| Written | Result |
|---|---|
| `cmd > file 2>&1` | stdout → file, then stderr → same place. **Both in the file.** |
| `cmd 2>&1 > file` | stderr → screen (where stdout still is), then stdout → file. **Error escapes.** |

`2>&1` is not a file named `&1` — the `&` means "what follows is a descriptor".

## Discarding output

| Command | Effect |
|---|---|
| `cmd > /dev/null` | Drop results, keep errors visible |
| `cmd 2> /dev/null` | Keep results, silence errors |
| `cmd > /dev/null 2>&1` | Silence everything — check `$?` instead |
| `cmd < /dev/null` | Guarantee no input (won't wait on the keyboard) |

The exit status is **unaffected** by redirecting to `/dev/null`.

## Group commands

| Form | Runs in | Side effects (cd, vars) |
|---|---|---|
| `{ cmd; cmd; } > file` | Current shell | Persist |
| `(cmd; cmd) > file` | Subshell | Discarded |

Braces are fussy: space after `{`, `;` before `}`.

```bash
{ echo "== disk =="; df -h /; echo "== mem =="; free -h; } > report.txt
(cd /var/log; ls) > logs.txt          # you stay in your original directory
```

## stdin and `cat -`

- `wc -l < file` prints only the count; `wc -l file` also prints the name — the shell opened the file, not `wc`.
- Bare `cat` reads stdin until `Ctrl-D`.
- `cat -` means "stdin goes here", so piped data can be mixed with real files:

```bash
echo "--- header ---" | cat - body.txt
cat header.txt - footer.txt
```

`-` for stdin works in `tar`, `diff`, `grep` and many others too.

## Filters

| Filter | Key options | Notes |
|---|---|---|
| `sort` | `-n` numeric · `-r` reverse · `-o` in-place | Usually first; `sort -o f f` is safe in place |
| `uniq` | `-c` count · `-d` dupes only · `-u` singles only | Collapses **adjacent** dupes — needs sorted input |
| `wc` | `-l` lines · `-w` words · `-c` bytes · `-m` chars | Bare `wc` = lines, words, bytes |
| `grep` | `-i` · `-v` invert · `-c` count · `-n` line no. · `-r` recursive · `-o` matched part only | Quote patterns with spaces or metacharacters |
| `head` / `tail` | `-n N` · `tail -f` follow | Default 10 lines |
| `tee` | `-a` append | Writes to file **and** passes data on |

Only **stdout** goes down a pipe. Use `cmd 2>&1 \| less` to page errors too.

## Patterns worth memorising

```bash
./job.sh >> job.log 2>&1              # unattended run, complete log, appended
./job.sh 2>&1 | tee run.log           # watch it AND log it
find /etc -name "*.conf" > found.txt 2> denied.txt   # results and errors split
echo "text" | sudo tee /etc/somefile  # write to a root-owned file
ls /usr/bin | tee list.txt | wc -l    # capture and count in one pass
grep "Failed password" auth.log | grep -o "from [0-9.]*" |
  sort | uniq -c | sort -rn | head    # top talkers
```

## 🔐 Security notes

- **`> /dev/null 2>&1` in cron hides failures** — a backup can fail nightly and nobody is told. Log with `>> job.log 2>&1` and monitor it.
- **Errors are evidence:** "Permission denied" lines show what an attacker probed. Capture both streams for anything forensic.
- **`>` truncates silently,** and a truncated log looks the same as an attacker covering tracks. Use `set -o noclobber`, `chattr +a` on logs, and ship logs off-host.
- **Never redirect secrets:** command-line passwords land in shell history and `ps`; redirected output files inherit your umask.
- **`/tmp` is world-readable** — `umask 077` before writing sensitive output there, or write elsewhere.
- **`sudo tee` writes as root where `sudo cmd > file` can't** (the redirect happens as you) — handy, and a thing to notice in script reviews.

## Practice drills

<details>
<summary>1. What happens to the target file before `ls > out.txt` runs?</summary>

The shell opens and **truncates it to zero length** — before the command runs, whether or not it succeeds.
</details>

<details>
<summary>2. Why does `cmd 2>&1 > file` leave errors on the screen?</summary>

Redirections apply **left to right**: stderr is pointed at where stdout currently is (the screen) *before* stdout is moved to the file.
</details>

<details>
<summary>3. Does `2> /dev/null` change whether the command failed?</summary>

**No.** It hides the message; `$?` still reports the failure.
</details>

<details>
<summary>4. Why must `uniq` follow `sort`?</summary>

`uniq` only collapses **adjacent** identical lines, so duplicates must be brought together first.
</details>

<details>
<summary>5. What does `tee` give you that `>` can't?</summary>

It writes to a file **and** passes the data on down the pipeline — both destinations, one pass.
</details>

<details>
<summary>6. Why does `sort file.txt > file.txt` empty the file?</summary>

`>` truncates the file before `sort` opens it. Use `sort -o file.txt file.txt`, or a temp file and `mv`.
</details>

<details>
<summary>7. `{ …; }` vs `( … )` for a grouped redirection?</summary>

Braces run in the **current shell** (side effects persist); parentheses run in a **subshell** (side effects discarded).
</details>

<details>
<summary>8. Watch a script's progress on screen and keep a full log of output and errors?</summary>

`./script.sh 2>&1 | tee run.log`
</details>

## Key takeaways

- stdin 0, stdout 1, stderr 2 — the numbers are how you redirect them.
- `>` truncates before running; `>>` appends; `2>` handles errors separately.
- Combine with `> file 2>&1` (portable) or `&>` (bash). Order matters.
- `|` links commands, `>` writes files — and only stdout travels down a pipe.
- `sort | uniq -c | sort -rn | head` turns any log into a ranked list.
