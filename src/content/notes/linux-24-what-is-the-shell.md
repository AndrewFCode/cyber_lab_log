---
title: "Linux 1: What Is the Shell"
description: "When you type a command, something has to read it, work out what you mean and ask the operating system to do it. That something is the shell: a program whose whole job is to take keyboard commands and pass them to…"
tags: ["linux", "class-notes"]
draft: false
pubDate: 2026-09-20
---

__Class notes · William Shotts, The Linux Command Line · Chapter 1__

__Quick reference:__ the short version of this chapter is the Chapter 1 cheat sheet.

## Learning objectives

By the end of these notes you should be able to:

1. Explain what a shell is, and how it differs from a terminal emulator.
2. Read the Bash prompt and tell whether you're working as a normal user or as root.
3. Recall and edit previous commands using the arrow keys and history.
4. Run simple information commands (date, cal, df, free) and interpret their output.
5. Copy and paste in a Linux terminal, and understand why it differs from Windows.
6. Use virtual consoles, and end a terminal session cleanly.
7. Explain why the command line matters for security work.

## 1. The shell and the terminal

## 1.1 What the shell is

When you type a command, something has to read it, work out what you mean and ask the operating system to do it. That something is the __shell__: a program whose whole job is to take keyboard commands and pass them to the OS to carry out.

Almost every Linux distribution uses __Bash__ as its default shell. The name stands for "Bourne Again SHell" — an improved replacement for sh, the original Unix shell written by Steve Bourne. Other shells exist (zsh is the default on macOS, and fish is popular), but Bash is the one you'll meet on servers, in scripts and in security tools.

## 1.2 Terminal vs shell

Two pieces of software are working when you open a command line, and it's worth keeping them separate in your head:

__Piece__

__Job__

__Examples__

Terminal emulator

A graphical window that shows text and sends your keystrokes on

GNOME Terminal, Konsole, xterm, Windows Terminal

Shell

Interprets what you type and runs the commands

bash, zsh, sh, fish

 \+-------------------- Terminal emulator (a window) --------------------\+
 |                                                                      |
 |   You type  --->  SHELL (bash)  --->  Linux kernel  --->  hardware   |
 |                        ^                                             |
 |   Output    <----------\+   (results shown in the window)             |
 |                                                                      |
 \+----------------------------------------------------------------------\+The "emulator" part of the name is historical. Real __terminals__ were once physical devices — a screen and keyboard wired to a distant computer. Today a window on your desktop pretends to be one.

__Note:__ a terminal emulator is not the shell. You can run a different shell inside the same terminal window: type zsh or sh to start one, and exit to come back to Bash.

__Check which shell you're using:__

echo $SHELL       \

# your login shell, e.g. /bin/bash
echo $0           \

# the shell running right now, e.g. bash

## 2. Reading the prompt

## 2.1 Anatomy of the prompt

When the shell is ready for a command it shows a __prompt__. The default Bash prompt on most distributions looks like this:

 andrew@linuxbox:~$
 \\\_\_\_\_/ \\\_\_\_\_\_\_/ |  |
   |       |     |  \+-- $ = normal user    \

