---
title: Bits Bytes and Character Encoding
description: Summary of chapters 11-13
tags:
  - computing-fundamentals
  - binary
  - hexidecimal
  - encoding
  - unicode
draft: false
updated: 2026-09-17
category: CODE
pinned: false
kind: resource
resource: "Code (2nd ed.)"
module: "Chapters 11–13"
moduleOrder: 4
---
# Bits, Bytes & Character Encoding

> **In one line:** a bit is a choice between two possibilities; stack them up and you can encode any information a human can express in words, pictures or sounds.

*Companion to: Computing Fundamentals — Binary, Encoding & How a CPU Works.*

---

## Bits as information

**Information is a choice between two or more possibilities.** Anything that can be reduced to a set of possibilities can be expressed in bits.


| Bits | Possibilities |
| ---- | ------------- |
| 1 | 2 |
| 2 | 4 |
| 3 | 8 |
| 4 | 16 |
| 8 | 256 |
| n | 2ⁿ |


- **1 bit** conveys two possibilities (yes/no, on/off).
- **2 bits** cover three *or* four possibilities — you round up to the next power of two, and spare combinations simply go unused.
- **Every additional bit doubles** the number of possibilities.

**The limit:** if you can't express something in **words, pictures or sounds**, you can't encode it in bits either. Bits aren't the constraint — expressibility is.

**Scaling up:** a single bit represents a simple statement. Combine bits and you can represent **numbers**; once you can represent numbers, you can represent any kind of data at all, because everything else is a mapping onto numbers.

---

## Bytes

- **1 byte = 8 bits.**
- A byte holds **256 values** — `0–255` unsigned, or `00–FF` in hex.

---

## Hexadecimal

**Hex exists for exactly one reason:** to write the value of bytes as concisely as reasonably possible. It isn't a different kind of number — it's a more readable notation for the same bits.

**The key property: 4 binary digits = 1 hex digit.** So a byte is always exactly two hex digits.

```
0010 0100 0110 1000 1010 1100 1110
  2    4    6    8    A    C    E     →  2468ACE
```

### Place values

Same positional rule as any base — **digit × 16^position**, counting from 0 on the right:


| Position | 4 | 3 | 2 | 1 | 0 |
| --------- | ------ | ----- | --- | --- | --- |
| **Power** | 16⁴ | 16³ | 16² | 16¹ | 16⁰ |
| **Value** | 65,536 | 4,096 | 256 | 16 | 1 |


Worked example — `9A48C`:

```
(9 × 65,536) + (A × 4,096) + (4 × 256) + (8 × 16) + (C × 1)
    589,824  +     40,960  +     1,024 +      128 +      12
=  631,948
```

Remember `A=10, B=11, C=12, D=13, E=14, F=15`.

---

## Character encoding

**The most vital computer standard there is.** Without an agreed mapping between numbers and characters, text can't move between systems.

### Why 7 bits?

- **Morse code** is a *variable-length* code — common letters get short sequences, rare ones get long ones. Efficient for humans, awkward for machines.
- Teletypewriters used **5-bit** codes, which can only cover 32 values. They compensated with **shift codes** (a mode switch between letters and figures) — fragile, because losing the shift character corrupts everything after it.
- Eliminating shift codes meant needing enough values for **every letter, digit and punctuation mark in English at once**. That required **7 bits** (128 values).

### ASCII

**American Standard Code for Information Interchange** — a **7-bit** code, 128 values total:


| Type | Count | What they are |
| ---------------------- | ----- | --------------------------------------------------------------------------------- |
| **Graphic characters** | 95 | Anything with a visual representation — letters, digits, punctuation, space |
| **Control characters** | 33 | No visual form; they *perform a function* — line feed, carriage return, tab, bell |


ASCII is the standard for **plain text**.

### Files and storage

- A **file** is a collection of bytes identified by a **name** plus a **type** (`.txt`, `.html`).
- Estimating the size of a plain-text document: **count the characters.** In ASCII each character is stored in **one byte** — so ~1,000 characters ≈ 1 KB.
- **Rich text** adds formatting on top of the characters. **HTML** is the most widely used rich-text format — the markup itself is still plain ASCII text.

### Unicode

ASCII covers English. Unicode covers everything else.


|  | Range |
| -------------------- | ------------------------------------------------------------------ |
| **Original Unicode** | 16-bit — 65,536 characters |
| **Unicode today** | Expanded to **21-bit**, to take in more scripts, symbols and emoji |


**The endianness problem:** with multi-byte characters, different machines disagreed about which byte comes first. The fix is the **byte order mark (BOM)** — a marker at the start of the data declaring the byte order used.

### UTF-8

The compromise that won the web: **flexibility vs. concision**.

- **Variable width** — a character occupies **1, 2, 3 or 4 bytes** depending on its value.
- **Backwards compatible with ASCII** — the first 128 code points are encoded as a single byte, identical to ASCII. Any valid ASCII file is already a valid UTF-8 file.
- Common characters stay compact; rare ones cost more bytes. That's why it dominates the web.

---

## Key takeaways

- Information = a choice between possibilities; n bits = 2ⁿ of them.
- 1 byte = 8 bits = 256 values = 2 hex digits.
- Hex is notation, not a different number system — 4 bits per digit is the whole point.
- ASCII: 7-bit, 128 values, 95 graphic + 33 control characters, one byte per character.
- Unicode: originally 16-bit, now 21-bit; BOM resolves byte-order ambiguity.
- UTF-8: 1–4 bytes per character, ASCII-compatible, the web default.

