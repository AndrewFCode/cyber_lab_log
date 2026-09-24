---
title: "A+ Core 1 3.6: Computer Power"
description: "Professor Messer A+ 220-1201 objective 3.6 — power supply safety, AC vs DC, amps/volts/watts, regional voltage, the 24-pin connector, redundant PSUs, modular cabling, sizing, and 80 PLUS efficiency."
tags: ["a-plus", "comptia", "messer", "hardware", "power-supply", "psu", "electrical-safety"]
draft: false
updated: "2026-09-24"
kind: "resource"
resource: "a-plus-core-1"
module: "Computer Power"
moduleOrder: 72
unit: 3
---

> **In one line:** the power supply converts wall AC into the DC voltages (mainly 3.3 V, 5 V, 12 V) the motherboard needs, sized by watts = volts × amps and by a 50%-of-capacity rule of thumb, with redundant hot-swappable units and 80 PLUS efficiency ratings for the infrastructure end — and always, always disconnect power before opening the case.

*Companion to: Professor Messer, CompTIA A+ 220-1201 Core 1, objective 3.6 (Computer Power).* The full version is the Computer Power class notes; the section overview is the Section 3 sheet.

---

## Safety — before anything else

- **Always disconnect power before opening a computer.** Two hazards: direct electrocution, and **stored charge in capacitors** that outlasts disconnection.
- **Never connect yourself to a building's electrical system**, including the ground wire — it can become energised under fault conditions.
- Double-check disconnection; don't assume from appearance.

## AC vs DC

| | AC | DC |
|---|---|---|
| What | Alternating Current — direction constantly reverses | Direct Current — one direction, constant voltage |
| Where | Wall outlet | What the motherboard needs |
| Job | Input to the PSU | Output from the PSU |

**The PSU's whole job: convert AC → DC.**

## Amps, volts, watts

| Unit | Measures | Hose analogy |
|---|---|---|
| **Amp (A)** | Electrons past a point per second | Volume of water flowing |
| **Volt (V)** | Electrical pressure | Water pressure |
| **Watt (W)** | Real power use | — |

**Watts = Volts × Amps.** Example: 120 V × 0.5 A = **60 W**.

## Regional AC standards

| Region | Voltage | Frequency |
|---|---|---|
| US / Canada | 110–120 VAC | 60 Hz |
| Europe | 220–240 VAC | 50 Hz |

- **Older PSUs:** manual 120V/230V switch on the back — **set it correctly before connecting**. 120V-set PSU into a 230V source = overload, likely dramatic failure.
- **Modern PSUs:** auto-sense the input voltage, no switch needed.
- Unsure what an outlet provides? **Test it with a multimeter.**

## DC output voltages

| Voltage | Used for |
|---|---|
| **+12 V** | PCIe adapters, hard drives, higher-power components |
| **+5 V** | Motherboard components (more common on older boards) |
| **+3.3 V** | Newer boards — M.2 slots, RAM, onboard components |
| **+5 VSB** | Standby power — wake-on-LAN, front-panel power button |
| **−12 V** | Onboard LAN, some older PCI cards |
| **−5 V** | Obsolete — many modern PSUs don't provide it |

Exact voltages and amp ratings per rail: check the **PSU manual** or the **label on the unit**.

## Motherboard connector

- **24-pin**, delivering 3.3 V / 5 V / 12 V. Originally **20-pin**.
- A 24-pin PSU connector works on an older **20-pin-only board** — just leave the last 4 pins unconnected.
- **Keyed** — only fits one orientation.

## Redundant power supplies

- Each unit supports **100% of the load** alone.
- Normal operation: typically **~50% load each**, sharing the work.
- Lose one → the other takes **100%** automatically.
- Usually **hot-swappable** — replace while the system stays running.

## Cabling styles

| Style | Cables | Typical cost |
|---|---|---|
| **Fixed** | All permanently attached | Lower |
| **Hybrid** | Essentials fixed, extras modular | Middle |
| **Fully modular** | Everything detachable, connect only what you need | Higher |

## Sizing a PSU

1. **Total up component requirements** — CPU, storage, video card (often the big one), everything else.
2. **Apply the 50% rule of thumb:** your actual load should be ~50% of the PSU's rated capacity.
3. **Formula:** rated capacity = actual load ÷ 0.5. (400 W load → 800 W PSU.)
4. **Physical size doesn't change with wattage** within a form factor.
5. Buying far more than needed adds cost, not speed.

## Efficiency: 80 PLUS

- Typical efficiency: **80–96%.** Lost power becomes **heat** → more cooling load.
- **Tiers, lowest to highest:** 80 PLUS → **Bronze** → **Silver** → **Gold** → **Platinum** → **Titanium**.

## 🔐 Security notes

- **Power safety failures are the single most severe hardware risk in this whole course** — the disconnect-and-verify discipline is the actual control, not just caution.
- **Redundant hot-swappable PSUs are the same "eliminate the single point of failure" principle as RAID and multi-channel memory,** applied to the electrical layer.
- **A misconfigured voltage switch is a self-inflicted, sometimes destructive, availability incident** — internal and procedural, not adversarial, but real.
- **Lower efficiency = more heat = more component degradation over time** — an indirect but genuine reliability consideration.
- **Anyone with physical case access can be injured by residual capacitor charge** — control and train who's authorised for hardware work, not just who can enter the building.

## Practice drills

<details>
<summary>1. What must you check for before touching internal components, beyond unplugging the power cable?</summary>

**Stored charge in capacitors** — it can remain energised after disconnection.
</details>

<details>
<summary>2. A device draws 2 A at 120 V. Wattage?</summary>

**240 W** (120 × 2).
</details>

<details>
<summary>3. US/Canada vs Europe AC standards?</summary>

**US/Canada: 110–120 VAC, 60 Hz. Europe: 220–240 VAC, 50 Hz.**
</details>

<details>
<summary>4. What happens if a 120V-set PSU is plugged into 230V?</summary>

**Overload — a dramatic, likely destructive failure.** Always check/set the switch before connecting.
</details>

<details>
<summary>5. What is +5 VSB for?</summary>

**Standby power** — keeps the motherboard able to receive wake signals (wake-on-LAN, power button) while "off."
</details>

<details>
<summary>6. Why is the 24-pin connector keyed?</summary>

So it **can only be inserted one way round** — prevents wrong-orientation connection.
</details>

<details>
<summary>7. Redundant PSUs at normal load — what's the split, and what happens on failure?</summary>

**~50/50 split normally**; the surviving unit takes **100%** if one fails.
</details>

<details>
<summary>8. Component load calculates to 400 W. Target PSU rating using the 50% rule?</summary>

**800 W** (400 ÷ 0.5).
</details>

## Key takeaways

- Always disconnect power and account for capacitor charge before opening a case — never touch a building's ground wire.
- PSU converts AC (wall) to DC (motherboard): mainly 3.3 V / 5 V / 12 V, plus 5 VSB standby.
- Watts = volts × amps; size a PSU so real load is ~50% of rated capacity.
- 24-pin connector is keyed; redundant PSUs share load and are usually hot-swappable.
- 80 PLUS tiers run Bronze → Silver → Gold → Platinum → Titanium, lowest to highest efficiency.
