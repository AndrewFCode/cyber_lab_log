---
title: "PowerShell 7: Adding Commands — Class Notes"
description: "Full class notes for MoL ch. 7: management shells, snap-ins vs modules, module discovery/import, profile scripts, and the PowerShell Gallery."
tags: ["class-notes", "powershell", "month-of-lunches", "windows", "modules", "snap-ins", "profile-scripts", "powershell-gallery"]
draft: false
pubDate: 2026-09-27
---

> **How these notes were made:** the material supplied for this lesson was the
> chapter's own **heading list** — "How one shell can do everything", "About
> product-specific management shells", "Extensions: finding/adding snap-ins",
> "Extensions: finding/adding modules", "Command conflicts and removal",
> "On non-Windows OS", "Playing with a new module", "Profile scripts",
> "Getting modules from the internet", "Common points of confusion" — with an
> explicit instruction to draft the content from general knowledge rather than
> a transcript. These notes follow that structure, but the explanations are
> written from general knowledge of **PowerShell's module system**, **not**
> reproduced or paraphrased from Don Jones and Jeffery Hicks's actual book
> text, which was not supplied. Worth checking against your own copy of the
> chapter for their specific wording and examples.


**Class notes · Learn Windows PowerShell in a Month of Lunches (3rd ed.),
Don Jones and Jeffery Hicks · Chapter 7**

> **Quick reference:** the short version of this lesson lives in the
> [Learn PowerShell resource sheets](/cyber_lab_log/resources/powershell/7/). This follows
> Chapter 6 (The Pipeline) and shifts focus: rather than what PowerShell can
> already do, this chapter is about **extending** what it can do with
> additional commands.

## Learning objectives

By the end of these notes you should be able to:

1. Explain how one shell provides commands for many different products.
2. Explain what a "management shell" actually is.
3. Distinguish snap-ins from modules, and find and load each.
4. Resolve command-name conflicts between extensions.
5. Explain module behaviour differences on non-Windows platforms.
6. Use a profile script to preload extensions automatically.
7. Find and install modules from the internet.

## 1. How one shell can do everything

PowerShell's core engine does not, by itself, know how to manage Exchange
mailboxes, Azure resources, or SQL Server databases. Instead, PowerShell is
built to be **extended**: vendors and the community ship **cmdlets** for their
own products as add-ons, which you load into an ordinary PowerShell session as
needed. The result is that the **same shell** — the same syntax, the same
pipeline, the same help system — works for practically any product that has
published a PowerShell extension, rather than needing a completely different
tool for every product.

## 2. Product-specific "management shells"

Many products ship with what looks like their own dedicated shell — for
example, an "Exchange Management Shell" shortcut, or a "SQL Server PowerShell"
icon. These are **not** separate shells with their own engine. They are
ordinary `powershell.exe` (or `pwsh`) sessions, launched with a shortcut that
automatically **loads that product's extension** before you see a prompt.

> **Exam tip:** if you understand this, a "management shell" stops looking
> like a mysterious separate tool and becomes simply "PowerShell, with one
> particular extension already loaded" — you could achieve the same result
> yourself in an ordinary PowerShell window by loading that extension
> manually.

## 3. Extensions: finding and adding snap-ins

**Snap-ins** are the **older** of the two extension mechanisms, from early
PowerShell versions. A snap-in is a compiled `.dll` registered with Windows,
providing a set of cmdlets.

```powershell
Get-PSSnapin -Registered      # list snap-ins installed and available to load
Add-PSSnapin <SnapinName>     # load a registered snap-in into the session
Get-PSSnapin                  # list snap-ins currently loaded
```

> **Note (beyond this lesson):** snap-ins are effectively **legacy**. They
> only work in **Windows PowerShell** (not in cross-platform PowerShell
> 7/PowerShell Core), and Microsoft's own guidance since PowerShell 2.0 has
> been to prefer **modules** for new extensions. You mainly still encounter
> snap-ins with older products that have not been updated (some legacy
> Exchange tooling being a well-known example).

## 4. Extensions: finding and adding modules

**Modules** are the modern extension mechanism, and almost everything you add
to PowerShell today will be a module rather than a snap-in.

