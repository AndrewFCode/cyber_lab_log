---
title: "A+ Core 1 3.5: CPU Features — Class Notes"
description: "Full class notes for A+ Core 1 3.5: 32-bit vs 64-bit (x86/x64), ARM architecture, and multi-core CPUs."
tags: ["class-notes", "a-plus", "comptia", "messer", "hardware", "cpu", "32-bit", "64-bit", "arm", "cores"]
draft: false
pubDate: 2026-09-27
---

**Class notes · Professor Messer A+ Core 1 (220-1201) · Section 3, lesson 5**

> **Quick reference:** the short version of this lesson lives in the
> [A+ Core 1 Section 3 resource sheets](/cyber_lab_log/resources/a-plus-core-1/3/). This is an
> eighth lesson under objective **3.5**. Where the compatibility lesson matched a
> CPU to a socket, this one is about the CPU's own features: how wide it is, what
> architecture it uses, and how many cores it has.

## Learning objectives

By the end of these notes you should be able to:

1. Explain the difference between 32-bit and 64-bit processors, including their
   address space and the x86/x64 labels.
2. Describe how bit-width affects drivers and applications, and where Windows
   installs each.
3. Describe the ARM architecture and its advantages.
4. Explain what CPU cores are and how they improve performance.

## 1. 32-bit and 64-bit

Open your system information and you will see lines like "64-bit operating
system" and, perhaps, "ARM-based processor". The **32-bit / 64-bit** figure
describes the CPU's capability: **how much information it can process at once**,
and the total **address space** a single CPU can reference.

The address space is the key idea. A **32-bit** processor addresses up to
**2^32** locations; a **64-bit** processor addresses up to **2^64**. In more
usable terms:

- **32-bit** can reference about **4 GB** of memory.
- **64-bit** can reference about **17 billion GB** of memory (2^64 bytes is 16
  exabytes, i.e. roughly 17,000,000,000 GB).

No real machine has anything like 17 billion GB fitted, and yours could not hold
it — but a 64-bit processor lets operating systems **scale up to very large
amounts** of memory, which a 32-bit address space simply cannot reach.

```
Address reach (memory a single CPU can reference):

  32-bit  |####|                              about 4 GB
  64-bit  |###########################...###|  about 17 billion GB
                                              (2^64 bytes = 16 EB)
```

> **Note (beyond this lesson):** in practice a 32-bit version of Windows makes
> only about 3.25 GB usable, because part of that 4 GB address space is reserved
> for hardware. The 4 GB figure is the theoretical ceiling.

### 1.1 The x86 and x64 labels

In the Intel world you will see **32-bit** processors called **x86** — a nod back
to the old **8086** CPU — and **64-bit** processors called **x64**.

> **Note (beyond this lesson):** x64 is also written **x86-64** or **AMD64**; AMD
> designed the 64-bit extension of the x86 instruction set, and Intel adopted it
> (branded Intel 64). All are the same 64-bit x86 architecture.

### 1.2 Drivers and applications

Bit-width has to match in two places:

- **Drivers.** A 64-bit OS needs **64-bit hardware drivers**; a 32-bit OS needs
  **32-bit drivers**. They are not interchangeable.
- **Applications.** A **32-bit OS cannot run 64-bit applications**. The reverse
  usually works: a **64-bit OS can generally run 32-bit applications**.

Windows shows this split in its folders. **64-bit** applications install to
**Program Files**, while **32-bit** applications install to **Program Files
(x86)** — the "(x86)" folder is where the 32-bit software lives.

> **Exam tip:** remember the one-way rule — 64-bit can run 32-bit, but 32-bit
> cannot run 64-bit. Pair it with the folders: plain **Program Files** = 64-bit,
> **Program Files (x86)** = 32-bit.

### 1.3 Worked example — reading your own system

You can check bit-width and architecture from a shell. The command differs by
platform, which is itself a good illustration of the "architecture" idea:

```powershell
$env:PROCESSOR_ARCHITECTURE     # Windows: AMD64, x86 or ARM64
```

```bash
uname -m                        # Linux/macOS: x86_64, aarch64 or armv7l
```

```text
echo %PROCESSOR_ARCHITECTURE%   :: Windows CMD: AMD64, x86 or ARM64
```

