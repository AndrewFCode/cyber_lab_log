---
title: "Linux: Manipulating Files and Directories"
description: "The Linux Command Line ch. 4 — wildcards and character classes, mkdir, cp, mv and rm with their key options, and hard vs symbolic links."
tags: ["linux", "bash", "the-linux-command-line"]
draft: false
updated: "2026-09-18"
kind: "resource"
resource: "linux"
module: "Ch. 4"
moduleOrder: 55
unit: 4
---
> **In one line:** five commands — `mkdir`, `cp`, `mv`, `rm`, `ln` — plus wildcards, which is where the command line leaves the file manager behind.

*Companion to: William Shotts, The Linux Command Line, chapter 4.*

---

## Wildcards

| Pattern | Matches |
|---|---|
| `*` | Any characters (including none) |
| `?` | Exactly one character |
| `[abc]` | One character from the set |
| `[!abc]` | One character *not* in the set |
| `[[:class:]]` | One character from a class (below) |

| Class | Matches |
|---|---|
| `[:alnum:]` | Letters and digits |
| `[:alpha:]` | Letters |
| `[:digit:]` | Digits |
| `[:lower:]` | Lowercase letters |
| `[:upper:]` | Uppercase letters |

| Example | Matches |
|---|---|
| `*` | Every file (except hidden ones) |
| `g*` | Names starting with `g` |
| `b*.txt` | Starting with `b`, ending `.txt` |
| `Data???` | `Data` plus exactly three characters |
| `[abc]*` | Starting with `a`, `b` or `c` |
| `backup.[0-9][0-9][0-9]` | `backup.` plus three digits |
| `[[:upper:]]*` | Starting with a capital |
| `[![:digit:]]*` | Not starting with a digit |
| `*[[:lower:]123]` | Ending in a lowercase letter or `1`, `2`, `3` |

- **Prefer classes over ranges.** `[A-Z]` can match lowercase letters in some locales; `[[:upper:]]` can't.
- **`*` skips hidden files.** Dotfiles need an explicit pattern like `.[!.]*`.

---

## Creating: `mkdir`

```bash
mkdir lab                  # one directory
mkdir lab1 lab2 lab3       # several
mkdir -p lab/logs/2026     # create missing parents too
```

---

## Copying, moving, deleting

| Form | Does |
|---|---|
| `cp file1 file2` | Copy `file1` to `file2` (overwrites `file2` silently) |
| `cp file1 file2 dir/` | Copy several files into a directory |
| `cp -r dir1 dir2` | Copy a directory tree |
| `mv file1 file2` | Rename (or overwrite `file2`) |
| `mv file1 file2 dir/` | Move files into a directory |
| `rm file` | Delete a file — **no recycle bin** |
| `rm -r dir` | Delete a directory and everything in it |

| Option | `cp` | `mv` | `rm` |
|---|---|---|---|
| `-i` | Ask before overwriting | Ask before overwriting | Ask before each delete |
| `-r` | Recurse into directories | — | Recurse into directories |
| `-u` | Only copy newer or missing files | Only move newer or missing files | — |
| `-v` | Show what's happening | Show what's happening | Show what's happening |
| `-a` | Archive: recursive, keeps owners, permissions and timestamps | — | — |
| `-f` | — | — | Force — never prompt, ignore missing files |

```bash
cp -u *.html /var/www/site/     # copy only html files that are new or changed
mv -i report.txt archive/       # confirm before clobbering
rm -iv *.tmp                    # check each delete
```

### The `rm` safety routine

1. Write the wildcard with `ls` first: `ls *.tmp`.
2. Check the list.
3. Press `↑` and replace `ls` with `rm`.

Classic disaster: `rm * .html` — the stray space means "delete everything, then `.html`".

---

## Links: `ln`

```bash
ln file hardlink            # hard link
ln -s target symlink        # symbolic (soft) link
ls -li                      # -i shows inode numbers
```

| | Hard link | Symbolic link |
|---|---|---|
| What it is | A second name for the same data (same inode) | A small file pointing to a path |
| Directories | ❌ | ✅ |
| Across filesystems | ❌ | ✅ |
| Delete the original | Data survives while any link exists | Link breaks ("dangling"), shown in red by most `ls` colour schemes |
| How to spot it | Link count > 1 in `ls -l`; same inode in `ls -li` | Type `l` and `name -> target` in `ls -l` |

- **Symlinks can be absolute or relative.** Relative targets (`ln -s ../shared/config config`) keep working if the whole folder moves.
- **Symlinks are everywhere.** They're how a system points `/bin` at `/usr/bin`, or `python3` at a specific version.

---

## 🔐 Security notes

- **`/tmp` symlink attacks.** An attacker who can predict a filename a privileged program will write in `/tmp` can plant a symlink there pointing at, say, `/etc/passwd`. Well-written tools use unpredictable temp names — which is why `mktemp` exists.
- **Preserve evidence with `cp -a`.** A plain `cp` resets ownership and timestamps to "now". `cp -a` keeps owners, permissions and timestamps.
- **Wildcards in root's hands:**
  - `sudo rm -rf` plus a wildcard or empty variable is how systems get wiped. Run the `ls` check first.
  - Never use `rm -rf /` or `rm -rf ~` shapes — even "as a test".
- **Filenames can be traps.** A file named `-rf` or `--help` gets read as an option. Use `rm -- -rf` or `rm ./-rf`.

---

## Practice drills

<details>
<summary>1. Copy every <code>.log</code> file in the current folder that's newer than the copy in <code>~/backup</code>.</summary>

`cp -u *.log ~/backup/`
</details>

<details>
<summary>2. Make <code>lab/2026/logs</code> in one command when none of it exists.</summary>

`mkdir -p lab/2026/logs`
</details>

<details>
<summary>3. List files whose names start with a digit and end in <code>.txt</code>.</summary>

`ls [[:digit:]]*.txt`
</details>

<details>
<summary>4. Why can't you hard-link a directory, and what do you use instead?</summary>

Hard links to directories aren't allowed — use a symbolic link: `ln -s target linkname`.
</details>

<details>
<summary>5. Copy a suspicious folder for analysis without changing its timestamps.</summary>

`cp -a suspicious/ /evidence/suspicious-copy/`
</details>

<details>
<summary>6. Delete a file literally named <code>-f</code>.</summary>

`rm -- -f` or `rm ./-f`
</details>

---

## Key takeaways

- Wildcards (`*`, `?`, `[ ]`, `[[:class:]]`) are the CLI's superpower — test them with `ls` before `rm`.
- `cp` / `mv` / `rm`: `-i` to ask, `-r` for directories, `-u` for only-newer, `-v` to watch, `cp -a` to preserve.
- `rm` is permanent.
- Hard links share an inode, can't span filesystems and can't point at directories; symlinks point to a path and can break.
