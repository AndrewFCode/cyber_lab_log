---
title: "Linux: Manipulating Files and Directories"
description: "A graphical file manager is fine for moving one file. But consider this task: copy every HTML file from one directory to another, but only files that don't exist in the destination or are newer than the copies there.…"
tags: ["linux", "class-notes"]
draft: false
pubDate: 2026-09-20
---

__Class notes · William Shotts, The Linux Command Line · Chapter 4__

__Quick reference:__ the short version of this chapter is the Chapter 4 cheat sheet.

## Learning objectives

By the end of these notes you should be able to:

1. Explain why the command line beats a file manager for many file tasks.
2. Select groups of files with wildcards, including character classes.
3. Create directories with mkdir.
4. Copy, move and rename with cp and mv, using their key options safely.
5. Delete files and directories with rm, and avoid its classic disasters.
6. Create hard and symbolic links with ln, and explain how they differ.
7. Practise all of this safely in a throwaway "playground" directory.

## 1. Why use the command line for files?

A graphical file manager is fine for moving one file. But consider this task: *copy every HTML file from one directory to another, but only files that don't exist in the destination or are newer than the copies there.* In a file manager that's tedious and error-prone. On the command line it's one line:

cp -u \*.html destinationThe power comes from combining small commands with __wildcards__, and it scales to thousands of files as easily as to two.

## 2. Wildcards

__Wildcards__ (also called __globbing__) let you name groups of files by pattern. The __shell__ expands the pattern into a list of matching names before the command even runs.

## 2.1 The wildcard characters

__Wildcard__

__Matches__

\*

Any characters — including none

?

Exactly one character

\[characters\]

Any one character from the set

\[\!characters\]

Any one character __not__ in the set

\[\[:class:\]\]

Any one character in the named class

## 2.2 Character classes

__Class__

__Matches__

\[:alnum:\]

Letters and digits

\[:alpha:\]

Letters

\[:digit:\]

Digits 0–9

\[:lower:\]

Lower-case letters

\[:upper:\]

Upper-case letters

Note the double brackets when used as a wildcard: the outer \[ \] is the set, and \[:upper:\] is the class inside it — \[\[:upper:\]\].

## 2.3 Worked example — predicting matches

A directory contains:

a.txt  b.txt  c.log  BACKUP.1  data1.csv  data2.csv  data10.csv  notes.TXT  .hidden

__Pattern__

__Matches__

__Why__

\*

Everything except .hidden

\* doesn't match a leading dot

\*.txt

a.txt b.txt

Case-sensitive: notes.TXT doesn't match

data?.csv

data1.csv data2.csv

? is exactly one character, so data10.csv doesn't match

data\*.csv

All three data files

\* allows any number of characters

\[abc\]\*

a.txt b.txt c.log

Starts with a, b or c

\[\[:upper:\]\]\*

BACKUP.1

Starts with a capital letter

\*\[\[:digit:\]\]\*

BACKUP.1 and the three data files

Contains a digit anywhere

## 2.4 Test before you act

Because the shell does the expansion, you can preview any pattern safely with echo or ls before using it with a destructive command:

echo \*.log        \

# shows exactly which names the pattern produces
ls -d data\*       \

# same idea with ls (-d stops it listing directory contents)

If nothing matches, Bash passes the pattern through unchanged: echo nomatch\*.zip prints nomatch\*.zip.

__Caution:__ ranges like \[a-z\] can behave unexpectedly, because in some language settings the range includes upper-case letters too. Character classes such as \[\[:lower:\]\] are predictable, so prefer them.

## 3. Creating directories — mkdir

mkdir dir1                   \

# one directory
mkdir dir1 dir2 dir3         \

# several at once
mkdir -p projects/2026/notes \

# -p creates missing parents; no error if it already exists-p (parents) is invaluable in scripts: it builds the whole path in one go, and doesn't complain if parts already exist.

## 4. Copying — cp

cp has two forms:

cp item1 item2                \

# copy one file or directory to a new name
cp item... directory          \

# copy one or more items INTO a directory

### 4.1 Useful options

__Option__

__Long form__

__Does__

-a

--archive

Copy everything, preserving owner, permissions, timestamps and links — a faithful copy

-i

--interactive

Ask before overwriting an existing file

-r

--recursive

Copy directories and their contents (required for directories)

-u

--update

Only copy files that are missing or newer than the destination

-v

--verbose

Show each file as it's copied

## 4.2 Worked example — what does each command do?

__Command__

__Result__

cp file1 file2

Copies file1 to file2. If file2 exists, it's __silently overwritten__

cp -i file1 file2

