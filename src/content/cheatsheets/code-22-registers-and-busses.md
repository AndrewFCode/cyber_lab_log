---
title: "Code: Registers and Busses"
description: "Code ch. 22 — registers as fast on-chip storage, the data/address/control busses that move bytes around, three-state buffers, and the fetch-execute cycle."
tags: ["code", "petzold", "computing", "cpu"]
draft: false
updated: "2026-09-18"
kind: "resource"
resource: "code"
module: "Ch. 22"
moduleOrder: 22
unit: 22
---
> **In one line:** registers are the CPU's handful of ultra-fast storage boxes, and busses are the shared wires that shuttle bytes between them, the ALU and memory.

*Companion to: Charles Petzold, Code (2nd edition), chapter 22.*

---

## Registers

Small stores built from flip-flops, right next to the ALU — the fastest memory there is.

| Register | Role |
|---|---|
| Accumulator | Holds the ALU's working value |
| Program counter (PC) | Address of the **next** instruction |
| Instruction register | The instruction currently being decoded |
| Address register | The memory address being accessed |
| General-purpose registers | Scratch space (x86: EAX/RAX, EBX/RBX…) |
| Flags register | The status flags from [chapter 21](/resources/code/21/) |

---

## Busses

A **bus** is a set of shared wires many components connect to.

| Bus | Carries | Width sets |
|---|---|---|
| Data bus | The bytes being moved | How many bits move at once (8, 16, 32, 64) |
| Address bus | Which memory location | How much memory can be addressed (2ⁿ) |
| Control bus | Signals like read, write, clock | — |

**Three-state buffers** are the trick that makes a shared bus work: each output can be 0, 1, or **disconnected** (high-impedance). Only the one device that's enabled drives the bus at any moment; everything else stays disconnected.

---

## The fetch-execute cycle

| Step | What happens |
|---|---|
| Fetch | Copy the instruction at the PC's address into the instruction register |
| Decode | Work out the opcode and operands |
| Execute | Do it — ALU operation, memory access or a jump |
| Update PC | Advance to the next instruction (or jump elsewhere) |

This loop, billions of times a second, is all a CPU does.

---

## Try it

```powershell
Get-CimInstance Win32_Processor |
    Select-Object Name, AddressWidth, DataWidth, NumberOfCores, MaxClockSpeed
```

```bash
lscpu | grep -E 'Architecture|CPU\(s\)|MHz|cache'
```

---

## 🔐 Security and IT connections

- **32-bit vs 64-bit is an address-bus story.** A 32-bit address bus caps memory at 4 GB; 64-bit lifts it enormously. It's why old software and drivers matter when you check whether a system is `AddressWidth` 32 or 64.
- **Registers hold live secrets.** A debugger or exploit that reads register and stack state can lift keys and return addresses. Stack canaries and ASLR make that harder.
- **The PC (program counter) is the ultimate target.** Control-flow-hijacking attacks (buffer overflows, ROP) all aim to load an attacker-chosen address into it.

---

## Practice drills

<details>
<summary>1. What does the program counter hold?</summary>

The memory address of the next instruction to fetch.
</details>

<details>
<summary>2. Why can several devices share one data bus without clashing?</summary>

Three-state buffers let all but the active device disconnect (high-impedance), so only one drives the wires at a time.
</details>

<details>
<summary>3. Which bus's width decides how much RAM a CPU can address?</summary>

The address bus — n lines address 2ⁿ locations.
</details>

---

## Key takeaways

- Registers are the fastest storage, holding the accumulator, program counter, instruction and flags.
- Data, address and control busses move everything; three-state buffers share the wires safely.
- Fetch, decode, execute, repeat — the whole job of a CPU.
