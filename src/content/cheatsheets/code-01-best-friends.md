---
title: "Code: Best Friends"
description: "Code ch. 1 — Morse code as a first code: dots, dashes and timing, why common letters are short, and what a code actually is."
tags: ["code", "petzold", "computing", "encoding"]
draft: false
updated: "2026-09-18"
kind: "resource"
resource: "code"
module: "Ch. 1"
moduleOrder: 1
unit: 1
---
> **In one line:** a code is an agreed system for turning information into signals — Morse does it with just two kinds of blink.

*Companion to: Charles Petzold, Code (2nd edition), chapter 1.*

---

## What a code is

| Idea | Meaning |
|---|---|
| Code | An agreed system for representing information so it can be sent or stored |
| Encode / decode | Turn a message into the code / turn it back |
| Symbol | The smallest unit the code uses — for Morse, a dot or a dash |
| Channel | Whatever carries the signal: light, sound, wire, radio |

Speech, writing and Morse are all codes for the same thing: ideas. Computers are machines built entirely around codes.

---

## International Morse code

| A `.-` | B `-...` | C `-.-.` | D `-..` | E `.` | F `..-.` | G `--.` |
|---|---|---|---|---|---|---|
| **H** `....` | **I** `..` | **J** `.---` | **K** `-.-` | **L** `.-..` | **M** `--` | **N** `-.` |
| **O** `---` | **P** `.--.` | **Q** `--.-` | **R** `.-.` | **S** `...` | **T** `-` | **U** `..-` |
| **V** `...-` | **W** `.--` | **X** `-..-` | **Y** `-.--` | **Z** `--..` | | |

- **Common letters get short codes.** E is `.` and T is `-`. The shortest signals go to the letters used most — an early form of compression.
- **SOS** is `... --- ...`, sent as one continuous signal.

### Timing is part of the code

| Element | Length |
|---|---|
| Dot | 1 unit |
| Dash | 3 units |
| Gap inside a letter | 1 unit |
| Gap between letters | 3 units |
| Gap between words | 7 units |

Without the gaps, `.. .` (I E) and `...` (S) would be indistinguishable.

---

## Try it

```python
MORSE = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.',
    'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.',
    'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-',
    'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--', 'Z': '--..',
}

def to_morse(text):
    return ' / '.join(' '.join(MORSE[c] for c in word) for word in text.upper().split())

print(to_morse("hi mum"))   # .... .. / -- ..- --
```

---

## 🔐 Security and IT connections

- **Encoding is not secrecy.** Morse, like Base64 or hex, is public — anyone with the table can read it. Secrecy needs encryption.
- **Any on/off channel can carry data.** Researchers have leaked data from air-gapped machines by blinking LEDs or modulating fan noise. It's the same idea as two friends flashing torches.
- **Short codes for common symbols** is the principle behind real compression (Huffman coding in ZIP files).

---

## Practice drills

<details>
<summary>1. Decode <code>.... . .-.. .--.</code></summary>

HELP
</details>

<details>
<summary>2. Why is E a single dot?</summary>

It's the most common letter in English, so giving it the shortest code saves the most time.
</details>

<details>
<summary>3. What separates two words in Morse?</summary>

A gap of seven units — longer than the three-unit gap between letters.
</details>

---

## Key takeaways

- A code is an agreed mapping between information and signals.
- Morse uses two symbols plus timing; common letters get the shortest codes.
- Encoding isn't encryption — anyone with the table can decode it.
