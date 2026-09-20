---
title: "Help Desk: Intro to Computing"
description: "TCM Practical Help Desk section 3 — binary, bits and bytes, character encoding, logic gates and how a CPU computes, compilers and abstraction."
tags: ["help-desk", "tcm", "computing", "binary"]
draft: false
updated: "2026-09-18"
kind: "resource"
resource: "tcm-help-desk"
module: "§3"
moduleOrder: 31
unit: 3
---
> **In one line:** everything a computer does is on/off switches — binary numbers, encoded into characters, pushed through logic gates, wrapped in layers of abstraction.

*Companion to: TCM Security, Practical Help Desk, section 3.* The full ground-up version is in the [Code](/resources/code/) sheets.

---

## The binary system

| Place value | 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |
|---|---|---|---|---|---|---|---|---|
| **200** | 1 | 1 | 0 | 0 | 1 | 0 | 0 | 0 |

- **Binary → decimal:** add the place values that have a `1` (128 + 64 + 8 = 200).
- **Decimal → binary:** take the largest power of two that fits, subtract it, and repeat.

| Decimal | Binary | Hex |
|---|---|---|
| 0 | 0000 | 0 |
| 5 | 0101 | 5 |
| 9 | 1001 | 9 |
| 10 | 1010 | A |
| 15 | 1111 | F |
| 200 | 1100 1000 | C8 |
| 255 | 1111 1111 | FF |

One hex digit = four bits, so hex is binary shorthand.

---

## Bits and bytes

| Unit | Size |
|---|---|
| Bit | 0 or 1 |
| Nibble | 4 bits |
| Byte | 8 bits — 256 values (0–255) |
| KB / MB / GB / TB | 1,000 · 1,000² · 1,000³ · 1,000⁴ bytes — how drives are sold |
| KiB / MiB / GiB / TiB | 1,024 · 1,024² · 1,024³ · 1,024⁴ bytes — how Windows counts |

That's why a "1 TB" drive shows about 931 GB in Windows. Network speeds are in **bits** per second (Mbps); file sizes in **bytes** (MB). 100 Mbps ≈ 12.5 MB/s.

---

## Encoding

| Scheme | Key facts |
|---|---|
| ASCII | 7 bits, 128 characters. `A` = 65 = `0x41`, `a` = 97 = `0x61`, `0` = 48 = `0x30`, space = 32 |
| Extended ASCII / code pages | 8 bits; the upper 128 characters vary by code page — source of garbled text |
| Unicode | One code point per character across all writing systems, e.g. `U+00E9` = é |
| UTF-8 | 1–4 bytes per character; plain ASCII is valid UTF-8 unchanged; the web's default |
| UTF-16 | 2 or 4 bytes; used internally by Windows |
| Base64 | Turns binary into safe text: 3 bytes become 4 characters |

**Garbled characters** (like `Ã©` for `é`) mean text was saved in one encoding and read as another.

---

## How a computer computes

| Gate | Output is 1 when… |
|---|---|
| AND | Both inputs are 1 |
| OR | Either input is 1 |
| NOT | The input is 0 (flips it) |
| XOR | The inputs differ |
| NAND | Not both — any computer can be built from NAND alone |

| A | B | AND | OR | XOR |
|---|---|---|---|---|
| 0 | 0 | 0 | 0 | 0 |
| 0 | 1 | 0 | 1 | 1 |
| 1 | 0 | 0 | 1 | 1 |
| 1 | 1 | 1 | 1 | 0 |

- **Half adder:** sum = A XOR B, carry = A AND B. Chain adders together and you can add any numbers.
- **The CPU:**
  - The **ALU** does the maths and logic.
  - **Registers** hold the values being worked on.
  - The **control unit** runs the **fetch → decode → execute** cycle.
  - The **clock** sets the pace — 3 GHz is 3 billion cycles a second.
- **Memory hierarchy, fastest to slowest:** registers → cache (L1/L2/L3) → RAM → SSD → HDD.

