---
title: "PowerShell 8: Objects — Class Notes"
description: "Full class notes for MoL ch. 8: what objects are, Get-Member, properties and methods, Sort-Object, Select-Object, and format-last discipline."
tags: ["class-notes", "powershell", "month-of-lunches", "windows", "objects", "get-member", "sort-object", "select-object"]
draft: false
pubDate: 2026-09-27
---

> **How these notes were made:** the material supplied for this lesson was the
> chapter's own **heading list** — "What are objects?", "Understanding why
> PowerShell uses objects", "Discovering objects: Get-Member", "Using object
> attributes or properties", "Using object actions or methods", "Sorting
> objects", "Selecting the properties you want", "Objects until the end",
> "Common points of confusion" — with an explicit instruction to draft the
> content from general knowledge rather than a transcript. These notes follow
> that structure, but the explanations are written from general knowledge of
> **PowerShell's object model**, **not** reproduced or paraphrased from Don
> Jones and Jeffery Hicks's actual book text, which was not supplied. Worth
> checking against your own copy of the chapter for their specific wording and
> examples.


**Class notes · Learn Windows PowerShell in a Month of Lunches (3rd ed.),
Don Jones and Jeffery Hicks · Chapter 8**

> **Quick reference:** the short version of this lesson lives in the
> [Learn PowerShell resource sheets](/cyber_lab_log/resources/powershell/8/). This follows
> Chapter 7 (Adding Commands) and returns to something touched on back in
> Chapter 6 (The Pipeline) — that the pipeline passes **objects**, not text —
> and explains what an object actually is and how to work with one directly.

## Learning objectives

By the end of these notes you should be able to:

1. Explain what an object is in PowerShell terms.
2. Explain why PowerShell is built around objects rather than plain text.
3. Use `Get-Member` to discover an object's properties and methods.
4. Read and use an object's properties, and call its methods.
5. Sort objects and select specific properties from them.
6. Explain what happens to objects "until the end" of a pipeline.
7. Recognise common points of confusion when working with objects.

## 1. What are objects?

An **object** is a single "thing" that bundles together **data** (its
**properties**) and **actions** (its **methods**). A running process, a file,
a service, a user account — each of these, represented inside PowerShell, is
an object carrying properties that describe it (a process's name, its ID, how
much memory it is using) and methods that let you do something to it (stop
it, for instance).

This is different from a traditional command-line shell, where a command's
output is just **plain text** you would have to parse yourself (with tools
like `grep`, `awk`, or regular expressions) to pull out the piece of
information you actually want.

## 2. Understanding why PowerShell uses objects

When one PowerShell command's output feeds into another via the pipeline, it
is not sending **text** across — it is sending the actual **objects**, with
all their properties intact. That means the next command in the pipeline can
work directly with structured data (a process's exact CPU time as a number,
say) rather than having to re-parse a line of formatted text to extract it.

```
Traditional shell (text) vs PowerShell (objects):

  Text pipeline:      command | grep "pattern" | awk '{print $3}'
                       (each stage must parse text again)

  Object pipeline:    Get-Process | Where-Object {$_.CPU -gt 10}
                       (CPU is already a real number - no parsing needed)
```

This is the practical payoff of everything covered back in the Pipeline
chapter: filtering, sorting, and selecting all work reliably because the data
stays structured the whole way through, rather than being reduced to text and
reconstructed at each step.

## 3. Discovering objects: Get-Member

Given an unfamiliar object, `Get-Member` (commonly aliased `gm`) reveals
**every property and method** that object has:

```powershell
Get-Process | Get-Member
```

The output lists each member's **name**, its **member type** (Property,
Method, and others), and, for properties, its **data type**. This is the
standard way to answer "what can I actually do with this thing?" whenever you
are working with an object type you have not used before.

```text
   TypeName: System.Diagnostics.Process

Name          MemberType Definition
----          ---------- ----------
Kill          Method     void Kill()
Id            Property   int Id {get;}
ProcessName   Property   string ProcessName {get;}
CPU           Property   double CPU {get;}
```

