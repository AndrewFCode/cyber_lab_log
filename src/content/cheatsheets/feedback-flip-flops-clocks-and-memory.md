---
title: "Feedback, Flip-Flops, Clocks & Memory"
description: "How a circuit remembers: feedback loops, latches, edge-triggered flip-flops, counters and the RAM array."
tags:
  - computing-fundamentals
  - flip-flops
  - memory
  - clocks
  - code-book
draft: false
updated: 2026-09-17
category: code-book
pinned: false
kind: resource
resource: "Code (2nd ed.)"
module: "Chapters 17–19"
moduleOrder: 6
---

*Covers Code (2nd ed.) chapters 17–19.*

> **In one line:** feed a circuit's output back into its own input and it holds a bit — that's memory. Clock it, array it, and you have RAM.

## The problem with combinational logic

Everything so far — gates, adders, two's complement — is **combinational**: output depends *only* on the current inputs. Change the inputs, the output changes immediately. Forget the inputs, the output vanishes.

A computer needs to **remember**. Memory is a circuit whose output depends on **what happened in the past**.

## Feedback: the R-S flip-flop

Wire two **NOR gates** so each one's output is the other's input, then add two extra inputs:

```
S ──►│NOR│──► Q
     │   │◄───┐
          └───┤
     │NOR│◄───┘
R ──►│   │──► Q̅
```

This is the **R-S (Reset-Set) flip-flop**. It has *state*.

| S | R | Result |
|---|---|---|
| 0 | 0 | **Hold** — output stays whatever it was |
| 1 | 0 | **Set** — Q becomes 1 |
| 0 | 1 | **Reset** — Q becomes 0 |
| 1 | 1 | **Forbidden** — both outputs 0, race when released |

**The hold state is the entire point.** Pulse S once and Q stays 1 forever — until you pulse R. The circuit *remembers* a 1 or a 0 with no continuous input. One bit of memory, built from two gates.

## Oscillators and clocks

Feedback can also be used to **prevent** a stable state. A **ring oscillator** — an odd number of inverters in a loop — never settles, because each NOT keeps flipping the next. That's a clock, generated from nothing but gates.

A **crystal oscillator** (quartz) does the same job far more accurately: a crystal vibrates at a precise frequency, producing a clean square wave. That's the **clock** on every motherboard.

| Clock property | Meaning |
|---|---|
| **Frequency** | Cycles per second (Hz) — 3 GHz = 3 billion ticks/s |
| **Period** | Time of one cycle = 1 / frequency |
| **Duty cycle** | Fraction of each cycle spent high. 50% is typical |

The clock is the **heartbeat**. Every sequential circuit in the machine waits for it.

## Edge-triggered D flip-flop

The R-S has two problems for practical use:

1. Two control inputs, including a forbidden combination.
2. It responds to **levels** — as long as S is high, it stays set. That's too loose; we want it to grab a value at one precise moment.

The **D (data) flip-flop** solves both:

- One data input (D) plus a clock input.
- On the **rising edge** of the clock, Q becomes whatever D currently is.
- At every other moment, Q **holds**.

```
D ────►│ D  │
       │    │──► Q
CLK ──►│    │
```

**Edge-triggered vs level-triggered:**

| Type | Captures when |
|---|---|
| **Level-triggered (latch)** | The whole time the clock is high — D can leak through |
| **Edge-triggered (flip-flop)** | Only at the instant of the rising (or falling) edge |

Edge-triggered is what computers actually use. The **setup time** (D must be stable *before* the edge) and **hold time** (D must stay stable *just after*) are the two timing constraints that define whether a circuit works at a given clock speed.

**One D flip-flop = one bit of memory.** That's the unit.

## Registers and counters

**A register** is just n D flip-flops sharing one clock. An 8-bit register captures an 8-bit value on a clock edge and holds it. That's where a number *lives* inside a CPU.

**A ripple counter** chains flip-flops so each one's Q clocks the next. Every clock pulse increments a binary number:

```
CLK ──► FF0 ──► FF1 ──► FF2 ──► FF3
         Q0      Q1      Q2      Q3
```

After 16 pulses, a 4-bit counter rolls over to 0000 — which is how a CPU knows a loop has finished, or how a program counter advances to the next instruction.

A **synchronous counter** clocks every flip-flop from the same clock (rather than rippling) so they all change together — faster, no ripple delay.

## RAM: memory as an array

A register holds one word. A computer needs thousands to billions. The solution is a **grid**:

```
        bit0   bit1   bit2   bit3
row0     ●      ●      ●      ●
row1     ●      ●      ●      ●
row2     ●      ●      ●      ●
```

Each ● is one flip-flop (or, in real DRAM, one capacitor).

| Line | Job |
|---|---|
| **Address lines** | Select which row (and in larger chips, which column) |
| **Data lines** | Carry the bits in or out |
| **Read/Write** | Direction: store this, or give me what's there |
| **Chip Select** | Enables this chip and ignores the others |

**n address lines → 2ⁿ locations.** That's why memory sizes are always powers of two: 8 address lines = 256 locations, 16 = 65,536, 32 = 4,294,967,296.

### SRAM vs DRAM

| | **SRAM** | **DRAM** |
|---|---|---|
| Built from | Flip-flops (6 transistors/bit) | One transistor + one capacitor |
| Speed | Fast | Slower |
| Density | Low — expensive per bit | High — cheap per bit |
| Refresh | Not needed | Capacitors leak; must be rewritten thousands of times per second |
| Used for | CPU cache | Main memory |

**Volatile vs non-volatile:** RAM of both kinds **forgets everything when power is removed**. That's why you also need ROM (read-only, burned in), flash, disks — storage that survives a power cut.

## Key takeaways

- Combinational logic has no memory. Feedback creates state.
- R-S flip-flop: two NOR gates, a hold state, one bit.
- A clock is a square wave. Edge-triggered D flip-flops capture D at the rising edge and hold otherwise.
- n D flip-flops + one clock = an n-bit register.
- RAM is a 2D array of those bits, selected by address lines: n lines → 2ⁿ locations.
- SRAM (flip-flops, cache) vs DRAM (capacitors, main memory, needs refresh). Both forget at power-off.
