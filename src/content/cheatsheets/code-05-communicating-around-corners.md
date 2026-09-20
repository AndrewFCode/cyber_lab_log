---
title: "Code: Communicating Around Corners"
description: "Code ch. 5 — signalling by wire between houses: circuits need a return path, shared commons and earth grounds, and why long wires dim the signal."
tags: ["code", "petzold", "computing", "electricity"]
draft: false
updated: "2026-09-18"
kind: "resource"
resource: "code"
module: "Ch. 5"
moduleOrder: 5
unit: 5
---
> **In one line:** once line of sight fails, wires carry the signal — but every circuit needs a way back, and long wires fight you with resistance.

*Companion to: Charles Petzold, Code (2nd edition), chapter 5.*

---

## Wiring a signal between two places

| Problem | Solution |
|---|---|
| Every circuit needs a return path | Run a second wire back |
| Two-way signalling doubles the wiring | **Share one common return wire** between both circuits |
| Even the common wire costs money over miles | Use the **earth itself** as the return (a ground connection at each end) |
| Long wires have resistance, so the bulb dims | Use thicker wire, a higher voltage, or regenerate the signal (next chapter) |

- **Resistance grows with length** and falls with thickness.
- **Wire gauge (AWG):** a *lower* number means *thicker* wire. Cat6 cable is typically 23 AWG, Cat5e 24 AWG.

---

## Key terms

| Term | Meaning |
|---|---|
| Common | A shared connection that several circuits use as their return |
| Ground / earth | A reference point at 0 V; historically the literal earth |
| Voltage drop | Voltage lost along a wire because of its resistance |
| Attenuation | A signal weakening over distance |

---

## 🔐 Security and IT connections

- **Distance limits come from this chapter.** Copper Ethernet tops out at 100 m because of attenuation. Beyond that you need a switch (which regenerates the signal) or fibre.
- **PoE loses power over long runs.** That's why PoE budgets assume some voltage drop along the cable.
- **Grounding is safety.** The earth pin on a plug gives fault current a safe path. ESD straps clip to ground for the same reason.
- **Serial links share a signal ground** (RS-232 console cables to switches and routers): without a common reference, a "1" can't be told from a "0".

---

## Practice drills

<details>
<summary>1. Two friends each want to signal the other. Why does a shared common wire save cabling?</summary>

Both circuits can use one return wire, so you need three wires instead of four.
</details>

<details>
<summary>2. A 130 m Ethernet run is flaky. Why, and what fixes it?</summary>

It exceeds the 100 m copper limit and the signal attenuates. Add a switch midway, or use fibre.
</details>

<details>
<summary>3. Which is thicker: 22 AWG or 26 AWG?</summary>

22 AWG — a lower gauge number means thicker wire.
</details>

---

## Key takeaways

- Every circuit needs a return path; a shared common or earth ground saves wire.
- Resistance grows with wire length, causing voltage drop and signal loss.
- Distance limits, grounding and signal regeneration in networking all trace back here.
