---
title: "A+ Core 1 3.5: Expansion Cards"
description: "A+ Core 1 3.5 — sound cards, integrated vs discrete GPUs, capture cards, NICs, and driver install best practice."
tags: ["a-plus", "comptia", "messer", "hardware", "expansion-cards", "gpu", "capture-card", "nic", "drivers"]
draft: false
updated: "2026-09-27"
kind: "resource"
resource: "a-plus-core-1"
module: "Expansion Cards"
moduleOrder: 81
unit: 3
---

> **In one line:** expansion cards add what a board lacks — sound, a discrete GPU, video capture, or Ethernet — seat in a PCIe slot, and need the correct driver (order per the docs, latest version, verify in Device Manager).

*Companion to: Professor Messer A+ Core 1 (220-1201), Section 3, objective 3.5.* The full version is the Expansion Cards class notes; the section overview is the Section 3 sheet.

## Card types

| Card | Adds | Notes |
| --- | --- | --- |
| Sound card | Better audio in/out | Multi-channel (home theatre/subwoofer), mics/instruments, line-in, headphone, **digital (S/PDIF)** out |
| Discrete GPU | High-end graphics | Own GPU + memory + outputs; PCIe **x16**, may need **6/8-pin** power |
| Integrated GPU | Basic graphics | Built into the CPU; ports on the **motherboard** (VGA/DVI/HDMI) |
| Capture card | Video **input** | Camera/other PCs; high throughput; **PCIe bus**; **HDMI + SDI** (SDI = Serial Digital Interface) |
| NIC | Wired Ethernet | For missing/failed jack, servers, security devices; **multi-port** = several ports in one slot |

- **Integrated vs discrete:** ports on the board = integrated; ports on the card = discrete.

## Choosing a card

Check: **motherboard docs** (right free slot/interfaces) → **maker's min requirements** → **knowledge base** → **other users**.

## Installing drivers

```
Read the docs -> driver BEFORE or AFTER hardware?
  -> install card (driver often automatic)
  -> get LATEST driver from the maker (uninstall old first if replacing)
  -> confirm status in Device Manager (yellow "!" = problem; Roll Back = revert)
```

## 🔐 Security notes

- **Drivers run in the kernel** — a malicious/vulnerable driver = full compromise (BYOVD). Install **only signed drivers from the manufacturer**; **avoid third-party "driver updater" tools** (malware vector); keep drivers patched.
- **Any card is on the PCIe bus** (potential DMA to memory) — account for every installed card.
- **A NIC is a network path:** a second NIC can **bridge networks** (break segmentation), promiscuous mode can **sniff**, and capture cards ingest external signals. Review any added/unexpected NIC; audit devices in Device Manager.

## Practice drills

<details>
<summary>1. What is an expansion card, and what usually happens on install?</summary>

A card adding functionality not on the motherboard; the OS usually auto-detects it and installs the driver.
</details>

<details>
<summary>2. Integrated vs discrete graphics — how do you tell them apart?</summary>

Integrated is in the CPU with ports on the motherboard; discrete is a separate card with its own GPU, memory and outputs on the card.
</details>

<details>
<summary>3. What does a capture card do, and how does it connect?</summary>

Brings video input (camera/other PCs) into the computer; high throughput, on the PCIe bus (HDMI/SDI).
</details>

<details>
<summary>4. Three reasons to add a NIC?</summary>

No/failed onboard Ethernet, a server, or a security device needing multiple Ethernet connections.
</details>

<details>
<summary>5. What sources help you choose the right card?</summary>

Motherboard docs, the maker's requirements, its knowledge base, and other users.
</details>

<details>
<summary>6. What's the correct driver-install approach?</summary>

Read the docs for before/after order, get the latest driver (uninstall the old first), then verify in Device Manager.
</details>

<details>
<summary>7. Why avoid third-party driver-updater tools?</summary>

Drivers run in the kernel, so a bundled/trojanised driver is a full compromise — use the manufacturer's signed driver.
</details>

## Key takeaways

- **Expansion cards** customise a generic board; usually plug-and-play with auto driver install.
- **Sound / discrete GPU / capture / NIC** — know what each adds; integrated GPU ports are on the board, discrete on the card.
- **Capture = video IN** (HDMI/SDI, PCIe); **multi-port NIC** = several Ethernet ports in one slot.
- **Drivers:** documented order, latest version, verify in **Device Manager**.
- **Security:** kernel-level drivers — signed, from the maker only; NICs add network paths to manage.
