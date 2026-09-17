---
title: "Peripherals, the Operating System & Coding"
description: "How a CPU talks to the outside world, what an OS actually does, and the ladder from machine code to high-level languages."
tags:
  - computing-fundamentals
  - operating-systems
  - io
  - programming
  - code-book
draft: false
updated: 2026-09-17
category: code-book
pinned: false
---

*Covers Code (2nd ed.) chapters 23–25.*

> **In one line:** a CPU that can't talk to a keyboard or a screen is a brick; the OS is the program that multiplexes that hardware so every other program can pretend it owns the machine; and high-level languages exist so humans don't have to write the opcodes by hand.

## Peripherals and I/O

Everything outside the CPU + RAM is a **peripheral**: keyboard, screen, disk, network card, speaker, mouse. The CPU talks to them through **I/O**.

### Two addressing styles

| Style | How it works | Example |
|---|---|---|
| **Memory-mapped I/O** | Device registers appear as RAM addresses. `STA $D012` might set a pixel | 6502, ARM, most modern chips |
| **Port-mapped I/O** | Separate address space, accessed with special `IN` / `OUT` instructions | x86 |

Same idea either way: write a number to a special location, the hardware on the other end reacts.

### How a keypress becomes a character

1. You press a key. The keyboard controller encodes it as a **scan code**.
2. The controller raises an **IRQ** (interrupt request).
3. The CPU finishes the current instruction, then jumps to the keyboard **interrupt handler**.
4. The handler reads the scan code from the keyboard's I/O port, translates it to a character, and leaves it in a buffer.
5. `IRET` — back to whatever was running.

The running program never polls the keyboard. It finds a character in a buffer when it next looks. That's the interrupt model from the CPU chapter, applied to the real world.

### Screens, disks, everything else

| Device | Typical mechanism |
|---|---|
| **Screen** | A region of RAM is the **framebuffer**. Bytes written there become pixels. A video chip reads it continuously and generates the signal |
| **Disk / SSD** | CPU writes a command and an address to the controller; the controller DMA-transfers blocks into RAM and interrupts when done |
| **Network** | Same pattern: controller, DMA, interrupt. Packets in, packets out |
| **Timer** | A counter tied to the clock, interrupting at a set frequency. The OS uses this as its heartbeat |

**DMA (Direct Memory Access):** the device writes to RAM *itself*, without the CPU copying every byte. The CPU just sets up the transfer and gets interrupted at the end. Essential, because a disk moving data through the accumulator would stall the entire machine.

**Memory-mapped devices live in the same address space as RAM**, which is why 32-bit Windows couldn't give you a full 4 GB of usable RAM — some of those addresses were claimed by graphics cards and other hardware.

## What an operating system actually does

A naked CPU starts executing at a fixed address when power is applied. That first program is the **firmware / BIOS / UEFI**, which initialises hardware and loads the **bootloader**, which loads the **kernel**. From then on, the kernel *is* the machine as far as every other program is concerned.

**The OS exists because programs shouldn't have to know about scan codes, DMA, or which IRQ the disk uses.**

| Job | What it means |
|---|---|
| **Process management** | Starts programs, stops them, switches between them many times a second (the timer interrupt) so they appear to run at once |
| **Memory management** | Gives each process its own address space so one crash can't overwrite another. Virtual memory, page tables, isolation |
| **File system** | Turns a raw disk (a giant array of blocks) into named files and directories |
| **Device drivers** | The only code that talks to hardware. Everything else asks the OS |
| **System calls** | The official door: `read`, `write`, `open`, `fork`, `exit`. A program *traps* into the kernel, which does the privileged thing and returns |
| **Security / permissions** | User vs kernel mode. A user program physically cannot execute `IN`/`OUT` or touch another process's memory; the CPU refuses |

**User mode vs kernel mode** is a CPU feature, not an OS invention. The chip has a bit that, when set to "user", makes privileged instructions fault. The OS sets that bit. That's the entire security boundary.

