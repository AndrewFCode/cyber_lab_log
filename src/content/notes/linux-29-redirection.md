---
title: "The Linux Command Line 6: Redirection — Class Notes"
description: "Full class notes for TLCL chapter 6: standard input, output and error, redirecting and combining streams, /dev/null, group commands, pipelines and the filters uniq, wc, grep, head, tail and tee."
pubDate: 2026-09-23
tags: ["class-notes", "linux", "bash", "shell", "redirection", "pipelines", "filters", "command-line"]
draft: false
---

**Class notes · Shotts, *The Linux Command Line* (2nd ed.) · Chapter 6**

> **Quick reference:** the short version of this chapter is the [Linux chapter 6 sheet](/cyber_lab_log/resources/linux/6/). It builds on [chapter 5 Working with commands](/cyber_lab_log/resources/linux/5/) and is the foundation for everything in [chapter 7 Expansion](/cyber_lab_log/resources/linux/7/) onwards — once you can redirect and pipe, small commands start combining into large ones.

## Learning objectives

By the end of these notes you should be able to:

1. Describe the three standard streams and their file descriptor numbers.
2. Redirect standard output to a file, overwriting or appending, and explain what happens the moment the shell opens the file.
3. Redirect standard error separately, and combine both streams into one file with `2>&1` and `&>`.
4. Explain why `> file 2>&1` and `2>&1 > file` behave differently.
5. Discard unwanted output with `/dev/null`.
6. Redirect standard input from a file, and explain what `cat -` does.
7. Build pipelines and explain how they differ from redirection.
8. Use `uniq`, `wc`, `grep`, `head`, `tail` and `tee` as filters, and combine them.

## 1. Standard input, output and error

### 1.1 Three streams

Every program a shell starts is given three open channels, and they exist whether or not the program uses them:

| Stream | Descriptor | Default | Carries |
|---|---|---|---|
| Standard input (stdin) | 0 | The keyboard | Data going into the program |
| Standard output (stdout) | 1 | The screen | The program's results |
| Standard error (stderr) | 2 | The screen | Diagnostic and error messages |

The numbers matter because that is how you refer to a stream when redirecting: `2>` means "redirect descriptor 2".

```text
+------------------------------------------------------------------------------+
|                                                                              |
|          keyboard                                              screen        |
|             |                                                    ^           |
|             | 0 stdin                               1 stdout    /            |
|             v                                                  /             |
|        +----------------------------------------+ -----------+               |
|        |              program                   |                            |
|        +----------------------------------------+ -----------\               |
|                                                   2 stderr     \             |
|                                                                 v            |
|                                                              screen          |
+------------------------------------------------------------------------------+
```

### 1.2 Why they are separate

Because output and errors travel on different streams, you can send results to a file while errors still appear on your terminal — which is exactly what you want when a long job is running. The catch is that both default to the same place, so on screen they look identical and it is easy to forget the distinction until a redirection quietly leaves one behind.

Try it with a command that produces both. Asking `ls` for one file that exists and one that does not gives a result on stdout and a message on stderr:

```bash
ls -l /etc/hosts /etc/nope
```

Send stdout to a file and the error still reaches the screen:

```bash
ls -l /etc/hosts /etc/nope > out.txt
```

> **Exam tip:** stdin is 0, stdout is 1, stderr is 2. `>` on its own always means `1>`.

## 2. Redirecting standard output

### 2.1 Overwrite with `>`

The `>` operator sends standard output to a file instead of the screen:

```bash
ls -l /usr > ls-output.txt
```

Nothing appears on the terminal; the listing is in the file. Note what the shell does *before* the command even runs: it opens the target file for writing and **truncates it to zero length**. The file is emptied whether or not the command succeeds, and even if the command fails immediately.

That has a useful side effect. Redirecting a command that produces no output creates — or empties — a file:

```bash
> empty.txt
```

It also has a dangerous one: one stray `>` overwrites hours of work, with no confirmation and no undo.

> **Caution:** `>` truncates first, then runs the command. `sort file.txt > file.txt` destroys the file before `sort` ever reads it.

