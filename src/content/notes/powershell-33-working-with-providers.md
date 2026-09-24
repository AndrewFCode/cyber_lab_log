---
title: "PowerShell 5: Working with Providers — Class Notes"
description: "Full class notes on PowerShell providers and PSDrives: what providers are, filesystem organisation, other data stores as drives, navigation, and wildcards vs literal paths."
pubDate: 2026-09-24
tags: ["class-notes", "powershell", "providers", "psdrive", "registry", "filesystem"]
draft: false
---

# Working with Providers

**Class notes · Learn PowerShell in a Month of Lunches (3rd ed.), Don Jones & Jeffery Hicks · Chapter 5**

> **Note on this file's sourcing:** no transcript or scanned text was available for this chapter, only its section headings. These notes are written from general PowerShell knowledge, independently verified against Microsoft's own PowerShell documentation rather than reconstructed from the book's wording — they are not a paraphrase of Jones and Hicks' text. Treat this chapter's material with that in mind, and let me know if anything here doesn't match what you find in your physical copy.

> **Quick reference:** the short version of this chapter is the [PowerShell chapter 5 sheet](/cyber_lab_log/resources/powershell/5/). It builds on [chapter 4, Running commands](/cyber_lab_log/resources/powershell/4/), and gives you the vocabulary — providers and drives — used throughout the rest of the book whenever you touch the registry, certificates, or anything that isn't the filesystem.

## Learning objectives

By the end of these notes you should be able to:

1. Explain what a PowerShell provider is and how it differs from a PSDrive.
2. List PowerShell's built-in providers and say which are Windows-only.
3. Explain why the filesystem is organised as a hierarchy of containers and items.
4. Treat other data stores — the registry, environment variables, certificates — as though they were filesystem drives.
5. Navigate any provider's drives with the same small set of cmdlets.
6. Explain the difference between wildcard paths and literal paths, and when to use `-LiteralPath`.
7. List a session's providers and drives, and create a new custom drive.

## 1. What providers are

### 1.1 The problem providers solve

Different kinds of data live in very different places: files on disk, keys and values in the Windows registry, certificates in a certificate store, variables in memory, environment settings. Each of these has its own native way of being addressed and manipulated. Without a common abstraction, you would need an entirely different set of commands for each one.

### 1.2 The provider abstraction

A **PowerShell provider** is a piece of software that makes a data store **look and behave like a filesystem drive**, so the same small set of cmdlets — `Get-ChildItem`, `Get-Item`, `Set-Location`, `New-Item`, `Remove-Item`, and so on — works against it, regardless of what the underlying data actually is.

```text
+------------------------------------------------------------------------------+
|                                                                              |
|   Without a provider abstraction        With a provider abstraction          |
|                                                                              |
|   Files:     dir, copy, del             Get-ChildItem, Copy-Item, Remove-Item|
|   Registry:  reg query, reg add         Get-ChildItem, New-Item, Set-Item... |
|   Env vars:  set, echo %VAR%            Get-ChildItem, Get-Item, Set-Item... |
|   Certs:     certutil                   Get-ChildItem, Get-Item...           |
|                                                                              |
|                  four different tool sets   one consistent set of cmdlets    |
|                                            working against several drives    |
|                                                                              |
+------------------------------------------------------------------------------+
```

### 1.3 Providers versus drives

A **provider** is the underlying mechanism — the "driver" that knows how to talk to a particular kind of data store. A **PSDrive** is a specific, named instance of that provider, mounted at a particular root — much as `C:` and `D:` are two different drives that both happen to use the same FileSystem provider.

One provider can back **more than one drive**. The FileSystem provider backs every disk drive letter on your system; the Registry provider backs both `HKLM:` and `HKCU:`.

### 1.4 Listing providers and drives

```powershell
Get-PSProvider
Get-PSDrive
```

`Get-PSProvider` lists the providers loaded in your session; `Get-PSDrive` lists the actual mounted drives, including ones backed by providers other than FileSystem.

### 1.5 The built-in providers

