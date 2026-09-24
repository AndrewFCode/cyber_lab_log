---
title: "A+ Core 1 3.6: Computer Power — Class Notes"
description: "Full class notes for Professor Messer A+ 220-1201 objective 3.6: power supply safety, AC vs DC, amps/volts/watts, regional voltage, the 24-pin connector, redundant PSUs, modular cabling, wattage sizing, and 80 PLUS efficiency."
pubDate: 2026-09-24
tags: ["class-notes", "a-plus", "comptia", "messer", "hardware", "power-supply", "psu", "electrical-safety"]
draft: false
---

**Class notes · Professor Messer, CompTIA A+ 220-1201 Core 1 · Section 3, objective 3.6 (Computer Power)**

> **Quick reference:** the short version of this lesson is the Computer Power cheat sheet in [A+ Core 1 section 3](/cyber_lab_log/resources/a-plus-core-1/3/). It follows the storage and RAID lessons in this section and shifts to the component that makes everything else possible: the power supply itself.

## Learning objectives

By the end of these notes you should be able to:

1. State the safety precautions required before working inside a computer's power system.
2. Explain the difference between AC and DC power and why a power supply exists.
3. Define amperage, voltage and wattage, and calculate watts from volts and amps.
4. Compare regional AC standards and explain why manual voltage switches were once common.
5. List the DC voltages a power supply outputs and what each one is used for.
6. Describe the 24-pin motherboard connector and its keying.
7. Explain redundant power supplies and hot-swapping.
8. Compare fixed and modular power supply cabling.
9. Explain how to size a power supply's wattage, and what 80 PLUS efficiency ratings mean.

## 1. Safety first

### 1.1 Always disconnect before working inside a computer

Before opening any computer, **always disconnect it from its power source**. Two distinct risks make this essential:

1. **Direct electrocution** from the power source itself.
2. **Stored charge in capacitors** inside the computer, which can remain energised even after the power is disconnected. You must know what you are touching and, where relevant, how to safely discharge capacitors before working on that equipment.

### 1.2 Never connect yourself to a building's electrical system

A related and equally important rule: **never connect yourself, or anyone else, to any part of a building's electrical system** — including the ground wire. A building's ground wire **can become energised** under fault conditions, so it must never be treated as inherently safe to touch.

### 1.3 A general posture toward power

The right mindset is a **healthy respect for anything dealing with electrical power**. Before working on any system, **double-check** that it is genuinely disconnected from its main power source — do not assume it based on appearance alone.

## 2. AC, DC, and why a power supply exists

### 2.1 AC in, DC out

The power supply inside a desktop computer performs a conversion: wall outlets provide **AC** (**Alternating Current**), but the motherboard and everything on it require **DC** (**Direct Current**). The power supply is the device that performs this **AC-to-DC conversion**.

### 2.2 What AC and DC actually mean

**Alternating current** constantly **reverses direction** — commonly represented as a wave or curvy line. This is the form power takes from the power plant to the outlets in homes and businesses.

**Direct current** moves in a **single direction** at a **constant voltage** — commonly represented as a straight line with smaller parallel lines beneath it.

```text
+------------------------------------------------------------------------------+
|                                                                              |
|   AC (Alternating Current)              DC (Direct Current)                  |
|                                                                              |
|      /\      /\      /\                  ______________________              |
|     /  \    /  \    /  \                 ----------------------              |
|    /    \  /    \  /    \                ----------------------              |
|         \/      \/      \/                                                   |
|                                                                              |
|   constantly reverses direction         moves in one direction, constant     |
|   what comes from the wall outlet       what the motherboard actually needs  |
|                                                                              |
+------------------------------------------------------------------------------+
```

### 2.3 The specific DC voltages

The power supply converts AC to separate DC voltages, principally **3.3 volts, 5 volts, and 12 volts** — each used for different purposes throughout the system, detailed in section 5. This conversion role makes the power supply **one of the most critical components** in the system, since every other component ultimately depends on it.

## 3. Amps, volts and watts

### 3.1 Amperage (amps)

An **ampere** (**amp**, abbreviated **A**) describes **how many electrons pass a single point in one second**. Using the classic water-hose analogy, amps are like the **total volume of water flowing through the hose** — a wider hose allows more water (more amps) to flow.