If Windows reports `AMD64`, you have a 64-bit x86 OS; `ARM64` means a 64-bit ARM
OS; `x86` means 32-bit. Knowing this tells you which drivers to fetch and whether
a given application will install.

## 2. ARM

A second architecture has become hugely popular: **ARM**, created by **ARM
Limited**. ARM stands for **Advanced RISC Machine**. ARM Limited writes the chip
**specification** and **licenses** it to third parties, who build the actual
processors.

> **Correction:** the transcript expands ARM as "Advanced *Risk* Machine". It is
> **Advanced RISC Machine** — RISC being **Reduced Instruction Set Computing**
> (and the name was originally "Acorn RISC Machine"). It is "RISC", not "risk".

ARM processors are prized for **efficiency**: they use **less power**, generate
**less heat**, and are **fast** at processing. That efficiency is why roughly
**99% of mobile phones** use ARM processors — and why ARM is increasingly turning
up in **desktops and laptops** too.

> **Note (beyond this lesson):** ARM's efficiency comes partly from being a
> **RISC** design (a smaller, simpler instruction set) versus the **CISC** style
> of traditional x86. Modern ARM PCs include **Apple Silicon** (the M-series) and
> **Windows on ARM** devices (e.g. Snapdragon X), which run many x86/x64 apps
> through an emulation layer.

## 3. CPU cores

We talk about a CPU as a single device, but inside that one **CPU package** are
several individual processors called **cores**. A processor is often described by
its core count — an **8-core** or **16-core** processor, for instance.

Each core contains its own processing logic (effectively its own CPU) and its own
**cache memory** dedicated to that core. Because each core can work independently,
**multiple cores execute multiple instructions simultaneously**, raising the
overall efficiency of the machine. Look at a magnified CPU die and you can almost
pick out the individual cores and the cache belonging to each — a rendering of a
16-core chip shows sixteen such blocks.

```
One CPU package, multiple cores:

+-------------------------------------------+
|  Core 0     Core 1     Core 2     Core 3   |
|  [CPU|L1]   [CPU|L1]   [CPU|L1]   [CPU|L1]  |
|                                           |
|  each core has its own logic and cache;   |
|  all cores run instructions at once       |
+-------------------------------------------+
```

> **Note (beyond this lesson):** two extensions of this idea. First, a **cache
> hierarchy** — the per-core cache is usually **L1/L2**, with a larger **L3**
> cache often **shared** across cores. Second, **threads**: with SMT
> (Intel calls it Hyper-Threading) one core presents as **two logical
> processors**, so an 8-core chip may show 16 threads. Cores are physical;
> threads are how the OS schedules work onto them.

## 4. Security perspective

CPU features are mostly a performance and compatibility topic, but three points
matter to a defender:

- **64-bit is not just bigger, it is better defended.** Moving off 32-bit is a
  security win as much as a capacity one. 64-bit Windows **enforces driver
  signing**, runs **kernel patch protection (PatchGuard)**, and makes
  memory-safety mitigations (**DEP/NX**, **ASLR**) far more effective than on
  32-bit. A machine still on a 32-bit OS is usually older, closer to
  end-of-support, and missing these — a larger and less-defended attack surface.
