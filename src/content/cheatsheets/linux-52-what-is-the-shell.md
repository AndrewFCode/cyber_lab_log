---
title: "Linux: What Is the Shell?"
description: "The Linux Command Line ch. 1 — shell vs terminal, reading the prompt, history and editing keys, copy and paste, and your first commands."
tags: ["linux", "bash", "the-linux-command-line"]
draft: false
updated: "2026-09-18"
kind: "resource"
resource: "linux"
module: "Ch. 1"
moduleOrder: 52
unit: 1
---
> **In one line:** the shell is a program that takes what you type and runs it — the terminal is just the window it lives in.

*Companion to: William Shotts, The Linux Command Line, chapter 1.*

---

## The moving parts

| Term | What it is |
|---|---|
| Shell | The program that reads your commands and runs them. On most Linux systems it's **bash** |
| Terminal emulator | The window that talks to the shell — GNOME Terminal, Konsole, Windows Terminal (via WSL) |
| Virtual console | Text-only screens behind the desktop, reached with `Ctrl+Alt+F3`–`F6` (varies by distro) |
| CLI vs GUI | Typing commands vs clicking. The CLI is faster to repeat, script and run remotely |

```bash
echo $SHELL        # your login shell, e.g. /bin/bash
bash --version     # which bash
cat /etc/shells    # shells installed on this system
```

---

## Reading the prompt

```
andrew@lab:~$
```

| Part | Meaning |
|---|---|
| `andrew` | Your username |
| `lab` | The machine's hostname |
| `~` | Current directory (`~` = your home directory) |
| `$` | Normal user |
| `#` | **Root** (superuser) — careful, nothing will stop you |

If you type a command that doesn't exist, bash tells you: `bash: xyz: command not found`.

---

## Keys

| Key | Does |
|---|---|
| `↑` / `↓` | Scroll through command history |
| `←` / `→` | Move the cursor to edit the line |
| `Enter` | Run the line |
| `Ctrl+C` | **Interrupt** the running command — *not* copy |

### Copy and paste

| Method | How |
|---|---|
| Keyboard | `Ctrl+Shift+C` / `Ctrl+Shift+V` in most terminal emulators |
| Mouse (X11) | Highlighting copies; **middle-click** pastes |

Muscle memory from Windows is the trap: `Ctrl+C` in a terminal kills whatever is running.

---

## First commands

| Command | Does |
|---|---|
| `date` | Current date and time |
| `cal` | Calendar for this month |
| `df` | Free space on each mounted filesystem (`-h` for human-readable sizes) |
| `free` | Memory and swap usage (`-h` for human-readable) |
| `clear` | Clear the screen |
| `exit` | Close the shell (or press `Ctrl+D` on an empty line) |

---

## Getting a shell to practise on

| Option | How |
|---|---|
| Linux VM in your lab | Ubuntu VM — snapshot it first |
| WSL on Windows | `wsl --install` in an elevated PowerShell, then reboot |
| SSH into a lab box | `ssh andrew@192.168.1.50` |

---

## 🔐 Security notes

- **A `#` prompt means root.** Work as a normal user and use `sudo` for the one command that needs it — every `sudo` call is logged.
- **Pasting commands from websites is risky.** A page can hide extra characters or a newline in what you copy, so it runs the moment you paste ("pastejacking").
  - Bash 5.1+ enables *bracketed paste* by default, which stops pasted text running until you press Enter.
  - Still read it before running it.
- **Bash keeps history in `~/.bash_history`.** Investigators read it; attackers try to switch it off with tricks like `unset HISTFILE`. An empty or missing history file on a server is itself a clue.

---

## Practice drills

<details>
<summary>1. What does <code>root@web01:/var/log#</code> tell you?</summary>

You're root, on host `web01`, in `/var/log`.
</details>

<details>
<summary>2. You pressed <code>Ctrl+C</code> to copy some output and the command stopped. Why?</summary>

In a terminal `Ctrl+C` sends an interrupt. Copy with `Ctrl+Shift+C` or by highlighting.
</details>

<details>
<summary>3. How much disk space is free, in GB rather than blocks?</summary>

`df -h`
</details>

<details>
<summary>4. Which shell are you running?</summary>

`echo $SHELL` (and `bash --version` for the version)
</details>

---

## Key takeaways

- The shell runs commands; the terminal emulator is just the window.
- Read the prompt: who you are, where you are, and `$` vs `#`.
- `↑` recalls history. `Ctrl+C` interrupts — it doesn't copy.
- `date`, `cal`, `df -h`, `free -h`, `exit` — you can use a Linux box from minute one.