| Provider | Default drive(s) | Windows-only? |
|---|---|---|
| **Alias** | `Alias:` | No |
| **Environment** | `Env:` | No |
| **FileSystem** | `C:`, `D:`, etc. | No |
| **Function** | `Function:` | No |
| **Variable** | `Variable:` | No |
| **Registry** | `HKLM:`, `HKCU:` | **Yes** |
| **Certificate** | `Cert:` | **Yes** |
| **WSMan** | `WSMan:` | **Yes** |

I checked this list, and the Windows-only status of Registry, Certificate and WSMan, against Microsoft's own PowerShell documentation. On non-Windows platforms (Linux, macOS), only Alias, Environment, FileSystem, Function and Variable are present.

> **Note (beyond this lesson):** the third edition of this book targets PowerShell running primarily on Windows, so all eight providers above are fair game throughout the rest of the material. If you're following along on PowerShell 7 on Linux or macOS, expect `HKLM:`, `HKCU:`, `Cert:` and `WSMan:` to simply not exist.

## 2. How the filesystem is organised

### 2.1 Containers and items

The filesystem — and every hierarchical provider modelled on it — is organised as a tree of **containers** (folders/directories, and the registry's keys) holding **items** (files, and the registry's values). A container can hold other containers, items, or both.

### 2.2 Paths describe location in the hierarchy

A path such as `C:\Users\Alice\Documents\report.docx` describes a walk down that tree: drive, then a sequence of nested containers, ending at an item. The same logic applies to a registry path like `HKLM:\SOFTWARE\Microsoft\Windows`, even though the underlying data is nothing like a file.

### 2.3 The cmdlets that walk the tree

| Cmdlet | Purpose |
|---|---|
| `Get-Location` | Show the current location (like `pwd`) |
| `Set-Location` | Change the current location (like `cd`) |
| `Get-ChildItem` | List the containers/items directly beneath the current location |
| `Get-Item` | Get the item (or container) at a specific path |
| `Push-Location` / `Pop-Location` | Save the current location on a stack, then return to it later |

`Set-Location`, `Get-ChildItem` and `Get-Item` all have the common aliases `cd`/`sl`, `dir`/`gci`/`ls`, and `gi` respectively, which is why PowerShell feels immediately familiar to anyone coming from either `cmd.exe` or a Unix shell.

## 3. Other data stores behave like the filesystem

### 3.1 The same verbs, a different noun

Because a provider makes its data store look like a filesystem, the very same cmdlets used for files and folders work, largely unchanged, against the registry, environment variables, or certificates — you are just pointed at a different drive.

### 3.2 Worked example — reading the registry like a folder

**Task:** list the subkeys directly under `HKLM:\SOFTWARE\Microsoft`, the same way you would list a folder's contents.

```powershell
Get-ChildItem -Path HKLM:\SOFTWARE\Microsoft
```

This is structurally identical to `Get-ChildItem -Path C:\Program Files` — one lists registry subkeys, the other lists folders, but it is the same cmdlet, the same syntax, and the same mental model.

### 3.3 Worked example — reading and setting environment variables

**Task:** view all environment variables, then read and change one specific value, using filesystem-style cmdlets rather than `$env:` syntax.

```powershell
Get-ChildItem -Path Env:
Get-Item -Path Env:TEMP
Set-Item -Path Env:MY_VAR -Value "hello"
```

`Get-ChildItem -Path Env:` lists every environment variable as though it were a file in a folder called `Env:`. `Get-Item` reads a single one; `Set-Item` writes to one — the same verbs used everywhere else in PowerShell, applied here to environment variables instead of files.

### 3.4 Worked example — registry values as item properties

Registry **keys** map onto **containers** (like folders); registry **values** map onto **item properties** (not separate child items the way files are). To read or change a value inside a key, you use the `*-ItemProperty` cmdlets rather than `*-Item`:

```powershell
Get-ItemProperty -Path HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion
Set-ItemProperty -Path HKCU:\Software\MyApp -Name "Setting1" -Value "On"
```

