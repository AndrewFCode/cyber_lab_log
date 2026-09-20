---
title: "PowerShell: Working with Providers"
description: "Month of Lunches ch. 5 — providers and PSDrives, the item cmdlets, wildcards vs -LiteralPath, and working with the registry, environment and certificates."
tags: ["powershell", "month-of-lunches", "windows", "registry"]
draft: false
updated: "2026-09-18"
kind: "resource"
resource: "powershell"
module: "Ch. 5"
moduleOrder: 63
unit: 5
---
> **In one line:** PowerShell presents the file system, registry, environment variables and more as drives — learn the item cmdlets once and they work on all of them.

*Companion to: Learn PowerShell in a Month of Lunches, chapter 5.*

---

## Providers and PSDrives

A **provider** is an adapter that makes a data store look like a file system. A **PSDrive** is a named connection to one location in a provider.

```powershell
Get-PSProvider                        # loaded providers and what they support
Get-PSDrive                           # every drive, with its provider and root
Get-PSDrive -PSProvider Registry      # just the registry drives
```

| Drive | Provider | Contains |
|---|---|---|
| `C:`, `D:` | FileSystem | Files and folders |
| `HKCU:` | Registry | `HKEY_CURRENT_USER` |
| `HKLM:` | Registry | `HKEY_LOCAL_MACHINE` |
| `Env:` | Environment | Environment variables |
| `Alias:` | Alias | Aliases |
| `Function:` | Function | Functions |
| `Variable:` | Variable | Variables |
| `Cert:` | Certificate | Certificate stores (Windows) |
| `WSMan:` | WSMan | Remoting configuration (Windows) |

### Capabilities

The `Capabilities` column of `Get-PSProvider` says what each provider supports:

| Capability | Means |
|---|---|
| `ShouldProcess` | Supports `-WhatIf` and `-Confirm` |
| `Filter` | Supports `-Filter` |
| `Credentials` | Accepts `-Credential` |
| `Transactions` | Supports `-UseTransaction` — Windows PowerShell 5.1 registry only |

### Your own drives

```powershell
New-PSDrive -Name Tools -PSProvider FileSystem -Root C:\Tools     # session-only
Get-ChildItem Tools:
Remove-PSDrive Tools

New-PSDrive -Name Z -PSProvider FileSystem -Root \\nas\share -Persist   # real mapped drive, shows in Explorer
New-PSDrive -Name HKCR -PSProvider Registry -Root HKEY_CLASSES_ROOT     # hives not mapped by default
```

---

## Items, child items and properties

| Concept | File system | Registry |
|---|---|---|
| Item | A file or folder | A key |
| Child items | What's inside a folder | A key's subkeys |
| Item properties | Attributes such as `LastWriteTime` | A key's **values** |

The same cmdlet families work across every provider: `Get-Command -Noun *Item*`.

| Cmdlet | Aliases | Does |
|---|---|---|
| `Get-Location` | `pwd`, `gl` | Current location |
| `Set-Location` | `cd`, `sl` | Move to a location, on any drive |
| `Push-Location` / `Pop-Location` | `pushd` / `popd` | Bookmark where you are, go elsewhere, come back |
| `Get-ChildItem` | `dir`, `ls`, `gci` | List children (`-Recurse`, `-Force` for hidden) |
| `Get-Item` | `gi` | The item itself |
| `New-Item` | `ni` | Create a file, folder or registry key |
| `Copy-Item` | `copy`, `cp`, `cpi` | Copy (`-Recurse` for folders) |
| `Move-Item` | `move`, `mv`, `mi` | Move |
| `Rename-Item` | `ren`, `rni` | Rename |
| `Remove-Item` | `del`, `rm`, `rd`, `ri` | Delete (`-Recurse`, `-WhatIf`) |
| `Test-Path` | — | Does it exist? `True` or `False` |
| `Invoke-Item` | `ii` | Open with the default app — `ii .` opens Explorer here |
| `Get-ItemProperty` | `gp` | Read properties |
| `Set-ItemProperty` | `sp` | Change a property |
| `New-ItemProperty` | — | Create a property |
| `Remove-ItemProperty` | `rp` | Delete a property |

On Linux and macOS, PowerShell 7 drops the `ls`, `cp`, `mv` and `rm` aliases so the native tools run instead.

```powershell
New-Item -Path .\Lab -ItemType Directory                  # mkdir .\Lab does the same
New-Item -Path .\Lab\notes.txt -ItemType File -Value "hello"
Copy-Item .\Lab -Destination .\Lab-backup -Recurse
Test-Path .\Lab-backup                                     # True
Remove-Item .\Lab-backup -Recurse -WhatIf                  # preview first
```

---

## Wildcards vs `-LiteralPath`

| Wildcard | Matches |
|---|---|
| `*` | Any characters |
| `?` | One character |
| `[abc]` | One of these characters |
| `[a-f]` | One character in the range |

- `-Path` **interprets** wildcards; `-LiteralPath` takes the name exactly as typed.
- Square brackets in real filenames are the trap:

```powershell
Get-Item -Path 'report[1].txt'          # looks for report1.txt — [1] is a wildcard set
Get-Item -LiteralPath 'report[1].txt'   # finds the file actually named report[1].txt
```