> **In the real world:** `set -o noclobber` (or `set -C`) makes bash refuse to overwrite an existing file with `>`, and `>|` overrides it for the one command where you mean it. Adding it to `~/.bashrc` costs nothing and has saved a lot of files.

### 2.2 Append with `>>`

`>>` adds to the end of the file instead of truncating it, creating the file if it does not exist:

```bash
ls -l /usr >> ls-output.txt
ls -l /usr >> ls-output.txt
```

Run that twice and the file holds two copies of the listing. This is the operator for logs and for anything you are collecting over several commands.

```text
+------------------------------------------------------------------------------+
|                                                                              |
|   cmd > file        truncate to zero, then write    existing content lost    |
|   cmd >> file       open at the end, then write     existing content kept    |
|   > file            truncate (or create) with no command run at all          |
|                                                                              |
+------------------------------------------------------------------------------+
```

### 2.3 Worked example — capture a listing and count it

**Task:** save a listing of `/usr/bin` and find out how many entries it has, without running `ls` twice.

1. **Capture it.** `ls /usr/bin > bin-list.txt` — the listing is now on disk instead of the screen.
2. **Count it.** `wc -l < bin-list.txt` returns the number of lines, one per entry.
3. **Check the file is what you expect** with `head -n 5 bin-list.txt` before you build anything else on it.

On a typical Ubuntu container, step 2 returns a number in the region of a thousand; the exact figure depends on what is installed, which is itself a reason to capture it rather than assume it.

## 3. Group commands

Sometimes you want several commands' output to land in one place. Wrapping them in braces makes the shell treat them as a single unit, so one redirection applies to all of them:

```bash
{ echo "== disk =="; df -h /; echo "== memory =="; free -h; } > report.txt
```

The syntax is fussy: a space after `{`, and every command inside terminated with `;` (or a newline), including the last one before the closing `}`.

Parentheses do the same job but run the commands in a **subshell** — a separate child process — so anything they change, such as the working directory or a variable, is forgotten when the group ends:

```bash
(cd /var/log; ls) > logs.txt
```

After that command you are still in your original directory. With braces you would have moved.

| | `{ …; }` | `( … )` |
|---|---|---|
| Runs in | The current shell | A subshell |
| Side effects (cd, variables) | Persist afterwards | Discarded |
| Syntax | Spaces inside, `;` before `}` | No special spacing needed |

> **Note (beyond this lesson):** the subshell is why `cd /tmp | cat` seems to do nothing — each side of a pipeline also runs in its own subshell, so the directory change dies with it.

## 4. Redirecting standard error

Standard error has no shortcut of its own, so you redirect it by number:

```bash
ls -l /etc/nope 2> error.txt
```

The error message goes into the file and the terminal stays clean. `2>>` appends, exactly as `>>` does for stdout.

This is how you separate the two kinds of output for a long-running job: results into one file, complaints into another.

```bash
find /etc -name "*.conf" > found.txt 2> denied.txt
```

Afterwards, `found.txt` holds the matches and `denied.txt` holds every "Permission denied" — a far more useful arrangement than having them interleaved on screen.

## 5. Redirecting standard output and standard error to one file

### 5.1 The traditional way: `2>&1`

Sometimes you want everything in one file, in the order it happened. The traditional form redirects stdout to the file, then points stderr at wherever stdout is now going:

```bash
ls -l /usr /etc/nope > everything.txt 2>&1
```

**Order is critical.** The redirections are processed left to right:

- `> file 2>&1` — stdout is pointed at the file, then stderr is pointed at the same place as stdout. Both end up in the file. Correct.
- `2>&1 > file` — stderr is pointed at wherever stdout currently is (the screen), and only *then* is stdout moved to the file. The error still goes to the screen. Almost never what you want.

I ran both. The first put the error message in the file; the second left `f2.txt` empty and printed the error to the terminal.

```text
+------------------------------------------------------------------------------+
|                                                                              |
|   cmd > file 2>&1            step 1: 1 --> file                              |
|                              step 2: 2 --> wherever 1 is  = file   CORRECT   |
|                                                                              |
|   cmd 2>&1 > file            step 1: 2 --> wherever 1 is  = screen           |
|                              step 2: 1 --> file                    WRONG     |
|                                                                              |
+------------------------------------------------------------------------------+
```

