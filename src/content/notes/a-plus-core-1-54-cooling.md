---
title: "A+ Core 1 3.5: Cooling — Class Notes"
description: "Full class notes for A+ Core 1 3.5: fans and airflow, passive cooling, heat sinks, thermal paste and pads, and liquid cooling."
tags: ["class-notes", "a-plus", "comptia", "messer", "hardware", "cooling", "fans", "heat-sink", "thermal-paste", "liquid-cooling"]
draft: false
pubDate: 2026-09-27
---

**Class notes · Professor Messer A+ Core 1 (220-1201) · Section 3, lesson 5**

> **Quick reference:** the short version of this lesson lives in the
> [A+ Core 1 Section 3 resource sheets](/cyber_lab_log/resources/a-plus-core-1/3/). This is a
> tenth lesson under objective **3.5**. Heat is the by-product of everything the
> hardware does, and this lesson covers the ways we move it out: fans, passive
> cooling, heat sinks, thermal interface materials and liquid cooling.

## Learning objectives

By the end of these notes you should be able to:

1. Explain how airflow cools a case and why layout matters.
2. Describe fan cooling, including card fans, case-fan sizes and variable speed.
3. Explain passive (fanless) cooling and where it fits.
4. Describe how a heat sink works and how thermal paste and pads connect it to a
   component.
5. Describe the CPU cooling stack and liquid cooling.

## 1. Heat and airflow

Everything inside a computer generates heat, and the simplest way to remove it is
to **pull cool air through the case with fans**: cool air comes in one side,
passes over the warm components (heating up as it does), and the now-hot air is
pushed out the other side.

How well that works depends on **airflow**, and airflow depends on **layout**.
The arrangement of the motherboard and other components, and how tidily the
cables are routed, all affect whether air can travel cleanly from one side of the
case to the other. Keep wires and clutter **out of the way** so air has a clear
path. Cases and cooling systems come in many types, and they work together to
give the best result.

> **In the real world:** good cable management is a cooling task, not just a tidy
> one — a mess of cables in the airflow path traps heat.

## 2. Fans

### 2.1 Card fans

Look at the adapter cards and you may find some have **their own fans**, taking
cool air from inside the case and directing it onto a hot spot on the card. These
need room, so you tend to see them only on **larger cards** — most commonly
**high-end video/graphics cards**, whose components run very warm.

### 2.2 Case fans

Fans mounted on the case come in **standard sizes** — commonly **80 mm, 120 mm
and 200 mm**. They are often **variable speed**: slow while the machine is cool,
spinning up as it heats. Faster fans are **louder**, and different makers offer
fans with different noise levels — which matters in any environment where you
want the machine as **quiet** as possible.

## 3. Passive (fanless) cooling

The surest way to avoid fan noise is to have no fan at all — **passive cooling**,
also called fanless cooling. It suits places that must stay quiet, such as a
**video server** or a **set-top box** by the television, and **purpose-built
appliances** where the heat is modest and easily managed. Passive cooling is
usually paired with a **heat sink** to take the heat from a component and spread
it over a much larger area.

## 4. Heat sinks

A **heat sink** is critical for dissipating heat, and a machine may contain
several. It works by taking the heat off a component and spreading it across many
**fins**, greatly **increasing the surface area** available for cooling. As air
passes through the fins it picks up the heat and carries it away, and the cycle
repeats.

> **Caution:** heat sinks get **very hot**. If a system has been running, it is
> easy to burn yourself on one — let it cool before handling.

## 5. Thermal paste and thermal pads

A heat sink only works well with a good **thermal connection** to the component
beneath it, and that is the job of a **thermal interface material**.

### 5.1 Thermal paste

**Thermal paste** — also called **thermal grease** or **conductive grease** —
creates the thermal connection between a hot component and the heat sink. You need
surprisingly little: a **pea-sized** blob is usually enough, because the pressure
of the heat sink flattens it and spreads it evenly across the component. Thermal
paste is **not reusable** — remove the heat sink and you replace the paste.

> **Correction:** the transcript calls thermal paste "an adhesive" that lets you
> "fasten the heat sink". That is imprecise. Thermal paste is a **thermal
> interface material** that fills the microscopic gaps between component and heat
> sink to conduct heat; it does **not** glue or mechanically fasten the heat sink
> — that is done by **clips, brackets or mounting hardware**. (A separate product,
> **thermal adhesive**, does bond, but ordinary paste is not glue.)

> **Note (beyond this lesson):** most thermal paste is **electrically
> non-conductive**, so a little squeeze-out is harmless. The exception is
> **liquid-metal** paste, which *is* electrically conductive and can **short**
> nearby components if it spills — apply it with extra care.