### 3.2 Voltage

**Voltage** (**volt**, abbreviated **V**) is the **pressure** behind the electricity on a wire. In the hose analogy, this is the **water pressure** — increasing voltage is like increasing the pressure driving water through the hose.

### 3.3 Wattage

**Wattage** (**watt**, abbreviated **W**) is a measurement of **real power use**, calculated as: **Watts = Volts × Amps**.

### 3.4 Worked example — calculating wattage

**Task:** in the United States, at 120 volts, a device draws 0.5 amps. What is its real power use in watts?

120 V × 0.5 A = 60 W

I verified this arithmetic directly: 120 multiplied by 0.5 is exactly 60. The device uses **60 watts**.

> **Exam tip:** watts = volts × amps is one of the most reliably tested calculations on the exam. Memorise the relationship, not just this one example.

## 4. AC input and regional standards

### 4.1 Volts and hertz

AC power is described by its **voltage** and by **how often it alternates per second**, measured in **hertz (Hz)**.

| Region | Voltage | Frequency |
|---|---|---|
| **US and Canada** | 110–120 VAC | 60 Hz |
| **Europe** | 220–240 VAC | 50 Hz |

**VAC** means "volts of AC." Because these standards differ by region, a computer's power supply must be able to accept the AC input available in whichever country it is being used.

### 4.2 Manual voltage switches (older power supplies)

Older power supplies sometimes have a **manual switch on the back**, marked for **120 volts** and **230 volts**, letting the user tell the supply what kind of input it will receive.

> **Caution:** setting this switch incorrectly is dangerous. Plugging a power supply that is **set for 120 volts into a 230-volt source** overloads the power supply and will very likely cause a **dramatic, immediate failure**. Always check and correct the switch setting **before** connecting the supply to power for the first time in a new location — never after.

### 4.3 If you are unsure what an outlet provides

If you do not know what type of AC power an outlet is actually supplying, use a **multimeter** to test it before assuming.

### 4.4 Modern auto-sensing power supplies

Most modern power supplies have **no manual switch at all**. They **automatically detect** the incoming AC voltage and adjust accordingly, working correctly regardless of the country they are used in — removing the risk described in section 4.2 entirely, provided the supply is genuinely auto-sensing.

## 5. DC output voltages

### 5.1 Positive and negative as relative potential

Power supply outputs are documented with both **positive and negative** values. This describes a **difference in potential relative to a reference point**, not two entirely different kinds of electricity. The lesson's analogy: measuring your house's floors from the front door — the second floor might be +10 feet, the basement −10 feet — both are 10 feet away, but the sign shows direction relative to where you are standing.

### 5.2 The main DC voltages and their uses

| Voltage | Typical use |
|---|---|
| **+12 V** | PCI Express adapters, internal hard drives, and other higher-power components |
| **+5 V** | Some motherboard components (more common on older boards) |
| **+3.3 V** | Common on newer motherboards — powers M.2 slots, RAM, and other onboard components |
| **+5 VSB** (standby) | Powers the motherboard while in standby/sleep, enabling wake-on-LAN or a front-panel power button |
| **−12 V** | Integrated LAN connections on the motherboard; some older PCI cards |
| **−5 V** | An older adapter card standard, now obsolete — many modern power supplies do not provide it at all |

> **Note (beyond this lesson):** the industry term for the +5 VSB rail is exactly that — **standby power** — and it is why a computer plugged in but "off" is not actually fully without power; the motherboard retains a small standby voltage to listen for wake signals.

### 5.3 Where to find exact specifications

The exact voltages, and how many **amps** each rail supports, are documented in the **power supply's manual**, and are often also printed directly on a **label on the side of the power supply** for quick reference.

## 6. The motherboard power connector

### 6.1 24-pin, formerly 20-pin

The main connection delivering power to the motherboard is a **24-pin connector**, supplying **3.3 V, 5 V, and 12 V** DC. This connector was originally **20-pin**; most modern motherboards use the full **24-pin** version.

### 6.2 Backward compatibility

If you encounter an older motherboard with only a **20-pin** socket, a modern **24-pin** power supply connector can still be used — you simply **do not connect the last four pins**, leaving them unused while the remaining 20 pins provide power normally.

