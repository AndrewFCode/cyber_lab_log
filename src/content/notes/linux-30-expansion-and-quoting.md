---
title: "The Linux Command Line 7: Seeing the World as the Shell Sees It — Class Notes"
description: "Full class notes for TLCL chapter 7: pathname, tilde, arithmetic, parameter and command expansion, then double quotes, single quotes and backslash escaping."
pubDate: 2026-09-24
tags: ["class-notes", "linux", "bash", "shell", "expansion", "quoting", "globbing", "command-line"]
draft: false
---

# Seeing the World as the Shell Sees It

**Class notes · Shotts, *The Linux Command Line* (2nd ed.) · Chapter 7**

> **Quick reference:** the short version of this chapter is the [Linux chapter 7 sheet](/cyber_lab_log/resources/linux/7/). It follows [chapter 6 Redirection](/cyber_lab_log/resources/linux/6/) and explains something that has been happening invisibly since [chapter 4](/cyber_lab_log/resources/linux/4/): when you type `rm *.txt`, `rm` never sees the `*`.

## Learning objectives

By the end of these notes you should be able to:

1. Explain what expansion is and why the command you type is rarely the command that runs.
2. Use pathname expansion (globbing) and predict exactly which files a pattern matches.
3. Use tilde, arithmetic, parameter and command expansion, and say what each one produces.
4. Preview any expansion safely with `echo` before running a destructive command.
5. Explain what double quotes suppress and what they still allow through.
6. Explain why single quotes suppress everything, and what they cannot contain.
7. Escape a single character with a backslash, and use backslash escape sequences.
8. Diagnose the everyday failures caused by unquoted variables and filenames with spaces.

## 1. Expansion

### 1.1 The shell reads your line first

Press Enter and the shell does not hand your text straight to the program. It reads the line, performs **expansion** — replacing certain characters and patterns with something else — and only then runs the resulting command. Most of the time the difference is invisible, which is exactly why it catches people out.

```text
+------------------------------------------------------------------------------+
|                                                                              |
|   You type:      ls -l *.txt                                                 |
|                        |                                                     |
|                        v  the shell expands                                  |
|   Shell builds:  ls -l a.txt b.txt                                           |
|                        |                                                     |
|                        v  only now does the program start                    |
|   ls receives:   -l  a.txt  b.txt      (it never sees the asterisk)          |
|                                                                              |
+------------------------------------------------------------------------------+
```

### 1.2 `echo` is the safety net

`echo` prints its arguments *after* expansion, so putting `echo` in front of a command shows you precisely what the shell is about to do. Get into the habit before anything destructive:

```bash
echo rm *.log
```

Read the output, and if it is what you meant, run the command without `echo`.

> **Caution:** the moment to check is *before* `rm`, not after. `rm` receives a list of filenames and has no idea a pattern was involved, so it cannot warn you that your pattern matched more than you thought.

### 1.3 Pathname expansion

Pathname expansion, also called **globbing**, is the one you already use. The shell replaces a pattern with the names of the files that match it — in alphabetical order, and *only* names that actually exist.

| Pattern | Matches |
|---|---|
| `*` | Any characters, including none |
| `?` | Exactly one character |
| `[abc]` | One character from the set |
| `[!abc]` | One character *not* in the set |
| `[[:digit:]]` | One character from a named class |

In a directory holding `Makefile`, `a.txt`, `b.txt`, `c.log`, `data1`, `data2`, `data10` and `.hidden`, I ran these and got:

| Command | Result |
|---|---|
| `echo *` | `Makefile a.txt b.txt c.log data1 data10 data2` |
| `echo *.txt` | `a.txt b.txt` |
| `echo [ab].txt` | `a.txt b.txt` |
| `echo data?` | `data1 data2` — `data10` has two characters after `data` |

Two things to take from that. First, `*` does **not** match hidden files: `.hidden` is absent from `echo *`, and you need a pattern that starts with a dot to reach it. Second, sorting is by character, not by number, which is why `data10` lands between `data1` and `data2`.

