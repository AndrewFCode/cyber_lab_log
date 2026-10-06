---
title: "PowerShell: Adding Commands"
description: "MoL ch. 7 — management shells, snap-ins vs modules, module discovery/import, profile scripts, and the PowerShell Gallery."
tags: ["powershell", "month-of-lunches", "windows", "modules", "snap-ins", "profile-scripts", "powershell-gallery"]
draft: false
updated: "2026-09-27"
kind: "resource"
resource: "powershell"
module: "Ch. 7"
moduleOrder: 65
unit: 7
---

> **Drafted from general knowledge:** the source was the chapter's heading list with an instruction to draft from general knowledge, not a transcript — verify against your own copy of Jones & Hicks's book for their specific wording/examples.


> **In one line:** PowerShell gains product-specific commands via extensions — legacy snap-ins or modern (auto-loading, cross-platform) modules — with -Prefix resolving naming conflicts, $PROFILE preloading them at startup, and the PowerShell Gallery as the install source.

*Companion to: Learn Windows PowerShell in a Month of Lunches (3rd ed.), Don Jones & Jeffery Hicks, Chapter 7.* The full version is the Adding Commands class notes; the chapter overview is the Learn PowerShell resource sheet.

## The core idea

- **"Management shells"** (Exchange, SQL Server, etc.) are just ordinary PowerShell with one extension **preloaded** by their shortcut — not a separate engine.

## Snap-ins vs modules

| | Snap-in (legacy) | Module (modern) |
| --- | --- | --- |
| List | `Get-PSSnapin -Registered` | `Get-Module -ListAvailable` |
| Load | `Add-PSSnapin <name>` | `Import-Module <name>` |
| Currently loaded | `Get-PSSnapin` | `Get-Module` |
| Cross-platform (PS 7/Core)? | **No** | Yes (mostly) |
| Auto-loads? | No | **Yes**, since PS 3.0 |

## Command conflicts

- Same-named command from two modules → **most recently imported wins**.
- Avoid deliberately: `Import-Module ModuleB -Prefix B` → `Get-Status` and `Get-BStatus` coexist.
- Unload: `Remove-Module <name>`.

## Playing with a new module

```powershell
Get-Module -ListAvailable NewModuleName
Import-Module NewModuleName
Get-Command -Module NewModuleName
Get-Help <SomeNewCommand> -Examples
```

## Profile scripts

```powershell
$PROFILE             # path to your personal (current user/host) profile
Test-Path $PROFILE   # does it exist yet?
```

Add `Import-Module X` lines there to preload extensions every session. `$PROFILE` is one of **several** profile scopes (user/host combinations).

## Getting modules from the internet

```powershell
Find-Module -Name SomeModule
Install-Module -Name SomeModule
Install-Module -Name SomeModule -Scope CurrentUser   # no admin needed
```

## Common points of confusion

- **Installed** (on disk, `Get-Module -ListAvailable`) ≠ **imported** (loaded now, `Get-Module`).
- Snap-in ≠ module — different commands, different platform support.
- `Install-Module` without `-Scope CurrentUser` → all users, needs admin.
- A "management shell" is not special — it's PowerShell + a preloaded extension.

## 🔐 Security notes

- **A module is code, not data** — install only from trusted sources (official Gallery listing, known publisher).
- **PowerShell Gallery is an open registry** — same supply-chain risk as any package registry; check publisher/reputation before installing into anything that matters.
- **`-Scope CurrentUser` narrows blast radius**, not just admin friction — a bad module affects one profile, not every user.
- **Profile scripts are a persistence favourite** — they run automatically every startup; a rogue line in `$PROFILE` runs silently forever. Review it periodically and protect write access.
- **Execution policy** is a related control (not in this chapter) restricting which scripts run at all — an overly permissive policy removes a speed bump against unwanted code.

## Practice drills

<details>
<summary>1. What is a "management shell" really?</summary>

Ordinary PowerShell with one particular extension already loaded by the shortcut that launches it.
</details>

<details>
<summary>2. Commands to list and load a snap-in?</summary>

Get-PSSnapin -Registered (list); Add-PSSnapin <name> (load).
</details>

<details>
<summary>3. What happens since PowerShell 3.0 when you type a command from an installed-but-not-imported module?</summary>

PowerShell auto-discovers and auto-loads the module that provides it, no explicit Import-Module needed.
</details>

<details>
<summary>4. Two modules both define Get-Status. How do you use both?</summary>

Import one normally, the other with -Prefix (e.g. Import-Module ModuleB -Prefix B), giving Get-Status and Get-BStatus.
</details>

<details>
<summary>5. Which extension type doesn't work outside Windows PowerShell?</summary>

Snap-ins — they don't work in PowerShell 7/Core.
</details>

<details>
<summary>6. What does $PROFILE do, and why edit it?</summary>

Points to your personal profile script; edit it to preload modules/settings automatically at startup.
</details>

<details>
<summary>7. What does -Scope CurrentUser change on Install-Module?</summary>

Installs for the current user only, avoiding the need for administrator rights.
</details>

## Key takeaways

- **"Management shells" = PowerShell + a preloaded extension**, nothing more exotic.
- **Modules superseded snap-ins**: cross-platform, auto-loading, the modern standard.
- **`-Prefix`** resolves naming conflicts; **`Remove-Module`** unloads.
- **`$PROFILE`** preloads extensions at startup; **PowerShell Gallery** (`Find-Module`/`Install-Module`) is the install source.
- **Security:** modules are code — trust the source, prefer `-Scope CurrentUser`, and watch profile scripts as a persistence spot.