```powershell
Get-Module -ListAvailable     # list modules installed on this system
Import-Module <ModuleName>    # load a module into the current session
Get-Module                    # list modules currently loaded
```

Once a module is imported, the commands it provides behave exactly like
built-in cmdlets — same discoverability, same help, same pipeline behaviour.

> **In the real world:** since PowerShell 3.0, you often do not even need to
> run `Import-Module` explicitly. If a command from an installed module is
> typed at the prompt, PowerShell **auto-discovers and auto-loads** the module
> that provides it the first time it is used in a session.

## 5. Command conflicts and removal

Two different extensions can sometimes provide a command with the **same
name**. When that happens, the **most recently imported** module's version of
the command generally takes precedence.

To avoid a clash deliberately, `Import-Module` accepts a **`-Prefix`**
parameter, which adds a prefix to every noun in that module's commands (so
`Get-User` from one module could become `Get-ContosoUser` when imported with
`-Prefix Contoso`), letting both versions coexist without a naming collision.

To remove a loaded module (and the conflict it may be causing) from the
current session:

```powershell
Remove-Module <ModuleName>
```

### 5.1 Worked example — resolving a naming conflict

Two different vendor modules, `ModuleA` and `ModuleB`, both provide a
`Get-Report` cmdlet, and you need both loaded at once.

```powershell
Import-Module ModuleA
Import-Module ModuleB -Prefix B

Get-Report          # runs ModuleA's version
Get-BReport          # runs ModuleB's version, thanks to the prefix
```

Both commands are now available side by side, disambiguated by the prefix
rather than one silently overriding the other.

## 6. Extensions on non-Windows OS

PowerShell 7 (built on .NET, and often called PowerShell Core) runs on
**Linux and macOS** as well as Windows. Not every module behaves identically
across platforms:

- Modules that rely on **Windows-only** APIs (certain hardware, registry, or
  WMI-dependent features, for instance) may be **unavailable or limited** on
  Linux/macOS.
- Most general-purpose modules — especially ones aimed at cross-platform
  scenarios like cloud management (Azure, AWS) — work consistently everywhere.
- **Snap-ins do not work at all outside Windows PowerShell** — this is one of
  the concrete reasons modules have fully superseded them.

## 7. Playing with a new module

A typical first encounter with an unfamiliar module follows a predictable
pattern:

```powershell
Get-Module -ListAvailable NewModuleName   # confirm it's actually installed
Import-Module NewModuleName                # load it
Get-Command -Module NewModuleName          # see what commands it adds
Get-Help <SomeNewCommand> -Examples        # learn one command at a time
```

This mirrors the general PowerShell discovery habit from earlier chapters —
find what's there, then read the help — just applied to a module's commands
specifically rather than the whole shell.

## 8. Profile scripts: preloading extensions when the shell starts

Typing `Import-Module` for the same set of modules every single session gets
tedious. A **profile script** runs automatically every time PowerShell
starts, and is the natural place to put commands you always want available —
including `Import-Module` lines for extensions you use constantly.

```powershell
$PROFILE          # shows the path to your personal profile script
Test-Path $PROFILE  # check whether it currently exists
```

If it does not exist yet, you create it (and its containing folder, if
needed) and add lines such as:

```powershell
Import-Module MyFavouriteModule
```

> **Note (beyond this lesson):** `$PROFILE` actually represents **one of
> several** possible profile scripts — PowerShell checks scripts scoped to
> the current user vs all users, and the current host application (the
> console) vs all hosts. `$PROFILE` on its own points at the "current user,
> current host" profile, the one used most often for personal customisation.

## 9. Getting modules from the internet

Beyond what ships with Windows or a product installer, a huge additional
library of community and vendor modules is published to the **PowerShell
Gallery**, and PowerShell's built-in package-management commands can search
it and install directly from it:

```powershell
Find-Module -Name SomeModule           # search the Gallery
Install-Module -Name SomeModule        # download and install it
Install-Module -Name SomeModule -Scope CurrentUser   # install for you only, no admin needed
```

Once installed this way, the module behaves exactly like any other installed
module — `Get-Module -ListAvailable`, `Import-Module`, and so on all work the
same regardless of where the module originally came from.