> **Caution:** if a pattern matches nothing, bash leaves it alone by default — the command receives the literal `*.xyz`. That is how you end up with a file named `*.xyz`, or a confusing error from a program that was handed an asterisk.

> **Note (beyond this lesson):** the book also covers **brace expansion** in this chapter, which generates text rather than matching files: `echo {A,B}-{1,2}` produces `A-1 A-2 B-1 B-2`, and `echo {01..05}` produces `01 02 03 04 05`. Unlike globbing, the results need not exist, which makes it useful for creating things: `mkdir -p project/{src,docs,tests}`.

### 1.4 Tilde expansion

A `~` at the start of a word expands to a home directory:

| Written | Expands to |
|---|---|
| `~` | Your own home directory |
| `~username` | That user's home directory |
| `~nosuchuser` | Nothing — it stays as literal text |

Running as root, `echo ~` and `echo ~root` both returned `/root`, while `echo ~nosuchuser` printed `~nosuchuser` unchanged. That last behaviour is worth remembering: a typo in a username does not produce an error, it produces a path that looks like a filename.

### 1.5 Arithmetic expansion

`$((expression))` performs integer arithmetic and substitutes the result:

```bash
echo $((2 + 2))
echo $(((5 ** 2) * 3))
```

| Operator | Meaning |
|---|---|
| `+` `-` `*` `/` | Add, subtract, multiply, divide |
| `%` | Remainder (modulo) |
| `**` | Exponentiation |

The results I verified: `2+2` gives 4, `5/2` gives 2, `5%2` gives 1, `2**10` gives 1024, `10/3` gives 3, and `(5**2)*3` gives 75.

**Integers only.** Division truncates towards zero — `7/2` is 3 and `-7/2` is −3 — and there are no decimals at all. Dividing by zero is an error, not an infinity: the shell reported a division-by-zero error and produced no value.

Spaces inside the expression are ignored, so use them for readability. Expansions nest, too: `echo $(( $(echo 3) + 4 ))` returned 7.

> **Note (beyond this lesson):** for anything non-integer, use `bc -l` — `echo "scale=2; 10/3" | bc` — or `awk`. Reaching for `$(( ))` and being surprised by a truncated answer is a common source of wrong numbers in scripts.

### 1.6 Parameter expansion

`$name` is replaced with the value of the variable or environment variable of that name:

```bash
foo=bar
echo $foo
echo ${foo}s
```

The braces in `${foo}` exist to mark where the name ends. Without them, `echo $foos` looks for a variable called `foos`, which does not exist. I confirmed `${foo}s` prints `bars`.

The crucial behaviour is what happens to a name that does not exist: **the expansion produces an empty string, silently.** There is no error. `echo $nosuch"|end"` printed just `|end`. In a script, that is how `rm -rf $DIR/` becomes `rm -rf /`.

> **Caution:** a misspelled variable name is not an error, it is an empty string. In scripts, `set -u` makes the shell treat unset variables as an error instead, which turns a silent disaster into a clean failure.

Common environment variables: `$HOME`, `$USER`, `$PATH`, `$PWD`, `$SHELL`. See all of them with `printenv`.

### 1.7 Command expansion

Command substitution, `$(command)`, runs a command and substitutes its **output** into the line:

```bash
echo "kernel: $(uname -r)"
ls -l $(which cp)
```

Both worked as expected: the first printed the running kernel version, the second listed the `cp` binary by resolving its path first. The older backtick form, `` `command` ``, does the same thing and still appears in old scripts — `echo \`date +%Y\`` returned the year — but `$( )` nests cleanly and is far easier to read, so prefer it.

### 1.8 Worked example — preview before you delete

**Task:** delete every `.log` file in a directory, safely.

1. **See what the pattern matches:** `echo *.log`. The shell prints the actual list.
2. **Read it properly.** Look for anything you did not expect — a file with a space in the name will appear as two words, which is your warning.
3. **Check for the no-match case.** If the output is the literal `*.log`, nothing matched, and running `rm` would try to delete a file with that literal name.
4. **Run it:** `rm *.log`, or `rm -i *.log` to confirm each one.
5. **For anything irreversible,** prefer `ls` over `echo` (`ls -l *.log`), since it also shows sizes and dates.

