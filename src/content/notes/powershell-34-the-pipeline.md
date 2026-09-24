---
title: "PowerShell 6: The Pipeline — Class Notes"
description: "Full class notes on the PowerShell pipeline: connecting commands, exporting to CSV/XML, printing, ConvertTo-Html, system-modifying cmdlets, and common pipeline confusion points."
pubDate: 2026-09-24
tags: ["class-notes", "powershell", "pipeline", "csv", "xml", "html", "export", "stop-process"]
draft: false
---

# The Pipeline: Connecting Commands

**Class notes · Learn PowerShell in a Month of Lunches (3rd ed.), Don Jones & Jeffery Hicks · Chapter 6**

> **Note on this file's sourcing:** no transcript or scanned text was available for this chapter, only its section headings. These notes are written from general PowerShell knowledge, independently verified against Microsoft's own PowerShell documentation rather than reconstructed from the book's wording — they are not a paraphrase of Jones and Hicks' text. Treat this chapter's material with that in mind, and let me know if anything here doesn't match your physical copy.

> **Quick reference:** the short version of this chapter is the [PowerShell chapter 6 sheet](/cyber_lab_log/resources/powershell/6/). It builds directly on [chapter 5, Working with providers](/cyber_lab_log/resources/powershell/5/), and is arguably the single most important idea in the whole book: PowerShell's pipeline passes **objects**, not text, between commands.

## Learning objectives

By the end of these notes you should be able to:

1. Explain what the PowerShell pipeline actually passes between commands, and how this differs from a traditional shell's pipeline.
2. Chain cmdlets together to filter, sort, and select data with no extra work.
3. Export pipeline output to CSV and XML, and explain when each is the right choice.
4. Send pipeline output to a file or a printer.
5. Convert pipeline output to HTML for a simple report.
6. Use system-modifying cmdlets like `Stop-Process` and `Stop-Service` safely.
7. Recognise and avoid the most common pipeline mistakes.

## 1. Connecting one command to another

### 1.1 Objects, not text