**A process** is a program in motion: its memory, its registers (saved while it's not running), its open files, its identity. **A thread** is a PC + stack inside a process — multiple threads share the same memory.

**The scheduler** runs on every timer interrupt: save current process, pick the next, restore its registers, return. That's multitasking. There's no magic — just the interrupt handler choosing a different return address.

## The coding ladder

The CPU only ever executes **machine code**: numbers in RAM, fetched into the IR. Everything else is a translation down to that.

```
Problem in your head
        ↓  you write
Source code  (Python, C, Rust, JS…)
        ↓  compiler or interpreter
Assembly     (LDA, ADD, JMP — still text)
        ↓  assembler
Machine code (0001 0100 1101… — what the CPU fetches)
        ↓
The ALU, registers, RAM actually do it
```

### Machine code

Raw opcodes. Unreadable, unportable (a 6502 `LDA` is a different number from an x86 `MOV`), never written by hand except as an exercise.

### Assembly

One mnemonic per opcode, plus labels so you don't calculate jump addresses. **Still 1:1 with machine code.** You are telling the CPU exactly what to do, in its own language, with names instead of numbers.

```
loop:   DEC
        JNZ loop
```

Assembling this produces a few bytes. Disassembling those bytes produces this again. Nothing is lost, nothing is invented.

### High-level languages

One line of C or Python becomes **tens to thousands** of assembly instructions. The compiler (or interpreter) is doing the fetch-decode-execute thinking for you.

| Language kind | What happens | Examples |
|---|---|---|
| **Compiled** | Translated to machine code ahead of time. Fast, platform-specific binary | C, C++, Rust, Go |
| **Interpreted** | Another program reads your source at run time and does what it says. Slower, portable | Python, JavaScript (classically), Ruby |
| **Bytecode / VM** | Compiled to a portable intermediate, then interpreted or JIT-compiled | Java, C#, Python (.pyc), modern JS |

**None of this changes the CPU.** A Python `for` loop still becomes, eventually, a `DEC` / `JNZ` pair (or the equivalent on that chip). The ladder is real; the bottom rung is always the same.

### Why high-level exists

- Humans cannot reliably write correct machine code at any useful scale.
- Assembly is not portable — rewrite it for every CPU.
- Compilers are better at register allocation, addressing modes and instruction scheduling than almost any person.
- The *ideas* (loops, functions, types, objects) match how we think about problems, not how a bus moves bytes.

**You still need the bottom of the ladder.** When a program is slow, when it crashes, when you're writing a kernel or a driver or an exploit, you drop down. Everything in these notes is what you find when you do.

## The whole picture

```
You, writing Python
        ↓
Interpreter / compiler / OS
        ↓
Machine code in RAM          ← stored-program idea
        ↓
Fetch–decode–execute         ← the CPU loop
        ↓
ALU + registers + flags      ← adders, logic, two's complement
        ↓
Logic gates                  ← AND, OR, XOR, NOT, NAND
        ↓
Transistors (once: relays)   ← switches controlled by electricity
        ↓
Electricity in circuits      ← Ohm's law, closed loops
        ↓
Two states, 0 and 1          ← the only alphabet the hardware has
        ↓
Codes and combinations       ← Morse, Braille, ASCII, Unicode
```

Every layer is real, complete, and built only from the one below it. That's the whole of how computers work.

## Key takeaways

- Peripherals are addressed like RAM (or via I/O ports). Interrupts + DMA keep the CPU from polling or copying.
- The OS multiplexes hardware, isolates processes, and exposes system calls. User vs kernel mode is a CPU switch.
- Multitasking is a timer interrupt that restores a *different* process's registers.
- Machine code → assembly (1:1) → high-level (1:many). The CPU only ever sees the first.
- Compilers exist because the ideas we think in are not the operations a bus performs — but they always become those operations.
