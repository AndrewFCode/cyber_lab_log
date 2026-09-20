---
title: "Linux: Working with Commands"
description: "When you type a name at the prompt, it can be any one of four things:"
tags: ["linux", "class-notes"]
draft: false
pubDate: 2026-09-20
---

__Class notes · William Shotts, The Linux Command Line · Chapter 5__

__Quick reference:__ the short version of this chapter is the Chapter 5 cheat sheet.

## Learning objectives

By the end of these notes you should be able to:

1. Name the four kinds of command and explain how each differs.
2. Identify what a command is with type, and where a program lives with which.
3. Get help for shell builtins with help, and for programs with --help.
4. Read a man page, and choose the right man page section.
5. Search for commands by topic with apropos, and get one-line summaries with whatis.
6. Find further documentation with info and in /usr/share/doc.
7. Create, check and remove your own aliases, and run several commands on one line.
8. Use these tools to investigate an unfamiliar system safely.

## 1. What exactly is a command?

When you type a name at the prompt, it can be any one of four things:

__Kind__

__What it is__

__Example__

Executable program

A file on disk, like those in /usr/bin. Can be compiled (C, C\+\+, Rust) or a script (Bash, Python, Perl)

ls, cp, python3

Shell builtin

A command built into Bash itself; no separate file

cd, echo, type, help

Shell function

A mini shell script stored in the shell's environment

Defined in startup files — covered later in the book

Alias

Your own name for another command or string of commands

ll for ls -l on many systems

__Why builtins exist:__ some jobs must happen inside the shell process. cd changes the shell's own current directory — a separate program couldn't do that, because it would only change its own.

## 2. Identifying commands

## 2.1 type — what kind of command is it?

type is a shell builtin that tells you how the shell will interpret a name:

