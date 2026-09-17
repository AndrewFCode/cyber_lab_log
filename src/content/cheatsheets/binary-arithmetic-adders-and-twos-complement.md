---
title: "Binary Arithmetic: Adders, Real Components & Two's Complement"
description: "Half and full adders, moving from relays to transistors and ICs, and doing subtraction with an adder."
tags:
  - computing-fundamentals
  - logic-gates
  - arithmetic
  - transistors
  - code-book
draft: false
updated: 2026-09-17
category: code-book
pinned: false
---

*Covers Code (2nd ed.) chapters 14–16.*

> **In one line:** an XOR and an AND gate add two bits; chain eight of them and you have a machine that does arithmetic — and with two's complement, the same machine does subtraction for free.

## Adding with logic gates

Binary addition has only four cases:

| A | B | Sum | Carry |
|---|---|---|---|
| 0 | 0 | 0 | 0 |
| 0 | 1 | 1 | 0 |
| 1 | 0 | 1 | 0 |
| 1 | 1 | **0** | **1** |

Look at those two output columns on their own:

- The **Sum** column is exactly an **XOR** truth table.
- The **Carry** column is exactly an **AND** truth table.

That's the whole trick. Arithmetic *is* logic.

### Half adder

Two inputs, two outputs. One XOR gate + one AND gate.

```
A ──┬──────►│XOR│──► Sum
    │    ┌─►│   │
B ──┼────┘
    ├──────►│AND│──► Carry
    └────┬─►│   │
         │
```

**Limitation:** it has nowhere to accept a carry *coming in* from the column to its right. Fine for the rightmost bit only.

### Full adder

Three inputs (A, B, **Carry In**), two outputs (Sum, **Carry Out**). Built from **two half adders plus an OR gate**.

| A | B | Cin | Sum | Cout |
|---|---|---|---|---|
| 0 | 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 1 | 0 |
| 0 | 1 | 0 | 1 | 0 |
| 0 | 1 | 1 | 0 | 1 |
| 1 | 0 | 0 | 1 | 0 |
| 1 | 0 | 1 | 0 | 1 |
| 1 | 1 | 0 | 0 | 1 |
| 1 | 1 | 1 | 1 | 1 |

**Shortcut for reading it:** Sum = 1 when an **odd number** of inputs are 1. Carry Out = 1 when **two or more** inputs are 1.

### 8-bit ripple-carry adder

Chain **eight full adders**. Each one's Carry Out feeds the next one's Carry In.

```
 bit7   bit6   bit5   bit4   bit3   bit2   bit1   bit0
  FA ◄── FA ◄── FA ◄── FA ◄── FA ◄── FA ◄── FA ◄── FA ◄─ Cin=0
   │      │      │      │      │      │      │      │
  S7     S6     S5     S4     S3     S2     S1     S0
```

- Adds two 8-bit numbers (0–255 each).
- The final Carry Out is the **9th bit** — it signals a result too big for 8 bits.
- Want 16-bit? Chain two 8-bit adders, feeding the carry across. The design scales by repetition.

**"Ripple" is literal:** the carry has to propagate along the whole chain before the answer is valid. That propagation time sets the speed limit of the circuit — the reason faster *carry-lookahead* designs exist.

## From relays to real components

Relays prove the concept but are hopeless in practice: slow, bulky, mechanical wear, enormous power draw. The same logic got rebuilt three times in faster substrates.

| Technology | Era | Characteristics |
|---|---|---|
| **Relays** | 1930s–40s | Mechanical, milliseconds, wears out |
| **Vacuum tubes** | 1940s–50s | No moving parts, much faster, hot, fragile, fails often |
| **Transistors** | 1947 onward | Solid state, tiny, cool, cheap, reliable |

All three do the identical job: **a switch controlled by an electrical signal.** The logic layer above them never changes — which is the abstraction principle doing real work.

### Integrated circuits

