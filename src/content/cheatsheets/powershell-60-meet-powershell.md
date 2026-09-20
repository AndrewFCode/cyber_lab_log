---
title: "PowerShell: Meet PowerShell"
description: "Month of Lunches ch. 2 — engine vs host, console/Windows Terminal/VS Code, console setup, tab completion, PSReadLine history and predictions, and running elevated."
tags: ["powershell", "month-of-lunches", "windows", "vscode"]
draft: false
updated: "2026-09-20"
kind: "resource"
resource: "powershell"
module: "Ch. 2"
moduleOrder: 60
unit: 2
---
> **In one line:** the engine runs your commands; the host (console, Windows Terminal, VS Code) is the window — set up a readable console, master Tab and PSReadLine, and elevate only when you need to.

*Companion to: Learn PowerShell in a Month of Lunches (Jeffery Hicks et al.), Chapter 2.* The full version is the Chapter 2 class notes.

---

## Engine vs host

`$Host.Name` tells you which host you're in — `ConsoleHost` in a terminal, `Visual Studio Code Host` in VS Code.

## Where to work

| Host | Best for |
|---|---|
| Console (Windows Terminal) | Interactive commands — most of this book |
| **VS Code + PowerShell extension** | Writing/debugging scripts. **F8** runs a selection, **F5** runs the file |
| ISE | Legacy, **Windows PowerShell 5.1 only** — not PS7 |

## Console setup

Monospaced coding font (distinguishes backtick `` ` `` from apostrophe `'`), readable size, high-contrast colours, wide window.

## Typing faster

| Feature | Key |
|---|---|
| Tab completion | **Tab** — commands, parameters, values, paths |
| Show all matches | **Ctrl+Space** (Windows) |
| History search | **Ctrl+R**, type part of an old command |
| Accept a prediction | **Right arrow** (grey suggested text) |
| Switch prediction view | **F2** |

`Get-History` = this session only. The **PSReadLine file** = every session, saved to disk:
```powershell
(Get-PSReadLineOption).HistorySavePath
```

## Running elevated

| Platform | How | How to tell |
|---|---|---|
| Windows | Right-click → **Run as administrator** | Title bar starts "Administrator:" |
| macOS/Linux | `sudo <command>` | Password prompt |

```powershell
([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole(
    [Security.Principal.WindowsBuiltInRole]::Administrator)
```

## Cross-platform gotchas

| Windows | Linux/macOS |
|---|---|
| `\` paths (also accepts `/`) | `/` paths |
| Not case-sensitive filenames | **Case-sensitive** |
| `ls`, `cat`, `ps` are aliases for cmdlets | Those names run the **native** commands instead |

---

## 🔐 Security notes

- **The PSReadLine history file is plain text and persists across sessions** — never type secrets as command arguments; use `Get-Credential` instead.
- **Elevate only for the task**, then close the elevated window — don't explore day-to-day as admin.
- **`Start-Transcript` / `Stop-Transcript`** records a session for change evidence — but store transcripts carefully, since they can capture sensitive output.

---

## Practice drills

<details>
<summary>1. How do you find out which host you're running in?</summary>

`$Host.Name`.
</details>

<details>
<summary>2. In VS Code, what's the difference between F8 and F5?</summary>

F8 runs the current line/selection; F5 runs the whole script.
</details>

<details>
<summary>3. How do you search backwards through command history for one containing "Sort-Object"?</summary>

Press Ctrl+R, then type Sort-Object.
</details>

<details>
<summary>4. What's the difference between Get-History and the PSReadLine history file?</summary>

Get-History covers only the current session; the PSReadLine file covers every session, saved to disk.
</details>

<details>
<summary>5. Why does `ls -la` work on Linux PowerShell but not on Windows PowerShell?</summary>

On Linux, `ls` isn't a PS alias, so it runs the native `ls`; on Windows, `ls` is an alias for Get-ChildItem, which has no `-la` parameter.
</details>

---

## Key takeaways

- **Engine** runs commands; **host** (console, VS Code, ISE) displays them. Check with `$Host.Name`.
- Console for interactive work; **VS Code + PowerShell extension** for scripts (F8/F5); ISE is 5.1-only.
- **Tab** completes; **PSReadLine** adds Ctrl+R search and grey predictions (Right arrow to accept).
- Elevate on Windows via "Run as administrator" (title bar tells you); `sudo` elsewhere.
- Paths and case sensitivity, and some aliases, differ between Windows and Linux/macOS.
