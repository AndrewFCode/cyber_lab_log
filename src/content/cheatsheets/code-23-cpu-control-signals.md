---
title: "Code: CPU Control Signals"
description: "Code ch. 23 — the control unit: turning opcodes into the timed signals that steer registers, ALU and memory, instruction sets and microcode."
tags: ["code", "petzold", "computing", "cpu", "machine-code"]
draft: false
updated: "2026-09-18"
kind: "resource"
resource: "code"
module: "Ch. 23"
moduleOrder: 23
unit: 23
---
> **In one line:** the control unit is the conductor — it reads each opcode and fires the right signals, in the right order, to make registers, the ALU and memory carry out the instruction.

*Companion to: Charles Petzold, Code (2nd edition), chapter 23.*

---

## The control unit

Every instruction becomes a timed sequence of enable and select signals:

- **Enable** a register onto the bus (the source).
- **Load** the bus into another register (the destination).
- **Select** the ALU operation.
- **Read** or **write** memory.
- **Advance or reload** the program counter.

The **instruction decoder** turns an opcode into which signals fire; a small step counter keeps them in order across the fetch-execute cycle.

---

## Instruction sets

| Idea | Meaning |
|---|---|
| Instruction set (ISA) | The full list of opcodes a CPU understands |
| Mnemonic | The human name for an opcode — `MOV`, `ADD`, `JMP` |
| Machine code | The actual bytes the CPU reads |

| Family | Style |
|---|---|
| CISC (x86 / x64) | Many complex instructions, variable length |
| RISC (ARM, RISC-V) | Fewer, simpler, fixed-length instructions — phones, Apple Silicon |

**Microcode:** on complex CPUs, one machine instruction is carried out by a tiny built-in program of even simpler steps. Microcode can be **patched** by a firmware/OS update — which is how Intel and AMD shipped fixes for the Spectre and Meltdown flaws.

---

## Instruction categories

| Category | Examples |
|---|---|
| Data movement | `MOV`, `LOAD`, `STORE`, `PUSH`, `POP` |
| Arithmetic / logic | `ADD`, `SUB`, `AND`, `OR`, `XOR`, `CMP` |
| Control flow | `JMP`, `JZ` (jump if zero), `CALL`, `RET` |
| Other | `NOP`, `HALT`, `IN`, `OUT` |

Conditional jumps read the [status flags](/resources/code/21/) — this is how a CPU makes decisions and loops.

---

## Try it — see real machine code

```bash
objdump -d /bin/ls | head -n 25     # disassemble a binary into mnemonics + bytes
```

```powershell
# The bytes of a tiny instruction sequence, as hex
[byte[]](0x90, 0xB8, 0x01, 0x00, 0x00, 0x00) | ForEach-Object { '{0:X2}' -f $_ }
# 90 = NOP, B8 = MOV EAX, 00000001
```

---

## 🔐 Security and IT connections

- **Shellcode is hand-crafted machine code.** Exploits inject raw opcodes for the CPU to run. A **NOP sled** (`90 90 90…`) pads the landing zone so a slightly-off jump still slides into the payload — a signature IDS look for.
- **Malware analysis is reading disassembly.** Tools like Ghidra and IDA turn bytes back into mnemonics.
- **Microcode updates are security patches.** Meltdown and Spectre were fixed partly in microcode delivered through firmware and OS updates — a reason to keep both current.

---

## Practice drills

<details>
<summary>1. What does the instruction decoder produce from an opcode?</summary>

The specific control signals (enables, loads, ALU select, memory read/write) that carry the instruction out.
</details>

<details>
<summary>2. How does a CPU decide whether to take a conditional jump?</summary>

It tests the status flags — e.g. `JZ` jumps only if the Zero flag is set.
</details>

<details>
<summary>3. What's a NOP sled and why do attackers use it?</summary>

A run of NOP instructions before a payload, so an imprecise jump still slides into the real code.
</details>

---

## Key takeaways

- The control unit decodes each opcode into ordered enable/load/select signals.
- The instruction set is the CPU's vocabulary; CISC and RISC are two design styles; microcode can be patched.
- Machine code is what exploits inject and what analysts reverse — and microcode updates are security fixes.