# = superuser (root)
   |       |     \+----- current directory (~ = your home directory)
   |       \+----------- hostname (the machine's name)
   \+------------------- usernameThe exact format varies by distribution and can be customised (Shotts covers this later in the book). The two things to read every time are __where you are__ and __who you are__.

## 2.2 The $ and \

# difference

__Last character__

__Meaning__

__Risk__

$

You're a normal user

Mistakes are limited to your own files

\#

You're the __superuser (root)__

Every command runs with full power over the whole system

## 2.3 Worked example — reading unfamiliar prompts

__Prompt__

__Who__

__Where__

andrew@linuxbox:~$

andrew, normal user

andrew's home directory

andrew@linuxbox:/etc$

andrew, normal user

/etc

root@web01:/var/log\#

root — the superuser

/var/log on the machine web01

\[andrew@rhel9 ~\]$

andrew, normal user

home — Red Hat-style brackets

The third one deserves care: you're root on what sounds like a web server. Slow down before pressing Enter.

__In the real world:__ during an investigation or a pentest, the prompt is the first clue to what you have. Landing on a \

# prompt means you have root; a $ prompt means you'll be looking for a way to escalate privileges.

## 3. Your first keystrokes

## 3.1 Typing a command that doesn't exist

Type random characters and press Enter:

$ kaekfjaeifj
bash: kaekfjaeifj: command not foundNothing breaks. The shell tells you it couldn't find a command by that name and gives you the prompt back. Learning to read error messages calmly — rather than guessing — is one of the most useful habits you can build.

## 3.2 Command history

Bash remembers what you've typed. By default it keeps the last 1,000 commands in memory (the HISTSIZE setting), and saves them to ~/.bash\_history when the shell exits.

__Key or command__

__Does__

Up arrow

Previous command

Down arrow

Next command

history

List remembered commands, numbered

history 10

Show the last 10

The __history file__ can be larger than the in-memory list, depending on the distribution's settings.

## 3.3 Cursor movement

__Key__

__Does__

Left / right arrows

Move the cursor along the line to edit it

Home / End

Jump to the start / end of the line

Backspace / Delete

Remove characters

Enter

Run the line, wherever the cursor is

You don't need to move to the end of the line before pressing Enter — the whole line runs.

## 3.4 Worked example — fixing a typo without retyping

1. You type dg -h and get command not found.
2. Press __Up__ — the line comes back.
3. Press __Home__, then __Right__ once, and type f — the line now reads dfg -h.
4. Press __Delete__ to remove the g — the line reads df -h.
5. Press __Enter__.

It feels slower than retyping for a short command, but it's much faster for long ones, and it avoids introducing new typos.

## 4. A few simple commands

These are harmless, read-only commands — good for getting a feel for how commands and their output look.

## 4.1 The commands

__Command__

__Shows__

date

The current date and time

cal

A calendar for the current month

df

Free space on mounted file systems (disk free)

free

Memory and swap use

exit

Ends the session and closes the terminal

cal comes from a separate package on some minimal installs. If it's missing, it's often provided by ncal or util-linux depending on the distribution.

## 4.2 Reading df

$ df -h
Filesystem      Size  Used Avail Use% Mounted on
/dev/sda2        98G   41G   52G  45% /
tmpfs           3.9G     0  3.9G   0% /dev/shm
/dev/sda1       511M  6.1M  505M   2% /boot/efi- __-h__ means "human-readable": sizes in K, M and G rather than 1K blocks.
- __Filesystem__ is the device or virtual file system.
- __Mounted on__ is where it appears in the directory tree. / is the root file system — the main one.
- __tmpfs__ file systems live in RAM, not on disk.

## 4.3 Reading free

$ free -h
               total        used        free      shared  buff/cache   available
Mem:           7.7Gi       2.1Gi       3.0Gi       210Mi       2.6Gi       5.2Gi
Swap:          2.0Gi          0B       2.0Gi- __Look at available, not free.__ Linux uses spare RAM for disk cache (buff/cache) and gives it back when programs need it. Low "free" memory is normal and healthy; low "available" memory is a problem.
- __Swap__ is disk space used as overflow when RAM runs short (the Linux version of the Windows page file). Heavy swap use means the machine needs more RAM or fewer programs.

## 4.4 Worked example — a quick health check

A colleague says a Linux server "feels slow". Before anything else, two read-only commands give a first picture:

1. df -h — / shows Use% 100%. A full root file system breaks logging, updates and many services.
2. free -h — available is healthy at 5 GiB, so memory isn't the issue.

__Theory:__ disk space. The next step (covered in later chapters) is finding what filled it — very often a runaway log in /var/log.

## 5. Copy and paste in the terminal

The X Window System — the graphical layer many Linux desktops have used — offers a fast copy-and-paste method that surprises Windows users:

__Action__

__How__

Copy

Just __select__ text with the left mouse button

Paste

Click the __middle__ mouse button (or press the scroll wheel)

This "primary selection" is separate from the normal clipboard.

- __In terminal emulators,__ Ctrl\+C and Ctrl\+V do __not__ copy and paste, because those keys already mean something to programs running in the terminal.
	- Ctrl\+C sends an __interrupt__ that stops the running command.
	- Use Ctrl\+Shift\+C and Ctrl\+Shift\+V instead (in most terminals).
- __Windows Terminal__ behaves more like Windows: right-click, or Ctrl\+C / Ctrl\+V when text is selected.

__Caution:__ never paste commands from a website straight into a terminal without reading them. What you see on a page and what lands on your clipboard can differ, and a pasted line that ends in a newline runs immediately.

## 6. Virtual consoles and ending a session

## 6.1 Virtual consoles

Even with a desktop running, Linux keeps several full-screen text __virtual consoles__ available:

__Keys__

__Does__

Ctrl\+Alt\+F1 to F6

Switch to a text console (which numbers are used varies by distribution)

Alt\+F1 to F6

Move between consoles once you're in one

Return to the desktop

Usually Ctrl\+Alt\+F1, F2 or F7, depending on the distribution

__Why this matters:__ if the graphical desktop freezes, a virtual console often still works. You can log in there and fix the problem (for example, stop a misbehaving program) without rebooting.

## 6.2 Ending a session

__Method__

__Does__

exit

Ends the shell; the terminal window closes

Ctrl\+D at an empty prompt

Sends "end of input" — same effect as exit

Closing the window

Also ends it, but any running command is killed

## 7. Security perspective

- __The command line is where security work happens.__ Linux servers, network appliances, cloud instances and most security tools are driven from a shell. SOC analysts, incident responders and pentesters all live in one.
- __Read the prompt before every risky command.__ A \

# prompt means you're root: there's no confirmation and no undo. Work as a normal user and use sudo for individual commands (covered later in the book).
- __History is evidence — both ways.__
	- Investigators read ~/.bash\_history to reconstruct what an attacker did.
	- Attackers read it to find passwords typed as command arguments, server names and habits.
	- So never type passwords directly on a command line, and know that history can be cleared or tampered with — its absence is itself suspicious.
- __Pasting is an attack path.__ Malicious "copy this command" instructions on websites and in chat messages are a known technique. Read before you run.
- __Ctrl\+C is your emergency stop.__ If a command is doing something you didn't intend, interrupt it straight away.

# Summary

- The __shell__ interprets your commands; the __terminal emulator__ is the window it runs in. Bash is the standard Linux shell.
- __The prompt__ shows user, host and current directory. $ = normal user; \

# = root. ~ = your home directory.
- __Up/Down arrows__ recall history; history lists it; Left/Right, Home and End edit the current line.
- __First commands:__ date, cal, df -h (disk space) and free -h (memory — read the available column), plus exit to leave.
- __Copy and paste:__ select to copy, middle-click to paste. In terminals, Ctrl\+C interrupts; use Ctrl\+Shift\+C/V.
- __Virtual consoles__ (Ctrl\+Alt\+F1–F6) give text logins even when the desktop is stuck.

# Glossary

__Term__

__Definition__

Shell

A program that reads typed commands and passes them to the OS to run

Bash

Bourne Again SHell — the standard Linux shell

sh

The original Unix shell, by Steve Bourne

Terminal emulator

A graphical program that provides a window for a shell

Command line interface (CLI)

Controlling a computer by typing commands

Prompt

Text the shell shows when it's ready for input

Home directory

Your personal directory, shown as ~

Superuser / root

The all-powerful administrative account

Command history

Previously entered commands the shell remembers

~/.bash\_history

The file where Bash saves command history

df

Reports free and used space on file systems

free

Reports memory and swap usage

Swap

Disk space used as overflow for RAM

Mount point

The directory where a file system appears in the tree

Primary selection

X Window copy buffer: select to copy, middle-click to paste

Interrupt (Ctrl\+C)

A signal that stops the running command

Virtual console

A full-screen text login, reached with Ctrl\+Alt\+F-keys

End of input (Ctrl\+D)

Tells the shell there's no more input; ends the session at an empty prompt

# Review questions

1. What's the difference between a shell and a terminal emulator?
2. What does the name "Bash" stand for?
3. Read this prompt: root@db02:/srv/backups\#. Who, where, and what should you be careful about?
4. Which key recalls the previous command?
5. Where does Bash save your command history when you exit?
6. free -h shows 200 MiB free but 5 GiB available. Is the machine short of memory? Explain.
7. What does the -h option do for df and free?
8. Why doesn't Ctrl\+C copy text in a Linux terminal, and what should you use instead?
9. How do you paste the X Window primary selection?
10. The graphical desktop has frozen. How could you still get a command line?
11. Give two ways to end a shell session.
12. Why should you never type a password as part of a command?

# Answer key

1. __The shell interprets commands; the terminal emulator is the window that displays them and passes on your keystrokes.__
2. __Bourne Again SHell__ — an improved replacement for the Bourne shell, sh.
3. __The root user on the host db02, in /srv/backups.__ You're the superuser on what looks like a database server's backup area — any command runs with full power, so check it twice.
4. __The Up arrow.__
5. __~/.bash\_history.__
6. __No.__ Linux uses spare RAM for disk cache and releases it on demand; available is the real measure, and 5 GiB is plenty.
7. __Shows sizes in human-readable units__ (K, M, G) instead of raw block or byte counts.
8. __Ctrl\+C sends an interrupt to stop the running program.__ Use Ctrl\+Shift\+C and Ctrl\+Shift\+V (or select and middle-click).
9. __Click the middle mouse button__ (or press the scroll wheel).
10. __Switch to a virtual console__ with Ctrl\+Alt\+F1–F6 and log in there.
11. __Any two of:__ exit; Ctrl\+D at an empty prompt; closing the terminal window.
12. __It's saved in ~/.bash\_history__ (and can be visible in process lists), where attackers or other users could read it.
