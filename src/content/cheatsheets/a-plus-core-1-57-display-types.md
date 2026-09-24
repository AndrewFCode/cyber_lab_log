---
title: "A+ Core 1 3.1: Display Types"
description: "Professor Messer A+ 220-1201 objective 3.1 — LCD backlights, TN vs IPS vs VA, OLED, mini LED local dimming, digitizers and styluses, inverters and the torch test."
tags: ["a-plus", "comptia", "messer", "hardware", "displays", "lcd", "oled", "digitizer"]
draft: false
updated: "2026-09-24"
kind: "resource"
resource: "a-plus-core-1"
module: "Display Types"
moduleOrder: 57
unit: 3
---

> **In one line:** LCDs filter light from a backlight (TN fast, IPS colour, VA in between), OLED emits its own light and needs no backlight, mini LED dims an LCD backlight zone by zone, digitizers turn touch into coordinates, and inverters exist only to give fluorescent backlights the AC they need.

*Companion to: Professor Messer, CompTIA A+ 220-1201 Core 1, objective 3.1 (Display Types).* The full version is the Display Types class notes; the section overview is the Section 3 sheet.

---

## LCD basics

| Point | Detail |
|---|---|
| How | Backlight → polariser → liquid crystals → colour filter → your eye |
| Pros | Light, low power, inexpensive |
| Con | Hard to show true black — light leaks through the filters |
| Backlight | **Required.** Without it: very dim, barely readable |
| Backlight types | Fluorescent (older) · LED (modern) |
| Repair | Large panels: part of the backlight. Small/cheap: whole display assembly |

An "LED monitor" on a box is almost always an **LCD with an LED backlight**, not an LED panel.

## Panel types

| | TN | IPS | VA |
|---|---|---|---|
| Stands for | Twisted nematic | In plane switching | Vertical alignment |
| Best at | **Fastest response** | **Best colour** | Good colour, middle ground |
| Weak at | Colour shifts off angle | Costs more | Slower response than TN |
| Use for | Gaming, fast motion | Graphics, video editing | General purpose, shared screens |

## OLED and mini LED

| | OLED | Mini LED |
|---|---|---|
| What | Organic compound **emits its own light** per pixel | An LCD with far smaller, far more numerous backlight LEDs |
| Backlight | **None** | Yes — that's the whole point |
| Black | Pixel simply off = absolute black | Zone dimmed/off = very deep, but can halo |
| Also | Thinner, lighter, great colour; common on phones, watches, tablets | Brings cheaper LCD close to OLED colour and contrast |
| Watch for | Burn-in from static images; higher cost | Control is per **zone**, not per pixel |

**Micro LED** ≠ mini LED: micro LED is self-emissive like OLED; mini LED is just a better LCD backlight.

## Touch input

| Term | Detail |
|---|---|
| Digitizer | Converts a touch into **coordinates** — the touch layer, separate from the panel |
| Input options | Keyboard · mouse · digitizer — pick per task |
| Stylus | Pen-like input the digitizer also detects; common on tablets, also laptops and desktops |
| Capacitive vs resistive | Capacitive senses a finger's electrical properties, multi-touch (modern) · resistive senses pressure, works with gloves (industrial, POS) |

Display works but touch doesn't = **digitizer**. Often bonded to the panel, so one assembly replaces both.

## Inverters and backlight faults

| Backlight | Power needed | Conversion |
|---|---|---|
| LED | **DC** — what the laptop already uses | None |
| Fluorescent | **AC** | **Inverter** converts DC → AC |

Inverters are usually in the display **bezel** on older laptops.

**The torch test:** power on, shine a torch at the screen at an angle.

| What you see | Verdict |
|---|---|
| Faint image visible | **Backlight** (LED) or **inverter** (fluorescent) — panel and video are fine |
| Nothing at all, even under torch | Panel, display cable or graphics hardware |
| Correct image on an external monitor | Fault is in the display assembly, not the GPU |

## 🔐 Security notes

- **Wide viewing angles help shoulder surfing:** IPS and OLED read correctly from far off axis. Privacy filters in receptions, open-plan offices and trains.
- **Screen lock timeouts matter more than any panel spec** — the display shows a logged-in session to whoever walks past.
- **OLED burn-in leaks layout:** a ghosted dashboard or banner persists on a powered-off screen, on shared or resold devices.
- **Display/digitizer repair means handing over the whole machine** — trusted channels, and remember a third-party digitizer sits on the input path.
- **Smudge patterns on glossy touchscreens** can reveal unlock patterns and PINs.
- **A dead backlight is availability, not data loss** — the torch test turns "my laptop is dead" into a scheduled repair.

## Practice drills

<details>
<summary>1. Why can't an LCD show true black?</summary>

The backlight is always on and light **leaks through** the polarising and colour filters, so black is very dark grey.
</details>

<details>
<summary>2. TN's strength and weakness?</summary>

**Fastest response time**; **colours shift as you move off centre**.
</details>

<details>
<summary>3. Which panel for colour-critical design work?</summary>

**IPS** — best colour representation, at a higher cost.
</details>

<details>
<summary>4. What makes OLED different from LCD?</summary>

Each pixel **emits its own light** — there's no backlight at all, so panels are thinner, lighter, and black is a pixel switched off.
</details>

<details>
<summary>5. What does mini LED actually change?</summary>

The LCD's backlight: many more, much smaller LEDs, each **individually controllable**, so dark regions can be dimmed or switched off.
</details>

<details>
<summary>6. What does a digitizer do?</summary>

Converts a touch — finger or stylus — into **screen coordinates**.
</details>

<details>
<summary>7. Why does a fluorescent backlight need an inverter?</summary>

It needs **AC**; the laptop supplies **DC**. The inverter converts DC to AC. LED backlights run on DC directly.
</details>

<details>
<summary>8. Screen looks black, but a torch reveals a faint desktop. Diagnosis?</summary>

**Backlight or inverter failure.** The panel and video hardware are working — only the light has gone.
</details>

## Key takeaways

- LCD = filtered light from a required backlight; light, cheap, low power, weak blacks.
- TN fast · IPS colour · VA in between — match the panel to the task.
- OLED emits its own light: no backlight, thinner, deepest blacks, burn-in risk.
- Mini LED = LCD backlight with many small, individually dimmed LEDs (per zone, not per pixel).
- Digitizer = touch to coordinates; inverter = DC to AC for fluorescent backlights only.
- Dim but visible under a torch = backlight or inverter, not a video fault.
