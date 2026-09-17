---
title: "Building a CPU: From Adder to Processor"
description: "The stored-program idea, the ALU, registers and busses, the fetch-decode-execute cycle, and jumps, loops and subroutines."
tags:
  - computing-fundamentals
  - cpu
  - architecture
  - assembly
  - code-book
draft: false
updated: 2026-09-17
category: code-book
pinned: false
---

*Covers Code (2nd ed.) chapters 20–22.*

> **In one line:** put an adder, some registers and a chunk of RAM on a shared bus, then let the RAM contain the instructions themselves — that's a CPU, and everything it does is fetch, decode, execute, repeat.

## The stored-program idea

Early calculating machines were **hard-wired**. To change what they computed, you rewired them. ENIAC was programmed with plugboards and switches.

The breakthrough — associated with **von Neumann**, though the idea circulated more widely — is that **instructions are just numbers**, so they can live in the **same memory** as the data they operate on.

```
RAM:  [ instruction ] [ instruction ] [ data ] [ data ] [ instruction ] ...
                    ↑
              the CPU reads these
```

**Consequences:**

- Changing the program means writing different numbers into RAM — no rewiring.
- A program can *modify itself* (rarely wise, occasionally useful).
- The same hardware runs *any* program. That's why one machine is a word processor, a browser, a game and a compiler.

This is the **von Neumann architecture**: one memory, one bus, instructions and data mixed. (The alternative, Harvard architecture, keeps them in separate memories — used in some microcontrollers.)

## The ALU

The **Arithmetic Logic Unit** is the part that actually computes. At minimum it contains:

| Block | What it does |
|---|---|
| **Adder** | The 8-bit (or 16, 32, 64) ripple or lookahead adder from earlier |
| **Logic unit** | AND, OR, XOR, NOT on whole words at once |
| **Shifter** | Move all bits left or right one position (multiply/divide by 2) |
| **Flags** | Extra bits recording properties of the last result |

**The flags** are how the CPU makes decisions later:

| Flag | Set when |
|---|---|
| **Zero (Z)** | Result was 0 |
| **Carry (C)** | Unsigned overflow — a bit fell off the end |
| **Sign (S / N)** | Result's top bit is 1 (negative, in two's complement) |
| **Overflow (V / O)** | Signed overflow — two positives made a negative, or vice versa |

The ALU doesn't decide anything itself. It produces a result *and* these flags. Other circuitry reads the flags to choose what happens next.

## Registers, bus, RAM

A CPU is a collection of **registers** connected to the ALU and to RAM by a **bus**.

**A bus** is a shared set of wires. Only one device talks at a time; everything else listens. Three buses (or three roles on one):

| Bus | Carries |
|---|---|
| **Data bus** | The actual bits being moved |
| **Address bus** | *Where* in memory to read or write |
| **Control bus** | Read vs write, clock, interrupts, chip-select |

**The essential registers:**

| Register | Role |
|---|---|
| **Accumulator (A / ACC)** | Where results of ALU operations land. The "working" number |
| **Program Counter (PC / IP)** | Address of the *next* instruction to fetch |
| **Instruction Register (IR)** | Holds the instruction currently being decoded |
| **Flags / Status (F)** | The Z/C/S/V bits from the last ALU operation |
| **Stack Pointer (SP)** | Address of the top of the stack in RAM |
| **Index / General purpose (X, Y, R0…)** | Extra places to hold numbers so you aren't always going back to RAM |

**RAM** sits on the same bus. The CPU puts an address on the address bus, asserts read or write, and data appears on (or is taken from) the data bus. From the CPU's point of view, RAM is just a very large, slightly slow register file.

## Fetch–decode–execute

Every instruction, forever, is this loop:

```
1. FETCH    PC → address bus. RAM returns a byte. It goes into IR.  PC ← PC + 1
2. DECODE   Control logic looks at IR and turns on the right gates
3. EXECUTE  The ALU / registers / RAM actually do the thing
            (may take extra memory accesses, so extra cycles)
4. repeat
```