### 5.2 Thermal pads

A **thermal pad** is an alternative you place on top of the hot component before
the heat sink. You would choose a pad when you are worried about **paste leaking
out and damaging other components** — pads are **less messy** to fit. They are
**not quite as effective** as paste, but still make a good connection, and like
paste they are **not reusable** — replace the pad when you refit the heat sink.

## 6. The CPU cooling stack

Putting it together for a CPU, the layers stack from the hot component upward:

```
CPU cooling stack (bottom to top):

        +-----------------------+
        |         Fan           |  moves air through the fins
        +-----------------------+
        |      Heat sink        |  fins spread heat; air carries it off
        +-----------------------+
        |  Thermal paste / pad  |  fills gaps -> good thermal contact
        +-----------------------+
        |         CPU           |  the hot component
        +-----------------------+
```

The **CPU** is on the bottom; **thermal paste or a thermal pad** goes on top of
it; the **heat sink** sits on that; and a **fan** can go on top of the heat sink
to push plenty of air down through it. If you need a larger fan, you can mount it
**sideways** — the CPU underneath, the heat sink on top of it, and a big fan
blowing air **through** the whole heat sink.

## 7. Liquid cooling

When fans are too loud or cannot cool enough, the next step is **liquid cooling**
— the same idea used in a car's engine or in mainframes. It is typical on
**high-end systems**, but is now common on home **gaming** machines and when
**overclocking** a processor for maximum performance.

A liquid cooling system has a block (a heat sink) sitting on the processor, with
pipes carrying **coolant** to a **radiator** that usually has **fans** blowing
through it. Heat moves from the CPU into the coolant, the coolant flows to the
radiator, the fans cool the coolant with air, and the cooled coolant returns to
the CPU — a continuous loop.

```
Liquid cooling loop:

   +-------------+  warm coolant  +----------------------+
   | CPU block   | -------------> | Radiator + fans      |
   | (on the CPU)| <------------- | (air cools coolant)  |
   +-------------+  cool coolant  +----------------------+
         ^                                   |
         +------------ pump / pipes ---------+
```

> **Note (beyond this lesson):** the block on the CPU is often called a **water
> block** or **cold plate**. Most home kits are **AIO** (all-in-one) sealed units
> — block, pump, pipes and radiator pre-assembled — as opposed to a custom loop
> you build and fill yourself.

### 7.1 Worked example — matching cooling to the build

Three machines, three cooling choices.

1. **A silent set-top box by the TV.** Heat is modest and noise must be zero, so
   use **passive cooling** with a good heat sink — no fan to hear.
2. **A general office desktop.** A standard **air cooler**: heat sink plus a
   variable-speed fan, using a **pea-sized** blob of thermal paste (or a pad if
   you want a cleaner, no-leak fit) and tidy cable routing for airflow.
3. **An overclocked gaming rig.** The CPU will run hot and the owner wants it
   quiet under load, so use **liquid cooling** — a water block on the CPU feeding
   a radiator with fans.

The pattern: size the cooling to the heat and the noise budget — passive for cool
and silent, air for the middle, liquid for hot or overclocked.

## 8. Security perspective

Cooling rarely appears in a security lesson, but it maps onto **availability**
and a couple of surprising channels:

- **Cooling is an availability control.** When cooling fails — a dead fan, a
  seized pump, dried-out paste, dust-blocked fins — a CPU **thermal-throttles**
  (slows down) or shuts off to protect itself. That is a self-inflicted denial of
  service, and it can also **mask or mimic** an incident: a machine that is slow
  and unstable might be overheating rather than compromised. Watching
  temperatures (the BIOS/firmware sensors from the BIOS Settings lesson, or OS
  tools) helps you tell a cooling fault from an attack, and a blocked-vent or
  removed-fan condition can be induced deliberately as a physical DoS.
- **Fans and heat are documented covert channels.** On isolated, air-gapped
  machines, researchers have shown data can be exfiltrated by modulating **fan
  speed/noise** (the "Fansmitter" technique) or a machine's **temperature**
  ("BitWhisper"). These are niche, but they make the point that even cooling
  hardware can leak information when an attacker controls it — another reason
  air-gapped and high-security systems get extra physical and emission scrutiny.
- **Environmental cooling is infrastructure to protect.** At data-centre scale,
  the HVAC/cooling plant is part of the attack surface: interfering with cooling
  is a way to take systems down without touching them directly, so building and
  cooling controls belong in the security picture.

## Summary