Same, but asks first if file2 exists

cp file1 file2 dir1

Copies both files __into__ dir1, which must already exist

cp dir1/\* dir2

Copies every (non-hidden) file in dir1 into dir2

cp -r dir1 dir2

If dir2 doesn't exist, creates it as a copy of dir1. If it does, creates dir2/dir1

cp -a /etc/ssh ~/ssh-backup

A faithful copy of a config directory before editing it

The cp -r dir1 dir2 behaviour catches everyone out once. Whether the destination already exists changes the result.

## 5. Moving and renaming — mv

mv both __moves__ and __renames__; they're the same operation (changing a file's path). The original disappears.

mv item1 item2                \

# rename (or move to a new name)
mv item... directory          \

# move items into a directory

__Option__

__Does__

-i

Ask before overwriting

-u

Only move if the source is newer or the destination is missing

-v

Show what's happening

__Command__

__Result__

mv file1 file2

Renames file1 to file2 — overwriting file2 if it exists

mv file1 file2 dir1

Moves both files into dir1

mv dir1 dir2

Renames dir1 to dir2 — or, if dir2 exists, moves dir1 inside it

__Note:__ mv needs no -r. Moving a directory moves everything inside it.

## 6. Deleting — rm

rm item...

__Option__

__Does__

-i

Ask before each deletion

-r

Delete directories and everything in them, recursively

-f

Force: never ask, ignore missing files (overrides -i)

-v

Show what's deleted

rmdir removes __empty__ directories only, which makes it a safe choice when that's all you intend.

## 6.1 There is no undo

Linux has __no recycle bin on the command line__. Once rm deletes something, it's gone (recovery tools may sometimes help, but don't count on it). And Linux assumes you know what you're doing — it won't ask "are you sure?" unless you use -i.

## 6.2 Worked example — the one-space disaster

You want to delete the HTML files in the current directory:

rm \*.html          \

# intended
rm \* .html         \

# one accidental space1. The second command gives rm two arguments: \* (every file in the directory) and .html (a file that probably doesn't exist).
2. Everything in the directory is deleted; rm then complains that .html doesn't exist.
3. __Prevention:__ preview the pattern first. Run ls \*.html, check the list, then press Up and edit ls to rm.

That "ls first, then swap in rm" habit is worth building from day one.

## 7. Creating links — ln

ln file link          \

# hard link
ln -s item link       \

# symbolic link

### 7.1 Hard links

A file's data sits on disk; a __directory entry__ is just a name pointing to it. A __hard link__ adds another name for the same data.

- Both names are equally "the file". Deleting one leaves the data intact until __every__ name is gone.
- __Limits:__ a hard link can't point to a directory, and can't cross to a different file system (partition or disk).

## 7.2 Symbolic links

A __symbolic link__ is a small special file containing the __path__ to its target.

- It can point to directories, and across file systems.
- Most operations on the link act on the target. Deleting the link itself (rm link) removes only the link.
- If the target is deleted or moved, the link is left __dangling__ (broken).

## 7.3 Worked example — watching both kinds

$ echo "v1" > fun
$ ln fun fun-hard
$ ln -s fun fun-sym
$ ls -li fun\*
2801712 -rw-r--r-- 2 andrew andrew 3 Sep 19 14:42 fun
2801712 -rw-r--r-- 2 andrew andrew 3 Sep 19 14:42 fun-hard
2801713 lrwxrwxrwx 1 andrew andrew 3 Sep 19 14:42 fun-sym -> fun1. -i shows the __inode number__ in the first column — the ID of the data on disk. fun and fun-hard share __2801712__: two names, one file.
2. Their __link count__ is 2.
3. fun-sym has its own inode and just contains the path fun.

Now delete the original:

$ rm fun
$ cat fun-hard
v1
$ cat fun-sym
cat: fun-sym: No such file or directoryThe hard link still reaches the data; the symbolic link points at a name that no longer exists.

## 7.4 Relative symlink targets

A symlink's target is stored exactly as you type it:

- __Relative targets__ (ln -s ../config/app.conf app.conf) are resolved relative to the __link's__ location. They keep working if the whole directory tree is moved together.
- __Absolute targets__ (ln -s /etc/app.conf app.conf) keep working when the __link__ is moved, but break if the target moves.

## 8. Building a playground

Practise somewhere nothing matters. This sequence exercises everything in the chapter:

cd ~
mkdir playground && cd playground
mkdir dir1 dir2
cp /etc/passwd .                  \

# a harmless text file to experiment with
ls -l
cp -v passwd dir1                 \

# copy into dir1
mv passwd fun                     \