**The program counter is what makes it a sequence.** After each fetch it increments, so the next fetch gets the next instruction. That's all "running a program" is.

A **machine cycle** (or T-state) is one clock tick. A simple instruction might take 4 cycles; one that reads RAM twice might take 7. Clock speed × average cycles per instruction = roughly how much work per second.

### A tiny instruction set (illustrative)

These aren't from a real chip, but every real ISA has equivalents:

| Mnemonic | What it does |
|---|---|
| `LDA addr` | Load accumulator from RAM address |
| `STA addr` | Store accumulator to RAM address |
| `ADD addr` | Add RAM value to accumulator |
| `SUB addr` | Subtract RAM value from accumulator |
| `AND / OR / XOR addr` | Bitwise logic with RAM value |
| `INC / DEC` | Add or subtract 1 from accumulator |
| `JMP addr` | Set PC to addr — unconditional jump |
| `JZ addr` | Jump if Zero flag is set |
| `JC addr` | Jump if Carry flag is set |
| `NOP` | Do nothing (still takes a cycle) |
| `HLT` | Stop the fetch-decode-execute loop |

**Opcodes** are just numbers. `LDA` might be `0001`, `ADD` might be `0010`. The assembler translates mnemonics into those numbers; the CPU never sees the names.

## Jumps, loops, subroutines

Without jumps, a program can only run straight through and stop. Jumps are what make it a computer rather than a calculator.

**Unconditional jump (`JMP`)** — write a new value into the PC. Next fetch comes from somewhere else. That's `goto`.

**Conditional jump (`JZ`, `JC`, `JNZ`…)** — check a flag, jump only if it's set. That's `if`.

**A loop is a conditional jump going backwards:**

```
        LDA  count
loop:   DEC
        JNZ  loop      ; if not zero, go back
        HLT
```

That's `while (count != 0)`. Every `for` and `while` in every language compiles into some version of this.

**A subroutine** (function, procedure) is a jump that **remembers where it came from**:

1. **CALL addr** — push the current PC onto the stack, then `JMP addr`.
2. The subroutine runs.
3. **RET** — pop the saved PC off the stack, put it back. Execution continues at the instruction after the CALL.

The **stack** is just a region of RAM, growing downwards, tracked by the Stack Pointer. Nested calls work because each CALL pushes another return address; each RET pops one. Recursion is this mechanism used on itself.

**Interrupts** are a CALL the hardware triggers — a keystroke, a timer, a disk finishing. The CPU finishes the current instruction, then CALLs an **interrupt handler**. Same stack, same RET (or `IRET`). That's how a computer reacts to the world without constantly polling it.

## Putting it together

```
                    ┌──────────┐
                    │   RAM    │  instructions + data
                    └────┬─────┘
                         │ bus
        ┌────────────────┼────────────────┐
        │                │                │
   ┌────┴────┐     ┌─────┴─────┐    ┌─────┴─────┐
   │   PC    │     │    IR     │    │    ALU    │
   │   A     │     │   Flags   │    │  adder,   │
   │   SP    │     │           │    │  logic,   │
   │   X, Y  │     │  control  │    │  shifter  │
   └─────────┘     └───────────┘    └───────────┘
        registers      decoder           compute
```

That's a CPU. Everything else — caches, pipelines, out-of-order execution, multiple cores — is elaboration on this diagram.

## Key takeaways

- Stored-program: instructions are numbers in the same RAM as data. That's why one machine runs any program.
- ALU = adder + logic + shifter + flags (Z, C, S, V).
- Registers hold the working state; the bus connects them to RAM; only one talker at a time.
- Fetch (PC → RAM → IR, PC++) → Decode → Execute. Forever.
- JMP / JZ / JNZ are `goto` / `if` / `while`. CALL / RET plus a stack are functions.
- Interrupts are hardware-triggered CALLs.
