---
title: Ports & connectors Recall
description: "A+ Ports and Connectors what they are and do. "
why: This is a revision tool
origin: ai
prompt: A labelled ports-and-connectors page from Thursday's Messer
status: active
draft: false
pubDate: 2026-09-27
---
# A+ ports & connectors — recall sheet

**CompTIA A+ Core 1 · physical ports & connectors**

Pure memorisation section — nothing else builds on it, so it's worth drilling to automatic. Read each row as **name → how you tell it apart on sight → the spec they test → what it plugs in**.

---

## USB

| Connector | How to spot it | Spec | Used for |
|-----------|----------------|------|----------|
| **USB-A** (Type-A) | Flat rectangle, one solid plastic tongue inside — only fits one way up | most common; blue = 3.x | Keyboards, mice, flash drives, nearly everything on a PC |
| **USB-B** (Type-B) | Square with two bevelled top corners, almost house-shaped | bulky device end | Printers and scanners |
| **USB-C** (Type-C) | Small rounded oval, symmetrical — reversible | up to 40 Gbps; carries video + power | Modern phones/laptops; also the Thunderbolt 3/4 plug |
| **Micro-USB** (Micro-B) | Thin flat trapezoid, wider than tall | older phones | Pre-USB-C phones, controllers |
| **Mini-USB** (Mini-B) | Chunkier and more square than Micro, angled sides | legacy | Older cameras and MP3 players |
| **Lightning** | Thin flat blade with visible gold contacts, reversible | Apple only; 8-pin | Older iPhones/iPads (being replaced by USB-C) |

### USB speeds

| Standard | Also called | Speed |
|----------|-------------|-------|
| USB 2.0 | Hi-Speed | 480 Mbps |
| USB 3.0 / 3.2 Gen 1 | SuperSpeed | 5 Gbps |
| USB 3.1 / 3.2 Gen 2 | SuperSpeed+ | 10 Gbps |
| USB 3.2 Gen 2×2 | — | 20 Gbps |
| USB4 | — | 40 Gbps |

> **Memory hook:** speeds go 480 Mbps → 5 → 10 → 20 → 40 Gbps. A blue port or connector tongue signals USB 3.x.

---

## Video

| Connector | How to spot it | Spec | Used for |
|-----------|----------------|------|----------|
| **VGA** (DE-15) | 15 pins in 3 rows, D-shaped shell, usually blue with two thumbscrews | analog only; 15-pin | Legacy monitors/projectors — no audio |
| **DVI** (DVI-A / D / I) | Wide white connector; flat blade on one side plus a pin grid | A = analog, D = digital, I = both; single vs dual link | Older monitors; dual-link adds pins for higher res |
| **HDMI** (Type-A) | Flat trapezoid, tapers slightly inward, no screws | video + audio | TVs, monitors, consoles — default modern AV cable |
| **DisplayPort** (DP) | Like HDMI but one corner is notched (square), often latching | video + audio; latching | PC monitors, high-refresh and multi-display |
| **Thunderbolt** | TB1/2 use the Mini DisplayPort shape; TB3/4 use the USB-C shape | TB3/4 = 40 Gbps; lightning-bolt icon | High-speed data + video + power |

---

## Networking

| Connector | How to spot it | Spec | Used for |
|-----------|----------------|------|----------|
| **RJ45** (8P8C) | Wide clear plastic-clip connector, 8 pins across | 8 pins; Ethernet | Wired network — Cat5e/Cat6 twisted pair |
| **RJ11** (6P2C / 6P4C) | Noticeably narrower than RJ45, fewer pins | telephone; DSL | Landline phones and DSL modems |
| **F-type** (coax) | Round screw-on barrel with a single centre pin | coaxial; screw-on | Cable internet, cable/satellite TV |

> **Quick tell:** RJ45 is wide (8 pins), RJ11 is narrow (phone). F-type is the only round one that screws on.

---

## Storage & internal power

| Connector | How to spot it | Spec | Used for |
|-----------|----------------|------|----------|
| **SATA data** | Flat thin L-shaped connector, 7 pins | 7-pin; data only | Drive-to-motherboard data cable |
| **SATA power** | Wider L-shaped connector, 15 pins, sits beside the data port | 15-pin; from PSU | Powers SATA drives |
| **eSATA** | Like SATA data but the L-notch is squared off | external | External SATA drive enclosures |
| **M.2** | Small edge card lying flat; notch position sets the key | B key = SATA, M key = NVMe | SSDs and Wi-Fi cards — screws to the board |
| **Molex** | Chunky white 4-pin with two bevelled corners | 4-pin; power | Older drives, fans, some accessories |
| **PCIe slot** | Long board slot; length grows with lane count | ×1 / ×4 / ×8 / ×16 | Graphics cards and expansion cards |

---

## Legacy & serial

| Connector | How to spot it | Spec | Used for |
|-----------|----------------|------|----------|
| **DB9** (DE-9, RS-232) | Small D-shell, 9 pins in 2 rows, two thumbscrews | serial; 9-pin | Serial console into switches/routers |
| **PS/2** (6-pin mini-DIN) | Round with 6 pins, colour-coded | purple = keyboard, green = mouse | Legacy keyboard and mouse |
| **Parallel** (DB25 / IEEE 1284) | Wide D-shell, 25 pins in 2 rows | 25-pin; legacy printer | Old printers, before USB |

---

## Audio

| Connector | How to spot it | Spec | Used for |
|-----------|----------------|------|----------|
| **3.5 mm TRS** | Round metal pin with black insulator rings (tip-ring-sleeve) | analog | Headphones, speakers, mics |
| **S/PDIF optical** (TOSLINK) | Square port that glows red — a light pipe, not electrical | digital; fibre optic | Digital audio to soundbars / AV receivers |

---

*Drill target: name ↔ appearance ↔ spec ↔ use · A+ Core 1*
