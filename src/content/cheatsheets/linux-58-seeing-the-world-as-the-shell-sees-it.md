---
title: "Linux: Seeing the World as the Shell Sees It"
description: "The Linux Command Line ch. 7 — pathname, tilde, arithmetic, brace, parameter and command expansion, then double quotes, single quotes and escapes."
tags: ["linux", "bash", "the-linux-command-line"]
draft: false
updated: "2026-09-18"
kind: "resource"
resource: "linux"
module: "Ch. 7"
moduleOrder: 58
unit: 7
---
> **In one line:** bash rewrites your command before running it — expansion adds things, quoting stops it, and `echo` lets you watch.

*Companion to: William Shotts, The Linux Command Line, chapter 7.*

---

## Watch expansion happen

```bash
echo *          # not a literal star — bash replaces it with filenames first
```

The command never sees your `*`; it sees the list bash built. `echo` is the easiest way to preview any expansion.

---

## The expansions

| Expansion | Example | Result |
|---|---|---|
| Pathname | `echo D*` | Files starting with `D` |
| Pathname (hidden) | `echo .[!.]*` | Dotfiles, without `.` and `..` (or use `ls -A`) |
| Tilde | `echo ~` / `echo ~alice` | `/home/andrew` / `/home/alice` |
| Arithmetic | `echo $((2 + 2))` | `4` |
| Brace | `echo Front-{A,B,C}-Back` | `Front-A-Back Front-B-Back Front-C-Back` |
| Brace range | `echo {1..5}` / `{Z..A}` / `{01..15}` | Numbers, letters in reverse, zero-padded (bash 4+) |
| Brace, nested | `echo a{A{1,2},B{3,4}}b` | `aA1b aA2b aB3b aB4b` |
| Parameter | `echo $USER` | Your username |
| Command substitution | `echo $(ls)` or `` echo `ls` `` | The command's output, inserted in place |

### Arithmetic operators

| Operator | Meaning | Example → result |
|---|---|---|
| `+` `-` | Add, subtract | `$((7 - 2))` → `5` |
| `*` | Multiply | `$((6 * 7))` → `42` |
| `/` | Integer division | `$((5 / 2))` → `2` |
| `%` | Remainder | `$((5 % 2))` → `1` |
| `**` | Power | `$((2 ** 10))` → `1024` |

Integers only; nest freely: `$(($((5**2)) * 3))` → `75`.

### Real uses

```bash
mkdir {2025..2026}-{01..12}          # 24 month folders, sorted correctly
cp config.yml{,.bak}                 # = cp config.yml config.yml.bak
ls -l $(which cp)                    # long listing of wherever cp lives
file $(ls -d /usr/bin/* | grep zip)  # identify every zip-related program
printenv | less                      # every environment variable
```

A misspelt variable expands to **nothing**, silently: `echo $SUER` prints a blank line.

### Order bash applies them

1. Brace expansion
2. Tilde, parameter, arithmetic and command substitution (left to right)
3. Word splitting
4. Pathname expansion
5. Quote removal

---

## Quoting

| Form | Suppresses | Still works |
|---|---|---|
| `"double quotes"` | Word splitting, pathname (`*`), tilde (`~`), brace (`{}`) | `$VAR`, `$((...))`, `$(...)`, and `\` escapes |
| `'single quotes'` | **Everything** | Nothing — completely literal |
| `\` | The one character after it | — |

### Word splitting

Unquoted, spaces, tabs and newlines just separate words.

```bash
echo this is a    test        # this is a test   — extra spaces vanish
echo "this is a    test"      # spacing kept
echo $(cal)                   # calendar flattened onto one line
echo "$(cal)"                 # calendar keeps its layout
```

### Side by side

```bash
echo text ~/*.txt {a,b} $(echo foo) $((2+2)) $USER
# text /home/andrew/notes.txt a b foo 4 andrew

echo "text ~/*.txt {a,b} $(echo foo) $((2+2)) $USER"
# text ~/*.txt {a,b} foo 4 andrew

echo 'text ~/*.txt {a,b} $(echo foo) $((2+2)) $USER'
# text ~/*.txt {a,b} $(echo foo) $((2+2)) $USER
```

### Escaping

```bash
echo "The balance is \$5.00"      # literal $
mv bad\&filename good_filename    # escape a special character in a name
mv "my file.txt" my_file.txt      # or just quote it
```

### Backslash escape sequences

| Sequence | Means |
|---|---|
| `\a` | Bell (beep) |
| `\b` | Backspace |
| `\n` | Newline |
| `\r` | Carriage return |
| `\t` | Tab |

These need `echo -e "a\tb"` or bash's `$'a\tb'` form. Example: `sleep 10; echo -e "Time's up\a"`.

---

## 🔐 Security notes

- **Always quote variables: `"$var"`.** Unquoted, a variable goes through word splitting and pathname expansion.
  - If `file="old logs *"`, then `rm $file` deletes `old`, `logs` **and every file in the folder**.
  - `rm "$file"` deletes exactly one thing.
- **Command substitution is how shell injection works.** If untrusted input ends up inside a command line, `$(...)` or backticks in that input will run. Never build commands by gluing user input into strings.
- **Preview dangerous wildcards with `echo`.** `echo rm *.bak` shows exactly what would be deleted, without deleting it.

---

## Practice drills

<details>
<summary>1. Create folders <code>day01</code> to <code>day31</code> in one command.</summary>

`mkdir day{01..31}`
</details>

<details>
<summary>2. What does <code>echo $((17 / 5)) $((17 % 5))</code> print?</summary>

`3 2` — integer division, then remainder.
</details>

<details>
<summary>3. Print the literal text <code>$HOME</code>, then the value of <code>$HOME</code>.</summary>

`echo '$HOME'` then `echo "$HOME"` (or `echo \$HOME`, then `echo $HOME`).
</details>

<details>
<summary>4. Make a backup copy of <code>sshd_config</code> with <code>.bak</code> on the end, typing the name once.</summary>

`cp sshd_config{,.bak}`
</details>

<details>
<summary>5. See exactly which files <code>rm *.log</code> would remove, without removing them.</summary>

`echo rm *.log`
</details>

---

## Key takeaways

- Bash expands pathnames, `~`, `$(( ))`, `{ }`, `$VAR` and `$( )` before the command runs — `echo` shows you the result.
- Double quotes stop splitting, wildcards, tilde and braces, but keep `$` expansions; single quotes stop everything; `\` escapes one character.
- Quote your variables, and never paste untrusted input into a command line.
