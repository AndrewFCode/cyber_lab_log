---
title: "Code: Feedback and Flip-Flops"
description: "Code ch. 17 — feeding outputs back to inputs: the oscillator (a clock), R-S flip-flops, D latches, edge-triggered flip-flops, dividers and counters."
tags: ["code", "petzold", "computing", "logic-gates", "memory"]
draft: false
updated: "2026-09-18"
kind: "resource"
resource: "code"
module: "Ch. 17"
moduleOrder: 17
unit: 17
---
> **In one line:** wire a gate's output back into its input and two new powers appear — a circuit that ticks (a clock) and a circuit that remembers (a flip-flop).

*Companion to: Charles Petzold, Code (2nd edition), chapter 17.* The book's companion site, CodeHiddenLanguage.com, animates many of these circuits.

---

## The oscillator

An inverter whose output feeds its own input can never settle. It flips 0 → 1 → 0 forever, producing a **clock signal**.

| Term | Meaning |
|---|---|
| Cycle | One full 0 → 1 → 0 |
| Frequency | Cycles per second, in hertz (Hz) — 3 GHz = 3 billion cycles a second |
| Period | Time for one cycle = 1 ÷ frequency |

---

## Flip-flops: one bit of memory

### R-S (reset-set) flip-flop — two cross-coupled NOR gates

| S | R | Q | Meaning |
|---|---|---|---|
| 1 | 0 | 1 | **Set** |
| 0 | 1 | 0 | **Reset** |
| 0 | 0 | unchanged | **Hold** — it remembers |
| 1 | 1 | — | Invalid; avoid |

### Better flip-flops

| Type | Behaviour |
|---|---|
| Level-triggered D latch | While the clock is **high**, Q follows Data; when the clock goes low, Q holds |
| Edge-triggered D flip-flop | Captures Data only at the instant the clock **rises** — the basis of registers |
| Divide-by-two (toggle) | Feed Q̄ back to D, and Q flips on every clock edge — half the input frequency |
| Ripple counter | Chain divide-by-two stages; their outputs count upward in binary |

### A 3-stage counter

| Clock pulses | Q2 Q1 Q0 | Value |
|---|---|---|
| 0 | 000 | 0 |
| 1 | 001 | 1 |
| 2 | 010 | 2 |
| 3 | 011 | 3 |
| … | … | … |
| 7 | 111 | 7, then wraps to 000 |

---

## Try it — an R-S flip-flop from NOR gates

```python
def nor(a, b):
    return int(not (a or b))

def sr_latch(s, r, q=0):
    for _ in range(4):            # let the feedback loop settle
        q_bar = nor(s, q)
        q = nor(r, q_bar)
    return q

q = sr_latch(1, 0)        # set   → 1
q = sr_latch(0, 0, q)     # hold  → still 1
q = sr_latch(0, 1, q)     # reset → 0
```

---

## 🔐 Security and IT connections

- **Flip-flops are SRAM** — the memory in CPU registers and caches. Each bit needs several transistors, which is why cache is small and expensive while DRAM (one transistor plus a capacitor per bit) is big and cheap.
- **Clock speed** — the oscillator idea — sets how many steps a CPU can take per second. Shown in `lscpu` and Task Manager.
- **Cache timing leaks information.** Side-channel attacks like Spectre measure how quickly data comes back from cache to infer secrets.

---

## Practice drills

<details>
<summary>1. What's the period of a 1 kHz clock?</summary>

1 ÷ 1,000 = 1 millisecond.
</details>

<details>
<summary>2. An R-S flip-flop has S = 0 and R = 0. What's Q?</summary>

Whatever it was before — it holds its last value.
</details>

<details>
<summary>3. Four divide-by-two stages are chained after a 16 Hz clock. What frequency comes out of the last one?</summary>

16 → 8 → 4 → 2 → **1 Hz**.
</details>

---

## Key takeaways

- Feedback makes an oscillator (a clock) or a flip-flop (memory).
- R-S sets and resets; a D flip-flop stores its input on the clock edge.
- Divide-by-two stages chain into binary counters.
- Flip-flops are SRAM: registers and cache.