The single most important fact about the PowerShell pipeline: it passes **whole objects** from one cmdlet to the next, not lines of text. A traditional shell pipeline (like Bash's) passes plain text, and each tool in the chain has to parse that text back into something meaningful before it can act on it. PowerShell skips that step entirely — a `Process` object stays a `Process` object all the way down the pipeline, with all its properties intact.

```text
+------------------------------------------------------------------------------+
|                                                                              |
|   Traditional shell pipeline               PowerShell pipeline               |
|                                                                              |
|   [cmd1] --text lines--> [cmd2]            [cmd1] --objects--> [cmd2]        |
|            (must re-parse                            (properties and         |
|             the text)                                  methods intact)       |
|                                                                              |
+------------------------------------------------------------------------------+
```

### 1.2 Why this means "less work for you"

Because the object and all its properties survive the trip down the pipeline, cmdlets like `Sort-Object`, `Where-Object` and `Select-Object` can act directly on real properties, with no regular-expression parsing, no column-counting, and no fragile text scraping.

```powershell
Get-Process |
    Where-Object { $_.WorkingSet -gt 100MB } |
    Sort-Object -Property WorkingSet -Descending |
    Select-Object -First 5 -Property Name, Id, WorkingSet
```

This filters, sorts, and trims the result to the top five processes by memory use, using the same property (`WorkingSet`) throughout, without ever needing to reformat or re-read the data between stages.

### 1.3 The pipe operator

The pipe character `|` connects one cmdlet's output directly to the next cmdlet's input. Multiple pipes can be chained, as in the example above, building up a single line that filters, transforms, and finally presents data in one pass.

## 2. Exporting to a CSV or an XML file

### 2.1 Export-Csv

`Export-Csv` writes pipeline objects to a comma-separated values file, one row per object, one column per property:

```powershell
Get-Process | Export-Csv -Path C:\Reports\processes.csv -NoTypeInformation
```

`-NoTypeInformation` suppresses a `#TYPE` header line that older PowerShell versions added by default; in modern PowerShell (7+) this is no longer added, but it remains harmless and common practice to include the parameter for compatibility and clarity.

### 2.2 Why CSV loses information

CSV is a flat, text-based format. Complex properties — nested objects, arrays, methods — do not survive the round trip; they are converted to their string representation, which is often not useful. CSV is ideal for **tabular data destined for Excel or another spreadsheet tool**, not for data you intend to load back into PowerShell and use as live objects.

### 2.3 Export-Clixml

`Export-Clixml` serialises objects to PowerShell's own XML format, preserving **much more** of the object's structure — including nested properties — than CSV can:

```powershell
Get-Process | Export-Clixml -Path C:\Reports\processes.xml
```

The matching `Import-Clixml` reconstructs the objects later, in the same or a different PowerShell session, far more faithfully than reimporting a CSV ever could.

### 2.4 Choosing between them

| Need | Use |
|---|---|
| A simple table for Excel, a report, another tool | **CSV** |
| To save and later reload real PowerShell objects | **CLIXML** |
| Long-term archival where structure matters | **CLIXML** |
| Sharing data with something outside PowerShell | **CSV** (or another export format entirely) |

> **Exam tip (for study, not a certification exam here):** if a scenario asks you to preserve an object's full structure for later reuse *within PowerShell*, the answer is CLIXML, not CSV — CSV is for external consumption, CLIXML is for PowerShell talking to itself.

## 3. Piping to a file or a printer

### 3.1 Out-File

`Out-File` sends the pipeline's **formatted text output** — exactly what would appear on screen — to a file:

```powershell
Get-Service | Out-File -Path C:\Reports\services.txt
```

Unlike `Export-Csv` or `Export-Clixml`, `Out-File` captures the **display** representation, not the underlying object structure. This is the right tool when you want a readable text report, not structured data to reload later.

### 3.2 Out-Printer

`Out-Printer` sends pipeline output to a printer — the default printer, or a named one:

```powershell
Get-Content -Path C:\Reports\services.txt | Out-Printer
Get-Process | Out-Printer -Name "\\PrintServer\HR-Printer"
```

I checked this cmdlet directly: it is genuinely part of PowerShell, was **reintroduced in PowerShell 7** after a period of absence, and is **Windows-only** — it will not work on PowerShell running on Linux or macOS. It has no path parameter of its own; anything printed must arrive via the pipeline.

> **Note (beyond this lesson):** `Out-Printer` has an older, informal alias, `lp`, inherited from Unix's own print command naming convention — though relying on the full cmdlet name in scripts is clearer and safer than relying on an alias.

## 4. Converting to HTML

### 4.1 ConvertTo-Html

`ConvertTo-Html` turns pipeline objects into an HTML table, suitable for a simple, shareable report:

```powershell
Get-Service | ConvertTo-Html -Property Name, Status | Out-File C:\Reports\services.html
```

Note that `ConvertTo-Html`, like `Export-Csv`, only converts what you give it — using `-Property` to select exactly the columns you want in the output keeps the report focused and readable, exactly as `Select-Object` would for CSV.

### 4.2 It only converts — it does not save

`ConvertTo-Html` produces HTML **text** as its output, which itself still has to be piped to `Out-File` (or another destination) to actually be saved. Forgetting this step is a common beginner mistake — running `ConvertTo-Html` alone just prints raw HTML markup to the console rather than producing a usable file.

### 4.3 Worked example — a simple status report

**Task:** produce a shareable HTML report of every stopped Windows service, with just the name and status columns, saved to a file.

```powershell
Get-Service |
    Where-Object { $_.Status -eq 'Stopped' } |
    Select-Object Name, Status |
    ConvertTo-Html |
    Out-File -Path C:\Reports\StoppedServices.html
```

Reading this pipeline stage by stage: get every service, keep only the stopped ones, keep only the two columns that matter, convert what's left to HTML, then actually write it to disk. Each stage does exactly one job, and the object stays coherent the whole way through — this is the "less work for you" idea from section 1 in action on a genuinely useful task.

## 5. Cmdlets that modify the system

### 5.1 Stop-Process

`Stop-Process` ends a running process, and can be fed directly from the pipeline:

```powershell
Get-Process -Name notepad | Stop-Process
Stop-Process -Id 4821
```

### 5.2 Stop-Service

`Stop-Service` stops a running Windows service in the same way:

```powershell
Get-Service -Name Spooler | Stop-Service
Stop-Service -Name Spooler -Force
```

`-Force` is sometimes needed to stop a service that other, dependent services rely on.

### 5.3 These are exactly as dangerous as they sound

Both cmdlets act **immediately and directly** on the running system — there is no undo. Feeding either one from a broad, unfiltered pipeline (`Get-Process | Stop-Process`, with no filtering at all) will attempt to stop **every process on the system**, which is a genuinely dangerous command to run by accident.

### 5.4 -WhatIf and -Confirm

Most system-modifying cmdlets, including these two, support `-WhatIf` (show what would happen, without doing it) and `-Confirm` (ask before each action):

```powershell
Get-Process -Name notepad | Stop-Process -WhatIf
Stop-Service -Name Spooler -Confirm
```

> **In the real world:** the habit worth building here is the same one covered elsewhere in this course for destructive filesystem or registry operations — run the pipeline with `-WhatIf` first, read the output, and only remove it once you're confident the pipeline is selecting exactly what you intend.

## 6. Common points of confusion

### 6.1 Format cmdlets belong at the very end

`Format-Table`, `Format-List` and their relatives (`Format-Wide`, `Format-Custom`) do not produce ordinary objects — they produce special **formatting instruction objects**, meant only for display. Piping a `Format-*` cmdlet's output into anything further down the pipeline (another `Where-Object`, `Sort-Object`, or `Export-Csv`) will not work as expected, because there is no longer real data there to filter, sort, or export — only formatting instructions.

```powershell
# Wrong: nothing useful survives past Format-Table
Get-Process | Format-Table | Where-Object { $_.WorkingSet -gt 100MB }

# Right: filter and sort BEFORE formatting, and only format at the very end
Get-Process | Where-Object { $_.WorkingSet -gt 100MB } | Sort-Object WorkingSet | Format-Table
```

> **Caution:** this is one of the most common real-world PowerShell mistakes, and it can silently produce empty or wrong results rather than an obvious error. The rule is simple: **`Format-*` cmdlets go last**, always.

### 6.2 Aliases can mask what a command actually does

`ps`, `gps`, `kill`, `dir`, `ls`, `%`, `?` and similar short aliases are convenient at the interactive prompt, but they can obscure exactly which real cmdlet is running, especially for anyone reading a script later who doesn't already know PowerShell's aliases by heart.

```powershell
Get-Alias -Name kill    # reveals kill is an alias for Stop-Process
```

> **In the real world:** aliases are fine for quick, interactive one-liners you type and immediately discard. In anything saved as a script — anything someone else, or future-you, will read later — use the full cmdlet name.

### 6.3 Pipeline parameter binding: by value versus by property name

Not every cmdlet accepts pipeline input the same way. Some accept an incoming object **by value** (the whole object is treated as though it were passed to a specific parameter), and others accept it **by property name** (a property on the incoming object, matching a parameter name on the receiving cmdlet, is matched up automatically). When a pipeline doesn't behave as expected, this mismatch is very often the cause.

```powershell
Get-Help Stop-Process -Parameter Id
```

Checking a cmdlet's help for `(ValueFromPipeline)` or `(ValueFromPipelineByPropertyName)` next to a parameter explains exactly how that cmdlet expects to receive piped input, which is often the fastest way to debug an unexpectedly empty or wrong result.

### 6.4 Exporting before selecting the right properties

`Export-Csv` and `ConvertTo-Html` export **only the properties you have selected (or the default display properties, if you selected none)** — not necessarily every property the underlying object actually has. Forgetting a `Select-Object -Property ...` stage before exporting is a common cause of a CSV or HTML report that looks strangely incomplete, even though the source data was never actually missing anything.

### 6.5 Worked example — diagnosing an empty pipeline result

**Scenario:** a script runs `Get-Process | Format-Table | Export-Csv -Path report.csv` and produces a CSV file with garbled, useless content instead of the expected process list.

1. **Spot the `Format-Table` in the middle of the pipeline.** This is the classic mistake from section 6.1.
2. **Remember what `Format-Table` actually outputs:** formatting instruction objects, not the original process data.
3. **Remove or relocate the formatting stage:** `Get-Process | Export-Csv -Path report.csv` — export the real objects directly, with no formatting cmdlet involved at all, since CSV export doesn't need or want display formatting.
4. **If a specific column selection was also wanted,** add `Select-Object` **before** the export, never a `Format-*` cmdlet: `Get-Process | Select-Object Name, Id, WorkingSet | Export-Csv -Path report.csv -NoTypeInformation`.
5. **Generalise the lesson:** `Format-*` cmdlets are for the screen, at the very end of a pipeline that's meant to be read by a human, never in the middle of a pipeline meant to keep doing real work with the data.

## 7. Security perspective

The pipeline is a convenience feature, but its power to chain commands together — especially system-modifying ones — deserves real caution.

- **`Stop-Process` and `Stop-Service`, fed from an unfiltered pipeline, are a denial-of-service risk you can inflict on yourself.** `Get-Process | Stop-Process` with no filtering attempts to end every running process, including PowerShell's own host process. Always filter first, and get in the habit of testing with `-WhatIf` before running anything destructive fed from a pipeline, exactly as urged in section 5.4.
- **Exported CSV and CLIXML files can leak more than intended.** `Export-Clixml` in particular preserves deep object structure, which can include properties a person building a "quick report" never thought to check — connection strings, tokens, or other sensitive properties riding along on an object that was piped in for an entirely different reason. Review what `Select-Object` is actually exporting, rather than piping whole objects straight to an export cmdlet by habit.
- **`Export-Clixml` has a specific, well-known gotcha: it can serialise a `SecureString`,** but that serialised value is only decryptable by the **same user account, on the same machine**, that created it — a script that exports credentials this way and later fails to import them on a different machine or under a different account is not a bug in PowerShell, it's this design working as intended, and worth understanding before relying on it for anything involving secrets.
- **`Out-Printer` sends data to a physical or shared print queue,** which is itself a data-exfiltration path worth being aware of in a locked-down environment — a script piping sensitive data to a printer on an unmanaged, shared print queue is not meaningfully different from writing it to an unmanaged shared folder.
- **Pipeline chains that call system-modifying cmdlets deserve the same script-review scrutiny as any other automated destructive action.** A single line combining `Get-Process`, a filter, and `Stop-Process` looks harmless and compact, but it is fully capable of taking down a production service if the filter condition is subtly wrong — code review for scripts that end in a modifying cmdlet should specifically check what the pipeline selects, not just what the final cmdlet does.

## Summary

- The PowerShell pipeline passes **whole objects**, not text, between cmdlets — this is what lets `Where-Object`, `Sort-Object` and `Select-Object` work directly against real properties with no parsing.
- **`Export-Csv`** writes a flat table for external tools like Excel; **`Export-Clixml`** preserves much more object structure for later reuse inside PowerShell (`Import-Clixml`).
- **`Out-File`** captures formatted display text to a file; **`Out-Printer`** (Windows-only, reintroduced in PowerShell 7) sends pipeline output to a printer.
- **`ConvertTo-Html`** produces HTML text, which must still be piped to `Out-File` (or elsewhere) to actually be saved.
- **`Stop-Process`** and **`Stop-Service`** act immediately on the running system with no undo — use `-WhatIf` and careful filtering before running them for real.
- **Common confusion points:** `Format-*` cmdlets must go **last** in a pipeline (they produce display-only formatting objects, not usable data); aliases can obscure what a script actually does; pipeline parameter binding can be **by value** or **by property name**; export cmdlets only capture the properties you've actually selected.

## Glossary

| Term | Meaning |
|---|---|
| Pipeline | The mechanism connecting one cmdlet's output to another's input |
| `\|` | The pipe operator, connecting pipeline stages |
| `Export-Csv` | Writes pipeline objects to a flat CSV file |
| `Export-Clixml` | Serialises pipeline objects to PowerShell's own XML format |
| `Import-Clixml` | Reconstructs objects previously saved with Export-Clixml |
| `Out-File` | Writes formatted display text to a file |
| `Out-Printer` | Sends pipeline output to a printer; Windows-only |
| `ConvertTo-Html` | Converts pipeline objects to HTML markup |
| `Stop-Process` | Ends a running process |
| `Stop-Service` | Stops a running Windows service |
| `-WhatIf` | Shows what a cmdlet would do without actually doing it |
| `-Confirm` | Prompts for confirmation before each modifying action |
| ValueFromPipeline | A parameter binding mode accepting the whole piped object |
| ValueFromPipelineByPropertyName | A parameter binding mode matching a property name |
| Formatting object | The display-only object type produced by `Format-*` cmdlets |

## Review questions

1. What does the PowerShell pipeline pass between commands, and how does that differ from a traditional shell?
2. Why does this design mean cmdlets like `Sort-Object` need no text parsing?
3. What is the main limitation of `Export-Csv` compared with `Export-Clixml`?
4. When would you choose CSV over CLIXML, and vice versa?
5. What is the difference in what `Out-File` and `Export-Csv` actually capture from the pipeline?
6. Is `Out-Printer` available on every platform PowerShell runs on?
7. Why does `ConvertTo-Html` alone not save anything to disk?
8. Why are `Stop-Process` and `Stop-Service` considered particularly risky pipeline destinations?
9. What do `-WhatIf` and `-Confirm` do, and why are they recommended before a destructive pipeline runs for real?
10. Why must `Format-Table` or `Format-List` come at the very end of a pipeline?
11. What problem can relying on aliases in a saved script cause?
12. What is the difference between a parameter that binds by value and one that binds by property name?
13. **Scenario:** a pipeline ending in `Export-Csv` produces a file with far fewer columns than expected. What is the most likely cause?
14. **Scenario:** `Get-Process | Format-Table | Sort-Object CPU` produces an error or unexpected output. What's wrong, and how would you fix the pipeline?
15. **Scenario:** you need to save a complex custom object, with nested properties, so it can be reloaded as a real PowerShell object next week. Which export cmdlet do you use, and why not the alternative?
16. **Scenario:** you're about to run `Get-Service -Name "Temp*" | Stop-Service` on a production server for the first time. What should you do before running it for real?

## Answer key

1. **Whole objects, not text.** A traditional shell pipeline passes plain text that each stage must re-parse; PowerShell keeps the object and its properties intact throughout.
2. **Because the real properties are still attached to the object,** cmdlets can reference them directly (e.g. `$_.WorkingSet`) with no need to extract values from formatted text.
3. **CSV is a flat, text-based format** that converts complex or nested properties to their string representation, losing real structure in the process.
4. **CSV for external tools (Excel, another program, sharing outside PowerShell); CLIXML for reloading real objects back into PowerShell later,** with structure preserved.
5. **`Out-File` captures the formatted display text** (what you'd see on screen); **`Export-Csv` captures the underlying object's properties** as structured tabular data.
6. **No.** It is Windows-only, and was reintroduced in PowerShell 7 after being absent for a period.
7. **`ConvertTo-Html` only converts objects to HTML text as pipeline output** — that text still needs to be piped to `Out-File` (or another destination) to be written to disk.
8. **They act immediately on the running system with no undo,** and an unfiltered pipeline feeding them can affect far more processes or services than intended, including critical ones.
9. **`-WhatIf` shows what would happen without doing it; `-Confirm` asks before each action.** Both let you verify a pipeline is selecting exactly the right targets before anything destructive actually runs.
10. **Because `Format-*` cmdlets produce special formatting objects meant only for display,** not the original data — anything piped after them (a filter, a sort, an export) no longer has real data to work with.
11. **A reader of the script (including future-you) may not recognise what the alias actually does,** making the script harder to understand, audit, or safely modify.
12. **By value passes the whole incoming object to a parameter; by property name matches a property on the incoming object to a parameter of the same name** on the receiving cmdlet.
13. **The pipeline likely didn't include `Select-Object` for the desired columns before the export** — `Export-Csv` only writes the properties actually selected (or default display properties), not necessarily every property the object has.
14. **`Format-Table` is in the middle of the pipeline,** producing formatting objects that `Sort-Object` cannot meaningfully sort. Fix: sort before formatting — `Get-Process | Sort-Object CPU | Format-Table`.
15. **`Export-Clixml`,** because it preserves nested object structure far more faithfully than `Export-Csv`, which flattens everything to plain text and loses that structure.
16. **Run it first with `-WhatIf`** (`Get-Service -Name "Temp*" | Stop-Service -WhatIf`) to confirm exactly which services the wildcard actually matches, before running it for real.
