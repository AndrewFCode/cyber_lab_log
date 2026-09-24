---
title: "PowerShell: The Pipeline"
description: "PowerShell's object pipeline — Export-Csv vs Export-Clixml, Out-File and Out-Printer, ConvertTo-Html, Stop-Process/Stop-Service safety, and common pipeline mistakes."
tags: ["powershell", "month-of-lunches", "windows", "pipeline", "csv"]
draft: false
updated: "2026-09-24"
kind: "resource"
resource: "powershell"
module: "Ch. 6"
moduleOrder: 64
unit: 6
---
> **In one line:** PowerShell's pipeline passes whole objects, not text, so filtering, sorting and selecting need no parsing — export with Export-Csv (flat, external tools) or Export-Clixml (structure preserved, PowerShell-to-PowerShell), and always put Format-* cmdlets last, never in the middle.

*Companion to: Learn PowerShell in a Month of Lunches (3rd ed.), Jones & Hicks, chapter 6.* The full version is the The Pipeline class notes; written from verified general PowerShell knowledge, not the book's own text (no transcript was available).

---

## The core idea

**Objects flow down the pipeline, not text.** A `Process` object keeps every property intact from `Get-Process` all the way to `Export-Csv` — no re-parsing needed at each stage, unlike a traditional text-based shell pipeline.

```powershell
Get-Process |
    Where-Object { $_.WorkingSet -gt 100MB } |
    Sort-Object -Property WorkingSet -Descending |
    Select-Object -First 5 -Property Name, Id, WorkingSet
```

## Exporting: CSV vs CLIXML

| | `Export-Csv` | `Export-Clixml` |
|---|---|---|
| Format | Flat, text-based | PowerShell's own XML |
| Structure preserved | **No** — complex properties become strings | **Yes** — nested properties survive |
| Best for | Excel, other tools, sharing outside PowerShell | Reloading real objects later (`Import-Clixml`) |

```powershell
Get-Process | Export-Csv -Path processes.csv -NoTypeInformation
Get-Process | Export-Clixml -Path processes.xml
Import-Clixml -Path processes.xml
```

## Output destinations

| Cmdlet | Captures | Platform |
|---|---|---|
| `Out-File` | **Formatted display text** — what you'd see on screen | All |
| `Out-Printer` | Pipeline output → printer (default or named) | **Windows only**; reintroduced in PS7; old alias `lp` |
| `ConvertTo-Html` | Objects → HTML **text** (still needs piping to `Out-File` to save) | All |

```powershell
Get-Service | Out-File -Path services.txt
Get-Content services.txt | Out-Printer
Get-Service | Select-Object Name, Status | ConvertTo-Html | Out-File services.html
```

## System-modifying cmdlets

```powershell
Get-Process -Name notepad | Stop-Process
Stop-Service -Name Spooler -Force
```

- **Immediate, no undo.** An unfiltered `Get-Process | Stop-Process` attempts to kill everything, including PowerShell itself.
- **Always test with `-WhatIf` first**, then `-Confirm` if you want a prompt per action.

## Common pipeline mistakes

| Mistake | Fix |
|---|---|
| `Format-Table`/`Format-List` in the **middle** of a pipeline | **Format-\* cmdlets go last, always** — they produce display-only objects, nothing usable survives past them |
| Relying on aliases (`ps`, `kill`, `dir`) in saved scripts | Use full cmdlet names in anything that will be read later |
| Export missing expected columns | Add `Select-Object -Property ...` **before** the export — exports only capture what's selected |
| Pipeline silently doesn't bind as expected | Check `Get-Help <cmdlet> -Parameter <name>` for `ValueFromPipeline` vs `ValueFromPipelineByPropertyName` |

```powershell
# WRONG — nothing usable survives Format-Table
Get-Process | Format-Table | Where-Object { $_.WorkingSet -gt 100MB }

# RIGHT — filter/sort/select first, format last
Get-Process | Where-Object { $_.WorkingSet -gt 100MB } | Sort-Object WorkingSet | Format-Table
```

## 🔐 Security notes

- **`Stop-Process`/`Stop-Service` from an unfiltered pipeline is self-inflicted denial of service** — filter first, `-WhatIf` before running for real.
- **`Export-Clixml` preserves deep structure, which can leak more than intended** — a piped-in object may carry sensitive properties nobody thought to check. Use `Select-Object` before exporting.
- **`Export-Clixml`'s `SecureString` handling is account- and machine-bound** — a script exporting credentials this way won't import them elsewhere; that's by design, not a bug.
- **`Out-Printer` sends data to a shared print queue** — a real exfiltration path on an unmanaged printer, no different from an unmanaged shared folder.
- **Review pipelines ending in a modifying cmdlet for what they *select*,** not just what the final cmdlet does — a subtly wrong filter can take down production.

## Practice drills

<details>
<summary>1. What does the PowerShell pipeline actually pass between commands?</summary>

**Whole objects**, with properties intact — not text, unlike a traditional shell pipeline.
</details>

<details>
<summary>2. CSV vs CLIXML — when do you use each?</summary>

**CSV** for external tools (Excel, sharing outside PowerShell). **CLIXML** for reloading real, structured objects back into PowerShell later.
</details>

<details>
<summary>3. What's the difference between what Out-File and Export-Csv capture?</summary>

**Out-File** captures the **formatted display text**; **Export-Csv** captures the underlying **object's properties** as structured data.
</details>

<details>
<summary>4. Is Out-Printer available on Linux/macOS?</summary>

**No.** It's **Windows-only**.
</details>

<details>
<summary>5. Does ConvertTo-Html save a file on its own?</summary>

**No.** It only produces HTML text as output — you still need to pipe it to `Out-File` (or similar) to save it.
</details>

<details>
<summary>6. Why should you run Stop-Service with -WhatIf first?</summary>

**It acts immediately with no undo**, and an unfiltered or wildcard-based pipeline can match more services than intended.
</details>

<details>
<summary>7. Why must Format-Table go last in a pipeline?</summary>

It produces **display-only formatting objects**, not real data — anything piped after it (filter, sort, export) has nothing usable to work with.
</details>

<details>
<summary>8. A CSV export has fewer columns than expected. Likely cause?</summary>

**No `Select-Object` before the export** — exports only capture the properties actually selected, not every property the object has.
</details>

## Key takeaways

- The pipeline passes objects, not text — that's what makes downstream filtering and sorting parse-free.
- Export-Csv for external tools; Export-Clixml when you need to reload real objects later.
- Out-File captures display text; Out-Printer (Windows-only) prints; ConvertTo-Html still needs Out-File to save.
- Stop-Process/Stop-Service are immediate and undo-free — filter carefully and test with -WhatIf.
- Format-* cmdlets always go last; aliases belong at the prompt, not in scripts.
