---
title: "Linux: Navigation"
description: "Linux, like Windows, organises files into a hierarchy of directories (folders) that can contain files and further directories. The first directory is the root directory, written /. Everything else branches out from it."
tags: ["linux", "class-notes"]
draft: false
pubDate: 2026-09-20
---

__Class notes · William Shotts, The Linux Command Line · Chapter 2__

__Quick reference:__ the short version of this chapter is the Chapter 2 cheat sheet.

## Learning objectives

By the end of these notes you should be able to:

1. Describe how Linux organises storage as a single directory tree.
2. Explain the current working directory, and find it with pwd.
3. List directory contents with ls and move around with cd.
4. Write absolute and relative pathnames, using . and .. correctly.
5. Use the cd shortcuts for home, previous directory and another user's home.
6. Apply the rules for Linux filenames: hidden files, case sensitivity, extensions and characters to avoid.
7. Recognise why careful navigation matters when working on a live system.

## 1. One tree, no drive letters

## 1.1 The hierarchical directory structure

Linux, like Windows, organises files into a __hierarchy of directories__ (folders) that can contain files and further directories. The first directory is the __root directory__, written /. Everything else branches out from it.

 /                        <- root directory: the top of everything
 |-- bin
 |-- etc
 |-- home
 |   |-- andrew           <- your home directory (~)
 |   |   |-- Documents
 |   |   \`-- Downloads
 |   \`-- katie
 |-- tmp
 \`-- usr
     |-- bin
     |-- lib
     \`-- share
         \`-- doc

### 1.2 How this differs from Windows

__Windows__

__Linux__

A separate tree per drive: C:\\, D:\\, E:\\

__One__ tree, always starting at /

New drives get a new letter

New drives are __mounted__ at a directory somewhere in the tree, e.g. /media/andrew/USBSTICK

Backslash separator: C:\\Users\\andrew

Forward slash: /home/andrew

Mostly case-insensitive

__Case-sensitive__

The operating system decides where each storage device appears; a USB stick, a second disk and a network share all become ordinary directories in the same tree.

## 2. Where am I? — pwd

## 2.1 The current working directory

Imagine the tree as a maze of rooms. At any moment you're standing in one room: your __current working directory__. Commands act relative to it unless you say otherwise.

$ pwd
/home/andrewpwd stands for __print working directory__.

## 2.2 The home directory

When you first open a terminal, you start in your __home directory__:

- Each normal user has one, usually /home/<username>.
- The root user's home is /root.
- It's the only place a normal user can write files freely.
- The shell abbreviates it to ~ in the prompt and accepts ~ in paths.

## 3. Looking around — ls

ls lists the contents of a directory.

$ ls
Desktop  Documents  Downloads  Music  Pictures  Public  Templates  Videos

__Form__

__Lists__

ls

The current directory

ls /usr

A named directory

ls ~ /usr

Several directories, one after another

ls -a

Includes hidden files (names starting with .)

ls -l

Long format — permissions, owner, size, date

ls has many more options; chapter 3 covers them in depth.

## 4. Moving around — cd

cd (change directory) moves you to a new working directory. You tell it where to go with a __pathname__, and there are two kinds.

## 4.1 Absolute pathnames

An __absolute pathname__ starts at the root, so it always begins with /. It works from anywhere, because it describes the full route from the top of the tree.

$ cd /usr/bin
$ pwd
/usr/bin

### 4.2 Relative pathnames

A __relative pathname__ starts from wherever you are now. Two special names make it work:

__Symbol__

__Means__

.

This directory (the current working directory)

..

The parent directory — one level up

$ cd /usr/bin
$ cd ..           \

# up one level
$ pwd
/usr
$ cd ./bin        \

# into bin, relative to /usr
$ pwd
/usr/bin__./ is almost always optional.__ cd ./bin and cd bin do the same thing, because the shell assumes a name without a leading / is relative to the current directory.

__Note:__ the one common exception is running a program in the current directory, such as ./myscript.sh. The shell doesn't search the current directory for commands, so there you must write ./. (This is covered later in the book.)

### 4.3 Worked example — the same trip, two ways

You're in /usr/share/doc and want to get to /usr/bin.

__Absolute:__

cd /usr/bin

__Relative__ — work it out step by step:

1. .. takes you from /usr/share/doc up to /usr/share.
2. Another .. takes you up to /usr.
3. bin takes you into /usr/bin.

cd ../../bin

__Which to use?__

- For a nearby directory, relative is shorter.
- For somewhere far away, or in scripts, absolute is clearer and doesn't depend on where you start.

## 4.4 Worked example — tracing paths on the tree

Starting in /home/andrew, where does each command take you?

__Command__

__Result__

__Reasoning__

cd Documents

/home/andrew/Documents

Relative: down into Documents

cd ..

/home

Up one level

cd ../katie

/home/katie

Up to /home, then down into katie

cd /tmp

/tmp

Absolute: from the root

cd ../..

/

Up twice from /home/andrew

cd .. at /

/

You can't go above the root; .. of / is /

## 4.5 Useful cd shortcuts

__Shortcut__

__Takes you to__

cd

Your home directory

cd ~

Your home directory

cd -

The __previous__ working directory (and prints it)

cd ~katie

The home directory of user katie

$ cd /var/log
$ cd /etc
$ cd -            \

# back to /var/log
/var/logcd - is handy when switching back and forth between two places, such as a config directory and a log directory while troubleshooting.

## 5. Important facts about filenames

## 5.1 Hidden files

Filenames that begin with a __dot__ are hidden. ls won't show them unless you use ls -a.

$ ls -a ~
.  ..  .bash\_history  .bash\_logout  .bashrc  .cache  .profile  Documents  Downloads- __Why hide them?__ Most dotfiles are configuration files for your programs (.bashrc configures Bash). Hiding them keeps your home directory tidy.
- __. and ..__ appear in every directory listing with -a: this directory and its parent.

## 5.2 Case sensitivity

Filenames are __case-sensitive__. File1, file1 and FILE1 are three different files, and they can all sit in the same directory.

## 5.3 Extensions

Linux itself has __no concept of file extensions__. A file's contents, and its permissions, decide what it is and whether it can run. A script called backup with no extension runs as well as backup.sh.

- __Applications may still use extensions__ — many programs look for .txt, .conf or .jpg — so it's good practice to use sensible ones.
- __Don't trust the name.__ Chapter 3 introduces file, which inspects a file's content to report what it really is.

## 5.4 Characters to avoid

Linux allows almost any character in a filename, including spaces. But many characters have special meaning to the shell, so they cause trouble later.

__Safe to use__

__Avoid__

Letters and digits

Spaces

Period .

\* ? \[ \] \{ \} (wildcards and expansion)

Dash - (not as the first character)

$ & ; | < > ( ) ' " \\ \!\`

Underscore \_

A leading dash (-file looks like an option)

__Worked example — spaces in names:__

1. A file is named my report.txt.
2. ls my report.txt fails: the shell sees __two__ arguments, my and report.txt.
3. Quote it, or escape the space:

ls "my report.txt"
ls my\\ report.txt1. __Better:__ name files my-report.txt or my\_report.txt from the start.

## 5.5 Tab completion

Press __Tab__ while typing a path and Bash completes it, or shows the options when there are several matches. It saves typing and prevents typos — and it handles awkward names (including spaces) for you. Use it constantly.

## 6. Security perspective

- __Always know where you are before a destructive command.__ rm and mv with relative paths act on your current directory. Running a clean-up command in / or /etc instead of a temporary folder is a classic disaster. Check with pwd, or use absolute paths for anything destructive.
- __Hidden files hide things.__
	- Attackers and malware like dotfiles and dot-directories (/tmp/.x, ~/.cache/.hidden), because a plain ls doesn't show them.
	- When investigating, always list with ls -a (or ls -la).
- __Dotfiles are persistence points.__ Files like ~/.bashrc and ~/.profile run automatically when a shell starts. A malicious line added to them re-runs every time the user logs in — a common Linux persistence technique.
- __Names can deceive.__ With no enforced extensions, report.pdf could be a script or program. Trust content (file), not names.
- __World-writable places matter.__ /tmp is writable by everyone, which makes it a favourite drop location for attacker tools. Know its contents on systems you look after.

# Summary

- Linux has __one directory tree__ starting at /. Devices are mounted into it — no drive letters. Paths use / and are case-sensitive.
- __pwd__ shows the current working directory; you start in your __home directory__ (~, usually /home/<name>).
- __ls__ lists contents; __cd__ changes directory.
- __Absolute paths__ start with /; __relative paths__ start from where you are, using . (here) and .. (parent). ./ is usually optional.
- __Shortcuts:__ cd or cd ~ → home; cd - → previous directory; cd ~user → that user's home.
- __Filenames:__ a leading . hides a file; names are case-sensitive; extensions are convention only; avoid spaces and shell punctuation. Use Tab completion.

# Glossary

__Term__

__Definition__

Directory

A folder that holds files and other directories

Hierarchical directory structure

The tree arrangement of directories

Root directory (/)

The top of the Linux directory tree

Mounting

Attaching a storage device's file system at a directory in the tree

Current working directory

The directory you're "in"; relative paths start here

Home directory (~)

A user's personal directory, usually /home/<name>

pwd

Print working directory

ls

List directory contents

cd

Change directory

Pathname

The route to a file or directory

Absolute pathname

A path starting at /

Relative pathname

A path starting from the current directory

. / ..

The current directory / the parent directory

cd -

Return to the previous working directory

Hidden file (dotfile)

A file whose name starts with .

Case-sensitive

Treating upper- and lower-case letters as different

Tab completion

Bash completing a partially typed name when you press Tab

# Review questions

1. Where does every path in Linux ultimately start?
2. You plug in a USB stick. Does it get a drive letter? Where does it appear?
3. Which command shows your current working directory?
4. What's the difference between /usr/bin and usr/bin?
5. You're in /home/andrew/Documents. Write a relative path to /home/katie.
6. You're in /var/log/apt. Where does cd ../.. take you?
7. What does cd - do?
8. How do you go to your home directory from anywhere? Give two ways.
9. Why doesn't ls show .bashrc, and how do you make it appear?
10. Are Notes.txt and notes.txt the same file?
11. Does a file need a .sh extension to be run as a script? Explain.
12. Name three characters to avoid in filenames, and say why.
13. Why is pwd worth running before a destructive command?

# Answer key

1. __The root directory, /.__
2. __No drive letter.__ It's mounted at a directory in the single tree, typically under /media/<user>/ on desktop systems.
3. __pwd.__
4. __/usr/bin is absolute__ (from the root, works anywhere); __usr/bin is relative__ (only works if there's a usr directory inside the current one).
5. __../../katie__ — up to /home/andrew, up to /home, then into katie.
6. __/var.__
7. __Returns to the previous working directory__ and prints its name.
8. __cd on its own, or cd ~__ (also cd $HOME).
9. __Names starting with . are hidden.__ Use ls -a.
10. __No__ — filenames are case-sensitive.
11. __No.__ Linux doesn't use extensions to decide what a file is; permissions and content matter. Extensions are a convention.
12. __Any three of:__ space, \*, ?, $, &, ;, |, <, >, quotes, or a leading -. They have special meanings to the shell and cause names to be misread.
13. __Relative paths act on the current directory__, so running a delete in the wrong place can destroy the wrong files.