### 6.3 Keying prevents wrong-orientation insertion

The 24-pin connector is **keyed**, meaning it can physically fit into its motherboard socket **only one way**. This prevents the possibility of plugging it in with the wrong orientation.

```text
+------------------------------------------------------------------------------+
|                                                                              |
|   24-pin ATX motherboard connector (simplified)                              |
|                                                                              |
|   [ 20-pin block ][ +4-pin block ]                                           |
|         |                |                                                   |
|   present on all       omitted on older 20-pin-only motherboards             |
|   ATX motherboards     (24-pin supply still works, using only 20 pins)       |
|                                                                              |
|   Keyed shape: the connector only seats one way round                        |
|                                                                              |
+------------------------------------------------------------------------------+
```

## 7. Redundant power supplies

### 7.1 What redundancy means here

Servers and other infrastructure equipment often have **multiple power supplies** fitted to the back of the unit. Each individual power supply is designed to support the system's **full 100% power requirement** on its own — so if one fails, the system keeps running on the remaining supply.

### 7.2 Normal operating load

In everyday operation, two redundant power supplies commonly **share the load at roughly 50% each**. If one power supply fails or is disconnected, the surviving supply **automatically takes on 100%** of the load.

### 7.3 Hot-swappable

Redundant power supplies are typically **hot-swappable** — a release mechanism (often a simple slide switch) lets you **remove and replace** a power supply **while the system remains powered on and running**, maintaining full uptime through the replacement.

## 8. Fixed versus modular cabling

### 8.1 Fixed cabling

**Less expensive power supplies** commonly have **fixed cables** permanently attached, coming directly out of the unit. This means a **large bundle of cables** sits inside the case regardless of whether every cable is actually connected to a device — contributing to clutter and restricted airflow even in a system that does not need every cable provided.

### 8.2 Modular cabling

**Higher-end power supplies** tend to be **modular**: cables connect to the power supply itself only when needed, using a set of connectors on the power supply's own housing. You **only plug in the cables you actually require**, and can add more later, or remove cables entirely, without unused cabling cluttering the case.

### 8.3 Hybrid designs

Some power supplies are **hybrid**: certain cables (often the essential ones, like the main 24-pin and CPU power) are **fixed**, while additional cables (like extra SATA or PCIe power) are **modular** and connected only as needed.

| Design | Cable behaviour | Typical cost |
|---|---|---|
| Fixed | All cables permanently attached | Lower |
| Hybrid | Essential cables fixed, extras modular | Middle |
| Fully modular | Every cable is optional and detachable | Higher |

## 9. Sizing and choosing a power supply

### 9.1 Wattage and price

Power supplies are sold in different **wattage** ratings, and **higher wattage generally costs more**. Buying far more capacity than you will ever need does not make the computer any faster — the extra headroom is purely about capacity, not performance.

### 9.2 Physical size stays constant

Regardless of wattage rating, a power supply's **physical size does not change** for a given form factor — upgrading to a higher-wattage unit in the same case does not require a different physical footprint.

### 9.3 Calculating what you need

To choose an appropriate wattage, add up the requirements of every major component: the **CPU**, **storage devices**, **video adapter**, and any other significant components, checking each one's own documentation for its wattage requirement. A separate, dedicated **video card** in particular often requires a **significant** amount of power and deserves specific attention when sizing.

### 9.4 The 50% rule of thumb

A commonly cited guideline is to choose a power supply that runs at around **50% of its rated capacity** under your system's actual total load today. This avoids overloading the supply and leaves **headroom for future growth** as components are added or upgraded.

### 9.5 Worked example — sizing a power supply

**Scenario:** a system's components, according to their documentation, have a combined maximum draw of approximately 400 W under full load.

1. **Start from the actual calculated load** — 400 W in this case, not a guess.
2. **Apply the 50%-load rule of thumb:** the power supply should be rated so that 400 W represents about half its capacity.
3. **Solve for capacity:** 400 W divided by 0.5 gives a target of **800 W** rated power supply.
4. **Check availability against standard wattage tiers** — an 800 W (or the nearest common rating above it) unit fits the calculation.
5. **Avoid drastically over-specifying** beyond this — a 1600 W supply for a 400 W load adds cost without adding speed, and the 50% guideline already provides sensible headroom.