- **Architecture decides what code runs — including malware.** A binary built for
  x86, x64 or ARM only runs on that architecture, which is why analysts care
  which one a sample targets, and why moving to ARM breaks straight x86 malware.
  The flip side is the **emulation layers** (Windows on ARM's x86/x64 emulation,
  Apple's Rosetta) that let old binaries run on new chips — convenient, but an
  extra layer to account for when reasoning about what can execute.
- **Shared core resources enable side channels.** Because cores share caches and
  microarchitectural state, timing-based side-channel attacks (the Spectre and
  Meltdown family) can leak data across boundaries. It is an advanced topic, but
  the takeaway is practical: keep CPU **microcode/firmware** and the OS patched,
  since that is how these are mitigated.

## Summary

- **32-bit vs 64-bit** describes how much a CPU processes at once and its
  **address space**: 32-bit reaches ~**4 GB** (2^32), 64-bit reaches ~**17
  billion GB** (2^64).
- Intel labels them **x86** (32-bit, from the 8086) and **x64** (64-bit).
- **Drivers must match** the OS bit-width. A **32-bit OS can't run 64-bit apps**;
  a **64-bit OS usually runs 32-bit apps**. Windows: **Program Files** (64-bit)
  vs **Program Files (x86)** (32-bit).
- **ARM** (Advanced RISC Machine, licensed by ARM Limited) is **efficient** —
  less power and heat, fast — so ~**99% of phones** use it, and more PCs now do.
- A single **CPU package** holds multiple **cores**, each with its own logic and
  cache, running **instructions in parallel**; processors are rated by core count
  (8-core, 16-core).

## Glossary

| Term | Meaning |
| --- | --- |
| 32-bit | A CPU/OS addressing up to 2^32 (~4 GB of memory). |
| 64-bit | A CPU/OS addressing up to 2^64 (~17 billion GB). |
| Address space | The total memory a CPU can reference. |
| x86 | Common label for 32-bit Intel CPUs (from the 8086). |
| x64 | Common label for 64-bit CPUs (also x86-64 / AMD64). |
| Driver | Software matching hardware to an OS; must match bit-width. |
| Program Files | Where 64-bit Windows applications install. |
| Program Files (x86) | Where 32-bit Windows applications install. |
| ARM | Advanced RISC Machine; efficient licensed architecture. |
| ARM Limited | The company that designs and licenses ARM. |
| RISC | Reduced Instruction Set Computing (the C in ARM). |
| CPU package | The physical processor chip holding the cores. |
| Core | An independent processor within a CPU package. |
| Cache | Fast per-core memory close to the processing logic. |
| Thread | A logical processor the OS schedules onto a core (beyond this lesson). |

## Review questions

1. What two things does the "32-bit/64-bit" figure describe about a CPU?
2. How much memory can a 32-bit processor address, and why?
3. Roughly how much can a 64-bit processor address?
4. What do the labels x86 and x64 refer to?
5. If you run a 64-bit OS, what must be true of your hardware drivers?
6. State the one-way rule about 32-bit and 64-bit applications.
7. In Windows, where do 32-bit versus 64-bit applications install?
8. What does ARM stand for, and what is ARM Limited's role?
9. Give three advantages of ARM processors and one place they dominate.
10. What is a CPU core, and what does each core contain?
11. Why do more cores improve performance?
12. Scenario: an old line-of-business app is 64-bit only, but a PC runs a 32-bit
    OS. Will it run? What's the fix?
13. Scenario: you're told to move a fleet off a 32-bit OS "for security, not just
    RAM." Name two protections 64-bit Windows adds.

## Answer key

1. **How much information it processes at once, and the total address space it can
   reference.** Capability and reach.
2. **About 4 GB, because it addresses up to 2^32 locations.** The address width
   sets the ceiling.
3. **About 17 billion GB (2^64 bytes = 16 exabytes).** Vastly larger, so OSes can
   scale.
4. **x86 = 32-bit (from the 8086); x64 = 64-bit.** Intel-world shorthand.
5. **They must be 64-bit drivers — 32-bit drivers won't work.** Bit-width must
   match the OS.
6. **A 32-bit OS can't run 64-bit apps; a 64-bit OS usually can run 32-bit apps.**
   One-way compatibility.
7. **64-bit apps in Program Files; 32-bit apps in Program Files (x86).** The
   "(x86)" folder holds 32-bit software.
8. **Advanced RISC Machine; ARM Limited designs the specification and licenses it
   to third parties.** It doesn't (mainly) make the chips itself.
9. **Less power, less heat, fast processing — dominant in mobile phones (~99%).**
   Efficiency is the theme.
10. **An independent processor inside the CPU package, each with its own
    processing logic and dedicated cache.** A CPU within the CPU.
11. **Multiple cores execute multiple instructions simultaneously.** Parallel work
    raises throughput.
12. **No — a 32-bit OS can't run a 64-bit app; move the PC to a 64-bit OS (with
    64-bit drivers).** The OS bit-width is the blocker.
13. **Enforced driver signing, kernel patch protection (PatchGuard), and stronger
    DEP/ASLR — any two.** 64-bit adds real mitigations.