`2>&1` is not a file called `&1`. The `&` is what tells the shell "the thing after this is a descriptor number, not a filename".

### 5.2 The modern way: `&>` and `&>>`

Recent versions of bash give a single operator for the same job:

```bash
ls -l /usr /etc/nope &> everything.txt
ls -l /usr /etc/nope &>> everything.txt
```

`&>` truncates and `&>>` appends, and both capture stdout and stderr together. It is shorter and there is no ordering trap.

> **Caution:** `&>` is a bash feature. In a script whose first line is `#!/bin/sh`, the shell may be dash, where `&>` does not mean this at all — I ran exactly that mistake and the errors escaped to the terminal while the file stayed empty. For portable scripts, use `> file 2>&1`.

### 5.3 Worked example — a script that logs everything

**Task:** run a backup script unattended and keep a complete log, with errors in context.

1. **Capture both streams in order:** `./backup.sh > backup.log 2>&1`. One file, interleaved as it happened, so an error appears next to the step that caused it.
2. **Want to watch it as well?** `./backup.sh 2>&1 | tee backup.log` sends everything to the screen and the file at once (section 9.6).
3. **Appending across nightly runs:** `./backup.sh >> backup.log 2>&1`, so each night adds to the log rather than erasing yesterday's.
4. **Remember the order** in steps 1 and 3 — `2>&1` must come *after* the file redirection.

## 6. Disposing of unwanted output

Some output you do not want at all. `/dev/null` is a special file — the "bit bucket" — that accepts anything written to it and discards it:

```bash
ls -l /etc/nope 2> /dev/null
```

The command runs, the error disappears, and the exit status still tells you whether it worked. I checked: after discarding the message that way, the exit status was still non-zero. That is the point — you are silencing the *message*, not the *result*.

Common forms:

| Command | Effect |
|---|---|
| `cmd > /dev/null` | Discard results, keep errors visible |
| `cmd 2> /dev/null` | Keep results, silence errors |
| `cmd > /dev/null 2>&1` | Silence everything; test the exit status instead |

> **In the real world:** `> /dev/null 2>&1` is everywhere in cron jobs, because anything a cron job prints gets emailed. Be careful: silence everything and a failing job fails invisibly. Log to a file instead, or at least keep stderr.

> **Note (beyond this lesson):** `/dev/null` reads as an immediately empty file too, which is why `cmd < /dev/null` is a tidy way to guarantee a program gets no input and does not hang waiting for the keyboard.

## 7. Redirecting standard input

### 7.1 `<`

`<` replaces a program's standard input with the contents of a file:

```bash
sort < names.txt
wc -l < bin-list.txt
```

Many commands accept a filename as an argument anyway, so `sort names.txt` does the same thing. The difference shows in what the program knows: with `<`, the file is opened by the *shell* and the program simply reads its input, unaware there is a file at all. That is why `wc -l < file` prints only the count while `wc -l file` prints the count and the filename.

### 7.2 `cat -`

`cat` concatenates files and writes the result to standard output. With no arguments it reads standard input and echoes it, which is why a bare `cat` seems to hang: it is waiting for you to type, and stops at `Ctrl-D` (end of file).

A lone `-` as an argument means "read standard input here", letting you mix piped data with real files in any order:

```bash
echo "--- header ---" | cat - body.txt
cat header.txt - footer.txt
```

In the first, the piped text is placed before the file's contents; in the second, whatever arrives on stdin is inserted between the two files. I confirmed that `printf "piped\n" | cat -` writes the piped text straight through.

> **Note (beyond this lesson):** the `-` convention is not `cat`'s alone. Many tools — `tar`, `diff`, `grep` among them — accept `-` as "use standard input here" in place of a filename.

## 8. Pipelines

### 8.1 The pipe operator

A pipeline connects one command's standard output directly to the next command's standard input:

```bash
ls -l /usr/bin | less
```

No file is involved. Both commands run at the same time and data flows between them as it is produced, which is why you can page through the output of a command that is still running.

```text
+------------------------------------------------------------------------------+
|                                                                              |
|   Redirection:   [command] --stdout--> [ file on disk ]                      |
|                  one process, then the file sits there                       |
|                                                                              |
|   Pipeline:      [command A] --stdout--> --stdin--> [command B]              |
|                  both run at once, data flows through                        |
|                                                                              |
+------------------------------------------------------------------------------+
```

