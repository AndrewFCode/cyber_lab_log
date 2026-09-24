---
title: "The Linux Command Line 7: Seeing the World as the Shell Sees It"
description: "TLCL chapter 7 — pathname, tilde, arithmetic, parameter and command expansion, plus double quotes, single quotes and backslash escaping."
tags: ["linux", "bash", "shell", "expansion", "quoting", "globbing", "command-line"]
draft: false
updated: "2026-09-24"
kind: "resource"
resource: "linux"
module: "Ch. 7"
moduleOrder: 58
unit: 7
---

> **In one line:** the shell expands your line before the program runs — globs, `~`, `$var`, `$(( ))` and `$( )` are all gone by the time the command starts — and quoting is how you decide which of those expansions happen.

*Companion to: Shotts, The Linux Command Line (2nd ed.), chapter 7.* The full version is the Seeing the World as the Shell Sees It class notes; the section overview is the Linux chapter 7 sheet.

---

## Preview everything

```bash
echo rm *.log        # read the expanded list, THEN run it for real
ls -l *.log          # even better for destructive work: sizes and dates too
```

The program never sees `*` — it receives a finished list of filenames and cannot warn you.

## The five expansions

| Expansion | Form | Produces |
|---|---|---|
| Pathname (globbing) | `*` `?` `[abc]` `[!abc]` `[[:digit:]]` | Names of **existing** files, sorted as text |
| Tilde | `~` · `~user` | A home directory path |
| Arithmetic | `$((2 + 2))` | An **integer** result |
| Parameter | `$var` · `${var}` | A variable's value (empty if unset) |
| Command | `$(cmd)` · `` `cmd` `` | The command's **output** |

## Pathname expansion

| Pattern | Matches (dir: `Makefile a.txt b.txt c.log data1 data2 data10 .hidden`) |
|---|---|
| `*` | `Makefile a.txt b.txt c.log data1 data10 data2` |
| `*.txt` | `a.txt b.txt` |
| `[ab].txt` | `a.txt b.txt` |
| `data?` | `data1 data2` — `data10` has two chars after `data` |

- **Hidden files are excluded** — `.hidden` isn't in `*`. Need a pattern starting with a dot.
- **Sorted as text, not numbers** — `data10` comes between `data1` and `data2`.
- **No match = pattern passed through literally.** That's how you get a file called `*.xyz`.
- **Brace expansion** generates text rather than matching files: `{A,B}-{1,2}` → `A-1 A-2 B-1 B-2` · `{01..05}` → `01 02 03 04 05` · `mkdir -p proj/{src,docs,tests}`.

## Tilde, arithmetic, parameter, command

