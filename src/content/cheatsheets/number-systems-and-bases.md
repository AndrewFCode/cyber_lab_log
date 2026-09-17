---
title: "Number Systems & Alternative Bases"
description: "Positional notation, why base 10 is arbitrary, and how to count and convert in any base."
tags:
  - computing-fundamentals
  - binary
  - number-systems
  - code-book
draft: false
updated: 2026-09-17
category: code-book
pinned: false
---

*Covers Code (2nd ed.) chapters 9–10.*

> **In one line:** base 10 is an accident of having ten fingers — the positional system works identically in any base, and computers use base 2 because switches have two states.

## Positional notation

The decimal system we use is **Hindu-Arabic**, and its three properties are what make it powerful:

| Property | Why it matters |
|---|---|
| **Positional** | A digit's value depends on *where* it sits |
| **Has a zero** | Marks an empty position — the innovation Roman numerals lacked |
| **Fixed digit set** | Ten symbols, 0–9, and nothing else |

Compare Roman numerals: not positional, no zero, and arithmetic is close to impossible. Positional notation is what made written calculation practical.

**The universal rule:**

```
value = Σ (digit × base^position)      positions counted from 0, right to left
```

```
  4     2     7
  10²   10¹   10⁰
(4×100) + (2×10) + (7×1) = 427
```

**Base 10 is arbitrary.** Nothing mathematical requires it — we have ten fingers. Had we eight, base 8 would feel just as natural, and the rules would be identical.

## Counting in any base

**The pattern is always the same:** count up through the available digits, run out, reset to 0 and carry 1 to the left.

| Decimal | Binary (2) | Quaternary (4) | Octal (8) | Hex (16) |
|---|---|---|---|---|
| 0 | 0 | 0 | 0 | 0 |
| 1 | 1 | 1 | 1 | 1 |
| 2 | 10 | 2 | 2 | 2 |
| 3 | 11 | 3 | 3 | 3 |
| 4 | 100 | 10 | 4 | 4 |
| 5 | 101 | 11 | 5 | 5 |
| 7 | 111 | 13 | 7 | 7 |
| 8 | 1000 | 20 | 10 | 8 |
| 10 | 1010 | 22 | 12 | A |
| 15 | 1111 | 33 | 17 | F |
| 16 | 10000 | 100 | 20 | 10 |

**Key observation:** in *every* base, the base itself is written `10`. In binary `10` = 2; in octal `10` = 8; in hex `10` = 16. There is no single digit for the base — that's what makes it the base.

**Digits available in base b:** always `0` to `b−1`. Base 8 has no digit 8. Base 16 needs six extra symbols (A–F) because it needs sixteen.

## Why binary

Base 2 uses only **0 and 1** — which maps perfectly onto anything with two states:

| Physical state | Bit |
|---|---|
| Switch closed / open | 1 / 0 |
| Current flowing / not | 1 / 0 |
| High voltage / low voltage | 1 / 0 |
| Magnetised one way / the other | 1 / 0 |

Binary is the only base a physical switch can natively represent. Everything else in computing follows from that.

**Binary arithmetic is trivially simple** — the addition table has four entries:

```
0 + 0 = 0
0 + 1 = 1
1 + 0 = 1
1 + 1 = 0, carry 1
```

Compare the decimal addition table: 100 entries to memorise. This simplicity is exactly why binary can be implemented in hardware with a handful of gates.

## Converting between bases

### Any base → decimal

Multiply each digit by its place value and sum.

```
Binary 1101 = (1×8) + (1×4) + (0×2) + (1×1) = 13
Octal   157 = (1×64) + (5×8) + (7×1) = 111
Hex     2F  = (2×16) + (15×1) = 47
```

### Decimal → any base (divide and collect remainders)

Divide repeatedly by the base; the remainders, **read bottom to top**, are your answer.

```
Convert 13 to binary:
13 ÷ 2 = 6 remainder 1   ↑
 6 ÷ 2 = 3 remainder 0   │ read
 3 ÷ 2 = 1 remainder 1   │ upwards
 1 ÷ 2 = 0 remainder 1   │
                    = 1101
```

### Binary ↔ octal ↔ hex (the shortcut)

Because 8 = 2³ and 16 = 2⁴, conversion is pure grouping — **no arithmetic at all**:

| Target | Group binary into… |
|---|---|
| **Octal** | **3 bits** per digit |
| **Hex** | **4 bits** per digit |

```
binary  10 110 101   →  octal  2 6 5
binary  1011 0101    →  hex    B 5
```

Group from the **right**, padding the left with zeros if needed. This is the entire reason octal and hex exist in computing — they're compact views of binary that cost nothing to translate.

## Doubling: the numbers to know

| Power | 2⁰ | 2¹ | 2² | 2³ | 2⁴ | 2⁵ | 2⁶ | 2⁷ | 2⁸ | 2¹⁰ | 2¹⁶ | 2²⁰ |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **Value** | 1 | 2 | 4 | 8 | 16 | 32 | 64 | 128 | 256 | 1,024 | 65,536 | 1,048,576 |

These recur constantly: 256 values in a byte, 1,024 bytes in a KiB, 65,536 addresses from 16 address lines.

## Key takeaways

- Positional notation + zero is what makes arithmetic workable; base 10 is arbitrary.
- `value = Σ (digit × base^position)`, in every base.
- Base b uses digits 0 to b−1, and the base is always written `10`.
- Binary wins because switches have two states, and its addition table has four entries.
- Decimal → base b: divide repeatedly, read remainders upwards.
- Binary → octal/hex: group in 3s or 4s. No maths required.
