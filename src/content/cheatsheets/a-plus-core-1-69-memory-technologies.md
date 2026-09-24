---
title: "A+ Core 1 3.3: Memory Technologies"
description: "Professor Messer A+ 220-1201 objective 3.3 — parity memory and even-parity calculation, ECC memory, memory bandwidth in MT/s, and multi-channel RAM."
tags: ["a-plus", "comptia", "messer", "hardware", "memory", "ecc", "parity", "multichannel"]
draft: false
updated: "2026-09-24"
kind: "resource"
resource: "a-plus-core-1"
module: "Memory Technologies"
moduleOrder: 69
unit: 3
---

> **In one line:** parity memory detects an error and halts, ECC memory detects and corrects one and keeps running, memory bandwidth (MT/s) is how fast data moves between RAM and CPU, and multi-channel memory beats that bottleneck by running matched modules across parallel channels.

*Companion to: Professor Messer, CompTIA A+ 220-1201 Core 1, objective 3.3 (Memory Technologies).* The full version is the Memory Technologies class notes; the section overview is the Section 3 sheet.

---

## Parity vs ECC vs standard

| | Standard | Parity | ECC |
|---|---|---|---|
| Looks like | Same | Same | Same — **check the spec, not the appearance** |
| Detects errors? | No | Yes (not always every error) | Yes |
| Corrects errors? | No | **No** | **Yes** |
| On error | — | **System halts**, needs reboot | **Keeps running normally** |
| Extra bits | None | 1 per byte | ~8 per 64 bits (Hamming-code based) |

## Even parity: the rule

1. **Count the 1-bits** in the byte.
2. **Even count** → parity bit = **0**.
3. **Odd count** → parity bit = **1**.

(Total of data bits + parity bit is always even.)

| Byte | 1-bits | Parity |
|---|---|---|
| `1110 0111` | 6 (even) | **0** |
| `0000 0010` | 1 (odd) | **1** |
| `1001 1000` | 3 (odd) | **1** |

**Checking on read:** recalculate parity from the data just read, compare to the stored parity bit. **Match = OK. Mismatch = error detected** (but not correctable).

## Memory bandwidth

| Term | Meaning |
|---|---|
| **Memory bandwidth** | How much data moves between RAM and CPU per second |
| **MT/s** | Mega Transfers per second — millions of transfers/sec (already reflects DDR's double-edge transfer) |
| Example | 32 GB DDR5 module rated at 5,600 MT/s |

**The bottleneck:** a single channel has a throughput ceiling. Once maxed out, the CPU sits **idle** waiting on memory it can't get fast enough.

## Multi-channel memory

| Config | Modules | Throughput effect |
|---|---|---|
| Dual-channel | 2 | ~**double** |
| Triple-channel | 3 | ~**triple** |
| Quad-channel | 4 | ~**quadruple** |

- **Match your modules** — same type, ideally same make/model.
- **Slot colour-coding** shows the pairing: e.g. one module in **black**, one in **red** = dual-channel. Two in the same colour ≠ dual-channel.
- **This is why two 16 GB modules beat one 32 GB module** — same capacity, more throughput.
- **Verify after install** — check BIOS/UEFI or system info that multi-channel mode is actually active; correct-looking slots aren't proof.

## 🔐 Security notes

- **Undetected bit flips on standard memory are silent** — no signal at all when data corrupts, which is why sensitive workloads (crypto, financial, databases) commonly specify ECC.
- **Parity's halt-on-error is a deliberate trade-off**, not a flaw: certainty over silent corruption, at the cost of availability — the opposite of what ECC chooses.
- **Rowhammer**-class attacks deliberately induce bit flips via repeated memory access. ECC raises the bar (corrects single-bit, detects some multi-bit) but doesn't eliminate the risk.
- **"Matched modules" is a supply-chain question too** — source memory for sensitive systems from trusted suppliers, same as any other hardware component.
- **On non-ECC systems, rule out a memory fault before assuming compromise** when crashes or corruption appear unexplained.

## Practice drills

<details>
<summary>1. What can parity memory do that standard memory can't, and what's its limit?</summary>

It can **detect** that an error occurred (not always every error) — but it **cannot correct** it, and typically **halts** the system.
</details>

<details>
<summary>2. Calculate the even parity bit for `1111 1110`.</summary>

Seven 1-bits — **odd** — parity bit = **1**.
</details>

<details>
<summary>3. How do you check parity on a read?</summary>

**Recalculate** the parity bit from the data just read and **compare** it to the stored parity bit — mismatch means an error.
</details>

<details>
<summary>4. What does ECC add that parity doesn't?</summary>

**Correction**, not just detection — the system **keeps running normally** instead of halting.
</details>

<details>
<summary>5. What does MT/s measure?</summary>

**Mega Transfers per second** — memory bandwidth, millions of data transfers each second.
</details>

<details>
<summary>6. Why does a fast CPU sometimes sit idle even with fast memory?</summary>

A **single channel's throughput ceiling** can be lower than what the CPU could otherwise use, leaving it waiting.
</details>

<details>
<summary>7. Two black-slot modules on a dual-channel (black/red) board — is that dual-channel?</summary>

**No.** Dual-channel needs one module **per colour** (one black, one red) — two of the same colour stays single-channel.
</details>

<details>
<summary>8. Why ship two 16 GB modules instead of one 32 GB module?</summary>

**Same total capacity, but two modules across two channels give more throughput** than one module on a single channel.
</details>

## Key takeaways

- Standard, parity and ECC memory look identical — only the spec tells them apart.
- Even parity: even 1-count → bit 0; odd 1-count → bit 1. Detects, never corrects.
- ECC detects AND corrects — the system keeps running instead of halting.
- MT/s = memory bandwidth; a single channel eventually bottlenecks a fast CPU.
- Multi-channel (dual/triple/quad) needs matched modules in the correctly paired, often colour-coded slots.
