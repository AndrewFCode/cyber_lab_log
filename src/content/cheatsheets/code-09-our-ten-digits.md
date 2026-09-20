---
title: "Code: Our Ten Digits"
description: "Code ch. 9 — why we count in tens, Roman numerals vs positional notation, the importance of zero, and how place value works in any base."
tags: ["code", "petzold", "computing", "number-systems"]
draft: false
updated: "2026-09-18"
kind: "resource"
resource: "code"
module: "Ch. 9"
moduleOrder: 9
unit: 9
---
> **In one line:** base ten is an accident of having ten fingers — what really matters is positional notation, where a digit's place sets its value.

*Companion to: Charles Petzold, Code (2nd edition), chapter 9.*

---

## Two ways to write numbers

| System | How it works | Example: 2026 |
|---|---|---|
| Roman numerals | Symbols with fixed values, added (and sometimes subtracted) | `MMXXVI` |
| Positional (Hindu-Arabic) | Ten digits whose value depends on their **place** | `2026` |

Roman numerals have no zero and no place value, which makes arithmetic painful. Positional notation made written calculation practical.

---

## Place value

| Place | Thousands | Hundreds | Tens | Ones |
|---|---|---|---|---|
| Power of 10 | 10³ | 10² | 10¹ | 10⁰ |
| Digit in 4825 | 4 | 8 | 2 | 5 |
| Value | 4000 | 800 | 20 | 5 |

- **The rule:** 4825 = 4×10³ + 8×10² + 2×10¹ + 5×10⁰.
- **Zero** is a placeholder. It's what makes 205 different from 25.
- **Any base works the same way** — swap 10 for 2, 8 or 16 and you have binary, octal or hex (next chapters).

---

## Try it

```python
digits = [4, 8, 2, 5]
sum(d * 10**p for p, d in enumerate(reversed(digits)))   # 4825
```

---

## 🔐 Security and IT connections

- **Every number format you'll meet uses place value:** binary (IP addresses, subnet masks), hex (MAC addresses, hashes, memory) and octal (Linux permissions).
- **Once you can expand a number by place value in base ten,** you can do it in any base — the foundation for reading subnet masks and hex dumps.

---

## Practice drills

<details>
<summary>1. Expand 3,071 by place value.</summary>

3×10³ + 0×10² + 7×10¹ + 1×10⁰
</details>

<details>
<summary>2. Why is zero essential in positional notation?</summary>

It holds a place with no value — without it, 301 and 31 would look the same.
</details>

<details>
<summary>3. What is MCMXCIX?</summary>

1999
</details>

---

## Key takeaways

- Base ten comes from fingers; positional notation is the real invention.
- Each place is worth the base raised to a power; zero holds empty places.
- The same rule works in every base computers use.
