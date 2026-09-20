---
title: "Code: An Assemblage of Memory"
description: "Code ch. 19 — building RAM from latches: addresses, decoders to write, selectors to read, address lines vs capacity, and why RAM is volatile."
tags: ["code", "petzold", "computing", "memory"]
draft: false
updated: "2026-09-18"
kind: "resource"
resource: "code"
module: "Ch. 19"
moduleOrder: 19
unit: 19
---
> **In one line:** stack latches into rows, give each row a number (its address), and use decoders to write and selectors to read — that's RAM.

*Companion to: Charles Petzold, Code (2nd edition), chapter 19.* The book's companion site, CodeHiddenLanguage.com, animates many of these circuits.

---

## From latch to RAM

| Building block | Job |
|---|---|
| Latch / flip-flop | Stores 1 bit |
| 8 latches side by side | Stores 1 byte |
| Address | The number that picks which byte |
| Decoder (e.g. 3-to-8) | Turns the address into "enable this one row" — used for **writing** |
| Selector / multiplexer (e.g. 8-to-1) | Picks one row's output — used for **reading** |

| RAM signal | Purpose |
|---|---|
| Address in | Which location |
| Data in | Value to store |
| Write | Store now |
| Data out | The value at that address |

**Random access** means any address can be read or written equally fast — unlike a tape, which must be wound through.

---

## Address lines vs capacity

| Address lines | Locations (2ⁿ) | Common name |
|---|---|---|
| 10 | 1,024 | 1 K |
| 16 | 65,536 | 64 K — the whole memory of an 8080 |
| 20 | 1,048,576 | 1 M — the original IBM PC |
| 32 | 4,294,967,296 | 4 G — the 32-bit limit |
| 64 | 18.4 quintillion | Effectively unlimited |

- **Why a 32-bit OS tops out around 4 GB:** it can only name 2³² byte addresses.
- **Volatile:** RAM built from latches (or DRAM capacitors) loses everything when the power goes. **ROM** and flash keep their contents.

---

## Try it

```python
2**16, 2**32                       # (65536, 4294967296)
f'{2**32 / 2**30:.0f} GiB'         # '4 GiB'
```

```powershell
Get-CimInstance Win32_PhysicalMemory | Select-Object BankLabel, Capacity
[Environment]::Is64BitOperatingSystem
```

```bash
free -h
```

---

## 🔐 Security and IT connections

- **RAM holds secrets while the machine runs:** passwords, encryption keys, decrypted files. Credential-theft tools read them straight out of process memory (e.g. LSASS on Windows). Defences include Credential Guard and LSA protection.
- **Memory forensics.** Responders capture RAM before shutdown and analyse it (e.g. with Volatility) to find running malware, network connections and keys that never touched disk.
- **Cold-boot attacks.** DRAM fades gradually — faster when warm — so a chilled module can keep data for a short time after power-off. Full-disk encryption plus pre-boot authentication blunts this.

---

## Practice drills

<details>
<summary>1. How many address lines does 1 MB of byte-addressed memory need?</summary>

20 (2²⁰ = 1,048,576).
</details>

<details>
<summary>2. In a RAM array, which part is used to write and which to read?</summary>

A decoder enables the addressed row for writing; a selector picks the addressed row's output for reading.
</details>

<details>
<summary>3. Why do incident responders avoid powering off a compromised PC first?</summary>

RAM is volatile — its evidence (processes, keys, fileless malware) disappears at power-off.
</details>

---

## Key takeaways

- RAM = latches in rows, addressed by number; decoders write, selectors read.
- n address lines give 2ⁿ locations — 32 bits means 4 GiB.
- RAM is volatile and full of secrets, which makes it prime evidence and a prime target.
