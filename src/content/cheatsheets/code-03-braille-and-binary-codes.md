---
title: "Code: Braille and Binary Codes"
description: "Code ch. 3 — Braille's six-dot cells as a binary code, 64 combinations, and shift/escape codes that change what the next symbol means."
tags: ["code", "petzold", "computing", "encoding"]
draft: false
updated: "2026-09-18"
kind: "resource"
resource: "code"
module: "Ch. 3"
moduleOrder: 3
unit: 3
---
> **In one line:** each Braille dot is either raised or flat — a bit — so a six-dot cell is a 6-bit code with 64 possible patterns.

*Companion to: Charles Petzold, Code (2nd edition), chapter 3.*

---

## The Braille cell

```
 1 • • 4
 2 • • 5
 3 • • 6
```

- **Six positions**, each raised or not, gives 2⁶ = **64** patterns — 63 plus the blank cell.
- **Letters a–j** use only the top four dots:

| a | b | c | d | e | f | g | h | i | j |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 1-2 | 1-4 | 1-4-5 | 1-5 | 1-2-4 | 1-2-4-5 | 1-2-5 | 2-4 | 2-4-5 |

- **k–t** are a–j with dot 3 added.
- **u, v, x, y, z** are a–e with dots 3 and 6 added. **w** is the exception — it was added later.

---

## Grades

| Grade | Approach |
|---|---|
| Grade 1 | Letter by letter |
| Grade 2 | Adds contractions — single cells for common words and letter groups — to save space |

---

## Shift and escape codes

Some cells don't stand for anything themselves. They change how the **next** cells are read.

| Indicator | Dots | Effect |
|---|---|---|
| Number sign | 3-4-5-6 | Following a–j cells mean 1–9 and 0 |
| Capital sign | 6 | The next letter is a capital |

This "change the meaning of what follows" trick appears all over computing.

---

## Try it

Unicode has a Braille block where **each dot is literally a bit**: dot 1 = bit 0, dot 2 = bit 1, and so on.

```python
chr(0x2800 + 0b000001)   # ⠁  dot 1         = a
chr(0x2800 + 0b000011)   # ⠃  dots 1-2      = b
chr(0x2800 + 0b011001)   # ⠙  dots 1-4-5    = d
```

---

## 🔐 Security and IT connections

- **Escape and shift codes are everywhere:** the Shift key, `\n` in strings, terminal escape sequences, and UTF-8 lead bytes announcing "more bytes follow".
- **Injection attacks abuse them.** A character that changes how the rest is read — `'` in SQL, `;` in a shell, `<` in HTML — lets data turn into commands. It's why input gets escaped or parameterised.

---

## Practice drills

<details>
<summary>1. How many Braille patterns would an 8-dot cell allow?</summary>

2⁸ = 256 (Unicode's Braille block covers all 256).
</details>

<details>
<summary>2. Which dots make the letter k?</summary>

a (dot 1) plus dot 3 — dots 1-3.
</details>

<details>
<summary>3. What's the computing equivalent of the Braille number sign?</summary>

An escape or shift code — e.g. a backslash in a string, or a mode-switch code in older character sets.
</details>

---

## Key takeaways

- Each Braille dot is a bit; a six-dot cell gives 64 patterns.
- Letters follow a system: a–j, then add dot 3, then add dots 3 and 6.
- Shift/escape codes change the meaning of what follows — useful, and the root of injection attacks.