## 10. Common points of confusion

A few recurring stumbling blocks when working with extensions:

- **Installed vs imported.** A module can be **installed** on the system
  (present on disk, listed by `Get-Module -ListAvailable`) without being
  **imported** into your current session (actually usable right now,
  listed by plain `Get-Module`). Auto-loading blurs this in practice, but the
  distinction still matters when troubleshooting "why can't I use this
  command."
- **Module vs snap-in confusion.** Because both extend PowerShell with new
  cmdlets, it is easy to assume they behave identically — but snap-ins use a
  different loading mechanism (`Add-PSSnapin`, not `Import-Module`) and do
  not work at all in PowerShell 7.
- **Scope of installation.** `Install-Module` without `-Scope CurrentUser`
  typically installs for **all users** and requires **administrator**
  rights — a common source of unexpected "access denied" errors for someone
  expecting a simple, user-level install.
- **"Management shell" mystique.** As covered in Section 2, a product's
  dedicated shell shortcut is not special magic — it is ordinary PowerShell
  with one extension preloaded, which is worth remembering when a "shell"
  feels mysteriously limited or oddly configured compared to your usual
  session.

## 11. Security perspective

Extending PowerShell with third-party code is, functionally, running someone
else's software with your privileges — worth treating with the same care as
any other software installation:

- **Modules run with your permissions, and can do anything a script can do.**
  A module is code, not a passive data file; importing it can execute
  initialization logic immediately. Install modules only from **sources you
  trust** — the official PowerShell Gallery listing for a well-known
  publisher, not an unofficial mirror or a link from an untrusted source.
- **The PowerShell Gallery is a public, open publishing platform**, similar
  in spirit to other language package registries — which means it carries the
  same general **supply-chain risk**: a malicious or compromised package can
  be published under a plausible-sounding name. Check publisher identity and
  package reputation (download counts, review the module's actual source
  where available) before installing anything into an environment that
  matters.
- **`-Scope CurrentUser` narrows blast radius, not just admin friction.**
  Installing for the current user only, rather than all users, means a
  compromised or malicious module affects one account's profile rather than
  every user of the machine — a meaningful containment benefit on a shared or
  multi-user system, on top of avoiding the need for elevated rights.
- **Profile scripts are a very effective persistence location.** Because a
  profile script runs **automatically** every time PowerShell starts, it is
  an attractive place for malicious code to hide if an attacker can write to
  it — a rogue `Import-Module` or arbitrary command added to `$PROFILE`
  executes silently on every future session. Review profile script contents
  periodically, and protect write access to profile files the same way you
  would protect any other auto-run location.
- **Execution policy is a related, separate control worth knowing exists.**
  PowerShell's execution policy setting restricts which scripts can run at
  all — it is not covered in this chapter's own headings, but it interacts
  directly with everything here: an overly permissive execution policy
  removes one of the practical speed bumps against an unwanted script (module
  or otherwise) running unintentionally.

## Summary

- PowerShell is **extensible**: the same shell gains new product-specific
  commands by loading **extensions**, rather than needing a separate tool per
  product.
- A **"management shell"** is just ordinary PowerShell with one extension
  **preloaded** by its launch shortcut — not a distinct engine.
- **Snap-ins** (`Add-PSSnapin`, `Get-PSSnapin -Registered`) are the legacy
  mechanism, Windows-only and largely superseded; **modules**
  (`Import-Module`, `Get-Module -ListAvailable`) are the modern standard and
  often **auto-load** on first use since PowerShell 3.0.
- **Conflicts** between same-named commands favour the most recently
  imported module; **`-Prefix`** on `Import-Module` avoids the clash
  deliberately; **`Remove-Module`** unloads one.
- On **non-Windows** platforms, most modules work fine, but Windows-only-API
  modules and **all snap-ins** do not.
- **`$PROFILE`** points to your personal startup script — put routine
  `Import-Module` lines there to preload extensions automatically.
- The **PowerShell Gallery** hosts installable modules (`Find-Module`,
  `Install-Module`, optionally `-Scope CurrentUser`).