### 8.2 The mistake everyone makes once

`>` expects a *filename* on the right; `|` expects a *command*. Writing `ls > sort` does not sort anything — it creates a file called `sort` in the current directory. You want `ls | sort`.

Pipelines chain as far as you like, each stage handing its output to the next:

```bash
ls /usr/bin | sort | uniq | wc -l
```

Only stdout travels down a pipe. Errors still go to the terminal unless you redirect them: `cmd 2>&1 | less` is how you page through a command's error messages as well as its output.

## 9. Filters

A **filter** is a program that reads standard input, transforms it, and writes standard output. Because they all share that shape, they slot together in any order.

### 9.1 `sort` and the input to `uniq`

`sort` puts lines in order, and is usually the first filter in a pipeline because the ones that follow expect sorted input.

### 9.2 `uniq` — report or omit repeated lines

`uniq` removes **adjacent** duplicate lines, which is why it almost always follows `sort`. Unsorted input with duplicates scattered through it leaves `uniq` with nothing to collapse.

| Option | Effect |
|---|---|
| (none) | Print each run of identical lines once |
| `-c` | Prefix each line with how many times it occurred |
| `-d` | Print only the lines that were duplicated |
| `-u` | Print only the lines that appeared exactly once |

I ran `sort | uniq -c` over the lines `b a a c b b` and got `2 a`, `3 b`, `1 c`; `uniq -d` over the same input returned `a` and `b`.

The `sort | uniq -c | sort -rn` idiom — count occurrences, then sort by count, highest first — is one of the most useful things in this chapter and turns up constantly in log analysis.

### 9.3 `wc` — print line, word and byte counts

`wc` with no options prints three numbers: lines, words, bytes. Feeding it two lines totalling 19 bytes and four words returned exactly `2 4 19`.

| Option | Counts |
|---|---|
| `-l` | Lines |
| `-w` | Words |
| `-c` | Bytes |
| `-m` | Characters (differs from bytes in UTF-8) |

`wc -l` at the end of a pipeline answers "how many?" for almost anything: `ls /usr/bin | wc -l` returned 1,067 on this container.

### 9.4 `grep` — print lines matching a pattern

`grep pattern file` prints the lines that contain the pattern; in a pipeline, `... | grep pattern` filters what flows through.

| Option | Effect |
|---|---|
| `-i` | Ignore case |
| `-v` | Invert — print lines that do *not* match |
| `-c` | Print a count instead of the lines |
| `-l` | Print only the names of matching files |
| `-n` | Show line numbers |
| `-r` | Search a directory tree recursively |

Over the lines `apple`, `Banana`, `cherry`, I confirmed that `grep -i an` returns `Banana` only, and `grep -v a` returns `Banana` and `cherry` — case matters to `-v` just as much.

> **Caution:** always quote a pattern containing spaces or shell characters — `grep "Failed password"`, `grep '\.conf$'`. Unquoted, the shell mangles it before `grep` ever sees it.

### 9.5 `head` and `tail` — print the first or last part of files

`head` prints the first 10 lines by default, `tail` the last 10; `-n` sets the number. Over `seq 1 20`, `head -n 3` gave 1, 2, 3 and `tail -n 3` gave 18, 19, 20.

`tail -f` is the special one: it prints the end of a file and then keeps watching, printing new lines as they are appended. It is how you watch a log live, and you leave it running until `Ctrl-C`.

### 9.6 `tee` — read from stdin, write to stdout and files

A pipeline is a single path: once data flows into the next command, it is gone. `tee` splits it, writing its input to one or more files *and* passing it along unchanged:

```bash
ls /usr/bin | tee bin-list.txt | wc -l
```

I ran that pattern over `seq 1 20`: `wc -l` reported 20 and the file held all twenty lines. Use `tee -a` to append instead of overwrite, and `sudo tee` when you need to write to a file your user cannot open but your pipeline is already running as you (`echo "text" | sudo tee /etc/somefile`).

