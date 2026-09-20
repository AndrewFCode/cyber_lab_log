---
title: "Linux: Exploring the System"
description: "Most commands follow the same general shape:"
tags: ["linux", "class-notes"]
draft: false
pubDate: 2026-09-20
---

__Class notes · William Shotts, The Linux Command Line · Chapter 3__

__Quick reference:__ the short version of this chapter is the Chapter 3 cheat sheet.

## Learning objectives

By the end of these notes you should be able to:

1. Describe the structure of a command: command, options and arguments.
2. Use the most important ls options, alone and combined.
3. Read every field of an ls -l long listing.
4. Identify what a file really is with file.
5. Read text files with less, and navigate and search inside it.
6. Explain the purpose of the main directories in the Linux file system.
7. Recognise symbolic links and explain how they differ from hard links.
8. Use these tools to investigate an unfamiliar system.

## 1. Commands, options and arguments

Most commands follow the same general shape:

 command  -options  arguments
    |         |         |
    |         |         \+-- what to act on (files, directories, names)
    |         \+------------ how to behave (change the command's output)
    \+---------------------- the program to run
ls -lt /var/logHere ls is the command, -lt the options, and /var/log the argument.

## 1.1 Short and long options

__Style__

__Looks like__

__Notes__

Short

-l, -a, -t

A single dash and one letter. Several can be joined: -lat = -l -a -t

Long

--all, --reverse

Two dashes and a word. Easier to read, especially in scripts

Many options exist in both forms: ls -a and ls --all do the same thing.

__Note:__ these conventions come from the GNU tools used on most Linux systems. Some commands (and other Unix systems) differ, so check a command's help when in doubt — chapter 5 covers how.

## 2. ls in depth

## 2.1 The most useful options

__Option__

__Long form__

__Does__

-a

--all

Show all files, including hidden ones (and . and ..)

-A

--almost-all

Like -a, but leaves out . and ..

-d

--directory

Show the directory itself, not its contents — use with -l

-F

--classify

Add a symbol to each name: / directory, \* executable, @ link

-h

--human-readable

Sizes in K, M, G (with -l)

-l

Long format

-r

--reverse

Reverse the sort order

-S

Sort by size, largest first

-t

Sort by modification time, newest first

## 2.2 Worked example — combining options

__Goal__

__Command__

See everything, including hidden files, in detail

ls -la

Find the newest log files

ls -lt /var/log

Find the oldest instead

ls -ltr /var/log

Find the biggest files, with readable sizes

ls -lSh

Check the permissions __of a directory__, not its contents

ls -ld /tmp

See at a glance which entries are directories or programs

ls -F

__Why -d matters:__ ls -l /tmp lists what's *inside* /tmp. To see the permissions on /tmp itself, you need ls -ld /tmp.

__ls -ltr__ is a troubleshooting favourite: the most recently changed files land at the bottom, right above your prompt.

## 3. Reading the long listing

-rwxr-xr-x  1  andrew  andrew   20  Sep 19 14:41  backup
lrwxrwxrwx  1  andrew  andrew    9  Sep 19 14:41  link.txt -> notes.txt
-rw-r--r--  1  andrew  andrew    6  Sep 19 14:41  notes.txt
drwxr-xr-x  2  andrew  andrew 4096  Sep 19 14:40  DocumentsTaking the first line field by field:

__Field__

__Example__

__Meaning__

1

-rwxr-xr-x

File type (first character), then permissions for owner, group and others

2

1

Number of __hard links__ to the file

3

andrew

Owner (user)

4

andrew

Group

5

20

Size in bytes

6

Sep 19 14:41

Last modification date and time

7

backup

Name

## 3.1 The file-type character

__First character__

__Type__

-

Regular file

d

Directory

l

Symbolic link — the name shows link -> target

c / b

Character / block device (in /dev)

## 3.2 Permissions at a glance

The nine characters after the type are three sets of rwx: for the __owner__, the __group__ and __everyone else__. -rwxr-xr-x means the owner can read, write and run; the group and others can read and run. Permissions are covered fully later in the book (and in the TryHackMe module 3 notes).

## 3.3 Worked example — reading a listing

-rw-r-----  1  root  adm  218K  Sep 19 09:12  auth.log1. __Type:__ - — a regular file.
2. __Permissions:__ owner root can read and write; group adm can read; others have __no__ access.
3. __Size and date:__ 218 KB, last written at 09:12.
4. __What it tells you:__ a normal user can't read this log unless they're in the adm group. That's deliberate — authentication logs are sensitive.

__Note:__ timestamps for files older than about six months show the year instead of the time.

## 4. What is this file? — file

Because Linux doesn't rely on extensions, you need a way to find out what a file really contains. file looks at the content — mainly the first bytes (the "magic number") — and reports the type.

$ file notes.txt backup link.txt /bin/ls picture.png
notes.txt:   ASCII text
backup:      Bourne-Again shell script, ASCII text executable
link.txt:    symbolic link to notes.txt
/bin/ls:     ELF 64-bit LSB pie executable, x86-64, ...
picture.png: PNG image data, 800 x 600, 8-bit/color RGBA, non-interlaced

__ELF__ is the executable format for Linux programs — the equivalent of a Windows .exe.

## 4.1 Worked example — a suspicious download

1. A user downloaded invoice.pdf to a Linux laptop, and it "won't open".
2. Run file invoice.pdf. It reports ELF 64-bit LSB executable.
3. It's a Linux program disguised as a document. Don't run it; hand it to security.

The same check on a real PDF would report PDF document, version 1.7.

## 5. Reading files with less

Many important Linux files are plain text: configuration files in /etc, logs in /var/log, scripts. less lets you read them one screen at a time, scroll back and search.

less /etc/os-release

### 5.1 Keys inside less

__Key__

__Does__

Space or Page Down

Forward one page

b or Page Up

Back one page

Up / Down arrows

One line at a time

G

Jump to the end

g

Jump to the start

/text

Search forward for "text"

n

Next match

h

Help

q

Quit

## 5.2 Why "less"?

It replaced an older pager called more, which could only move forward. The joke is that "less is more" — less does everything more does, and more. A __pager__ is simply a program that shows text one page at a time.

## 5.3 Worked example — searching a log

1. Open the authentication log: sudo less /var/log/auth.log (on Debian/Ubuntu).
2. Press G to jump to the newest entries at the end.
3. Type /Failed password and press Enter.
4. Press n to step through each failed login, and note the usernames and source addresses.
5. Press q to quit.

__Caution:__ less is the safe way to look at a file. Opening a configuration file in an editor just to read it risks accidental changes.

## 6. A guided tour of the directory tree

Linux systems follow a common layout, the __Filesystem Hierarchy Standard (FHS)__. Knowing it means you can find your way around almost any distribution.

__Directory__

__Contains__

/

The root of the tree

/bin

Essential programs for the system to boot and run

/boot

The Linux kernel, initial RAM disk and bootloader files

/dev

Device nodes — Linux treats devices as files

/etc

System-wide configuration files, all plain text

/home

Normal users' home directories

/lib

Shared libraries used by core programs

/lost\+found

Files recovered after a file system error (on ext file systems)

/media

Mount points for removable media (USB sticks) on desktops

/mnt

Mount points for manually mounted devices

/opt

Optional, usually commercial, software

/proc

A virtual file system: a window into the kernel and running processes

/root

The root user's home directory

/sbin

System administration programs

/tmp

Temporary files; often cleared at reboot

/usr

Most programs and support files for users

/usr/bin

The bulk of installed programs

/usr/lib

Shared libraries for programs in /usr/bin

/usr/local

Software installed locally by the administrator, not by the distribution

/usr/sbin

More system administration programs

/usr/share

Shared data: documentation, icons, default configurations

/usr/share/doc

Documentation for installed packages

/var

Data that changes: logs, mail, databases, caches

/var/log

Log files — one of the first places to look when troubleshooting

__Worth exploring with less:__ /etc/passwd (user accounts), /etc/fstab (file systems mounted at boot), /etc/os-release (distribution details) and /proc/cpuinfo (CPU details).

__Note:__ many modern distributions have __merged__ /bin, /sbin and /lib into their /usr equivalents. On those systems /bin is a symbolic link to /usr/bin — you'll see bin -> usr/bin in ls -l /.

## 7. Links

## 7.1 Symbolic links

A __symbolic link__ (symlink, soft link) is a special file that points to another file or directory by name — like a Windows shortcut, but handled by the operating system itself, so every program follows it.

lrwxrwxrwx  1 root root  7 Apr 22 2024  bin -> usr/bin

__Why they're used:__ a program might need a library called libfoo.so, while the real file is libfoo.so.2.6. A symlink named libfoo.so points at the current version. Upgrading means installing the new file and moving the link — every program follows automatically.

## 7.2 Hard links

A __hard link__ is a second directory entry for the __same data__ on disk. Both names are equally "real". The second field of ls -l counts them. Chapter 4 shows how to create both kinds and compares them in detail.

__Symbolic link__

__Hard link__

Points to

A __name__ (path)

The __data__ itself

Shown in ls -l as

l type with -> target

An ordinary file; link count above 1

If the original is deleted

Link breaks (dangling)

Data survives through the other name

## 8. Security perspective

- __ls -la is a first-response command.__ It shows hidden files, owners, permissions and timestamps together. Unusual owners, recent timestamps in system directories or hidden files in /tmp are all worth a second look.
- __ls -ltr builds a timeline.__ Sorting by modification time helps answer "what changed around the time of the incident?" — though attackers can change timestamps, so treat them as clues, not proof.
- __file defeats disguises.__ Checking content rather than names reveals executables pretending to be documents.
- __Know where evidence lives:__
	- /var/log — logs.
	- /etc — configuration, including /etc/passwd and /etc/sudoers.
	- /home and /root — user files and dotfiles.
	- /tmp — tool drops.
	- /proc — live process information.
- __Symlinks can be abused.__ A program that writes to a file without checking whether it's a symlink can be tricked into overwriting something important — a classic class of vulnerability, particularly in world-writable directories like /tmp.

# Summary

- __Command shape:__ command, options, arguments. Short options (-l) combine; long options (--all) are self-describing.
- __Key ls options:__ -a/-A (hidden), -l (long), -h (sizes), -t (time), -S (size), -r (reverse), -d (the directory itself), -F (type symbols).
- __ls -l fields:__ type and permissions, link count, owner, group, size, date, name.
- __file__ reports what a file really is from its content.
- __less__ reads text safely: Space/b to page, / to search, n for next, G/g for end/start, q to quit.
- __Key directories:__ /etc (config), /var/log (logs), /home (users), /usr/bin (programs), /tmp (temporary), /proc (kernel view), /dev (devices).
- __Links:__ symbolic links point to a name; hard links are extra names for the same data.

# Glossary

__Term__

__Definition__

Option

Modifies how a command behaves, e.g. -l

Argument

What a command acts on, e.g. a filename

Short option / long option

-a style / --all style

Long listing

Detailed ls -l output

Link count

Number of hard links (names) pointing to a file's data

Owner / group

The user and group a file belongs to

file

Identifies a file's type from its contents

Magic number

Bytes at the start of a file that identify its format

ELF

The executable and linkable format — Linux's program format

Pager

A program that displays text one screen at a time

less

The standard Linux pager

FHS

Filesystem Hierarchy Standard — the common Linux directory layout

/etc

Directory of system configuration files

/var/log

Directory of log files

/proc

Virtual file system exposing kernel and process information

/dev

Directory of device files

Symbolic link

A file that points to another file by name

Hard link

An additional name for the same file data

Dangling link

A symbolic link whose target no longer exists

# Review questions

1. In ls -lt /var/log, identify the command, options and argument.
2. What's the difference between ls -a and ls -A?
3. Which command shows the permissions of the /tmp directory itself?
4. How do you list files so the most recently modified appears last?
5. In drwxr-x---  2  sam  devs  4096  Sep 18 10:02  project, what type is it, and who can enter it?
6. What does the second field of a long listing count?
7. A file named photo.jpg is reported by file as ELF 64-bit LSB executable. What does that mean?
8. Inside less, how do you search for the word "error", and move to the next match?
9. Which directory holds system-wide configuration files?
10. Where would you look first for log files?
11. What does ls -l / show for bin on a merged-/usr system, and why?
12. What happens to a symbolic link if its target is deleted? What about a hard link?

# Answer key

1. __Command ls; options -lt (long format, sorted by time); argument /var/log.__
2. __-a includes . and ..; -A shows hidden files but leaves those two out.__
3. __ls -ld /tmp.__
4. __ls -ltr__ — sorted by time, reversed, so the newest is at the bottom.
5. __A directory.__ The owner sam has full access; members of group devs can list and enter it (r-x); others have no access.
6. __The number of hard links__ to the file's data.
7. __It's a Linux executable disguised as an image.__ Don't run it; treat it as suspicious.
8. __Type /error and press Enter; press n for the next match.__
9. __/etc.__
10. __/var/log.__
11. __bin -> usr/bin__ — a symbolic link, because the distribution has merged /bin into /usr/bin.
12. __The symlink breaks (it's left dangling). With a hard link, the data survives,__ because another name still points to it.