A **transistor** is a semiconductor switch. Putting many on one slice of silicon gives an **integrated circuit (IC)** — the chip, packaged with pins, in the familiar DIP form.

Classic logic families you'll still see referenced:

| Family | Notes |
|---|---|
| **TTL (7400 series)** | Transistor-Transistor Logic. The standard parts catalogue — 7400 = quad NAND, 7404 = hex inverter, 7408 = quad AND |
| **CMOS (4000 series)** | Lower power consumption, wider voltage tolerance, slower in early versions |

**Specs that matter when using real chips:**

| Spec | Meaning |
|---|---|
| **Propagation delay** | Time from input change to valid output — nanoseconds. Sets maximum clock speed |
| **Fan-out** | How many inputs one output can reliably drive |
| **Voltage levels** | What counts as a valid 1 and a valid 0 — with a deliberate gap between them for noise immunity |
| **Power / heat** | The real constraint at scale |

**Scale terminology:** SSI → MSI → LSI → **VLSI** (thousands to billions of transistors per chip). **Moore's law** was the observation that transistor density roughly doubles every couple of years — which held for decades and is why the same logic got relentlessly smaller, faster and cheaper.

## Subtraction without a subtractor

Building a separate borrow-based subtraction circuit would be wasteful. Instead, **turn subtraction into addition** using complements.

### The decimal intuition

To compute `253 − 176`:

1. Take the **nines' complement** of 176 (subtract each digit from 9): `823`.
2. Add: `253 + 823 = 1076`.
3. Drop the leading 1 and add it back to the result: `076 + 1 = 77`. ✅

No borrowing anywhere — only subtraction from 9, which never borrows, and one addition.

### One's complement (binary)

**Invert every bit.** In hardware that's one inverter per bit — trivially cheap.

```
  01001101
→ 10110010
```

### Two's complement — the one that's actually used

**Invert every bit, then add 1.**

```
 5  = 00000101
 invert = 11111010
 add 1  = 11111011  = −5
```

**Why it wins:** there's only **one representation of zero** (one's complement has both `00000000` and `11111111`), and addition and subtraction use the **exact same adder circuit**.

```
A − B   becomes   A + (two's complement of B)
```

### Signed 8-bit numbers

The **most significant bit becomes the sign bit**: 0 = positive, 1 = negative.

| Interpretation | Range |
|---|---|
| **Unsigned** 8-bit | 0 to 255 |
| **Signed** 8-bit (two's complement) | **−128 to +127** |

| Bits | Unsigned | Signed |
|---|---|---|
| `00000000` | 0 | 0 |
| `01111111` | 127 | 127 |
| `10000000` | 128 | **−128** |
| `11111111` | 255 | **−1** |

Note the asymmetry: one more negative value than positive, because zero takes a slot from the positive side.

**The bits do not change — only the interpretation does.** `11111111` is 255 or −1 depending entirely on what the program decides it means. Nothing in the hardware records which.

### Overflow

| Case | Detection |
|---|---|
| **Unsigned** | The carry out of the top bit is set |
| **Signed** | Two same-signed operands produce an opposite-signed result (e.g. positive + positive = negative) |

The CPU records these in **flag bits** rather than throwing errors. Ignoring them is where a lot of real-world bugs and vulnerabilities come from.

**Quick two's complement by hand:** starting from the right, copy bits up to and including the first `1`, then invert everything to the left of it.

## Key takeaways

- Sum = XOR, Carry = AND. A half adder is those two gates.
- A full adder takes a carry in; eight chained = an 8-bit adder. Carry ripple sets the speed limit.
- Relays → tubes → transistors: same logic, faster substrate, unchanged abstraction above.
- Propagation delay is what caps clock speed.
- Two's complement = invert + add 1. One zero, one circuit for both operations.
- Signed 8-bit range is −128 to +127; the bit pattern alone never tells you which interpretation applies.
