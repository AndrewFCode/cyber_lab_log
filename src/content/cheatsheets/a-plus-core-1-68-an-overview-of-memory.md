---
title: "A+ Core 1 3.3: An Overview of Memory"
description: "Professor Messer A+ 220-1201 objective 3.3 — RAM vs storage, DIMM and SO-DIMM, 64-bit data width, SDRAM, double data rate, and DDR3/DDR4/DDR5 compatibility and keying."
tags: ["a-plus", "comptia", "messer", "hardware", "memory", "ram", "dimm", "ddr"]
draft: false
updated: "2026-09-24"
kind: "resource"
resource: "a-plus-core-1"
module: "An Overview of Memory"
moduleOrder: 68
unit: 3
---

> **In one line:** RAM is temporary, high-speed, random-access working memory (not storage), assembled as DIMMs or the smaller laptop SO-DIMMs, synchronised to a clock as SDRAM, moving data on both edges of that clock as DDR — with each DDR generation (3/4/5) incompatible with the last and physically keyed to prove it.

*Companion to: Professor Messer, CompTIA A+ 220-1201 Core 1, objective 3.3 (An Overview of Memory).* The full version is the An Overview of Memory class notes; the section overview is the Section 3 sheet.

---

## RAM vs storage

| | RAM | Storage (HDD/SSD) |
|---|---|---|
| Role | Temporary, high-speed working memory | Long-term, persistent |
| Data must be... | **Loaded into RAM** before the CPU can use it | Read/written to load into or from RAM |
| On power loss | **Lost immediately** (volatile) | Survives |

**Check compatibility before any upgrade** — not every module fits every motherboard (generation, speed, capacity all matter).

## DIMM

| Point | Detail |
|---|---|
| Full name | **Dual Inline Memory Module** |
| Why "dual" | Contacts on **each side carry independent signals** (unlike SIMM, where both sides were tied together) |
| Data width | **64 bits** per read/write (72 bits with ECC — 8 extra for error correction) |
| Install/remove | Push straight in · release the **side locks** to pull out |

## SO-DIMM

- **Small Outline Dual Inline Memory Module** — laptops and mobile devices.
- Roughly **half the size** of a full DIMM.
- Installed **horizontally**: slide in at an angle, press flat, side locks engage.

## Why "random access"

Any address reachable **instantly, in any order** — no winding through data like magnetic tape. RAM chips are **DRAM**; the type used today is **SDRAM**.

## SDRAM and DDR

| Term | Meaning |
|---|---|
| **SDRAM** | **Synchronous** DRAM — synchronised to a common system clock, keeping transfers at a standard rate |
| **Single data rate** | One data transfer per **full** clock cycle |
| **DDR (Double Data Rate)** | One transfer on the **rise**, another on the **fall** of the clock — doubles throughput at the same clock speed |

## DDR3 / DDR4 / DDR5

| Generation | Change | Backwards-compatible? | DIMM pins | SO-DIMM pins |
|---|---|---|---|---|
| DDR3 (from DDR2) | More capacity per module | **No** | 240 | 204 |
| DDR4 (from DDR3) | Faster | **No** | 288 | 260 |
| DDR5 (from DDR4) | Faster still | **No** | 288 | 262 |

**No DDR generation is backwards-compatible with the last one.** DDR4 and DDR5 even share the same 288-pin DIMM count — what actually stops mixing them is **physical keying**: a notch position (and voltage) that must match the slot. Wrong generation = module won't seat, full stop.

## 🔐 Security notes

- **RAM holds data in the clear while in use** — keys, decrypted documents, credentials — even on an encrypted disk. Basis of RAM-scraping malware and **cold boot attacks**.
- **RAM decays, but not instantly**, especially when cold — that delay is exactly what a cold boot attack exploits.
- **Pulling a DIMM from a decommissioned machine is a low-effort data-recovery attempt**, though volatility limits how practical it usually is versus attacking storage directly.
- **A forced or wrongly-keyed module causes instability**, not just a fit problem — random crashes from bad memory can look like compromise. Rule out hardware before assuming malware.

## Practice drills

<details>
<summary>1. How does RAM differ from storage?</summary>

RAM is **temporary, volatile working memory** — lost on power-off. Storage **persists**. Data must be loaded into RAM before the CPU can use it.
</details>

<details>
<summary>2. Why "dual inline" for DIMM?</summary>

Contacts on **each side of the module carry independent signals** — unlike the older SIMM, where the two sides were electrically tied together.
</details>

<details>
<summary>3. What's a DIMM's data width?</summary>

**64 bits** (72 with ECC).
</details>

<details>
<summary>4. Why "random access"?</summary>

**Any address can be reached instantly, in any order** — no sequential winding, unlike tape.
</details>

<details>
<summary>5. What does DDR actually double, and how?</summary>

Throughput, by transferring data on **both the rise and fall of the clock cycle** instead of once per full cycle.
</details>

<details>
<summary>6. Is DDR4 backwards-compatible with DDR3?</summary>

**No.** No DDR generation is compatible with the one before it.
</details>

<details>
<summary>7. DDR4 and DDR5 DIMMs both have 288 pins. What actually stops them being confused?</summary>

**Physical keying** — the notch position (and voltage) differs, even though the pin count matches.
</details>

<details>
<summary>8. A new DDR4 module won't seat in a slot. What's the likely cause?</summary>

**Wrong memory generation for that motherboard** — the keying notch doesn't align. Check the board's documented spec; never force it.
</details>

## Key takeaways

- RAM = temporary, volatile, random-access working memory; never confuse it with storage.
- DIMM: dual independent contact sides, 64-bit data width. SO-DIMM: half-size, horizontal, laptops.
- SDRAM = clock-synchronised; DDR = transfers on both clock edges, doubling throughput.
- DDR3/4/5 are each faster than the last and none is backwards-compatible.
- DDR4 and DDR5 share a pin count — keying (notch + voltage), not pins, is what prevents mixing them.
