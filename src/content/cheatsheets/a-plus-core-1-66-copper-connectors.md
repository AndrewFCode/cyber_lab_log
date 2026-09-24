---
title: "A+ Core 1 3.2: Copper Connectors"
description: "Professor Messer A+ 220-1201 objective 3.2 — RJ11 and RJ45, F connectors and DOCSIS, punchdown blocks, USB and USB-C, Molex, Lightning, and DB-9/RS-232."
tags: ["a-plus", "comptia", "messer", "hardware", "cabling", "rj11", "rj45", "connectors", "molex"]
draft: false
updated: "2026-09-24"
kind: "resource"
resource: "a-plus-core-1"
module: "Copper Connectors"
moduleOrder: 66
unit: 3
---

> **In one line:** a survey of the copper connector family — RJ11/RJ14 for phone and DSL, RJ45 for Ethernet and serial, F connectors for cable TV/modem, punchdown blocks for bulk termination, USB through USB-C, Molex for internal power, Lightning for older Apple devices, and DB-9/RS-232 for legacy console access.

*Companion to: Professor Messer, CompTIA A+ 220-1201 Core 1, objective 3.2 (Copper Connectors).* The full version is the Copper Connectors class notes; the section overview is the Section 3 sheet. USB, USB-C and DB-9/RS-232 are covered in full depth in the Peripheral Cables lesson; punchdown tools in the Network Tools lesson.

---

## RJ11 / RJ14 vs RJ45

| | RJ11 | RJ14 | RJ45 |
|---|---|---|---|
| Positions/conductors | **6P2C** | 6P4C | **8P8C** |
| Used for | Analogue phone, DSL | Two phone lines, one jack | Ethernet, serial, more |
| Size | Smaller | Same as RJ11 | Larger |

**The trap:** RJ11 is small enough to push into an RJ45 socket by mistake — common on DSL modems where both sit side by side. **RJ45 physically cannot fit an RJ11 socket**, so the mistake only runs one way.

## F connector

| Point | Detail |
|---|---|
| What | Threaded **coax** connector — cable TV, cable modems |
| Mechanism | Threaded shell resists accidental pull-out; must be unscrewed |
| Signal path | The coax's own **centre conductor** is the pin — no separate pin crimped on |
| Modem end | **Female** F connector; the coax cable is **male** |
| Standard | **DOCSIS** (Data Over Cable Service Interface Specification) carries the data over this connection |

## Punchdown blocks

- Terminate **large volumes** of twisted-pair cable fast and cheap — no individual connector crimped per wire.
- **Insulation displacement:** metal contacts pierce the wire's insulation to reach the copper directly.
- Push the wire into the slot, seat it with a **punchdown tool** — one wire, one quick action.
- (Full technique, twist management and documentation → Network Tools lesson.)

## USB family (full detail in Peripheral Cables)

| Generation | Connectors |
|---|---|
| 1.1 / 2.0 | Standard-A · Standard-B (square) · Mini-B · Micro-B |
| 3.0 | Standard-A (same size) · Standard-B (taller) · Micro-B (**different shape**) |
| **USB-C** | One reversible connector — **physical interface only**, can carry USB, Thunderbolt, HDMI and more |

## Molex

| Point | Detail |
|---|---|
| Pins | **4** |
| Voltages | **12 V and 5 V** |
| Powers | Fans, storage drives, other internal peripherals |
| Connects by | **Friction** — no latch, easy to disconnect |
| Also called | **AMP Mate-n-Lok** |
| Name origin | The **Molex Connector Company** — "Molex" is used loosely; the company makes many other connector types too |

## Lightning