> **Exam tip:** run `Get-Member` on **one item** of a collection you are
> exploring, not the whole collection — `Get-Process | Get-Member` works
> fine because PowerShell examines the object type, but conceptually you are
> asking "what is one of these things made of," not "list every process's
> members separately."

## 4. Using object attributes or properties

**Properties** are the data a property holds about the object — accessed with
**dot notation**, `$object.PropertyName`:

```powershell
$proc = Get-Process -Name notepad
$proc.Id            # the process ID
$proc.CPU           # CPU time used
$proc.ProcessName   # the process name
```

Inside a pipeline, the special variable **`$_`** represents "the current
object", letting you reference its properties without storing it in a
variable first:

```powershell
Get-Process | Where-Object { $_.CPU -gt 10 }
```

Properties are also what you see when a command's output is displayed on
screen — PowerShell automatically chooses a default set of properties to show
for each object type, formatted as a table or a list.

## 5. Using object actions or methods

**Methods** are actions the object can perform, called with dot notation
followed by **parentheses** — even if the method needs no arguments:

```powershell
$proc = Get-Process -Name notepad
$proc.Kill()          # stop the process
```

If a method needs arguments, they go inside those parentheses:

```powershell
$service.Start()
$string.Replace("old", "new")
```

> **Caution:** forgetting the parentheses after a method name (`$proc.Kill`,
> without `()`) does not call the method — PowerShell just shows you a
> description of the method itself, which is a common source of "why didn't
> that actually do anything" confusion.

## 6. Sorting objects

`Sort-Object` (aliased `sort`) sorts objects by one or more of their
**properties**, rather than sorting lines of text:

```powershell
Get-Process | Sort-Object -Property CPU
Get-Process | Sort-Object -Property CPU -Descending
Get-Process | Sort-Object -Property Company, CPU
```

Because sorting operates on the **actual property value** (a real number for
CPU time, for instance), the ordering is numerically correct — unlike sorting
plain text, which would order `"9"` after `"10"` alphabetically.

## 7. Selecting the properties you want

`Select-Object` (aliased `select`) narrows an object down to just the
properties you actually care about, or limits how many objects come through:

```powershell
Get-Process | Select-Object -Property Name, Id, CPU
Get-Process | Select-Object -First 5
Get-Process | Sort-Object CPU -Descending | Select-Object -First 5
Get-Process | Select-Object -ExpandProperty ProcessName
```

`-ExpandProperty` is worth calling out specifically: rather than returning an
object with just that one property, it returns the **raw values** of that
property directly — useful when you want a plain list of names (or similar)
rather than a table with a single column.

### 7.1 Worked example — top five CPU consumers, name and CPU only

```powershell
Get-Process |
    Sort-Object -Property CPU -Descending |
    Select-Object -First 5 -Property ProcessName, CPU
```

Read left to right: get every process, sort them by CPU time (highest first),
then keep only the top five, showing only their name and CPU columns. Each
stage narrows the data further, working with real objects and real property
values the entire way.

## 8. Objects until the end

Throughout most of a PowerShell pipeline, you are working with genuine
**objects**, with all their properties and methods intact — that is true all
the way up until the point where something actually needs to **display**
them.

The `Format-*` cmdlets (`Format-Table`, `Format-List`, `Format-Wide`) convert
objects into **display-only** output meant purely for the screen. Once that
conversion happens, the result is **no longer** the original object — you
cannot meaningfully pipe a `Format-*` cmdlet's output into something that
expects real objects (`Sort-Object`, `Where-Object`, `Select-Object`, and so
on).

> **Exam tip:** the practical rule this produces is simple and important:
> **`Format-*` cmdlets go last** in a pipeline, after every filtering,
> sorting and property selection is already done. Put one earlier by
> accident, and later stages silently receive formatting objects instead of
> the real data — a classic, confusing PowerShell mistake.

