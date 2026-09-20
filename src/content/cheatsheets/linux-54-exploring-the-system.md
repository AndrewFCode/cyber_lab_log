---
title: "Linux: Exploring the System"
description: "The Linux Command Line ch. 3 — ls options and the long listing, command syntax, identifying files with file, paging with less, and a tour of the directory tree."
tags: ["linux", "bash", "the-linux-command-line"]
draft: false
updated: "2026-09-18"
kind: "resource"
resource: "linux"
module: "Ch. 3"
moduleOrder: 54
unit: 3
---
> **In one line:** `ls` to see, `file` to identify, `less` to read — then walk the directory tree until it stops being a mystery.

*Companion to: William Shotts, The Linux Command Line, chapter 3.*

---

## Command syntax

```
command  -options  arguments
ls       -lt       /etc /var/log
```

| Form | Example | Notes |
|---|---|---|
| Short option | `-l` | One dash, one letter; stack them: `-lt` = `-l -t` |
| Long option | `--reverse` | Two dashes, a word |
| Arguments | `/etc /var/log` | What the command acts on — several are allowed |

---

## `ls` options

| Short | Long | Does |
|---|---|---|
| `-a` | `--all` | Include hidden files |
| `-A` | `--almost-all` | Hidden files, minus `.` and `..` |
| `-d` | `--directory` | The directory itself, not its contents (pair with `-l`) |
| `-F` | `--classify` | Add `/` to directories, `*` to executables |
| `-h` | `--human-readable` | Sizes like `4.0K`, `12M` (with `-l`) |
| `-l` | — | Long listing |
| `-r` | `--reverse` | Reverse the sort order |
| `-S` | — | Sort by size |
| `-t` | — | Sort by modification time |

Useful combos: `ls -la` (everything) · `ls -lh` (readable sizes) · `ls -lt` (newest first) · `ls -ltr` (newest last).

### Reading the long listing

```
-rw-r--r-- 1 root root 3028 Aug 12 09:14 /etc/adduser.conf
```

| Field | Example | Meaning |
|---|---|---|
| Type + permissions | `-rw-r--r--` | `-` file, `d` directory, `l` symlink; then owner / group / others |
| Link count | `1` | Hard links to this file |
| Owner | `root` | User who owns it |
| Group | `root` | Group that owns it |
| Size | `3028` | Bytes |
| Modified | `Aug 12 09:14` | Last modification time |
| Name | `/etc/adduser.conf` | Symlinks show `name -> target` |

---

## Identify a file with `file`

```bash
file /etc/passwd          # ASCII text
file /usr/bin/ls          # ELF 64-bit LSB pie executable ...
file photo.jpg            # JPEG image data ...
```

`file` reads the file's **contents** (magic numbers), not its name. Extensions can lie; contents can't.

---

## Page through text with `less`

| Key | Does |
|---|---|
| `Space` / `Page Down` | Next page |
| `b` / `Page Up` | Previous page |
| `↑` / `↓` | One line |
| `G` / `g` | End / start of file |
| `/text` | Search forward |
| `n` | Next match |
| `h` | Help |
| `q` | Quit |

```bash
less /etc/passwd
```

---

## A tour of the tree

| Directory | Holds |
|---|---|
| `/` | Root of everything |
| `/bin` | Essential programs (on modern distros often a link into `/usr/bin`) |
| `/boot` | Kernel, initial RAM disk, bootloader |
| `/dev` | Device nodes — hardware presented as files |
| `/etc` | System-wide configuration, all plain text |
| `/home` | Normal users' home directories |
| `/lib` | Shared libraries used by core programs |
| `/lost+found` | Pieces recovered by filesystem repair |
| `/media` | Auto-mounted removable media (USB sticks) |
| `/mnt` | Manually mounted filesystems |
| `/opt` | Optional, usually third-party, software |
| `/proc` | A virtual window into the kernel and running processes — nothing here is on disk |
| `/root` | Root user's home |
| `/sbin` | System administration programs |
| `/tmp` | Temporary files — writable by everyone |
| `/usr` | Programs and data for users: `/usr/bin`, `/usr/lib`, `/usr/local`, `/usr/share` |
| `/usr/local` | Software installed locally rather than by the distro |
| `/usr/share/doc` | Package documentation |
| `/var` | Data that changes: logs, mail, caches, spools |
| `/var/log` | Log files |

| Worth knowing in `/etc` | Contains |
|---|---|
| `/etc/passwd` | User accounts |
| `/etc/fstab` | Filesystems mounted at boot |
| `/etc/crontab` | Scheduled jobs |
| `/etc/os-release` | Distribution name and version |

**Symbolic links** show up everywhere in these directories — `ls -l` shows them as `name -> target`. They let one file answer to several names (hard links are covered in [chapter 4](/resources/linux/4/)).

---

## 🔐 Security notes

- **Where to look first on a Linux box:**
  - Authentication: `/var/log/auth.log` (Debian/Ubuntu) or `/var/log/secure` (RHEL)
  - Persistence: `/etc/crontab` and `/etc/cron.*`
  - Drop zones: `/tmp` and `/dev/shm` — world-writable, favourites for dropped tools
- **`/proc` is live forensics.** For process `PID`:
  - `ls -l /proc/<PID>/exe` shows the program it's running, even if the file was deleted from disk.
  - `cat /proc/<PID>/cmdline` shows how it was started.
- **`file` beats the extension.** Run it on anything suspicious: an "invoice.pdf" that reports `ELF 64-bit` is a program.
- **Reading untrusted files:** `cat` can spray terminal control sequences at you. `less` shows control characters safely by default.

---

## Practice drills

<details>
<summary>1. List <code>/etc</code> with the newest files at the bottom, sizes human-readable.</summary>

`ls -lhtr /etc`
</details>

<details>
<summary>2. Show details of the <code>/var/log</code> directory itself, not its contents.</summary>

`ls -ld /var/log`
</details>

<details>
<summary>3. A file called <code>notes.txt</code> won't open in a text editor. How do you find out what it really is?</summary>

`file notes.txt`
</details>

<details>
<summary>4. In <code>less</code>, jump to the end of the file and search for "error".</summary>

`G`, then `/error`, then `n` for further matches.
</details>

<details>
<summary>5. Where would you look for the distro version, the boot kernel and the system logs?</summary>

`/etc/os-release`, `/boot`, `/var/log`.
</details>

---

## Key takeaways

- `command -options arguments`: short options stack (`-lt`), long options use `--`.
- `ls -la`, `ls -lh` and `ls -lt` cover most needs; learn to read every column of `-l`.
- `file` identifies by content; `less` reads safely (`q` quits, `/` searches).
- `/etc` config, `/var/log` logs, `/home` users, `/tmp` scratch, `/proc` live kernel view.
