---
title: "PowerShell: Working with Providers"
description: "PowerShell providers and PSDrives — what they are, the built-in list, filesystem-style navigation, registry keys vs properties, and wildcards vs -LiteralPath."
tags: ["powershell", "month-of-lunches", "windows", "registry", "providers"]
draft: false
updated: "2026-09-24"
kind: "resource"
resource: "powershell"
module: "Ch. 5"
moduleOrder: 63
unit: 5
---
> **In one line:** a provider makes a data store — files, registry, certificates, environment variables — look like a filesystem drive, so the same handful of cmdlets (`Get-ChildItem`, `Get-Item`, `Set-Location`, `Test-Path`) work everywhere, and `-LiteralPath` is how you stop PowerShell misreading `[` and `]` as wildcards.

*Companion to: Learn PowerShell in a Month of Lunches (3rd ed.), Jones & Hicks, chapter 5.* The full version is the Working with Providers class notes; written from verified general PowerShell knowledge, not the book's own text (no transcript was available).

---

## Provider vs PSDrive

| | Provider | PSDrive |
|---|---|---|
| What | The underlying mechanism exposing a data store | A specific, named, mounted instance of a provider |
| Example | FileSystem provider | `C:` and `D:` — two drives, one provider |
| List with | `Get-PSProvider` | `Get-PSDrive` |

## Built-in providers

| Provider | Default drive | All platforms? |
|---|---|---|
| Alias | `Alias:` | Yes |
| Environment | `Env:` | Yes |
| FileSystem | `C:`, `D:`, ... | Yes |
| Function | `Function:` | Yes |
| Variable | `Variable:` | Yes |
| **Registry** | `HKLM:`, `HKCU:` | **Windows only** |
| **Certificate** | `Cert:` | **Windows only** |
| **WSMan** | `WSMan:` | **Windows only** |

## Filesystem organisation

- Hierarchical providers = **containers** (folders, registry keys) holding **items** (files, registry values' parent keys).
- Same navigation cmdlets everywhere: `Get-Location` · `Set-Location` (`cd`/`sl`) · `Get-ChildItem` (`dir`/`gci`/`ls`) · `Get-Item` (`gi`) · `Push-Location`/`Pop-Location`.
- **`Test-Path`** checks existence (`$true`/`$false`) against **any** provider's paths.

## Other data stores, same cmdlets

```powershell
# Registry: keys are containers
Get-ChildItem -Path HKLM:\SOFTWARE\Microsoft

# Environment variables
Get-ChildItem -Path Env:
Get-Item -Path Env:TEMP
Set-Item -Path Env:MY_VAR -Value "hello"

# Certificates (Windows)
Get-ChildItem -Path Cert:\CurrentUser\My

# WSMan / remoting config (Windows, usually needs elevation)
Get-ChildItem -Path WSMan:\localhost
```

**Registry keys = containers → use `*-Item`/`*-ChildItem`. Registry values = item properties → use `*-ItemProperty`.**

```powershell
Get-ItemProperty -Path HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion
Set-ItemProperty -Path HKCU:\Software\MyApp -Name "Setting1" -Value "On"
Remove-ItemProperty -Path HKCU:\Software\MyApp -Name "Setting1"
```

## Wildcards vs literal paths

| | `-Path` | `-LiteralPath` |
|---|---|---|
| Wildcards (`*`, `?`, `[ ]`) | **Expanded** | **Ignored — taken exactly as written** |
| Use when | Normal matching | The real name contains `[` or `]` |

```powershell
# Misreads [2026] as a wildcard character class — likely finds nothing
Get-ChildItem -Path 'Log[2026].txt'

# Fixed — treated as literal text
Get-ChildItem -LiteralPath 'Log[2026].txt'
```

**`-Path` and `-LiteralPath` are mutually exclusive** on one cmdlet call.

## Creating a custom drive

```powershell
New-PSDrive -Name Reports -PSProvider FileSystem -Root 'D:\Shared\Reports\2026'
Set-Location Reports:
Remove-PSDrive -Name Reports   # optional cleanup
```

**Session-scoped by default** — gone when the session ends, unless made persistent separately.

## 🔐 Security notes

- **`Remove-Item -Path HKLM:\... -Recurse` is exactly as dangerous as the filesystem equivalent** — same cmdlet, same recklessness, no recycle bin safety net in the registry.
- **`-WhatIf` / `-Confirm` work across every provider,** not just files — use them when testing registry or certificate changes too.
- **Wildcard expansion against the registry can over-match badly** — prefer `-LiteralPath` or exact paths for anything destructive outside the filesystem.
- **`Cert:` and `WSMan:` browsing often needs elevation** — a script touching them is operating with more authority than a plain file script and deserves extra review.
- **Custom PSDrives are session-scoped by default** — a troubleshooting-session drive mapping doesn't silently persist as a forgotten access path.

## Practice drills

<details>
<summary>1. Provider vs PSDrive — what's the difference?</summary>

A **provider** is the mechanism exposing a data store; a **PSDrive** is one specific mounted instance of it (e.g. `C:` and `D:` both use the FileSystem provider).
</details>

<details>
<summary>2. Which three built-in providers are Windows-only?</summary>

**Registry, Certificate, WSMan.**
</details>

<details>
<summary>3. How do registry keys and values map onto containers/items?</summary>

**Keys are containers** (use `*-Item`/`*-ChildItem`); **values are item properties** on a key (use `*-ItemProperty`).
</details>

<details>
<summary>4. List every environment variable using provider-style cmdlets.</summary>

`Get-ChildItem -Path Env:`
</details>

<details>
<summary>5. Why does `Get-ChildItem -Path 'Data[Final].csv'` sometimes find nothing?</summary>

`[Final]` is read as a **wildcard character class**, not literal text. Use `-LiteralPath` instead.
</details>

<details>
<summary>6. Can you pass both `-Path` and `-LiteralPath` to one cmdlet call?</summary>

**No** — they're mutually exclusive.
</details>

<details>
<summary>7. What does `Test-Path` do, and across how many providers?</summary>

**Checks whether a path exists**, returning `$true`/`$false` — works against **any** provider.
</details>

<details>
<summary>8. Does a drive made with `New-PSDrive` persist to tomorrow's session?</summary>

**No**, not by default — it's session-scoped and disappears when the session ends.
</details>

## Key takeaways

- Providers turn data stores into filesystem-style drives; `Get-PSProvider` lists providers, `Get-PSDrive` lists drives.
- Registry, Certificate and WSMan providers are Windows-only; the other five work everywhere.
- Registry keys are containers, values are item properties — different cmdlet families.
- `-Path` expands wildcards; `-LiteralPath` doesn't — use it for names containing `[` or `]`.
- `New-PSDrive` creates a custom, session-scoped shortcut drive against any provider.