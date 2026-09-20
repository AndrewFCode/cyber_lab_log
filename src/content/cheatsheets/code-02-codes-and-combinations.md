---
title: "Code: Codes and Combinations"
description: "Code ch. 2 — counting Morse combinations, why two symbols of length n give 2ⁿ codes, and decoding with a binary tree."
tags: ["code", "petzold", "computing", "binary"]
draft: false
updated: "2026-09-18"
kind: "resource"
resource: "code"
module: "Ch. 2"
moduleOrder: 2
unit: 2
---
> **In one line:** with two symbols, every extra position doubles the number of possible codes — 2ⁿ is the most important formula in computing.

*Companion to: Charles Petzold, Code (2nd edition), chapter 2.*

---

## Counting combinations

| Length | Possible dot/dash codes | Running total |
|---|---|---|
| 1 | 2 (`.` `-`) | 2 |
| 2 | 4 (`..` `.-` `-.` `--`) | 6 |
| 3 | 8 | 14 |
| 4 | 16 | 30 |
| 5 | 32 | 62 |

- **The formula:** two symbols in n positions gives **2ⁿ** codes.
- **Enough for the alphabet:** codes of length 1–4 give 30 — enough for 26 letters.

---

## Decoding with a tree

```
                 (start)
           .  /          \  -
            E              T
         . / \ -        . / \ -
          I   A          N   M
         / \ / \        / \ / \
        S  U R  W      D  K G  O
```

Read a code left to right: dot = go left, dash = go right, then stop. `-.-` → T → N → **K**.

---

## Try it

```python
sum(2**n for n in range(1, 5))   # 30 — Morse codes of length 1 to 4
2**8                             # 256 — values in one byte
```

```powershell
[math]::Pow(2, 8)                # 256
```

---

## 🔐 Security and IT connections

- **Keyspace is combinations.** A password drawn from C characters at length L has C^L possibilities, and each extra character multiplies the work for an attacker.

  ```python
  26**8      # 208,827,064,576 — 8 lowercase letters
  95**12     # ~5.4 × 10^23   — 12 printable ASCII characters
  ```

  Length beats complexity: adding characters grows the keyspace far faster than adding symbol types.
- **Bits work the same way.** A 128-bit key has 2¹²⁸ possibilities — far beyond brute force.

---

## Practice drills

<details>
<summary>1. How many different codes of exactly 6 dots/dashes are there?</summary>

2⁶ = 64
</details>

<details>
<summary>2. Using the tree, decode <code>..-</code>.</summary>

E → I → U — the letter U.
</details>

<details>
<summary>3. Which is the bigger keyspace: 10 lowercase letters, or 8 characters from all 95 printable ASCII?</summary>

26¹⁰ ≈ 1.4 × 10¹⁴; 95⁸ ≈ 6.6 × 10¹⁵ — the 8-character mixed set is bigger, but add two more lowercase letters (26¹²) and length wins again.
</details>

---

## Key takeaways

- Two symbols in n positions give 2ⁿ combinations; each position doubles the total.
- A binary tree decodes a two-symbol code step by step.
- The same maths sizes passwords and keys — length is the lever.