## 2. Quoting

Expansion is useful and occasionally disastrous. Quoting is how you control it.

### 2.1 What the shell does to unquoted text

Two things happen to an unquoted word that people forget: expansions run, and the result is split into separate arguments at whitespace (**word splitting**). Multiple spaces collapse, which is why `echo this is a    test` printed a single space between each word, while the quoted version preserved all four spaces.

Word splitting is the reason filenames with spaces break things. With `f="two words.txt"`, running `ls -l $f` produced two errors — the shell split the value into `two` and `words.txt` and handed `ls` two filenames that do not exist. Quoted as `ls -l "$f"`, it listed the file correctly.

### 2.2 Double quotes

Inside double quotes, most special characters lose their meaning: whitespace is preserved, and pathname expansion and word splitting do not happen. **Three expansions still run:** parameter expansion, arithmetic expansion and command substitution.

I confirmed all three at once — `echo "path $HOME  arith $((2+2))  cmd $(echo hi)"` printed `path /root  arith 4  cmd hi`, double spaces intact.

That selectivity is the point. `"$var"` is how you pass a value as one argument no matter what it contains, which is why the rule is: **always quote your variables.**

```text
+------------------------------------------------------------------------------+
|                                                                              |
|   Unquoted      expansions run, globbing runs, words split on whitespace     |
|   "Double"      $var  $((math))  $(cmd) still run; globbing and splitting    |
|                 do not; whitespace is preserved                              |
|   'Single'      nothing expands at all; every character is literal           |
|   \c            the next single character is literal                         |
|                                                                              |
+------------------------------------------------------------------------------+
```

Double quotes also matter when capturing multi-line output. `echo "$(cat f.txt)"` preserved the newline between `one` and `two`; unquoted, `echo $(cat f.txt)` collapsed it to `one two`, because word splitting flattened the result.

> **Caution:** `$` keeps its meaning inside double quotes, which bites when writing money or literal text. `echo "The total is $100.00"` printed `The total is 00.00`, because `$1` expanded to an empty string. Use `\$` or single quotes.

### 2.3 Single quotes

Single quotes suppress **everything**. No expansion of any kind happens; every character between them is literal. I ran a line containing `$HOME`, `$((2+2))`, `$(echo hi)` and `*` inside single quotes, and all four came out exactly as typed.

Use single quotes for anything the shell must not touch: regular expressions, `awk` and `sed` programs, passwords in a configuration line, and literal text containing `$` or `*`.

The one thing single quotes cannot contain is a single quote. There is no escape inside them — a backslash is just a backslash, as I confirmed. To include an apostrophe, close the quote, add an escaped one, and reopen: `'it'\''s'`, or simply use double quotes instead.

| Use | Choose |
|---|---|
| A value that may contain spaces | Double quotes: `"$file"` |
| Text with `$` or `*` meant literally | Single quotes |
| A `grep`, `sed` or `awk` pattern | Single quotes |
| A string that must include a variable | Double quotes |

### 2.4 Escaping characters

A backslash makes the **next single character** literal. It is the tool for one awkward character in an otherwise normal line:

```bash
echo \*
echo "Its cost \$100"
mv two\ words.txt renamed.txt
```

The first printed a bare asterisk, the second printed the dollar sign as text. Inside double quotes, a backslash escapes `$`, `` ` ``, `"` and `\`; against anything else it stays as a literal backslash — `echo "hello\\there"` printed `hello\there`.

A backslash at the end of a line escapes the newline itself, which is how long commands are wrapped:

```bash
grep "Failed password" auth.log | \
  sort | uniq -c
```

### 2.5 Backslash escape sequences

Backslashes also introduce **escape sequences** that stand for characters you cannot easily type:

| Sequence | Meaning |
|---|---|
| `\n` | Newline |
| `\t` | Tab |
| `\\` | A literal backslash |
| `\a` | Alert (the terminal bell) |
| `\b` | Backspace |
| `\r` | Carriage return |
| `\0nnn` | The character with octal value `nnn` |

