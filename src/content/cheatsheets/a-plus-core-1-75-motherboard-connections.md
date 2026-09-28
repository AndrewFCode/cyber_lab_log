---
title: "A+ Core 1 3.5: Motherboard Connections"
description: "A+ Core 1 3.5 — main and PCIe power connectors, SATA/eSATA, front-panel/USB/TPM headers, and M.2."
tags: ["a-plus", "comptia", "messer", "hardware", "motherboard", "power-connectors", "sata", "headers", "m2"]
draft: false
updated: "2026-09-27"
kind: "resource"
resource: "a-plus-core-1"
module: "Motherboard Connections"
moduleOrder: 75
unit: 3
---

> **In one line:** the connectors on a board — keyed main power (20/24-pin), PCIe card power (6-pin 75 W / 8-pin 150 W), L-shaped SATA data, case pin headers, and cable-free M.2.

*Companion to: Professor Messer A+ Core 1 (220-1201), Section 3, objective 3.5.* The full version is the Motherboard Connections class notes; the section overview is the Section 3 sheet.

## Power connectors

| Connector | Pins | Delivers | Notes |
| --- | --- | --- | --- |
| Main board power | 20-pin (old) / 24-pin (new) | +3.3 V, +5 V, +12 V DC | Keyed, latched; 24-pin cable fits a 20-pin board (4 left off) |
| PCIe card power | 6-pin | 75 W (+12 V) | Extra power for cards, usually GPUs |
| PCIe card power | 8-pin | 150 W (+12 V) | Often a **6+2** cable (2 pins detach) |
| CPU power (EPS)* | 8-pin | +12 V | **Different keying — not the PCIe 8-pin** |

\*Covered in the power lesson, not this one — but do not confuse the two 8-pin connectors.

## Data connectors

| Connector | Carries | Shape / notes |
| --- | --- | --- |
| SATA (internal) | **Data only** | **L-shaped**; power is a separate SATA lead; one cable = one drive |
| eSATA | Data (external) | External SATA; back-panel port or eSATA expansion card |
| M.2 | Data **and** power | Small slot; push drive in, **fasten screw**, no cables |

## Header pins (wire the case to the board)

| Header | Connects |
| --- | --- |
| Front panel | Power button, reset button, power LED, HDD-activity LED |
| USB header | Case front USB ports — USB 2.0 and USB 3.0 |
| TPM header | Trusted Platform Module (v1 / v2) |
| Speaker | Internal beep speaker |

- **Always follow the labels printed on the board** — front-panel pinouts differ per board.
- **LEDs are polarised** (reverse the connector if it won't light); **switches are not**.

## 🔐 Security notes

- **Internal USB headers are USB ports policy forgets:** an implant on an internal header or rogue front-panel cable sits on the bus, hidden behind the case panel, past external-port controls. Count internal USB in your USB threat model; an opened case is the event.
- **A discrete TPM sits on a removable header** with a comparatively exposed bus — the basis of TPM-sniff/swap attacks against Secure Boot and disk encryption. Physical case access is what it needs, so the chassis lock is part of the crypto threat model.
- **eSATA is raw external disk access** outside the case, easy to miss in a USB-only device-control policy.

## Practice drills

<details>
<summary>1. Which three voltages does the main power connector supply?</summary>

+3.3 V, +5 V and +12 V DC.
</details>

<details>
<summary>2. Can a 24-pin cable power a 20-pin board?</summary>

Yes — plug it in and leave the extra four pins off (often a detachable 4-pin block on modular PSUs).
</details>

<details>
<summary>3. Wattage of a PCIe 6-pin vs 8-pin connector?</summary>

6-pin = 75 W, 8-pin = 150 W, both +12 V DC.
</details>

<details>
<summary>4. What is a 6+2 PCIe cable?</summary>

An 8-pin plug whose two extra pins detach, so one cable serves a 6-pin or 8-pin card.
</details>

<details>
<summary>5. What does the L-shaped SATA connector carry, and where's the power?</summary>

Data only — power comes on a separate SATA power lead.
</details>

<details>
<summary>6. Wiring the front panel, what do you rely on, and what if an LED won't light?</summary>

Follow the labels printed on the board; reverse the LED connector (LEDs are polarised, switches aren't).
</details>

<details>
<summary>7. How do you install an M.2 drive?</summary>

Push it into the M.2 slot and fasten the retaining screw — the slot carries both data and power.
</details>

## Key takeaways

- **Main power:** keyed, latched, +3.3/+5/+12 V; **20-pin or 24-pin** (24 fits 20 with 4 off).
- **PCIe card power:** **6-pin = 75 W, 8-pin = 150 W**; often a 6+2 cable. Don't confuse the 8-pin PCIe with the 8-pin CPU (EPS).
- **SATA = L-shaped, data only;** eSATA is external; **M.2** needs no cables.
- **Headers** wire the case (power/reset/LEDs, USB 2.0/3.0, TPM, speaker) — **follow the board's labels**.
- **Security:** internal USB and TPM headers are inside-the-case attack surfaces the external-port policy misses.
