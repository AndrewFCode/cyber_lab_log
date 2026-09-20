---
title: "Code: Anatomy of a Flashlight"
description: "Code ch. 4 — a circuit from battery, bulb and switch: voltage, current, resistance, Ohm's law, power, series vs parallel, conductors and insulators."
tags: ["code", "petzold", "computing", "electricity"]
draft: false
updated: "2026-09-18"
kind: "resource"
resource: "code"
module: "Ch. 4"
moduleOrder: 4
unit: 4
---
> **In one line:** a torch is a complete loop — battery, switch, bulb — and three quantities (voltage, current, resistance) explain everything that flows round it.

*Companion to: Charles Petzold, Code (2nd edition), chapter 4.*

---

## The circuit

- **Battery:** chemical reactions push electrons out of one terminal and in at the other.
- **Circuit:** current only flows around a complete loop.
- **Switch:** breaks or completes that loop — **off** or **on**.
- **Bulb:** its filament resists the current, heats up and glows.

| Quantity | Symbol | Unit | Analogy (water) |
|---|---|---|---|
| Voltage | V | volt (V) | Pressure |
| Current | I | ampere (A) | Flow rate |
| Resistance | R | ohm (Ω) | Pipe narrowness |
| Power | P | watt (W) | Work done per second |

---

## The two formulas

| Law | Formula | Example |
|---|---|---|
| Ohm's law | **V = I × R** (so I = V ÷ R) | 3 V across 6 Ω → 0.5 A |
| Power | **P = V × I** | 3 V × 0.5 A = 1.5 W |

---

## Series vs parallel

| Batteries | Voltage | Capacity |
|---|---|---|
| In series (+ to −) | Adds up: two 1.5 V cells = 3 V | Same as one cell |
| In parallel (+ to +) | Stays 1.5 V | Adds up — lasts longer |

| Material | Behaviour | Examples |
|---|---|---|
| Conductor | Current flows easily | Copper, silver, gold |
| Insulator | Blocks current | Rubber, plastic, glass, air |

A **short circuit** is a path with almost no resistance. By Ohm's law, current soars — producing heat, fire or a dead battery.

---

## Try it

```python
V, R = 3, 6
I = V / R          # 0.5 A
P = V * I          # 1.5 W
```

---

## 🔐 Security and IT connections

- **Power supplies are Ohm's law in a box.**
  - A PSU's 12 V rail rated at 30 A can deliver 360 W.
  - A 20 V × 3.25 A laptop charger is 65 W.
  - USB-C Power Delivery negotiates the voltage (5, 9, 15 or 20 V and more) with the device.
- **UPS sizing:** UPS units are rated in VA *and* watts. Size on watts, with headroom.
- **Short circuits and static** are why you unplug before opening a PC, mount motherboards on standoffs, and use ESD protection.

---

## Practice drills

<details>
<summary>1. Four 1.5 V batteries in series give what voltage?</summary>

6 V
</details>

<details>
<summary>2. A 12 V fan draws 0.25 A. What's its power?</summary>

12 × 0.25 = 3 W
</details>

<details>
<summary>3. Why does a motherboard sit on standoffs rather than touching the case?</summary>

The metal case would short-circuit the board's traces.
</details>

---

## Key takeaways

- Current needs a complete loop; a switch opens or closes it — the original on/off.
- V = I × R and P = V × I explain batteries, bulbs and PSUs alike.
- Series adds voltage, parallel adds capacity; a short circuit means dangerous current.