```text
+------------------------------------------------------------------------------+
|                                                                              |
|   [command] --stdout--> [ tee ] --stdout--> [next command]                   |
|                            |                                                 |
|                            +--------------> [ file on disk ]                 |
|                                                                              |
|   The data reaches both places; nothing is consumed on the way.              |
+------------------------------------------------------------------------------+
```

### 9.7 Worked example — the top talkers in a log

**Task:** from an SSH log, find which source addresses produced the most failed logins.

```bash
grep "Failed password" auth.log | grep -o "from [0-9.]*" |
  sort | uniq -c | sort -rn | head
```

Step by step:

1. `grep "Failed password"` keeps only the failure lines.
2. `grep -o "from [0-9.]*"` prints just the matching fragment rather than the whole line, so each line becomes a bare address.
3. `sort` groups identical addresses together, which is what the next stage needs.
4. `uniq -c` collapses each group into one line prefixed with its count.
5. `sort -rn` sorts numerically (`-n`), highest first (`-r`).
6. `head` shows the top ten.

Six small tools, each doing one thing, answering a question none of them was written for. That is the whole argument of this chapter.

## 10. Security perspective

Redirection and pipelines are how defenders read logs — and how attackers stay quiet.

- **Silent failures hide incidents.** `> /dev/null 2>&1` on a cron job means a backup or a sync can fail nightly for months with nobody told. Log to a file with `>> job.log 2>&1` and monitor the log, or keep stderr visible.
- **Errors are evidence.** Redirecting stderr away from a capture throws out "Permission denied" and "No such file" messages, which are exactly what tell you what an attacker probed and failed to reach. Capture both streams for anything forensic.
- **`>` is destructive and silent.** A mistyped redirect can truncate a log file, and from an incident response point of view a truncated log is indistinguishable from an attacker covering their tracks. `noclobber`, append-only attributes (`chattr +a`) and shipping logs off the host all protect against both cases.
- **Never redirect secrets into files.** `command --password hunter2 > out.txt` puts the secret in the shell history *and* the argument list (visible in `ps`), while the output file inherits your umask. Files written by redirection get default permissions, not restrictive ones.
- **Sensitive output lands in world-readable places.** `dump > /tmp/data.txt` is a classic: `/tmp` is readable by every user on the box. Set `umask 077` first, or write somewhere with proper permissions.
- **`sudo tee` is the right pattern — and a review point.** `echo x | sudo tee /etc/file` works where `sudo echo x > /etc/file` fails, because the redirection happens as *you*, not as root. That also means any script doing this is writing to system files, which is worth noticing in a review.
- **The triage pipeline.** `grep … | sort | uniq -c | sort -rn | head` is the fastest way to turn a log into a ranked list — failed logins by source, most-requested URLs, most frequent error codes. Learn it once and use it on every incident.

## Summary

- Every program has three streams: **stdin (0)**, **stdout (1)** and **stderr (2)**, all pointing at the terminal by default.
- `>` redirects stdout, truncating the target **before** the command runs; `>>` appends. A bare `> file` creates or empties a file.
- `2>` and `2>>` redirect stderr on its own, letting you split results and errors into separate files.
- Combine both with `> file 2>&1` — **in that order** — or with bash's `&>` / `&>>`. `2>&1 > file` leaves stderr on the screen.
- `/dev/null` discards anything written to it; the exit status still reports success or failure.
- `<` feeds a file into stdin. `cat` with no arguments reads stdin; `cat -` mixes stdin with named files.
- `|` connects one command's stdout to the next command's stdin, with both running at once and no file involved. Only stdout travels down a pipe.
- **Filters** read stdin and write stdout: `sort`, `uniq` (`-c`, `-d`, `-u`; needs sorted input), `wc` (`-l`, `-w`, `-c`), `grep` (`-i`, `-v`, `-c`, `-n`, `-r`), `head` / `tail` (`-n`, `tail -f`), and `tee`, which writes to a file *and* passes data on.

## Glossary