Plain `echo` does not interpret these; you need `echo -e`, or `$'...'`, or — best — `printf`. Both `echo -e "a\tb\nc"` and `printf "a\tb\nc\n"` produced a tab between `a` and `b` and a newline before `c`.

> **In the real world:** prefer `printf` over `echo -e` in scripts. `echo`'s handling of options and escapes varies between shells and systems; `printf` behaves the same everywhere.

### 2.6 Worked example — searching for a literal dollar amount

**Task:** find lines containing `$100.00` in `invoices.txt`.

1. **The naive attempt** — `grep "$100.00" invoices.txt` — fails silently. The shell expands `$1` to nothing, so `grep` searches for `00.00`.
2. **Quote it properly** with single quotes: `grep '$100.00' invoices.txt`. The shell passes the pattern through untouched.
3. **But `$` and `.` mean something to `grep` too.** In a regular expression, `$` anchors to end of line and `.` matches any character. Escape them for a literal match: `grep '\$100\.00' invoices.txt`.
4. **Or skip regular expressions entirely:** `grep -F '$100.00' invoices.txt` treats the pattern as a fixed string.

Two separate layers of interpretation — the shell's, then the program's — and the fix for each is different. Recognising which layer ate your characters is most of the skill.

## 3. Security perspective

Expansion happens before any program sees your command, so it is where a great many shell vulnerabilities live.

- **Unquoted variables are the root of shell injection.** If a value comes from a filename, a log line, a web form or an environment variable, and you write `$var` unquoted, the shell performs word splitting and globbing on its contents. Quote every expansion: `"$var"`.
- **Command substitution executes.** `$(...)` and backticks *run a command*. A script that builds a command string from untrusted input can be made to execute anything the script's user can. Never interpolate untrusted data into a command line — pass it as a quoted argument instead.
- **Unset variables expand to nothing, silently.** `rm -rf $BACKUP_DIR/*` with `BACKUP_DIR` unset becomes `rm -rf /*`. `set -u` (or `set -euo pipefail` at the top of a script) makes the shell stop instead.
- **Filenames are attacker-controlled input.** A file named `-rf`, or one containing spaces or a newline, changes what a loop or a glob does. Use `--` to end options (`rm -- *`) and prefer `find -print0 | xargs -0` for bulk operations.
- **Globs match what exists now.** A `*` in a cron job or a cleanup script picks up whatever an attacker has dropped into that directory since you wrote it. Be specific, and be careful about running scripts from world-writable directories.
- **Secrets on the command line are visible.** Anything after expansion appears in the process list (`ps`) and in shell history. Pass secrets through environment variables read from a protected file, or via stdin — never as an argument.
- **Preview before destroying.** `echo rm *` costs one second and has saved a great many systems. In shared or production environments, treat it as procedure rather than habit.

## Summary

- The shell **expands** your line before the program runs; the program never sees `*`, `~`, `$var` or `$(cmd)`.
- **Pathname expansion** (`*`, `?`, `[abc]`, `[!abc]`, `[[:class:]]`) matches existing filenames only, sorts as text, ignores hidden files, and leaves a non-matching pattern unchanged.
- **Tilde expansion:** `~` is your home, `~user` is theirs, and an unknown username stays as literal text.
- **Arithmetic expansion** `$(( ))` is integers only — division truncates and division by zero is an error.
- **Parameter expansion** `$var` / `${var}` substitutes a value, and an unset name silently becomes an empty string.
- **Command expansion** `$(cmd)` substitutes a command's output; prefer it to backticks.
- **Double quotes** stop globbing and word splitting but still allow `$var`, `$(( ))` and `$( )`; **single quotes** stop everything and cannot contain a single quote; **backslash** escapes one character, and sequences like `\n` and `\t` need `printf` or `echo -e`.
- Always quote variables. Always preview a destructive glob with `echo` first.

## Glossary

