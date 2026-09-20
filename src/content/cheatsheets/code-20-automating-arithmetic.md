---
title: "Code: Automating Arithmetic"
description: "Code ch. 20 — adder plus memory plus a counter: stepping through memory automatically, then storing instruction codes alongside data."
tags: ["code", "petzold", "computing", "cpu", "machine-code"]
draft: false
updated: "2026-09-18"
kind: "resource"
resource: "code"
module: "Ch. 20"
moduleOrder: 20
unit: 20
---
> **In one line:** hook an adder to memory with a counter stepping through addresses, then store *codes* for what to do next to each number — and you've invented the program.

*Companion to: Charles Petzold, Code (2nd edition), chapter 20.*

---

## From adding machine to programmable machine

| Stage | What's added | What it can do |
|---|---|---|
| 1 | Adder + latch (an **accumulator**) | Add a number to a running total |
| 2 | + RAM + an address **counter** | Add up a whole list of numbers from memory, automatically |
| 3 | + **instruction codes** in memory | Choose what to do at each step: load, add, subtract, store, halt |
| 4 | + a decoder for those codes | The machine follows a **program** |

| Term | Meaning |
|---|---|
| Accumulator | The register holding the running result |
| Opcode | The number meaning "do this", e.g. Add |
| Operand | What to do it to — often a memory address |
| Program | A sequence of opcodes and operands in memory |
| Halt | The instruction that stops the machine |

---

## Try it — a toy accumulator machine

Opcode numbers here are made up for illustration.

```python
LOAD, ADD, SUB, STORE, HALT = 0x10, 0x20, 0x21, 0x11, 0xFF

mem = [LOAD, 12, ADD, 13, SUB, 14, STORE, 15, HALT, 0, 0, 0,   # program
       40, 25, 5, 0]                                           # data at 12–15

acc, pc = 0, 0                     # accumulator and program counter
while mem[pc] != HALT:
    op, addr = mem[pc], mem[pc + 1]
    if op == LOAD:    acc = mem[addr]
    elif op == ADD:   acc = (acc + mem[addr]) & 0xFF
    elif op == SUB:   acc = (acc - mem[addr]) & 0xFF
    elif op == STORE: mem[addr] = acc
    pc += 2
print(mem[15])                     # 60  (40 + 25 − 5)
```

Code (addresses 0–8) and data (12–15) live in the **same** memory, and nothing but convention tells them apart.

---

## 🔐 Security and IT connections

- **Machine code is just numbers.** Disassemblers turn those bytes back into readable instructions, which is how malware analysts read programs without source code.
- **Code and data share memory, so data can become code.** If an attacker gets their bytes into memory and the CPU's program counter pointed at them, those bytes run. Defences: non-executable data pages (DEP/NX) and never writable and executable at once (W^X).

---

## Practice drills

<details>
<summary>1. What's the difference between an opcode and an operand?</summary>

The opcode says what to do (e.g. Add); the operand says what to do it to (e.g. memory address 13).
</details>

<details>
<summary>2. In the toy machine, what changes to compute 40 + 25 + 5?</summary>

Change the `SUB` opcode at address 4 to `ADD`.
</details>

<details>
<summary>3. What stops the CPU executing your data as instructions?</summary>

Only where the program counter points — plus modern protections like DEP/NX.
</details>

---

## Key takeaways

- Adder + accumulator + RAM + a counter = automatic arithmetic.
- Storing instruction codes in memory turns the calculator into a programmable computer.
- Programs are numbers in memory, alongside data — the root of both flexibility and code injection.
