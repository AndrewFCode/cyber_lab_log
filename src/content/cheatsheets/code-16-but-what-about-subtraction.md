---
title: "Code: But What About Subtraction?"
description: "Code ch. 16 — subtracting with an adder: nines' complement, ones' and two's complement, signed numbers, and overflow."
tags: ["code", "petzold", "computing", "binary", "arithmetic"]
draft: false
updated: "2026-09-18"
kind: "resource"
resource: "code"
module: "Ch. 16"
moduleOrder: 16
unit: 16
---
> **In one line:** you don't need a separate subtracting machine — flip the bits, add one, and the adder you already have does subtraction and negative numbers.

*Companion to: Charles Petzold, Code (2nd edition), chapter 16.*

---

## Complements in decimal

**Nines' complement** avoids borrowing:

| Step | 253 − 176 |
|---|---|
| Nines' complement of 176 (999 − 176) | 823 |
| Add it to 253 | 1076 |
| Add 1 and drop the leading 1 | 1077 → **77** |

---

## Complements in binary

| Method | How | −5 in 8 bits | Quirk |
|---|---|---|---|
| Ones' complement | Invert every bit | `1111 1010` | Two zeros (+0 and −0) |
| **Two's complement** | Invert every bit, **then add 1** | `1111 1011` | One zero — what computers use |

- **Subtracting:** A − B = A + (two's complement of B).
- **The circuit:** XOR gates invert B when a SUB signal is on, and the adder's carry-in is set to 1 — one adder does both jobs.

### Signed 8-bit values

| Binary | Unsigned | Signed (two's complement) |
|---|---|---|
| `0000 0000` | 0 | 0 |
| `0111 1111` | 127 | **127** (largest) |
| `1000 0000` | 128 | **−128** (smallest) |
| `1111 1011` | 251 | −5 |
| `1111 1111` | 255 | −1 |

- **The top bit is the sign:** 0 = positive, 1 = negative.
- **Range:** 8 bits hold −128…127; 32 bits hold about ±2.1 billion.
- **Signed overflow:** 127 + 1 wraps to −128.

---

## Try it

```python
format(-5 & 0xFF, '08b')          # '11111011'
(-5) & 0xFF                       # 251 — same bits, read as unsigned
to_signed = lambda x: x - 256 if x > 127 else x
to_signed(251)                    # -5
(107 + ((~54 + 1) & 0xFF)) & 0xFF # 53 — 107 − 54 using only addition
```

---

## 🔐 Security and IT connections

- **Signed/unsigned confusion causes real vulnerabilities.** A length of −1 read as unsigned 32-bit becomes 4,294,967,295. Code that "checks the length is under 100" with a signed comparison, then copies with an unsigned one, can overflow a buffer.
- **Wraparound bugs appear in everyday IT too.** Counters and timestamps that hit their maximum and wrap to zero or negative — like the 32-bit Unix time problem in 2038.

---

## Practice drills

<details>
<summary>1. Write −12 in 8-bit two's complement.</summary>

12 = `0000 1100` → invert `1111 0011` → add 1 → `1111 0100`.
</details>

<details>
<summary>2. What signed value is <code>1000 0001</code>?</summary>

−127
</details>

<details>
<summary>3. Why do computers use two's complement rather than ones' complement?</summary>

There's only one zero, and the normal adder works for signed numbers without special cases.
</details>

---

## Key takeaways

- Subtraction = adding the complement; two's complement is invert + 1.
- In signed numbers the top bit is the sign; 8 bits hold −128 to 127.
- Overflow and signed/unsigned mix-ups are a genuine source of security bugs.