| Written | Result |
|---|---|
| `~` / `~root` | `/root` (that user's home) |
| `~nosuchuser` | **Unchanged literal text** — no error |
| `$((5/2))` `$((5%2))` `$((2**10))` | `2` `1` `1024` |
| `$((7/2))` `$((-7/2))` | `3` `-3` — truncates toward zero, **integers only** |
| `$((1/0))` | Error, not infinity |
| `${foo}s` with `foo=bar` | `bars` — braces mark where the name ends |
| `$nosuch` | **Empty string, silently** |
| `$(uname -r)` | The command's output |

Expansions nest: `$(( $(echo 3) + 4 ))` → `7`. For decimals use `bc -l`, not `$(( ))`.

## Quoting

| Form | Globbing | Word splitting | `$var` `$(( ))` `$( )` |
|---|---|---|---|
| Unquoted | Yes | Yes | Yes |
| `"double"` | No | No | **Yes** |
| `'single'` | No | No | No |
| `\c` | Next char literal | — | — |

```bash
echo this is a    test        # this is a test        (spaces collapse)
echo "this is a    test"      # this is a    test     (preserved)
echo "$HOME $((2+2)) $(echo hi)"   # /root 4 hi
echo '$HOME $((2+2)) $(echo hi) *' # all literal
```

- **Always quote variables.** With `f="two words.txt"`, `ls -l $f` gives two "No such file" errors; `ls -l "$f"` works.
- **Quote command substitution to keep newlines:** `echo "$(cat f.txt)"` keeps the line break; unquoted collapses it to one line.
- **`$` still bites inside double quotes:** `echo "The total is $100.00"` prints `The total is 00.00` (`$1` is empty).
- **Single quotes can't contain a single quote** — no escaping inside them. Use `'it'\''s'` or double quotes.
- Use single quotes for `grep` / `sed` / `awk` patterns and anything with `$` or `*` meant literally.

## Escaping and escape sequences

```bash
echo \*                       # a literal asterisk
echo "Its cost \$100"         # Its cost $100
mv two\ words.txt renamed.txt
grep "Failed password" auth.log | \
  sort | uniq -c              # backslash-newline wraps a long command
```

Inside double quotes, `\` escapes only `$`, `` ` ``, `"` and `\`; elsewhere it stays literal (`"hello\\there"` → `hello\there`).

| Sequence | Meaning |
|---|---|
| `\n` `\t` | Newline · tab |
| `\\` | Literal backslash |
| `\a` `\b` `\r` | Bell · backspace · carriage return |
| `\0nnn` | Character with octal value `nnn` |

Plain `echo` doesn't interpret these — use `printf "a\tb\n"` (portable) or `echo -e`.

## 🔐 Security notes

- **Unquoted variables are shell injection.** Values from filenames, logs or forms get word-split and globbed. Always `"$var"`.
- **`$(...)` executes.** Never build a command string from untrusted input — pass it as a quoted argument.
- **Unset = empty, silently.** `rm -rf $BACKUP_DIR/*` with the variable unset becomes `rm -rf /*`. Use `set -euo pipefail`.
- **Filenames are attacker input:** a file named `-rf`, or with spaces or newlines, changes what a loop does. Use `--` and `find -print0 | xargs -0`.
- **Globs match what exists now** — a cleanup script's `*` picks up whatever was dropped there since.
- **Secrets on the command line show in `ps` and history.** Pass via a protected file or stdin.

## Practice drills

<details>
<summary>1. Why doesn't `echo *` show hidden files?</summary>

Globs don't match names starting with a dot unless the pattern starts with one.
</details>

<details>
<summary>2. `data1`, `data2`, `data10` — what does `data?` match?</summary>

**`data1` and `data2` only.** `?` matches exactly one character.
</details>

<details>
<summary>3. What does `echo $((7 / 2))` print?</summary>

**3.** Integer arithmetic only — division truncates toward zero.
</details>

<details>
<summary>4. `foo=bar`; why does `echo $foos` print nothing?</summary>

The shell looks for a variable named `foos`, which is unset (and unset means **empty, no error**). Use `${foo}s`.
</details>

<details>
<summary>5. Which expansions survive double quotes?</summary>

**Parameter (`$var`), arithmetic (`$(( ))`) and command substitution (`$( )`).** Globbing and word splitting don't.
</details>

<details>
<summary>6. `ls -l $file` gives two "No such file" errors but the file exists. Why?</summary>

The filename has a space and the variable is unquoted — word splitting made it two arguments. Use `"$file"`.
</details>

<details>
<summary>7. Why does `echo "The total is $100.00"` print `The total is 00.00`?</summary>

`$1` is a parameter expansion and is empty. Use `\$` or single quotes.
</details>

<details>
<summary>8. How do you grep for the literal `$100.00`?</summary>

`grep -F '$100.00' file` — single quotes stop the shell, `-F` stops `grep` treating `$` and `.` as regex.
</details>

## Key takeaways

- The shell expands first; the program never sees `*`, `~`, `$var` or `$(cmd)`.
- Globs match **existing** files only, skip dotfiles, sort as text, and pass through unchanged on no match.
- `$(( ))` is integers only; `$var` unset is silently empty; `$(cmd)` substitutes output.
- Double quotes block globbing and splitting but let `$` through; single quotes block everything.
- `echo rm *` before `rm *`, and quote every variable.
