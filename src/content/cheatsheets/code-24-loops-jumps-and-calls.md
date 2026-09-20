---
title: "Code: Loops, Jumps, and Calls"
description: "Code ch. 24 — changing the program counter: unconditional and conditional jumps, loops, the stack, and CALL/RETURN for subroutines."
tags: ["code", "petzold", "computing", "cpu", "machine-code"]
draft: false
updated: "2026-09-18"
kind: "resource"
resource: "code"
module: "Ch. 24"
moduleOrder: 24
unit: 24
---
> **In one line:** a program stops being a straight line the moment it can change its own program counter — jumps make loops and decisions, and the stack makes reusable subroutines possible.

*Companion to: Charles Petzold, Code (2nd edition), chapter 24.*

---

## Jumps

Normally the program counter just steps forward. A **jump** loads a new address into it instead.

| Jump | Behaviour |
|---|---|
| Unconditional (`JMP`) | Always go to the address |
| Conditional (`JZ`, `JNZ`, `JC`…) | Go **only if** a [status flag](/resources/code/21/) matches |

**A loop** is a conditional jump backwards:

```
        MOV  count, 5
loop:   ... do the work ...
        DEC  count           ; sets the Zero flag when it hits 0
        JNZ  loop            ; jump back while not zero
```

An **infinite loop** is a jump to itself with no exit condition.

---

## The stack

A region of memory used **last-in, first-out**, tracked by a **stack pointer**.

| Operation | Effect |
|---|---|
| `PUSH` | Put a value on top; the stack pointer moves |
| `POP` | Take the top value off |

The stack usually grows **downward** (toward lower addresses).

---

## Subroutines: CALL and RETURN

| Instruction | Does |
|---|---|
| `CALL addr` | **Push the return address** (the next instruction), then jump to `addr` |
| `RET` | **Pop the return address** and jump back to it |

Because the return address is saved on the stack, subroutines can call other subroutines — and call themselves (recursion). The stack also holds each call's local variables and saved registers, together called a **stack frame**.

---

## Try it

```python
# High-level loops and calls compile down to jumps, pushes and pops
def countdown(n):
    while n > 0:          # compare + conditional jump
        print(n)
        n -= 1            # DEC
    return "done"         # RET pops the return address
```

```bash
objdump -d /bin/true | grep -E 'call|jmp|ret|push|pop' | head
```

---

## 🔐 Security and IT connections

- **The stack is the classic attack surface.** In a **stack buffer overflow**, input that's too long spills past a local variable and overwrites the saved **return address** — so `RET` jumps to the attacker's code.
- **Defences, each targeting this:**
  - **Stack canary** — a secret value placed before the return address; if it's changed, the program aborts.
  - **DEP / NX** — the stack is marked non-executable, so injected bytes can't run.
  - **ASLR** — memory is laid out at random addresses, so the attacker can't predict where to jump.
- **ROP (return-oriented programming)** chains together `RET`-ending snippets of existing code to sidestep DEP — the reason exploitation is an arms race.
- **A stack overflow crash** (distinct from the vulnerability) is what runaway recursion causes.

---

## Practice drills

<details>
<summary>1. How is a loop built from jumps?</summary>

A conditional jump backwards to the start, taken while the loop condition holds.
</details>

<details>
<summary>2. What does CALL push onto the stack, and why?</summary>

The return address — so RET knows where to resume after the subroutine finishes.
</details>

<details>
<summary>3. In a stack buffer overflow, what does the attacker most want to overwrite?</summary>

The saved return address, so RET transfers control to code of their choosing.
</details>

<details>
<summary>4. Which defence randomises memory addresses to foil this?</summary>

ASLR (Address Space Layout Randomization).
</details>

---

## Key takeaways

- Jumps change the program counter; conditional jumps read the flags to make loops and decisions.
- The stack (PUSH/POP, LIFO) stores return addresses, locals and saved registers.
- CALL/RET use the stack for subroutines — and that saved return address is what overflow exploits target.
