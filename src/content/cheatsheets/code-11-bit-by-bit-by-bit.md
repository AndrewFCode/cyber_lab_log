---
title: "Code: Bit by Bit by Bit"
description: "Code ch. 11 — the bit as a yes/no answer, 2ⁿ possibilities, how many bits a choice needs, barcodes with check digits, and QR codes."
tags: ["code", "petzold", "computing", "binary", "information"]
draft: false
updated: "2026-09-18"
kind: "resource"
resource: "code"
module: "Ch. 11"
moduleOrder: 11
unit: 11
---
> **In one line:** a bit is the answer to one yes/no question — string enough of them together and you can encode anything, from a movie rating to a barcode.

*Companion to: Charles Petzold, Code (2nd edition), chapter 11.*

---

## The bit

- **Name:** "bit" = **bi**nary dig**it**. Coined by John Tukey, and made central by Claude Shannon's information theory in 1948.
- **What it holds:** the smallest unit of information — one of two possibilities.
- **n bits give 2ⁿ possibilities.**
- **Choosing among N things** needs log₂(N) bits, rounded up.

| Bits | Possibilities | Enough for |
|---|---|---|
| 1 | 2 | Yes/no, on/off |
| 2 | 4 | Four ratings |
| 3 | 8 | A day of the week, with one spare |
| 5 | 32 | 26 letters |
| 8 | 256 | One byte |
| 10 | 1,024 | ~1,000 choices |

---

## Barcodes

**UPC-A** (the 12-digit barcode on products):

- **Structure:** 1 number-system digit, 5 manufacturer digits, 5 product digits, and **1 check digit**.
- **Bars and spaces** encode the digits in binary modules, with guard patterns at the ends and middle.
- **The check digit** lets the scanner spot misreads:
  1. Add the digits in the odd positions and multiply by 3.
  2. Add the digits in the even positions.
  3. The check digit brings the total up to the next multiple of 10.

```python
def upc_check(first11: str) -> int:
    odd = sum(int(d) for d in first11[0::2])
    even = sum(int(d) for d in first11[1::2])
    return (10 - (odd * 3 + even) % 10) % 10

upc_check("03600029145")   # 2 → full code 036000291452
```

---

## QR codes

| Feature | Purpose |
|---|---|
| 2-D grid of modules | Far more data than a 1-D barcode |
| Three big corner squares | Finder patterns — let the camera locate and orient the code |
| Error correction (L / M / Q / H) | Recovers roughly 7 / 15 / 25 / 30 % damage |

```bash
qrencode -t ansiutf8 "https://example.com"    # draw a QR code in the terminal (qrencode package)
```

---

## Try it

```python
import math
math.ceil(math.log2(1000))   # 10 bits to choose among 1,000 things
2**10                        # 1024
```

---

## 🔐 Security and IT connections

- **Check digits and parity catch accidents, not attackers.** Anyone can recompute a check digit. Detecting tampering needs a cryptographic hash or signature.
- **QR phishing ("quishing").** A QR code hides its URL until scanned, so attackers stick malicious codes over real ones on posters and parking meters. Check the URL the camera shows before opening it.
- **Information needs bits.** Password strength is measured in bits of entropy — each extra bit doubles the guessing work.

---

## Practice drills

<details>
<summary>1. How many bits do you need to give every one of 300 employees a unique number?</summary>

9 bits (2⁹ = 512); 8 bits only gives 256.
</details>

<details>
<summary>2. Why can't a check digit stop a forged barcode?</summary>

The algorithm is public — a forger simply recalculates it.
</details>

<details>
<summary>3. What do the three large squares on a QR code do?</summary>

They're finder patterns that let the scanner locate and orient the code.
</details>

---

## Key takeaways

- A bit is one yes/no answer; n bits give 2ⁿ possibilities; N choices need ⌈log₂N⌉ bits.
- Barcodes and QR codes are bits in visual form, with check digits or error correction.
- Checksums catch accidents; cryptographic hashes catch tampering.
