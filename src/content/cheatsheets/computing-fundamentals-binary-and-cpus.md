---
title: "Computing Fundamentals: Binary, Encoding & How a CPU Works"
description: "Number systems, bits and bytes, character/colour encoding, logic gates, instruction sets and abstraction."
tags:
  - computing-fundamentals
  - binary
  - hexadecimal
  - cpu
draft: false
updated: 2026-09-17
category: computing
pinned: false
kind: resource
resource: "Computing fundamentals"
module: "Overview"
moduleOrder: 1
---

> **In one line:** everything a computer does is millions of electrical switches being on (1) or off (0) — every layer above that is a convention for interpreting those switches.

## Number systems

Every positional number system works the same way: **digit × base^position**, counting positions from 0 on the right.

### Decimal (base 10)

```
  1     6     3
  10²   10¹   10⁰
(1×100) + (6×10) + (3×1) = 163
```

### Binary (base 2)

```
  1    0    1    0    0    0    1    1
  2⁷   2⁶   2⁵   2⁴   2³   2²   2¹   2⁰
 128   64   32   16    8    4    2    1
(1×128) + (1×32) + (1×2) + (1×1) = 163
```

- Position **7** = most significant bit (MSB), position **0** = least significant bit (LSB).
- Any base to the power of 0 is **1**, always.

**Powers of two — memorise these:**

| 2⁷ | 2⁶ | 2⁵ | 2⁴ | 2³ | 2² | 2¹ | 2⁰ |
|---|---|---|---|---|---|---|---|
| 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |

**Quick conversion method:** write the table above, then work left to right — does 128 fit into your number? Yes → write 1, subtract. No → write 0. Repeat.

### Hexadecimal (base 16)

Needs 16 symbols, so letters take over after 9:

| Dec | 10 | 11 | 12 | 13 | 14 | 15 |
|---|---|---|---|---|---|---|
| **Hex** | A | B | C | D | E | F |

```
  A     3
  16¹   16⁰
(10×16) + (3×1) = 163
```

**Why hex exists:** binary gets long fast. Hex is shorthand — **1 hex digit = exactly 4 bits**, so a byte is always 2 hex digits.

```
1010 0011  →  A    3    →  0xA3  =  163
```

## Bits & bytes

| Unit | Size |
|---|---|
| **Bit** | 1 binary digit — smallest unit of storage |
| **Nibble** | 4 bits (= 1 hex digit) |
| **Byte** | 8 bits |
| **Kilobyte (KB)** | 1,000 bytes = 8,000 bits |
| **Kibibyte (KiB)** | 1,024 bytes — what OSes often actually report |

> **Practical tip:** you won't convert by hand on the job. Open Calculator → switch to **Programmer** mode and it'll show DEC/HEX/BIN side by side. Understand the method; use the tool.

## Encoding

The problem: computers only store 1s and 0s, but humans need letters, colours and sound out the other end. **Encoding is an agreed mapping** between numbers and meaning.

### Characters — ASCII

A naive scheme would use alphabet position (H=8, E=5, L=12, L=12, O=15). ASCII does the same job with a standard table, usually written in hex, and includes punctuation, digits and control keys.

| Char | H | e | l | l | o |
|---|---|---|---|---|---|
| **Hex** | 48 | 65 | 6C | 6C | 6F |
| **Dec** | 72 | 101 | 108 | 108 | 111 |

- `0x` is just a prefix meaning "this is hexadecimal" — it adds no value to the number.
- Uppercase and lowercase are **different** code points (`A` = 0x41, `a` = 0x61).

### Colour — RGB

- Any colour = an amount of **Red, Green, Blue**, each 0–255 (one byte each).
- Written in hex as `#RRGGBB` — e.g. `#FF0000` = pure red.

### Images

A monitor is a grid of pixels. Each pixel has an **X,Y coordinate** (a number) and a **colour** (a number). Give every coordinate a colour value and you have an image.

## How a computer computes

### The CPU

- Made of **transistors** — electrical switches, billions of them in a modern chip.
- Pins on the underside handle **input and output**.
- Contains **internal registers** (small, very fast storage, labelled A, B, C…).
- Its job: perform computations and evaluate **logic gates**.
- The core concept hasn't changed in 50 years — chips just got flatter and denser.

### Logic gates & Boolean logic

Two input bits in → one output bit out. A **truth table** defines the output for every possible input combination. Two inputs = **4 possible combinations**.

**AND** — behaves like multiplication. *Both* inputs must be true.

| A | B | Out |
|---|---|---|
| 0 | 0 | 0 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

**OR** — behaves like addition. *Either* input being true is enough.

| A | B | Out |
|---|---|---|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 1 |

Stack enough gates together and you can perform real computation: electricity comes in via the pins, completes circuits through the gates, and results land in the internal registers.

### Voltage → binary

- **High voltage = 1**, **low voltage = 0**. That's the entire physical basis of binary.

### Instruction sets

Every processor has an **instruction set**: binary codes that map to operations.

| Instruction | Description | Code |
|---|---|---|
| `MOVA` | Move data into A register | `1111 0011` |
| `MOVB` | Move data into B register | `1111 0111` |
| `ADD` | Add A and B, result into A | `1100 0011` |
| `NOP` | No operation | `1111 1111` |

Instructions live in **external memory** and are fed to the CPU to execute.

## Anatomy of an executable

A Windows `.exe` is just 1s and 0s, in three parts:

| Section | Purpose |
|---|---|
| **Magic number** | Identifier at the very start; a fixed number of reserved bytes tells the OS what the file is |
| **Data** | Values the program needs |
| **Instructions** | The machine code — instruction-set codes the CPU executes |

```
10101000111001001001001001   ← magic number
00111000011101010011100100 ┐
10001001001001001110010001 ┘ data
01001010011001010110011000 ┐
10010010010011110010010000 │ instructions
11101001000011100111101000 ┘
```

> Windows PE files start with the ASCII bytes `MZ` (`0x4D 0x5A`). **File type is determined by the magic number, not the extension** — which is exactly why renaming a malicious file doesn't disguise it.

## Compilers & abstraction

- Almost nothing is written in machine code. Programs are written in **high-level languages** (C, C++, Java, Python…).
- A **compiler** translates that high-level source into the machine code inside the `.exe`.

**Abstraction** = each layer hides the complexity of the one below it, so you only need to understand your own layer plus roughly one either side.

```
User / application
        ↓
High-level language (C, Python)
        ↓
Compiler / machine code
        ↓
Instruction set & registers
        ↓
Logic gates
        ↓
Transistors & voltage
```

The skill is knowing **where you sit in that chain** — and how far down you need to go to solve the problem in front of you.

## Key takeaways

- Binary is just base 2; hex is just base 16 shorthand where 1 digit = 4 bits.
- Memorise the powers of two to 128 — conversions become trivial.
- Encoding is a shared convention: ASCII for text, RGB for colour, coordinates + colour for images.
- A CPU is transistors → logic gates → registers → instruction set.
- High voltage = 1, low voltage = 0.
- File type comes from the magic number, not the extension.
