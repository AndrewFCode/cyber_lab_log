---
title: "Code: Alternative 10s"
description: "Code ch. 10 — counting in other bases: octal, base 4 and binary, converting between them, and where octal still shows up in Linux permissions."
tags: ["code", "petzold", "computing", "number-systems", "binary"]
draft: false
updated: "2026-09-18"
kind: "resource"
resource: "code"
module: "Ch. 10"
moduleOrder: 10
unit: 10
---
> **In one line:** ten is just one choice — count in eights, fours or twos and the same place-value rules apply, and binary is the one electricity loves.

*Companion to: Charles Petzold, Code (2nd edition), chapter 10.*

---

## Place values by base

| Base | Digits | Place values (right to left) |
|---|---|---|
| 10 (decimal) | 0–9 | 1, 10, 100, 1000 |
| 8 (octal) | 0–7 | 1, 8, 64, 512 |
| 4 (quaternary) | 0–3 | 1, 4, 16, 64 |
| 2 (binary) | 0–1 | 1, 2, 4, 8, 16, 32, 64, 128 |

| Decimal | Octal | Base 4 | Binary |
|---|---|---|---|
| 5 | 5 | 11 | 101 |
| 8 | 10 | 20 | 1000 |
| 10 | 12 | 22 | 1010 |
| 64 | 100 | 1000 | 1000000 |
| 100 | 144 | 1210 | 1100100 |

- **Base to decimal:** multiply each digit by its place value, then add.
- **Decimal to base:** divide by the base repeatedly and read the remainders from bottom to top.
- **One octal digit = three bits**, so converting between octal and binary is just grouping.

---

## Binary is the natural fit

Binary needs only two states — off/on, open/closed, 0/1 — exactly what switches, relays and transistors provide.

Circuits can **decode** a binary number into "which one of N lines is on" (a 3-to-8 decoder), or **encode** it back.

---

## Octal in real life: Linux permissions

| Octal | Binary | Permission |
|---|---|---|
| 7 | 111 | `rwx` |
| 6 | 110 | `rw-` |
| 5 | 101 | `r-x` |
| 4 | 100 | `r--` |
| 0 | 000 | `---` |

```bash
chmod 750 script.sh          # owner rwx, group r-x, others ---
stat -c '%a %A %n' script.sh # 750 -rwxr-x--- script.sh
```

---

## Try it

```python
oct(493)          # '0o755'
int('755', 8)     # 493
bin(100)          # '0b1100100'
int('1210', 4)    # 100
```

```powershell
[Convert]::ToString(493, 8)    # 755
[Convert]::ToInt32('755', 8)   # 493
```

---

## 🔐 Security and IT connections

- **Reading permissions fast:** `777` means anyone can write, which is almost always wrong. `600` is right for private keys.
- **A fourth leading digit adds special bits.** `4755` is **SUID**: the program runs with its owner's rights. Unusual SUID files are a classic privilege-escalation hunt:

  ```bash
  find / -perm -4000 -type f 2>/dev/null
  ```

---

## Practice drills

<details>
<summary>1. Convert octal 17 to decimal.</summary>

1×8 + 7 = 15
</details>

<details>
<summary>2. What does <code>chmod 640</code> give?</summary>

`rw-r-----` — owner read/write, group read, others nothing.
</details>

<details>
<summary>3. Convert binary 101 110 to octal.</summary>

Group into threes: 101 = 5, 110 = 6 → octal 56.
</details>

---

## Key takeaways

- Place value works in every base; only the multiplier changes.
- Binary suits circuits because it needs just two states.
- Octal packs three bits per digit — which is why Linux permissions are written as `755` and `640`.