- Common confusions: **installed vs imported**, **module vs snap-in**,
  install **scope**, and the **"management shell" mystique**.

## Glossary

| Term | Meaning |
| --- | --- |
| Extension | An add-on providing new PowerShell commands. |
| Management shell | PowerShell pre-loaded with one product's extension. |
| Snap-in | Legacy, Windows-only extension mechanism. |
| Module | The modern extension mechanism; cross-platform. |
| Import-Module | Loads a module into the current session. |
| Add-PSSnapin | Loads a registered snap-in into the session. |
| Auto-loading | PowerShell loading a module automatically on first use. |
| -Prefix | Import-Module parameter avoiding command-name clashes. |
| Remove-Module | Unloads a module from the current session. |
| $PROFILE | The path to the current user/host's profile script. |
| Profile script | A script run automatically at PowerShell startup. |
| PowerShell Gallery | The public online repository for modules. |
| Find-Module | Searches the PowerShell Gallery. |
| Install-Module | Downloads and installs a module from the Gallery. |
| Scope (install) | Whether a module installs for the current user or all users. |
| Execution policy | Setting controlling which scripts may run (beyond this lesson). |

## Review questions

1. How does PowerShell provide commands for so many different products from
   one shell?
2. What is a "management shell" actually, underneath its shortcut?
3. Name the command to list registered snap-ins, and the command to load one.
4. What is the modern replacement for snap-ins, and what command imports one?
5. What happens automatically, since PowerShell 3.0, when you type a command
   from an installed-but-not-yet-imported module?
6. If two modules provide a command with the same name, which one's version
   runs?
7. How does the -Prefix parameter on Import-Module solve a naming conflict?
8. Which extension type does not work at all outside Windows PowerShell?
9. What does $PROFILE point to, and why would you edit it?
10. Name the two commands used to search for, and then install, a module from
    the PowerShell Gallery.
11. What does -Scope CurrentUser change about an Install-Module command?
12. Describe two of the "common points of confusion" from this lesson.
13. Scenario: you need two vendor modules loaded that both define a
    Get-Status command. How do you use both without one overwriting the
    other?
14. Scenario: a PowerShell session behaves oddly every time it starts, running
    an unexpected command nobody remembers adding. Where would you look first?

## Answer key

1. **Vendors and the community publish extensions (modules/snap-ins) adding
   product-specific cmdlets, loaded into an otherwise ordinary shell.**
   Extensibility, not separate tools.
2. **Ordinary PowerShell with one particular extension already loaded by the
   shortcut that launches it.** No separate engine.
3. **`Get-PSSnapin -Registered` lists them; `Add-PSSnapin <name>` loads
   one.** The legacy pair of commands.
4. **Modules; `Import-Module <name>` loads one.** The modern mechanism.
5. **PowerShell auto-discovers and auto-loads the module that provides that
   command, without needing an explicit Import-Module.** Auto-loading since
   v3.
6. **The most recently imported module's version takes precedence.** Import
   order matters.
7. **It prefixes every noun in that module's commands, so both versions get
   distinct names and can coexist.** Disambiguation by naming.
8. **Snap-ins — they don't work outside Windows PowerShell (not in
   PowerShell 7/Core).** Windows-only legacy mechanism.
9. **The path to your personal (current user, current host) profile script;
   you edit it to preload extensions or settings automatically at
   startup.** Startup customisation point.
10. **`Find-Module` to search; `Install-Module` to download and install.**
    The Gallery workflow.
11. **It installs the module for the current user only, avoiding the need
    for administrator rights (versus installing for all users by
    default).** Per-user, no elevation needed.
12. **Installed vs imported (present on disk vs actually loaded), and module
    vs snap-in confusion (different loading commands, different platform
    support) — any two valid points named in the lesson.** Recurring
    stumbling blocks.
13. **Import one normally and the other with `-Prefix`, e.g. `Import-Module
    ModuleB -Prefix B`, giving `Get-Status` and `Get-BStatus`.** Prefix
    avoids the clash.
14. **The profile script (`$PROFILE`) — it runs automatically on every
    startup and is a common place for an unexpected auto-run command to
    hide.** A classic startup-persistence location.