# rename
mv fun dir1 && mv dir1/fun dir2   \

# move it around
mv dir2/fun .                     \

# and back
ln fun fun-hard                   \

# hard link
ln -s fun fun-sym                 \

# symbolic link
ls -li
cd ~ && rm -r playground          \

# clean up — check where you are first

## 9. Security perspective

- __Destructive commands plus wildcards need care.__ Preview with echo or ls, prefer -i when unsure, and be especially careful as root. rm -rf with a wrong path or a stray space is one of the most common self-inflicted outages.
- __Back up before you change.__ cp -a file file.bak (or a directory copy) before editing configuration means you can always roll back — the same "known good state" idea as a snapshot.
- __Deleted isn't erased.__ rm removes the name, not the data; the blocks remain until overwritten. Forensic tools can often recover them, which helps investigators and matters when disposing of disks. Secure erasure needs different tools.
- __Links are abused by attackers:__
	- __Symlink attacks:__ a privileged program writes to a predictable path in /tmp; an attacker puts a symlink there pointing to a sensitive file, which then gets overwritten.
	- __Hard links__ to a sensitive file can keep its data reachable after the original name is deleted.
- __Hidden files escape wildcards.__ \* doesn't match dotfiles, so a "clean" directory can still hold hidden content. Check with ls -la.

# Summary

- __Wildcards__ are expanded by the shell: \* (anything), ? (one character), \[set\], \[\!set\], \[\[:class:\]\]. Preview with echo or ls; prefer classes to ranges.
- __mkdir -p__ creates whole paths.
- __cp__: -a faithful copy, -i ask, -r directories, -u only newer, -v verbose. Whether the destination exists changes what cp -r does.
- __mv__ moves and renames, and needs no -r.
- __rm__: -i ask, -r recursive, -f force. No undo — ls first, then rm. rmdir removes empty directories only.
- __ln__ makes hard links (same data, same inode, no directories or cross-file-system links) and __ln -s__ makes symbolic links (a path to the target; can dangle).

# Glossary

__Term__

__Definition__

Wildcard / globbing

Patterns the shell expands into matching filenames

\*

Matches any characters, including none

?

Matches exactly one character

Character class

A named set such as \[:digit:\], used as \[\[:digit:\]\]

mkdir -p

Create a directory and any missing parents

cp -a

Archive copy, preserving attributes

cp -r

Recursive copy (needed for directories)

cp -u

Copy only missing or newer files

mv

Move or rename

rm -r

Delete a directory and its contents

rm -f

Force deletion without prompting

rmdir

Remove an empty directory

Directory entry

A name that points to a file's data

Inode

The on-disk record identifying a file's data and attributes

Hard link

An additional name for the same inode

Symbolic link

A special file containing a path to its target

Dangling link

A symlink whose target no longer exists

Playground

A throwaway directory for safe practice

# Review questions

1. Which files match report?.pdf from: report1.pdf, report10.pdf, report.pdf, reportA.pdf?
2. Write a pattern matching any file whose name starts with an upper-case letter.
3. Does \* match .bashrc? Why or why not?
4. What does mkdir -p a/b/c do if a doesn't exist?
5. You run cp -r site backup. What happens if backup doesn't exist, and what if it does?
6. Which cp option copies only files that are newer than the destination's copies?
7. How do you rename old.txt to new.txt?
8. Why does mv not need a -r option?
9. What's the difference between rm -r dir and rmdir dir?
10. Explain why rm \* .txt is dangerous.
11. Two names show the same inode number in ls -i. What's their relationship?
12. You delete a file that has a symbolic link and a hard link pointing to it. What happens to each link?
13. Why can't you make a hard link to a file on a different disk?

# Answer key

1. __report1.pdf and reportA.pdf__ — ? matches exactly one character.
2. __\[\[:upper:\]\]\*.__
3. __No.__ Wildcards don't match a leading dot, so hidden files are excluded.
4. __It creates a, then a/b, then a/b/c__ — all missing parents.
5. __If backup doesn't exist, it's created as a copy of site. If it exists, site is copied inside it, giving backup/site.__
6. __-u__ (--update).
7. __mv old.txt new.txt.__
8. __Moving a directory moves it whole__, including everything inside.
9. __rm -r deletes the directory and all its contents; rmdir only removes an empty directory__ (and fails otherwise).
10. __The space splits it into two arguments:__ \* (every file) and .txt. It deletes everything in the directory.
11. __They're hard links — two names for the same file data.__
12. __The symlink breaks (dangles); the hard link still reaches the data.__
13. __Hard links reference an inode, and inode numbers are only meaningful within one file system.__ Use a symbolic link instead.