```
Correct order:

  Get-Process | Sort-Object CPU -Descending |
      Select-Object -First 5 | Format-Table

  (filter/sort/select first, format-* absolutely last)
```

## 9. Common points of confusion

- **Forgetting parentheses on a method call.** `$obj.MethodName` without
  `()` describes the method rather than running it (Section 5).
- **Assuming Format-\* output can be piped onward meaningfully.** It cannot
  — see Section 8.
- **Property names are shown, but not always what you'd guess.** `Get-Member`
  is the reliable way to find a property's **exact** name — property names
  are usually not case-sensitive to type, but must otherwise be spelled
  exactly as PowerShell defines them.
- **Confusing what's displayed with what's actually there.** The default
  on-screen display for an object type shows only a **subset** of its
  properties. `Get-Member` (or `Select-Object -Property *`) shows you
  everything that object actually carries, which is often far more than what
  appears by default.
- **`Select-Object -Property` creates a new, simplified object**, not a
  reference to the original — once you have selected down to a few
  properties, the result is a lighter custom object; you cannot then call the
  original object's methods on it, because they are gone along with the
  properties you didn't select.

## 10. Security perspective

Object-oriented output is a design choice with real security consequences,
mostly upside but with a couple of things worth flagging:

- **Structured objects reduce a class of scripting bugs entirely.** Because
  data like a CPU value, a file size, or a date arrives as a real typed value
  rather than text to be parsed, a whole category of parsing-related bugs
  (a regex that fails on an unexpected format, a string comparison that
  behaves wrong on an edge case) simply does not arise the way it would in a
  text-based shell. That reliability matters directly for security scripts —
  a detection or response script that misparses its input can silently miss
  the thing it was looking for.
- **`Get-Member` is itself a reconnaissance tool, for you and for an
  attacker.** Discovering an object's full method list is exactly how you
  find powerful, sometimes destructive actions you did not know existed —
  legitimately useful for administration, and equally useful for an attacker
  probing what a script or session can do. Be cautious about which objects
  you expose to less-trusted code or users, since `Get-Member` will happily
  reveal everything available on them.
- **A method call executes immediately, with your current privileges.**
  Calling `.Kill()`, `.Delete()`, or similar on an object takes effect
  instantly and irreversibly, exactly as if you had run the equivalent
  cmdlet — there is no extra confirmation step just because it was invoked
  via dot notation rather than a named command. Treat destructive method
  calls with the same caution as their cmdlet equivalents (many of which
  offer `-WhatIf` and `-Confirm`; raw method calls generally do not).
- **`-ExpandProperty` and property selection can unintentionally simplify
  away useful audit data.** Trimming an object down to only the columns you
  currently care about is convenient, but if that trimmed output is what
  gets logged or saved, later investigation may be missing properties nobody
  thought to keep — worth erring toward selecting a broader property set for
  anything destined for a log or report.

## Summary

- An **object** bundles **properties** (data) and **methods** (actions);
  PowerShell's pipeline passes real objects, not text.
- Objects mean pipeline stages work with **structured, correctly typed**
  data — no re-parsing text at every step.
- **`Get-Member`** (`gm`) lists every property and method an object has,
  including each property's data type.
- **Properties**: `$object.PropertyName`, or `$_.PropertyName` inside a
  pipeline. **Methods**: `$object.MethodName()` — parentheses required even
  with no arguments.
- **`Sort-Object`** sorts by real property values (`-Property`,
  `-Descending`); **`Select-Object`** narrows to specific properties
  (`-Property`), limits count (`-First`), or unwraps raw values
  (`-ExpandProperty`).
- Data stays as **real objects** through most of a pipeline; **`Format-*`**
  cmdlets convert to display-only output and must go **last**.
- Common trip-ups: missing method parentheses, piping past Format-\*,
  assuming default display = all properties, and Select-Object producing a
  new, simplified object rather than a reference to the original.