## 10. Power supply efficiency

### 10.1 Where the lost power goes

Every AC-to-DC conversion loses **some power** in the process — that lost power becomes **heat**, which in turn creates an additional **cooling burden** for the system.

### 10.2 Typical efficiency range

Standard efficiency figures for power supplies range roughly from **80% to 96%**, depending on quality. A **more efficient** power supply **wastes less power as heat**, which reduces both electricity cost and cooling load.

### 10.3 The 80 PLUS certification tiers

Power supplies can be certified under the **80 PLUS** program, at increasing efficiency levels:

| Tier | Relative efficiency |
|---|---|
| **80 PLUS** (base, no colour) | Lowest of the certified tiers |
| **80 PLUS Bronze** | Higher |
| **80 PLUS Silver** | Higher still |
| **80 PLUS Gold** | Higher still |
| **80 PLUS Platinum** | Higher still |
| **80 PLUS Titanium** | Highest |

> **Exam tip:** the order to memorise is **(plain) → Bronze → Silver → Gold → Platinum → Titanium**, lowest to highest efficiency. Titanium-rated supplies waste the least power as heat.

## 11. Security perspective

Power infrastructure sits outside the usual "software security" conversation, but it carries genuine defender-relevant weight.

- **Physical safety failures are the most severe possible outcome of any hardware task.** Unlike most IT security lapses, getting power work wrong can cause injury or death. The disconnect-and-verify discipline described in section 1 is not bureaucratic caution — it is the actual control against the single most dangerous failure mode in this entire course.
- **Power availability is foundational to system availability.** No amount of network, application or data-layer resilience matters if the power feeding the equipment fails. Redundant, hot-swappable power supplies (section 7) are exactly the same design principle as RAID or multi-channel memory — eliminating a single point of failure — applied to the electrical layer.
- **A misconfigured manual voltage switch is a self-inflicted denial-of-service, sometimes literally destructive.** The 120V-into-230V failure mode described in section 4.2 can destroy the power supply outright, and potentially damage attached components — a preventable incident caused entirely by a configuration step, not an external attacker, which is a useful reminder that availability incidents are very often internal and procedural rather than adversarial.
- **Efficiency has a security-adjacent cost dimension.** Lower-efficiency power supplies generate more heat, and excess heat is a known contributor to component degradation and unplanned hardware failure over time — an indirect but real availability consideration when specifying infrastructure that needs to run reliably for years.
- **Capacitor discharge and stored energy are a specific insider-risk-adjacent hazard.** Anyone with legitimate physical access to open a case can be injured by residual charge if untrained — this argues for controlling and training who is authorised to perform hardware work, not merely for controlling who can access a building.

## Summary

