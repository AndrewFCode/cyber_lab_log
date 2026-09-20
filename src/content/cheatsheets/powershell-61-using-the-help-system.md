---
title: "PowerShell: Using the Help System"
description: "Month of Lunches ch. 3 — Update-Help/Save-Help, finding commands with Get-Command, reading syntax and parameter sets, Get-Help options, about_ topics, and -WhatIf/-Confirm."
tags: ["powershell", "month-of-lunches", "windows", "help"]
draft: false
updated: "2026-09-20"
kind: "resource"
resource: "powershell"
module: "Ch. 3"
moduleOrder: 61
unit: 3
---
> **In one line:** learn to find and read help, and you can teach yourself any command — `Get-Command` to discover, `Get-Help -Examples` for usage, and `-WhatIf` before anything that changes the system.

*Companion to: Learn PowerShell in a Month of Lunches (Jeffery Hicks et al.), Chapter 3.* The full version is the Chapter 3 class notes.

---

## Updatable help

```powershell
Update-Help                                  # CurrentUser scope is the PS7 default
Update-Help -Scope AllUsers                  # needs elevation
Save-Help -DestinationPath <folder>          # for offline machines
Update-Help -SourcePath <folder>             # install from that folder
```
Some module errors during `Update-Help` are normal.

## Finding a command

```powershell
Get-Help *event*
Get-Command -Noun Process           # guess the noun, list its verbs
Get-Command -Verb Get -Noun *Net*
help Stop-Process -Examples         # help = pages the output
```

## Reading syntax

| Pattern | Meaning |
|---|---|
| `-Name <string[]>` | Mandatory, **named** |
| `[-Id] <int[]>` | Mandatory, **positional** |
| `[[-Path] <string[]>]` | **Optional**, positional |
| `[-Force]` | Switch — no value |
| `<type[]>` | Accepts **one or more** values (comma-separated) |

**Parameter sets** = different valid ways to use a command; you can't mix parameters from different sets (e.g. `-Id` and `-Name` on `Stop-Process`).

## Get-Help options

| Option | Shows |
|---|---|
| `-Examples` | Just the examples — often fastest |
| `-Detailed` | Parameters + examples |
| `-Full` | Everything |
| `-Parameter Name` | One parameter's details |
| `-Online` | Latest web version |

## about_ topics

```powershell
Get-Help about_*
Get-Help about_CommonParameters      # -Verbose, -ErrorAction, -WhatIf...
```

## Before you run it

Syntax showing `-WhatIf` / `-Confirm` = **this command changes something**.
```powershell
Stop-Process -Name notepad -WhatIf
# What if: Performing the operation "Stop-Process" on target "notepad (4312)".
```

---

## 🔐 Security notes

- **`-WhatIf` first, always, for anything unfamiliar that changes state.**
- **Read the help for a command before running it**, especially one copied from a forum, ticket or chat message.
- **Save-Help + Update-Help -SourcePath** keeps documentation available in offline/locked-down environments.

---

## Practice drills

<details>
<summary>1. On a fresh PS7 install, Get-Help shows almost nothing useful. Why, and what fixes it?</summary>

Full help is downloaded separately; run Update-Help.
</details>

<details>
<summary>2. You need to stop a process but don't know the cmdlet name. How do you find it?</summary>

Get-Command -Noun Process, then pick the verb (Stop-Process).
</details>

<details>
<summary>3. What does `[[-Path] <string[]>]` tell you about that parameter?</summary>

It's optional and positional, and accepts one or more string values.
</details>

<details>
<summary>4. Why can't you use -Id and -Name together on Stop-Process?</summary>

They belong to different parameter sets, and only one set's parameters can be used at a time.
</details>

<details>
<summary>5. A command's syntax includes -WhatIf and -Confirm. What does that tell you?</summary>

The command changes something on the system — test with -WhatIf first.
</details>

---

## Key takeaways

- **Update-Help** downloads full help; **Save-Help** + `-SourcePath` covers offline machines.
- **Get-Command -Noun/-Verb/-Module** finds commands by guessing the noun and checking the verbs.
- **Syntax:** `[-x]` = optional, `[[-x]]` = optional positional, `<type[]>` = multiple values, parameter sets can't mix.
- **Get-Help -Examples/-Full/-Parameter/-Online** for depth; `about_*` for concepts.
- **`-WhatIf`/`-Confirm` in the syntax = a command that changes something — test before you run it.
