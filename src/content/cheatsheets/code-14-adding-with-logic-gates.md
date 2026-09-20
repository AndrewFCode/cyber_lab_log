---
title: "Code: Adding with Logic Gates"
description: "Code ch. 14 — binary addition, XOR, the half adder and full adder, chaining them into an 8-bit ripple-carry adder, and overflow."
tags: ["code", "petzold", "computing", "logic-gates", "binary"]
draft: false
updated: "2026-09-18"
kind: "resource"
resource: "code"
module: "Ch. 14"
moduleOrder: 14
unit: 14
---
> **In one line:** binary addition is just two gate outputs per column — XOR for the sum, AND for the carry — and chaining them lets gates do arithmetic.

*Companion to: Charles Petzold, Code (2nd edition), chapter 14.* The book's companion site, CodeHiddenLanguage.com, animates many of these circuits.

---

## Binary addition

| A | B | Sum | Carry |
|---|---|---|---|
| 0 | 0 | 0 | 0 |
| 0 | 1 | 1 | 0 |
| 1 | 0 | 1 | 0 |
| 1 | 1 | 0 | **1** |

- **The Sum column** is exactly **XOR** — true when the inputs differ.
- **The Carry column** is exactly **AND**.

```
    0110 1011   (107)
  + 0011 0110   ( 54)
  -----------
    1010 0001   (161)
```

---

## Building adders

| Circuit | Inputs | Built from | Outputs |
|---|---|---|---|
| Half adder | A, B | 1 XOR + 1 AND | Sum, Carry |
| Full adder | A, B, Carry-in | 2 half adders + 1 OR | Sum, Carry-out |
| 8-bit ripple-carry adder | Two bytes | 8 full adders chained | 8-bit sum + final carry |

- **XOR is built from basic gates:** (A OR B) AND NOT (A AND B).
- **Ripple carry:** each column's carry-out feeds the next column's carry-in, so the carry "ripples" across. Simple, but slow for wide numbers.
- **The final carry-out** set means the result didn't fit in 8 bits.

---

## Try it — a gate-level adder in Python

```python
def full_adder(a, b, cin):
    s = a ^ b ^ cin
    cout = (a & b) | (cin & (a ^ b))
    return s, cout

def add8(x, y):
    carry, result = 0, 0
    for i in range(8):
        bit, carry = full_adder((x >> i) & 1, (y >> i) & 1, carry)
        result |= bit << i
    return result, carry

print(add8(107, 54))    # (161, 0)
print(add8(200, 100))   # (44, 1) — 300 doesn't fit: 300 − 256 = 44, carry out 1
```

---

## 🔐 Security and IT connections

- **Integer overflow is a real vulnerability class.** When a sum exceeds the register size the carry is lost and the value wraps (200 + 100 = 44 in 8 bits).
  - If a program calculates a buffer size that way, it allocates too little memory, and the copy that follows overflows it.
- **XOR is everywhere in security:** in adders, parity checks, stream ciphers, and simple malware obfuscation (see [chapter 21](/resources/code/21/)).

---

## Practice drills

<details>
<summary>1. Add binary 1011 + 0110.</summary>

10001 (11 + 6 = 17) — a carry out of the fourth bit.
</details>

<details>
<summary>2. Which two gates make a half adder?</summary>

XOR (sum) and AND (carry).
</details>

<details>
<summary>3. Why is a full adder needed after the first column?</summary>

Every column after the first must also add the carry coming in from the column before.
</details>

---

## Key takeaways

- Sum = XOR, carry = AND. Together they're a half adder.
- Two half adders plus an OR make a full adder; chain eight for a byte.
- A lost final carry means overflow — the root of real bugs and vulnerabilities.