- **Always disconnect power before opening a computer**, be aware of charge stored in capacitors, and **never connect yourself to a building's electrical system**, including its ground.
- The power supply converts **AC** (from the wall) to **DC** (for the motherboard): AC constantly reverses direction; DC is constant and single-direction.
- **Amps** measure current flow, **volts** measure electrical pressure, and **watts = volts × amps** measure real power use.
- Regional AC standards differ: **US/Canada 110–120 VAC at 60 Hz**, **Europe 220–240 VAC at 50 Hz**. Older supplies needed a manual switch, set correctly **before** connecting; modern supplies auto-sense.
- DC outputs: **+12 V** (PCIe, drives), **+5 V**/**+3.3 V** (motherboard, with 3.3 V now common for M.2 and RAM), **+5 VSB** (standby/wake), **−12 V** (onboard LAN, some old PCI), **−5 V** (obsolete).
- The **24-pin** motherboard connector (originally 20-pin) is **keyed** to prevent wrong-orientation insertion; a 24-pin supply works on a 20-pin board by leaving the last four pins unused.
- **Redundant** power supplies each support 100% of the load, typically sharing it 50/50 in normal operation, and are commonly **hot-swappable**.
- Power supply cabling is **fixed** (cheaper, all cables permanent), **modular** (pricier, connect only what's needed), or **hybrid**.
- Size a power supply by totalling component requirements and following the **50%-load rule of thumb**; physical size stays constant across wattage ratings within a form factor.
- Efficiency typically runs **80–96%**, certified under **80 PLUS → Bronze → Silver → Gold → Platinum → Titanium**, lowest to highest.

## Glossary

| Term | Meaning |
|---|---|
| AC | Alternating Current; direction constantly reverses |
| DC | Direct Current; constant voltage, single direction |
| Amp (A) | Unit of current; electrons passing a point per second |
| Volt (V) | Unit of electrical pressure |
| Watt (W) | Unit of real power use; volts times amps |
| VAC | Volts of AC |
| Hz | Hertz; cycles per second, describing AC frequency |
| +5 VSB | Standby voltage keeping the motherboard listening for wake signals  |
| 24-pin connector | The main ATX motherboard power connector |
| Keying | Physical shaping that allows a connector to fit only one way |
| Redundant power supply | A PSU configuration surviving the loss of one unit  |
| Hot-swappable | Replaceable while the system remains powered and running |
| Fixed cabling | Power supply cables permanently attached to the unit |
| Modular cabling | Power supply cables connected only as needed |
| 80 PLUS | An efficiency certification program for power supplies |
| Capacitor | A component that can store electrical charge after power is removed |

## Review questions

1. What two specific hazards make disconnecting power essential before opening a computer?
2. Why should you never connect yourself to a building's electrical system, even the ground?
3. What does a power supply convert, and in which direction?
4. Define amps, volts and watts, and give the formula relating them.
5. A device draws 2 amps at 120 volts. What is its wattage?
6. What are the AC voltage and frequency standards for the US/Canada and for Europe?
7. What happens if a power supply set for 120 V is connected to a 230 V source?
8. How do most modern power supplies avoid needing a manual voltage switch?
9. Name three of the DC voltages a power supply outputs and what each is typically used for.
10. What is the 24-pin connector's keying for?
11. How does redundant power supply load-sharing typically work in normal operation?
12. What is the difference between fixed and modular power supply cabling?
13. What rule of thumb is suggested for sizing a power supply's wattage?
14. List the 80 PLUS efficiency tiers from lowest to highest.
15. **Scenario:** a technician is about to work inside a desktop and unplugs the power cable. Is this sufficient before touching internal components? Why or why not?
16. **Scenario:** a system's components require a calculated maximum of 500 W. Using the 50%-load rule of thumb, what wattage power supply should be specified?

## Answer key

1. **Direct electrocution risk, and stored charge in capacitors** that can remain energised even after power is disconnected.
2. **A building's ground wire can become energised** under fault conditions, so it is never inherently safe to touch.
3. **AC (Alternating Current) to DC (Direct Current).**
4. **Amps** measure current (electrons per second), **volts** measure pressure, **watts** measure real power use. **Watts = volts times amps.**
5. **240 watts** (120 times 2).
6. **US/Canada: 110–120 VAC at 60 Hz. Europe: 220–240 VAC at 50 Hz.**
7. **The power supply is overloaded and will very likely fail dramatically** — the switch must be set correctly before connecting.
8. **They automatically detect (auto-sense) the incoming AC voltage** and adjust accordingly.
9. **Any three of:** +12 V (PCIe, drives), +5 V or +3.3 V (motherboard components, with 3.3 V common for M.2 and RAM on newer boards), +5 VSB (standby/wake), −12 V (onboard LAN, some old PCI), −5 V (obsolete).
10. **To ensure the connector can only be inserted in one correct orientation.**
11. **Each supply typically runs at about 50% of the load**, and the surviving supply takes 100% if the other fails or disconnects.
12. **Fixed cabling is permanently attached to the power supply; modular cabling is connected only when needed,** reducing unused cable clutter.
13. **Choose a power supply rated so your actual load is about 50% of its capacity,** avoiding overload and leaving headroom for growth.
14. **80 PLUS (plain), Bronze, Silver, Gold, Platinum, Titanium** — lowest to highest efficiency.
15. **No, not on its own.** Capacitors inside the system may still store charge even after the power cable is disconnected; the technician needs to know how to safely discharge them, or otherwise account for stored energy, before touching internal components.
16. **1,000 W** (500 W divided by 0.5), or the nearest standard wattage tier at or above that figure.
