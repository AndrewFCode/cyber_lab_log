---
title: "The Linux Command Line 9: Permissions — Class Notes"
description: "Full class notes for TLCL ch. 9: users/groups/other, read/write/execute, chmod, umask, special permissions, su/sudo, chown/chgrp, and passwd."
tags: ["class-notes", "linux", "linux-permissions", "chmod", "sudo", "umask", "chown"]
draft: false
pubDate: 2026-09-27
---

> **How these notes were made:** the material supplied for this lesson was the
> chapter's own **heading list** — "Users, Groups, Members, and Everybody
> Else", "Reading, Writing, and Executing", "chmod", "umask", "Some Special
> Permissions", "Changing Identities" (su, sudo, chown, chgrp), "Executing Our
> Privileges", "Changing Your Password" — with an explicit instruction to
> draft the content from general knowledge rather than a transcript. These
> notes follow that structure, but the explanations are written from general
> knowledge of standard **Linux/Unix permissions**, **not** reproduced or
> paraphrased from William Shotts's actual book text, which was not supplied.
>
> **One heading is corrected below.** The supplied list has "`chgrp` — Set
> Default Permissions", but `chgrp` actually **changes a file's group
> ownership** — setting *default* permissions is `umask`'s job, already
> covered earlier in the same list. This looks like a copy/paste slip in the
> source heading list rather than an intentional description, so `chgrp` is
> explained correctly below rather than under that mislabel. Worth checking
> against your own copy of the chapter either way.


**Class notes · The Linux Command Line (3rd ed.), William Shotts · Chapter 9**

> **Quick reference:** the short version of this lesson lives in the
> [The Linux Command Line resource sheets](/cyber_lab_log/resources/linux/9/). This follows
> Chapter 8 (Advanced Keyboard Tricks) and moves from *typing* commands
> efficiently to one of the most important things those commands control:
> **who is allowed to do what** to a file.

## Learning objectives

By the end of these notes you should be able to:

1. Explain the owner/group/other model and how Linux identifies users and
   groups.
2. Read and interpret file permission strings, including for directories.
3. Use `chmod` in both symbolic and octal (numeric) form.
4. Explain `umask` and how it sets default permissions.
5. Explain the special permission bits: setuid, setgid, and the sticky bit.
6. Distinguish `su` from `sudo`, and use `chown` and `chgrp` correctly.
7. Explain the responsibility that comes with elevated privileges, and change
   a password with `passwd`.

## 1. Users, groups, members, and everybody else

Every file on a Linux system has an **owner** — the user account that created
it (or was assigned ownership) — and belongs to a **group**. Linux permissions
are built around three categories of "who":

- **User (owner)** — the specific account that owns the file.
- **Group** — any account that is a **member** of the file's group.
- **Other** — everybody else on the system.

Every one of a file's permissions is expressed separately for each of these
three categories, which is why permission strings always come in sets of
three.

## 2. Reading, writing, and executing

For each of user/group/other, three permission bits can be set:

| Permission | On a file | On a directory |
| --- | --- | --- |
| **r** (read) | View the file's contents | List the directory's contents |
| **w** (write) | Modify the file's contents | Create, delete or rename entries **inside** the directory |
| **x** (execute) | Run the file as a program/script | **Enter** (traverse into) the directory |