$ type type
type is a shell builtin
$ type cd
cd is a shell builtin
$ type cp
cp is /usr/bin/cp
$ type ls
ls is aliased to \`ls --color=auto'The last line is typical of Ubuntu and many other distributions: ls is an __alias__ that adds colour. When you type ls, you're really running ls --color=auto.

## 2.2 which — where does the program live?

which shows the location of an __executable program__ found on your search path:

$ which ls
/usr/bin/ls
$ which cd
$- which cd prints nothing on many systems (or a "no cd in ..." message on others), because cd isn't a program on disk — it's a builtin.
- __Prefer type__ when in doubt: it knows about builtins, functions and aliases as well as programs.

## 2.3 Worked example — the command that "does something different"

A colleague's rm asks for confirmation on every file, but yours doesn't.

1. On their machine, type rm shows rm is aliased to 'rm -i'.
2. Their account has an alias that adds -i (interactive).
3. Neither machine's rm program is different — the shell is rewriting the command before it runs.

This explains many "it works differently on that machine" puzzles. Check type before assuming the program itself differs.

## 3. Getting help

## 3.1 help — for shell builtins

Bash has built-in documentation for its builtins:

$ help cd
cd: cd \[-L|\[-P \[-e\]\] \[-@\]\] \[dir\]
    Change the shell working directory.
    ...

__Reading the syntax line:__

__Notation__

__Means__

\[ \]

Optional

|

Choose one of these (mutually exclusive)

...

Can repeat

So cd \[-L|\[-P \[-e\]\]\] \[dir\]:

- Every part is optional.
- You can use -L __or__ -P, not both.
- -e only makes sense with -P.
- dir is optional (no directory means "go home").

## 3.2 --help — for most programs

Most executable programs (especially the GNU tools) print a usage summary with --help:

$ mkdir --help
Usage: mkdir \[OPTION\]... DIRECTORY...
Create the DIRECTORY(ies), if they do not already exist.
  -m, --mode=MODE   set file mode (as in chmod a=rwx), not a=rwx - umask
  -p, --parents     no error if existing, make parent directories as needed
  ...Not every program supports --help, but trying it is harmless — at worst you get an error message, which often includes the usage anyway.

## 3.3 man — the manual pages

Most command-line programs ship with a formal __man page__ (manual page). man displays it, using less as the pager, so all the less keys work: Space to page, / to search, q to quit.

man ls

__A typical man page layout:__

__Section heading__

__Contains__

NAME

The command and a one-line description

SYNOPSIS

The syntax, in the notation above

DESCRIPTION

What it does, and every option

EXAMPLES

Sometimes — not every page has them

SEE ALSO

Related commands and pages

Man pages are __reference__ documents, not tutorials. They tell you precisely what each option does, but rarely why you'd use it. Reading them is a skill that improves with practice.

## 3.4 The manual's sections

The manual is split into numbered sections, and the same name can appear in more than one:

__Section__

__Contents__

1

User commands

2

Programming interfaces for kernel system calls

3

Programming interfaces to the C library

4

Special files, such as device nodes and drivers

5

File formats

6

Games and amusements (such as screen savers)

7

Miscellaneous

8

System administration commands

## 3.5 Worked example — choosing a section

passwd is both a __command__ (to change a password) and a __file__ (/etc/passwd, which lists accounts).

1. man passwd shows the first match it finds — the __command__, from section 1.
2. To learn the format of the /etc/passwd file, ask for section 5:

man 5 passwd1. In documentation you'll see this written as __passwd(5)__ — the name with its section in brackets.

## 3.6 apropos and whatis

When you don't know a command's name, search the manual by keyword:

$ apropos partition
addpart (8)          - tell the kernel about the existence of a partition
cfdisk (8)           - display or manipulate a disk partition table
fdisk (8)            - manipulate disk partition table
...- apropos searches man page names and short descriptions. man -k does the same thing.
- __whatis__ gives the one-line description for an exact name:

$ whatis ls
ls (1)               - list directory contents

__Note:__ apropos and whatis rely on a database of man page descriptions. If they return nothing on a fresh system, the database may need building (sudo mandb). Some minimal installs and containers omit man pages entirely.

### 3.7 info and package documentation

- __info__ — the GNU Project's alternative to man pages. Info pages are __hyperlinked__, like a small website in the terminal. Some GNU tools (for example info coreutils) have fuller info documentation than man pages.

__Key in info__

__Does__

Space / Page Down

Next page

Enter on a link

Follow it

u

Up to the parent node

n / p

Next / previous node

q

Quit

- __/usr/share/doc__ — many packages install READMEs, change logs and examples here, one directory per package.
	- Text files can be read with less.
	- Files ending in .gz are compressed: read them with zless.

## 3.8 Worked example — where do I look?

__Question__

__First place to look__

How do I use cd's options?

help cd (it's a builtin)

What options does cp have?

cp --help, then man cp for detail

Is there a command for managing partitions?

apropos partition

What's the format of /etc/fstab?

man 5 fstab

What does this package's config file support?

/usr/share/doc/<package>/

## 4. Creating your own commands with alias

## 4.1 Several commands on one line

Separate commands with a semicolon and they run one after another:

cd /usr; ls; cd -This goes to /usr, lists it, then returns to where you started.

## 4.2 Worked example — building an alias

1. __Choose a name and check it's free.__ You don't want to hide an existing command:

$ type foo
bash: type: foo: not found1. __Create the alias.__ The syntax is alias name='string', with no spaces around the =:

alias foo='cd /usr; ls; cd -'1. __Test it:__ type foo — it lists /usr and brings you back.
2. __Confirm what it is:__

$ type foo
foo is aliased to \`cd /usr; ls; cd -'1. __Remove it__ when you no longer want it:

unalias foo

### 4.3 Managing aliases

__Command__

__Does__

alias

List every alias defined in this shell

alias name='string'

Create or replace an alias

unalias name

Remove an alias

type name

Show whether a name is an alias, and what it expands to

__Aliases disappear when the shell session ends.__ To keep them, add them to a startup file such as ~/.bashrc — covered later in the book.

## 5. Security perspective

- __Check what a command really is.__ On a system you're investigating, type reveals aliases and functions that could change a command's behaviour. An attacker with access to a user's ~/.bashrc can alias sudo, ls or ssh to something malicious — for example, a sudo alias that captures the password. Checking alias and type on key commands is a quick integrity test.
- __The search path decides which program runs.__ which and type show the path of the program that would actually run. A lookalike program placed earlier in the path can take over a common command name. If which ls shows anything other than the usual system location, investigate.
- __Documentation is part of the toolkit.__ Security tools on Linux are driven by options. --help, man and apropos let you work out a tool you've never seen — on an isolated system with no internet — rather than guessing.
- __Know what a command will do before running it.__ Reading --help or the man page first is the safe habit, especially for commands you find in scripts, tickets or online posts.

# Summary

- __Four kinds of command:__ executable programs, shell builtins, shell functions and aliases.
- __type__ says which kind a name is (and expands aliases); __which__ shows where an executable program lives.
- __Help sources:__ help for builtins; --help for most programs; man for full reference pages.
- __Man page sections:__ 1 user commands, 5 file formats, 8 admin commands, among others. Use man 5 passwd to pick a section.
- __Searching the manual:__ apropos (or man -k) finds commands by keyword; whatis gives one-line summaries.
- __More documentation:__ info pages are hyperlinked; package docs live in /usr/share/doc (use zless for .gz files).
- __Aliases:__ alias name='commands' creates one (check the name with type first); unalias removes it; ; chains commands. Aliases last only for the session unless saved in ~/.bashrc.

# Glossary

__Term__

__Definition__

Executable program

A command stored as a file on disk

Compiled program

A program translated to machine code, e.g. from C

Script

A program run by an interpreter, e.g. Bash or Python

Shell builtin

A command built into the shell itself

Shell function

A small shell script stored in the shell's environment

Alias

A user-defined name standing in for another command or commands

type

Shows how the shell interprets a command name

which

Shows the location of an executable program

help

Displays help for Bash builtins

--help

A common option that prints a program's usage summary

Man page

A formal reference document for a command, file or interface

Man page section

A numbered part of the manual, e.g. 1 (commands) or 5 (file formats)

SYNOPSIS

The man page section showing a command's syntax

apropos / man -k

Search man page names and descriptions by keyword

whatis

Show a command's one-line man page description

info

The GNU hyperlinked documentation reader

/usr/share/doc

Directory of package documentation

zless

Read gzip-compressed text files

unalias

Remove an alias

Command separator (;)

Runs commands one after another on one line

# Review questions

1. Name the four kinds of command.
2. Why must cd be a shell builtin rather than a separate program?
3. type ls reports ls is aliased to 'ls --color=auto'. What does that mean?
4. Why might which cd print nothing?
5. How do you get help for a builtin such as cd?
6. In a syntax line, what do square brackets and a vertical bar mean?
7. You want to learn the format of the /etc/passwd file. Which command?
8. What does the notation fstab(5) mean?
9. You need a command for working with partitions but don't know its name. What do you type?
10. What is whatis ls likely to print?
11. Where would you look for a package's README and change log?
12. Write an alias called today that runs date then cal.
13. Why check a name with type before creating an alias?
14. How could an attacker misuse aliases, and how would you spot it?

# Answer key

1. __Executable programs, shell builtins, shell functions and aliases.__
2. __cd must change the shell's own current directory.__ A separate program could only change its own, which would be lost when it exited.
3. __Typing ls actually runs ls --color=auto__ — an alias adds colour to the output.
4. __cd is a builtin, not a file on disk__, so which (which only finds programs on the path) has nothing to report.
5. __help cd.__
6. __Square brackets mark optional items; a vertical bar separates mutually exclusive choices.__
7. __man 5 passwd.__
8. __The fstab man page in section 5__ (file formats).
9. __apropos partition__ (or man -k partition).
10. __ls (1) - list directory contents.__
11. __/usr/share/doc/<package>/.__
12. __alias today='date; cal'.__
13. __To avoid hiding an existing command__ with the same name.
14. __By adding malicious aliases to startup files__ (e.g. aliasing sudo to capture passwords). Spot it by running alias and type on key commands, and by checking ~/.bashrc and similar files.