## Glossary

| Term | Meaning |
| --- | --- |
| Object | A bundle of properties (data) and methods (actions). |
| Property | A piece of data an object carries. |
| Method | An action an object can perform. |
| Get-Member | Lists an object's properties and methods. |
| $_ | The current object inside a pipeline. |
| Dot notation | `$object.Property` / `$object.Method()` syntax. |
| Sort-Object | Sorts objects by one or more property values. |
| Select-Object | Selects specific properties, or limits/unwraps output. |
| -ExpandProperty | Returns a property's raw value, not a wrapping object. |
| Format-Table / Format-List | Convert objects to display-only output. |
| Display-only object | A Format-* result, not usable by further object-aware cmdlets. |
| Member type | Get-Member's classification (Property, Method, etc.) of an item. |
| TypeName | The full .NET type name of an object, shown by Get-Member. |

## Review questions

1. What is an object, in PowerShell terms?
2. Why does PowerShell pass objects through the pipeline instead of text?
3. What does Get-Member show you, and why is it useful for an unfamiliar
   object type?
4. How do you read a property's value using dot notation? Give an example.
5. How do you call a method, and what mistake commonly happens if you forget
   something?
6. How does Sort-Object avoid the "9 sorts after 10" problem that text
   sorting can have?
7. What does Select-Object -ExpandProperty do differently from a normal
   -Property selection?
8. What happens to an object once it passes through a Format-* cmdlet?
9. Why must Format-* cmdlets go last in a pipeline?
10. Name two common points of confusion covered in this lesson.
11. What is $_, and where is it used?
12. Scenario: you want the five processes using the most memory, showing only
    name and memory. Write a single pipeline that does this.
13. Scenario: a script piped Format-Table output into Where-Object and got
    unexpected results. What's the likely cause?
14. Scenario: why might it be risky to run Get-Member against objects in a
    session used by less-trusted script authors?

## Answer key

1. **A bundle of data (properties) and actions (methods) representing one
   "thing" — a process, a file, a service, etc.** Data plus behaviour,
   together.
2. **So pipeline stages receive real, typed data rather than text needing to
   be re-parsed at each step.** Structure over string parsing.
3. **Every property and method the object has, including each property's data
   type — the standard way to learn "what can I do with this."** Full member
   discovery.
4. **`$object.PropertyName` — e.g. `$proc.CPU` returns a process's CPU
   time.** Dot notation for data.
5. **`$object.MethodName()`, with parentheses even for no-argument methods;
   forgetting the parentheses just describes the method instead of running
   it.** A classic silent mistake.
6. **It sorts by the actual (often numeric) property value, not the text
   representation, so 9 correctly sorts before 10.** Real values, real
   ordering.
7. **It returns the property's raw values directly, rather than an object
   wrapping just that one property.** Plain values vs a single-column object.
8. **It becomes display-only output — no longer the original object, and not
   usable by cmdlets expecting real objects.** Conversion is one-way.
9. **Because anything after a Format-* cmdlet receives display objects
   instead of the real data, breaking filtering/sorting/selection.** Order
   matters for correctness.
10. **Missing method parentheses, and assuming Format-* output can be piped
    onward — any two named in the lesson.** Recurring stumbling blocks.
11. **The current object inside a pipeline; used to reference its properties,
    e.g. `Where-Object { $_.CPU -gt 10 }`.** The pipeline's "this one" variable.
12. **`Get-Process | Sort-Object -Property WS -Descending | Select-Object
    -First 5 -Property ProcessName, WS` (or the relevant memory property).**
    Sort, then limit and select.
13. **Format-Table converts objects to display-only output, so Where-Object
    afterward isn't filtering real property values anymore.** Format-* out of
    order.
14. **Get-Member reveals every available method, including destructive ones,
    to anyone who can run it — effectively a reconnaissance tool for what
    actions are possible.** Discoverability cuts both ways.