> **Exam tip:** the directory meaning of each letter is a common trip-up. You
> can `ls` a directory you can read but not execute (you'd see filenames but
> couldn't `cd` into it or access anything inside), and you can `cd` into a
> directory you can execute but not read (you could access files by exact
> name, but not list what's there).

Running `ls -l` shows this as a ten-character string, for example:

```text
-rwxr-xr--  1 alice  staff  1234 Jan 10 09:00 script.sh
```

```
Reading a permission string:

  -  rwx  r-x  r--
  |   |    |    |
  |   |    |    +-- other:  read only
  |   |    +------- group:  read + execute
  |   +------------ user (owner): read + write + execute
  +---------------- file type (- = regular file, d = directory)
```

## 3. chmod — change file mode

`chmod` changes a file's permissions, in two notations.

### 3.1 Symbolic notation

Symbolic notation names **who** (`u` user, `g` group, `o` other, `a` all),
an **operator** (`+` add, `-` remove, `=` set exactly), and **what**
(`r`, `w`, `x`):

```bash
chmod u+x script.sh        # add execute for the owner
chmod g-w report.txt       # remove write for the group
chmod o=r notes.txt        # set "other" to read only, nothing else
chmod a+r public.txt       # add read for everyone
```

### 3.2 Octal (numeric) notation

Octal notation represents each category's permissions as a single digit,
adding the values **4** (read), **2** (write), **1** (execute):

| Digit | Meaning |
| --- | --- |
| 7 | rwx (4+2+1) |
| 6 | rw- (4+2) |
| 5 | r-x (4+1) |
| 4 | r-- (4) |
| 0 | --- |

A full command gives three digits, one per user/group/other:

```bash
chmod 755 script.sh   # rwxr-xr-x — owner full, group/other read+execute
chmod 644 notes.txt   # rw-r--r-- — owner read/write, group/other read only
chmod 600 secret.key  # rw------- — owner only, nothing for anyone else
```

### 3.3 Setting file mode with the GUI

Most desktop Linux file managers expose the same permission model through a
**Properties** dialog — typically a "Permissions" tab with checkboxes or
dropdowns for owner/group/other read/write/execute, doing exactly what
`chmod` does from the command line, just with a graphical interface.

## 4. umask — set default permissions

New files and directories do not start out with every permission bit set —
their starting permissions are governed by the **umask** (user file-creation
mask). The umask is **subtracted** from a maximum starting point: **666**
(rw-rw-rw-) for new files, and **777** (rwxrwxrwx) for new directories.

A common default umask is **022**, which removes write permission for group
and other:

```text
File default:      666  (rw-rw-rw-)
umask:            - 022
Result:             644  (rw-r--r--)

Directory default:  777  (rwxrwxrwx)
umask:             - 022
Result:              755  (rwxr-xr-x)
```

You can view or set the current umask with the `umask` command:

```bash
umask
0022

umask 077   # a stricter default: only the owner gets any access
```

## 5. Some special permissions

Beyond the standard read/write/execute bits, three special permission bits
exist:

- **Setuid** (set user ID, octal `4000`): on an **executable**, causes it to
  run with the privileges of the file's **owner**, not the user who ran it.
  Classic example: `passwd` is setuid root, so an ordinary user can update
  the system's password database even though only root normally can.
- **Setgid** (set group ID, octal `2000`): on an executable, runs with the
  privileges of the file's **group**. On a **directory**, causes new files
  created inside it to **inherit the directory's group** automatically,
  rather than the creating user's primary group.
- **Sticky bit** (octal `1000`): on a directory, restricts **deletion** —
  even if a user has write permission to the directory, they can only delete
  or rename files they **themselves own**. The classic example is `/tmp`,
  where everyone can create files, but nobody can delete someone else's.

```bash
chmod u+s program       # set setuid
chmod g+s shared_dir    # set setgid on a directory
chmod +t /tmp           # set the sticky bit
```

> **Note (beyond this lesson):** an `ls -l` listing shows these visually —
> setuid appears as an `s` in the owner's execute position, setgid as an `s`
> in the group's execute position, and the sticky bit as a `t` in the other
> execute position (lowercase if the underlying execute bit is also set,
> uppercase if not).

## 6. Changing identities

### 6.1 su — run a shell with substitute user and group IDs

`su` starts a new shell running **as another user** — commonly root, if run
with no username:

```bash
su          # switch to root (prompts for root's password)
su alice    # switch to the user "alice" (prompts for alice's password)
```

Once you exit that shell, you return to your original session.

### 6.2 sudo — execute a command as another user

`sudo` runs a **single command** with another user's privileges — again,
usually root — without starting a whole separate login session:

```bash
sudo apt update
```

`sudo` checks the invoking user's **own** password (not root's), and only
permits it if that user is listed (directly or via group membership) in the
system's `sudoers` configuration as authorised to run that command.

### 6.3 chown — change file owner and group

`chown` changes a file's **owner**, and optionally its **group** at the same
time:

```bash
chown alice file.txt          # change owner to alice
chown alice:staff file.txt    # change owner to alice, group to staff
chown :staff file.txt         # change only the group, owner unchanged
```

### 6.4 chgrp — change group ownership

`chgrp` changes only a file's **group**, without touching the owner:

```bash
chgrp staff file.txt
```

> **Correction:** as noted at the top of these notes, the supplied heading
> list described `chgrp` as setting **default** permissions — that is
> `umask`'s function (Section 4). `chgrp`'s actual job is changing a file's
> **group ownership**, which is what is explained here.

### 6.5 Worked example — sharing a project directory with a team

A team shares a directory that everyone in the `devteam` group should be able
to work in, with new files automatically belonging to that group.

```bash
sudo chgrp devteam /srv/project      # set the directory's group
sudo chmod 2775 /srv/project         # rwxrwsr-x: group write + setgid
```

The **2** in `2775` sets **setgid** on the directory, so every new file
created inside `/srv/project` automatically belongs to the `devteam` group,
regardless of which team member created it — saving everyone from having to
run `chgrp` manually on every new file.

## 7. Executing our privileges

Elevated access — via `su`, `sudo`, setuid programs, or simply being root —
comes with real responsibility, because those privileges bypass the normal
permission checks that protect a system from mistakes as well as attacks. A
command that would be safely blocked for an ordinary user can, run as root,
genuinely damage the system: deleting critical files, breaking package
databases, or misconfiguring something that other users and services depend
on.

The common-sense practice that follows is to use elevated privileges **only
for the specific task that needs them**, and to return to an ordinary,
unprivileged account as soon as that task is done — rather than working as
root generally "just in case." `sudo`'s per-command model naturally
encourages this; a long-lived `su` root shell does not.

## 8. Changing your password

The `passwd` command changes a user's password:

```bash
passwd            # change your own password
sudo passwd alice # (as root/via sudo) change another user's password
```

Run with no arguments, it prompts for your **current** password, then the
**new** one twice (to confirm it was typed correctly). This is the same
`passwd` program referenced in Section 5 as the classic example of a setuid
program — an ordinary user needs elevated privilege for a moment to update
the shared password database, and setuid is exactly the mechanism that grants
it, safely scoped to that one program.

## 9. Security perspective

Permissions are inherently a security topic, so the additions here focus on
practical risk that the mechanics alone do not make obvious:

- **World-writable files and directories are a common, serious mistake.**
  A file or directory with the "other" write bit set (e.g. permissions ending
  in a non-zero, write-including digit like `...66` or `...77`) can be
  modified by **any** user on the system — for a script that later runs with
  elevated privilege, that is a direct path to privilege escalation for
  anyone who can edit it first.
- **Setuid/setgid binaries are a prime attack target.** Because a setuid
  program runs with the **file owner's** privileges regardless of who invoked
  it, a vulnerability in a setuid-root program can let an ordinary user gain
  root access through it. Keep the number of setuid/setgid binaries on a
  system to the genuine minimum, and treat any unexpected or unfamiliar
  setuid file as worth investigating immediately.
- **`sudo` access is effectively root access, scoped only by configuration
  discipline.** A `sudoers` entry that allows a user to run a broad command,
  or a command that can itself spawn a shell or edit arbitrary files (some
  text editors, for instance), can be a route to full root even if the
  literal command listed looks narrow. Scope `sudo` rules as tightly as the
  task genuinely requires.
- **A long-lived root shell is a bigger blast radius than a moment of
  `sudo`.** The Section 7 point about using elevated access only as long as
  needed is not just tidiness — every command typed in a root shell runs with
  full privilege, including a mistyped or copy-pasted command that was meant
  for a different context. `sudo`'s command-at-a-time model reduces that
  window.
- **Ownership and password changes are both audit-worthy events.** `chown`,
  `chgrp` and `passwd` changes are exactly the kind of action that should be
  logged and reviewable — an unexpected ownership change on a sensitive file,
  or a password change the account holder did not request, are both classic
  early indicators of compromise.

## Summary

- Every file has an **owner (user)** and a **group**; permissions apply
  separately to **user, group, and other**.
- **r/w/x** mean different things on files (read/write/run) versus
  **directories** (list/create-delete-rename/enter).
- **`chmod`** sets permissions symbolically (`u+x`, `g-w`, `o=r`) or in
  **octal** (e.g. `755`, `644`), and GUIs expose the same model visually.
- **`umask`** sets the default permissions for new files/directories by
  subtracting from 666/777 — a common default is `022` (giving 644/755).
- **Special permissions:** **setuid** (run as the file owner), **setgid**
  (run as the file's group, or inherit group on new files in a directory),
  and the **sticky bit** (restrict deletion to the file's own owner, as on
  `/tmp`).
- **`su`** starts a shell as another user; **`sudo`** runs a single command as
  another user (usually root), checked against the invoking user's own
  password and the `sudoers` configuration.
- **`chown`** changes owner (and optionally group); **`chgrp`** changes group
  only.
- Elevated privileges should be used **only as long as the task requires**;
  **`passwd`** changes a password and is itself a classic setuid program.

## Glossary

| Term | Meaning |
| --- | --- |
| Owner (user) | The account that owns a file. |
| Group | A set of accounts a file also grants permissions to. |
| Other | Everyone else on the system, beyond owner and group. |
| Permission string | The rwx-per-category display, e.g. `rwxr-xr--`. |
| chmod | Command to change a file's permissions. |
| Octal notation | Permissions as three digits (e.g. 755). |
| umask | The mask subtracted from default new-file permissions. |
| Setuid | Special bit: run an executable as its owner. |
| Setgid | Special bit: run as the file's group, or inherit group in a directory. |
| Sticky bit | Special bit: restrict directory deletion to the file's own owner. |
| su | Start a shell as another user. |
| sudo | Run one command as another user, per sudoers policy. |
| sudoers | The configuration defining who may use sudo, and for what. |
| chown | Command to change a file's owner (and optionally group). |
| chgrp | Command to change a file's group only. |
| passwd | Command to change a user's password. |

## Review questions

1. Name the three categories permissions apply to, and what each means.
2. What do r, w and x mean on a regular file? What do they mean on a
   directory?
3. Write the chmod symbolic command to add execute permission for the group
   on a file called deploy.sh.
4. Convert the octal permission 640 into its rwx equivalent for owner, group
   and other.
5. What does umask do, and what does a umask of 022 produce for a new file
   and a new directory?
6. Explain setuid using the passwd command as an example.
7. What does the sticky bit do, and where is it classically used?
8. Distinguish su from sudo.
9. What does sudo actually check before allowing a command to run?
10. What's the difference between chown and chgrp?
11. Why does the lesson recommend using elevated privileges only as long as a
    task requires?
12. Scenario: a script that runs as a cron job under root is found to be
    world-writable. What is the security risk?
13. Scenario: you want new files created in a shared team directory to
    automatically belong to the team's group. Which special permission bit
    achieves this, and where do you set it?
14. Scenario: after running su and forgetting to exit, you accidentally paste
    a command meant for your normal user account. Why is this more dangerous
    than making the same mistake under sudo?

## Answer key

1. **User (owner), group, and other — respectively the file's owner, members
   of its group, and everyone else.** The three permission categories.
2. **On a file: read contents, write/modify contents, execute as a program.
   On a directory: list contents, create/delete/rename entries inside, and
   enter (traverse into) the directory.** Different meanings by object type.
3. **`chmod g+x deploy.sh`.** Symbolic notation, adding execute for group.
4. **Owner: rw- ; group: r-- ; other: ---.** 6=rw-, 4=r--, 0=---.
5. **umask subtracts from the 666/777 defaults; 022 gives 644 (rw-r--r--) for
   files and 755 (rwxr-xr-x) for directories.** Removes group/other write.
6. **passwd is setuid root, so it runs with root's privileges regardless of
   who launches it, letting an ordinary user update the password database
   they otherwise couldn't touch.** Owner-privilege execution.
7. **It restricts deletion in a directory to the file's own owner, even if
   others have write access; classically used on /tmp.** Shared-write,
   owner-only delete.
8. **su starts a whole new shell as another user; sudo runs a single command
   as another user without a separate session.** Session vs single command.
9. **The invoking user's own password, and whether that user is authorised
   (directly or via group) in the sudoers configuration for that command.**
   Not root's password.
10. **chown changes the owner (and optionally the group); chgrp changes only
    the group.** Broader vs narrower scope.
11. **Because elevated access bypasses normal safety checks — a mistake made
    with full privilege can do real damage, so minimising how long you hold
    that access limits the blast radius.** Reduce exposure time.
12. **Any user could modify the script before it next runs as root, achieving
    privilege escalation through the cron job.** World-writable + root
    execution = escalation path.
13. **Setgid on the directory (e.g. `chmod g+s` or the 2000 octal bit), so new
    files inherit the directory's group automatically.** Directory-level
    setgid inheritance.
14. **Every command in a root shell runs with full privilege by default,
    whereas sudo requires deliberately prefixing each command — a
    mis-pasted command under su can cause far more damage without any extra
    step needed.** Persistent privilege vs per-command privilege.
