---
title: "PowerShell: Objects"
description: "MoL ch. 8 — what objects are, Get-Member, properties and methods, Sort-Object, Select-Object, and format-last discipline."
tags: ["powershell", "month-of-lunches", "windows", "objects", "get-member", "sort-object", "select-object"]
draft: false
updated: "2026-09-27"
kind: "resource"
resource: "powershell"
module: "Ch. 8"
moduleOrder: 66
unit: 8
---

> **Drafted from general knowledge:** the source was the chapter's heading list with an instruction to draft from general knowledge, not a transcript — verify against your own copy of Jones & Hicks's book for their specific wording/examples.


> **In one line:** PowerShell passes real objects (properties + methods) through the pipeline instead of text — discover them with Get-Member, read/act on them with dot notation, sort and select on real property values, and keep Format-* cmdlets last since they end the object pipeline.

*Companion to: Learn Windows PowerShell in a Month of Lunches (3rd ed.), Don Jones & Jeffery Hicks, Chapter 8.* The full version is the Objects class notes; the chapter overview is the Learn PowerShell resource sheet.

## What's an object?

| Part | Meaning |
| --- | --- |
| Property | Data the object carries (`$obj.Name`) |
| Method | An action the object can perform (`$obj.Kill()`) |

- Pipeline passes **real objects**, not text — no re-parsing between stages.

## Get-Member

```powershell
Get-Process | Get-Member    # (alias: gm) — lists every property/method + type
```

## Properties and methods

```powershell
$proc = Get-Process -Name notepad
$proc.Id              # property — no parentheses
$proc.Kill()           # method — parentheses required, even with no args
Get-Process | Where-Object { $_.CPU -gt 10 }   # $_ = current pipeline object
```

## Sort-Object / Select-Object

```powershell
Get-Process | Sort-Object -Property CPU -Descending
Get-Process | Select-Object -Property Name, Id, CPU
Get-Process | Select-Object -First 5
Get-Process | Select-Object -ExpandProperty ProcessName   # raw values, not a wrapper object
```

- Sort works on the **real value** (numeric CPU sorts correctly; text sorting wouldn't).

## Objects until the end

```
Get-Process | Sort-Object CPU -Descending | Select-Object -First 5 | Format-Table
                                                                       ^-- always last
```

- **Format-\* converts to display-only output** — piping it further into Sort/Where/Select breaks, since it's no longer the real object.

## Common points of confusion

- Missing `()` on a method call → describes it instead of running it.
- Format-* piped onward → silently broken filtering/sorting.
- Default on-screen display ≠ all properties — use Get-Member or `Select-Object -Property *`.
- `Select-Object -Property` returns a **new, simplified** object — original methods are gone.

## 🔐 Security notes

- **Structured objects prevent a whole class of parsing bugs** — real typed values instead of text to regex/parse.
- **Get-Member is reconnaissance** — reveals every method (including destructive ones) to anyone who can run it; be cautious what you expose to less-trusted code.
- **Method calls execute immediately, with your privileges** — no `-WhatIf`/`-Confirm` safety net like many cmdlets offer.
- **Trimming properties before logging can lose audit data** — select broadly for anything destined for a log or report.

## Practice drills

<details>
<summary>1. What does an object bundle together?</summary>

Data (properties) and actions (methods).
</details>

<details>
<summary>2. What does Get-Member show you?</summary>

Every property and method an object has, including each property's data type.
</details>

<details>
<summary>3. How do you call a method, and what happens if you forget the parentheses?</summary>

$object.MethodName() — forgetting () just describes the method instead of running it.
</details>

<details>
<summary>4. Why does Sort-Object avoid the "9 after 10" text-sort problem?</summary>

It sorts by the actual (often numeric) property value, not its text representation.
</details>

<details>
<summary>5. What does -ExpandProperty do differently?</summary>

Returns the property's raw values directly, rather than an object wrapping just that one property.
</details>

<details>
<summary>6. Why must Format-* cmdlets go last?</summary>

They convert objects to display-only output — anything piped afterward no longer receives real, usable object data.
</details>

<details>
<summary>7. What is $_?</summary>

The current object inside a pipeline, e.g. Where-Object { $_.CPU -gt 10 }.
</details>

## Key takeaways

- **Objects = properties + methods**; the pipeline moves real objects, not text.
- **Get-Member** discovers what an unfamiliar object can do.
- **Dot notation:** properties need no `()`, methods always do.
- **Sort-Object/Select-Object** work on real property values — chain them, then **Format-\* last**.
- **Security:** Get-Member is a discovery tool for attackers too; method calls are immediate and unconfirmed.