---

## Compilers and abstraction

| Layer (top = easiest for humans) | Example |
|---|---|
| Applications | Outlook, a browser |
| High-level language | Python, C#, JavaScript |
| Assembly | `mov eax, 1` |
| Machine code | `B8 01 00 00 00` |
| Logic gates and transistors | Hardware |

| Approach | How | Examples |
|---|---|---|
| Compiled | Translated to machine code before it runs | C, C++, Go, Rust |
| Interpreted | Read and executed line by line at run time | Python, JavaScript, PowerShell, Bash |
| Bytecode / JIT | Compiled to an intermediate form, then to machine code at run time | Java, C# (.NET) |

---

## Conversions at the command line

| Task | PowerShell | Bash |
|---|---|---|
| Decimal → binary | `[Convert]::ToString(200, 2)` | `echo "obase=2; 200" \| bc` |
| Binary → decimal | `[Convert]::ToInt32('11001000', 2)` | `echo $((2#11001000))` |
| Decimal → hex | `'{0:X}' -f 200` | `printf '%x\n' 200` |
| Hex → decimal | `0xC8` | `echo $((16#C8))` |
| Character → code | `[int][char]'A'` | `printf '%d\n' "'A"` |
| Code → character | `[char]65` | `printf "\x41\n"` |
| Base64 encode | `[Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes('hello'))` | `echo -n hello \| base64` |
| Base64 decode | `[Text.Encoding]::UTF8.GetString([Convert]::FromBase64String('aGVsbG8='))` | `echo aGVsbG8= \| base64 -d` |
| See the raw bytes | `Format-Hex .\file.txt` | `xxd file.txt` or `hexdump -C file.txt` |

---

## 🔐 Security notes

| | Reversible? | Needs a key? | Purpose |
|---|---|---|---|
| **Encoding** (Base64, hex, URL) | Yes, by anyone | No | Format data for transport |
| **Encryption** (AES, RSA) | Yes, with the key | Yes | Keep data secret |
| **Hashing** (SHA-256) | No — one-way | No | Verify integrity, store passwords |

- **Base64 is not protection.** A "hidden" password in Base64 is a plaintext password.
- **Attackers hide in encodings.** Malicious PowerShell often arrives Base64-encoded (`-enc`), so analysts decode it constantly.
- **Hex is where investigation happens.** Magic numbers, packet bytes and file headers are all read as hex.

---

## Practice drills

<details>
<summary>1. Convert 172 to binary and hex by hand.</summary>

128 + 32 + 8 + 4 = `1010 1100` = `0xAC`.
</details>

<details>
<summary>2. A user's 50 MB file takes ages on "100 Mbps" Wi-Fi. What's the best-case time?</summary>

100 Mbps ≈ 12.5 MB/s, so about 4 seconds at best. Real Wi-Fi is usually far slower.
</details>

<details>
<summary>3. Decode <code>SGVscERlc2s=</code>.</summary>

`echo SGVscERlc2s= | base64 -d` gives `HelpDesk`.
</details>

<details>
<summary>4. What's 1 XOR 1, and what does a half adder do with it?</summary>

`0` — that's the sum bit. The carry is 1 AND 1 = `1`, so 1 + 1 = binary `10`.
</details>

<details>
<summary>5. Why can't a "1 TB" drive show 1 TB in Windows?</summary>

It's sold in decimal (10¹² bytes) but Windows counts in binary (2⁴⁰), giving about 931 GiB, labelled "GB".
</details>

---

## Key takeaways

- Binary place values double: 1, 2, 4 … 128. Hex is binary in 4-bit chunks.
- Byte = 8 bits. Drives are sold in decimal units and measured in binary ones. Networks count bits; files count bytes.
- ASCII → Unicode → UTF-8; garbled text is an encoding mismatch.
- Gates → adders → ALU → CPU running fetch–decode–execute.
- Encoding isn't encryption, and encryption isn't hashing.