> **Exam tip (for study, not a certification exam here — but worth memorising anyway):** in the registry provider, a **key is a container**, reached with `*-Item`/`*-ChildItem`; a **value inside that key is a property**, reached with `*-ItemProperty`. Confusing the two is the single most common beginner mistake when scripting registry changes.

## 4. Navigating the filesystem (and everything else)

### 4.1 One set of navigation cmdlets, many drives

Because every hierarchical provider looks like a filesystem, the navigation cmdlets from section 2.3 work identically no matter which drive you are on. Moving from `C:` to `HKLM:` is conceptually the same operation as moving from `C:\` to `D:\`.

```powershell
Set-Location -Path HKLM:\SOFTWARE
Get-ChildItem
Set-Location -Path C:\
```

### 4.2 Relative and absolute paths

PowerShell supports the same relative-path conventions as a traditional shell: `.` for the current location, `..` for the parent, and a bare name to move into a child container — all working the same way regardless of provider.

### 4.3 Testing whether a path exists

```powershell
Test-Path -Path C:\Windows\System32
Test-Path -Path HKLM:\SOFTWARE\DoesNotExist
```

`Test-Path` works against any provider's paths and returns `$true` or `$false`, letting a script check before acting rather than relying on an error.

## 5. Wildcards and literal paths

### 5.1 Wildcards expand automatically

By default, `-Path` accepts wildcards. `*` matches any sequence of characters, and `?` matches a single character, the same conventions used in the shell generally.

```powershell
Get-ChildItem -Path C:\Windows\*.log
```

### 5.2 When a literal path is actually needed

Sometimes a path genuinely contains a character that would otherwise be interpreted as a wildcard — most commonly `[` or `]`, which are legitimate characters in some real filenames and registry key names, but which PowerShell would otherwise try to interpret as a wildcard character class.

```powershell
Get-ChildItem -LiteralPath 'C:\Reports\[Draft] Q3 Summary.docx'
```

`-LiteralPath` tells the cmdlet to treat the string exactly as written, with no wildcard expansion at all.

> **Caution:** this is a genuinely common gotcha when scripting against real-world file or registry names that include brackets. `-Path` and `-LiteralPath` are mutually exclusive on a given cmdlet call — use one or the other, never both.

### 5.3 Worked example — a filename PowerShell misreads

**Scenario:** a file is genuinely named `Log[2026].txt`, and `Get-ChildItem -Path 'Log[2026].txt'` reports nothing found, even though the file is clearly present in the folder.

1. **Recognise the symptom.** `[` and `]` are wildcard characters (a character class) to PowerShell's `-Path` parameter, so `[2026]` is being read as "any single character that is 2, 0, 6, or 9," not as literal text.
2. **Switch to `-LiteralPath`:** `Get-ChildItem -LiteralPath 'Log[2026].txt'`.
3. **Confirm it now resolves,** since the string is passed through unchanged rather than being pattern-matched.
4. **Apply the same fix anywhere else in the script** that builds a path from a filename you don't fully control — user input, data pulled from a report, or anything else that might legitimately contain brackets.

## 6. Working with other providers

### 6.1 Certificates

On Windows, the Certificate provider exposes the certificate stores through `Cert:`:

```powershell
Get-ChildItem -Path Cert:\CurrentUser\My
```

This lists certificates in the current user's personal certificate store, using exactly the same `Get-ChildItem` you would use to list files.

### 6.2 WSMan (remoting configuration)

The WSMan provider, also Windows-only, exposes PowerShell Remoting's own configuration as a drive, typically requiring administrative rights to browse or change:

```powershell
Get-ChildItem -Path WSMan:\localhost
```

### 6.3 Creating your own drive

`New-PSDrive` lets you mount a new, custom drive against an existing provider — commonly used to give a long or awkward path a short, memorable name for the rest of a session:

```powershell
New-PSDrive -Name Reports -PSProvider FileSystem -Root 'D:\Shared\Reports\2026'
Set-Location Reports:
```

A drive created this way exists only for the current PowerShell session unless you take extra steps to persist it; it disappears the moment the session ends.

### 6.4 Worked example — a short-lived reporting drive

**Scenario:** you are writing a script that repeatedly reads and writes files under a long, deeply nested path, and want to shorten every reference to it for the length of the script.

1. **Create the drive at the top of the script:** `New-PSDrive -Name Rpt -PSProvider FileSystem -Root '\\fileserver\shared\quarterly\reports\2026'`.
2. **Use the short form everywhere else in the script:** `Get-ChildItem -Path Rpt:\` instead of repeating the full UNC path.
3. **Remove it if you want to be tidy** at the end of the script with `Remove-PSDrive -Name Rpt`, though this isn't strictly necessary since it won't persist to the next session anyway.
4. **Don't rely on the drive existing in a different session** — anyone else running a related script needs their own `New-PSDrive` call, or the drive needs to be created as part of a profile script if it should be available every time.

## 7. Security perspective

Providers are a convenience feature, but treating sensitive data stores as "just another drive" has real security implications.

- **The registry and certificate stores hold genuinely sensitive material**, and the provider abstraction makes it just as easy to script destructive or disclosive changes there as it is to delete files — `Remove-Item -Path HKLM:\... -Recurse` is exactly as dangerous as `Remove-Item -Path C:\... -Recurse`, and just as easy to run by mistake. Treat registry and certificate operations in a script with the same caution (confirmation prompts, `-WhatIf`, testing on a non-production system first) that you would apply to filesystem deletions.
- **`-WhatIf` and `-Confirm` work across providers**, not just the filesystem — a script that changes registry values or certificates should use them during testing exactly as it would for file operations, since the underlying cmdlets are the same ones.
- **Wildcard expansion against the registry can be as destructive as it is on the filesystem.** A mistyped or overly broad wildcard path fed to `Remove-Item` against `HKLM:` can remove far more than intended, with none of the "oh, I can just restore from the recycle bin" safety net that files sometimes offer. Prefer `-LiteralPath` or fully-qualified exact paths for anything destructive against non-filesystem providers.
- **`Cert:` and `WSMan:` browsing often needs elevated privileges,** which is itself a signal: a script that needs to touch these drives is operating with more authority than an ordinary file-manipulation script, and should be reviewed accordingly before being run or scheduled unattended.
- **Custom PSDrives created with `New-PSDrive` are session-scoped by default,** which is a mild safety feature — a drive mapped during an interactive troubleshooting session doesn't silently persist as a standing, possibly forgotten access path once that session ends.

## Summary

- A **provider** makes a data store look and behave like a filesystem drive; a **PSDrive** is a specific mounted instance of a provider.
- Built-in providers: **Alias, Environment, FileSystem, Function, Variable** (all platforms), plus **Registry, Certificate, WSMan** (Windows only).
- The filesystem, and every hierarchical provider modelled on it, is organised as **containers** holding **items** — folders and files, or registry keys and their subkeys.
- The same small set of cmdlets — `Get-ChildItem`, `Get-Item`, `Set-Location`, `New-Item`, `Remove-Item`, `Test-Path` — works against **any** provider's drives.
- Registry **keys are containers** (use `*-Item`/`*-ChildItem`); registry **values are item properties** (use `*-ItemProperty`).
- Paths accept **wildcards** by default (`*`, `?`); use **`-LiteralPath`** when a path genuinely contains characters like `[` or `]` that would otherwise be misread as wildcards.
- `Get-PSProvider` lists providers; `Get-PSDrive` lists drives; `New-PSDrive` creates a custom, typically session-scoped drive.

## Glossary

| Term | Meaning |
|---|---|
| Provider | Software that exposes a data store using filesystem-style cmdlets |
| PSDrive | A specific, named, mounted instance of a provider |
| Container | A location that can hold other containers or items (a folder, a registry key) |
| Item | A leaf object within a container (a file, a registry value's parent key) |
| Item property | A named value attached to an item, such as a registry value |
| FileSystem provider | The built-in provider backing disk drives |
| Registry provider | The Windows-only provider exposing HKLM: and HKCU: |
| Certificate provider | The Windows-only provider exposing certificate stores as Cert: |
| WSMan provider | The Windows-only provider exposing remoting configuration |
| Wildcard | A pattern character (`*`, `?`, `[ ]`) expanded against matching paths |
| Literal path | A path taken exactly as written, with no wildcard expansion |
| `Get-PSProvider` | Lists the providers available in the current session |
| `Get-PSDrive` | Lists the drives mounted in the current session |
| `New-PSDrive` | Creates a new, typically session-scoped drive |

## Review questions

1. What is the difference between a provider and a PSDrive?
2. Name the five providers available on every platform, and the three that are Windows-only.
3. Which cmdlet lists a session's providers, and which lists its drives?
4. What is the relationship between a "container" and an "item" in a hierarchical provider?
5. How do you list the subkeys directly under a registry key, using filesystem-style cmdlets?
6. Why do you use `*-ItemProperty` rather than `*-Item` to read a registry value?
7. What does `Test-Path` do, and against how many different providers does it work?
8. What are the two wildcard characters that expand by default in a `-Path` parameter?
9. Why might `-Path` fail to find a file whose name contains square brackets?
10. What does `-LiteralPath` do differently from `-Path`?
11. Can `-Path` and `-LiteralPath` both be supplied to the same cmdlet call?
12. What does `New-PSDrive` do, and how long does a drive it creates typically persist?
13. **Scenario:** a script needs to list every environment variable currently set. What single command does this, using provider-style cmdlets?
14. **Scenario:** you need to delete a specific registry value (not the whole key) under `HKCU:\Software\MyApp`. Which family of cmdlets do you use, and why not `Remove-Item`?
15. **Scenario:** a file is genuinely named `Data[Final].csv`, and `Get-ChildItem -Path 'Data[Final].csv'` returns nothing. What's happening, and how do you fix it?
16. **Scenario:** you want a short-lived shortcut, `Rpt:`, pointing at a long UNC path for the rest of today's session only. Which cmdlet do you use, and what happens to the drive tomorrow?

## Answer key

1. **A provider is the underlying mechanism that makes a data store look like a filesystem; a PSDrive is a specific mounted instance of that provider,** such as `C:` and `D:` both being instances of the FileSystem provider.
2. **Alias, Environment, FileSystem, Function, Variable** on every platform; **Registry, Certificate, WSMan** are Windows-only.
3. **`Get-PSProvider`** lists providers; **`Get-PSDrive`** lists drives.
4. **A container can hold other containers or items** (a folder holding subfolders and files; a registry key holding subkeys); **an item is a leaf object** within a container.
5. **`Get-ChildItem -Path HKLM:\...`** (or whichever registry path), exactly as you would list a folder.
6. **Because registry values are item properties attached to a key, not separate child items** the way files are — `*-Item`/`*-ChildItem` cmdlets address keys (containers), while `*-ItemProperty` cmdlets address the values inside them.
7. **It checks whether a given path exists,** returning `$true` or `$false`. It works against **any** provider's paths.
8. **`*` (any sequence of characters) and `?` (a single character).**
9. **Square brackets are wildcard characters** (a character class) to `-Path`, so a filename containing them can be misread as a pattern rather than literal text.
10. **It takes the path exactly as written, with no wildcard expansion at all.**
11. **No.** `-Path` and `-LiteralPath` are mutually exclusive on a single cmdlet call.
12. **It creates a new, named drive against an existing provider.** By default it is **session-scoped** — it disappears once the current PowerShell session ends, unless additional steps are taken to persist it.
13. **`Get-ChildItem -Path Env:`**
14. **The `*-ItemProperty` cmdlets** (specifically `Remove-ItemProperty`) — `Remove-Item` would target the key itself (the container), not a single value within it.
15. **PowerShell is interpreting `[Final]` as a wildcard character class, not literal text.** Use `Get-ChildItem -LiteralPath 'Data[Final].csv'` instead.
16. **`New-PSDrive -Name Rpt -PSProvider FileSystem -Root '\\path\to\share'`.** Being session-scoped by default, **the drive is gone once today's session ends** — it will not be there tomorrow unless recreated or made persistent.