| Term | Meaning |
|---|---|
| Expansion | The shell replacing text with something else before running a command |
| Pathname expansion | Replacing a pattern with matching filenames; also called globbing |
| Glob | A filename pattern using `*`, `?` or `[ ]` |
| Character class | A named set such as `[[:digit:]]` or `[[:alpha:]]` |
| Tilde expansion | `~` becoming a home directory path |
| Arithmetic expansion | `$((expr))` evaluating an integer expression |
| Parameter expansion | `$name` or `${name}` becoming a variable's value |
| Command substitution | `$(cmd)` becoming a command's output |
| Backtick | The older `` ` `` form of command substitution |
| Word splitting | The shell breaking an unquoted result into separate arguments at whitespace |
| Double quotes | Suppress globbing and word splitting; allow `$`, `$(( ))` and `$( )` |
| Single quotes | Suppress every expansion; everything inside is literal |
| Escape | A backslash making the next single character literal |
| Escape sequence | `\n`, `\t` and similar, standing for characters you cannot type |
| Environment variable | A named value the shell passes to the programs it runs |
| `set -u` | Shell option that makes an unset variable an error instead of an empty string |

## Review questions

1. What does the shell do to your command line before the program runs?
2. How do you safely see what a pattern will match before deleting anything?
3. Why does `echo *` not list hidden files?
4. In a directory containing `data1`, `data2` and `data10`, what does `data?` match, and why?
5. What happens when a glob matches nothing?
6. What does `~jsmith` expand to if no user `jsmith` exists?
7. What is the result of `echo $((7 / 2))`, and why?
8. Why does `echo $foos` print nothing when `foo=bar`, and how do you fix it?
9. What happens when you expand a variable that was never set?
10. Name the three expansions that still work inside double quotes.
11. Why does `echo "The total is $100.00"` print the wrong thing?
12. Why can't a single-quoted string contain a single quote?
13. What is the difference between `echo "a\tb"` and `printf "a\tb\n"`?
14. **Scenario:** `ls -l $file` fails with two "No such file" errors, but the file is definitely there. What is wrong?
15. **Scenario:** a cleanup script runs `rm -rf $TMPDIR/*` and has just wiped a server. Explain what happened and how to prevent it.
16. **Scenario:** you need `grep` to find the literal text `$100.00`. What do you type, and why?

## Answer key

1. **It expands it** — pathname, tilde, arithmetic, parameter and command expansion — then runs the resulting command. The program never sees the original characters.
2. **Put `echo` (or `ls`) in front of the command** and read the expanded list before running the real one.
3. **Globs do not match names beginning with a dot** unless the pattern itself starts with one.
4. **`data1` and `data2` only.** `?` matches exactly one character, and `data10` has two after `data`.
5. **Bash leaves the pattern unchanged** by default, so the program receives the literal text.
6. **It stays as the literal text `~jsmith`** — no error, which makes the typo easy to miss.
7. **3.** Arithmetic expansion is integers only and division truncates towards zero.
8. **The shell looks for a variable called `foos`,** which is unset. Use `${foo}s` to mark where the name ends.
9. **It expands to an empty string, with no error.** `set -u` makes it an error instead.
10. **Parameter expansion, arithmetic expansion and command substitution.**
11. **`$1` is a parameter expansion** and expands to nothing, leaving `00.00`. Use `\$` or single quotes.
12. **There is no escaping inside single quotes** — a backslash is literal there. Use `'it'\''s'` or double quotes.
13. **`echo` prints `a\tb` literally** unless given `-e`; `printf` interprets `\t` as a tab and behaves consistently across systems.
14. **The filename contains spaces and the variable is unquoted,** so word splitting handed `ls` two names. Use `ls -l "$file"`.
15. **`TMPDIR` was unset, so `$TMPDIR/*` expanded to `/*`.** Prevent it with `set -u`, and by checking the variable is non-empty before using it in a destructive command.
16. **`grep -F '$100.00' file`,** or `grep '\$100\.00' file`. Single quotes stop the shell expanding `$1`, and `-F` (or escaping) stops `grep` treating `$` and `.` as regular-expression characters.
