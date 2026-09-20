---
title: "Electricity, Switches, Relays & Logic Gates"
description: "Circuits and Ohm's law, Boolean logic built from switches, the relay, and the full set of logic gates."
tags:
  - computing-fundamentals
  - electronics
  - logic-gates
  - boolean
  - code-book
draft: false
updated: 2026-09-17
category: code-book
pinned: false
kind: resource
resource: "Code (2nd ed.)"
module: "Chapters 4–8"
moduleOrder: 2
---

*Covers Code (2nd ed.) chapters 4–8.*

> **In one line:** a switch does Boolean logic; a relay is a switch operated by electricity instead of a finger; and that one change lets circuits control other circuits — which is the whole of computing.

## Electricity basics

A **circuit** is a closed loop. Electrons flow from one terminal of a power source, through a load, and back. **Break the loop anywhere and nothing flows.**

| Term | Meaning | Unit |
|---|---|---|
| **Voltage (V)** | Potential difference — the "push" | Volts |
| **Current (I)** | Rate of electron flow | Amps |
| **Resistance (R)** | Opposition to flow | Ohms (Ω) |

**Ohm's law:** `V = I × R`  → `I = V / R` → `R = V / I`

| Condition | What happens |
|---|---|
| **Open circuit** | Path broken, no current, nothing works |
| **Closed circuit** | Complete path, current flows |
| **Short circuit** | Path with near-zero resistance — current spikes, things melt or catch fire |

- **Conductors** (copper, most metals) let electrons move freely; **insulators** (rubber, plastic, glass) don't.
- Current needs a **complete return path**. A load with no return does nothing.

**The ground trick.** The Earth conducts, so it can act as the return path for a circuit. Two stations connected by **one wire plus a ground connection at each end** work as well as two wires — halving the wire needed over long distances. This is the origin of "ground" as a common reference point in every circuit diagram since.

## Logic with switches

A switch has exactly two states: **closed (on, true, 1)** or **open (off, false, 0)**. That maps directly onto **Boolean algebra** — George Boole's system for doing algebra with logical statements instead of numbers.

| Wiring | Behaviour | Boolean |
|---|---|---|
| **Switches in series** | Current flows only if **both** are closed | **AND** (multiplication) |
| **Switches in parallel** | Current flows if **either** is closed | **OR** (addition) |

```
SERIES (AND)                PARALLEL (OR)

 ──/ ──── / ──►              ────/ ────┐
   A      B                  │         ├──►
                             ────/ ────┘
                               A    B
```

Combine series and parallel wiring and you can build a circuit that answers **any** logical question with a yes/no answer. That's the key insight: **wiring = logic.**

## Telegraphs and relays

**The problem:** a long telegraph wire has resistance. Past a certain distance the signal is too weak to move the receiver's electromagnet.

**The first fix** was a human repeater — an operator receiving and re-sending the message down a fresh circuit. Slow and expensive.

**The relay** automates exactly that. It is an **electromagnet that operates a switch**:

1. Current flows through a coil.
2. The coil becomes a magnet.
3. The magnet pulls a metal contact, closing (or opening) a **separate** circuit.
4. Remove the current and a spring returns the contact.

**Why the relay is the pivotal component:**

- A weak incoming signal controls a **fresh, full-strength** outgoing circuit → **amplification**, so signals travel indefinitely.
- The switch is thrown **by electricity, not by a person**. Output from one relay can be the input to another.
- Relays can therefore be **wired together to compute** — no human in the loop.

Vacuum tubes and then **transistors** replaced relays, but they do the same job: a switch controlled by an electrical signal. Everything above this layer is unchanged.

## Logic gates

A **gate** is a small circuit that takes one or more input bits and produces one output bit, according to a fixed rule. Built from relays originally, transistors today.

### The core set

**NOT (inverter)** — one input, output is the opposite.

| A | Out |
|---|---|
| 0 | 1 |
| 1 | 0 |

**AND** — output 1 only when all inputs are 1.

| A | B | Out |
|---|---|---|
| 0 | 0 | 0 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | **1** |

**OR** — output 1 if any input is 1.

| A | B | Out |
|---|---|---|
| 0 | 0 | 0 |
| 0 | 1 | **1** |
| 1 | 0 | **1** |
| 1 | 1 | **1** |

**NAND** — AND followed by NOT.

| A | B | Out |
|---|---|---|
| 0 | 0 | **1** |
| 0 | 1 | **1** |
| 1 | 0 | **1** |
| 1 | 1 | 0 |

**NOR** — OR followed by NOT.

| A | B | Out |
|---|---|---|
| 0 | 0 | **1** |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 0 |

**XOR (exclusive OR)** — output 1 when the inputs **differ**.

| A | B | Out |
|---|---|---|
| 0 | 0 | 0 |
| 0 | 1 | **1** |
| 1 | 0 | **1** |
| 1 | 1 | 0 |

**Buffer** — output equals input. No logic, but it restores signal strength and adds a deliberate delay.

### Quick reference

| Gate | Rule of thumb |
|---|---|
| AND | All inputs true |
| OR | At least one true |
| NAND | Not all true |
| NOR | None true |
| XOR | Inputs differ |
| NOT | Flip it |

## De Morgan's laws

Two identities that let you swap AND for OR by inverting everything:

```
NOT (A AND B)  =  (NOT A) OR  (NOT B)
NOT (A OR  B)  =  (NOT A) AND (NOT B)
```

**Why it matters practically:** every gate can be built from **NAND alone** (or NOR alone). NAND is therefore called a *universal gate* — chip manufacturers can build any circuit from one repeated component.

## The abstraction ladder so far

```
Boolean logic (AND / OR / NOT)
        ↑
   Logic gates
        ↑
Relays or transistors
        ↑
Switches and circuits
        ↑
   Electricity
```

Each layer is built entirely from the one below and hides it completely. Once you have gates, you never need to think about electrons again.

## Key takeaways

- V = I × R. Open circuit = nothing; short circuit = damage.
- Ground can serve as the return path — hence "ground" as the common reference.
- Switches in **series = AND**, in **parallel = OR**. Wiring is logic.
- A relay is a switch thrown by electricity, which means circuits can control circuits.
- Six gates cover everything: NOT, AND, OR, NAND, NOR, XOR.
- De Morgan's laws mean NAND (or NOR) alone can build any logic circuit.
