---
title: "PowerShell: Before You Begin"
description: "Month of Lunches ch. 1 — why PowerShell matters, Windows PowerShell 5.1 vs PowerShell 7, installing and verifying PS7, lab setup, and how to study the book."
tags: ["powershell", "month-of-lunches", "windows"]
draft: false
updated: "2026-09-20"
kind: "resource"
resource: "powershell"
module: "Ch. 1"
moduleOrder: 59
unit: 1
---
> **In one line:** PowerShell turns repetitive admin work into repeatable commands — learn PowerShell 7 (cross-platform, actively developed), which installs alongside Windows PowerShell 5.1 without conflict.

*Companion to: Learn PowerShell in a Month of Lunches (Jeffery Hicks et al.), Chapter 1.* The full version is the Chapter 1 class notes.

---

## Why PowerShell

| GUI | PowerShell |
|---|---|
| Great for doing one thing once | Great at scale — one command, repeated for 1 or 1,000 devices |
| No record of what you did | The command **is** the record |
| Manual every time | Same script, run again next month |

Used across Windows admin, Active Directory, Microsoft 365/Entra/Azure, and (via PowerShell 7) Linux and macOS too.

## Windows PowerShell 5.1 vs PowerShell 7

| | Windows PowerShell 5.1 | PowerShell 7 |
|---|---|---|
| Built on | .NET Framework | Modern .NET |
| Runs on | Windows only | **Windows, macOS, Linux** |
| Executable | `powershell.exe` | `pwsh` / `pwsh.exe` |
| Edition | `Desktop` | **`Core`** |
| Development | Maintenance only | **Actively developed** |
| Coexist? | **Yes** — installing 7 doesn't remove 5.1 | |

**Check your version:**
```powershell
$PSVersionTable.PSVersion
$PSVersionTable.PSEdition    # Desktop = 5.1, Core = 7+
```

## Installing PowerShell 7

| OS | Command |
|---|---|
| Windows | `winget install --id Microsoft.PowerShell --source winget` |
| macOS | `brew install --cask powershell` |
| Ubuntu/Debian | Add Microsoft's repo, then `sudo apt-get install -y powershell` |
| RHEL/Fedora | Add Microsoft's repo, then `sudo dnf install -y powershell` |

Prefer an **LTS** release for work systems.

## Lab setup

- Windows, macOS or mainstream Linux — PS7 runs on all.
- Ideally a **VM** (or several) you can break safely; remoting chapters want two Windows machines.
- **Admin rights** for exercises that change system settings.

## How to study this book

| Element | Do this |
|---|---|
| Main text | Read with a PowerShell window open |
| **Try it now** | Stop and type it **immediately** — don't just read |
| Labs | Complete every one before moving on |
| **Above and beyond** | Optional — skip on a busy day, return later |

**Type, don't paste.** Don't skip ahead — later chapters build on help (ch. 3) and the pipeline. Keep a lab log of surprises and fixes.

---

## 🔐 Security notes

- **PowerShell is a favourite "living off the land" tool for attackers** — it's built in, trusted, and powerful.
- **Enable logging** (script block logging, module logging, transcription) so PowerShell activity is visible to defenders.
- **Avoid old Windows PowerShell 2.0** — it lacks modern logging and protections.
- **Install only from official sources**: winget, Microsoft's repos, or GitHub releases.

---

## Practice drills

<details>
<summary>1. What are the executable names for Windows PowerShell and PowerShell 7?</summary>

powershell.exe and pwsh (pwsh.exe on Windows).
</details>

<details>
<summary>2. `$PSVersionTable.PSEdition` returns "Desktop". Which PowerShell are you in?</summary>

Windows PowerShell 5.1.
</details>

<details>
<summary>3. Does installing PowerShell 7 remove 5.1?</summary>

No — they install and run side by side.
</details>

<details>
<summary>4. Which release type is usually safest for a production server: LTS or current?</summary>

LTS (long-term support).
</details>

<details>
<summary>5. What should you do differently with "Try it now" sections versus the main text?</summary>

Stop reading and actually type the commands immediately, rather than just reading past them.
</details>

---

## Key takeaways

- PowerShell automates repetitive admin work and leaves a precise record of what was done.
- **Windows PowerShell 5.1** (Desktop, Windows-only, maintenance mode) and **PowerShell 7** (Core, cross-platform, active development) coexist.
- Check your version with `$PSVersionTable`; install PS7 via winget/Homebrew/apt/dnf; prefer LTS for work systems.
- Study actively: type every example, do every lab, don't skip ahead.