- Heat is unavoidable; **fans** move cool air in and hot air out, and **layout /
  cable management** keep the airflow clear.
- **Card fans** appear on larger cards (high-end GPUs); **case fans** come in
  **80/120/200 mm**, are often **variable speed**, and trade speed for **noise**.
- **Passive (fanless) cooling** is silent — good for set-top boxes, media/video
  servers and appliances — usually with a **heat sink**.
- **Heat sinks** spread heat over **fins** to add surface area; they get **very
  hot** — mind burns.
- **Thermal paste** (grease) makes the thermal connection — **pea-sized**, **not
  reusable**, and **not an adhesive**; **thermal pads** are cleaner and no-leak
  but slightly less effective, also **not reusable**.
- **Stack:** CPU -> paste/pad -> heat sink -> fan (or a large **sideways** fan
  through the heat sink).
- **Liquid cooling** (block, pipes, radiator + fans, coolant loop) suits high-end,
  gaming and **overclocked** systems.

## Glossary

| Term | Meaning |
| --- | --- |
| Airflow | The path of cool air in and hot air out of a case. |
| Case fan | A fan on the case; common sizes 80/120/200 mm. |
| Variable speed | A fan that speeds up as the system heats. |
| Card fan | A fan on an adapter card (often a high-end GPU). |
| Passive cooling | Fanless cooling, usually with a heat sink. |
| Heat sink | Finned metal that spreads heat to increase surface area. |
| Fin | A thin blade of a heat sink that air passes through. |
| Thermal interface material | Paste or pad conducting heat to the heat sink. |
| Thermal paste | Grease filling gaps for heat transfer; pea-sized, single-use. |
| Thermal pad | A solid pad alternative to paste; cleaner, single-use. |
| Thermal adhesive | A separate bonding product (unlike ordinary paste). |
| Liquid cooling | Coolant loop moving heat from a CPU block to a radiator. |
| Water block / cold plate | The block on the CPU in a liquid loop (beyond this lesson). |
| Radiator | Where fans cool the coolant in a liquid loop. |
| Overclocking | Running a CPU faster than rated; needs strong cooling. |
| Thermal throttling | A CPU slowing itself to avoid overheating. |

## Review questions

1. Describe how airflow cools a case, and what you should keep out of the way.
2. Where are you most likely to find a fan mounted on an adapter card?
3. Name three common case-fan sizes.
4. Why are many case fans variable speed, and what is the trade-off?
5. What is passive cooling, and give two places it suits.
6. How does a heat sink cool a component?
7. What safety caution applies to heat sinks?
8. What does thermal paste do, how much do you use, and is it reusable?
9. When would you choose a thermal pad over paste, and how do they compare?
10. List the layers of a CPU cooling stack from the component upward.
11. What does a liquid cooling loop consist of, and when is it a good choice?
12. Scenario: a PC has become slow and unstable after a year in a dusty room, but
    scans are clean. What cooling causes would you check?
13. Scenario: why is a thermal pad sometimes preferred over paste near other
    components?

## Answer key

1. **Cool air is pulled in one side, over the warm components, and hot air pushed
   out the other; keep wires/clutter out of the airflow.** Clear paths cool
   better.
2. **On larger adapter cards, most commonly high-end video/graphics cards.** They
   run hot and have room for a fan.
3. **80 mm, 120 mm and 200 mm.** Standard sizes.
4. **They run slower when cool and faster when hot; the trade-off is more noise at
   higher speed.** Speed vs sound.
5. **Fanless cooling; suits set-top boxes, video/media servers and appliances —
   any two.** Quiet, modest heat.
6. **It spreads the heat over many fins to increase surface area, and passing air
   carries the heat away.** More area, more cooling.
7. **They get very hot after running — you can burn yourself; let them cool.**
   Handle with care.
8. **It makes the thermal connection to the heat sink; a pea-sized amount; not
   reusable.** Fills gaps, single use.
9. **When worried about paste leaking onto other components; pads are cleaner but
   slightly less effective, and also single-use.** Neat but a touch less capable.
10. **CPU, then thermal paste/pad, then heat sink, then (optionally) a fan.** Hot
    part upward.
11. **A block on the CPU, pipes, a radiator with fans, and a coolant loop; good for
    high-end, gaming and overclocked systems.** Move heat to a radiator.
12. **Dust-blocked fins/vents, a failed or clogged fan, and dried-out thermal
    paste causing throttling.** Overheating mimics compromise.
13. **Paste can squeeze out and (with liquid-metal types) short components; a pad
    stays put and won't leak.** Cleaner and safer nearby.
