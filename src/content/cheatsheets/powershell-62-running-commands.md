---
title: "PowerShell: Running Commands"
description: "Month of Lunches ch. 4 — command anatomy, Verb-Noun naming and approved verbs, cmdlet/function/alias/application, aliases cross-platform, shortcuts, external commands, errors, execution policy."
tags: ["powershell", "month-of-lunches", "windows"]
draft: false
updated: "2026-09-20"
kind: "resource"
resource: "powershell"
module: "Ch. 4"
moduleOrder: 62
unit: 4
---
> **In one line:** cmdlets follow Verb-Noun naming with approved verbs — Get is always safe to explore — and shortcuts (aliases, truncation, position) are fine at the prompt but should expand to full names in anything you keep.

*Companion to: Learn PowerShell in a Month of Lunches (Jeffery Hicks et al.), Chapter 4.* The full version is the Chapter 4 class notes.

---

## Command anatomy

```
Get-ChildItem  -Path C:\Logs  -Filter *.log  -Recurse
     |            |    |          |    |        |
  command      name   value     name  value   switch
```
Space between a parameter name and its value; quotes around values with spaces; commas for multiple values.

## Verb-Noun naming

```powershell
Get-Verb                    # 100 approved verbs
Get-Command -Noun Item      # find commands by guessing the noun
```
| Verb | Means |
|---|---|
| Get | Retrieve — **read-only, always safe to explore** |
| Set | Change something existing |
| New | Create |
| Remove | Delete |
| Start/Stop | Begin/end |

## Command types

`Get-Command` reports **CommandType**: Cmdlet, Function, Alias, Application.

## Aliases

```powershell
Get-Alias gci                          # what it runs
New-Alias -Name np -Value notepad      # session-only unless saved to a profile
```
**On Linux/macOS**, PS7 does **not** alias `ls`, `cat`, `ps`, `rm`, etc. — those run the **native** commands. `dir`/`gci` still work everywhere. **Use full names in scripts.**

## Shortcuts (prompt only — not in scripts)

| Shortcut | Example |
|---|---|
| Truncated parameter | `-Pa` for `-Path` (must be unambiguous) |
| Parameter alias | `-PID` for `-Id` |
| Positional | `gci C:\Logs *.log` |

## External commands

Return **text**, not objects. Special characters (`@ $ ; { }`) can be parsed by PowerShell first — use `--%` to stop parsing and pass the rest of the line as-is.

## Reading errors

| First line says | Means |
|---|---|
| "...is not recognized..." | Typo, or command doesn't exist here |
| "A parameter cannot be found..." | Misspelled parameter |
| "...parameter name 'F' is ambiguous..." | Truncated too far |
| "...missing mandatory parameters..." | Required value omitted — PS will prompt for it interactively |

## Execution policy

| Policy | Allows |
|---|---|
| Restricted | No scripts (Windows client default) |
| RemoteSigned | Local scripts run; downloaded ones need signing (Server default) |
| Unrestricted | All scripts run (Linux/macOS default, unchangeable) |

**Not a security boundary** — easily bypassed (`-ExecutionPolicy Bypass`, or pasting script text into the console).

---

## 🔐 Security notes

- **`iex`/`Invoke-Expression`, `iwr`/`Invoke-WebRequest`, `-EncodedCommand` (`-enc`)** are common in both legitimate scripts and malicious ones — know what they expand to when reading logs.
- **`-ExecutionPolicy Bypass` in a process command line is a red flag** — legitimate admin work rarely needs it.
- **Built-in Windows tools run happily from PowerShell** (`certutil`, `bitsadmin`, `mshta`) — part of why "living off the land" works.

---

## Practice drills

<details>
<summary>1. Which verb is always safe to explore, and why?</summary>

Get — it only retrieves information and changes nothing.
</details>

<details>
<summary>2. `ls -la` works on Linux PS7 but fails on Windows PS7. Why?</summary>

On Linux, ls is the native command; on Windows it's an alias for Get-ChildItem, which has no -la parameter.
</details>

<details>
<summary>3. `gci -F *.log` fails with an ambiguous parameter error. Why, and what's the fix?</summary>

-F matches both -Filter and -Force; type more of the name, e.g. -Fi.
</details>

<details>
<summary>4. What's the default execution policy on Windows Server, and what does it require?</summary>

RemoteSigned — local scripts run freely, but scripts downloaded from the internet must be signed.
</details>

<details>
<summary>5. Is execution policy a real security control? Explain.</summary>

No — it only prevents accidental script execution and is easily bypassed; real protection needs application control, logging and least privilege.
</details>

---

## Key takeaways

- **Anatomy:** command, `-Parameter value`, switches, commas for multiple values, quotes for spaces.
- **Verb-Noun naming**, approved verbs (`Get-Verb`); `Get` is always safe.
- **CommandType**: Cmdlet, Function, Alias, Application. Aliases differ on Linux/macOS — use full names in scripts.
- **Shortcuts** (truncation, parameter aliases, position) are prompt conveniences, not script style.
- **External commands return text**; `--%` stops PowerShell parsing the rest of the line.
- **Execution policy governs script files only, and is not a security boundary.**