| Parameter | Handled by | Notes |
|---|---|---|
| `-Filter` | The provider | Fastest; uses the provider's own syntax (for the file system, simple `*` and `?`) |
| `-Include` / `-Exclude` | PowerShell | Only take effect with `-Recurse` or a wildcard in the path (e.g. `C:\Logs\*`) |

---

## The registry

- **Keys are items; values are item properties.**
- Each key also has a `(default)` value.

```powershell
Set-Location HKCU:\Software                  # the registry is just another drive
Get-ChildItem                                # subkeys
Get-ItemProperty 'HKCU:\Control Panel\Desktop'   # the values in a key
```

### Safe practice key

```powershell
New-Item HKCU:\Software\LabTest
New-ItemProperty HKCU:\Software\LabTest -Name Colour -Value Blue -PropertyType String
Set-ItemProperty HKCU:\Software\LabTest -Name Colour -Value Green
Get-ItemProperty HKCU:\Software\LabTest
Remove-Item HKCU:\Software\LabTest
```

`-PropertyType` values include `String`, `ExpandString`, `DWord`, `QWord`, `Binary` and `MultiString`.

### Help-desk lookups

```powershell
# Windows version and build (Select-Object is a later chapter)
Get-ItemProperty 'HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion' |
    Select-Object ProductName, DisplayVersion, CurrentBuild

# Installed programs — 64-bit, 32-bit, and per-user
Get-ItemProperty HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\* | Select-Object DisplayName, DisplayVersion
Get-ItemProperty HKLM:\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Uninstall\* | Select-Object DisplayName, DisplayVersion
Get-ItemProperty HKCU:\Software\Microsoft\Windows\CurrentVersion\Uninstall\* | Select-Object DisplayName, DisplayVersion
```

Gotcha: on Windows 11, `ProductName` still says "Windows 10". A `CurrentBuild` of 22000 or higher means Windows 11.

---

## Environment, variables and certificates

```powershell
Get-ChildItem Env:                  # all environment variables
$env:USERNAME                       # read one
$env:LAB = 'on'                     # set one for this session only
$env:Path -split ';'                # PATH, one folder per line

Get-ChildItem Variable:             # every variable in the session
Get-ChildItem Function:             # every function (help, mkdir, ...)
Get-ChildItem Cert:\CurrentUser\My  # your personal certificates
```

---

## 🔐 Security notes

- **Run keys are classic persistence.** Anything listed here starts at logon:
  - `HKCU:\Software\Microsoft\Windows\CurrentVersion\Run` and `RunOnce`
  - `HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Run` and `RunOnce`

  Check them with `Get-ItemProperty`. Registry changes show up as Sysmon event **13**.
- **Rogue root certificates enable TLS interception.** Review `Get-ChildItem Cert:\LocalMachine\Root` for anything unexpected.
- **PATH hijacking.** A user-writable folder early in `$env:Path` lets someone plant a fake `ping.exe` that runs instead of the real one. Read the order with `$env:Path -split ';'`.
- **Mark of the Web lives in an alternate data stream:**
  - `Get-Item .\setup.exe -Stream *` lists a file's streams.
  - `Get-Content .\setup.exe -Stream Zone.Identifier` shows where it was downloaded from.
  - That stream is what `RemoteSigned` and `Unblock-File` act on ([chapter 4](/resources/powershell/4/)).
- **Back up before editing the registry.** `reg export HKCU\Software\LabTest C:\backup\labtest.reg` saves the key, and `-WhatIf` previews removals.

---

## Practice drills

<details>
<summary>1. List only the registry drives.</summary>

`Get-PSDrive -PSProvider Registry`
</details>

<details>
<summary>2. Create a folder and an empty file inside it, then confirm both exist.</summary>

`New-Item .\Drill -ItemType Directory`, then `New-Item .\Drill\a.txt -ItemType File`, then `Test-Path .\Drill\a.txt`.
</details>

<details>
<summary>3. A file called <code>log[old].txt</code> won't delete. Why, and how do you fix it?</summary>

`[old]` is read as a wildcard set. Use `Remove-Item -LiteralPath 'log[old].txt'`.
</details>

<details>
<summary>4. What starts automatically when you log on?</summary>

`Get-ItemProperty HKCU:\Software\Microsoft\Windows\CurrentVersion\Run` — then the `HKLM:` equivalent.
</details>

<details>
<summary>5. Which provider operations support <code>-WhatIf</code>?</summary>

Those whose provider lists `ShouldProcess` in `Get-PSProvider`.
</details>

<details>
<summary>6. Where was <code>tool.zip</code> downloaded from?</summary>

`Get-Content .\tool.zip -Stream Zone.Identifier` (look at `HostUrl` / `ReferrerUrl`).
</details>

---

## Key takeaways

- Providers make the registry, environment, certificates and more browsable like disks, each through a PSDrive.
- One cmdlet family works everywhere: `*-Location`, `*-Item`, `*-ChildItem`, `*-ItemProperty`.
- In the registry, keys are items and values are item properties.
- `-Path` expands wildcards; `-LiteralPath` doesn't — use it for names containing `[` or `]`.
- The same drives are where persistence (Run keys), interception (root certs) and hijacks (PATH) hide.
