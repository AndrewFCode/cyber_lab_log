---
title: "A+ Core 1 3.2: Optical Fibre"
description: "Professor Messer A+ 220-1201 objective 3.2 — light through core and cladding, ferrules and connectors, and multimode vs single-mode fibre on distance, source and core size."
tags: ["a-plus", "comptia", "messer", "hardware", "cabling", "fibre", "multimode", "single-mode"]
draft: false
updated: "2026-09-24"
kind: "resource"
resource: "a-plus-core-1"
module: "Optical Fibre"
moduleOrder: 61
unit: 3
---

> **In one line:** fibre carries light through a high-index core held in by low-index cladding, which makes it immune to interference, hard to tap and good for kilometres — with multimode (wide core, LED, short range) for inside buildings and single-mode (narrow core, laser, long range) between sites.

*Companion to: Professor Messer, CompTIA A+ 220-1201 Core 1, objective 3.2 (Optical Fiber).* The full version is the Optical Fibre class notes; the section overview is the Section 3 sheet.

---

## Why fibre

| Advantage | Why |
|---|---|
| No interference | Light isn't affected by motors, RF or electrical noise |
| Hard to tap | Nothing radiates — you can't pick light up from outside the cable |
| Long distance | Many kilometres without regenerating the signal |
| No electrical path | Can't carry a surge or ground-potential difference between buildings |

| Drawback | Detail |
|---|---|
| Specialised equipment | Transceivers, test gear, splicing kit and the skills for them |
| Harder to monitor | Taps and mirrors need fibre-specific hardware |
| Many types and connectors | Choosing the right combination is part of the job |

## Inside the cable

| Layer | Job |
|---|---|
| **Core** | High **refractive** index centre — the light travels here |
| **Cladding** | Low refractive index — reflects light back into the core |
| **Buffer coating** | Protects the very thin, very fragile glass |

- Light comes from an **LED** or a **laser** and bounces along the core (total internal reflection) to the far end.
- **Ferrule:** the white **ceramic** sleeve at the centre of a connector that holds and aligns the fibre. The fibre itself is the tiny discoloured spot in its face.
- **Connectors on the objectives:** ST, SC, LC (plus MTP/MPO in data centres).

## Multimode vs single-mode

| | **Multimode** | **Single-mode** |
|---|---|---|
| Range | Short — usually up to about **2 km** | Long — **kilometres** |
| Use | Inside a building, campus | Between sites, telecom |
| Light source | **LED** (inexpensive) | **Laser** |
| Core | Relatively **large** | Much **narrower** |
| Light paths | Several **modes** | A **single** mode |

**Why modes limit distance:** rays taking different-length paths arrive at slightly different times, so the pulse spreads (**modal dispersion**) until pulses blur together. A narrow core removes the alternative paths.

Beyond the exam: multimode cores ~50 or 62.5 µm, single-mode ~9 µm, both with 125 µm cladding. Grades OM1–OM5 and OS1/OS2. The 2 km figure is speed-dependent — 10GBASE-SR is only a few hundred metres.

## Troubleshooting a dead fibre link

| Order | Check |
|---|---|
| 1 | **Swap TX/RX strands** at one end — both ends wired straight = transmitter into transmitter |
| 2 | **Clean the ferrule end faces** — contamination is a leading cause of failure |
| 3 | **Match the transceivers** to the fibre type and Ethernet standard at both ends |
| 4 | **Check distance** against the specific standard, not "fibre goes far" |
| 5 | **Look for tight bends** — below the minimum **bend radius**, light escapes |
| 6 | Test with fibre-specific equipment |

## 🔐 Security notes

- **Fibre emits nothing** — an inductive probe reads copper, not light. Best choice for links crossing space you don't control.
- **Tapping means interrupting the light,** which costs optical power, so a monitored link can reveal a tap as a drop in received level. Copper gives no such signal.
- **Same property cuts both ways:** plan and budget fibre taps or mirror ports when the fibre goes in, not afterwards.
- **No electrical path between buildings** — removes lightning surges and ground-potential damage to switch ports.
- **Interference immunity is an availability control** in industrial sites: it removes a whole class of intermittent faults that real problems hide behind.
- **It can still be cut,** and a cut is a total outage — diverse routing matters more when so much capacity rides one strand.
- **Never look into a fibre end or transceiver port** — the light may be invisible and, from a laser, harmful.

## Practice drills

<details>
<summary>1. What keeps the light inside the fibre?</summary>

The **refractive index difference** between the high-index **core** and low-index **cladding** — total internal reflection at the boundary.
</details>

<details>
<summary>2. Name the three layers and their jobs.</summary>

**Core** carries the light · **cladding** reflects it back in · **buffer coating** protects the fragile glass.
</details>

<details>
<summary>3. What is a ferrule?</summary>

The **ceramic** sleeve in a connector that holds, protects and aligns the fibre. The fibre is the tiny discoloured spot in its centre.
</details>

<details>
<summary>4. Multimode: range, source, core?</summary>

**Short (about 2 km), LED, relatively large core** with several light paths (modes). Used inside buildings.
</details>

<details>
<summary>5. Single-mode: range, source, core?</summary>

**Kilometres, laser, much narrower core** with a single path. Used between sites.
</details>

<details>
<summary>6. What does "multimode" actually mean?</summary>

The core is wide enough that light can take **several different paths** through it.
</details>

<details>
<summary>7. Why can't multimode go as far?</summary>

Rays on different-length paths arrive at different times, so the pulse **spreads** (modal dispersion) until pulses can't be told apart.
</details>

<details>
<summary>8. New multimode link, no light at either end. First thing to try?</summary>

**Swap the TX and RX strands at one end** — both ends straight through means each switch transmits into the other's transmitter.
</details>

## Key takeaways

- Fibre sends light, not electricity: no interference, hard to tap, kilometres without regeneration — but needs specialised kit.
- Core (high index) + cladding (low index) + buffer coating; the index difference reflects light back into the core.
- The ceramic **ferrule** holds the fibre; a dirty end face is a top cause of link failure.
- **Multimode:** short, LED, wide core, many modes. **Single-mode:** long, laser, narrow core, one mode.
- Multiple paths mean pulses spread, which is exactly why multimode's distance is limited.
