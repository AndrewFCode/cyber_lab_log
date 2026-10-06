---
title: "The Linux Command Line 9: Permissions"
description: "TLCL ch. 9 — users/groups/other, read/write/execute, chmod, umask, special permissions, su/sudo, chown/chgrp, and passwd."
tags: ["linux", "bash", "shell", "command-line", "linux-permissions", "chmod", "sudo", "umask", "chown"]
draft: false
updated: "2026-09-27"
kind: "resource"
resource: "linux"
module: "Ch. 9"
moduleOrder: 60
unit: 9
---

> **Drafted from general knowledge:** the source was the chapter's heading list with an instruction to draft from general knowledge, not a transcript. One heading ("chgrp — Set Default Permissions") looked like a copy/paste error — chgrp actually changes group ownership; umask sets default permissions. Corrected below; verify against your own copy of Shotts's book.


> **In one line:** permissions apply separately to user/group/other as r/w/x, set via chmod (symbolic or octal) with defaults from umask, plus special bits (setuid/setgid/sticky), and identity changes via su/sudo/chown/chgrp/passwd.

*Companion to: The Linux Command Line (3rd ed.), William Shotts, Chapter 9.* The full version is the Permissions class notes; the chapter overview is The Linux Command Line resource sheet.

## The rwx model

| | On a file | On a directory |
| --- | --- | --- |
| **r** | View contents | List contents |
| **w** | Modify contents | Create/delete/rename entries |
| **x** | Run as a program | Enter (traverse into) |

```
-rwxr-xr--
| |   |  |
| |   |  +-- other: r--
| |   +----- group: r-x
| +--------- owner: rwx
+----------- file type
```

## chmod

```bash
chmod u+x script.sh     # symbolic: who(u/g/o/a) +/-/= what(r/w/x)
chmod 755 script.sh     # octal: 4=r 2=w 1=x, one digit per u/g/o
```

| Octal | rwx |
| --- | --- |
| 7 | rwx |
| 6 | rw- |
| 5 | r-x |
| 4 | r-- |
| 0 | --- |

GUI file managers expose the same model via a Properties/Permissions tab.

## umask

Subtracts from **666** (files) / **777** (dirs). Common default **022**:

```
666 - 022 = 644 (rw-r--r--)     777 - 022 = 755 (rwxr-xr-x)
```

`umask` shows/sets it; e.g. `umask 077` for stricter defaults.

## Special permissions

| Bit | Octal | On a file | On a directory |
| --- | --- | --- | --- |
| Setuid | 4000 | Runs as the **owner** | — |
| Setgid | 2000 | Runs as the **group** | New files **inherit the directory's group** |
| Sticky | 1000 | — | Only the file's **own owner** can delete it |

```bash
chmod u+s program   # setuid
chmod g+s shared/   # setgid
chmod +t /tmp       # sticky bit
```

## Changing identities

| Command | Does |
| --- | --- |
| `su [user]` | Starts a **shell** as another user (own session until exit) |
| `sudo cmd` | Runs **one command** as another user (checks *your* password + sudoers) |
| `chown user:group file` | Changes **owner** (and optionally group) |
| `chgrp group file` | Changes **group only** |
| `passwd [user]` | Changes a password; classic setuid-root example |

## 🔐 Security notes

- **World-writable files/dirs** = any user can edit them — a privilege-escalation path if a root-run script is writable by others.
- **Setuid/setgid binaries are prime targets:** a flaw in a setuid-root program can grant any user root. Minimise how many exist; investigate unfamiliar ones.
- **A broad sudoers entry can still equal full root** (e.g. a command that can spawn a shell or edit arbitrary files) — scope tightly.
- **Long-lived `su` root shells are a bigger blast radius than per-command `sudo`** — a mis-pasted command runs with full privilege either way, but sudo requires a deliberate prefix each time.
- **chown/chgrp/passwd changes are audit-worthy** — unexpected ownership or password changes are classic compromise indicators.

## Practice drills

<details>
<summary>1. What do r, w, x mean on a directory (not a file)?</summary>

r = list contents; w = create/delete/rename entries inside; x = enter (traverse into) the directory.
</details>

<details>
<summary>2. chmod command to add execute for group on deploy.sh?</summary>

chmod g+x deploy.sh
</details>

<details>
<summary>3. What does octal 640 mean in rwx?</summary>

Owner rw-, group r--, other ---.
</details>

<details>
<summary>4. What does a umask of 022 produce for new files and directories?</summary>

644 (rw-r--r--) for files, 755 (rwxr-xr-x) for directories.
</details>

<details>
<summary>5. Explain setuid using passwd as the example.</summary>

passwd is setuid root, so it runs with root's privileges regardless of who launches it, letting an ordinary user update the password database.
</details>

<details>
<summary>6. su vs sudo?</summary>

su starts a whole new shell as another user; sudo runs a single command as another user without a separate session.
</details>

<details>
<summary>7. chown vs chgrp?</summary>

chown changes the owner (and optionally group); chgrp changes only the group.
</details>

## Key takeaways

- **rwx applies per user/group/other**, with different meanings on files vs directories.
- **chmod** (symbolic or octal) sets permissions; **umask** sets new-file defaults (666/777 minus the mask).
- **Special bits:** setuid (run as owner), setgid (run as group / inherit group in a dir), sticky (owner-only delete).
- **su = new shell as another user; sudo = one command as another user**, checked against your own password + sudoers.
- **Security:** world-writable files, setuid binaries, and broad sudoers entries are the classic privilege-escalation risks.
