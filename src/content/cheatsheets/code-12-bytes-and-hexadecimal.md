---
title: "Code: Bytes and Hexadecimal"
description: "Code ch. 12 — the 8-bit byte, nibbles, hexadecimal digits and conversion, hex notation, and where hex appears in everyday IT."
tags: ["code", "petzold", "computing", "hexadecimal", "binary"]
draft: false
updated: "2026-09-18"
kind: "resource"
resource: "code"
module: "Ch. 12"
moduleOrder: 12
unit: 12
---
> **In one line:** computers group bits into 8-bit bytes, and hexadecimal writes each byte as exactly two digits — the shorthand you'll read for the rest of your career.

*Companion to: Charles Petzold, Code (2nd edition), chapter 12.* See also [TCM Help Desk section 3](/resources/tcm-help-desk/3/).

---

## Bytes

| Unit | Size | Values |
|---|---|---|
| Bit | 1 | 2 |
| Nibble | 4 bits | 16 → **one hex digit** |
| Byte | 8 bits | 256 → **two hex digits** (`00`–`FF`) |
| 16-bit word | 2 bytes | 65,536 (`0000`–`FFFF`) |

IBM popularised the 8-bit byte in the 1960s. It's big enough for a character and splits neatly into two nibbles.

---

## Hexadecimal (base 16)

| Hex | 0–9 | A | B | C | D | E | F |
|---|---|---|---|---|---|---|---|
| Decimal | 0–9 | 10 | 11 | 12 | 13 | 14 | 15 |

- **Hex → decimal:** `2F` = 2×16 + 15 = **47**.
- **Binary → hex:** split into nibbles. `1010 1111` = `A` `F` = **AF**.

| Notation | Where |
|---|---|
| `0x2F` | C, Python, PowerShell, most code |
| `2Fh` | Assembly, older docs |
| `#2F` | CSS colours (`#FF0000` = red) |
| `&H2F` | Visual Basic |
| `2f` | Hashes and dumps — usually lowercase, no prefix |

---

## Where you'll meet hex

| Thing | Example | Size |
|---|---|---|
| MAC address | `00:1A:2B:3C:4D:5E` | 6 bytes (48 bits) |
| IPv6 address | `2001:db8::1` | 16 bytes (128 bits) |
| SHA-256 hash | 64 hex characters | 32 bytes (256 bits) |
| Colour | `#1E90FF` | 3 bytes (red, green, blue) |
| Memory address | `0x7FFE4A20` | Depends on architecture |
| Windows error code | `0x80070005` (access denied) | 4 bytes |

---

## Try it

```powershell
'{0:X2}' -f 47                     # 2F
0x2F                               # 47
Format-Hex .\file.bin              # hex dump
Get-FileHash .\file.bin            # SHA-256, shown in hex
```

```bash
printf '%02X\n' 47                 # 2F
echo $((16#2F))                    # 47
xxd file.bin | head                # hex dump
sha256sum file.bin
```

---

## 🔐 Security and IT connections

- **Hex is the language of investigation:** file signatures (`4D 5A` = Windows executable), packet bytes in Wireshark, hash values in threat intel, and memory addresses in crash dumps.
- **Hashes are compared as hex strings.** One changed byte gives a completely different hash — check downloads against the vendor's published value.
- **Error codes decode to meaning.** Search `0x80070005`-style codes exactly as shown.

---

## Practice drills

<details>
<summary>1. Convert <code>0xC8</code> to decimal.</summary>

12×16 + 8 = 200
</details>

<details>
<summary>2. How many hex characters is an MD5 hash (128 bits)?</summary>

128 ÷ 4 = 32
</details>

<details>
<summary>3. Write binary <code>0011 1010</code> in hex.</summary>

`3A`
</details>

---

## Key takeaways

- Byte = 8 bits = two nibbles = two hex digits.
- Hex digits run 0–F; convert binary by grouping into fours.
- MAC addresses, IPv6, hashes, colours and memory addresses are all hex.
