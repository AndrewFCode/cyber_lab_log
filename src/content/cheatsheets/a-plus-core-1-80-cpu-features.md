---
title: "A+ Core 1 3.5: CPU Features"
description: "A+ Core 1 3.5 — 32-bit vs 64-bit (x86/x64), ARM architecture, and multi-core CPUs."
tags: ["a-plus", "comptia", "messer", "hardware", "cpu", "32-bit", "64-bit", "arm", "cores"]
draft: false
updated: "2026-09-27"
kind: "resource"
resource: "a-plus-core-1"
module: "CPU Features"
moduleOrder: 80
unit: 3
---

> **In one line:** 64-bit CPUs (x64) address far more memory than 32-bit (x86) and run 32-bit apps too; ARM is the efficient licensed architecture behind phones and more PCs; and one CPU holds many parallel cores.

*Companion to: Professor Messer A+ Core 1 (220-1201), Section 3, objective 3.5.* The full version is the CPU Features class notes; the section overview is the Section 3 sheet.

## 32-bit vs 64-bit

| | 32-bit (x86) | 64-bit (x64) |
| --- | --- | --- |
| Address space | 2^32 | 2^64 |
| Memory reach | ~4 GB (Windows: ~3.25 GB usable) | ~17 billion GB (16 EB) |
| Also called | x86 (from the 8086) | x86-64 / AMD64 |
| Drivers | 32-bit drivers | 64-bit drivers |
| Apps | **Can't** run 64-bit apps | **Can** run 32-bit apps |
| Windows folder | Program Files (x86) | Program Files |

- **One-way rule:** 64-bit runs 32-bit, but 32-bit can't run 64-bit.
- **Check it:** `$env:PROCESSOR_ARCHITECTURE` (PS) · `uname -m` (Bash) · `echo %PROCESSOR_ARCHITECTURE%` (CMD) → AMD64 / x86 / ARM64.

## ARM

| Aspect | Detail |
| --- | --- |
| Name | **Advanced RISC Machine** (RISC = Reduced Instruction Set Computing) |
| Model | **ARM Limited** designs the spec and **licenses** it to third parties |
| Strengths | Less power, less heat, fast |
| Where | ~**99% of phones**; growing in laptops/desktops (Apple Silicon, Windows on ARM) |

## CPU cores

- One **CPU package** holds multiple **cores**; each core has its own logic + **cache**.
- Multiple cores = **instructions run in parallel** → more throughput. Rated by count (8-core, 16-core).
- Beyond scope: L1/L2 per core, **L3 shared**; **threads** (SMT/Hyper-Threading) show one core as two logical CPUs.

## 🔐 Security notes

- **64-bit is better defended, not just bigger:** 64-bit Windows enforces **driver signing**, **kernel patch protection (PatchGuard)**, and stronger **DEP/ASLR**. A 32-bit OS is usually older and missing these — a larger attack surface.
- **Architecture decides what runs** — malware built for x86/x64/ARM only runs there; emulation layers (Windows on ARM, Rosetta) are an extra layer to account for.
- **Shared core caches enable side channels** (Spectre/Meltdown family) — keep CPU microcode/firmware and the OS patched.

## Practice drills

<details>
<summary>1. How much memory can 32-bit vs 64-bit address?</summary>

32-bit ≈ 4 GB (2^32); 64-bit ≈ 17 billion GB (2^64 = 16 EB).
</details>

<details>
<summary>2. What do x86 and x64 mean?</summary>

x86 = 32-bit (from the 8086); x64 = 64-bit (also x86-64 / AMD64).
</details>

<details>
<summary>3. State the app compatibility rule.</summary>

A 64-bit OS can run 32-bit apps; a 32-bit OS cannot run 64-bit apps.
</details>

<details>
<summary>4. Where do 32-bit vs 64-bit apps install in Windows?</summary>

32-bit → Program Files (x86); 64-bit → Program Files.
</details>

<details>
<summary>5. What does ARM stand for, and what does ARM Limited do?</summary>

Advanced RISC Machine; ARM Limited designs the spec and licenses it to third parties.
</details>

<details>
<summary>6. Why are ARM chips popular in phones?</summary>

They're efficient — less power and heat, fast — so ~99% of phones use them.
</details>

<details>
<summary>7. What does each CPU core contain, and why do more cores help?</summary>

Its own processing logic and cache; multiple cores execute instructions simultaneously.
</details>

## Key takeaways

- **64-bit (x64)** addresses ~17 billion GB vs **32-bit (x86)** ~4 GB; drivers must match the OS.
- **64-bit runs 32-bit apps; 32-bit can't run 64-bit.** Program Files vs Program Files (x86).
- **ARM = Advanced RISC Machine** (licensed by ARM Limited) — efficient, ~99% of phones, growing in PCs.
- **Cores** = independent processors in one package with their own cache → parallel execution.
- **Security:** 64-bit adds enforced driver signing, PatchGuard and stronger DEP/ASLR — moving off 32-bit is a security win.
