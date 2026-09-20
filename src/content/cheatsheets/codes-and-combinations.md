---
title: "Codes & Combinations"
description: "What a code actually is, variable- vs fixed-length codes, and why every code is really about counting possibilities."
tags:
  - computing-fundamentals
  - encoding
  - code-book
draft: false
updated: 2026-09-17
category: code-book
pinned: false
kind: resource
resource: "Code (2nd ed.)"
module: "Chapters 1–3"
moduleOrder: 1
---

*Covers Code (2nd ed.) chapters 1–3.*

> **In one line:** a code is an agreed mapping between symbols and meaning — and the only real constraint is how many distinct possibilities your symbols can produce.

## What a code is

A **code** is a system for representing information in a form that can be transmitted, stored or understood by something other than the original sender. Spoken language, written language, Morse, Braille and binary are all codes.

**The two directions are not equally hard:**

| Direction | Difficulty |
|---|---|
| **Encoding** (meaning → symbols) | Easier — you look up each item in order |
| **Decoding** (symbols → meaning) | Harder — you must search the table by pattern |

This asymmetry is why codes get designed with structure: structure makes decoding mechanical.

**Communication needs three things:** a shared code, a medium to carry it, and agreement on where one symbol ends and the next begins.

## Morse code

A code built from two symbols — **dot** and **dash** — plus silence.

- **Variable-length:** common letters get short codes (`E` = one dot, `T` = one dash), rare letters get long ones. Efficient for humans sending by hand.
- Requires **three levels of separation**: gap between symbols, longer gap between letters, longer still between words.
- Without those gaps the stream is ambiguous — variable-length codes can't be parsed without delimiters or a prefix-free design.

**The counting problem.** With two symbols, the number of distinct codes of a given length is a power of two:

| Length | Combinations | Running total |
|---|---|---|
| 1 symbol | 2 | 2 |
| 2 symbols | 4 | 6 |
| 3 symbols | 8 | 14 |
| 4 symbols | 16 | 30 |

Codes of **up to 4 elements** give 30 possibilities — enough for 26 letters with a few spare. Adding a fifth element would add another 32.

**The general rule:** with 2 possible symbols and n positions, you get **2ⁿ** combinations. Every extra position doubles the total.

## Braille

A **fixed-length** code: every character is a cell of **6 dots**, each either raised or flat.

- 2 states × 6 positions = **2⁶ = 64 combinations**.
- Fixed length means **no delimiters needed** — you always know where one character ends.
- 64 isn't enough for letters, digits, punctuation and formatting all at once.

**The solution — shift and escape codes.** Special cells change the meaning of what follows:

| Mechanism | Effect |
|---|---|
| **Number indicator** | The next cells are read as digits, not letters |
| **Capital indicator** | The next letter is uppercase |

These are **stateful** codes: the meaning of a cell depends on what came before it. That buys you more characters from the same 64 combinations, at the cost of fragility — lose the indicator and everything after it is misread.

**Contractions** (single cells standing for whole common words) are a compression technique: fewer cells for the same message.

## The ideas that carry forward

| Idea | Why it matters later |
|---|---|
| **2ⁿ possibilities** | The whole basis of bits, bytes and address spaces |
| **Fixed vs variable length** | ASCII is fixed-width; UTF-8 and compression are variable |
| **Shift/escape codes** | The problem 7-bit ASCII was designed to eliminate |
| **Delimiters** | Why protocols need framing, headers and terminators |
| **Two states are enough** | On/off, high/low, dot/dash — anything binary can carry any code |

## Key takeaways

- A code is a shared mapping; decoding is harder than encoding, which is why structure matters.
- Morse: two symbols, variable length, needs gaps to be parsed.
- With 2 symbols and n positions you get 2ⁿ combinations. Up to 4 Morse elements = 30 codes.
- Braille: fixed 6-dot cells = 64 combinations, extended with stateful shift codes.
- Every code is a trade between symbol count, length and the need for delimiters.