| Point | Detail |
|---|---|
| What | **Apple proprietary**, reversible mobile-device connector |
| Found on | iPhones, iPads, similar Apple devices — **only** Apple hardware |
| Why introduced | Micro-USB (the era's standard) lacked the **power delivery** Apple wanted and wasn't **reversible** |
| Today | Industry (including Apple's newer devices) has largely moved to **USB-C**; Lightning still turns up on older devices |

## DB-9 / RS-232

| Point | Detail |
|---|---|
| Connector | **DB-9**, 9-pin D-shaped |
| Signalling | **RS-232** (Recommended Standard 232) |
| History | Predates USB; used for modems, mice, and general serial peripherals before USB |
| Today | **Console access** to legacy switches, routers, firewalls — works when the network interface doesn't |

## Pick the connector

| Need | Connector |
|---|---|
| Analogue phone line / DSL | RJ11 (RJ14 for two lines) |
| Ethernet, or serial over modular jacks | RJ45 |
| Cable TV / cable modem | F connector |
| Bulk twisted-pair termination | Punchdown block |
| Common peripheral / mobile device | USB (any variant) / USB-C |
| Internal fan or drive power (older system) | Molex / AMP Mate-n-Lok |
| Older Apple mobile device | Lightning |
| Legacy device console port | DB-9 / RS-232 |

## 🔐 Security notes

- **RJ11-into-RJ45 mistakes are availability, not security** — but working by feel behind a rack risks seating the wrong cable in the right-looking port generally. Label, and look before connecting.
- **F connectors/cable modems sit at the network edge** — the modem is a demarcation point, not your security boundary; that's your own router/firewall's job.
- **Unlabelled punchdown blocks are invisible trust** — hundreds of pairs with no documentation makes an unauthorised cross-connect nearly undetectable. Numbering and records are a real control here.
- **Molex-era legacy hardware often has no firmware update path at all** — treat it as a known-risk asset-inventory item, not just "old but harmless."
- **Counterfeit Lightning (or USB-C) cables can carry malicious electronics** — the proprietary shape makes tampering harder to spot by eye. Trusted suppliers only.
- **DB-9 console access is unauthenticated physical access by design** — the cabinet lock is the real control.

## Practice drills

<details>
<summary>1. RJ11 pin/conductor configuration, and what's an RJ14?</summary>

**6P2C** (6 positions, 2 conductors). **RJ14** is the same body with **4 conductors**, carrying two phone lines.
</details>

<details>
<summary>2. Why can RJ11 be mistakenly plugged into RJ45, but not the reverse?</summary>

**RJ11 is smaller** and fits into an RJ45 socket; an **RJ45 plug is too large** to fit an RJ11 socket at all.
</details>

<details>
<summary>3. What does DOCSIS stand for, and what connects via an F connector?</summary>

**Data Over Cable Service Interface Specification** — the standard governing data over the cable infrastructure that a cable modem reaches through its **F connector**.
</details>

<details>
<summary>4. Why are punchdown blocks fast and cheap?</summary>

**No individual connector is crimped per wire** — the wire is pushed into a slot and seated with a tool, using **insulation displacement** to reach the copper.
</details>

<details>
<summary>5. What does USB-C encapsulate?</summary>

**One reversible connector carrying many signal types** (USB, Thunderbolt, HDMI, etc.), replacing the earlier fragmented USB connector shapes.
</details>

<details>
<summary>6. Molex: pin count, voltages, alternate name?</summary>

**4 pins, 12 V and 5 V. Also called AMP Mate-n-Lok.**
</details>

<details>
<summary>7. Why did Apple create Lightning?</summary>

Micro-USB, the standard of the time, **lacked the power delivery** Apple wanted and **wasn't reversible**.
</details>

<details>
<summary>8. Why does a DB-9 console connection still matter today?</summary>

It provides **console access** to legacy infrastructure and **works when the network interface doesn't** — it doesn't depend on the network at all.
</details>

## Key takeaways

- RJ11 (6P2C, or 6P4C as RJ14) is smaller than RJ45 (8P8C) — mis-insertion only runs RJ11-into-RJ45.
- F connectors thread onto coax for cable TV/modem, carrying DOCSIS data; the centre conductor is the pin itself.
- Punchdown blocks trade individual connectors for fast, insulation-piercing bulk termination.
- USB converges on USB-C — one connector, many possible signals.
- Molex/AMP Mate-n-Lok: 4 pins, 12V/5V, friction-fit. Lightning: Apple-only, reversible, more power than Micro-USB.
- DB-9/RS-232 persists specifically for console access to legacy network gear.