| Term | Meaning |
|---|---|
| Standard input (stdin) | Descriptor 0; where a program reads its input, the keyboard by default |
| Standard output (stdout) | Descriptor 1; where a program writes its results, the screen by default |
| Standard error (stderr) | Descriptor 2; where a program writes diagnostic messages |
| File descriptor | The number the shell uses to refer to an open stream |
| Redirection | Pointing a stream at a file instead of the terminal |
| Truncate | Emptying a file to zero length, which `>` does before the command runs |
| Append | Adding to the end of a file without erasing it, with `>>` |
| `2>&1` | Point stderr at wherever stdout is currently going |
| `&>` | Bash shorthand for redirecting stdout and stderr together |
| `/dev/null` | The bit bucket: writes are discarded, reads return end of file |
| Group command | Several commands in `{ …; }` sharing one redirection |
| Subshell | A child shell, created by `( … )`, whose side effects are discarded |
| Pipeline | Connecting one command's stdout to the next command's stdin with `\|` |
| Filter | A program that reads stdin, transforms it and writes stdout |
| Adjacent duplicates | Identical lines next to each other, which is all `uniq` can collapse |
| `tail -f` | Follow a file, printing new lines as they are appended |
| noclobber | Shell option making `>` refuse to overwrite an existing file |

## Review questions

1. Name the three standard streams and their descriptor numbers.
2. What does the shell do to the target file *before* running `ls > out.txt`?
3. What is the difference between `>` and `>>`?
4. How do you redirect only error messages to a file?
5. Why does `> file 2>&1` work while `2>&1 > file` does not?
6. What is `&>` short for, and why avoid it in a `#!/bin/sh` script?
7. What is `/dev/null`, and does redirecting to it change a command's exit status?
8. Why does `wc -l < file` print a different thing from `wc -l file`?
9. What does a lone `-` mean as an argument to `cat`?
10. What is the difference between `cmd > file` and `cmd | other`?
11. Why does `uniq` almost always follow `sort`?
12. What does `tee` do that a plain redirection cannot?
13. **Scenario:** a nightly cron job ends in `> /dev/null 2>&1` and nobody noticed it failing for weeks. What should it say instead?
14. **Scenario:** you want to watch a slow script's progress on screen *and* keep a complete log of output and errors. What do you run?
15. **Scenario:** from `access.log`, produce the ten busiest client IP addresses, most frequent first. Sketch the pipeline.
16. **Scenario:** `sort data.txt > data.txt` has just emptied the file. Explain why, and give a safe alternative.

## Answer key

1. **Standard input (0), standard output (1), standard error (2).**
2. **It opens the file and truncates it to zero length** — before the command runs, and regardless of whether the command succeeds.
3. **`>` overwrites (truncates first); `>>` appends** to the end, creating the file if needed.
4. **`cmd 2> file`** (or `2>>` to append), redirecting descriptor 2 by number.
5. **Redirections are applied left to right.** In the first, stdout goes to the file and then stderr is pointed at the same place. In the second, stderr is pointed at the screen — where stdout still is — before stdout is moved.
6. **Shorthand for redirecting stdout and stderr to the same file.** It is a bash feature; `/bin/sh` may be dash, where it does not work, so use `> file 2>&1` for portability.
7. **A special file that discards everything written to it.** **No** — the exit status is unaffected; you silence the message, not the result.
8. **With `<` the shell opens the file and `wc` just reads input,** so it prints only the count. Given a filename, `wc` also prints the name.
9. **"Read standard input at this point,"** letting piped data be mixed with named files.
10. **`>` writes to a file, which sits on disk; `|` sends stdout straight into another command's stdin,** with both running simultaneously and no file involved.
11. **`uniq` only collapses adjacent duplicate lines,** so the input must be sorted for duplicates to be next to each other.
12. **It writes its input to a file and passes it on down the pipeline at the same time,** so data reaches both places.
13. **`>> job.log 2>&1`**, with the log monitored — keep the output rather than discarding failures into silence.
14. **`./script.sh 2>&1 | tee run.log`** — merge stderr into stdout, then split the stream to the screen and the file.
15. **`grep … access.log | <extract the IP> | sort | uniq -c | sort -rn | head`** — group identical addresses, count each group, sort numerically in reverse, take the top ten.
16. **`>` truncates `data.txt` before `sort` opens it,** so `sort` reads an empty file. Use a temporary file (`sort data.txt > tmp && mv tmp data.txt`) or `sort -o data.txt data.txt`, which is written to handle this case.
