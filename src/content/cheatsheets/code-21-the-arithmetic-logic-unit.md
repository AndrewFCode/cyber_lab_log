---
title: "Code: The Arithmetic/Logic Unit"
description: "Code ch. 21 — the ALU: add/subtract plus AND, OR, XOR selected by a function code, with status flags for carry, zero and sign."
tags: ["code", "petzold", "computing", "cpu", "logic"]
draft: false
updated: "2026-09-18"
kind: "resource"
resource: "code"
module: "Ch. 21"
moduleOrder: 21
unit: 21
---
> **In one line:** the ALU is the part that actually does the work — arithmetic and logic on two numbers, with a function code choosing the operation and status flags describing the result.

*Companion to: Charles Petzold, Code (2nd edition), chapter 21.*

---

## What the ALU does

Two data inputs (A and B) go in; a **function code** picks the operation; one result comes out, along with **status flags**.

| Operation | Built from |
|---|---|
| Add / subtract | The adder plus two's complement ([ch. 14](/resources/code/14/), [ch. 16](/resources/code/16/)) |
| AND, OR, XOR | Banks of the matching gates, one per bit |
| Pass / compare | Route A or B through; compare is a subtract whose result is thrown away |

A **multiplexer** selects which of these results reaches the output, based on the function code.

---

## Status flags

Set as a side effect of every operation, and later tested to make decisions ([ch. 22](/resources/code/22/)).

| Flag | Set when |
|---|---|
| Carry (CF) | The result didn't fit — a carry or borrow out of the top bit |
| Zero (ZF) | The result is exactly 0 (how equality is tested: A − B == 0) |
| Sign (SF) | The top bit is 1 — the result is negative in two's complement |
| Overflow (OF) | A signed result went out of range (e.g. 127 + 1) |

**Comparing** is subtracting and reading the flags: A == B if Zero is set; A < B is read from the sign and overflow flags together.

---

## Try it — flags in Python

```python
def alu(a, b, op, width=8):
    mask = (1 << width) - 1
    if op == 'ADD': raw = a + b
    elif op == 'SUB': raw = a - b
    elif op == 'AND': raw = a & b
    elif op == 'OR':  raw = a | b
    elif op == 'XOR': raw = a ^ b
    result = raw & mask
    flags = {
        'Z': result == 0,
        'S': (result >> (width - 1)) & 1 == 1,
        'C': raw != result,               # carry/borrow out
    }
    return result, flags

print(alu(200, 100, 'ADD'))   # (44, {'Z': False, 'S': False, 'C': True})
print(alu(50, 50, 'SUB'))     # (0,  {'Z': True,  'S': False, 'C': False})
```

---

## 🔐 Security and IT connections

- **Comparisons run on flags, and that leaks time.** A password check that bails out at the first wrong byte returns faster for a near-miss — a **timing side channel**. Security code uses constant-time comparisons (e.g. `hmac.compare_digest`) that always check every byte.
- **The overflow and carry flags are the ALU-level view of the overflow bugs** from [chapter 16](/resources/code/16/) — where a wrapped length calculation leads to a buffer overflow.

---

## Practice drills

<details>
<summary>1. How does the ALU test whether A equals B?</summary>

Subtract them and check the Zero flag — if A − B is 0, they're equal.
</details>

<details>
<summary>2. 100 + 200 in an 8-bit ALU. Which flag is set, and what's the result?</summary>

Carry is set; the result wraps to 44 (300 − 256).
</details>

<details>
<summary>3. Why is a first-mismatch password check a security problem?</summary>

It returns sooner for wrong guesses that share a prefix, leaking information through timing.
</details>

---

## Key takeaways

- The ALU does arithmetic and logic, chosen by a function code.
- Status flags (carry, zero, sign, overflow) summarise each result.
- Comparison is subtraction plus flag-reading — and the timing of it can leak secrets.
